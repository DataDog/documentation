---
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/manage-metrics-cost-control-with-observability-pipelines
  tag: Blog
  text: Gestiona el volumen de métricas y las tags (etiquetas) de tu entorno con Observability
    Pipelines
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
- icon: métricas
  name: Métricas
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: Source (fuente) del Datadog Agent
---

{{< product-availability >}}

Utiliza la source (fuente) de Datadog de Observability Pipelines para recibir logs o métricas ({{< tooltip glossary="preview" case="title" >}}) del Datadog Agent. Selecciona y configura esta source (fuente) cuando [configures un pipeline][1].

**Nota**: Si utilizas Datadog distribution of OpenTelemetry (DDOT) Collector para los logs, debes [utilizar la source (fuente) de OpenTelemetry para enviar los logs a Observability Pipelines][4].

## Requisitos previos

{{% observability_pipelines/prerequisites/datadog_agent %}}

## Configurar la fuente en la interfaz de usuario del pipeline

Opcionalmente, activa el interruptor para habilitar TLS. Si habilitas TLS, se requieren los siguientes archivos de certificado y clave.
   - `Server Certificate Path`: la ruta al archivo del certificado que ha sido firmado por tu archivo raíz de autoridad de certificación (CA) en formato DER o PEM (X.509).
   - `CA Certificate Path`: la ruta al archivo de certificado que es tu archivo raíz de autoridad de certificación (CA) en formato DER o PEM (X.509).
   - `Private Key Path`: la ruta al archivo de clave privada `.key` que pertenece a la ruta de tu certificado de servidor en formato DER o PEM (PKCS#8).

**Nota**: Todas las rutas de acceso de archivos se hacen relativas al directorio de datos de configuración, que es `/var/lib/observability-pipelines-worker/config/` en forma predeterminada. Consulta [Configuraciones Avanzadas del Worker][5] para obtener más información. El archivo debe ser propiedad del usuario `observability-pipelines-worker group` y `observability-pipelines-worker`, o al menos legible por el grupo o usuario.

## Configurar las variables de entorno

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/datadog_agent %}}

## Conectar el Datadog Agent al worker de Observability Pipelines

{{< tabs >}}
{{% tab "Logs" %}}

Utiliza el archivo de configuración del Agent o el archivo de valores del Helm chart del Agent para conectar el Datadog Agent al worker de Observability Pipelines.

**Nota**: Si tu Agent se está ejecutando en un contenedor de Docker, debes excluir los logs de Observability Pipelines con la variable de entorno `DD_CONTAINER_EXCLUDE_LOGS`. Para Helm, utiliza `datadog.containerExcludeLogs`. Esto impide la duplicación de logs, ya que el Worker también envía sus propios logs directamente a Datadog. Consulta [Recopilación de logs de Docker][1] o [Configurando de variables de entorno para Helm][2] para obtener más información.

{{% collapse-content title="Agent configuration file" level="h4" expanded=false id="id-for-anchoring" %}}

{{% observability_pipelines/log_source_configuration/datadog_agent %}}

{{% /collapse-content %}}

{{% collapse-content title="Agent Helm values file" level="h4" expanded=false id="id-for-anchoring" %}}

{{% observability_pipelines/log_source_configuration/datadog_agent_kubernetes %}}

{{% /collapse-content %}}

[1]: /es/containers/docker/log/?tab=containerinstallation#linux
[2]: /es/containers/guide/container-discovery-management/?tab=helm#setting-environment-variables

{{% /tab %}}

{{% tab "Métricas" %}}

Utiliza el archivo de configuración del Agent o el archivo de valores del Helm chart del Agent para conectar el Datadog Agent al worker de Observability Pipelines.

**Nota**: Si tu Agent se está ejecutando en un contenedor de Docker, debes excluir las métricas de Observability Pipelines, como las métricas de utilización y de entrada/salida de eventos, con la variable de entorno `DD_CONTAINER_EXCLUDE_METRICS`. Para Helm, utiliza `datadog.containerExcludeMetrics`. Esto impide la duplicación de métricas, ya que el Worker también envía sus propias métricas directamente a Datadog. Consulta [Recopilación de métricas de Docker][1] o [Configuración de variables de entorno para Helm][2] para obtener más información.

{{% collapse-content title="Agent configuration file" level="h4" expanded=false id="id-for-anchoring" %}}

Para enviar las métricas de Datadog Agent al Worker de Observability Pipelines, actualiza tu [ archivo de configuración del Agent ][1] con lo siguiente:

```
observability_pipelines_worker:
  metrics:
    enabled: true
    url: "http://<OPW_HOST>:8383"

```

`<OPW_HOST>` es la dirección IP del host o la URL del equilibrador de carga asociado con el worker de Observability Pipelines.
- Para las instalaciones de CloudFormation, utiliza la salida `LoadBalancerDNS` de CloudFormation para la URL.
- Para las instalaciones de Kubernetes, puedes utilizar el registro DNS interno del servicio Observability Pipelines Worker. Por ejemplo: `http://opw-observability-pipelines-worker.default.svc.cluster.local:<PORT>`.

**Nota**: Si el Worker está escuchando logs en el puerto 8282, debes utilizar otro puerto para las métricas, como 8383.

Después de [reiniciar el Agent][2], tus datos de observabilidad deberían ir al Worker, procesados por el pipeline y entregados a Datadog.

[1]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
[2]: /es/agent/configuration/agent-commands/#restart-the-agent

{{% /collapse-content %}}

{{% collapse-content title="Agent Helm values file" level="h4" expanded=false id="id-for-anchoring" %}}

Para enviar métricas del Datadog Agent al Observability Pipelines Worker, actualiza tu gráfico de Helm de Datadog [datadog-values.yaml][1] con las siguientes variables de entorno. Consulta [Variables de entorno del Agent][2] para obtener más información.

```
datadog:
  env:
    - name: DD_OBSERVABILITY_PIPELINES_WORKER_METRICS_ENABLED
      value: true
    - name: DD_OBSERVABILITY_PIPELINES_WORKER_METRICS_URL
      value: "http://<OPW_HOST>:8383"
```

`<OPW_HOST>` es la dirección IP del host o la URL del equilibrador de carga asociado con el worker de Observability Pipelines.

 Para las instalaciones de Kubernetes, puedes utilizar el registro DNS interno del servicio Observability Pipelines Worker. Por ejemplo: `http://opw-observability-pipelines-worker.default.svc.cluster.local:<PORT>`.

**Nota**: Si el Worker está escuchando logs en el puerto 8282, debes utilizar otro puerto para las métricas, como 8383.

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
[2]: https://docs.datadoghq.com/es/agent/guide/environment-variables/

{{% /collapse-content %}}

[1]: /es/containers/docker/data_collected/
[2]: /es/containers/guide/container-discovery-management/?tab=helm#setting-environment-variables

{{% /tab %}}
{{< /tabs >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/observability_pipelines/configuration/set_up_pipelines/
[4]: /es/observability_pipelines/sources/opentelemetry/#send-logs-from-the-datadog-distribution-of-opentelemetry-collector-to-observability-pipelines
[5]: /es/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/