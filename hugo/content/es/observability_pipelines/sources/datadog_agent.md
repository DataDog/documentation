---
description: Aprenda a recopilar registros, métricas o trazas del Datadog Agent utilizando
  Observability Pipelines Worker.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/manage-metrics-cost-control-with-observability-pipelines
  tag: Blog
  text: Administre el volumen de métricas y las etiquetas en su entorno con Observability
    Pipelines
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
- icon: metrics
  name: Métricas
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: Fuente del Datadog Agent
---
{{< product-availability >}}

## Descripción general {#overview}

Utilice la fuente del Datadog Agent de Observability Pipelines para recibir registros o métricas del Datadog Agent.

**Notas**:
- Si está utilizando el Datadog Distribution of OpenTelemetry (DDOT) Collector para recopilar registros o métricas, debe [utilizar la fuente de OpenTelemetry para enviar esos datos a Observability Pipelines][4].
- El Datadog Agent envía registros y métricas etiquetados con `ddsource` y `ddtags`, no con `source` y `tags`. Cuando defina consultas o filtros de procesador para estos eventos, utilice `ddsource` y `ddtags` en su lugar.

## Requisitos previos {#prerequisites}

{{% observability_pipelines/prerequisites/datadog_agent %}}

## Configuración {#setup}

<div class="alert alert-danger">Para la gestión de secretos: solo ingrese el identificador para la dirección del Datadog Agent y, si corresponde, la frase de contraseña de la clave TLS. <b>No</b> ingrese los valores reales.</div>

Configure esta fuente cuando [configure una canalización][1]. Puede configurar un pipeline en la [UI][6], utilizando la [API][7] o con [Terraform][8]. Las instrucciones de esta sección son para configurar la fuente en la interfaz de usuario.

Después de seleccionar la fuente del Datadog Agent en la UI de la canalización, ingrese el identificador para su dirección del Datadog Agent. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).

{{% observability_pipelines/secrets_env_var_note %}}

### Configuración de TLS opcional {#optional-tls-settings}

{{% observability_pipelines/tls_settings %}}

## Valores predeterminados de Secret {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestión de secretos" %}}

- Identificador de dirección del Datadog Agent:
    - Hace referencia a la dirección de enlace en la que Observability Pipelines Worker escucha para recibir registros del Datadog Agent.
    - El identificador predeterminado es `SOURCE_DATADOG_AGENT_ADDRESS`.
- Identificador de frase de contraseña TLS del Datadog Agent (cuando TLS está habilitado):
    - El identificador predeterminado es `SOURCE_DATADOG_AGENT_KEY_PASS`.

{{% /tab %}}

{{% tab "Variables de entorno" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/datadog_agent %}}

{{% /tab %}}
{{< /tabs >}}

## Conecte el Datadog Agent al Observability Pipelines Worker {#connect-the-datadog-agent-to-the-observability-pipelines-worker}

{{< tabs >}}
{{% tab "Registros" %}}

Utilice el archivo de configuración del Agent o el archivo de valores del gráfico de Helm del Agent para conectar el Datadog Agent al Observability Pipelines Worker.

**Nota**: Si su Agent se está ejecutando en un contenedor Docker, debe excluir los registros de Observability Pipelines utilizando la variable de entorno `DD_CONTAINER_EXCLUDE_LOGS`. Para Helm, utilice `datadog.containerExcludeLogs`. Esto evita registros duplicados, ya que el Worker también envía sus propios registros directamente a Datadog. Consulte [Colección de logs de Docker][1] o [Configuración de variables de entorno][2] para obtener más información.

{{% collapse-content title="Archivo de configuración del Agent" level="h3" expanded=false id="logs-agent-config-file" %}}

{{% observability_pipelines/log_source_configuration/datadog_agent %}}

{{% /collapse-content %}}

{{% collapse-content title="Archivo de valores de Helm del Agent" level="h3" expanded=false id="logs-agent-helm-values-file" %}}

{{% observability_pipelines/log_source_configuration/datadog_agent_kubernetes %}}

{{% /collapse-content %}}

