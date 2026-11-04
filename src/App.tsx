import { useEffect, useState } from "react";
import ListJeux from "../src/page/GameListPage.tsx";
import EnTete from "./components/Header.tsx";
import EnBas from "./components/Footer.tsx";

function App() {
  return (
    <>
      <EnTete />
      <main>
        <ListJeux />
      </main>
      <EnBas />
    </>
  );
}

export default App;
