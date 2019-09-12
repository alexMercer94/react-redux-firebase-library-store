import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

/** Custom Reducers **/
import searchUserReducer from './reducers/searchUserReducer';

// Setting firestore
const firebaseConfig = {
    apiKey: 'AIzaSyCf6Kg1YSUw2t_wQAyJQOdGaIagL1FrABY',
    authDomain: 'react-bookstore-d3fc7.firebaseapp.com',
    databaseURL: 'https://react-bookstore-d3fc7.firebaseio.com',
    projectId: 'react-bookstore-d3fc7',
    storageBucket: '',
    messagingSenderId: '763106169251',
    appId: '1:763106169251:web:84429af96b4a324f5e8a16'
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
    firestore: firestoreReducer,
    user: searchUserReducer
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
