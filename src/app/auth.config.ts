import { AuthConfig } from 'angular-oauth2-oidc'

export const auth: AuthConfig = { // para configurar o nosso cliente
    issuer: 'https://accounts.google.com', // é quem fez a autenticação
    // a aplicação vai acessar essa url e vai perguntar: esse token tá válido? Essa credencial tá válida?
    redirectUri: window.location.origin, // para onde ele vai redirecionar a aplicação depois que se autenticar
    // vai pegar o localhost:4200
    clientId: '591502654487-rl7ujenp7h82o3hm4oumqt4615jbakrp.apps.googleusercontent.com',
    scope: 'openid profile email', // é o que o cliente vai ter acesso
    strictDiscoveryDocumentValidation: false
}