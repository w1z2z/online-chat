import * as jwt from 'jsonwebtoken';

const SECRET_KEY1 = 'SECRET';

const genTokenPair = (id: string) => {
  const payload = {
    id,
  };
  return {
    accessToken: jwt.sign(payload, SECRET_KEY1, { expiresIn: '12h' }),
    refreshToken: jwt.sign(payload, SECRET_KEY1, { expiresIn: '7d' }),
  };
};

export default genTokenPair;
