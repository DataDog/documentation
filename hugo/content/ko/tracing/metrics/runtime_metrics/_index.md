---
aliases:
- /ko/tracing/advanced/runtime_metrics/
- /ko/tracing/metrics/runtime_metrics/dotnet
- /ko/tracing/metrics/runtime_metrics/java
- /ko/tracing/metrics/runtime_metrics/nodejs
- /ko/tracing/metrics/runtime_metrics/python
- /ko/tracing/metrics/runtime_metrics/ruby
- /ko/tracing/runtime_metrics/dotnet
- /ko/tracing/runtime_metrics/java
- /ko/tracing/runtime_metrics/nodejs
- /ko/tracing/runtime_metrics/python
- /ko/tracing/runtime_metrics/ruby
description: 트레이스와 관련된 런타임 메트릭을 통해 애플리케이션 성능에 대한 인사이트를 확보하세요.
further_reading:
- link: /opentelemetry/integrations/runtime_metrics/
  tag: 설명서
  text: OpenTelemetry 런타임 메트릭
- link: tracing/other_telemetry/connect_logs_and_traces
  tag: 설명서
  text: 로그와 트레이스 상호 연결
- link: tracing/trace_collection/custom_instrumentation
  tag: 설명서
  text: 애플리케이션을 수동으로 계측하여 트레이스를 생성합니다.
- link: tracing/glossary/
  tag: 설명서
  text: 서비스, 리소스, 트레이스 둘러보기
title: 런타임 메트릭
---
## 개요 {#overview}

런타임 메트릭은 애플리케이션의 메모리 사용량, 가비지 컬렉션 및 병렬화를 모니터링합니다. Datadog SDK는 지원되는 환경에서 이러한 메트릭을 자동으로 수집하며 Datadog Agent로 전송합니다.

이 메트릭은 병목 현상을 식별하고 성능 문제를 해결하며 리소스 사용을 최적화하는 데 도움을 줍니다. 트레이스 및 로그와 함께 런타임 메트릭을 확인하면 애플리케이션 상태와 성능에 대한 종합적인 가시성을 확보할 수 있습니다.

Datadog 트레이싱 라이브러리 대신 OpenTelemetry를 사용하는 경우 [OpenTelemetry 런타임 메트릭][10]을 참조하여 설정하세요.

## 호환성 {#compatibility}

런타임 메트릭은 여러 프로그래밍 언어와 런타임에서 사용할 수 있으며, 지원 및 구성 옵션의 수준이 다릅니다. 

{{< tabs >}}
{{% tab "Java" %}}

- **기본 활성화**: 예
- **라이브러리 버전**: 0.29.0 이상
- **런타임**: Java 8 이상

<div class="alert alert-danger">AWS Lambda 환경에서는 JMX 메트릭 수집이 지원되지 않습니다.</div>

{{% /tab %}}

{{% tab "Python" %}}

  - **기본 활성화**: 아니요
  - **라이브러리 버전**: 0.30.0 이상
  - **지원 수준**: 미리보기
  - **런타임**: 지원되는 모든 Python 버전

{{% /tab %}}

{{% tab "Ruby" %}}

  - **기본 활성화**: 아니요
  - **라이브러리 버전**: 0.44.0 이상
  - **런타임**: 지원되는 모든 Ruby 버전


<div class="alert alert-info">애플리케이션에 <a href="https://rubygems.org/gems/dogstatsd-ruby">dogstatsd-ruby</a> gem을 추가해야 합니다.</div>

{{% /tab %}}

{{% tab "Go" %}}

  - **기본 활성화**: 아니요
  - **라이브러리 버전**: 1.18.0 이상
  - **런타임**: 지원되는 모든 Go 버전

{{% /tab %}}

{{% tab "Node.js" %}}

  - **기본 활성화**: 아니요
  - **라이브러리 버전**: 3.0.0 이상
  - **런타임**: 지원되는 모든 Node.js 버전

{{% /tab %}}

{{% tab ".NET" %}}

  - **기본 활성화**: 예, .NET 6 이상(v3.40.0 이상)에서.
  - **라이브러리 버전**: 1.23.0 이상
  - **런타임**: .NET Framework 4.6.1 이상 및 .NET Core 3.1 이상(.NET 5 이상 포함).

#### IIS(Internet Information Services) 권한(.NET Framework 전용) {#permissions-for-internet-information-services-iis-net-framework-only}

.NET Framework에서는 성능 카운터를 사용하여 메트릭을 수집합니다. 비대화형 로그온 세션의 사용자(IIS 애플리케이션 풀 계정 및 일부 서비스 계정 포함)가 반대의 데이터에 액세스하려면 ***성능 모니터링 사용자** 그룹에 추가되어야 합니다.

IIS 애플리케이션 풀은 사용자 목록에 나타나지 않는 특수 계정을 사용합니다. 이 계정을 성능 모니터링 사용자 그룹에 추가하려면 `IIS APPPOOL\<name of the pool>` 형식을 사용합니다. 예를 들어, DefaultAppPool의 사용자는 `IIS APPPOOL\DefaultAppPool`입니다.

