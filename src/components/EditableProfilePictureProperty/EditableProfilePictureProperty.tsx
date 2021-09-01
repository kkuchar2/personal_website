import React, {useCallback, useEffect, useRef, useState} from "react";

import {faCamera} from "@fortawesome/free-solid-svg-icons";
import {useMediaQuery} from "@material-ui/core";
import {selectorAuth, tryChangeProfileImage} from "appRedux/reducers/api/account";
import {Spinner} from "kuchkr-react-component-library";
import {useDispatch, useSelector} from "react-redux";

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

    const dispatch = useDispatch();

    const authState = useSelector(selectorAuth);

    const uploadFileRef = useRef<HTMLInputElement>(null);

    const isMobile = useMediaQuery('(max-width: 600px)');

    const onChangeImageClick = useCallback(() => {
        console.log('on change image');

        uploadFileRef.current?.click();
    }, []);

    const onFileUpload = useCallback(() => {
        if (!selectedFile) {
            return;
        }
        dispatch(tryChangeProfileImage(selectedFile));
    }, [selectedFile]);

    const onFileChange = useCallback((e) => {
        setSelectedFile(e.target.files[0]);
    }, []);

    useEffect(() => onFileUpload(), [selectedFile]);

    const renderProfilePicture = useCallback(() => {
        const path = authState.path;
        const correctContext = path === 'changeProfileImage';
        const isRequestPending = authState.requestSent && !authState.responseReceived;

        return <StyledProfilePicture
                    url={isRequestPending && correctContext ? "" : authState.user.avatarUrl}
                    size={isMobile ? 50 : 100}>
            {isRequestPending && correctContext ? <Spinner theme={spinnerTheme} text={''}/> : null}
            <input type="file" name="uploadFile" id="img" ref={uploadFileRef} style={{display: "none"}}
                   onChange={onFileChange}/>
            <StyledUploadFileButton icon={faCamera} onClick={onChangeImageClick}/>
        </StyledProfilePicture>;
    }, [authState, isMobile]);

    return <StyledEditableProfilePictureProperty>
        <StyledPropertyValues>
            <PropertyValueSection>
                {renderProfilePicture()}
            </PropertyValueSection>
        </StyledPropertyValues>
    </StyledEditableProfilePictureProperty>;
};

export default EditableProfilePictureProperty;