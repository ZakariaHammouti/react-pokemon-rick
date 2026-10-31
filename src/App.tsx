import './App.css'
import NavigationBar from "./NavigationBar.tsx";
import {Route, Routes} from "react-router";
import Overview from "./components/Overview.tsx"
import {useState} from "react";
import PokemonPage from "./components/PokemonPage";
import RickAndMortyPage from "./components/RickAndMortyPage";

function App() {

    const [pokemonData, setPokemonData] = useState<any[]>([]);
    const [pokemonError, setPokemonError] = useState("");
    const [pokemonPage, setPokemonPage] = useState(1);
    const [pokemonLoading, setPokemonLoading] = useState(false);


    const [rickData, setRickData] = useState<any[]>([]);
    const [rickError, setRickError] = useState("");
    const [rickPage, setRickPage] = useState(1);
    const [rickLoading, setRickLoading] = useState(false);

    return (
        <>
            <NavigationBar/>

            <Routes>
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

                <Route path={"/pokemondetails/:id"} element={<h2>Pokemon Details</h2>}/>
                <Route path={"/rickandmortydetails/:id"} element={<h2>Rick and Morty Details</h2>}/>
            </Routes>
        </>
    )
}

export default App
