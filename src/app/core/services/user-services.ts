import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


export interface AdminEntry {
  id?: number;
  name: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserServices {
  private apiUrl = 'http://localhost:8000/api/';
  private stateSubject = new BehaviorSubject<string>('deactive');
  state$ = this.stateSubject.asObservable();

  constructor(private http: HttpClient) { }

  subdestinationid: any;
  currentpackageId: any;
  toggle() {
    const newState = this.stateSubject.getValue() === 'active' ? 'deactive' : 'active';
    this.stateSubject.next(newState);
  }
  // ********************destinations***************************
  // Get all main destinations
  getAll(): Observable<AdminEntry[]> {
    return this.http.get<AdminEntry[]>(`${this.apiUrl}destination/all/des`);
  }

  // Create new destination
  create(entry: AdminEntry): Observable<AdminEntry> {
    return this.http.post<AdminEntry>(`${this.apiUrl}destination`, entry);
  }

  // Update destination
  update(id: number, entry: AdminEntry): Observable<AdminEntry> {
    return this.http.put<AdminEntry>(`${this.apiUrl}destination/update/${id}`, entry);
  }

  // Delete destination
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}destination/delete/${id}`);
  }


  // ********************sub_destinations***************************
  getAllSubDestinations(id: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}destination/${id}`);
  }

  // 🔹 Create Sub Destination (with image)
  createSubDestination(formData: FormData, id: any): Observable<any> {
    return this.http.post(`${this.apiUrl}subdestination/${id}`, formData);
  }

  updateSubDestination(id: any, formData: FormData): Observable<any> {
    formData.append('_method', 'PUT'); // <- Add this line!
    return this.http.post(`${this.apiUrl}ssubdestination/update/${id}`, formData);
  }


  // 🔹 Delete Sub Destination
  deleteSubDestination(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}ssubdestination/delete/${id}`);
  }



  // ********************Packages***************************
  getAllPackages(sub_des_id: number) {
    return this.http.get(`http://localhost:8000/api/packages/${sub_des_id}`);
  }
  getperticular(sub_des_id: number) {
    return this.http.get(`http://localhost:8000/api/packages/${sub_des_id}/details`);
  }
  createPackage(data: FormData, sub_des_id: any) {
    return this.http.post(`http://localhost:8000/api/packages/${sub_des_id}`, data);
  }


  deletePackage(id: number) {
    return this.http.delete(`http://localhost:8000/api/packages/delete/${id}`);
  }

  getitineries(package_id: any) {
    return this.http.get(`${this.apiUrl}itineraries/${package_id}`);
  }
  getTransportation(package_id: any) {
    return this.http.get(`${this.apiUrl}transports/${package_id}`);
  }
  getImage(package_id: any) {
    return this.http.get(`${this.apiUrl}pac_image/${package_id}`);
  }


  // ******************************* form packages*****************

  // (data:any){}  this is fake 

  uploadPackageImage(data: FormData, sub_des_id: any) {
    return this.http.post(`http://localhost:8000/api/pac_image/${sub_des_id}`, data);
  }

  saveItinerary(data: any, sub_des_id: any) {
    return this.http.post(`http://localhost:8000/api/itineraries/${sub_des_id}`, data);
  }
  getMonth(package_id: number) {
    return this.http.get(`http://localhost:8000/api/months/${package_id}`);
  }
  saveMonthTour(data: any) {
    return this.http.post("http://localhost:8000/api/set-multiple-months", data);
  }

  saveDateTour(data: any) {
    return this.http.post(`http://localhost:8000/api/dateOfTour/a`, data);
  }
  saveTransport(data: any, sub_des_id: any) {
    return this.http.post(`http://localhost:8000/api/transports/${sub_des_id}`, data);
  }

  // updates of data

  updatePackage(id: number, data: FormData) {
    return this.http.post(`http://localhost:8000/api/packages/update/${id}`, data); // Use PUT/PATCH as per your backend
  }
  updatePackageImage(id: number, data: FormData) {
    return this.http.post(`http://localhost:8000/api/pac_image/update/${id}`, data); // Use PUT/PATCH as per your backend
  }
  updateItinerary(id: number, data: any) {
    return this.http.post(`http://localhost:8000/api/itineraries/update/${id}`, data); // Use PUT/PATCH as per your backend
  }
  updateMonthTour(data: any) {
    return this.http.post(`http://localhost:8000/api/months/update/multiple`, data); // Use PUT/PATCH as per your backend
  }
  getDateWithMonthId(data: any) {
    return this.http.post(`http://localhost:8000/api/getdatemore`, data); // Use PUT/PATCH as per your backend
  }
  updateDateTour(data: any) {
    return this.http.post(`http://localhost:8000/api/dateOfTour/multipleupdate`, data); // Use PUT/PATCH as per your backend
  }
  updateTransport(id: number, data: any) {
    return this.http.post(`http://localhost:8000/api/transports/update/${id}`, data); // Use PUT/PATCH as per your backend
  }
  get4card() {
    return this.http.get("http://localhost:8000/api/four-cards");
  }
  update4card(id: number, data: any) {
    return this.http.post(`http://localhost:8000/api/four-cards/${id}`, data);
  }
  gettopimage() {
    return this.http.get("http://localhost:8000/api/topimagess");
  }
  updatetopimage(id: number, data: FormData) {
    return this.http.post(`http://localhost:8000/api/topimg/update/${id}`, data);
  }

getUserPlanTrip(){
      return this.http.get("http://localhost:8000/api/trips");

}
DeleteUserPlanTrip(id:any){
      return this.http.delete(`http://localhost:8000/api/trips/${id}`);

}

// ********************LOGIN ADMIN ************************

loginAdmin(data:FormData){

  return this.http.post(`http://localhost:8000/api/login`,data);
}


// image gallary*************
imageGallary(data:FormData,id:any){
   return this.http.post(`http://localhost:8000/api/gellery/${id}`,data);
}
imagereplaceGallary(data:FormData,id:any){
  return this.http.post(`http://localhost:8000/api/gellery/${id}/replace`,data);
}
loadimagereplaceGallary(id:any){
  return this.http.get(`http://localhost:8000/api/gellery/${id}`);
}

}