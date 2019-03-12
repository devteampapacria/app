import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-network-error',
  templateUrl: './network-error.page.html',
  styleUrls: ['./network-error.page.scss'],
})
export class NetworkErrorPage implements OnInit {

  constructor(private router: Router, private network: Network) {
    // watch network for a connection
    this.network.onConnect().subscribe(() => {
      this.router.navigateByUrl('/home');
    });

  }

  ngOnInit() {
  }

}
