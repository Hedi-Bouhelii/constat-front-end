import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'login',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(firstName :string,lastName:string, username:string, cin:number, email:string, phone:number, password:string): Observable<any> {
    return this.http.post(
      AUTH_API + 'register',
      {
        firstName,
        lastName,
        username,
        cin,
        email,
        phone,
        password
      },
      httpOptions
    );
  }
  registerConstat(formData: any): Observable<any> {
    return this.http.post(
      AUTH_API + 'register',
      {
      date: formData.accident.date,
      lieu: formData.accident.lieu,
      blessure: formData.accident.Blessure,
      degats: formData.accident.Degats,
      assureeNom: formData.assureeConducteur.nom,
      assureePrenom: formData.assureeConducteur.prenom,
      assureeTel: formData.assureeConducteur.tel,
      assureeAdr: formData.assureeConducteur.adr,
      conducteurNom: formData.assureeConducteur.nomCon,
      conducteurPrenom: formData.assureeConducteur.preCon,
      conducteurAdr: formData.assureeConducteur.adrCon,
      conducteurTel: formData.assureeConducteur.telCon,
      vehiculeMarque: formData.vehicule.marque,
      vehiculeSerie: formData.vehicule.serie,
      vehiculeDeb: formData.vehicule.deb,
      vehiculeFin: formData.vehicule.fin,
      optionalNom: formData.optional.nom,
      optionalPrenom: formData.optional.prenom,
      optionalAge: formData.optional.age,
      optionalAdr: formData.optional.adrs,
      // driverIsInsured: formData.assureeConducteur.driverIsInsured,
      numPA: formData.assureeConducteur.numPA,
      datePA: formData.assureeConducteur.datePA,
      numPC: formData.assureeConducteur.numPC,
      datePC: formData.assureeConducteur.datePC
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    const USER_KEY = 'auth-user';
    window.sessionStorage.removeItem(USER_KEY);
    return this.http.post(AUTH_API + 'logout', { }, httpOptions);
  }

  refreshToken() {
    return this.http.post(AUTH_API + 'refreshtoken', { }, httpOptions);
  }
}
