import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import authReducer from "./reducers/authReducer";
import seriesReducer from "./reducers/seriesReducer";
import geoblockingReducer from "./reducers/geoblockingReducer";

const rootReducer = combineReducers({
  user: authReducer,
  series: seriesReducer,
  geoblocking: geoblockingReducer,
});
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export { store, persistor };
