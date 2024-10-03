import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators} from '@angular/forms';
import {FORM_ERRORS, FORM_LABELS, FORM_PLACEHOLDERS, FORM_SUCCESS, FORM_VALIDATION_MESSAGES} from '../shared/data/form-data';
import {NgIf} from '@angular/common';

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

  constructor(private fb: FormBuilder) {
  }

  get form(): ValidationErrors {
    return this.customerForm.controls;
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  onSubmit(): void {
    console.log(this.customerForm.value);
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

  private initializeForm(): void {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
      location: ['', [Validators.required]],
    });
    this.customerForm.valueChanges.subscribe(() => this.onValueChanges());
  }
}
