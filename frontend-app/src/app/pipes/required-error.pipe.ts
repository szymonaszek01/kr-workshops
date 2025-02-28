import { Pipe, PipeTransform } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

@Pipe({
  name: 'requiredErrorMessage',
  standalone: true,
})
export class RequiredErrorMessagePipe implements PipeTransform {
  transform(
    control: AbstractControl | null,
    label: string = 'Control'
  ): string {
    if (!control?.errors) {
      return '';
    }

    const errors: ValidationErrors = control.errors;

    if (errors['required']) {
      return `${label} is required`;
    }

    return '';
  }
}
