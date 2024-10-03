import {Component} from '@angular/core';
import {CustomersListComponent} from '../customers-list/customers-list.component';
import {CustomerDetailsComponent} from '../customer-details/customer-details.component';

@Component({
  selector: 'crud-customers-host',
  standalone: true,
  imports: [
    CustomersListComponent,
    CustomerDetailsComponent
  ],
  templateUrl: './customers-host.component.html',
  styleUrl: './customers-host.component.scss'
})
export class CustomersHostComponent {

}
