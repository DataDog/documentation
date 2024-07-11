---
aliases:
- /es/tracing/version_tracking
- /es/tracing/deployment_tracking/
description: Utiliza Datadog para realizar un rastreo de tus despliegues a través
  de etiquetas (tags) de versión
further_reading:
- link: getting_started/tagging/unified_service_tagging/
  tag: Documentación
  text: Más información sobre el etiquetado de servicios unificado y las etiquetas
    (tags) reservadas
- link: tracing/app_analytics
  tag: Documentación
  text: Utiliza la versión como una dimensión en tus consultas a App Analytics
kind: documentación
title: Rastreo de despliegue
---
## La etiqueta de versión

La etiqueta `version` está reservada dentro del etiquetado de servicios unificado. Se aplica a métricas de infraestructura (host, contenedor, proceso, y checks de NPM), métricas de traza ( trace), trazas (traces), perfiles y logs.

Puedes utilizar la etiqueta `version` para monitorizar despliegues y comportamiento del servicio en apoyo de tu estrategia de despliegue de software.

Si no has configurado la etiqueta `version`, consulta la [documentación del etiquetado de servicios unificado][1] para obtener información sobre la configuración.

## Uso de las etiquetas de versión en la Página de servicios

{{< img src="tracing/deployment_tracking/ServicePageRequestsErrorsByVersion.png" alt="Versiones en la Página de servicios" style="width:100%;">}}

En la Página de servicios, si la etiqueta `version` está disponible, puedes limitar el widget de solicitudes a:

- Total de solicitudes por versión, o
- Solicitudes por segundo por versión

Puedes limitar el widget de errores a:

- Total de errores por versión
- Errores por segundo por versión, o
- Porcentaje de error por versión

Tanto las solicitudes como los widgets de errores pueden exportarse a dashboards y monitores.

## Uso de las etiquetas de versión para la detección automática de fallos de despliegue

Al configurar tus servicios con la etiqueta `version`, se activa la [Detección automática de fallos de despliegue][4]. 

Puedes configurar un monitor para que se te notifique automáticamente sobre todos los posibles fallos de despliegue. Para ello, ve a la página New Monitors (Nuevos monitores) y selecciona Events (Eventos), e incluye `tags:deployment_analysis` en la consulta de búsqueda que define el monitor.


## Versiones desplegadas

Un servicio configurado con etiquetas `version` tiene una sección de versión en su Página de servicios, debajo de los gráficos de estado principales del servicio. La sección de versiones muestra todas las versiones del servicio que estuvieron activas durante el intervalo de tiempo seleccionado, con los servicios activos en la parte superior.

Por defecto, verás:

- Los nombres de las versiones desplegadas para este servicio a lo largo del tiempo.
- Las horas a las que trazas que corresponden a esta versión fueron vistas por primera y última vez.
- Un indicador de Error Types (Tipos de error), que muestra cuántos tipos de error aparecen en cada versión que no aparecían en la versión inmediatamente anterior.

  > **Nota:** Este indicador muestra errores que no se veían en trazas de la versión anterior. No significa que esta versión haya introducido necesariamente estos errores. Buscar nuevos tipos de error puede ser una buena forma de empezar a investigar errores.

- Solicitudes por segundo.
- Porcentaje de errores sobre el total de solicitudes.


Puedes añadir o eliminar columnas de este cuadro y tus selecciones se guardarán. Las columnas adicionales disponibles son:

- Endpoints activos en una versión que no estaban en la versión anterior.
- Tiempo activo, que muestra el tiempo transcurrido desde la primera traza hasta la última traza enviada a Datadog para esa versión.
- Número total de solicitudes.
- Número total de errores.
- Latencia medida por p50, p75, p90, p95, p99 o máx.

{{< img src="tracing/deployment_tracking/VersionComparison.png" alt="Versiones en la Página de servicios" style="width:100%;">}}

**Nota:** La sección de versiones solo aparece si hay más de una versión informando durante el intervalo de tiempo seleccionado en la parte superior de la página.

## Comparación del despliegue

Haz clic en cualquier fila de la tabla de resumen de versiones para abrir una página de comparación de versiones, que te permitirá comparar dos versiones del mismo servicio. Por defecto, la versión seleccionada se comparará con la versión inmediatamente anterior, pero puedes cambiar esto para comparar dos versiones cualesquiera de los últimos 30 días.

Encontrarás la siguiente información en la página de comparación de versiones:

