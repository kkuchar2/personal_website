import React, {useCallback, useEffect, useRef, useState} from "react";

import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';
import {Dictionary} from "@reduxjs/toolkit";
import {selectorUpdateModelData} from "appRedux/reducers/api/crud";
import {Cell} from "components/Models/Cell/Cell";
import {getColumnProperties} from "components/Models/columnProperties";
import {Button, Spinner} from "kuchkr-react-component-library";
import {useDispatch, useSelector} from "react-redux";

import {editRowButtonTheme, spinnerTheme, StyledCell, StyledTableRow} from "./style";

export interface TableRowProps {
    row: any, // TODO
    model: string,
    fields: any, // TODO
    saveHandler: any // TODO
}

const TableRow = (props: TableRowProps) => {

    const {row, model, fields, saveHandler} = props;

    const cellElements: Array<any> = [];

    const editedRowData = useRef<Dictionary<any>>({});

    const updateModelSelector = useSelector(selectorUpdateModelData);

    const dispatch = useDispatch();

    const [inEditMode, setInEditMode] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => setIsSaving(updateModelSelector.pendingRow === row.id), [updateModelSelector, row]);

    const onEditClick = useCallback(() => {
        setInEditMode(true);
    }, [inEditMode]);

    const onSaveClick = useCallback(() => {
        saveHandler?.(editedRowData.current, dispatch);
        setInEditMode(false);
    }, [cellElements]);

    const onEditButtonClick = useCallback(() => {
        if (isSaving) {
            return;
        }

        if (inEditMode) {
            onSaveClick();
        } else {
            onEditClick();
        }
    }, [isSaving, inEditMode]);

    const createActionsCell = useCallback((idx) => {
        return <StyledCell key={idx}>
            <Button theme={editRowButtonTheme} onClick={onEditButtonClick}>
                {renderEditButtonContent()}
            </Button>
        </StyledCell>;
    }, [inEditMode, isSaving]);

    const renderEditButtonContent = useCallback(() => {
        if (isSaving) {
            return <Spinner size={3} theme={spinnerTheme}/>;
        }

        const IconComponent = inEditMode ? CheckIcon : EditIcon;

        return <IconComponent fontSize={'small'} style={{marginTop: 4, color: '#ffffff'}}/>;
    }, [isSaving, inEditMode]);

    const onCellChange = useCallback((name, data) => {
        const newEditedRowData: { [id: string]: any; } = {};
        newEditedRowData[name] = data;
        editedRowData.current = Object.assign({}, editedRowData.current, newEditedRowData);
    }, [model]);

    const createCell = useCallback((type, name, value, isEditable, idx) => {
        const colProps = getColumnProperties(type);
        return <Cell
            name={name}
            colProps={colProps}
            value={value}
            inEditMode={inEditMode}
            key={idx}
            onChange={onCellChange}
            isEditable={isEditable}
            title={''}/>;
    }, [fields, model, inEditMode]);

    const renderColumns = useCallback(() => {
        if (!row) {
            return;
        }

        const tableComponentCells = [];
        const additionalCells = [];
        const cells = Object.entries(row);
        const size = cells.length;
        editedRowData.current = {};

        for (let j = 0; j < size; j++) {
            const fieldInfo = fields[j];
            const [name, value] = cells[j];
            tableComponentCells.push(createCell(fieldInfo.type, name, value, fieldInfo.isEditable, j));
            editedRowData.current[cells[j][0]] = cells[j][1];
        }

        additionalCells.push(createActionsCell(size));

        return tableComponentCells.concat(additionalCells);
    }, [row, model, fields, inEditMode, isSaving]);

    return <StyledTableRow>
        {renderColumns()}
    </StyledTableRow>;
};

export default TableRow;