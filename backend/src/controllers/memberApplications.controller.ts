import MemberApplicationsService from '@/services/memberApplications.service';
import { NextFunction, Request, Response } from 'express';

const users = [
  { id: 1, name: 'mahmoud', email: 'example1@email.com', phone: '01234567890', track: 'web' },
  { id: 2, name: 'atwa', email: 'example2@email.com', phone: '01234567891', track: 'web' },
  { id: 3, name: 'mohamed', email: 'example3@email.com', phone: '01234567892', track: 'embedded' },
  { id: 4, name: 'spiderman', email: 'example4@email.com', phone: '01234567893', track: 'desktop' },
  { id: 5, name: 'batman', email: 'example5@email.com', phone: '01234567894', track: 'embedded' },
];
class MemberApplicationsController {
  public memberApplicationsService = new MemberApplicationsService();

  public getMemberApplications = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // const findAllUsersData: User[] = await this.userService.findAllUser();
      const memberApplications = await this.memberApplicationsService.findAllMemberApplications();
      res.status(200).json(memberApplications);
    } catch (error) {
      next(error);
    }
  };

  public getTrackMemberApplications = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const trackname = String(req.params.track);
      // const findOneUserData: User = await this.userService.findUserById(userId);
      const test = users.filter(user => user.track === trackname);
      console.log(test);
      // const test = users.map(user => {
      //   if (user.track === trackname) {
      //     return user;
      //   }
      // });

      res.status(200).json({
        data: test,
        message: 'findOne',
      });
    } catch (error) {
      next(error);
    }
  };

  // public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //   try {
  //     const userData: CreateUserDto = req.body;
  //     const createUserData: User = await this.userService.createUser(userData);

  //     res.status(201).json({ data: createUserData, message: 'created' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //   try {
  //     const userId = Number(req.params.id);
  //     const userData: CreateUserDto = req.body;
  //     const updateUserData: User[] = await this.userService.updateUser(userId, userData);

  //     res.status(200).json({ data: updateUserData, message: 'updated' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //   try {
  //     const userId = Number(req.params.id);
  //     const deleteUserData: User[] = await this.userService.deleteUser(userId);

  //     res.status(200).json({ data: deleteUserData, message: 'deleted' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}

export default MemberApplicationsController;
