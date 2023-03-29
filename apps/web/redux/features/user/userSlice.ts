import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserStateProps {
  user:{
    id?: string;
    name: string;
    email: string;
  }
}

const loadInitialUser = (): UserStateProps => {
  try {
    const userState = localStorage.getItem('@infor');
    if (userState === null) {
      return {
        user: {
          id: '',
          name: '',
          email: ''
        }
      } as UserStateProps;
    }
    const initialState = JSON.parse(userState);
    return initialState as UserStateProps;
  } catch (err) {
    return {
      user: {
        id: '',
        name: '',
        email: ''
      }
    } as UserStateProps;
  }
};

const initialState: UserStateProps = loadInitialUser()
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signUp: (state, { payload: { user } }:PayloadAction<UserStateProps>) => {
      state.user = user;
    },
    signIn: (state, { payload: { user } }:PayloadAction<UserStateProps>) => {
      //TODO: axios header token
      //TODO: update user state
      //TODO: save data on local storage
    },
    signOut: (state) => {
      //TODO: update user state with ''

    }
  },
})

// Action creators are generated for each case reducer function
export const { signUp } = userSlice.actions

export default userSlice.reducer