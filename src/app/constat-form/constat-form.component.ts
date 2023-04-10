import { Component,ViewChild,ElementRef  } from '@angular/core';
import {Form, FormBuilder , FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { MatExpansionPanel } from '@angular/material/expansion';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { MatCheckboxChange } from '@angular/material/checkbox';



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
  
  driverIsInsured:boolean= false
  isExpansionPanelOpen = false;
  isLienar:boolean =true ;
  isButtonDisabled: boolean = true;
  sides: string[] = ['Garde-boue avant', 'Garde-boue arrière', 'Cotes Conducteur', 'Cotes passagers'];
  
  toggleExpansion() {
    this.isExpansionPanelOpen = !this.isExpansionPanelOpen;
  }    
  convertedDate: string |any;
  convertDate(value: string) {
    const parts = value.split('/');
    const year = parts[2];
    const month = parts[1];
    const day = parts[0];
    const convertedDate = `${year}-${month}-${day}`;
   
    return convertedDate;
  }
  isDis:boolean =true
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  onSubmit(): void {
    const dateInput = document.getElementById('date-input') as HTMLInputElement;
    const dateValue = dateInput.value;
    const convertedDate = this.convertDate(dateValue);
    let formData = {
      accident: this.Accident.value,
      
    };
    
    console.log(this.Accident.value);

    

    // this.authService.registerConstat(formData,convertedDate).subscribe({
    //   next: data => {
    //     console.log(data);
    //     this.isSuccessful = true;
    //     this.isSignUpFailed = false;
    //   },
    //   error: err => {
    //     this.errorMessage = err.error.message;
    //     this.isSignUpFailed = true;
    //   }
    // });
      }
      

      
  constructor(private _formBuilder: FormBuilder,private authService: AuthService) {
    
    this.Accident = this._formBuilder.group({
      date: ['', Validators.required],
      place: ['', Validators.required],
      injuries:['',Validators.required],
      materialDamage: ['',Validators.required],
    
      witnessFullName: ['', Validators.required],
      witnessAddress:['',Validators.required],
      witnessPhone: ['',Validators.required],
   
        insuredLastName: ['', Validators.required],
        insuredFirstName: ['', Validators.required],
        insuredPhone:['',Validators.required],
        insuredAddress: ['',Validators.required],
        insuredLicenceNumber :[{ value: "", disabled: true }, Validators.required],
        insuredLicenceDate :[{ value: "", disabled: true }, Validators.required],

        driverIsInsured: [true] ,

        driverLastName:[{ value: "", disabled: false }, Validators.required],
        driverFirstName:[{ value: "", disabled: false }, Validators.required],
        driverAddress:[{ value: "", disabled: false }, Validators.required],
        licenceNumber :[{ value: "", disabled: false }, Validators.required],
        licenceDate :[{ value: "", disabled: false }, Validators.required],
        
     
        carBrand: ['', Validators.required],
        carPlate:['',Validators.required],
        carType:['',Validators.required],
        carDirection:['',Validators.required],
        apperantDamage:['',Validators.required],
        enStationnement: false,
        quittaitStationnement: false,
        prenaitStationnement: false,
        sortaitParking: false,
        engageaitParking: false,
        arretCirculation: false,
        frottementSansChangement: false,
        heurtaitArriere: false,
        roulaitMemeSens: false,
        changeaitDeFile: false,
        viraitDroite: false,
        viraitGauche: false,
        reculait: false,
        empietaitVoieInverse: false,
        venaitDeDroite: false,
        nonRespectPriorite: false,
        obstacleNonMobile: false,
        
      });
      
  }
  
  disableField(checked :any) {
    Object.keys(this.f).forEach(key => {
      if (checked) {
        this.f['insuredLicenceNumber'].enable();
        this.f['insuredLicenceDate'].enable();
        this.f['driverLastName'].disable();
        this.f['driverFirstName'].disable();
        this.f['driverAddress'].disable();
        this.f['licenceNumber'].disable();
        this.f['licenceDate'].disable();

      } else {
        this.f['insuredLicenceNumber'].disable();
        this.f['insuredLicenceDate'].disable();
        this.f['driverLastName'].enable();
        this.f['driverFirstName'].enable();
        this.f['driverAddress'].enable();
        this.f['licenceNumber'].enable();
        this.f['licenceDate'].enable();
      }
    });
  }
  selectedValues: string[] = [];

  onCheckboxChange(event: any) {
    const checkedValues = event.source.value; // Get the value of the checkbox that was changed
    console.log(checkedValues); // Log the checked values to the console
    // You can now send the checkedValues to the backend or manipulate them as needed
  }
  get f() {
    return this.Accident.controls;
  }
  ngOnInit() {
    this.filteredOptions = this.Accident.controls['carBrand'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }
  private _filter(value: any): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  

  @ViewChild('canvas1', { static: true })
  canvas1!: ElementRef<any>;
  @ViewChild('canvas2', { static: true })
  canvas2!: ElementRef<any>;

  isCanvasPainted1 = false;
  isCanvasPainted2 = false;

  ngAfterViewInit() {
    const canvas1 = this.canvas1.nativeElement;
    const ctx1 = canvas1.getContext('2d');
    let isDrawing1 = false;
    let lastX1 = 0;
    let lastY1 = 0;

    canvas1.addEventListener('mousedown', (event: any) => {
      if (event.shiftKey) { // Use shift key to activate eraser
        isDrawing1 = false;
        const eraseX = event.offsetX - 10;
        const eraseY = event.offsetY - 10;
        const eraseWidth = 20;
        const eraseHeight = 20;
        ctx1.clearRect(eraseX, eraseY, eraseWidth, eraseHeight);
      } else {
        isDrawing1 = true;
        lastX1 = event.offsetX;
        lastY1 = event.offsetY;
      }
    });

    canvas1.addEventListener('mouseup', () => {
      isDrawing1 = false;
      this.isCanvasPainted1 = true; // Set the flag to true
    });

    canvas1.addEventListener('mousemove', (event: any) => {
      if (isDrawing1) {
        ctx1.beginPath();
        ctx1.moveTo(lastX1, lastY1);
        ctx1.lineTo(event.offsetX, event.offsetY);
        ctx1.stroke();
        lastX1 = event.offsetX;
        lastY1 = event.offsetY;
      }
    });

    canvas1.addEventListener('mouseup', () => {
      isDrawing1 = false;
    });

    const canvas2 = this.canvas2.nativeElement;
    const ctx2 = canvas2.getContext('2d');
    let isDrawing2 = false;
    let lastX2 = 0;
    let lastY2 = 0;

    canvas2.addEventListener('mousedown', (event: any) => {
      if (event.shiftKey) { // Use shift key to activate eraser
        isDrawing2 = false;
        const eraseX = event.offsetX - 10;
        const eraseY = event.offsetY - 10;
        const eraseWidth = 20;
        const eraseHeight = 20;
        ctx2.clearRect(eraseX, eraseY, eraseWidth, eraseHeight);
      } else {
        isDrawing2 = true;
        lastX2 = event.offsetX;
        lastY2 = event.offsetY;
      }
    });

    canvas2.addEventListener('mouseup', () => {
      isDrawing2 = false;
      this.isCanvasPainted2 = true; // Set the flag to true
    });

    canvas2.addEventListener('mousemove', (event: any) => {
      if (isDrawing2) {
        ctx2.beginPath();
        ctx2.moveTo(lastX2, lastY2);
        ctx2.lineTo(event.offsetX, event.offsetY);
        ctx2.stroke();
        lastX2 = event.offsetX;
        lastY2 = event.offsetY;
      }
    });

    canvas2.addEventListener('mouseup', () => {
      isDrawing2 = false;
    });
  }
  erase1() {
    const canvas1 = this.canvas1.nativeElement;
    const ctx1 = canvas1.getContext('2d');
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height); // clear the entire canvas
    this.isCanvasPainted1 = false; // set the flag to false
  }
  erase2() {
    const canvas2 = this.canvas2.nativeElement;
    const ctx2 = canvas2.getContext('2d');
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    this.isCanvasPainted2 = false; // Set the flag to false
  }
  sendPaintedCanvas1() {
    const canvas = this.canvas1.nativeElement;
    const paintedImage = canvas.toDataURL();
    console.log(paintedImage);
  }
  sendPaintedCanvas2() {
    const canvas = this.canvas2.nativeElement;
    const paintedImage = canvas.toDataURL();
    console.log(paintedImage);
  }
  validateCanvas2(): boolean {
    const isValid = this.isCanvasPainted2;
    if (isValid) {
      console.log('Canvas is valid.');
    } else {
      console.log('Canvas is not valid.');
    }
    return isValid;
  }
  validateCanvas1(): boolean {
    const isValid = this.isCanvasPainted1;
    if (isValid) {
      console.log('Canvas is valid.');
    } else {
      console.log('Canvas is not valid.');
    }
    return isValid;
  }






}
