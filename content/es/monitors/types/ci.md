---
aliases:
- /es/monitors/monitor_types/ci_pipelines/
- /es/monitors/create/types/ci_pipelines/
- /es/monitors/create/types/ci/
further_reading:
- link: /monitors/notify/
  tag: Documentación
  text: Configurar las notificaciones de tu monitor
- link: /monitors/downtimes/
  tag: Documentación
  text: Programar un tiempo de inactividad para silenciar un monitor
- link: /monitors/manage/status/
  tag: Documentación
  text: Comprobar el estado de tu monitor
- link: https://www.datadoghq.com/blog/configure-pipeline-alerts-with-ci-monitors/
  tag: Blog
  text: Configurar alertas de pipelines con monitores CI de Datadog
kind: Documentación
title: Monitor CI
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility no está disponible en el sitio seleccionado ({{< region-param key="dd_site_name" >}}) en este momento.</div>
{{< /site-region >}}

## Resumen

Una vez que [CI Visibility está habilitado][1] para tu organización, puedes crear un pipeline CI o un monitor de tests CI.

Los monitores CI te permiten visualizar los datos de CI y configurar alertas sobre ellos. Por ejemplo, crea un monitor de pipelines CI para recibir alertas sobre un pipeline o una tarea que haya fallado. Crea un un monitor de tests CI para recibir alertas sobre tests fallidos o lentos.

## Creación de un monitor

Para crear un [monitor CI][2] en Datadog, utiliza la navegación principal: *Monitors -> New Monitor --> CI* (Monitores --> Nuevo monitor --> CI).

<div class="alert alert-info"><strong>Nota</strong>: Hay un límite por defecto de 1000 monitores CI por cuenta. <a href="/help/">Ponte en contacto con el servicio de asistencia</a> para aumentar este límite en tu cuenta.</div>

Elige entre un monitor de **Pipelines** o **Tests**:

{{< tabs >}}
{{% tab "Pipelines" %}}

### Definir la consulta de búsqueda

1. Crea una consulta de búsqueda utilizando la misma lógica de una búsqueda del explorador de pipelines CI.
2. Selecciona el nivel de evento de pipeline CI:
    * **Pipeline**: evalúa la ejecución de un pipeline completo, normalmente compuesto por una o varias tareas.
    * **Stage** (Etapa): evalúa la ejecución de un grupo de una o varias tareas en los proveedores CI compatibles
    * **Job** (Tarea): evalúa la ejecución de un grupo de comandos.
    * **Command** (Comando): evalúa manualmente eventos de [comandos personalizados][1] instrumentados que son comandos individuales que se ejecutan en una tarea.
    * **All** (Todo): evalúa todos los tipos de eventos.
3. Elige monitorizar un recuento de eventos de pipelines CI, una faceta o una medida:
    * **CI Pipeline event count** (Recuento de eventos de pipelines CI): utiliza la barra de búsqueda (opcional) y **no** selecciones una faceta o una medida. Datadog evalúa el número de eventos de pipeline CI, a lo largo de un periodo de tiempo seleccionado, y luego lo compara con las condiciones del umbral.
    * **Dimensión**: selecciona la dimensión (faceta cualitativa) para emitir alertas sobre el `Unique value count` de la faceta.
    * **Measure* (Medida): selecciona la medida (faceta cuantitativa) para emitir alertas sobre el valor numérico de la medida del pipeline CI (similar a un monitor de métricas). Selecciona la agregación (`min`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, `pc98`, `pc99` o `max`).
4. Agrupa los eventos de pipeline CI por múltiples dimensiones (opcional):
    * Todos los eventos de pipelines CI que coinciden con la consulta se agregan a grupos basados en el valor de hasta cuatro facetas.
5. Configura la estrategia de agrupación de alertas (opcional):
   * Si la consulta tiene un `group by`, las alertas múltiples aplican la alerta a cada origen, en función de tus parámetros de grupo. Se genera un evento de alerta para cada grupo que cumple las condiciones establecidas. Por ejemplo, podrías agrupar una consulta por `@ci.pipeline.name` para recibir una alerta separada para cada nombre de pipeline CI, cuando el número de errores es elevado.

{{< img src="monitors/monitor_types/ci_pipelines/define-the-search-query.png" alt="Consulta de Status:Error de CI configurado para agruparse por nombre de test" style="width:100%;" >}}

#### Mediante fórmulas y funciones

