---
description: 트레이서와 트레이스 수집을 관리하는 Agent의 메커니즘 소개.
further_reading:
- link: /tracing/trace_ingestion/ingestion_controls/
  tag: 설명서
  text: 수집 관리
- link: /tracing/trace_retention/
  tag: 설명서
  text: 트레이스 리텐션
- link: /tracing/trace_retention/usage_metrics/
  tag: 설명서
  text: 메트릭 활용
kind: 설명서
title: 수집(Ingestion) 메커니즘
---

애플리케이션에서 생성된 스팬(span)을 Datadog로 전송할지 여부는 여러 메커니즘에 따라 결정됩니다. 이러한 메커니즘의 바탕이 되는 로직은 [트레이싱 라이브러리][1]와 Datadog Agent에 있습니다. 설정에 따라, 계측된 서비스에서 생성된 트래픽의 전부 또는 일부가 수집(ingest)됩니다.

수집된 각 스팬(span)에는 고유의 **수집 사유**가 있습니다. 이러한 수집 사유는 본 페이지에서 설명하는 메커니즘 중 하나를 근거로 합니다. 사용량 메트릭 `datadog.estimated_usage.apm.ingested_bytes` 및 `datadog.estimated_usage.apm.ingested_spans`는 `ingestion_reason` 태그가 붙어 있습니다.

[Ingestion Reasons 대시보드][2]를 사용해 각 수집 사유를 확인할 수 있습니다. 각 메커니즘에서 발생한 볼륨의 개요를 알아보고 어떤 설정 옵션에 집중해야 하는지 신속하게 파악하는 데 도움이 됩니다.

## 헤드 기반 샘플링

기본 샘플링 메커니즘은 _헤드 기반 샘플링_입니다. 트레이스 유지/제거 여부는 트레이스 시작 시, 즉 [루트 스팬][3] 시작 시 결정됩니다. 이러한 결정은 HTTP 리퀘스트 헤더를 비롯한 리퀘스트 컨텍스트의 일부로서 다른 서비스로 전파됩니다.

유지 여부 판단은 트레이스 처음에 이루어지고 이후 트레이스의 모든 부분에 전달되므로, 트레이스는 확실하게 전체 유지하거나 전체 제거됩니다.

