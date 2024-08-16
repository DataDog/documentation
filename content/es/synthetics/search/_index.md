---
description: Aprende a buscar y gestionar tus tests de Synthetic.
further_reading:
- link: https://www.datadoghq.com/blog/test-creation-best-practices/
  tag: Blog
  text: Prácticas recomendadas para crear tests de extremo a extremo
- link: https://www.datadoghq.com/blog/test-maintenance-best-practices/
  tag: Blog
  text: Prácticas recomendadas para el mantenimiento de tests de extremo a extremo
- link: /synthetics/search/saved_views
  tag: Documentación
  text: Información sobre las vistas guardadas
- link: /continuous_testing/explorer
  tag: Documentación
  text: Información sobre Synthetic Monitoring y Testing Results Explorer
- link: /service_management/events/explorer
  tag: Documentación
  text: Información sobre Events Explorer
title: Buscar y gestionar tests de Synthetic
---

## Información general

Puedes [buscar](#search-for-tests), [gestionar](#manage-tests) y acceder a todos los tests de la [página Tests de Synthetic][1]. 

{{< img src="synthetics/search/synthetic_tests_page_2.png" alt="Página Tests de Synthetic Monitoring" style="width:100%" >}}

Al usar [facetas](#facets-and-tags), puedes realizar las siguientes acciones:

- Buscar tests de Synthetic específicos.
- Gestionar tus tests con acciones en bloque

## Buscar tests

### Facetas y etiquetas

El panel **Synthetic Filters** (Filtros de Synthetic) de la izquierda detalla las facetas predeterminadas que puedes utilizar para buscar tus tests.

Las facetas predeterminadas incluyen lo siguiente:

| Faceta          | Descripción                                                                   |
|----------------|-------------------------------------------------------------------------------|
| `Type`         | El tipo de test de Synthetic: `browser`, `api`, `api-multi`, `api-websocket`, `api-ssl`, `api-dns`, `api-tcp`, `api-udp`, `api-icmp` o `api-grpc`. |
| `Status`       | El estado del test de Synthetic: `OK`, `Alert` o `No Data`.                       |
| `Creator`      | Quien ha creado el test de Synthetic.                                            |
| `Team`         | El equipo responsable de responder un test de Synthetic.                    |
| `Region`       | Las localizaciones gestionadas y privadas desde las que se está ejecutando el test de Synthetic.         |
| `State`        | El estado del test de Synthetic: `live` o `paused`.                          |
| `Notification` | El identificador que utiliza el test de Synthetic para las notificaciones.                      |
| `Env`          | El entorno en el que se ejecuta el test de Synthetic.                             |
| `CI/CD Execution Rule` | El estado de la ejecución del test: `Blocking`, `Non-blocking` o `Skipped`. |

El panel **Tags** (Etiquetas) debajo de **Synthetic Filters** (Filtros de Synthetic) detalla varias etiquetas predeterminadas que puedes utilizar para identificar tus tests.

Las etiquetas predeterminadas incluyen:

| Etiqueta          | Descripción                                                                     |
|----------------|-------------------------------------------------------------------------------|
| `Tag`          | La etiqueta que tiene asignada el test de Synthetic.                                       |
| `Service`      | El servicio en el que se está ejecutando el test de Synthetic.                                 |
| `Private Locations`| Si las localizaciones privadas están activadas o desactivadas: `true` o `false`.          |

Para obtener más información, consulta [Usar etiquetas][4].

### Crear una consulta de búsqueda

Busca tests haciendo clic en las facetas de la izquierda o escribiendo tu propia consulta personalizada en la barra de búsqueda. Cuando la edites, los resultados de búsqueda se actualizarán en tiempo real.

Cuando quieras activar y anular la selección de facetas, la barra de búsqueda reflejará automáticamente tus cambios. También puedes modificar la consulta de la barra de búsqueda o escribir una consulta nueva para activar o anular la selección de las facetas de la izquierda.

* **Búsqueda de texto libre**: indica el texto que quieras en la barra de búsqueda para buscar un test por nombre.
* **Buscar en una única faceta**: haz clic en el valor de una faceta para crear una consulta de búsqueda que incluya solo ese valor de faceta. Por ejemplo, `type:api`. Para añadir otro valor de la misma faceta a tu búsqueda, haz clic en la casilla del valor adicional. También puedes añadir el valor adicional con un operador booleano `OR` y ajustar los valores mediante comillas y paréntesis. Por ejemplo, `type:("api" OR "api-ssl")`.
* **Buscar en varias facetas y textos**: haz clic en los valores de faceta de varios tipos de facetas para personalizar una consulta de búsqueda que te permita filtrar varias facetas. Por ejemplo, `type:api region:aws:us-east-2`. También puedes mezclar facetas y texto. Por ejemplo, `checkout type:browser`. Aunque no puedas verlo, el operador booleano `AND` se aplica cuando buscas varios términos.
* **Buscar en un mensaje**: añade un mensaje para crear una consulta de búsqueda que filtre los mensajes de notificación de tus tests en el [monitor del test][5]. Por ejemplo, `message:testcontent`.
* **Excluir facetas o texto**: haz clic en una casilla que ya esté completa para anular la selección de un valor de faceta o antepón `-` a un término para excluirlo de la consulta de búsqueda. Por ejemplo, `-state:paused`.
* **Buscar coincidencias personalizadas**: utiliza caracteres comodín (`*`). Por ejemplo, `valid*`.

Para buscar en un tipo de test de Synthetic, selecciona el tipo de test en la faceta **Type** (Tipo).

{{< img src="synthetics/search/facet_search_2.mp4" alt="Buscar tests mediante facetas en la página Tests" video=true >}}

## Gestionar tests

### Acciones en bloque

Gestiona tus tests de Synthetic en bloque seleccionando uno o más tests en la [página Tests de Synthetic][1] y pulsando **Edit Tags** (Editar etiquetas), **Run Tests Now** (Ejecutar tests ahora) o **Delete** (Borrar). 

{{< img src="synthetics/search/edit_tags_2.mp4" alt="Editar etiquetas de tests de Synthetic en bloque" video=true >}}

### Acciones de los tests

Al hacer clic en el menú de tres puntos situado a la derecha de un test, aparecen iconos de opciones como `Pause`, `Run Test Now`, `Edit Test`, `Clone` y `Delete`. La opción `Edit Recording` está disponible para los tests de navegador.

{{< img src="synthetics/search/test_option_2.mp4" alt="Las opciones aparecen al hacer clic en el menú de tres puntos ubicado a la derecha de un test de Synthetic" video="true" width="100%">}}

### Seguimiento de eventos

Crear, añadir y borrar tests de Synthetic, variables globales y localizaciones privadas genera eventos en [Events Explorer][6]. Los eventos describen cambios que se han producido y muestran los usuarios que los llevaron a cabo.

{{< img src="synthetics/search/synthetic_events_2.png" alt="Alertas de tests de Synthetic en Events Explorer" style="width:100%" >}}

Descubre todos los cambios relacionados con tests de Synthetic buscando las alertas de tus monitores de tests en la barra de búsqueda o seleccionando un tipo de evento en la variable de plantilla **Event** (Evento). Por ejemplo, `Event Type:synthetics_alert`.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/list
[2]: /es/synthetics/metrics/
[3]: /es/synthetics/dashboards/
[4]: /es/getting_started/tagging/using_tags/#synthetics
[5]: /es/synthetics/guide/synthetic-test-monitors/
[6]: https://app.datadoghq.com/event/explorer