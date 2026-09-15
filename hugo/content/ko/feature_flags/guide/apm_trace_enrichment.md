---
description: 플래그 변형별로 트레이스를 검사하고 필터링할 수 있도록 APM 트레이스에 기능 플래그 평가 데이터를 자동으로 연결하세요.
further_reading:
- link: /feature_flags/server/
  tag: 설명서
  text: 서버 측 Feature Flags
- link: /feature_flags/guide/server_flag_evaluation_metrics/
  tag: 가이드
  text: 서버 측 플래그 평가 메트릭 설정
- link: /tracing/trace_explorer/
  tag: 설명서
  text: Trace Explorer
title: Feature Flags에 대한 APM 트레이스 보강 설정
---
## 개요 {#overview}

APM 트레이스 보강은 APM 트레이스에 기능 플래그 평가 데이터를 자동으로 연결합니다. 추적된 요청 중에 기능 플래그가 평가되면 SDK는 어떤 플래그가 평가되었고 어떤 변형이 반환되었는지 기록합니다. 이 데이터는 루트 스팬에 작성되고 서버 측에서 처리되므로 사용자가 다음을 수행할 수 있습니다.

`@feature_flags.<flag_key>:<variant>` 패싯을 사용하여 [Trace Explorer][1]에서 - **플래그 변형별로 트레이스를 필터링**합니다.
오류 발생 시 활성화 상태였던 플래그를 확인하여 - **플래그 관련 문제를 디버깅**합니다.

<div class="alert alert-warning">APM 트레이스 보강은 실험적 기능이며 향후 릴리스에서 변경될 수 있습니다.</div>

APM 트레이스 보강은 다음 SDK에서 사용할 수 있습니다.

| 언어 | 최소 버전 |
| -------- | --------------- |
| Go       | 2.8.0           |
| Java     | 1.64.1          |
| Node.js  | 5.105.0         |

## 전제 조건 {#prerequisites}

APM 트레이스 보강을 설정하기 전에 다음 사항을 확인하세요.

- 서버 측 기능 플래그가 이미 구성되어 있고 애플리케이션에서 플래그가 평가되고 있습니다.
- [APM 추적][3]이 활성화되어 있고 트레이스가 Datadog으로 흐르고 있습니다.

## APM 트레이스 보강의 작동 방식 {#how-apm-trace-enrichment-works}

APM 트레이스 보강이 활성화되면 Datadog OpenFeature 공급자가 평가 수명 주기에 연결됩니다.

1. 플래그가 평가될 때마다 SDK가 평가 메타데이터(플래그 일련 ID, 타겟팅 키 및 기본 폴백 값)를 캡처합니다.
2. 메타데이터가 현재 트레이스의 루트 스팬에 누적됩니다.
3. 루트 스팬이 완료되면 SDK가 누적된 데이터를 압축된 스팬 태그(`ffe_flags_enc`, `ffe_subjects_enc`, `ffe_runtime_defaults`)로 작성합니다.
4. Datadog 백엔드가 이러한 태그를 디코딩하고 사람이 읽을 수 있는 `@feature_flags.<flag_key>` 패싯을 스팬에 작성하여 Trace Explorer에서 검색할 수 있도록 합니다.

SDK 측 태그는 전송 전용이며 서버 측에서 제거됩니다. Trace Explorer에서 볼 수 있는 태그는 디코딩된 `@feature_flags.<flag_key>` 패싯입니다.

## APM 트레이스 보강 활성화 {#enable-apm-trace-enrichment}

스팬 보강을 활성화하려면 다음 환경 변수를 설정하세요.

{{< code-block lang="bash" >}}
DD_EXPERIMENTAL_FLAGGING_PROVIDER_SPAN_ENRICHMENT_ENABLED=true
{{< /code-block >}}

