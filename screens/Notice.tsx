import { useNavigation } from "@react-navigation/native";
import react, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import colors from "../common/commonColors";
import { BasicView, PaddingView, Space10, Space15, Space20, Space35, Space5 } from "../common/commonStyledComp";
import { Platform, Pressable} from "react-native";
import { getWindowWidth } from "../common/commonFunc";

const os = Platform.OS;
const windowWidth = getWindowWidth();

const NoticeFlatList = styled.FlatList`

`
const NoticeBox = styled.View`
    width: 100%;
    height:60px;
    border-bottom-width: 1px;
    border-bottom-color: ${colors.underlineGray};
    padding:0px 20px;
`
const NotiveTxt1 = styled.Text`
    font-family: 'noto400'; font-size: 14px; line-height: 17px; color:${colors.textBlack}; padding-top: 13px; letter-spacing: -0.4px;
`
const NotiveTxt2 = styled.Text`
    font-family: 'noto300'; font-size: 12px; line-height: 15px; color:${colors.textGray}; padding-top: 3px;
`

const Notice = () => {
    
    const navigation:any = useNavigation();

    const testData =['','','','','','','','','','',''];



    function goNoticeContent(){
        navigation.navigate('Stack', {screen: 'NoticeContent', params:{}});
    }

    const renderNotive = ({item, index}:any) => {		
        const isThumbExist = item?.thumbUrl==null?false:true;
        return(
            <Pressable onPress={goNoticeContent}>
                <NoticeBox>
                    <NotiveTxt1 numberOfLines={1}>[공지] 자나다라공지사항 자나다라공지사항</NotiveTxt1>
                    <NotiveTxt2>2022.02.23</NotiveTxt2>
                </NoticeBox>
            </Pressable>
        )
    };


    return (
    <BasicView>

        <NoticeFlatList
            data = {testData}							
            renderItem={renderNotive}							
            keyExtractor={(item, index) => index.toString()+""}							
            showsVerticalScrollIndicator={true}							
            // onEndReached={getMoreContent}							
            // onEndReachedThreshold={0.8}							
        >
        </NoticeFlatList>


    </BasicView>
)};

export default Notice;




