---
further_reading:
- link: /real_user_monitoring/explorer/
  tag: Documentación
  text: Más información sobre el navegador RUM
- link: /real_user_monitoring/
  tag: Documentación
  text: Aprender a visualizar tus datos RUM
title: Para comprender la jerarquía de los eventos RUM
---

## Información general

Esta guía recorre los diferentes [tipos de datos][1] que recopila RUM y describe la jerarquía de cada tipo de evento.

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-session-hierarchy-overview.png" alt="Diagrama de la jerarquía de eventos RUM, que muestra una sesión única donde se ven varias vistas." style="width:50%;">}}

## Sesiones
Todos los datos RUM se refieren a sesiones de usuario o sintéticas, que se encuentran en la parte superior de la jerarquía de eventos. Una sesión es un recorrido único del usuario y engloba todo lo que el usuario ha activado (por ejemplo, páginas vistas, visualizaciones, clics, desplazamientos y errores). Una sesión puede durar hasta cuatro horas de actividad continua o puede expirar tras [15 minutos de inactividad][2]. Dado que una sesión abarca todo el recorrido, todos los [atributos][3] vinculados a ese usuario también están vinculados a esa sesión. Por ejemplo, es posible que quieras consultar un atributo predeterminado, como `action count`, y luego añadir algo más personalizado, como [atributos de usuario][4].

#### Ejemplo de búsqueda: Lista de todas las sesiones de un usuario

Para listar todas las sesiones de un usuario específico, selecciona **Sesiones** en el menú desplegable de tipo de evento y, a continuación, realiza una consulta de búsqueda del estado de la sesión y del usuario.

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-sample-search-all-session-user-1.png" alt="Ejemplo de búsqueda que lista todas las sesiones del usuario 'Lee Davis'." style="width:80%;">}}

Cada sesión se asocia automáticamente a un único `session.id`.

## Vistas
Dentro de una sesión, se crea un evento de vista cada vez que un usuario navega a una página (Navegador RUM) o a una pantalla o segmento de pantalla (Móvil RUM) de una aplicación. 

Cada vista recopila automáticamente varios atributos y datos específicos de la vista, como el texto de la URL y las métricas de temporización, como el tiempo de carga de una página determinada. Al consultar vistas específicas, puedes añadir cualquier atributo de nivel predeterminado, como por ejemplo información sobre el dispositivo, el sistema operativo o el usuario. Sin embargo, los atributos específicos de eventos deben ser específicos de cada vista. Para ver sólo eventos, puedes ajustar el selector de eventos como se muestra en la siguiente imagen.

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-switch-views.png" alt="Vistas RUM." style="width:80%;">}}

De forma similar a `session.id`, cada vista tiene automáticamente un único `view.id` conectado a ella. 

### Acciones, errores, recursos y tareas prolongadas

Dentro de las vistas, el SDK crea eventos más específicos que se encuentran en el mismo nivel jerárquico. Sin embargo, cada evento es único y tiene sus propios atributos y propiedades.

### Acciones

Las acciones representan la actividad del usuario en una página. En los navegadores, todas las acciones de clic se recopilan automáticamente. En los móviles, se recopilan todos los toques, deslizamientos y desplazamientos. Además de estas acciones predeterminadas, también puedes enviar [acciones personalizadas][5], como completar formularios y transacciones comerciales. 

#### Ejemplo de búsqueda: Lista de las principales acciones que conducen a un error

Este ejemplo muestra una consulta que busca todas las acciones de los usuarios que hacen clic en el botón "Añadir al carro" que han dado lugar a un error.

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-actions-all-add-to-cart-1.png" alt="Ejemplo de búsqueda de todas las acciones 'Añadir al carro' que han dado lugar a un error." style="width:80%;">}}

### Errores

Puedes utilizar RUM para recopilar [errores de frontend][6] que se produzcan durante la sesión del usuario. Por defecto, el SDK del navegador crea eventos de error para excepciones no controladas y errores de consola. Además, puedes recopilar errores personalizados a través de la API `addError` de RUM (en el [navegador][7] y el [móvil][8]). En las aplicaciones móviles, también puedes ver si el error ha provocado el cierre de la sesión, también conocido como fallo.

Los errores se pueden ver tanto en RUM como en Seguimiento de errores. Los errores de origen y personalizados son procesados por Seguimiento de errores, mientras que los errores de consola están únicamente en RUM.

