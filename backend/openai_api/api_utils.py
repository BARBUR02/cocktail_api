from openai import OpenAI
from models.meal_recommendations import MealRecommendations
import config
import json


def prompt(chosen_cocktail: str, preferences: list[str]) -> MealRecommendations:
    client = OpenAI(api_key=config.openai_api_key())
    _prompt_params = {
        "model": "gpt-3.5-turbo",
        "response_format": {"type": "json_object"},
        "messages": [
            {
                "role": "system",
                "content": (
                    "You are a food specialist and you will be providing meal recommendations for people. "
                    "You will be given a name of a cocktail as an input by user "
                    "along list of preferences that this person would love to have included in that meal. "
                    "It will be provided in a JSON format: {cocktail: {cocktail_name}, preferences: {preferences_list}} "
                    "Where cocktail_name corresponds to the name of the desired drink and preferences_list will be the list of things "
                    "important for this person to have taken care of each of type string. "
                    "Your task is to produce 3 short options of meal for this person "
                    "taking into consideration preferences list and chosen cocktail. "
                    "I would love you to depict why you chose concrete meal goes well with concrete cocktail as well. "
                    "I want your descriptions to be short and concrete, possibly about 2 sentences long. "
                    "I want response in JSON format 'recommendations':[{'name':'meal_name','description':'description'},{...},{...}]."
                ),
            },
            {
                "role": "user",
                "content": json.dumps(
                    {"cocktail": chosen_cocktail, "preferences": preferences}
                ),
            },
        ],
    }
    response = client.chat.completions.create(**_prompt_params)
    proposals = json.loads(response.choices[0].message.content)
    return [
        MealRecommendations(**recommendation)
        for recommendation in proposals["recommendations"]
    ]
