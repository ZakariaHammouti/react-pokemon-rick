import {useState} from "react";
import axios from "axios";
import "../styles/PokemonPage.css";
import {useLocation, useNavigate} from "react-router";

type PokemonPageProps = {
    data: any[];
    setData: React.Dispatch<React.SetStateAction<any[]>>;

    error: string;
    setError: React.Dispatch<React.SetStateAction<string>>;

    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;

    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PokemonPage({
                                        data,
                                        setData,
                                        error,
                                        setError,
                                        page,
                                        setPage,
                                        loading,
                                        setLoading
                                    }: PokemonPageProps) {

    const navigate = useNavigate();

    async function loadPokemon(page: number) {
        const limit = 20;
        const offset = (page - 1) * limit;
        setLoading(true);
        setError("");

        const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );

        const details = await Promise.all(
            response.data.results.map(async (pokemon: { url: string }) => {
                const result = await axios.get(pokemon.url);
                return result.data;
            })
        ).finally(() => {
            setLoading(false);
        });

        if (details.length === 0) {
            setData([]);
            setError("Keine Pokemon gefunden.");
        } else {
            setData(details);
        }
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        loadPokemon(page).catch(() => {
            setData([]);
            setError("Fehler beim Laden der Pokémon.");
        });
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    min="1"
                    value={page}
                    onChange={(event) => setPage(Number(event.target.value))}
                />
                <button type="submit">Load Page</button>
            </form>

            {error && <h1>{error}</h1>}
            {loading && <h2>Pokemon werden geladen...</h2>}

            {!loading && (
                <section className="card-container">
                    {data.map((item) => (
                        <article className="card" key={item.id}>
                            <h3>{item.name}</h3>
                            <img className={"pokemon-image"}
                                 src={item.sprites.other["official-artwork"].front_default}
                                 alt={item.name}
                            />
                            <button
                                className="details-button"
                                onClick={() =>
                                    navigate(`/pokemondetails/${item.id}`, {
                                        state: item
                                    })}
                            >
                                More Details
                            </button>
                        </article>
                    ))}
                </section>
            )}
        </>
    );
}
