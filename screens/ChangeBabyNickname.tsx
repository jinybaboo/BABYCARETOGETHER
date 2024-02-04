import { useNavigation } from "@react-navigation/native";
import react, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import colors from "../common/commonColors";
import { BasicView, PaddingView, Space10, Space15, Space20, Space35, Space5 } from "../common/commonStyledComp";
import { Platform} from "react-native";
import { getWindowWidth } from "../common/commonFunc";

const os = Platform.OS;
const windowWidth = getWindowWidth();


const InputBox = styled.View`
    width:100%; height:45px; background-color: #FFFFFF; border-radius: 8px; position: relative;
`
const InputTxt = styled.Text`
    font-size: 13px; line-height: 45px; color:${colors.textGray}; padding-left: 10px;
`
const Input = styled.TextInput`
    width:${windowWidth - 40 - 100}px; height:45px; position: absolute; left:100px;
    font-size: 13px;
`

const FinishPress = styled.TouchableOpacity`
    width:100%; height:45px; background-color:${colors.logoBlueOpacity}; border-radius: 8px;
`
const FinishPressTxt = styled.Text`
    font-family: 'noto700'; font-size: 13px; line-height: 45px; color:#FFFFFF; text-align: center;
`

const ChangeBabyNickname = () => {
    
    const navigation:any = useNavigation();
    
    const [nickname, setNickname] = useState('해린이엄마');

    const [isSendDisable, setIsSendDisable] = useState(false);

    const nickInput:any = useRef(null);

    
    //정보 입력에 따른 확인버튼 활성화 비활성화 처리
    useEffect(()=>{
        console.log(nickname.length)
        if(nickname.length>1){
            setIsSendDisable(false);
        }else{
            setIsSendDisable(true);
        }
    },[nickname])


    const sendNickname = () =>{
        console.log(nickname);

        setIsSendDisable(true);
        goMyPage();
    }


    function goMyPage(){
        navigation.navigate('Tabs', {screen: '마이페이지', params:{} });
    }
    

    return (
    <BasicView style={{backgroundColor:colors.backgroundLightGray}}>
        <PaddingView>
            <Space20 />

            <InputBox>
                <InputTxt>닉네임</InputTxt>
                <Input 
                    placeholder="닉네임을 입력해 주세요" 
                    value={nickname}
                    onChangeText={(txt)=>{setNickname(txt)}} 
                    autoFocus={true}
                    maxLength={6}
                />
            </InputBox>

            <Space15 />

            <FinishPress
                disabled={isSendDisable}
                onPress ={sendNickname}
                style={!isSendDisable&&{backgroundColor:colors.logoBlue}}
            >
                <FinishPressTxt>확인</FinishPressTxt>
            </FinishPress>
        </PaddingView>

    </BasicView>
)};

export default ChangeBabyNickname;




