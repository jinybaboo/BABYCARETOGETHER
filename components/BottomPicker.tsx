import React, { useEffect, useRef, useState } from "react";
import { Platform, TouchableOpacity, Animated, View } from "react-native";
import styled from "styled-components/native";
import colors from "../common/commonColors";
import { HeaderSpaceForAndroid } from "../common/commonStyledComp";

const os = Platform.OS;


const BottomPickerModal = styled.View`
    flex:1; background-color: rgba(0,0,0,0.4); position: absolute; top:0; width:100%; height: 100%;
`

const AnimatedBottomPickerView = styled(Animated.createAnimatedComponent(View))`
    width:100%; position: absolute; bottom:-100px;  background-color: #FFFFFF;  border-top-left-radius: 12px; border-top-right-radius: 12px; 
`
const BottomPickerBox = styled.View`
    width:100%; height:60px; background-color: #FFFFFF; align-items: center; justify-content: center;
    border-top-left-radius: 12px; border-top-right-radius: 12px; 
   
`
const BottomPickerTxt = styled.Text`
     font-family: 'noto700'; font-size: 16px; line-height: 19px; color:${colors.textGray};
`

const BottomPickerTxtActive = styled.Text`
     font-family: 'noto700'; font-size: 16px; line-height: 19px; color:${colors.logoOrange};
`
const BackgroundPress = styled.Pressable`
    width:100%; height:100%;
`



const BottomSelectTitle = styled.Text`
    font-family: 'noto700'; font-size: 20px; line-height:23px; color:${colors.textBlack};text-align:center;
    padding-top: 32px; padding-bottom: 40px;
`

const BottomBtnBox = styled.View`
    width:100%;
    background-color: #FFFFFF;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    padding-top:5px;
    padding-bottom:5px;
`

const BottomSelectTouch = styled.TouchableOpacity`
    width:100%; height:48px;align-items: center;
`
const BottomSelectTxt = styled.Text`
    width:100%; font-family: 'noto400'; font-size: 16px; line-height:19px; color:${colors.textGray}; text-align: center;
`
const BottomSelectChkImg = styled.Image`
    width:20px; height:20px; position:absolute; right:20px;
`


const BottomPicker = (props:any)=>{

    const pickerBoxPositionY = useRef(new Animated.Value(0)).current;
    const picker2BoxPositionY = useRef(new Animated.Value(250)).current;

    const hideBottomPicker = () => {
        //type1 숨기기
        Animated.timing(pickerBoxPositionY, {
            toValue: 100,
            duration:600,
            useNativeDriver: true,
        }).start();

        //type2 숨기기
        Animated.timing(picker2BoxPositionY, {
            toValue: 250,
            duration:600,
            useNativeDriver: true,
        }).start();

        //호출페이지에 정보 보내서 모달 없애도록 하기 
        setTimeout(()=>{
            props.onData({type:'hideBottomPicker'});
        },500);
        
    };

    const {data} = props;

    useEffect(()=>{
        Animated.timing(pickerBoxPositionY, {
            toValue: -100,
            duration:600,
            useNativeDriver: true,
          }).start();
    },[]);


    function pressPickerBtn(btnName:string){
        if(btnName=='신고하기'){
            showPickerType2();

        }else if(btnName=='삭제하기'){
            props.onData({ type:'삭제하기', });
            hideBottomPicker();
        }
    }

    function sendBadReason(reason:string){
        props.onData({
            type:'신고하기',
            badReason:reason,
        });
        hideBottomPicker();
    }

    function showPickerType2(){
        Animated.timing(pickerBoxPositionY, {
            toValue: 100,
            duration:600,
            useNativeDriver: true,
        }).start();

        setTimeout(()=>{ 
            Animated.timing(picker2BoxPositionY, {
                toValue: -100,
                duration:600,
                useNativeDriver: true,
            }).start();
        },600)
        
    }
    
    return (
        <BottomPickerModal>
            <BackgroundPress onPress={hideBottomPicker}/>
           
           <AnimatedBottomPickerView
                 style={[{ transform: [{ translateY: pickerBoxPositionY }] }]}
            >
                {
                data.map((item:any, idx:number)=>{
                    
                    return(
                        <TouchableOpacity  key={idx+''} onPress={()=>{pressPickerBtn(item)}}>
                            <BottomPickerBox>
                                <BottomPickerTxt>{item}</BottomPickerTxt>
                            </BottomPickerBox>
                        </TouchableOpacity>
                    )
                })}
            </AnimatedBottomPickerView>


            <AnimatedBottomPickerView
                 style={[{ transform: [{ translateY: picker2BoxPositionY }] }]}  
            >
                <BottomBtnBox>
                    <BottomSelectTitle>신고 사유</BottomSelectTitle>

                    <BottomSelectTouch onPress={()=>{sendBadReason('선정적')}}>
                        <BottomSelectTxt>선정적 내용</BottomSelectTxt>
                    </BottomSelectTouch>
                    <BottomSelectTouch onPress={()=>{sendBadReason('폭력적/혐오적')}}>
                        <BottomSelectTxt>폭력적/혐오적 내용</BottomSelectTxt>
                    </BottomSelectTouch>
                    <BottomSelectTouch onPress={()=>{sendBadReason('광고/홍보성')}}>
                        <BottomSelectTxt>광고/홍보성 내용</BottomSelectTxt>
                    </BottomSelectTouch>
                    <BottomSelectTouch onPress={()=>{sendBadReason('관련없음')}}>
                        <BottomSelectTxt>관련 없는 내용</BottomSelectTxt>
                    </BottomSelectTouch>
                    <BottomSelectTouch onPress={()=>{sendBadReason('기타')}}>
                        <BottomSelectTxt>기타사유</BottomSelectTxt>
                    </BottomSelectTouch>

                </BottomBtnBox>    
            </AnimatedBottomPickerView>
            
        </BottomPickerModal>
            


)}

export default BottomPicker;