import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  inputSection: {
    width: '80%',
    flexDirection: 'row',
    marginBottom: 30,
    marginTop: -10,
    justifyContent: 'flex-start',
  },
  textInput: {
    width: 300,
    borderWidth: 0,
    borderColor: '#afafaf',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 20,
    fontSize: 20,
    color: 'white',
    alignItems: 'center',
  },
  todoItem: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 500,
  },
  todoText: {
    borderColor: '#afafaf',
    paddingHorizontal: 5,
    paddingVertical: 7,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    minWidth: '50%',
    textAlign: 'center',
  },
  contentContainerStyle: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  container: {
    flex: 1,
    alignItems: 'center',
  },
  formContainer: {
    flexDirection: 'row',
    height: 80,
    marginTop: 40,
    marginBottom: 20,
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
  },
  button: {
    height: 47,
    borderRadius: 5,
    backgroundColor: '#788eec',
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  listContainer: {
    marginTop: 20,
    padding: 20,
  },
  entityContainer: {
    marginTop: 16,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    paddingBottom: 16,
  },
  entityText: {
    fontSize: 20,
    color: '#333333',
  },
});
