import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Platform, Pressable } from "react-native";
import styled from "styled-components/native";
import { HeaderSpaceForAndroid } from "../common/commonStyledComp";
import { EvilIcons } from '@expo/vector-icons'; 
import colors from "../common/commonColors";
const os = Platform.OS;


const HeaderView = styled.View`
    width:100%; height:50px; position: relative;  align-items: center; justify-content: center; position: relative;
`


const IconBoxPress = styled.Pressable`
    width:50px; height:50px; justify-content: center; align-items: center; position: absolute; left:10px;
`
const HeaderTitle = styled.Text`
    font-family: 'noto500'; font-size: 16px; line-height: 19px; color:${colors.textBlack}; letter-spacing: -0.2px; padding-top: 3px;
`

const FinishBtnPress = styled.TouchableOpacity`
    width:50px; height:50px; justify-content: center; align-items: center; position: absolute; right:10px;
`
const FinishBtnTxt = styled.Text`
    font-family: 'noto500'; font-size: 14px; line-height: 19px; color:${colors.textGray}; letter-spacing: -0.2px; padding-top:2px;
`

const CustomHeaderLeftXRightBtn = (props:any)=>{
    
    const navigation = useNavigation();
    const {title, from, isSendDisable}:any = props;
    //console.log(title, from, isSendDisable);

    
    function pressFinish(){
        if(from=='communityWriteBoard' || 'writeCustomerOpinion' || 'writeDM'){
            props.onData('sendContent')
        }
    }
    
    return (

    <HeaderView>
        <IconBoxPress onPress={()=>{navigation.goBack()}}>
            <EvilIcons name="close" size={28} color={colors.textBlack} />
        </IconBoxPress>
        <HeaderTitle>{title}</HeaderTitle>

        <FinishBtnPress disabled={isSendDisable} onPress={pressFinish}>
            <FinishBtnTxt>{from=='writeDM'?'보내기':'완료'}</FinishBtnTxt>
        </FinishBtnPress>
    </HeaderView>
)}

export default CustomHeaderLeftXRightBtn;