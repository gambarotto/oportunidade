import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import prisma from '../../../lib/prisma';
import authJwtConfig from '../../../config/jwt/auth';
import AppError from '../../../error/AppError';
import { checkPassword } from '../../../lib/bcrypt';

class SessionController {
  async store(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        return res.status(404).json({ Message: 'user not found' });
      }

      const passwordMatch = await checkPassword(
        password,
        user?.passwordHash as string,
      );
      if (!passwordMatch) {
        return res.status(404).json({ Message: 'invalid user or password' });
      }
      const { secret, expiresIn } = authJwtConfig;

      const token = sign({}, secret, {
        subject: String(user?.id),
        expiresIn,
      });

      return res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error: any) {
      throw new AppError('Error creating user', 400);
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    res.clearCookie('jwt'); // limpa o cookie 'jwt'
    return res.status(200).send('Log out successfully');
  }
}
export default new SessionController();
