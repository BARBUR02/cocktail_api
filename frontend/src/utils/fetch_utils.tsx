import axios from 'axios'

const BASE_URL = "http://127.0.0.1:8000/api/v1"
const COCKTAIL_DETAIL_API_URL = `${BASE_URL}/cocktail-details/`
const MEAL_RECOMMENDATIONS_API_URL = `${BASE_URL}/meal-for-cocktail`

const apiKey = import.meta.env.VITE_API_TOKEN;

const headers = {
    "ApiToken": apiKey
}

export const fetchCocktailDetails = async (cocktail: string): Promise<CocktailDetails> => {
    const response = await axios.get(`${COCKTAIL_DETAIL_API_URL}${cocktail}`, { headers });
    return response.data;
}


export const fetchMealRecommendations = async (cocktail: string, preferences: string[]): Promise<MealSummary[]> => {
    const response = await axios.post(`${MEAL_RECOMMENDATIONS_API_URL}`,
        {
            cocktail,
            preferences
        }, {
        headers
    }
    );
    return response.data;
}

