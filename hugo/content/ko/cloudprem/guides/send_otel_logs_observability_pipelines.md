---
description: Observability Pipelines를 통해 OpenTelemetry 로그를 CloudPrem으로 5분 이내에 전송하는
  방법
further_reading:
- link: /cloudprem/quickstart/
  tag: 설명서
  text: CloudPrem 퀵스타트
- link: /observability_pipelines/sources/opentelemetry/
  tag: 설명서
  text: Observability Pipelines용 OpenTelemetry 소스
- link: /cloudprem/ingest/observability_pipelines/
  tag: 설명서
  text: Observability Pipelines를 사용하여 CloudPrem으로 로그 전송
title: Observability Pipelines를 사용하여 OpenTelemetry 로그 전송
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem을 평가판에서 만나보세요" >}}
  CloudPrem 평가판에 참여하여 새로운 자체 호스팅 로그 관리 기능을 확인해 보세요.
{{< /callout >}}

## 개요

CloudPrem은 Observability Pipelines를 수집 계층으로 사용하여 OTEL 수집기의 로그 수집을 지원합니다. 이 가이드에서는 기존 OTEL 구성을 변경하지 않고 OTEL 로그를 CloudPrem에 연결하는 단계별 지침을 제공합니다.

이 가이드를 마치면 다음을 할 수 있습니다.
1. [CloudPrem을 로컬에서 시작](#step-1-start-cloudprem).
2. [태그 추가를 위해 사용자 지정 프로세서를 사용하여 Observability Pipeline 생성](#step-2-create-an-observability-pipeline-with-the-api).
3. [Observability Pipelines Worker 실행](#step-3-run-the-observability-pipelines-worker).
4. [Python SDK를 사용하여 OpenTelemetry 로그 전송](#step-4-send-opentelemetry-logs-using-the-python-sdk).
5. [Datadog에서 태그가 지정된 로그 확인](#step-5-view-tagged-logs-in-datadog).

## 사전 필수 조건

- [CloudPrem Preview][1] 액세스.
- **Datadog API Key**: [API 키 받기][2].
- **Datadog Application Key**: [애플리케이션 키를 받으세요][3].
- **Docker**: [Docker를 설치하세요][4].
- **Python 3 및 pip**: 테스트 OTLP 로그 전송 시 필요.

## 1단계: CloudPrem 시작하기

로컬 CloudPrem 인스턴스를 시작합니다. `<YOUR_API_KEY>`를 Datadog API Key로 변경합니다.

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

## 2단계: API를 사용하여 Observability Pipeline 생성

OpenTelemetry 소스, 필터 프로세서, CloudPrem 대상을 포함한 파이프라인을 생성합니다. `<YOUR_APP_KEY>`를 Datadog Application Key로 변경합니다.

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

이 명령은 `pipeline_id`를 반환합니다. 다음 단계를 위해 저장해 두세요.

**참고**: 사용자 지정 프로세서는 `remaps` 구성을 통해 모든 로그에 사용자 지정 태그가 포함된 `ddtags` 필드를 추가합니다.

## 3단계: Observability Pipelines Worker 실행

Docker를 사용하여 Observability Pipelines Worker를 시작합니다. `<PIPELINE_ID>`를 2단계에서 얻은 ID로 변경합니다.

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

**참고**:
- Worker는 HTTP용으로 4318번 포트를, gRPC용으로 4317번 포트를 노출합니다.
- macOS/Windows에서 호스트 머신의 CloudPrem에 연결하려면 `host.docker.internal`을 사용하세요.
- Linux에서 `-p` 플래그 대신 `--network host`를 사용하고, 엔드포인트에 `http://localhost:7280` 을 사용하세요.

{{< img src="/cloudprem/guides/otel-op-cloudprem/op-config.png" alt="Observability Pipelines 구성" style="width:100%;" >}}

## 4단계: Observability Pipelines를 통해 로그 전송

OpenTelemetry SDK를 설치하고 테스트 로그를 Observability Pipelines Worker로 전송합니다.

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

실제 운영 환경에서는 OpenTelemetry Collector가 Worker로 로그를 전달하도록 구성하세요.

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

## 해당 파이프라인 및 CloudPrem 확인

모든 구성 요소가 실행 중인지 확인합니다.

```shell
# CloudPrem 상태 확인
docker logs cloudprem --tail 20

# Observability Pipelines Worker 상태 확인
docker logs opw --tail 20
```

## 5단계: Datadog에서 로그 확인

1. [Datadog Log Explorer][5]로 이동합니다.
2. 왼쪽 패싯 패널에서 **CLOUDPREM INDEXES** 아래에 있는 CloudPrem 인덱스를 선택합니다.
3. `otel-demo` 서비스에서 생성된 OpenTelemetry 로그에 사용자 지정 태그(`pipeline:observability-pipelines` 및 `source:opentelemetry`)가 포함된 것을 확인할 수 있습니다.

{{< img src="/cloudprem/guides/otel-op-cloudprem/cloudprem_logs.png" alt="Datadog Log Explorer에서 CloudPrem 로그를 확인할 수 있습니다." style="width:100%;" >}}

## 다음 단계

- OpenTelemetry Collector 또는 계측된 애플리케이션을 구성하여 Worker로 로그를 전송하도록 설정하세요.
- 파이프라인에 프로세서(sampling, enrichment, transformation)를 추가하세요.
- 운영 환경 워크로드에 맞춰 Worker 배포 규모를 확장하세요.
- 고급 구성은 [Observability Pipelines 문서][6]를 참고하세요.

## 클린업

컨테이너를 정지시키고 제거하는 방법:

```shell
docker stop cloudprem opw
docker rm cloudprem opw
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/product-preview/cloudprem/
[2]: /ko/account_management/api-app-keys/#add-an-api-key-or-client-token
[3]: /ko/account_management/api-app-keys/#add-application-keys
[4]: https://docs.docker.com/get-docker/
[5]: https://app.datadoghq.com/logs
[6]: /ko/observability_pipelines/