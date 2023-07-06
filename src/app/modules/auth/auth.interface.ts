export type ILoginUser = {
  id: string;
  password: string;
};

export type IloginUserResponse = {
  accessToken: string;
  refreshToken?: string;
  needsPasswordChange: boolean;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

export type IChagePassword = {
  oldPassword: string;
  newPassword: string;
};
