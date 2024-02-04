import { useNavigation } from "@react-navigation/native";
import react, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import colors from "../common/commonColors";
import { BasicView, PaddingView, Space10, Space15, Space20, Space35, Space5 } from "../common/commonStyledComp";
import { Platform} from "react-native";
import { getWindowWidth } from "../common/commonFunc";

const os = Platform.OS;
const windowWidth = getWindowWidth();


const Example = () => {
    
    const navigation:any = useNavigation();

    return (
    <BasicView>


    </BasicView>
)};

export default Example;




