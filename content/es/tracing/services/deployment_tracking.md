---
aliases:
- /es/tracing/version_tracking
- /es/tracing/deployment_tracking/
description: Utilice Datadog para hacer seguimiento de sus despliegues mediante etiquetas
  de versión
further_reading:
- link: getting_started/tagging/unified_service_tagging/
  tag: Documentación
  text: Aprende sobre Unified Service Tagging y etiquetas reservadas
- link: tracing/app_analytics
  tag: Documentación
  text: Utiliza la versión como una dimensión en tus consultas de Análisis de Aplicaciones
title: Seguimiento de Despliegues
---
## La etiqueta de versión {#the-version-tag}

La etiqueta `version` está reservada dentro de Unified Service Tagging. Se aplica a métricas de infraestructura (servidor, contenedor, proceso y verificaciones de NPM), métricas de traza, trazas, perfiles y registros.

Puede usar la etiqueta `version` para hacer seguimiento de despliegues y del comportamiento del servicio en apoyo de su estrategia de implementación de software

Si no ha configurado la etiqueta `version`, consulte la [documentación de Unified Service Tagging][1] para obtener información sobre la configuración

## Uso de etiquetas de versión en la página de Servicio {#using-version-tags-on-the-service-page}

{{< img src="tracing/deployment_tracking/ServicePageRequestsErrorsByVersion.png" alt="Versiones en la página de Servicio" style="width:100%;">}}

En la página de Servicio, si la etiqueta `version` está disponible, puede limitar el widget de Solicitudes a:

- Total de Solicitudes por Versión, o
- Solicitudes Por Segundo por Versión

Puedes limitar el widget de errores a:

- Total de Errores por Versión
- Errores Por Segundo por Versión, o
- % Tasa de Error por Versión

Los widgets de Solicitudes y Errores pueden ser exportados a Dashboards y Monitors

## Usando etiquetas de versión para la detección automática de despliegues defectuosos {#using-version-tags-for-automatic-faulty-deployment-detection}

Configurar sus servicios con la etiqueta `version` habilita [Detección Automática de Despliegues Defectuosos][4]. 

Puedes configurar un monitor para recibir notificaciones automáticamente sobre todos los despliegues potencialmente defectuosos. Para hacerlo, navega a la página de Nuevo Monitor y elige Eventos, e incluye `tags:deployment_analysis` en la consulta de búsqueda que define el monitor.


## Versiones desplegadas {#versions-deployed}

Un servicio configurado con `version` etiquetas tiene una sección de versiones en su página de Servicio, debajo de los gráficos principales de salud del servicio. La sección de versiones muestra todas las versiones del servicio que estuvieron activas durante el intervalo de tiempo seleccionado, con los servicios activos en la parte superior.

Por defecto, verá:

- Los nombres de las versiones desplegadas para este servicio durante el periodo de tiempo.
- Los momentos en los que se vieron por primera y última vez las trazas que corresponden a esta versión.
- Un indicador de Tipos de Errores, que muestra cuántos tipos de errores aparecen en cada versión que no aparecieron en la versión inmediatamente anterior.

    > **Nota:** Este indicador muestra errores que no se vieron en las trazas de la versión anterior. No significa que esta versión necesariamente introdujo estos errores. Investigar nuevos tipos de errores puede ser una excelente manera de comenzar a investigar errores.

- Solicitudes por segundo.
- Tasa de error como un porcentaje del total de solicitudes.


Puede agregar columnas o eliminar columnas de esta tabla de resumen y sus selecciones se guardarán. Las columnas adicionales disponibles son:

- Puntos de conexión que están activos en una versión que no estaban en la versión anterior
- Tiempo activo, mostrando la duración desde la primera traza hasta la última traza enviada a Datadog para esa versión.
- Número total de solicitudes.
- Número total de errores.
- Latencia medida por p50, p75, p90, p95, p99 o máximo.

{{< img src="tracing/deployment_tracking/VersionComparison.png" alt="Versiones en la página de Servicio" style="width:100%;">}}

**Nota:** La sección de versiones aparece solo si hay más de una versión reportando durante el intervalo de tiempo seleccionado en la parte superior de la página.

## Comparación de despliegue {#deployment-comparison}

Haga clic en cualquier fila de versión en la tabla de resumen de versiones para abrir una página de comparación de versiones, lo que le permite comparar dos versiones del mismo servicio. Por defecto, la versión seleccionada se comparará con la versión inmediatamente anterior, pero puede cambiarla para comparar cualquier par de versiones dentro de los últimos 30 días.

Puede encontrar la siguiente información en la página de comparación de versiones:

