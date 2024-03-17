from pydantic import BaseModel


class MealRecommendations(BaseModel):
    name: str
    description: str


class MealPreferences(BaseModel):
    cocktail: str
    preferences: list[str]
