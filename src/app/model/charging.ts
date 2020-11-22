import {User} from './user';
import {ChargingHead} from './chargingHead';

export class Charging{

  constructor(id: number, chargingHead: ChargingHead, user: User, beginTime: Date, endTime: Date,
              consumption: number, price: number, expectedCompletion: string) {

    this.id = id;
    this.chargingHead = chargingHead;
    this.userAccount = user;
    this.beginTime = beginTime;
    this.endTime = endTime;
    this.consumption = consumption;
    this.price = price;
    this.expectedCompletion = expectedCompletion;
  }

  id: number;
  chargingHead: ChargingHead;
  userAccount: User;
  beginTime: Date;
  endTime: Date;
  consumption: number;
  price: number;
  expectedCompletion: string;
}
