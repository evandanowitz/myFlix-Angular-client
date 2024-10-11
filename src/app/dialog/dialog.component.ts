// DialogComponent is responsible for displaying the data passed to it (e.g., genre details, director bio, or synopsis).

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * DialogComponent displays a dialog box with the information passed to it.
 * The data is injected using the MAT_DIALOG_DATA token.
 */
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {

  /**
   * The constructor uses MAT_DIALOG_DATA to inject the data passed to the dialog, which includes the title and content.
   * @param data - The data passed to the dialog (e.g., genre, director, or synopsis information).
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { } // MAT_DIALOG_DATA token is used to pass data (genre, director, synopsis) to the dialog
}
