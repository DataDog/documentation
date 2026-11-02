---
description: Aprenda sobre Error Tracking Explorer.
further_reading:
- link: /monitors/types/error_tracking
  tag: Documentación
  text: Obtenga información sobre los monitores de Error Tracking
title: Explorador de Error Tracking
---
## Descripción general {#overview}

{{< img src="error_tracking/error-tracking-overview-3.png" alt="Los detalles de un problema en Error Tracking Explorer" style="width:100%;" >}}

Error Tracking Explorer le permite visualizar, filtrar e investigar problemas. Un problema es un grupo de errores similares relacionados con el mismo error de software. Datadog crea problemas calculando una huella digital para cada error utilizando algunos de sus atributos, como el tipo de error, el mensaje de error o la traza de pila. Los errores con la misma huella digital se agrupan en el mismo problema.

## Explore sus problemas {#explore-your-issues}

Cada elemento listado en Error Tracking Explorer es un problema que contiene información general sobre el error, incluida la siguiente:

-   El tipo de error y el mensaje de error
-   La ruta al archivo en el que se activan los errores subyacentes
-   Información importante sobre el ciclo de vida del problema:
    -   Cuándo se vio por primera y última vez
    -   Gráfico de ocurrencias a lo largo del tiempo
    -   Número de ocurrencias en el período de tiempo seleccionado

Los problemas también se etiquetan como:
- `New` si el problema se vio por primera vez hace menos de dos días y está en estado {{< ui >}}FOR REVIEW{{< /ui >}} (consulte [Estados del problema][5])
- `Regression` si el problema fue {{< ui >}}RESOLVED{{< /ui >}} y ocurrió de nuevo en una versión más reciente (consulte [Regression Detection][6])
- `Crash` si la aplicación falló
- Tener una [Suspected Cause][3]

### Rango de tiempo {#time-range}

{{< img src="real_user_monitoring/error_tracking/time_range.png" alt="Rango de tiempo de Error Tracking" style="width:80%;" >}}

El rango de tiempo aparece en la parte superior derecha de Explorer como una línea de tiempo. Esta función le permite visualizar los problemas que presentan ocurrencias de errores dentro del período de tiempo seleccionado. Cambie el rango de tiempo seleccionando un rango preestablecido en el menú desplegable.

### Ordenamiento {#sorting}

Ordene los problemas en la lista usando una de estas opciones:
-   {{< ui >}}Relevance{{< /ui >}} combina varias características de los problemas para priorizar los relacionados con el código, los recientes o los que presentan un aumento repentino de ocurrencias. Error Tracking analiza qué tan antiguos son los problemas, las ocurrencias durante el último día, el aumento notable durante la última hora o si provocaron un bloqueo de la aplicación.
-   {{< ui >}}Count{{< /ui >}} ordena los problemas según el recuento total de ocurrencias durante el rango de tiempo seleccionado.
-   {{< ui >}}Newest{{< /ui >}} ordena los problemas según cuándo fueron vistos por primera vez.
-   {{< ui >}}Impacted Sessions{{< /ui >}} ordena los problemas por el número de [sesiones RUM][4] impactadas.

### Facetas {#facets}

{{< img src="/error_tracking/facets-panel-2.png" alt="Facetas de Error Tracking" style="width:100%;" >}}

Error Tracking indexa automáticamente una lista predefinida de atributos de sus problemas y crea facetas a partir de ellos. Una faceta muestra todos los miembros distintos de un atributo para el período de tiempo seleccionado y proporciona algunos análisis básicos, como la cantidad de problemas representados. Las facetas le permiten pivotar o filtrar sus problemas según el atributo dado.

Algunos atributos de error utilizados comúnmente incluyen:
| Atributo | Descripción |
|-----------|-------------|
| `error.message`| El mensaje asociado con el error. |
| `error.type` | El tipo o la clase del error. |
| `error.stack` | La traza de pila asociada con el error. |
| `error.handling` | Indica si el error fue manejado. Los errores de APM se consideran `handled` si un tramo principal informa una operación exitosa (`HTTP 200`, `gRPC OK`) o un manejo de errores exitoso (`HTTP 400`, `gRPC NOT_FOUND`). Los errores de RUM son `unhandled` si no se capturan manualmente en el código. |

Haga clic en el ícono Edit para ver la lista de facetas disponibles que puede mostrar u ocultar de la vista.

