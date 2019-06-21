import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialAngularSelectComponent } from './material-angular-select.component';

@NgModule({
  declarations: [MaterialAngularSelectComponent],
  imports: [
    CommonModule,
  ],
  exports: [MaterialAngularSelectComponent],
})
export class MaterialAngularSelectModule { }
