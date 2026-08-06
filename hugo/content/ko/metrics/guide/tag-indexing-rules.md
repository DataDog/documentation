---
algolia:
  tags:
  - custom metrics
description: 태그 규칙을 사용하여 메트릭을 수집 후 선제적으로 구성하면 높은 카디널리티를 완화하고 조직 전반에서 일관된 태그 관리를 적용할
  수 있습니다.
further_reading:
- link: /account_management/billing/custom_metrics/?tab=countrate
  tag: 설명서
  text: Custom Metrics 청구
- link: /metrics/guide/custom_metrics_governance/
  tag: 가이드
  text: 사용자 지정 메트릭 거버넌스 모범 사례
- link: https://www.datadoghq.com/blog/metrics-without-limits/
  tag: 블로그
  text: Metrics without Limits™를 사용하여 사용자 지정 메트릭 볼륨을 동적으로 제어
title: 태그 인덱싱 규칙
---
## 개요 {#overview}

태그 인덱싱 규칙은 Datadog이 메트릭 수집 시 메트릭 태그를 처리하는 방식을 정의하는 중앙 집중식 구성입니다. 이를 통해 어떤 태그를 유지하거나 제외할지 사전에 제어할 수 있으며, 불필요한 태그를 제거하여 높은 카디널리티를 줄이고 조직 전반에서 일관된 태그 사용을 보장할 수 있습니다.

태그 인덱싱 규칙은 이름 또는 접두사로 식별되는 메트릭 그룹에 적용됩니다. 정의된 패턴과 일치하는 기존 메트릭과 새로 수집되는 메트릭 모두에 적용되므로, 사후 정리 작업이나 코드 변경의 필요성을 줄이고 보다 예측 가능한 비용 관리를 지원합니다.

## 태그 규칙 생성 {#create-a-tag-rule}

규칙을 생성하면 Datadog이 일치하는 모든 메트릭에 자동으로 적용합니다.

1. [**Metrics → Settings**][3]로 이동합니다.
2. **+ Create Rule**을 클릭합니다.
3. **Configure Tag Indexing Rule**을 선택합니다.

{{< img src="metrics/guide/tag_indexing_rules/configure_tag_indexing_rule.png" alt="Metrics Settings의 Create Rule 드롭다운 메뉴에서 Configure Tag Indexing Rule 옵션이 강조 표시된 화면" style="width:50%;">}}

### 1단계:  규칙 세부 정보 설정 {#step-1-set-rule-details}

규칙 이름을 입력합니다. 규칙의 목적을 명확하게 식별할 수 있는 설명적인 이름을 사용하는 것이 좋습니다.

### 2단계:  규칙 범위 정의 {#step-2-define-rule-scope}

규칙을 적용할 메트릭을 선택합니다. 다음 옵션 중 하나 이상을 사용하여 규칙 범위를 정의합니다.

메트릭 이름 또는 접두사
: 특정 메트릭 이름 또는 네임스페이스에 규칙을 적용합니다(예: `http.*`, `db.query.*`).

접두사 예외
: 특정 접두사를 규칙 범위에서 제외합니다(예: `http.*`에는 적용하지만 `http.client.*`은 제외).

{{< img src="metrics/guide/tag_indexing_rules/define_rule_scope.png" alt="Choose Metrics 단계에서 http.*에 규칙을 적용하고 하위 접두사인 http.client.*를 제외한 예시." style="width:80%;">}}

여러 규칙이 동일한 메트릭에 적용되는 경우 Datadog은 순서대로 규칙을 평가합니다. 선택적으로 **Override** 동작을 사용하여 선택된 메트릭에 대해 이전에 평가된 규칙을 대체할 수 있습니다.

### 3단계: 태그 동작 구성 {#step-3-configure-tag-behavior}

범위 내 메트릭의 태그를 규칙이 어떻게 처리할지 정의합니다.

#### 기존 구성 병합 또는 재정의 {#merge-or-override-existing-configurations}

이 규칙이 기존 태그 구성을 기반으로 동작할지 또는 대체할지를 선택합니다.
- **Merge**(기본값) — 기존 태그 구성 위에 이 규칙을 적용합니다. 이전 구성이 없는 메트릭은 영향을 받지 않습니다.
- **Override** — 동일한 접두사에 적용되는 다른 모든 규칙을 무시하고 이 규칙만 적용합니다. 이 동작을 활성화하려면 **Override all other rules that apply to these prefixes** 옵션을 선택합니다.

**참고**: 더 좁은 범위의 규칙에서 **Override** 동작을 사용하면 더 광범위한 규칙의 제외 태그 효과가 누적되는 것을 방지할 수 있습니다. 예를 들어 규칙 1이 **Merge** 동작을 사용하여 `dd.*`에서 `host`를 제외하고, 규칙 2가 `dd.payments.*`에서 `app_name`을 제외한다고 가정합니다. 규칙 2도 **Merge**를 사용하는 경우 `dd.payments.*` 메트릭에서 `host`와 `app_name`이 모두 제거됩니다. 규칙 2가 **Override**를 사용하는 경우에는 `app_name`만 제거됩니다(해당 접두사에 대해서는 규칙 1의 효과가 무시됨).

