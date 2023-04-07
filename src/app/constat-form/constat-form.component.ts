import { Component,ViewChild  } from '@angular/core';
import {Form, FormBuilder , FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { MatExpansionPanel } from '@angular/material/expansion';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';



@Component({
  selector: 'app-constat-form',
  templateUrl: './constat-form.component.html',
  styleUrls: ['./constat-form.component.css'],providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ]
})
export class ConstatFormComponent {
  @ViewChild('myPanel') myPanel: MatExpansionPanel |any;
  
  options: any[] = ['Alfa Romeo','Audi','BAIC YX','BMW','Chery',
  'Chevrolet','Citroën','Dacia','DFSK','Dongfeng'
  ,'Fiat','Ford','Foton','Geely','Great Wall','Haval',
  'Honda','Hyundai','Isuzu','Jaguar','Jeep','Kia'
  ,'Lada','Land Rover','Mahindra','Mazda','Mercedes',
  'MG Motors','Mini','Mitsubitshi','Nissan',
  'Opel','Peugeot','Porshe','Renault','Seat',
  'Škoda','SsangYong','Suzuki','Toyota','Volkswagen',
  'volkswagen Utilitaires','Wallys'];
  filteredOptions?: Observable<any[]>;
  Accident:FormGroup |any
  Optional:FormGroup |any
  assureeConducteur:FormGroup |any
  vehicule :FormGroup |any
  driverIsInsured:boolean= false
  isExpansionPanelOpen = false;
  isLienar:boolean =true ;
  isButtonDisabled: boolean = true;
 


  toggleExpansion() {
    this.isExpansionPanelOpen = !this.isExpansionPanelOpen;
  }    
  isDis:boolean =true
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  onSubmit(): void {
    let formData = {
      accident: this.Accident.value,
      optional: this.Optional.value,
      assureeConducteur: this.assureeConducteur.value
    };
    this.authService.registerConstat(formData.accident,formData.assureeConducteur,formData.optional ).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
      }
      
  constructor(private _formBuilder: FormBuilder,private authService: AuthService) {
    this.Accident = this._formBuilder.group({
      date: ['', Validators.required],
      lieu: ['', Validators.required],
      Blessure:['',Validators.required],
      Degats: ['',Validators.required]
    });
    this.Optional = this._formBuilder.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    age:['',Validators.required],
    adrs: ['',Validators.required]
    })
    this.assureeConducteur = this._formBuilder.group({
        nom: ['', Validators.required],
        prenom: ['', Validators.required],
        tel:['',Validators.required],
        adr: ['',Validators.required],
        driverIsInsured: [true] ,
        
        numPA :[{ value: "", disabled: true }, Validators.required],
        datePA :[{ value: "", disabled: true }, Validators.required],
        nomCon:[{ value: "", disabled: false }, Validators.required],
        preCon:[{ value: "", disabled: false }, Validators.required],
        adrCon:[{ value: "", disabled: false }, Validators.required],
        telCon:[{ value: "", disabled: false }, Validators.required],
        numPC :[{ value: "", disabled: false }, Validators.required],
        datePC :[{ value: "", disabled: false }, Validators.required]
        
      });  
      this.vehicule = this._formBuilder.group({
        marque: ['', Validators.required],
        serie:['',Validators.required],
        deb:['',Validators.required],
        fin:['',Validators.required]
        
      })
  }
  disableField(checked :any) {
    Object.keys(this.f).forEach(key => {
      if (checked) {
        this.f['numPA'].enable();
        this.f['datePA'].enable();
        this.f['nomCon'].disable();
        this.f['preCon'].disable();
        this.f['adrCon'].disable();
        this.f['telCon'].disable();
        this.f['numPC'].disable();
        this.f['datePC'].disable();

      } else {
        this.f['numPA'].disable();
        this.f['datePA'].disable();
        this.f['nomCon'].enable();
        this.f['preCon'].enable();
        this.f['adrCon'].enable();
        this.f['telCon'].enable();
        this.f['numPC'].enable();
        this.f['datePC'].enable();
      }
    });
  }
  get f() {
    return this.assureeConducteur.controls;
  }
  ngOnInit() {
    this.filteredOptions = this.vehicule.controls['marque'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }
  private _filter(value: any): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
