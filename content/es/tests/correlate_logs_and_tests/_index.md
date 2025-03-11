---
description: Correlaciona tus logs con las trazas de test.
further_reading:
- link: /tests
  tag: Documentación
  text: Más información sobre Test Optimization
title: Correlacionar logs y tests
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Test Optimization no está disponible en el sitio seleccionado ({{< region-param key="dd_site_name" >}}) en este momento.</div>
{{< /site-region >}}

## Información general

Puedes correlacionar los datos de Test Optimization con [logs inyectados en Datadog][1], lo que te permite ver y analizar logs para casos de tests específicos.

{{< img src="continuous_integration/correlate_logs_and_tests.png"
  alt="Examinar logs para casos de tests específicos con la correlación de logs y tests." style="width:90%" >}}

## Configuración

La correlación puede configurarse de forma diferente en función de cómo [envíes los datos de tus tests a Datadog][2].

{{< tabs >}}
{{% tab "Proveedor de Cloud CI (sin Agent)" %}}


### Java
El envío de logs sin Agent es compatible con los siguientes lenguajes y marcos:

- `dd-trace-java >= 1.35.2` y Log4j2.

Utiliza las siguientes variables de entorno para habilitar y configurar el envío de logs sin Agent:

| Nombre | Descripción | Valor por defecto |
|---|---|---|
| `DD_AGENTLESS_LOG_SUBMISSION_ENABLED` (obligatorio) | Activa/desactiva el envío de logs | `false`
| `DD_AGENTLESS_LOG_SUBMISSION_LEVEL` (opcional) | Establece el nivel de logs para el envío sin Agent | `INFO`
| `DD_AGENTLESS_LOG_SUBMISSION_QUEUE_SIZE` (opcional) | Establece el tamaño máximo de la cola de logs pendientes | `1024`
| `DD_AGENTLESS_LOG_SUBMISSION_URL` (opcional) | Establece la URL personalizada para el envío de logs | -

### Javascript/Typescript

El envío de logs sin Agent es compatible con los siguientes lenguajes y marcos:

- `dd-trace-js >= 5.24.0` y `dd-trace-js >= 4.48.0` y `winston`.

Utiliza las siguientes variables de entorno para habilitar y configurar el envío de logs sin Agent:

| Nombre | Descripción | Valor por defecto |
|---|---|---|
| `DD_AGENTLESS_LOG_SUBMISSION_ENABLED` (obligatorio) | Activa/desactiva el envío de logs | `false`
| `DD_AGENTLESS_LOG_SUBMISSION_URL` (opcional) | Establece la URL personalizada para el envío de logs | -

{{% /tab %}}
{{% tab "Proveedor de CI on-premise (Datadog Agent)" %}}

1. [Configura la recopilación de logs][1] a través del Datadog Agent.
2. Sigue los pasos descritos en [Correlacionar logs y trazas][2].


[1]: /es/logs/log_collection/
[2]: /es/tracing/other_telemetry/connect_logs_and_traces/
{{% /tab %}}
{{< /tabs >}}

### .NET
El envío de logs sin Agent es compatible con los siguientes lenguajes y marcos:

- `dd-trace-dotnet >= 2.50.0` y XUnit TestOutputHelper.

Utiliza las siguientes variables de entorno para habilitar y configurar el envío de logs sin Agent:

| Nombre | Descripción | Valor por defecto |
|---|---|---|
| `DD_CIVISIBILITY_LOGS_ENABLED` (obligatorio) | Activa/desactiva el envío de logs de CI Visibility | `false`

### Swift

Utiliza las siguientes variables de entorno para habilitar y configurar el envío de logs:

| Nombre | Descripción | Valor por defecto |
|---|---|---|
| `DD_ENABLE_STDOUT_INSTRUMENTATION` | Activa/desactiva el envío de logs de stdout | `false`
| `DD_ENABLE_STDERR_INSTRUMENTATION` | Activa/desactiva el envío de logs de stderr | `false`

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/log_collection/
[2]: /es/tests/setup/