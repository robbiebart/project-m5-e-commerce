import React from "react";
import styled from "styled-components";

import categories from "../assets/categories";
import Photos from "./Photos";

export default () => {
  return (
    <Wrapper>
      <Header>Shop by Category</Header>
      <GalleryWrapper>
        {categories.map(({ id, imageSrc, title }) => (
          <Photos key={id} imageSrc={imageSrc} title={title} />
        ))}
      </GalleryWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 10%;
  margin-bottom: 50px;
`

const GalleryWrapper = styled.div`
  display: grid;
  grid: auto / 1fr;
  gap: 30px 30px;
  width: 100%;

  @media (min-width: 768px) {
    grid: auto / repeat(2, 1fr);
  }

  @media (min-width: 1600px) {
    grid: auto / repeat(4, 1fr);
  }
`;

const Header = styled.h2`
  font-size: 32px;
  padding: 80px 0;
`