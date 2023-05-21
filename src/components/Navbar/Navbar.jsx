import { useContext } from "react";
import { PokemonContext } from "../../context/PokemonContext";
import "./Navbar.css";

export const Navbar = () => {
  const { nextPage, prevPage, pokemonToSearch, findPokemon } =
    useContext(PokemonContext);

  return (
    <>
      <button onClick={prevPage}>Prev Page</button>
      <input
        type="text"
        id="search"
        name="search"
        placeholder="search pokemons"
        value={pokemonToSearch}
        onChange={findPokemon}
      />
      <button onClick={nextPage}>Next Page</button>
    </>
  );
};
