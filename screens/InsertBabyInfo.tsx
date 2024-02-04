import { useNavigation } from "@react-navigation/native";
import react, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import colors from "../common/commonColors";
import { BasicView, PaddingView, Space10, Space15, Space20, Space35, Space5 } from "../common/commonStyledComp";
import { Alert, DeviceEventEmitter, Platform, Pressable} from "react-native";
import { getFromDateTypeToString, getToday, getWindowWidth } from "../common/commonFunc";
import { Ionicons } from '@expo/vector-icons'; 

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { insertBabyInfo, insertBabyInfoWithImg } from "../common/insertApi";



const os = Platform.OS;
const windowWidth = getWindowWidth();


const InputBox = styled.View`
    width:100%; height:45px; background-color: #FFFFFF; border-radius: 8px; position: relative;
`
const InputTxt = styled.Text`
    font-size: 13px; line-height: 45px; color:${colors.textGray}; padding-left: 10px;
`
const Input = styled.TextInput`
    width:${windowWidth - 40 - 100}px; height:45px; position: absolute; left:100px; font-size: 13px;
`
const InputSpaceView = styled.Text`
    width:${windowWidth - 40 - 100}px; height:45px; position: absolute; left:100px; font-size: 13px; flex-direction: row;
`
const CalendarPress = styled.Pressable`
    width:${windowWidth - 40 - 100}px; height:45px; position: absolute; left:100px;
`

const GenderBox = styled.View`
    height:45px;  flex-direction: row;
`
const GenderPress = styled.Pressable`
    justify-content:center; align-items:center; flex-direction: row;
`
const GenderTxt = styled.Text`
    font-size: 13px; color:${colors.textBlack}; line-height:45px; padding-left: 4px; padding-right:20px;
`

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

const InsertBabyInfo = () => {
    
    const navigation:any = useNavigation();
    
    const [babyImgUrl, setBabyImgUrl] = useState('');
    const [babyNickname, setBabyNickname] = useState('');
    const [babyBirthday, setBabyBirthday] = useState('');
    const [babyGender, setBabyGender] = useState('');

    const [isSendDisable, setIsSendDisable] = useState(true);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const maximumDate = new Date(); // 오늘 날짜

    //페이지 종료 시 마이페이지 refetch 할수있게 정보 던지기
    useEffect(() => {
        return () => {
            DeviceEventEmitter.emit('backFromInsertBabyInfo');
        }
    }, []);


    //정보 입력에 따른 확인버튼 활성화 비활성화 처리
    useEffect(()=>{
        if(babyNickname.length>1&&babyBirthday.length!=0&&babyGender.length!=0){
            setIsSendDisable(false);
        }else{
            setIsSendDisable(true);
        }
    },[babyNickname,babyBirthday,babyGender]);


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
        setBabyImgUrl(assets[0].uri);
    }




    const sendBabyInfo = async () =>{
        const uriArr = babyImgUrl.split('/');
        const filename = uriArr[uriArr.length-1]
        const babyInfo ={babyNickname, babyBirthday, babyGender}

        if(filename.length==0){
            await insertBabyInfo(babyInfo);
        }else{
            const formData = new FormData();
            formData.append('image', {
                uri: babyImgUrl,
                type: 'image/jpeg',
                name: filename,
            });
            formData.append('babyNickname', babyNickname);
            formData.append('babyBirthday', babyBirthday);
            formData.append('babyGender', babyGender);
            await insertBabyInfoWithImg(formData);
        }
        setIsSendDisable(true);
        goMyPage();
    }


    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date:Date) => {
        const dateStr = getFromDateTypeToString(date);
        setBabyBirthday(dateStr);
        hideDatePicker();
    };



    function goMyPage(){
        navigation.navigate('Tabs', {screen: '마이페이지', params:{} });
    }

    return (
    <BasicView style={{backgroundColor:colors.backgroundLightGray}}>
        <PaddingView>
            <Space20 />
            <ProfileImgView>
                <ProfileImgPress onPress={requestPermission}>
                    {babyImgUrl==''?
                    <ProfileImg source={require('../assets/profile/defaultProfile.png')}/>
                    :
                    <ProfileImg source={{uri:babyImgUrl}}/>
                    }
                    <CameraBox>
                        <Ionicons name="camera" size={24} color={colors.textBlack}/>
                    </CameraBox>
                </ProfileImgPress>
            </ProfileImgView>
            
            <Space15 />

            <InputBox>
                <InputTxt>닉네임</InputTxt>
                <Input 
                    placeholder="닉네임을 입력해 주세요" 
                    onChangeText={(txt)=>{setBabyNickname(txt)}} 
                    placeholderTextColor= {colors.textLightGray}
                    autoFocus
                    maxLength={6}
                />
            </InputBox>

            <Space10 />


            {/* <Pressable style={{backgroundColor:'red'}}> */}
            <InputBox>
                <InputTxt>출생일자</InputTxt>
                    {/* <FakeInput>{babyBirthday}</FakeInput> */}
                    <Input 
                        placeholder="출생일자를 입력해 주세요." 
                        value={babyBirthday}
                        placeholderTextColor= {colors.textLightGray}
                />
                <CalendarPress onPress={()=>{setDatePickerVisibility(true)}} />
            </InputBox>

            <Space10 />

            <InputBox>
                <InputTxt>성별</InputTxt>
                <InputSpaceView>
                    <GenderBox>
                        <GenderPress onPress={()=>{setBabyGender('남')}}>
                            <Ionicons name="ios-checkmark-circle" size={18} color={babyGender=='남'?colors.logoBlue:colors.underlineGray} />
                            <GenderTxt>남아</GenderTxt>
                        </GenderPress>

                        <GenderPress onPress={()=>{setBabyGender('여')}}>
                            <Ionicons name="ios-checkmark-circle" size={18} color={babyGender=='여'?colors.logoBlue:colors.underlineGray}/>
                            <GenderTxt>여아</GenderTxt>
                        </GenderPress>
                    </GenderBox>



                    
                </InputSpaceView>
            </InputBox>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                cancelTextIOS='취소'
                confirmTextIOS='확인'
                maximumDate={maximumDate}
            />



            <Space20 />
            <FinishPress
                disabled={isSendDisable}
                onPress ={sendBabyInfo}
                style={!isSendDisable&&{backgroundColor:colors.logoBlue}}
            >
                <FinishPressTxt>동록하기</FinishPressTxt>
            </FinishPress>
        </PaddingView>

    </BasicView>
)};

export default InsertBabyInfo;




