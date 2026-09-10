---
description: 새 값 탐지 방법의 작동 방식에 대해 알아보세요.
title: 새 값
---
## 개요 {#overview}

새 값 탐지 방법은 새 사용자, 계정, API 키 또는 객체 ID와 같이 이전에 목격되지 않은 특성 값이 로그에 나타날 때 경고합니다.

새 값 규칙을 구성하는 방법에 대한 지침은 [규칙 생성][1]을 참조하세요.

## 새 값 탐지 방법의 작동 방식 {#how-the-new-value-detection-method-works}

새 값 탐지 규칙은 다음과 같습니다.

- `@userIdentity.arn` 등 사용자가 선택한 필드의 값을 학습합니다.
- 학습 기간 동안 값을 기록하여 학습하거나 학습 기간이 필요 없는 임계값 방법을 사용합니다. 자세한 내용은 [학습 기간](#learning-duration)을 참조하세요.
- 현재 범위 내에서 관찰되지 않은 값이 나타나면 신호를 트리거합니다.
- [Forget value](#forget-value) 옵션에 설정된 일수 동안 값이 관찰되지 않으면 학습된 값을 잊습니다. 값을 잊은 경우, 해당 값이 다시 나타나면 규칙이 경고합니다.

### 구성 옵션 {#configuration-options}

#### 새 값 탐지 {#detect-new-values}

{{< img src="security/security_monitoring/detection_rules/new_value/detect_new_value.png" alt="Detect new value 설정이 강조 표시된 새 값 규칙의 쿼리" style="width:100%;" >}}

{{< ui >}}Detect new value{{< /ui >}} 필드는 학습할 값을 포함하는 특성을 정의합니다. 최대 5개의 특성을 추가할 수 있습니다.

#### group by 필드 {#group-by-fields}

{{< img src="security/security_monitoring/detection_rules/new_value/group_by.png" alt="group by 필드가 강조 표시된 새 값 규칙의 쿼리" style="width:100%;" >}}

`group by` 필드는 새 값이 평가되는 범위(예: 계정별)를 정의합니다.

#### 학습 기간 {#learning-duration}

{{< img src="security/security_monitoring/detection_rules/new_value/learning_duration.png" alt="학습 기간 설정이 강조 표시된 새 값 규칙의 쿼리" style="width:100%;" >}}

학습 기간에는 다음과 같은 옵션이 있습니다.
- {{< ui >}}for all new values{{< /ui >}}: 규칙이 모든 새 값에서 트리거됩니다.
- {{< ui >}}after the first seen value{{< /ui >}}: 규칙이 값이 한 번 관찰된 후의 모든 새 값에서 트리거됩니다.
- {{< ui >}}after{{< /ui >}}: 선택된 필드에 대해 규칙이 값을 학습하는 기간을 정의합니다. 예를 들어, {{< ui >}}after 7 days{{< /ui >}}를 선택하면 규칙이 처음 7일 동안 값을 학습한 다음 7일 이후의 모든 새 값에서 트리거됩니다. 최대 학습 기간은 30일입니다.

#### Forget Value {#forget-value}

{{< img src="security/security_monitoring/detection_rules/new_value/forget_after.png" alt="값을 잊을 기준 일수를 설정하는 옵션을 보여주는 새 값 규칙의 Other Parameters 섹션" style="width:40%;" >}}

[Forget Value][2] 옵션은 규칙이 값을 알려진 상태로 유지하는 기간을 결정합니다. 이 기간이 지나면 값을 잊고 해당 값이 다시 나타나면 규칙이 경고합니다. {{< ui >}}Forget value{{< /ui >}}의 최대 일수는 30일입니다.

[1]: /ko/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule?cloud_siem_detection_rule_detection_method=new_value
[2]: /ko/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule?cloud_siem_detection_rule_detection_method=new_value&cloud_siem_detection_rule_type=real_time_rule#forget-value-rt-new-value