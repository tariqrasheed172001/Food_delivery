import {legacy_createStore as createStore,combineReducers,applyMiddleware, compose} from 'redux';
import userDataReducer from './Reducers/userDataReducer';
import flagReducer from './Reducers/flagReducer';
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
  };
  

const rootReducer = combineReducers({
    flag: flagReducer,
    userData: userDataReducer,
});

const persistedReducer = persistReducer(persistConfig,rootReducer,applyMiddleware(thunk));

const store = createStore(persistedReducer);
let persistor = persistStore(store);

export {store,persistor};
