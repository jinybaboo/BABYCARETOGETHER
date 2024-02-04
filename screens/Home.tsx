import { useNavigation } from "@react-navigation/native";
import react, { useEffect, useState } from "react";
import {View, Pressable, Platform, TouchableOpacity} from "react-native";
import { useQuery, useIsFetching } from "react-query";

import styled from "styled-components/native";
import * as getApi from "../common/getApi";
import { Ionicons, EvilIcons } from '@expo/vector-icons'; 
import { getWindowWidth } from "../common/commonFunc";
import colors from "../common/commonColors";
import Loader from "../components/Loader";
import { BasicView, MainScrollView, PaddingView, Space15, Space20, Space25, Space30, Space5, Space8Gray } from "../common/commonStyledComp";
import Header from "../components/Header";
import EncryptedStorage from 'react-native-encrypted-storage';
import {Shadow} from 'react-native-shadow-2';
import { RootState } from "../store/reducer";
import { useSelector } from "react-redux";

const ThemeColorArr = ['#E30613', '#00983A', '#009FE3', '#EA6E24', '#312783'];
const sentenceArr = [
    '전국의 동기들과 함께 아이를 키워요',
    '전국의 동기들과 공유하는 육아 노하우',
    '성장 정보 공유는 출생동기와 함께',
    '우리동네 육아정보 공유는 지역동기와 함께',
    '육아맘 필수 앱, 육아동기',
]
const randomNum = Math.floor(Math.random()*(5-0));

const os = Platform.OS;
const windowWidth = getWindowWidth();



const ProfileView = styled.View`
    width:100%; height:110px; background-color: ${ThemeColorArr[randomNum]}; margin-top: 12px; border-top-right-radius:20px; border-bottom-left-radius:20px; 
    border-bottom-right-radius:20px; position: relative;
`
const ProfileImgView = styled.View`
    width:100px; height: 100px; border-radius: 120px; background-color: #FFFFFF; position: absolute; right:20px;bottom:30px; justify-content: center; align-items: center;
`
const ProfileImgBox = styled.View`
    width:100px; height: 100px; border-radius: 120px; background-color: #FFFFFF; position: absolute; right:20px;bottom:30px; justify-content: center; align-items: center;
`
const ProfileImgBox2 = styled.View`
    width:100px; height: 100px; border-radius: 120px; background-color: #FFFFFF; justify-content: center; align-items: center;
`
const ProfileImg = styled.Image`
    width:80px; height:80px; border-radius: 100px;
`
const PrifileImgTxt = styled.Text`
    font-family: 'noto500'; font-size: 12px; line-height: 17px; color:#FFFFFF; position:absolute; bottom:-22px;
`

const ProfileTxtBox = styled.View`
    padding-top: 15px; padding-left: 20px;
`
const ProfileInnerBox = styled.View`
    flex-direction: row; margin-top: 15px; align-items: baseline;
`

const ProfileInnerBox2 = styled.View`
    flex-direction: row; margin-top: 12px; align-items: baseline;
`
const ProfileInnerBox3 = styled.View`
    flex-direction: row; margin-top:2px; align-items: baseline; margin-left:-4px;
`

const ProfileTxt0 = styled.Text`
    font-family: 'noto500'; font-size: 10px; line-height: 13px; color:#FFFFFF; letter-spacing: -0.2px;
`
const ProfileTxt1 = styled.Text` 
    font-family: 'noto700'; font-size: 16px; line-height: 19px; color:#FFFFFF; 
`
const ProfileTxt2 = styled.Text` 
    font-family: 'noto400'; font-size: 11px; line-height: 14px; color:#FFFFFF; 
`
const ProfileTxt3 = styled.Text` 
    font-family: 'noto400'; font-size: 11px; line-height: 14px; color:#FFFFFF; padding-top: 2px;
`
const HomeTitleView = styled.View`
    flex-direction:row; justify-content: space-between;
`
const HomeTitle = styled.Text`
     font-family: 'noto700'; font-size: 16px; line-height: 19px; color:${ThemeColorArr[randomNum]};  
`
const HomeSeeMorePress = styled.Pressable``
const HomeSeeMoreTxt = styled.Text`
    font-family: 'noto400'; font-size: 12px; line-height: 15px; color:${colors.textLightGray}; 
`

