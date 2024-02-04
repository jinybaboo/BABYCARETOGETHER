import { useNavigation } from "@react-navigation/native";
import react, { useEffect, useState } from "react";
import {View, Text, Pressable, StyleSheet, Platform} from "react-native";

import {login,loginWithKakaoAccount,logout,getProfile as getKakaoProfile,unlink,} from "@react-native-seoul/kakao-login";
import { appleAuth, AppleButton } from '@invertase/react-native-apple-authentication';
import styled from "styled-components/native";
import colors from "../common/commonColors";
import { BasicView, LineE2E2E2, PaddingView, Space10, Space15, Space20, Space30, Space35, Space5 } from "../common/commonStyledComp";
import { AlertType1, getWindowWidth, userLogin } from "../common/commonFunc";
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'; 
import EncryptedStorage from 'react-native-encrypted-storage';

import * as getApi from "../common/getApi";
import { useQuery } from "react-query";
import { useAppDispatch } from "../store";

const windowWidth = getWindowWidth();



const Login = () => {
  const navigation:any = useNavigation();
  const dispatch:any = useAppDispatch();

  const [credentialStateForUser, updateCredentialStateForUser] = useState(-1);

  const [userInfo, setUserInfo] = useState({});

  const os = Platform.OS;

  function goJoin(){
    navigation.navigate("Stack", {
        screen:"Join",
        params:{
            // title:'ffff',
        }
    });
  }



  // 카카오 로그인
  const signInWithKakao = async () => {
    try {
      const token:any = await login();
      const profile = await getKakaoProfile();
      const {email, nickname, profileImageUrl, gender, birthyear} = profile;
      const userId = '@k'+profile.id;
      setUserInfo({userId:userId, email, nickname, profileImageUrl, gender, birthyear});
      

      checkIsNewUser(userId);

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

      checkIsNewUser('@a'+user)

    } catch (error:any) {
      if (error.code === appleAuth.Error.CANCELED) {
        console.warn('User canceled Apple Sign in.');
      } else {
        console.error(error);
      }
    }
  }

  // 애플 로그인 끝


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



  ////// 로그인 처리
  async function checkIsNewUser(userId:string){
    const {isExist} = await getApi.getIsUserExistForLogin(userId)
    if(isExist){ 
      //로그인 처리 
      await userLogin(userId, dispatch);
      
      //홈으로 보내기
      gohome();
    }else{
      AlertType1('잠깐!', `육아동기가 처음방 문하시네요.${'\n'}회원가입을 해 주세요.`, goJoin);
    }
  }

  function gohome(){  navigation.navigate('Tabs', { screen: '홈' }); }




  const LoginView = styled.View`
    flex:1; align-items: center; background-color: #ffffff;
  `
  const LoginInnerView1 = styled.View`
    flex:1; align-items: center; justify-content: center;
  `
  const BabyImage = styled.Image`
    width:150px; height:150px; border-radius: 150px;
  `
  const HeaderLogo = styled.Image`
    width: 100px; height:24px;  margin-top:20px; transform: scale(1.4);
  `
  const LoginTxt = styled.Text`
    font-family: 'noto400'; font-size: 18px; line-height: 25px; color:${colors.textBlack}; letter-spacing: 0.2px; text-align: center;
  `

  const LoginTitle = styled.Text`
    font-family: 'noto300'; font-size: 16px;  color:${colors.textBlack}; letter-spacing: -0.2px; text-align: center;
  `
  const LoginBtnsView = styled.View`
    flex:1; justify-content: center;
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
    return (

    <LoginView>
      <LoginInnerView1>
        {/* <BabyImage source={require('../assets/profile/defaultProfile.png')}/> */}
        <HeaderLogo source={require('../assets/icons/headerLogo.png')}/>
        <Space35 />
        <LoginTxt>
          전국의 동기들과{'\n'}지혜롭게 아이를 키워요
        </LoginTxt>
      </LoginInnerView1>

      <LineE2E2E2 />

      <LoginView>
        <Space30 />
        <LoginTitle>SNS 계정 로그인</LoginTitle>

        <LoginBtnsView>
          <KakaoLoginPress onPress={signInWithKakao}>
            <MaterialCommunityIcons name="chat" size={24} color="black" />
            <KakaoLoginTxt>카카오 로그인</KakaoLoginTxt>
          </KakaoLoginPress>

          {os==='ios'&&
          <AppleLoginPress onPress={() => onAppleButtonPress(updateCredentialStateForUser)}>
              <Ionicons name="ios-logo-apple" size={24} color="white" />
              <AppleLoginTxt> Apple 로그인</AppleLoginTxt>
          </AppleLoginPress>
          }

        </LoginBtnsView>

        <Pressable onPress={goJoin}>
        <GoJoinTxt>육아동기가 처음이신가요?   <GoJoinTxt2>간편회원가입</GoJoinTxt2></GoJoinTxt>
        </Pressable>

        <Space30 />

      </LoginView>


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

export default Login;

