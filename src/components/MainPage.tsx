import React, { useState, useEffect } from "react";
import "../styles/mainhead.css";
import { useSearchParams } from "react-router-dom";
import ListSuggestions from "./ListeSuggestions";
import type { Jeu } from "../types/jeu";
import { getJeux } from "../services/jeuxService";

export default function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [indexActif, setIndexActif] = useState(-1);

  const [jeux, setJeux] = useState<Jeu[]>([]);
  useEffect(() => {
    getJeux().then((data) => setJeux(data));
  }, []);

  const handleSearchChange = (e: any) => {
    const value = e.target.value;
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }
      params.set("page", "1");
      return params;
    });
  };

  const suggestions = jeux
    .filter((jeu) =>
      jeu.title.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .slice(0, 6);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndexActif((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndexActif((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter" && indexActif >= 0) {
      const jeu = suggestions[indexActif];
      setSearchParams({ search: jeu.title, page: "1" });
      setIndexActif(-1);
    } else if (e.key === "Escape") {
      setIndexActif(-1);
    }
  };

  return (
    <div className="search-bar-container">
      <div className="search-wrapper">
        <input
          className="nav-bar-input"
          placeholder="Counter strike..."
          type="text"
          name="search"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />

        <ListSuggestions
          recherche={searchQuery}
          suggestions={suggestions}
          indexActif={indexActif}
        />
      </div>
    </div>
  );
}
