import React, {useCallback} from "react";

import {IFieldInfo} from "appRedux/reducers/api/crud";
import {getColumnProperties} from "components/Models/columnProperties";
import {Text} from "kuchkr-react-component-library";

import {headerTextTheme, StyledTableHeader} from "./style";

export interface TableHeaderProps {
    fields: Array<IFieldInfo>
}

const TableHeader = (props: TableHeaderProps) => {

    const {fields} = props;

    const renderFieldNames = useCallback(() => {
        if (!fields) {
            return;
        }
        return fields.map((field: IFieldInfo, idx: number) => {
            const colProps = getColumnProperties(field.type);
            return <Text theme={headerTextTheme} style={{minWidth: 0, width: colProps.width}} key={idx}
                         text={field.name}/>;
        });
    }, [fields]);

    return <StyledTableHeader>
        {renderFieldNames()}
        <Text theme={headerTextTheme} key={fields?.length} text={'Actions'} />
    </StyledTableHeader>;
};

export default TableHeader;