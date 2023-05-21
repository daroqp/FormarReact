/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { useContext } from "react";
import { PokemonContext } from "../../context/PokemonContext";
import "./Card.css";

export const Card = ({ name, sprite, weight, abilities, style }) => {
  const { selectPokemon } = useContext(PokemonContext);

  return (
    <div className="card" style={style} onClick={selectPokemon} id={name}>
      <div>
        <img src={sprite} width={200} height={200} />
      </div>
      <div className="card-text">
        <h1>{name}</h1>
        <h2>Weight: {weight}</h2>
        <ul>
          Abilities:
          {abilities.map((element, id) => {
            return <li key={id}>{element.ability.name}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

Card.prototype = {
  name: PropTypes.string,
  sprite: PropTypes.string,
  weight: PropTypes.number,
  abilities: PropTypes.array,
  style: PropTypes.object,
};
