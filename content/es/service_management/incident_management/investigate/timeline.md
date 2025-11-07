---
further_reading:
- link: /service_management/incident_management/investigate/
  tag: Documentación
  text: Investigar las incidencias
title: Cronología
---

## Información general

{{< img src="/service_management/incidents/investigate/timeline/timeline_tab.png" alt="Incidencia de ejemplo que muestra la pestaña Línea temporal" style="width:100%;" >}}

La línea temporal de la incidencia es la principal fuente de información del trabajo realizado durante una incidencia. A medida que se realizan acciones, se añaden nuevas celdas a la línea temporal en orden cronológico para capturar los cambios realizados, la persona que realizó el cambio y la hora en que se realizaron los cambios.

Por defecto, las celdas de la línea temporal se ordenan en `oldest first`, pero puedes cambiarlo a `newest first` utilizando el botón situado en la parte superior de la línea temporal.

## Tipos de contenido

Cada celda tiene su propio tipo de contenido, que indica el tipo de información que contiene:

|  Tipo de contenido      | Descripción                                                                                            |
| ------------------ | ------------------------------------------------------------------------------------------------------ |
| Nota de la persona involucrada     | Nota escrita manualmente por una persona involucrada en una incidencia. Las notas de respuesta tienen los siguientes subtipos:<br>- *Gráfico*: la nota de respuesta contiene uno o más gráficos de Datadog<br> - *Enlace*: la nota de respuesta contiene un hipervínculo<br>- *Código*: la nota de respuesta contiene texto enmascarado en sintaxis Markdown para bloques de código
| Actualización de la incidencia    | Cualquier cambio realizado en las propiedades de una incidencia (incluidos el estado y la gravedad) o su impacto.
| Actualización de la integración | Cualquier cambio realizado a través de las [integraciones][1] del producto Gestión de incidencias.
| Tarea               | Cualquier cambio realizado en las tareas de la incidencia en la sección Remediación de la página Detalles de la incidencia.
| Notificación enviada  | Una actualización cuando una persona involucrada en la incidencia envía una notificación de forma manual.

### Notas de respuesta

Añade notas de respuesta directamente a la línea temporal utilizando el cuadro de texto situado debajo de la pestaña de sección de la página Detalles de la incidencia. También puedes añadir notas de respuesta [a la línea temporal desde Slack][2]. Puedes personalizar la marca temporal de la nota de respuesta en el momento de la creación para capturar información importante que era relevante en un momento anterior en el orden cronológico de la línea temporal. 

Para las notas de respuesta de tu autoría, puedes editar el contenido o la marca temporal, o eliminar la nota por completo. También puedes copiar un enlace a una celda concreta para compartirlo con tus compañeros de equipo. 

### Celdas gráficas

Las definiciones de gráficos se almacenan utilizando URLs compartidas para gráficos si están habilitadas en tus [Parámetros de organización][3]. Durante las 24 horas siguientes a la adición de una celda de gráfico a la línea temporal, ésta tiene los mismos estados flotantes interactivos completos que se encuentran en dashboards, notebooks y otras páginas. Después de 24 horas en la línea temporal, el gráfico se sustituye por imágenes estáticas que capturan lo que el gráfico estaba mostrando. Esto es para asegurar que los gráficos con datos que tienen una corta retención tengan copias de seguridad que puedas ver después de que los datos en vivo para los gráficos expiren.

### Imágenes

Para cargar una imagen en Datadog, suelta un archivo de imagen en el campo de texto situado encima de la línea temporal. Esto añade la imagen como una celda individual en la línea temporal.

También puedes añadir una imagen a una celda existente:  
{{< img src="/service_management/incidents/investigate/timeline/timeline_cell_add_image.png" alt="Descripción de tu imagen" style="width:100%;" >}}
1. Haz clic en el icono del lápiz para editar una celda.  
2. Haz clic en el icono de imagen y localiza la imagen en tu directorio de archivos.  
3. Puedes utilizar cualquiera de las siguientes opciones para subir una imagen que se alojará en Datadog:  
    * Coloca un archivo de imagen en el área de carga.
    * Haz clic en **Choose File** (Seleccionar archivo) y localiza la imagen en tu directorio de archivos.
    * Pega una URL de acceso público para la imagen.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/service_management/incident_management/#integrations
[2]: /es/integrations/slack/?tab=slackapplicationus#using-datadog-incidents
[3]: https://app.datadoghq.com/organization-settings/public-sharing/settings