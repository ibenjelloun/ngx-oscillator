import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { NgxOscillatorModule } from '@ngx-oscillator/ngx-oscillator';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NxModule.forRoot(), NgxOscillatorModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
