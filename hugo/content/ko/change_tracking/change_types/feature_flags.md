---
aliases:
- /ko/change_tracking/feature_flags/
description: Datadog에서 Feature Flag 변경 사항을 추적하고 연관성을 분석하며 문제를 해결하여 플래그 업데이트로 인해 발생하는
  문제를 식별하고 해결하는 방법을 알아보세요.
further_reading:
- link: /change_tracking/
  tag: 문서
  text: 변경 추적
- link: /feature_flags/
  tag: 문서
  text: Datadog Feature Flags
- link: /integrations/launchdarkly/#feature-flag-tracking-integration/
  tag: 문서
  text: LaunchDarkly
title: Feature Flag 변경 추적
---
## 개요 {#overview}

Datadog의 Feature Flag 추적은 플래그 변경 사항을 시스템 성능 문제와 연관시켜 인시던트를 더 빠르게 해결하도록 돕습니다. 플래그가 전환, 업데이트 또는 롤아웃되는 시점을 추적함으로써 Feature Flag 변경이 성능 저하나 중단을 유발했는지 파악할 수 있습니다.

Feature Flag 추적을 통해 다음 작업을 수행할 수 있습니다.
- 대시보드, 모니터 및 서비스 페이지에서 플래그 변경 사항 직접 조회
- 플래그 변경의 영향을 받는 서비스를 자동으로 식별
- Datadog 내부에서 직접 문제 있는 플래그 롤백

{{< img src="/change_tracking/monitor.png" alt="모니터 그래프는 플래그 변경과 상관 관계가 있는 오류 급증을 보여줍니다." style="width:100%;" >}}

## Feature Flag 추적 {#track-feature-flags}

Datadog은 [Datadog Feature Flags][8] 자동 추적, LaunchDarkly 통합을 사용한 [LaunchDarkly][1] 플래그 추적 또는 [Events API][3]를 사용하는 다른 공급자의 플래그 추적을 지원합니다.

### Datadog Feature Flags {#datadog-feature-flags}

[Datadog Feature Flags][8]에 대한 변경 추적은 자동으로 활성화됩니다. 추가 설정이 필요하지 않습니다. 환경에서 플래그의 타겟팅, 롤아웃 또는 상태를 업데이트하면 Datadog은 서비스의 Change Tracking 타임라인에 표시되는 변경 추적 이벤트를 내보냅니다.

각 이벤트에 포함되는 정보는 다음과 같습니다.

- 플래그 키 및 이름
- 변경이 발생한 환경(및 프로덕션 환경인지 여부)
- 변경한 사용자
- 이전 값 및 새 값(타겟팅 규칙 및 변형을 포함)
- Datadog에서 Feature Flag로 다시 돌아가는 링크

