import { useNavigation } from "@react-navigation/native";
import react, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import colors from "../common/commonColors";
import { BasicView, HeaderSpaceForAndroid, PaddingView, Space10, Space15, Space20, Space35, Space5 } from "../common/commonStyledComp";
import { Platform} from "react-native";
import { getWindowWidth } from "../common/commonFunc";
import CustomHeaderLeftArrow from "../components/CustomHeaderLeftArrow";
import CommunityBoardBox from "../components/CommunityBoardBox";
import NoContent from "../components/NoContent";

const os = Platform.OS;
const windowWidth = getWindowWidth();


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

const ContentFlatList = styled.FlatList`

`
const SearchResult = (props:any) => {
    
    const navigation:any = useNavigation();
    const searchWord:any = props.route.params.searchWord;
    const searchTitle = searchWord.length<=12?searchWord+' 검색결과':searchWord.substring(0,12) + '... 검색결과'

    const [isContentExist, setIsContentExist] = useState(true);


    const renderContents = ({item, index}:any) => {		
        const isThumbExist = item?.thumbUrl==null?false:true;
        return(
            <CommunityBoardBox data={item} from='search'/>
        )
    };

    return (
    <BasicView>
        <HeaderSpaceForAndroid />
        <CustomHeaderLeftArrow title={searchTitle}/>


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
        <NoContent title='검색 결과가 없습니다'/>
        }



    </BasicView>
)};

export default SearchResult;




