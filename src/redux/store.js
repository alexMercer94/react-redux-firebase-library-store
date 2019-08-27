import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';

// Setting firestore
const firebaseConfig = {
    apiKey: 'AIzaSyDJLcAy3mpqxuianv5g6OljZd2rrA71BiU',
    authDomain: 'bibliostore-react.firebaseapp.com',
    databaseURL: 'https://bibliostore-react.firebaseio.com',
    projectId: 'bibliostore-react',
    storageBucket: 'bibliostore-react.appspot.com',
    messagingSenderId: '1026235380976',
    appId: '1:1026235380976:web:6e9059ba31b8918f'
};

// Init firebase
firebase.initializeApp(firebaseConfig);

// Configuration of react-redux
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true
};

// Create enhancer with readux compose and firestore
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore);

// Reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer
});

// Initial state
const initialState = {};

// Create Store
const store = createStoreWithFirebase(
    rootReducer,
    initialState,
    compose(
        reactReduxFirebase(firebase),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;