[1]: /es/containers/docker/log/?tab=containerinstallation#linux
[2]: /es/containers/guide/container-discovery-management/?tab=helm#setting-environment-variables

{{% /tab %}}

{{% tab "Métricas" %}}

Utilice el archivo de configuración del Agent o el archivo de valores del gráfico de Helm del Agent para conectar el Datadog Agent al Observability Pipelines Worker.

**Nota**: Si su Agent se está ejecutando en un contenedor de Docker, debe excluir las métricas de Observability Pipelines, como las métricas de utilización y de eventos de entrada/salida, usando la variable de entorno `DD_CONTAINER_EXCLUDE_METRICS`. Para Helm, utilice `datadog.containerExcludeMetrics`. Esto evita métricas duplicadas, ya que el Worker también envía sus propias métricas directamente a Datadog. Consulte [Recopilación de métricas de Docker][1] o [Configuración de variables de entorno para Helm][2] para obtener más información.

{{% collapse-content title="Archivo de configuración del Agent" level="h3" expanded=false id="metrics-agent-config-file" %}}

Para enviar métricas del Datadog Agent al Observability Pipelines Worker, actualice su [archivo de configuración del Agent][1] con lo siguiente:

```
observability_pipelines_worker:
  metrics:
    enabled: true
    url: "http://<OPW_HOST>:8383"

```

`<OPW_HOST>` es la dirección IP del servidor o la URL del balanceador de carga asociada con el Observability Pipelines Worker.
- Para instalaciones de CloudFormation, use la salida `LoadBalancerDNS` de CloudFormation para la URL.
- Para instalaciones de Kubernetes, puede usar el registro DNS interno del servicio de Observability Pipelines Worker. Por ejemplo: `http://opw-observability-pipelines-worker.default.svc.cluster.local:<PORT>`.

**Nota**: Si el Worker está escuchando registros en el puerto 8282, debe usar otro puerto para las métricas, como el 8383.

Después de [reiniciar el Agent][2], sus datos de observabilidad se envían al Worker, son procesados por el pipeline y entregados a Datadog.

[1]: /es/agent/configuration/agent-configuration-files/
[2]: /es/agent/configuration/agent-commands/#restart-the-agent

{{% /collapse-content %}}

{{% collapse-content title="Archivo de valores de Helm del Agent" level="h3" expanded=false id="metrics-agent-helm-values-file" %}}

Para enviar métricas del Datadog Agent al Observability Pipelines Worker, actualice su archivo [datadog-values.yaml][1] del chart de Helm de Datadog con las siguientes variables de entorno. Consulte [Variables de entorno del Agent][2] para obtener más información.

```
datadog:
  env:
    - name: DD_OBSERVABILITY_PIPELINES_WORKER_METRICS_ENABLED
      value: true
    - name: DD_OBSERVABILITY_PIPELINES_WORKER_METRICS_URL
      value: "http://<OPW_HOST>:8383"
```

`<OPW_HOST>` es la dirección IP del servidor o la URL del balanceador de carga asociada con el Observability Pipelines Worker.

 Para instalaciones de Kubernetes, puede usar el registro DNS interno del servicio de Observability Pipelines Worker. Por ejemplo: `http://opw-observability-pipelines-worker.default.svc.cluster.local:<PORT>`.

**Nota**: Si el Worker está escuchando registros en el puerto 8282, debe usar otro puerto para las métricas, como el 8383.

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
[2]: https://docs.datadoghq.com/es/agent/guide/environment-variables/

{{% /collapse-content %}}

[1]: /es/containers/docker/data_collected/
[2]: /es/containers/guide/container-discovery-management/?tab=helm#setting-environment-variables

{{% /tab %}}
{{< /tabs >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/observability_pipelines/configuration/set_up_pipelines/
[4]: /es/observability_pipelines/sources/opentelemetry/#send-data-from-the-datadog-distribution-of-opentelemetry-collector-to-observability-pipelines
[5]: /es/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
[6]: https://app.datadoghq.com/observability-pipelines
[7]: /es/api/latest/observability-pipelines/
[8]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline