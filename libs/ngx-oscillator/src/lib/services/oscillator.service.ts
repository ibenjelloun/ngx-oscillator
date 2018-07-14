import { Injectable } from '@angular/core';
import { oscillatorTypes, NOTES_COUNT, notesFrequencies } from '../model';

@Injectable()
export class OscillatorService {
  private context;
  private type;
  private time;

  constructor() {
    this.context = new AudioContext();
    this.type = oscillatorTypes.sine;
    this.time = 2;
  }

  public playNote(
    note: number,
    octave: number,
    options?: { type?: OscillatorType; time?: number }
  ) {
    this.play(note * Math.pow(2, octave), options);
  }

  public play(
    frequency: number,
    options: { type?: OscillatorType; time?: number } = {}
  ) {
    const o = this.context.createOscillator();
    const g = this.context.createGain();
    const type = options.type ? options.type : this.type;
    const time = options.time ? options.time : this.time;
    o.frequency.value = frequency;
    o.type = type;
    o.connect(g);
    g.connect(this.context.destination);
    g.gain.exponentialRampToValueAtTime(
      0.00001,
      this.context.currentTime + time
    );
    o.start();
    o.stop(this.context.currentTime + time);
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
}
