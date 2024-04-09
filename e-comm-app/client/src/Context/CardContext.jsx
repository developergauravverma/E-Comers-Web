import { createContext, useContext, useEffect, useState } from "react";

const CardContext = createContext();

const CardProvider = ({ children }) => {
  const [card, setCard] = useState([]);

  useEffect(() => {
    let cartItem = localStorage.getItem("cart");
    if (cartItem) {
      setCard(JSON.parse(cartItem));
    } else {
      setCard([]);
    }
  }, []);

  return (
    <CardContext.Provider value={[card, setCard]}>
      {children}
    </CardContext.Provider>
  );
};

const useCard = () => useContext(CardContext);

export { useCard, CardProvider };
