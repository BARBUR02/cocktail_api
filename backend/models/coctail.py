from pydantic import BaseModel


class CocktailDetailsResponse(BaseModel):
    ingredients: list[str]
    instructions: str
    name: str