#### 새 메트릭에만 적용 {#apply-to-new-metrics-only}

이 규칙을 생성한 이후에 제출되는 메트릭에만 적용합니다. 규칙과 일치하는 기존 메트릭은 변경되지 않습니다.

#### 포함 또는 제외할 태그 선택 {#select-tags-to-include-or-exclude}

태그 필터링을 위해 허용 목록 또는 차단 목록을 사용할지 선택하세요.
- **Include tags** — 조회 가능한 태그의 허용 목록을 사용합니다.
- **Exclude tags** — 조회 불가능한 태그를 정의하는 차단 목록을 사용합니다.

포함하거나 제외하려는 태그 키를 추가합니다.

{{< img src="metrics/guide/tag_indexing_rules/configure_tag_behavior.png" alt="Include tags 옵션이 선택되고 태그 키가 입력된 Choose Tags 단계 화면." style="width:80%;">}}

태그 동작을 구성하면 미리 보기에서 영향을 받는 메트릭 목록(UI 기준 최대 100개)이 표시됩니다.

{{< img src="metrics/guide/tag_indexing_rules/preview_affected_metrics.png" alt="규칙 범위와 일치하는 메트릭 목록을 표시하는 Preview affected metrics 패널." style="width:80%;">}}

### 제한 사항 {#limitations}

- **Exclude** 규칙은 Datadog이 메트릭에서 해당 태그를 관측한 이후에 적용됩니다.
- Datadog은 규칙을 순차적으로 평가하며, 각 후속 규칙은 이전 구성을 기반으로 하거나 이를 대체합니다.

## 규칙 수정 {#modify-a-rule}

기존 규칙을 수정하려면 [**Metrics → Settings → Rules**][1]로 이동합니다. 변경 사항을 저장하면 Datadog이 일치하는 모든 메트릭에 자동으로 적용합니다.

### 규칙 편집 {#edit-a-rule}

규칙을 선택하여 세부 정보 패널을 연 후 **Edit**를 클릭하여 규칙 범위, 태그 선택 또는 병합/재정의 동작을 변경합니다.

{{< img src="metrics/guide/tag_indexing_rules/edit_rule_configuration.png" alt="규칙 유형, 범위, 작업, 태그 및 옵션이 표시되고 Edit 버튼이 있는 규칙 세부 정보 사이드 패널." style="width:80%;">}}

### 규칙 순서 변경 {#reorder-rules}

규칙을 드래그하여 평가 순서를 변경합니다. 평가 순서는 여러 규칙이 동일한 메트릭에 적용될 때 상호 작용 방식을 결정합니다.

### 규칙 삭제 {#delete-a-rule}

더 이상 필요하지 않은 규칙을 삭제합니다. 규칙을 삭제하면 Datadog은 남아 있는 규칙을 기준으로 영향을 받는 메트릭의 태그 구성을 다시 계산합니다.

### 특정 메트릭에 대한 규칙 재정의 {#override-rules-for-a-specific-metric}

메트릭을 태그 규칙 적용 대상에서 제외하려면 Metrics Summary에서 해당 메트릭의 세부 정보 사이드 패널을 열고 **Configure This Metric Individually**를 선택한 후 모든 태그를 유지하도록 설정합니다. 모든 태그를 유지하도록 설정하면 규칙 자체를 수정하지 않고도 해당 메트릭에 대한 모든 태그 규칙을 우회할 수 있습니다.

규칙을 다시 적용하려면 동일한 패널에서 메트릭의 기본 구성을 복원합니다.

## 규칙 우선순위 {#rule-precedence}

여러 규칙이 동일한 메트릭에 적용되면 Datadog은 규칙을 순차적으로 평가합니다. 규칙 순서가 중요한 이유는 다음과 같습니다.

- 평가 순서상 아래에 있는 규칙은 이전 규칙의 결과를 수정합니다.
- **Override** 동작은 일치하는 메트릭에 대한 이전 구성을 덮어씁니다.
- **Merge** 동작은 기존 구성을 기반으로 확장합니다.
- 여러 규칙이 **Override** 동작을 사용하는 경우 마지막으로 적용된 규칙이 최종 구성이 포함 모드인지 제외 모드인지를 결정합니다.

어떤 규칙이 우선 적용되는지 변경하려면 [Rules 페이지][1]에서 규칙 순서를 변경합니다. 다음 예제를 통해 서로 다른 순서가 어떤 결과를 만드는지 확인할 수 있습니다.

## 우선순위 예제 {#precedence-examples}

### 예제 1: Merge 및 Override 동작 {#example-1-merge-and-override-behavior}

태그 규칙은 기존 구성을 재정의하거나 기존 구성과 병합할 수 있습니다. 이 선택에 따라 규칙이 태그 구성을 초기화할지 또는 기존 구성 위에 추가될지가 결정됩니다.

초기 태그:  
`host`, `env`, `service`, `team`

{{< img src="metrics/guide/tag_indexing_rules/merge_vs_override.png" alt="모든 메트릭에서 env 태그를 Override 방식으로 제외하는 규칙 1과, infra 메트릭에 대해 Merge 방식으로 env 태그를 포함하는 규칙 2를 보여주는 다이어그램." style="width:100%;">}}

