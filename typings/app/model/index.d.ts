// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Bills from '../../../app/model/bills';
import Parts from '../../../app/model/parts';
import Permissions from '../../../app/model/permissions';
import Roles from '../../../app/model/roles';
import Users from '../../../app/model/users';

declare module 'egg' {
  interface IModel {
    Bills: ReturnType<typeof Bills>;
    Parts: ReturnType<typeof Parts>;
    Permissions: ReturnType<typeof Permissions>;
    Roles: ReturnType<typeof Roles>;
    Users: ReturnType<typeof Users>;
  }
}
