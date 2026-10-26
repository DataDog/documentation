---
algolia:
  tags:
  - custom metrics
description: 태그 규칙을 사용하여 메트릭을 수집 후 선제적으로 구성해 높은 카디널리티를 완화하고 조직 전반에 일관된 태그 관리를 적용하세요.
further_reading:
- link: /account_management/billing/custom_metrics/?tab=countrate
  tag: 설명서
  text: Custom Metrics 청구
- link: /metrics/guide/custom_metrics_governance/
  tag: 가이드
  text: 사용자 지정 메트릭 거버넌스 모범 사례
- link: https://www.datadoghq.com/blog/metrics-without-limits/
  tag: 블로그
  text: Metrics without Limits™를 사용하여 사용자 지정 메트릭 볼륨을 동적으로 제어하기
title: 태그 인덱싱 규칙
---
## 개요 {#overview}

태그 인덱싱 규칙은 Datadog이 메트릭 수집 시 메트릭 태그를 처리하는 방식을 정의하는 중앙 집중식 구성입니다. 이를 통해 어떤 태그를 유지하거나 제외할지 사전에 제어할 수 있으며, 불필요한 태그를 제거하여 높은 카디널리티를 줄이고 조직 전반에서 일관된 태그 사용을 보장할 수 있습니다.

태그 인덱싱 규칙은 이름 또는 접두사로 식별되는 메트릭 그룹에 적용됩니다. 정의된 패턴과 일치하는 기존 메트릭과 새로 수집되는 메트릭 모두에 적용되므로, 사후 정리 작업이나 코드 변경의 필요성을 줄이고 보다 예측 가능한 비용 관리를 지원합니다.

## 태그 규칙 생성 {#create-a-tag-rule}

규칙을 생성하면 Datadog이 일치하는 모든 메트릭에 자동으로 적용합니다.

1. [{{< ui >}}Metrics → Settings{{< /ui >}}][3]로 이동합니다.
2. {{< ui >}}\+ Create Rule{{< /ui >}}을 클릭합니다.
3. {{< ui >}}Configure Tag Indexing Rule{{< /ui >}}을 선택합니다.

{{< img src="metrics/guide/tag_indexing_rules/configure_tag_indexing_rule.png" alt="Metrics Settings의 Create Rule 드롭다운 메뉴에서 Configure Tag Indexing Rule 옵션이 강조 표시된 화면" style="width:50%;">}}

### 1단계:  규칙 세부 정보 설정 {#step-1-set-rule-details}

규칙 이름을 입력하세요. 규칙의 목적을 명확하게 식별할 수 있는 설명적인 이름을 사용하는 것이 좋습니다.

### 2단계:  규칙 범위 정의 {#step-2-define-rule-scope}

규칙을 적용할 메트릭을 선택하세요. 다음 옵션 중 하나 이상을 사용하여 규칙 범위를 정의하세요.

메트릭 이름 또는 접두사
: 특정 메트릭 이름 또는 네임스페이스에 규칙을 적용합니다(예: `http.*`, `db.query.*`).

접두사 예외
: 특정 접두사를 규칙 범위에서 제외합니다(예: `http.*`에는 적용하지만 `http.client.*`은 제외).

{{< img src="metrics/guide/tag_indexing_rules/define_rule_scope.png" alt="Choose Metrics 단계에서 http.*에 규칙을 적용하고 하위 접두사인 http.client.*를 제외한 예시." style="width:80%;">}}

여러 규칙이 동일한 메트릭에 적용되는 경우 Datadog은 순서대로 규칙을 평가합니다. 필요시 {{< ui >}}Override{{< /ui >}} 동작을 사용하여 선택한 메트릭에 대해 이전에 평가된 규칙을 대체할 수 있습니다.

### 3단계: 태그 동작 구성 {#step-3-configure-tag-behavior}

범위 내 메트릭의 태그를 규칙이 어떻게 처리할지 정의하세요.

#### 기존 구성 병합 또는 재정의 {#merge-or-override-existing-configurations}

이 규칙이 기존 태그 구성을 기반으로 동작할지 또는 대체할지를 선택하세요.
- {{< ui >}}Merge{{< /ui >}} (기본값) — 기존 태그 구성에 이 규칙을 추가로 적용합니다. 이전 구성이 없는 메트릭은 영향을 받지 않습니다.
- {{< ui >}}Override{{< /ui >}} — 동일한 접두사에 적용되는 다른 모든 규칙을 무시하고 이 규칙만 적용합니다. 이 동작을 활성화하려면 {{< ui >}}Override all other rules that apply to these prefixes{{< /ui >}} 옵션을 선택하세요.

