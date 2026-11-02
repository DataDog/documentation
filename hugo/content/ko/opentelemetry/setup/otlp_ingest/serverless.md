---
description: Datadog Agent나 Collector 없이 AWS Lambda, ECS Fargate, Azure Functions,
  Cloud Run 및 기타 서버리스 플랫폼에서 Datadog으로 트레이스를 직접 전송하세요.
further_reading:
- link: /opentelemetry/setup/otlp_ingest/
  tag: 설명서
  text: Datadog OTLP 수집 엔드포인트
- link: /serverless/
  tag: 설명서
  text: Datadog Serverless Monitoring
title: Serverless용 OTLP Intake
---
## 개요 {#overview}

[Datadog Agent][1]나 OpenTelemetry Collector 없이 HTTP/protobuf를 통해 서버리스 워크로드에서 Datadog으로 트레이스를 직접 전송하세요. 사용 중인 플랫폼이 [관리형 플랫폼][5] 표에 있는 경우 해당 전용 엔드포인트를 대신 사용하세요.

Serverless 워크로드는 일반 [OTLP 로그][3] 및 [OTLP 메트릭][4] 수집 엔드포인트를 통해서도 로그와 메트릭을 전송할 수 있습니다. 이 페이지의 리소스 속성은 애플리케이션이 내보내는 모든 신호에 적용됩니다.

지원하는 플랫폼은 다음과 같습니다.

- **AWS**: Lambda, ECS Fargate
- **Azure**: Container Apps, Web Apps(App Service), Azure Functions
- **GCP**: Cloud Run, Cloud Run Functions, GKE Autopilot

<div class="alert alert-info">Collector를 실행하기 어려운 경우(예: Lambda) 직접 수집을 사용하세요. Collector를 실행할 수 있는 경우 메타데이터 보강, 정규화 및 중앙 집중식 샘플링에 대해서는 <a href="/opentelemetry/setup/collector_exporter/">OpenTelemetry Collector</a>를 참조하세요.</div>

## 전제 조건 {#prerequisites}

다음 구성은 모든 플랫폼에 적용됩니다.

**프로토콜**: `http/protobuf` 또는 `http/json` `grpc`는 지원되지 않습니다.

**필수 헤더**:

- `dd-api-key`: Datadog API 키입니다.
- `dd-otlp-source`: `serverless`로 설정합니다.
- `compute_stats`: `true`로 설정합니다. [트레이스 메트릭][2]에 필요합니다.

**서비스 이름**: 서비스를 식별하려면 `OTEL_SERVICE_NAME`을 설정합니다. 그렇지 않으면 트레이스가 `unknown_service`로 표시됩니다.

**리소스 속성**: `OTEL_RESOURCE_ATTRIBUTES`를 사용하여 플랫폼별 속성을 설정합니다. 필수 및 선택적 속성에 대해서는 아래의 각 클라우드 공급자 탭을 참조하세요.

`host.name`이 아니라 이 페이지의 플랫폼 속성을 사용하여 워크로드를 식별하세요. 직접 OTLP 수집의 호스트 이름 권장 사항은 [호스트 이름 및 태깅][6]을 참조하세요.

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="{{< region-param key="otlp_trace_endpoint" >}}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-service"
```

## 설정 {#setup}

<div class="alert alert-info">사용 중인 <a href="/getting_started/site/">Datadog 사이트</a>가 {{< region-param key=dd_datacenter code="true" >}}: 다음 예시에서 <code>${YOUR_ENDPOINT}</code> 값을 {{< region-param key="otlp_trace_endpoint" code="true" >}} 엔드포인트로 바꾸세요.</div>

플랫폼별 리소스 속성을 구성하려면 클라우드 공급자를 선택하세요.

{{< tabs >}}
{{% tab "AWS" %}}

### Lambda {#lambda}

[AWS Distro for OpenTelemetry(ADOT) Lambda 계층][100]은 Lambda 함수의 자동 계측 및 리소스 탐지를 제공합니다.

Lambda 함수에 ADOT 계층을 추가하고 다음 환경 변수를 구성하세요.

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="${YOUR_ENDPOINT}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-lambda-function"
```

