import { Component } from '@angular/core';
import { ErrorService } from '../error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  error: string | null = null;

  constructor(private errorService: ErrorService) {
    this.errorService.getError().subscribe(error => {
      this.error = error;
    });
  }
}