export interface ILoginUser {
  id: string;
  password: string;
}

export interface ILoginUserResponse {
  accessToken: string;
  refreshToken?: string;
  isPasswordChanged: boolean;
}
export interface IRefreshTokenResponse {
  accessToken: string;
}
