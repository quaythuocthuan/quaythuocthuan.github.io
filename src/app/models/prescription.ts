export interface Prescription {
  patientId: string;
  id: string;
  diagnostic: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PrescriptionDetails {
  id?: number;
  medicine: string;
  prescriptionId: string;
  patientId?: any;
  quantity: number;
  typeMedicine: string;
  use: {
    morning: boolean;
    afternoon1: boolean;
    afternoon2: boolean;
    everning: boolean;
  }
}
