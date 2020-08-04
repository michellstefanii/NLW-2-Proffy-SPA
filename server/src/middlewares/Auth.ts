import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const authConf = require('../config/auth.json');

export default class Auth {

  async auth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).send({ error: 'No token provided' });

  const parts = authHeader.split(' ');

  if (!(parts.length === 2))
    return res.status(401).send({ error: 'Token error' });

  const [ scheme, token ] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: 'Token malformatted' });

  jwt.verify(token, authConf.secret, (err: any, decoded: any) => {
    if (err) return res.status(401).send({ error: 'Token invalid' });

    req.params.userId = decoded.id;
    return next();
  });
  }

};