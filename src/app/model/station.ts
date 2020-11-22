export class Station {

  constructor(id: number, address: string, coordinateLon: number, coordinateLat: number, state: string, phone: string ) {
    this.id = id;
    this.address = address;
    this.coordinateLon = coordinateLon;
    this.coordinateLat = coordinateLat;
    this.state = state;
    this.phone = phone;
  }

  id: number;
  address: string;
  coordinateLon: number;
  coordinateLat: number;
  state: string;
  phone: string;
}
