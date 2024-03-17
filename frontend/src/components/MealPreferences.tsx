import { useState } from "react";
import { PacmanLoader } from "react-spinners";

interface MealPreferencesProps {
    handleMealSearch: (preferences: string[]) => void;
    isFetching: boolean
}

const MealPreferences = ({ handleMealSearch, isFetching }: MealPreferencesProps) => {
    const [preferences, setPreferences] = useState(new Set<string>())
    console.log(...preferences)
    const handleAddPreference = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);
        const preference = formData.get("preference") as string;
        if (!preference) {
            return
        }
        const newSet = new Set(preferences);

        event.currentTarget.reset()
        newSet.add(preference);
        setPreferences(newSet);
    }

    const handleRemovePreference = (preference: string) => {
        const newSet = new Set(preferences);
        newSet.delete(preference);
        setPreferences(newSet);
    }

    const handleClick = () => {
        handleMealSearch([...preferences]);
    }

    return (<section className=" flex-col justify-center items-center px-20">
        <div className="flex ">
            <h2 className="flex text-2xl m-2 text-white font-bold uppercase justify-start items-center p-3 border-b-2 border-green-700">Let's look for a perfect meal companion to your choice 🔎</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 p-4">
            <form onSubmit={handleAddPreference} className="flex flex-col border-r-8 border-green-700">
                <label className="font-bold text-xl mb-2 text-white">Do you have any special meal preferences? 🙏</label>
                <input name="preference" type="text" placeholder="your preference" className="w-3/4 px-2 py-1 outline-none rounded-xl" />
                <button type="submit" className="w-3/4 my-2 py-2 px-4 rounded-2xl bg-green-700 hover:opacity-60 text-m font-medium text-white disabled:opacity-0">Add preference</button>
                {isFetching && <PacmanLoader className="m-3" color="green" />}
                {!isFetching && <button type="button" onClick={handleClick} disabled={isFetching} className="w-3/4 my-2 py-2 px-4 rounded-2xl bg-green-500 hover:opacity-60 text-m font-medium text-white disabled:opacity-0">Find meals!</button>
                }
            </form>
            <div className="px-4">
                <h2 className="font-bold text-xl mb-2 text-white">Your preferences:</h2>
                <ul className="grid grid-cols-2 grid-rows-auto gap-2">
                    {Array.from(preferences).map((preference, idx) => {
                        return <li key={idx} className="flex cursor-pointer justify-center p-1 bg-white rounded-md hover:bg-red-600" onClick={() => handleRemovePreference(preference)}>{preference}</li>
                    })}
                </ul>
            </div>
        </div>
    </section >)
}


export default MealPreferences;
