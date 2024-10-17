# Practica5

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 15.2.4.

## Servidor de desarrollo

Ejecuta `ng serve` para un servidor de desarrollo. Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si cambias alguno de los archivos fuente.

## Generación de código

Ejecuta `ng generate component nombre-del-componente` para generar un nuevo componente. También puedes usar `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Construcción

Ejecuta `ng build` para construir el proyecto. Los artefactos de la construcción se almacenarán en el directorio `dist/`.

## Ejecución de pruebas unitarias

Ejecuta `ng test` para ejecutar las pruebas unitarias a través de [Karma](https://karma-runner.github.io).

## Ejecución de pruebas de extremo a extremo

Ejecuta `ng e2e` para ejecutar las pruebas de extremo a extremo a través de una plataforma de tu elección. Para usar este comando, primero necesitas agregar un paquete que implemente capacidades de pruebas de extremo a extremo.

## Frontends

El proyecto cuenta con dos frontends:

1. **Frontend con Mapa**: Muestra un listado de embalses de ejemplo en local que no están sacados de la base de datos.
2. **Frontend de Peticiones HTTP**: Intenta realizar las peticiones HTTP al backend, muestra la lista de embalses y permite al usuario elegir su ubicación. Sin embargo, actualmente hay un problema en el que no imprime correctamente la respuesta de las peticiones.

## Problemas del Backend

El principal problema del backend ha sido que no funciona si no se instalan ciertas dependencias de Oracle. Esto ha generado dificultades durante el desarrollo y pruebas, ya que es necesario tener configuradas estas dependencias para poder realizar las peticiones correctamente.

## Ayuda adicional

Para obtener más ayuda sobre Angular CLI, utiliza `ng help` o consulta la [Descripción general de Angular CLI y referencia de comandos](https://angular.io/cli).

