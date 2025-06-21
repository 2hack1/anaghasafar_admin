import { CanActivateFn, Router } from '@angular/router';

import { inject } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {
  
  const routes= inject(Router);

  const token=localStorage.getItem('token');
  if(token){

    return true;
  }else{
      return routes.createUrlTree(['/login']);
  }
};
