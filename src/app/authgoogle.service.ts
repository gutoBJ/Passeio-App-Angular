import { inject, Injectable, signal } from '@angular/core';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc'
import { auth } from './auth.config'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthgoogleService {

  private oauthService: OAuthService = inject(OAuthService)
  private router: Router = inject(Router) // para quando o user deslogar a aplicação redirecionar ele para a página inicial
  profile = signal<any>(null) // objeto que vamos setar para dizer quem tá logado, qual é a autenticação que tá logada e a autenticação vai vim do google
  // então se autenticar o google vai retornar um objeto pra gente e vai jogar para dentro do atributo profile
  // o any nesse caso quer dizer que ele recebe qualquer tipo de autenticação, independente do provedor (ex: google)

  constructor() { 
    this.initConfiguration()
  }

  initConfiguration() {
    this.oauthService.configure(auth) // configura as informações de configuração do cliente
    this.oauthService.setupAutomaticSilentRefresh() // é quando eu entrar na aplicação e já estou logado no google
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oauthService.hasValidAccessToken()) {
        this.profile.set(this.oauthService.getIdentityClaims())
      }
    }) // configurar para dizer quem é que tá autenticado
  }

  login() {
    this.oauthService.initImplicitFlow() // vai chamar o fluxo de autenticação do google
  }

  logout() { // disfaz toda a parte de autenticação
    this.oauthService.revokeTokenAndLogout()
    this.oauthService.logOut()
    this.profile.set(null)
    this.router.navigate([''])
  }

  getLoggedProfile() {
    return this.profile() // chama como função, pois ele é o signal
  }
}
