type CocktailDetails = {
    ingredients: string[]
    instructions: string
    name: string
}

type Nutrition = {
    name: string | null
    serving_size_g: number
    calories: number
    protein_g: number
    sugar_g: number
    fat_total_g: number
}

type MealSummary = {
    meal_recommendation: MealRecommendations
    nutrition: Nutrition
}

type MealRecommendations = {
    name: string
    description: string
}
