# NgxOscillator

`ngx-oscillator` is an angular wrapper for the javascript oscillator.

# Installation 

To install using npm :

`npm i ngx-oscillator`

To install using yarn :
`yarn add ngx-oscillator`

# Usage

Import the `NgxOscillatorModule` in your root module :

```
import { NgxOscillatorModule } from 'ngx-oscillator';

@NgModule({
  declarations: [AppComponent],
  imports: [NgxOscillatorModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

Use the `OscillatorService` to play notes :

```
import { OscillatorService, notes } from 'ngx-oscillator';

constructor(private _oscillatorService: OscillatorService) {}

playSomeNote() {
  this._oscillatorService.playNote(notes.A, 5);
}
```
