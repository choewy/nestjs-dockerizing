export interface JwtSignResult<T> {
  token: string;
  expiresIn: number;
  payload: T;
}
