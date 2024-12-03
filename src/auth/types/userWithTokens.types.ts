import { Tokens } from './tokens.types';

export type UserWithTokens = {
  tokens: Tokens;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
};