이 작업은 '컴퓨터 관리' UI 또는 관리자 명령 프롬프트에서 수행할 수 있습니다.

```shell
net localgroup "Performance Monitor Users" "IIS APPPOOL\DefaultAppPool" /add
```

{{% /tab %}}
{{% tab "PHP" %}}

<div class="alert alert-danger">PHP에 대한 런타임 메트릭은 지원되지 않습니다.</div>

{{% /tab %}}
{{% tab "C++" %}}

<div class="alert alert-danger">C++에 대한 런타임 메트릭은 지원되지 않습니다.</div>

{{% /tab %}}
{{< /tabs >}}

## 설정 지침 {#setup-instructions}

런타임 메트릭을 설정하려면 Datadog Agent와 애플리케이션을 모두 구성해야 합니다.

### 1. Datadog Agent 구성 {#1-configure-the-datadog-agent}

[Agent에서 DogStatsD][2]를 활성화합니다. 기본적으로 Datadog Agent는 포트 `8125`를 통해 메트릭을 수집하도록 구성되어 있습니다.

{{% collapse-content title="컨테이너 전용 구성" level="h4" expanded=false %}}

컨테이너화된 환경에서 Datadog Agent를 실행할 때 추가 구성이 필요합니다.

1. DogStatsD 비로컬 트래픽이 활성화되어 있는지 확인합니다. 이 설정은 기본적으로 활성화되어 있습니다. 이전에 비활성화한 경우, 주 [`datadog.yaml` 구성 파일][8]에서 `dogstatsd_non_local_traffic: true`를 설정하거나 [환경 변수][3] `DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true`를 설정합니다.
2. 다음의 컨테이너 전용 설정 지침을 따릅니다.

{{< partial name="apm/apm-runtime-metrics-containers.html" >}}

<br>

{{< site-region region="us3,us5,eu,gov,gov2,ap1,ap2" >}}

3. Datadog Agent의 `DD_SITE`를 {{< region-param key="dd_site" code="true" >}} 로 설정하여 Agent가 데이터를 올바른 Datadog 위치에 전송되도록 보장합니다.

{{< /site-region >}}

{{% /collapse-content %}}

### 2. 애플리케이션 구성 {#2-configure-your-application}

