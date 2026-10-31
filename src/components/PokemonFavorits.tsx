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
                        <h3>{item.name}</h3>

                        <img
                            src={item.sprites.other["official-artwork"].front_default}
                            alt={item.name}
                        />
                        <button
                            onClick={() => {
                                setPokemonFavorites((prev) =>
                                    prev.filter((pokemon) => pokemon.id !== item.id)
                                );
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