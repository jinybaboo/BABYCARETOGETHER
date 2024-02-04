import styled from "styled-components/native";
import { Platform } from "react-native";

const os = Platform.OS;

//// 모든 컴포넌트 공통사항
export const BasicView = styled.View`
    flex:1; background-color: #FFFFFF;
`
export const MainView = styled.View`   //메인스클롤뷰 또는 메인뷰 둘중 하나 택1 
    flex:1; background-color: FFFFFF;
`
export const MainScrollView = styled.ScrollView`
    flex:1;    height:100%; background-color: FFFFFF;
`

export const MainFlatList = styled.FlatList`
    flex:1;    height:100%; background-color: FFFFFF;
`


export const BasicKeyboardAvoidingView = styled.KeyboardAvoidingView`flex:1;`


export const PaddingView = styled.View`padding:0 20px;`


/////////안드로이드 헤더 스페이스 
export const HeaderSpaceForAndroid = styled.View`
    width:100%; height: ${os=='ios'?0:10}px;
`



////// 라인 및 공간 관리
export const Space3 = styled.View` width:100%; height:3px;`
export const Space5 = styled.View` width:100%; height:5px;`
export const Space10 = styled.View` width:100%; height:10px;`
export const Space15 = styled.View` width:100%; height:15px;`
export const Space20 = styled.View` width:100%; height:20px;`
export const Space25 = styled.View` width:100%; height:25px;`
export const Space30 = styled.View` width:100%; height:30px;`
export const Space35 = styled.View` width:100%; height:35px;`

export const LineE2E2E2 = styled.View`width:100%; height:1px; background-color:#E2E2E2;`
export const LineF2F2F2 = styled.View`width:100%; height:1px; background-color:#F2F2F2;`
export const Space8Gray = styled.View` width:100%; height:8px; background-color: #f9f8f8; 
/* border-top-color: #E2E2E2;border-top-width: 1px; border-bottom-color: #E2E2E2;border-bottom-width: 1px; */
`
