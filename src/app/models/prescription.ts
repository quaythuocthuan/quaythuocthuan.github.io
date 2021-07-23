export interface Prescription {
  id?: Number;
  medicine: string;
  patientId: Number;
  quantity: Number;
  typeMedicine: string;
  use: {
    morning: boolean;
    afternoon1: boolean;
    afternoon2: boolean;
    everning: boolean;
  }
}
