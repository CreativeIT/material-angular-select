import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialAngularSelectComponent } from './material-angular-select.component';
import { MaterialAngularSelectTypeaheadComponent } from './material-angular-select-typeahead.component';

@NgModule({
  declarations: [MaterialAngularSelectComponent, MaterialAngularSelectTypeaheadComponent],
  imports: [
    CommonModule,
  ],
  exports: [MaterialAngularSelectComponent, MaterialAngularSelectTypeaheadComponent],
})
export class MaterialAngularSelectModule { }
