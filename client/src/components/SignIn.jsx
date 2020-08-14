import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { auth } from "firebase";

import { useShopContext } from "../context/ShopContext";

export default () => {
  const { state } = useShopContext();
  const { currentUser } = state;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = () => {
    auth().signInWithEmailAndPassword(email, password)
      .catch((err) => console.log(err.message));
  };

  const handleSignUp = () => {};

  const handleSignout = () => {};

  return (
    <Wrapper>
      <Header>Sign in</Header>
      <Input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <Input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <BtnWrapper>
        <LoginBtn to="/" onClick={handleSignin}>
          Log in
        </LoginBtn>
        <SignUpBtn to="/" onClick={handleSignUp}>
          Sign Up
        </SignUpBtn>
        <SignoutBtn to="/" onClick={handleSignout} currentUser={currentUser}>
          Log out
        </SignoutBtn>
      </BtnWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 7vh - 6vh);
  margin: 0 auto;
`;

const Header = styled.h2`
  margin-bottom: 3rem;
  font-size: 32px;
`;

const Input = styled.input`
  width: 300px;
  height: 3rem;
  border: none;
  border-bottom: 2px solid gray;
  margin-bottom: 1rem;
  outline: none;
`;

const BtnWrapper = styled.div`
  display: flex;
  padding-top: 1rem;
`;

const LoginBtn = styled(Link)`
  border: 1px solid #ccc;
  background: none;
  padding: 12px 10px;
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #2b3b4a;
    color: white;
  }
`;

const SignUpBtn = styled(LoginBtn)``;

const SignoutBtn = styled.button`
  display: ${(p) => (p.currentUser == null ? "flex" : "none")};
  border: 1px solid #ccc;
  background: none;
  padding: 12px 10px;
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #2b3b4a;
    color: white;
  }
`;
