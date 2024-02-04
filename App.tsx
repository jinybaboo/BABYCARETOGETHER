import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect } from 'react';
import { Alert,Platform,Text} from 'react-native';

import messaging from '@react-native-firebase/messaging';
import axios from 'axios';

import { Provider } from 'react-redux';
import store from './store';
import AppInnerForRedux from './AppInnerForRedux';

import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()


async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    //console.log('Authorization status:', authStatus);
  }

  
}

async function pushTest(){
  const androidToken ='cFzkV3-nRMywALlXdLcZGz:APA91bFKQ0VDxZ02ESbSBtLS3yTb9HIrsbKSr6zT4GZ98zYB9RldEACsOiGOqVfwNC5vRDUd1CXwnR7Lb4GeSwdM4QLMjLZlzSpUkbklGio7IQNyQawEzMlDb5ZUXKrgJ4BHFeydqZy7';
  const iosToken = 'ftMC6VQN_UBUnqA7-Z6sGU:APA91bGmTm2x0XTx0A_n30aHalcQe2AZBReS1AZbwCYjq-eyYdoiUPVahXqjak2_hHJblHMvZuhDRtLhymwYpTgZZZiddCtSCVT1VP7KL1pvMzy4NoTVQXF1idVNPtCvg3STNEwtdLBd';
  let registrationTokens = [androidToken, iosToken];

  const data:any ={
    "message":{
      "token":androidToken,
      "notification":{
        "title":"Portugal vs. Denmark",
        "body":"great match!"
      },
      "data" : {
        "Nick" : "Mario",
        "Room" : "PortugalVSDenmark"
      }
    }
  }
  const apiKey = 'MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCBgyZVre1G9sNX\nBheSv+tAriGknQRuVWj4a4mXdoSedeC4JlQay9G38SqtgTYAHVmMyaI2DR4wu897\nEyxlaogtATujWM9xbHdFJVUMBd5SmNsvq1be2//9WRjctPv/KFlc/J7terkAfh8t\nmUYZ7FxFdVEbDUT2QItY2ARUz+fXobXHJh+AFdenb83UNZHmRldZIGjj9emuCRn8\n4Ghcav+XdkUUlGb+RObOAOs2YCNwVVSVa+qsyshXh5dEccu3dS2dz1f6GL3gRfoP\nJTt8kSbgYPnROQn5mnoGAgZk7RgUsMg+8ShBJAFTjPMwLQ3ZjWyHYaMTbXejdVsa\nM2Mbyos5AgMBAAECggEAH4V621AfZ83v6bqVGrXEzYOEMzM3LJ5zk8Dipl9ldEbW\n6KMFhdcVJjqXi06fRMRf8wTxSswDDNPtMfSO8ekNlzyNVhqrtJy0Y7ssGabE/1/u\nOwot9MRhZ/lbNH6FNctNgrUGfmDH7b+EmZ3MQst1Ar/Eu3uNjQzVDYzX8wd+E0xT\nFc63gvkuZcH1+BUtpnqRvOSnaD8bVatzNCCAHmIkdX8EVmuv/s+lP3ACVuwFZXRk\n4leFUdsl2zq0HHVOjj2xL21wFvr+QbM0D+0CW5cNhKAg58eLO7sLkPEN16+cfLc3\nasvPWQas5WOgMmnfA9Kr4ZIqTSiBapeXaKY+eD53zQKBgQC2tdZjdoWx/qZ/nXsI\nIoLwC/jjhEtqp/EwzDPqC3JWuraMTPdmTttt9rvhXzZv4757Y1zjaM+GFvwkhUIK\n1WkpV1DrUm3SRbtl93g4aYUWKzYb4B/XEQwN1+PolRGjJNU7lLmyl+ckl2c98rwB\n0wh3l7+HO3l2hLyglmBY00YJ5QKBgQC1doOfAksqMsHe+ouIonw/wJNMyPxoMnYf\nd80tl/tShK+s0N+Wx3vdG7NA1bmF4Yi5OKogkL4F3Tzy+6NPFX1EN+D+3cbh8mV5\n4LKMa2mdkQB0tyIAct6f7HMX7hQ6kGR7GDk/LxwEtX6Vi7q/Odir08Ar3RusXI5J\nMbu14CpWxQKBgD4MInJEncKEqCZOZKmujqjWZ/9bvgDKZ64aqsagfIPXhIbA3INx\n5DLDx6oRm3sD7HwakkDoJxFyXM5KMtNbBgt0C5bet0zhQXKvR7RgoUGWCxoMUsPG\nlkFdP5iMhyDQMVm6eBWeYHCcugLfm9lCwW1bqz9Rgz4sdaJTbwS7Ot3BAoGAQRW6\n68NU1lPSOXm/pkgxLGST8Ix+C5ldyLedfebvG4+/uspIB7qQ8KNIzc5admyIL3bl\nfjysC0po2/Xpgyn//gHUz1UYSl44i1hOchLslLk3YqV0qpiIxO938HNSChdUEtqD\nXeg1snKublDpsEC9OBQA7zqk/FNOLW6LFxbJ2MkCgYAW3RV9t63PpSPfEHKkzbEM\nvC2rj43IBVj3K3VVSKrYnbZ/g2jqrdhcnz0LLq2EZst3tdp2YciWfjpsvqPua04D\nMNUWRxIpWclIYhLtl286A1EIxDIaU6FGRpB3+rsJ7QRK123iS18g89oUZ6clVaA5\nqqaUTs4Q86Vc4/kv0wPQJw=='
  ;
  try {
      //const response = await axios.post(`https://fcm.googleapis.com/fcm/send`,data, {headers:{Authorization: apiKey}});
      const response = await axios.post(`https://fcm.googleapis.com/v1/projects/babycarethgether/messages:send`,data, {headers:{Authorization: apiKey}});
      
      console.log(response)
  } catch (error) {
      console.error('pushTest ',error);
  }
}



export default function App() {

  useEffect(()=>{
      requestUserPermission();
      getFcmToken();
      //pushTest();

  },[]);

  const getFcmToken = useCallback(async () => {
    const fcmToken = await messaging().getToken();
    //console.log(Platform.OS, fcmToken);
  }, []);
  
  
    // Register background handler
  //앱이 백그라운드일때 수신시 콘솔 찍어서 잘 받히는지 테스트
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  // 사용자가 푸시알람 노티를 누를때 액션 => 네비게이션으로 페이지 전환 시켜준다
  messaging().onNotificationOpenedApp(async remoteMessage => {
    console.log('Message Opened', remoteMessage);
  });


  //앱이 열려있을때 푸시 받으면 여기서 알람처리 하기
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);



  return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <StatusBar style='dark' />
          <AppInnerForRedux />
        </QueryClientProvider>
      </Provider>
  );
}

