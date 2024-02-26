import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AfiliadosService {
  private apiUrl = 'http://localhost:8080/api/afiliados';

  constructor() {}

  getAfiliados(): Promise<any[]> {
    return fetch(this.apiUrl)
      .then(response => response.json())
      .catch(error => {
        console.error('Error fetching afiliados:', error);
        throw error;
      });
  }

  addAfiliado(afiliado: any): Promise<any> {
    console.log('afiliado: ', afiliado);
    return fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(afiliado),
    })
      .then(response => response.json())
      .catch(error => {
        console.error('Error adding afiliado:', error);
        throw error;
      });
  }

  editarAfiliado(id: number, nuevosDatos: any): Promise<void> {
    console.log('nuevosDatos: ', nuevosDatos);
    const url = `${this.apiUrl}/${id}`;
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevosDatos),
    };
  
    return fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error en la solicitud de edición: ${response.status} - ${response.statusText}`);
        }
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }
  

  eliminarAfiliado(id: number): Promise<void> {
    const url = `${this.apiUrl}/${id}`;
    return fetch(url, {
      method: 'DELETE'
    })
      .then(() => {
        console.log('Afiliado eliminado exitosamente');
      })
      .catch(error => {
        console.error('Error eliminando afiliado:', error);
        throw error;
      });
  }
}
