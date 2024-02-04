import React from "react";
import { Platform } from "react-native";
import styled from "styled-components/native";
import { HeaderSpaceForAndroid } from "../common/commonStyledComp";

const os = Platform.OS;


const HeaderView = styled.View`
    width:100%; justify-content: center; padding-top: 5px; align-items: center;
`
const HeaderLogo = styled.Image`
    width: 100px; height:24px;  margin-top:2px;
`

const Header = ()=>(
    <HeaderView>
        <HeaderSpaceForAndroid/>
        <HeaderLogo source={require('../assets/icons/headerLogo.png')}/>
        {/* <HeaderTxt>전국의 동기들과 지혜롭게 아이를 키워요</HeaderTxt> */}
    </HeaderView>
)

export default Header;