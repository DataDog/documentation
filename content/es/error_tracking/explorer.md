---
description: Más información sobre el Explorador de Error Tracking.
further_reading:
- link: /monitors/types/error_tracking
  tag: Documentación
  text: Más información sobre los monitores de Error Tracking.
title: Explorador de Error Tracking
---

## Información general

{{< img src="error_tracking/error-tracking-overview-2.png" alt="Detalles de un incidente en el Explorador de Error Tracking" style="width:100%;" >}}

El Explorador de Error Tracking permite ver, filtrar e investigar incidentes. Un incidente es un grupo de errores similares relacionados con el mismo fallo. Datadog crea incidentes contando una huella digital por cada error, utilizando algunos de sus atributos como el tipo de error, el mensaje de error o la traza (trace) de stack tecnológico. Los errores con la misma huella digital se agrupan en el mismo incidente.

## Explorar tus incidentes

Cada elemento listado en el Explorador de Error Tracking es un incidente que contiene información clara sobre el error, incluyendo lo siguiente:

-   El tipo de error y el mensaje de error
-   La ruta al archivo en el que se activan los errores subyacentes
-   Información importante sobre la duración del incidente:
    -   Cuándo fue visto por primera y última vez
    -   Gráfico de casos a lo largo del tiempo
    -   Número de casos en el periodo de tiempo seleccionado

El tema también está etiquetado como:
- `New`, si el incidente fue visto por primera vez hace menos de dos días y está en estado **PARA REVISIÓN** (Para revisión) (consulta [Estados de incidentes][5])
- `Regression`, si el incidente se **RESOLVIÓ** y volvió a producirse en una versión más reciente (consulta [Detección de regresiones][6])
- `Crash`, si la aplicación se bloquea
- Con una [causa sospechada][3]

### Rango de tiempo

{{< img src="real_user_monitoring/error_tracking/time_range.png" alt="Rango de tiempo de Error Tracking" style="width:80%;" >}}

El rango de tiempo aparece en la parte superior derecha del Explorador como una línea de tiempo. Esta función te permite visualizar los incidentes con errores ocurridos dentro del periodo de tiempo seleccionado. Cambia el rango de tiempo seleccionando un rango preestablecido en el menú desplegable.

### Clasificación

Clasifica incidentes en la lista utilizando una de estas opciones:
-   **Relevancia** combina varias características de incidentes para priorizar aquellos relacionados con el código, recientes o con picos de error. Error Tracking analiza la antigüedad de los incidentes, los casos del último día, el aumento significativo en la última hora o si han provocado un bloqueo de la aplicación.
-   **Recuento** clasifica los incidentes en función del recuento total de casos en el rango de tiempo seleccionado.
-   **Más recientes** ordena los incidentes en función de cuándo fueron vistos por primera vez.
-   **Sesiones afectadas** ordena los incidentes por el número de [sesiones RUM][4] afectadas.

### Facetas

{{< img src="/error_tracking/facets-panel.png" alt="Facetas de Error Tracking" style="width:100%;" >}}

Error Tracking indexa automáticamente una lista predefinida de atributos de tus incidentes y crea facetas a partir de ella. Una faceta muestra todos los miembros distintos de un atributo para el periodo de tiempo seleccionado y proporciona algunos análisis básicos, como el número de incidentes representados. Las facetas permiten pivotar o filtrar los incidentes en función de un atributo determinado.

Algunos de los atributos de error más utilizados son
| Atributo | Descripción
|-----------|-------------|
| `error.message`| El mensaje asociado con el error. |
| `error.type` | El tipo o la clase de error. |
| `error.stack` | La traza de stack tecnológico asociada al error. |
| `error.handling` | Indica si el error fue gestionado. Los errores APM se consideran `handled` si un tramo (span) principal informa una operación exitosa (`HTTP 200`, `gRPC OK`) o una gestión de error exitosa (`HTTP 400`, `gRPC NOT_FOUND`). Los errores RUM se consideran `unhandled` si no se capturan manualmente en el código. |

