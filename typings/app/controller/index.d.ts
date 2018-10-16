// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Permissions from '../../../app/controller/permissions';
import Roles from '../../../app/controller/roles';
import User from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    permissions: Permissions;
    roles: Roles;
    user: User;
  }
}