**참고**: 더 좁은 범위의 규칙에서 **Override** 동작을 사용하면 더 광범위한 규칙의 제외 태그 효과가 누적되는 것을 방지할 수 있습니다. 예를 들어, 규칙 1이 **Merge** 동작을 사용하여 `dd.*`에서 `host`를 제외하고, 규칙 2가 `dd.payments.*`에서 `app_name`을 제외한다고 가정합니다. 규칙 2도 **Merge**를 사용하는 경우 `dd.payments.*` 메트릭에서 `host`와 `app_name`이 모두 제거됩니다. 규칙 2가 **Override**를 사용하는 경우에는 `app_name`만 제거됩니다(해당 접두사에 대해서는 규칙 1의 효과가 무시됨).

#### 새 메트릭에만 적용 {#apply-to-new-metrics-only}

이 규칙을 생성한 이후에 제출되는 메트릭에만 적용합니다. 규칙과 일치하는 기존 메트릭은 변경되지 않습니다.

#### 포함 또는 제외할 태그 선택 {#select-tags-to-include-or-exclude}

태그 필터링을 위해 허용 목록 또는 차단 목록을 사용할지 선택하세요.
- {{< ui >}}Include tags{{< /ui >}} — 조회 가능한 태그의 허용 목록을 사용합니다.
- {{< ui >}}Exclude tags{{< /ui >}} — 차단 목록을 사용하여 조회 불가능한 태그를 정의하거나, 태그 사용량을 사용하여 지난 30, 60, 90일 동안 조회되지 않았고 대시보드나 기타 자산에서 사용되지 않는 태그를 자동으로 인덱싱 해제합니다.

포함하거나 제외하려는 태그 키를 추가하세요.

{{< img src="metrics/guide/tag_indexing_rules/configure_tag_behavior.png" alt="Include tags 옵션이 선택되고 태그 키가 입력된 Choose Tags 단계 화면." style="width:80%;">}}

태그 동작을 구성하면 미리 보기에서 영향을 받는 메트릭 목록(UI 기준 최대 100개)이 표시됩니다.

{{< img src="metrics/guide/tag_indexing_rules/preview_affected_metrics.png" alt="규칙 범위와 일치하는 메트릭 목록이 표시된 Preview affected metrics 패널." style="width:80%;">}}

> 기본적으로 모든 새 규칙은 현재 규칙 세트의 맨 아래에 추가됩니다.

### 제한 사항 {#limitations}

- {{< ui >}}Exclude{{< /ui >}} 규칙은 Datadog이 메트릭에서 해당 태그를 관측한 이후에 적용됩니다.
- Datadog은 규칙을 순차적으로 평가하며, 각 후속 규칙은 이전 구성을 기반으로 하거나 이를 대체합니다.
- **Tag age**: Tag Usage를 사용하는 규칙의 경우, 새 태그는 규칙의 적용을 받기 전 15일의 유예 기간을 갖습니다.

## 규칙 수정 {#modify-a-rule}

[{{< ui >}}Metrics → Settings → Rules{{< /ui >}}][1]로 이동하여 기존 규칙을 수정하세요. 변경 사항을 저장하면 Datadog이 일치하는 모든 메트릭에 자동으로 적용합니다.

### 규칙 편집 {#edit-a-rule}

규칙을 선택하여 세부 정보 패널을 연 후 {{< ui >}}Edit{{< /ui >}}을 클릭하여 규칙 범위, 태그 선택 또는 병합 및 재정의 동작을 변경하세요.

{{< img src="metrics/guide/tag_indexing_rules/edit_rule_configuration.png" alt="규칙 유형, 범위, 작업, 태그 및 옵션이 표시되고 Edit 버튼이 있는 규칙 세부 정보 사이드 패널." style="width:80%;">}}

### 규칙 순서 변경 {#reorder-rules}

규칙을 드래그하여 평가 순서를 변경하세요. 평가 순서는 여러 규칙이 동일한 메트릭에 적용될 때 상호작용 방식을 결정합니다.

### 규칙 삭제 {#delete-a-rule}

더 이상 필요하지 않은 규칙을 삭제하세요. 규칙을 삭제하면 Datadog은 남아 있는 규칙을 기준으로 영향을 받는 메트릭의 태그 구성을 다시 계산합니다.

### 특정 메트릭에 대한 규칙 재정의 {#override-rules-for-a-specific-metric}

