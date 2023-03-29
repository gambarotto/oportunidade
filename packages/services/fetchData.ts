import api from './api';
import { z } from 'zod';

interface User {
  id: string;
  email: string;
  name: string;
}

interface SignUpProps {
  name: string;
  email: string;
  password: string;
}

export const signUpApi = async ({ name, email, password }: SignUpProps): Promise<User> => {
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
    const response = await api.post('/user', user);

    return response.data; 
    
  } catch (error: any) {
    throw new Error(error);
  }
}