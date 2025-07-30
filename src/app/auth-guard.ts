// import { CanActivateFn, Router } from '@angular/router';

// import { inject } from '@angular/core';
// export const authGuard: CanActivateFn = (route, state) => {
  
//   const routes= inject(Router);

//   const token= sessionStorage.getItem('token');
//   if(token){

//     return true;
//   }else{
//       return routes.createUrlTree(['/login']);
//   }
// };
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = sessionStorage.getItem('token');
  const role = sessionStorage.getItem('role'); // e.g., 'admin' or 'hotel_vendor'
  const url = state.url;

  if (!token) {
    return router.createUrlTree(['/login']);
  }

  // Role-based access control
  if (role === 'hotel_vendor') {
    if (url.startsWith('/deskboard')) {
      return true;
    } else {
      return router.createUrlTree(['/notfounderror404']);
    }
  }

  if (role === 'admin') {
    if (!url.startsWith('/deskboard')) {
      return true;
    } else {
      return router.createUrlTree(['/notfounderror404']);
    }
  }

  // If role is missing or not recognized
  return router.createUrlTree(['/notfounderror404']);
};
