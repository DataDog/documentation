---
aliases:
- /es/journey_monitoring/uptime/
description: Inspeccione el rendimiento de cada recorrido con un informe detallado
  que combina datos de Product Analytics, Real User Monitoring, Synthetic Monitoring
  & Testing y Session Replay.
further_reading:
- link: /journey_monitoring/
  tag: Documentación
  text: Obtenga información sobre Journey Monitoring
- link: /journey_monitoring/map/
  tag: Documentación
  text: Obtenga información sobre el mapa
- link: /journey_monitoring/suggested_journeys/
  tag: Documentación
  text: Obtenga información sobre los recorridos sugeridos
- link: /journey_monitoring/variants/
  tag: Documentación
  text: Obtenga información sobre las variantes de recorridos
- link: https://www.datadoghq.com/blog/rum-operations-monitoring/
  tag: Blog
  text: Haga un seguimiento del rendimiento de los pasos críticos en los recorridos
    de usuario con operaciones de RUM
title: Informe de detalles del recorrido
---
## Descripción general {#overview}

El informe de detalles del recorrido combina datos de comportamiento del usuario y rendimiento técnico de [Product Analytics][3], [Session Replay][4], [Real User Monitoring (RUM)][1] y [Synthetic Monitoring & Testing][2].

{{< img src="journey_monitoring/journey-monitoring-details-report-2.png" alt="El informe de detalles de Journey Monitoring que muestra los indicadores clave de rendimiento, los conocimientos sobre el comportamiento del usuario y las mediciones de rendimiento técnico de un recorrido específico." style="width:100%;" >}}

### Filtros de recorrido y variante {#journey-and-variant-filters}

El recorrido y sus [variantes][5] actúan como filtros de informe. El recorrido se selecciona de forma predeterminada e incluye datos de todas las variantes. Seleccione una variante para filtrar el informe por esa ruta.

### Filtros de atributos {#attribute-filters}

Los [filtros de atributos][22] se aplican junto con el recorrido o la variante seleccionados. Filtran el informe para mostrar las sesiones que activaron el recorrido y coinciden con los atributos seleccionados.

### Embudo {#funnel}

El [embudo][6] muestra el tráfico, la tasa de conversión y el tiempo promedio de conversión para cada paso. El embudo también enumera los factores asociados con la conversión y el abandono. Haga clic en **View Details** para analizar los patrones de abandono.

### Tendencias de tráfico y conversión {#traffic-and-conversion-trends}

La sección de tendencias de tráfico y conversión muestra estos indicadores clave de rendimiento (KPI):

- **Volumen de inicios**: Intentos totales de recorrido en todas las sesiones de usuario
- **Volumen de conversiones**: Intentos de recorrido completados en todas las sesiones de usuario
- **Tiempo promedio de conversión**: Tiempo promedio requerido para completar el recorrido
- **Tasa de conversión**: Porcentaje de intentos de recorrido que se completaron

Cada KPI compara el marco de tiempo seleccionado con el marco de tiempo inmediatamente anterior de la misma duración. Por ejemplo, si selecciona una semana, la comparación utiliza la semana anterior. Si selecciona un día, utiliza el día anterior. Las métricas de volumen y tiempo de conversión muestran cambios porcentuales, mientras que la tasa de conversión muestra el cambio en puntos porcentuales.

#### Fuente y retención de KPI {#kpi-source-and-retention}

La fuente de datos y el periodo de retención de los KPI dependen del acceso a Product Analytics:

- **Preview**: Utiliza todos los datos de Product Analytics de una ventana móvil de 30 días
- **Trial**: Utiliza todos los datos de Product Analytics del periodo de prueba completo
- **Paid**: Utiliza todos los datos de Product Analytics de una ventana móvil de 15 meses
- **Product Analytics not enabled**: Utiliza métricas de [RUM without Limits&trade;][18]

Con RUM without Limits, el volumen de inicios, el volumen de conversiones y la tasa de conversión utilizan la métrica `rum.measure.journey`. El tiempo promedio de conversión utiliza `rum.measure.journey.duration`.

