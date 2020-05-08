import { FormGroup } from '@angular/forms';

export class FormBase {
  form: FormGroup;
  requiredFieldMessage = 'Este campo es obligatorio';

  hasErrors(controlName: string) {
    return this.form.get(controlName).errors && this.form.get(controlName).touched;
  }

  hasRequiredError(controlName: string): boolean {
    if (this.hasErrors(controlName)) {
      return this.form.get(controlName).errors.required;
    }
    return false;
  }

}
