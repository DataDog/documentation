---
aliases:
- /es/cloudprem/ingest_logs/observability_pipelines/
- /es/cloudprem/ingest/observability_pipelines/
description: Configure Observability Pipelines para enviar registros a BYOC Logs con
  envío dual opcional
further_reading:
- link: /byoc-logs/ingest_logs/datadog_agent/
  tag: Documentación
  text: Integración del Datadog Agent
- link: /byoc-logs/ingest_logs/rest_api/
  tag: Documentación
  text: Integración de REST API
- link: /observability_pipelines/
  tag: Documentación
  text: Descripción general de Observability Pipelines
- link: /observability_pipelines/destinations/datadog_byoc_logs/
  tag: Documentación
  text: Destino de Datadog BYOC Logs para Observability Pipelines
title: Envíe registros a BYOC Logs con Observability Pipelines
---
## Descripción general {#overview}

Observability Pipelines proporciona una capa intermedia flexible entre sus Datadog Agents y BYOC (Bring Your Own Cloud) Logs, lo que le permite procesar, transformar y enrutar registros antes de que lleguen a su implementación de BYOC Logs. Configure Observability Pipelines para recibir registros del Datadog Agent y reenviarlos a BYOC Logs.

Para entornos híbridos con registros divididos entre centros de datos locales y la nube, implemente un Observability Pipelines Worker en un centro de datos local y configúrelo para enrutar esos registros al centro de datos de AWS que aloja BYOC Logs. BYOC Logs recopila entonces los registros reenviados a través de la ruta de ingesta estándar. **Nota**: Este patrón requiere una presencia en la nube existente y no es compatible con entornos que se ejecutan completamente en las instalaciones.

Para configurar esto:

1. [**Cree y configure la canalización**](#create-and-configure-an-observability-pipeline) - Defina la configuración de su canalización (fuente, procesadores, destino) en el Observability Pipelines UI. Esto crea la definición de la canalización que será utilizada por el Worker.
## 2. [**Implemente el Observability Pipelines Worker**]( deploy-your-observability-pipelines) - Instale el Worker con la configuración de su canalización. El Worker debe estar ejecutándose y escuchando registros antes de que el Agent pueda conectarse a él.
3. [**Configure el Datadog Agent**](#configure-the-datadog-agent) - Indique al Agent que envíe los registros al Worker implementado. Este paso debe realizarse al final porque el Agent necesita que la dirección del Worker esté disponible.

## Cree y configure una canalización{#create-and-configure-an-observability-pipeline}

1. Navegue a [Observability Pipelines][1].
1. Seleccione la [**Log Volume Control template**][2].
1. Configure su canalización:
    1. Elija el [**fuente de Datadog Agent**][3].
    1. Elimine cualquier procesador predeterminado de la canalización.
    1. Seleccione el destino [**Datadog BYOC Logs**][4] para reenviar registros a su instancia de BYOC Logs. Deje la configuración vacía.

<!-- This image shows an example with dual shipping when the instructions say log volume control -->
<!-- {{< img src="/cloudprem/ingest/observability-pipelines-cloudprem-setup.png" alt="Captura de pantalla de la interfaz de Logs Explorer que muestra cómo filtrar registros seleccionando el índice cloudprem en el panel de facetas" style="width:80%;" >}} -->


## Implemente sus Observability Pipelines {#deploy-your-observability-pipelines}

Después de crear su canalización en la Observability Pipelines UI, implemente el Observability Pipelines Worker. El Worker ejecuta la configuración de su canalización y escucha los registros del Datadog Agent.

El siguiente comando de Helm instala o actualiza el Worker, configurándolo para escuchar registros y reenviarlos a su indexador de BYOC Logs.
<br>
**Nota**: Necesita el `pipelineId` de la canalización que creó en el paso anterior. Este ID vincula el Worker a la configuración de su canalización.

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

Después de un minuto, verifique que los registros fluyan a través de la canalización y lleguen al destino de BYOC Logs. Esto indica que el Worker está ejecutándose y listo para recibir registros, y puede proceder a configurar el Agent.

## Configure el Datadog Agent {#configure-the-datadog-agent}

Después de que el Observability Pipelines Worker esté implementado y en ejecución, configure su Datadog Agent para enviarle registros. El Agent se conecta al Worker utilizando la dirección de servicio del Worker. Para obtener más información, consulte [Connect the Datadog Agent to the Observability Pipelines Worker][5].

Actualice la configuración de su Datadog Agent para enviar registros al Observability Pipelines Worker:

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

## Verificación {#verification}

Verifique que los registros fluyan a través de la canalización:

```shell
# Check Observability Pipelines worker status
kubectl get pods -l app=observability-pipelines-worker

# Check worker logs
kubectl logs -l app=observability-pipelines-worker

# Verify logs are reaching BYOC Logs
kubectl exec -it <RELEASE_NAME>-searcher-0 -n <NAMESPACE_NAME> -- curl 'http://localhost:7280/api/v1/datadog/search?query='
```

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /es/observability_pipelines/configuration/explore_templates/?tab=logs#log-volume-control
[3]: /es/observability_pipelines/sources/datadog_agent/
[4]: /es/observability_pipelines/destinations/datadog_byoc_logs/
[5]: /es/observability_pipelines/sources/datadog_agent/?tab=agenthelmvaluesfile#connect-the-datadog-agent-to-the-observability-pipelines-worker