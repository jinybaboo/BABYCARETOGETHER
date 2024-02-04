import { useNavigation } from "@react-navigation/native";
import react, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import colors from "../common/commonColors";
import { BasicView, HeaderSpaceForAndroid, LineF2F2F2, MainScrollView, PaddingView, Space10, Space15, Space20, Space3, Space30, Space35, Space5, Space8Gray } from "../common/commonStyledComp";
import { Alert, DeviceEventEmitter, Platform, Pressable, TouchableOpacity, View} from "react-native";
import { AlertType1, changeDateTypeDot, getBabyYearMonth, getMonthOrYearFromBirthday, getWindowWidth, getYiGaByName, userLogout } from "../common/commonFunc";
import { Ionicons, Fontisto, AntDesign, MaterialIcons, SimpleLineIcons, EvilIcons } from '@expo/vector-icons'; 
import NoContent from "../components/NoContent";
import Geolocation from 'react-native-geolocation-service';
import * as getApi from "../common/getApi";

import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useAppDispatch } from "../store";
import { updateBabySelect, updateUserAddr } from "../common/updateApi";
import { useQuery } from 'react-query';
import Loader from "../components/Loader";
import { serverImgUrl } from "../common/commonInfo";
import { delBabyInfo } from "../common/delApi";





const os = Platform.OS;
const windowWidth = getWindowWidth();


// 헤드 메뉴 부분
const PageTitleView = styled.View`
    width:100%; height:40px; justify-content:center; padding-left:20px;
`
const PageTitleTxt = styled.Text`
    font-family: 'noto500'; font-size:20px; line-height: 23px; color:${colors.logoBlue}; letter-spacing: -1px; padding-top:10px;
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
    font-family: 'noto500'; color:${colors.logoBlue};
`

const BoardSelUnderline = styled.View`
    width:100%; height:1px;background-color:#E2E2E2; position: absolute; bottom:0px;
`
const BoardSelUnderlineActive = styled(BoardSelUnderline)`
   height:2px;background-color:${colors.logoBlue};
`


const InfoView = styled.View``
const SettingView = styled.View``




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
    color:${colors.logoBlue}; font-family: 'noto500';
`



const ProfileImg = styled.Image`
    width:70px; height:70px; border-radius: 70px;
`
const ProfileInner2 = styled.View`
    flex-direction: row;
`


const UserHomeTitleView = styled.View`
    padding:0 20px; flex-direction: row; justify-content: space-between; align-items: center; position:relative;
`
const UserHomeTitleInner = styled.View`
    flex-direction: row; 
`
const UserHomeTitleTxt = styled.Text`
    font-family: 'noto500'; font-size: 15px; line-height: 18px; color:${colors.textBlack}; letter-spacing: -0.2px; margin-left:8px; margin-top: 1px;
`
const UserHomeRightBtnPress = styled.TouchableOpacity`
    flex-direction: row; width:100px;  justify-content: flex-end; align-items:center; position:absolute; right:20px; height:30px;
`
const UserHomeRightBtnTxt = styled.Text`
    font-family: 'noto400'; font-size: 12px; line-height: 15px; color:${colors.textGray}; letter-spacing: -0.2px; margin-left:0px; 
`


const BabyInfoProfileViewPress = styled.TouchableOpacity`
    flex-direction: row; background-color:${colors.backgroundLightGray2} ; width:100%; height:80px; align-items: center; 
    padding:20px; justify-content: space-between;
`
const BabyInfoProfileViewPressActive = styled(BabyInfoProfileViewPress)`
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

const NoBabyInfoView = styled.View`
    width:100%; height:60px; 
`



const CheckIconBox = styled.View``

const ActInfoView = styled.View`
    padding-left: 15px;
`
const ActInfoBox = styled.View`
    flex-direction: row; justify-content: space-between; align-items: center; 
`
const ActInfoBoxInner = styled.View`
`
const SeeMoreIconBox = styled.View`
    width:50px; height:100%; align-items: flex-end; padding-top: 7px;
`

