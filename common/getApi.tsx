import axios from 'axios'
import { serverUrl } from './commonInfo';
import { NativeModules } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';



// 외부 라이브러리
export const getAddrWithCoords = async (latitude:any, longitude:any ) => {
  const url = `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`;
  const headers = {"Authorization": "KakaoAK 160ce1d1cedc52a5332127d57a309e7f"};
  const { data } = await axios.get(url, {headers:headers});
  return data;
};


export const getIsAccessTokenValid = async (accessToken:string) => {
  const url = `${serverUrl}/get/isAccessTokenValid`;

  try {
    const {data} = await axios.get(url, {headers:{'Authorization': `Bearer ${accessToken}`, }});
    return data;
  } catch (error) {
    console.error('토큰 유효하지 않음', error);
    return false;
  }
};

export const getIsUserExistForLogin = async (userId:string) => {
  const url = `${serverUrl}/get/isUserExist?userId=${userId}`;
  try {
    const {data} = await axios.get(url);
    return data;
  } catch (error) {
    console.error('getIsUserExistForLogin', error);
  }
};


export const getLoginTokens = async (userId:string) => {
  const url = `${serverUrl}/get/loginTokens?userId=${userId}`;
  try {
    const {data} = await axios.get(url);
    return data;
  } catch (error) {
    console.error('getLoginTokens', error);
  }
};

export const getUserInfo = async () => {
  const accessToken:any = await EncryptedStorage.getItem('accessToken');
  const url = `${serverUrl}/get/userInfo`;
  try {
    const res = await axios.get(url, {headers:{'Authorization': `Bearer ${accessToken}`, }});
    return res.data;
  } catch (error) {
    console.error('getUserInfo', error);
  }
};


export const getBabyInfo = async () => {
  const accessToken:any = await EncryptedStorage.getItem('accessToken');
  const url = `${serverUrl}/get/babyInfo`;
  try {
    const res = await axios.get(url, {headers:{'Authorization': `Bearer ${accessToken}`, }});
    return res.data;
  } catch (error) {
    console.error('babyInfo', error);
  }
};