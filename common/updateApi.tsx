import axios from 'axios'
import { serverUrl } from './commonInfo';
import EncryptedStorage from 'react-native-encrypted-storage';


export async function updateUserAddr(insertData:any){
    const accessToken:any = await EncryptedStorage.getItem('accessToken');
    const url = `${serverUrl}/update/userAddr`;
    try {
        const {status} = await axios.post(url, insertData, {headers:{'Authorization': `Bearer ${accessToken}`, }});
        return true;
    } catch (error) {
        console.error('updateUserAddr ',error);
        return false;
    }
}

export async function updateBabySelect(insertData:any){
    const accessToken:any = await EncryptedStorage.getItem('accessToken');
    const url = `${serverUrl}/update/babySelect`;
    try {
        const {status} = await axios.post(url, insertData, {headers:{'Authorization': `Bearer ${accessToken}`, }});
        return true;
    } catch (error) {
        console.error('updateBabySelect ',error);
        return false;
    }
}