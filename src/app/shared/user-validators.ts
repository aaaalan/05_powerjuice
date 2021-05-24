import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UserStoreService } from "./user-store.service";

export class UserValidators {


  static userExists(us: UserStoreService) {
    return function(
      control: FormControl
    ): Observable<{ [error: string]: any }> {
      return us
        .check(control.value)
        .pipe(
          map(exists => (!exists ? null : { userExists: { valid: false } }))
        );
    };
  }

    static emailExists(us: UserStoreService) {
    return function(
      control: FormControl
    ): Observable<{ [error: string]: any }> {
      return us
        .checkMail(control.value)
        .pipe(
          map(exists => (!exists ? null : { userExists: { valid: false } }))
        );
    };
  }
}
