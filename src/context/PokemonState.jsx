/* eslint-disable react/prop-types */
import { useReducer } from "react";
import { PokemonContext } from "./PokemonContext";
import { PokemonReducer } from "./PokemonReducer";

const POKEMON_PER_PAGE = 8;

export const PokemonState = (props) => {
  const initialState = {
    pokemons: [],
    pokemonsSelected: [],
    currentPage: 0,
    pokemonToSearch: "",
  };

  const [state, dispatch] = useReducer(PokemonReducer, initialState);

  const getPokemons = async () => {
    async function fetchData() {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=200");
      const parseRes = await res.json();

      const arrData = parseRes.results.map((item) => {
        return fetch(item.url).then((resp) => resp.json());
      });

      return Promise.all(arrData);
    }

    const parseRes = await fetchData();

    dispatch({
      type: "GET_POKEMONS",
      payload: parseRes,
    });
  };

  const nextPage = () => {
    let { currentPage, pokemons, pokemonToSearch } = state;
    if (
      pokemons.filter((poke) => poke.name.includes(pokemonToSearch)).length >
      currentPage + POKEMON_PER_PAGE
    )
      currentPage += POKEMON_PER_PAGE;

    dispatch({
      type: "NEXT_PAGE",
      payload: currentPage,
    });
  };

  const prevPage = () => {
    let { currentPage } = state;
    if (currentPage > 0) {
      currentPage -= POKEMON_PER_PAGE;
    }

    dispatch({
      type: "PREV_PAGE",
      payload: currentPage,
    });
  };

  const findPokemon = ({ target }) => {
    const resetPage = 0;
    const pokemonSearch = target.value;

    dispatch({
      type: "FIND_POKEMON",
      payload: {
        resetPage,
        pokemonSearch,
      },
    });
  };

  const selectPokemon = ({ currentTarget }) => {
    const pokemonSelected = currentTarget.id;
    const selecteds = [...state.pokemonsSelected];
    const hasPokemonSelected = selecteds.includes(pokemonSelected);

    if (!hasPokemonSelected) {
      selecteds.push(pokemonSelected);
    } else {
      const id = selecteds.indexOf(pokemonSelected);
      selecteds.splice(id, 1);
    }

    dispatch({
      type: "SELECT_POKEMON",
      payload: selecteds,
    });
  };

  const deletePokemons = () => {
    const { pokemons } = state;
    const { pokemonsSelected } = state;

    const unselectPokemons = pokemons.filter((pokemon) => {
      const hasPokemonSelected = pokemonsSelected.includes(pokemon.name);
      return !hasPokemonSelected;
    });

    dispatch({
      type: "DELETE_POKEMONS",
      payload: unselectPokemons,
    });
  };

  return (
    <PokemonContext.Provider
      value={{
        pokemons: state.pokemons,
        currentPage: state.currentPage,
        pokemonToSearch: state.pokemonToSearch,
        pokemonsSelected: state.pokemonsSelected,
        getPokemons,
        nextPage,
        prevPage,
        findPokemon,
        selectPokemon,
        deletePokemons,
      }}
    >
      {props.children}
    </PokemonContext.Provider>
  );
};
