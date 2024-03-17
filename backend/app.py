import asyncio
from typing import Any
from fastapi import Depends, FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware

from authorization import verify_token
from models.meal_recommendations import MealPreferences
from models.meal_summary import MealSummary
from models.coctail import CocktailDetailsResponse
from models.nutrition import Nutrition, calculate_nutrition
from ninjas_api.api_utils import (
    fetch_from_ninja_api,
    fetch_from_ninja_api_asynchronously,
)
from base_urls import COCKTAILS_BASE_URL, NUTRITION_BASE_URL
from openai_api import api_utils
import httpx

app = FastAPI()

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/v1/cocktail-details/{cocktail}", dependencies=[Depends(verify_token)])
def cocktail_details(cocktail: str) -> CocktailDetailsResponse:
    formatted_url = COCKTAILS_BASE_URL.format(cocktail)
    print(formatted_url)
    if not (drink_description_list := fetch_from_ninja_api(formatted_url)):
        return Response(
            "Drink matching given description does not exist", status_code=404
        )
    cocktail_details = CocktailDetailsResponse(
        **(fetch_from_ninja_api(formatted_url)[0])
    )
    return cocktail_details


@app.get("/api/v1/nutrition/{food_name}", dependencies=[Depends(verify_token)])
def nutrition(food_name: str) -> Nutrition:
    formatted_url = NUTRITION_BASE_URL.format(food_name)
    if not (nutrition_list := fetch_from_ninja_api(formatted_url)):
        return Response(
            "Nutrition details for given meal don't exist in our system",
            status_code=404,
        )
    calculated_nutrition = calculate_nutrition(
        food_name, [Nutrition(**data) for data in nutrition_list]
    )

    return calculated_nutrition


@app.post("/api/v1/meal-for-cocktail", dependencies=[Depends(verify_token)])
async def meals_for_cocktail(meal_preferences: MealPreferences) -> list[MealSummary]:
    print(meal_preferences)
    meal_recommendations = api_utils.prompt(
        meal_preferences.cocktail, meal_preferences.preferences
    )
    urls = [
        NUTRITION_BASE_URL.format(recommendation.name)
        for recommendation in meal_recommendations
    ]
    async_results = [fetch_from_ninja_api_asynchronously(url) for url in urls]
    result_data = await asyncio.gather(*async_results)
    meal_summary_list = []
    for idx, nutrition_list in enumerate(result_data):
        calculated_nutrition = calculate_nutrition(
            meal_recommendations[idx].name,
            [Nutrition(**data) for data in nutrition_list],
        )
        meal_summary_list.append(
            MealSummary(
                meal_recommendation=meal_recommendations[idx],
                nutrition=calculated_nutrition,
            )
        )
    return meal_summary_list
