import { api } from '@infor/services';
import { SessionUser } from '@infor/services/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../../storeConfiguration';

export const KEY_LOCALSTORAGE_USER = '@infor:user';
export const KEY_LOCALSTORAGE_TOKEN = '@infor:token';

export interface UserStateProps {
  user: {
    id?: string;
    name: string;
    email: string;
  },
  token?: string;
  isLoading: boolean;
}

const loadInitialUser = (): UserStateProps => {
  const emptyState = {
    user: {
      id: '',
      name: '',
      email: ''
    },
    token: '',
    isLoading: false,
  }
  try {
    const userStorage = window.localStorage.getItem(KEY_LOCALSTORAGE_USER);
    const tokenStorage = window.localStorage.getItem(KEY_LOCALSTORAGE_TOKEN);
    if (userStorage === null || tokenStorage === null) {
      return emptyState as UserStateProps;
    }
    const state = {
      user: JSON.parse(userStorage),
      token: JSON.parse(tokenStorage)
    };
    const initialState = state;
    console.log('initial state ', initialState);

    return initialState as UserStateProps;
  } catch (err) {
    return emptyState as UserStateProps;
  }
};

const initialState: UserStateProps = {
  user: {
    id: '',
    name: '',
    email: ''
  },
  token: '',
  isLoading: true,
}
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
        isLoading: false
      }
      const userStorage = window.localStorage.getItem(KEY_LOCALSTORAGE_USER);
      const tokenStorage = window.localStorage.getItem(KEY_LOCALSTORAGE_TOKEN);
      if (userStorage?.length === 0 || tokenStorage?.length === 0) {
        state = emptyState as UserStateProps;
      }
      state.user = JSON.parse(userStorage as string);
      state.token = JSON.parse(tokenStorage as string);
      state.isLoading = false;
    },
    signIn: (state, { payload: { user, token } }: PayloadAction<SessionUser>) => {
      //TODO: update user state
      state.user = user;
      // update token state
      state.token = token;
      //TODO: save data on local storage
      window.localStorage.setItem(KEY_LOCALSTORAGE_USER, JSON.stringify(state.user))
      window.localStorage.setItem(KEY_LOCALSTORAGE_TOKEN, JSON.stringify(state.token))
    },
  },
})

// Action creators are generated for each case reducer function
export const selectUser = (state: UserStateProps) => state.user
export default userSlice.reducer
export const { getUserLocalStorage, signIn } = userSlice.actions