- [Gráficas de comparación](#comparison-graphs): Una visualización de solicitudes y errores a servicios, útil para observar varios tipos de [despliegues](#deployment-strategies).
- [Comparación de errores](#error-comparison): Errores que pueden haber sido introducidos o resueltos por una versión.
- [Comparación de puntos de conexión](#endpoint-comparison): Cómo se desempeñan la latencia y las tasas de error de los puntos de conexión en cada versión

### Gráficas de comparación {#comparison-graphs}

Similar a las gráficas en la página de Servicio, las gráficas de solicitudes y errores muestran una visión general de un despliegue o picos en las tasas de error En esta página, las gráficas destacan las versiones seleccionadas para comparación y dejan todas las demás versiones en gris para contexto adicional.

{{< img src="tracing/deployment_tracking/ComparisonGraphs.png" alt="Gráficas de comparación de despliegue" style="width:100%;">}}

Si [el perfilador continuo está habilitado][5], también verá comparaciones de métricas clave de rendimiento, como el tiempo de CPU o la memoria asignada, desglosadas por recurso APM. Desde allí, puede pivotar a la [página de comparación de perfiles][6]:

{{< img src="tracing/deployment_tracking/DeploymentTrackingProfileComparison.png" alt="Gráficas de comparación de perfilado de despliegue" style="width:100%;">}}

### Comparación de errores {#error-comparison}

Esta sección lista las diferencias en los tipos de errores detectados para cada una de las dos versiones, destacando:

 - Tipos de errores que aparecen solo en la versión de origen, útiles para solucionar problemas;
 - Tipos de errores que ya no aparecen en la versión de origen, útiles para validar correcciones; y
 - Tipos de errores activos en ambas.

A partir de esta tabla, puedes pivotar hacia trazas en vivo o históricas correspondientes al error seleccionado para una investigación más profunda.

**Nota:** La comparación de errores se basa en los tipos de errores _observados_. Si un tipo de error es raro, podría estar listado como ya no apareciendo solo porque no se ha visto _aún_.

{{< img src="tracing/deployment_tracking/ErrorComparison.mp4" alt="Comparación de Errores" video=true style="width:100%;">}}

### Comparación de puntos de conexión {#endpoint-comparison}

Esta sección te permite comparar el rendimiento (solicitudes, latencia y errores) de cada punto de conexión en el servicio. Ordena la tabla por Valor para validar que los puntos de conexión de mayor rendimiento siguen siendo saludables después de un despliegue, o por % Cambio para detectar grandes cambios en la latencia o tasas de error.

{{< img src="tracing/deployment_tracking/EndpointComparison.png" alt="Comparación de puntos de conexión" style="width:100%;">}}

## Estrategias de despliegue {#deployment-strategies}

El seguimiento de despliegues de Datadog te brinda visibilidad sobre el rendimiento del código desplegado cuando utilizas las siguientes estrategias de despliegue (u otras) para detectar despliegues de código defectuoso, contener el impacto de los cambios y responder más rápido a incidentes.

### Despliegues en rolling {#rolling-deploys}

Los despliegues en rolling proporcionan cero tiempo de inactividad al dirigir el tráfico a otras instancias mientras se despliega una nueva versión a servidores o contenedores uno por uno

Usando Datadog, puedes hacer seguimiento de tus despliegues en rolling y detectar cualquier aumento en los errores resultantes.

{{< img src="tracing/deployment_tracking/rolling.png" alt="Despliegue en rolling" style="width:100%;">}}

### Despliegues azul y verde {#blue-and-green-deploys}

Los despliegues azul y verde (o cualquier otra combinación de colores) reducen el tiempo de inactividad al ejecutar dos clústeres de servicios que están aceptando tráfico, o manteniendo uno en espera, listo para ser activado si hay problemas con el otro.

Configurar y visualizar las etiquetas `version` para estos servicios te permite comparar solicitudes y errores para detectar si uno de los clústeres tiene una tasa de errores más alta que el otro clúster, si un clúster no está cumpliendo con los SLO, o si un clúster que no debería estar recibiendo tráfico lo está.

{{< img src="tracing/deployment_tracking/BlueGreenDeploy.png" alt="Despliegue Azul/Verde" style="width:100%;">}}

### Despliegues Canary {#canary-deploys}

Con los despliegues canary, un servicio se despliega en un número limitado de servidores o para una fracción de clientes, para probar un nuevo despliegue con un impacto limitado

Usar `version` etiquetas dentro de Datadog te permite comparar tasas de error, trazas y comportamiento del servicio para el despliegue canary.

Por ejemplo, puedes ver en la siguiente imagen que se desplegó una versión canary, tuvo algunos errores y fue eliminada, con trazas correspondientes a esa versión disponibles para investigación sin ningún impacto adicional.

{{< img src="tracing/deployment_tracking/canarydeployment.png" alt="Despliegue canary" style="width:100%;">}}

### Despliegues Shadow {#shadow-deploys}

En un despliegue shadow, una versión candidata a lanzamiento se despliega junto a la versión de producción, y el tráfico entrante se envía a ambos servicios, con los usuarios viendo los resultados solo de producción, pero permitiéndote recopilar datos de ambos.

Los despliegues shadow te permiten probar un posible lanzamiento contra tráfico de producción real. Etiquetar sombras con una `version` etiqueta te permite comparar tasas de error, trazas y comportamiento del servicio entre las dos versiones para determinar si la versión shadow debe ser lanzada.

## Usando etiquetas de versión en otros lugares dentro de Datadog {#using-version-tags-elsewhere-within-datadog}

La etiqueta `version` puede ser utilizada en cualquier lugar dentro de Datadog, ya sea para filtrar una vista de búsqueda a una versión específica, o para comparar métricas de diferentes versiones.

### Página de recursos {#resource-page}

{{< img src="tracing/deployment_tracking/ResourcePage.png" alt="Versiones en la Página de Recursos" style="width:100%;">}}

En la página de recursos, si la etiqueta de versión está disponible, el widget de solicitudes puede ser limitado a cualquiera de:

- Total de Solicitudes por Versión
- Solicitudes por segundo por Versión

El widget de errores puede ser limitado a una de tres opciones que involucran la etiqueta `version`:

- Total de Errores por Versión
- Errores por segundo por Versión
- % Tasa de error por Versión

Todos estos pueden ser exportados a dashboards y monitors.

### Búsqueda de trazas y análisis {#trace-search-and-analytics}

{{< img src="tracing/deployment_tracking/AnalyticsErrorsByVersion.mp4" alt="Versión en App Analytics" video=true style="width:100%;">}}

Cuando esté disponible, `version` puede ser utilizado como una etiqueta tanto para la búsqueda de trazas como para análisis, ya sea para filtrar el modo de búsqueda en vivo y las trazas indexadas, o para filtrar o agrupar consultas de análisis.

Los análisis, incluyendo el filtrado en la etiqueta `version`, pueden ser exportados a dashboards y monitors.

### Perfiles por Versión {#profiles-by-version}

Puede buscar perfiles que correspondan a una versión particular. También puede hacer clic en **View Profiles** en la parte superior derecha de la página [Deployment Comparison](#deployment-comparison) para abrir el Continuous Profiler limitado a cualquiera de las versiones que se están comparando.

{{< img src="tracing/deployment_tracking/VersionProfiler.png" alt="Filtrar Perfiles por Versión" style="width:100%;">}}

<br>

## La métrica del tiempo entre despliegues {#the-time-between-deployments-metric}

Cada vez que se detecta un nuevo despliegue de un servicio, Deployment Tracking calcula un valor para la métrica `time_between_deployments`, calculado como la duración en segundos entre el nuevo despliegue y el despliegue de la versión más reciente anterior a ese. 

### Definición de métrica {#metric-definition}

`datadog.service.time_between_deployments{env, service, second_primary_tag}`
: **Requisito previo:** Esta métrica existe para cualquier servicio APM con version tagging habilitado a través de [unified service tagging][1].<br>
**Descripción:** El tiempo en segundos transcurrido entre un despliegue de un servicio y el despliegue de la versión más reciente anterior a ese.<br>
**Tipo de métrica:** [Distribution][2]<br>
**Etiquetas:** La métrica está etiquetada con el `env` del servicio, `service`, y [second primary tag][3].

### Ejemplos {#examples}

Si tiene un servicio que despliega la versión A en el tiempo = 0 y la versión B en el tiempo = 10, entonces el valor de la métrica `datadog.service.time_between_deployments` es 10:

Tiempo = 0
: `{service: foo, env: prod, clúster: dev-shopist, Versión: A}`

Tiempo = 10
: `{service: foo, env: prod, clúster: dev-shopist, Versión: B}`

Tiempo entre despliegues
: `datadog.service.time_between_deployments{env: prod, cluster_name: dev-shopist} = 10`


Si despliega la versión X a tiempo = 20 en el clúster `dev-shopist`, la versión Y a tiempo = 30 en el clúster `us-staging`, y la versión Y nuevamente a tiempo = 45 en el clúster `dev-shopist`, el valor `max` de la métrica `datadog.service.time_between_deployments` para cualquier clúster es 25 (el tiempo de la Y más reciente menos la última X): 

Tiempo = 20
: `{service: foo, env: staging, cluster-name: dev-shopist, version: X}`

Tiempo = 30
: `{service: foo, env: staging, cluster-name: us-staging, version: Y}`

Tiempo = 45
: `{service: foo, env: staging, cluster-name: dev-shopist, version: Y}`

Tiempo máximo entre despliegues:
: `max:datadog.service.time_between_deployments{env: staging, cluster-name: *} = 25`


## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/getting_started/tagging/unified_service_tagging/
[2]: /es/metrics/types/?tab=distribution#metric-types
[3]: /es/tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog
[4]: /es/watchdog/faulty_deployment_detection/
[5]: /es/profiler/enabling/
[6]: /es/profiler/compare_profiles