메트릭을 태그 규칙 적용 대상에서 제외하려면 Metrics Summary에서 해당 메트릭의 세부 정보 사이드 패널을 열고 {{< ui >}}Configure This Metric Individually{{< /ui >}}를 선택한 후 모든 태그를 유지하도록 설정하세요. 모든 태그를 유지하도록 설정하면 규칙 자체를 수정하지 않고도 해당 메트릭에 대한 모든 태그 규칙을 우회할 수 있습니다.

규칙을 다시 적용하려면 동일한 패널에서 메트릭의 기본 구성을 복원하세요.

## 규칙 우선순위 {#rule-precedence}

여러 규칙이 동일한 메트릭에 적용되면 Datadog은 규칙을 순차적으로 평가합니다. 규칙 순서가 중요한 이유는 다음과 같습니다.

- 평가 순서상 아래에 있는 규칙은 이전 규칙의 결과를 수정합니다.
- {{< ui >}}Override{{< /ui >}} 동작은 일치하는 메트릭에 대한 이전 구성을 덮어씁니다.
- {{< ui >}}Merge{{< /ui >}} 동작은 기존 구성을 기반으로 확장합니다.
- 여러 규칙이 {{< ui >}}Override{{< /ui >}} 동작을 사용하는 경우 마지막으로 적용된 규칙이 최종 구성이 포함 모드인지 제외 모드인지를 결정합니다.

어떤 규칙이 우선 적용되는지 변경하려면 [Rules 페이지][1]에서 규칙 순서를 변경하세요. 다음 예시를 통해 서로 다른 순서가 어떤 결과를 만드는지 확인할 수 있습니다.

## 우선순위 예시 {#precedence-examples}

### 예시 1: Merge 및 Override 동작 {#example-1-merge-and-override-behavior}

태그 규칙은 기존 구성을 재정의하거나 기존 구성과 병합할 수 있습니다. 이 선택에 따라 규칙이 태그 구성을 초기화할지 또는 기존 구성 위에 추가될지가 결정됩니다.

초기 태그:  
`host`, `env`, `service`, `team`

{{< img src="metrics/guide/tag_indexing_rules/merge_vs_override.png" alt="모든 메트릭에서 env 태그를 Override 방식으로 제외하는 규칙 1과, infra 메트릭에 대해 Merge 방식으로 env 태그를 포함하는 규칙 2를 보여주는 다이어그램." style="width:100%;">}}

**핵심 내용**: `env` 태그는 `infra.*` 메트릭에만 다시 추가됩니다.

### 예시 2: 규칙 순서 {#example-2-rule-order}

여러 규칙이 동일한 메트릭에 적용되면 Datadog은 순서대로 평가합니다. 나중에 실행되는 규칙은 이전 규칙의 효과를 세분화하거나 재정의할 수 있습니다.

초기 태그:  
`host`, `env`, `service`

이 예시에서 규칙 2는 {{< ui >}}Include{{< /ui >}} 구성을 사용하며, 이는 허용 목록처럼 동작합니다. 목록에 있는 태그만 유지되고 목록에 없는 태그는 제거됩니다.

#### 순서 1: 구체적인 규칙 먼저 {#order-1-specific-rule-first}

{{< img src="metrics/guide/tag_indexing_rules/rule_order_1.png" alt="infra.server 메트릭에서 호스트 태그를 제외하는 규칙 1이 먼저 실행되고, 이후 모든 infra 메트릭에 대해 호스트 태그를 포함하는 규칙 2가 실행되어 태그가 복원되는 다이어그램." style="width:100%;">}}

**핵심 내용**: 규칙 1이 `host` 태그를 제거한 후 규칙 2가 `host`를 다시 추가합니다.

#### 순서 2: 일반 규칙 먼저 {#order-2-general-rule-first}

{{< img src="metrics/guide/tag_indexing_rules/rule_order_2.png" alt="모든 infra 메트릭에 대해 host 태그를 포함하는 규칙 1이 먼저 실행되고, 이후 infra.server 메트릭에서 host 태그를 제외하는 규칙 2가 실행되어 태그가 제거되는 다이어그램." style="width:100%;">}}

**핵심 내용**: `host` 태그가 마지막에 제거되므로 제거된 상태로 유지됩니다.

### 예시 3: 광범위한 규칙에 대한 예외 {#example-3-exception-to-a-broad-rule}

{{< ui >}}Override{{< /ui >}} 동작을 사용하는 광범위한 규칙으로 특정 태그를 전체적으로 제외한 후, {{< ui >}}Merge{{< /ui >}} 동작을 사용하는 대상 지정 규칙으로 특정 메트릭에 대해 해당 태그를 복원할 수 있습니다.

초기 태그:
`node`, `env`, `pod`

