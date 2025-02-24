import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { PasswordErrorMessagePipe } from './password-error.pipe';
import { ErrorHandler } from '@angular/core';

describe('PasswordErrorMessagePipe', () => {
  const errorPasswordRequired = 'Password is required';
  const errorPatternMessage =
    'The password must contain at least one uppercase letter, one lowercase letter, one number, one special character (ex. @, #, $) and be at least 8 characters long.';

  it('create an instance', () => {
    const pipe = new PasswordErrorMessagePipe();

    expect(pipe).toBeTruthy();
  });

  it(`should return message: \'${errorPasswordRequired}\'`, () => {
    //1.given
    const passwordControl = new FormControl('');
    passwordControl.setErrors({ required: true });
    //2.when
    const pipe = new PasswordErrorMessagePipe();
    const result = pipe.transform(passwordControl);
    //3.then
    expect(result).toEqual(errorPasswordRequired);
  });
  it(`should return message: \'${errorPatternMessage}\'`, () => {
    //1.given
    const passwordControl = new FormControl('');
    passwordControl.setErrors({ pattern: true });
    //2.when
    const pipe = new PasswordErrorMessagePipe();
    const result = pipe.transform(passwordControl);
    //3.then
    expect(result).toEqual(errorPatternMessage);
  });
  it("should return message: ''", () => {
    //1.given
    const passwordControl = new FormControl('');
    passwordControl.setErrors({ email: true });
    //2.when
    const pipe = new PasswordErrorMessagePipe();
    const result = pipe.transform(passwordControl);
    //3.then
    expect(result).toEqual('');
  });
});
