import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import colors from "../common/commonColors";
import { getWindowWidth } from "../common/commonFunc";
import { AntDesign, EvilIcons } from '@expo/vector-icons'; 

const windowWidth = getWindowWidth();


const ContentBox = styled.View`
    border-bottom-color:#F2F2F2; border-bottom-width: 1px; padding:15px 20px; flex-direction:row; justify-content:space-between; position:relative;
`
const ContentInnerBox1 = styled.View``

const ContentTitleBox = styled.View`
    width:100%;
`
const ContentTitle = styled.Text`
    font-family: 'noto500'; font-size: 14px; line-height: 19px; color:${colors.textBlack}; letter-spacing: -0.1px;
`
const ContentNicknameBox =styled.View`
    flex-direction: row;
`
const ContentNickname = styled.Text`
    font-family: 'noto400'; font-size: 11px; line-height: 14px; color:${colors.textBlack}; letter-spacing: -0.5px; margin-top: 7px;
`
const ContentInfotxt = styled(ContentNickname)`
    color:${colors.textGray};
`
const ContentThumbImg = styled.Image`
    width:50px; height:50px; border-radius: 8px;
`
const CommentBox = styled.View`
    flex-direction:row;
`
const CommentTxt = styled(ContentInfotxt)`

`


const CommunityBoardBox = ({data, from}:any)=>{
    const navigation:any = useNavigation();

    function goCommunityContent(id:any){
        navigation.navigate("Stack", { screen:"CommunityContent", params:{}})
    }

    const isThumbExist = data?.thumbUrl==null?false:true;


    return(
        <TouchableOpacity onPress={()=>{goCommunityContent(data?.id)}}>
            <ContentBox>
                <ContentInnerBox1>
                    <ContentTitleBox>
                        <ContentTitle style={isThumbExist&&{width:windowWidth-110}} numberOfLines={1}>{data.title}</ContentTitle>
                    </ContentTitleBox>	

                    <ContentNicknameBox>
                        <ContentNickname>동그리맘</ContentNickname>
                        {from=='search'?
                        <ContentInfotxt> · 24개월 · 부산 연제구 · 1시간전</ContentInfotxt>
                        :
                        <ContentInfotxt> · {from=='지역동기'?'24개월':'부산 연제구'} · 1시간전</ContentInfotxt>
                        }
                    </ContentNicknameBox>
                    
                    {data.commentCount !=0 && 
                    <CommentBox>
                        <EvilIcons style={{marginTop:6.5}} name="comment" size={18} color={colors.textGray} />
                        <CommentTxt>{data.commentCount}</CommentTxt>
                    </CommentBox>}
                </ContentInnerBox1>
                
                {isThumbExist && <ContentThumbImg source={require('../assets/profile/donggle.png')}/>}
            </ContentBox>	
        </TouchableOpacity>	
    )
}

export default CommunityBoardBox;