보강 환경 변수는 지원되는 모든 서버 측 SDK에서 지원됩니다. 코드를 변경할 필요가 없습니다. 이 변수를 활성화하면 Datadog OpenFeature 공급자가 초기화될 때 보강 후크가 자동으로 활성화됩니다. Node.js는 아래의 언어 탭에 나와 있는 대로 코드 수준 구성을 추가적으로 지원합니다.

### 언어별 구성 {#language-specific-configuration}

{{< tabs >}}
{{% tab "Go" %}}

추가 코드 구성은 필요하지 않습니다. `DatadogProvider`가 초기화될 때 `DD_EXPERIMENTAL_FLAGGING_PROVIDER_SPAN_ENRICHMENT_ENABLED` 환경 변수가 스팬 보강을 활성화합니다.

{{< code-block lang="go" filename="main.go" >}}
package main

import (
    "log"

    "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
    ddopenfeature "github.com/DataDog/dd-trace-go/v2/openfeature"
    "github.com/open-feature/go-sdk/openfeature"
)

func main() {
    tracer.Start()
    defer tracer.Stop()

    provider, err := ddopenfeature.NewDatadogProvider(ddopenfeature.ProviderConfig{})
    if err != nil {
        log.Fatalf("Failed to create provider: %v", err)
    }
    if ddProvider, ok := provider.(*ddopenfeature.DatadogProvider); ok {
        defer ddProvider.Shutdown()
    }

    if err := openfeature.SetProviderAndWait(provider); err != nil {
        log.Fatalf("Failed to set provider: %v", err)
    }

    client := openfeature.NewClient("my-service")
    // Flag evaluations now enrich APM spans automatically
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}

추가 코드 구성은 필요하지 않습니다. `DD_EXPERIMENTAL_FLAGGING_PROVIDER_SPAN_ENRICHMENT_ENABLED` 환경 변수가 스팬 보강을 활성화합니다. Java는 대안으로 시스템 속성 `-Ddd.experimental.flagging.provider.span.enrichment.enabled=true`도 지원합니다.

{{< code-block lang="java" filename="Main.java" >}}
import dev.openfeature.sdk.OpenFeatureAPI;
import dev.openfeature.sdk.Client;
import datadog.trace.api.openfeature.Provider;

OpenFeatureAPI api = OpenFeatureAPI.getInstance();
api.setProviderAndWait(new Provider());
Client client = api.getClient("my-app");
// Flag evaluations now enrich APM spans automatically
{{< /code-block >}}

{{% /tab %}}
{{% tab "Node.js" %}}

코드에서 스팬 보강을 활성화할 수도 있습니다.

{{< code-block lang="javascript" filename="app.js" >}}
import tracer from 'dd-trace';

tracer.init({
  experimental: {
    flaggingProvider: {
      enabled: true,
      spanEnrichment: {
        enabled: true,
      },
    },
  },
});
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## APM 트레이스 보강 확인 {#verify-apm-trace-enrichment}

스팬 보강이 활성화된 상태에서 배포한 후 다음 단계를 따르세요.

1. 애플리케이션에서 기능 플래그를 평가하는 요청을 트리거합니다.
2. [Trace Explorer][1]로 이동하고 서비스에서 최신 트레이스를 검색합니다.
3. 트레이스를 열고 루트 스팬에서 `@feature_flags.<flag_key>` 특성을 찾습니다.

SDK는 압축된 인코딩형 태그(`ffe_flags_enc`, `ffe_subjects_enc`, `ffe_runtime_defaults`)를 루트 스팬에 작성합니다. Datadog 백엔드는 이를 디코딩하여 사람이 읽을 수 있는 `@feature_flags.<flag_key>` 패싯을 생성합니다. 이 처리에는 스팬이 수집된 후 몇 초 정도 걸립니다.

백엔드 처리 후 루트 스팬에는 다음 예시와 같은 특성이 포함됩니다.

