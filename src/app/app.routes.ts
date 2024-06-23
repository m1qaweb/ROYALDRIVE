import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { DriversComponent } from './drivers/drivers.component';
import { CustomerGalleryComponent } from './customer-gallery/customer-gallery.component'; // Import the new component

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'vehicles', component: VehiclesComponent },
  { path: 'drivers', component: DriversComponent },
  { path: 'customer-gallery', component: CustomerGalleryComponent },
];