헤드 기반 샘플링의 샘플링 레이트는 다음의 두 곳에서 설정 가능합니다.
- **[Agent](#in-the-agent)** 수준에서(기본)
- **[트레이싱 라이브러리](#in-tracing-libraries-user-defined-rules)** 수준에서: 트레이싱 라이브러리 메커니즘이 Agent 설정보다 우선하여 재정의(오버라이드)됩니다.

### Agent에서
`ingestion_reason: auto`

Datadog Agent는 트레이싱 라이브러리에 샘플링 레이트를 지속 전송하여 트레이스 루트에 적용합니다. Agent는 초당 10개의 트레이스를 목표로 레이트를 조정하고, 트래픽에 따라 서비스에 분배합니다.

예를 들어 서비스 `A`가 `B`보다 트래픽이 많을 경우 Agent는 `A`의 샘플링 레이트를 변경하여 `A`가 매초 7개 이상의 트레이스를 취하지 않도록 합니다. 마찬가지로 `B`의 샘플링 레이트도 변경하여 `B`가 매초 3개의 트레이스를 취하지 않도록 합니다. 이를 통해 매초 총 10개 이상의 트레이스를 취하지 않도록 조절합니다.

Agent 메인 설정 파일(`datadog.yaml`)에서, 또는 환경 변수로서 Agent 목표 초당 트레이스를 설정합니다.
```
@param max_traces_per_second - integer - optional - default: 10
@env DD_APM_MAX_TPS - integer - optional - default: 10
```

### 트레이싱 라이브러리에서: 사용자 정의 규칙
`ingestion_reason: rule`

라이브러리 수준에서 샘플링 설정을 더욱 구체적으로 구성할 수 있습니다.
- Agent의 [기본 메커니즘](#head-based-sampling)을 재정의(오버라이드)하여 모든 루트 서비스에 적용할 구체적인 샘플링 레이트를 설정합니다.
- 특정 루트 서비스용 샘플링 레이트를 설정합니다.
- 매초 수집할 트레이스의 개수에 상한을 설정합니다.

**참조**: 이러한 규칙은 헤드 기반 샘플링 메커니즘도 따릅니다. 어떤 서비스의 트래픽이 설정된 초당 최대 트레이스 수보다 큰 경우 트레이스를 루트로 드롭(제거)합니다. 미완성 트레이스를 생성하지는 않습니다.

설정을 환경 변수로 세팅하거나, 코드에 직접 작성할 수도 있습니다.

{{< tabs >}}
{{< tab "환경 변수" >}}

```
@env  DD_TRACE_SAMPLE_RATE - integer - optional null (defaults to Agent default feedback loop)
@env DD_TRACE_SAMPLING_RULES - integer - optional null
@env  DD_TRACE_RATE_LIMIT - integer - optional 100 (if using the Agent default mechanism, the rate limiter is ignored)
```

{{< /tab >}}
{{< tab "Code API" >}}

다음으로는 전체 트레이스의 10%를 샘플링해, 매초 100 트레이스의 레이트 상한을 걸고, 특정 서비스의 샘플링 레이트를 오버라이드하는 파이썬(Python) 사례를 보여줍니다.
```
# in dd-trace-py
tracer.configure(sampler=DatadogSampler(
    default_sample_rate=0.10, # keep 10% of traces
    rate_limit=100, # but at most 100 traces per second
    rules=[
      # 100% sampled for “my-service”, but the 100 traces-per-second overall limit is still honored
      SamplingRule(sample_rate=1.0, service=’my-service’),
    ],
)
```

{{< /tab >}}
{{< /tabs >}}

수집 설정에 대해 더 자세히 알아보려면 [트레이싱 라이브러리][1] 설명서를 참조하세요.

**참조**: 사용자 정의 규칙으로 설정된 서비스는 [Ingestion Control Page][4] Configuration 열에 `Configured`로 표시됩니다. 기본 메커니즘을 사용하도록 설정된 서비스는 `Automatic`으로 표시됩니다.

## 강제 유지 및 제거
`ingestion_reason: manual`

헤드 기반 샘플링 메커니즘은 트레이싱 라이브러리 수준에서 재정의(오버라이드) 가능합니다. 예를 들어 주요 트랜잭션을 모니터링해야 하는 경우, 관련 트레이스를 강제로 유지할 수 있습니다. 또는, 건강 체크처럼 불필요하거나 반복적인 정보는 강제로 트레이스를 제거할 수 있습니다.

- 스팬(span)에 `ManualKeep`을 설정하여 해당 스팬과 모든 하위(자식) 스팬을 수집하도록 지시합니다. 이 스팬이 트레이스의 루트 스팬이 아닌 경우 결과 트레이스는 UI에서 불완전하게 표시될 수 있습니다.
```
// in dd-trace-go
span.SetTag(ext.ManualKeep, true)
```
- ManualDrop을 설정하면 하위(자식) 스팬이 수집되지 **않습니다**. [오류 및 이상 샘플러](#error-and-rare-traces)는 Agent에서 무시됩니다.
```
span.SetTag(ext.ManualDrop, true)
```

## 싱글 스팬(App Analytics)
`ingestion_reason: analytic`

<div class="alert alert-warning">
2020년 10월 20일, App Analytics는 Tracing without Limits로 대체되었습니다. 이는 레거시 App Analytics와 관련된 설정 정보를 가지나, 더 이상 사용되지 않는 메커니즘입니다. 대신 새로운 설정 옵션의 <a href="#head-based-sampling">헤드 기반 샘플링</a>을 활용해 데이터 수집을 완전히 컨트롤합니다.
</div>

특정 스팬을 샘플링해야 하지만 트레이스 전체를 사용할 필요가 없는 경우, 트레이서에서 싱글 스팬의 샘플링 레이트를 설정할 수 있습니다. 이 스팬은 포함 트레이스가 제거된 경우에도 설정된 레이트 이상으로 수집됩니다.

### 트레이싱 라이브러리에서

애널리틱스(분석) 메커니즘을 사용하려면 환경 변수 또는 코드로 활성화해야 합니다. 또한, 모든 `analytics_enabled` 스팬에 적용되는 샘플링 레이트를 정의해야 합니다.

{{< tabs >}}
{{< tab "환경 변수" >}}

```
@env  DD_TRACE_ANALYTICS_ENABLED - boolean - optional false
```
{{< /tab >}}
{{< tab "Code API" >}}

```
// in dd-trace-go
// set analytics_enabled by default
tracerconfig.WithAnalytics(on bool)
// set raw sampling rate to apply on all analytics_enabled spans
tracerconfig.SetAnalyticsRate(0.4)
```

{{< /tab >}}
{{< /tabs >}}

싱글 스팬에 `analytics_enabled:true` 태그를 붙이세요. 그리고 스팬과 관련된 샘플링 레이트를 지정합니다.
```
// in dd-trace-go
// make a span analytics_enabled
span.SetTag(ext.AnalyticsEvent, true)
// make a span analytics_enabled with a rate of 0.5
s := tracer.StartSpan("redis.cmd", AnalyticsRate(0.5))
```

### Agent에서

Agent에서 추가 레이트 상한은 매초 200 스팬으로 설정되어 있습니다. 상한에 도달하면 일부 스팬이 제거되며 Datadog로 전달되지 않습니다.

Agent 메인 설정 파일(`datadog.yaml`)에서, 또는 환경 변수로 레이트를 설정합니다.
```
@param max_events_per_second - integer - optional 200
@env DD_APM_MAX_EPS - integer - optional 200
```

## 오류(에러) 또는 이상(레어) 트레이스

헤드 기반 샘플링으로 포착하지 못한 트레이스의 경우, **Agent** 메커니즘에서 중요하고 다양한 트레이스를 유지하고 수집하도록 합니다. 두 개의 샘플러는 사전 정의된 태그 세트의 모든 조합을 취하여 다양한 트레이스 세트를 유지합니다.

- **오류 트레이스**: 샘플링 오류는 시스템에서 발생 가능한 오류를 가시화하는 데 중요한 요소입니다.
- **이상 트레이스**: 이상 트레이스를 샘플링하여 트래픽이 적은 서비스와 리소스를 꾸준히 모니터링하고, 시스템 전체의 가시성을 유지할 수 있습니다.

**참조**: [라이브러리 샘플링 규칙](#in-tracing-libraries-user-defined-rules)을 설정한 서비스에서는 오류 및 이상 샘플러를 무시합니다.

### 오류 트레이스
`ingestion_reason: error`

오류 샘플러는 오류 스팬을 포함하나 헤드 기반 샘플링에서 잡아내지 못한 트레이스 일부를 포착합니다. 이는 `service`, `name`, `resource`, `http.status`, `error.type`으로 구성된 모든 조합을 포착할 수 있도록 초당 10 트레이스의 레이트를 분산시킵니다.

Agent 버전이 7.33 이상인 경우 Agent 메인 설정 파일(`datadog.yaml`)에서, 또는 환경 변수로 오류 샘플러를 설정할 수 있습니다.
```
@param errors_per_second - integer - optional - default: 10
@env DD_APM_ERROR_TPS - integer - optional - default: 10
```

**참조**: 파라미터를 `0`으로 설정하면 오류 샘플러가 비활성화됩니다.

### 이상 트레이스
`ingestion_reason: rare`

이상 샘플러는 이상 스팬 세트를 Datadog로 전송합니다. 이상 샘플링은 `env`, `service`, `name`, `resource`, `error.type`, `http.status`로 구성된 조합을 포착하기 위해 레이트를 분산합니다. 이상 트레이스의 경우 기본 샘플링 레이트는 초당 5 트레이스입니다.

Agent 버전이 7.33 이상인 경우 Agent 메인 설정 파일(`datadog.yaml`)에서, 또는 환경 변수로 이상 샘플러를 비활성화할 수 있습니다.

```
@params apm_config.disable_rare_sample - boolean - optional - default: false
@env DD_APM_DISABLE_RARE_SAMPLER - boolean - optional - default: false
```

**참조**: 이 메커니즘은 헤드 기반 샘플링 다운스트림에서 작동하므로, 샘플링된 이상 트레이스가 불완전한 경우도 존재합니다. Agent가 트레이싱 라이브러리에서 완전한 트레이스를 수신한다는 보장은 없습니다.

## 제품 수집 스팬

일부 추가적인 수집 사유는 특정 Datadog 제품에서 생성된 스팬에서 기인합니다.

| 제품    | 수집 사유                    | 수집 메커니즘 설명 |
|------------|-------------------------------------|---------------------------------|
| 신서틱(Synthetic) 모니터링 | `synthetics` 및 `synthetics-browser` | HTTP 또는 브라우저 테스트에서 백엔드 서비스를 계측할 때 트레이스를 생성합니다. 백엔드 트레이스는 [신서틱 테스트][5] 실행 시 찾아볼 수 있습니다.
| 실제 사용자 모니터링(RUM)        | `RUM`                               | 웹 애플리케이션이나 모바일 애플리케이션에서 브라우저 리퀘스트는 백엔드 서비스를 계측할 때 트레이스를 생성합니다. [RUM 브라우저 세션][6]과 리소스에서 백엔드 트레이스를 찾을 수 있습니다. |
| 서버리스 | `lambda` 및 `xray`                   | Datadog 트레이싱 라이브러리 또는 AWS X-Ray 통합에서 트레이스하는 [서버리스 애플리케이션][7]에서 트레이스를 수신합니다. |
| 애플리케이션 보안 모니터링     | `appsec`                            | Datadog 트레이싱 라이브러리에서 가져온 트레이스로, [ASM][8]에서 위험 요소로 플래그를 표시한 트레이스입니다. |


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /kr/tracing/setup_overview/setup/
[2]: https://app.datadoghq.com/dash/integration/apm_ingestion_reasons
[3]: /kr/tracing/visualization/#trace-root-span
[4]: /kr/tracing/trace_ingestion/control_page
[5]: /kr/synthetics/apm/
[6]: /kr/real_user_monitoring/connect_rum_and_traces/
[7]: /kr/serverless/distributed_tracing/
[8]: /kr/security_platform/application_security/