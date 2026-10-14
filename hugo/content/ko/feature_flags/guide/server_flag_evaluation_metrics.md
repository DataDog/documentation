---
description: 서버 측 Feature Flags에 대한 플래그 평가 메트릭을 내보내고 시각화하도록 Datadog Agent 및 애플리케이션을
  구성합니다.
further_reading:
- link: /feature_flags/server/
  tag: 설명서
  text: 서버 측 Feature Flags
- link: /feature_flags/concepts/flag_graphs/
  tag: 설명서
  text: Feature Flag 그래프
- link: /metrics/
  tag: 설명서
  text: 메트릭
- link: /dashboards/
  tag: 설명서
  text: Dashboards
title: 서버 측 플래그 평가 메트릭 설정
---
## 개요 {#overview}

플래그 평가 메트릭을 사용하면 서버 측 애플리케이션에서 Feature Flags의 각 변형이 얼마나 자주 반환되는지 측정할 수 있습니다. 이 메트릭을 사용하여 시간 경과에 따른 플래그 채택을 추적하고, 타겟팅 규칙이 예상대로 작동하는지 확인하며, Dashboards에서 플래그 평가 데이터를 그래프로 나타낼 수 있습니다.

<div class="alert alert-warning"> <code>feature_flag.evaluations</code> 메트릭은 실험적 기능이며 향후 릴리스에서 변경되거나 제거될 수 있습니다.</div>

<div class="alert alert-info"> <code>feature_flag.evaluations</code> 메트릭은 실험 노출 이벤트 및 이벤트 플랫폼 프록시(EVP) 플래그 평가 이벤트와는 별개입니다. 노출 및 EVP 이벤트 송신은 포트 8126의 표준 트레이서 URL을 사용합니다. 이 메트릭은 포트 4317 또는 4318의 OTLP 엔드포인트를 사용합니다.</div>

## 전제 조건 {#prerequisites}

플래그 평가 메트릭을 설정하기 전에 다음 사항을 확인하세요.

- [서버 측 Feature Flags][1]가 이미 구성되어 있어야 합니다.
- Agent 기반 배포의 경우, Datadog Agent 7.32.0 이상이 실행 중이어야 하며 OTLP 메트릭을 수신할 수 있어야 합니다.
- Agent가 없는 서버리스 배포의 경우, 플랫폼에 지원되는 서버리스 텔레메트리 경로가 구성되어 있어야 합니다.
- Java, Node.js 및 Python 서버리스 환경의 경우 [Feature Flags 텔레메트리 전송][7]을 참조합니다.
- 레거시 활성화 경로를 사용하는 Agent 기반 구성의 경우, 애플리케이션에 `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true`가 설정되어 있어야 합니다.
- 서버 측 트레이서가 플래그 평가 메트릭 지원을 위한 최소 버전을 충족해야 합니다.

| 언어 | 최소 트레이서 버전 |
| -------- | ---------------------- |
| .NET     | 3.44.0                 |
| Go       | 2.8.0                  |
| Java     | 1.62.0                 |
| Node.js  | 5.99.0                 |
| PHP      | 1.21.1                 |
| Python   | 4.7.0                  |
| Ruby     | 2.32.0                 |

Agentless 구성 전달과 이 메트릭은 독립적인 경로를 사용합니다. Agentless SDK는 지원되는 Agent 기반 또는 서버리스 텔레메트리 설정을 통해 필요한 OTLP 경로를 구성할 때 메트릭을 내보낼 수 있습니다.

## 1단계: OTLP 수신기 구성 {#step-1-configure-an-otlp-receiver}

플래그 평가 메트릭은 OpenTelemetry(OTLP)를 통해 내보내집니다. Agent 기반 배포의 경우, 기본적으로 꺼져 있는 Datadog Agent OTLP 수신기를 활성화해야 합니다. 설정 지침은 [Datadog Agent에 의한 OTLP 수집][2]을 참조하세요. Agent가 없는 서버리스 배포의 경우, Serverless Monitoring 설정에서 지원하는 OTLP 또는 사용자 지정 메트릭 경로를 사용하세요.

