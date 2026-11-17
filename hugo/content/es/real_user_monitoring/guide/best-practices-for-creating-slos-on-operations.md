---
description: Aprenda a crear SLO de disponibilidad y latencia a partir de métricas
  de operaciones de RUM.
further_reading:
- link: /real_user_monitoring/operations_monitoring/?tab=browser
  tag: Documentación
  text: Obtenga información sobre el monitoreo de operaciones
- link: /service_level_objectives/metric/
  tag: Documentación
  text: Cree SLO basados en métricas
- link: /journey_monitoring/
  tag: Documentación
  text: Obtenga información sobre Journey Monitoring
- link: /real_user_monitoring/guide/best-practices-for-operations-setup/
  tag: Guía
  text: Prácticas recomendadas para configurar operaciones de RUM
- link: https://www.datadoghq.com/blog/rum-operations-monitoring/
  tag: Blog
  text: Haga un seguimiento del rendimiento de los pasos críticos en los recorridos
    de usuario con operaciones de RUM
title: Mejores prácticas para crear SLO para operaciones de RUM
---
## Descripción general {#overview}

Las [operaciones de RUM][1] miden la disponibilidad y la latencia de los pasos técnicos en un [recorrido de usuario][2]. Por ejemplo, una operación puede rastrear si una solicitud de finalización de compra se realiza correctamente y cuánto tiempo tarda en completarse.

Utilice dos métricas de operación para crear [SLO basados en métricas][3]:

- Utilice `rum.measure.operation` para crear un **SLO de disponibilidad** basado en la tasa de éxito de la operación.
- Utilice `rum.measure.operation.duration` para crear un **SLO de latencia** basado en el tiempo de finalización de la operación.

Ambas métricas incluyen etiquetas `operation.name`, `operation.status`, `operation.failure_reason` y `application.id`, que usted utiliza para definir las consultas de los SLO.

Cree SLO de disponibilidad y latencia por separado para medir estos aspectos distintos del estado de la operación.

## Requisitos previos {#prerequisites}

- [RUM without Limits][4] está habilitado para su organización.
- Usted ha [configurado al menos una operación de RUM][5].

## Comprenda los resultados de la operación {#understand-operation-outcomes}

La forma en que maneja cada resultado de operación depende de lo que mida el SLO:

| Resultado                | SLO de disponibilidad | SLO de latencia                                      |
|------------------------|------------------|--------------------------------------------------|
| Éxito                | Evento bueno       | Bueno si está en el umbral o por debajo de él; malo si lo supera     |
| Error u otro fallo | Evento malo        | Excluido                                         |
| Abandono            | Excluido         | Malo por encima del umbral; de lo contrario, excluido      |
| Tiempo de espera                | Evento malo        | Excluido                                         |

**Los SLO de disponibilidad excluyen los abandonos** porque un usuario que se retira antes de que finalice una operación no necesariamente ha experimentado una falla técnica. **Los SLO de latencia incluyen los abandonos** solo cuando su duración supera el umbral. Este tratamiento también evita que un abandono cuente en ambos SLO.

**Los SLO de disponibilidad incluyen los tiempos de espera** como eventos fallidos para mantener la paridad con otras fallas de operación y evitar ocultar problemas potenciales en rutas que no registran un final de operación. **Los SLO de latencia excluyen los tiempos de espera** porque RUM registra el inicio de la operación pero no su final, por lo que la duración no mide de manera confiable el rendimiento de la aplicación.

## Vaya a la creación de SLO {#navigate-to-slo-creation}

Usted puede abrir el flujo de trabajo de creación de SLO desde RUM o desde la página de SLO.

### Vaya desde RUM {#navigate-from-rum}

Comenzar desde el informe de operaciones es más conveniente porque Datadog utiliza la operación seleccionada para inicializar la consulta de SLO. Comenzar desde la página de SLO requiere que usted cree la consulta de operación desde cero.

1. Vaya a **RUM > Performance Monitoring > Operations** (RUM > Monitoreo de rendimiento > Operaciones).
2. Seleccione una operación del catálogo.
3. En la sección {{< ui >}}SLOs{{< /ui >}} en la parte superior del informe de operaciones, haga clic en {{< ui >}}Create{{< /ui >}}.
4. Seleccione el tipo de SLO que desea crear.

### Vaya desde la página de SLO {#navigate-from-the-slo-page}

1. En la navegación de la izquierda, seleccione **Monitoring > SLOs** (Monitoreo > SLOs).
2. Haga clic en {{< ui >}}\+ New SLO{{< /ui >}}, luego seleccione {{< ui >}}By Count{{< /ui >}}.

