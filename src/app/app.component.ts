import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'material-angular-select';
  cities = ['Minsk', 'Berlin', 'Moscow', 'NYC'];
  currentValue = 'Minsk';
  countries = ['Belarus', 'Poland', 'Italy', 'USA', 'Brazil', 'France', 'Russia', 'Finland', 'Estonia'];
  complexCountries = [
    { name: 'Belarus', code: 'BY' },
    { name: 'Poland', code: 'PL' },
    { name: 'Russia', code: 'RUS' },
    { name: 'Finland', code: 'FI' }];

  currentComplexValue = this.complexCountries[2];

  form;

  ngOnInit() {
    this.form = new FormGroup({
      reactive: new FormControl(),
      typeahead: new FormControl(),
    });
    this.form.valueChanges.subscribe((next) => console.log('Reactive form has changed', next));
  }

  selectedValue(data: { title: string, value: string }) {
    this.currentValue = data.title;
  }

  selectedComplexValue(data) {
    this.currentComplexValue = data;
  }
}