const MessageView = styled.View`
    width:100%; 
`
const MessageBox = styled.View`
    width:100%; height:50px; padding-top:8px; padding-left:10px; padding-right:20px;
`
const MessageLeftPress = styled.Pressable``

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
    font-family: 'noto500'; font-size: 14px; line-height: 17px; color:${colors.textBlack}; padding-left: 5px; padding-top:1.5px;
`
const MessageTxt2 = styled.Text`
    font-family: 'noto300'; font-size: 12px; line-height: 15px; color:${colors.textGray}; padding-left: 13px; padding-top:2px;
`



const NewProfieFlatList = styled.FlatList`
    width:100%; height:125px;

`

const NewProfileBox = styled.View`
    width:90px; height:120px; border-radius:14px; background-color: #FFFFFF;
    align-items: center;
    padding-top: 10px;
`

const NewProfileImg = styled.Image`
    width:60px; height:60px; border-radius: 70px;
`

const NewProfileName = styled.Text`
     font-family: 'noto400'; font-size: 12px; line-height: 15px; color:${colors.textBlack}; margin-top:10px; 
`
const NewProfileTagBox = styled.View`
    width:100%; padding-top:1px;
`
const NewProfileTag = styled.View`
`
const NewProfileTagTxt = styled.Text`
     font-family: 'noto400'; font-size: 9px; line-height: 13px; color:${colors.logoRed}; text-align:center;
`

const SliderGap = styled.View`
    width:15px;
`


// 베스트 글

const BestView = styled.View`
    width:100%; background-color: #FFFFFF; border:1px solid #F2F2F2; border-radius:8px;
    //border-top-left-radius: 8px; border-top-right-radius: 8px;
`

const BestView2 = styled.View`
    width:100%;  border-radius: 15px; background-color: #FFFFFF; 
`

const ContentBox = styled.View`
    border-bottom-color:#F2F2F2; border-bottom-width: 1px; padding:12px 15px 10px; flex-direction:row; justify-content:space-between; position:relative;
`
const ContentInnerBox1 = styled.View``

const ContentTitleBox = styled.View`
    width:${windowWidth-80}px;
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

