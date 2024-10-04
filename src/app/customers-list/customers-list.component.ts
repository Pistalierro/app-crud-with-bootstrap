import {Component, OnInit} from '@angular/core';
import {HttpService} from '../shared/services/http.service';
import {Observable} from 'rxjs';
import {CustomerInterface} from '../shared/types/customer.interface';
import {AsyncPipe, NgForOf} from '@angular/common';

@Component({
  selector: 'crud-customers-list',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './customers-list.component.html',
  styleUrl: './customers-list.component.scss'
})
export class CustomersListComponent implements OnInit {

  customers$!: Observable<CustomerInterface[]>;

  constructor(private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.customers$ = this.httpService.getData();
  }
}
