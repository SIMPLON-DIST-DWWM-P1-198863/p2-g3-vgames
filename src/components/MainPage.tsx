import React, { useState } from "react";
import "../styles/mainhead.css";
import { useSearchParams } from "react-router-dom";

export default function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

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

  return (
    <div className="search-bar-container">
      <input
        className="nav-bar-input"
        placeholder="Counter strike..."
        type="text"
        name="search"
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </div>
  );
}
