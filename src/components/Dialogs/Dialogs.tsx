import React from "react";

import {useMediaQuery} from "@material-ui/core";
import {selectorDialogs} from "appRedux/reducers/application";
import {animatedWindowProps4} from "components/FormComponents/animation";
import {useSelector} from "react-redux";

import {StyledDialog, StyledDialogs} from "./style";

const Dialogs = () => {

    const data = useSelector(selectorDialogs);

    const Component = data.component;
    const componentProps = data.componentProps;
    const isMobile = useMediaQuery('(max-width: 1200px)');

    if (!Component) {
        return null;
    }

    const animationProps = isMobile ? null : animatedWindowProps4;

    return <StyledDialogs>
        <StyledDialog {...animationProps}>
            <Component {...componentProps} />
        </StyledDialog>
    </StyledDialogs>;
};

export default Dialogs;