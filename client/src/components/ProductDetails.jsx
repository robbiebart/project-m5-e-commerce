import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { starFull } from "react-icons-kit/icomoon/starFull";
import { starHalf } from "react-icons-kit/icomoon/starHalf";
import styled, { css } from "styled-components";

import { useShopContext } from "../context/ShopContext";
import { addItemToCart } from "../context/actions";
import ComparePrice from "./ComparePrice";
import { checkAvailability } from "./Product";

export default () => {
  const { dispatch } = useShopContext();
  const [item, setItem] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    fetch(`/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
      });
  }, [productId]);

  console.log(item, productId);

  return (
    <>
      {item && (
        <GridWrapper>
          <Image src={item.imageSrc} alt={item.name} />

          <NameReviewDiv>
            <NameReviewContent>
              <ProductName>{item.name}</ProductName>
              <Reviews>
                <div>
                  <Icon icon={starFull} />
                  <Icon icon={starFull} />
                  <Icon icon={starFull} />
                  <Icon icon={starFull} />
                  <Icon icon={starHalf} />
                </div>
                See Reviews
              </Reviews>
            </NameReviewContent>
            <NameReviewBottomFiller />
          </NameReviewDiv>

          <ColoursSizes>
            <Sizes disabled={true}>Small</Sizes>
            <Sizes disabled={true}>Medium</Sizes>
            <Sizes>Large</Sizes>
          </ColoursSizes>

          <AddToCart>
            <>{ComparePrice("ARK", item.price, 1)}</>
            <AddToCartBtn onClick={() => dispatch(addItemToCart(item.id))}>
              Add to Cart
            </AddToCartBtn>
            <Availability
              available={checkAvailability(item.numInStock).available}
            >
              {checkAvailability(item.numInStock).availability}
            </Availability>
          </AddToCart>

          <PriceComparison>
            <PriceComparisonContent>
              {ComparePrice("ARK", item.price, 1)}
              {ComparePrice("Amazon", item.price, 1.3)}
              {ComparePrice("Ebay", item.price, 1.5)}
            </PriceComparisonContent>
            <PriceComparisonFiller />
          </PriceComparison>

          <LoremDiv>
            <h1>Lorem ipsum dolor</h1>{" "}
            <>
              sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum. sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
              occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur.
            </>
          </LoremDiv>
        </GridWrapper>
      )}
    </>
  );
};

const ProductName = styled.p`
  padding: 5px 10px;
  font-size: 16px;
  font-weight: 600;
`;

const Availability = styled.p`
  padding: 5px;
  font-size: 20px;
  color: ${(p) => (p.available ? "green" : "gray")};
`;

const AddToCartBtn = styled.button`
  width: 120px;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background: green;
  }

  ${(p) =>
    p.disabled &&
    css`
      &:hover {
        background: none;
        cursor: not-allowed;
        color: #ccc;
      }
    `}
`;

const Image = styled.img`
  grid-row-start: row1-start;
  width: 310px;
  grid-row-start: row1;

  @media (min-width: 768px) {
  }
`;

const NameReviewDiv = styled.div`
  -webkit-box-shadow: 0px 13px 23px -5px rgba(161, 161, 161, 1);
  -moz-box-shadow: 0px 13px 23px -5px rgba(161, 161, 161, 1);
  box-shadow: 0px 13px 23px -5px rgba(161, 161, 161, 1);
  border-radius: 8px;
  margin: 0px 0px 20px 0px;
  width: 90%;
  grid-row-start: row1-end;
  grid-row-end: second-line;

  @media (min-width: 768px) {
    grid-column-start: 2;
    grid-row-start: row1;
    grid-row-end: row1-end;
    margin: 10px;
  }
`;

const NameReviewContent = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const Reviews = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 90%;
  justify-items: center;
  margin: 5px;
`;

const NameReviewBottomFiller = styled.div`
  border-radius: 0px 0px 8px 8px;
  width: 100%;
  height: 23%;
  background-color: #dee0df;
`;

const ColoursSizes = styled.div`
  grid-row-start: second-line;
  grid-row-end: third-line;
  width: 90%;
  display: grid;

  @media (min-width: 768px) {
    grid-column-start: 2;
    grid-row-start: row1-end;
    grid-row-end: second-line;
  }
`;

const Sizes = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30%;
  margin: 0px;
  padding: 20px;

  ${(props) =>
    props.disabled
      ? `
          color: black;
          background-color: #dee0df;
        `
      : `
          color: black;
          background-color: white
        `};
`;

const AddToCart = styled.div`
  grid-row-start: third-line;
  grid-row-end: fourth-line;
  padding: 5px;
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    grid-column-start: 2;
    grid-row-start: second-line;
    grid-row-end: span 1;
  }
`;

const PriceComparison = styled.div`
  grid-row-start: fourth-line;
  grid-row-end: fifth-line;
  -webkit-box-shadow: 0px 13px 23px -5px rgba(161, 161, 161, 1);
  -moz-box-shadow: 0px 13px 23px -5px rgba(161, 161, 161, 1);
  box-shadow: 0px 13px 23px -5px rgba(161, 161, 161, 1);
  border-radius: 8px;
  width: 90%;

  @media (min-width: 768px) {
    grid-column-start: 2;
    grid-row-start: third-line;
    grid-row-end: fourth-line;
  }
`;

const PriceComparisonContent = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const PriceComparisonFiller = styled.div`
  border-radius: 0px 0px 8px 8px;
  width: 100%;
  height: 28%;
  background-color: #dee0df;
`;

const LoremDiv = styled.div`
  grid-row-start: fifth-line;
  grid-row-end: last-line;
  padding: 10px;

  h1 {
    padding: 5px 0px 5px;
  }

  @media (min-width: 768px) {
    grid-column-start: 1;
    grid-row-start: third-line;
    grid-row-end: last-line;
    border-top: 1px solid lightgrey;
  }
`;

const GridWrapper = styled.div`
  display: grid;
  grid: auto / 1fr;
  grid-template-columns: 1fr;
  grid-template-rows: [row1-start] 450px [row1-end] 100px [second-line] 200px [third-line] 100px [fourth-line] 100px [fifth-line] auto [last-line];
  gap: 20px 50px;
  padding: 30px;
  margin: 30px;
  justify-items: center;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: [row1-start] 130px [row1-end] 200px [second-line] 100px [third-line] 150px [fourth-line]auto [last-line];
  }
`;
