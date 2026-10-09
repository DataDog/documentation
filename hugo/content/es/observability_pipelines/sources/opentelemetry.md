---
description: Aprenda a recopilar registros, métricas o trazas de un OpenTelemetry
  Collector utilizando el Observability Pipelines Worker.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/manage-metrics-cost-control-with-observability-pipelines
  tag: Blog
  text: Administre el volumen de métricas y las etiquetas en su entorno con Observability
    Pipelines
- link: https://www.datadoghq.com/blog/otel-ai-observability-pipelines-clickhouse/
  tag: Blog
  text: Enrutar datos de OTel de aplicaciones de IA a ClickHouse y Datadog usando
    Observability Pipelines
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
- icon: metrics
  name: Métricas
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: Fuente de OpenTelemetry
---
{{< product-availability >}}

## Descripción general {#overview}

Utilice la fuente de OpenTelemetry (OTel) de Observability Pipelines para recopilar registros o métricas desde su OTel Collector a través de HTTP o gRPC.

**Notas**:
- Si está utilizando la distribución de Datadog del Collector de OpenTelemetry (DDOT), utilice la fuente de OpenTelemetry para [enviar datos a Observability Pipelines](#send-data-from-the-datadog-distribution-of-opentelemetry-collector-to-observability-pipelines).
- Si está utilizando la distribución de Splunk HEC del Collector de OpenTelemetry, utilice la [fuente Splunk HEC][4] para enviar registros a Observability Pipelines.

### Cuándo utilizar esta fuente {#when-to-use-this-source}

Escenarios comunes en los que podría utilizar esta fuente:

- Usted utiliza [OpenTelemetry][1] como su método estándar para recopilar y enrutar datos, y desea normalizar esos datos antes de enrutarlos a diferentes destinos.
- Usted está recopilando datos de múltiples fuentes y desea agregarlos en un lugar central para un procesamiento consistente.
    - Por ejemplo, si algunos de sus servicios exportan registros utilizando OpenTelemetry, mientras que otros servicios utilizan Datadog Agents u otras [fuentes][2] de Observability Pipelines, puede enviar todos sus datos a Observability Pipelines para su procesamiento.

## Requisitos previos {#prerequisites}

Si sus reenviadores están configurados globalmente para habilitar SSL, necesita los certificados TLS apropiados y la contraseña que utilizó para crear su clave privada.

## Configuración {#setup}

<div class="alert alert-danger">Para la gestión de secretos: Solo ingrese los identificadores para las direcciones de escucha HTTP y gRPC de OpenTelemetry y, si corresponde, la contraseña de la clave TLS. <b>No</b> ingrese los valores reales.</div>

Configure esta fuente cuando [configure una canalización][6]. Puede configurar una canalización en el [UI][10], usando la [API][11] o con [Terraform][12]. Las instrucciones de esta sección son para configurar la fuente en la interfaz de usuario.

Después de seleccionar la fuente OpenTelemetry en la interfaz de usuario de la canalización:

1. Ingrese el identificador para su dirección de escucha HTTP. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).
1. Ingrese el identificador para su dirección de escucha gRPC. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).

{{% observability_pipelines/secrets_env_var_note %}}

### Configuración de TLS opcional {#optional-tls-settings}

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/tls_settings_mtls %}}

{{< img src="observability_pipelines/sources/otel_settings.png" alt="La configuración de la fuente OpenTelemetry" style="width:35%;" >}}

## Valores predeterminados de Secret {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestión de secretos" %}}

- Identificador de dirección HTTP:
	- Hace referencia a la dirección de socket HTTP en la que el Observability Pipelines Worker escucha los datos del OTel Collector.
	- El identificador predeterminado es `SOURCE_OTEL_HTTP_ADDRESS`.
- Identificador de dirección gRPC:
	- Hace referencia a la dirección del socket gRPC en la que el Observability Pipelines Worker escucha los datos del OTel Collector.
	- El identificador predeterminado es `SOURCE_OTEL_GRPC_ADDRESS`.
- Identificador de frase de contraseña TLS (cuando TLS está habilitado):
	- El identificador predeterminado es `SOURCE_OTEL_KEY_PASS`.

{{% /tab %}}

{{% tab "Variables de entorno" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/opentelemetry %}}

{{% /tab %}}
{{< /tabs >}}

## Envíe datos al Observability Pipelines Worker {#send-data-to-the-observability-pipelines-worker}

Configure sus exportadores de OTel para que apunten a HTTP o gRPC. El Worker expone puertos de escucha configurables para cada protocolo.

<div class="alert alert-info">Los puertos 4318 (HTTP) y 4317 (gRPC) que se muestran a continuación son solo ejemplos. Puede configurar el valor del puerto para cualquiera de los protocolos en el Worker. Asegúrese de que sus exportadores de OTel coincidan con el valor de puerto que elija.</a></div>

{{< tabs >}}
{{% tab "Registros" %}}

### Ejemplo de configuración HTTP {#http-configuration-example}

