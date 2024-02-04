import { useNavigation } from "@react-navigation/native";
import react, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import colors from "../common/commonColors";
import { BasicView, LineE2E2E2, LineF2F2F2, PaddingView, Space10, Space15, Space20, Space35, Space5 } from "../common/commonStyledComp";
import { Platform} from "react-native";
import { getWindowWidth } from "../common/commonFunc";
import NoContent from "../components/NoContent";
import { Ionicons } from '@expo/vector-icons'; 

const os = Platform.OS;
const windowWidth = getWindowWidth();

const testData = ['','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''];

const DmFlatList = styled.FlatList`

`
const MessageView = styled.View`
    width:100%; margin-bottom: 5px;
`
const MessageBox = styled.View`
    width:100%; height:55px; padding:9px 20px 15px 10px; position: relative;
    border-bottom-color:#F2F2F2; border-bottom-width:1px;;
`
const MessageLeftPress = styled.Pressable`
    width:${windowWidth-40 -50}px;
`
const MessageInner = styled.View`
    flex-direction: row; align-items: center;
`
const MessageCircleOn = styled.View`
    width:5px; height:5px; background-color:${colors.logoRed}; border-radius:5px;
`
const MessageCircleOff = styled.View`
    width:5px; height:5px; background-color:#E2E2E2; border-radius:5px;
`

const MessageTxt1 = styled.Text`
   width:95%; font-family: 'noto500'; font-size: 14px; line-height: 17px; color:${colors.textBlack}; padding-left: 5px; padding-top:1.5px;
`
const MessageTxt1Off = styled(MessageTxt1)`
   color:${colors.textLightGray};
`
const MessageTxt2 = styled.Text`
    font-family: 'noto300'; font-size: 12px; line-height: 15px; color:${colors.textGray}; padding-left: 13px; padding-top:3px;
`
const DelDemPress = styled.Pressable`
    width:30px; height:55px; position: absolute; right:0; align-items:center; justify-content: center;

`

const DmBox = () => {
    const [isDmExist, setIsDmExist] = useState(true);
    
    const navigation:any = useNavigation();

    function goDmContent(){
        navigation.navigate('Stack', {screen: 'DmContent', params:{}});
    }


    const renderContents = ({item, index}:any) => {		
        const isThumbExist = item?.thumbUrl==null?false:true;
        return(
            <MessageBox>
                <MessageLeftPress onPress={goDmContent}>
                    {index%2==0?
                    <MessageInner >
                        <MessageCircleOn />
                        <MessageTxt1 numberOfLines={1}>안녕하세요 물어볼것이 있어셔 쪽지 드립니다. 저는 가나다라마바사 아자차카</MessageTxt1>
                    </MessageInner>
                    :
                    <MessageInner>
                        <MessageCircleOff />
                        <MessageTxt1Off numberOfLines={1}>안녕하세요 물어볼것이 있어셔 쪽지 드립니다. 저는 가나다라마바사 아자차카</MessageTxt1Off>
                    </MessageInner>
                    }
                    <MessageTxt2>From 동그리맘 · 23-03-08 [14:55]</MessageTxt2>
                </MessageLeftPress>

                <DelDemPress>
                    <Ionicons name="close-outline" size={20} color={colors.textLightGray} />
                </DelDemPress>
            </MessageBox>
            

        )
    };

    return (
    <BasicView>
        {
        isDmExist?
        <PaddingView>
            <MessageView>
                <DmFlatList
                    data = {testData}							
                    renderItem={renderContents}							
                    keyExtractor={(item, index) => index.toString()+""}							
                    showsVerticalScrollIndicator={false}							
                    // onEndReached={getMoreContent}							
                    // onEndReachedThreshold={0.8}							
                >
                </DmFlatList>
            </MessageView>
        </PaddingView>
        :
        <NoContent title='받은 쪽지가 없습니다'/>
        }

    </BasicView>
)};

export default DmBox;




