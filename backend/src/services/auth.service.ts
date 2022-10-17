import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import recruitmentUser from '@models/users.model';

class AuthService {
  public users = recruitmentUser;

  public async signup(userData: CreateUserDto) {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = Object(await this.users.findOne({ phone: userData.phone }));
    console.log(Object.keys(findUser).length);
    if (Object.keys(findUser).length) throw new HttpException(409, `This phone ${userData.phone} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const result = await this.users.insertMany([{ name: userData.name, password: hashedPassword, phone: userData.phone, role: userData.role }]);
    return result;
  }

  public async login(userData: CreateUserDto): Promise<{ cookie: string; tokenData: TokenData; findUser: User }> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');
    if (!userData.phone || !userData.password) throw new HttpException(409, 'Invalid request body');

    const findUser: User = Object(await this.users.findOne({ phone: userData.phone }));
    if (!Object.keys(findUser).length) throw new HttpException(409, `This phone ${userData.phone} was not found`);
    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    // const isPasswordMatching = userData.password === findUser.password;
    if (!isPasswordMatching) throw new HttpException(409, 'Incorrect password');

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, tokenData, findUser };
  }

  public async logout(userData: User) {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = Object(await this.users.find({ phone: userData.phone, password: userData.password }));
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
