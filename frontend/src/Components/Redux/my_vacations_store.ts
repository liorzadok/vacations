//npm i redux, npm i @reduxjs/toolkit

import { configureStore } from "@reduxjs/toolkit"
import { VacationReducer } from "./VacationReducer";
import { UserReducer } from "./UserReducer";
import { FollowReducer } from "./FollowerRecuder";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "main-root",
  storage,
};


const persistedUserReducer = persistReducer(persistConfig, UserReducer);

//choose all reducers....
const reducers = { users: persistedUserReducer, vacations: VacationReducer, followers: FollowReducer };

//combine reducers.
export const my_vacations = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({ serializableCheck: false }), //do not look on serialization errors
});


export const persister = persistStore(my_vacations);