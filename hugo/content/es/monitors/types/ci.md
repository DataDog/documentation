---
aliases:
- /es/monitors/monitor_types/ci_pipelines/
- /es/monitors/create/types/ci_pipelines/
- /es/monitors/create/types/ci/
description: Monitoriza pipelines de CI, tests y despliegues de CD con alertas sobre
  fallos, regresiones de rendimiento y métricas de cobertura de código.
further_reading:
- link: /monitors/notify/
  tag: Documentación
  text: Configurar las notificaciones de tu monitor
- link: /monitors/downtimes/
  tag: Documentación
  text: Programar un tiempo de inactividad para silenciar un monitor
- link: /monitors/status/
  tag: Documentación
  text: Comprobar el estado de tu monitor
- link: https://www.datadoghq.com/blog/configure-pipeline-alerts-with-ci-monitors/
  tag: Blog
  text: Configurar alertas de pipelines con monitores CI de Datadog
site_support_id: ci_visibility
title: Monitor de CI/CD y Tests
---

## Información general

Para crear un monitor para pipelines de CI, tests de CI o despliegues de CD, activa primero el producto relacionado para tu organización:

| Tipo de monitor     | Producto requerido         |
|------------------|--------------------------|
| CI Pipeline      | [CI Visibility][1]       |
| CI Test          | [Test Optimization][2]   |
| CD Deployments   | [CD Visibility][3]       |

Continuous Integration Continuous Delivery (CI/CD) y Test te permiten visualizar los datos de CI/CD y configurar alertas al respecto. Por ejemplo, crea un monitor de pipeline de CI para recibir alertas sobre un pipeline fallido o un trabajo. Crea un monitor de test de CI para recibir alertas sobre tests fallidos o lentos.

## Creación de un monitor

Para crear un nuevo monitor, navega hasta **Monitors > New Monitor > CI/CD & Tests** (Monitores > Nuevo monitor > CI/CD y Tests).

<div class="alert alert-info">Hay un límite por defecto de 1000 monitores CI/CD y de test por cuenta. <a href="/help/">Ponte en contacto con el servicio de asistencia</a> para aumentar este límite en tu cuenta.</div>

Elige uno de los tipos de monitor:

{{< tabs >}}
{{% tab "Pipelines" %}}

### Definir la consulta de búsqueda

1. Crea una consulta de búsqueda utilizando la misma lógica de una búsqueda del explorador de pipelines CI.
2. Selecciona el nivel de eventos de pipelines CI:
    * **Pipeline**: evalúa la ejecución de un pipeline completo, normalmente compuesto por una o varias tareas.
    * **Stage** (Etapa): evalúa la ejecución de un grupo de una o varias tareas en los proveedores CI compatibles
    * **Job** (Tarea): evalúa la ejecución de un grupo de comandos.
    * **Command** (Comando): evalúa manualmente eventos de [comandos personalizados][1] instrumentados que son comandos individuales que se ejecutan en una tarea.
    * **All** (Todo): evalúa todos los tipos de eventos.
3. Elige monitorizar un recuento de eventos de pipelines CI, una faceta o una medida:
    * **CI Pipeline event count** (Recuento de eventos de pipelines CI): utiliza la barra de búsqueda (opcional) y **no** selecciones una faceta o una medida. Datadog evalúa el número de eventos de pipelines CI, a lo largo de un periodo de tiempo seleccionado, y luego lo compara con las condiciones del umbral.
    * **Dimensión** (Dimensión): selecciona la dimensión (faceta cualitativa) para emitir alertas sobre el `Unique value count` de la faceta.
    * **Measure* (Medida): selecciona la medida (faceta cuantitativa) para emitir alertas sobre el valor numérico de la medida del pipeline CI (similar a un monitor de métricas). Selecciona la agregación (`min`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, `pc98`, `pc99` o `max`).
