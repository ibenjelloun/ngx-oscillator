export class MelodyNote {
  constructor(public note: number, public octave: number, public time: number) {}
}

export class Melody {
  notes: MelodyNote[];
  type?: OscillatorType;
}
