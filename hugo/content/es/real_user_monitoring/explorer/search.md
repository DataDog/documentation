---
further_reading:
- link: /real_user_monitoring/explorer/group/
  tag: Documentación
  text: Agrupación de eventos RUM consultados
- link: /real_user_monitoring/explorer/visualize/
  tag: Documentación
  text: Aplicar visualizaciones a tus eventos
title: Búsqueda de eventos RUM
---

## Información general

Después de aplicar un rango temporal en la parte superior derecha, puedes encontrar eventos con pares `key:value` y una búsqueda de texto completo en el Explorador RUM.

## Tipos de eventos

Aunque RUM captura automáticamente eventos, también puedes capturar tus propios eventos. Todos los eventos autocapturados y personalizados se almacenan en seis tipos de eventos para aplicaciones de [navegador][1], [iOS][2], [Android][3] y [React Native][4] y se indexan para permitir su búsqueda.

| Tipo de evento | Conservación | Descripción                                                                                                                                                                                                                                                               |
|------------|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Sesión    | 30 días   | Una sesión de usuario se inicia cuando un usuario empieza a navegar por la aplicación web. Contiene información de alto nivel sobre el usuario (como navegador, dispositivo y geolocalización). Agrega todos los eventos RUM recopilados durante el recorrido del usuario con un único atributo `session.id`. |
| Vista       | 30 días   | Cada vez que un usuario visita una página de la aplicación web, se genera un evento de vista. Mientras el usuario permanece en la misma página, los eventos de recursos, tareas prolongadas, errores y acciones se vinculan con la vista de RUM relacionada con el atributo `view.id`.                                   |
| Acción     | 30 días   | Los eventos de acciones RUM realizan un seguimiento de las interacciones del usuario durante su recorrido y pueden enviarse manualmente para monitorizar acciones personalizadas del usuario.                                                                                                                                                  |
| Error      | 30 días   | RUM recopila todos los errores de frontend que emite el navegador.                                                                                                                                                                                                                 |
| Recurso   | 15 días   | Se genera un evento de recurso para bibliotecas de imágenes, XHR, Fetch, CSS o JS cargadas en una página web. Incluye información detallada sobre el tiempo de carga.                                                                                                                          |
| Tarea prolongada  | 15 días   | Se genera un evento de tarea prolongada para cualquier tarea del navegador que bloquee el subproceso principal durante más de 50 ms.                                                                                                                                                                |

Para buscar en eventos RUM, selecciona un tipo de evento en el menú desplegable situado a la izquierda de la barra de búsqueda. 

{{< img src="real_user_monitoring/explorer/search/rum-explorer-search-4.png" alt="Explorador RUM" style="width:100%;">}}

## Consulta de búsqueda

Para filtrar las sesiones producidas por una aplicación específica por usuarios reales durante el último día, utiliza el selector de aplicaciones en las opciones de navegación superiores y, a continuación, crea una consulta personalizada como `@session.type:user` y configura el intervalo de tiempo en `1d`.

**Nota:** Si vas a incluir una faceta en tu consulta, asegúrate de crearla primero.

### Sintaxis de búsqueda

Para obtener más información sobre la búsqueda de eventos RUM y el uso de marcos temporales, consulta [Sintaxis de búsqueda][5] y [Marcos temporales personalizados][6].

## Configuración de facetas y medidas

Todos los eventos RUM contienen atributos que son recopilados automáticamente por los SDK RUM y por tus atributos personalizados, que se muestran en el [panel lateral de eventos][7]. 

Mientras que la mayoría de los atributos recopilados automáticamente están indexados y tienen facetas, los atributos de tu evento personalizado no están indexados ni tienen facetas por defecto. Indexa estos atributos creando una faceta o medida para poder acceder a ellos en tu búsqueda y tus [visualizaciones][8].

### Facetas

Una faceta muestra los distintos miembros de un atributo o etiqueta (tag) y proporciona análisis básicos, como la cantidad de eventos RUM representados. Las facetas permiten cambiar o filtrar los conjuntos de datos en función de un atributo determinado. Al seleccionar un valor, se aplica un filtro a la barra de búsqueda.

{{< img src="real_user_monitoring/explorer/rum-facet-3.png" alt="Lista de facetas a la izquierda de la lista de eventos" style="width:90%;">}}

Para crear una faceta, busca y haz clic en un atributo en el [panel lateral de eventos][7]. Esto crea una sección de atributos para los valores del panel lateral, como "Subdivisión de país".

{{< img src="real_user_monitoring/explorer/create_facet.png" alt="Crear una faceta" style="width:40%;">}}

También puedes tomar metadatos de una sesión y convertirlos en una faceta (por ejemplo, Virginia) haciendo clic en **+ Añadir**, en el panel lateral izquierdo y, a continuación, introduciendo o seleccionando una ruta para la faceta.

{{< img src="real_user_monitoring/explorer/create-facet-3.png" alt="Crear una faceta utilizando el botón + Añadir, de la lista de facetas" style="width:40%;">}}

Puedes hacer clic en **Opciones avanzadas** para personalizar aún más la faceta, por ejemplo proporcionando un nombre de visualización, un tipo, un grupo o una descripción diferentes.

{{< img src="real_user_monitoring/explorer/create-facet-2.png" alt="Opciones avanzadas de la nueva faceta" style="width:40%;">}}

El valor del atributo se almacena en todas las nuevas visualizaciones. Puedes acceder a estos atributos en la barra de búsqueda, en el panel **Facetas** y en tus [visualizaciones][8].

### Medidas

Una medida es un atributo con un valor numérico contenido en tus eventos RUM.

Para crear una medida, busca y haz clic en un atributo numérico en el [panel lateral de eventos][7].

{{< img src="real_user_monitoring/explorer/create_measure.png" alt="Crear una medida" style="width:40%;">}}

El valor del atributo se almacena en todos los nuevos eventos RUM. Puedes acceder a estos atributos en la barra de búsqueda, en el panel **Facetas** y en tus [visualizaciones][8].

{{< img src="real_user_monitoring/explorer/edit_measure.png" alt="Editar una medida" style="width:40%;">}}

Cada medida tiene una unidad que se muestra en una columna del [Explorador RUM][9] y en tus [visualizaciones][8]. 

## Búsqueda de facetas

Para buscar un atributo específico, [añádelo como faceta](#facets) e introduce `@` en tu consulta de búsqueda. Esto indica que estás buscando una faceta.

Por ejemplo, si el nombre de tu faceta es **url** y quieres filtrar por el valor **url** `www.datadoghq.com`, introduce `@url:www.datadoghq.com`.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/browser/data_collected/
[2]: /es/real_user_monitoring/android/data_collected/
[3]: /es/real_user_monitoring/ios/data_collected/
[4]: /es/real_user_monitoring/reactnative/
[5]: /es/real_user_monitoring/explorer/search_syntax/
[6]: /es/dashboards/guide/custom_time_frames
[7]: /es/real_user_monitoring/explorer/events/
[8]: /es/real_user_monitoring/explorer/visualize#timeseries
[9]: /es/real_user_monitoring/explorer/