4. Agrupa los eventos de pipelines CI por múltiples dimensiones (opcional):
    * Todos los eventos de pipelines CI que coinciden con la consulta se agregan a grupos basados en el valor de hasta cuatro facetas.
5. Configura la estrategia de agrupación de alertas (opcional):
   * Si la consulta tiene un `group by`, las alertas múltiples aplican la alerta a cada origen, en función de tus parámetros de grupo. Se genera un evento de alerta para cada grupo que cumple las condiciones establecidas. Por ejemplo, podrías agrupar una consulta por `@ci.pipeline.name`, para recibir una alerta separada para cada nombre de pipeline CI cuando el número de errores es elevado.

{{< img src="monitors/monitor_types/ci_pipelines/define-the-search-query.png" alt="Consulta de estado de error de CI configurado para agruparse por nombre de test" style="width:100%;" >}}

#### Mediante fórmulas y funciones

Se pueden crear monitores de pipelines CI utilizando fórmulas y funciones. Esto puede utilizarse, por ejemplo, para crear monitores de la **tasa** de ocurrencia de un evento, como por ejemplo la tasa de fallo de un pipeline (tasa de error).

El siguiente ejemplo es un monitor de tasa de error de pipeline que utiliza una fórmula que calcula la proporción del "número de eventos de pipeline fallidos" (`ci.status=error`) sobre el "número de eventos de pipelines totales" (sin filtro), agrupados por `ci.pipeline.name` (para ser alertados una vez por cada pipeline). Para obtener más información, consulta [Información general en la sección Funciones][2].
{{< img src="monitors/monitor_types/ci_pipelines/define-the-Buscar-query-fnf.png" alt="Monitor definido a través de las etapas a, b, c, donde las etapas a, b son consultas y la etapa c calcula la tasa a partir de las dos etapas anteriores." style="width:1000%;" >}}

<div class="alert alert-info">Solo se pueden utilizar hasta 2 consultas para crear la fórmula de evaluación por monitor.</div>

[1]: /es/continuous_integration/pipelines/custom_commands/
[2]: /es/dashboards/functions/#overview
{{% /tab %}}

{{% tab "Tests" %}}

### Definir la consulta de búsqueda

