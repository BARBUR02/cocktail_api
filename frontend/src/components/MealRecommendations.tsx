


interface MealReccomendationsProps {
    mealSummary: MealSummary[]
}

const renderMetric = (key: string): string => {
    if (key.includes("_g")) {
        return key.replace(/_g$/, '')
    }
    return key
}

const MealRecommendationsSection = ({ mealSummary }: MealReccomendationsProps) => {
    return (<section className="flex-col justify-center items-center px-20">
        <div className="flex ">
            <h1 className="flex text-3xl m-2 text-white font-bold uppercase justify-start items-center p-3 border-b-2 border-green-700">Our meal recommendations with their nutrition specification (meal of 500g) 🧑‍🍳😋</h1>
        </div>
        <div className="grid grid-cols-3 gap-4 p-4">
            {mealSummary.map((summary, idx) => {
                return (
                    <div key={idx} className="p-10 bg-white flex flex-col justify-start items-start rounded-xl shadow-xl  max-w-50 transform transition-transform hover:scale-105">
                        <h2 className="font-bold text-xl mb-2"><span className="underline">{summary.meal_recommendation.name} 😋</span></h2>
                        <p className="text-m mb-2">{summary.meal_recommendation.description}</p>
                        <h3 className="font-bold mb-2">Nutrition</h3>
                        <ul className="flex flex-col w-full">
                            {Object.entries(summary.nutrition).map(([key, value], idx) => {
                                if (key == "name") return
                                const metric = key == "calories" ? "kCal" : "g"
                                return (
                                    <div key={idx} className="flex justify-between">
                                        <li>🔴 {renderMetric(key)}</li>
                                        <li className="text-green-600">{value} {metric}</li>
                                    </div>
                                )
                            })
                            }

                        </ul>
                    </div>
                )
            })}

        </div>
    </section >)
}



export default MealRecommendationsSection;
