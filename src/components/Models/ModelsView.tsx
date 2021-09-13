import React, {useCallback, useEffect} from "react";

import {useMediaQuery} from "@material-ui/core";
import {
    getAllModelData,
    getSingleRowModelData,
    selectorAddItemToTable,
    selectorModelData,
    selectorModelList,
    selectorUpdateModelData,
    tryGetListOfModels
} from "appRedux/reducers/api/crud";
import {changeCurrentViewedModel, selectorCurrentViewedModel, showDialog} from "appRedux/reducers/application";
import {useAppDispatch} from "appRedux/store";
import {RequestState} from "axios-client-wrapper";
import CreateNewModelItemDialog, {CreateNewModelItemDialogProps} from "components/Dialogs/CreateNewModelItemDialog/CreateNewModelItemDialog";
import {animatedWindowProps3} from "components/FormComponents/animation";
import {spinnerTheme} from "components/FormComponents/commonStyles";
import Table from "components/Models/Table/Table";
import {Button, Select, Spinner} from "kuchkr-react-component-library";
import {useSelector} from "react-redux";
import {OptionsType} from "react-select";

import {withRequestComplete} from "../../api/util";

import {addItemButtonTheme, modelSelectorTheme, StyledModelsView, StyledToolbar} from "./style";

const ModelsView = () => {

    const currentModel = useSelector(selectorCurrentViewedModel);
    const currentModelName = currentModel.model;
    const currentModelPackage = currentModel.package;
    const currentModelFullName = currentModel.fullModelName;

    const dispatch = useAppDispatch();

    const modelListSelector = useSelector(selectorModelList);
    const modelDataSelector = useSelector(selectorModelData);
    const updateModelSelector = useSelector(selectorUpdateModelData);
    const addItemToTableSelector = useSelector(selectorAddItemToTable);

    const modelList = modelListSelector.responseData;
    const modelData = modelDataSelector.modelsData;

    const tableData = !currentModelFullName ? null : modelData[currentModelFullName];
    const fields = tableData ? tableData.headers : null;
    const rows = tableData ? tableData.rows : null;

    const isMobile = useMediaQuery('(max-width: 1200px)');

    useEffect(() => {
        dispatch(tryGetListOfModels());
    }, []);

    useEffect(() => {
        if (!currentModelPackage || !currentModelName) {
            return;
        }
        dispatch(getAllModelData(currentModelPackage, currentModelName));
    }, [currentModelName, currentModelPackage]);

    withRequestComplete(updateModelSelector, 'updateModel', () => {
        if (updateModelSelector.responseData) {
            const id = updateModelSelector.responseData['updated_id'];
            dispatch(getSingleRowModelData(currentModelPackage, currentModelName, id));
        }
    });

    withRequestComplete(addItemToTableSelector, 'addItem', () => {
        dispatch(getAllModelData(currentModelPackage, currentModelName));
    });

    const onSelected = useCallback((selectedOption) => {
        const value = selectedOption.value;

        if (!value) {
            return;
        }
        dispatch(changeCurrentViewedModel(value.model, value.package));
    }, []);

    const renderTable = useCallback(() => {
        const path = modelDataSelector.path;
        const isCtx = path === 'getModel';
        const isPending = modelDataSelector.requestState === RequestState.Pending;

        const path2 = modelListSelector.path;
        const isCtx2 = path2 === 'listModels';
        const isPending2 = modelListSelector.requestState === RequestState.Pending;

        if ((!rows && isCtx && isPending) || isCtx2 && isPending2) {
            return <div style={{marginTop: 100}}>
                <Spinner theme={spinnerTheme}/>
            </div>;
        }
        return <Table fields={fields} model={currentModelName} modelPackage={currentModelPackage} rows={rows}/>;
    }, [modelDataSelector, modelListSelector]);

    const onAddNewItemClick = useCallback(() => {
        dispatch(showDialog({
            component: CreateNewModelItemDialog,
            props: {
                fields: fields,
                modelPackage: currentModelPackage,
                modelName: currentModelName
            }
        }));
    }, [fields, currentModelName]);

    const modelListForSelect: OptionsType<any> = Object.keys(modelList).length === 0 ? [] : modelList.map((x: any) => {
        return {value: x, label: x.model};
    });

    const renderToolbar = useCallback(() => {
        const path = modelListSelector.path;
        const isCtx = path === 'listModels';
        const isPending = modelListSelector.requestState === RequestState.Pending;

        if (isCtx && isPending) {
            return <div style={{marginTop: 100}}>
                <Spinner theme={spinnerTheme} text={undefined}/>
            </div>;
        }

        return <StyledToolbar {...animatedWindowProps3}>
            <Select
                theme={modelSelectorTheme(isMobile)}
                options={modelListForSelect}
                placeholder={'Select table'}
                disabled={false}
                isSearchable={false}
                onChange={onSelected}
            />
            <Button theme={addItemButtonTheme} text={`Add new row`} onClick={onAddNewItemClick}/>
        </StyledToolbar>;
    }, [modelListSelector, currentModelName, modelData, isMobile]);

    return <StyledModelsView>
            {renderToolbar()}
            {renderTable()}
        </StyledModelsView>;
};

export default ModelsView;