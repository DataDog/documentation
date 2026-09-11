---
aliases:
- /es/logs/faq/how-to-set-up-only-logs
further_reading:
- link: /containers/docker/log/?tab=containerinstallation
  tag: Documentación
  text: Recopilación de logs de Docker
- link: /containers/kubernetes/log/
  tag: Documentación
  text: Recopilación de logs de Kubernetes
title: Uso exclusivo del Datadog Agent para la recopilación de logs
---

<div class="alert alert-warning">La monitorización de la infraestructura es un requisito previo para utilizar APM. Si eres cliente de APM, no desactives la recopilación de métricas, ya que podrías perder información importante de telemetría y recopilación de métricas.</div>

Para deshabilitar las cargas útiles, debes ejecutar la versión 6.4 o posterior del Agent. Esto deshabilita el envío de datos de métricas (incluidas las métricas personalizadas) para que los hosts dejen de aparecer en Datadog. Sigue estos pasos:

{{< tabs >}}
{{% tab "Host " %}}

1. Abre el [archivo de configuración datadog.yaml][1].
2. Añade `enable_payloads` como atributo de nivel superior en cualquier lugar del archivo de configuración con la siguiente configuración:

    ```yaml
    enable_payloads:
        series: false
        events: false
        service_checks: false
        sketches: false
    ```

3. [Configura el Agent para recopilar logs][2].
4. [Reinicia el Agent][3].

[1]: /es/agent/configuration/agent-configuration-files/
[2]: /es/logs/log_collection/
[3]: /es/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

Si usas el Agent en contenedores de Docker, establece las siguientes variables de entorno en `false`:
- `DD_ENABLE_PAYLOADS_EVENTS`
- `DD_ENABLE_PAYLOADS_SERIES`
- `DD_ENABLE_PAYLOADS_SERVICE_CHECKS`
- `DD_ENABLE_PAYLOADS_SKETCHES`

A continuación se muestra un ejemplo de cómo puedes incluir estas configuraciones en tu comando de ejecución de Docker:

```shell
docker run -d --name datadog-agent \
           --cgroupns host \
           --pid host \
           -e DD_API_KEY=<DATADOG_API_KEY> \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -e DD_CONTAINER_EXCLUDE="name:datadog-agent" \
           -e DD_ENABLE_PAYLOADS_EVENTS=false \
           -e DD_ENABLE_PAYLOADS_SERIES=false \
           -e DD_ENABLE_PAYLOADS_SERVICE_CHECKS=false \
           -e DD_ENABLE_PAYLOADS_SKETCHES=false \
           -e DD_PROCESS_AGENT_ENABLED=false \
           -e DD_PROCESS_CONFIG_CONTAINER_COLLECTION_ENABLED=false \
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
 ## Send logs only
clusterAgent:
  enabled: false
datadog:
[...]
  processAgent:
    enabled: false
    containerCollection: false
[...]
  env:
    - name: DD_ENABLE_PAYLOADS_EVENTS
      value: "false"
    - name: DD_ENABLE_PAYLOADS_SERIES
      value: "false"
    - name: DD_ENABLE_PAYLOADS_SERVICE_CHECKS
      value: "false"
    - name: DD_ENABLE_PAYLOADS_SKETCHES
      value: "false"
```

{{% /tab %}}
{{< /tabs >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}