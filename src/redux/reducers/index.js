import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {AuthReducer} from "./AuthReducer";
import {combineReducers} from "redux";

const persistConfig = {
  key: "root",
  // localStorage에 저장합니다.
  storage,
  // auth, board, studio 3개의 reducer 중에 auth reducer만 localstorage에 저장합니다.
  // whitelist: ["auth"]
  // blacklist -> 그것만 제외합니다
};

const allReducers = combineReducers({
  Auth: AuthReducer
});

export default persistReducer(persistConfig, allReducers);
