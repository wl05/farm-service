// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Jwt from '../../../app/middleware/jwt';
import Permissions from '../../../app/middleware/permissions';

declare module 'egg' {
  interface IMiddleware {
    jwt: typeof Jwt;
    permissions: typeof Permissions;
  }
}
