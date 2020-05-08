import { FormGroup } from '@angular/forms';

export class ValidatorsUtils {

  /**
   *
   * Validates the password matches with its confirmation
   */
  static checkPasswords(group: FormGroup) {
    const pass = group.get('password').value;
    const confirmPass = group.get('repeatPassword').value;

    return pass === confirmPass ? null : { notsame: true };
  }
}
