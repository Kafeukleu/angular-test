import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';
import {CONTENT_ROUTE} from '../../router/routes.const';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
  }

  public ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public onSubmit(): void {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.authenticationService.connect(this.loginForm.get('username').value, this.loginForm.get('password').value)
      .pipe(first())
      .subscribe((connectSuccess: boolean) => {
          if (connectSuccess) {
            this.router.navigate([CONTENT_ROUTE]);
          } else {
            alert('No Matching user for this credentials');
          }
        },
        error => {
          alert('An issue occurred when trying to connect');
        });
  }
}
