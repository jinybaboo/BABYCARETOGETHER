import { useNavigation } from "@react-navigation/native";
import react, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import colors from "../common/commonColors";
import { BasicView, PaddingView, Space10, Space15, Space20, Space35, Space5 } from "../common/commonStyledComp";
import { Keyboard, Platform, KeyboardAvoidingView, Pressable, Text, Alert} from "react-native";
import { getIphoneBottomInfo, getWindowHeight, getWindowWidth, removeDuplicateArray, removeDuplicateJsonArrData } from "../common/commonFunc";
import CustomHeaderLeftXRightBtn from "../components/CustomHeaderLeftXRightBtn";
import { Ionicons, EvilIcons } from '@expo/vector-icons'; 



import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';



const os = Platform.OS;
const windowWidth = getWindowWidth();
const windowHeight = getWindowHeight();


const TitleInput = styled.TextInput`
    width:100%; height:60px; font-size:18px; font-weight:600;
`
const ContentInput = styled.TextInput`
    width:100%; height:100%; font-size: 15px;
`

const CameraImgView = styled.View`
    flex-direction:row; padding: 10px 0; border-top-width:1px; border-top-color:${colors.backgroundLightGray}; 
    border-bottom-width:1px; border-bottom-color:${colors.backgroundLightGray};
`
const CameraPress = styled.TouchableOpacity`
    width:50px; height:50px; border-radius:6px; border:1px solid ${colors.logoGreenOpacity}; align-items:center; justify-content: center;
`
const PreviewImgBox = styled.View`
    width:50px; height:50px;   margin-left:10px; position:relative;
`
const PreviewImg = styled.Image`
    width:50px; height:50px; border-radius:6px;
`
const CameraTxt = styled.Text`
    font-family: 'noto300'; font-size: 10px; line-height: 15px; color:${colors.logoGreen}; 
`
const DelImgPress = styled.Pressable`
    width:22px; height:22px; position:absolute; right:-5px; top:-10px; align-items:flex-end; justify-content: flex-end;
`


const WriteCustomerOpinion = () => {
    
    const navigation:any = useNavigation();

    const basicInputHeight = os=='ios'?windowHeight-270:windowHeight-180;

    const [contentInputHeight, setContentInputHeight] = useState(basicInputHeight);
    const [selectedImg, setSelectedImg] = useState([]);
    const [selectedImgCount, setSelectedImgCount] = useState(0);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const titleInputRef:any = useRef(null);
    const contentInputRef:any = useRef(null);
    

    const [isSendDisable, setIsSendDisable] = useState(false)

    // 기보드 활성화 될때 인풋 패딩 높이 조절
    Keyboard.addListener('keyboardDidShow', (event) => {
        // 키보드 활성화시 인풋태그 이동 및 스크롤 위로 올림 처리!!! 
        const hasIosBottom = getIphoneBottomInfo();
        const keyboardHeight = event.endCoordinates.height;
        const fixedHeight:number = hasIosBottom?keyboardHeight-30:keyboardHeight;
        
        setContentInputHeight(basicInputHeight - fixedHeight );
    });

    // 기보드 활성화 될때 인풋 패딩 높이 조절
    Keyboard.addListener('keyboardDidHide', (event) => {
        setContentInputHeight(basicInputHeight);
    });
       



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
      
      const delImage = (idx:number) =>{
        
        let tempArr = [...selectedImg];
        const filtered = tempArr.filter((value, index, arr) => {
            return index != idx;
        });
        setSelectedImg(filtered);
        setSelectedImgCount(filtered.length)
      }
      
      
      
      

    const selectImage =async () =>{
        if(selectedImgCount>=2){
            Alert.alert( //alert 사용							
                '잠깐!', '이미지는 최대 2개까지 선택 가능합니다.', [ //alert창 문구 작성						
                    {text: '확인', onPress: () => {} }, 		
                ]						
            );		
            return;
        }


        const options:any ={
            mediaType: 'photo', //필수값
            selectionLimit:2-selectedImgCount //사진갯수 제한
        }
        const result:any = await launchImageLibrary(options);
        if (result.didCancel){
          return null;
        } 
        const {assets} = result;
        let finalSelectedImgArr:any = [...selectedImg, ...assets];
        //console.log(finalSelectedImgArr)
        //중복 제거
        //finalSelectedImgArr = removeDuplicateJsonArrData(finalSelectedImgArr, 'fileSize')
        //console.log(result)
        setSelectedImg(finalSelectedImgArr);
        setSelectedImgCount(finalSelectedImgArr.length)
        
    }

    function onChangeTitle(text:string){
        setTitle(text);
    }
    function onChangeContent(text:string){
        setContent(text);
    }

    function sendContent(data:any){
        if(title.length <5){
            Alert.alert( //alert 사용							
                '잠깐!', '제목은 5자 이상으로 작성해 주세요.', [ 	
                    {text: '확인', onPress: () => {titleInputRef.current.focus()} }, 		
                ]						
            );		
            return;
        }

        if(content.length <10){
            Alert.alert( //alert 사용							
                '잠깐!', '내용은 10자 이상으로 작성해 주세요.', [ 	
                    {text: '확인', onPress: () => {contentInputRef.current.focus()} }, 		
                ]						
            );		
            return;
        }
        

        console.log(title, content, selectedImg)

        //완료버튼 비활성화
        setIsSendDisable(true);

        //CommunityBoard 페이지로 이동
        goCommunityBoard()
    }


    // stack 페이지에서 tab 페이지로 바로 이동하기 
    function goCommunityBoard(){
        navigation.navigate('Tabs', {screen: 'CommunityBoard'});
    }

    return (
    <BasicView>
        <CustomHeaderLeftXRightBtn 
            title='고객의견'
            from='writeCustomerOpinion'
            isSendDisable ={isSendDisable}
            onData = {sendContent}
        />


        <PaddingView>
            <CameraImgView>
                <CameraPress onPress={requestPermission}>
                    <Ionicons name="camera" size={22} color={colors.logoGreen} />
                   
                    <CameraTxt>{selectedImgCount}/2</CameraTxt>
                </CameraPress>
                {
                selectedImg.map((item:any, idx)=>{
                    return(
                        <PreviewImgBox key={idx+''} >
                            <PreviewImg source={{uri:item.uri}}/>
                            <DelImgPress onPress={()=>{delImage(idx)}}>
                                <Ionicons name="close-circle-sharp" size={18} color="black" />
                            </DelImgPress>
                        </PreviewImgBox>
                    )
                })
                }
                
            </CameraImgView>

            <TitleInput 
               placeholder="제목"
               placeholderTextColor={colors.textLightGray}
               ref = {titleInputRef}
               autoFocus = {true}
               onChangeText={onChangeTitle} 
               
            />

            <KeyboardAvoidingView style={{height:contentInputHeight, paddingBottom:30}}>
            <ContentInput 
                placeholder="육아동기는 고객의 의견을 통해 성장해 갑니다."
                placeholderTextColor={colors.textLightGray}
                style={{textAlignVertical:'top'}}	
                multiline = {true}	
                numberOfLines = {10}	
                ref = {contentInputRef}
                onChangeText={onChangeContent} 
            />
            </KeyboardAvoidingView>

        </PaddingView>

    </BasicView>
)};

export default WriteCustomerOpinion;




