import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { MatButtonModule, MatCardModule, MatDialogModule, MatGridListModule, MatIconModule, MatInputModule, MatMenuModule, MatProgressSpinnerModule, MatSnackBarModule, MatTableModule, MatToolbarModule } from '@angular/material';

@NgModule({
  imports: [
  CommonModule,
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatDialogModule,
  MatTableModule,
  MatMenuModule,
  MatGridListModule,
  MatSnackBarModule,
  MatIconModule,
  MatProgressSpinnerModule
  ],
  exports: [
  CommonModule,
   MatToolbarModule,
   MatButtonModule,
   MatCardModule,
   MatInputModule,
   MatSnackBarModule,
   MatDialogModule,
   MatGridListModule,
   MatTableModule,
   MatMenuModule,
   MatIconModule,
   MatProgressSpinnerModule
   ],
})
export class CustomMaterialModule {}
