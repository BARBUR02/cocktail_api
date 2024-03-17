from pydantic import BaseModel

from models.meal_recommendations import MealRecommendations
from models.nutrition import Nutrition


class MealSummary(BaseModel):
    meal_recommendation: MealRecommendations
    nutrition: Nutrition
