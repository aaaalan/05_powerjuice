import { Vaccination } from "./vaccination";
export { Vaccination } from "./vaccination";


export class Location {
  constructor(
    public id:number,
    public name: string,
    public street: string,
    public zipcode: number,
    public city: string,
    public vaccinations?: Vaccination[]
  ) {}
}