**핵심 내용**: `env` 태그는 `infra.*` 메트릭에 대해서만 다시 추가됩니다.

### 예제 2: 규칙 순서 {#example-2-rule-order}

여러 규칙이 동일한 메트릭에 적용되면 Datadog은 순서대로 평가합니다. 나중에 실행되는 규칙은 이전 규칙의 효과를 세분화하거나 재정의할 수 있습니다.

초기 태그:  
`host`, `env`, `service`

이 예제에서 규칙 2는 **Include** 구성을 사용하며, 이는 허용 목록처럼 동작합니다. 목록에 있는 태그만 유지되고 목록에 없는 태그는 제거됩니다.

#### 순서 1: 구체적인 규칙 먼저 {#order-1-specific-rule-first}

{{< img src="metrics/guide/tag_indexing_rules/rule_order_1.png" alt="infra.server 메트릭에서 host 태그를 제외하는 규칙 1이 먼저 실행되고, 이후 모든 infra 메트릭에 대해 host 태그를 포함하는 규칙 2가 실행되어 태그가 복원되는 다이어그램." style="width:100%;">}}

**핵심 내용**: 규칙 1이 `host` 태그를 제거한 후 규칙 2가 `host`를 다시 추가합니다.

#### 순서 2: 일반 규칙 먼저 {#order-2-general-rule-first}

{{< img src="metrics/guide/tag_indexing_rules/rule_order_2.png" alt="모든 infra 메트릭에 대해 host 태그를 포함하는 규칙 1이 먼저 실행되고, 이후 infra.server 메트릭에서 host 태그를 제외하는 규칙 2가 실행되어 태그가 제거되는 다이어그램." style="width:100%;">}}

**핵심 내용**: `host` 태그가 마지막에 제거되므로 제거된 상태로 유지됩니다.

### 예제 3: 광범위한 규칙에 대한 예외 {#example-3-exception-to-a-broad-rule}

**Override** 동작을 사용하는 광범위한 규칙으로 특정 태그를 전체적으로 제외한 후, **Merge** 동작을 사용하는 대상 지정 규칙으로 특정 메트릭에 대해 해당 태그를 복원할 수 있습니다.

초기 태그:
`node`, `env`, `pod`

{{< img src="metrics/guide/tag_indexing_rules/broad_exclude_narrow_exception.png" alt="모든 kube 메트릭에서 pod 태그를 제외하는 광범위한 Override 규칙과, kube.node 메트릭에 대해 pod 태그를 다시 포함하는 좁은 범위의 Merge 규칙을 보여주는 다이어그램." style="width:100%;">}}

**핵심 내용**: 광범위한 제외 규칙과 좁은 범위의 포함 규칙이 특정 메트릭에서 서로 상쇄되면 태그 제한이 적용되지 않으며 원래의 모든 태그가 유지됩니다.

### 예제 4: 광범위한 규칙에 대한 여러 예외 {#example-4-multiple-exceptions-to-a-broad-rule}

**Override** 동작을 사용하는 광범위한 규칙 위에 **Merge** 동작을 사용하는 여러 규칙을 추가하여, 서로 다른 메트릭 접두사에 대해 서로 다른 태그를 복원할 수 있습니다. 더 구체적인 접두사와 일치하는 메트릭일수록 더 많은 복원 규칙이 누적 적용됩니다.

초기 태그:
`team`, `pod`, `env`

{{< img src="metrics/guide/tag_indexing_rules/multiple_exceptions.png" alt="모든 태그를 제외하는 광범위한 Override 규칙과, 서로 다른 접두사에 대해 서로 다른 태그를 복원하는 두 개의 Merge 규칙을 보여주는 다이어그램." style="width:100%;">}}

**핵심 내용**: **Override** 동작을 사용하는 제외 규칙 이후에 적용되는 **Merge** 동작의 여러 포함 규칙은 누적됩니다(두 개의 예외 접두사와 모두 일치하는 메트릭은 두 규칙의 태그 복원 효과를 모두 받습니다).

## Metrics without Limits™ 호환성 {#metrics-without-limits-compatibility}

태그 규칙은 기존의 [Metrics without Limits™][2](MWL) 메트릭별 구성을 자동으로 재정의하지 않습니다. 기존 MWL 구성이 우선 적용되며, 태그 규칙을 생성하거나 수정해도 Datadog은 해당 구성을 유지합니다.

특정 메트릭의 MWL 구성이 삭제되면 현재 규칙 순서에 따라 태그 규칙이 자동으로 해당 메트릭에 적용됩니다.

특정 메트릭을 모든 태그 규칙에서 제외하면서 규칙 자체는 유지하려면, 메트릭 세부 정보 사이드 패널에서 모든 태그 유지 옵션을 사용합니다. 규칙을 다시 적용하려면 동일한 패널에서 메트릭의 기본 구성을 복원합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/settings/policies
[2]: /ko/metrics/metrics-without-limits/
[3]: https://app.datadoghq.com/metric/settings