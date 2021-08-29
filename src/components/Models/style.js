import {motion} from "framer-motion";
import styled from "styled-components";

export const StyledModelsView = styled.div`
  flex: 1 0;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
`;

export const StyledToolbar = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  @media (max-width: 1200px) {
    width: 100%;
    flex-direction: column;
  }
`;

export const addItemButtonTheme = {
    width: "150px",
    height: "40px",
    background: "rgba(0,180,105,1)",
    disabledBackground: "rgba(47,47,47,0.43)",
    hoverBackground: "rgb(0,154,90)",
    border: "none",
    borderRadius: "8px",
    margin: "0px 0px 0px 10px",

    text: {
        textAlign: "center",
        fontSize: "14px",
        textColor: "#ffffff",
        fontWeight: "700",
        disabledTextColor: "rgba(255,255,255,0.20)"
    }
};

export const modelSelectorTheme = isMobile => {
    return {
        width: isMobile ? "100%" : "480px",
        height: 50,
        boxShadow: "none",
        border: 'none',
        backgroundColor: '#edf1f6',
        placeholderTextColor: '#3a3a3a',
        selectedSingleValueTextColor: '#2b2b2b',
        arrowColor: '#5d5959',
        arrowColorHover: '#5d5959',
        indicatorSeparatorColor: '#afafaf',
        borderRadius: 4,
        listBorderRadius: 4,
        listBackgroundColor: '#edf1f6',
        listItemTextColor: "#343434",
        itemHoverBackgroundColor: '#0085FF',
        itemSelectedBackgroundColor: '#55aaff',
        itemHoverTextColor:  '#ffffff',
        listItemHeight: 50
    };
};
