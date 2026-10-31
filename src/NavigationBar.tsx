import {NavLink} from "react-router";

type CardProps = {
    id: number,
    name: string,
    imageUrl: string
}

export default function NavigationBar() {
    return (
        <nav>
            <NavLink to={"/"}>Overview</NavLink>
            <NavLink to={"/pokemon"}>Pokemon</NavLink>
            <NavLink to={"/rickandmorty"}>RickAndMorty</NavLink>
            <NavLink to={"/pokemondetails/:id"}>Pokemon Details</NavLink>
            <NavLink to={"/rickandmortydetails/:id"}>RickAndMorty Details</NavLink>
        </nav>
    )
}
