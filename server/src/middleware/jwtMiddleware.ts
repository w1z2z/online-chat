import * as jwt from 'jsonwebtoken';

const SECRET_KEY = 'SECRET';

export const verifyToken = (
  token: string,
): null | { [key: string]: string } => {
  try {
    const userData = jwt.verify(token, SECRET_KEY);
    return userData as { [key: string]: string };
  } catch (error) {
    return null;
  }
};