| 예시 특성 | 예시 값 |
| --------- | ------------- |
| `@feature_flags.checkout-flow` | `treatment` |
| `@feature_flags.dark-mode` | `control` |

각 특성 키는 `@feature_flags.<flag_key>`이며 값은 평가를 통해 반환된 변형입니다.

### 문제 해결 {#troubleshooting}

`@feature_flags.<flag_key>` 특성이 트레이스에 나타나지 않는 경우:

- 스팬 보강이 활성화되어 있는지 확인합니다(`DD_EXPERIMENTAL_FLAGGING_PROVIDER_SPAN_ENRICHMENT_ENABLED=true`).
- 애플리케이션이 추적된 요청 중 플래그를 평가하고 있는지 확인합니다. 보강은 트레이스가 활성화된 상태에서 플래그가 평가될 때만 발생합니다.
- 스팬이 수집된 후 몇 초 정도 기다립니다. `@feature_flags.<flag_key>` 패싯은 백엔드 처리를 통해 파생되며 원시 스팬 메타데이터에 나타나지 않습니다.
- 디버깅을 위해 `ffe_flags_enc` 태그에 대한 원시 스팬 메타데이터를 검사합니다. 이 태그가 있으면 SDK가 보강 데이터를 내보내고 있는 것입니다. 백엔드가 아직 처리하지 않았거나 조직에 기능 플래그 게이트가 활성화되지 않았을 수 있습니다.
- 플래그가 전혀 평가되지 않는 경우, [서버 측 Feature Flags][2]에서 설정 및 언어별 문제 해결 정보를 확인합니다.

## 플래그 변형별 검색 및 필터링 {#search-and-filter-by-flag-variant}

이 예시에서는 `@feature_flags.<flag_key>` 패싯을 사용하여 Trace Explorer에서 트레이스를 필터링합니다.

| 사용 사례 | 예시 쿼리 |
| -------- | ------------- |
| 특정 변형에 대한 트레이스 | `@feature_flags.checkout-flow:treatment` |
| 변형 하의 오류 | `@feature_flags.checkout-flow:treatment status:error` |
| 플래그가 평가된 모든 트레이스 | `@feature_flags.checkout-flow:*` |
| 동일한 요청에 대한 다중 플래그 | `@feature_flags.checkout-flow:treatment @feature_flags.new-search:enabled` |
| 서비스 및 환경으로 범위 지정됨 | `env:production service:api-gateway @feature_flags.rate-limit-v2:enabled` |

## Datadog 전반에서 보강된 트레이스 사용{#use-enriched-traces-across-datadog}

트레이스의 기능 플래그 특성은 Datadog 전반에서 사용할 수 있습니다.

- **모니터링**: 특정 변형에 대한 오류 수가 임계값을 초과할 때 경고하여 변형별 회귀를 캡처합니다.
- **대시보드**: `@feature_flags.<flag_key>`를 그룹화 차원으로 사용하여 변형 간 p99 지연 시간을 비교하는 시계열 위젯을 추가합니다.
- **노트북**: 기능 플래그 변형 간의 성능을 비교하는 조사 노트북을 빌드합니다.
- **시각화**: Trace Explorer에서 상위 목록 보기를 사용하여 롤아웃 트래픽 분산이 타겟팅 규칙과 일치하는지 확인합니다.

## 제한 {#limits}

SDK는 페이로드 크기를 제한하기 위해 다음과 같은 스팬별 제한을 적용합니다.

| 제한 | 값 |
| ----- | ----- |
| 스팬별 플래그 일련 ID | 128~200(SDK에 따라 다름)|
| 스팬별 대상 | 10~25(SDK에 따라 다름)|
| 스팬별 런타임 기본 키 | 5 |
| 런타임 기본 값 길이 | 64자(잘림)|

이 제한을 초과하는 평가는 해당 스팬에서 삭제됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/trace_explorer/
[2]: /ko/feature_flags/server/
[3]: /ko/tracing/