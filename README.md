# Malackathon-SoftIV

Este repositorio contiene el código fuente de una aplicación web diseñada para mostrar embalses dentro de un radio definido por el usuario y filtrarlos según características específicas. Este proyecto fue desarrollado para la Malackathon el 17 de octubre de 2024 por ETSII Informática.

## Base de Datos

Se cargaron los datasets `agua.csv`, `embalses.csv` y `listado.tsv` en una base de datos autónoma de Oracle Cloud. Inicialmente, los datos en estos archivos no estaban en un formato limpio y consistente, lo que ocasionó problemas durante el desarrollo.

Uno de los principales desafíos fue que las tablas `listado` y `embalses` estaban vinculadas por nombres de embalses en lugar de un identificador único. Esto requirió una limpieza de datos significativa para asegurar que los nombres coincidieran correctamente. Además, había inconsistencias en el formato de los datos entre los archivos, lo que complicaba la unión de tablas y las consultas en la base de datos.

Para solucionar estos problemas, realizamos varios pasos de limpieza de datos para estandarizar nombres, eliminar duplicados y asegurar consistencia en los datasets. A pesar de la limpieza, las consultas siguieron siendo complejas debido a la falta de identificadores únicos adecuados en algunas tablas, lo que aumentó el tiempo y la complejidad del desarrollo.

## Frontend

El frontend de la aplicación se construyó utilizando Angular 18. Permite a los usuarios interactuar con el mapa, establecer el radio y filtrar embalses según varias características.

Para garantizar el correcto funcionamiento de la aplicación, utilizamos datos de ejemplo durante el desarrollo. Esto nos permitió visualizar en tiempo real cómo se vería y comportaría la página web, lo que ayudó a identificar áreas para mejorar.

## Backend

El backend fue desarrollado en Go y gestiona la comunicación entre el frontend y la base de datos. Procesa las solicitudes de los usuarios, recupera los datos de la base de datos y devuelve los resultados filtrados.

## Diseño y Funcionalidad

El diseño de la aplicación es funcional, pero podría mejorarse con más tiempo. Nos enfocamos principalmente en entregar un producto funcional, prestando menos atención a la estética. Con más tiempo, podríamos refinar la interfaz de usuario y mejorar la experiencia general.

