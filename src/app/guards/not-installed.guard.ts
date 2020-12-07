import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { InstallationService } from 'src/app/services/installation.service';

@Injectable({
  providedIn: 'root'
})
export class NotInstalledGuard implements CanActivate {
  constructor(
    private router: Router,
    private installationService: InstallationService
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!!this.installationService.getData()) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }

}
