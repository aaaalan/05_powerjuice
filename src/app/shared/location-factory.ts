import { Location } from "./location";
import { User } from "./user";
export class LocationFactory {
  static empty(): Location {
    return new Location(null, "", "", 0, "", [
      {
        id: 0,
        date: new Date(),
        startTime: new Date(),
        endTime: new Date(),
        maxUsers: 0,
        location_id: 0,
        users: [
          {
            id: 0,
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            sex: "",
            password: "",
            isAdmin: false,
            isVaccinated: false,
            ssn: 0,
            vaccination_id: 0
          }
        ]
      }
    ]);
  }
  static fromObject(rawLocation: any): Location {
    return new Location(
      rawLocation.id,
      rawLocation.name,
      rawLocation.street,
      rawLocation.zipcode,
      rawLocation.city,
      rawLocation.vaccinations
    );
  }
}
/*


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
    public id:number,
    public name: string,
    public street: string,
    public zipcode: number,
    public city: string,
    public vaccinations?: Vaccination[]

     public id: number,
    public date: Date,
    public time: Date,
    public maxUsers: number,
    public location_id: number,
    public users?: User[]
   
    static empty(): Location {
    return new Location(null, "", "", null, "", [{id:0,
          date:new Date(),
          time:new Date(),
          maxUsers:0,
          location_id:,[{ id:null,
              firstName:"",
              lastName:"",
              email: "",
              phone:"",
              sex:"",
              password:"",
              isAdmin:false,
              isVaccinated:false,
              ssn:0,
              vaccination_id:0}]}
  ])};

  }
   

   
   
   new Vaccination(
          id:0,
          date:new Date(),
          time:new Date(),
          maxUsers:0,
          location_id:,
          [
            new User(
              id:null,
              firstName:"",
              lastName:"",
              email: "",
              phone:"",
              "",
              "",
              false,
              false,
              0,
              0
            )*/
