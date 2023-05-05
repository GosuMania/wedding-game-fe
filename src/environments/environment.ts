// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // urlApi: 'http://127.0.0.1:5000/',
  urlApi: 'https://wedding-game-be.gosumania.it/api/',

  LOGIN: 'user/sign-in-or-sign-up',
  USER_GET_ALL: 'user/get-all',
  USER_GET_BY_ID: 'user/get-by-id',

  MISSION_GET_ALL: 'mission/get-all',
  MISSION_CREATE_OR_UPDATE: 'mission/create-or-update',
  MISSION_GET_BY_ID: 'mission/get-by-id',
  MISSION_GET_BY_ID_USER: 'mission/get-by-id-user',
  MISSION_DELETE: 'mission/delete',

  IMAGE_UPLOAD: 'image/upload',
  IMAGE_UPLOAD_VIDEO: 'image/upload-video'


};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
