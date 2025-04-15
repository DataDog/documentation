---
further_reading:
- link: /opentelemetry/agent/agent_with_custom_components
  tag: Documentation
  text: Uso de componentes personalizados de OpenTelemetry con Datadog Agent
- link: /opentelemetry/agent/install_agent_with_collector
  tag: Documentation
  text: Instala el Datadog Agent con el recopilador integrado de OpenTelemetry
private: true
title: Migración a Datadog Agent con el recopilador integrado de OpenTelemetry
---

{{< callout url="https://www.datadoghq.com/private-beta/agent-with-embedded-opentelemetry-collector/" btn_hidden="false" header="Join the Preview!">}}
  El Datadog Agent con el recopilador integrado de OpenTelemetry está en vista previa. Para solicitar acceso, completa este formulario.
{{< /callout >}}

Si ya utilizas un recopilador independiente de OpenTelemetry (OTel) para tus aplicaciones instrumentadas por OTel, puedes migrar al Datadog Agent con el recopilador integrado de OpenTelemetry. El recopilador integrado de OTel te permite aprovechar las capacidades mejoradas de Datadog, incluidas configuraciones optimizadas, integraciones sin fisuras y funciones adicionales adaptadas al ecosistema de Datadog.

Para migrar al Datadog Agent con el recopilador integrado de OpenTelemetry, debes instalar el Datadog Agent y configurar tus aplicaciones para informar de los datos de telemetría.

<div class="alert alert-danger">Esta guía aborda la migración del recopilador de OpenTelemetry desplegado como un <a href="https://opentelemetry.io/docs/collector/deployment/agent/">Agent</a>. El <a href="https://opentelemetry.io/docs/collector/deployment/gateway/">patrón de despliegue de la puerta de enlace</a> no es compatible.</div>

## Requisitos previos

Antes de iniciar el proceso de migración, asegúrate de que tienes:

- Una cuenta válida en Datadog 
- Una aplicación instrumentada con OpenTelemetry lista para enviar datos telemétricos
- Acceso a tus configuraciones actuales del recopilador de OpenTelemetry
- Acceso administrativo a tu clúster de Kubernetes (se requiere Kubernetes v1.29+)
- Helm v3+

## Revisar la configuración existente

Antes de empezar, revisa tu configuración para ver si tu configuración existente es compatible por defecto:

1. Examina tu archivo de configuración existente del recopilador de OpenTelemetry (`otel-config.yaml`).
1. Compáralo con la [lista de componentes][1] incluido por defecto en el Datadog Agent.
1. Si tu configuración utiliza componentes no incluidos por defecto en el Agent, sigue las instrucciones de [Uso de componentes personalizados de OpenTelemetry con el Datadog Agent][4].

### Ejemplo de configuración

Aquí tienes dos archivos de ejemplo de configuración del recopilador:

{{< tabs >}}
{{% tab "Componentes personalizados del recopilador " %}}

Este ejemplo utiliza un componente `metricstransform` personalizado:

{{< code-block lang="yaml" filename="collector-config.yaml" disable_copy="true" collapsible="true" >}}
receivers:
  otlp:
    protocols:
      grpc:
         endpoint: 0.0.0.0:4317
      http:
         endpoint: 0.0.0.0:4318
exporters:
  datadog:
    api:
      key: ${env:DD_API_KEY}
processors:
  infraattributes:
    cardinality: 2
  batch:
    timeout: 10s
  metricstransform:
    transforms:
      - include: system.cpu.usage
        action: insert
        new_name: host.cpu.utilization
connectors:
  datadog/connector:
    traces:
      compute_top_level_by_span_kind: true
      peer_tags_aggregation: true
      compute_stats_by_span_kind: true
service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [infraattributes, batch]
      exporters: [datadog/connector, datadog]
    metrics:
      receivers: [otlp, datadog/connector]
      processors: [metricstransform, infraattributes, batch]
      exporters: [datadog]
    logs:
      receivers: [otlp]
      processors: [infraattributes, batch]
      exporters: [datadog]
{{< /code-block >}}

En este caso, es necesario seguir las instrucciones de [Uso de componentes personalizados de OpenTelemetry con Datadog Agent][4].

[4]: /es/opentelemetry/agent/agent_with_custom_components
{{% /tab %}}

{{% tab "Componentes predeterminados del Agent" %}}

