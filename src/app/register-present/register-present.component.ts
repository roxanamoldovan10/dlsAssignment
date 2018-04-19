import { Component, OnInit } from '@angular/core';
import { RollCallService, AlertService, RegisterService } from '../services/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-present',
  templateUrl: './register-present.component.html',
  styleUrls: ['./register-present.component.css']
})
export class RegisterPresentComponent implements OnInit {
  code: number;
  network: boolean;
  registered: boolean;

  constructor(
    private rollCallService: RollCallService,
    public registerService: RegisterService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  submit(code) {
    this.checkNetwork();
    this.rollCallService.getCode(code)
    .subscribe(
      (res:any)=> {
        // OK
        var user = localStorage.getItem('currentUser');
        var today = new Date();
        var date = new Date(res.result.date);
        // date when the code has been generated + 60 min
        var timer = today.getTime() <= (date.getTime() + 60*60000);

        if(timer){
          this.registerService.register(user, code)
          .subscribe(
            (res:Response)=> {
              this.registered = true;
            }, (error)=> {
              this.alertService.error("Wrong credentials");
            } 
          );
        }
      }, (error)=> {
        this.registered = false;
        this.alertService.error("Wrong credentials");
      } 
    );
  }

  checkNetwork() {
    
  }
}
