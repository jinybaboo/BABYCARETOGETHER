import { useNavigation } from "@react-navigation/native";
import react, { useEffect, useState } from "react";
import {View, Text, Pressable, TouchableOpacity} from "react-native";
import styled from "styled-components/native";
import colors from "../common/commonColors";
import { BasicView, HeaderSpaceForAndroid, LineE2E2E2, LineF2F2F2, PaddingView, Space10, Space20 } from "../common/commonStyledComp";
import { AntDesign, EvilIcons } from '@expo/vector-icons'; 
import { getWindowWidth } from "../common/commonFunc";
import NoContent from "../components/NoContent";
import { useQuery } from "react-query";
import * as commonApi from "../common/commonApi";


import ImagePicker from 'react-native-image-picker';
import CommunityBoardBox from "../components/CommunityBoardBox";


const windowWidth = getWindowWidth();

// 헤드 메뉴 부분

const PageTitleView = styled.View`
    width:100%; height:40px; justify-content:center; padding-left:20px;
`
const PageTitleTxt = styled.Text`
    font-family: 'noto500'; font-size:20px; line-height: 23px; color:${colors.logoOrange}; letter-spacing: -1px; padding-top:9px;
`

const BoardSelBtnView = styled.View`
    width:100%; height: 40px; flex-direction: row; margin-top:5px;
`
const BoardSelBtnPress = styled.Pressable`
    height:100%; padding-right:20px;
`
const BoardSelBtnBox = styled.View`
    height:100%; align-items: center; justify-content: center; position: relative;
`

const BoardSelTxt = styled.Text`
    font-family: 'noto300'; font-size: 14px; line-height: 19px; color:${colors.textGray}; letter-spacing: -0.2px;
`
const BoardSelTextActive = styled(BoardSelTxt)`
    font-family: 'noto500'; color:${colors.logoOrange};
`

const BoardSelUnderline = styled.View`
    width:100%; height:1px;background-color:#E2E2E2; position: absolute; bottom:0px;
`
const BoardSelUnderlineActive = styled(BoardSelUnderline)`
   height:2px;background-color:${colors.logoOrange};
`


const ContentFlatList = styled.FlatList``

const WriteBtnPress = styled.TouchableOpacity`
    width:60px; height:60px; position:absolute; right:10px; bottom:10px; 
`
const WriteBtnBox = styled.View`
    position:absolute; right:10px; bottom:10px; width:40px; height:40px; background-color:#FFFFFF; border-radius:40px;
`

