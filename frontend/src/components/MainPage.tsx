import { useState } from "react"
import DrinkSearchBar from "./DrinkSearchBar"
import { useQuery } from "@tanstack/react-query";
import { fetchCocktailDetails, fetchMealRecommendations } from "../utils/fetch_utils";
import CocktailDetailsSection from "./CocktailDetails";
import MealPreferences from "./MealPreferences";
import MealRecommendations from "./MealRecommendations";

const MainPage = () => {
    const [cocktail, setCocktail] = useState("")
    const [preferences, setPreferences] = useState<string[]>([])
    const enableCocktailFetch = cocktail !== ''
    const enableMealsFetch = enableCocktailFetch && preferences.length > 0

    const { data: cocktailData, isLoading: isLoadingCocktail, isError: isErrorCocktail } = useQuery({ queryKey: ['cocktail', cocktail], queryFn: () => fetchCocktailDetails(cocktail), enabled: enableCocktailFetch });
    const { data: MealData, isLoading: isLoadingMeals, isError: isErrorMeals } = useQuery({ queryKey: ['meals', preferences], queryFn: () => fetchMealRecommendations(cocktail, preferences), enabled: enableMealsFetch });

    const handleCocktailSearch = (cocktail: string): void => {
        setCocktail(cocktail)
        setPreferences([])
    }

    const handleMealSearch = (preferences: string[]): void => {
        setPreferences(preferences)
    }

    return (<main className="min-h-screen bg-slate-600 flex-col justify-center items-center">
        <DrinkSearchBar handleSearch={handleCocktailSearch} isFetching={isLoadingCocktail} />
        {isErrorCocktail && <h1 className="text-red-300 flex justify-center items-center">Error occured while fetching cocktail, validate name, or try with different one</h1>}
        {cocktailData && <CocktailDetailsSection ingredients={cocktailData.ingredients} instructions={cocktailData.instructions} name={cocktailData.instructions} />}
        {isErrorMeals && <h1 className="text-red-300 flex justify-center items-center">Error occured while fetching meal recommendations</h1>}
        {cocktailData && <MealPreferences handleMealSearch={handleMealSearch} isFetching={isLoadingMeals} />}
        {MealData && <MealRecommendations mealSummary={MealData} />}
    </main >)
}

export default MainPage
