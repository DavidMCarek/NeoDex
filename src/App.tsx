import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PokemonList from "./pages/PokemonList";
import PokemonDetail from "./pages/PokemonDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
