import axios from "axios";
import '../styles/PokemonPage.css'

type PokemonFavoritesProps = {
    pokemonFavorites: any[];
    setPokemonFavorites: React.Dispatch<React.SetStateAction<any[]>>;
};

export default function PokemonFavorites({
                                             pokemonFavorites,
                                             setPokemonFavorites
                                         }: PokemonFavoritesProps) {

    //Mit filter wird eime neue Liste gesetzt. nur pokemon.id === item.id ist nicht drin
    //Alle andere erfüllen diesen Bbedingung pokemon.id !== item.id und werden in der Liste gesetzt
    return (
        <main>
            <h2>Meine Pokemon-Favoriten</h2>

            <section className="card-container">
                {pokemonFavorites.map((item) => (
                    <article className="card" key={item.id}>
                        <h3>{item.nickname}</h3>

                        <img className="pokemon-image"
                             src={item.pictureUrl}
                             alt={item.pokemonName}
                        />

                        <p>Name: {item.pokemonName}</p>
                        <p>Größe: {item.height}</p>
                        <p>Gewicht: {item.weight}</p>
                        <p>Typen: {item.types.join(", ")}</p>

                        <button
                            onClick={() => {
                                axios.delete(`http://localhost:8080/api/collection/${item.id}`)
                                    .then(() => {
                                        setPokemonFavorites((prev) =>
                                            prev.filter((pokemon) => pokemon.id !== item.id)
                                        );
                                    })
                                    .catch((error) => {
                                        console.log("Fehler beim Löschen:", error);
                                    });
                            }}
                        >
                            Aus Favoriten entfernen
                        </button>
                    </article>
                ))}
            </section>
        </main>
    );
}