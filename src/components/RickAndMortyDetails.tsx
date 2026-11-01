import {useLocation, useNavigate} from "react-router";
import "../styles/RickAndMorty.css";
import axios from "axios";

type Character = {
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    origin: {
        name: string;
    };
    location: {
        name: string;
    };
    image: string;
};

type RickAndMortyDetailsProps = {
    rickFavorites: any[];
    setRickFavorites: React.Dispatch<React.SetStateAction<any[]>>;
};

export default function RickAndMortyDetails({
                                                rickFavorites,
                                                setRickFavorites
                                            }: RickAndMortyDetailsProps) {

    const location = useLocation();
    const navigate = useNavigate();

    const character = location.state as Character | null;

    if (!character) {
        return (
            <section>
                <h2>Keine Charakterdaten vorhanden.</h2>
                <button onClick={() => navigate("/rickandmorty")}>
                    Zurück
                </button>
            </section>
        );
    }

    return (
        <main>
            <h2>{character.name}</h2>

            <img
                src={character.image}
                alt={character.name}
            />

            <section className="card-container">
                <article className="card">
                    <h3>Status</h3>
                    <p>{character.status}</p>
                </article>

                <article className="card">
                    <h3>Spezies</h3>
                    <p>{character.species}</p>
                </article>

                <article className="card">
                    <h3>Geschlecht</h3>
                    <p>{character.gender}</p>
                </article>

                <article className="card">
                    <h3>Herkunft</h3>
                    <p>{character.origin.name}</p>
                </article>

                <article className="card">
                    <h3>Aufenthaltsort</h3>
                    <p>{character.location.name}</p>
                </article>
                <article className="card">
                    <h3>Identifikation</h3>
                    <p>{character.id}</p>
                </article>
                <button className="details-button" onClick={() => navigate("/rickandmorty")}>
                    Zurück
                </button>
                <button
                    onClick={() => {
                        if (rickFavorites.some(
                            (item) => item.characterId === String(character.id)
                        )) {
                            return;
                        }

                        const favoriteData = {
                            characterId: String(character.id),
                            name: character.name,
                            status: character.status,
                            species: character.species,
                            gender: character.gender,
                            image: character.image
                        };

                        axios.post(
                            "http://localhost:8080/api/rick/collection",
                            favoriteData
                        )
                            .then((response) => {
                                console.log("Backend-Antwort:", response.data);
                                console.log("Charakter-ID:", character.id);
                                console.log("Rick-&-Morty-Favorit gespeichert:", response.data);
                                setRickFavorites((prev) => [...prev, response.data]);
                            })
                            .catch((error) => {
                                console.log("Fehler beim Speichern:", error);
                            });
                    }}
                >
                    {rickFavorites.some(
                        (item) => item.characterId === String(character.id)
                    )
                        ? "Bereits Favorit"
                        : "Als Favorit speichern"}
                </button>
            </section>
        </main>
    );
}

