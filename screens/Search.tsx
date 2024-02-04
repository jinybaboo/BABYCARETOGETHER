import { useNavigation } from "@react-navigation/native";
import react, { useRef, useState } from "react";
import styled from "styled-components/native";
import colors from "../common/commonColors";
import { BasicView, HeaderSpaceForAndroid, LineE2E2E2, LineF2F2F2, MainScrollView, PaddingView, Space10, Space15, Space20, Space5 } from "../common/commonStyledComp";
import { getWindowWidth } from "../common/commonFunc";
import { Ionicons } from '@expo/vector-icons'; 
import { Alert, TouchableOpacity } from "react-native";
import NoContent from "../components/NoContent";


const windowWidth = getWindowWidth();

const PageTitleView = styled.View`
    width:100%; height:40px; justify-content:center; padding-left:20px; 
`
const PageTitleInner = styled.View`
    flex-direction:row; align-items:center;
`
const PageTitleTxt = styled.Text`
    font-family: 'noto500'; font-size:20px; line-height: 23px; color:${colors.logoGreen}; letter-spacing: -1px; padding-top:10px;
`
const SearchInputView = styled.View`
    width:${windowWidth-130}px; height:35px; position:absolute; right:20px; top:1px;
`
const SearchInput = styled.TextInput`
    width:${windowWidth-130}px; height:35px; border:1px solid ${colors.logoGreen};  border-radius: 8px; 
    padding:0 40px 0 15px;
`
const SearchIconPress = styled.Pressable`
    width:35px; height:35px; position:absolute; right:0px; justify-content: center; align-items: center;
`

const FlatListBox = styled.View`
     width:100%; height: 40px; margin-top:5px; 
`
const BoardSelBtnFlatList = styled.FlatList`
    width:100%; height: 40px;
`
const BoardSelBtnPress = styled.TouchableOpacity`
    height:28px; padding:0 10px; background-color:${colors.backgroundLightGray}; border-radius: 30px; margin-top: 5px;;
`
const BoardSelBtnBox = styled.View`
    height:100%; align-items: center; justify-content: center; position: relative;
`
const BoardSelTxt = styled.Text`
    font-family: 'noto300'; font-size: 13px; line-height: 19px; color:${colors.textBlack}; letter-spacing: -0.2px;
`
const SliderGap = styled.View`
    width:10px;
`


const MainFlatList = styled.FlatList`

`

const LatestSearchTitBox = styled.View`
    width:100%; height:20px; padding:0 20px; flex-direction: row; justify-content: space-between;
`
const LatestSearchTit1 = styled.Text`
    font-family: 'noto500'; font-size: 14px; line-height: 20px; color:${colors.textBlack}; letter-spacing: -0.2px;
`
const LatestSearchTit2 = styled.Text`
    font-family: 'noto400'; font-size: 13px; line-height: 20px; color:${colors.textGray}; letter-spacing: -0.2px;
`

const SearchListBox = styled.View`
    width:100%; height:45px; border-bottom-width:1px; border-bottom-color:${colors.underlineGray}; padding: 0 20px;
    align-items: center; flex-direction: row;
`
const SearchListPress = styled.TouchableOpacity`
    align-items: center; flex-direction: row; width:${windowWidth -100}px;
`
const SearchListTxt= styled.Text`
    font-family: 'noto400'; font-size: 14px; line-height: 45px; color:${colors.textBlack}; letter-spacing: -0.2px; padding-left:8px;
`
const SearchListDelPress = styled.TouchableOpacity`
    width:40px; height:40px; justify-content: center; align-items: flex-end; position: absolute; right:20px; padding-top: 2px;
`




