
import { NativeModules, Platform } from "react-native";

const os = Platform.OS;
const scriptURL = NativeModules.SourceCode.scriptURL;
const address = scriptURL.split('://')[1].split('/')[0];
const hostname = address.split(':')[0];
console.log(hostname);
const iosHostName = os=='ios' ? hostname : '172.30.1.23';

export const serverUrl = `http://${iosHostName}:8080`;


export const serverImgUrl = serverUrl;

