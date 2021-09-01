import React from "react";

import {BASE_URL_DEV} from "appRedux/util";
import {StyledProfilePicture} from "components/EditableProfilePictureProperty/style";

import {FieldSerializerProps} from "./fieldSerializer.types";

export const FileFieldSerializer = (props: FieldSerializerProps) => {

    const {name, value, inEditMode, onChange} = props;

    return <StyledProfilePicture url={BASE_URL_DEV + value} size={60}/>;
};

export default FileFieldSerializer;