import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-geolocalizacion',
  templateUrl: './geolocalizacion.page.html',
  styleUrls: ['./geolocalizacion.page.scss'],
})
export class GeolocalizacionPage implements OnInit {
  private id;
  constructor(private route: ActivatedRoute) { 
    alert(this.id);
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

}
