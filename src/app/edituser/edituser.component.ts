import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html'
})
export class EdituserComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  updatedUser: any;
  userId: any;
  showToast = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');

    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      age: ['', [Validators.required,Validators.min(0)]],
      gender: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      birthDate: ['', Validators.required],
      eyeColor: ['', Validators.required],
      hairColor: ['', Validators.required],
      hairType: ['', Validators.required]
    });

    this.userService.getUserById(this.userId).subscribe((userData) => {
      if (userData) {
        this.form.patchValue({
          firstName: userData.firstName,
          lastName: userData.lastName,
          username: userData.username,
          email: userData.email,
          phone: userData.phone,
          age: userData.age,
          gender: userData.gender,
          bloodGroup: userData.bloodGroup,
          birthDate: userData.birthDate,
          eyeColor: userData.eyeColor,
          hairColor: userData.hair?.color,
          hairType: userData.hair?.type
        });
      }
    });
  }

  submit() {
    if (this.form.valid) {
      this.updatedUser = this.form.value;
      this.submitted = true;

      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 3000);
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}