Datadog Feature Flag 변경 사항을 서비스와 연결하려면 Datadog 추적 라이브러리를 사용하여 [플래그 평가 코드를 계측][4]하세요. Datadog은 결과 APM 트레이스를 사용하여 어떤 서비스가 플래그를 평가하는지 자동으로 탐지합니다. 자세한 내용은 [영향을 받는 서비스 자동 탐지](#automatically-detect-affected-services)를 참조하세요.

### LaunchDarkly 플래그 {#launchdarkly-flags}

서비스의 Change Tracking 타임라인에서 LaunchDarkly Feature Flag를 추적하려면 다음 단계를 따르세요.

1. LaunchDarkly에서 [Datadog 통합][1]을 활성화합니다.
1. LaunchDarkly에서 {{< ui >}}Flags{{< /ui >}} > `<your-feature-flag-name>`(으)로 이동합니다.
1. {{< ui >}}Datadog tags{{< /ui >}}에서 키가 `service`이고 값이 `<your-service-name>`인 태그를 지정하되, 값을 Datadog 서비스 이름과 정확히 일치시키세요.
1. {{< ui >}}Save changes{{< /ui >}}을 클릭합니다.

예를 들어, 아래 예시에서 사용된 `payments_api` 서비스에 플래그를 연결하려면 태그 값을 `payments_api`로 설정합니다. 이벤트를 제출한 후 [Catalog][7]로 이동하여 `payments_api` 서비스를 선택하면 Change Tracking 타임라인에서 `fallback_payments_test` Feature Flag 이벤트를 확인할 수 있습니다.

### 사용자 지정 Feature Flag {#custom-feature-flags}

[Events API][3]를 사용하여 모든 공급자의 Feature Flag 이벤트를 전송합니다. `change` 카테고리 이벤트를 생성하고 서비스 태그를 포함하여 이벤트를 서비스에 연결합니다.

#### 권장 태그 {#recommended-tags}

사용자 지정 Feature Flag 변경 이벤트를 전송할 때 다음 필드를 포함하여 Datadog 내에서 정확한 필터링 및 제품 간 상관관계 분석을 지원하세요.

- `impacted_resources`(`service` 유형): `impacted_resources` 배열에 관련 서비스 이름을 추가하여 Feature Flag 변경 사항을 영향 받는 서비스와 연결합니다.
- `env` 태그: 변경이 발생한 환경(예: production, staging 또는 development)을 지정합니다.

이벤트 생성 시점에 이러한 태그를 추가할 수 없는 경우 자동 보강에 대한 지침은 다음 섹션을 참조하세요.

요청 예시:

```json
{
  "data": {
    "attributes": {
      "aggregation_key": "string",
      "attributes": {
        "author": {
          "name": "datadog@datadog.com",
          "type": "user"
        },
        "change_metadata": {
          "dd": {
            "team": "datadog_team",
            "user_email": "datadog@datadog.com",
            "user_id": "datadog_user_id",
            "user_name": "datadog_username"
          },
          "resource_link": "datadog.com/feature/fallback_payments_test"
        },
        "changed_resource": {
          "name": "fallback_payments_test",
          "type": "feature_flag"
        },
        "impacted_resources": [
          {
            "name": "payments_api",
            "type": "service"
          }
        ],
        "new_value": {
          "enabled": true,
          "percentage": "50%",
          "rule": {
            "datacenter": "devcycle.us1.prod"
          }
        },
        "prev_value": {
          "enabled": true,
          "percentage": "10%",
          "rule": {
            "datacenter": "devcycle.us1.prod"
          }
        }
      },
      "category": "change",
      "message": "payment_processed feature flag has been enabled",
      "tags": [
        "env:test"
      ],
      "timestamp": "string",
      "title": "payment_processed feature flag updated"
    },
    "type": "event"
  }
}
```

## 영향을 받는 서비스 자동 탐지 {#automatically-detect-affected-services}

LaunchDarkly 통합 또는 Events API를 통해 Feature Flag 구성 변경 사항을 추적하는 것 외에도, Datadog은 APM 트레이스 또는 메트릭을 사용하여 어떤 서비스가 플래그를 평가하는지 자동으로 탐지할 수 있습니다. 이는 특히 여러 서비스가 동일한 플래그를 평가할 때 시스템 전반의 플래그 사용을 실시간으로 파악하도록 해줍니다.

### 트레이스 기반 보강 {#trace-based-enrichment}
트레이스 기반 보강은 APM 트레이스를 사용하여 Feature Flag 변경 사항을 관련 Datadog 서비스와 자동으로 연결합니다. 다음 섹션에서는 코드베이스에서 이를 구현하는 방법을 자세히 설명합니다.

#### 설정 {#setup}

Feature Flag를 사용하는 서비스를 자동으로 탐지하려면 Datadog SDK를 사용하여 Feature Flag 평가 코드를 계측하세요. 이를 통해 Datadog은 원래 태그가 지정되지 않았더라도 특정 플래그를 평가하는 모든 서비스를 자동으로 탐지할 수 있습니다.

1. Datadog SDK를 사용하여 [Feature Flag 평가 코드를 계측][4]합니다.
1. Feature Flag 평가를 추적하려면 작업 이름이 `experiments.IsEnabled`인 사용자 지정 스팬을 생성합니다.
3. 스팬에 `experiment_id:<flag-id>` 태그를 지정합니다. 이때 `<flag-id>`는 Feature Flag ID와 일치해야 합니다.

예를 들면 다음과 같습니다.

```python
# Trace feature flag evaluation to enable auto-detection
with tracer.trace("experiments.IsEnabled") as span:
    span.set_tag("experiment_id", "fallback_payments_test") # adds the flag name as a span tag
    # Your existing feature flag evaluation code
    flag_value = evaluate_flag("fallback_payments_test")
    span.set_tag("experiment_value", flag_value) # adds the evaluated flag value as a span tag
```

### 메트릭 기반 보강 {#metrics-based-enrichment}

메트릭 기반 보강은 Datadog 메트릭을 사용하여 서비스 컨텍스트로 Feature Flag 변경 사항을 보강합니다. 다음 섹션에서는 코드베이스에서 이를 구현하는 방법을 설명합니다.

#### 설정 {#setup-1}

실험 상태와 함께 `dd.dynamic_config.is_experiment_enabled` 메트릭을 전송합니다.

```python
from datadog import initialize, statsd

initialize(statsd_host='localhost', statsd_port=8125)

# Any metric type is supported
statsd.gauge(
    'dd.dynamic_config.is_experiment_enabled',
    1,  # 1 if enabled, 0 if disabled
    tags=[
        'experiment.id:fallback_payments_test',
        'service:payments_api'
    ]
)
```

## Workflow Automation으로 Feature Flag 변경 문제 해결 {#remediate-feature-flag-changes-with-workflow-automation}

Feature Flag 변경으로 인해 문제가 발생했음을 확인하면 Datadog을 벗어나지 않고 즉시 플래그 상태를 전환할 수 있습니다. 이 기능은 [Workflow Automation][2]을 사용하여 Change Tracking 타임라인에서 직접 LaunchDarkly 플래그를 전환합니다.

<div class="alert alert-info">이 기능에는 Workflow Automation이 필요합니다. <a href="https://www.datadoghq.com/pricing/?product=workflow-automation#products">Workflow Automation 가격 책정</a>을 참조하세요.</div>

### 설정 {#setup-2}

Workflow Automation을 사용하여 Feature Flag 전환을 설정하려면 다음 단계를 따르세요.

1. [**Actions > Action Catalog > Connections**][6]로 이동합니다.
1. **New Connection**을 클릭합니다.
1. {{< ui >}}LaunchDarkly{{< /ui >}}를 선택합니다.
1. 필수 정보를 입력한 다음 {{< ui >}}Next, Confirm Access{{< /ui >}}를 클릭합니다.
1. 연결에 대한 액세스 권한을 설정합니다.
1. {{< ui >}}Create{{< /ui >}}를 클릭합니다.

### Feature Flag 토글 사용 {#use-feature-flag-toggles}

Datadog 내에서 Feature Flag를 켜거나 끄려면 다음 단계를 따르세요.

1. Change Tracking 타임라인에서 LaunchDarkly Feature Flag 변경 사항을 클릭합니다.
1. {{< ui >}}Toggle Feature Flag{{< /ui >}} 버튼을 클릭합니다.
1. {{< ui >}}Run Action{{< /ui >}}을 클릭하여 워크플로를 실행하고 Feature Flag를 켜거나 끕니다.

{{< img src="/change_tracking/toggle.png" alt="'Toggle Feature Flag' 버튼이 표시된 LaunchDarkly Feature Flag 이벤트의 세부 정보 패널입니다." style="width:90%;" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/launchdarkly/#setup
[2]: https://app.datadoghq.com/actions/connections
[3]: /ko/api/latest/events/
[4]: /ko/tracing/trace_collection/
[5]: https://app.datadoghq.com/apm/settings
[6]: https://app.datadoghq.com/actions/connections
[7]: https://app.datadoghq.com/software
[8]: /ko/feature_flags/