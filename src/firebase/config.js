import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

// config 파일 변경시 yarn start 다시 해야됨
let app, db;

const firebaseConfig = {
  apiKey: 'AIzaSyCxXMRuW8NvEmKdDSOc3n3aZoy7EvDXCzw',
  authDomain: 'simple-react-native-app-fda01.firebaseapp.com',
  databaseURL:
    'https://simple-react-native-app-fda01-default-rtdb.firebaseio.com/', // 데이터베이스 URL 이 잘못 설정되면 데이터 쓰기 읽기 안됨
  projectId: 'simple-react-native-app-fda01',
  storageBucket: 'simple-react-native-app-fda01.appspot.com',
  messagingSenderId: '757800810839', // 파이어베이스 콘솔 프로젝트 설정 클라우드 메시징 발신자 ID
  appId: '1:757800810839:android:f21e22a98e2650b8e8a612',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({experimentalForceLongPolling: true});
}

export {firebase};