const Search = () => {

    const data = ['이앓이','어린이집 추천','수면교육','폴더매트','이앓이','이유식','이앓이','이앓이','이앓이','어린이집 추천','수면교육','폴더매트','이앓이','이유식','이앓이','이앓이','이앓이','어린이집 추천','수면교육','폴더매트','이앓이','이유식','이앓이','이앓이',]

    const [searchListLength, setSearchListLength] = useState(1);

    const [searchWord, setSearchWord] = useState('');

    const navigation:any = useNavigation();
    const searchInputRef:any = useRef(null);


    function sendSearch(){
        console.log(searchWord)
        if(searchWord.length<2){
            Alert.alert( '잠깐!', '검색어는 2자 이상 입력해 주세요.',  [{text: '확인', onPress: () => {} }]);
            searchInputRef.current.focus();
            return;
        }


        setSearchWord('');
        goSearchResult();
    }

    function goSearchResult(){
        navigation.navigate('Stack', {screen: 'SearchResult', params:{'searchWord':searchWord}});
    }


    function searchByList(word:string){
        goSearchResultByList(word)
    }
    function goSearchResultByList(word:string){
        navigation.navigate('Stack', {screen: 'SearchResult', params:{'searchWord':word}});
    }


    const renderSearchWord = ({item, index}:any) => {											
        return(										
            <BoardSelBtnPress onPress={()=>{}}>
                <BoardSelBtnBox>
                    <BoardSelTxt>{item}</BoardSelTxt>
                </BoardSelBtnBox>
            </BoardSelBtnPress>							
    )};		

    const renderLatestSearch = ({item, index}:any) => {											
        return(		
            <SearchListBox>
                <SearchListPress onPress={()=>{searchByList(item)}}>
                    <Ionicons name="time-outline" size={14} color={colors.textLightGray} style={{marginTop:1}}/>
                    <SearchListTxt>{item}</SearchListTxt>
                </SearchListPress>
                <SearchListDelPress>
                    <Ionicons name="close-outline" size={20} color={colors.textLightGray} />
                </SearchListDelPress>
            </SearchListBox>								
    )};	

    return (
    <BasicView>
        <HeaderSpaceForAndroid />
        <PageTitleView>
            <PageTitleInner>
                <PageTitleTxt>검색</PageTitleTxt>
                <SearchInputView>
                    <SearchInput 
                        ref={searchInputRef}
                        placeholder="검색어를 입력해 주세요"
                        placeholderTextColor={colors.textGray}
                        onSubmitEditing={sendSearch}
                        onChangeText={setSearchWord}
                        value={searchWord}
                    />
                    <SearchIconPress onPress={sendSearch}>
                        <Ionicons name="search-outline" size={20} color={colors.logoGreen}/>
                    </SearchIconPress>
                </SearchInputView>
            </PageTitleInner>
        </PageTitleView>
        <FlatListBox>
            <BoardSelBtnFlatList
                data = {data}									
                renderItem={renderSearchWord}									
                keyExtractor={(item, index) => index.toString()+""}		
                horizontal = {true}							
                showsHorizontalScrollIndicator = {false}
                contentContainerStyle={{paddingLeft:20, paddingRight:20}}
                ItemSeparatorComponent={()=><SliderGap/>}
                
            >
            </BoardSelBtnFlatList>
        </FlatListBox>
        <LineF2F2F2 style={{backgroundColor:colors.logoGreenOpacity}}/>
        
        <Space15 />
        <LatestSearchTitBox>
            <LatestSearchTit1>최근 검색어</LatestSearchTit1>
            <TouchableOpacity>
                <LatestSearchTit2>전체 삭제</LatestSearchTit2>
            </TouchableOpacity>
        </LatestSearchTitBox>
        <Space5 />
        {searchListLength !=0 ?
            <MainFlatList 
            data = {data}			
            renderItem={renderLatestSearch}			
            keyExtractor={(item, index) => index.toString()+""}			
            showsVerticalScrollIndicator={false}			
        />
        :
        <NoContent title='최근 검색어가 없습니다' />
        }



        
    </BasicView>
)};

export default Search;
