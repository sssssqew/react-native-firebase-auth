import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import {firebase} from '../../firebase/config';

class HomeScreen extends React.Component {
  signOutUser = async () => {
    console.log('logout button pushed !');
    console.log(this.props);
    try {
      await firebase.auth().signOut();
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate('Home');
      } else {
        console.log('Move to Login');
        console.log(user);
        this.props.navigation.navigate('Login');
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>{this.props.extraData.email}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={this.signOutUser}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default HomeScreen;
