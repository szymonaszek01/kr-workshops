import { Component, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth.service';
import { PasswordErrorMessagePipe } from '../../pipes/password-error.pipe';
import { RequiredErrorMessagePipe } from '../../pipes/required-error.pipe';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    PasswordErrorMessagePipe,
    RequiredErrorMessagePipe,
  ],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss',
})
export class AuthFormComponent implements OnDestroy {
  readonly passwordPattern: string =
    '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$';
  showPassword: boolean = false;
  loginForm = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.pattern(this.passwordPattern),
      ],
    }),
  });

  private destroy$: Subject<void> = new Subject();
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  isUsernameInvalid(): boolean | undefined {
    return (
      this.loginForm.get('username')?.invalid &&
      this.loginForm.get('username')?.touched
    );
  }

  isPasswordInvalid(): boolean | undefined {
    return (
      this.loginForm.get('password')?.invalid &&
      this.loginForm.get('password')?.touched
    );
  }

  onSubmit() {
    const userName: string | null | undefined = this.loginForm.value.username;
    const userPassword: string | null | undefined =
      this.loginForm.value.password;

    if (userName && userPassword && this.loginForm.valid) {
      this.authService
        .login({ username: userName, password: userPassword })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (user) => {
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('userToken', user.token);
            localStorage.setItem('refreshToken', user.refreshToken);
            this.router.navigateByUrl('book-list');
            this.toastr.success('User successfully logged in');
          },
          error: () => this.toastr.error('Invalid username or password'),
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
