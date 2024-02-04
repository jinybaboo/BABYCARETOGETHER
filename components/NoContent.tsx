import React from "react";
import styled from "styled-components/native";
import colors from "../common/commonColors";

const NoContentView = styled.View`
    flex:1; align-items: center; justify-content: center;
`
const NoContentText = styled.Text`
    font-family: 'noto300'; font-size: 12px; line-height: 19px; color:${colors.textGray}; letter-spacing: 0.2px;
    text-align: center;
`


const NoContent = ({title}:any)=>(
    <NoContentView>
        <NoContentText>{title}</NoContentText>
    </NoContentView>
)

export default NoContent;