애플리케이션이 사용하는 프로토콜(포트 4317의 gRPC 또는 포트 4318의 HTTP)만 활성화하면 됩니다.

<div class="alert alert-info">Docker에서 Agent v7.61.0 이상을 실행 중인 경우, OTLP 파이프라인의 알려진 문제를 해결하기 위해 Agent 컨테이너에서 <code>HOST_PROC=/proc</code> 을 설정하세요.</div>

## 2단계: 애플리케이션 구성 {#step-2-configure-your-application}

Java를 제외한 지원되는 트레이서 및 전달 모드 조합의 경우, 표준 [서버 측 Feature Flags 구성][1] 외에 다음 환경 변수를 설정하세요. Java의 경우 `DD_METRICS_OTEL_ENABLED`는 아무런 효과가 없습니다. 대신 [Java: OpenTelemetry SDK 종속성 추가](#java-add-the-opentelemetry-sdk-dependencies) 섹션을 참조하세요.

{{< code-block lang="bash" >}}
# Enable flag evaluation metrics
DD_METRICS_OTEL_ENABLED=true
{{< /code-block >}}

### Java: OpenTelemetry SDK 종속성 추가 {#java-add-the-opentelemetry-sdk-dependencies}

Java 공급자는 OpenTelemetry SDK를 통해 `feature_flag.evaluations`를 기록하고 OTLP를 통해 내보내므로 `opentelemetry-sdk-metrics` 및 `opentelemetry-exporter-otlp` 종속성이 애플리케이션의 클래스 경로에 있어야 합니다. [Java Feature Flags 종속성][6]과 함께 추가하세요. OpenTelemetry BOM을 가져와 OpenTelemetry API와 SDK의 버전이 동일하게 유지되도록 하세요.

{{< tabs >}}
{{% tab "Gradle(Groovy)" %}}
{{< code-block lang="groovy" filename="build.gradle" >}}
dependencies {
    implementation platform('io.opentelemetry:opentelemetry-bom:1.47.0')
    implementation 'io.opentelemetry:opentelemetry-sdk-metrics'
    implementation 'io.opentelemetry:opentelemetry-exporter-otlp'
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "Gradle(Kotlin)" %}}
{{< code-block lang="kotlin" filename="build.gradle.kts" >}}
dependencies {
    implementation(platform("io.opentelemetry:opentelemetry-bom:1.47.0"))
    implementation("io.opentelemetry:opentelemetry-sdk-metrics")
    implementation("io.opentelemetry:opentelemetry-exporter-otlp")
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "Maven" %}}
{{< code-block lang="xml" filename="pom.xml" >}}
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>io.opentelemetry</groupId>
            <artifactId>opentelemetry-bom</artifactId>
            <version>1.47.0</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
<dependencies>
    <dependency>
        <groupId>io.opentelemetry</groupId>
        <artifactId>opentelemetry-sdk-metrics</artifactId>
    </dependency>
    <dependency>
        <groupId>io.opentelemetry</groupId>
        <artifactId>opentelemetry-exporter-otlp</artifactId>
    </dependency>
</dependencies>
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

Java 트레이서에서 공급자는 OpenTelemetry SDK가 클래스 경로에 있으면 OTLP 메트릭 익스포터를 자동으로 시작합니다. 종속성이 누락되면 메트릭이 내보내지지 않고 트레이서가 `OpenTelemetry SDK is not on the classpath`를 기록합니다.

