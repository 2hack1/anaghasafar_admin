import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';


export interface AdminEntry {
  id?: number;
  name: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
   
export class UserServices {

  private stateSubject = new BehaviorSubject<string>('deactive');
  state$ = this.stateSubject.asObservable();

  constructor(private http: HttpClient) { }
  role: any;
  subdestinationid: any;
  currentpackageId: any;
  norifilerrun = 0;
  env=environment

  toggle() {
    const newState = this.stateSubject.getValue() === 'active' ? 'deactive' : 'active';
    this.stateSubject.next(newState);
  }
 

  // ********************destinations***************************
  // Get all main destinations
  getAll(): Observable<AdminEntry[]> {
    return this.http.get<AdminEntry[]>(`${this.env.base_url}/destination/all/des`);
  }

  // Create new destination
  create(entry: AdminEntry): Observable<AdminEntry> {
    return this.http.post<AdminEntry>(`${this.env.base_url}/destination`, entry);
  }

  // Update destination
  update(id: number, entry: AdminEntry): Observable<AdminEntry> {
    return this.http.put<AdminEntry>(`${this.env.base_url}/destination/update/${id}`, entry);
  }

  // Delete destination
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.env.base_url}/destination/delete/${id}`);
  }


  // ********************sub_destinations***************************
  getAllSubDestinations(id: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.env.base_url}/destination/${id}`);
  }

  // 🔹 Create Sub Destination (with image)
  createSubDestination(formData: FormData, id: any): Observable<any> {
    return this.http.post(`${this.env.base_url}/subdestination/${id}`, formData);
  }

  updateSubDestination(id: any, formData: FormData): Observable<any> {
    formData.append('_method', 'PUT'); // <- Add this line!
    return this.http.post(`${this.env.base_url}/ssubdestination/update/${id}`, formData);
  }


  // 🔹 Delete Sub Destination
  deleteSubDestination(id: number): Observable<any> {
    return this.http.delete(`${this.env.base_url}/ssubdestination/delete/${id}`);
  }



  // ********************Packages***************************
  getAllPackages(sub_des_id: number) {
    return this.http.get(`${this.env.base_url}/packages/${sub_des_id}`);
  }
  getperticular(sub_des_id: number) {
    return this.http.get(`${this.env.base_url}/packages/${sub_des_id}/details`);
  }
  createPackage(data: FormData, sub_des_id: any) {
    return this.http.post(`${this.env.base_url}/packages/${sub_des_id}`, data);
  }

  deletePackage(id: number) {
    return this.http.delete(`${this.env.base_url}/packages/delete/${id}`);
  }

  getitineries(package_id: any) {
    return this.http.get(`${this.env.base_url}/itineraries/${package_id}`);
  }
  getTransportation(package_id: any) {
    return this.http.get(`${this.env.base_url}/transports/${package_id}`);
  }
  getImage(package_id: any) {
    return this.http.get(`${this.env.base_url}/pac_image/${package_id}`);
  }


  // ******************************* form packages*****************

  // (data:any){}  this is fake 

  uploadPackageImage(data: FormData, sub_des_id: any) {
    return this.http.post(`${this.env.base_url}/pac_image/${sub_des_id}`, data);
  }

  saveItinerary(data: any, sub_des_id: any) {
    return this.http.post(`${this.env.base_url}/itineraries/${sub_des_id}`, data);
  }
  getMonth(package_id: number) {
    return this.http.get(`${this.env.base_url}/months/${package_id}`);
  }
  saveMonthTour(data: any) {
    return this.http.post(`${this.env.base_url}/set-multiple-months`, data);
  }

  saveDateTour(data: any) {
    return this.http.post(`${this.env.base_url}/dateOfTour/a`, data);
  }
  saveTransport(data: any, sub_des_id: any) {
    return this.http.post(`${this.env.base_url}/transports/${sub_des_id}`, data);
  }

  // updates of data

  updatePackage(id: number, data: FormData) {
    return this.http.post(`${this.env.base_url}/packages/update/${id}`, data); // Use PUT/PATCH as per your backend
  }
  updatePackageImage(id: number, data: FormData) {
    return this.http.post(`${this.env.base_url}/pac_image/update/${id}`, data); // Use PUT/PATCH as per your backend
  }
  updateItinerary(id: number, data: any) {
    return this.http.post(`${this.env.base_url}/itineraries/update/${id}`, data); // Use PUT/PATCH as per your backend
  }
  updateMonthTour(data: any) {
    return this.http.post(`${this.env.base_url}/months/update/multiple`, data); // Use PUT/PATCH as per your backend
  }
  getDateWithMonthId(data: any) {
    return this.http.post(`${this.env.base_url}/getdatemore`, data); // Use PUT/PATCH as per your backend
  }
  updateDateTour(data: any) {
    return this.http.post(`${this.env.base_url}/dateOfTour/multipleupdate`, data); // Use PUT/PATCH as per your backend
  }
  updateTransport(id: number, data: any) {
    return this.http.post(`${this.env.base_url}/transports/update/${id}`, data); // Use PUT/PATCH as per your backend
  }
  get4card() {
    return this.http.get(`${this.env.base_url}/four-cards`);
  }
  update4card(id: number, data: any) {
    return this.http.post(`${this.env.base_url}/four-cards/${id}`, data);
  }
  gettopimage() {
    return this.http.get(`${this.env.base_url}/topimagess`);
  }
  updatetopimage(id: number, data: FormData) {
    return this.http.post(`${this.env.base_url}/topimg/update/${id}`, data);
  }

  getUserPlanTrip() {
    return this.http.get(`${this.env.base_url}/trips`);

  }
  DeleteUserPlanTrip(id: any) {
    return this.http.delete(`${this.env.base_url}/trips/${id}`);

  }

  // ********************LOGIN ADMIN ************************

  loginAdmin(data: FormData) {

    return this.http.post(`${this.env.base_url}/login`, data);
  }

  // image gallary*************
  imageGallary(data: FormData, id: any) {
    return this.http.post(`${this.env.base_url}/gellery/${id}`, data);
  }

  imagereplaceGallary(data: FormData, id: any) {
    return this.http.post(`${this.env.base_url}/gellery/${id}/replace`, data);
  }

  loadimagereplaceGallary(id: any) {
    return this.http.get(`${this.env.base_url}/gellery/${id}`);
  }


  getOrderData() {
    return this.http.get(`${this.env.base_url}/order`);
  }

  getOrderById(id: Number) {
    return this.http.get(`${this.env.base_url}/orderbyid/${id}`);
  }

  deleteOrderById(id: any) {
    return this.http.delete(`${this.env.base_url}/delete_order/${id}`)
  }

  registerHotelVendor(data: any) {
    return this.http.post(`${this.env.base_url}/vendor/register`,data)
  }

  loginHotelVendor(data: FormData) {
    return this.http.post(`${this.env.base_url}/vendor/login`,data)
  }

  addhotelrooms(data: FormData) {
    return this.http.post(`${this.env.base_url}/hotel-rooms`,data);
  }
