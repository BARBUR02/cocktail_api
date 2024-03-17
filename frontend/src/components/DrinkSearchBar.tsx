import { PacmanLoader } from "react-spinners";

interface DrinkSearchBarProps {
    handleSearch: (cocktail: string) => void;
    isFetching: boolean
}

const DrinkSearchBar = ({ handleSearch, isFetching }: DrinkSearchBarProps) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);
        const cocktail = formData.get("cocktail") as string;
        handleSearch(cocktail)
    }

    return (<form onSubmit={handleSubmit} className="flex m-8 justify-center">
        <input name="cocktail" type="text" placeholder="desired drink" className="w-2/5 px-2 py-1 outline-none rounded-xl" />
        {isFetching && <PacmanLoader className="mx-4 " color="green" />}
        {!isFetching && <button type="submit" disabled={isFetching} className="mx-6 py-2 px-4 rounded-lg bg-green-700 hover:opacity-60 text-m font-medium text-white disabled:opacity-0">Search</button>
        }
    </form>)
}


export default DrinkSearchBar;