Haz clic en el icono Edit (Editar) para ver la lista de facetas disponibles que puedes mostrar u ocultar de la vista.

{{< img src="/error_tracking/error-tracking-facets.png" alt="Haz clic en el ícono del lápiz para ocultar o mostrar facetas de Error Tracking disponibles en la vista." style="width:100%;" >}}

### Filtros de nivel de incidente

Además de los eventos de error, Error Tracking ofrece filtros de nivel de incidente para refinar la lista de incidentes mostrados.

{{< img src="error_tracking/issue-level-filters.png" alt="Filtros de nivel de incidente en Error Tracking" style="width:100%;" >}}

#### Fuentes

Error Tracking consolida los errores de varios productos de Datadog (RUM, logs, APM) en una vista unificada, lo que te permite observar y solucionar errores en todo el stack tecnológico. En el Explorador puedes elegir mostrar **Todos los incidentes**, o incidentes de **Navegador**, **Móvil** o **Backend**.

Para un filtrado más granular, puedes limitar los incidentes por fuentes específicas de logs o por SDK y delimitarlos a un lenguaje de programación.

#### Parche disponible

Muestra solo los incidentes que tienen un parche generado por AI, disponible para corregir rápidamente los incidentes.

#### Filtros de equipos

[Issue Team Ownership][2] te ayuda a identificar rápidamente los incidentes relevantes para tu equipo mediante `CODEOWNERS` Git y propietarios de servicios.

#### Asignado a

Realiza un seguimiento de los incidentes, asígnalos a los miembros del equipo con más conocimientos y refina fácilmente la lista de incidentes por destinatario.

#### Causa sospechada

[Causa sospechada][3] ayuda a filtrar y priorizar los errores con mayor rapidez, lo que permite a los equipos abordar las posibles causas con mayor eficacia.

## Inspeccionar un incidente

Haz clic en cualquier incidente para abrir el panel de incidentes y ver más información sobre este.

{{< img src="real_user_monitoring/error_tracking/issue_summary.png" alt="Parte superior del panel de incidentes de Tracking que ofrece una vista resumida del incidente" style="width:80%;" >}}

Los detalles claros que necesitas para solucionar un incidente se encuentran en la parte superior del panel. Desde allí, podrás entender su ciclo de vida: las fechas del primero y el último caso, el recuento total, así como el recuento a lo largo del tiempo para el incidente en cuestión.

{{< img src="real_user_monitoring/error_tracking/error_sample.png" alt="Parte inferior del panel de incidentes de Error Tracking que ofrece ejemplos de error" style="width:80%;" >}}

La información mostrada en el panel de incidentes varía en función de la fuente del error. Por ejemplo, un incidente creado a partir de errores APM muestra etiquetas del tramo de error, como el recurso o el nombre de la operación, con acceso directo a la traza relacionada o a los logs vinculados a ella.

La parte inferior del panel de incidentes te ofrece la posibilidad de navegar por los ejemplos de error del incidente relacionado. Cada ejemplo de error ofrece información para la resolución de problemas, como la traza de stack tecnológico del error y las características de los usuarios afectados.

## Recibir alertas sobre errores nuevos o impactantes

Ver un nuevo incidente en cuanto se produce te da la oportunidad de identificarlo y solucionarlo de forma proactiva antes de que se convierta en crítico. Los monitores de Error Tracking te permiten realizar un seguimiento de cualquier incidente nuevo o incidentes que tengan un alto impacto en tus sistemas o en tus usuarios (consulta [Monitores de Error Tracking][7]).

Puedes exportar directamente tu consulta de búsqueda desde el Explorador para crear un monitor de Error Tracking en el contexto relacionado:

{{< img src="/error_tracking/create-monitor.mp4" alt="Exportar tu consulta de búsqueda a un monitor de Error Tracking" video=true >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/events
[2]: /es/error_tracking/issue_team_ownership
[3]: /es/error_tracking/suspected_causes
[4]: /es/real_user_monitoring/explorer/search/#event-types
[5]: /es/error_tracking/issue_states
[6]: /es/error_tracking/regression_detection
[7]: /es/monitors/types/error_tracking