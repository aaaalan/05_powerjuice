import { User } from "./user";
export { User } from "./user";


export class Vaccination {
  constructor(
    public id: number,
    public date: Date,
    public startTime: Date,
    public endTime: Date,
    public maxUsers: number,
    public location_id: number,
    public users?: User[]
  ) {}
}
