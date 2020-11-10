// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_BASE: "http://localhost:8080/api",
  ROLE_LIST: {
    ADMIN: {id:1, string: "Administrateur"},
    SUPER_ADMIN: {id:2, string:"Super administrateur"},
    USER: {id:3, string:"Utilisateur"},
    MONITOR: {id:4, string:"Monitor"}
  },
  ROLE_LIST_ARRAY : {
    "Administrateur":1,
    "Utilisateur":3,
    "Moniteur":4
  }
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
