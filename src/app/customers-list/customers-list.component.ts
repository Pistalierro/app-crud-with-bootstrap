import {Component, OnInit} from '@angular/core';
import {HttpService} from '../shared/services/http.service';
import {Observable} from 'rxjs';
import {CustomerInterface} from '../shared/types/customer.interface';
import {AsyncPipe, NgForOf, NgIf, NgTemplateOutlet} from '@angular/common';

@Component({
  selector: 'crud-customers-list',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    NgTemplateOutlet,
    NgIf
  ],
  templateUrl: './customers-list.component.html',
  styleUrl: './customers-list.component.scss'
})
export class CustomersListComponent implements OnInit {

  customers$!: Observable<CustomerInterface[]>;
  isEditPos!: number | null;
  isNotChanged!: boolean;
  private tempCustomer!: CustomerInterface;

  constructor(private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.customers$ = this.httpService.getData();
    this.resetEditStatus();
  }

  editCustomer(i: number): void {
    this.isEditPos = i;
  }

  cancelEdit(): void {
    this.resetEditStatus();
  }

  saveCustomer(customer: CustomerInterface, i: number): void {
    const mergedCustomer = this.mergeCustomerProps(customer, this.tempCustomer);
    this.httpService.updateData(mergedCustomer, i).subscribe();
    this.resetEditStatus();
  }

  deleteCustomer(customer: CustomerInterface, i: number): void {
    this.httpService.deleteData(customer, i).subscribe();
  }

  setValue(key: string, original: string, value: string): void {
    const valueTrim = value.trim();
    if (original !== valueTrim && valueTrim !== this.tempCustomer[key as keyof CustomerInterface]) {
      this.tempCustomer[key as keyof CustomerInterface] = valueTrim;
      this.isNotChanged = false;
    }
  }

  resetCustomer = () => ({key: null, name: '', email: '', mobile: '', location: '',});

  resetEditStatus(): void {
    this.isEditPos = null;
    this.isNotChanged = true;
    this.tempCustomer = this.resetCustomer();
  }

  mergeCustomerProps<T>(original: T, temp: T): T {
    const result = {...original};

    Object.keys(temp as keyof T).forEach(key => {
      if (temp[key as keyof T]) {
        result[key as keyof T] = temp[key as keyof T];
      }
    });
    return result;
  }
}
