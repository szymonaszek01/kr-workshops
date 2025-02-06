import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'passwordErrorMessage',
  standalone: true,
})
export class PasswordErrorMessagePipe implements PipeTransform {
  transform(control: AbstractControl | null): string {
    console.log(control);
    if (!control?.errors) {
      return '';
    }

    const errors: ValidationErrors = control.errors;

    if (errors['required']) {
      return 'Password is required';
    }

    if (errors['pattern']) {
      return 'The password must contain at least one uppercase letter, one lowercase letter, one number, one special character (ex. @, #, $) and be at least 8 characters long.';
    }

    return '';
  }
}
