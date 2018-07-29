import { Injectable } from '@angular/core';
import { oscillatorTypes, NOTES_COUNT, notesFrequencies } from '../model';
import { Melody } from '../model/melodies';
import { timer } from 'rxjs';

@Injectable()
export class OscillatorService {
  private context;
  private type;
  private time;
  private gain;
  private o;
  private g;

  constructor() {
    this.context = new AudioContext();
    this.type = oscillatorTypes.sine;
    this.time = 0.2;
    this.gain = 1;
  }

  public playNote(
    note: number,
    octave: number,
    options?: { type?: OscillatorType; time?: number; gain?: number }
  ): { oscillator: any; gain: any } {
    return this.play(note * Math.pow(2, octave), options);
  }

  public playNoteC(
    note: number,
    octave: number,
    options?: { type?: OscillatorType; time?: number; gain?: number }
  ): void {
   this.playC(note * Math.pow(2, octave), options);
  }

  public play(
    frequency: number,
    options: { type?: OscillatorType; time?: number; gain?: number } = {}
  ): { oscillator: any; gain: any } {
    const o = this.context.createOscillator();
    const g = this.context.createGain();
    const type = options.type ? options.type : this.type;
    const time = options.time ? options.time : this.time;
    const gain = options.gain ? options.gain : this.gain;
    o.frequency.value = frequency;
    o.type = type;
    o.connect(g);
    g.connect(this.context.destination);
    g.gain.value = gain;
    o.start();
    o.stop(this.context.currentTime + time);
    return { oscillator: o, gain: g.gain };
  }

  public playC(
    frequency: number,
    options: { type?: OscillatorType; gain?: number } = {}
  ): void {
    const type = options.type ? options.type : this.type;
    const gain = options.gain ? options.gain : this.gain;
    if (!this.o) {
      this.o = this.context.createOscillator();
      this.g = this.context.createGain();
      this.o.frequency.value = frequency;
      this.o.type = type;
      this.o.connect(this.g);
      this.g.connect(this.context.destination);
      this.g.gain.value = gain;
      this.o.start();
    } else {
      this.o.type = type;
      this.o.frequency.value = frequency;
      this.g.gain.value = gain;
    }
  }

  public stopC() {
    this.o.stop(0);
    this.o = null;
    this.g = null;
  }

  async playMelody(melody: Melody) {
    for (const melodyNote of melody.notes) {
      this.playNote(melodyNote.note, melodyNote.octave);
      await timer(melodyNote.time * 1000).toPromise();
    }
  }

  public getScale(scale: number[], note: number) {
    const o = {};
    scale.forEach(_ => {
      const v = _ + note;
      const key = Object.keys(notesFrequencies)[v % NOTES_COUNT];
      o[key] =
        v >= NOTES_COUNT ? notesFrequencies[key] * 2 : notesFrequencies[key];
    });
    return o;
  }

  public setOscillatorType(type: OscillatorType) {
    this.type = type;
  }

  public setTime(time: number) {
    this.time = time;
  }

  public setGain(gain: number) {
    this.gain = gain;
  }
}
