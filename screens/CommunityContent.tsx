import { useNavigation } from "@react-navigation/native";
import react, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import colors from "../common/commonColors";
import { BasicView, HeaderSpaceForAndroid, LineE2E2E2, LineF2F2F2, MainFlatList, PaddingView, Space10, Space15, Space20, Space35, Space5 } from "../common/commonStyledComp";
import { Ionicons,  MaterialCommunityIcons } from '@expo/vector-icons'; 
import { getIphoneBottomInfo, getWindowWidth } from "../common/commonFunc";
import { Clipboard, Platform, Pressable, View } from "react-native";
import AutoHeightImage from "react-native-auto-height-image";
import { Keyboard } from 'react-native';
import BottomPicker from "../components/BottomPicker";
import CustomHeaderLeftArrow from "../components/CustomHeaderLeftArrow";

const os = Platform.OS;

const windowWidth = getWindowWidth();
const imageWidth = windowWidth - 40;

const ContentTopInfoBox = styled.View`
    flex-direction: row; justify-content: space-between;
`

const CategoryTxtBox = styled.View`
    padding:4px 6px; border-radius: 8px; background-color: ${colors.backgroundLightGray}; 
`
const CategoryTxt = styled.Text`
    font-family: 'noto400'; font-size:10px; line-height: 13px; color:${colors.textLightGray}; 
`

const WriteTimeTxt = styled.Text`
    font-family: 'noto400'; font-size:11px; line-height: 14px; color:${colors.textLightGray};  margin-top:4px;
`
const WriteTimeInnerBox = styled.View` 
    flex-direction: row; 
`

const ContentTitleBox = styled.View``

const ContentTitle = styled.Text`
    font-family: 'noto400'; font-size:20px; line-height: 27px; color:${colors.textBlack}; padding-top:8px;
`
const ProfileBox = styled.View`
    margin-top: 15px; flex-direction: row; align-items: center; justify-content: space-between;
`
const ProfileInnerBoxPress = styled.Pressable`
    flex-direction: row; 
`
const ProfileImg = styled.Image`
    width:35px; height:35px; border-radius: 35px;
`
const ProfileTxtBox = styled.View`
    justify-content: center; padding-left: 6px;
`

const ProfileTxt1 = styled.Text`
    font-family: 'noto400'; font-size:12px; line-height: 15px; color:${colors.textBlack}; padding-top: 2px;
`
const ProfileTxt2 = styled.Text`
    font-family: 'noto400'; font-size:10px; line-height: 13px; color:${colors.textGray}; letter-spacing: -0.5px;
`

const Profile3DotPress = styled.Pressable`
    height:100%; width:30px; align-items: center; padding-top:6px;
`

const ContentTxt = styled.Text`
    font-family: 'noto400'; font-size:15px; line-height: 22px; color:${colors.textBlack}; padding-top:12px; letter-spacing: -0.2px;
`

const ContentImgBox = styled.View`
  width:100%; padding: 15px 0; 
`


const ReplyInputView = styled.View`
    width:100%; height:60px; justify-content: center;
`

const ReplyTextInputBox =styled.View`
    width:100%; height:40px; background-color:${colors.textInputBackground}; border-radius: 8px; flex-direction: row; justify-content:space-between;
`
const ReplyTextInput = styled.TextInput`
    width:${windowWidth-100}px; height:40px; padding-left: 15px; padding-top: ${os=='ios'?12:0}px;
`
const ReplySendPress = styled.Pressable`
    width:40px; height:40px;justify-content:center; align-items: center;
`

const FavoInfoView = styled.View`
    flex-direction: row;
`
const CommentBox = styled.View`
    width:30px; height:30px; justify-content: center; margin-right: 8px;
`
const CommentTxt = styled.Text`
    font-family: 'noto500'; font-size: 12px; line-height: 15px; color:${colors.textBlack}; letter-spacing: 0.4px; margin-top:7px;
`
const FavoPushedProfileView = styled.View`
    flex-direction: row; margin-top: 3px;
`
const FavoPushedProfileBox = styled.View`
    margin-right: 8px; margin-top: 6px; position: relative;
`
const FavoPushedProfileImg = styled.Image`
    width:35px; height:35px; border-radius: 35px;
`
const FavoIconBox =styled.View`
    position: absolute; right:-3px; bottom:-3px;
`



const ReplyInfoView = styled.View`
    
`
const  ReplyInfoBox = styled.View`
    flex-direction:row;
`
const ReplyInfTxt = styled.Text`
    font-family: 'noto400'; font-size: 14px; line-height: 15px; color:${colors.textBlack}; letter-spacing: -0.5px; margin-top:5px; margin-left: 2px;
`


const ReplyFlatList = styled.FlatList``


