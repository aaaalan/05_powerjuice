export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) {}
}
export const UserFormErrorMessages = [
  new ErrorMessage(
    'firstName',
    'required',
    'Es muss ein Vorname angegeben werden'
  ),
  new ErrorMessage(
    'lastName',
    'required',
    'Es muss ein Nachname angegeben werden'
  ),
  new ErrorMessage(
    'ssn',
    'required',
    'Es muss eine Sozialversicherungsnummer (SSN) angegeben werden'
  ),
  new ErrorMessage(
    'ssn',
    'userExists',
    'Ein User mit der SSN existiert bereits in Ihrer Datenbank.'
  ),
  new ErrorMessage('email', 'required', 'Es muss eine E-Mail angegeben werden'),
    new ErrorMessage(
    'email',
    'userExists',
    'Ein User mit der E-Mail existiert bereits in Ihrer Datenbank.'
  ),
      new ErrorMessage(
    'email',
    'email',
    'Die E-Mail muss im korrekten Format sein. Beispiel: hi@example.com'
  ),
  new ErrorMessage(
    'phone',
    'required',
    'Es muss eine Telefonnummer angegeben werden'
  ),
  new ErrorMessage(
    'sex',
    'required',
    'Es muss das Geschlecht angegeben werden'
  ),
  new ErrorMessage(
    'ssn',
    'userExists',
    'Ein User mit der SSN existiert bereits in Ihrer Datenbank.'
  ),

  new ErrorMessage('date', 'required', 'Es muss ein Datum angegeben werden'),
  new ErrorMessage(
    'starttime',
    'required',
    'Es muss eine Zeit angegeben werden'
  )
];