ADOT 계층은 리소스 속성 탐지를 자동으로 처리합니다. ADOT를 사용하지 않는 경우 리소스 속성을 수동으로 설정하세요. `cloud.provider`는 필수입니다. 전체 플랫폼 식별을 위해 `faas.id`(구문 분석할 수 있는 Lambda ARN)를 설정하세요. `faas.id`를 사용할 수 없는 경우 `cloud.platform=aws_lambda`를 대신 설정하세요.

```shell
export OTEL_RESOURCE_ATTRIBUTES="cloud.provider=aws,faas.id=arn:aws:lambda:us-east-1:123456789012:function:my-function"
```

| 속성 | 필수 | 설명 |
|---|---|---|
| `cloud.provider` | 예 | `aws` |로 설정
| `faas.id` | 권장 | Lambda 함수 ARN(플랫폼 식별에 선호됨) |
| `cloud.platform` | 조건부 | `faas.id`가 설정되지 않은 경우 `aws_lambda`로 설정 |
| `cloud.region` | 아니요 | AWS 리전 |
| `faas.name` | 아니요 | 함수 이름 |
| `faas.version` | 아니요 | 함수 버전 |
| `faas.instance` | 아니요 | 인스턴스 식별자 |
| `faas.max_memory` | 아니요 | 구성된 최대 메모리(바이트) |
| `aws.log.group.names` | 아니요 | CloudWatch 로그 그룹 이름(트레이스-로그 상관관계 활성화) |
| `aws.log.stream.names` | 아니요 | CloudWatch 로그 스트림 이름 |

### ECS Fargate {#ecs-fargate}

ECS Fargate 식별은 작업 ARN 및 시작 유형에 의해 결정되며, `cloud.provider` 또는 `cloud.platform`이 기준이 아닙니다. OpenTelemetry SDK를 구성하여 ECS 작업에서 직접 트레이스를 내보내세요.

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="${YOUR_ENDPOINT}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-ecs-service"
export OTEL_RESOURCE_ATTRIBUTES="aws.ecs.task.arn=arn:aws:ecs:us-east-1:123456789012:task/my-cluster/1234567890abcdef,aws.ecs.launchtype=fargate"
```

| 속성 | 필수 | 설명 |
|---|---|---|
| `aws.ecs.task.arn` | 예 | ECS 작업 ARN |
| `aws.ecs.launchtype` | 예 | `fargate`로 설정(대소문자 구분 안 함) |
| `cloud.provider` | 아니요 | 기본값: `aws` |
| `cloud.platform` | 아니요 | 기본값: `aws_ecs` |
| `cloud.region` | 아니요 | AWS 리전 |
| `cloud.availability_zone` | 아니요 | 가용 영역 |
| `aws.ecs.cluster.arn` | 아니요 | 클러스터 ARN |
| `aws.ecs.task.family` | 아니요 | 작업 정의 패밀리 |
| `aws.ecs.task.id` | 아니요 | 작업 ID |
| `aws.ecs.task.revision` | 아니요 | 작업 정의 리비전 |
| `aws.log.group.names` | 아니요 | CloudWatch 로그 그룹 이름(트레이스-로그 상관관계 활성화) |
| `aws.log.stream.names` | 아니요 | CloudWatch 로그 스트림 이름 |

[100]: https://aws-otel.github.io/docs/getting-started/lambda

{{% /tab %}}
{{% tab "Azure" %}}

<div class="alert alert-warning">OpenTelemetry Collector의 Azure 리소스 탐지 프로세서는 VM만 지원합니다. SDK 수준의 Azure 리소스 탐지기는 일부 플랫폼(Web Apps, Functions)을 지원하지만 지원 범위는 언어별 SDK에 따라 다릅니다. 모든 Azure 서버리스 플랫폼에서는 안정적인 방법으로 <code>cloud.provider</code>속성, <code>cloud.platform</code>속성 및 <code>cloud.resource_id</code> 속성을 수동으로 설정하세요.</div>

### Container Apps {#container-apps}

Container Apps에 대한 Azure 리소스 탐지기 지원은 언어별 SDK에 따라 다릅니다. 리소스 속성을 수동으로 설정하세요.

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="${YOUR_ENDPOINT}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-container-app"
export OTEL_RESOURCE_ATTRIBUTES="cloud.provider=azure,cloud.platform=azure.container_apps,cloud.resource_id=/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.App/containerApps/{appName}"
```