Después de abrir el flujo de trabajo de creación de SLO, [configure la consulta de SLO](#configure-the-slo-query) para un SLO de disponibilidad o latencia.

## Configure la consulta de SLO {#configure-the-slo-query}

Elija la consulta que corresponda al tipo de SLO que desea crear. Reemplace `<OPERATION_NAME>` con el nombre de la operación y `<APPLICATION_ID>` con el ID de la aplicación RUM.

### SLO de disponibilidad {#availability-slo}

Un SLO de disponibilidad mide si la operación se completa con éxito:

- **Los eventos buenos** incluyen las operaciones exitosas.
- **Los eventos malos** incluyen las operaciones fallidas, excepto los abandonos.

{{< img src="real_user_monitoring/guide/operations-monitoring/operations-monitoring-availability-slo-example.png" alt="Página de creación de SLO que muestra un SLO de disponibilidad basado en conteo con consultas de eventos buenos y malos y gráficos de vista previa" style="width:100%;" >}}

Utilice esta consulta sin procesar para eventos buenos:

{{< code-block lang="text" >}}
sum:rum.measure.operation{operation.name:<OPERATION_NAME> AND application.id:<APPLICATION_ID> AND operation.status:success}.as_count()
{{< /code-block >}}

Utilice esta consulta sin procesar para eventos malos:

{{< code-block lang="text" >}}
sum:rum.measure.operation{operation.name:<OPERATION_NAME> AND application.id:<APPLICATION_ID> AND operation.status:failure AND NOT operation.failure_reason:abandoned}.as_count()
{{< /code-block >}}

El SLO calcula la disponibilidad como `successful operations / (successful operations + non-abandoned failures)`.

### SLO de latencia {#latency-slo}

Un SLO de latencia mide si la operación se completa dentro de una duración aceptable. Elija un umbral basado en la experiencia de usuario esperada y la duración observada de la operación. Por ejemplo, si los usuarios esperan que la confirmación de una compra se complete en tres segundos, utilice un umbral de tres segundos.

{{< img src="real_user_monitoring/guide/operations-monitoring/operations-monitoring-latency-slo-example.png" alt="Página de creación de SLO que muestra un SLO de latencia basado en conteo con consultas de eventos buenos y malos y gráficos de vista previa" style="width:100%;" >}}

La métrica `rum.measure.operation.duration` utiliza nanosegundos. Multiplique los segundos por `1,000,000,000` para convertir el umbral a nanosegundos. Por ejemplo, tres segundos equivalen a `3,000,000,000` nanosegundos.

Reemplace `<LATENCY_THRESHOLD_NS>` con el umbral en nanosegundos y luego configure los siguientes eventos:

- **Los eventos buenos** incluyen operaciones exitosas que se completan en el umbral o por debajo de él.
- **Los eventos malos** incluyen operaciones exitosas y abandonadas por encima del umbral.

Utilice esta consulta sin procesar para eventos buenos:

{{< code-block lang="text" >}}
count(v: v<=<LATENCY_THRESHOLD_NS>):rum.measure.operation.duration{operation.name:<OPERATION_NAME> AND application.id:<APPLICATION_ID> AND operation.status:success}.as_count()
{{< /code-block >}}

Defina los eventos malos como la suma de estas dos consultas sin procesar:

{{< code-block lang="text" >}}
count(v: v><LATENCY_THRESHOLD_NS>):rum.measure.operation.duration{operation.name:<OPERATION_NAME> AND application.id:<APPLICATION_ID> AND operation.status:success}.as_count()
{{< /code-block >}}

{{< code-block lang="text" >}}
count(v: v><LATENCY_THRESHOLD_NS>):rum.measure.operation.duration{operation.name:<OPERATION_NAME> AND application.id:<APPLICATION_ID> AND operation.status:failure AND operation.failure_reason:abandoned}.as_count()
{{< /code-block >}}

El SLO calcula la latencia como `fast successful operations / (all successful operations + slow abandoned operations)`.

### Complete el SLO {#complete-the-slo}

Después de configurar la consulta de disponibilidad o latencia:

1. Comience con un objetivo del 99 % en una ventana móvil de 30 días para un recorrido crítico del usuario. Ajuste el objetivo según los requisitos de confiabilidad y el rendimiento histórico del recorrido.
2. Aplique el mismo contexto, filtros y grupos a cada consulta.
3. Agregue un nombre descriptivo y etiquetas opcionales.
4. Guarde el SLO.

## Valide los SLO {#validate-the-slos}

Valide los SLO después de crearlos:

1. Confirme que las consultas de eventos buenos y malos no se superpongan.
2. Verifique que todas las consultas utilicen el mismo contexto de operación, filtros y grupos.
3. Compare los conteos de eventos del SLO con el volumen de operaciones en la página {{< ui >}}Operations{{< /ui >}}.
4. Revise las [operaciones con tiempo de espera agotado][6] (consulte la nota en **Paralelización**). Una tasa alta de operaciones que agotan el tiempo de espera puede indicar que algunas rutas de la aplicación inician una operación sin registrar su finalización.
5. Confirme que el umbral de latencia utilice nanosegundos y represente un tiempo de finalización aceptable para la operación.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/operations_monitoring/?tab=browser
[2]: /es/journey_monitoring/
[3]: /es/service_level_objectives/metric/
[4]: /es/real_user_monitoring/rum_without_limits/
[5]: /es/real_user_monitoring/guide/best-practices-for-operations-setup/
[6]: /es/real_user_monitoring/operations_monitoring/?tab=browser#parallelization