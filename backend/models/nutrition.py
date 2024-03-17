from typing import Callable
from pydantic import BaseModel


class Nutrition(BaseModel):
    name: str | None = None
    serving_size_g: float
    calories: float
    protein_g: float
    sugar_g: float
    fat_total_g: float


def calculate_nutrition(food_name: str, nutrition_result: list[Nutrition]) -> Nutrition:
    nutrition = _normalize_nutrition_to_set_g_portion(nutrition_result)
    nutrition.name = food_name
    return nutrition


def _normalize_nutrition_to_set_g_portion(
    nutrition_list: list[Nutrition], portion: int = 500
) -> Nutrition:
    def _accumulate(func: Callable[[Nutrition], float], normalizer: float = 1) -> float:
        return round(sum(map(func, nutrition_list)) * normalizer, 2)

    _serving_size_g_sum = _accumulate(lambda x: x.serving_size_g)
    _normalizer = portion / _serving_size_g_sum

    calories_sum = _accumulate(lambda x: x.calories, _normalizer)
    protein_g_sum = _accumulate(lambda x: x.protein_g, _normalizer)
    sugar_g_sum = _accumulate(lambda x: x.sugar_g, _normalizer)
    fat_total_g_sum = _accumulate(lambda x: x.fat_total_g, _normalizer)

    return Nutrition(
        serving_size_g=portion,
        calories=calories_sum,
        protein_g=protein_g_sum,
        sugar_g=sugar_g_sum,
        fat_total_g=fat_total_g_sum,
    )
