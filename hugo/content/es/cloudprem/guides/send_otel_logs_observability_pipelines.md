---
description: Una guía rápida para enviar logs de OpenTelemetry a través de Observability
  Pipelines a CloudPrem en menos de 5 minutos
further_reading:
- link: /cloudprem/quickstart/
  tag: Documentación
  text: Inicio rápido de CloudPrem
- link: /observability_pipelines/sources/opentelemetry/
  tag: Documentación
  text: Fuente de OpenTelemetry para Observability Pipelines
- link: /cloudprem/ingest/observability_pipelines/
  tag: Documentación
  text: Enviar logs a CloudPrem con Observability Pipelines
title: Enviar los logs de OpenTelemetry con Observability Pipelines
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem está en vista previa" >}}
  Únete a la vista previa de CloudPrem para acceder a las nuevas funciones de gestión de logs autoalojadas.
{{< /callout >}}

## Información general

CloudPrem admite la ingesta de logs desde recopiladores de OpenTelemetry utilizando Observability Pipelines como capa de ingesta. Esta guía proporciona instrucciones paso a paso para conectar logs de OpenTelemetry a CloudPrem, sin interrumpir tu configuración existente de OpenTelemetry.

Al final de esta guía, podrás:
1. [Iniciar CloudPrem localmente](#step-1-start-cloudprem).
2. [Crear un Observability Pipeline con un procesador personalizado para añadir etiquetas](#step-2-create-an-observability-pipeline-with-the-api).
3. [Ejecutar el worker de Observability Pipelines](#step-3-run-the-observability-pipelines-worker).
4. [Enviar logs de OpenTelemetry usando el SDK de Python](#step-4-send-opentelemetry-logs-using-the-python-sdk).
5. [Ver logs etiquetados en Datadog](#step-5-view-tagged-logs-in-datadog).

## Requisitos previos

- Acceso a la [vista previa de CloudPrem][1].
- **Clave de API de Datadog**: [obtén tu clave de API][2].
- **Clave de aplicación de Datadog**: [obtén tu clave de aplicación][3].
- **Docker**: [instala Docker][4].
- **Python 3 y pip**: para enviar logs del OpenTelemetry Protocol de test.

## Paso 1: Iniciar CloudPrem

Inicia una instancia local de CloudPrem. Sustituye `<YOUR_API_KEY>` por tu clave de API de Datadog:

```shell
export DD_API_KEY="<YOUR_API_KEY>"
export DD_SITE="datadoghq.com"

docker run -d \
  --name cloudprem \
  -v $(pwd)/qwdata:/quickwit/qwdata \
  -e DD_SITE=${DD_SITE} \
  -e DD_API_KEY=${DD_API_KEY} \
  -p 127.0.0.1:7280:7280 \
  datadog/cloudprem run
```

## Paso 2: Crear un Observability Pipeline con la API

Crea un pipeline con una fuente de OpenTelemetry, un procesador de filtro y un destino de CloudPrem. Sustituye `<YOUR_APP_KEY>` por tu clave de aplicación de Datadog:

```shell
export DD_APP_KEY="<YOUR_APP_KEY>"

curl -s -X POST "https://api.${DD_SITE}/api/v2/obs-pipelines/pipelines" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
  -d '{
    "data": {
      "attributes": {
        "name": "OTEL to CloudPrem Pipeline",
        "config": {
          "sources": [
            {
              "id": "otel-source",
              "type": "opentelemetry"
            }
          ],
          "processor_groups": [
            {
              "id": "main-processors",
              "enabled": true,
              "include": "*",
              "inputs": ["otel-source"],
              "processors": [
                {
                  "id": "add-tags",
                  "display_name": "Add tags",
                  "enabled": true,
                  "type": "custom_processor",
                  "include": "*",
                  "remaps": [
                    {
                      "drop_on_error": false,
                      "enabled": true,
                      "include": "*",
                      "name": "ddtags",
                      "source": ".ddtags = [\"pipeline:observability-pipelines\", \"source:opentelemetry\"]"
                    }
                  ]
                }
              ]
            }
          ],
          "destinations": [
            {
              "id": "cloudprem-dest",
              "type": "cloud_prem",
              "inputs": ["main-processors"]
            }
          ]
        }
      },
      "type": "pipelines"
    }
  }' | jq -r '.data.id'
```

Este comando devuelve el `pipeline_id`. Guárdalo para el próximo paso.

**Nota**: El procesador personalizado añade un campo `ddtags` con etiquetas personalizadas a todos los logs a través de la configuración de `remaps`.

## Paso 3: Ejecutar el worker de Observability Pipelines

Inicia el worker de Observability Pipelines utilizando Docker. Sustituye `<PIPELINE_ID>` por el ID del paso 2:

```shell
export PIPELINE_ID="<PIPELINE_ID>"

docker run -d \
  --name opw \
  -p 4317:4317 \
  -p 4318:4318 \
  -e DD_API_KEY=${DD_API_KEY} \
  -e DD_SITE=${DD_SITE} \
  -e DD_OP_PIPELINE_ID=${PIPELINE_ID} \
  -e DD_OP_SOURCE_OTEL_GRPC_ADDRESS="0.0.0.0:4317" \
  -e DD_OP_SOURCE_OTEL_HTTP_ADDRESS="0.0.0.0:4318" \
  -e DD_OP_DESTINATION_CLOUDPREM_ENDPOINT_URL="http://host.docker.internal:7280" \
  datadog/observability-pipelines-worker run
```

**Notas**:
- El worker expone el puerto 4318 para HTTP y el 4317 para gRPC.
- En macOS/Windows, utiliza `host.docker.internal` para conectarte a CloudPrem en el equipo host.
- En Linux, utiliza `--network host` en lugar de los indicadores `-p` y `http://localhost:7280` para el endpoint.

{{< img src="/cloudprem/guides/otel-op-cloudprem/op-config.png" alt="La configuración de Observability Pipelines" style="width:100%;" >}}

## Paso 4: Enviar logs a través de Observability Pipelines

Instala el kit de desarrollo de software (SDK) de OpenTelemetry y envía un log de test al worker de Observability Pipelines:

```shell
pip install opentelemetry-api opentelemetry-sdk opentelemetry-exporter-otlp-proto-http

python3 -c "
import time, logging
from opentelemetry.sdk._logs import LoggerProvider, LoggingHandler
from opentelemetry.sdk._logs.export import BatchLogRecordProcessor
from opentelemetry.exporter.otlp.proto.http._log_exporter import OTLPLogExporter
from opentelemetry.sdk.resources import Resource

exporter = OTLPLogExporter(endpoint='http://localhost:4318/v1/logs')
resource = Resource.create({'service.name': 'otel-demo'})
log_provider = LoggerProvider(resource=resource)
log_provider.add_log_record_processor(BatchLogRecordProcessor(exporter))
handler = LoggingHandler(logger_provider=log_provider)
logging.getLogger().addHandler(handler)
logging.getLogger().setLevel(logging.INFO)
logging.info('Hello from OpenTelemetry via Observability Pipelines!')
time.sleep(2)
log_provider.shutdown()
print('✓ Log sent successfully!')
"
```

Para producción, configura tu OpenTelemetry Collector para que reenvíe los logs al worker:

```yaml
exporters:
  otlphttp:
    endpoint: http://localhost:4318

service:
  pipelines:
    logs:
      receivers: [otlp]
      exporters: [otlphttp]
```

## Verifica el pipeline y CloudPrem

Comprueba que todos los componentes funcionan:

```shell
# Check CloudPrem status
docker logs cloudprem --tail 20

# Check Observability Pipelines Worker status
docker logs opw --tail 20
```

## Paso 5: Ver los logs en Datadog

1. Ve al [Datadog Log Explorer][5].
2. En el panel izquierdo de facetas, selecciona tu índice de CloudPrem en **CLOUDPREM INDEXES** (ÍNDICES DE CLOUDPREM).
3. Deberías ver tus logs de OpenTelemetry del servicio `otel-demo` con etiquetas personalizadas: `pipeline:observability-pipelines` y `source:opentelemetry`.

{{< img src="/cloudprem/guides/otel-op-cloudprem/cloudprem_logs.png" alt="Logs de CloudPrem disponibles en el Datadog Log Explorer" style="width:100%;" >}}

## Siguientes pasos

- Configura tu OpenTelemetry Collector o las aplicaciones instrumentadas para enviar logs al worker.
- Añade más procesadores a tu pipeline (muestreo, enriquecimiento, transformación).
- Amplía el despliegue del worker para cargas de trabajo de producción.
- Consulta la [documentación de Observability Pipelines][6] para configuraciones avanzadas.

## Limpieza

Para detener y retirar los contenedores:

```shell
docker stop cloudprem opw
docker rm cloudprem opw
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/product-preview/cloudprem/
[2]: /es/account_management/api-app-keys/#add-an-api-key-or-client-token
[3]: /es/account_management/api-app-keys/#add-application-keys
[4]: https://docs.docker.com/get-docker/
[5]: https://app.datadoghq.com/logs
[6]: /es/observability_pipelines/