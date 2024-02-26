// Importa SweetAlert2
import Swal from 'sweetalert2';

// En el componente afiliados.component.ts

import { Component, OnInit } from '@angular/core';
import { AfiliadosService } from '../../services/afiliados.service';

@Component({
  selector: 'app-afiliados',
  templateUrl: './afiliados.component.html',
  styleUrls: ['./afiliados.component.css']
})
export class AfiliadosComponent implements OnInit {
  //variables
  afiliados: any[] = [];
  nuevoAfiliado: any = {};
  afiliadoSeleccionado: any = {}; 

  


  constructor(private afiliadosService: AfiliadosService) {}

  ngOnInit(): void {
    //al cargar la pagina lo primero que se hace es hacer la peticion de consulta GET para traer los usuarios que estan registrados
    this.cargarAfiliados();
  }

  cargarAfiliados(): void {
    //afiliadosService es la instancia para hacer uso de los metodos de peticion que se crearon en service
    this.afiliadosService.getAfiliados()
      .then(afiliados => this.afiliados = afiliados)
      .catch(error => console.error('Error cargando afiliados:', error));
  }

  //metodo para crear afiliado
  addAfiliado(): void {
    this.afiliadosService.addAfiliado(this.nuevoAfiliado)
      .then(() => {
        console.log('Afiliado agregado exitosamente');
        this.mostrarAlerta('Éxito', 'Afiliado agregado exitosamente', 'success');
        this.cargarAfiliados(); // Recargar la lista después de agregar un afiliado
        this.nuevoAfiliado = {}; // Limpiar el objeto para el próximo afiliado
      })
      .catch(error => {
        console.error('Error agregando afiliado:', error);
        this.mostrarAlerta('Error', 'Error agregando afiliado', 'error');
      });
  }

