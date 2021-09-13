import React, {useCallback, useEffect, useRef, useState} from "react";

import {useMediaQuery} from "@material-ui/core";
import {selectorAuth, tryChangeProfileImage} from "appRedux/reducers/api/account";
import {useAppDispatch} from "appRedux/store";
import {Spinner} from "kuchkr-react-component-library";
import {useSelector} from "react-redux";

import {
    PropertyValueSection,
    spinnerTheme,
    StyledEditableProfilePictureProperty,
    StyledProfilePicture,
    StyledPropertyValues,
    StyledUploadFileButton
} from "./style";

const EditableProfilePictureProperty = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [randomKey, setRandomKey] = useState(Date.now());

    const dispatch = useAppDispatch();

    const authState = useSelector(selectorAuth);

    const uploadFileRef = useRef<HTMLInputElement>(null);

    const isMobile = useMediaQuery('(max-width: 600px)');

    const onChangeImageClick = useCallback(() => {
        console.log('on change image');

        uploadFileRef.current?.click();
    }, []);

    const onFileSelected = useCallback(() => {
        console.log('On file selected');
        if (!selectedFile) {
            return;
        }
        dispatch(tryChangeProfileImage(selectedFile));
        setRandomKey(Date.now());
    }, [selectedFile]);

    const onFileChange = useCallback((e) => {
        setSelectedFile(e.target.files[0]);
    }, []);

    useEffect(() => onFileSelected(), [selectedFile]);

    const renderProfilePicture = useCallback(() => {
        const path = authState.path;
        const correctContext = path === 'changeProfileImage';
        const isRequestPending = authState.requestSent && !authState.responseReceived;

        console.log('Auth state: ', authState);

        return <StyledProfilePicture
            url={isRequestPending && correctContext ? "" : authState.user.avatar}
            size={isMobile ? 50 : 100}>
            {isRequestPending && correctContext ? <Spinner theme={spinnerTheme} text={''}/> : null}
            <input
                type="file"
                name="uploadFile"
                id="img"
                key={randomKey}
                ref={uploadFileRef}
                style={{display: "none"}}
                onChange={onFileChange}/>
            <StyledUploadFileButton onClick={onChangeImageClick}/>
        </StyledProfilePicture>;
    }, [authState, isMobile, randomKey]);

    return <StyledEditableProfilePictureProperty>
        <StyledPropertyValues>
            <PropertyValueSection>
                {renderProfilePicture()}
            </PropertyValueSection>
        </StyledPropertyValues>
    </StyledEditableProfilePictureProperty>;
};

export default EditableProfilePictureProperty;