Este ejemplo sólo utiliza componentes incluidos por defecto en el Datadog Agent:

{{< code-block lang="yaml" filename="collector-config.yaml" disable_copy="true" collapsible="true" >}}
receivers:
  otlp:
    protocols:
      grpc:
         endpoint: 0.0.0.0:4317
      http:
         endpoint: 0.0.0.0:4318
exporters:
  datadog:
    api:
      key: ${env:DD_API_KEY}
processors:
  infraattributes:
    cardinality: 2
  batch:
    timeout: 10s
connectors:
  datadog/connector:
    traces:
      compute_top_level_by_span_kind: true
      peer_tags_aggregation: true
      compute_stats_by_span_kind: true
service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [infraattributes, batch]
      exporters: [datadog/connector, datadog]
    metrics:
      receivers: [otlp, datadog/connector]
      processors: [infraattributes, batch]
      exporters: [datadog]
    logs:
      receivers: [otlp]
      processors: [infraattributes, batch]
      exporters: [datadog]
{{< /code-block >}}

En este caso, puedes proceder a la instalación del Agent con el recopilador integrado de OpenTelemetry.

{{% /tab %}}
{{< /tabs >}}

## Instalar el Agent con el recopilador de OpenTelemetry

Sigue estos pasos para instalar el Agent con el recopilador integrado de OpenTelemetry.

### Añadir el repositorio de Datadog Helm

