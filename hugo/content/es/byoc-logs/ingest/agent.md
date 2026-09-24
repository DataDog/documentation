---
aliases:
- /es/cloudprem/ingest_logs/datadog_agent/
- /es/cloudprem/ingest/agent/
description: Configure el Datadog Agent para enviar registros a su despliegue de BYOC
  Logs
further_reading:
- link: /byoc-logs/ingest/observability_pipelines/
  tag: Documentación
  text: Integración de Observability Pipelines
- link: /byoc-logs/ingest/api/
  tag: Documentación
  text: Integración de REST API
- link: /getting_started/containers/datadog_operator/
  tag: Documentación
  text: Guía del Datadog Operator
private: true
title: Envíe registros a BYOC Logs con el Datadog Agent
---
## Descripción general {#overview}
Este documento proporciona los pasos de configuración para usar el Datadog Agent para enviar registros a un despliegue de Datadog BYOC (Bring Your Own Cloud) Logs. A diferencia de la plataforma SaaS de Datadog, BYOC Logs requiere configuraciones específicas del Agent para asegurar que los registros se enriquezcan con las etiquetas necesarias a nivel de servidor y se envíen al punto de conexión correcto. Esta guía cubre cómo establecer estas configuraciones para los métodos de despliegue más comunes.

## Requisitos clave {#key-requirements}
Para enviar registros con el Datadog Agent a BYOC Logs, debe configurar dos variables de entorno:

`DD_LOGS_CONFIG_LOGS_DD_URL`
: Establezca esto en su punto de conexión del indexador de BYOC Logs, generalmente `http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280`. Esto le indica al Agent a dónde enviar los registros

`DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION`
: (Opcional) Esta es una variable opcional pero altamente recomendada. Establézcala en un valor grande, como "100000" (aproximadamente 5 años). Esto asegura que el Agent añada etiquetas a nivel de servidor a cada registro que envía. La plataforma SaaS de Datadog enriquece automáticamente los registros con estas etiquetas después de la ingesta, pero BYOC Logs requiere que el Agent las añada por adelantado.

### Proxy {#proxy}

Si ha configurado el Datadog Agent para usar un proxy y BYOC Logs está alojado en su red interna, necesita configurar el ajuste `no_proxy` para que el Agent pueda enviar registros directamente a BYOC Logs sin pasar por el proxy.

```yaml
# In the no_proxy section, add the BYOC Logs DNS
no_proxy:
 - http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280
```

Además, debe establecer `DD_NO_PROXY_NONEXACT_MATCH` en true. Para obtener más detalles, consulte [Datadog Agent Proxy Configuration][2].

## Enviar registros de Kubernetes con el Datadog Operator {#send-kubernetes-logs-with-the-datadog-operator}

Para implementar el Datadog Agent en Kubernetes utilizando el Datadog Operator, siga la guía [Introducción al Datadog Operator][1]. Cuando llegue al paso 3, utilice la siguiente configuración `datadog-agent.yaml` en lugar del ejemplo proporcionado en la guía.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    site: datadoghq.com
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
    env:
      - name: DD_LOGS_CONFIG_LOGS_DD_URL
        value: http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280
      - name: DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION
        value: "100000"

  features:
    logCollection:
      enabled: true
      containerCollectAll: true

    otlp:
      receiver:
        protocols:
          grpc:
            enabled: true
            endpoint: 0.0.0.0:4417

    prometheusScrape:
      enabled: true
      enableServiceEndpoints: true

```

## Opciones de configuración {#configuration-options}

### Configuración del punto de conexión{#endpoint-configuration}

El Datadog Agent se puede configurar para enviar registros a BYOC Logs utilizando diferentes puntos de conexión:

{{% collapse-content title="Punto de conexión de clúster interno" level="h4" expanded=false %}}
Recomendado para agentes dentro del clúster:

```
DD_LOGS_CONFIG_LOGS_DD_URL=http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280
```
{{% /collapse-content %}}

{{% collapse-content title="Punto de conexión de ingreso interno" level="h4" expanded=false %}}
Para agentes fuera del clúster:

```
DD_LOGS_CONFIG_LOGS_DD_URL=https://cloudprem-internal.your-domain.com
```
{{% /collapse-content %}}

### Configuración adicional del Datadog Agent {#additional-agent-configuration}

También puede configurar funciones adicionales para enviar metadatos del clúster a Datadog:

{{% collapse-content title="Recopilación de métricas de Prometheus" level="h4" expanded=false %}}

```yaml
features:
  prometheusScrape:
    enabled: true
    enableServiceEndpoints: true
