import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators} from '@angular/forms';
import {FORM_ERRORS, FORM_LABELS, FORM_PLACEHOLDERS, FORM_SUCCESS, FORM_VALIDATION_MESSAGES} from '../shared/data/form-data';
import {NgIf} from '@angular/common';
import {CustomerInterface} from '../shared/types/customer.interface';
import {DEFAULT_CUSTOMER} from '../shared/data/mock-data';
import {HttpService} from '../shared/services/http.service';

@Component({
  selector: 'crud-customer-details',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.scss'
})
export class CustomerDetailsComponent implements OnInit {

  customerForm!: FormGroup;
  formSuccess = FORM_SUCCESS;
  formLabels = FORM_LABELS;
  formPlaceholders = FORM_PLACEHOLDERS;
  formErrors: any = FORM_ERRORS;
  validationMessages: any = FORM_VALIDATION_MESSAGES;

  constructor(private fb: FormBuilder, private httpService: HttpService) {
  }

  get form(): ValidationErrors {
    return this.customerForm.controls;
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  onSubmit(): void {
    this.httpService.createData(this.customerForm.value).subscribe();
    this.customerForm.reset();
  }

  onValueChanges(): void {
    Object.keys(this.formErrors).forEach(field => {
      const control = this.customerForm.get(field);
      this.formErrors[field] = '';

      if ((control?.dirty || control?.touched) && control.invalid) {
        const messages = this.validationMessages[field];
        Object.keys(control.errors as ValidationErrors).some(key => this.formErrors[field] = messages[key]);
      }
    });
  }

  setControlsValue(customer: CustomerInterface): void {
    Object.keys(this.customerForm.controls)
      .forEach(key => this.customerForm.controls[key].setValue(customer[key as keyof CustomerInterface]));
  }

  private initializeForm(): void {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(8), Validators.maxLength(12)]],
      location: ['', [Validators.required]],
    });
    this.customerForm.valueChanges.subscribe(() => this.onValueChanges());
    this.setControlsValue(DEFAULT_CUSTOMER);
  }
}
