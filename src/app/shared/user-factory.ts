import { User } from './user';

export class UserFactory {
  static empty(): User {
    return new User(null, '', '', '', '', '', '', false, false, null, null);

    /*  return new Vaccination(
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
    ); */
  }
  static fromObject(user: any): User {
    return new User(
      user.id,
      user.firstName,
      user.lastName,
      user.email,
      user.phone,
      user.sex,
      user.password,
      user.isAdmin,
      user.isVaccinated,
      user.ssn,
      user.vaccination_id
    );
  }
}
