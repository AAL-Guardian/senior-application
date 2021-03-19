import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Installation } from '../models/installation.model';

@Injectable({
  providedIn: 'root'
})
export class InstallationService {

  constructor(
    private http: HttpClient
  ) { }

  install(robotCode: string, clientId: string) {
    return this.http.post(`${environment.apiEndpoint}/senior/install`, {
      robotCode,
      clientId
    }).pipe(
      tap((res: Installation) => {
        localStorage.setItem('robotCode', JSON.stringify(robotCode))
        localStorage.setItem('installation', JSON.stringify(res))
      })
    )
  }

  getData(): Installation {
    try {
      const data = localStorage.getItem('installation')
      return JSON.parse(data);
    } catch (e) {
      return undefined
    }
  }
}
