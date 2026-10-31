import {useLocation, useNavigate} from "react-router";

import "../styles/PokemonPage.css";

type Pokemon = {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: {
        front_default: string;
        other: {
            "official-artwork": {
                front_default: string;
            };
        };
    };
    types: {
        type: {
            name: string;
        };
    }[];
};

type PokemonDetailsProps = {
    pokemonFavorites: any[];
    setPokemonFavorites: React.Dispatch<React.SetStateAction<any[]>>;
};

export default function PokemonDetails({
                                           pokemonFavorites,
                                           setPokemonFavorites
                                       }: PokemonDetailsProps) {

    const location = useLocation();
    const navigate = useNavigate();

    const pokemon = location.state as Pokemon | null;

    if (!pokemon) {
        return (
            <section>
                <h2>Keine Pokemon-Daten vorhanden.</h2>
                <button onClick={() => navigate("/pokemon")}>
                    Zurück
                </button>
            </section>
        );
    }

    return (
        <main className="pokemon-details">


            <h2>{pokemon.name}</h2>

            <img
                src={pokemon.sprites.other["official-artwork"].front_default}
                alt={pokemon.name}
            />
            <section className="card-container">
                <article className="card">
                    <h3>ID</h3>
                    <p>{pokemon.id}</p>
                </article>

                <article className="card">
                    <h3>Größe</h3>
                    <p>{pokemon.height}</p>
                </article>

                <article className="card">
                    <h3>Gewicht</h3>
                    <p>{pokemon.weight}</p>
                </article>

                <article className="card">
                    <h3>Typen</h3>
                    <p>{pokemon.types.map(item => item.type.name).join(", ")}</p>
                </article>
                <button
                    className="back-button"
                    onClick={() => navigate("/pokemon")}
                >
                    Zurück
                </button>
                <button
                    onClick={() => {
                        setPokemonFavorites((prev) => {
                            if (prev.some((item) => item.id === pokemon.id)) {
                                return prev;
                            }

                            return [...prev, pokemon];
                        });
                    }}
                >
                    {pokemonFavorites.some((item) => item.id === pokemon.id)
                        ? "Bereits Favorit"
                        : "Als Favorit speichern"}
                </button>
            </section>
        </main>
    );
}
