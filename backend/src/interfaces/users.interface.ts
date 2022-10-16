export interface User {
  id: string;
  name: string;
  phone: number;
  password: string;
  role: `admin` | `basic`;
}
