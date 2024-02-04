import { Alert, Dimensions } from "react-native";
import { getModel } from "react-native-device-info";
import * as getApi from "../common/getApi";
import EncryptedStorage from 'react-native-encrypted-storage';
import userSlice from "../slices/user";

// 로그인-아웃 관련
export async function userLogin(userId:string, dispatch:any){
    const {accessToken} = await getApi.getLoginTokens(userId);

    //엑세스 토큰 및 유저 정보 저장(각각 encrypted 및 redux에
    await EncryptedStorage.setItem('accessToken', accessToken);
    dispatch(userSlice.actions.setIsLogin(true))
}


export async function userLogout(dispatch:any){
    await EncryptedStorage.removeItem('accessToken');
    dispatch(userSlice.actions.setIsLogin(false));
}





export function thousandComma(num:any){
    return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function decimalRound(num:number, round:number){ 
    if(round==0){return Math.round(num);}
    else if(round==1){return Math.round(num * 10) / 10;}
    else if(round==2){return Math.round(num * 100) / 100;}
    else if(round==3){return Math.round(num * 1000) / 1000;}
    else if(round==4){return Math.round(num * 10000) / 10000;}
    else if(round==5){return Math.round(num * 100000) / 100000;}
    else{return -1}
}


export function  getAdjustedHeight(currentWidth:number, currentHeight:number, windowWidth:number){
    return currentHeight*windowWidth/currentWidth;
}

export function changeDateTypeDot(date:string){
    return date?.replace("-",'.')?.replace("-",'.')?.substring(0,10);
}

export function changeDateTypKorean(date:string){
    return date?.replace("-",'년 ')?.replace("-",'월 ')?.substring(0,12)+'일';
}
export function changeDateTypeMMDashDD(date:string){
    return date?.replace("-",'/')?.replace("-",'/').replace(".",'/')?.replace(".",'/').substring(5,10);
}

export function changeDateTypeWithSeconds(date:string){
    const year = date?.substring(2,4)+'.';
    const monthDate = date.replace("-",'.')?.replace("-",'.')?.substring(5,10);
    const hourSec =date.substring(11,19);
    return year+monthDate+' '+hourSec;
}

export function addNineHourToUtcTime(date:string){
    let returnDate = new Date(date);
    returnDate.setHours(returnDate.getHours()+9);
    return returnDate.toISOString();
}


export function getToday(){
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    return year + '-' + month + '-' + day;
}

export function getFromDateTypeToString(date:Date){
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return year + '-' + month + '-' + day;
}

export function getHowManyDaysBefore(date:string){
    const targetDate = new Date(date); 
    const today = new Date(); 
    const timeGap =  today.getTime() - targetDate.getTime();
    const minuteGap = decimalRound(timeGap / (1000*60),0) ;  
    const hourGap = decimalRound(timeGap / (1000*60*60),0) ;  
    const dateGap = decimalRound(timeGap / (1000*60*60*24),0) ;
    let returnVal = '';
    if(minuteGap==0){returnVal='지금'}
    else if(minuteGap<60){returnVal=`${minuteGap}분전`}
    else if(hourGap<24){returnVal=`${hourGap}시간전`}
    else if(dateGap<31){returnVal=`${dateGap}일전`}
    else if(dateGap<=365){
        returnVal= decimalRound(dateGap/30,0)+'개월전'
    }else{
        returnVal= decimalRound(dateGap/30/12,0)+'년전'
    }
    return returnVal;
}

export function getMonthOrYearFromBirthday(birthDate:string) {
  const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day
  const today = new Date();
  const birth = new Date(birthDate);
  const ageInMonths = (today.getFullYear() - birth.getFullYear()) * 12 + (today.getMonth() - birth.getMonth());
  // Check if birth date in current month has passed
  const birthDay = birth.getDate();
  const todayDay = today.getDate();
  let months = ageInMonths;
  if (todayDay < birthDay) {  months--; }

  if(months<=48){
    return months+'개월'
  }else{
    const year2:number = decimalRound(months/12,0);
    const momth2:number = months%12;
    return `${year2}년 ${momth2}개월`
  }
}

export function getBabyYearMonth(birthday:string){
    console.log(birthday)
    return birthday.substring(0,4)+'.'+birthday.substring(5,7)+''
}



export function getWindowWidth(){
    return Dimensions.get('window').width;
}

export function getWindowHeight(){
    return Dimensions.get('window').height;
}
export function  getDevidedPrice(price:number){
    let returnVal;
    if(price>=1000000000000 || price<=-1000000000000){
        returnVal = decimalRound(price/1000000000000, 1)+"조";
    }else{
        returnVal = decimalRound(price/100000000, 0);
        returnVal = thousandComma(returnVal)+"억";
    }
    return returnVal;
}

export function getAverage(arr:any) {
    let result = 0;
    for (let i = 0; i <arr.length; i++) {
        result += arr[i]*1;
    }
    return result / arr.length
}

export function getMax(arr:any){
	return Math.max.apply(null, arr);
}

export function getMin(arr:any){
	return Math.min.apply(null, arr)
}


export function getMedian(arr:any){
	let tempArr = arr;
	
	tempArr.sort();
	let center:number = parseInt((arr.length / 2)+''); // 요소 개수의 절반값 구하기
	
	if (arr.length % 2 == 1) { // 요소 개수가 홀수면
	    return arr[center]*1; // 홀수 개수인 배열에서는 중간 요소를 그대로 반환
	}else{
	    return (arr[center-1]*1 + arr[center]*1) / 2.0; // 짝수 개 요소는, 중간 두 수의 평균 반환
	}
}

export function getSum(arr:any) {
    let result = 0;
    for (let i = 0; i <arr.length; i++) {
        result += arr[i]*1;
    }
    return result;
}


export function getRandomId(){
	var timeId = "timeId"+Date.now()*1;
	var random4Digit = Math.floor(Math.random() * 1001);
	return timeId+random4Digit;
}


export function deleteArray(arr:string[], delValue:string){
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] == delValue)  {
          arr.splice(i, 1);
          i--;
        }
      }
    return arr;
}



