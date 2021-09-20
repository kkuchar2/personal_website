import {motion} from "framer-motion";
import styled from "styled-components";

export const StyledLoginPage = styled(motion.div)`
  overflow: hidden;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const AnimatedText = styled(motion.div)``;

export const titleTheme = {
    fontSize: "clamp(40px, 1.5vw, 100px)",
    textColor: "#ffffff",
    disabledTextColor: "rgba(255,255,255,0.20)",
    fontWeight: 800,
    textAlign: "center"
};

export const descriptionTheme = {
    fontSize: "clamp(20px, 1vw, 100px)",
    textColor: "#ffffff",
    disabledTextColor: "rgba(255,255,255,0.20)",
    fontWeight: 600,
    textAlign: "center"
};