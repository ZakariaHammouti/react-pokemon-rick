import {useState} from "react";
import axios from "axios";
import "../styles/CommonCard.css";

type RickAndMortyPageProps = {
    data: any[];
    setData: React.Dispatch<React.SetStateAction<any[]>>;
    error: string;
    setError: React.Dispatch<React.SetStateAction<string>>;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function RickAndMortyPage({
                                             data,
                                             setData,
                                             error,
                                             setError,
                                             page,
                                             setPage,
                                             loading,
                                             setLoading
                                         }: RickAndMortyPageProps) {

    function loadRickAndMorty(page: number) {
        setLoading(true);
        setError("");

        axios.get(
            `https://rickandmortyapi.com/api/character?page=${page}`
        )
            .then((response) => {
                setData(response.data.results);
            })
            .catch(() => {
                setData([]);
                setError("Keine Charaktere gefunden.");
            }).finally(() => {
            setLoading(false);
        });
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        loadRickAndMorty(page);
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
            {loading && <h2>Character werden geladen...</h2>}

            {!loading && (
                <section className="card-container">
                    {data.map((item) => (
                        <article className="card" key={item.id}>
                            <h3>{item.name}</h3>
                            <img src={item.image} alt={item.name} loading="lazy"/>
                        </article>
                    ))}
                </section>
            )}
        </>
    );
}