환경 변수를 사용하여 애플리케이션에서 런타임 메트릭을 구성합니다. 일부 언어는 [코드에서 직접](#code-based-configuration) 런타임 메트릭을 구성하는 것도 지원합니다.

#### 환경 변수 {#environment-variables}

다음 환경 변수를 사용하여 애플리케이션에서 런타임 메트릭을 구성합니다.

`DD_RUNTIME_METRICS_ENABLED`
: **기본값**: Java 및 .NET 6 이상(v3.40.0 이상)인 경우 `true`, 다른 모든 언어 및 런타임의 경우 `false`. <br>
**설명**: 런타임 메트릭 수집을 활성화합니다. 메트릭은 계측된 애플리케이션에 대해 구성된 대로 Datadog Agent로 전송됩니다.

`DD_RUNTIME_METRICS_RUNTIME_ID_ENABLED`
: **기본값**: Java의 경우 `true`, Node.js, Ruby 및 Python의 경우 `false`. .NET 및 Go에는 존재하지 않으며, `runtime_id`가 항상 보고됩니다. <br>
**설명**: 향상된 런타임 메트릭을 활성화하여 모든 메트릭과 함께 `runtime_id` 태그를 제공합니다. `runtime_id`가 애플리케이션의 프로세스 식별자를 나타내며, 런타임 메트릭을 개별 실행 중인 애플리케이션과 직접 연관시킬 수 있습니다. 

`DD_AGENT_HOST`
: **기본값**: `localhost` <br>
**설명**: SDK의 메트릭 제출을 위한 호스트 주소를 설정합니다. 호스트 이름 또는 IP 주소일 수 있습니다.

`DD_DOGSTATSD_PORT`
: **기본값**: `8125` <br>
**설명**: SDK의 메트릭 제출을 위한 포트를 설정합니다.

`DD_RUNTIME_METRICS_DIAGNOSTICS_METRICS_API_ENABLED`
: **기본값**: .NET 8 이상에서 tracer v3.40.0 이상이면(그리고 NET 6/7에서 `DD_RUNTIME_METRICS_ENABLED`가 명시적으로 설정되지 않은 경우) `true`, 그 외는 `false` <br>
**설명**: .NET 6부터 사용할 수 있는 설정입니다. .NET 트레이서가 [`System.Diagnostics.Metrics` API][9]를 사용하여 메트릭을 수집할지, 아니면 `EventListener` 기반 컬렉터를 사용할지를 제어합니다.

#### 코드 기반 구성 {#code-based-configuration}

환경 변수 외에도 일부 언어는 코드에서 직접 런타임 메트릭을 구성하는 것을 지원합니다.

{{< tabs >}}
{{% tab "Java" %}}

런타임 메트릭은 [환경 변수](#environment-variables)로만 활성화할 수 있습니다.

다만, 사용자 지정 JMX 메트릭을 추가하여 수집된 메트릭을 확장할 수 있습니다. 자세한 내용은 [JMX 통합][100] 설명서를 참조하세요.

[100]: /ko/integrations/java/
{{% /tab %}}

{{% tab "Python" %}}

런타임 메트릭은 [환경 변수](#environment-variables) 또는 코드로 활성화할 수 있습니다.

```python
from ddtrace.runtime import RuntimeMetrics
RuntimeMetrics.enable()
```

<div class="alert alert-danger">이 설정은 <code>ddtrace-run</code></div>을 사용하지 않는 경우에만 적용됩니다.
{{% /tab %}}

{{% tab "Ruby" %}}

런타임 메트릭은 [환경 변수](#environment-variables) 또는 코드로 활성화할 수 있습니다.

```ruby
# config/initializers/datadog.rb
require 'datadog/statsd'
require 'datadog' # Use 'ddtrace' if you're using v1.x

Datadog.configure do |c|
  c.runtime_metrics.enabled = true

  # Optionally, you can configure the DogStatsD instance used for sending runtime metrics.
  # DogStatsD is automatically configured with default settings if `dogstatsd-ruby` is available.
  # You can configure with host and port of Datadog agent; defaults to 'localhost:8125'.
  c.runtime_metrics.statsd = Datadog::Statsd.new
end
```
{{% /tab %}}

{{% tab "Go" %}}

런타임 메트릭은 [환경 변수](#environment-variables) 또는 코드로 활성화할 수 있습니다.

```go
// Basic configuration
tracer.Start(tracer.WithRuntimeMetrics())

// With custom DogStatsD address
tracer.Start(
  tracer.WithRuntimeMetrics(),
  tracer.WithDogstatsdAddr("custom-host:8125")
)
```

`WithDogstatsdAddr` 옵션을 사용하면 DogStatsD 서버에 대한 사용자 지정 주소를 지정할 수 있습니다. 주소가 기본값 `localhost:8125`와 다르면 [`WithDogstatsdAddr`][101](또는 [`WithDogstatsdAddress` v1][100]) 옵션을 사용하세요. (1.18.0 이상에서 사용 가능)

[100]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#WithDogstatsdAddress
[101]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace/tracer#WithDogstatsdAddr
{{% /tab %}}

{{% tab "Node.js" %}}

런타임 메트릭은 [환경 변수](#environment-variables) 또는 코드로 활성화할 수 있습니다.

```js
const tracer = require('dd-trace').init({
  // Other tracer options...
  runtimeMetrics: true
})
```
{{% /tab %}}

{{% tab ".NET" %}}

런타임 메트릭은 [환경 변수](#environment-variables)로만 활성화할 수 있습니다.

{{% /tab %}}
{{< /tabs >}}

## 대시보드 {#dashboards}

설정이 완료되면 런타임 메트릭을 볼 수 있습니다.

- 계측된 서비스의 세부 정보 페이지
- 플레임 그래프의 **Metrics** 탭
- 기본 런타임 대시보드

{{< img src="tracing/runtime_metrics/jvm_runtime_trace.png" alt="JVM Runtime Trace" >}}

## 문제 해결 {#troubleshooting}
- 플레임 그래프 내에서 런타임 메트릭을 연결하려면 `env` 태그(대소문자 구분)가 설정되어 있고 환경과 일치하는지 확인하세요.
- Fargate를 사용할 때 서비스 페이지에 런타임 메트릭이 표시되도록 하려면 `DD_DOGSTATSD_TAGS`가 Agent 작업에 설정되어 있고 구성된 `env` 태그가 계측된 서비스의 `env`와 일치하는지 확인하세요.

## 수집된 데이터 {#data-collected}

지원되는 각 언어는 메모리 사용량, 가비지 컬렉션, CPU 사용률 및 기타 성능 지표에 대한 인사이트를 제공하는 런타임 메트릭 세트를 수집합니다.

{{< tabs >}}
{{< tab "Java" >}}
{{< get-metrics-from-git "java" >}}
{{< /tab >}}

{{< tab "Python" >}}
{{< get-metrics-from-git "python" >}}
{{< /tab >}}

{{< tab "Ruby" >}}
{{< get-metrics-from-git "ruby" >}}
{{< /tab >}}

{{< tab "Go" >}}
{{< get-metrics-from-git "go" >}}
{{< /tab >}}

{{< tab "Node.js" >}}
{{< get-metrics-from-git "node" >}}
{{< /tab >}}

{{< tab ".NET" >}}
{{< get-metrics-from-git "dotnet" >}}
{{< /tab >}}
{{< /tabs >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: /ko/extend/dogstatsd/#setup
[3]: /ko/agent/docker/#dogstatsd-custom-metrics
[7]: /ko/extend/dogstatsd/unix_socket/
[8]: /ko/agent/configuration/agent-configuration-files/#main-configuration-file
[9]: https://learn.microsoft.com/dotnet/api/system.diagnostics.metrics
[10]: /ko/opentelemetry/integrations/runtime_metrics/