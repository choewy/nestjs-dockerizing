import { CookieOptions, Response } from 'express';

import { CustomRequest } from '@app-common/interfaces';

import { CookieKey } from './enums';

export class Cookie {
  public static withRequest(req: CustomRequest) {
    return new Cookie(req);
  }

  public static withResponse(res: Response) {
    return new Cookie(undefined, res);
  }

  constructor(private request?: CustomRequest, private response?: Response) {}

  private getOptions(expires?: number): CookieOptions {
    return {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: expires ? new Date(expires) : undefined,
    };
  }

  public getAccessToken(): string | null {
    return this.request.cookies?.[CookieKey.AccessToken] || null;
  }

  public getRefreshToken(): string | null {
    return this.request.cookies?.[CookieKey.RefreshToken] || null;
  }

  public setAccessToken(token: string, expires: number) {
    this.response.cookie(CookieKey.AccessToken, token, this.getOptions(expires));

    return this;
  }

  public setRefreshToken(token: string, expires: number) {
    this.response.cookie(CookieKey.RefreshToken, token, this.getOptions(expires));

    return this;
  }

  public deleteTokens() {
    this.response.clearCookie(CookieKey.AccessToken, this.getOptions());
    this.response.clearCookie(CookieKey.RefreshToken, this.getOptions());

    return this;
  }
}
