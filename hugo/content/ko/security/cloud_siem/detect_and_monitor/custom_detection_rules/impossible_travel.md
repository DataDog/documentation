---
disable_toc: false
title: Impossible Travel
---
## 개요 {#overview}

불가능한 이동 방식은 두 액세스 이벤트 사이의 시간에 사람이 이동할 수 있는 거리를 초과하여 떨어진 서로 다른 위치에서 발생한 액세스를 탐지합니다.

불가능한 이동 규칙을 생성하는 자세한 방법은 [규칙 만들기][1]를 참조하세요.

## 불가능한 이동 방식의 작동 원리 {#how-the-impossible-travel-method-works}

### 기준 사용자 위치 {#baseline-user-locations}

{{< img src="security/security_monitoring/detection_rules/impossible_travel_baseline_location.png" alt="기준 위치 옵션이 강조 표시된 불가능한 이동 규칙의 쿼리" style="width:100%;" >}}

불가능한 이동 규칙에 대한 쿼리를 설정할 때, 규칙이 신호를 생성하기 전에 Datadog이 각 사용자의 일반적인 위치를 학습하도록 하려면 {{< ui >}}Baseline User Locations{{< /ui >}}를 활성화할 수 있습니다.

#### 기준 사용자 위치 비활성화 {#baseline-user-locations-disabled}

{{< ui >}}Baseline User Locations{{< /ui >}}가 비활성화된 경우(기본값):

- 각 로그에 이전에 확인된 위치에서 이동이 불가능한 위치가 포함되어 있는지 평가합니다.

- 두 위치 사이의 이동 속도가 1,000km/h를 초과하고 거리가 500km를 초과하면 이동이 불가능한 것으로 간주합니다.

#### 기준 사용자 위치 활성화 {#baseline-user-locations-enabled}

{{< ui >}}Baseline User Locations{{< /ui >}}가 활성화된 경우:

- 각 사용자에 대해 24시간의 학습 기간이 있습니다. 이 기간 동안 Datadog은 각 사용자의 일반적인 위치(도시 및 국가)를 학습하며 신호는 생성되지 않습니다.
- 한 번 확인된 위치가 30일 동안 다시 확인되지 않으면 해당 위치에 대한 정보는 삭제됩니다.
- 새로운 위치가 확인되면 Datadog은 다음 단계를 수행합니다.
    - 해당 위치가 일반적인 위치 중 하나인지 확인합니다. 일반적인 위치 중 하나인 경우 Datadog은 다음 로그나 이벤트로 넘어갑니다.
    - 불가능한 이동 상황인지 확인합니다.
        - 불가능한 이동 상황이 아닌 경우 Datadog은 다음 로그나 이벤트로 넘어갑니다.
        - 불가능한 이동 상황인 경우, Datadog은 IP 전환 패턴이 있는지 확인합니다. 예를 들어, 사용자가 위치 A에서 위치 B로 이동하고 해당 이동 패턴이 과거에 발생한 적이 있다면 신호가 트리거되지 않습니다.

[1]: /ko/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule?cloud_siem_detection_rule_detection_method=impossible_travel