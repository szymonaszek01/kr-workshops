import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { RequiredErrorMessagePipe } from './required-error.pipe';
import { ErrorHandler } from '@angular/core';

describe('RequiredErrorMessagePipe', () => {
  const errorRequiredMessage = 'Username is required';

  it('create an instance', () => {
    const pipe = new RequiredErrorMessagePipe();
    expect(pipe).toBeTruthy();
  });

  it(`should return message when required error exists : \'${errorRequiredMessage}\'`, () => {
    //1.given
    const usernameControl = new FormControl('');
    usernameControl.setErrors({ required: true });
    //2.when
    const pipe = new RequiredErrorMessagePipe();
    const result = pipe.transform(usernameControl);
    //3.then
    expect(result).toEqual(errorRequiredMessage);
  });

  it("should return an empty string when there are no errors: ''", () => {
    //1.given
    const usernameControl = new FormControl('');
    //2.when
    const pipe = new RequiredErrorMessagePipe();
    const result = pipe.transform(usernameControl);
    //3.then
    expect(result).toEqual('');
  });
});
