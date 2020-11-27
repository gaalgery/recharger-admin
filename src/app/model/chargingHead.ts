export class ChargingHead {

  constructor(id: number, stationID: number, price: number, type: string, name: string ) {
    this.id = id;
    this.stationId = stationID;
    this.price = price;
    this.type = type;
    this.name = name;
  }

  id: number;
  stationId: number;
  price: number;
  type: string;
  name: string;
}