const Home = () => {

    const navigation:any = useNavigation();
    const [isAllLoaded, setIsAllLoaded] = useState(false);
   
    //로그인 정보 가져오기
    const isLogin = useSelector((state:RootState)=>state.user.isLogin);
    
    const { isLoading:isLoading1, error:err1, data:userData } = useQuery( 
        ['userInfo'],  
        ()=> getApi.getUserInfo(),
        {
            staleTime:1000*30, // 30초간 reload 안함
        }
    );

    function goCommunityContent(id:any){
        navigation.navigate('Stack', {screen: 'CommunityContent', params:{}});
    }

    function goMyWriteContent(){
        navigation.navigate('Stack', {screen: 'MyWriteContent', params:{}});
    }
    function goDmBox(){
        navigation.navigate('Stack', {screen: 'DmBox', params:{}});
    }

    function goDmContent(){
        navigation.navigate('Stack', {screen: 'DmContent', params:{}});
    }
    
    

    const tempData = ['부산진구','21년생','부산진구','21년생','부산진구','21년생','부산진구','21년생'];
    
    if(useIsFetching()){return <Loader/>}

    const renderNewProfile = ({item}:any)=>{
        return(
            <Shadow
                style={{borderRadius:15}}
                distance={4}
                offset = {[2,2]}
            >
                <NewProfileBox>
                    <NewProfileImg source={require('../assets/profile/defaultProfile.png')}/>
                    <NewProfileName>동그리맘</NewProfileName>
                    <NewProfileTagBox>
                        <NewProfileTag><NewProfileTagTxt>#{item}</NewProfileTagTxt></NewProfileTag>
                    </NewProfileTagBox>
                </NewProfileBox>
            </Shadow>
        )
    }


    if(isLoading1){return <Loader />}
    
    return(
        <BasicView>
            <Header />
            <Space5 />

            <MainScrollView>
                <PaddingView> 
                    <ProfileView>
                        <ProfileTxtBox>
                            <ProfileTxt0>{sentenceArr[randomNum]}</ProfileTxt0>
                            <ProfileInnerBox2>
                                <ProfileTxt1>{userData?.nickname}</ProfileTxt1>
                            </ProfileInnerBox2>
                            <ProfileInnerBox3>
                                <Ionicons style={{paddingLeft:3}} name="location-outline" size={12} color="white" />
                                <ProfileTxt2>{userData?.userPlace==null?'지역을 등록해 주세요':userData?.userPlace}</ProfileTxt2>
                                <Ionicons style={{paddingLeft:12, paddingRight:2}} name="ios-calendar-outline" size={12} color="white" />
                                <ProfileTxt2>21년 9월</ProfileTxt2>
                            </ProfileInnerBox3>
                        </ProfileTxtBox>
                        <ProfileImgView>
                            <ProfileImgBox2>
                                <ProfileImg source={userData?.userImgUrl==null?require('../assets/profile/defaultProfile.png'):{uri:userData?.userImgUrl}}/>
                            </ProfileImgBox2>
                            <PrifileImgTxt>동그리</PrifileImgTxt>
                        </ProfileImgView>
                    </ProfileView>
                </PaddingView>
                
                <Space30 />


                <PaddingView>
                    <HomeTitle>New 동기</HomeTitle>
                </PaddingView>
                <Space15/>

                <NewProfieFlatList 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingLeft:20, paddingRight:20}}
                    ItemSeparatorComponent={()=><SliderGap/>}
                    data ={tempData}
                    renderItem={renderNewProfile}
                    keyExtractor={(item, index) => index.toString()+""}
                />


                <Space20 />
                <Space8Gray />
                <Space25 />

                <PaddingView>
                    <HomeTitleView>
                        <HomeTitle>새로온 쪽지</HomeTitle>
                        <HomeSeeMorePress onPress={goDmBox}> 
                            <HomeSeeMoreTxt>더보기 +</HomeSeeMoreTxt>
                        </HomeSeeMorePress>
                    </HomeTitleView>
                    <Space5/>

                    <MessageView>
                        <MessageBox>
                            <MessageLeftPress onPress={goDmContent}>
                                <MessageInner>
                                    <MessageCircleOn />
                                    <MessageTxt1
                                        numberOfLines={1}
                                    >안녕하세요 물어볼것이 있어셔 쪽지 드립니다. 저는 가나다라마바사 아자차카</MessageTxt1>
                                </MessageInner>
                                <MessageTxt2>동그리맘 · 2023.03.08</MessageTxt2>
                            </MessageLeftPress>
                        </MessageBox>

                        <MessageBox>
                            <MessageInner>
                                <MessageCircleOn />
                                <MessageTxt1
                                    numberOfLines={1}
                                >안녕하세요 물어볼것이 있어셔 쪽지 드립니다. 저는 가나다라마바사 아자차카</MessageTxt1>
                            </MessageInner>
                            <MessageTxt2>동그리맘 · 2023.03.08</MessageTxt2>
                        </MessageBox>

                        <MessageBox>
                            <MessageInner>
                                <MessageCircleOn />
                                <MessageTxt1
                                    numberOfLines={1}
                                >안녕하세요 물어볼것이 있어셔 쪽지 드립니다. 저는 가나다라마바사 아자차카</MessageTxt1>
                            </MessageInner>
                            <MessageTxt2>동그리맘 · 2023.03.08</MessageTxt2>
                        </MessageBox>
                    </MessageView>
                </PaddingView>

                <Space20 />
                <Space8Gray />
                <Space25 />

                <PaddingView>
                    <HomeTitleView>
                        <HomeTitle>21년 9월생 인기글</HomeTitle>
                        <HomeSeeMorePress>
                            <HomeSeeMoreTxt>더보기 +</HomeSeeMoreTxt>
                        </HomeSeeMorePress>
                    </HomeTitleView>

                    <Space15/>

                        <BestView>
                        <TouchableOpacity onPress={()=>{goCommunityContent(1)}}>
                            <ContentBox>
                                <ContentInnerBox1>
                                    <ContentTitleBox style={{width:windowWidth-80-60}} >
                                        <ContentTitle numberOfLines={1}>오늘이 베스트입니다. 가자가자 가즈야 가나다라마바사다랃러ㅏ더ㅏㄹ더</ContentTitle>
                                    </ContentTitleBox>	

                                    <ContentNicknameBox>
                                        <ContentNickname>동그리맘</ContentNickname>
                                        <ContentInfotxt> · 26개월 · 1시간전</ContentInfotxt>
                                    </ContentNicknameBox>
                                    
                                </ContentInnerBox1>
                                <ContentThumbImg source={require('../assets/profile/donggle.png')}/>
                            </ContentBox>	
                            </TouchableOpacity>	

                            <TouchableOpacity onPress={()=>{goCommunityContent(1)}}>
                            <ContentBox>
                                <ContentInnerBox1>
                                    <ContentTitleBox>
                                        <ContentTitle numberOfLines={1}>오늘이 베스트입니다. 가자가자 가즈야 가나다라마바사다랃러ㅏ더ㅏㄹ더</ContentTitle>
                                    </ContentTitleBox>	

                                    <ContentNicknameBox>
                                        <ContentNickname>동그리맘</ContentNickname>
                                        <ContentInfotxt> · 26개월 · 1시간전</ContentInfotxt>
                                    </ContentNicknameBox>
                                    
                                </ContentInnerBox1>
                                
                            </ContentBox>	
                            </TouchableOpacity>	

                            <TouchableOpacity onPress={()=>{goCommunityContent(1)}}>
                            <ContentBox>
                                <ContentInnerBox1>
                                    <ContentTitleBox>
                                        <ContentTitle numberOfLines={1}>오늘이 베스트입니다. 가자가자 가즈야 가나다라마바사다랃러ㅏ더ㅏㄹ더</ContentTitle>
                                    </ContentTitleBox>	

                                    <ContentNicknameBox>
                                        <ContentNickname>동그리맘</ContentNickname>
                                        <ContentInfotxt> · 26개월 · 1시간전</ContentInfotxt>
                                    </ContentNicknameBox>
                                    
                                </ContentInnerBox1>
                                
                            </ContentBox>	
                            </TouchableOpacity>	

                            <TouchableOpacity onPress={()=>{goCommunityContent(1)}}>
                            <ContentBox>
                                <ContentInnerBox1>
                                    <ContentTitleBox>
                                        <ContentTitle numberOfLines={1}>오늘이 베스트입니다. 가자가자 가즈야 가나다라마바사다랃러ㅏ더ㅏㄹ더</ContentTitle>
                                    </ContentTitleBox>	

                                    <ContentNicknameBox>
                                        <ContentNickname>동그리맘</ContentNickname>
                                        <ContentInfotxt> · 26개월 · 1시간전</ContentInfotxt>
                                    </ContentNicknameBox>
                                    
                                </ContentInnerBox1>
                                
                            </ContentBox>	
                            </TouchableOpacity>	

                            <TouchableOpacity onPress={()=>{goCommunityContent(1)}}>
                            <ContentBox>
                                <ContentInnerBox1>
                                    <ContentTitleBox>
                                        <ContentTitle numberOfLines={1}>오늘이 베스트입니다. 가자가자 가즈야 가나다라마바사다랃러ㅏ더ㅏㄹ더</ContentTitle>
                                    </ContentTitleBox>	

                                    <ContentNicknameBox>
                                        <ContentNickname>동그리맘</ContentNickname>
                                        <ContentInfotxt> · 26개월 · 1시간전</ContentInfotxt>
                                    </ContentNicknameBox>
                                    
                                </ContentInnerBox1>
                                
                            </ContentBox>	
                            </TouchableOpacity>	
                            
                        </BestView>

                </PaddingView>


                <Space20 />
                <Space8Gray />


                <Space25 />
                <PaddingView>
                    <HomeTitleView>
                        <HomeTitle>연제구 인기글</HomeTitle>
                        <HomeSeeMorePress>
                            <HomeSeeMoreTxt>더보기 +</HomeSeeMoreTxt>
                        </HomeSeeMorePress>
                    </HomeTitleView>
                    <Space15/>

                    <BestView2>
                        <TouchableOpacity onPress={()=>{goCommunityContent(1)}}>
                            <ContentBox>
                                <ContentInnerBox1>
                                    <ContentTitleBox>
                                        <ContentTitle numberOfLines={1}>오늘이 베스트입니다. 가자가자 가즈야 가나다라마바사다랃러ㅏ더ㅏㄹ더</ContentTitle>
                                    </ContentTitleBox>	

                                    <ContentNicknameBox>
                                        <ContentNickname>동그리맘</ContentNickname>
                                        <ContentInfotxt> · 26개월 · 1시간전</ContentInfotxt>
                                    </ContentNicknameBox>
                                    
                                </ContentInnerBox1>
                                
                            </ContentBox>	
                            </TouchableOpacity>	

                            <TouchableOpacity onPress={()=>{goCommunityContent(1)}}>
                            <ContentBox>
                                <ContentInnerBox1>
                                    <ContentTitleBox>
                                        <ContentTitle numberOfLines={1}>오늘이 베스트입니다. 가자가자 가즈야 가나다라마바사다랃러ㅏ더ㅏㄹ더</ContentTitle>
                                    </ContentTitleBox>	

                                    <ContentNicknameBox>
                                        <ContentNickname>동그리맘</ContentNickname>
                                        <ContentInfotxt> · 26개월 · 1시간전</ContentInfotxt>
                                    </ContentNicknameBox>
                                    
                                </ContentInnerBox1>
                                
                            </ContentBox>	
                            </TouchableOpacity>	

                            <TouchableOpacity onPress={()=>{goCommunityContent(1)}}>
                            <ContentBox>
                                <ContentInnerBox1>
                                    <ContentTitleBox>
                                        <ContentTitle numberOfLines={1}>오늘이 베스트입니다. 가자가자 가즈야 가나다라마바사다랃러ㅏ더ㅏㄹ더</ContentTitle>
                                    </ContentTitleBox>	

                                    <ContentNicknameBox>
                                        <ContentNickname>동그리맘</ContentNickname>
                                        <ContentInfotxt> · 26개월 · 1시간전</ContentInfotxt>
                                    </ContentNicknameBox>
                                    
                                </ContentInnerBox1>
                                
                            </ContentBox>	
                            </TouchableOpacity>	

                            <TouchableOpacity onPress={()=>{goCommunityContent(1)}}>
                            <ContentBox>
                                <ContentInnerBox1>
                                    <ContentTitleBox>
                                        <ContentTitle numberOfLines={1}>오늘이 베스트입니다. 가자가자 가즈야 가나다라마바사다랃러ㅏ더ㅏㄹ더</ContentTitle>
                                    </ContentTitleBox>	

                                    <ContentNicknameBox>
                                        <ContentNickname>동그리맘</ContentNickname>
                                        <ContentInfotxt> · 26개월 · 1시간전</ContentInfotxt>
                                    </ContentNicknameBox>
                                    
                                </ContentInnerBox1>
                                
                            </ContentBox>	
                            </TouchableOpacity>	

                            <TouchableOpacity onPress={()=>{goCommunityContent(1)}}>
                            <ContentBox>
                                <ContentInnerBox1>
                                    <ContentTitleBox>
                                        <ContentTitle numberOfLines={1}>오늘이 베스트입니다. 가자가자 가즈야 가나다라마바사다랃러ㅏ더ㅏㄹ더</ContentTitle>
                                    </ContentTitleBox>	

                                    <ContentNicknameBox>
                                        <ContentNickname>동그리맘</ContentNickname>
                                        <ContentInfotxt> · 26개월 · 1시간전</ContentInfotxt>
                                    </ContentNicknameBox>
                                    
                                </ContentInnerBox1>
                                
                            </ContentBox>	
                            </TouchableOpacity>	
                        </BestView2>

                </PaddingView>


                <Space20 />
                <Space8Gray />


                <Space25 />
                <PaddingView>
                    <HomeTitleView>
                        <HomeTitle>내가 작성한 글</HomeTitle>
                        <HomeSeeMorePress onPress={goMyWriteContent}>
                            <HomeSeeMoreTxt>더보기 +</HomeSeeMoreTxt>
                        </HomeSeeMorePress>
                    </HomeTitleView>
                    <Space15/>

                    <BestView2>
                        <TouchableOpacity onPress={()=>{goCommunityContent(1)}}>
                            <ContentBox>
                                <ContentInnerBox1>
                                    <ContentTitleBox>
                                        <ContentTitle numberOfLines={1}>오늘이 베스트입니다. 가자가자 가즈야 가나다라마바사다랃러ㅏ더ㅏㄹ더</ContentTitle>
                                    </ContentTitleBox>	

                                    <ContentNicknameBox>
                                        <ContentInfotxt>1시간전 ·</ContentInfotxt>
                                        <CommentBox>
                                            <EvilIcons style={{marginTop:6.5}} name="comment" size={18} color={colors.textGray} />
                                            <CommentTxt>7</CommentTxt>
                                        </CommentBox>
                                    </ContentNicknameBox>
                                    
                                </ContentInnerBox1>
                                
                            </ContentBox>	
                            </TouchableOpacity>	

                            <TouchableOpacity onPress={()=>{goCommunityContent(1)}}>
                            <ContentBox>
                                <ContentInnerBox1>
                                    <ContentTitleBox>
                                        <ContentTitle numberOfLines={1}>오늘이 베스트입니다. 가자가자 가즈야 가나다라마바사다랃러ㅏ더ㅏㄹ더</ContentTitle>
                                    </ContentTitleBox>	

                                    <ContentNicknameBox>
                                        <ContentInfotxt>1시간전 ·</ContentInfotxt>
                                        <CommentBox>
                                            <EvilIcons style={{marginTop:6.5}} name="comment" size={18} color={colors.textGray} />
                                            <CommentTxt>7</CommentTxt>
                                        </CommentBox>
                                    </ContentNicknameBox>
                                    
                                </ContentInnerBox1>
                                
                            </ContentBox>	
                            </TouchableOpacity>	

                            <TouchableOpacity onPress={()=>{goCommunityContent(1)}}>
                            <ContentBox>
                                <ContentInnerBox1>
                                    <ContentTitleBox>
                                        <ContentTitle numberOfLines={1}>오늘이 베스트입니다. 가자가자 가즈야 가나다라마바사다랃러ㅏ더ㅏㄹ더</ContentTitle>
                                    </ContentTitleBox>	

                                    <ContentNicknameBox>
                                        <ContentInfotxt>1시간전 ·</ContentInfotxt>
                                        <CommentBox>
                                            <EvilIcons style={{marginTop:6.5}} name="comment" size={18} color={colors.textGray} />
                                            <CommentTxt>7</CommentTxt>
                                        </CommentBox>
                                    </ContentNicknameBox>
                                    
                                </ContentInnerBox1>
                                
                            </ContentBox>	
                            </TouchableOpacity>	

                            <TouchableOpacity onPress={()=>{goCommunityContent(1)}}>
                            <ContentBox>
                                <ContentInnerBox1>
                                    <ContentTitleBox>
                                        <ContentTitle numberOfLines={1}>오늘이 베스트입니다. 가자가자 가즈야 가나다라마바사다랃러ㅏ더ㅏㄹ더</ContentTitle>
                                    </ContentTitleBox>	

                                    <ContentNicknameBox>
                                        <ContentInfotxt>1시간전 ·</ContentInfotxt>
                                        <CommentBox>
                                            <EvilIcons style={{marginTop:6.5}} name="comment" size={18} color={colors.textGray} />
                                            <CommentTxt>7</CommentTxt>
                                        </CommentBox>
                                    </ContentNicknameBox>
                                    
                                </ContentInnerBox1>
                                
                            </ContentBox>	
                            </TouchableOpacity>	

                            <TouchableOpacity onPress={()=>{goCommunityContent(1)}}>
                            <ContentBox>
                                <ContentInnerBox1>
                                    <ContentTitleBox>
                                        <ContentTitle numberOfLines={1}>오늘이 베스트입니다. 가자가자 가즈야 가나다라마바사다랃러ㅏ더ㅏㄹ더</ContentTitle>
                                    </ContentTitleBox>	

                                    <ContentNicknameBox>
                                        <ContentInfotxt>1시간전 ·</ContentInfotxt>
                                        <CommentBox>
                                            <EvilIcons style={{marginTop:6.5}} name="comment" size={18} color={colors.textGray} />
                                            <CommentTxt>7</CommentTxt>
                                        </CommentBox>
                                    </ContentNicknameBox>
                                    
                                </ContentInnerBox1>
                                
                            </ContentBox>	
                            </TouchableOpacity>	
                        </BestView2>

                </PaddingView>



                <Space30 />
                


                

            </MainScrollView>
        </BasicView>
    )
}

export default Home;
