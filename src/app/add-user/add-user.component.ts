import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service'; // import service

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  form: FormGroup;
  step: number = 1;
  showToast = false;
  submittedData: any = null;
  showPassword = false;
  countries: any[] = [];
  states: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService // inject service
  ) {
    this.form = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      country: ['', Validators.required],
      state: ['', Validators.required],
      district: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      username: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).*$/)]],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userService.getCountries().subscribe({
      next: (res) => this.countries = res,
      error: () => console.error('Failed to load countries')
    });
  }

  onCountryChange(event: Event): void {
  const target = event.target as HTMLSelectElement;
  const iso2 = target.value;

  this.states = [];
  this.form.get('state')?.reset();

  if (iso2) {
    this.userService.getStates(iso2).subscribe(data => {
      this.states = data;
    });
  }
}




  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  next(): void {
    const controlsByStep: { [key: number]: string[] } = {
      1: ['fullName', 'email', 'phone'],
      2: ['country', 'state', 'district', 'zipCode'],
      3: ['username', 'password', 'role']
    };

    const currentControls = controlsByStep[this.step];
    currentControls.forEach(control => this.form.get(control)?.markAsTouched());

    if (currentControls.every(control => this.form.get(control)?.valid)) {
      this.step++;
    }
  }

  prev(): void {
    if (this.step > 1) this.step--;
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.submittedData = this.form.value;
      this.showToast = true;
      setTimeout(() => this.showToast = false, 3000);
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  allowOnlyNumbers(event: KeyboardEvent): void {
    const charCode = event.charCode || event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
}
