// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import ExtendJsIHelper from '../../../app/extend/helper';
declare module 'egg' {
  type ExtendJsIHelperType = typeof ExtendJsIHelper;
  interface IHelper extends ExtendJsIHelperType { }
}