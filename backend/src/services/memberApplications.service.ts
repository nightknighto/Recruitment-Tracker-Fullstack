import { User } from '@/interfaces/users.interface';
import memberApplication from '@/models/memberApplications.model';

class MemberApplicationsService {
  public memberApplications = memberApplication;

  public async findAllMemberApplications() {
    const memberApplications = await this.memberApplications.find({});
    return memberApplications;
  }

  public async updateMemberApplicationByID(updateData, userData: User) {
    const { _id, data } = updateData;
    // data.editedBy = userData.email;
    // data.editTime = new Date().toLocaleString();
    // eslint-disable-next-line prettier/prettier
    const updateResponse = await this.memberApplications.updateOne({ '_id': _id }, {$set: {...data}, $push: {edits: {editedBy: userData.name, editTime: new Date().toLocaleString()}}});
    return updateResponse;
  }

  //     public async findUserById(userId: number): Promise<User> {
  //       const findUser: User = this.users.find(user => user.id === userId);
  //       if (!findUser) throw new HttpException(409, "User doesn't exist");

  //       return findUser;
  //     }

  //     public async createUser(userData: CreateUserDto): Promise<User> {
  //       if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

  //       const findUser: User = this.users.find(user => user.email === userData.email);
  //       if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

  //       const hashedPassword = await hash(userData.password, 10);
  //       const createUserData: User = { id: this.users.length + 1, ...userData, password: hashedPassword };
  //       this.users = [...this.users, createUserData];

  //       return createUserData;
  //     }

  //     public async updateUser(userId: number, userData: CreateUserDto): Promise<User[]> {
  //       if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

  //       const findUser: User = this.users.find(user => user.id === userId);
  //       if (!findUser) throw new HttpException(409, "User doesn't exist");

  //       const hashedPassword = await hash(userData.password, 10);
  //       const updateUserData: User[] = this.users.map((user: User) => {
  //         if (user.id === findUser.id) user = { id: userId, ...userData, password: hashedPassword };
  //         return user;
  //       });

  //       return updateUserData;
  //     }

  //     public async deleteUser(userId: number): Promise<User[]> {
  //       const findUser: User = this.users.find(user => user.id === userId);
  //       if (!findUser) throw new HttpException(409, "User doesn't exist");

  //       const deleteUserData: User[] = this.users.filter(user => user.id !== findUser.id);
  //       return deleteUserData;
  //     }
}

export default MemberApplicationsService;