Para añadir el repositorio de Datadog a tus repositorios de Helm:

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
```

### Configurar la API de Datadog y las claves de aplicación

1. Obtén la [API][8] de Datadog y las [claves de aplicación][9].
1. Almacena las claves como un secreto en Kubernetes:
   ```shell
   kubectl create secret generic datadog-secret \
     --from-literal api-key=<DD_API_KEY> \
     --from-literal app-key=<DD_APP_KEY>
   ```
   Sustituye `<DD_API_KEY>` y `<DD_APP_KEY>` por tus claves de aplicación y la API de Datadog reales.

### Configurar el Datadog Agent

Utiliza un archivo YAML para especificar los parámetros del Helm chart para la [tabla del Datadog Agent][4].

1. Crea un archivo `datadog-values.yaml` vacío:
   ```shell
   touch datadog-values.yaml
   ```
   <div class="alert alert-info">Los parámetros no especificados utilizan los valores por defecto del <a href="https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml">values.yaml</a>.</div>
1. Configura la API de Datadog y los secretos de las claves de aplicación:
   {{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
datadog:
  site: datadoghq.com
  apiKeyExistingSecret: datadog-secret
  appKeyExistingSecret: datadog-secret
  logLevel: info
   {{< /code-block >}}
   Establezca `datadog.site` como su [ sitioDatadog ][10]. De lo contrario, por defecto es `datadoghq.com`, el sitio US1.
   <div class="alert alert-warning">El valor del parámetro loguear level <code>Datadog.logLevel</code> debe estar en minúsculas. Los niveles válidos de loguear son: <code>rastrear</code><code>debug</code>, <code>info</code>, <code>warn</code>, <code>error</code>, <code>critical</code>, <code>off</code>.</div>
1. Cambie la imagen Datadog Agent etiquetar para utilizar compilaciones con OpenTelemetry integrado Collector:
   {{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
agents:
  image:
    repository: gcr.io/datadoghq/agent
    etiquetar: 7.62.2-ot-beta-jmx
    doNotCheckTag: true
...
   {{< /code-block >}}
   <div class="alert alert-info">Esta guía utiliza un ejemplo de aplicación Java. El sufijo <code>-jmx</code> en la etiqueta image habilita las utilidades JMX. Para aplicaciones que no sean Java, utiliza <code>nightly-ot-beta-main</code> en su lugar.<br> Para más detalles, consulta la <a href="/containers/guide/autodiscovery-with-jmx/?tab=helm">guía de Autodiscovery e integración de JMX</a>.</div>
1. Habilita el recopilador de OpenTelemetry y configura los puertos esenciales:
   {{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
datadog:
  ...
  otelCollector:
    enabled: true
    ports:
      - containerPort: "4317" # default port for OpenTelemetry gRPC receiver.
        hostPort: "4317"
        name: otel-grpc
      - containerPort: "4318" # default port for OpenTelemetry HTTP receiver
        hostPort: "4318"
        name: otel-http
   {{< /code-block >}}
   Debes configurar el `hostPort` para que el puerto del contenedor sea expuesto a la red externa. Esto permite configurar el exportador OTLP para que apunte a la dirección IP del nodo al que está asignado el Datadog Agent.

   Si no deseas exponer el puerto, puedes utilizar en su lugar el servicio del Agent:
   1. Elimina las entradas <code>hostPort</code> de tu archivo <code>datadog-values.yaml</code>.
   1. En el archivo de despliegue de tu aplicación (`deployment.yaml`), configura el exportador OTLP para utilizar el servicio del Agent:
      ```sh
      env:
        - name: OTEL_EXPORTER_OTLP_ENDPOINT
          value: 'http://<SERVICE_NAME>.<SERVICE_NAMESPACE>.svc.cluster.local'
        - name: OTEL_EXPORTER_OTLP_PROTOCOL
          value: 'grpc'
      ```

1. (Opcional) Habilita las funciones adicionales de Datadog:
   <div class="alert alert-danger">La activación de estas funciones puede conllevar gastos adicionales. Consulta la <a href="https://www.datadoghq.com/pricing/">página de precios</a> y habla con tu CSM antes de continuar.</div>
   {{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
datadog:
  ...
  apm:
    portEnabled: true
    peer_tags_aggregation: true
    compute_stats_by_span_kind: true
    peer_service_aggregation: true
  orchestratorExplorer:
    enabled: true
  processAgent:
    enabled: true
    processCollection: true
   {{< /code-block >}}
1. (Opcional) Reúne las etiquetas (labels) de los pods y utilízalas como etiquetas (tags) para fijarlas a métricas, trazas (traces) y logs:
   <div class="alert alert-danger">Las métricas personalizadas pueden afectar a la facturación. Consulta la <a href="https://docs.datadoghq.com/account_management/billing/custom_metrics">página de facturación de métricas personalizadas</a> para obtener más información.</div>
   {{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
datadog:
  ...
  podLabelsAsTags:
    app: kube_app
    release: helm_release
{{< /code-block >}}

{{% collapse-content title="Completado Datadog-values.yaml file" level="p" %}}
Su `datadog-values.yaml` archivo debe ser algo como esto:
{{< code-block lang="yaml" filename="Datadog-values.yaml" collapsible="false" >}}
agentes:
  image:
    repository: gcr.io/datadoghq/Agent
   etiquetar: 7.62.2-ot-beta-jmx
    doNotCheckTag: true

Datadog:
  sitio: datadoghq.com
  apiKeyExistingSecret: Datadog-secret
  appKeyExistingSecret: Datadog-secret
  logLevel: info

  otelCollector:
    enabled: true
    ports:
      - containerPort: "4317"
        hostPort: "4317"
        name: otel-grpc
      - containerPort: "4318"
        hostPort: "4318"
        name: otel-http
  apm:
    portEnabled: true
    peer_tags_aggregation: true
    compute_stats_by_span_kind: true
    peer_service_aggregation: true
  orchestratorExplorer:
    enabled: true
  processAgent:
    enabled: true
    processCollection: true

  podLabelsAsTags:
    app: kube_app
    release: helm_release
   {{< /code-block >}}

{{% /collapse-content %}}

## Despliegue del Agent con el recopilador de OpenTelemetry

1. Instala o actualiza el Datadog Agent con el recopilador de OpenTelemetry en tu entorno de Kubernetes:
   ```sh
   helm upgrade -i <RELEASE_NAME> datadog/datadog \
     -f datadog-values.yaml \
     --set-file datadog.otelCollector.config=collector-config.yaml
   ```
1. Navega a **Integrations** > **Fleet Automation** (Integraciones > Automatización de flotas).
1. Selecciona la faceta **OTel Collector Version** (Versión del recopilador OTel).
1. Selecciona un Agent e inspecciona su configuración para comprobar que el nuevo Agent con el recopilador de OpenTelemetry se ha instalado correctamente.

## Configurar la aplicación

Para configurar tu aplicación existente para que utilice Datadog Agent en lugar del recopilador independiente, asegúrate de que se utiliza el nombre de host correcto del endpoint OTLP. El Datadog Agent con el recopilador integrado se despliega como un DaemonSet, por lo que el host actual necesita ser dirigido.

1. Ve al archivo de manifiesto de despliegue de tu aplicación (`deployment.yaml`).
1. Añade las siguientes variables de entorno para configurar el endpoint OTLP:
   {{< code-block lang="yaml" filename="deployment.yaml" disable_copy="true" collapsible="true" >}}
env:
  ...
  - name: HOST_IP
    valueFrom:
     fieldRef:
        fieldPath: status.hostIP
  - name: OTLP_GRPC_PORT
    value: "4317"
  - name: OTEL_EXPORTER_OTLP_ENDPOINT
    value: 'http://$(HOST_IP):$(OTLP_GRPC_PORT)'
  - name: OTEL_EXPORTER_OTLP_PROTOCOL
    value: 'grpc'
{{< /code-block >}}

## Correlacionar los datos de observabilidad

[El etiquetado unificado de servicios][3] unifica los datos de observabilidad en Datadog para que puedas navegar por métricas, trazas y logs con etiquetas coherentes.

Para configurar tu aplicación con el etiquetado unificado de servicios, establece la variable de entorno `OTEL_RESOURCE_ATTRIBUTES`:

1. Ve al archivo de manifiesto de despliegue de tu aplicación.
1. Añade las siguientes líneas para permitir la correlación entre las trazas de aplicación y otros datos de observabilidad:
   {{< code-block lang="yaml" filename="deployment.yaml" disable_copy="true" collapsible="true" >}}
env:
  ...
  - name: OTEL_SERVICE_NAME
    value: {{ include "calendar.fullname" . }}
  - name: OTEL_K8S_NAMESPACE
    valueFrom:
      fieldRef:
        apiVersion: v1
        fieldPath: metadata.namespace
  - name: OTEL_K8S_NODE_NAME
    valueFrom:
      fieldRef:
        apiVersion: v1
        fieldPath: spec.nodeName
  - name: OTEL_K8S_POD_NAME
    valueFrom:
      fieldRef:
        apiVersion: v1
        fieldPath: metadata.name
  - name: OTEL_EXPORTER_OTLP_PROTOCOL
    value: 'grpc'
  - name: OTEL_RESOURCE_ATTRIBUTES
    value: >-
      service.name=$(OTEL_SERVICE_NAME),
      k8s.namespace.name=$(OTEL_K8S_NAMESPACE),
      k8s.node.name=$(OTEL_K8S_NODE_NAME),
      k8s.pod.name=$(OTEL_K8S_POD_NAME),
      k8s.container.name={{ .Chart.Name }},
      host.name=$(OTEL_K8S_NODE_NAME),
      deployment.environment=$(OTEL_K8S_NAMESPACE)
{{< /code-block >}}

## Verificar el flujo de datos

Después de configurar tu aplicación, comprueba que los datos fluyen correctamente a Datadog:

1. Aplica los cambios de configuración volviendo a desplegar tus aplicaciones.
   ```sh
   kubectl apply -f deployment.yaml
   ```
1. Confirma que los datos de telemetría se están recibiendo en tu cuenta de Datadog. Comprueba los logs, trazas y métricas para asegurar la correcta recopilación y correlación de los datos.

## Desinstalar el recopilador independiente

Una vez que hayas confirmado que todos los datos se están recopilando correctamente en Datadog, puedes eliminar la versión independiente del recopilador de OpenTelemetry:

1. Asegúrate de que todos los datos necesarios se recopilan y se muestran en Datadog.
1. Desinstala el recopilador de código abierto de OpenTelemetry de tu entorno:
   ```sh
   kubectl delete deployment old-otel-collector
   ```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/opentelemetry/agent/install_agent_with_collector#included-components
[2]: /es/opentelemetry/agent/install_agent_with_collector#install-the-datadog-agent-with-opentelemetry-collector
[3]: /es/getting_started/tagging/unified_service_tagging
[4]: /es/opentelemetry/agent/agent_with_custom_components
[5]: /es/opentelemetry/agent/install_agent_with_collector#add-the-datadog-helm-repository
[6]: /es/opentelemetry/agent/install_agent_with_collector#set-up-the-api-and-application-keys
[7]: /es/opentelemetry/agent/install_agent_with_collector#configure-the-datadog-agent
[8]: https://app.datadoghq.com/organization-settings/api-keys/
[9]: https://app.datadoghq.com/organization-settings/application-keys
[10]: /es/getting_started/site/