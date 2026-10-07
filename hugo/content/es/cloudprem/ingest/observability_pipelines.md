---
aliases:
- /es/cloudprem/ingest_logs/observability_pipelines/
description: Configura Observability Pipelines para enviar logs a CloudPrem con envío
  dual opcional
further_reading:
- link: /cloudprem/ingest_logs/datadog_agent/
  tag: Documentación
  text: Integración del Datadog Agent
- link: /cloudprem/ingest_logs/rest_api/
  tag: Documentación
  text: Integración de la API REST
- link: /observability_pipelines/
  tag: Documentación
  text: Información general de Observability Pipelines
- link: /observability_pipelines/destinations/cloudprem/
  tag: Documentación
  text: Destino de CloudPrem para Observability Pipelines
title: Enviar logs a CloudPrem con Observability Pipelines
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem está en vista previa" >}}
  Únete a la vista previa de CloudPrem para acceder a las nuevas funciones de gestión de logs autoalojadas.
{{< /callout >}}

## Información general

Observability Pipelines proporciona una capa intermediaria flexible entre tus Datadog Agents y CloudPrem, permitiéndote procesar, transformar y enrutar los logs antes de que lleguen a tu despliegue de CloudPrem. Configura Observability Pipelines para recibir logs del Datadog Agent y reenviarlos a CloudPrem:
1. [**Crear y configurar el pipeline**](#create-and-configure-an-observability-pipeline): define tu configuración de pipeline (fuente, procesadores, destino) en la interfaz de usuario de Observability Pipelines. Esto crea la definición del pipeline que será utilizada por el worker.
2. [**Desplegar el worker de Observability Pipelines**](##deploy-your-observability-pipelines): instala el worker con tu configuración del pipeline. El Worker debe estar en ejecución y a la escucha de logs antes de que el Agent pueda conectarse a él.
3. [**Configurar el Datadog Agent**](#configure-the-datadog-agent): apunta el Agent para enviar logs al Worker desplegado. Este paso debe ser el último porque el Agent necesita que la dirección del worker esté disponible.

## Crear y configurar un Observability Pipeline

1. Ve a [Observability Pipelines][1].
1. Selecciona la [**plantilla del Control de volumen de logs**][2].
1. Configura tu pipeline:
    1. Selecciona la [fuente **Datadog Agent**][3].
    1. Elimina los procesadores predeterminados del pipeline.
    1. Selecciona el [destino **Datadog CloudPrem**][4] para reenviar los logs a tu instancia de CloudPrem. Deja la configuración vacía.

<!-- Esta imagen muestra un ejemplo con envío doble cuando las instrucciones digan control del volumen de logs -->
<!-- {{< img src="/cloudprem/ingest/observability-pipelines-cloudprem-setup.png" alt="Captura de pantalla de la interfaz del Logs Explorer que muestra cómo filtrar los logs al seleccionar el índice de cloudprem en el panel de facetas" style="width:80%;" >}} -->


## Desplegar tus Observability Pipelines

Después de crear tu pipeline en la interfaz de usuario, despliega el worker de Observability Pipelines. El worker ejecuta la configuración del pipeline y escucha los logs del Datadog Agent.

El siguiente comando de Helm instala o actualiza el worker, configurándolo para escuchar los logs y reenviarlos a tu indexador de CloudPrem.
<br>
**Nota**: Necesitas el `pipelineId` del pipeline que creaste en el paso anterior. Este ID vincula el worker a tu configuración del pipeline.

```shell
helm upgrade --install opw \
    -f values.yaml \
    --set datadog.apiKey=XXXXXXX \
    --set datadog.pipelineId=XXXXXXX \
    --set env[0].name=DD_OP_SOURCE_DATADOG_AGENT_ADDRESS,env[0].value='0.0.0.0:8282' \
    --set env[1].name=DD_OP_DESTINATION_CLOUDPREM_ENDPOINT_URL,env[1].value='http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280' \
    --set service.ports[0].name=dd-op-source-datadog-agent-address-port,service.ports[0].protocol=TCP,service.ports[0].port=8282,service.ports[0].targetPort=8282 \
    datadog/observability-pipelines-worker
```

Transcurrido un minuto, comprueba que los logs fluyen a través del pipeline y llegan al destino de CloudPrem. Esto indica que el worker se está ejecutando y está listo para recibir logs, y puedes proceder a configurar el Agent.

## Configurar el Datadog Agent

Una vez que el worker de Observability Pipelines esté desplegado y en funcionamiento, configura tu Datadog Agent para enviarle los logs. El Agent se conecta al worker utilizando la dirección de servicio del worker. Para obtener más información, consulta [Conectar el Datadog Agent al worker de Observability Pipelines][5].

Actualiza la configuración del Datadog Agent para enviar los logs al worker de Observability Pipelines:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: your-cluster
    site: datadoghq.com
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
    env:
      - name: DD_OBSERVABILITY_PIPELINES_WORKER_LOGS_ENABLED
        value: "true"
      - name: DD_OBSERVABILITY_PIPELINES_WORKER_LOGS_URL
        value: "http://observability-pipelines-worker:8282"

  features:
    logCollection:
      enabled: true
      containerCollectAll: true
```

## Verificación

Comprueba que los logs fluyen a través del pipeline:

```shell
# Check Observability Pipelines worker status
kubectl get pods -l app=observability-pipelines-worker

# Check worker logs
kubectl logs -l app=observability-pipelines-worker

# Verify logs are reaching CloudPrem
kubectl exec -it <RELEASE_NAME>-searcher-0 -n <NAMESPACE_NAME> -- curl 'http://localhost:7280/api/v1/datadog/search?query='
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /es/observability_pipelines/configuration/explore_templates/?tab=logs#log-volume-control
[3]: /es/observability_pipelines/sources/datadog_agent/
[4]: /es/observability_pipelines/destinations/cloudprem/
[5]: /es/observability_pipelines/sources/datadog_agent/?tab=agenthelmvaluesfile#connect-the-datadog-agent-to-the-observability-pipelines-worker