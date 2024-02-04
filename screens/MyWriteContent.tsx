import { useNavigation } from "@react-navigation/native";
import react, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import colors from "../common/commonColors";
import { BasicView, HeaderSpaceForAndroid, PaddingView, Space10, Space15, Space20, Space35, Space5 } from "../common/commonStyledComp";
import { Platform} from "react-native";
import { getWindowWidth } from "../common/commonFunc";
import CustomHeaderRightX from "../components/CustomHeaderRightX";
import CustomHeaderLeftArrow from "../components/CustomHeaderLeftArrow";
import CommunityBoardBox from "../components/CommunityBoardBox";
import NoContent from "../components/NoContent";

const os = Platform.OS;
const windowWidth = getWindowWidth();

const ContentFlatList = styled.FlatList`

`

const MyWriteContent = () => {
    
    const navigation:any = useNavigation();

    const [isContentExist, setIsContentExist] = useState(true);

    const testData = [
        {
            title:'전국의 동기들과 지혜롭게 아이를 키워요. 지역아 이콘이 필요 출생아 이콘, 지역아 이콘이 필요해 요해요',
            nickname:'동그리맘',
            babyMonth:'18개월',
            writeTime:'1시간전',
            commentCount:12,
            thumbUrl :'../assets/profile/defaultProfile.png',
        },{
            title:'전국의 동기들과 지혜롭게 아이를 키워요',
            nickname:'동그리맘',
            babyMonth:'18개월',
            writeTime:'1시간전',
            commentCount:0,
            thumbUrl :'../assets/profile/donggle.png',
        },
        {
            title:'전국의 동기들과 지혜롭게 아이를 키워요',
            nickname:'동그리맘',
            babyMonth:'18개월',
            writeTime:'1시간전',
            commentCount:7,
            thumbUrl :'../assets/profile/donggle.png',
        },{
            title:'전국의 동기들과 지혜롭게 아이를 키워요. 지역아 이콘이 필요 출생아 이콘, 지역아 이콘이 필요해 요해요 이콘이 필요 출생아 이콘, 지역아 이콘이 필요해 요해요',
            nickname:'동그리맘',
            babyMonth:'18개월',
            writeTime:'1시간전',
            commentCount:0,
            thumbUrl : null,
        },{
            title:'전국의 동기들과 지혜롭게 아이를 키워요. 지역아 이콘이 필요 출생아 이콘, 지역아 이콘이 필요해 요해요 이콘이 필요 출생아 이콘, 지역아 이콘이 필요해 요해요',
            nickname:'동그리맘',
            babyMonth:'18개월',
            writeTime:'1시간전',
            commentCount:85,
            thumbUrl : null,
        },
        {
            title:'전국의 동기들과 지혜롭게 아이를 키워요. 지역아 이콘이 필요 출생아 이콘, 지역아 이콘이 필요해 요해요',
            nickname:'동그리맘',
            babyMonth:'18개월',
            writeTime:'1시간전',
            commentCount:3,
            thumbUrl :'../assets/profile/donggle.png',
        },{
            title:'전국의 동기들과 지혜롭게 아이를',
            nickname:'동그리맘',
            babyMonth:'18개월',
            writeTime:'1시간전',
            commentCount:0,
            thumbUrl : null,
        },{
            title:'전국의 동기들과 지혜롭게 아이를 키워요. 지역아 이콘이 필요 출생아 이콘, 지역아 이콘이 필요해 요해요',
            nickname:'동그리맘',
            babyMonth:'18개월',
            writeTime:'1시간전',
            commentCount:12,
            thumbUrl :'../assets/profile/defaultProfile.png',
        },{
            title:'전국의 동기들과 지혜롭게 아이를 키워요',
            nickname:'동그리맘',
            babyMonth:'18개월',
            writeTime:'1시간전',
            commentCount:0,
            thumbUrl :'../assets/profile/donggle.png',
        },
        {
            title:'전국의 동기들과 지혜롭게 아이를 키워요',
            nickname:'동그리맘',
            babyMonth:'18개월',
            writeTime:'1시간전',
            commentCount:7,
            thumbUrl :'../assets/profile/donggle.png',
        },{
            title:'전국의 동기들과 지혜롭게 아이를 키워요. 지역아 이콘이 필요 출생아 이콘, 지역아 이콘이 필요해 요해요 이콘이 필요 출생아 이콘, 지역아 이콘이 필요해 요해요',
            nickname:'동그리맘',
            babyMonth:'18개월',
            writeTime:'1시간전',
            commentCount:0,
            thumbUrl : null,
        },{
            title:'전국의 동기들과 지혜롭게 아이를 키워요. 지역아 이콘이 필요 출생아 이콘, 지역아 이콘이 필요해 요해요 이콘이 필요 출생아 이콘, 지역아 이콘이 필요해 요해요',
            nickname:'동그리맘',
            babyMonth:'18개월',
            writeTime:'1시간전',
            commentCount:85,
            thumbUrl : null,
        },
        {
            title:'전국의 동기들과 지혜롭게 아이를 키워요. 지역아 이콘이 필요 출생아 이콘, 지역아 이콘이 필요해 요해요',
            nickname:'동그리맘',
            babyMonth:'18개월',
            writeTime:'1시간전',
            commentCount:3,
            thumbUrl :'../assets/profile/donggle.png',
        },{
            title:'전국의 동기들과 지혜롭게 아이를',
            nickname:'동그리맘',
            babyMonth:'18개월',
            writeTime:'1시간전',
            commentCount:0,
            thumbUrl : null,
        },
    ];


    const renderContents = ({item, index}:any) => {		
        const isThumbExist = item?.thumbUrl==null?false:true;
        return(
            <CommunityBoardBox data={item} />
        )
    };


    return (
    <BasicView>
        <HeaderSpaceForAndroid />
        <CustomHeaderLeftArrow title='작성한 글'/>

        {
        isContentExist?
        <ContentFlatList
            data = {testData}							
            renderItem={renderContents}							
            keyExtractor={(item, index) => index.toString()+""}							
            showsVerticalScrollIndicator={true}							
            // onEndReached={getMoreContent}							
            // onEndReachedThreshold={0.8}							
        >
        </ContentFlatList>
        :
        <NoContent title='작성한 글이 없습니다'/>
        }


    </BasicView>
)};

export default MyWriteContent;




