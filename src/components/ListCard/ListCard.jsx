/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { PokemonContext } from "../../context/PokemonContext";
import { Card } from "../Card/Card";
import "./ListCard.css";

const POKEMON_PER_PAGE = 8;

export const ListCard = () => {
  const {
    getPokemons,
    pokemons,
    currentPage,
    pokemonToSearch,
    pokemonsSelected,
  } = useContext(PokemonContext);

  useEffect(() => {
    getPokemons();
  }, []);

  const filterPokemonPerPage = () => {
    if (pokemonToSearch.length === 0) {
      return pokemons.slice(currentPage, currentPage + POKEMON_PER_PAGE);
    }

    const filteredByName = pokemons.filter((pokemon) =>
      pokemon.name.includes(pokemonToSearch)
    );
    return filteredByName.slice(currentPage, currentPage + POKEMON_PER_PAGE);
  };

  return (
    <div className="cardBox">
      {filterPokemonPerPage().map((pokemon, i) => {
        const style = pokemonsSelected.includes(pokemon.name)
          ? { borderColor: "#e91e63" }
          : { borderColor: "#2cc755" };
        return (
          <Card
            key={i}
            name={pokemon.name}
            sprite={pokemon.sprites.front_shiny}
            weight={pokemon.weight}
            abilities={pokemon.abilities}
            style={style}
          />
        );
      })}
    </div>
  );
};
