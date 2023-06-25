import { Request, Response, NextFunction } from 'express';
import jwt, { Secret  } from 'jsonwebtoken';
import dotenv from 'dotenv';

interface AuthenticatedRequest extends Request {
  user?: string;
}

dotenv.config();
const secret = process.env.SECRET as Secret;

const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token de autenticação não fornecido.' });
  }

  jwt.verify(token, secret, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ error: 'Token de autenticação inválido.' });
    }

    req.user = user;
    next();
  });
};

export default authenticateToken;
