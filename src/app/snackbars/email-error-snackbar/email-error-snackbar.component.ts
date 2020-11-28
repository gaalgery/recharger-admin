import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
  selector: 'app-email-error-snackbar',
  templateUrl: './email-error-snackbar.component.html',
  styleUrls: ['./email-error-snackbar.component.css']
})
export class EmailErrorSnackbarComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) { }

}
