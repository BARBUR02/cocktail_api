import { PacmanLoader } from "react-spinners";

const CocktailDetailsSection = ({ ingredients, instructions, name }: CocktailDetails) => {
    return (
        <section className="flex-col justify-center items-center px-20">
            <div className="flex ">
                <h1 className="flex text-3xl m-2 text-white font-bold uppercase justify-start items-center p-3 border-b-2 border-green-700">{name} 🍷🍸</h1>
            </div>
            <div className="grid grid-cols-2 gap-4 p-4">
                <div className="p-10 bg-white flex flex-col justify-start items-center rounded-xl shadow-xl  max-w-50 transform transition-transform hover:scale-105">
                    <h2 className="font-bold text-xl mb-2"><span className="underline">Ingredients</span> 🧑‍🍳🧑‍🍳🧑‍🍳</h2>
                    <ul className="p-3">
                        {ingredients.map((ingredient, idx) => <li key={idx}>⚪️ {ingredient}</li>)}
                    </ul>
                </div>
                <div className="p-10 bg-white flex flex-col justify-start items-center rounded-xl shadow-2xl max-w-50 transform transition-transform hover:scale-105">
                    <h2 className="font-bold text-xl mb-2"><span className="underline">How can i prepare one?</span> 🛠️🛠️🛠️</h2>
                    <p className="p-3 px-8">{instructions}</p>
                </div>
            </div>
        </section >
    )
}


export default CocktailDetailsSection
