import { api } from '@infor/services';
import { SessionUser } from '@infor/services/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { KEY_LOCALSTORAGE_TOKEN, KEY_LOCALSTORAGE_USER } from '../../../constraints/localStorage';

export interface UserStateProps {
  user:{
    id?: string;
    name: string;
    email: string;
  },
  token?: string;
}

const loadInitialUser = (): UserStateProps => {
  const emptyState = {
    user: {
      id: '',
      name: '',
      email: ''
    },
    token: '',
  }
  try {
    const userStorage = window.localStorage.getItem(KEY_LOCALSTORAGE_USER);
    const tokenStorage = window.localStorage.getItem(KEY_LOCALSTORAGE_TOKEN);
    if (userStorage === null || tokenStorage === null) {
      return emptyState as UserStateProps;
    }
    const state = { 
      user: JSON.parse(userStorage), 
      token: tokenStorage
    };
    const initialState = state;
    console.log('initial state ',initialState);
    
    return initialState as UserStateProps;
  } catch (err) {
    return emptyState as UserStateProps;
  }
};

const initialState: UserStateProps = loadInitialUser()
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserLocalStorage: (state) => {
      const emptyState = {
        user: {
          id: '',
          name: '',
          email: ''
        },
        token: '',
      }
      const userStorage = window.localStorage.getItem(KEY_LOCALSTORAGE_USER);
      const tokenStorage = window.localStorage.getItem(KEY_LOCALSTORAGE_TOKEN);
      if (userStorage === null || tokenStorage === null) {
        state = emptyState as UserStateProps;
      }
      state.user = JSON.parse(userStorage as string);
      state.token = tokenStorage as string;
    },
    signUp: (state, { payload: { user } }:PayloadAction<UserStateProps>) => {
      state.user = user;
    },
    signIn: (state, { payload: { user, token } }:PayloadAction<SessionUser>) => {
      //TODO: axios header token
      api.defaults.headers.authorization = `Bearer ${token}`;
      //TODO: update user state
      state.user = user;
      // update token state
      state.token = token;
      //TODO: save data on local storage
      window.localStorage.setItem(KEY_LOCALSTORAGE_USER, JSON.stringify(state.user))
      window.localStorage.setItem(KEY_LOCALSTORAGE_TOKEN, JSON.stringify(state.token))
    },
    signOut: (state) => {
      //TODO: update user state with ''

    }
  },
})

// Action creators are generated for each case reducer function
export const { getUserLocalStorage, signUp, signIn, signOut } = userSlice.actions
export const useAppSelector: TypedUseSelectorHook<UserStateProps> = useSelector
export default userSlice.reducer