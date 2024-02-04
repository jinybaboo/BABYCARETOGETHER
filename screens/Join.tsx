import { useNavigation } from "@react-navigation/native";
import react, { useEffect, useState } from "react";
import {View, Text, Pressable, StyleSheet, Platform} from "react-native";

import {login,loginWithKakaoAccount,logout,getProfile as getKakaoProfile,unlink,} from "@react-native-seoul/kakao-login";
import { appleAuth, AppleButton } from '@invertase/react-native-apple-authentication';
import styled from "styled-components/native";
import colors from "../common/commonColors";
import { BasicView, LineE2E2E2, LineF2F2F2, PaddingView, Space10, Space15, Space20, Space30, Space35, Space5 } from "../common/commonStyledComp";
import { AlertType1, getWindowWidth, userLogin } from "../common/commonFunc";
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'; 
import CustomHeaderRightX from "../components/CustomHeaderRightX";
import * as getApi from "../common/getApi";
import * as insertApi from "../common/insertApi";
import EncryptedStorage from 'react-native-encrypted-storage';
import { useAppDispatch } from "../store";

const windowWidth = getWindowWidth();


const Join = () => {
  const dispatch:any = useAppDispatch();
    const navigation:any = useNavigation();

    const [credentialStateForUser, updateCredentialStateForUser] = useState(-1);

    const [agree1, setAgree1] = useState(true);
    const [agree2, setAgree2] = useState(true);
    const [agree3, setAgree3] = useState(true);

    const os = Platform.OS;



  useEffect(() => {
    if (!appleAuth.isSupported) return;

    fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
      updateCredentialStateForUser(error.code),
    );
  }, []);

  useEffect(() => {
    if (!appleAuth.isSupported) return;

    return appleAuth.onCredentialRevoked(async () => {
      console.warn('Credential Revoked');
      fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
        updateCredentialStateForUser(error.code),
      );
    });
  }, []);



  function validateLogin(from:string){
    if(!agree1 || !agree2){
      AlertType1('잠깐!', '필수 약관에 동의해 주세요.', ()=>{return});
      return;
    }

    if(from==='kakao'){
      signInWithKakao();
    }else if(from==='apple'){
      onAppleButtonPress(updateCredentialStateForUser);
    }
    
  }


  // 카카오 로그인
  const signInWithKakao = async () => {
    try {
      const token:any = await login();
      const {id, nickname, email, gender, profileImageUrl, birthyear } = await getKakaoProfile();
      
      await prepareUserInfo('@k'+id, nickname, email, gender, profileImageUrl, birthyear);

    } catch (err) {
      console.error("login err", err);
    }
  };


  // 애플 로그인 
  let user:any = null;

  async function fetchAndUpdateCredentialState(updateCredentialStateForUser:any) {
    if (user === null) {
      updateCredentialStateForUser('N/A');
    } else {
      const credentialState = await appleAuth.getCredentialStateForUser(user);
      if (credentialState === appleAuth.State.AUTHORIZED) {
        updateCredentialStateForUser('AUTHORIZED');
      } else {
        updateCredentialStateForUser(credentialState);
      }
    }
  }
  async function onAppleButtonPress(updateCredentialStateForUser:any) {
    // start a login request
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      //console.log('appleAuthRequestResponse', appleAuthRequestResponse);

      const {
        user: newUser,
        email,
        nonce,
        identityToken,
        realUserStatus /* etc */,
      } = appleAuthRequestResponse;

      user = newUser;

      fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
        updateCredentialStateForUser(`Error: ${error.code}`),
      );

      if (identityToken) {
        // e.g. sign in with Firebase Auth using `nonce` & `identityToken`
        //console.log(nonce, identityToken);
      } else {
        // no token - failed sign-in?
      }

      if (realUserStatus === appleAuth.UserStatus.LIKELY_REAL) {
        //console.log("I'm a real person!", realUserStatus);
      }

      //console.warn(`Apple Authentication Completed, ${user}, ${email}`);
      prepareUserInfo('@a'+user, '@a'+user.substring(0,5), null, null, null, null);

    } catch (error:any) {
      if (error.code === appleAuth.Error.CANCELED) {
        console.warn('User canceled Apple Sign in.');
      } else {
        console.error(error);
      }
    }
  }
  // 애플 로그인 끝

  async function prepareUserInfo(userId:any, nickname:any, email:any, gender:any, profileImageUrl:any, birthyear:any){
    const {isExist} = await getApi.getIsUserExistForLogin(userId);
   
    //회원가입 처리 
    if(!isExist){   
      const isSuccess = await insertApi.insertUserInfo({userId, nickname, email, gender, profileImageUrl, birthyear, 'isMarketingAgree':agree3}) 
      if(!isSuccess){
        AlertType1('이런!', `회원가입이 실패하였습니다.${'\n'}다시 시도해 주세요.`, ()=>{});
        return;
      }
    }
    
    //로그인 처리 
    await userLogin(userId, dispatch);

    //저장후에 홈으로 보내기
    gohome();
  }


  function gohome(){  navigation.navigate('Tabs', {screen: '홈', params:{} });}

  

  // if (!appleAuth.isSupported) {
  //   return (
  //     <View style={[styles.container:string, styles.horizontal]}>
  //       <Text>Apple Authentication is not supported on this device.</Text>
  //     </View>
  //   );
  // }




    const LoginView = styled.View`
        flex:1; align-items: center; background-color: #ffffff;
    `
    const LoginInnerView1 = styled.View`
        flex:1; align-items: center; justify-content: center;
    `
     const LoginInnerView2 = styled.View`
        flex:2; align-items: center; justify-content: center;
    `
    const LoginInnerView3 = styled.View`
        flex:5; align-items: center;  justify-content: space-evenly;
    `

    const BabyImage = styled.Image`
        width:150px; height:150px; border-radius: 150px; margin-top: -40px;
    `
    const HeaderLogo = styled.Image`
        width: 100px; height:24px;  margin-top:0px; transform: scale(1.4); 
    `
    const LoginTxt = styled.Text`
        font-family: 'noto400'; font-size: 18px; line-height: 25px; color:${colors.textBlack}; letter-spacing: 0.2px; text-align: center;
    `

    const LoginTitle = styled.Text`
        font-family: 'noto400'; font-size: 16px;  color:${colors.textBlack}; letter-spacing: -0.2px; text-align: center;
    `
    const LoginBtnsView = styled.View`
        justify-content: center;
    `

    const KakaoLoginPress = styled.Pressable`
        width:${windowWidth-60}px; height:55px; background-color:#FEE500 ; border-radius: 8px; align-items: center; justify-content: center;
        flex-direction: row;
    `
    const AppleLoginPress = styled(KakaoLoginPress)`
        background-color: #000000; margin-top: 15px;
    `

    const KakaoLoginTxt = styled.Text`
        font-size: 17px; color:#000000; font-weight: 600; padding-left: 6px; letter-spacing: 0.5px;
    `

    const AppleLoginTxt = styled(KakaoLoginTxt)`
        color:#FFFFFF; padding-left: 1px;
    `

    const GoJoinTxt = styled.Text`
        font-family: 'noto400'; font-size: 14px;  color:${colors.textBlack}; letter-spacing: -0.2px; text-align: center;
    `
    const GoJoinTxt2 = styled(GoJoinTxt)`
        color:${colors.textBlack}; text-decoration: underline;
    `

    const AgreementView = styled.View``

    const AgreementBox = styled.View`
        width:${windowWidth-60}px;  flex-direction: row; align-items: center;  height:24px; justify-content: space-between;
    `
    const AgreementInner = styled.View`
        flex-direction: row;  
    `
    
    const AgreementTxt1 = styled.Text`
        font-family: 'noto400'; font-size: 14px; line-height:24px;  color:${colors.textBlack}; letter-spacing: -0.2px; 
        margin-top:${os=='ios'?-2:0}px; padding-left: 8px;
    `
     const AgreementTxt1_1 = styled(AgreementTxt1)`
        font-family: 'noto500'; font-size:15px;
    `
    const AgreementTxt2 = styled(AgreementTxt1)`
       color:${colors.logoOrange};
    `
    const AgreementTxt2_1 = styled(AgreementTxt1)`
        color:${colors.textLightGray};
    `
    const CheckPress = styled.TouchableOpacity`
        height:24px; flex-direction: row; 
    `

    const SeeMorePress = styled.TouchableOpacity`
        width:40px; height:24px; 
    `
    const SeeMoreTxt = styled.Text`
        font-family: 'noto500'; font-size: 12px; line-height:24px;  color:${colors.textBlack}; letter-spacing: -0.2px; text-decoration: underline;
        margin-top:${os=='ios'?1:2}px;
    `


    function setAgreeAll(){
        if(!agree1){
            setAgree1(true); setAgree2(true); setAgree3(true);
        }else{
            setAgree1(false); setAgree2(false); setAgree3(false);
        }
        
    }

    return (

    <LoginView>
        <CustomHeaderRightX title={''}/>
      <LoginInnerView1>
        {/* <BabyImage source={require('../assets/profile/defaultProfile.png')}/> */}
        <HeaderLogo source={require('../assets/icons/headerLogo.png')}/>
        <Space35 />
        <LoginTxt>
          전국의 동기들과{'\n'}지혜롭게 아이를 키워요
        </LoginTxt>
      </LoginInnerView1>

      <LineE2E2E2 />

      <LoginInnerView2>

        <LoginInnerView1>
            <LoginTitle>SNS 계정 회원가입</LoginTitle>
        </LoginInnerView1>



        <LoginInnerView3>
            <LoginBtnsView>
            <KakaoLoginPress onPress={()=> validateLogin('kakao')}>
                <MaterialCommunityIcons name="chat" size={24} color="black" />
                <KakaoLoginTxt>카카오로 가입하기</KakaoLoginTxt>
            </KakaoLoginPress>

            {os==='ios'&&
                <AppleLoginPress onPress={() => validateLogin('apple')}>
                    <Ionicons name="ios-logo-apple" size={24} color="white" />
                    <AppleLoginTxt> Apple로 가입하기</AppleLoginTxt>
                </AppleLoginPress>
            }

            </LoginBtnsView>

            <AgreementView>
                <AgreementBox>
                    <AgreementInner>
                        <CheckPress onPress={setAgreeAll}>
                            <Ionicons name="ios-checkmark-circle" size={20} color={agree1&&agree2&&agree3?colors.logoOrange:colors.logoOrangeOpacity} />
                            <AgreementTxt1_1>이용약관 전체 동의</AgreementTxt1_1>
                        </CheckPress>
                    </AgreementInner>

                </AgreementBox>
                <Space15 />
                    <LineF2F2F2 style={{width:windowWidth-60}}/>
                <Space15 />
                <AgreementBox>
                    <AgreementInner>
                        <CheckPress onPress={()=>{setAgree1(!agree1)}}>
                            <Ionicons name="ios-checkmark-circle" size={20} color={agree1?colors.logoOrange:colors.logoOrangeOpacity} />
                            <AgreementTxt1><AgreementTxt2_1>(필수)</AgreementTxt2_1> 서비스 이용약관</AgreementTxt1>
                        </CheckPress>
                    </AgreementInner>
                    <SeeMorePress>
                        <SeeMoreTxt>보기</SeeMoreTxt>
                    </SeeMorePress>
                </AgreementBox>

                <Space5 />

                <AgreementBox>
                    <AgreementInner>
                        <CheckPress onPress={()=>{setAgree2(!agree2)}}>
                            <Ionicons name="ios-checkmark-circle" size={20} color={agree2?colors.logoOrange:colors.logoOrangeOpacity} />
                            <AgreementTxt1><AgreementTxt2_1>(필수)</AgreementTxt2_1> 개인정보 수집 및 이용 동의</AgreementTxt1>
                        </CheckPress>
                    </AgreementInner>
                    <SeeMorePress>
                        <SeeMoreTxt>보기</SeeMoreTxt>
                    </SeeMorePress>
                </AgreementBox>

                <Space5 />

                <AgreementBox>
                    <AgreementInner>
                        <CheckPress onPress={()=>{setAgree3(!agree3)}}>
                            <Ionicons name="ios-checkmark-circle" size={20} color={agree3?colors.logoOrange:colors.logoOrangeOpacity} />
                            <AgreementTxt1><AgreementTxt2_1>(선택)</AgreementTxt2_1> 마케팅 수신 동의</AgreementTxt1>
                        </CheckPress>
                    </AgreementInner>
                    <SeeMorePress>
                        <SeeMoreTxt>보기</SeeMoreTxt>
                    </SeeMorePress>
                </AgreementBox>

            </AgreementView>

            <Pressable onPress={()=>{navigation.goBack()}} style={{position:'absolute', bottom:40}}>
                <GoJoinTxt>이미 회원이신가요?   <GoJoinTxt2>로그인</GoJoinTxt2></GoJoinTxt>
            </Pressable>

            <Space30 />
        </LoginInnerView3>

      </LoginInnerView2>


    </LoginView>

    // <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
    //     <Pressable onPress={signInWithKakao}>
    //     <Text>Login</Text>
    //     </Pressable>

    //     {os==='ios'&&
    //       <AppleButton
    //       style={styles.appleButton}
    //         cornerRadius={5}
    //         buttonStyle={AppleButton.Style.WHITE}
    //         buttonType={AppleButton.Type.CONTINUE}
    //         onPress={() => onAppleButtonPress(updateCredentialStateForUser)}
    //       />
    //     }

    // </View>
)};

export default Join;

