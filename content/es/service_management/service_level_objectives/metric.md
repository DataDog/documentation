---
aliases:
- /es/monitors/service_level_objectives/event/
- /es/monitors/service_level_objectives/metric/
description: Utiliza métricas para definir un objetivo de nivel de servicio.
further_reading:
- link: /metrics/
  tag: Documentación
  text: Más información sobre métricas
- link: /service_management/service_level_objectives/
  tag: Documentación
  text: Visión general de SLO, configuración y cálculo
title: SLOs basados en la métrica
---

## Información general

Los SLOs basados en la métrica son útiles para un flujo (stream) basado en el recuento de datos en el que se diferencian los buenos y los malos eventos. Una consulta métrica utiliza la suma de los eventos buenos dividida por la suma del total de eventos a lo largo del tiempo para calcular un Indicador de nivel de servicio (o SLI). Puedes utilizar cualquier métrica para crear SLOs, incluyendo métricas personalizadas generadas a partir de [APM spans (tramos de APM)][1], [RUM events (eventos de RUM)][2] y [logs][3]. Para obtener una visión general sobre cómo se configuran y calculan los SLOs, consulta la página [Service Level Objective (Objetivo de nivel de servicio][4].

{{< img src="service_management/service_level_objectives/metric-based-slo-example.png" alt="ejemplo de SLO basado en la métrica" >}}

## Configuración

En la [SLO status page (página de estado de SLO)][5], selecciona **New SLO +** (Nuevo SLO +). A continuación, selecciona [**Metric** (métrica)][6].

### Definir consultas

1. Hay que definir dos consultas. La consulta del numerador define la suma de los eventos buenos, mientras que la consulta del denominador define la suma de los eventos totales. Tus consultas deben utilizar métricas RECUENTO, TASA o DISTRIBUCIÓN habilitadas para percentiles para garantizar que el cálculo de SLO se comporte correctamente. Para más información, consulta la documentación [Querying (consulta)][9]. 
1. Utiliza el campo `DESDE` para incluir o excluir grupos específicos utilizando etiquetas (tags).
1. Para los percentiles habilitados para métricas DISTRIBUCIÓN, debes utilizar el aggregator `valores de recuento...` para especificar un umbral numérico para que la métrica cuente. Esta función se denomina Consultas de umbral y te permite contar el número de valores brutos que coinciden con un umbral numérico para producir Counts para tu numerador y denominador. Para obtener más información, consulta [Threshold Queries (Consultas de umbral)][7].
1. Opcionalmente, para las métricas de DISTRIBUCIÓN habilitadas para percentiles, utiliza el menú desplegable situado inmediatamente a la derecha del aggregator `valores de recuento..` para desglosar tu SLI por grupos específicos.
1. Opcionalmente, para métricas de RECUENTO o TASA, utiliza el Aggregator `sumar por` para dividir tu SLI en grupos específicos.

**Example:** (Ejemplo:) Si estás rastreando códigos de retorno HTTP, y tu métrica incluye una etiqueta como `code:2xx O code:3xx O code:4xx`. La suma del evento bueno sería `sum:httpservice.hits{code:2xx} + sum:httpservice.hits{code:4xx}`. Y los eventos `totales` serían `sum:httpservice.hits{!code:3xx}`.

¿Por qué se excluye `HTTP 3xx`? Normalmente son redirecciones y no deberían contar a favor o en contra del SLI, pero otros códigos de error no basados en 3xx sí deberían. En el caso de `total`, se quieren todos los tipos menos `HTTP 3xx`, en el de `numerador`, solo se quieren los códigos de estado de tipo `OK`.

#### Multigrupo para SLI basados en métrica

Los SLI basados en métricas te permiten centrarte en los atributos más importantes de tus SLI. Puedes añadir grupos a tus SLI basados en métricas en el editor utilizando etiquetas como `centro de datos`, `partición`, `zona de disponibilidad`, `recurso`, o cualquier otro grupo relevante:

{{< img src="service_management/service_level_objectives/metric_editor.png" alt="editor de SLO basado en métricas agrupado" >}}

Al agrupar estos SLI, puedes visualizar el estado de cada grupo individual, la solicitud buena Counts, y el presupuesto de errores restante en el panel de detalles:

{{< img src="service_management/service_level_objectives/metric_results.png" alt="resultados de grupo de SLO basado en métricas" >}}

Por defecto, el gráfico de barras muestra el total de Counts de solicitudes buenas y malas para todo el SLO. Puedes consultar el gráfico de barras en contexto para ver las solicitudes Counts buenas y malas de cada grupo individual haciendo clic en la fila correspondiente de la tabla. Además, también puedes optar por mostrar u ocultar las solicitudes Counts buenas o malas seleccionando la opción correspondiente en la leyenda situada justo debajo del gráfico de barras. 

**Nota**: Si utilizas SLI basados en monitor, también puedes [view monitor groups (ver grupos de monitor)][8].

### Establece tus objetivos SLO

Un objetivo SLO se compone del porcentaje objetivo y de la ventana de tiempo. Cuando se establece un objetivo para un SLO basado en métricas, el porcentaje del objetivo especifica qué parte del total de eventos especificados en el denominador del SLO deben ser eventos buenos, mientras que la ventana de tiempo especifica el período móvil durante el cual debe realizarse el seguimiento del objetivo.

Ejemplo: `el 99% de las solicitudes deben estar libres de errores en los últimos 7 días`.

Mientras el SLO se mantenga por encima del porcentaje objetivo, el estado del SLO se mostrará en letra verde. Cuando se infrinja el porcentaje objetivo, el estado del SLO se mostrará en letra roja. También puedes incluir opcionalmente un porcentaje de advertencia que sea mayor que el porcentaje objetivo para indicar cuándo te estás acercando a un incumplimiento del SLO. Cuando se infringe el porcentaje de advertencia (pero no se infringe el porcentaje objetivo), el estado del SLO se mostrará en letra amarilla.

**Nota:** Se permiten hasta tres decimales para los objetivos SLO basados en métricas. La precisión mostrada en la interfaz de usuario de detalles del SLO será de hasta `num_target_decimal_places + 1 = 4 decimales`. La precisión exacta mostrada dependerá de la magnitud de los valores en tu consulta de denominador. Cuanto mayor sea la magnitud del denominador, mayor será la precisión que podrá mostrarse hasta el límite de cuatro decimales.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/tracing/generate_metrics/
[2]: https://docs.datadoghq.com/es/real_user_monitoring/platform/generate_metrics
[3]: https://docs.datadoghq.com/es/logs/log_configuration/logs_to_metrics/#overview
[4]: /es/service_management/service_level_objectives
[5]: https://app.datadoghq.com/slo
[6]: https://app.datadoghq.com/slo/new/metric
[7]: /es/metrics/distributions/#threshold-queries
[8]: /es/service_management/service_level_objectives/monitor/
[9]: https://docs.datadoghq.com/es/dashboards/querying/#advanced-graphing