{{< img src="metrics/guide/tag_indexing_rules/broad_exclude_narrow_exception.png" alt="모든 kube 메트릭에서 포드 태그를 제외하는 광범위한 Override 규칙과, kube.node 메트릭에 대해 포드 태그를 다시 포함하는 좁은 범위의 Merge 규칙을 보여주는 다이어그램." style="width:100%;">}}

**핵심 내용**: 광범위한 제외 규칙과 좁은 범위의 포함 규칙이 특정 메트릭에서 서로 상쇄되면 태그 제한이 적용되지 않으며 원래의 모든 태그가 유지됩니다.

### 예시 4: 광범위한 규칙에 대한 여러 예외 {#example-4-multiple-exceptions-to-a-broad-rule}

{{< ui >}}Override{{< /ui >}} 동작을 사용하는 광범위한 규칙 위에 {{< ui >}}Merge{{< /ui >}} 동작을 사용하는 여러 규칙을 추가하여, 서로 다른 메트릭 접두사에 대해 서로 다른 태그를 복원할 수 있습니다. 더 구체적인 접두사와 일치하는 메트릭일수록 더 많은 복원 규칙이 누적 적용됩니다.

초기 태그:
`team`, `pod`, `env`

{{< img src="metrics/guide/tag_indexing_rules/multiple_exceptions.png" alt="모든 태그를 제외하는 광범위한 Override 규칙, 서로 다른 접두사에 대해 서로 다른 태그를 복원하는 2개의 Merge 규칙, 두 접두사에 모두 일치하는 메트릭에 두 태그 세트가 모두 복원되는 모습을 보여주는 다이어그램." style="width:100%;">}}

**핵심 내용**: {{< ui >}}Override{{< /ui >}} 동작을 사용하는 제외 규칙 이후에 적용되는 {{< ui >}}Merge{{< /ui >}} 동작의 여러 포함 규칙은 누적됩니다(2개의 예외 접두사와 모두 일치하는 메트릭은 2가지 규칙의 태그 복원 효과를 모두 받습니다).

## Metrics without Limits™ 호환성 {#metrics-without-limits-compatibility}

기존 [Metrics without Limits™][2](MWL) 메트릭별 구성은 태그 인덱싱 규칙보다 우선하며 예외로 작용합니다. 예외가 활성 상태로 유지되는 동안에는 메트릭이 어떠한 태그 인덱싱 규칙의 영향도 받지 않습니다.

태그 인덱싱 규칙 페이지에서 이러한 예외를 검토하고 제거할 수 있습니다. Datadog은 각 예외를 다음과 같이 분류합니다.

- **제거해도 안전함**: 계정의 태그 인덱싱 규칙에 대한 Datadog의 분석을 기반으로 할 때, 예외를 제거하면 커스텀 메트릭 사용량이 감소할 것으로 예상됩니다.
- **검토 필요**: 예외를 제거하면 커스텀 메트릭 사용량에 영향을 줄 수 있거나, 태그 인덱싱 규칙이 기존 MWL 구성에 포함된 모든 태그를 유지하지 못할 수 있습니다. 해당 태그에 의존하는 대시보드, 모니터 또는 기타 자산이 손상되지 않도록 이러한 예외를 주의 깊게 검토하세요.

예외는 개별 태그 인덱싱 규칙이 아닌 계정 전체에 적용됩니다. 메트릭의 예외를 한 규칙에서 제거하면 계정의 모든 태그 인덱싱 규칙에서 자동으로 제거됩니다. 그러면 해당 메트릭은 현재 순서에 따라 태그 인덱싱 규칙을 기준으로 평가됩니다.

## 모범 사례 {#best-practices}

태그 인덱싱 규칙을 사용자 지정 메트릭 그룹 전반의 인덱싱된 태그를 관리하는 기본 방법으로 사용하세요. 개별 메트릭에 전체 정책과 다른 예외를 의도적으로 적용해야 하는 경우 Metrics without Limits™를 사용하세요.

### 골든 규칙 우선 생성 {#create-the-golden-rule-first}

골든 규칙은 생성되는 첫 번째 태그 인덱싱 규칙이어야 하며 규칙 순서에서 첫 번째로 유지되어야 합니다. 이를 통해 보다 구체적인 규칙이나 메트릭 수준의 예외를 추가하기 전에 골든 규칙을 기준 정책으로 설정할 수 있습니다.

골든 규칙은 다음과 같습니다.
> 지난 30일, 60일 또는 90일 동안 쿼리되지 않았으며 대시보드, 모니터, SLO 또는 노트북과 같은 Datadog 자산에서 사용되지 않는 모든 태그 키를 인덱싱 해제하세요.


