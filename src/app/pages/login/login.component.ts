import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { EquipService } from '../../services/equip.service';

import { SimpleGlobal } from 'ng2-simple-global';

import 'particles.js/particles';
declare var particlesJS:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService, EquipService]
})
export class LoginComponent implements OnInit {
  public router: Router;
  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public error:boolean = false;

  constructor(
    router:Router, 
    fb:FormBuilder, 
    public serv:UserService, 
    public eserv:EquipService,
    private sg:SimpleGlobal
  ) { 
    this.router = router;
    this.form = fb.group({
        'email': ['', Validators.compose([Validators.required])],
        'password': ['', Validators.compose([Validators.required])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  ngOnInit() {
    
    particlesJS('particles-js',
        {
            "particles": {
            "number": {
                "value": 80,
                "density": {
                "enable": true,
                "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                "width": 0,
                "color": "#000000"
                },
                "polygon": {
                "nb_sides": 5
                },
                "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
                }
            },
            "size": {
                "value": 5,
                "random": true,
                "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
                }
            }
            },
            "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                "enable": true,
                "mode": "repulse"
                },
                "onclick": {
                "enable": true,
                "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 1
                }
                },
                "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
                },
                "repulse": {
                "distance": 200
                },
                "push": {
                "particles_nb": 4
                },
                "remove": {
                "particles_nb": 2
                }
            }
            },
            "retina_detect": true,
            "config_demo": {
            "hide_card": false,
            "background_color": "#b61924",
            "background_image": "",
            "background_position": "50% 50%",
            "background_repeat": "no-repeat",
            "background_size": "cover"
            }
        }

        );
  }

  public onSubmit(values:any):void {
      if (this.form.valid) {
          this.serv.UserLogin(values, (res)=>{
              if(res == 'error')
                  this.error = true;
              else{
                  this.sg['userId'] = values.email;

                  var exp = new Date();
                  exp.setTime(exp.getTime() + 30 * 60 * 1000);
                  document.cookie = 'userId=' + values.email + ';expires=' + exp.toUTCString();

                  if(values.email == 'admin@hzspec-unicorn.com')
                      this.router.navigate(['/pages/admindash/']);
                  else{
                      this.eserv.getAllRouter(values.email, res=>{
                          let apmac = res.apMacAddr;
                          document.cookie = 'apMac=' + apmac + ';expires=' + exp.toUTCString();

                          this.router.navigate(['/dashboard/']);
                      });
                  }
                      
              }
          });
      }
  }

}

export function emailValidator(control: FormControl): {[key: string]: any} {
    var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;    
    if (control.value && !emailRegexp.test(control.value)) {
        return {invalidEmail: true};
    }
}
