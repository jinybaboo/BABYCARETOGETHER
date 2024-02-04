import react, { useEffect, useState } from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"


import { Text, View, Image, Alert, BackHandler } from 'react-native';
import {Ionicons, Entypo, AntDesign, Octicons, FontAwesome5, Fontisto} from '@expo/vector-icons';
import Home from "../screens/Home";
import Mypage from "../screens/Mypage";
import { useNavigation } from "@react-navigation/native";
import Login from "../screens/Login";
import CommunityBoard from "../screens/CommunityBoard";
import Search from "../screens/Search";
import colors from "../common/commonColors";
import * as getApi from "../common/getApi";
import EncryptedStorage from 'react-native-encrypted-storage';
import { userLogout } from "../common/commonFunc";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducer";
import { useAppDispatch } from "../store";

const Tab = createBottomTabNavigator();

const Tabs = () => {
    const navigation:any = useNavigation();
    const dispatch:any = useAppDispatch();

    const isLogin = useSelector((state:RootState)=>state.user.isLogin);
    
    //탭메뉴 움직일때마다 accessToken 유효성 검증해서 로그인 아웃 처리 할것!!!
    useEffect(()=>{
        async function checkAccessTokenValid(){

            const accessToken = await EncryptedStorage.getItem('accessToken');
           
            if(accessToken){
                // 엑세스 토큰이 있는데 유효하지 않으면 로그아웃 처리
                const isValid = await getApi.getIsAccessTokenValid(accessToken);
                if(!isValid){  
                    await userLogout(dispatch);  
                }
            }else{
                await userLogout(dispatch);  // 엑세스 토큰이 없으면 로그아웃 처리
            }
        }   
        checkAccessTokenValid();
    })


    const iconSize = 22;

    return(
        <Tab.Navigator 
        initialRouteName="Home" 
        screenOptions={{
            tabBarShowLabel:false,
            tabBarLabelPosition:"below-icon",
            headerShown : false, //헤더 보여줄지 말지
            tabBarStyle:{
            },
            tabBarLabelStyle:{
                fontSize:10,
                paddingBottom:5,
            },

            tabBarHideOnKeyboard: true, //안드로이드 키보드 입력시 탭바 올리기
            //페이지 전환시 마다 데이터를 다시 호출함!!!
            //unmountOnBlur:true,
            //tabBarActiveTintColor:"red",
        }}>
            <Tab.Screen 
                name="홈" 
                component={Home} 
                options={{
                    tabBarActiveTintColor : colors.logoRed,
                    unmountOnBlur: true, // 화면 접속시 마다 데이터 재요청
                    tabBarIcon:({focused,color,size}) =>{
                        //console.log(focused,color,size);
                        return <Entypo name="home" size={iconSize} color={color} />
                },

            }}/>
            <Tab.Screen name="동기소통" component={CommunityBoard} 
                options={{
                    tabBarActiveTintColor : colors.logoOrange,
                    tabBarIcon :({focused, color, size}) =>{
                        // return <FontAwesome5 name="user-friends" size={iconSize} color={color} />
                        return <Entypo name="chat" size={iconSize} color={color} />
                    },
                }}
            />
            
            <Tab.Screen name="검색" component={Search} 
                 options={{
                    tabBarActiveTintColor : colors.logoGreen,
                    tabBarIcon :({focused, color, size}) =>{
                        return <FontAwesome5 name="search" size={iconSize} color={color} />
                    },
                }}
            />

            {isLogin?
            <Tab.Screen name="마이페이지" component={Mypage} 
              options={{
                tabBarActiveTintColor : colors.logoBlue,
                tabBarIcon :({focused, color, size}) =>{
                    return <Ionicons name="person" size={iconSize} color={color} />
                },
              }}
            />
            :
             <Tab.Screen name="로그인" component={Login} 
              options={{
                tabBarActiveTintColor : colors.logoBlue,
                tabBarIcon :({focused, color, size}) =>{
                    return <Ionicons name="person" size={iconSize} color={color} />
                },
              }}
            />
            }

            {/* 
             <Tab.Screen name="로그인" component={Login} 
                options={{
                    // tabBarLabelStyle:{
                    //     color:'#000',
                    //     backgroundColor:'gray'
                    // },
                    //tabBarBadge:"new",
                    headerTitleStyle:{
                        color:'tomato'
                    },
                    headerRight: () => (
                        <View>
                        <Text>설정</Text>
                        </View>
                    ),
                    tabBarIcon :({focused, color, size}) =>{
                        //focus 상태에 따라 아이콘을 바꾸어줄때는 네임만 바꾸어 주면 된다! (아웃라인 있는 아이콘, 없는 아이콘)
                        return <Ionicons name={focused?"search-outline":"search"} size={size} color={color} />
                    },
                }}
            /> */}
        </Tab.Navigator>
    )
};

export default Tabs;