const ReplyContentBox = styled.View`
    padding:10px 0; flex-direction: row;
`

const ReplyProfileImg = styled.Image`
    width:35px; height:35px; border-radius: 35px;
`

const ReplyProfileTxtBox = styled.View`
    width:${windowWidth-40-35-30}px; padding-left: 10px;
`

const ReplyProfileInnerBox1 = styled.View`
    flex-direction: row;
`

const ReplyProfileTxt1 = styled.Text`
    font-family: 'noto500'; font-size: 13px; line-height: 16px; color:${colors.textBlack}; letter-spacing: -0.5px;
`
const ReplyProfileTxt2 = styled.Text`
    font-family: 'noto400'; font-size: 11px; line-height: 14px; color:${colors.textGray}; letter-spacing: -0.5px; margin-left: 5px;
`
const ReplyProfileTxt3 = styled.Text`
    font-family: 'noto400'; font-size: 12px; line-height: 18px; color:${colors.textBlack}; letter-spacing: -0.5px;
`

const ReplyProfileTxt3Target = styled(ReplyProfileTxt3)`
    font-family: 'noto500'; color:${colors.logoOrange};
`

const ReplyProfileTxt3Deleted = styled(ReplyProfileTxt3)`
   color:${colors.textLightGray}; text-decoration: line-through;
`

const ReplyProfileTxt4 = styled.Text`
     font-family: 'noto500'; font-size: 11px; line-height: 14px; color:${colors.textGray}; letter-spacing: -0.5px; margin-top: 5px;
`

const Reply3DotPress = styled.Pressable`
    width:30px; height:100%; align-items: flex-end;
    
`


