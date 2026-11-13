import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ListJeux from "./page/GameListPage.tsx";
import GameDetailPage from "./page/GameDetailPage.tsx";
import EnTete from "./components/Header.tsx";
import EnBas from "./components/Footer.tsx";
import MainPage from "./components/MainPage.tsx";

function App() {
  return (
    <>
      <EnTete />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <MainPage />
                <ListJeux />
              </>
            }
          />
          <Route path="/jeu/:slug" element={<GameDetailPage />} />
        </Routes>
      </main>
      <EnBas />
    </>
  );
}

export default App;
