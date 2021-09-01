import styled from "styled-components";

export const titleTextTheme = {
    textColor: "#323232",
    fontSize: "0.9em",
    textAlign: "left",
    fontWeight: 500
};

export const inputTheme = {
    backgroundColor: "#f5f5f5",
    textColor: "#2f2f2f",
    placeholderTextColor: "#c5c5c5",
    border: "none",
    borderFocus: "none",
    borderRadius: "6px",
    height: "40px",
    width: "250px",
    padding: "10px",
    fontSize: '1em',

    textTheme: {
        textColor: '#545454',
        fontSize: '1em'
    }
};

export const StyledFieldRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 10px;
  
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    
    > div {
      width: 100%;
      
      > * {
        width: 100%;
      }
    }
  }
`;
