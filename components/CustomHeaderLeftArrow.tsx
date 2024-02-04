import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Platform, Pressable } from "react-native";
import styled from "styled-components/native";
import { HeaderSpaceForAndroid } from "../common/commonStyledComp";
import { Ionicons } from '@expo/vector-icons'; 
import colors from "../common/commonColors";
const os = Platform.OS;


const HeaderView = styled.View`
    width:100%; height:50px; align-items: center; justify-content: center; position: relative;
`


const IconBoxPress = styled.Pressable`
    width:50px; height:50px; justify-content: center; align-items: center; position: absolute; left:10px;
`

const HeaderTitle = styled.Text`
    font-size: 15px; line-height: 19px; color:${colors.textBlack}; letter-spacing: -0.2px; padding-top:1px; font-weight: 600;
`

const CustomHeaderLeftArrow = ({title}:any)=>{

    
    const navigation = useNavigation();
    
    return (


    <HeaderView>
        <IconBoxPress onPress={()=>{navigation.goBack()}}>
            <Ionicons name="chevron-back" size={28} color={colors.textBlack} />
        </IconBoxPress>
        <HeaderTitle>{title}</HeaderTitle>
    </HeaderView>
)}

export default CustomHeaderLeftArrow;