El Worker expone el punto de conexión HTTP en el puerto 4318, que es el puerto predeterminado. Puede configurar el valor del puerto en el Worker.

Por ejemplo, para configurar un exportador de registros de OTel a través de HTTP en Python:

```python
    from opentelemetry.exporter.otlp.proto.http._log_exporter import OTLPLogExporter
    http_exporter = OTLPLogExporter(
        endpoint="http://worker:4318/v1/logs"
    )
```

### Ejemplo de configuración gRPC {#grpc-configuration-example}

El Worker expone el punto de conexión gRPC en el puerto 4317, que es el puerto predeterminado. Puede configurar el valor del puerto en el Worker.

Por ejemplo, para configurar un exportador de registros de OTel a través de gRPC en Python:

```python
    from opentelemetry.exporter.otlp.proto.grpc._log_exporter import OTLPLogExporter
    grpc_exporter = OTLPLogExporter(
        endpoint="grpc://worker:4317"
    )
```

Establezca las variables de entorno de la dirección de escucha en los siguientes valores predeterminados. Si configuró valores de puerto diferentes en el Worker, utilice esos en su lugar.

- Dirección de escucha HTTP: `worker:4318`
- Dirección de escucha gRPC: `worker:4317`

{{% /tab %}}

{{% tab "Métricas" %}}

### Ejemplo de configuración HTTP {#http-configuration-example-1}

El Worker expone el punto de conexión HTTP en el puerto 4318, que es el puerto predeterminado. Puede configurar el valor del puerto en el Worker.

Por ejemplo, para configurar un exportador de métricas OTel a través de HTTP en Python:

```python
    from opentelemetry.exporter.otlp.proto.http.metric_exporter import OTLPMetricExporter
    http_exporter = OTLPMetricExporter(
        endpoint="http://worker:4318/v1/metrics"
    )
```

### Ejemplo de configuración gRPC {#grpc-configuration-example-1}

El Worker expone el punto de conexión gRPC en el puerto 4317, que es el puerto predeterminado. Puede configurar el valor del puerto en el Worker.

Por ejemplo, para configurar un exportador de métricas OTel a través de gRPC en Python:

```python
    from opentelemetry.exporter.otlp.proto.grpc.metric_exporter import OTLPMetricExporter
    grpc_exporter = OTLPMetricExporter(
        endpoint="grpc://worker:4317"
    )
```

Establezca las variables de entorno de la dirección de escucha en los siguientes valores predeterminados. Si configuró valores de puerto diferentes en el Worker, utilice esos en su lugar.

- Dirección de escucha HTTP: `worker:4318`
- Dirección de escucha gRPC: `worker:4317`

{{% /tab %}}
{{< /tabs >}}

## Enviar datos desde la distribución de Datadog del OpenTelemetry Collector a Observability Pipelines {#send-data-from-the-datadog-distribution-of-opentelemetry-collector-to-observability-pipelines}

{{< tabs >}}
{{% tab "Registros" %}}