#### Ejemplo de búsqueda: Lista de todos los fallos ocurridos en una página de la aplicación

Este ejemplo muestra una consulta que busca dentro de los eventos de error para ver todos los fallos ocurridos en la página "HomeViewController" para una aplicación en particular.

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-sample-search-checkoutviewcontroller.png" alt="Ejemplo de búsqueda de todos los fallos ocurridos en una página." style="width:80%;">}}

### Recursos
Los recursos se recopilan de las vistas e incluyen solicitudes externas de tu aplicación a un proveedor de red, como por ejemplo XHR, carga de JS, imágenes o fuentes. Dado que se recopilan desde una vista, puedes consultar todos los recursos cargados en una aplicación o elegir sólo los recursos que han ocurrido en una única vista. 

#### Ejemplo de búsqueda: Lista de todas las imágenes cargadas en la vista `/cart` filtradas por tamaño de imagen

En este ejemplo, se selecciona **Recursos** en el menú desplegable de tipo de evento, y a continuación, se listan las imágenes de una consulta, que se cargaron en el carro y cuyo tamaño era mayor o igual a 1000 kilobytes.

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-resources.png" alt="Ejemplo de búsqueda de todas las imágenes cargadas en la vista del carro, cuyo tamaño era mayor o igual a 1000 kilobytes." style="width:80%;">}}

### Tareas prolongadas
Las tareas prolongadas son cualquier tarea que bloquee el subproceso de la interfaz de usuario durante un periodo de tiempo determinado. En móviles, por ejemplo, una tarea prolongada puede ser un fotograma congelado, si la pantalla se bloquea durante más de 300 milisegundos.

#### Ejemplo de búsqueda: Todas las tareas largas de fotogramas congelados que duraron más de 500 ms.

En este ejemplo, se selecciona **Tareas prolongadas** en el menú desplegable de tipo de evento y, a continuación, se especifica la duración.

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-long-tasks.png" alt="Ejemplo de búsqueda de las tareas prolongadas por fotograma congelado, que duran más de 500 milisegundos." style="width:80%;">}}

## Solucionar problemas

### No aparece ningún dato después de escribir una consulta

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-no-data-appears-3.png" alt="Ejemplo de ausencia de datos luego de escribir una consulta." style="width:80%;">}}

Si no ves datos después de escribir una consulta, confirma que el selector de eventos coincide con lo que tienes en la barra de búsqueda. En el ejemplo anterior, el selector de eventos está configurado para buscar en las **vistas**, pero la barra de búsqueda sólo contiene atributos de **acción**. Para ver los datos relacionados con acciones, cambia el selector de vista a acciones. Si sigues sin ver ningún dato, comprueba el selector del marco temporal para asegurarte de que te encuentras en una ventana temporal en la que deberían aparecer datos.

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-data-now-appears.png" alt="Ejemplo de actualización de una consulta utilizando los selectores de vista y de marco temporal." style="width:80%;">}}

### Consulta de un tipo de evento anidado en otro tipo de evento 

Al consultar acciones específicas, puedes utilizar el tipo de evento principal, pero no uno de nivel igual o inferior. Por ejemplo, las acciones están anidadas debajo de las vistas y las acciones y los errores están al mismo nivel en la cadena jerárquica. Esto significa que puedes consultar todas las acciones y errores que se han producido en una página determinada, pero no todas las acciones que han tenido un tipo de error específico.

#### Ejemplo de búsqueda: Las 10 principales acciones que han ocurrido en `/`

Este ejemplo busca dentro del tipo de evento de acciones todos los nombres de vistas utilizando la vista de lista para ver las 10 principales acciones que han ocurrido en `/`, lo que representa la página de inicio.

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-top-ten-actions.png" alt="Ejemplo de búsqueda de las diez principales acciones que han ocurrido en la página inicio." style="width:80%;">}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/browser/data_collected
[2]: /es/account_management/billing/rum/#when-does-a-session-expire
[3]: /es/real_user_monitoring/browser/data_collected/#event-specific-metrics-and-attributes
[4]: /es/real_user_monitoring/browser/data_collected/#user-attributes
[5]: /es/real_user_monitoring/guide/send-rum-custom-actions/?tab=npm
[6]: /es/real_user_monitoring/browser/collecting_browser_errors/?tab=npm
[7]: /es/real_user_monitoring/browser/collecting_browser_errors/?tab=npm#collect-errors-manually
[8]: /es/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/ios/?tab=swift#custom-errors