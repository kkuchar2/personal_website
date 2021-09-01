import React from "react";

import {animatedWindowProps} from "components/FormComponents/animation";

import {StyledDashboard} from "./style";

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const Dashboard = () => {
    return <StyledDashboard {...animatedWindowProps}>
    </StyledDashboard>;
};

export default Dashboard;