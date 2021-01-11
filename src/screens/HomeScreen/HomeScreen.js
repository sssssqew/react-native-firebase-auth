import React, {useEffect, useState} from 'react';
import {
  Button,
  Alert,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  View,
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
      todos: {},
      presentToDo: '',
    };
  }
  signOutUser = async () => {
    console.log('logout button pushed !');
    console.log(this.props);
    try {
      await firebase.auth().signOut();
    } catch (e) {
      console.log(e);
    }
  };

  addNewTodo = () => {
    console.log(this.state.presentToDo);
    database.ref('todos/').push({
      done: false,
      todoItem: this.state.presentToDo,
    });
    Alert.alert('Action!', 'A new To - do item was created');
    this.setState({presentToDo: ''});
  };
  clearAllTodos() {
    database.ref('todos/').remove();
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // 사용자가 데이터를 추가하는지 리스닝하다가 변경사항이 생기면 스냅샷을 던져주고 콜백이 실행된다
        database.ref('todos/').on('value', (querySnapShot) => {
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

    return (
      <>
        <View style={styles.header}>
          <Text style={{fontSize: 30, marginTop: 5, marginRight: 15}}>
            {this.props.extraData.email}
          </Text>
          <TouchableOpacity style={styles.button} onPress={this.signOutUser}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          <TextInput
            placeholder="Add new Todo"
            value={this.state.presentToDo}
            style={styles.textInput}
            onSubmitEditing={this.addNewTodo}
            onChangeText={(e) => {
              this.setState({
                presentToDo: e,
              });
            }}></TextInput>
          <View style={styles.inputSection}>
            <Button
              title="Add new To do item"
              onPress={this.addNewTodo}
              color="lightgreen"
              style={{flex: 1, margin: '50'}}></Button>

            <Button
              style={{flex: 1}}
              title="Clear All todos"
              onPress={this.clearAllTodos}
              color="red"
            />
          </View>

          <View>
            {todosKeys.length > 0 ? (
              todosKeys.map((key) => (
                <TodoItem key={key} id={key} todoItem={this.state.todos[key]} />
              ))
            ) : (
              <Text>No todo item :(</Text>
            )}
          </View>
        </ScrollView>
      </>
    );
  }
}

export default HomeScreen;