// ***************************** 
  // gethotelroom(id: any) {
  //   return this.http.get(`${this.env.base_url}/hotel-rooms/${id}`);
  // }

  // ************************
  gethotelroom(hotelid:any,roomid:any) {
    return this.http.get(`${this.env.base_url}/hotels/${hotelid}/rooms/${roomid}`);
  }

  getAllHotelRooms() {
    return this.http.get(`${this.env.base_url}/hotel-rooms`);
  }

  updateRoomData(data: FormData, id: any) {

    return this.http.post(`${this.env.base_url}/hotel-rooms/${id}`, data)
  }

  deleteRoomData(id: any) {

    return this.http.delete(`${this.env.base_url}/hotel-rooms/${id}`)
  }

  getHotelboking() {
    return this.http.get(`${this.env.base_url}/bookings`);
  }
  
  // add room no to booking
  setRoomno(bookingdata: any, bookingid: any){
    return this.http.post(`${this.env.base_url}/bookings/addroomno/${bookingid}`, bookingdata);
  }
  
  notifications(){
    return this.http.get(`${this.env.base_url}/bookings/nortification/roomno`);
   }

   updateNotification(id: any, data: any){
    return this.http.post(`${this.env.base_url}/vendor/${id}/update-name-email/`, data);
    }

    getvendorDetails(id: any){
      return this.http.get(`${this.env.base_url}/get/vendor/${id}`);
    }
    getvendoralldata(id:any){
      return this.http.get(`${this.env.base_url}/vendor/alldata/${id}`);

    }
    getbookingDetails(id: any){
      return this.http.get(`${this.env.base_url}/bookings/wholebookingdata/${id}`);
    }
      userDataForHotelDeskboard(id: any){
      return this.http.get(`${this.env.base_url}/bookings/recentlybooking/${id}`);
      }



  // *************************hotel policy api*****************

cancelPolisy( data: any, id: any){
    return this.http.post(`${this.env.base_url}/hotel/${id}/cancellation`, data);
}
 privacyPolisy1( data: any, id: any){
    return this.http.post(`${this.env.base_url}/hotel/${id}/privacy`, data);
}
  termsPolisy( data: any, id: any){
    return this.http.post(`${this.env.base_url}/hotel/${id}/terms`, data);
  }

  paymentPolisy( data: any, id: any){

    return this.http.post(`${this.env.base_url}/hotel/${id}/payment`, data);
  }

  chancalatiPolisy(){
    // demo for hostign 
  }
  privacyPolisy(){
      // demo for hostign 
  }
}