  //metodo de editar afiliado mostrando una venta de swalert 2 que me va a permitir hacer la funcion de formulario
  editarAfiliado(id: number, afiliado: any): void {
    // Almacena el afiliado seleccionado
    this.afiliadoSeleccionado = { ...afiliado };

    console.log('Afiliado seleccionado:------------------', this.afiliadoSeleccionado);
  
    // Cree el formulario de edición con SweetAlert2
    Swal.fire({
      title: 'Editar Afiliado',
      html: `
        <form id="editarAfiliadoForm" class="text-left">
          <div class="form-group row">
            <label for="nombre" class="col-md-4 col-form-label">Nombre:</label>
            <div class="col-md-8">
              <input type="text" id="Swnombre" class="form-control" [(ngModel)]="this.afiliadoSeleccionado.nombre" required>
            </div>
          </div>
  
          <div class="form-group row">
            <label for="fechaNacimiento" class="col-md-4 col-form-label">Fecha de Nacimiento:</label>
            <div class="col-md-8">
              <input type="date" id="SwfechaNacimiento" class="form-control" [(ngModel)]="this.afiliadoSeleccionado.fechaNacimiento" required>
            </div>
          </div>
  
          <div class="form-group row">
            <label for="direccion" class="col-md-4 col-form-label">Dirección:</label>
            <div class="col-md-8">
              <input type="text" id="Swdireccion" class="form-control" [(ngModel)]="this.afiliadoSeleccionado.direccion" required>
            </div>
          </div>
  
          <div class="form-group row">
            <label for="telefono" class="col-md-4 col-form-label">Teléfono:</label>
            <div class="col-md-8">
              <input type="text" id="Swtelefono" class="form-control" [(ngModel)]="this.afiliadoSeleccionado.telefono" required>
            </div>
          </div>
  
          <div class="form-group row">
            <label for="genero" class="col-md-4 col-form-label">Género:</label>
            <div class="col-md-8">
              <select id="Swgenero" class="form-control" [(ngModel)]="this.afiliadoSeleccionado.genero" required>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>
          </div>
        </form>
      `,
      showCancelButton: true,
      confirmButtonText: 'Guardar cambios',
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      didRender: () => {
        const popup = Swal.getPopup();
        if (popup) {
          //obtengo con el ddoom para poder agregar los valores de la fila seleccionada
            const valorNombre = document.querySelector('#Swnombre') as HTMLInputElement;
            const valorFechaNacimiento = document.querySelector('#SwfechaNacimiento') as HTMLInputElement;
            const valorDireccion = document.querySelector('#Swdireccion') as HTMLInputElement;
            const valorTelefono = document.querySelector('#Swtelefono') as HTMLInputElement;
            const valorGenero = document.querySelector('#Swgenero') as HTMLInputElement;
    
            if (valorNombre && valorFechaNacimiento && valorDireccion && valorTelefono && valorGenero) {
                try {
                  //agregao y valido que existan los vcampos, si exxisten asigno valores
                    valorNombre.value = this.afiliadoSeleccionado.nombre;
                    valorFechaNacimiento.value = this.afiliadoSeleccionado.fechaNacimiento;
                    valorDireccion.value = this.afiliadoSeleccionado.direccion;
                    valorTelefono.value = this.afiliadoSeleccionado.telefono;
                    valorGenero.value = this.afiliadoSeleccionado.genero;
                } catch (error) {
                    // Manejar cualquier error que pueda ocurrir al asignar valores
                    console.error('Error al asignar valores:', error);
                }
            } else {
                console.error('Alguno de los elementos no se encontró en la página.');
            }
        } else {
            console.error('Error: No se pudo obtener el elemento del popup.');
        }
      },
    
    
      preConfirm: () => {
        // Obtiene los valores del formulario al confirmar y los envio al metodo actualizarAfiliado
        //
        //getElementValue este metodo me ayuda a obtener los valores de los espacios del form 
        const nombre = this.getElementValue('#Swnombre');
        console.log('nombre: ', nombre);
        const fechaNacimiento = this.getElementValue('#SwfechaNacimiento');
        console.log('fechaNacimiento: ', fechaNacimiento);
        const direccion = this.getElementValue('#Swdireccion');
        const telefono = this.getElementValue('#Swtelefono');
        const genero = this.getElementValue('#Swgenero');
  
        this.actualizarAfiliado(id, { nombre, fechaNacimiento, direccion, telefono, genero });
      }
    });
  }
  
  private getElementValue(selector: string): string {
    const element = document.querySelector(selector) as HTMLInputElement;
    return element ? element.value : '';
  }
  
  

  // Método para actualizar el afiliado después de la edición
  private actualizarAfiliado(id: number, nuevosDatos: any): void {
    this.afiliadosService.editarAfiliado(id, nuevosDatos)
      .then(() => {
        console.log('Afiliado editado exitosamente');
        this.mostrarAlerta('Éxito', 'Afiliado editado exitosamente', 'success');
        this.cargarAfiliados(); // Recargar la lista después de editar un afiliado
      })
      .catch(error => {
        console.error('Error editando afiliado:', error);
        this.mostrarAlerta('Error', 'Error editando afiliado', 'error');
      });
  }

  eliminarAfiliado(id: number): void {
    this.afiliadosService.eliminarAfiliado(id)
      .then(() => {
        console.log('Afiliado eliminado exitosamente');
        this.mostrarAlerta('Éxito', 'Afiliado eliminado exitosamente', 'success');
        this.cargarAfiliados(); // Recargar la lista después de eliminar un afiliado
      })
      .catch(error => {
        console.error('Error eliminando afiliado:', error);
        this.mostrarAlerta('Error', 'Error eliminando afiliado', 'error');
      });
  }

  // Método para mostrar una alerta con SweetAlert2
  mostrarAlerta(titulo: string, mensaje: string, tipo: 'success' | 'error' | 'warning' | 'info' | 'question'): void {
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: tipo,
      confirmButtonText: 'Aceptar'
    });
  }
}
