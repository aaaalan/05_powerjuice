import { User } from './user';
import { Vaccination } from './vaccination';
export class VaccinationFactory {
  static empty(): Vaccination {




    return new Vaccination(
      null,
      new Date(),
      new Date(),
      new Date(),
      0,
      0,
      { id: 0, name: '', street: '', zipcode: 0, city: '' },
      [
        {
          id: 0,
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          sex: '',
          password: '',
          isAdmin: false,
          isVaccinated: false,
          ssn: 0,
          vaccination_id: 0
        }
      ]
    );
  }
  static fromObject(vaccination: any): Vaccination {


    return new Vaccination(
      vaccination.id,
      vaccination.maxParticipants,
      typeof vaccination.date === 'string'
        ? new Date(vaccination.date)
        : vaccination.date,

      typeof vaccination.startTime === 'string'
        ? new Date(vaccination.startTime)
        : vaccination.startTime,
      typeof vaccination.endTime === 'string'
        ? new Date(vaccination.endTime)
        : vaccination.endTime,
      vaccination.location_id,
      vaccination.location,
      vaccination.users
    );
  }
}
