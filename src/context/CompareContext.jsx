import { createContext, useContext, useState, useEffect } from "react";

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  // Carica dal localStorage all'avvio
  const [compareList, setCompareList] = useState(() => {
    const saved = localStorage.getItem("compareList");
    return saved ? JSON.parse(saved) : [];
  });

  // Salva ogni volta che compareList cambia
  useEffect(() => {
    localStorage.setItem("compareList", JSON.stringify(compareList));
  }, [compareList]);

  const addToCompare = (product) => {
    setCompareList((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev;
      return prev.length < 3 ? [...prev, product] : prev;
    });
  };

  const removeFromCompare = (productId) => {
    setCompareList((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  return (
    <CompareContext.Provider
      value={{ compareList, addToCompare, removeFromCompare, clearCompare }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);
