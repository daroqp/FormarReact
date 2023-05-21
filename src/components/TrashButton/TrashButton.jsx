import { useContext } from "react";
import { PokemonContext } from "../../context/PokemonContext";
import "./TrashButton.css";

export const TrashButton = () => {
  const { pokemonsSelected, deletePokemons } = useContext(PokemonContext);

  const style =
    pokemonsSelected.length === 0
      ? { visibility: "hidden" }
      : { visibility: "visible" };

  return (
    <button className="btn-trash" style={style} onClick={deletePokemons}>
      <div className="icon-trash">
        <div className="trash-lid"></div>
        <div className="trash-container"></div>
        <div className="trash-line-1"></div>
        <div className="trash-line-2"></div>
        <div className="trash-line-3"></div>
      </div>
    </button>
  );
};