export function getIphoneBottomInfo(){ 
    let result = true;
    let model = getModel().substring(0,8);
    //i폰 4,5,6,7,8 (plus 포함)은 하단 안전공간 필요없으므로 안드로이드와 같은처리
    if(model=='iPhone 4' || model=='iPhone 5' || model=='iPhone 6' || model=='iPhone 7'|| model=='iPhone 8'){result=false;}
    //i폰 제외한 모든 폰은 하단 안전공간 없애기
    if(model.substring(0,6)!='iPhone'){result=false;}
    return result;  //true면 하단공간 필요한 iphone, false면 안드로이드 및 구형아이폰
}


//배열 중복 제거 함수
export function removeDuplicateArray(arr:string[]){
	const set = new Set(arr);
	const uniqueArr = [...set];
	return uniqueArr;
}

// 제이슨배열 중복제거 함수
export function removeDuplicateJsonArrData(arr:any, jsonKey:string){
	var result = arr.filter((item1:any, idx1:any)=>{
	    return arr.findIndex((item2:any)=>{
	        return item1[jsonKey] == item2[jsonKey];
	    }) == idx1;
	});
	
	return result;
}


//일반배열의 특정값을 기준으로 오름 내림차순 정렬하기 
export function sortArrayByBigOrSmall(arr:any, type:any){
	let returnData = [...arr];
	
	if(type=='big'){
		returnData.sort((a, b) => {
		    if (a < b) return 1;
		    if (a > b) return -1;
		    return 0;
		});
	}else{
		returnData.sort((a, b) => {
		    if (a < b) return -1;
		    if (a > b) return 1;
		    return 0;
		});
	}
	return returnData;
}


//제이슨배열의 특정값을 기준으로 오름 내림차순 정렬하기 
export function sortJsonArrayByBigOrSmall(jsonArr:any, jsonKey:any, type:any){
	let returnData = [...jsonArr];
	
	if(type=='big'){
		returnData.sort((a, b) => {
		    let aVal = a[jsonKey];
			let bVal = b[jsonKey];
		    if (aVal < bVal) return 1;
		    if (aVal > bVal) return -1;
		    return 0;
		});
	}else{
		returnData.sort((a, b) => {
		    let aVal = a[jsonKey];
			let bVal = b[jsonKey];
		    if (aVal < bVal) return -1;
		    if (aVal > bVal) return 1;
		    return 0;
		});
	}
	return returnData;
}

export function AlertType1(title:string, content:string, callback:any ){
    return (
        Alert.alert( title, content,  [{text: '확인', onPress: () => { callback(); } }])
    )
}

export function getYiGaByName(lastName:string) {
    const lastNameLastChar = lastName.charAt(lastName.length - 1); // get last character of lastName
    const lastCharUnicode = lastNameLastChar.charCodeAt(0) - 44032; // calculate unicode value of last character
    const isLastNameLastCharConsonant = lastCharUnicode % 28 !== 0; // check if last character is consonant
  
    return isLastNameLastCharConsonant ? '이' : '가';
  }