1. Tipos frecuentes de monitores (opcional): Proporciona una plantilla de consulta para cada uno de los tipos frecuentes de monitores, **Nuevos tests defectuosos**, **Fallos en los tests** y **Rendimiento de los tests**, que luego puedes personalizar. Para obtener más información sobre esta característica, consulta [Realizar un seguimiento de nuevos tests defectuosos](#track-new-flaky-tests).
2. Crea una consulta de búsqueda utilizando la misma lógica de una búsqueda del explorador de tests CI. Por ejemplo, puedes buscar tests fallidos para la rama `main` del test de servicio `myapp` utilizando la siguiente consulta: `@test.status:fail @git.branch:main @test.service:myapp`.
3. Elige monitorizar un recuento de eventos de tests CI, una faceta o una medida:
    * **CI Test event count** (Recuento de eventos de tests CI): utiliza la barra de búsqueda (opcional) y **no** selecciones una faceta o una medida. Datadog evalúa el número de eventos de tests de pipelines CI, a lo largo de un periodo de tiempo seleccionado, y luego lo compara con las condiciones del umbral.
    * **Dimensión** (Dimensión): selecciona la dimensión (faceta cualitativa) para emitir alertas sobre el `Unique value count` de la faceta.
    * **Measure* (Medida): selecciona la medida (faceta cuantitativa) para emitir alertas sobre el valor numérico de la faceta del pipeline CI (similar a un monitor de métricas). Selecciona la agregación (`min`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, `pc98`, `pc99` o `max`).
4. Agrupa los eventos de tests CI por múltiples dimensiones (opcional):
    * Todos los eventos de tests CI que coinciden con la consulta se agregan a grupos basados en el valor de hasta cuatro facetas.
5. Configura la estrategia de agrupación de alertas (opcional):
    * Si la consulta tiene un `group by`, se envía una alerta para cada origen en función de los parámetros del grupo. Se genera un evento de alerta para cada grupo que cumple las condiciones establecidas. Por ejemplo, puedes agrupar una consulta por `@test.full_name` para recibir una alerta distinta para cada nombre completo de test CI, cuando el número de errores es elevado. El nombre completo del test es una combinación del grupo de tests y el nombre del test, por ejemplo: `MySuite.myTest`. En Swift, el nombre completo del test es una combinación del grupo de tests, del conjunto de tests y del nombre del test, por ejemplo: `MyBundle.MySuite.myTest`.

{{< img src="monitors/monitor_types/ci_pipelines/define-the-search-query.png" alt="Consulta de estado de error de CI configurado para agruparse por nombre de pipeline" style="width:100%;" >}}

#### Ejecución de tests con diferentes parámetros o configuraciones
Utiliza `@test.fingerprint` en el monitor `group by` cuando tengas tests con el mismo nombre completo de test, pero diferentes parámetros o configuraciones de test. De esta forma, las alertas se activan para ejecuciones de tests con parámetros o configuraciones de test específicos. El uso de `@test.fingerprint` proporciona el mismo nivel de especificidad que la sección Estados de tests fallado y defectuoso, en la página **Información general sobre las confirmaciones**.

Por ejemplo, si un test con el mismo nombre completo falla en Chrome, pero se aprueba en Firefox, el uso de la huella digital sólo activa la alerta en la ejecución del test de Chrome.

El uso de `@test.full_name` en este caso activa la alerta, aunque el test haya sido aprobado en Firefox.

#### Fórmulas y funciones

Puedes crear monitores de tests CI utilizando fórmulas y funciones. Esto puede utilizarse, por ejemplo, para crear monitores de la **tasa** de ocurrencia de un evento, como por ejemplo la tasa de fallo de un test (tasa de error).

El siguiente ejemplo es un monitor de la tasa de errores de tests que utiliza una fórmula para calcular la proporción del "número de eventos de test fallidos" (`@test.status:fail`) sobre el "número de eventos de test totales" (sin filtro), agrupados por `@test.full_name` (para ser alertados una vez por test). Para obtener más información, consulta [Información general en la sección Funciones][1].

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

{{% tab "Deployments" %}}

### Definir la consulta de búsqueda

1. Construye una consulta de búsqueda utilizando la misma lógica que una búsqueda en el explorador de CD Deployments.
3. Elige monitorizar un recuento, faceta o medida de eventos de CD Deployment:
    * **Recuento de eventos de CD Deployment**: utiliza la barra de búsqueda (opcional) y **no** selecciones una faceta o medida. Datadog evalúa el número de eventos de CD Deployment durante un periodo seleccionado y, a continuación, lo compara con las condiciones de umbral.
    * **Dimensión** (Dimensión): selecciona la dimensión (faceta cualitativa) para emitir alertas sobre el `Unique value count` de la faceta.
    * **Medida**: selecciona la medida (faceta cuantitativa) para alertar sobre el valor numérico de la medida de CD Deployment (similar a un monitor de métrica). Selecciona la agregación (`min`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, `pc98`, `pc99` o `max`).
4. Agrupa los eventos de CD Deployment por múltiples dimensiones (opcional):
    * Todos los eventos de CD Deployment que coincidan con la consulta se agregan en grupos basados en el valor de hasta cuatro facetas.
5. Configura la estrategia de agrupación de alertas (opcional):
   * Si la consulta tiene un `group by`, las multialertas aplican la alerta a cada fuente según tus parámetros de grupo. Se genera un evento de alerta para cada grupo que cumpla las condiciones establecidas. Por ejemplo, podrías agrupar una consulta por `@deployment.name` para recibir una alerta separada para cada nombre de CD Deployment cuando el número de errores sea elevado.

{{< img src="monitors/monitor_types/cd_deployments/define-the-search-query.png" alt="Una consulta de Deployment Status:Error configurado para agrupar por Nombre de despliegue" style="width:100%;" >}}

#### Mediante fórmulas y funciones

Puedes crear monitores de CD Deployment utilizando fórmulas y funciones. Esto puede utilizarse, por ejemplo, para crear monitores de la **tasa** de ocurrencia de un evento, como la tasa de fallo de un despliegue (tasa de error).

El siguiente ejemplo muestra un monitor de tasa de errores de despliegue. Utiliza una fórmula para calcular la proporción de "eventos de despliegue fallidos" (`deployment.status:error`) sobre el "total de eventos de despliegue" (sin filtros), agrupados por `deployment.name`, para activar alertas para cada despliegue individualmente. Para obtener más información, consulta la [Descripción general de las funciones][1].

{{< img src="monitors/monitor_types/cd_deployments/define-the-search-query-fnf.png" alt="Monitor definido con los pasos a, b y c, en el que los pasos a y b son consultas y el paso c calcula la tasa de ellas." style="width:100%;" >}}

<div class="alert alert-info">Solo se pueden utilizar hasta 2 consultas para crear la fórmula de evaluación por monitor.</div>

[1]: /es/dashboards/functions/#overview
{{% /tab %}}
{{< /tabs >}}

### Definir condiciones de alerta

* Se activa cuando la métrica es `above`, `above or equal to`, `below`, o `below or equal to`
* El umbral durante los últimos `5 minutes`, `15 minutes`, `1 hour` o `custom` para configurar un valor entre `1 minute` y `2 days`
* Umbral de alerta `<NUMBER>`
* Umbral de advertencia `<NUMBER>`

#### Condiciones de alerta avanzadas

Para obtener instrucciones detalladas sobre las opciones avanzadas de alerta (como el retardo de evaluación), consulta la página [Configuración del monitor][4].

### Notificaciones

Para obtener instrucciones detalladas sobre la sección **Configure notifications and automations** (Configurar notificaciones y automatizaciones), consulta la página [Notificaciones][5].

#### Ejemplos y lista de los principales valores de incumplimiento

Cuando se activa un monitor de pipeline de CI, test de CI, o CD Deployments, se pueden añadir muestras o valores al mensaje de notificación.

| Configuración del monitor                    | Puede añadirse al mensaje de notificación |
|----------------------------------|--------------------------------------|
| Recuento de alertas simples no agrupadas     | Hasta 10 ejemplos.                    |
| Recuento de alertas simples agrupadas       | Hasta 10 valores de facetas o medidas.    |
| Recuento de alertas múltiples agrupadas        | Hasta 10 ejemplos.                    |
| Medida de alertas simples no agrupadas   | Hasta 10 ejemplos.                    |
| Medida de alertas simples agrupadas     | Hasta 10 valores de facetas o medidas.    |
| Medida de alertas múltiples agrupadas      | Hasta 10 valores de facetas o medidas.    |

Están disponibles para notificaciones enviadas a Slack, Jira, webhooks, Microsoft Teams, Pagerduty y direcciones de correo electrónico. **Nota**: Los ejemplos no se muestran para notificaciones de recuperación.

Para desactivar los ejemplos, desactiva la casilla situada en la parte inferior de la sección **Di lo que está pasando**. El texto que aparece junto a la casilla se basa en la agrupación de tu monitor (como se ha indicado anteriormente).

#### Ejemplos

Incluye una tabla con 10 ejemplos de tests CI en la notificación de alerta:
{{< img src="monitors/monitor_types/ci_tests/10_ci_tests_samples.png" alt="Los 10 principales ejemplos de tests CI" style="width:60%;" >}}

Incluye una tabla con 10 ejemplos de pipelines CI en la notificación de alerta:
{{< img src="monitors/monitor_types/ci_tests/10_ci_tests_samples.png" alt="Los 10 principales ejemplos de pipelines CI" style="width:60%;" >}}

#### Comportamiento de las notificaciones cuando no hay datos

Un monitor que utiliza un recuento de eventos para su consulta de evaluación se resolverá después del período de evaluación especificado sin datos activando una notificación. Por ejemplo, un monitor configurado para enviar alertas sobre el número de errores de pipelines a través de una ventana de evaluación de cinco minutos se resolverá automáticamente después de cinco minutos sin ninguna ejecución de pipelines.

Como alternativa, Datadog recomienda utilizar fórmulas de tasa. Por ejemplo, en lugar de utilizar un monitor del número de fallos de pipelines (recuento), utiliza un monitor de la tasa de fallos de pipelines (fórmula), como por ejemplo `(number of pipeline failures)/(number of all pipeline executions)`. En este caso, cuando no haya datos, el denominador `(number of all pipeline executions)` será `0`, lo que hará que la división `x/0` sea imposible de evaluar. El monitor mantendrá el estado conocido previo, en lugar de evaluarlo como `0`.

De este modo, si el monitor se activa debido a una explosión de fallos de pipelines que hace que la tasa de error supere el umbral del monitor, no se desactivará hasta que la tasa de error esté por debajo del umbral, lo que puede ocurrir en cualquier momento posterior.

## Ejemplos de monitores
A continuación se describen los casos frecuentes de uso de monitores. Las consultas de monitores pueden modificarse para filtrar por ramas específicas, autores o cualquier otra faceta de la aplicación.

### Activar alertas por retroceso del rendimiento
La métrica `duration` puede utilizarse para identificar el pipeline y realizar tests de los retrocesos del rendimiento en cualquier rama. El envío de alertas sobre esta métrica puede evitar que los retrocesos del rendimiento se introduzcan en tu código base.

{{< img src="ci/regression_monitor.png" alt="Monitor de retrocesos de pipelines CI" style="width:100%;">}}

### Realizar un seguimiento de nuevos tests defectuosos
Los monitores de tests tienen los tipos de monitores frecuentes `New Flaky Test`, `Test Failures` y `Test Performance` para facilitar la configuración del monitor. Estos monitores envían alertas cuando se añaden nuevos tests defectuosos a tu código base. La consulta se agrupa por `Test Full Name` para que no recibas alertas sobre el mismo test defectuoso más de una vez.

Una ejecución de test se marca como `flaky` si presenta defectos en la misma confirmación después de algunos reintentos. Si presenta defectos varias veces (porque se han realizado varios reintentos), se añade la etiqueta (tag) `is_flaky` al primer test detectado como defectuoso.

Una ejecución de test se marca como `new flaky` si ese test en particular no se ha detectado como defectuoso en la misma rama o en la rama predeterminada. Sólo la primera ejecución del test que se detecta como un nuevo defecto se marca con la etiqueta `is_new_flaky` (independientemente del número de reintentos).

{{< img src="ci/flaky_test_monitor.png" alt="Monitor de tests CI defectuosos" style="width:100%;">}}

Para obtener más información, consulta [Buscar y administrar tests CI][6].

### Mantener el porcentaje de cobertura del código
[Métricas personalizadas][7], como el porcentaje de cobertura de código, pueden ser creadas y utilizadas dentro de los monitores. El siguiente monitor envía alertas cuando la cobertura del código cae por debajo de un determinado porcentaje, lo que puede ayudar a mantener el rendimiento del test a lo largo del tiempo.

{{< img src="ci/codecoveragepct_monitor_light.png" alt="Monitor de tests CI defectuosos" style="width:100%;">}}

Para más información, consulta [Cobertura del código][8].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/continuous_integration/
[2]: /es/tests/
[3]: /es/continuous_delivery/
[4]: /es/monitors/configuration/#advanced-alert-conditions
[5]: /es/monitors/notify/
[6]: /es/continuous_integration/search/#new-flaky-tests
[7]: /es/continuous_integration/pipelines/custom_tags_and_metrics/?tab=linux
[8]: /es/continuous_integration/tests/code_coverage