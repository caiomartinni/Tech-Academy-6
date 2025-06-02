// filepath: c:\Users\Rick\Documents\Tech-Academy-5\backend\src\types\types.ts
export interface Brand {
  id: number;
  name: string;
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