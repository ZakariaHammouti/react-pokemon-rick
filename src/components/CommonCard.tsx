import {useState} from "react";
import axios from "axios";
import '../styles/CommonCard.css'

type CommonCardProps = {
    type: "pokemon" | "rick";
    data: any[];
    setData: React.Dispatch<React.SetStateAction<any[]>>;
};

export default function CommonCard({type, data, setData}: CommonCardProps) {
    const [page, setPage] = useState(1);
    const [error, setError] = useState("");

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log(type);
        if (type === "pokemon") {
            await loadPokemon(page);
        } else if (type === "rick") {
            loadRickAndMorty(page);
        }
    }

    async function loadPokemon(page: number) {
        // Hier kommt Axios-Logik hin
        console.log("loadPokemon");
        const limit = 20;
        const offset = (page - 1) * limit;

        const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );

        const details = await Promise.all(
            response.data.results.map(async (pokemon: { url: string }) => {
                const result = await axios.get(pokemon.url);
                return result.data;
            })
        );

        if (details.length === 0) {
            setData([]);
            setError("Keine Elemente gefunden.");
        } else {
            setData(details);
            setError("");
        }
    }

    function loadRickAndMorty(page: number) {
        console.log("loadRickAndMorty");

        axios.get(`https://rickandmortyapi.com/api/character?page=${page}`)
            .then((response) => {
                setError("");
                setData(response.data.results);
            })
            .catch(() => {
                setData([]);
                setError("Keine Elemente gefunden.");
            });
    }

    return (
        <>

            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    value={page}
                    onChange={(event) => setPage(Number(event.target.value))}
                />
                <button>Load Page</button>
            </form>
            {error && <h1>{error}</h1>}
            <section className="card-container">
                {data.map((item) => (
                    <article className="card" key={item.id}>
                        <h3>{item.name}</h3>

                        <img
                            src={
                                type === "pokemon"
                                    ? item.sprites.other["official-artwork"].front_default
                                    : item.image
                            }
                            alt={item.name}
                        />
                    </article>
                ))}
            </section>
        </>
    )
}