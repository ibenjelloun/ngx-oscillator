import { Injectable } from '@angular/core';
import { oscillatorTypes } from '../model';

@Injectable()
export class OscillatorService {

  private context;

  constructor() {
    this.context = new AudioContext();
  }

  public playNote(note: number, octave: number, type: OscillatorType =  oscillatorTypes.sine, time: number = 2) {
    this.play(note * Math.pow(2, octave), type, time)
  }

  public play(frequency: number, type: OscillatorType =  oscillatorTypes.sine, time: number = 2) {
    const o = this.context.createOscillator();
    const g = this.context.createGain();
    o.frequency.value = frequency;
    o.type = type;
    o.connect(g);
    g.connect(this.context.destination);
    g.gain.exponentialRampToValueAtTime(0.00001, this.context.currentTime + time);
    o.start();
    o.stop(this.context.currentTime + time)
  }
}