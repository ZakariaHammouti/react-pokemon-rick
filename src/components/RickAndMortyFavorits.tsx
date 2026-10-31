type RickFavoritesProps = {
    rickFavorites: any[];
    setRickFavorites: React.Dispatch<React.SetStateAction<any[]>>;
};

export default function RickAndMortyFavorites({
                                                  rickFavorites,
                                                  setRickFavorites
                                              }: RickFavoritesProps) {

    return (
        <main>
            <h2>Meine Rick-and-Morty-Favoriten</h2>

            <section className="card-container">
                {rickFavorites.map((item) => (
                    <article className="card" key={item.id}>
                        <h3>{item.name}</h3>

                        <img
                            src={item.image}
                            alt={item.name}
                        />
                        <button
                            onClick={() => {
                                setRickFavorites((prev) =>
                                    prev.filter((character) => character.id !== item.id)
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