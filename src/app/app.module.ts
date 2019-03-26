import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, Router } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ImageModalPageModule } from './image-modal/image-modal.module';
import { FCM } from '@ionic-native/fcm/ngx';
import { Network } from '@ionic-native/network/ngx';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    providers: [
        StatusBar,
        SplashScreen,
        Camera,
        HTTP,
        Geolocation,
        Network,
        InAppBrowser,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        FCM,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ],
    imports: [

        BrowserModule,
        HttpClientModule,
        HttpModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        ImageModalPageModule
    ],


    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private router: Router) {

    }
}
