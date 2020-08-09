import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default () => {
  return (
    <Wrapper>
      <StyledLink to="/">
        <h2>THE ARK PROJECT</h2>
      </StyledLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const StyledLink = styled(Link)`
  color: #eee;
  &:active {
    color: #eee;
  }
  &:visited {
    color: #eee;
  }
`;