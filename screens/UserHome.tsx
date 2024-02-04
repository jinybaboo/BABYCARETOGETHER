import { useNavigation } from "@react-navigation/native";
import react, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import colors from "../common/commonColors";
import { BasicView, MainScrollView, PaddingView, Space10, Space15, Space20, Space3, Space30, Space35, Space5, Space8Gray } from "../common/commonStyledComp";
import { Platform, Pressable, TouchableOpacity} from "react-native";
import { getWindowWidth } from "../common/commonFunc";
import CustomHeader from "../components/CustomHeader";
import { Ionicons, Fontisto } from '@expo/vector-icons'; 

const os = Platform.OS;
const windowWidth = getWindowWidth();

const ProfileView = styled.View`
    width:100%; flex-direction: row; justify-content: space-between;
`

const ProfileInner1 = styled.View`
    justify-content: center;
`
const ProfileTxt1 = styled.Text`
    font-family: 'noto700'; font-size: 18px; line-height: 21px; color:${colors.textBlack}; letter-spacing: 0.5px;
`
const ProfileTxt2 = styled.Text`
    font-family: 'noto400'; font-size: 11px; line-height: 14px; color:${colors.textGray}; 
`

const PointView = styled.View`
    
`
const PointTxt = styled.Text`
    font-family: 'noto400'; font-size: 12px; line-height: 15px; color:${colors.textLightGray}; 
`
const PointTxt2 = styled(PointTxt)`
    color:${colors.logoOrange}; font-family: 'noto500';
`



const ProfileImg = styled.Image`
    width:70px; height:70px; border-radius: 70px;
`
const ProfileInner2 = styled.View`
    flex-direction: row;
`
const PaperPlanePress = styled.Pressable`
    margin-top: -2px; margin-left: 8px; 
`


const UserHomeTitleView = styled.View`
    flex-direction: row; padding-left:20px;
`
const UserHomeTitleTxt = styled.Text`
    font-family: 'noto500'; font-size: 15px; line-height: 18px; color:${colors.textBlack}; letter-spacing: -0.2px; margin-left:8px;
`



const BabyInfoProfileView = styled.View`
    flex-direction: row; background-color:${colors.backgroundLightGray2} ; width:100%; height:80px; align-items: center; 
    padding:20px; justify-content: space-between;
`
const BabyInfoProfileViewActive = styled(BabyInfoProfileView)`
    background-color:${colors.textInputBackground} ; 
`
const BabyInfoProfileInner = styled.View`
    flex-direction: row; align-items: center;
`

const BabyProfileImg = styled.Image`
    width:50px; height: 50px; border-radius:50px;
`
const BabyProfileTxtBox = styled.View`
    margin-left: 10px;
`
const BabyProfileTxt1 = styled.Text`
    font-family: 'noto400'; font-size: 13px; line-height: 15px; color:${colors.textBlack}; letter-spacing: -0.2px;
`
const BabyProfileTxt2 = styled.Text`
    font-family: 'noto400'; font-size: 11px; line-height: 14px; color:${colors.textGray}; 
`

const CheckIconBox = styled.View``

const ActInfoView = styled.View`
    padding-left: 15px;
`
const ActInfoBox = styled.View`
    flex-direction: row; justify-content: space-between;
`
const ActInfoBoxInner = styled.View`
    
`
const SeeMoreIconBox = styled.View`
    width:50px; height:100%; align-items: flex-end; padding-top: 7px;
`


const ActInfoTitle = styled.Text`
     font-family: 'noto500'; font-size: 13px; line-height: 15px; color:${colors.textBlack}; letter-spacing: -0.2px;
`
const ActInfoTxt = styled(ActInfoTitle)`
     font-family: 'noto300'; color:${colors.textGray};
`



