import React from "react";
import ReactDOM from "react-dom";
import { ReactTagify } from "react-tagify";
import styled from "styled-components";

export default function Test() {
    const tagStyle ={
        fontWeight: 900,
        color: 'white'
    }
  return (
    <Container>
      <ReactTagify 
        tagStyle={tagStyle} 
        tagClicked={(tag)=> alert(tag)}>
        <p>
          “You might not think that #programmers are #artists,
          but programming is an extremely creative #profession.
          Its logic-based creativity”
          @JohnRomero
        </p>
      </ReactTagify>
    </Container>
  );
}

const Container = styled.div`
    background-color: black;
    p{
        color: white;
    }
`