export type ILoginUser = {
  id: string;
  password: string;
};

export type IloginUserResponse = {
  accessToken: string;
  refreshToken?: string;
  needsPasswordChange: boolean;
};
