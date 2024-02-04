import axios from 'axios'
import { serverUrl } from './commonInfo';
import EncryptedStorage from 'react-native-encrypted-storage';


export async function delBabyInfo(delData:any){
    const accessToken:any = await EncryptedStorage.getItem('accessToken');
    const url = `${serverUrl}/del/babyInfo`;
    try {
        const {status} = await axios.post(url, delData, {headers:{'Authorization': `Bearer ${accessToken}`, }});
        return true;
    } catch (error) {
        console.error('delBabyInfo ',error);
        return false;
    }
}