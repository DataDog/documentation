---
disable_toc: false
further_reading:
- link: /monitors/downtimes
  tag: 설명서
  text: 다운타임 개요
- link: /monitors/manage/search
  tag: 설명서
  text: 모니터 검색을 위한 쿼리 구문
- link: /monitors/guide/suppress-alert-with-downtimes
  tag: 가이드
  text: 다운타임 API 및 UI를 통해 경고 억제
title: 다운타임 범위 지정
---

## 개요

모니터를 트리거하지 않고 시스템 종료, 오프라인 유지 관리 또는 업그레이드를 위해 다운타임이 예약됩니다. 다운타임은 모든 모니터 경고 및 알림을 무음으로 설정하지만 모니터 상태 전환을 방해하지는 않습니다.

대부분의 경우 예약된 유지 관리와 관련이 없는 중요한 알림을 누락할 위험이 있기 때문에 **모든** 모니터 알림을 음소거하는 것을 원치 않을 것입니다.

이 가이드에서는 UI를 통해 다운타임의 범위를 적절하게 설정하는 방법을 설명합니다. 다운타임의 범위 설정은 2단계로 이루어집니다:
1. [다운타임을 적용할 모니터를 선택합니다.](#choose-which-monitors-to-silence)
2. [쿼리 범위를 지정하여 _exact_ 알림을 필터링한다음 각 모니터에 대해 음소거합니다.](#granularly-scope-downtimes)

## 음소거할 모니터 선택

다운타임의 대상이 될 모니터를 정의합니다. 하나의 특정 모니터, 다중 모니터 또는 모든 모니터를 대상으로 하는 세 가지 옵션이 있습니다.


### 하나의 특정 모니터를 대상

특정 모니터 하나를 일시적으로 음소거하도록 선택할 수 있습니다. 예를 들어, 모니터가 현재 많은 경고를 보내고 있거나 예정된 유지 관리의 영향을 받는 유일한 모니터인 경우입니다.

다운타임 설정에서 **By Monitor Name**을 선택하고 해당 모니터를 검색합니다.

### 모니터 태그를 기반으로 여러 모니터를 대상

<div class="alert alert-info">모니터 태그는 Agent 가 전송한 태그나 통합, 쿼리 중인 데이터에 할당된 태그와는 별개입니다.</div>

모니터 태그를 기반으로 모니터에 대한 다운타임을 예약할 수 있으며 모니터 쿼리에 그룹화된 태그별로 범위를 좁힐 수 있습니다. `By Monitor Tags`를 선택하고 대상으로 지정할 모니터 태그를 입력합니다.

**참고**: 태그는 추가적인 부분이며, `env:dev team:automations`의 입력은 `env:dev` 및 `team:automations` **모두**와 함께 태그가 지정된 모니터를 대상으로 함을 의미합니다.

### 모든 모니터 대상

`By Monitor Name`또는 `By Monitor Tags`옵션 모두에 대해 `All Monitors` 라벨이 지정된 드롭다운 메뉴에서 첫 번째 항목을 선택하여 모든 모니터를 대상으로 범위를 지정할 수 있습니다.

## 다운타임 범위를 세분화

그룹 범위를 사용하여 다운타임에 추가 필터를 적용하고 음소거할 모니터를 세밀하게 제어할 수 있습니다. 다운타임의 그룹 범위는 모니터 특정 대상에 **따라** 일치합니다. 모니터 태그를 사용하여 여러 모니터를 대상으로 지정하는 경우, 먼저 그룹 범위와 일치하기 전에 해당 태그가 지정된 모니터를 찾아야 합니다.

이 가이드의 예시는 [다중 알림 그룹화][2]가 설정된 모니터에 `Group scope`을 어떻게 적용하는지 보여줍니다

### 특정 태그에 대한 모니터 음소거

1. 한 그룹에서만 다운타임을 예약하려면(`service:web-store`인 경우) `Group scope`필드에 해당 그룹을 입력합니다.
2. **Preview effected monitors**를 클릭하여 선택한 모니터가 여전히 범위 내에 있는지 확인합니다. 그러면 예약된 다운타임 동안 `service:web-store` 그룹에 대한 경고가 음소거됩니다.

{{< img src="monitors/downtimes/downtime_example_byname.png" alt="영향을 받는 모니터의 미리 보기가 포함된 '모니터 이름별' 다운타임 예" style="width:90%;">}}

예약된 다운타임이 시작되면 `service:web-store` 그룹에 대한 알림만 이 모니터에서 음소거됩니다.

{{< img src="monitors/downtimes/downtime_examplebyname1_monitor.png" alt="그룹 service:web-store에 대한 다운타임을 보여주는 평가 그래프" style="width:90%;">}}

`service:web-store` 태그가 포함된 모든 알림을 음소거합니다. 예를 들어:

| 모니터 그룹                | 음소거됨 |
| ---------------------------  | --- |
| `host:A`, `service:web-store`| 예 |
| `host:A`, `host:B`, `service:synthesizer`, `service:demo`, `service:web-store`| 예 |
| `host:A`, `host:B`, `service:synthesizer`| 아니요 (`service:web-store` 누락) |


### 여러 태그에 범위를 지정하는 모니터 음소거

1. 여러 그룹(예: `service:web-store`및 `env:prod`)에서 다운타임을 예약하려면 `Group scope` 필드에 해당 그룹을 입력합니다.
2. **Preview affected monitors**를 클릭하여 범위에 있는 모니터를 확인합니다.
3. 예약된 다운타임이 시작되면 그룹에 대한 경고가 음소거됩니다:
`env:prod` **및** `service:web-store`

| 모니터 그룹                                                                    | 음소거됨 |
| -----------                                                                      | ----  |
| `env:prod`, `service:web-store`                                                  | 예 |
| `env:prod`, `env:dev`, `service:synthesizer`, `service:demo`, `service:web-store`| 예 |
| `env:dev`, `env:demo`, `service:web-store`                                       | 아니요 (`env:prod` 누락) |
| `env:prod`, `env:demo`, `service:synthesizer`                                    | 아니요 (`service:web-store` 누락) |


### 태그 결합으로 모니터 음소거

여러 태그 값을 더 복잡한 범위로 결합하려면 단일 다운타임에 `OR` 결합을 사용하세요. 예를 들어 개발 또는 준비 환경과 관련된 모든 알림을 음소거하려고 합니다. `env:(dev OR staging)`을 범위 쿼리로 사용하세요.

**참고**: 서로 다른 태그(예: `env:dev OR service:web-store`)의 결합은 지원되지 않으므로 이 경우 각 태그에 대해 별도의 다운타임을 만들어야 합니다.

쿼리 `env:(dev OR staging)`
| 모니터 그룹                                                                    | 음소거됨 |
| -----------                                                                      | ----  |
| `env:staging`, `service:web-store`                                               | 네 |
| `env:dev`, `env:prod`, `service:web-store`                                       | 네 |
| `env:demo`, `env:staging`, `service:web-store`                                   | 네 |
| `env:demo`, `env:prod`, `service:web-store  `                                    | 아니요 (`env:dev` 및 `env:staging` 모두 누락) |

### 와일드카드 범위가 있는 모니터 음소거

인프라스트럭처 내에서 대규모 업그레이드를 실행하는 것은 드문 일이 아닙니다. 다운타임은 추가 스크립팅 없이 영향을 받는 모든 엔터티를 음소거하는 데 도움이 될 수 있습니다. 예를 들어 특정 서비스의 모든 호스트를 업그레이드할 수 있습니다. 이러한 호스트는 관련 애플리케이션 접두사가 붙는 등 조직의 특정 명명 규칙을 따를 수 있습니다. 이로 인해 `host:mydemoapplication-host-1` 및 `host:mydemoapplication-host-2`와 같은 이름의 호스트가 수백 개 생성될 수 있습니다.

`host:mydemoapplication-*`에 의해 범위를 지정하는 다운타임을 만듭니다. 이렇게 하면 접두사가 붙은 모든 호스트가 일치하고 음소거됩니다. 또한 `host:*-mydemoapplication`에 의해 범위를 지정하는 다운타임을 역으로 적용할 수도 있습니다. 이는 `mydemoapplication`로 끝나는 모든 호스트와 일치하고 음소거합니다.

### 음소거 대상에서 그룹 제외하기

여러 환경에서 애플리케이션 및 인프라를 실행하는 경우 하나의 프로덕션 환경과 여러 비프로덕션 환경(예: 테스트, 회귀 검사 또는 데모)이 있을 수 있습니다. 비프로덕션 환경에 대한 알림을 받지 않으려면 다운타임의 범위를 `env:* -env:prod`로 설정하세요. 이 범위는 `env` 태그가 설정된 모든 알림을 대상으로 한 다음 프로덕션 환경을 보조 단계로 제외합니다.

### 동일한 태그로 범위가 지정된 여러 모니터

1. *모니터 A*는 여러 `service` 그룹의 평균 메트릭을 보고하는 호스트를 위한 다중 알림 모니터입니다.
2. *모니터 B*는 `service:web-store`에 대한 동일 메트릭을 보고하는 호스트를 위한 다중 알림 모니터입니다.
3. `downtime:true` 모니터 태그가 있는 모든 모니터에 다운타임이 예약됩니다.
4. 이 다운타임은 `service:web-store` 그룹으로 제한됩니다. 
5. **Preview effected monitors**를 클릭하여 범위 내에 있는 모니터를 확인합니다. 이 예에서는 두 모니터 모두 범위 내에 그룹 `service:web-store`이 있는 것으로 표시됩니다.

{{< img src="monitors/downtimes/downtime_examplebytag1_downtime.png" alt="영향을 받는 모니터링의 미리 보기를 포함한 '모니터 태그별' 다운타임 예시" style="width:80%;">}}

6. *모니터 A*는 다운타임이 범위 내 그룹에 한해서 시작되었음을 나타냅니다: `service:web-store`

{{< img src="monitors/downtimes/downtime_examplebytag1_monitor.png" alt="그룹 service:web-store에 대한 다운타임을 보여주는 평가 그래프" style="width:80%;">}}

7. *모니터 B*는 `service:web-store`에 대한 다운타임이 시작된 것을 보여줍니다. 모든 모니터의 (`host`별) 그룹이 `service:web-store`에 속하기 때문에, 결과적으로 해당 모니터의 다운타임 동안 모든 호스트가 음소거됩니다.

{{< img src="monitors/downtimes/downtime_examplebytag1_monitor2.png" alt="그룹 service:web-store 및 영향을 받는 두 호스트 모두에 대한 다운타임을 보여주는 평가 그래프" style="width:80%;">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/monitors/manage/#monitor-tags
[2]: /ko/monitors/configuration/#multi-alert
[3]: /ko/monitors/manage/search/