export class User {
  constructor(
    public id:number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public phone: string,
    public sex: string,
    public password: string,
    public isAdmin: boolean,
    public isVaccinated: boolean,
    public ssn: number,
    public vaccination_id: number
  ) {}
}
