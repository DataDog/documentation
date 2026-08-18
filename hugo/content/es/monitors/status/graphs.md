---
description: Comprende los gráficos de la página de estado del monitor, incluidos
  los datos evaluados, los datos fuente y las transiciones para analizar el comportamiento
  del monitor.
further_reading:
- link: monitors/configuration/?tab=thresholdalert
  tag: Documentación
  text: Configuración del monitor
- link: monitors/configuration/?tab=thresholdalert/#group-retention-time
  tag: Documentación
  text: Duración de retención de un grupo
- link: monitors/configuration/?tab=thresholdalert/#set-alert-conditions
  tag: Documentación
  text: Definir condiciones de alerta
title: Gráficos de estado
---

<div class="alert alert-info">Los gráficos de estado forman parte de la <a href="/monitors/status/status_page">página de estado provisoria del monitor </a>. Si utilizas la página de estado legacy, consulta la documentación de la página <a href="/monitors/status/status_legacy">Estado legacy</a>.</div>

## Información general

Los gráficos de la página de estado del monitor ofrecen información sobre las evaluaciones individuales del monitor. Estos gráficos te permiten comprender por qué tu monitor podría encontrarse en un estado `ALERT` y dónde centrar tus esfuerzos para solucionar problemas.

## Metadatos de monitor

{{< img src="/monitors/status/graphs/status_graph_metadata.png" alt="Sección de metadatos del monitor a la derecha de la página de estado." style="width:100%;" >}}

El panel derecho de la sección de gráficos de la página de estado del monitor proporciona información general clara de tu monitor, incluyendo

|  | Descripción |
| ---- | ---- |
| Grupos | Recuento de grupos por estado (`ALERT`, `WARN`, `NO DATA`, `OK`) |
| Visualizar como | Selector de gráficos para alternar entre los gráficos: Datos evaluados, Datos de origen y Transiciones. |
| Consulta | Consulta de monitor sin procesar. Cada monitor incluye un enlace dinámico a un explorador o página específicos en función del tipo de datos, como explorador de eventos para los tipos de datos de eventos o un explorador general de métricas para otros tipos. |
| Evaluación | Método de agregación aplicado a la consulta con la ventana de evaluación. |
| Recuento de notificaciones | Recuento de notificaciones enviadas desde este monitor. |


## Filtrar la página por grupos o estado

Dependiendo de la consulta, el monitor puede tener varios grupos. Para centrarte en un grupo específico, utiliza los filtros desplegables para seleccionar el grupo deseado.

{{< img src="/monitors/status/view_monitor_evaluations_graphs_1.png" alt="Ejemplo de página de estado del monitor filtrado por una variable de plantilla" style="width:100%;" >}}

Puedes elegir el contexto de la página según:

Estado del grupo
: Sólo se mostrarán los grupos que se encuentran actualmente en el estado seleccionado.

Estado silenciado
: Sólo se mostrarán los grupos silenciados o no.

Nombres de grupos
: Sólo se mostrarán los grupos que tienen la etiqueta (tag) seleccionada.

## Gráfico de datos evaluados

La visualización de los datos evaluados es específica del monitor y muestra los resultados de las evaluaciones individuales. Por ejemplo, si el monitor evalúa la media de los últimos 5 minutos, cada punto de datos representa la media agregada de 5 minutos en cada momento de la evaluación.

La visualización coincide con la configuración de tu monitor para mostrar el estado histórico y actual del monitor, utilizando los parámetros de las evaluaciones. Los gráficos muestran el estado por grupo.

{{< img src="/monitors/status/graphs/status_page_demo.mp4" alt="Presentación de las funciones de la interfaz de usuario de datos evaluados, incluyendo los detalles de eventos y el filtrado por grupo" video=true >}}

Para ver los detalles de los cambios de estado (como un cambio de `WARN` a `ALERT`), haz clic en el evento de alerta del gráfico y consulta la sección **Detalles de eventos** para obtener más información.

Para filtrar la vista de un grupo individual, pasa el cursor del ratón sobre el título del grupo y haz clic en **Filter to Group** (Filtrar por grupo) en la información de herramientas.

{{< img src="/monitors/status/graphs/current_status_dot.png" alt="Gráfico de datos evaluados que muestra un gráfico OK con una ADVERTENCIA para no mostrar porque el estado actual es ADVERTENCIA" style="width:100%;" >}}

Al investigar los cambios de estado anteriores, el punto de color junto al título del grupo indica el estado actual del grupo.

### Rastreo de cambios
El gráfico de seguimiento de cambios te permite ver y analizar los cambios relacionados con tu servicio y tus dependencias, que se produjeron más o menos al mismo tiempo que la alerta, ya que tales eventos son a menudo la causa de origen de los problemas.

{{< img src="/monitors/status/change_tracking_monitor_status_page.png" alt="Ejemplo de despliegue que se muestra en la página de estado del monitor" style="width:100%;" >}}

El seguimiento de cambios admite varios cambios, como despliegues, marcas de características o modificaciones de bases de datos. Para ver la lista completa y los requisitos de configuración, consulta la documentación [Change Tracking][2].

## Gráfico de datos de origen

{{< img src="/monitors/status/source_data_graph_1.png" alt="Página de estado que muestra el gráfico de los datos de origen" style="width:100%;" >}}

El gráfico de origen muestra una vista de la consulta de los datos subyacentes de un monitor, tal y como se vería en un dashboard o un notebook. Utiliza este gráfico para ver los datos inalterados a lo largo del tiempo y confirmar si las fluctuaciones de datos o las anomalías activan alertas.

Utiliza este gráfico para identificar cualquier discrepancia entre los datos sin procesar y las métricas esperadas, lo que puede indicar problemas de recopilación o presentación de datos que afectan al estado del monitor.

### Restricciones del gráfico de datos de origen

Los siguientes tipos de monitores no son compatibles con la página de estado provisoria:

- Anomalía
- Coste de la nube
- Compuesto
- Database Monitoring
- Predicción
- Live Process
- Outlier
- Synthetics
- Alertas de SLOs
- Utilización

## Transiciones

El gráfico de transiciones muestra las transiciones de estado de tu monitor a lo largo del tiempo, desglosadas por grupos, y muestra qué grupos están activando la alerta.

### Sin notificación

{{< img src="/monitors/status/graphs/non_reporting_transitions_1.png" alt="Gráfico de transiciones que muestra datos sin notificaciones" style="width:100%;" >}}

Datadog conserva los grupos de monitores en la interfaz de usuario durante 24 horas, a menos que se configure de otro modo. Para obtener más información, consulta el [tiempo de conservación de grupos][1]. Una línea de puntos en el gráfico puede indicar:

* Un nuevo grupo evaluado tras la creación del monitor, representado como una línea de puntos desde el inicio del periodo de tiempo hasta su primera evaluación.
* Un grupo que dejó de notificar y luego volvió a hacerlo, con una línea de puntos que aparece desde que dejó de notificar hasta que volvió a hacerlo.

**Nota**: Un estado de no notificación es diferente de un estado "sin datos". Los monitores de hosts y los checks de servicios configurados para notificar cuando faltan datos están disponibles durante 48 horas.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/configuration/?tab=thresholdalert#group-retention-time
[2]: /es/change_tracking