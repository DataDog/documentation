---
description: Configura el Datadog Agent para enviar los logs a tu despliegue de CloudPrem
further_reading:
- link: /cloudprem/ingest_logs/observability_pipelines/
  tag: Documentación
  text: Integración de Observability Pipelines
- link: /cloudprem/ingest_logs/rest_api/
  tag: Documentación
  text: Integración de la API REST
- link: /getting_started/containers/datadog_operator/
  tag: Documentación
  text: Guía del Datadog Operator
title: Enviar logs a CloudPrem con el Datadog Agent
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem está en vista previa" >}}
  Únete a la vista previa de CloudPrem para acceder a las nuevas funciones de gestión de logs autoalojadas.
{{< /callout >}}

## Información general
Este documento ofrece los pasos de configuración para utilizar el Datadog Agent para enviar logs a un despliegue de Datadog CloudPrem. A diferencia de la plataforma SaaS de Datadog, CloudPrem requiere configuraciones específicas del Agent para garantizar que los logs se enriquezcan con las etiquetas de nivel de host necesarias y se envíen al endpoint correcto. Esta guía explica cómo establecer estas configuraciones para los métodos de despliegue más comunes.

## Requisitos clave
Para enviar logs con el Datadog Agent a CloudPrem, debes configurar dos variables de entorno:

`DD_LOGS_CONFIG_LOGS_DD_URL`
: establécela en el endpoint de tu indexador de CloudPrem, normalmente `http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280`. Esto indica al Agent dónde enviar los logs.

`DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION`
(Opcional) Esta es una variable opcional, pero muy recomendable. Ajústala a un valor grande, como "100000" (aproximadamente 5 años). Esto garantiza que el Agent añada etiquetas a nivel de host a cada log que envíe. La plataforma SaaS de Datadog enriquece automáticamente los logs con estas etiquetas después de la ingesta, pero CloudPrem requiere que el Agent las añada por adelantado.

### Proxy

Si has configurado el Datadog Agent para utilizar un proxy y CloudPrem está alojado en tu red interna, deberás configurar `no_proxy` para que el Agent pueda enviar logs directamente a CloudPrem sin pasar por el proxy.

```yaml
# In the no_proxy section, add the CloudPrem DNS
no_proxy:
 - http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280
```

Además, debes establecer `DD_NO_PROXY_NONEXACT_MATCH` en true. Para obtener más información, consulta [Configuración del proxy del Datadog Agent][2].

## Enviar logs de Kubernetes con el Datadog Operator

Para desplegar el Agent en Kubernetes utilizando el Datadog Operator, sigue la guía [Introducción al Datadog Operator][1]. Cuando llegues al paso 3, utiliza la siguiente configuración `datadog-agent.yaml` en lugar del ejemplo proporcionado en la guía.

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

## Opciones de configuración

### Configuración del endpoint

El Datadog Agent puede configurarse para enviar logs a CloudPrem utilizando diferentes endpoints:

{{% collapse-content title="Endpoint de clúster interno" level="h4" expanded=false %}}
Recomendado para agents dentro del clúster:
```
DD_LOGS_CONFIG_LOGS_DD_URL=http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280
```
{{% /collapse-content %}}

{{% collapse-content title="Endpoint de entrada interna" level="h4" expanded=false %}}
Para Agents fuera del clúster:
```
DD_LOGS_CONFIG_LOGS_DD_URL=https://cloudprem-internal.your-domain.com
```
{{% /collapse-content %}}

### Configuración adicional de Agent

También puedes configurar funciones adicionales para enviar metadatos del clúster a Datadog:

{{% collapse-content title="Raspado de métricas de Prometheus" level="h4" expanded=false %}}

```yaml
features:
  prometheusScrape:
    enabled: true
    enableServiceEndpoints: true
```
{{% /collapse-content %}}

{{% collapse-content title="Recopilación de logs OTLP" level="h4" expanded=false %}}
Para enviar logs del Agent a Datadog:
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

## Métodos alternativos de despliegue
Si no utilizas el Datadog Operator, puedes desplegar el Agent utilizando uno de estos métodos habituales:
### Despliegue del Helm chart

Ejecuta el siguiente comando para desplegar el Agent utilizando el Helm chart, estableciendo directamente las variables de entorno específicas del log.

```shell
helm install datadog-agent datadog/datadog \
  --set datadog.apiKey=<YOUR_API_KEY> \
  --set datadog.logs.enabled=true \
  --set datadog.logs.containerCollectAll=true \
  --set datadog.logsConfigContainerCollectAll=true \
  --set agents.containers.agent.env[0].name=DD_LOGS_CONFIG_LOGS_DD_URL \
  --set agents.containers.agent.env[0].value=http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280
```

### Despliegue del DaemonSet

Para despliegues personalizados, establece la variable de entorno en tu DaemonSet:

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
        image: gcr.io/datadoghq/agent:latest
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

## Verificación
Una vez desplegado el Agent, puedes comprobar que los logs se envían y reciben correctamente.

### Comprobar el estado del Agent 

Utiliza `kubectl exec` para comprobar el estado del Agent y confirmar que está configurado para enviar logs.

```shell
# Check Agent status and logs configuration
kubectl exec -it <datadog-agent-pod> -- agent status | grep -A 10 "Logs Agent"

# Check Agent logs for CloudPrem connection
kubectl logs <datadog-agent-pod> | grep -i cloudprem
```

### Comprobar si los logs están indexados en CloudPrem

Ejecuta este comando para consultar el buscador de CloudPrem y verificar que está indexando los logs JSON.

```shell
kubectl exec -it <RELEASE_NAME>-searcher-0 -n <NAMESPACE_NAME> -- curl 'http://localhost:7280/api/v1/datadog/search?query='
```

## Solucionar problemas

**El Agent no está enviando logs**:
- Comprueba que la variable de entorno `DD_LOGS_CONFIG_LOGS_DD_URL` está configurada correctamente.
- Comprueba los logs de pod del Agent: `kubectl logs <datadog-agent-pod>`
- Asegúrate de que la recopilación de logs está activada: `DD_LOGS_ENABLED=true`

**CloudPrem no está recibiendo logs**:
- Comprueba los logs del indexador de CloudPrem: `kubectl logs -n <NAMESPACE_NAME> -l app=<RELEASE_NAME>-indexer`
- Verifica la conectividad de red entre el Agent y el indexador de CloudPrem
- Confirma que el servicio de CloudPrem se está ejecutando: `kubectl get pods -n <NAMESPACE_NAME>`

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/containers/datadog_operator/#installation-and-deployment
[2]: /es/agent/configuration/proxy/#proxy-server-setup-examples