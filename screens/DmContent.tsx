import { useNavigation } from "@react-navigation/native";
import react, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import colors from "../common/commonColors";
import { BasicView, HeaderSpaceForAndroid, LineE2E2E2, LineF2F2F2, PaddingView, Space10, Space15, Space20, Space35, Space5 } from "../common/commonStyledComp";
import { Platform, Pressable} from "react-native";
import { getWindowWidth } from "../common/commonFunc";
import CustomHeaderLeftArrow from "../components/CustomHeaderLeftArrow";
import { Ionicons,  MaterialCommunityIcons } from '@expo/vector-icons'; 
import AutoHeightImage from "react-native-auto-height-image";
import BottomPicker from "../components/BottomPicker";

const os = Platform.OS;
const windowWidth = getWindowWidth();

const DmScrollView = styled.ScrollView``

const ProfileBox = styled.View`
    margin-top: 15px; flex-direction: row; align-items: center; justify-content: space-between;
`
const ProfileInnerBoxPress = styled.Pressable`
    flex-direction: row; 
`
const ProfileImg = styled.Image`
    width:35px; height:35px; border-radius: 35px;
`
const ProfileTxtBox = styled.View`
    justify-content: center; padding-left: 6px;
`

const ProfileTxt1 = styled.Text`
    font-family: 'noto400'; font-size:12px; line-height: 15px; color:${colors.textBlack}; padding-top: 2px;
`
const ProfileTxt2 = styled.Text`
    font-family: 'noto400'; font-size:10px; line-height: 13px; color:${colors.textGray}; letter-spacing: -0.5px;
`

const Profile3DotPress = styled.Pressable`
    height:100%; width:30px; align-items: center; padding-top:6px;
`


const ContentTitle = styled.Text`
    font-family: 'noto700'; font-size:16px; line-height: 22px; color:${colors.textBlack}; padding-top:8px; letter-spacing: -0.2px;
`
const ContentTxt = styled.Text`
    font-family: 'noto400'; font-size:15px; line-height: 22px; color:${colors.textBlack}; padding-top:15px; letter-spacing: -0.2px;
`
const FinishPress = styled.TouchableOpacity`
    width:100%; height:45px; background-color:${colors.logoBlue}; border-radius: 8px;
`
const FinishPressTxt = styled.Text`
    font-family: 'noto700'; font-size: 13px; line-height: 45px; color:#FFFFFF; text-align: center;
`


const DmContent = () => {
    
    const navigation:any = useNavigation();

    const [isBottomPickerShow, setIsBottomPickerShow] = useState(false);

    function goUserHome(id:any){
        navigation.navigate("Stack", { screen:"UserHome", params:{}})
    }

    function goWriteDm(){
        navigation.navigate("Stack", { screen:"WriteDM", params:{}})
    }

    function openBottomPicker(){
        setIsBottomPickerShow(true)
    }

    function handleBottomPickerData(data:any){
        const {type} = data;
        console.log('data', data)
        if(type=='hideBottomPicker'){setIsBottomPickerShow(false)}
        else if(type=='신고하기'){
            const {badReason} = data;
            console.log(badReason);
        } else if(type=='삭제하기'){
            console.log('삭제하기');
        }
    }


    return (
    <BasicView>
        <HeaderSpaceForAndroid />
        <CustomHeaderLeftArrow title='동그리맘 쪽지'/>
        <DmScrollView>
            <PaddingView>
                <ProfileBox>
                    <ProfileInnerBoxPress onPress={()=>{goUserHome(1)}}>
                        <ProfileImg source={require('../assets/profile/donggle.png')}/>
                        <ProfileTxtBox>
                            <ProfileTxt1>동그리맘</ProfileTxt1>
                            <ProfileTxt2>2022-12-26 16:24</ProfileTxt2>
                        </ProfileTxtBox>
                    </ProfileInnerBoxPress>

                    <Profile3DotPress onPress={()=>{openBottomPicker()}}>
                        <MaterialCommunityIcons name="dots-horizontal" size={22} color={colors.textBlack} />
                    </Profile3DotPress>
                </ProfileBox>
            </PaddingView>
            <Space15 />
            <LineF2F2F2 />

            <PaddingView>
                <ContentTitle>모든 StackNavigator에서 공통으로 사용할 수 있는 방법도 있습니다.</ContentTitle>
                <ContentTxt>
                '우승 후보' 미국이 주장 마이크 트라웃(32·LA 에인절스)의 활약 덕에 2023 월드베이스볼클래식(WBC) {'\n\n'}8강행 막차 티켓을 확보했다. 반면 '초호화 군단' 도미니카공화국은 이번 대회 가장 큰 이변의 희생양이 됐다.
                '우승 후보' 미국이 주장 마이크 트라웃(32·LA 에인절스)의 활약 덕에 2023 월드베이스볼클래식(WBC) {'\n\n'}8강행 막차 티켓을 확보했다. 반면 '초호화 군단' 도미니카공화국은 이번 대회 가장 큰 이변의 희생양이 됐다.
                </ContentTxt>

                <Space35 />

                <FinishPress onPress={goWriteDm}>
                    <FinishPressTxt>답장하기</FinishPressTxt>
                </FinishPress>

                <Space35 />
            </PaddingView>
        </DmScrollView>

        {
        isBottomPickerShow &&
        <BottomPicker 
            data={['신고하기','삭제하기']}
            onData={handleBottomPickerData}
        />
}

    </BasicView>
)};

export default DmContent;




