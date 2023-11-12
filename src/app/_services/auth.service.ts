import {Injectable} from '@angular/core';
import {AuthConfig, OAuthService} from "angular-oauth2-oidc";
import {JwksValidationHandler} from 'angular-oauth2-oidc-jwks';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authConfig: AuthConfig = {
    issuer: 'http://localhost:3000/login/oauth',
    redirectUri: 'http://localhost:4200/repositories/info',
    clientId: 'b88b3e32ca5bc94ac5b2',
    responseType: 'code',
    scope: 'openid profile email offline_access api',
    showDebugInformation: true,
    requireHttps: false,
    loginUrl: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    userinfoEndpoint: 'https://api.github.com/user',
    logoutUrl: 'https://github.com/logout',
  };

  constructor(private oauthService: OAuthService) {
  }

  configureOAuth(): void {
    this.oauthService.configure(this.authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  loginWithGitHub(): void {
    this.oauthService.initImplicitFlow();
  }

  isAuthenticated(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  getUsername(): string {
    const claims: any = this.oauthService.getIdentityClaims();
    return claims ? claims['preferred_username'] : '';
  }

  logout() {
    this.oauthService.logOut();
  }
}