Para enviar registros desde la distribución de Datadog del OpenTelemetry (DDOT) Collector:
1. Despliegue el DDOT Collector usando Helm. Consulte [Instalar el DDOT Collector como un DaemonSet de Kubernetes][5] para obtener instrucciones.
1. [Configure una canalización][6] en Observability Pipelines usando la [fuente de OpenTelemetry](#set-up-the-source-in-the-pipeline-ui).
    1. (Opcional) Datadog recomienda agregar un [procesador de edición de campos][7] a la canalización que añada el campo `op_otel_ddot:true` en caso de que el registro no tenga el campo `source`.
    1. Cuando instale el Worker, para las variables de entorno de la fuente de OpenTelemetry:
        1. Configure su dirección de escucha HTTP en `0.0.0.0:4318`.
        1. Configure su dirección de escucha gRPC en `0.0.0.0:4317`.
    1. Después de instalar el Worker y desplegar la canalización, actualice el [`otel-config.yaml`][9] del OpenTelemetry Collector para incluir un exportador que envíe registros a Observability Pipelines. Por ejemplo:
        ```
        exporters:
            otlphttp:
                endpoint: http://opw-observability-pipelines-worker.<NAMESPACE>.svc.cluster.local:4318
        ...
        service:
            pipelines:
                logs:
                    exporters: [otlphttp]
        ```
        Replace `<NAMESPACE>` with the Kubernetes namespace where the Observability Pipelines Worker is deployed (for example, `default`).
    1. Redeploy the Datadog Agent with the updated [`otel-config.yaml`][9]. For example, if the Agent is installed in Kubernetes:
        ```
        helm upgrade --install datadog-agent datadog/datadog \
        --values ./agent.yaml \
        --set-file datadog.otelCollector.config=./otel-config.yaml
        ```

**Notas**:
- Debido a que DDOT envía registros a Observability Pipelines y no al Datadog Agent, la siguiente configuración no funciona para enviar registros desde DDOT a Observability Pipelines:
    - `DD_OBSERVABILITY_PIPELINES_WORKER_LOGS_ENABLED`
    - `DD_OBSERVABILITY_PIPELINES_WORKER_LOGS_URL`
- Los registros enviados desde DDOT pueden tener objetos anidados que impiden que Datadog realice el parseo de los registros correctamente. Para resolver esto, Datadog recomienda usar el [Custom Processor][8] para aplanar el objeto `resource` anidado.
- Si el DDOT Collector y el Observability Pipelines Worker se ejecutan en el mismo servidor, sus puertos de receptor OTLP predeterminados (4317/4318) pueden entrar en conflicto. En una implementación típica de Kubernetes, el Collector y el Worker se ejecutan en pods separados, por lo que esto no es un problema.

[5]: /es/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/?tab=datadogoperator
[6]: /es/observability_pipelines/configuration/set_up_pipelines/
[7]: /es/observability_pipelines/processors/edit_fields#add-field
[8]: /es/observability_pipelines/processors/custom_processor
[9]: https://docs.datadoghq.com/es/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/?tab=helm#configure-the-opentelemetry-collector

{{% /tab %}}

{{% tab "Métricas" %}}

Para enviar métricas desde la distribución de Datadog del OpenTelemetry (DDOT) Collector:
1. Despliegue el DDOT Collector usando Helm. Consulte [Instalar el DDOT Collector como un DaemonSet de Kubernetes][5] para obtener instrucciones.
1. [Configure una canalización][6] en Observability Pipelines usando la [fuente de OpenTelemetry](#set-up-the-source-in-the-pipeline-ui).
    1. (Opcional) Datadog recomienda agregar un [procesador de edición de campos][7] a la canalización que anexe el campo `op_otel_ddot:true`.
    1. Cuando instale el Worker, para las variables de entorno de la fuente de OpenTelemetry:
        1. Configure su dirección de escucha HTTP en `0.0.0.0:4318`.
        1. Configure su dirección de escucha gRPC en `0.0.0.0:4317`.
    1. Después de instalar el Observability Pipelines Worker y de desplegar la canalización, actualice el [`otel-config.yaml`][9] del OpenTelemetry Collector para incluir un exportador que envíe métricas a Observability Pipelines. Por ejemplo:
        ```
        exporters:
            otlphttp:
                endpoint: http://opw-observability-pipelines-worker.<NAMESPACE>.svc.cluster.local:4318
        ...
        service:
            pipelines:
                metrics:
                    exporters: [otlphttp]
        ```
        Replace `<NAMESPACE>` with the Kubernetes namespace where the Observability Pipelines Worker is deployed (for example, `default`).
    1. Redeploy the Datadog Agent with the updated [`otel-config.yaml`][9]. For example, if the Agent is installed in Kubernetes:
        ```
        helm upgrade --install datadog-agent datadog/datadog \
        --values ./agent.yaml \
        --set-file datadog.otelCollector.config=./otel-config.yaml
        ```

**Notas**:
- Debido a que DDOT envía métricas a Observability Pipelines, y no al Datadog Agent, la siguiente configuración no funciona para enviar métricas desde DDOT a Observability Pipelines:
    - `DD_OBSERVABILITY_PIPELINES_WORKER_METRICS_ENABLED`
    - `DD_OBSERVABILITY_PIPELINES_WORKER_METRICS_URL`
- Las métricas enviadas desde DDOT pueden tener objetos anidados que impiden que Datadog realice el parseo de las métricas correctamente. Para resolver esto, Datadog recomienda usar el [Custom Processor][8] para aplanar el objeto `resource` anidado.
- Si el DDOT Collector y el Observability Pipelines Worker se ejecutan en el mismo servidor, sus puertos de receptor OTLP predeterminados (4317/4318) pueden entrar en conflicto. En una implementación típica de Kubernetes, el Collector y el Worker se ejecutan en pods separados, por lo que esto no es un problema.

[5]: /es/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/?tab=datadogoperator
[6]: /es/observability_pipelines/configuration/set_up_pipelines/
[7]: /es/observability_pipelines/processors/edit_fields#add-field
[8]: /es/observability_pipelines/processors/custom_processor
[9]: https://docs.datadoghq.com/es/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/?tab=helm#configure-the-opentelemetry-collector

{{% /tab %}}
{{< /tabs >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/collector/
[2]: /es/observability_pipelines/sources/
[3]: /es/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/#bootstrap-options
[4]: /es/observability_pipelines/sources/splunk_hec/#send-logs-from-the-splunk-distributor-of-the-opentelemetry-collector-to-observability-pipelines
[5]: /es/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/?tab=datadogoperator
[6]: /es/observability_pipelines/configuration/set_up_pipelines/
[7]: /es/observability_pipelines/processors/edit_fields#add-field
[8]: /es/observability_pipelines/processors/custom_processor
[9]: https://docs.datadoghq.com/es/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/?tab=helm#configure-the-opentelemetry-collector
[10]: https://app.datadoghq.com/observability-pipelines
[11]: /es/api/latest/observability-pipelines/
[12]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline