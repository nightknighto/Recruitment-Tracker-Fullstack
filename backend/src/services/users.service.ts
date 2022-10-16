import { hash } from 'bcrypt';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import recruitmentUser from '@models/users.model';

class UserService {
  public users = recruitmentUser;

  public async findAllUsers() {
    const users = await this.users.find({});
    return users;
  }

  public async findUserById(userId: string) {
    const findUser = await this.users.find({ _id: userId });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: CreateUserDto) {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser = await this.users.find({ phone: userData.phone });
    if (findUser) throw new HttpException(409, `This phone ${userData.phone} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const result = await this.users.insertMany([{ name: userData.name, password: hashedPassword, phone: userData.phone, role: userData.role }]);

    return result;
  }

  // public async updateUser(userId: number, userData: CreateUserDto): Promise<User[]> {
  //   if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

  //   const findUser: User = this.users.find(user => user.id === userId);
  //   if (!findUser) throw new HttpException(409, "User doesn't exist");

  //   const hashedPassword = await hash(userData.password, 10);
  //   const updateUserData: User[] = this.users.map((user: User) => {
  //     if (user.id === findUser.id) user = { id: userId, ...userData, password: hashedPassword, role: user.role };
  //     return user;
  //   });

  //   return updateUserData;
  // }

  //   public async deleteUser(userId: number): Promise<User[]> {
  //     const findUser: User = this.users.find(user => user.id === userId);
  //     if (!findUser) throw new HttpException(409, "User doesn't exist");

  //     const deleteUserData: User[] = this.users.filter(user => user.id !== findUser.id);
  //     return deleteUserData;
  //   }
}

export default UserService;
