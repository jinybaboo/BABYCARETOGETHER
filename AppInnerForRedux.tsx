import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Font from 'expo-font';
import RootNav from "./navigation/RootNav";
import { Platform, SafeAreaView as  SafeAreaViewForIos} from 'react-native';
import { SafeAreaView as SafeAreaViewForAndroid } from 'react-native-safe-area-context';
import { checkNotifications } from 'react-native-permissions';
import EncryptedStorage from 'react-native-encrypted-storage';
import { RootState } from './store/reducer';
import { useSelector } from 'react-redux';
import * as getApi from "./common/getApi";
import userSlice from './slices/user';
import { useAppDispatch } from './store';


// 페이지 이동을 위한 네이게이터 생성 및 제작
const NativeStack = createNativeStackNavigator();

function AppInnerForRedux(){

    const dispatch:any = useAppDispatch();

    const [isAppReady, setAppReady] = useState(false);

    const os = Platform.OS;


    useEffect(()=>{
     
        
        async function prepare(){
            //재시작시 accessToken으로 로그인 정보 받아서 리덕스에 넣기.
            const accessToken:any = await EncryptedStorage.getItem('accessToken');
            const isValid = await getApi.getIsAccessTokenValid(accessToken);
            console.log('isValid', isValid)
            if(isValid){
                console.log('로그인 재처리 ')
                dispatch(userSlice.actions.setIsLogin(true));
            }


            //폰트 받아오기
            //'SANJUGotgam': 'https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2112@1.0/SANJUGotgam.woff', //woff는 ios만 지원, ttf는 둘다 지원
            let customFonts = {
                'noto100': require('./assets/fonts/NotoSansKR_100Thin.ttf'),
                'noto300': require('./assets/fonts/NotoSansKR_300Light.ttf'),
                'noto400': require('./assets/fonts/NotoSansKR_400Regular.ttf'),
                'noto500': require('./assets/fonts/NotoSansKR_500Medium.ttf'),
                'noto700': require('./assets/fonts/NotoSansKR_700Bold.ttf'),
                'noto900': require('./assets/fonts/NotoSansKR_900Black.ttf'),
            };

            try {
                
             
                await Font.loadAsync(customFonts);    

                setAppReady(true);
                
            } catch (error) {
                console.log(error)
            }
        }

        async function checkPushPermission() {
            const permission = await checkNotifications();
            if (permission.status === 'granted') {
                console.log(os, 'Push Permission granted');
            } else {
                console.log(os, 'Push Permission not granted');
            }
        }
          
        
        prepare();
        checkPushPermission();
    },[]);

    if(!isAppReady){return null;}

    return (
        <NavigationContainer>
            {os==='ios'?
            <SafeAreaViewForIos style={{flex:1, backgroundColor:'#FFFFFF'}}> 
            <RootNav />
            </SafeAreaViewForIos>
            :
            <SafeAreaViewForAndroid style={{flex:1, backgroundColor:'#FFFFFF'}}>
            <RootNav />
            </SafeAreaViewForAndroid>
            }
        </NavigationContainer>
    )
}

export default AppInnerForRedux;

