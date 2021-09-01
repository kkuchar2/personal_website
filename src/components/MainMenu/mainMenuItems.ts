import {ElementType} from "react";

import SvgIcon from "@material-ui/core/SvgIcon/SvgIcon";
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SettingsIcon from '@material-ui/icons/Settings';
import TableChartIcon from '@material-ui/icons/TableChart';
import Dashboard from "components/Dashboard/Dashboard";
import ModelsView from "components/Models/ModelsView";
import SettingsView from "components/Settings/SettingsView";

export interface IViewDescription {
    id: string,
    displayName: string,
    description: string,
    icon: typeof SvgIcon,
    component: ElementType
}

export interface IMainMenuItems {
    [menuKey: string]: IViewDescription
}

export const mainMenuItems: IMainMenuItems = {
    "Dashboard": {
        id: 'Dashboard',
        displayName: "Dashboard",
        description: '',
        icon: HomeOutlinedIcon,
        component: Dashboard
    },
    "TableAdministration": {
        id: 'TableAdministration',
        displayName: "Table administration",
        description: "Manage all tables exposed by Django backend",
        icon: TableChartIcon,
        component: ModelsView
    },
    "Settings": {
        id: 'Settings',
        displayName: "Settings",
        description: "Change account and page settings",
        icon: SettingsIcon,
        component: SettingsView
    }
};