// import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";
// import { verifyToken } from './jwtMiddleware';
//
// export const VerifyToken = createParamDecorator(
//     const verify = verifyToken(token);
//     if (!verify) {
//       throw new UnauthorizedException({ key: 'Invalid token!' });
//     } else {
//       return token;
//     }
//   },
// );