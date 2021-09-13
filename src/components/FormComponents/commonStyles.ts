import {Link} from "react-router-dom";
import styled from "styled-components";

export const formTitleTheme = {
    textColor: "#323232",
    fontSize: "1.7em",
    textAlign: "center",
    fontWeight: 700,
    margin: "0px 0px 10px 0px"
};

export const questionTextTheme = {
    textColor: "#505050",
    fontWeight: 500,
    fontSize: "1.1em"
};

export const errorTextTheme = {
    textColor: "#ff4949",
    fontSize: "15px"
};

export const buttonTheme = {
    width: "230px",
    height: "50px",
    background: "rgba(0,180,105,1)",
    disabledBackground: "rgba(47,47,47,0.43)",
    hoverBackground: "rgb(0,140,81)",
    border: "none",
    borderRadius: "55px",
    margin: "20px 0px 0px 0px",

    text: {
        fontSize: "1.3em",
        textColor: "#ffffff",
        disabledTextColor: "rgba(255,255,255,0.20)",
        textAlign: "center",
        fontWeight: 500
    }
};

export const StyledQuestionWithLinkTheme = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 30px;
  margin-bottom: 10px;
  height: 20px;
`;

export const StyledButtonGroup = styled.div`
  margin-top: 30px;
  margin-bottom: 0px;
  justify-content: center;
  display: flex;
  align-items: center;
  height: 50px;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: rgba(0,180,105,1);
  font-size: 1.1em;

  &:hover {
    text-decoration: underline;
  }
`;

export const spinnerTheme = {
    color: "rgba(0,180,105,1)",
    disabledColor: "rgba(255,119,0,0.29)",

    text: {
        textColor: "#505050",
        disabledTextColor: "rgba(255,255,255,0.20)",
        fontSize: "1.1em"
    }
};