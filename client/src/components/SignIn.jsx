import React, { useState } from "react";
import styled from "styled-components";
import { auth } from "firebase";

import { useShopContext } from "../context/ShopContext";

export default () => {
  const { state } = useShopContext();
  const { currentUser, signedIn } = state;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const handleSignin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        setFeedbackMsg("Signed in successfully. Enjoy the shopping spree!");
        console.log("SIGNED IN USER", user);
        // history.push("/") w/ delay
      })
      .catch((err) => setFeedbackMsg(err.message));
  };

  const handleSignUp = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        setFeedbackMsg(
          "Your account has been created and are currently logged in. Enjoy the shopping spree!"
        );
        console.log("SIGNED UP USER", user);
        // history.push("/") w/ delay
      })
      .catch((err) => setFeedbackMsg(err.message));
  };

  const handleSignout = () => {
    auth().signOut();
    setFeedbackMsg("You are now signed out.");
    // history.push("/") w/ delay
  };

  return (
    <Wrapper>
      <Header>Sign in</Header>
      <Feedback>{feedbackMsg}</Feedback>
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
        <LoginBtn
          onClick={handleSignin}
          currentUser={currentUser}
          signedIn={signedIn}
        >
          Log in
        </LoginBtn>
        <SignUpBtn
          onClick={handleSignUp}
          currentUser={currentUser}
          signedIn={signedIn}
        >
          Sign Up
        </SignUpBtn>
        <SignoutBtn
          onClick={handleSignout}
          currentUser={currentUser}
          signedIn={signedIn}
        >
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
  margin-bottom: 2rem;
  font-size: 32px;
`;

const Feedback = styled.p`
  margin-bottom: 2rem;
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

const LoginBtn = styled.button`
  display: ${(p) => (p.currentUser && p.signedIn && "none")};
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

const SignoutBtn = styled(LoginBtn)`
  display: ${(p) => p.currentUser && p.signedIn ? "flex" : "none"};
`;