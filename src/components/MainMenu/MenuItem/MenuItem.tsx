import React, {useCallback} from "react";

import SvgIcon from "@material-ui/core/SvgIcon/SvgIcon";
import {animatedWindowProps} from "components/FormComponents/animation";
import {Text} from "kuchkr-react-component-library";

import {StyledIconWrapper, StyledMenuItem, textTheme} from "./style";

export interface MenuItemProps {
    name: string,
    icon: typeof SvgIcon,
    onClick: Function,
    active: boolean
}

const MenuItem = (props: MenuItemProps) => {

    const {name, icon, onClick, active} = props;

    const onMenuItemClick = useCallback(() => onClick?.(), [onClick]);

    const IconComponent = icon;

    return <StyledMenuItem {...animatedWindowProps} onClick={onMenuItemClick}>
        {/*<StyledActiveIndicator active={active}/>*/}
        <StyledIconWrapper>
            <IconComponent style={{color: active ? "rgba(0,180,105,1)" : "#929292"}}/>
        </StyledIconWrapper>
        <Text style={{color: active ? "rgba(0,180,105,1)" : "#929292"}} theme={textTheme} text={name}/>
    </StyledMenuItem>;
};

export default MenuItem;