```
{{% /collapse-content %}}

{{% collapse-content title="Recopilación de registros OTLP" level="h4" expanded=false %}}
Para enviar registros del Datadog Agent a Datadog:

```yaml
features:
  otlp:
    receiver:
      protocols:
        grpc:
          enabled: true
          endpoint: 0.0.0.0:4417
```
{{% /collapse-content %}}

## Métodos de implementación alternativos{#alternative-deployment-methods}
Si no está utilizando el Datadog Operator, puede implementar el Datadog Agent utilizando uno de estos métodos comunes:
### Implementación con Helm chart {#helm-chart-deployment}

Ejecute el siguiente comando para implementar el Datadog Agent utilizando el Helm chart, estableciendo las variables de entorno específicas de registro directamente.

```shell
helm install datadog-agent datadog/datadog \
  --set datadog.apiKey=<YOUR_API_KEY> \
  --set datadog.logs.enabled=true \
  --set datadog.logs.containerCollectAll=true \
  --set datadog.logsConfigContainerCollectAll=true \
  --set agents.containers.agent.env[0].name=DD_LOGS_CONFIG_LOGS_DD_URL \
  --set agents.containers.agent.env[0].value=http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280
```

### Implementación de DaemonSet {#daemonset-deployment}

Para implementaciones personalizadas, configure la variable de entorno en su DaemonSet:

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: datadog-agent
spec:
  template:
    spec:
      containers:
      - name: agent
        image: registry.datadoghq.com/agent:latest
        env:
        - name: DD_API_KEY
          value: <YOUR_API_KEY>
        - name: DD_LOGS_ENABLED
          value: "true"
        - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
          value: "true"
        - name: DD_LOGS_CONFIG_LOGS_DD_URL
          value: "http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280"
```

## Verificación {#verification}
Después de implementar el Datadog Agent, puede verificar que los registros se estén enviando y recibiendo correctamente.

### Verificar el estado del Datadog Agent {#check-agent-status}

Use `kubectl exec` para verificar el estado del Datadog Agent y confirmar que esté configurado para enviar registros.

```shell
# Check Agent status and logs configuration
kubectl exec -it <datadog-agent-pod> -- agent status | grep -A 10 "Logs Agent"

# Check Agent logs for BYOC Logs connection
kubectl logs <datadog-agent-pod> | grep -i cloudprem
```

### Verificar que los registros estén indexados en BYOC Logs {#check-logs-are-indexed-in-byoc-logs}

Ejecute este comando para consultar el buscador de BYOC Logs y verificar que esté indexando los registros JSON.

```shell
kubectl exec -it <RELEASE_NAME>-searcher-0 -n <NAMESPACE_NAME> -- curl 'http://localhost:7280/api/v1/datadog/search?query='
```

## Solución de problemas {#troubleshooting}

**El Datadog Agent no envía registros**:
- Verifique que la variable de entorno `DD_LOGS_CONFIG_LOGS_DD_URL` esté configurada correctamente
- Verifique los registros del pod del Datadog Agent: `kubectl logs <datadog-agent-pod>`
- Asegúrese de que la recopilación de registros esté habilitada: `DD_LOGS_ENABLED=true`

**BYOC Logs no está recibiendo registros**:
- Verifique los registros del indexador de BYOC Logs: `kubectl logs -n <NAMESPACE_NAME> -l app=<RELEASE_NAME>-indexer`
- Verifique la conectividad de red entre el Datadog Agent y el indexador de BYOC Logs
- Confirme que el servicio BYOC Logs se esté ejecutando: `kubectl get pods -n <NAMESPACE_NAME>`

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/containers/datadog_operator/#installation-and-deployment
[2]: /es/agent/configuration/proxy/#proxy-server-setup-examples