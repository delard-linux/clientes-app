import { Component } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent {

  cliente: Cliente = new Cliente();
  titulo: string = "Crear Cliente";

  constructor(private clienteService: ClienteService,
    private router: Router){}

  public create(): void {
    console.log(`Clicked! to create ${this.cliente.nombre}`);
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes']);
        Swal.fire('nuevo cliente',`Cliente ${cliente.nombre} creado con éxito!`,'success');
      }
        );

  }

}
