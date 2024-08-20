"use client";

import React, { useState, useEffect } from "react";
import { OrbitProgress } from "react-loading-indicators";

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [data, setData] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && search.includes(":")) {
      const [key, value] = search.split(":");
      setFilters((prevFilters) => ({
        ...prevFilters,
        [key.trim()]: value.trim(),
      }));
      setSearch("");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/data" + `?${new URLSearchParams(filters).toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setInterval(() => {
          setIsLoading(false);
        }, 1000);
      });
  }, [filters]);

  return (
    <main className="container mx-auto p-4">
      <section className="w-full mb-5">
        <div className="w-full relative p-4 border-2 border-gray-400 rounded-lg mb-2">
          <input
            type="text"
            placeholder="Search by key:value"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full pr-4 border-none rounded-lg outline-none focus:outline-none"
          />
          <i className="ri-search-2-line text-gray-600 text-[20px] absolute right-2 top-1/2 -translate-y-1/2"></i>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {Object.entries(filters).map(([key, value]) => (
            <div
              key={key}
              className="p-4 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              {key} : {value}
            </div>
          ))}
        </div>
      </section>
      <section className="flex items-center flex-wrap w-full mx-auto gap-3 justify-center">
        {isLoading ? (
          <div className="w-full flex items-center justify-center">
            <OrbitProgress
              variant="spokes"
              color="#1f2a37"
              size="medium"
              text=""
              textColor=""
            />
          </div>
        ) : (
          data.results?.length > 0 &&
          data.results.map((item) => (
            <div
              key={item.id}
              className="max-w-[300px] rounded-lg shadow bg-gray-800 border-gray-700"
            >
              <img className="rounded-t-lg" src={item.image} alt={item.name} />
              <div className="p-5">
                <h5
                  className="mb-2 text-2xl font-bold tracking-tight text-white truncate"
                  title={item.name}
                >
                  {item.name}
                </h5>
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
