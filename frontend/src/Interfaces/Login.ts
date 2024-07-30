export interface ILogin {
		email: string;
		password: string;
}

export interface IRegister {
		username: string;
		email: string;
		password: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  telephone: string | null;
  birth_date: string | null;
}

export interface IRegisterResponse {
  message: string;
  user: IUser;
}

export interface ILoginResponse {	
	message: string;
	token: string;
}