골든 규칙을 구성하려면 다음 단계를 따르세요.

1. 다른 태그 인덱싱 규칙을 만들기 전에 이 규칙을 만듭니다. 규칙이 이미 있는 경우 골든 규칙을 첫 번째 위치로 이동하세요.
2. {{< ui >}}Exclude tags{{< /ui >}}를 선택한 다음 {{< ui >}}By tag usage{{< /ui >}}를 선택합니다.
3. 쿼리 기간을 30일, 60일 또는 90일로 설정합니다.
4. 태그 키가 Datadog 자산에서 사용되지 않은 경우에만 적용되도록 설정합니다.
5. `*`를 사용하여 모든 사용자 지정 메트릭에 규칙을 적용합니다.

새로 제출된 태그 키에는 규칙이 사용 여부를 평가하기 전에 15일의 유예 기간이 적용됩니다. 이를 통해 팀은 새 태그가 인덱싱 해제되기 전에 해당 태그를 쿼리하거나 Datadog 자산에서 사용할 수 있습니다.

골든 규칙을 설정한 후 이 기본 정책과 다른 메트릭에 대해서만 범위가 더 좁은 규칙을 만드세요.

{{< img src="metrics/guide/tag_indexing_rules/golden_rule.png" alt="모든 사용자 지정 메트릭에서 쿼리되지 않은 태그 키를 제외하도록 골든 규칙으로 구성된 태그 인덱싱 규칙" style="width:100%;">}}

### 태그 인덱싱 규칙과 Metrics without Limits™ 중 선택 {#choose-between-tag-indexing-rules-and-metrics-without-limits}

태그 인덱싱 규칙은 단일 메트릭, 네임스페이스, 여러 접두사 또는 모든 사용자 지정 메트릭에 적용할 수 있는 동적 정책입니다. 새로운 사용자 지정 메트릭은 수집되는 즉시 기존 규칙에 따라 자동으로 평가됩니다. 규칙과 일치하는 모든 메트릭은 별도로 구성하지 않아도 해당 규칙의 적용을 받습니다.

Metrics without Limits 구성은 정적이며 메트릭별로 개별 적용됩니다. 특정 메트릭에 다른 인덱싱된 태그 세트가 필요한 경우 Metrics without Limits를 사용하세요.

기존 Metrics without Limits™ 구성은 태그 인덱싱 규칙보다 우선합니다. Metrics without Limits™ 구성이 활성화된 동안 해당 메트릭은 예외로 처리되며 태그 인덱싱 규칙의 적용을 받지 않습니다.

| 사용 사례 | 권장 제어 |
|---|---|
| 모든 사용자 지정 메트릭의 기본 인덱싱 정책 수립 | 태그 인덱싱 규칙: 골든 규칙 |
| 네임스페이스나 접두사 집합 전체에 동일한 태그 정책 적용 | 태그 인덱싱 규칙|
| 기존 정책과 일치하는 새 메트릭 및 태그 키 자동 관리 | 태그 인덱싱 규칙|
| 쿼리되지 않고 Datadog 자산에서 사용되지 않는 태그의 인덱싱 해제 | 태그 인덱싱 규칙|
| 여러 메트릭에서 알려진 고카디널리티 태그 제거 | 태그 인덱싱 규칙|
| 여러 메트릭에서 승인된 태그 세트만 유지 | 태그 인덱싱 규칙|
| 하나의 메트릭에 다른 인덱싱된 태그 세트 구성 | Metrics without Limits™|

### 추가 규칙의 범위를 의도에 맞게 지정 {#scope-additional-rules-intentionally}

골든 규칙을 생성한 후 메트릭 그룹의 요구 사항이 기본 정책과 다른 경우에만 범위가 더 좁은 규칙을 추가하세요.

- 동일한 서비스, 애플리케이션 또는 팀이 소유한 메트릭에는 네임스페이스나 접두사를 사용하세요.
- 동일한 정책이 관련 메트릭 그룹에 적용되는 경우 여러 접두사를 사용하세요.
- 정책을 모든 사용자 지정 메트릭에 적용해야 하는 경우에만 `*`를 사용하세요.

명확한 규칙 범위를 정의하고 불필요한 중복을 피하세요. 이를 통해 각 메트릭에 어떤 정책이 적용되는지, 그리고 해당 정책 변경의 담당자가 누구인지 더 쉽게 파악할 수 있습니다.

새 규칙이 추가될 때마다 골든 규칙이 첫 번째 위치에 유지되는지 검증하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/settings/policies
[2]: /ko/metrics/metrics-without-limits/
[3]: https://app.datadoghq.com/metric/settings