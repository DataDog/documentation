---
description: Comprenda cómo Datadog determina el estado de un recorrido.
further_reading:
- link: /journey_monitoring/
  tag: Documentación
  text: Obtenga información sobre Journey Monitoring
- link: /real_user_monitoring/operations_monitoring/
  tag: Documentación
  text: Obtenga información sobre RUM Operations Monitoring
- link: /journey_monitoring/details_report/#synthetic-monitoring--testing
  tag: Documentación
  text: Obtenga información sobre la cobertura de pruebas Synthetic
title: Estado del recorrido
---
## Descripción general {#overview}

El estado del recorrido resume la salud técnica de un recorrido como **Healthy**, **Degraded** o **Missing coverage**. Datadog calcula el estado a partir de dos tipos de entradas de [objetivo de nivel de servicio (SLO)][10]:

- SLOs en [operaciones de Real User Monitoring (RUM)][1] vinculados al recorrido
- El [SLO de tiempo de actividad][11] del [conjunto de pruebas Synthetic][2] del recorrido

El estado del recorrido refleja el estado más reciente de estas entradas. No proporciona un historial de estado ni define un objetivo o ventana de evaluación independiente.

{{< img src="journey_monitoring/journey-monitoring-status.png" alt="Descripción general del recorrido que muestra un estado degradado causado por pruebas fallidas y una alta tasa de consumo del conjunto de pruebas." style="width:100%;" >}}

## Entradas de estado {#status-inputs}

Datadog evalúa la [tasa de consumo][3] de cada entrada de SLO:

- **High burn**: El SLO consume su presupuesto de error más rápido de lo que permite su objetivo y está incumpliendo o a punto de incumplir.
- **Low burn or OK**: El SLO consume su presupuesto de error a una tasa aceptable.
- **No Data**: Datadog excluye el SLO del cálculo.

El estado del recorrido no requiere ambos tipos de entrada. Un solo SLO de consumo alto de cualquier tipo hace que el recorrido esté **Degraded**.

### SLOs de operaciones de RUM {#rum-operation-slos}

<div class="alert alert-info">La creación de operaciones de RUM requiere un período de prueba activo o una suscripción de pago a <a href="/real_user_monitoring/rum_without_limits/">RUM without Limits&trade;</a>. Después de vincular una operación a un recorrido, sus SLOs pueden contribuir al estado del recorrido.</div>

La entrada de la operación de RUM tiene una tasa de consumo alta cuando al menos un SLO en una operación vinculada tiene una tasa de consumo alta. Es saludable cuando se incluye al menos un SLO de operación y cada SLO incluido tiene una tasa de consumo baja o está en estado OK.

Una operación de RUM vinculada se identifica explícitamente como parte de la ruta crítica del recorrido. La vinculación distingue las operaciones que los usuarios encuentran durante el recorrido de las operaciones no relacionadas que se ejecutan al mismo tiempo.

Datadog excluye las operaciones no vinculadas y las operaciones vinculadas sin un SLO del cálculo de estado. Cuando vincula una operación sin un SLO, Datadog crea un SLO de disponibilidad con un objetivo del 99 %. Personalice este SLO o agregue más SLOs de disponibilidad y latencia según sea necesario. Para obtener orientación, consulte [Mejores prácticas para crear SLOs para operaciones de RUM][4].

Administre los vínculos desde el informe de detalles de la operación, el [informe de detalles][5] del recorrido o la [RUM Operations API][7].

### SLO de tiempo de actividad del conjunto de pruebas {#test-suite-uptime-slo}

<div class="alert alert-info">La creación o administración del conjunto de pruebas y las pruebas que proporcionan esta entrada de estado requiere un período de prueba activo o una suscripción de pago a <a href="/synthetics/browser_tests/">Synthetic Browser Tests</a> o <a href="/synthetics/mobile_app_testing/">Synthetic Mobile Tests</a>.</div>

El conjunto de pruebas tiene un SLO de tiempo de actividad por intervalos de tiempo que evalúa sus pruebas críticas. Las pruebas son críticas de forma predeterminada. Marque una prueba como no crítica para excluirla del SLO de tiempo de actividad sin quitarla del conjunto de pruebas.

La entrada del conjunto de pruebas tiene una tasa de consumo alta cuando su SLO de tiempo de actividad tiene una tasa de consumo alta. Está en buen estado cuando el SLO de tiempo de actividad tiene una tasa de consumo baja o está en estado OK. Si el conjunto de pruebas no tiene datos de prueba, Datadog excluye esta entrada del cálculo.

## Cálculo de estado {#status-calculation}

Datadog combina las entradas incluidas de las operaciones de RUM y del conjunto de pruebas:

- **Degraded**: al menos un SLO incluido tiene una tasa de consumo alta
- **Healthy**: al menos un SLO está incluido y todos los SLOs incluidos tienen una tasa de consumo baja o están en estado OK
- **Coberturas que faltan**: No queda ninguna entrada de SLO en el cálculo. Esto ocurre cuando el recorrido no tiene entradas configuradas o cuando todas las entradas configuradas reportan **No Data**

Los cambios en las entradas del recorrido afectan su estado automáticamente. Esto incluye vincular operaciones de RUM y agregar o eliminar pruebas del conjunto de pruebas.

## Investigar el estado del recorrido {#investigate-journey-status}

Visualice el estado del recorrido en el [catálogo][12], el [mapa][13] y el informe de detalles:

- Para un recorrido **Degraded**, Datadog enlaza a las operaciones **Critical** o a las pruebas Synthetic en estado **Alert** que contribuyen al estado. Si Bits AI está habilitado para su organización, inicie una [Bits Investigation][14] desde la operación o prueba para identificar la causa raíz.
- Para un recorrido con **Missing coverage**, [vincule una operación con un SLO][8] o [agregue una prueba de cobertura][9]. Si la cobertura está configurada, confirme que sus entradas de SLO reporten datos.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/operations_monitoring/
[2]: /es/journey_monitoring/details_report/#synthetic-monitoring--testing
[3]: /es/service_level_objectives/#slo-burn-rate-indicator
[4]: /es/real_user_monitoring/guide/best-practices-for-creating-slos-on-operations/
[5]: /es/journey_monitoring/details_report/
[7]: /es/api/latest/rum-operations/
[8]: /es/journey_monitoring/configuring_journeys/#review-matching-operations
[9]: /es/journey_monitoring/configuring_journeys/#manage-tests
[10]: /es/service_level_objectives/
[11]: /es/synthetics/test_suites/#service-level-objectives
[12]: /es/journey_monitoring/overview/#journey-catalog
[13]: /es/journey_monitoring/map/
[14]: /es/bits_ai/bits_investigation/