## Product Analytics {#product-analytics}

<div class="alert alert-info">Los datos en esta sección solo están disponibles con una prueba activa de Product Analytics o una suscripción de pago.</div>

{{< img src="journey_monitoring/journey-monitoring-details-report-product-analytics.png" alt="La sección de detalles del informe de Journey Monitoring que muestra las rutas principales y los usuarios de un recorrido específico para las sesiones convertidas y abandonadas." style="width:100%;" >}}

### Rutas principales {#top-paths}

La [visualización Top Paths][12] muestra cómo se mueven los usuarios a través del recorrido entre los pasos seleccionados. Compare las rutas de los usuarios que convirtieron con las rutas de los usuarios que abandonaron.

La visualización muestra las rutas más comunes, las cuales podrían no representar el 100% de los recorridos completados. El pie de página muestra el porcentaje y el número de sesiones representadas por las rutas restantes.

### Usuarios {#users}

La tabla de usuarios enumera a los principales usuarios que realizaron una conversión o abandonaron durante el recorrido. Haga clic en un usuario para visualizar sus grabaciones de Session Replay de las sesiones en las que experimentó el recorrido.

## Real User Monitoring {#real-user-monitoring}

<div class="alert alert-info">Los datos en esta sección están disponibles solo con una prueba activa o una suscripción paga a RUM without Limits&trade;.</div>

{{< img src="journey_monitoring/journey-monitoring-details-report-real-user-monitoring.png" alt="La sección del informe de detalles de Journey Monitoring que muestra las operaciones de RUM de un recorrido específico y series temporales de problemas de frontend." style="width:100%;" >}}

### Operaciones {#operations}

La tabla [operaciones][7] incluye Operaciones de RUM vinculadas y no vinculadas. Las agrupa por estado de [objetivo de nivel de servicio (SLO)][19]:

- **Critical**: Operaciones vinculadas al recorrido que tienen al menos un SLO con una tasa de consumo alta.
- **OK**: Operaciones vinculadas al recorrido que tienen al menos un SLO y cuyos SLO están todos en estado OK.
- **Matching**: Operaciones no vinculadas que Datadog identifica mediante correlación temporal. Es posible que las operaciones coincidentes no tengan un SLO.

Las operaciones vinculadas en las categorías **Critical** y **OK** son las mismas operaciones cuyos SLO contribuyen al [estado del recorrido][15].

Revise y vincule las operaciones coincidentes que los usuarios encuentran durante el recorrido. Para obtener orientación sobre la configuración, consulte [Revisar operaciones coincidentes][14].

Cuando ninguna operación coincidente represente una acción crítica, siga [Crear operaciones][23]. Si crea una desde la tabla, Datadog la vincula al recorrido y crea un SLO de disponibilidad con un objetivo del 99 %.

Cada fila de operación también muestra su recuento de ejecución y tasa de éxito, calculados usando la métrica `rum.measure.operation`, y su latencia p75, calculada usando la métrica `rum.measure.operation.duration`.

<div class="alert alert-tip">Si Bits AI está habilitado para su organización, inicie una <a href="/real_user_monitoring/ai_investigations/operation_ai_investigation/">Bits Investigation</a> desde una operación para solucionar fallas o regresiones de latencia.</div>

Haga clic en una operación para abrir su panel lateral de rendimiento. El panel muestra:
- La lista de SLO y seguimientos configurados para la operación
- El volumen, la tasa de éxito y la latencia de la operación
- Dónde se ejecutó la operación dentro del ciclo de vida del recorrido

Si RUM está conectado a las [trazas de Application Performance Monitoring (APM)][11], el panel lateral también lista las dependencias de los servicios backend y sus métricas de rendimiento. Haga clic en un servicio backend para abrir su entrada en el [Catalog][8] de APM.

### Recuento de errores {#error-count}

El gráfico de recuento de errores traza los problemas de frontend de [Error Tracking][9] que ocurrieron durante el recorrido. Haga clic en **Investigate** para revisar los problemas principales, luego seleccione un problema para abrirlo en Error Tracking.

