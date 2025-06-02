export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  cpf: string;
  updatedBy?: number;
}

export interface Car {
  id: number;
  model: string;
  description: string;
  specs: string;
  averagePrice: number;
  type: string;
  year: number;
  brandId: number;
}

export interface Brand {
  id: number;
  name: string;
}