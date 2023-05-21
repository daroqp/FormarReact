import {
  GET_POKEMONS,
  NEXT_PAGE,
  PREV_PAGE,
  FIND_POKEMON,
  SELECT_POKEMON,
  DELETE_POKEMONS,
} from "./types";

export const PokemonReducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: payload,
      };
    case NEXT_PAGE:
      return {
        ...state,
        currentPage: payload,
      };
    case PREV_PAGE:
      return {
        ...state,
        currentPage: payload,
      };
    case FIND_POKEMON:
      return {
        ...state,
        currentPage: payload.resetPage,
        pokemonToSearch: payload.pokemonSearch,
      };
    case SELECT_POKEMON:
      return {
        ...state,
        pokemonsSelected: payload,
      };
    case DELETE_POKEMONS:
      return {
        ...state,
        pokemons: payload,
        pokemonsSelected: [],
      };
    default:
      return state;
  }
};
