import { z } from 'zod';
import api from './api';
import { SessionUser, SignInProps, SignUpProps, UserProps } from "./types";

export const signUpApi = ({ 
  name, 
  email, 
  password 
}: SignUpProps): SignUpProps => {
  try {
    const schema = z.object({
      name: z.string({ required_error: 'Name is required' }).min(1, { message: 'Name is required' }),
      email: z.string().email({
        message: 'invalid email'
      }),
      password: z.string().min(6, {
        message: 'Password is too short, minimum length is 6 characters'
      })
    })
    const user = schema.parse({name,email, password});

    return user
    
  } catch (error: any) {
    throw new Error(error);
  }
}
export const signInApi = ({ email, password }: SignInProps): SignInProps => {
  try {
    const schema = z.object({
      email: z.string().email({message: 'Email is required'}),
      password: z.string().min(6),
    });
    const sessionData = schema.parse({email, password});

    return sessionData;
  } catch (error: any) {
    throw new Error(error);
  }

}