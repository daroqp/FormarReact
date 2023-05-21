import { ListCard } from "./components/ListCard/ListCard";
import { PokemonState } from "./context/PokemonState";
import { Navbar } from "./components/Navbar/Navbar";
import { TrashButton } from "./components/TrashButton/TrashButton";
import "./App.css";

function App() {
  return (
    <>
      <h1> Pokedex </h1>
      <PokemonState>
        <Navbar />
        <ListCard />
        <TrashButton />
      </PokemonState>
    </>
  );
}

export default App;
