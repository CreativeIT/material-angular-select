import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
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

  selectedValue(data: { title: string, value: string }) {
    this.currentValue = data.title;
  }

  selectedComplexValue(data) {
    this.currentComplexValue = data;
  }
}
