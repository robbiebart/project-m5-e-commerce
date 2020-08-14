import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaOpencart } from "react-icons/fa";

import { useShopContext } from "../context/ShopContext";
import { STATUS, removeItemFromCart } from "../context/actions";

export default () => {
  const { state, dispatch } = useShopContext();
  const { status, cart } = state;

  console.log("cart", cart);

  // expecting input "$24.99"
  const priceStrToNumber = (priceStr) => Number(priceStr.slice(1));

  // Sum up the cart total
  const cartReducer = (total, item) => total + priceStrToNumber(item.price);
  const cartTotal = cart.reduce(cartReducer, 0).toFixed(2);

  // Dispatch action to remove item from state.cart
  const handleRemoveItem = (productId) =>
    dispatch(removeItemFromCart(productId));

  return (
    <>
      {cart.length > 0 && status === STATUS.IDLE ? (
        <MainWrapper>
          <Wrapper>
            <Header>Shopping Cart</Header>
            <ProductDetails>
              <Head>{cart.length > 1 ? "PRODUCTS" : "PRODUCT"}</Head>
              <Quantity>
                <Head>QUANTITY</Head>
                <Head>PRICE</Head>
                <Head>TOTAL</Head>
              </Quantity>
            </ProductDetails>

            <ItemList>
              {cart.map((item) => {
                return (
                  <ItemLi key={item.id}>
                    <ItemWrapper>
                      <Product>
                        <Img src={item.imageSrc} />
                        <ProductList>
                          <ProductName>{item.name}</ProductName>
                          <ProductId>Id:{item.id}</ProductId>
                        </ProductList>
                      </Product>
                      <Quantity>
                        <ItemQuant>
                          <select>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </select>
                          <Btn onClick={() => handleRemoveItem(item.id)}>
                            Remove
                          </Btn>
                        </ItemQuant>
                        <ItemPrice>{item.price}</ItemPrice>
                        <ItemTotal>
                          ${priceStrToNumber(item.price) * 1}
                        </ItemTotal>
                      </Quantity>
                    </ItemWrapper>
                  </ItemLi>
                );
              })}
            </ItemList>

            <Link to="/products" style={{ color: "black" }}>
              <Btn>Continue Shopping</Btn>
            </Link>
          </Wrapper>
          <Card>
            <CardHeading>Order Summary</CardHeading>
            <CardOrder>
              <span>Items:</span>
              <span>{cart.length}</span>
            </CardOrder>
            <CardTotal>
              <span>Total:</span>
              <span>${cartTotal}</span>
            </CardTotal>
            <CardBtn>Checkout</CardBtn>
          </Card>
        </MainWrapper>
      ) : (
        <EmptyDiv>
          <Empty href="/products">
            Your <FaOpencart style={{ margin: "0rem 1rem" }} /> Is Empty
          </Empty>
        </EmptyDiv>
      )}
    </>
  );
};

const EmptyDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-weight: bold;
  font-size: 2rem;
`;

const Empty = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  height: 5rem;
  width: 20rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

const MainWrapper = styled.div`
  display: grid;
  grid-template-areas: "content content card";
  margin: 10rem 10vw;

  @media (max-width: 1100px) {
    grid-template-areas:
      "content"
      "card";
  }
`;

const Wrapper = styled.div`
  grid-area: content;
  margin-right: 5rem;
  width: auto;
  border-radius: 0.5rem;

  @media (max-width: 1100px) {
    margin-right: 0;
    margin-bottom: 5rem;
  }
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Head = styled.span`
  font-size: 1rem;
  margin: 1.2rem;
`;

const Header = styled.div`
  padding: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  border-bottom: thin solid grey;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: thin solid grey;
`;

const Quantity = styled.span`
  display: flex;
  flex-direction: row;
`;

const Img = styled.img`
  margin: 1.5rem;
`;

const Product = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
`;

const ItemList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: thin solid grey;
  border-bottom: thin grey solid;
`;

const ItemLi = styled.li`
  display: flex;
  flex-direction: row;
`;

const ItemQuant = styled.span`
  display: flex;
  flex-direction: column;
  margin: 1.5rem;
`;

const ItemPrice = styled.span`
  margin: 1.5rem;
`;

const ItemTotal = styled.span`
  margin: 1.5rem;
`;

const ProductList = styled.div`
  display: grid;
  grid-auto-columns: 10rem;
  margin: 1.5rem;
`;

const ProductName = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;

const ProductId = styled.div``;

const Btn = styled.button`
  &:hover {
    color: white;
  }
`;

const Card = styled.div`
  grid-area: card;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: sticky;
  top: 17rem;
  height: 25rem;
  width: 20rem;
  padding: 1rem;
  background-color: #d1d9e0;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 1100px) {
    position: relative;
    top: 0;
    height: 15rem;
    margin: 0 auto;
  }
`;

const CardHeading = styled.span`
  font-weight: bold;
  font-size: 1.5rem;
  border-bottom: solid thin grey;
`;

const CardOrder = styled.span`
  font-size: 1.5rem;
  display: flex;
  justify-content: space-between;
`;

const CardTotal = styled.span`
  font-size: 1.5rem;
  display: flex;
  justify-content: space-between;
`;

const CardBtn = styled.button`
  font-size: 1.1rem;
  background-color: black;
  color: white;
`;
