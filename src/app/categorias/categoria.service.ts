import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Categoria } from './categoria';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'

@Injectable({ // É um decorador que diz ao Angular: "essa classe pode ser injetada em outras classes"
  // O providedIn: 'root' significa que o Angular cria uma única instância desse service para o app inteiro. Então quando você injeta o PacienteService em dois componentes diferentes, os dois estão usando o mesmo objeto.
  // É como uma classe compartilhada que o Angular gerencia para você.
  providedIn: 'root'
})
export class CategoriaService {

   apiUrl: string = environment.apiUrl + '/categorias'

  constructor(private http: HttpClient) { }

  salvar(categoria: Categoria) : Observable<Categoria> {
    return this.http.post<Categoria>(this.apiUrl, categoria)
  }

  // Observable - É um objeto do RxJS que representa um valor que vai chegar no futuro — como uma resposta HTTP.
  // O Observable só começa a trabalhar quando alguém chama o .subscribe(). Antes disso ele fica parado.
  // Resumindo: Representa uma resposta que ainda vai chegar (HTTP, eventos, etc)

  // .subscribe()Executa o Observable e recebe o resultado

  obterTodas() : Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl)
  }
}
