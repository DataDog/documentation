---
aliases:
- /ko/tracing/trace_ingestion/mechanisms
description: 트레이스 수집을 제어하는 SDK 및 Agent의 메커니즘 개요입니다.
further_reading:
- link: /tracing/trace_pipeline/ingestion_controls/
  tag: 설명서
  text: Ingestion Control
- link: /tracing/trace_pipeline/trace_retention/
  tag: 설명서
  text: 트레이스 보존
- link: /tracing/trace_pipeline/metrics/
  tag: 설명서
  text: 사용량 메트릭
- link: https://www.datadoghq.com/blog/zendesk-cost-optimization/#improving-tracing-efficiency-through-targeted-changes
  tag: 블로그
  text: '규모에 맞는 Datadog 최적화: Zendesk의 비용 효율적 관측 가능성'
- link: https://learn.datadoghq.com/courses/apm-rate-limit-retention
  tag: 학습 센터
  text: APM 속도 제한 및 보존
title: 수집 메커니즘
---
{{< img src="tracing/apm_lifecycle/ingestion_sampling_rules.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="수집 샘플링 규칙" >}}


애플리케이션이 생성한 스팬을 Datadog으로 전송할지(_ingested_) 결정하는 메커니즘은 여러 가지가 있습니다. 이러한 메커니즘의 배후 로직은 [SDK][1] 및 Datadog Agent에 기인합니다. 구성에 따라 계측된 서비스가 생성한 트래픽의 전부 또는 일부가 수집됩니다.

각각의 수집된 스팬에는 고유한 **수집 사유**가 있고, 이는 이 페이지에서 설명하는 메커니즘 중 하나를 가리킵니다. [사용량 메트릭][2] `datadog.estimated_usage.apm.ingested_bytes` 및 `datadog.estimated_usage.apm.ingested_spans`는 `ingestion_reason`으로 태그됩니다.

각 수집 사유의 전후 상황을 조사하고 어느 구성 옵션에 집중해야 할지 알아보려면 [수집 사유 대시보드][3]를 사용하세요.

## 헤드 기반 샘플링 {#head-based-sampling}

기본 샘플링 메커니즘을 _헤드 기반 샘플링_이라고 합니다. 트레이스를 유지할지 제거할지 결정은 [루트 스팬][4] 시작 시에 이루어지며, 이후 요청 컨텍스트의 일부분으로 다른 서비스에 전파됩니다(예: HTTP 요청 헤더로).

결정이 트레이스 시작 시에 이루어지고 모든 부분으로 전달되기 때문에, 트레이스 한 개 전체가 유지되거나 제거됩니다.

{{< img src="/tracing/guide/ingestion_sampling_use_cases/head-based-sampling.png" alt="헤드 기반 샘플링" style="width:100%;" >}}

헤드 기반 샘플링의 샘플링 레이트는 다음의 두 곳에서 설정 가능합니다.
- **[Agent](#in-the-agent)** 수준에서(기본값)
- **[SDK](#in-sdks-user-defined-rules)** 수준에서: 모든 SDK 메커니즘이 Agent 설정을 재정의합니다.

### Agent 설정 {#in-the-agent}
`ingestion_reason: auto`

Datadog Agent는 트레이스의 루트에서 적용할 샘플링 레이트를 SDK에 지속적으로 전송합니다. Agent는 전체적으로 초당 10개의 트레이스를 목표로 레이트를 조정하며, 트래픽에 따라 서비스별로 분배합니다.

예를 들어 서비스 `A`에 서비스 `B`보다 트래픽이 많은 경우, Agent가 `A`의 샘플링 비율을 변경해 `A`에 초당 트레이스가 7개 이상 유지되지 않게 하고, 마찬가지로 `B`의 샘플링 비율을 조정해 `B`가 초당 트레이스를 3개 이상 유지하지 않게 하여 합쳐서 초당 트레이스 10개가 되도록 할 수 있습니다.

#### Remote Configuration {#remote-configuration}

Agent의 샘플링 레이트를 원격으로 구성하려면 Agent 버전 [7.42.0][20] 이상을 사용 중이어야 합니다. 시작하려면 [Remote Configuration][21]을 설정한 다음 [Ingestion Control 페이지][5]에서 `ingestion_reason` 파라미터를 구성하세요. Remote Configuration을 사용하면 Agent를 재시작하지 않고도 파라미터를 변경할 수 있습니다. 원격으로 설정한 구성이 `datadog.yaml`의 환경 변수와 설정을 포함한 로컬 구성보다 우선합니다.

#### 로컬 구성 {#local-configuration}

Agent 메인 구성 파일(`datadog.yaml`)에서, 또는 환경 변수로서 Agent 목표 초당 트레이스를 설정합니다.

```
@param target_traces_per_second - integer - optional - default: 10
@env DD_APM_TARGET_TPS - integer - optional - default: 10
```

**참고**:
- Agent에서 설정한 초당 트레이스 샘플링 레이트는 Datadog SDK에만 적용됩니다. OpenTelemetry SDK와 같은 다른 SDK에는 영향이 없습니다.
- 목표는 고정된 값이 아닙니다. 실제로는 트래픽 스파이크 및 기타 요인에 따라 변동합니다.

Datadog Agent의 [자동 샘플링 레이트](#in-the-agent)로 샘플링된 트레이스의 스팬은 수집 사유 `auto`로 태그됩니다. `ingestion_reason` 태그도 [사용량 메트릭][2]에서 설정됩니다. 이 기본 메커니즘을 사용하는 서비스는 [Ingestion Control 페이지][5] 구성 열에서 `Automatic`으로 레이블이 지정됩니다.

### SDK 설정: 사용자 정의 규칙 {#in-sdks-user-defined-rules}
`ingestion_reason: rule`

좀 더 세분화된 제어를 원하는 경우, SDK 샘플링 구성 옵션 사용:
- **트레이스의 루트에 적용할 특정 샘플링 레이트**를 서비스 또는 리소스 이름 기준으로 설정하여 Agent의 [기본 메커니즘](#in-the-agent)을 재정의합니다.
- 초당 수집된 트레이스 수에 **레이트 한도**를 설정합니다. 기본 레이트 한도는 서비스 인스턴스당 초당 트레이스 100개입니다. Agent [기본 메커니즘](#in-the-agent)을 사용하는 경우 레이트 리미터가 무시됩니다.

**참고**: 샘플링 규칙도 헤드 기반 샘플링 제어입니다. 서비스의 트래픽이 구성된 초당 최대 트레이스 수보다 많은 경우, 트레이스가 루트에서 제거됩니다. 이는 불완전한 트레이스를 생성하지 않습니다.

구성은 환경 변수로 설정할 수도 있고 코드에서 직접 설정할 수도 있습니다.

{{< tabs >}}
{{% tab "Java" %}}
**Remote Configuration**

버전 <a href="https://github.com/DataDog/dd-trace-java/releases/tag/v1.34.0">1.34.0</a>부터 Java 애플리케이션의 서비스별 및 리소스별 샘플링 레이트를 <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">Ingestion Control 페이지</a> UI에서 설정합니다.

서비스 및 리소스에 따라 샘플링 레이트를 원격으로 구성하는 방법에 관한 자세한 내용은 [리소스 기반 샘플링 가이드][1]를 참조하세요.

**참고**: 원격으로 설정된 구성이 로컬 구성보다 우선합니다.

**로컬 구성**

Java 애플리케이션의 경우, `DD_TRACE_SAMPLING_RULES` 환경 변수를 사용해 서비스별 및 리소스별(리소스별 샘플링의 경우 버전 [v1.26.0][3]부터) 샘플링 레이트를 설정합니다.

예를 들어 서비스 `my-service`에서 리소스 `GET /checkout`의 트레이스를 100%, 다른 엔드포인트의 트레이스를 20% 캡처하려면 다음과 같이 설정합니다.

```
# using system property
java -Ddd.trace.sampling.rules='[{"service": "my-service", "resource": "GET /checkout", "sample_rate":1},{"service": "my-service", "sample_rate":0.2}]' -javaagent:dd-java-agent.jar -jar my-app.jar

# using environment variables
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource":"GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

서비스 이름 값은 대소문자를 구분하며 실제 서비스 이름의 대소문자와 일치해야 합니다.

환경 변수 `DD_TRACE_RATE_LIMIT`를 서비스 인스턴스당 초당 트레이스 최대 수로 설정하여 레이트 한도를 구성하세요. `DD_TRACE_RATE_LIMIT` 값을 설정하지 않으면 초당 트레이스 100개의 한도가 적용됩니다.

**참고**: `DD_TRACE_SAMPLE_RATE`은 사용이 중단되었습니다. 대신 `DD_TRACE_SAMPLING_RULES`를 사용하세요. 예를 들어 이미 `DD_TRACE_SAMPLE_RATE`를 `0.1`로 설정한 경우, 대신 `DD_TRACE_SAMPLING_RULES`를 `[{"sample_rate":0.1}]`로 설정합니다.

생플링 제어에 관한 자세한 내용은 [Java SDK 설명서][2]를 참조하세요.

[1]: /ko/tracing/guide/resource_based_sampling
[2]: /ko/tracing/trace_collection/dd_libraries/java
[3]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.26.0
{{% /tab %}}
{{% tab "Python" %}}
**Remote Configuration**

버전 <a href="https://github.com/DataDog/dd-trace-py/releases/tag/v2.9.0">2.9.0</a>부터 Python 애플리케이션의 서비스별 및 리소스별 샘플링 레이트를 <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">Ingestion Control 페이지</a> UI에서 설정합니다.

서비스 및 리소스에 따라 샘플링 레이트를 원격으로 구성하는 방법에 관한 자세한 내용은 [리소스 기반 샘플링 가이드][3]를 참조하세요.

**참고**: 원격으로 설정된 구성이 로컬 구성보다 우선합니다.

**로컬 구성**
Python 애플리케이션의 경우, `DD_TRACE_SAMPLING_RULES` 환경 변수를 사용해 서비스별 및 리소스별(리소스별 샘플링의 경우 버전 [v2.8.0][1]부터) 샘플링 레이트를 설정합니다.

예를 들어 서비스 `my-service`에서 리소스 `GET /checkout`의 트레이스를 100%, 다른 엔드포인트의 트레이스를 20% 캡처하려면 다음과 같이 설정합니다.

```
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource": "GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

환경 변수 `DD_TRACE_RATE_LIMIT`를 서비스 인스턴스당 초당 트레이스 최대 수로 설정하여 레이트 한도를 구성하세요. `DD_TRACE_RATE_LIMIT` 값을 설정하지 않으면 초당 트레이스 100개의 한도가 적용됩니다.

**참고**: `DD_TRACE_SAMPLE_RATE`은 사용이 중단되었습니다. 대신 `DD_TRACE_SAMPLING_RULES`를 사용하세요. 예를 들어 이미 `DD_TRACE_SAMPLE_RATE`를 `0.1`로 설정한 경우, 대신 `DD_TRACE_SAMPLING_RULES`를 `[{"sample_rate":0.1}]`로 설정합니다.

생플링 제어에 관한 자세한 내용은 [Python SDK 설명서][2]를 참조하세요.

[1]: https://github.com/DataDog/dd-trace-py/releases/tag/v2.8.0
[2]: /ko/tracing/trace_collection/dd_libraries/python
[3]: /ko/tracing/guide/resource_based_sampling/
{{% /tab %}}
{{% tab "Ruby" %}}
**Remote Configuration**

버전 <a href="https://github.com/DataDog/dd-trace-rb/releases/tag/v2.0.0">2.0.0</a>부터 Ruby 애플리케이션의 서비스별 및 리소스별 샘플링 레이트를 <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">Ingestion Control 페이지</a> UI에서 설정합니다.

서비스 및 리소스에 따라 샘플링 레이트를 원격으로 구성하는 방법에 관한 자세한 내용은 [리소스 기반 샘플링 가이드][1]를 참조하세요.

**참고**: 원격으로 설정된 구성이 로컬 구성보다 우선합니다.

**로컬 구성**
Ruby 애플리케이션의 경우, `DD_TRACE_SAMPLE_RATE` 환경 변수를 사용해 라이브러리의 전역 샘플링 레이트를 설정합니다. `DD_TRACE_SAMPLING_RULES` 환경 변수를 사용하여 서비스별로 샘플링 레이트를 설정합니다.

예를 들어 이름이 `my-service`인 서비스의 트레이스 50%와 나머지 트레이스의 10%를 보내려면 다음과 같이 설정합니다.

```
export DD_TRACE_SAMPLE_RATE=0.1
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "sample_rate": 0.5}]'
```

환경 변수 `DD_TRACE_RATE_LIMIT`를 서비스 인스턴스당 초당 트레이스 최대 수로 설정하여 레이트 한도를 구성하세요. `DD_TRACE_RATE_LIMIT` 값을 설정하지 않으면 초당 트레이스 100개의 한도가 적용됩니다.

샘플링 제어에 관한 자세한 내용은 [Ruby SDK 설명서][1]를 참조하세요.

[1]: /ko/tracing/trace_collection/dd_libraries/ruby#sampling
{{% /tab %}}
{{% tab "Go" %}}
**Remote Configuration**

버전 <a href="https://github.com/DataDog/dd-trace-go/releases/tag/v1.64.0">1.64.0</a>부터 Go 애플리케이션의 서비스별 및 리소스별 샘플링 레이트를 <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">Ingestion Control 페이지</a> UI에서 설정합니다. 

서비스 및 리소스에 따라 샘플링 레이트를 원격으로 구성하는 방법에 대한 자세한 내용은 이 [문서][3]를 참조하세요.

**참고**: 원격으로 설정된 구성이 로컬 구성보다 우선합니다.

**로컬 구성**

Go 애플리케이션의 경우, `DD_TRACE_SAMPLING_RULES` 환경 변수를 사용해 서비스별 및 리소스별(리소스별 샘플링의 경우 버전 [v1.60.0][2]부터) 샘플링 레이트를 설정합니다.

예를 들어 서비스 `my-service`에서 리소스 `GET /checkout`의 트레이스를 100%, 다른 엔드포인트의 트레이스를 20% 캡처하려면 다음과 같이 설정합니다.

```
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource": "GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

환경 변수 `DD_TRACE_RATE_LIMIT`를 서비스 인스턴스당 초당 트레이스 최대 수로 설정하여 레이트 한도를 구성하세요. `DD_TRACE_RATE_LIMIT` 값을 설정하지 않으면 초당 트레이스 100개의 한도가 적용됩니다.

**참고**: `DD_TRACE_SAMPLE_RATE`은 사용이 중단되었습니다. 대신 `DD_TRACE_SAMPLING_RULES`를 사용하세요. 예를 들어 이미 `DD_TRACE_SAMPLE_RATE`를 `0.1`로 설정한 경우, 대신 `DD_TRACE_SAMPLING_RULES`를 `[{"sample_rate":0.1}]`로 설정합니다.

샘플링 제어에 관한 자세한 내용은 [Go SDK 설명서][1]를 참조하세요.

[1]: /ko/tracing/trace_collection/dd_libraries/go
[2]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.60.0
[3]: /ko/tracing/guide/resource_based_sampling
{{% /tab %}}
{{% tab "Node.js" %}}
**Remote Configuration**

버전 <a href="https://github.com/DataDog/dd-trace-js/releases/tag/v5.16.0">5.16.0</a>부터 Node.js 애플리케이션의 서비스별 및 리소스별 샘플링 레이트를 <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">Ingestion Control 페이지</a> UI에서 설정합니다.

서비스 및 리소스에 따라 샘플링 레이트를 원격으로 구성하는 방법에 관한 자세한 내용은 [리소스 기반 샘플링 가이드][1]를 참조하세요.

**참고**: 원격으로 설정된 구성이 로컬 구성보다 우선합니다.

**로컬 구성**

Node.js 애플리케이션의 경우, `DD_TRACE_SAMPLE_RATE` 환경 변수를 사용해 라이브러리의 전역 샘플링 레이트를 설정합니다.

서비스별 샘플링 레이트도 설정할 수 있습니다. 예를 들어 이름이 `my-service`인 서비스의 트레이스 50%와 나머지 트레이스의 10%를 보내려면 다음과 같이 설정합니다.

```javascript
tracer.init({
    ingestion: {
        sampler: {
            sampleRate: 0.1,
            rules: [
                { sampleRate: 0.5, service: 'my-service' }
            ]
        }
    }
});
```

환경 변수 `DD_TRACE_RATE_LIMIT`를 서비스 인스턴스당 초당 트레이스 최대 수로 설정하여 레이트 한도를 구성하세요. `DD_TRACE_RATE_LIMIT` 값을 설정하지 않으면 초당 트레이스 100개의 한도가 적용됩니다.

샘플링 제어에 관한 자세한 내용은 [Node.js SDK 설명서][1]를 참조하세요.

[1]: /ko/tracing/trace_collection/dd_libraries/nodejs
{{% /tab %}}
{{% tab "PHP" %}}
**Remote Configuration**

버전 <a href="https://github.com/DataDog/dd-trace-php/releases/tag/1.4.0">1.4.0</a>부터 PHP 애플리케이션의 서비스별 및 리소스별 샘플링 레이트를 <a href="https://app.datadoghq.com/apm/traces/ingestion-control">Ingestion Control 페이지</a>에서 설정합니다.

서비스 및 리소스에 따라 샘플링 레이트를 원격으로 구성하는 방법에 관한 자세한 내용은 [리소스 기반 샘플링 가이드][1]를 참조하세요.

**참고**: 원격으로 설정된 구성이 로컬 구성보다 우선합니다.

**로컬 구성**

PHP 애플리케이션의 경우, `DD_TRACE_SAMPLE_RATE` 환경 변수를 사용해 라이브러리의 전역 샘플링 레이트를 설정합니다. `DD_TRACE_SAMPLING_RULES` 환경 변수를 사용하여 서비스별로 샘플링 레이트를 설정합니다.

예를 들어 이름이 `my-service`인 서비스의 트레이스 50%와 다른 엔드포인트의 트레이스 20%, 그리고 나머지 트레이스의 10%를 보내려면 다음과 같이 설정합니다.

```
export DD_TRACE_SAMPLE_RATE=0.1
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource":"GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

샘플링 제어에 관한 자세한 내용은 [PHP SDK 설명서][1]를 참조하세요.

[1]: /ko/tracing/trace_collection/dd_libraries/php
{{% /tab %}}
{{% tab "C++" %}}
**Remote Configuration**

버전 <a href="https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.2.2">0.2.2</a>부터 C++ 애플리케이션의 서비스별 및 리소스별 샘플링 레이트를 <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">Ingestion Control 페이지</a> UI에서 설정합니다.

서비스 및 리소스에 따라 샘플링 레이트를 원격으로 구성하는 방법에 관한 자세한 내용은 [리소스 기반 샘플링 가이드][1]를 참조하세요.

**참고**: 원격으로 설정된 구성이 로컬 구성보다 우선합니다.

**로컬 구성**
Datadog C++ 라이브러리는 [v0.1.0][1]부터 다음 구성을 지원합니다.
- 전역 샘플링 레이트: `DD_TRACE_SAMPLE_RATE` 환경 변수
- 서비스별 샘플링 레이트: `DD_TRACE_SAMPLING_RULES` 환경 변수.
- 레이트 한도 설정: `DD_TRACE_RATE_LIMIT` 환경 변수.

예를 들어 이름이 `my-service`인 서비스의 트레이스 50%와 나머지 트레이스의 10%를 보내려면 다음과 같이 설정합니다.

```
export DD_TRACE_SAMPLE_RATE=0.1
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "sample_rate": 0.5}]'
```

C++은 자동 계측을 위한 통합 기능을 제공하지 않지만, Envoy, Nginx, Istio와 같은 프록시 트레이싱에 사용됩니다. 프록시에 대한 샘플링을 구성하는 방법에 관한 자세한 내용은 [프록시 트레이싱][2]을 참조하세요.

[1]: https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.1.0
[2]: /ko/tracing/trace_collection/proxy_setup
{{% /tab %}}
{{% tab ".NET" %}}
.NET 애플리케이션의 경우, `DD_TRACE_SAMPLE_RATE` 환경 변수를 사용해 라이브러리의 전역 샘플링 레이트를 설정합니다. `DD_TRACE_SAMPLING_RULES` 환경 변수를 사용하여 서비스별로 샘플링 레이트를 설정합니다.

예를 들어 이름이 `my-service`인 서비스의 트레이스 50%와 나머지 트레이스의 10%를 보내려면 다음과 같이 설정합니다.

```
#using powershell
$env:DD_TRACE_SAMPLE_RATE=0.1
$env:DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "sample_rate": 0.5}]'

#using JSON file   
{
    "DD_TRACE_SAMPLE_RATE": "0.1",
    "DD_TRACE_SAMPLING_RULES": "[{\"service\": \"my-service\", \"resource\": \"GET /checkout\", \"sample_rate\": 0.5}]"
}
```

<div class="alert alert-info">버전 2.35.0부터 서비스가 실행되는 곳에서 <a href="/remote_configuration">Agent Remote Configuration</a>이 활성화되어 있으면 <code>DD_TRACE_SAMPLE_RATE</code> 를 <a href="/tracing/software_catalog">Software Catalog</a> UI에서 서비스별로 설정할 수 있습니다.</div>

환경 변수 `DD_TRACE_RATE_LIMIT`를 서비스 인스턴스당 초당 트레이스 최대 수로 설정하여 레이트 한도를 구성하세요. `DD_TRACE_RATE_LIMIT` 값을 설정하지 않으면 초당 트레이스 100개의 한도가 적용됩니다.

샘플링 제어에 관한 자세한 내용은 [.NET SDK 설명서][1]를 참조하세요.\
[.NET에 대한 환경 변수 구성][2]에 관해 자세히 알아보세요.

[1]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core
[2]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core?tab=registryeditor#configuring-process-environment-variables
{{% /tab %}}
{{< /tabs >}}

**참고**: SDK를 사용해 샘플링된 트레이스의 모든 스팬은 수집 사유 `rule`로 태그됩니다. 사용자 정의 샘플링으로 구성된 서비스는 [Ingestion Control 페이지][5] 구성 열에 `Configured`로 표시됩니다.

## 오류 및 레어 트레이스 {#error-and-rare-traces}

헤드 기반 샘플링으로 포착하지 못한 트레이스의 경우, 2개의 추가 Datadog Agent 샘플링 메커니즘이 원래는 제거됐을 수 있는 중요하고 다양한 트레이스를 포착합니다. 이러한 샘플러는 미리 결정된 태그 세트의 모든 조합을 포착해 로컬 트레이스 세트(같은 호스트의 스팬)를 유지합니다.

- **오류 트레이스**: 오류 샘플링을 이용하면 잠재적 시스템 오류에 대한 가시성을 얻을 수 있습니다.
- **레어 트레이스**: 레어 트레이스 샘플링은 시스템 전반의 트래픽이 적은 서비스 및 리소스에 대한 가시성을 유지합니다.

**참고**: 오류 및 레어 샘플러는 [라이브러리 샘플링 규칙](#in-sdks-user-defined-rules)을 설정한 서비스에 대해서는 무시됩니다.

### 오류 트레이스 {#error-traces}
`ingestion_reason: error`

오류 샘플러는 헤드 기반 샘플링이 잡아내지 못한 오류 스팬을 포함하는 트레이스 조각을 Agent당 초당 트레이스 최대 10개의 레이트로 포착합니다. 이렇게 하면 헤드 기반 샘플링 레이트가 낮을 때 오류에 대한 가시성을 유지하는 데 도움이 됩니다.

Agent 버전 7.33 이상에서는 Agent 메인 구성 파일(`datadog.yaml`)에서나 다음 환경 변수를 사용해 오류 샘플러를 구성할 수 있습니다.

```
@param errors_per_second - integer - optional - default: 10
@env DD_APM_ERROR_TPS - integer - optional - default: 10
```

{{< img src="/tracing/guide/ingestion_sampling_use_cases/error-spans-sampling.png" alt="오류 샘플링" style="width:100%;" >}}

**참고**:
1. 오류 샘플러를 비활성화하려면 파라미터를 `0`으로 설정합니다.
2. 오류 샘플러는 Agent 수준에서 로컬 오류 트레이스를 캡처합니다. 트레이스가 분산된 경우, 완전한 트레이스가 Datadog으로 전송되지 않을 수 있습니다.
3. 기본적으로 SDK 규칙 또는 `manual.drop`과 같은 사용자 지정 로직으로 제거된 스팬은 오류 샘플러에서 **제외**됩니다.

#### Datadog Agent 7.42.0 이상 {#datadog-agent-7420-and-higher}

Agent 버전 [7.42.0][20] 이상을 사용 중인 경우 오류 샘플링을 원격으로 구성할 수 있습니다. Agent에서 원격 구성을 활성화하려면 [설명서][21]를 따르세요. 원격 구성을 사용하면 Datadog Agent를 재시작하지 않고도 레어 스팬 수집을 활성화할 수 있습니다.

#### Datadog Agent 6/7.41.0 이상 {#datadog-agent-67410-and-higher}

기본 동작을 재정의해 SDK 규칙 또는 `manual.drop`과 같은 사용자 지정 로직이 제거한 스팬을 오류 샘플러가 **포함**하게 하려면 Datadog Agent에서(또는 Kubernetes의 Datadog Agnet 포드 내 전용 Trace Agent 컨테이너에서) `DD_APM_FEATURES=error_rare_sample_tracer_drop`으로 해당 기능을 활성화하세요.

#### Datadog Agent 6/7.33에서 6/7.40.x까지 {#datadog-agent-6733-to-6740x}

이러한 Agent 버전에서는 오류 샘플링 기본 동작을 변경할 수 없습니다. Datadog Agent를 Datadog Agent 6/7.41.0 이상으로 업그레이드하세요.

### 레어 트레이스 {#rare-traces}
`ingestion_reason: rare`

레어 샘플러는 레어 스팬 세트를 Datadog에 보냅니다. 이 샘플러는 `env`, `service`, `name`, `resource`, `error.type`, `http.status`의 조합을 Agent당 초당 트레이스 최대 5개의 레이트로 포착합니다. 이렇게 하면 헤드 기반 샘플링 레이트가 낮을 때 트래픽이 적은 리소스에 대한 가시성을 유지하는 데 도움이 됩니다.

**참고**: 레어 샘플러는 Agent 수준에서 로컬 트레이스를 캡처합니다. 트레이스가 분산된 경우, 완전한 트레이스가 Datadog으로 전송된다는 보장이 없습니다.

#### Datadog Agent 7.42.0 이상 {#datadog-agent-7420-and-higher-1}

Agent 버전 [7.42.0][20] 이상을 사용 중인 경우 레어 샘플링을 원격으로 구성할 수 있습니다. Agent에서 원격 구성을 활성화하려면 [설명서][21]를 따르세요. 원격 구성을 사용하면 Datadog Agent를 재시작하지 않고도 매개변수 값을 변경할 수 있습니다.

#### Datadog Agent 6/7.41.0 이상 {#datadog-agent-67410-and-higher-1}

기본적으로 레어 샘플러는 **활성화되지 않습니다**.

**참고**: **활성화된** 경우, SDK 규칙이나 `manual.drop`과 같은 사용자 지정 로직이 제거한 스팬은 이 샘플러에서 **제외**됩니다.

레어 샘플러를 구성하려면 Agent 메인 구성 파일(`datadog.yaml`)에서 또는 환경 변수`DD_APM_ENABLE_RARE_SAMPLER`를 사용하여 `apm_config.enable_rare_sampler` 설정을 업데이트하세요.

```
@params apm_config.enable_rare_sampler - boolean - optional - default: false
@env DD_APM_ENABLE_RARE_SAMPLER - boolean - optional - default: false
```

SDK 규칙이나 ,`manual.drop`과 같은 사용자 지정 로직으로 제거된 스팬을 평가하려면 Trace Agent에서 `DD_APM_FEATURES=error_rare_sample_tracer_drop`을 사용하여 해당 기능을 활성화하세요.

#### Datadog Agent 6/7.33에서 6/7.40.x까지 {#datadog-agent-6733-to-6740x-1}

기본적으로 레어 샘플러가 활성화되어 있습니다.

**참고**: **활성화된** 경우, SDK 규칙이나 `manual.drop`과 같은 사용자 지정 로직이 제거한 스팬은 이 샘플러에서 **제외됩니다**. 이 로직에 이러한 스팬을 포함하려면 Datadog Agent 6.41.0/7.41.0 이상으로 업그레이드하세요.

기본 레어 샘플러 설정을 변경하려면 Agent 메인 구성 파일(`datadog.yaml`)에서 또는 환경 변수 `DD_APM_DISABLE_RARE_SAMPLER`를 사용하여 `apm_config.disable_rare_sampler` 설정을 업데이트하세요.

```
@params apm_config.disable_rare_sampler - boolean - optional - default: false
@env DD_APM_DISABLE_RARE_SAMPLER - boolean - optional - default: false
```

## 강제 유지 및 제거 {#force-keep-and-drop}
`ingestion_reason: manual`

헤드 기반 샘플링 메커니즘은 SDK 수준에서 재정의될 수 있습니다. 예를 들어 중요한 트랜잭션을 모니터링해야 하는 경우, 연결된 트레이스를 강제로 유지할 수 있습니다. 반면, 상태 검사와 같은 불필요하거나 반복적인 정보인 경우 트레이스를 강제로 제거할 수 있습니다.

- 스팬에서 Manual Keep을 설정하면 해당 스팬과 모든 하위 스팸을 수집해야 함을 나타냅니다. 그 결과로 나타나는 트레이스는 문제의 스팬이 트레이스의 루트 스팬이 아닌 경우, UI에 불완전한 것으로 표시될 수 있습니다.

- 스팬에서 Manual Drop을 설정하면 하위 스팬이 수집되지 **않도록** 보장됩니다. [오류 및 레어 샘플러](#error-and-rare-traces)는 Agent에서 무시됩니다.

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php,cpp" >}}
{{< programming-lang lang="java" >}}

트레이스 수동으로 유지:

```java
import datadog.trace.api.DDTags;
import io.opentracing.Span;
import datadog.trace.api.Trace;
import io.opentracing.util.GlobalTracer;

public class MyClass {
    @Trace
    public static void myMethod() {
        // grab the active span out of the traced method
        Span span = GlobalTracer.get().activeSpan();
        // Always keep the trace
        span.setTag(DDTags.MANUAL_KEEP, true);
        // method impl follows
    }
}
```

트레이스 수동으로 제거:

```java
import datadog.trace.api.DDTags;
import io.opentracing.Span;
import datadog.trace.api.Trace;
import io.opentracing.util.GlobalTracer;

public class MyClass {
    @Trace
    public static void myMethod() {
        // grab the active span out of the traced method
        Span span = GlobalTracer.get().activeSpan();
        // Always Drop the trace
        span.setTag(DDTags.MANUAL_DROP, true);
        // method impl follows
    }
}
```

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

트레이스 수동으로 유지:

```python
from ddtrace import tracer
from ddtrace.constants import MANUAL_DROP_KEY, MANUAL_KEEP_KEY

@tracer.wrap()
def handler():
    span = tracer.current_span()
    # Always Keep the Trace
    span.set_tag(MANUAL_KEEP_KEY)
    # method impl follows
```

트레이스 수동으로 제거:

```python
from ddtrace import tracer
from ddtrace.constants import MANUAL_DROP_KEY, MANUAL_KEEP_KEY

@tracer.wrap()
def handler():
    span = tracer.current_span()
    # Always Drop the Trace
    span.set_tag(MANUAL_DROP_KEY)
    # method impl follows
```

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

트레이스 수동으로 유지:

```ruby
Datadog::Tracing.trace(name, options) do |span, trace|
  trace.keep! # Affects the active trace
  # Method implementation follows
end
```

트레이스 수동으로 제거:

```ruby
Datadog::Tracing.trace(name, options) do |span, trace|
  trace.reject! # Affects the active trace
  # Method implementation follows
end
```

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

{{% tracing-go-v2 %}}

트레이스 수동으로 유지:

```Go
package main

import (
    "log"
    "net/http"
    "github.com/DataDog/dd-trace-go/v2/ddtrace/ext" 
    "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Create a span for a web request at the /posts URL.
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // Always keep this trace:
    span.SetTag(ext.ManualKeep, true)
    //method impl follows

}
```

트레이스 수동으로 제거:

```Go
package main

import (
    "log"
    "net/http"

    "github.com/DataDog/dd-trace-go/v2/ddtrace/ext"
    "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Create a span for a web request at the /posts URL.
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // Always drop this trace:
    span.SetTag(ext.ManualDrop, true)
    //method impl follows
}
```

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

트레이스 수동으로 유지:

```js
const tracer = require('dd-trace')
const tags = require('dd-trace/ext/tags')

const span = tracer.startSpan('web.request')

// Always keep the trace
span.setTag(tags.MANUAL_KEEP)
//method impl follows

```

트레이스 수동으로 제거:

```js
const tracer = require('dd-trace')
const tags = require('dd-trace/ext/tags')

const span = tracer.startSpan('web.request')

// Always drop the trace
span.setTag(tags.MANUAL_DROP)
//method impl follows

```

{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

트레이스 수동으로 유지:

```cs
using Datadog.Trace;

using(var scope = Tracer.Instance.StartActive("my-operation"))
{
    var span = scope.Span;

    // Always keep this trace
    span.SetTag(Datadog.Trace.Tags.ManualKeep, "true");
    //method impl follows
}
```

트레이스 수동으로 제거:

```cs
using Datadog.Trace;

using(var scope = Tracer.Instance.StartActive("my-operation"))
{
    var span = scope.Span;

    // Always drop this trace
    span.SetTag(Datadog.Trace.Tags.ManualDrop, "true");
    //method impl follows
}
```

{{< /programming-lang >}}
{{< programming-lang lang="php" >}}


트레이스 수동으로 유지:

```php
<?php
  $tracer = \DDTrace\GlobalTracer::get();
  $span = $tracer->getActiveSpan();

  if (null !== $span) {
    // Always keep this trace
    $span->setTag(\DDTrace\Tag::MANUAL_KEEP, true);
  }
?>
```

트레이스 수동으로 제거:

```php
<?php
  $tracer = \DDTrace\GlobalTracer::get();
  $span = $tracer->getActiveSpan();

  if (null !== $span) {
    // Always drop this trace
    $span->setTag(\DDTrace\Tag::MANUAL_DROP, true);
  }
?>
```

{{< /programming-lang >}}
{{< programming-lang lang="cpp" >}}

트레이스 수동으로 유지:

```cpp
...
#include <datadog/tags.h>
#include <datadog/trace_segment.h>
#include <datadog/sampling_priority.h>
...

dd::SpanConfig span_cfg;
span_cfg.resource = "operation_name";

auto span = tracer.create_span(span_cfg);
// Always keep this trace
span.trace_segment().override_sampling_priority(int(dd::SamplingPriority::USER_KEEP));
//method impl follows
```

트레이스 수동으로 제거:

```cpp
...
#include <datadog/tags.h>
#include <datadog/trace_segment.h>
#include <datadog/sampling_priority.h>
...

using namespace dd = datadog::tracing;

dd::SpanConfig span_cfg;
span_cfg.resource = "operation_name";

auto another_span = tracer.create_span(span_cfg);
// Always drop this trace
span.trace_segment().override_sampling_priority(int(dd::SamplingPriority::USER_DROP));
//method impl follows
```

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

컨텍스트를 전파하기 전에 수동 유지를 설정하세요. 컨텍스트 전파 이후에 설정하면 여러 서비스 전반에서 전체 트레이스가 유지되지 않을 수 있습니다. 이 결정은 트레이싱 클라이언트 위치에서 설정되기 때문에 샘플링 규칙에 따라 Agent 또는 서버에서 트레이스를 제거할 수 있습니다.


## 단일 스팬 {#single-spans}
`ingestion_reason: single_span`

특정 스팬을 샘플링해야 하지만 전체 트레이스가 필요하지는 않은 경우, SDK를 사용하면 스팬 하나에 대해 샘플링 레이트를 설정할 수 있습니다.

예를 들어 특정 서비스를 모니터링하고 [스팬을 기반으로 메트릭을 빌드][6]하는 경우, 스팬 샘플링 규칙을 구성하여 그러한 메트릭이 100% 애플리케이션 트래픽에만 기반하도록 보장할 수 있고, 서비스를 통과하는 모든 요청의 트레이스를 100% 수집하지 않습니다.

이 기능은 Datadog Agent v[7.40.0][19]+에서 이용할 수 있습니다.

**참고**: 단일 스팬 샘플링 규칙은 [헤드 기반 샘플링](#head-based-sampling)이 유지하는 스팬을 제거하는 데 사용할 수 **없고**, 헤드 기반 샘플링이 제거한 추가적인 스팬을 유지하는 데만 사용할 수 있습니다.

{{< tabs >}}
{{% tab "Java" %}}
SDK [버전 1.7.0][1]부터 Java 애플리케이션의 서비스별 및 작업 이름별 **스팬** 샘플링 규칙을 `DD_SPAN_SAMPLING_RULES` 환경 변수를 사용해 설정합니다.

예를 들어 이름이 `my-service`인 서비스의 스팬 100%를 작업 `http.request`에 대하여 초당 스팬 최대 50개의 레이트로 수집하려면 다음과 같이 설정합니다.

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

생플링 제어에 관한 자세한 내용은 [Java SDK 설명서][2]를 참조하세요.

[1]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.7.0
[2]: /ko/tracing/trace_collection/dd_libraries/java
{{% /tab %}}
{{% tab "Python" %}}
버전 [v1.4.0][1]부터 Python 애플리케이션의 서비스별 및 작업 이름별 **스팬** 샘플링 규칙을 `DD_SPAN_SAMPLING_RULES` 환경 변수를 사용해 설정합니다.

예를 들어 이름이 `my-service`인 서비스의 스팬 `100%`를 작업 `http.request`에 대하여 초당 스팬 최대 `50`개의 레이트로 수집하려면 다음과 같이 설정합니다.

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

생플링 제어에 관한 자세한 내용은 [Python SDK 설명서][2]를 참조하세요.

[1]: https://github.com/DataDog/dd-trace-py/releases/tag/v1.4.0
[2]: /ko/tracing/trace_collection/dd_libraries/python
{{% /tab %}}
{{% tab "Ruby" %}}
버전 [v1.5.0][1]부터 Ruby 애플리케이션의 서비스별 및 작업 이름별 **스팬** 샘플링 규칙을 `DD_SPAN_SAMPLING_RULES` 환경 변수를 사용해 설정합니다.

예를 들어 이름이 `my-service`인 서비스의 스팬 `100%`를 작업 `http.request`에 대하여 초당 스팬 최대 `50`개의 레이트로 수집하려면 다음과 같이 설정합니다.

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

샘플링 제어에 관한 자세한 내용은 [Ruby SDK 설명서][2]를 참조하세요.

[1]: https://github.com/DataDog/dd-trace-rb/releases/tag/v1.5.0
[2]: /ko/tracing/trace_collection/dd_libraries/ruby#sampling
{{% /tab %}}
{{% tab "Go" %}}
버전 [v1.41.0][1]부터 Go 애플리케이션의 서비스별 및 작업 이름별 **스팬** 샘플링 규칙을 `DD_SPAN_SAMPLING_RULES` 환경 변수를 사용해 설정합니다.

예를 들어 이름이 `my-service`인 서비스의 스팬 `100%`를 작업 `http.request`에 대하여 초당 스팬 최대 `50`개의 레이트로 수집하려면 다음과 같이 설정합니다.

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```
버전 [v1.60.0][3]부터 Go 애플리케이션의 리소스별 및 태그별 **스팬** 샘플링 규칙을 `DD_SPAN_SAMPLING_RULES` 환경 변수를 사용해 설정합니다.

예를 들어 리소스 `POST /api/create_issue`의 서비스에서 값이 `high`인 태그 `priority`의 스팬 `100%`를 수집하려면 다음과 같이 설정합니다.

```
@env DD_SPAN_SAMPLING_RULES=[{"resource": "POST /api/create_issue", "tags": { "priority":"high" }, "sample_rate":1.0}]
```

샘플링 제어에 관한 자세한 내용은 [Go SDK 설명서][2]를 참조하세요.

[1]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.41.0
[2]: /ko/tracing/trace_collection/dd_libraries/go
[3]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.60.0
{{% /tab %}}
{{% tab "Node.js" %}}
Node.js 애플리케이션의 경우, 서비스별 및 작업 이름별 **스팬** 샘플링 규칙을 `DD_SPAN_SAMPLING_RULES` 환경 변수를 사용해 설정합니다.

예를 들어 이름이 `my-service`인 서비스의 스팬 `100%`를 작업 `http.request`에 대하여 초당 스팬 최대 `50`개의 레이트로 수집하려면 다음과 같이 설정합니다.

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

샘플링 제어에 관한 자세한 내용은 [Node.js SDK 설명서][1]를 참조하세요.

[1]: /ko/tracing/trace_collection/dd_libraries/nodejs
{{% /tab %}}
{{% tab "PHP" %}}
버전 [v0.77.0][1]부터 PHP 애플리케이션의 서비스별 및 작업 이름별 **스팬** 샘플링 규칙을 `DD_SPAN_SAMPLING_RULES` 환경 변수를 사용해 설정합니다.

예를 들어 이름이 `my-service`인 서비스의 스팬 `100%`를 작업 `http.request`에 대하여 초당 스팬 최대 `50`개의 레이트로 수집하려면 다음과 같이 설정합니다.

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

샘플링 제어에 관한 자세한 내용은 [PHP SDK 설명서][2]를 참조하세요.

[1]: https://github.com/DataDog/dd-trace-php/releases/tag/0.77.0
[2]: /ko/tracing/trace_collection/dd_libraries/php
{{% /tab %}}
{{% tab "C++" %}}
버전 [v0.1.0][1]부터 C++ 애플리케이션의 서비스별 및 작업 이름별 **스팬** 샘플링 규칙을 `DD_SPAN_SAMPLING_RULES` 환경 변수를 사용해 설정합니다.

예를 들어 이름이 `my-service`인 서비스의 스팬 `100%`를 작업 `http.request`에 대하여 초당 스팬 최대 `50`개의 레이트로 수집하려면 다음과 같이 설정합니다.

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

[1]: https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.1.0
{{% /tab %}}
{{% tab ".NET" %}}
버전 [v2.18.0][1]부터 .NET 애플리케이션의 서비스별 및 작업 이름별 **스팬** 샘플링 규칙을 `DD_SPAN_SAMPLING_RULES` 환경 변수를 사용해 설정합니다.

예를 들어 이름이 `my-service`인 서비스의 스팬 `100%`를 작업 `http.request`에 대하여 초당 스팬 최대 `50`개의 레이트로 수집하려면 다음과 같이 설정합니다.

```
#using powershell
$env:DD_SPAN_SAMPLING_RULES='[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]'

#using JSON file   
{
    "DD_SPAN_SAMPLING_RULES": "[{\"service\": \"my-service\", \"name\": \"http.request\", \"sample_rate\": 1.0, \"max_per_second\": 50}]"
}
```

샘플링 제어에 관한 자세한 내용은 [.NET SDK 설명서][2]를 참조하세요.

[1]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.18.0
[2]: /ko/tracing/trace_collection/dd_libraries/dotnet-core
{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-warning">레거시 <a href="/tracing/legacy_app_analytics/">App Analytics</a> 메커니즘은 완전히 사용이 중단되었습니다. 개별 스팬을 수집하려면 <strong>단일 스팬 샘플링</strong>(위의 설명 참조)를 사용하고, 전체 트레이스를 수집하려면 <a href="#head-based-sampling">헤드 기반 샘플링</a>을 사용하세요.</div>

## 제품에서 수집된 스팬 {#product-ingested-spans}

### RUM 트레이스 {#rum-traces}
`ingestion_reason:rum`

웹 또는 모바일 애플리케이션에서 보낸 요청은 백엔드 서비스를 계측할 때 트레이스를 생성합니다. [Real User Monitoring과 APM의 통합][7]으로 웹 및 모바일 애플리케이션 요청을 해당 백엔드 트레이스와 연결하므로, 한눈에 프런트엔드 및 백엔드 데이터 전체를 확인할 수 있습니다.

RUM 브라우저 SDK 버전 `4.30.0`부터 `traceSampleRate` 초기화 파라미터를 구성하여 수집되는 볼륨을 제어하고 백엔드 트레이스의 샘플링을 유지할 수 있습니다. `traceSampleRate`를 `0`~`100`의 숫자로 설정하세요.
`traceSampleRate` 값을 설정하지 않으면 브라우저 요청에서 수신되는 트레이스의 100%(기본값)가 Datadog으로 전송됩니다.

다른 SDK의 트레이스 샘플링 레이트도 제어할 수 있음:

| SDK         | 파라미터             | 최소 버전    |
|-------------|-----------------------|--------------------|
| 브라우저     | `traceSampleRate`     | [v4.30.0][8]       |
| iOS         | `tracingSamplingRate` | [1.11.0][9] _[1.13.0]부터 샘플링 레이트가 Ingestion Control 페이지에서 보고됨[16]_ |
| Android     | `traceSampleRate`   | [1.13.0][10] _[1.15.0]부터 샘플링 레이트가 Ingestion Control 페이지에서 보고됨[17]_ |
| Flutter     | `tracingSamplingRate` | [1.0.0][11] |
| React Native | `tracingSamplingRate` | [1.0.0][12] _[1.2.0]부터 샘플링 레이트가 Ingestion Control 페이지에서 보고됨[18]_  |

### Synthetic 트레이스 {#synthetic-traces}
`ingestion_reason:synthetics` 및 `ingestion_reason:synthetics-browser`

HTTP 및 브라우저 테스트는 백엔드 서비스를 계측할 때 트레이스를 생성합니다. [Synthetic Testing과 APM의 통합][13]은 Synthetic 테스트를 해당 백엔드 트레이스와 연결합니다. 실패한 테스트 실행에서 문제의 근본 원인으로 이동하려면 해당 테스트 실행으로 생성된 트레이스를 보면 됩니다.

기본적으로, Synthetic HTTP 및 브라우저 테스트의 100%가 백엔드 트레이스를 생성합니다.

### 기타 제품 {#other-products}

일부 추가적인 수집 이유는 특정 Datadog 제품에서 생성된 스팬에서 기인합니다.

| 제품    | 수집 이유                    | 수집 메커니즘 설명 |
|------------|-------------------------------------|---------------------------------|
| Serverless | `lambda` 및 `xray`                   | [Serverless 애플리케이션][14]에서 수신되고 Datadog SDK 또는 AWS X-Ray 통합을 사용하여 추적된 트레이스입니다. |
| App and API Protection     | `appsec`                            | Datadog SDK에서 수집되었고 [AAP][15]가 위협으로 플래그한 트레이스입니다. |
| Data Observability: Jobs Monitoring    | `data_jobs`                            | Datadog Java Tracer Spark 통합 또는 Databricks 통합에서 수집된 트레이스입니다. |

## OpenTelemetry의 수집 메커니즘 {#ingestion-mechanisms-in-opentelemetry}
`ingestion_reason:otel`

OpenTelemetry SDK 설정에 따라(OpenTelemetry Collector 또는 Datadog Agent 사용) 수집 샘플링을 제어하는 여러 가지 방법이 있습니다. 다양한 OpenTelemetry 설정의 OpenTelemetry SDK, OpenTelemetry Collector 및 Datadog Agent 수준에서 샘플링에 사용할 수 있는 옵션에 관한 자세한 내용은 [OpenTelemetry를 사용한 수집 샘플링][22]을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/trace_collection/dd_libraries/
[2]: /ko/tracing/trace_pipeline/metrics/
[3]: https://app.datadoghq.com/dash/integration/apm_ingestion_reasons
[4]: /ko/tracing/glossary/#trace-root-span
[5]: /ko/tracing/trace_pipeline/ingestion_controls/
[6]: /ko/tracing/trace_pipeline/generate_metrics/
[7]: /ko/real_user_monitoring/correlate_with_other_telemetry/apm/
[8]: https://github.com/DataDog/browser-sdk/releases/tag/v4.30.0
[9]: https://github.com/DataDog/dd-sdk-ios/releases/tag/1.11.0
[10]: https://github.com/DataDog/dd-sdk-android/releases/tag/1.13.0
[11]: https://github.com/DataDog/dd-sdk-flutter/releases/tag/datadog_flutter_plugin%2Fv1.0.0
[12]: https://github.com/DataDog/dd-sdk-reactnative/releases/tag/1.0.0
[13]: /ko/synthetics/apm/
[14]: /ko/serverless/distributed_tracing/
[15]: /ko/security/application_security/
[16]: https://github.com/DataDog/dd-sdk-ios/releases/tag/1.13.0
[17]: https://github.com/DataDog/dd-sdk-android/releases/tag/1.15.0
[18]: https://github.com/DataDog/dd-sdk-reactnative/releases/tag/1.2.0
[19]: https://github.com/DataDog/datadog-agent/releases/tag/7.40.0
[20]: https://github.com/DataDog/datadog-agent/releases/tag/7.42.0
[21]: /ko/tracing/guide/remote_config/
[22]: /ko/opentelemetry/guide/ingestion_sampling_with_opentelemetry