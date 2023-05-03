export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export function saveUser(user: IUser) {
  console.log(user + 'salvo com sucesso');
}
