export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) {}
}
export const LocationFormErrorMessages = [
  new ErrorMessage(
    'name',
    'required',
    'Ess muss ein Impfort angegeben werden'
  ),
  new ErrorMessage(
    'street',
    'required',
    'Es muss eine Straße angegeben werden'
  ),
  new ErrorMessage(
    'zipcode',
    'required',
    'Es muss eine Postleitzahl angegeben werden'
  ),
    new ErrorMessage(
    'city',
    'required',
    'Es muss eine Stadt angegeben werden'
  ),
 
];