{{< img src="/error_tracking/error-tracking-facets.png" alt="Haga clic en el icono de lápiz para ocultar o mostrar las facetas de Error Tracking disponibles de la vista." style="width:100%;" >}}

### Filtros a nivel de problema {#issue-level-filters}

Además de los eventos de error, Error Tracking ofrece filtros a nivel de problema para refinar la lista de problemas mostrados.

{{< img src="error_tracking/issue-level-filters-2.png" alt="Filtros a nivel de problema en Error Tracking" style="width:100%;" >}}

#### Fuentes {#sources}

Error Tracking consolida errores de múltiples productos de Datadog (RUM, Logs, APM) en una vista unificada, lo que le permite observar y solucionar problemas en toda su pila. Puede elegir mostrar problemas {{< ui >}}All{{< /ui >}}, {{< ui >}}Browser{{< /ui >}}, {{< ui >}}Mobile{{< /ui >}} o {{< ui >}}Backend{{< /ui >}} en el explorador.

Para un filtrado más granular, puede limitar los problemas por fuentes de registros específicas o por SDK y acotar el contexto a un lenguaje de programación.

#### Fix available {#fix-available}

Muestre solo los problemas que tienen una solución generada por IA disponible para remediar problemas rápidamente.

#### Filtros de Teams {#teams-filters}

[Issue Team Ownership][2] le ayuda a identificar rápidamente los problemas relevantes para su equipo mediante el uso de `CODEOWNERS` de Git y propietarios de servicios.

#### Assigned to {#assigned-to}

Haga un seguimiento de los problemas y asígnelos a usted mismo o a los miembros del equipo con más conocimientos; además, filtre fácilmente la lista de problemas por persona asignada.

#### Suspected Cause {#suspected-cause}

[Suspected Cause][3] permite un filtrado y una priorización más rápidos de los errores, lo que permite a los equipos abordar las posibles causas raíz de manera más efectiva.

## Inspeccione un problema {#inspect-an-issue}

Haga clic en cualquier problema para abrir el panel de problemas y ver más información al respecto.

{{< img src="real_user_monitoring/error_tracking/issue_summary_2.png" alt="Parte superior del panel de problemas de Error Tracking que ofrece una vista resumida del problema" style="width:80%;" >}}

Los detalles de alto nivel que necesita al solucionar un problema se pueden encontrar en la parte superior del panel. Desde aquí, puede comprender su ciclo de vida: fechas de primera y última aparición, recuento total, así como el recuento a lo largo del tiempo para el problema determinado.

{{< img src="real_user_monitoring/error_tracking/error_sample_2.png" alt="Parte inferior del panel de problemas de Error Tracking que ofrece muestras de error" style="width:80%;" >}}

La información que se muestra en el panel de problemas varía según la fuente del error. Por ejemplo, un problema creado a partir de errores de APM muestra las etiquetas del tramo del error, como el nombre del recurso o de la operación, con acceso directo a la traza relacionada o a los registros vinculados a ella.

La parte inferior del panel de problemas le brinda la capacidad de navegar por las muestras de error del problema relacionado. Cada muestra de error le proporciona información para solucionar problemas, como la traza de pila del error y las características de los usuarios afectados.

## Reciba alertas sobre errores nuevos o de alto impacto {#get-alerted-on-new-or-impactful-errors}

Ver un problema nuevo tan pronto como ocurre le da la oportunidad de identificarlo y corregirlo de manera proactiva antes de que se vuelva crítico. Los seguimientos de Error Tracking le permiten hacer un seguimiento de cualquier problema nuevo o de los problemas que tengan un alto impacto en sus sistemas o en sus usuarios (consulte [Error Tracking Monitors][7])

Puede exportar directamente su consulta de búsqueda desde el explorador para crear un Error Tracking Monitor en el contexto relacionado:

{{< img src="/error_tracking/create-monitor.mp4" alt="Exporte su consulta de búsqueda a un seguimiento de Error Tracking" video=true >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/events
[2]: /es/error_tracking/issue_team_ownership
[3]: /es/error_tracking/suspected_causes
[4]: /es/real_user_monitoring/explorer/search/#event-types
[5]: /es/error_tracking/issue_states
[6]: /es/error_tracking/regression_detection
[7]: /es/monitors/types/error_tracking