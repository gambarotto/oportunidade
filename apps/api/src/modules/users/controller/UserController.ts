import { Request, Response } from 'express';
import AppError from '../../../error/AppError';
import { checkPassword, hashPassword } from '../../../lib/bcrypt';
import prisma from '../../../lib/prisma';

class UserController {
  async store(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    try {
      const userExist = await prisma.user.findUnique({
        where: { email },
      });
      if (userExist) {
        return res.status(400).json({ Message: 'user already exists' });
      }
      const passwordHash = await hashPassword(password);
      const user = await prisma.user.create({
        data: {
          name,
          email,
          passwordHash,
        },
      });

      return res.json({ id: user.id, name: user.name, email: user.email });
    } catch (error: any) {
      throw new AppError('Error creating user', 400);
    }
  }

  async index(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });
      if (!user) {
        return res.status(404).json({ message: 'user not found' });
      }
      return res.json({ id: user.id, name: user.name, email: user.email });
    } catch (error: any) {
      throw new AppError('user not found', 404);
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { name, email, oldPassword, newPassword } = req.body;
    const { id } = req.user;

    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });
      if (!user) {
        return res.status(404).json({ message: 'user not found' });
      }
      if (email && email !== user?.email) {
        const emailAlreadyExists = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (emailAlreadyExists) {
          return res.status(404).json({ Message: 'email already in use' });
        }
      }
      if (newPassword) {
        const passwordMatch = await checkPassword(
          oldPassword,
          user?.passwordHash as string,
        );
        if (!passwordMatch) {
          return res.status(403).json({ Message: 'Password does not match' });
        }
      }
      const updatedUser = await prisma.user.update({
        where: {
          id,
        },
        data: {
          name: name || user?.name,
          email: email || user?.email,
          passwordHash: newPassword || user?.passwordHash,
        },
      });
      return res.json({
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
      });
    } catch (error) {
      res.status(500).json({ Message: 'Error updating user' });
      throw new AppError('Error on update', 500);
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    console.log(id);

    try {
      await prisma.user.delete({
        where: { id },
      });
      return res.json({ message: 'user deleted' });
    } catch (error) {
      throw new AppError('user not found', 404);
    }
  }
}
export default new UserController();
