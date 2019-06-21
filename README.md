# material-angular-select
Angular material select

## Live example
<a target="_blank" href="https://creativeit.github.io/material-angular-select/"><img src="https://raw.githubusercontent.com/CreativeIT/material-angular-select/master/src/assets/life_example.gif" alt="Live example"> </a>

### JS version
Here you can find JS based version: [getmdl-select](https://github.com/CreativeIT/getmdl-select) 

## Getting started
### Step 1: Install `material-angular-select`:
##### NPM
```shell
npm install --save material-angular-select
```
or
##### YARN
```shell
yarn add material-angular-select
```
### Step 2: Import the MaterialAngularSelectModule
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialAngularSelectModule } from 'material-angular-select';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    MaterialAngularSelectModule,  // add the module in imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Sample implementation

**```app.module.ts```**

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialAngularSelectModule } from 'material-angular-select';

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

```

**```app.component.html```**

```html
<material-angular-select [data]="countries"
                         [label]="'Location'"
                         [name]="'country'"
                         [currentValue]="locationValue"
                         (selectedValue)="changeCountry($event)"></material-angular-select>
```

**```app.component.ts```**

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public readonly countries = ['Minsk', 'Berlin', 'Moscow', 'NYC'];
  public locationValue = 'Minsk';
  
  public changeCountry(country) {
    // do something
  }
}

```

Reactive forms are also supported:

**```app.module.ts```**

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialAngularSelectModule } from 'material-angular-select';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialAngularSelectModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

**```app.component.html```**

```html
<material-angular-select [data]="countries"
                         [label]="'Location'"
                         [name]="'country'"
                         [formControl]="country"></material-angular-select>
```

**```app.component.ts```**

```typescript
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public readonly countries = ['Minsk', 'Berlin', 'Moscow', 'NYC'];
  public country = new FormControl();
}

```

## API

### Inputs
| Input  | Type | Default | Required | Description |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| [data] | Array<any>	[] | [] |	yes |	Items array |
| name | string | '' | yes | Text for name of input |
| label | string | '' | no | Text for label |
| arrow | boolean | true | no | Allows to hide arrow |
| disabled | boolean | false | no | Allows to disable select |
| fixHeight | boolean | false | no | Allows to fix menu height to 280px |
| isFloatingLabel | boolean | true | no | Allows to fix label |
| [classStyle] | Array<string> | null | no | Added own classes to dropdown element  |
| keys | {value: string, title: string} | {value: 'value', title: 'title'} | yes | Required if use array of object with different structure |
| currentValue | string or {title: any, value: any} | {title: '', value: ''} | no | Set default value |
| inputId | string | \`id-${this.name}-${Math.round(Math.random() * 100 + 100)}\` | no | id attribute for input element |
| typeahead | boolean | false | no | Allows to type search query in input |
| [selector] | (query: string, dataArray: any) | _looking for substring of query in dataArray items_ | no | Allows to specify search function for typeahead |

### Outputs
| Output | Description |
| ------ | ------ |
| selectedValue | Fired on model change. Outputs whole model |



## Hire us
We are ready to bring value to your business. Visit our site [creativeit.io](http://creativeit.io/) or drop us a line <hello@creativeit.io>. We will be happy to help you!

## Support the project
* Star the repo
* Create issue report or feature request
* Check our [material-angular-dashboard](https://github.com/CreativeIT/material-angular-dashboard)
* [Tweet about it](https://twitter.com/CreativeITeam)
* Follow us on [Twitter](https://twitter.com/CreativeITeam)

