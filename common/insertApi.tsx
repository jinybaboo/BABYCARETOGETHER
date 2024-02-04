import axios from 'axios'
import { serverUrl } from './commonInfo';
import EncryptedStorage from 'react-native-encrypted-storage';



//accessToken 없이 사용
export async function insertUserInfo(userData:any){
    const url = `${serverUrl}/insert/userInfo`;
    try {
        const {status} = await axios.post(url, userData);
        return true;
    } catch (error) {
        console.error('insertUserInfo ',error);
        return false;
    }
}


//accessToken 필수 
export async function insertBabyInfo(babyInfo:any){
    const accessToken:any = await EncryptedStorage.getItem('accessToken');
    const url = `${serverUrl}/insert/babyInfo`;
    try {
        const {status} = await axios.post(url, babyInfo, {headers:{'Authorization': `Bearer ${accessToken}`, }});
        return true;
    } catch (error) {
        console.error('insertBabyInfo ',error);
        return false;
    }
}

export async function insertBabyInfoWithImg(formData:any){
    const accessToken:any = await EncryptedStorage.getItem('accessToken');
    const url = `${serverUrl}/insert/babyInfoWithImg`;
    try {
        const {status} = await axios.post(url, formData, {
            headers:{
                'Authorization': `Bearer ${accessToken}`, 
                'Content-Type': 'multipart/form-data',
            }
        });
        return true;
    } catch (error) {
        console.error('insertBabyInfoWithImg ',error);
        return false;
    }
}