const UserHome = () => {
    const navigation:any = useNavigation();


    function goWriteDM(){
        navigation.navigate('Stack', {screen: 'WriteDM', params:{}});
    }
    


    return (
    <BasicView>
        <CustomHeader />

        <MainScrollView>
            <PaddingView>
                <ProfileView>
                    <ProfileInner1>
                        <ProfileInner2>
                            <ProfileTxt1>해린이아빠</ProfileTxt1>
                            <PaperPlanePress onPress={goWriteDM}>
                                <Ionicons name="paper-plane-outline" size={22} color={colors.textBlack} />
                            </PaperPlanePress>
                        </ProfileInner2>
                        <Space3 />
                        <ProfileInner2>
                            <Ionicons style={{paddingRight:3, marginTop:0.5,}} name="location-outline" size={12} color={colors.textGray}/>
                            <ProfileTxt2>부산광역시 연제구</ProfileTxt2>
                            <Ionicons style={{paddingLeft:10, paddingRight:3, marginTop:0.5,}} name="ios-calendar-outline" size={12} color={colors.textGray}/>
                            <ProfileTxt2>24개월 맘</ProfileTxt2>
                        </ProfileInner2>
                        
                    </ProfileInner1>
                    <ProfileImg source={require('../assets/profile/donggle.png')}/>
                </ProfileView>
                <Space10 />

                <PointView>
                    <PointTxt>활동점수 <PointTxt2>224</PointTxt2></PointTxt>
                </PointView>
            </PaddingView>
            
            <Space20 />
            <Space8Gray />
            <Space15 />

            <UserHomeTitleView>
                <Fontisto name="slightly-smile" size={16} color={colors.textLightGray} />
                <UserHomeTitleTxt>아기정보</UserHomeTitleTxt>
            </UserHomeTitleView>
            <Space10 />

            <PaddingView>
                <BabyInfoProfileView>
                    <BabyInfoProfileInner>
                        <BabyProfileImg source={require('../assets/profile/donggle.png')}/>
                        <BabyProfileTxtBox>
                            <BabyProfileTxt1>동그리</BabyProfileTxt1>
                            <BabyProfileTxt2>여 · 14개월</BabyProfileTxt2>
                        </BabyProfileTxtBox>
                    </BabyInfoProfileInner>
                </BabyInfoProfileView>
                
                <BabyInfoProfileView>
                    <BabyInfoProfileInner>
                        <BabyProfileImg source={require('../assets/profile/donggle.png')}/>
                        <BabyProfileTxtBox>
                            <BabyProfileTxt1>동그리</BabyProfileTxt1>
                            <BabyProfileTxt2>여 · 14개월</BabyProfileTxt2>
                        </BabyProfileTxtBox>
                    </BabyInfoProfileInner>
                </BabyInfoProfileView>
            </PaddingView>

            <Space20 />
            <Space8Gray />
            <Space15 />

            <UserHomeTitleView>
                <Ionicons name="ios-bulb-outline" size={16} color={colors.textLightGray} />
                <UserHomeTitleTxt>활동정보</UserHomeTitleTxt>
            </UserHomeTitleView>
            <Space10 />
            {/* 가입일, 최근접속일, 작성글(보기) */}
            
            <PaddingView>
                <ActInfoView>
                    <ActInfoBox>
                        <ActInfoBoxInner>
                            <ActInfoTitle>가입일</ActInfoTitle> 
                            <Space3/>
                            <ActInfoTxt>2022.03.25</ActInfoTxt>
                        </ActInfoBoxInner>
                    </ActInfoBox>
                    <Space20/>

                    <ActInfoBox>
                        <ActInfoBoxInner>
                            <ActInfoTitle>최근 접속일</ActInfoTitle> 
                            <Space3/>
                            <ActInfoTxt>3일전</ActInfoTxt>
                        </ActInfoBoxInner>
                    </ActInfoBox>
                    <Space20/>
                    
                    <TouchableOpacity>
                        <ActInfoBox>
                            <ActInfoBoxInner>
                                <ActInfoTitle>작성한 글</ActInfoTitle> 
                                <Space3/>
                                <ActInfoTxt>0개</ActInfoTxt>
                            </ActInfoBoxInner>
                            <SeeMoreIconBox>
                                <Ionicons name="chevron-forward" size={20} color={colors.textLightGray} />
                            </SeeMoreIconBox>
                        </ActInfoBox>
                        <Space20/>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <ActInfoBox>    
                            <ActInfoBoxInner>
                                <ActInfoTitle>작성한 댓글</ActInfoTitle> 
                                <Space3/>
                                <ActInfoTxt>5개</ActInfoTxt>
                            </ActInfoBoxInner>
                            <SeeMoreIconBox>
                                <Ionicons name="chevron-forward" size={20} color={colors.textLightGray} />
                            </SeeMoreIconBox>
                        </ActInfoBox>
                        <Space20/>
                    </TouchableOpacity>


                </ActInfoView>
            </PaddingView>



        </MainScrollView>

    </BasicView>
)};

export default UserHome;




