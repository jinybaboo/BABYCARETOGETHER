import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Alert, BackHandler, Image, Pressable } from "react-native";
import HomeInner from "../screens/HomeInner";
import { useNavigation } from "@react-navigation/native";
import CommunityContent from "../screens/CommunityContent";
import { Ionicons } from '@expo/vector-icons'; 
import colors from "../common/commonColors";
import UserHome from "../screens/UserHome";
import Mypage from "../screens/Mypage";
import Join from "../screens/Join";
import WriteBoard from "../screens/WriteBoard";
import ChangeNickname from "../screens/ChangeNickname";
import ChangeProfileImg from "../screens/ChangeProfileImg";
import InsertBabyInfo from "../screens/InsertBabyInfo";
import MyWriteContent from "../screens/MyWriteContent";
import MyReplyContent from "../screens/MyReplyContent";
import MyLikeContent from "../screens/MyLikeContent";
import Notice from "../screens/Notice";
import NoticeContent from "../screens/NoticeContent";
import ChangeBabyNickname from "../screens/ChangeBabyNickname";
import WriteCustomerOpinion from "../screens/WriteCustomerOpinion";
import WriteDM from "../screens/WriteDM";
import SearchResult from "../screens/SearchResult";
import DmBox from "../screens/DmBox";
import DmContent from "../screens/DmContent";



// 페이지 이동을 위한 네이게이터 생성 및 제작
const NativeStack = createNativeStackNavigator();



//네비게이터 스크린의 네임을, 향후 props에서 navigate 함수를 이용하여 페이지 이동시에 사용한다!!!!!
const Stack = () =>{
    const navigation = useNavigation();

    // //헤더 백버튼 누를때 && 안드로이드 뒤로 갈수 있을때.
    const backAction = ()=>{
        navigation.goBack();
    }

    return (
        <NativeStack.Navigator 
            initialRouteName="Home"
            
            screenOptions={{
                headerTintColor:"#000000",
                headerTitleAlign:"center",
                headerBackTitleVisible:false,
                headerTitleStyle:{
                    fontSize:15,
                },
                headerShadowVisible:false, //헤더 밑줄 없애기
               
                //gestureEnabled: true,  // 이곳에 False 설정시 모든 페이지의 화면에 대해 제스쳐를 금지한다.(IOS 슬라이드로 뒤로가기 포함)
                
                headerLeft:()=>(
                    // <Pressable onPress={()=>{navigation.goBack()}}>
                    <Pressable onPress={backAction} style={{width:50, height:40}}>
                        {/* <Image source={require('../assets/icons/backArrow.png')} style={{width:16,height:20,marginTop:10}}/> */}
                        <Ionicons style={{marginTop:6}} name="chevron-back" size={28} color={colors.textBlack} />
                    </Pressable>
                )
            }}
        >
          

            <NativeStack.Screen 
                name="CommunityContent"
                component={CommunityContent}
                options={{
                    headerShown:false,
                    headerTitle:'',
                    animation:'slide_from_right',
                    presentation:'card',
                    //presentation:'modal',
                }}
            />

            <NativeStack.Screen 
                name="UserHome"
                component={UserHome}
                options={{
                    headerShown:false,
                    headerTitle:'',
                    animation:'slide_from_right',
                    presentation:'card',
                }}
            />
            <NativeStack.Screen 
                name="Join"
                component={Join}
                options={{
                    headerShown:false,
                    headerTitle:'',
                }}
            />
            <NativeStack.Screen 
                name="WriteBoard"
                component={WriteBoard}
                options={{
                    headerShown:false,
                    headerTitle:'',
                }}
            />
            <NativeStack.Screen 
                name="ChangeNickname"
                component={ChangeNickname}
                options={{
                    headerShown:true,
                    headerTitle:'나의 닉네임 변경',
                }}
            />
            <NativeStack.Screen 
                name="ChangeBabyNickname"
                component={ChangeBabyNickname}
                options={{
                    headerShown:true,
                    headerTitle:'아기 닉네임 변경',
                }}
            />
            <NativeStack.Screen 
                name="ChangeProfileImg"
                component={ChangeProfileImg}
                options={{
                    headerShown:true,
                    headerTitle:'아기 사진 변경',
                }}
            />
            <NativeStack.Screen 
                name="InsertBabyInfo"
                component={InsertBabyInfo}
                options={{
                    headerShown:true,
                    headerTitle:'아기 정보 등록',
                }}
            />
            <NativeStack.Screen 
                name="MyWriteContent"
                component={MyWriteContent}
                options={{
                    headerShown:false,
                }}
            />
            <NativeStack.Screen 
                name="MyReplyContent"
                component={MyReplyContent}
                options={{
                    headerShown:false,
                }}
            />
            <NativeStack.Screen 
                name="MyLikeContent"
                component={MyLikeContent}
                options={{
                    headerShown:false,
                }}
            />
            <NativeStack.Screen 
                name="Notice"
                component={Notice}
                options={{
                    headerShown:true,
                    headerTitle:'공지사항',
                }}
            />
             <NativeStack.Screen 
                name="NoticeContent"
                component={NoticeContent}
                options={{
                    headerShown:true,
                    headerTitle:'공지사항',
                    animation:'slide_from_right',
                    presentation:'card',
                }}
            />
            <NativeStack.Screen 
                name="WriteCustomerOpinion"
                component={WriteCustomerOpinion}
                options={{
                    headerShown:false,
                    headerTitle:'고객의견',
                    animation:'slide_from_right',
                    presentation:'card',
                }}
            />
            <NativeStack.Screen 
                name="WriteDM"
                component={WriteDM}
                options={{
                    headerShown:false,
                    headerTitle:'',
                    animation:'slide_from_right',
                    presentation:'card',
                }}
            />
            <NativeStack.Screen 
                name="SearchResult"
                component={SearchResult}
                options={{
                    headerShown:false,
                    headerTitle:'검색결과',
                    animation:'slide_from_right',
                    presentation:'card',
                }}
            />

            <NativeStack.Screen 
                name="DmBox"
                component={DmBox}
                options={{
                    headerShown:true,
                    headerTitle:'받은 쪽지',
                    animation:'slide_from_right',
                    presentation:'card',
                }}
            />
            <NativeStack.Screen 
                name="DmContent"
                component={DmContent}
                options={{
                    headerShown:false,
                    animation:'slide_from_right',
                    presentation:'card',
                }}
            />

        </NativeStack.Navigator>
        
        
    )
}

export default Stack;