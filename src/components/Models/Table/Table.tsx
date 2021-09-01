import React, {useCallback} from "react";

import {tryUpdateModelData} from "appRedux/reducers/api/crud";
import {animatedWindowProps3} from "components/FormComponents/animation";
import TableHeader from "components/Models/TableHeader/TableHeader";
import TableRow from "components/Models/TableRow/TableRow";
import {useDispatch} from "react-redux";

import {StyledTable, StyledTableRows} from "./style";

export interface TableProps {
    fields: any, // TODO
    rows: any, // TODO
    model: string,
    modelPackage: string
}

const Table = (props: TableProps) => {

    const {fields, rows, model, modelPackage} = props;

    const dispatch = useDispatch();

    const onRowSave = useCallback((data) => {
        dispatch(tryUpdateModelData(modelPackage, model, data));
    }, [modelPackage, model]);

    const renderRows = useCallback(() => {
        if (!rows) {
            return;
        }

        return Object.entries(rows).map((row, idx) => {
            const [, value] = row;
            return <TableRow key={idx} model={model} row={value} fields={fields} saveHandler={onRowSave}/>;
        });
    }, [rows, fields]);

    return <StyledTable {...animatedWindowProps3}>
        <TableHeader fields={fields}/>
        <StyledTableRows>
            {renderRows()}
        </StyledTableRows>
    </StyledTable>;
};

export default Table;