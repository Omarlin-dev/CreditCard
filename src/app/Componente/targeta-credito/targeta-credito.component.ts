import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TargetaService } from 'src/app/service/targeta.service';

@Component({
  selector: 'app-targeta-credito',
  templateUrl: './targeta-credito.component.html',
  styleUrls: ['./targeta-credito.component.css']
})
export class TargetaCreditoComponent implements OnInit {

  listTargeta: any[] = [];
  form: FormGroup;
  accion = "agregar";
  id: number| undefined;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private servicio: TargetaService) {

    this.form = fb.group({
      titular: ['', Validators.required],
      numeroTargeta: ['', [Validators.required, Validators.maxLength(16) , Validators.minLength(16)]],
      fechaExpiracion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    });

   }

  ngOnInit(): void {
    this.obtenerTargeta();
  }

  obtenerTargeta(){
    this.servicio.getTargeta().subscribe(data =>{
      this.listTargeta = data;
    });
  }

  GuardarTargeta(){

    const targeta: any = {
      titular: this.form.get('titular')?.value,
      numeroTargeta: this.form.get('numeroTargeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value
    }

    if(this.id == undefined){

      //Agregar una targeta
      this.servicio.GuardarTargeta(targeta).subscribe(data =>{
        this.toastr.success('La targeta fue registrada', 'Targeta Registrada');
        this.obtenerTargeta();
        this.form.reset();
      }, error=>{
        this.toastr.error('Opss... ocurrio un error', 'Error al agregar la targeta');
        console.log(error);
      });

    }else{
      //Editar una targeta
      targeta.id = this.id;
      this.servicio.EditarTargeta(this.id,targeta).subscribe(data =>{
        this.toastr.success('La targeta fue editada', 'Targeta editada');
        this.obtenerTargeta();
        this.form.reset();
        this.id = undefined;
      }, error=>{
        this.toastr.error('Opss... ocurrio un error', 'Error al agregar la targeta');
        console.log(error);
      });

    }

    
  }

  Eliminar(id: number){
    this.servicio.eliminarTargeta(id).subscribe(data=>{
      this.toastr.error(data.mensaje, 'Targeta eliminada');
      this.obtenerTargeta();
    });
  }

  EditarTargeta(targeta: any){
    this.accion = "editar";
    this.id = targeta.id;

    this.form.patchValue({
        titular: targeta.titular,
        numeroTargeta: targeta.numeroTargeta,
        fechaExpiracion: targeta.fechaExpiracion,
        cvv: targeta.cvv
    });


  }

}
