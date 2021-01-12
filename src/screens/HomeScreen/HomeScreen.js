import React, {useEffect, useState} from 'react';
import {
  Button,
  Alert,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import styles from './styles';
import {firebase} from '../../firebase/config';

const database = firebase.database();

const TodoItem = ({todoItem: {todoItem: name, done}, id}) => {
  const [doneState, setDone] = useState(done);

  const onCheck = () => {
    setDone(!doneState);
    console.log(doneState);
    database.ref('todos/').update({
      [id]: {
        uid: firebase.auth().currentUser.uid,
        todoItem: name,
        done: !doneState,
      },
    });
  };

  return (
    <View style={styles.todoItem}>
      <CheckBox
        checkboxColor="skyblue"
        isCheckd={doneState}
        onClick={onCheck}
      />
      <Text style={[styles.todoText, {opacity: doneState ? 0.2 : 1}]}>
        {name}
      </Text>
    </View>
  );
};

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      todos: {},
      presentToDo: '',
    };
  }

  addNewTodo = () => {
    console.log(firebase.auth().currentUser.uid);
    database.ref(`todos/`).push({
      uid: firebase.auth().currentUser.uid,
      done: false,
      todoItem: this.state.presentToDo,
    });
    Alert.alert('Action!', 'A new To - do item was created');
    this.setState({presentToDo: ''});
  };
  // 사용자가 전체 목록을 전부 다 지울 일이 없을것 같다
  // clearAllTodos() {
  //   const listOfUser = database
  //     .ref('todos/')
  //     .orderByChild('uid')
  //     .equalTo(firebase.auth().currentUser.uid);
  //   console.log(firebase.auth().currentUser.uid);
  //   listOfUser.remove();
  // }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // 사용자가 데이터를 추가하는지 리스닝하다가 변경사항이 생기면 스냅샷을 던져주고 콜백이 실행된다
        database
          .ref('todos/')
          .orderByChild('uid')
          .equalTo(user.uid)
          .on('value', (querySnapShot) => {
            if (!querySnapShot) return;
            let data = querySnapShot.val() ? querySnapShot.val() : {};
            let todoItems = {...data};
            this.setState({todos: todoItems});
          });
      } else {
        console.log('Move to Login');
        console.log(user);
        this.props.navigation.navigate('Login');
      }
    });
  }

  render() {
    let todosKeys = Object.keys(this.state.todos);
    const screenHeight = Dimensions.get('window').height;

    // stickyHeaderIndices : 스크롤뷰에서 고정할 컴포넌트
    return (
      <View style={{flex: 1}}>
        <ScrollView
          style={styles.contentContainerStyle}
          stickyHeaderIndices={[0]}>
          <View
            style={{
              flexDirection: 'column',
              height: 150,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'black',
            }}>
            <TextInput
              placeholderTextColor="white"
              underlineColorAndroid="white"
              placeholder="Add new Todo"
              value={this.state.presentToDo}
              style={styles.textInput}
              onSubmitEditing={this.addNewTodo}
              onChangeText={(e) => {
                this.setState({
                  presentToDo: e,
                });
              }}></TextInput>
            <Button
              title="할일 추가"
              onPress={this.addNewTodo}
              color="lightgreen"
              style={{width: 70, height: 200}}></Button>
          </View>

          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            {todosKeys.length > 0 ? (
              todosKeys.map((key) => (
                <TodoItem key={key} id={key} todoItem={this.state.todos[key]} />
              ))
            ) : (
              <Text>No todo item :(</Text>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default HomeScreen;
