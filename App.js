import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen, HomeScreen, RegistrationScreen} from './src/screens';
import {decode, encode} from 'base-64';
import {firebase} from './src/firebase/config';

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged((user) => {
      setLoading(true);
      if (user) {
        setTimeout(() => {
          usersRef
            .doc(user.uid)
            .get()
            .then((document) => {
              const userData = document.data();
              setLoading(false);
              setUser(userData);
            })
            .catch((error) => {
              setLoading(false);
            });
        }, 1000); // 로딩화면을 보여주기 위해서 1초 정도 딜레이를 주었지만 실제 로딩이 오래 걸리면 굳이 딜레이를 줄 필요없음
      } else {
        setUser(null);
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={require('./assets/loading4.gif')}
          width={200}
          height={100}
        />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Home">
            {(props) => <HomeScreen {...props} extraData={user} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