- [Gráficos de comparación](#comparison-graphs): una visualización de solicitudes y errores de servicios, útil para observar varios tipos de [despliegues](#deployment-strategies).
- [Comparación de errores](#error-comparison): errores que se pueden haber introducido o haber solucionado una versión.
- [Comparación de endpoints](#endpoint-comparison): cómo se comportan la latencia y las tasas de error de los endpoints en cada versión.

### Gráficos comparativos

Al igual que los gráficos de la Página de servicios, los gráficos de solicitudes y errores muestran una visión general de un despliegue o de picos en las tasas de error. En esta página, los gráficos resaltan las versiones seleccionadas para su comparación y dejan el resto de versiones en gris para ofrecer un contexto adicional.

{{< img src="tracing/deployment_tracking/ComparisonGraphs.png" alt="Gráficos de comparación de despliegues" style="width:100%;">}}

Si [Continuous Profiler está activado][5], también podrás ver comparaciones de métricas de rendimiento clave, como el tiempo de CPU o la memoria asignada, desglosadas por recurso de APM. Desde ahí, puedes pasar a la [Página de comparación de perfiles][6]:

{{< img src="tracing/deployment_tracking/DeploymentTrackingProfileComparison.png" alt="Gráficos de comparación de perfiles de despliegues" style="width:100%;">}}

### Comparación de errores

Esta sección enumera las diferencias en los tipos de error detectados para cada una de las dos versiones y resalta:

 - Tipos de error que solo aparecen en la versión fuente, útiles para solucionar problemas;
 - Tipos de error que ya no aparecen en la versión original, útiles para validar correcciones; y
 - Tipos de error activos en ambos.

Desde esta tabla, puedes cambiar entre trazas activas o históricas correspondientes al error seleccionado para una investigación más detallada.

**Nota:** La comparación de errores se basa en los tipos de errores _observados_. Si un tipo de error es poco frecuente, es posible que ya no aparezca en la lista solo porque no se ha visto _todavía_.

{{< img src="tracing/deployment_tracking/ErrorComparison.mp4" alt="Comparación de errores" video=true style="width:100%;">}}

### Comparación de endpoints

Esta sección te permite comparar el rendimiento (solicitudes, latencia y errores) de cada endpoint en el servicio. Ordena la tabla por Value (Valor) para validar que los endpoints de mayor rendimiento siguen funcionando correctamente después de un despliegue, o por % Change (Porcentaje de cambio) para detectar grandes cambios en las tasas de latencia o error.

{{< img src="tracing/deployment_tracking/EndpointComparison.png" alt="Comparación de endpoint" style="width:100%;">}}

## Estrategias de despliegue

El rastreo de despliegues de Datadog te ofrece visibilidad del rendimiento del código desplegado cuando utilizas las siguientes estrategias de despliegue (u otras) para detectar despliegues de código defectuosos, contener el impacto de los cambios y responder más rápidamente a las incidencias.

### Despliegues móviles

Los despliegues móviles proporcionan cero caída del sistema dirigiendo el tráfico a otras instancias mientras se despliega una nueva versión en hosts o contenedores uno a uno.

Con Datadog, puedes monitorizar tus despliegues móviles y detectar cualquier aumento de errores resultante.

{{< img src="tracing/deployment_tracking/rolling.png" alt="Despliegue móvil" style="width:100%;">}}

### Despliegues azul-verde

Los despliegues azul-verde (u otra combinación de colores) reducen la caída del sistema ejecutando dos clústeres de servicios que aceptan tráfico, o manteniendo un despliegue en espera, listo para ser activado si hay problemas con el otro.

La configuración y visualización de etiquetas `version` para estos servicios te permite comparar solicitudes y errores para detectar si uno de los clústeres tiene una tasa de error más alta que el otro clúster, si un clúster no está cumpliendo los SLOs, o si recibe tráfico un clúster que se supone no debería estar haciéndolo.

{{< img src="tracing/deployment_tracking/BlueGreenDeploy.png" alt="Despliegue azul-verde" style="width:100%;">}}

### Despliegues canary

Con los despliegues canary, un servicio se despliega en un número limitado de hosts o para una fracción de clientes, para probar un nuevo despliegue con un impacto limitado.

El uso de etiquetas `version` dentro de Datadog te permite comparar las tasas de error, trazas y comportamiento de servicio para el despliegue canary.

Por ejemplo, puedes ver en la siguiente imagen que una versión canary fue desplegada, tenía algunos errores y fue eliminada, con trazas correspondientes a esa versión disponible para investigación sin ningún otro impacto.

{{< img src="tracing/deployment_tracking/canarydeployment.png" alt="Despliegue canary" style="width:100%;">}}

### Despliegue en las sombras

En un despliegue en las sombras, se despliega una versión candidata junto con la versión de producción, y el tráfico entrante se envía a ambos servicios, pero los usuarios ven solo los resultados de la versión de producción (aunque se recopilan datos de ambas).

Los despliegues en las sombras te permiten probar una versión potencial contra el tráfico real de producción. El etiquetado en las sombras con una etiqueta `version` te permite comparar las tasas de error, trazas y comportamiento del servicio entre las dos versiones para determinar si la versión en las sombras debe lanzarse.

## Uso de etiquetas de versión en otras partes de Datadog

La etiqueta `version` se puede utilizar en cualquier lugar dentro de Datadog, ya sea para filtrar una vista de búsqueda a una versión específica, o para comparar métricas de diferentes versiones.

### Página de recursos

{{< img src="tracing/deployment_tracking/ResourcePage.png" alt="Versiones en la Página de recursos" style="width:100%;">}}

En la Página de recursos, si la etiqueta de versión está disponible, el widget de solicitudes puede limitarse a:

- Total de solicitudes por versión
- Solicitudes por segundo por versión

El widget de errores puede limitarse a una de las tres opciones que implican la etiqueta `version`:

- Total de errores por versión
- Errores por segundo por versión
- Porcentaje de error por versión

Todos ellos pueden exportarse a dashboards y monitores.

### Búsqueda y análisis de traza

{{< img src="tracing/deployment_tracking/AnalyticsErrorsByVersion.mp4" alt="Versión en App Analytics" video=true style="width:100%;">}}

Cuando está disponible, puedes utilizar `version` como una etiqueta, tanto para la búsqueda de traza como para Analytics, ya sea para filtrar el modo de búsqueda en directo y trazas indexadas, o para filtrar o agrupar consultas de Analytics.

Los resultados de Analytics, incluido el filtrado en la etiqueta `version`, pueden exportarse a dashboards y monitores.

### Perfiles por versión

Puedes buscar perfiles que corresponden a una versión en particular. También puedes hacer clic en **View Profiles** (Ver perfiles) en la parte superior derecha de la página [Comparación de despliegues](#deployment-comparison) para abrir el Continuous Profiler correspondiente a cualquiera de las versiones comparadas.

{{< img src="tracing/deployment_tracking/VersionProfiler.png" alt="Filtrar perfiles por versión" style="width:100%;">}}

<br>

## La métrica de tiempo entre despliegues

Cada vez que se detecta un nuevo despliegue de un servicio, el Rastreo de despliegues calcula un valor para la métrica `time_between_deployments`, calculado como la duración en segundos entre el nuevo despliegue y el despliegue de la versión más reciente anterior a ese. 

### Definición de métrica

`datadog.service.time_between_deployments{env, service, second_primary_tag}`
: **Requisito:** esta métrica existe para cualquier servicio de APM con el etiquetado de versión habilitado a través del [etiquetado de servicios unificado][1].<br>
**Descripción:** el tiempo en segundos transcurrido entre el despliegue de un servicio y el despliegue de la versión más reciente anterior a esa.<br>
** Tipo de métrica:** [Distribution][2]<br>
**Etiquetas:** la métrica está etiquetada con `env`, `service` del servicio y la [segunda etiqueta primaria][3].

### Ejemplos

Si tienes un servicio que despliega la versión A en el momento = 0 y la versión B en el momento = 10, entonces el valor de la métrica `datadog.service.time_between_deployments` es 10:

Tiempo = 0
: `{service: foo, env: prod, cluster-name: dev-shopist, version: A}`

Tiempo = 10
: `{service: foo, env: prod, cluster_name: dev-shopist, version: B}`

Tiempo entre despliegues
: `datadog.service.time_between_deployments{env: prod, cluster_name: dev-shopist} = 10`


Si despliegas la versión X a la hora = 20 en el clúster `dev-shopist` , la versión Y a la hora = 30 en el clúster `us-staging` y la versión Y de nuevo a la hora = 45 en el clúster `dev-shopist`, el valor `max` de la métrica `datadog.service.time_between_deployments` para cualquier clúster es 25 (la hora de la versión Y más reciente menos la última versión X):

Tiempo = 20
: `{service: foo, env: staging, cluster-name: dev-shopist, version: X}`

Tiempo = 30
: `{service: foo, env: staging, cluster-name: us-staging, version: Y}`

Tiempo = 45
: `{service: foo, env: dev-shopist, cluster-name: us-staging, version: Y}`

Tiempo máximo entre despliegues:
: `max:datadog.service.time_between_deployments{env: staging, cluster-name: *} = 25`


## Leer más

{{< nombre parcial="whats-next/whats-next.html" >}}


[1]: /es/getting_started/tagging/unified_service_tagging/
[2]: /es/metrics/types/?tab=distribution#metric-types
[3]: /es/tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog
[4]: /es/watchdog/faulty_deployment_detection/
[5]: /es/profiler/enabling/
[6]: /es/profiler/compare_profiles