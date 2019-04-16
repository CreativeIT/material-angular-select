import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialAngularSelectModule } from '../../projects/material-angular-select/src/lib/material-angular-select.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialAngularSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
