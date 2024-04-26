import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  rooturl = `${environment.api}`

  constructor(private httpClient: HttpClient) { }

  geInforUserConnected(numero: any): Observable<any> {
    return this.httpClient.get(`${this.rooturl}/infosUser/${numero}`)
  }

  register(data: any) {
    return this.httpClient.post(`${this.rooturl}/registrer`, data)
  }

  login(numero: any, codeAuth:any): Observable<any> {
    return this.httpClient.post(`${this.rooturl}/login/${numero}/${codeAuth}`, codeAuth )
  }

  resetPassword(numero: any, data: any): Observable<any> {
    return this.httpClient.put(`${this.rooturl}/reset/${numero}/${data}`, data)
  }
}
