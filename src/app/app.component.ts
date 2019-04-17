import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'material-angular-select';
  data = ['Minsk', 'Berlin', 'Moscow', 'NYC'];
  currentValue = 'Minsk';
  countries = ['Belarus', 'Poland', 'Italy', 'USA', 'Brazil', 'France', 'Russia', 'Finland', 'Estonia'];

  selectedValue(data: { title: string, value: string }) {
    this.currentValue = data.title;
  }
}
