import { useNavigation } from "@react-navigation/native";
import react, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import colors from "../common/commonColors";
import { BasicView, PaddingView, Space10, Space15, Space20, Space35, Space5 } from "../common/commonStyledComp";
import { Alert, Platform} from "react-native";
import { getWindowWidth } from "../common/commonFunc";
import { Ionicons } from '@expo/vector-icons'; 

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';


const os = Platform.OS;
const windowWidth = getWindowWidth();


const ProfileImgView = styled.View`
    width:100%; align-items: center; 
`
const ProfileImgPress = styled.Pressable`
     width:90px; height:90px; position: relative;
`
const ProfileImg = styled.Image`
    width:90px; height:90px; border-radius: 90px;
`

const CameraBox = styled.View`
    position: absolute; right:5px; bottom:5px; width:24px; height:24px;
`

const FinishPress = styled.TouchableOpacity`
    width:100%; height:45px; background-color:${colors.logoBlueOpacity}; border-radius: 8px;
`
const FinishPressTxt = styled.Text`
    font-family: 'noto700'; font-size: 13px; line-height: 45px; color:#FFFFFF; text-align: center;
`

const ChangeProfileImg = () => {
    
    const navigation:any = useNavigation();
    
    const [profileUri, setProfileUri] = useState('');

    const [isSendDisable, setIsSendDisable] = useState(true);

    const nickInput:any = useRef(null);

    useEffect(()=>{

        
    },[]);




    const requestPermission = async () => {
        const PERMISSION_TYPE = os === 'android' ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE : PERMISSIONS.IOS.PHOTO_LIBRARY;

        try {
            const result = await request(PERMISSION_TYPE);
            if (result === RESULTS.GRANTED) {
            //console.log(os, 'Photo Permission granted');
            selectImage();
            } else {
            const alertTxt = os==='ios'?`사집첩 접근 권한이 없습니다${'\n'}설정 - 육아동기앱 - 사진 접근 허용을 '모든 사진 접근허용'으로 설정해 주세요`
                            :`사집첩 접근 권한이 없습니다${'\n'}설정 - 애플리케이션 - 육아동기앱 - 권한 - 사진 및 동영상 접근 권한을 허용해 주세요`
            
            Alert.alert( //alert 사용							
                '이런!', alertTxt, [ //alert창 문구 작성						
                    {text: '확인', onPress: () => {} }, 		
                ]						
            );							
            }
        } catch (error) {
            console.log(error);
        }
    };


    const selectImage =async () =>{
        const options:any ={
            mediaType: 'photo', //필수값
            selectionLimit:1 //사진갯수 제한
        }
        const result:any = await launchImageLibrary(options);
        if (result.didCancel){
          return null;
        } 
        const {assets} = result;
        setProfileUri(assets[0].uri);

        setIsSendDisable(false)
        
    }




    const sendProfileImg = () =>{
        console.log(profileUri);
        setIsSendDisable(true);

        goMyPage()
    }

    function goMyPage(){
        navigation.navigate('Tabs', {screen: '마이페이지', params:{} });
    }
    

    return (
    <BasicView style={{backgroundColor:colors.backgroundLightGray}}>
        <PaddingView>
            <Space20 />
            <ProfileImgView>
                <ProfileImgPress onPress={requestPermission}>
                    <ProfileImg source={{uri:profileUri}}/>
                    <CameraBox>
                        <Ionicons name="camera" size={24} color={colors.textBlack}/>
                    </CameraBox>
                </ProfileImgPress>
            </ProfileImgView>
            
            <Space15 />

            <FinishPress
                disabled={isSendDisable}
                onPress ={sendProfileImg}
                style={!isSendDisable&&{backgroundColor:colors.logoBlue}}
            >
                <FinishPressTxt>확인</FinishPressTxt>
            </FinishPress>
        </PaddingView>

    </BasicView>
)};

export default ChangeProfileImg;




