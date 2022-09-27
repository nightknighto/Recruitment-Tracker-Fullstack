import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import MemberApplicationsController from '@/controllers/memberApplications.controller';

class MemberApplicationsRoute implements Routes {
  public path = '/memberapplications';
  public router = Router();
  public memberApplicationsController = new MemberApplicationsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.memberApplicationsController.getMemberApplications);
    this.router.put(`${this.path}`, this.memberApplicationsController.updateMemberApplicationByID);
    // this.router.post(`${this.path}`, validationMiddleware(CreateUserDto, 'body'), this.usersController.createUser);
    // this.router.delete(`${this.path}/:id(\\d+)`, this.usersController.deleteUser);
  }
}

export default MemberApplicationsRoute;
