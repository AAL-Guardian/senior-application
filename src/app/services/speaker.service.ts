import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpeakerService {

  constructor(
    private http: HttpClient
  ) { }

  getAudioUrl(text: string, language: string) {
    return this.http.post(`${environment.apiEndpoint}/synthetize`, {
      language,
      text
    }).pipe(
      map((res: any) => res.url as string)
    );
  }
}
