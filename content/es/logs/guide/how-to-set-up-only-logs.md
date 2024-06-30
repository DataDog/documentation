---
aliases:
- /es/logs/faq/how-to-set-up-only-logs
kind: documentación
title: Uso del Datadog Agent sólo para la recopilación de logs
---

Para deshabilitar las cargas útiles, debes ejecutar el Agent v6.4 o superior. Esto deshabilita el envío de datos de métricas, para que los hosts dejen de aparecer en Datadog. Sigue estos pasos:

{{< tabs >}}
{{% tab "Host " %}}

1. Abre el [archivo de configuración datadog.yaml][1].
2. Añade el atributo `enable_payloads` con la siguiente configuración:

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

Si utilizas el Agent contenedorizado en Docker, configura las variables de entorno`DD_ENABLE_PAYLOADS_EVENTS`, `DD_ENABLE_PAYLOADS_SERIES`, `DD_ENABLE_PAYLOADS_SERVICE_CHECKS` y `DD_ENABLE_PAYLOADS_SKETCHES` como `false`, además de la configuración de tu Agent:

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
           -v /var/run/docker.sock:/var/run/docker.sock:ro \
           -v /proc/:/host/proc/:ro \
           -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
           -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
           gcr.io/datadoghq/agent:latest
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Si despliegas el Agent en Kubernetes, configura las variables de entorno`DD_ENABLE_PAYLOADS_EVENTS`, `DD_ENABLE_PAYLOADS_SERIES`, `DD_ENABLE_PAYLOADS_SERVICE_CHECKS` y `DD_ENABLE_PAYLOADS_SKETCHES` como `false`, además de la configuración de tu Agent:

```yaml
 ## Send logs only
 datadog:
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