<div class="alert alert-info">Spring Boot 애플리케이션에서 Spring Boot의 OpenTelemetry 자동 구성은 <code>OpenTelemetrySdk</code> Bean도 생성합니다. 해결된 OpenTelemetry SDK 버전이 클래스 경로의 OpenTelemetry API 버전과 일치하지 않으면 시작 시 <code>BeanCreationException</code> for the <code>openTelemetry</code> Bean 및 <code>NoClassDefFoundError: io/opentelemetry/sdk/internal/ScopeConfigurator</code>오류가 발생하면서 실패합니다. 위와 같이 <code>opentelemetry-bom</code> 을 가져오면 API와 SDK가 동일한 버전으로 유지되고 오류가 해결됩니다.</div>

### Ruby: OpenTelemetry 메트릭 gem 추가 {#ruby-add-the-opentelemetry-metrics-gems}

Ruby 애플리케이션의 경우, 애플리케이션 번들에 OpenTelemetry 메트릭 SDK 및 OTLP 메트릭 익스포터 gem을 추가하세요.

{{< code-block lang="ruby" filename="Gemfile" >}}
gem "opentelemetry-metrics-sdk", ">= 0.8"
gem "opentelemetry-exporter-otlp-metrics", ">= 0.4"
{{< /code-block >}}

`bundle install`을 사용하여 gem을 설치합니다. 이 gem들은 OpenTelemetry 미터 공급자와 OTLP 메트릭 익스포터를 제공합니다. Ruby 트레이서는 `DD_METRICS_OTEL_ENABLED=true`가 설정되었을 때 이를 사용합니다. gem이 누락된 경우, Ruby 트레이서는 `feature_flag.evaluations` 메트릭을 내보내지 않고 `Failed to load OpenTelemetry metrics gems`를 기록합니다.

### 엔드포인트 구성 {#endpoint-configuration}

`DD_TRACE_AGENT_URL` 및 포트 8126의 표준 `serverless-init` 리스너는 OTLP 메트릭 엔드포인트를 구성하지 않습니다. 다음 섹션에 설명된 대로 OTLP 엔드포인트를 별도로 구성하세요. Agent가 없는 서버리스 배포의 경우, 이 메트릭을 구성하기 전에 플랫폼에 대한 Serverless Monitoring 설정을 따릅니다.

기본적으로 대부분의 트레이서는 포트 `4318`(HTTP)을 통해 `DD_AGENT_HOST`의 Agent로 OTLP 메트릭을 보냅니다. 애플리케이션에서 Agent에 도달하기 위해 이미 `DD_AGENT_HOST`를 설정한 경우, 엔드포인트 구성은 필요하지 않습니다.

다음 중 하나에 해당하는 경우 OTLP 엔드포인트를 명시적으로 설정하세요.

- Agent가 기본 OTLP 포트의 `DD_AGENT_HOST`에서 도달할 수 없는 경우(예: 원격 Agent 또는 기본값이 아닌 포트).
- **Java** 트레이서를 사용하는 경우. 해당 플래그 평가 메트릭 익스포터는 포트 `4318`에서 OTLP/HTTP만 지원합니다(gRPC는 지원되지 않음). Java 트레이서는 `DD_AGENT_HOST`에서 엔드포인트를 파생하지 않으며 기본값은 `http://localhost:4318`입니다. Agent가 `localhost`에 있지 않을 때 `OTEL_EXPORTER_OTLP_ENDPOINT`를 Agent의 HTTP 엔드포인트로 설정합니다.
- **Python** 트레이서를 사용하는 경우. Python 트레이서는 기본적으로 HTTP가 아닌 포트 `4317`의 gRPC를 사용합니다. Agent에서 gRPC OTLP 수신기를 활성화하거나 프로토콜을 재정의하여 HTTP를 대신 사용하세요.

{{< code-block lang="bash" >}}
OTEL_EXPORTER_OTLP_ENDPOINT=http://<AGENT_HOST>:4318
OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
{{< /code-block >}}

엔드포인트를 설정하려면 표준 OpenTelemetry 변수를 사용하세요.

{{< code-block lang="bash" >}}
# Point OTLP data at the Datadog Agent (HTTP, port 4318)
OTEL_EXPORTER_OTLP_ENDPOINT=http://<AGENT_HOST>:4318