Se pueden crear monitores de pipelines CI utilizando fórmulas y funciones. Esto puede utilizarse, por ejemplo, para crear monitores de la **tasa** de ocurrencia de un evento, como por ejemplo la tasa de fallo de un pipeline (tasa de error).

El siguiente ejemplo es un monitor de tasa de error de pipeline que utiliza una fórmula que calcula la proporción del "número de eventos de pipeline fallidos" (`ci.status=error`) sobre el "número de eventos de pipeline totales" (sin filtro), agrupados por `ci.pipeline.name` (para ser alertados una vez por cada pipeline). Para obtener más información, consulta [Información general en la sección Funciones][2].
{{< img src="monitors/monitor_types/ci_pipelines/define-the-Buscar-query-fnf.png" alt="Monitor definido a través de las etapas a, b, c, donde las etapas a, b son consultas y la etapa c calcula la tasa a partir de las dos etapas anteriores." style="width:1000%;" >}}

<div class="alert alert-info"><strong>Nota</strong>: Sólo se pueden utilizar hasta 2 consultas para crear la fórmula de evaluación por monitor.</div>

[1]: /es/continuous_integration/pipelines/custom_commands/
[2]: /es/dashboards/functions/#overview
{{% /tab %}}
{{% tab "Tests" %}}

### Definir la consulta de búsqueda

