// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Parts from '../../../app/model/parts';
import User from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Parts: ReturnType<typeof Parts>;
    User: ReturnType<typeof User>;
  }
}
