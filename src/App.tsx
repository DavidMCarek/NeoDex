import { BrowserRouter, Route, Routes } from "react-router-dom";
import PokemonList from "./pages/PokemonList";
import PokemonDetail from "./pages/PokemonDetail";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PokemonList />} />
          <Route path="/dex/:page" element={<PokemonList />} />
          <Route path="/pokemon/:name" element={<PokemonDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
