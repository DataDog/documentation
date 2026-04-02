---
title: Send OpenTelemetry logs with Observability Pipelines
description: A quick guide to send OpenTelemetry logs through Observability Pipelines to CloudPrem in less than 5 minutes
further_reading:
- link: "/cloudprem/quickstart/"
  tag: "Documentation"
  text: "CloudPrem Quickstart"
- link: "/observability_pipelines/sources/opentelemetry/"
  tag: "Documentation"
  text: "OpenTelemetry Source for Observability Pipelines"
- link: "/cloudprem/ingest/observability_pipelines/"
  tag: "Documentation"
  text: "Send logs to CloudPrem with Observability Pipelines"
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem is in Preview" >}}
  Join the CloudPrem Preview to access new self-hosted log management features.
{{< /callout >}}

## Overview

CloudPrem supports log ingestion from OTEL collectors by using Observability Pipelines as the ingestion layer. This guide provides step-by-step instructions to connect OTEL logs to CloudPrem—without disrupting your existing OTEL configuration.

By the end of this guide, you will be able to:
1. [Start CloudPrem locally](#step-1-start-cloudprem).
2. [Create an Observability Pipeline with a custom processor to add tags](#step-2-create-an-observability-pipeline-with-the-api).
3. [Run the Observability Pipelines Worker](#step-3-run-the-observability-pipelines-worker).
4. [Send OpenTelemetry logs using the Python SDK](#step-4-send-opentelemetry-logs-using-the-python-sdk).
5. [View tagged logs in Datadog](#step-5-view-tagged-logs-in-datadog).

## Prerequisites

- [CloudPrem Preview][1] access.
- **Datadog API Key**: [Get your API key][2].
- **Datadog Application Key**: [Get your application key][3].
- **Docker**: [Install Docker][4].
- **Python 3 and pip**: For sending test OTLP logs.

## Step 1: Start CloudPrem

Start a local CloudPrem instance. Replace `<YOUR_API_KEY>` with your Datadog API Key:

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

## Step 2: Create an Observability Pipeline with the API

Create a pipeline with an OpenTelemetry source, a filter processor, and a CloudPrem destination. Replace `<YOUR_APP_KEY>` with your Datadog Application Key:

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

This command returns the `pipeline_id`. Save it for the next step.

**Note**: The custom processor adds a `ddtags` field with custom tags to all logs through the `remaps` configuration.

## Step 3: Run the Observability Pipelines Worker

Start the Observability Pipelines Worker using Docker. Replace `<PIPELINE_ID>` with the ID from Step 2:

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

**Notes**:
- The Worker exposes port 4318 for HTTP and 4317 for gRPC.
- On macOS/Windows, use `host.docker.internal` to connect to CloudPrem on the host machine.
- On Linux, use `--network host` instead of `-p` flags and `http://localhost:7280` for the endpoint.

{{< img src="/cloudprem/guides/otel-op-cloudprem/op-config.png" alt="The Observability Pipelines configuration" style="width:100%;" >}}

## Step 4: Send logs through Observability Pipelines

Install the OpenTelemetry SDK and send a test log to the Observability Pipelines Worker:

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

For production, configure your OpenTelemetry Collector to forward logs to the Worker:

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

## Verify the pipeline and CloudPrem

Check that all components are running:

```shell
# Check CloudPrem status
docker logs cloudprem --tail 20

# Check Observability Pipelines Worker status
docker logs opw --tail 20
```

## Step 5: View logs in Datadog

1. Go to the [Datadog Log Explorer][5].
2. In the left facet panel, select your CloudPrem index under **CLOUDPREM INDEXES**.
3. You should see your OpenTelemetry logs from the `otel-demo` service with custom tags: `pipeline:observability-pipelines` and `source:opentelemetry`.

{{< img src="/cloudprem/guides/otel-op-cloudprem/cloudprem_logs.png" alt="CloudPrem logs available in the Datadog Log Explorer" style="width:100%;" >}}

## Next steps

- Configure your OpenTelemetry Collector or instrumented applications to send logs to the Worker.
- Add more processors to your pipeline (sampling, enrichment, transformation).
- Scale the Worker deployment for production workloads.
- See [Observability Pipelines documentation][6] for advanced configurations.

## Cleanup

To stop and remove the containers:

```shell
docker stop cloudprem opw
docker rm cloudprem opw
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/product-preview/cloudprem/
[2]: /account_management/api-app-keys/#add-an-api-key-or-client-token
[3]: /account_management/api-app-keys/#add-application-keys
[4]: https://docs.docker.com/get-docker/
[5]: https://app.datadoghq.com/logs
[6]: /observability_pipelines/