### Web Apps(App Service) {#web-apps-app-service}

Azure 리소스 탐지기 SDK 패키지(지원 범위는 언어별 SDK에 따라 다름)를 사용하거나 `OTEL_RESOURCE_ATTRIBUTES`를 수동으로 설정하세요.

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="${YOUR_ENDPOINT}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-web-app"
export OTEL_RESOURCE_ATTRIBUTES="cloud.provider=azure,cloud.platform=azure.app_service,cloud.resource_id=/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Web/sites/{appName}"
```

### Azure Functions {#azure-functions}

Azure 리소스 탐지기 SDK 패키지(지원 범위는 언어별 SDK에 따라 다름)를 사용하거나 `OTEL_RESOURCE_ATTRIBUTES`를 수동으로 설정하세요.

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="${YOUR_ENDPOINT}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-azure-function"
export OTEL_RESOURCE_ATTRIBUTES="cloud.provider=azure,cloud.platform=azure.functions,cloud.resource_id=/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Web/sites/{functionAppName}"
```

### 리소스 속성 참조 {#resource-attributes-reference}

| 플랫폼 | `cloud.provider` | `cloud.platform` | `cloud.resource_id` |
|---|---|---|---|
| Container Apps | `azure` | `azure.container_apps` | `/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.App/containerApps/{appName}` |
| Web Apps | `azure` | `azure.app_service` | `/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Web/sites/{appName}` |
| Azure Functions | `azure` | `azure.functions` | `/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Web/sites/{functionAppName}` |

{{% /tab %}}
{{% tab "GCP" %}}

GCP 리소스 탐지는 GCP Resource Detector SDK 패키지를 사용하면 자동으로 수행됩니다. 수동 구성 없이 리소스 속성을 채우려면 애플리케이션 종속성에 추가하세요.

### Cloud Run 및 Cloud Run Functions {#cloud-run-and-cloud-run-functions}

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="${YOUR_ENDPOINT}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-cloud-run-service"
```

GCP Resource Detector SDK는 `cloud.account.id`, `cloud.platform`, `cloud.provider`, `cloud.region`, `faas.id`, `faas.instance`, `faas.name`, `faas.version`을 자동으로 채웁니다.

### GKE Autopilot {#gke-autopilot}

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="${YOUR_ENDPOINT}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-gke-service"
```

GCP Resource Detector SDK는 `cloud.account.id`, `cloud.platform`, `cloud.provider`, `cloud.region`, `host.id`, `k8s.cluster.name`을 자동으로 채웁니다.

### 리소스 속성 참조 {#resource-attributes-reference-1}

| 플랫폼 | GCP Resource Detector가 채운 속성 |
|---|---|
| Cloud Run/Cloud Run Functions | `cloud.account.id`, `cloud.platform`, `cloud.provider`, `cloud.region`, `faas.id`, `faas.instance`, `faas.name`, `faas.version` |
| GKE Autopilot | `cloud.account.id`, `cloud.platform`, `cloud.provider`, `cloud.region`, `host.id`, `k8s.cluster.name` |

{{% /tab %}}
{{< /tabs >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/opentelemetry/otlp_ingest_in_the_agent/
[2]: /ko/tracing/metrics/
[3]: /ko/opentelemetry/setup/otlp_ingest/logs/
[4]: /ko/opentelemetry/setup/otlp_ingest/metrics/
[5]: /ko/opentelemetry/setup/otlp_ingest/managed_platforms/
[6]: /ko/opentelemetry/config/hostname_tagging/#direct-otlp-intake-without-a-collector