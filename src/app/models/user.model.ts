import { Authority } from './authority.model';

export class User {
  id: number;
  name: string;
  username: string;
  password: string;
  enabled: boolean;
  deleted: boolean;
  image: string;
  authority: Authority;
}
