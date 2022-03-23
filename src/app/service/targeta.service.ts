import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class TargetaService {

  private myAppUrl = 'https://localhost:44302/';
  private myApiUrl = 'api/Targeta/';

  constructor(private http: HttpClient) { }

  getTargeta(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  eliminarTargeta(id: number): Observable<any>{
      return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }

  GuardarTargeta(targeta: any): Observable<any>{
      return this.http.post(this.myAppUrl + this.myApiUrl, targeta);
  }

  EditarTargeta(id: number, targeta: any): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + id, targeta);
  }
  
}
