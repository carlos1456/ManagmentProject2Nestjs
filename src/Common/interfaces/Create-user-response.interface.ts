import { User } from 'src/modules/user/schemas/schema.user';

export interface CreateUserResponse {
  token: string;
  createduser: User;
}
