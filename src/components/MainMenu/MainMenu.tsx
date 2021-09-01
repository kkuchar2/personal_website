import React, {useCallback} from "react";

import {useMediaQuery} from "@material-ui/core";
import FilterListOutlinedIcon from '@material-ui/icons/FilterListOutlined';
import AccountDisplay from "components/AccountDisplay/AccountDisplay";
import {animatedWindowProps} from "components/FormComponents/animation";
import {IViewDescription, mainMenuItems} from "components/MainMenu/mainMenuItems";
import MenuItem from "components/MainMenu/MenuItem/MenuItem";

import {StyledMainMenu, StyledMenuButton, StyledMenuItems, StyledMenuSection} from "./style";

export interface MainMenuProps {
    onItemClick: Function,
    openedView: IViewDescription
}

const MainMenu = (props: MainMenuProps) => {

    const {onItemClick, openedView} = props;

    const isMobile = useMediaQuery('(max-width: 600px)');

    const onMenuItemClick = useCallback(key => {
        onItemClick?.(key);
    }, [onItemClick]);

    const renderMenuItems = useCallback(() => {
        return Object.entries(mainMenuItems).map((item, idx) => {
            const [key, value] = item;
            return <MenuItem
                key={idx}
                name={value.displayName}
                icon={value.icon}
                onClick={() => onMenuItemClick(key)}
                active={openedView.id === key}/>;
        });
    }, [openedView]);

    const renderMenu = useCallback(() => {
        if (isMobile) {
            return <StyledMenuButton>
                <FilterListOutlinedIcon fontSize={'large'}/>
            </StyledMenuButton>;
        }
        return <StyledMenuItems>
            {renderMenuItems()}
        </StyledMenuItems>;
    }, [isMobile]);

    return <StyledMainMenu {...animatedWindowProps}>
        <StyledMenuSection>
            <AccountDisplay showLogoutButton={true}/>
            {renderMenu()}
        </StyledMenuSection>
    </StyledMainMenu>;
};

export default MainMenu;