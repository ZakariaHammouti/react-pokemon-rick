import './App.css'
import NavigationBar from "./NavigationBar.tsx";
import {Route, Routes} from "react-router"
import {useState} from "react";
import PokemonPage from "./components/PokemonPage";
import RickAndMortyPage from "./components/RickAndMortyPage";
import RickAndMortyDetails from "./components/RickAndMortyDetails.tsx";
import PokemonDetails from "./components/PokemonDetails.tsx"
import Overview from "./components/Overview.tsx";
import PokemonFavorites from "./components/PokemonFavorits.tsx";
import RickAndMortyFavorites from "./components/RickAndMortyFavorits.tsx";

function App() {

    const [pokemonData, setPokemonData] = useState<any[]>([]);
    const [pokemonError, setPokemonError] = useState("");
    const [pokemonPage, setPokemonPage] = useState(1);
    const [pokemonLoading, setPokemonLoading] = useState(false);


    const [rickData, setRickData] = useState<any[]>([]);
    const [rickError, setRickError] = useState("");
    const [rickPage, setRickPage] = useState(1);
    const [rickLoading, setRickLoading] = useState(false);


    const [pokemonFavorites, setPokemonFavorites] = useState<any[]>([]);
    const [rickFavorites, setRickFavorites] = useState<any[]>([]);

    return (
        <>
            <NavigationBar/>

            <Routes>
                <Route path="/" element={<Overview/>}/>
                <Route
                    path="/pokemon"
                    element={
                        <PokemonPage
                            data={pokemonData}
                            setData={setPokemonData}
                            error={pokemonError}
                            setError={setPokemonError}
                            page={pokemonPage}
                            setPage={setPokemonPage}
                            loading={pokemonLoading}
                            setLoading={setPokemonLoading}
                        />
                    }
                />

                <Route
                    path="/rickandmorty"
                    element={
                        <RickAndMortyPage
                            data={rickData}
                            setData={setRickData}
                            error={rickError}
                            setError={setRickError}
                            page={rickPage}
                            setPage={setRickPage}
                            loading={rickLoading}
                            setLoading={setRickLoading}
                        />
                    }
                />

                <Route path={"/rickandmortydetails/:id"} element={<RickAndMortyDetails
                    rickFavorites={rickFavorites}
                    setRickFavorites={setRickFavorites}
                />
                }/>
                <Route path={"/pokemondetails/:id"} element={<PokemonDetails
                    pokemonFavorites={pokemonFavorites}
                    setPokemonFavorites={setPokemonFavorites}/>
                }/>
                <Route
                    path="/pokemonfavorites"
                    element={
                        <PokemonFavorites
                            pokemonFavorites={pokemonFavorites}
                            setPokemonFavorites={setPokemonFavorites}
                        />
                    }
                />

                <Route
                    path="/rickandmortyfavorites"
                    element={
                        <RickAndMortyFavorites
                            rickFavorites={rickFavorites}
                            setRickFavorites={setRickFavorites}
                        />
                    }
                />
            </Routes>
        </>
    )
}

export default App
