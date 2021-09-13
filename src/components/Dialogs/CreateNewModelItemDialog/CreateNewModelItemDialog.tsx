import React, {useCallback, useState} from "react";

import {tryAddItemToTable} from "appRedux/reducers/api/crud";
import {hide_dialog, hideDialog} from "appRedux/reducers/application";
import {useAppDispatch} from "appRedux/store";
import {FieldRow} from "components/Dialogs/ConfirmationDialog/FieldRow/FieldRow";
import {BaseDialogProps} from "components/Dialogs/types";
import {getColumnProperties} from "components/Models/columnProperties";
import {Button, Text} from "kuchkr-react-component-library";

import {
    cancelButtonTheme,
    confirmButtonTheme,
    StyledCreateNewModelItemDialog,
    StyledDialogButtonsSection,
    StyledDialogContentSection,
    StyledDialogTitleSection,
    titleTextTheme
} from "./style";

const humanize = (str: string) => {
    let i, frags = str.split('_');
    for (i = 0; i < frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
};

export interface CreateNewModelItemDialogProps extends BaseDialogProps {
    modelPackage: string,
    modelName: string,
    fields: any // TODO
}

const CreateNewModelItemDialog = (props: CreateNewModelItemDialogProps) : JSX.Element =>{

    const {modelPackage, modelName, fields} = props;

    const [formData, setFormData] = useState({});

    const dispatch = useAppDispatch();

    const createFormField = useCallback((type, name, isEditable, onChange, idx) => {
        const colProps = getColumnProperties(type);

        return <FieldRow
            name={name}
            title={name + ':'}
            colProps={colProps}
            inEditMode={true}
            key={idx}
            value={''} // TODO what here?
            onChange={onChange}
            isEditable={true}/>;
    }, [fields]);

    const onFieldChange = useCallback((fieldName: string, value: any) => {
        setFormData(formData => ({...formData, [fieldName]: value}));
    }, [formData]);

    console.log("------ Form data : -----------");
    console.log(formData);

    const renderFields = useCallback(() => {
        const size = fields.length;

        const formRows = [];

        for (let i = 0; i < size; i++) {
            const fieldInfo = fields[i];
            console.log(fieldInfo);
            const name = humanize(fieldInfo.name);
            if (fieldInfo.isEditable) {
                formRows.push(createFormField(fieldInfo.type, name, fieldInfo.isEditable, (name: string, v: any) => {
                    onFieldChange(fieldInfo.name, v);
                }, i));
            }
        }

        return formRows;
    }, [fields]);

    const onCancel = useCallback(() => {
        dispatch(hide_dialog());
    }, []);

    const onConfirm = useCallback(() => {
        // TODO: do not close immediately, only if the form is valid and item was added to DB\
        dispatch(tryAddItemToTable({modelPackage: modelPackage, model: modelName, itemData: formData}));
        dispatch(hideDialog());
    }, [formData, modelName, modelPackage]);

    return <StyledCreateNewModelItemDialog>
        <StyledDialogTitleSection>
            <Text theme={titleTextTheme} text={'Create new ' + modelName}/>
        </StyledDialogTitleSection>
        <StyledDialogContentSection>
            {renderFields()}
        </StyledDialogContentSection>

        <StyledDialogButtonsSection>
            <Button theme={cancelButtonTheme} text={"Cancel"} onClick={onCancel}/>
            <Button theme={confirmButtonTheme} text={"Create"} onClick={onConfirm}/>
        </StyledDialogButtonsSection>
    </StyledCreateNewModelItemDialog>;
};

export default CreateNewModelItemDialog;