## Synthetic Monitoring & Testing {#synthetic-monitoring-testing}

<div class="alert alert-info">Los datos en esta sección solo están disponibles con una prueba activa o una suscripción de pago a <a href="/synthetics/browser_tests/">Synthetic Browser Tests</a> o <a href="/synthetics/mobile_app_testing/">Synthetic Mobile Tests</a>.</div>

{{< img src="journey_monitoring/journey-monitoring-details-report-synthetics.png" alt="La sección de detalles del informe de Journey Monitoring que muestra las pruebas Synthetic de un recorrido específico." style="width:100%;" >}}

### Cobertura del conjunto de pruebas y del recorrido {#test-suite-and-journey-coverage}

Para recorridos basados en eventos, Datadog crea un [conjunto de pruebas][10] cuando el creador del recorrido tiene acceso de escritura a Synthetic Monitoring. El conjunto de pruebas tiene el mismo nombre que el recorrido. En una configuración solo de Synthetics, el conjunto de pruebas existente define el recorrido.

El widget del conjunto de pruebas muestra el rendimiento del conjunto y el [tiempo de actividad][13]. El SLO de tiempo de actividad del conjunto de pruebas representa el tiempo de actividad del recorrido y contribuye al estado del recorrido. Una tasa de consumo alta en este SLO coloca al recorrido en estado **Degraded**. El SLO tiene un objetivo predeterminado editable del 99,9 %.

Un recorrido tiene [cobertura Synthetic][20] cuando su conjunto de pruebas contiene al menos una prueba que lo cubre. Para recorridos basados en eventos, Datadog identifica nuevas [pruebas coincidentes][21] a medida que la aplicación cambia. Agregue o elimine pruebas para mantener la cobertura del conjunto de pruebas alineada con el recorrido.

### Tabla de pruebas {#tests-table}

La tabla de pruebas Synthetic incluye pruebas que pertenecen al conjunto de pruebas del recorrido y pruebas coincidentes que no pertenecen a él. Las agrupa por estado:

- **Alert**: Pruebas en el conjunto de pruebas del recorrido que están en estado de alerta.
- **OK**: Pruebas en el conjunto de pruebas del recorrido que están en estado OK.
- **Matching**: Pruebas que Datadog identifica como pruebas que cubren el recorrido, pero que no están en su conjunto de pruebas.

Cada fila de prueba también muestra su nombre, dominio y tiempo de actividad.

<div class="alert alert-tip">Si Bits AI está habilitado para su organización, inicie una <a href="/bits_ai/bits_investigation/investigate_issues/#from-the-synthetic-test-details-page">Bits Investigation</a> desde una prueba en estado <strong>Alert</strong> para identificar su causa raíz.</div>

Haga clic en **Manage Tests** para agregar o eliminar pruebas del conjunto de pruebas, o en **New Test** para crear una prueba.

## Lecturas adicionales {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/
[2]: /es/synthetics/
[3]: /es/product_analytics/
[4]: /es/session_replay/
[5]: /es/journey_monitoring/variants/
[6]: /es/product_analytics/charts/funnel_analysis/
[7]: /es/real_user_monitoring/operations_monitoring/
[8]: /es/internal_developer_portal/catalog/
[9]: /es/error_tracking/
[10]: /es/synthetics/test_suites/
[11]: /es/real_user_monitoring/correlate_with_other_telemetry/apm?tab=browserrum
[12]: /es/product_analytics/charts/journey_paths/
[13]: /es/synthetics/test_suites/#service-level-objectives
[14]: /es/journey_monitoring/configuring_journeys/#review-matching-operations
[15]: /es/journey_monitoring/status/#rum-operation-slos
[18]: /es/real_user_monitoring/rum_without_limits/
[19]: /es/service_level_objectives/
[20]: /es/journey_monitoring/configuring_journeys/#step-3-add-synthetic-test-coverage
[21]: /es/journey_monitoring/configuring_journeys/#review-matching-tests
[22]: /es/journey_monitoring/configuring_journeys/#attribute-filters
[23]: /es/journey_monitoring/configuring_journeys/#create-operations