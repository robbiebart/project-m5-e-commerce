import React from "react";
import styled from "styled-components";

export default function ComparePrice(store, price, multiplier) {
  const basePrice = Number(price.slice(1));
  const storePrice = (basePrice * multiplier).toFixed(2);

  return (
    <PriceDiv>
      <PriceColour store={store}>$ {storePrice}</PriceColour>
      <p>{store} Price</p>
    </PriceDiv>
  );
}

const PriceDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PriceColour = styled.p`
  color: ${(p) => (p.store === "ARK" ? "black" : "gray")};
`;
