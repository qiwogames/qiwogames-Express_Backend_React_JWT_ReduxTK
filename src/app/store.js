import {configureStore} from '@reduxjs/toolkit';
//import de la tranche user
import userReducer from '../features/user/userSlice';

const store = configureStore({
    reducer:{
        user: userReducer
    }
});
export default store;