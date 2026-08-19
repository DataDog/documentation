---
aliases:
- /es/error_tracking/standalone_backend/getting_started/dd_libraries
further_reading:
- link: /error_tracking/issue_states/
  tag: Documentación
  text: Estados de problemas y flujos de trabajo de Error Tracking
- link: /error_tracking/explorer
  tag: Documentación
  text: Más información sobre el Explorador de seguimiento de errores
- link: /error_tracking/guides/enable_infra
  tag: Guía
  text: Activar la monitorización de la infraestructura
- link: /error_tracking/guides/enable_apm
  tag: Guía
  text: Activar APM
title: Instalar Error Tracking en el backend con las bibliotecas de rastreo de Datadog
---

Para instrumentar tu aplicación con las bibliotecas de Datadog:

1. [Instala y configura el Agent](#install-and-configure-the-agent).
2. [Añade la biblioteca de rastreo de Datadog a tu código](#instrument-your-application).

## Instala y configura el Agent

Instala el Datadog Agent siguiendo la [documentación pertinente][1].

Para configurar el Agent solo para el backend de Error Tracking, debes ejecutar el Agent v7.61+.

{{< tabs >}}
{{% tab "Host o máquinas virtuales de Linux" %}}

1. Abre el [archivo de configuración de datadog.yaml][2].
2. Añade `core_agent` y `apm_config` como atributos de nivel superior en cualquier lugar del archivo de configuración con los siguientes parámetros:

   ```yaml
   core_agent:
     enabled: false
   apm_config:
     error_tracking_standalone:
       enabled: true
   ```

3. [Reinicia el Agent][3].

[2]: /es/agent/configuration/agent-configuration-files/
[3]: /es/agent/configuration/agent-commands/#restart-the-agent

{{% /tab %}}
{{% tab "Docker" %}}

Si estás utilizando el Agent con contenedores de, configure las siguientes variables de entorno:
- `DD_CORE_AGENT_ENABLED=false`
- `DD_APM_ERROR_TRACKING_STANDALONE_ENABLED=true`

A continuación se muestra un ejemplo de cómo puedes incluir estas configuraciones en tu comando de ejecución de Docker:

```shell
docker run -d --name datadog-agent \
           --cgroupns host \
           --pid host \
           -e DD_API_KEY=<DATADOG_API_KEY> \
           -e DD_CORE_AGENT_ENABLED=false \
           -e DD_APM_ERROR_TRACKING_STANDALONE_ENABLED=true \
           -v /var/run/docker.sock:/var/run/docker.sock:ro \
           -v /proc/:/host/proc/:ro \
           -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
           -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
           gcr.io/datadoghq/agent:latest
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Si despliegas el Agent en Kubernetes, realiza los siguientes cambios en tu Helm chart además de tu configuración del Agent:

```yaml
agents:
  containers:
    agent:
      env:
        - name: DD_CORE_AGENT_ENABLED
          value: "false"
datadog:
[...]
  processAgent:
    enabled: false
    containerCollection: false
[...]
  apm:
    errorTrackingStandalone:
      enabled: true
```

{{% /tab %}}
{{< /tabs >}}

## Instrumentar tu aplicación

Sigue la [documentación][4] pertinente para configurar tu aplicación para enviar traces (trazas) con una de las bibliotecas oficiales de rastreo de Datadog.
Sigue la [guía de la API de OpenTelemetry][5] para el lenguaje de tu aplicación para enviar manualmente errores a través de eventos de spans (tramos).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent
[4]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries
[5]: /es/tracing/trace_collection/custom_instrumentation/?tab=opentelemetryapi#getting-started