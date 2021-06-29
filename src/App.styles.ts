import styled, { createGlobalStyle } from "styled-components";
import background from "./images/background.jpg";

/**
 * Global styles !!!
 */
export const GlobalStyle = createGlobalStyle`
html {
    height:100%;
}
body {
    background-image: url(${background});
    background-size: cover;
    margin:0;
    padding: 0 20px;
    display: flex;
    justify-content: center;
}

* {
    box-sizing: border-box;
}
`;
// wrapper with a div. same thing as assigning a class to it
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    color: #fff;
  }

  .score {
    color: #fff;
    font-size: 2rem;
    margin: 0;
  }

  h1 {
    background-image: linear-gradient(180deg, #fff, #87f1ff);
    background-size: 100%;
    background-clip: text;
    --webkit-background-clip: text;
    --wenkit-text-fill-color: transparent;
    --moz-background-clip: text;
    --moz-text-fill-colot: transparent;
    filter: drop-shadow(2px 2px #0085a3)
    font-size: 70px;
    font-weight: 400;
    text-align: center;
    margin: 20px;
  }
`;