# Or use gRPC (port 4317). For most tracers, the default protocol is http/protobuf,
# so set the protocol explicitly when switching to gRPC:
# OTEL_EXPORTER_OTLP_ENDPOINT=http://<AGENT_HOST>:4317
# OTEL_EXPORTER_OTLP_PROTOCOL=grpc
{{< /code-block >}}

`<AGENT_HOST>`를 Datadog Agent의 호스트 이름 또는 IP 주소로 바꿉니다.

Docker Compose 예시:

{{< code-block lang="yaml" filename="docker-compose.yml" >}}
services:
  datadog-agent:
    environment:
      - DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT=0.0.0.0:4317
      - DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT=0.0.0.0:4318
      - HOST_PROC=/proc  # If running Agent v7.61.0+ in Docker

  app-go:
    environment:
      - DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
      - DD_METRICS_OTEL_ENABLED=true
      - OTEL_EXPORTER_OTLP_ENDPOINT=http://datadog-agent:4318
    depends_on:
      datadog-agent:
        condition: service_healthy
{{< /code-block >}}

## 3단계: 메트릭 흐름 확인 {#step-3-verify-metrics-are-flowing}

배포 후 메트릭이 Datadog에 도달하고 있는지 확인하세요.

1. [Metrics Explorer][3]로 이동하여 `feature_flag.evaluations`를 검색합니다.
2. 애플리케이션이 플래그를 평가한 후 몇 분 이내에 메트릭이 나타나지 않으면 다음을 확인합니다.
   - Agent OTLP 수신기가 활성화되어 있고 올바른 포트가 노출되어 있습니다.
   - `OTEL_EXPORTER_OTLP_ENDPOINT`가 별도의 컬렉터가 아닌 Agent를 가리킵니다.
   - 애플리케이션이 런타임에 서버 SDK로 플래그를 활발하게 평가하고 있습니다(코드 경로가 실행 중입니다).

## 4단계: 메트릭 보존 활성화 {#step-4-enable-metric-retention}

기본적으로 `feature_flag.evaluations`는 1시간 분량의 데이터만 보존합니다. 더 긴 기록을 보존하려면 다음을 수행하세요.

1. [Metrics Summary][4]로 이동하여 `feature_flag.evaluations`를 검색합니다.
2. 메트릭을 선택하고 **과거 메트릭**을 활성화합니다.

이 설정은 선택 사항이며 OTLP 메트릭에 대해 자동으로 활성화되지 않습니다.

## Dashboards에서 플래그 평가 그래프화 {#graph-flag-evaluations-on-a-dashboard}

다음 쿼리를 사용하여 [Dashboards][5]에서 플래그 키 및 변형별로 플래그 평가를 그래프로 표시하세요.

{{< code-block lang="text" >}}
sum:feature_flag.evaluations{*} by {feature_flag.key,feature_flag.result.variant}
{{< /code-block >}}

`feature_flag.evaluations` 메트릭은 다음 태그가 있는 카운터입니다.

| 태그                                  | 설명                                        |
| ------------------------------------ | -------------------------------------------------- |
| `feature_flag.key`                   | 평가 중인 플래그 키                       |
| `feature_flag.result.variant`        | 평가에 의해 반환된 변형             |
| `feature_flag.result.reason`         | 평가 결과에 대한 이유               |
| `feature_flag.result.allocation_key` | 평가된 타겟팅 규칙에 대한 식별자(존재할 때만 내보냄) |
| `error.type`                         | 오류 유형(오류 평가 시에만 내보냄) |

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/feature_flags/server/
[2]: /ko/opentelemetry/setup/otlp_ingest_in_the_agent/
[3]: https://app.datadoghq.com/metric/explorer
[4]: https://app.datadoghq.com/metric/summary
[5]: /ko/dashboards/
[6]: /ko/feature_flags/server/java/#installation
[7]: /ko/feature_flags/implementation_patterns/serverless/#send-feature-flag-telemetry