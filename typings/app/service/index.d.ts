// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Permissions from '../../../app/service/permissions';
import Roles from '../../../app/service/roles';
import User from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    permissions: Permissions;
    roles: Roles;
    user: User;
  }
}
