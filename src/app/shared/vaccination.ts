import { User } from "./user";
export { User } from "./user";
import { Location } from './location';
export { Location } from './location';

export class Vaccination {
  constructor(
    public id: number,
    public date: Date,
    public startTime: Date,
    public endTime: Date,
    public maxUsers: number,
    public location_id: number,
    public location: Location,
    public users?: User[]
  ) {}
}
