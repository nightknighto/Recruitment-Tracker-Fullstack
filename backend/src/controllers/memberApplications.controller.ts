import { RequestWithUser } from '@/interfaces/auth.interface';
import { User } from '@/interfaces/users.interface';
import MemberApplicationsService from '@/services/memberApplications.service';
import { NextFunction, Response } from 'express';

class MemberApplicationsController {
  public memberApplicationsService = new MemberApplicationsService();

  public getMemberApplications = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.user;
      console.log(userData);
      // const findAllUsersData: User[] = await this.userService.findAllUser();
      const memberApplications = await this.memberApplicationsService.findAllMemberApplications();
      res.status(200).json(memberApplications);
    } catch (error) {
      next(error);
    }
  };

  public updateMemberApplicationByID = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const updateData = req.body;
      const userData: User = req.user;
      const updateResponse = await this.memberApplicationsService.updateMemberApplicationByID(updateData, userData);
      res.status(200).json(updateResponse);
    } catch (error) {
      next(error);
    }
  };

  public updateMultipleMemberApplicationsByID = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const updateData = req.body;
      const userData: User = req.user;
      const updateResponse = await this.memberApplicationsService.updateMultipleMemberApplicationsByID(updateData, userData);
      res.status(200).json(updateResponse);
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
