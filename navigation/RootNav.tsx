import react, { useEffect } from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import Tabs from "./Tabs";
import Stack from "./Stack";
import { useNavigation } from "@react-navigation/native";
import { Alert, BackHandler } from "react-native";

const Nav = createNativeStackNavigator();


const RootNav = () => {
    const navigation = useNavigation();


    useEffect(()=>{
        const androidBackAction = () =>{
            const canGoBack = navigation.canGoBack();

            if(canGoBack){
                backAction();
            }else{
                //돌아갈수 없으면 종료시킴
                Alert.alert("종료", "앱을 종료 하시겠습니까?", [
                    {
                    text: "취소",
                    onPress: () => null,
                    style: "cancel"
                    },
                    { text: "확인", onPress: () => BackHandler.exitApp() }
                ]);
            }
            return true;
        }

        //안드로이드 백버튼 누를때 처리
        const backHandler = BackHandler.addEventListener('hardwareBackPress', androidBackAction);
        return () => {backHandler.remove();}
    }) //모든 동작에 반응하도록 [] 안넣어줌!


    
    // //헤더 백버튼 누를때 && 안드로이드 뒤로 갈수 있을때.
    const backAction = ()=>{
        navigation.goBack();
    }

    return(
        <Nav.Navigator 
            screenOptions={{
                headerShown:false,
                animation:'slide_from_right',
                //presentation:'modal',
            }}
            
        >
            <Nav.Screen name ="Tabs" component={Tabs} />
            <Nav.Screen name ="Stack" component={Stack} />
        </Nav.Navigator>
    )
}
export default RootNav;