const CommunityContent = () => {

    //일반 부분
    const [inputMarginBtm, setInputMarginBtm] = useState(0);
    const [isFavoPushed, setIsFavoPushed] = useState(false);
    const [isBookmarkPushed, setIsBookmarkPushed] = useState(false);

    const [placeholder, setPlaceholder] = useState('댓글을 입력해 주세요');

    //Flatlist Data
    const [mainFlatListData, setMainFlatListData] = useState([{id:'1',title:'전국의 동기들과 함께 아기를 키워요!',isMine:true}])
    const [tempData, setTempData] = useState([{isMine:true, id:1},{isMine:false, id:2},{isMine:true, id:3},{isMine:true, id:1},{isMine:true, id:1},{isMine:true, id:1},{isMine:true, id:1},{isMine:true, id:1}]);
    
    //댓글 작성 부분
    const [replyTxt, setReplyTxt] = useState('');
    const [replyLevel, setReplyLevel] = useState(0);
    
    //키보드 사용시 스크롤 조절용
    const [currentScrollY, setCurrentScrollY] = useState(0);
    const [isKeyboardShow, setIsKeyboardShow] = useState(false);
    
    //BottomPicker용
    const [isBottomPickerShow, setIsBottomPickerShow] = useState(false);
    const [bottomPickerData, setBottomPickerData] = useState(['']);
    const [bottomPickerType, setBottomPickerType]= useState('');
    const [bottomPickerId, setBottomPickerId]= useState('');


    const navigation:any = useNavigation();
    const mainFlatListRef:any = useRef();
    const replyInput:any = useRef();


    function goUserHome(id:any){
        navigation.navigate("Stack", { screen:"UserHome", params:{}})
    }

    function goWriteDM(){
        navigation.navigate("Stack", { screen:"WriteDM", params:{}})
    }
    

    
    
    // 키보드 활성화시 인풋태그 이동 및 스크롤 위로 올림 처리!!! 
    const hasIosBottom = getIphoneBottomInfo();

    Keyboard.addListener('keyboardDidShow', (event) => {
        setIsKeyboardShow(true);
        const keyboardHeight = event.endCoordinates.height;
        if(os=='ios'){
            const fixedHeight = hasIosBottom?keyboardHeight-30:keyboardHeight;
            //console.log(fixedHeight)
            setInputMarginBtm(fixedHeight);
        }
        //console.log('Keyboard height is:', event.endCoordinates.height);
        //scrollToPosition();
    });

    Keyboard.addListener('keyboardDidHide', (event) => {
        setIsKeyboardShow(false);
        setInputMarginBtm(0)
        
        //대댓글 타켓팅 ReplyToReply도 정상화
        cancelReplyToReply();
    });
       

    function scrollToPosition(){
        setTimeout(()=>{
            mainFlatListRef.current.scrollToOffset({ offset: currentScrollY+340, animated: true })    
        },100)
    }
    const handleScroll = (event:any) => {
        if(isKeyboardShow) return;
        const y = event.nativeEvent.contentOffset.y;
        setCurrentScrollY(y)
    };






   function toggleFavo(){
    setIsFavoPushed(!isFavoPushed);
   }
   function toggleBookmark(){
    setIsBookmarkPushed(!isBookmarkPushed);
   }
   
    
   function replyToReply(nickName:string){
        setReplyLevel(1);
        setPlaceholder('@'+nickName);
        replyInput?.current?.focus();
   }

   function cancelReplyToReply(){
        setReplyLevel(0);
        setPlaceholder('댓글을 입력해 주세요');
   }


    
    function replySubmit(){
        console.log('replyLevel',replyLevel)
        console.log(replyTxt)
        setReplyTxt('')
        
        cancelReplyToReply();   //ReplyToReply도 정상화
        Keyboard.dismiss();     //키보드 숨기기
    }
    
   

    
    function handleBottomPickerData(data:any){
        const {type} = data;
        //console.log('data', data)
        if(type=='hideBottomPicker'){setIsBottomPickerShow(false)}
        else if(type=='신고하기'){
            const {badReason} = data;
            console.log(bottomPickerType, bottomPickerId, badReason);
        } else if(type=='삭제하기'){
            console.log(bottomPickerType, bottomPickerId);
        }

    }

    function openBottomPicker(isMine:boolean, id:any, contentType:string){
        setBottomPickerType(contentType);
        setBottomPickerId(id);

        if(isMine){
            setBottomPickerData(['신고하기','삭제하기'])
        }else{
            setBottomPickerData(['신고하기']);
        }

        setIsBottomPickerShow(true);
    }


   const renderReply = ({item, idx}:any) => {		
    const {isMine, id} = item;		

    return(			
        <>
        <ReplyContentBox>
            <ReplyProfileImg source={require('../assets/profile/hl.jpeg')}/>
            <ReplyProfileTxtBox>
                <ReplyProfileInnerBox1>
                    <ReplyProfileTxt1>동그리맘</ReplyProfileTxt1>
                    <ReplyProfileTxt2>1시간전</ReplyProfileTxt2>
                </ReplyProfileInnerBox1>
                    <ReplyProfileTxt3
                        selectable={true}
                    >
                        <ReplyProfileTxt3Target>@유건이맘  </ReplyProfileTxt3Target>
                        이건 정말 혁신적인 앱이네요... 좋아요 좋아이건 정말 혁신적인 앱이네요... 좋아요 좋아
                    </ReplyProfileTxt3>
                   {/* <ReplyProfileTxt3Deleted>사용자가 삭제한 글입니다.</ReplyProfileTxt3Deleted> */}
                <Pressable onPress={()=>{replyToReply('유건이맘')}}>
                    <ReplyProfileTxt4>답글 달기</ReplyProfileTxt4>
                </Pressable>
            </ReplyProfileTxtBox>
            
            <Reply3DotPress onPress={()=>{openBottomPicker(isMine,id,'reply')}}>
                <MaterialCommunityIcons name="dots-vertical" size={20} color={colors.textLightGray} />
            </Reply3DotPress>
        </ReplyContentBox>
        <LineF2F2F2 />
        </>
    )};				



    const renderMainFlatList = ({item, index}:any) => {		
        const {isMine, id} = item;
        return(			
            <>
            <PaddingView>
                <ContentTopInfoBox>
                    <CategoryTxtBox>
                        <CategoryTxt># 연제구 동기</CategoryTxt>  
                    </CategoryTxtBox>
                    <WriteTimeInnerBox>
                        <Ionicons style={{marginTop:3.5, marginRight:2}} name="time-outline" size={13} color={colors.textLightGray} />
                        <WriteTimeTxt>4시간전</WriteTimeTxt>
                    </WriteTimeInnerBox>
                  
                </ContentTopInfoBox>
                
                <ContentTitleBox>
                    <ContentTitle>모든 StackNavigator에서 공통으로 사용할 수 있는 방법도 있습니다.</ContentTitle>
                </ContentTitleBox>

                <ProfileBox>
                    <ProfileInnerBoxPress onPress={()=>{goUserHome(1)}}>
                        <ProfileImg source={require('../assets/profile/donggle.png')}/>
                        <ProfileTxtBox>
                            <ProfileTxt1>동그리맘</ProfileTxt1>
                            <ProfileTxt2>부산 연제구 · 24개월</ProfileTxt2>
                        </ProfileTxtBox>
                    </ProfileInnerBoxPress>

                    <Profile3DotPress onPress={()=>{openBottomPicker(isMine,id,'report')}}>
                        <MaterialCommunityIcons name="dots-horizontal" size={22} color={colors.textBlack} />
                    </Profile3DotPress>
                </ProfileBox>
            </PaddingView>
            <Space15 />
            <LineF2F2F2 />

            <PaddingView>
                <ContentTxt>
                '우승 후보' 미국이 주장 마이크 트라웃(32·LA 에인절스)의 활약 덕에 2023 월드베이스볼클래식(WBC) {'\n\n'}8강행 막차 티켓을 확보했다. 반면 '초호화 군단' 도미니카공화국은 이번 대회 가장 큰 이변의 희생양이 됐다.
                </ContentTxt>
                <ContentImgBox>
                    <AutoHeightImage source={require('../assets/profile/hl.jpeg')} width={imageWidth} style={{borderRadius:8}}/> 
                </ContentImgBox>
            </PaddingView>


            {/* 좋아요 부분 */}
            <PaddingView>
                <FavoInfoView>
                    <Pressable onPress={toggleFavo}>
                        <CommentBox>
                            <Ionicons name={isFavoPushed?"heart-sharp":"heart-outline"} size={24} color={isFavoPushed?colors.logoOrange:colors.textBlack} />
                        </CommentBox>
                    </Pressable>

                    <Pressable onPress={toggleBookmark}>
                        <CommentBox>
                            <Ionicons name={isBookmarkPushed?"ios-bookmark":"ios-bookmark-outline"} size={24} color={isBookmarkPushed?colors.logoOrange:colors.textBlack} />
                        </CommentBox>
                    </Pressable>

                    <Pressable onPress={goWriteDM}>
                        <CommentBox>
                            <Ionicons name="paper-plane-outline" size={22} color={colors.textBlack} />
                        </CommentBox>
                    </Pressable>

                </FavoInfoView>
                <CommentTxt>좋아요 34개</CommentTxt>
                
                <FavoPushedProfileView>
                    <FavoPushedProfileBox>
                        <FavoPushedProfileImg source={require('../assets/profile/hl.jpeg')}/>
                        <FavoIconBox>
                            <Ionicons name="heart" size={16} color={colors.logoOrange} />
                        </FavoIconBox>
                    </FavoPushedProfileBox>

                    <FavoPushedProfileBox>
                        <FavoPushedProfileImg source={require('../assets/profile/hl.jpeg')}/>
                        <FavoIconBox>
                            <Ionicons name="heart" size={16} color={colors.logoOrange} />
                        </FavoIconBox>
                    </FavoPushedProfileBox>

                    <FavoPushedProfileBox>
                        <FavoPushedProfileImg source={require('../assets/profile/defaultProfile.png')}/>
                        <FavoIconBox>
                            <Ionicons name="heart" size={16} color={colors.logoOrange} />
                        </FavoIconBox>
                    </FavoPushedProfileBox>

                </FavoPushedProfileView>

                <Space15 />
                <LineE2E2E2 />
            </PaddingView>


            {/* 댓글 보여주기 부분 */}
            <PaddingView>
                {/* <Space15 />

                <ReplyInfoView>
                     <ReplyInfoBox>
                        <Ionicons style={{marginTop:0}}  name="chatbubble-outline" size={18} color={colors.textBlack} />
                        <ReplyInfTxt>12개</ReplyInfTxt>
                    </ReplyInfoBox>
                </ReplyInfoView> */}

                <Space10 />
                <CommentTxt>댓글 7개</CommentTxt>

                <Space5 />

                <ReplyFlatList
                    data = {tempData}
                    renderItem={renderReply}
                    keyExtractor={(item, index) => index.toString()+""}
                    showsVerticalScrollIndicator={false}
                >
                </ReplyFlatList>
            </PaddingView>
            </>
        )};				
    

    return (
    <BasicView>
        <HeaderSpaceForAndroid />
        <CustomHeaderLeftArrow />
        
        <MainFlatList
            data={mainFlatListData}
            keyExtractor={(item, index) => index.toString()+""}
            onScroll={handleScroll}
            renderItem={renderMainFlatList}
            ref={mainFlatListRef}
            showsVerticalScrollIndicator={false}
            // onEndReached={getData}
            // onEndReachedThreshold={0.8}
         />   

        <LineF2F2F2 />



        {/* 댓글쓰기 아래 고정 부분 */}
        <ReplyInputView style={{marginBottom:inputMarginBtm}}>
            <PaddingView>
                <ReplyTextInputBox>
                    <ReplyTextInput 
                        onChangeText={setReplyTxt} 
                        placeholder= {placeholder}
                        value={replyTxt}
                        multiline = {true}
                        ref={replyInput}
                    />
                    <ReplySendPress onPress={replySubmit}>
                        <Ionicons name="arrow-up-circle-sharp" size={30} color={colors.logoOrange} />
                    </ReplySendPress>
                </ReplyTextInputBox>
            </PaddingView>
        </ReplyInputView>

        {/* 셀렉트 Picker */}
        {
        isBottomPickerShow &&
        <BottomPicker 
            data={bottomPickerData}
            onData={handleBottomPickerData}
        />
}
    </BasicView>
)};

export default CommunityContent;




