import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
declare function customInit():any;
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {
 

  constructor(private settingService: SettingsService) { }

  ngOnInit(): void {

    // ./assets/css/colors/default-dark.css
    customInit();
  }






}
