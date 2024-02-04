import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Platform, Pressable } from "react-native";
import styled from "styled-components/native";
import { HeaderSpaceForAndroid } from "../common/commonStyledComp";
import { EvilIcons } from '@expo/vector-icons'; 
import colors from "../common/commonColors";
const os = Platform.OS;


const HeaderView = styled.View`
    width:100%; height:50px; align-items: center; justify-content: center; position: relative;
`


const IconBoxPress = styled.Pressable`
    width:50px; height:50px; justify-content: center; align-items: center; position: absolute; right:10px;
`

const HeaderTitle = styled.Text`
    font-size: 15px; line-height: 19px; color:${colors.textBlack}; letter-spacing: -0.2px; padding-top:3px;
`

const CustomHeaderRightX = ({title}:any)=>{

    
    const navigation = useNavigation();
    
    return (
    <HeaderView>
        <IconBoxPress onPress={()=>{navigation.goBack()}}>
            <EvilIcons name="close" size={28} color={colors.textBlack} />
        </IconBoxPress>
        <HeaderTitle>{title}</HeaderTitle>
    </HeaderView>
)}

export default CustomHeaderRightX;