const CommunityBoard = () => {
    const [currentBoard, setCurrentBoard] = useState('지역동기');
    const [isContentExist, setIsContentExist] = useState(true);

    //const [boardData, setBoardData] = useState([]);


    const navigation:any = useNavigation();

    let boardData:any;

    if(currentBoard==='지역동기'){
        const { isLoading, error, data:example } = useQuery({
            // example 라는 key로 데이터를 받아온다.
            queryKey: ['example'],
            // 데이터를 요청하는 함수
            queryFn: commonApi.getDataExample,
        })
        console.log(isLoading, '지역동기 데이터 호출')
        const testData:any = [
            {
                title:'지역동기 데이터 전국의 동기들과 지혜롭게 아이를 키워요. 지역아 이콘이 필요 출생아 이콘, 지역아 이콘이 필요해 요해요',
                nickname:'동그리맘',
                babyMonth:'18개월',
                writeTime:'1시간전',
                commentCount:12,
                thumbUrl :'../assets/profile/defaultProfile.png',
            },{
                title:'전국의 동기들과 지혜롭게 아이를 키워요',
                nickname:'동그리맘',
                babyMonth:'18개월',
                writeTime:'1시간전',
                commentCount:0,
                thumbUrl :'../assets/profile/donggle.png',
            },
            {
                title:'전국의 동기들과 지혜롭게 아이를 키워요',
                nickname:'동그리맘',
                babyMonth:'18개월',
                writeTime:'1시간전',
                commentCount:7,
                thumbUrl :'../assets/profile/donggle.png',
            },{
                title:'전국의 동기들과 지혜롭게 아이를 키워요. 지역아 이콘이 필요 출생아 이콘, 지역아 이콘이 필요해 요해요 이콘이 필요 출생아 이콘, 지역아 이콘이 필요해 요해요',
                nickname:'동그리맘',
                babyMonth:'18개월',
                writeTime:'1시간전',
                commentCount:0,
                thumbUrl : null,
            },{
                title:'전국의 동기들과 지혜롭게 아이를 키워요. 지역아 이콘이 필요 출생아 이콘, 지역아 이콘이 필요해 요해요 이콘이 필요 출생아 이콘, 지역아 이콘이 필요해 요해요',
                nickname:'동그리맘',
                babyMonth:'18개월',
                writeTime:'1시간전',
                commentCount:85,
                thumbUrl : null,
            },
            {
                title:'전국의 동기들과 지혜롭게 아이를 키워요. 지역아 이콘이 필요 출생아 이콘, 지역아 이콘이 필요해 요해요',
                nickname:'동그리맘',
                babyMonth:'18개월',
                writeTime:'1시간전',
                commentCount:3,
                thumbUrl :'../assets/profile/donggle.png',
            },{
                title:'전국의 동기들과 지혜롭게 아이를',
                nickname:'동그리맘',
                babyMonth:'18개월',
                writeTime:'1시간전',
                commentCount:0,
                thumbUrl : null,
            },{
                title:'전국의 동기들과 지혜롭게 아이를 키워요. 지역아 이콘이 필요 출생아 이콘, 지역아 이콘이 필요해 요해요',
                nickname:'동그리맘',
                babyMonth:'18개월',
                writeTime:'1시간전',
                commentCount:12,
                thumbUrl :'../assets/profile/defaultProfile.png',
            },{
                title:'전국의 동기들과 지혜롭게 아이를 키워요',
                nickname:'동그리맘',
                babyMonth:'18개월',
                writeTime:'1시간전',
                commentCount:0,
                thumbUrl :'../assets/profile/donggle.png',
            },
            {
                title:'전국의 동기들과 지혜롭게 아이를 키워요',
                nickname:'동그리맘',
                babyMonth:'18개월',
                writeTime:'1시간전',
                commentCount:7,
                thumbUrl :'../assets/profile/donggle.png',
            },{
                title:'전국의 동기들과 지혜롭게 아이를 키워요. 지역아 이콘이 필요 출생아 이콘, 지역아 이콘이 필요해 요해요 이콘이 필요 출생아 이콘, 지역아 이콘이 필요해 요해요',
                nickname:'동그리맘',
                babyMonth:'18개월',
                writeTime:'1시간전',
                commentCount:0,
                thumbUrl : null,
            },{
                title:'전국의 동기들과 지혜롭게 아이를 키워요. 지역아 이콘이 필요 출생아 이콘, 지역아 이콘이 필요해 요해요 이콘이 필요 출생아 이콘, 지역아 이콘이 필요해 요해요',
                nickname:'동그리맘',
                babyMonth:'18개월',
                writeTime:'1시간전',
                commentCount:85,
                thumbUrl : null,
            },
            {
                title:'전국의 동기들과 지혜롭게 아이를 키워요. 지역아 이콘이 필요 출생아 이콘, 지역아 이콘이 필요해 요해요',
                nickname:'동그리맘',
                babyMonth:'18개월',
                writeTime:'1시간전',
                commentCount:3,
                thumbUrl :'../assets/profile/donggle.png',
            },{
                title:'전국의 동기들과 지혜롭게 아이를',
                nickname:'동그리맘',
                babyMonth:'18개월',
                writeTime:'1시간전',
                commentCount:0,
                thumbUrl : null,
            },
        ];
        boardData = testData;
    }else{
        const { isLoading, error, data:example } = useQuery({
            // example 라는 key로 데이터를 받아온다.
            queryKey: ['example'],
            // 데이터를 요청하는 함수
            queryFn: commonApi.getDataExample,
        })
        console.log(isLoading, '출생동기 데이터 호출')
        const testData:any = [
            {
                title:'출생동기 데이터 전국의 동기들과 지혜롭게 아이를 키워요. 지역아 이콘이 필요 출생아 이콘, 지역아 이콘이 필요해 요해요',
                nickname:'동그리맘',
                babyMonth:'18개월',
                writeTime:'1시간전',
                commentCount:12,
                thumbUrl :'../assets/profile/defaultProfile.png',
            },{
                title:'전국의 동기들과 지혜롭게 아이를 키워요',
                nickname:'동그리맘',
                babyMonth:'18개월',
                writeTime:'1시간전',
                commentCount:0,
                thumbUrl :'../assets/profile/donggle.png',
            },
            {
                title:'전국의 동기들과 지혜롭게 아이를 키워요',
                nickname:'동그리맘',
                babyMonth:'18개월',
                writeTime:'1시간전',
                commentCount:7,
                thumbUrl :'../assets/profile/donggle.png',
            },{
                title:'전국의 동기들과 지혜롭게 아이를 키워요. 지역아 이콘이 필요 출생아 이콘, 지역아 이콘이 필요해 요해요 이콘이 필요 출생아 이콘, 지역아 이콘이 필요해 요해요',
                nickname:'동그리맘',
                babyMonth:'18개월',
                writeTime:'1시간전',
                commentCount:0,
                thumbUrl : null,
            },{
                title:'전국의 동기들과 지혜롭게 아이를 키워요. 지역아 이콘이 필요 출생아 이콘, 지역아 이콘이 필요해 요해요 이콘이 필요 출생아 이콘, 지역아 이콘이 필요해 요해요',
                nickname:'동그리맘',
                babyMonth:'18개월',
                writeTime:'1시간전',
                commentCount:85,
                thumbUrl : null,
            },
            {
                title:'전국의 동기들과 지혜롭게 아이를 키워요. 지역아 이콘이 필요 출생아 이콘, 지역아 이콘이 필요해 요해요',
                nickname:'동그리맘',
                babyMonth:'18개월',
                writeTime:'1시간전',
                commentCount:3,
                thumbUrl :'../assets/profile/donggle.png',
            },{
                title:'전국의 동기들과 지혜롭게 아이를',
                nickname:'동그리맘',
                babyMonth:'18개월',
                writeTime:'1시간전',
                commentCount:0,
                thumbUrl : null,
            },{
                title:'전국의 동기들과 지혜롭게 아이를 키워요. 지역아 이콘이 필요 출생아 이콘, 지역아 이콘이 필요해 요해요',
                nickname:'동그리맘',
                babyMonth:'18개월',
                writeTime:'1시간전',
                commentCount:12,
                thumbUrl :'../assets/profile/defaultProfile.png',
            },{
                title:'전국의 동기들과 지혜롭게 아이를 키워요',
                nickname:'동그리맘',
                babyMonth:'18개월',
                writeTime:'1시간전',
                commentCount:0,
                thumbUrl :'../assets/profile/donggle.png',
            },
            {
                title:'전국의 동기들과 지혜롭게 아이를 키워요',
                nickname:'동그리맘',
                babyMonth:'18개월',
                writeTime:'1시간전',
                commentCount:7,
                thumbUrl :'../assets/profile/donggle.png',
            },{
                title:'전국의 동기들과 지혜롭게 아이를 키워요. 지역아 이콘이 필요 출생아 이콘, 지역아 이콘이 필요해 요해요 이콘이 필요 출생아 이콘, 지역아 이콘이 필요해 요해요',
                nickname:'동그리맘',
                babyMonth:'18개월',
                writeTime:'1시간전',
                commentCount:0,
                thumbUrl : null,
            },{
                title:'전국의 동기들과 지혜롭게 아이를 키워요. 지역아 이콘이 필요 출생아 이콘, 지역아 이콘이 필요해 요해요 이콘이 필요 출생아 이콘, 지역아 이콘이 필요해 요해요',
                nickname:'동그리맘',
                babyMonth:'18개월',
                writeTime:'1시간전',
                commentCount:85,
                thumbUrl : null,
            },
            {
                title:'전국의 동기들과 지혜롭게 아이를 키워요. 지역아 이콘이 필요 출생아 이콘, 지역아 이콘이 필요해 요해요',
                nickname:'동그리맘',
                babyMonth:'18개월',
                writeTime:'1시간전',
                commentCount:3,
                thumbUrl :'../assets/profile/donggle.png',
            },{
                title:'전국의 동기들과 지혜롭게 아이를',
                nickname:'동그리맘',
                babyMonth:'18개월',
                writeTime:'1시간전',
                commentCount:0,
                thumbUrl : null,
            },
        ];
        boardData = testData;
    }




    function goWriteBoard(){
        navigation.navigate("Stack", { screen:"WriteBoard", params:{}})}

    

    const renderContents = ({item, index}:any) => {		
        const isThumbExist = item?.thumbUrl==null?false:true;
        return(
            <CommunityBoardBox data={item} from={currentBoard} />
        )
    };
    
    async function getMoreContent(){
        console.log('데이터 추가요먕!');
    }



    return (
    <BasicView>
        <HeaderSpaceForAndroid />
        <PageTitleView>
            <PageTitleTxt>동기소통</PageTitleTxt>
        </PageTitleView>

        <PaddingView>
            <BoardSelBtnView>
                <BoardSelBtnPress onPress={()=>{setCurrentBoard('지역동기')}}>
                    <BoardSelBtnBox>
                        {currentBoard=='지역동기'?
                        <><BoardSelTextActive>연제구 동기</BoardSelTextActive><BoardSelUnderlineActive/></>:
                        <><BoardSelTxt>연제구 동기</BoardSelTxt></>
                        }
                    </BoardSelBtnBox>
                </BoardSelBtnPress>

                <BoardSelBtnPress onPress={()=>{setCurrentBoard('출생동기')}}>
                    <BoardSelBtnBox>
                        {currentBoard=='출생동기'?
                        <><BoardSelTextActive>21년 9월 동기</BoardSelTextActive><BoardSelUnderlineActive/></>:
                        <><BoardSelTxt>21년 9월 동기</BoardSelTxt></>
                        }
                    </BoardSelBtnBox>
                </BoardSelBtnPress>
            </BoardSelBtnView>
        </PaddingView>
        <LineF2F2F2 style={{backgroundColor:colors.logoOrangeOpacity}}/>


        {
        isContentExist?
        <ContentFlatList
            data = {boardData}							
            renderItem={renderContents}							
            keyExtractor={(item, index) => index.toString()+""}							
            showsVerticalScrollIndicator={true}							
            onEndReached={getMoreContent}							
            onEndReachedThreshold={0.8}							
        >
        </ContentFlatList>
        :
        <NoContent title='첫 동기 소통글을 남겨 보세요.'/>
        }

        
        <WriteBtnPress onPress={goWriteBoard}>
            <WriteBtnBox>
                <AntDesign name="pluscircle" size={40} color={colors.logoOrange} />
            </WriteBtnBox>
        </WriteBtnPress>
        
    </BasicView>
)};

export default CommunityBoard;
