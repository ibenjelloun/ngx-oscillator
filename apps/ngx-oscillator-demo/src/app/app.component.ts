import { Component } from '@angular/core';
import {
  OscillatorService,
  scales,
  notes,
  oscillatorTypes,
  notesFrequencies
} from 'ngx-oscillator';

@Component({
  selector: 'osc-demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  colors = [
    '#FEA47F',
    '#25CCF7',
    '#EAB543',
    '#55E6C1',
    '#CAD3C8',
    '#F97F51',
    '#1B9CFC',
    '#F8EFBA',
    '#58B19F'
  ];

  currentNotes: any;
  notesNames;
  mouseClicked = false;
  continious = true;

  allNotesNames = Object.keys(notes);
  allScalesNames = Object.keys(scales);
  allOscillatorType = Object.keys(oscillatorTypes);

  currentScale = 'Major';
  currentNote = 'A';
  currentType = 'sine';
  currentTime = 0.2;
  currentGain = 1;

  current: { oscillator: any; gain: any };

  constructor(private _oscillatorService: OscillatorService) {
    this.onScaleOrNoteChange();
    document.addEventListener('mousedown', () => (this.mouseClicked = true));
    document.addEventListener('mouseup', () => (this.mouseClicked = false));
  }

  play(note: string, octave: number) {
    if(this.continious) {
      this._oscillatorService.playNoteC(
        this.currentNotes[note],
        octave
      );
    } else {
      this.current = this._oscillatorService.playNote(
        this.currentNotes[note],
        octave
      );
    }

  }

  playIfClicked(note: string, octave: number) {
    if (this.mouseClicked) {
      this.play(note, octave);
    }
  }

  playMelody() {
    this._oscillatorService.playMelody({
      notes: [
        { note: notesFrequencies.D, octave: 5, time: 0.4 },
        { note: notesFrequencies.D, octave: 5, time: 0.2 },
        { note: notesFrequencies.D, octave: 5, time: 0.2 },
        { note: notesFrequencies.D, octave: 5, time: 0.3 },
        { note: notesFrequencies.Cs, octave: 5, time: 0.3 },
        { note: notesFrequencies.B, octave: 4, time: 0.5 },
        { note: notesFrequencies.A, octave: 4, time: 0.2 },
        { note: notesFrequencies.A, octave: 4, time: 0.2 }
      ]
    });
  }

  changeScale(scale: string, note: string) {
    this.currentNotes = this._oscillatorService.getScale(
      scales[scale],
      notes[note]
    );
    this.notesNames = Object.keys(this.currentNotes);
  }

  onScaleOrNoteChange() {
    this.changeScale(this.currentScale, this.currentNote);
  }

  onOscillatorTypeChange() {
    this._oscillatorService.setOscillatorType(
      oscillatorTypes[this.currentType]
    );
  }

  onTimeChange() {
    this._oscillatorService.setTime(this.currentTime);
  }

  onGainChange() {
    this._oscillatorService.setGain(this.currentGain);
  }

  stop() {
    this._oscillatorService.stopC();
  }
}