const ActInfoTitle = styled.Text`
     font-family: 'noto400'; font-size: 13px; line-height: 15px; color:${colors.textBlack}; letter-spacing: -0.2px;
`
const ActInfoTxt = styled(ActInfoTitle)`
     font-family: 'noto300'; color:${colors.textGray}; font-size: 12px;
`
const ActInfoTitleOneLine = styled(ActInfoTitle)`
    line-height: 20px;
`
const SeeMoreIconBoxOneLine = styled(SeeMoreIconBox)`
    padding-top: 4px;
`


const ServiceAlertSwitch = styled.Switch``









const Mypage = () => {
    const navigation:any = useNavigation();
    const dispatch:any = useAppDispatch();


    const [isBabyInfoExist, setIsBabyInfoExist] = useState(true);
    const [isServiceAlertOn, setIsServiceAlertOn] = useState(true);
    const [coords, setCoords] = useState({'latitude':0, 'longitude':0});
    const [currentMenu, setCurrentMenu] = useState('정보');


    const { isLoading:userInfoLoading, error:userInfoError, data:userData, refetch:userInfoRefetch } = useQuery(['userInfo'],  ()=> getApi.getUserInfo(), { staleTime:1000*60*5, }); // 재접속시 5분간 reload 안함   
    const { isLoading:babyInfoLoading, error:babyInfoError, data:babyData, refetch:babyInfoRefetch } = useQuery(['babyInfo'],  ()=> getApi.getBabyInfo(), { staleTime:1000*60*5, }); // 재접속시 5분간 reload 안함   
    //console.log(babyData);

    // 아기정보 등록 페이지에서 복귀시 아기정보 refetch(reload) 하기
    useEffect(() => {
        DeviceEventEmitter.addListener('backFromInsertBabyInfo', () => {
            babyInfoRefetch();
        })
    }, []);



    function sendMessage(){
        console.log('sendMessage');
    }
    
    function toggleServiceAlert(){
        console.log('toggleServiceAlert');
        setIsServiceAlertOn(!isServiceAlertOn);
    }

    async function getLocationPermission(){
        let result:any='';
        if(os==='ios'){  
            result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        }else{           
            result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }
        
        if(result=='blocked' || result=='denied'){
            Alert.alert( //alert 사용				
            '이런!', '앱 설정에서 위치정보 접근을 허용해 주세요', [ 			
                {text: '확인', onPress: () => {} }, 		
                ]			
            );		
            return;
        }

        if(result=='granted'){
            getLocationInfo();
        }
    }

    async function logoutCheck(){
        Alert.alert( //alert 사용									
                '잠깐!', '로그아웃 하시겠습니까?', [ 								
                {text: '취소', onPress: () => {}}, 							
                {text: '확인', onPress: () => {logout()}}, 							
            ]								
        )		
    }

    async function logout(){
        await userLogout(dispatch);
        gohome();
    }


    function goChangeNickname(){ navigation.navigate('Stack', {screen: 'ChangeNickname', params:{}});}
    function goChangeBabyNickname(){ navigation.navigate('Stack', {screen: 'ChangeBabyNickname', params:{}});}
    function goChangeProfileImg(){ navigation.navigate('Stack', {screen: 'ChangeProfileImg', params:{}});}
    function goInsertBabyInfo(){ navigation.navigate('Stack', {screen: 'InsertBabyInfo', params:{}});}
    function goMyWriteContent(){ navigation.navigate('Stack', {screen: 'MyWriteContent', params:{}});}
    function goMyReplyContent(){ navigation.navigate('Stack', {screen: 'MyReplyContent', params:{}});}
    function goMyLikeContent(){ navigation.navigate('Stack', {screen: 'MyLikeContent', params:{}});}
    function goNotice(){ navigation.navigate('Stack', {screen: 'Notice', params:{}});}
    function goWriteCustomerOpinion(){ navigation.navigate('Stack', {screen: 'WriteCustomerOpinion', params:{}});}
    function gohome(){  navigation.navigate('Tabs', { screen: '홈' }); }
    


    async function getLocationInfo(){
        Geolocation.getCurrentPosition(
            (position) => {
                const {latitude, longitude} = position.coords;
                setCoords({latitude, longitude})
            },
            (error) => {
                console.log(error.code, error.message);
                if(error.code==1){
                    Alert.alert( //alert 사용				
                        '이런!', '앱 설정에서 위치정보 접근을 허용해 주세요', [ 			
                            {text: '확인', onPress: () => {} }, 		
                        ]			
                    );				
                }
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );

        const {documents:result}:any = await getApi.getAddrWithCoords(coords.latitude, coords.longitude);
        const {address_name:userAddr, region_2depth_name:userPlace} = result[0];
        
        const status = await updateUserAddr({userAddr, userPlace, 'latitude':coords.latitude, 'longitude':coords.longitude});

        AlertType1('','나의 지역이 등록 되었습니다.',()=>{});
        
        //지역정보 재호출
        userInfoRefetch();

    }

    function deleteBabyInfo(num:number, babyNickname:string, isSelected:number, babyCount:number){
        Alert.alert( //alert 사용								
            '잠깐!', babyNickname+' 정보를 삭제 할까요?', [ 							
                {text: '취소', onPress: () => {}}, 						
                {text: '확인', onPress: async () => {
                    if(babyCount==1){
                        Alert.alert( //alert 사용				
                                '이런!', `육아동기 사용을 위해서는 반드시 1명의 아기는 등록되어야 합니다.${'\n'}정말로 삭제 하시겠습니까?`, [	
                                {text: '취소', onPress: () => {return;}}, 		
                                {text: '확인', onPress: async() => {
                                    await delBabyInfo({num});
                                    babyInfoRefetch(); //아기정보 refetch
                                }}, 		
                            ]			
                        );		
                        return;		
                    }

                    if(isSelected && babyCount!=1){
                        AlertType1('이런!', `선택된 아기를 변경 후 삭제해 주세요.`, ()=>{});
                        return;
                    }
                    await delBabyInfo({num});
                    babyInfoRefetch(); //아기정보 refetch
                }}, 						
            ]							
        );								
    }

    async function changeBabySelect(num:number, babyNickname:string, isSelected:number){
        console.log(num, babyNickname, isSelected);
        const yiGa = getYiGaByName(babyNickname);
        await updateBabySelect({num});
        babyInfoRefetch(); //아기정보 refetch
        AlertType1('안내',`${babyNickname}${yiGa}  선택되었습니다.`,()=>{})
    }




    if(userInfoLoading)return<Loader/>;

    let userAddr2Digit = userData?.userAddr.split(" ");
    userAddr2Digit = userAddr2Digit[0]+" "+userAddr2Digit[1];

    return (
    <BasicView>
        <HeaderSpaceForAndroid />
        <PageTitleView>
            <PageTitleTxt>마이페이지</PageTitleTxt>
        </PageTitleView>

        <PaddingView>
            <BoardSelBtnView>
                <BoardSelBtnPress onPress={()=>{setCurrentMenu('정보')}}>
                    <BoardSelBtnBox>
                        {currentMenu=='정보'?
                        <><BoardSelTextActive>정보</BoardSelTextActive><BoardSelUnderlineActive/></>:
                        <><BoardSelTxt>정보</BoardSelTxt></>
                        }
                    </BoardSelBtnBox>
                </BoardSelBtnPress>

                <BoardSelBtnPress onPress={()=>{setCurrentMenu('설정')}}>
                    <BoardSelBtnBox>
                        {currentMenu=='설정'?
                        <><BoardSelTextActive>설정</BoardSelTextActive><BoardSelUnderlineActive/></>:
                        <><BoardSelTxt>설정</BoardSelTxt></>
                        }
                    </BoardSelBtnBox>
                </BoardSelBtnPress>
            </BoardSelBtnView>
        </PaddingView>
        <LineF2F2F2 style={{backgroundColor:colors.logoBlueOpacity}}/>
        

        <MainScrollView>

            {currentMenu=='정보'?

            <InfoView>
                <Space10 />

                <PaddingView>
                    <ProfileView>
                        <ProfileInner1>
                            <ProfileInner2>
                                <ProfileTxt1>{userData?.nickname}</ProfileTxt1>
                            </ProfileInner2>
                            <Space3 />
                            <ProfileInner2>
                                <Ionicons style={{paddingRight:3, marginTop:0.5,}} name="location-outline" size={12} color={colors.textGray}/>
                                <ProfileTxt2>{userData?.userPlace==null?'미등록':userData?.userPlace}</ProfileTxt2>
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
                    <UserHomeTitleInner>
                        <Ionicons name="location-outline" size={17} color={colors.textBlack} />
                        <UserHomeTitleTxt style={{marginLeft:4}}>지역정보</UserHomeTitleTxt>
                    </UserHomeTitleInner>

                    <UserHomeRightBtnPress onPress={getLocationPermission}>
                        <MaterialIcons name="location-searching" size={14} color={colors.textGray} style={{marginTop:-1}}/>
                        <UserHomeRightBtnTxt>지역등록</UserHomeRightBtnTxt>
                    </UserHomeRightBtnPress>
                </UserHomeTitleView>
                <Space10 />

                <PaddingView>
                    {
                    userData?.userPlace!=null?
                    <ActInfoView>
                        <ActInfoTitle>{userAddr2Digit}</ActInfoTitle> 
                        <Space3/>
                        <ActInfoTxt>{changeDateTypeDot(userData?.addrDate)} 등록</ActInfoTxt>
                    </ActInfoView>
                    :
                    <NoBabyInfoView>
                        <NoContent title={`등록된 지역정보가 없습니다.`}/>
                    </NoBabyInfoView>
                    }

                </PaddingView>

                
                <Space20 />
                <Space8Gray />
                <Space15 />

                <UserHomeTitleView>
                    <UserHomeTitleInner>
                        <Fontisto name="slightly-smile" size={14} color={colors.textBlack} />
                        <UserHomeTitleTxt style={{marginTop:-0.5}}>아기정보</UserHomeTitleTxt>
                    </UserHomeTitleInner>

                    <UserHomeRightBtnPress onPress={goInsertBabyInfo}>
                        <AntDesign name="adduser" size={14} color={colors.textGray} style={{marginTop:-1}}/>
                        <UserHomeRightBtnTxt style={{paddingTop:0.5}}>정보등록</UserHomeRightBtnTxt>
                    </UserHomeRightBtnPress>
                </UserHomeTitleView>
                <Space10 />

                <PaddingView>
                    {
                    babyData.length!=0?

                    babyData?.map((item:any, idx:number)=>{
                        const imgUrl = serverImgUrl;
                        const fileName = item?.babyImgUrl;
                        const imgUri = `${imgUrl}/upload/resize/${fileName}`;
                        const isSelected = item.isSelected;
                        const birthMonth = getMonthOrYearFromBirthday(item.babyBirthday);
                        const babyBirth = getBabyYearMonth(item.babyBirthday);


                        return(
                        <View key={idx+''}>
                        {isSelected?
                        <BabyInfoProfileViewPressActive onPress={()=>{changeBabySelect(item.num, item.babyNickname, item.isSelected)}} onLongPress={()=>{deleteBabyInfo(item.num, item.babyNickname, item.isSelected, babyData.length)}}>
                            <BabyInfoProfileInner>
                                <BabyProfileImg source={item?.babyImgUrl==null?require('../assets/profile/defaultProfile.png'):{uri:imgUri}}/>
                                <BabyProfileTxtBox>
                                    <BabyProfileTxt1>{item.babyNickname}</BabyProfileTxt1>
                                    <BabyProfileTxt2>{item.babyGender} · {item.babyBirthday} · {birthMonth}</BabyProfileTxt2>
                                </BabyProfileTxtBox>
                            </BabyInfoProfileInner>
                            <CheckIconBox>
                                <Ionicons name="ios-checkmark-circle" size={24} color={colors.logoOrange} />
                            </CheckIconBox>
                        </BabyInfoProfileViewPressActive>
                        :
                        <BabyInfoProfileViewPress onPress={()=>{changeBabySelect(item.num, item.babyNickname, item.isSelected)}} onLongPress={()=>{deleteBabyInfo(item.num, item.babyNickname, item.isSelected, babyData.length)}}>
                            <BabyInfoProfileInner>
                                <BabyProfileImg source={item?.babyImgUrl==null?require('../assets/profile/defaultProfile.png'):{uri:imgUri}}/>
                                <BabyProfileTxtBox>
                                    <BabyProfileTxt1>{item.babyNickname}</BabyProfileTxt1>
                                    <BabyProfileTxt2>{item.babyGender} · {item.babyBirthday} · {birthMonth}</BabyProfileTxt2>
                                </BabyProfileTxtBox>
                            </BabyInfoProfileInner>
                            <CheckIconBox>
                                <Ionicons name="ios-checkmark-circle-outline" size={24} color={colors.textLightGray} />
                            </CheckIconBox>
                        </BabyInfoProfileViewPress>
                        }
                        </View>
                        )
                    })
                    :
                    <NoBabyInfoView>
                        <NoContent title={`등록된 아기정보가 없습니다.`}/>
                    </NoBabyInfoView>
                    }
                </PaddingView>


                <Space20 />
                <Space8Gray />
                <Space20 />


                <UserHomeTitleView>
                    <UserHomeTitleInner>
                        <Ionicons name="ios-bulb-outline" size={16} color={colors.textBlack} />
                        <UserHomeTitleTxt>활동정보</UserHomeTitleTxt>
                    </UserHomeTitleInner>
                </UserHomeTitleView>
                <Space10 />
                
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
                        
                        <TouchableOpacity onPress={goMyWriteContent}>
                            <ActInfoBox>
                                <ActInfoBoxInner>
                                    <ActInfoTitle>작성한 글</ActInfoTitle> 
                                    <Space3/>
                                    <ActInfoTxt>0개</ActInfoTxt>
                                </ActInfoBoxInner>
                                <SeeMoreIconBox>
                                    <EvilIcons name="chevron-right" size={30} color={colors.logoBlue} />
                                </SeeMoreIconBox>
                            </ActInfoBox>
                            <Space20/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={goMyReplyContent}>
                            <ActInfoBox>    
                                <ActInfoBoxInner>
                                    <ActInfoTitle>댓글단 글</ActInfoTitle> 
                                    <Space3/>
                                    <ActInfoTxt>5개</ActInfoTxt>
                                </ActInfoBoxInner>
                                <SeeMoreIconBox>
                                    <EvilIcons name="chevron-right" size={30} color={colors.logoBlue} />
                                </SeeMoreIconBox>
                            </ActInfoBox>
                            <Space20/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={goMyLikeContent}>
                            <ActInfoBox>    
                                <ActInfoBoxInner>
                                    <ActInfoTitle>북마크한 글</ActInfoTitle> 
                                    <Space3/>
                                    <ActInfoTxt>5개</ActInfoTxt>
                                </ActInfoBoxInner>
                                <SeeMoreIconBox>
                                    <EvilIcons name="chevron-right" size={30} color={colors.logoBlue} />
                                </SeeMoreIconBox>
                            </ActInfoBox>
                            <Space20/>
                        </TouchableOpacity>

                    </ActInfoView>
                </PaddingView>


                <Space8Gray />
                <Space20 />

                <UserHomeTitleView>
                    <UserHomeTitleInner>
                        <Ionicons name="attach" size={18} color={colors.textBlack} />
                        <UserHomeTitleTxt>기타</UserHomeTitleTxt>
                    </UserHomeTitleInner>
                </UserHomeTitleView>
                <Space10 />
                
                <PaddingView>
                    <ActInfoView>

                        <TouchableOpacity onPress={goNotice}>
                            <ActInfoBox>    
                                <ActInfoBoxInner>
                                    <ActInfoTitleOneLine>공지사항</ActInfoTitleOneLine> 
                                </ActInfoBoxInner>
                                <SeeMoreIconBoxOneLine>
                                    <EvilIcons name="chevron-right" size={30} color={colors.logoBlue} />
                                </SeeMoreIconBoxOneLine>
                            </ActInfoBox>
                            <Space20/>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <ActInfoBox>    
                                <ActInfoBoxInner>
                                    <ActInfoTitleOneLine>초대하기</ActInfoTitleOneLine> 
                                </ActInfoBoxInner>
                                <SeeMoreIconBoxOneLine>
                                    <EvilIcons name="chevron-right" size={30} color={colors.logoBlue} />
                                </SeeMoreIconBoxOneLine>
                            </ActInfoBox>
                            <Space20/>
                        </TouchableOpacity>


                    </ActInfoView>
                </PaddingView>

            </InfoView>
            :   
            
            <SettingView>

                <Space20/>

                <UserHomeTitleView>
                    <UserHomeTitleInner>
                        <Ionicons name="ios-settings-outline" size={16} color={colors.textBlack} />
                        <UserHomeTitleTxt>정보설정</UserHomeTitleTxt>
                    </UserHomeTitleInner>
                </UserHomeTitleView>
                <Space10 />
                
                <PaddingView>
                    <ActInfoView>
                        <TouchableOpacity onPress={goChangeNickname}>
                            <ActInfoBox>    
                                <ActInfoBoxInner>
                                    <ActInfoTitleOneLine>나의 닉네임 변경</ActInfoTitleOneLine> 
                                </ActInfoBoxInner>
                                <SeeMoreIconBoxOneLine>
                                    <EvilIcons name="chevron-right" size={30} color={colors.logoBlue} />
                                </SeeMoreIconBoxOneLine>
                            </ActInfoBox>
                            <Space20/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={goChangeProfileImg}>
                            <ActInfoBox>    
                                <ActInfoBoxInner>
                                    <ActInfoTitleOneLine>아기 사진 변경</ActInfoTitleOneLine> 
                                </ActInfoBoxInner>
                                <SeeMoreIconBoxOneLine>
                                    <EvilIcons name="chevron-right" size={30} color={colors.logoBlue} />
                                </SeeMoreIconBoxOneLine>
                            </ActInfoBox>
                            <Space20/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={goChangeBabyNickname}>
                            <ActInfoBox>    
                                <ActInfoBoxInner>
                                    <ActInfoTitleOneLine>아기 닉네임 변경</ActInfoTitleOneLine> 
                                </ActInfoBoxInner>
                                <SeeMoreIconBoxOneLine>
                                    <EvilIcons name="chevron-right" size={30} color={colors.logoBlue} />
                                </SeeMoreIconBoxOneLine>
                            </ActInfoBox>
                            <Space20/>
                        </TouchableOpacity>


                    </ActInfoView>
                </PaddingView>

                <Space8Gray />
                <Space20 />
               
                <UserHomeTitleView>
                    <UserHomeTitleInner>
                        <SimpleLineIcons name="bell" size={15} color={colors.textBlack} />
                        <UserHomeTitleTxt style={{marginTop:0}}>알람설정</UserHomeTitleTxt>
                    </UserHomeTitleInner>
                </UserHomeTitleView>
                <Space10 />
                
                <PaddingView>
                    <ActInfoView>
                        <ActInfoBox>    
                            <ActInfoBoxInner>
                                <ActInfoTitle>푸시 알림</ActInfoTitle> 
                                <Space3/>
                                <ActInfoTxt>모든 푸시알람을 켜거나 끌수 있어요</ActInfoTxt>
                            </ActInfoBoxInner>
                            <SeeMoreIconBox>
                                <ServiceAlertSwitch 
                                    trackColor={{false: colors.textLightGray, true: colors.logoBlue}}
                                    thumbColor={isServiceAlertOn ? '#FFFFFF' : '#FFFFFF'}
                                    ios_backgroundColor={colors.textLightGray}
                                    onValueChange={toggleServiceAlert}
                                    value={isServiceAlertOn}
                                    style={{ transform: [{ scaleX:0.8 }, { scaleY: 0.8 }] }}
                                />
                            </SeeMoreIconBox>
                        </ActInfoBox>
                        <Space20/>

                        <ActInfoBox>    
                            <ActInfoBoxInner>
                                <ActInfoTitle>댓글</ActInfoTitle> 
                                <Space3/>
                                <ActInfoTxt>댓글이 달리면 푸시알람을 받을 수 있어요.</ActInfoTxt>
                            </ActInfoBoxInner>
                            <SeeMoreIconBox>
                                <ServiceAlertSwitch 
                                    trackColor={{false: colors.textLightGray, true: colors.logoBlue}}
                                    thumbColor={isServiceAlertOn ? '#FFFFFF' : '#FFFFFF'}
                                    ios_backgroundColor={colors.textLightGray}
                                    onValueChange={toggleServiceAlert}
                                    value={isServiceAlertOn}
                                    style={{ transform: [{ scaleX:0.8 }, { scaleY: 0.8 }] }}
                                />
                            </SeeMoreIconBox>
                        </ActInfoBox>
                        <Space20/>

                        <ActInfoBox>    
                            <ActInfoBoxInner>
                                <ActInfoTitle>좋아요</ActInfoTitle> 
                                <Space3/>
                                <ActInfoTxt>좋아요를 받으면 푸시알람을 받을 수 있어요.</ActInfoTxt>
                            </ActInfoBoxInner>
                            <SeeMoreIconBox>
                                <ServiceAlertSwitch 
                                    trackColor={{false: colors.textLightGray, true: colors.logoBlue}}
                                    thumbColor={isServiceAlertOn ? '#FFFFFF' : '#FFFFFF'}
                                    ios_backgroundColor={colors.textLightGray}
                                    onValueChange={toggleServiceAlert}
                                    value={isServiceAlertOn}
                                    style={{ transform: [{ scaleX:0.8 }, { scaleY: 0.8 }] }}
                                />
                            </SeeMoreIconBox>
                        </ActInfoBox>
                        <Space20/>
                    </ActInfoView>

                </PaddingView>

                <Space8Gray />
                <Space20 />


                <UserHomeTitleView>
                    <UserHomeTitleInner>
                    <Ionicons name="attach" size={18} color={colors.textBlack} />
                        <UserHomeTitleTxt>기타</UserHomeTitleTxt>
                    </UserHomeTitleInner>
                </UserHomeTitleView>
                <Space10 />
                
                <PaddingView>
                    <ActInfoView>

                        <TouchableOpacity onPress={goWriteCustomerOpinion}>
                            <ActInfoBox>    
                                <ActInfoBoxInner>
                                    <ActInfoTitleOneLine>고객의견</ActInfoTitleOneLine> 
                                </ActInfoBoxInner>
                                <SeeMoreIconBoxOneLine>
                                    <EvilIcons name="chevron-right" size={30} color={colors.logoBlue} />
                                </SeeMoreIconBoxOneLine>
                            </ActInfoBox>
                            <Space20/>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <ActInfoBox>    
                                <ActInfoBoxInner>
                                    <ActInfoTitleOneLine>이용약관</ActInfoTitleOneLine> 
                                </ActInfoBoxInner>
                                <SeeMoreIconBoxOneLine>
                                    <EvilIcons name="chevron-right" size={30} color={colors.logoBlue} />
                                </SeeMoreIconBoxOneLine>
                            </ActInfoBox>
                            <Space20/>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <ActInfoBox>    
                                <ActInfoBoxInner>
                                    <ActInfoTitleOneLine>개인정보 취급방침</ActInfoTitleOneLine> 
                                </ActInfoBoxInner>
                                <SeeMoreIconBoxOneLine>
                                    <EvilIcons name="chevron-right" size={30} color={colors.logoBlue} />
                                </SeeMoreIconBoxOneLine>
                            </ActInfoBox>
                            <Space20/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={logoutCheck}>
                            <ActInfoBox>    
                                <ActInfoBoxInner>
                                    <ActInfoTitleOneLine>로그아웃</ActInfoTitleOneLine> 
                                </ActInfoBoxInner>
                                <SeeMoreIconBoxOneLine>
                                    <EvilIcons name="chevron-right" size={30} color={colors.logoBlue} />
                                </SeeMoreIconBoxOneLine>
                            </ActInfoBox>
                            <Space20/>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <ActInfoBox>    
                                <ActInfoBoxInner>
                                    <ActInfoTitleOneLine>회원탈퇴</ActInfoTitleOneLine> 
                                </ActInfoBoxInner>
                                <SeeMoreIconBoxOneLine>
                                    <EvilIcons name="chevron-right" size={30} color={colors.logoBlue} />
                                </SeeMoreIconBoxOneLine>
                            </ActInfoBox>
                            <Space20/>
                        </TouchableOpacity>


                    </ActInfoView>
                </PaddingView>
            </SettingView>
            }

        </MainScrollView>

    </BasicView>
)};

export default Mypage;




