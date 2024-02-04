import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Platform, Pressable } from "react-native";
import styled from "styled-components/native";
import { HeaderSpaceForAndroid } from "../common/commonStyledComp";
import { Ionicons } from '@expo/vector-icons'; 
import colors from "../common/commonColors";
const os = Platform.OS;


const HeaderView = styled.View`
    width:100%; height:50px; position: relative;  flex-direction: row;
`

const IconBoxView = styled.View`
    width:100%; height:50px; position: absolute; 
`

const TitleBox = styled.View`
    width:100%; height:50px; position: absolute; justify-content: center; align-items: center;
`

const IconBoxPress = styled.Pressable`
    width:50px; height:50px; justify-content: center; align-items: center; 
`

const HeaderTitle = styled.Text`
    font-family: 'noto500'; font-size: 16px; line-height: 19px; color:${colors.textBlack}; letter-spacing: -0.2px;
`

const CustomHeader = ({title}:any)=>{

    
    const navigation = useNavigation();
    
    return (


    <HeaderView>
            <TitleBox>
                <HeaderTitle>{title}</HeaderTitle>
            </TitleBox>
        
            <IconBoxView>
                <IconBoxPress onPress={()=>{navigation.goBack()}}>
                    <Ionicons name="chevron-back" size={28} color={colors.logoOrange} />
                </IconBoxPress>
            </IconBoxView>
            
            
        

        

    </HeaderView>
)}

export default CustomHeader;