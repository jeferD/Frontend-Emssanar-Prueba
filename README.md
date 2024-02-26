# Prueba Emssanar Angular

Este proyecto de frontend está desarrollado en Angular y utiliza Bootstrap y SweetAlert2 para la interfaz de usuario. A continuación, se proporciona información sobre la estructura del código y los componentes clave en la aplicación.

## Estructura del Código

El código fuente se organiza en los siguientes directorios:

- **Afiliados Component:**
  - Ruta: `src/app/components/afiliados/afiliados.component.ts`
  - Contiene la lógica del componente para gestionar la información de los afiliados.
  
- **Header Component:**
  - Ruta: `src/app/components/header/header.component.ts`
  - Contiene la lógica del componente para el encabezado de la aplicación.
  
- **Header Component HTML:**
  - Ruta: `src/app/components/header/header.component.html`
  - Contiene la plantilla HTML para el componente de encabezado.

- **Afiliados Component HTML:**
  - Ruta: `src/app/components/afiliados/afiliados.component.html`
  - Contiene la plantilla HTML para el componente de afiliados.

- **Afiliados Service:**
  - Ruta: `src/app/services/afiliados.service.ts`
  - Contiene el servicio Angular para gestionar la lógica relacionada con los afiliados.

- **App Module:**
  - Ruta: `src/app/app.module.ts`
  - Contiene la configuración principal del módulo Angular y las importaciones de los componentes y servicios.
## Servicio Afiliados

### Afiliados Service

El servicio `AfiliadosService` se encarga de realizar operaciones relacionadas con los afiliados mediante peticiones HTTP. A continuación, se detallan los métodos principales:

1. **`getAfiliados(): Promise<any[]>`:**
   - Descripción: Obtiene la lista de afiliados desde el servidor.
   - Uso:
     ```typescript
     afiliadosService.getAfiliados().then(afiliados => {
       console.log('Lista de Afiliados:', afiliados);
     });
     ```

2. **`addAfiliado(afiliado: any): Promise<any>`:**
   - Descripción: Agrega un nuevo afiliado al servidor.
   - Uso:
     ```typescript
     const nuevoAfiliado = { /* datos del nuevo afiliado */ };
     afiliadosService.addAfiliado(nuevoAfiliado).then(afiliadoAgregado => {
       console.log('Afiliado Agregado:', afiliadoAgregado);
     });
     ```

3. **`editarAfiliado(id: number, nuevosDatos: any): Promise<void>`:**
   - Descripción: Edita los datos de un afiliado existente en el servidor.
   - Uso:
     ```typescript
     const idAfiliado = 1; // ID del afiliado a editar
     const nuevosDatosAfiliado = { /* nuevos datos del afiliado */ };
     afiliadosService.editarAfiliado(idAfiliado, nuevosDatosAfiliado).then(() => {
       console.log('Afiliado Editado Exitosamente');
     });
     ```

4. **`eliminarAfiliado(id: number): Promise<void>`:**
   - Descripción: Elimina un afiliado existente en el servidor.
   - Uso:
     ```typescript
     const idAfiliadoEliminar = 1; // ID del afiliado a eliminar
     afiliadosService.eliminarAfiliado(idAfiliadoEliminar).then(() => {
       console.log('Afiliado Eliminado Exitosamente');
     });
     ```

Estos métodos utilizan la función `fetch` para realizar peticiones HTTP al servidor backend. Asegúrate de tener el servidor backend en ejecución y que las rutas coincidan con la configuración de tu backend.

## Instalación de Dependencias

El proyecto utiliza las siguientes dependencias, que deben ser instaladas para ejecutar la aplicación:

- **Bootstrap:**
  - Instalación: `npm install bootstrap`
  - Descripción: Bootstrap es un marco de diseño que se utiliza para mejorar la apariencia y la usabilidad de la interfaz de usuario.

- **SweetAlert2:**
  - Instalación: `npm install sweetalert2`
  - Descripción: SweetAlert2 es una biblioteca para crear ventanas modales y mensajes de alerta atractivos.

## Requisitos del Sistema

- Node.js
- npm (Node Package Manager)

## Ejecución del Proyecto

1. Clona el repositorio:

   ```bash
   git clone https://github.com/jeferD/Frontend-Emssanar-Prueba.git

2. Correr proyecto:

   ```bash
   ng server