1. Tipos frecuentes de monitores (opcional): proporciona una plantilla de consulta para cada uno de los tipos frecuentes de monitores, **Nuevos tests defectuosos**, **Fallos en los tests** y **Rendimiento de los tests**, que luego puedes personalizar. Para obtener más información sobre esta característica, consulta [Realizar un seguimiento de nuevos tests defectuosos](#track-new-flaky-tests).
2. Crea una consulta de búsqueda utilizando la misma lógica de una búsqueda del explorador de tests CI. Por ejemplo, puedes buscar tests fallidos para la rama `main` del test de servicio `myapp` utilizando la siguiente consulta: `@test.status:fail @git.branch:main @test.service:myapp`.
3. Elige monitorizar un recuento de eventos de tests CI, una faceta o una medida:
    * **CI Test event count** (Recuento de eventos de tests CI): utiliza la barra de búsqueda (opcional) y **no** selecciones una faceta o una medida. Datadog evalúa el número de eventos de tests CI, a lo largo de un periodo de tiempo seleccionado, y luego lo compara con las condiciones del umbral.
    * **Dimensión**: selecciona la dimensión (faceta cualitativa) para emitir alertas sobre el `Unique value count` de la faceta.
    * **Measure* (Medida): selecciona la medida (faceta cuantitativa) para emitir alertas sobre el valor numérico de la faceta del pipeline CI (similar a un monitor de métricas). Selecciona la agregación (`min`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, `pc98`, `pc99` o `max`).
4. Agrupa los eventos de tests CI por múltiples dimensiones (opcional):
    * Todos los eventos de tests CI que coinciden con la consulta se agregan a grupos basados en el valor de hasta cuatro facetas.
5. Configura la estrategia de agrupación de alertas (opcional):
    * Si la consulta tiene un `group by`, se envía una alerta para cada origen en función de los parámetros del grupo. Se genera un evento de alerta para cada grupo que cumple las condiciones establecidas. Por ejemplo, puedes agrupar una consulta por `@test.full_name` para recibir una alerta distinta para cada nombre completo de test CI, cuando el número de errores es elevado. El nombre completo del test es una combinación del grupo de tests y el nombre del test, por ejemplo: `MySuite.myTest`. En Swift, el nombre completo del test es una combinación del grupo de tests, del conjunto de tests y del nombre del test, por ejemplo: `MyBundle.MySuite.myTest`.

{{< img src="monitors/monitor_types/ci_pipelines/define-the-search-query.png" alt="Consulta de Status:Error de CI configurado para agruparse por nombre de pipeline" style="width:100%;" >}}

#### Ejecución de tests con diferentes parámetros o configuraciones
Utiliza `@test.fingerprint` en el monitor `group by` cuando tengas tests con el mismo nombre completo de test, pero diferentes parámetros o configuraciones de test. De esta forma, las alertas se activan para ejecuciones de tests con parámetros o configuraciones de test específicos. El uso de `@test.fingerprint` proporciona el mismo nivel de especificidad que la sección Estados de tests fallado y defectuoso, en la página **Información general sobre las confirmaciones**.

Por ejemplo, si un test con el mismo nombre completo falla en Chrome, pero se aprueba en Firefox, el uso de la huella digital sólo activa la alerta en la ejecución del test de Chrome.

El uso de `@test.full_name` en este caso activa la alerta, aunque el test haya sido aprobado en Firefox.

#### Fórmulas y funciones

Puedes crear monitores de tests CI utilizando fórmulas y funciones. Esto puede utilizarse, por ejemplo, para crear monitores de la **tasa** de ocurrencia de un evento, como por ejemplo la tasa de fallo de un test (tasa de error).

El siguiente ejemplo es un monitor de la tasa de errores de tests que utiliza una fórmula que calcula la proporción del "número de eventos de test fallidos" (`@test.status:fail`) sobre el "número de eventos de test totales" (sin filtro), agrupados por `@test.full_name` (para ser alertados una vez por test). Para obtener más información, consulta [Información general en la sección Funciones][1].

{{< img src="monitors/monitor_types/ci_tests/define-the-Buscar-query-fnf.png" alt="Monitor definido a través de las etapas a, b, c, donde las etapas a, b son consultas y la etapa c calcula la tasa a partir de las dos etapas anteriores."style="width:100%;" >}}

#### Uso de CODEOWNERS para las notificaciones

Puedes enviar la notificación a diferentes equipos utilizando la información de `CODEOWNERS` disponible en el evento de test.

El siguiente ejemplo configura la notificación con la siguiente lógica:
* Si el propietario del código de test es `MyOrg/my-team`, envía la notificación al canal Slack `my-team-channel`.
* Si el propietario del código de test es `MyOrg/my-other-team`, envía la notificación al canal Slack `my-other-team-channel`.

{{< code-block lang="text" >}}
{{#is_match "citest.attributes.test.codeowners" "MyOrg/my-team"}}
  @slack-my-team-channel
{{/is_match}}
{{#is_match "citest.attributes.test.codeowners" "MyOrg/my-other-team"}}
  @slack-my-other-team-channel
{{/is_match}}
{{< /code-block >}}

En la sección `Notification message` de tu monitor, añade un texto similar al fragmento de código anterior para configurar las notificaciones del monitor. Puedes añadir tantas cláusulas `is_match` como necesites. Para obtener más información sobre las variables de notificación, consulta las [variables condicionales de monitores][2].

[1]: /es/dashboards/functions/#overview
[2]: /es/monitors/notify/variables/?tab=is_match#conditional-variables
{{% /tab %}}
{{< /tabs >}}
### Definir las condiciones de alerta

* Se activa cuando la métrica es `above`, `above or equal to`, `below` o `below or equal to`
* El umbral durante los últimos `5 minutes`, `15 minutes`, la última `1 hour` o el último`custom` para configurar un valor entre `1 minute` y `2 days`
* Umbral de alerta `<NUMBER>`
* Umbral de advertencia `<NUMBER>`

#### Condiciones de alerta avanzadas

Para obtener instrucciones detalladas sobre las opciones avanzadas de alerta (como el tiempo de espera para la evaluación), consulta la página [Configurar monitores][3].

### Notificaciones

Para obtener instrucciones detalladas sobre la sección **Configurar notificaciones y automatizaciones**, consulta la página [Notificaciones][4].

#### Ejemplos y lista de los principales valores de incumplimiento

Cuando se activa una test CI o un monitor de pipelines, pueden añadirse ejemplos o valores al mensaje de notificación.

| Configuración del monitor                    | Puede añadirse al mensaje de notificación  |
|----------------------------------|--------------------------------------|
| Recuento de alertas simples no agrupadas     | Hasta 10 ejemplos.                    |
| Recuento de alertas simples agrupadas       | Hasta 10 valores de facetas o medidas.    |
| Recuento de alertas múltiples agrupadas        | Hasta 10 ejemplos.                    |
| Medida de alertas simples no agrupadas   | Hasta 10 ejemplos.                    |
| Medida de alertas simples agrupadas     | Hasta 10 valores de facetas o medidas.    |
| Medida de alertas múltiples agrupadas        | Hasta 10 valores de facetas o medidas.    |

Están disponibles para notificaciones enviadas a Slack, Jira, webhooks, Microsoft Teams, Pagerduty y direcciones de correo electrónico. **Nota**: Los ejemplos no se muestran para notificaciones de recuperación.

Para desactivar los ejemplos, desactiva la casilla situada en la parte inferior de la sección **Di lo que está pasando**. El texto que aparece junto a la casilla se basa en la agrupación de tu monitor (como se ha indicado anteriormente).

#### Ejemplos

Incluye una tabla con 10 ejemplos de tests CI en la notificación de alerta:
{{< img src="monitors/monitor_types/ci_tests/10_ci_tests_samples.png" alt="Los 10 principales ejemplos de tests CI" style="width:60%;" >}}

Incluye una tabla con 10 ejemplos de pipelines CI en la notificación de alerta:
{{< img src="monitors/monitor_types/ci_tests/10_ci_tests_samples.png" alt="Los 10 principales ejemplos de pipelines CI" style="width:60%;" >}}

#### Comportamiento de las notificaciones cuando no hay datos

Un monitor que utiliza un recuento de eventos para su consulta de evaluación se resolverá, después del período de evaluación especificado sin datos, activando una notificación. Por ejemplo, un monitor configurado para enviar alertas sobre el número de errores de pipelines a través de una ventana de evaluación de cinco minutos se resolverá automáticamente después de cinco minutos sin ninguna ejecución de pipelines.

Como alternativa, Datadog recomienda utilizar fórmulas de tasa. Por ejemplo, en lugar de utilizar un monitor del número de fallos de pipelines (recuento), utiliza un monitor de la tasa de fallos de pipelines (fórmula), como `(number of pipeline failures)/(number of all pipeline executions)`. En este caso, cuando no haya datos, el denominador `(number of all pipeline executions)` será `0`, haciendo que la división `x/0` sea imposible de evaluar. El monitor mantendrá el estado conocido previo, en lugar de evaluarlo como `0`.

De este modo, si el monitor se activa debido a una explosión de fallos de pipelines que hace que la tasa de error supere el umbral del monitor, no se desactivará hasta que la tasa de error esté por debajo del umbral, lo que puede ocurrir en cualquier momento posterior.

## Ejemplos de monitores
A continuación se describen los casos de uso de monitores frecuentes. Las consultas de monitores pueden modificarse para filtrar por ramas específicas, autores o cualquier otra faceta de la aplicación.

### Activar alertas por retroceso del rendimiento
La métrica `duration` puede utilizarse para identificar el pipeline y realizar tests de los retrocesos del rendimiento en cualquier rama. El envío de alertas sobre esta métrica puede evitar que los retrocesos del rendimiento se introduzcan en tu código base.

{{< img src="ci/regression_monitor.png" alt="Monitor de retrocesos de pipelines CI" style="width:100%;">}}

### Realizar un seguimiento de nuevos tests defectuosos
Los monitores de tests tienen los tipos de monitores frecuentes `New Flaky Test`, `Test Failures` y `Test Performance` para facilitar la configuración del monitor. Estos monitores envían alertas cuando se añaden nuevos tests defectuosos a tu código base. La consulta se agrupa por `Test Full Name` para que no recibas alertas sobre el mismo test defectuoso más de una vez.

Una ejecución de test se marca como `flaky` si presenta fallos en la misma confirmación, después de algunos reintentos. Si presenta fallos varias veces (porque se han realizado varios reintentos), se añade la etiqueta (tag) `is_flaky` al primer test detectado como defectuoso.

Una ejecución de test se marca como `new flaky` si ese test en particular no se ha detectado como defectuoso en la misma rama o en la rama predeterminada. Sólo la primera ejecución de test que se detecta como un nuevo fallo se marca con la etiqueta `is_new_flaky` (independientemente del número de reintentos).

{{< img src="ci/flaky_test_monitor.png" alt="Monitor de test CI defectuoso" style="width:100%;">}}

Para obtener más información, consulta [Buscar y administrar tests CI][6].

### Mantener el porcentaje de cobertura del código
Las [métricas personalizadas][5], como el porcentaje de cobertura del código, pueden crearse y utilizarse en monitores. El siguiente monitor envía alertas cuando la cobertura del código cae por debajo de un determinado porcentaje, lo que puede ayudar con el mantenimiento del rendimiento de los tests a lo largo del tiempo.

{{< img src="ci/codecoveragepct_monitor_light.png" alt="Monitor de test CI defectuoso" style="width:100%;">}}

Para obtener más información, consulta [Cobertura del código][7].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/continuous_integration/
[2]: https://app.datadoghq.com/monitors/create/ci-pipelines
[3]: /es/monitors/configuration/#advanced-alert-conditions
[4]: /es/monitors/notify/
[5]: /es/continuous_integration/pipelines/custom_tags_and_metrics/?tab=linux
[6]: /es/continuous_integration/search/#new-flaky-tests
[7]: /es/continuous_integration/tests/code_coverage