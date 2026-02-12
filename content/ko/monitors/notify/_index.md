---
aliases:
- /ko/monitors/faq/how-do-i-add-custom-template-variables-to-my-monitor-message
- /ko/monitors/faq/how-do-i-setup-conditional-contacts-and-messages-in-a-single-monitor
- /ko/developers/faq/what-do-notifications-do-in-datadog
- /ko/monitors/notifications/
description: 모니터링이 알림을 트리거하면 팀에 알림을 전송하세요.
further_reading:
- link: /monitors/
  tag: 설명서
  text: 모니터링 생성
- link: /monitors/manage/
  tag: 설명서
  text: 모니터링 관리
- link: https://learn.datadoghq.com/courses/alert-monitor-notifications
  tag: 학습 센터
  text: 알림 모니터 알림 커스터마이즈를 위한 수강
title: 알림
---

## 개요

알림은 팀에 문제에 대한 정보를 제공하고 문제 해결을 지원하는 모니터의 핵심 구성 요소입니다. [모니터 생성][1] 시 **알림 및 자동화 구성** 섹션에 추가하세요.

## 알림 및 자동화 설정

**알림 및 자동화 설정** 섹션을 이용해 다음을 수행하세요.
- 이메일, Slack, PagerDuty 및 추가적인 통합을 통해 알림을 팀에 보냅니다.
- 모니터에서 워크플로를 생성하거나 트리거합니다.
- 모니터에 사례를 추가합니다.

### 타이틀

모니터링에 고유한 제목을 추가합니다(필수). 다중 알림 모니터링의 경우 트리거 범위를 식별하는 일부 태그가 자동으로 삽입됩니다. 또한 [태그 변수][2]를 사용할 수도 있습니다.

### 메시지

메시지 필드는 표준 [마크타운 형식][3]과 [변수][4]를 지원합니다. [조건부 변수][5]를 사용해 알림 텍스트를 조절하여 [@notifications](#알림)을 사용해 각기 다른 역락처에 알림 텍스트를 전송할 수 있습니다.

모니터링 메시지의 일반적인 사용 사례는 다음과 같이 단계별 문제 해결 방법을 포함하는 것입니다:

```text
디스크 용량 확보 방법:
1. 사용하지 않는 패키지 삭제
2. APT 캐시 삭제
3. 불필요한 애플리케이션 삭제
4. 중복 파일 삭제
```

### 알림

`@notification`을 사용해 팀 구성원, 통합, 워크플로, 사례를 알림에 추가합니다. 입력을 시작하면 Datadog에서 드롭다운 메뉴로 기존 옵션을 추천합니다. 옵션을 클릭해 알림을 추가합니다. 또는 ****@ 멘션 추가**, **워크플로 추가** 또는 **사례 추가**를 클릭합니다.

**참고**: `@notification`의 경우 대상과 마지막 줄 문자 사이에 공백이 있어야 합니다. 예는 다음과 같습니다.

```text
Disk space is low @ops-team@company.com
```
`@notifications`은 다음에 전송될 수 있습니다.

#### 이메일

{{% notifications-email %}}

#### Teams

알림 채널이 설정되면 알림을 특정 팀에 라우팅할 수 있습니다. @team-handle을 대상으로 하는 모니터 알림은 선택한 커뮤니케이션 채널로 리디렉션됩니다. 팀에 알림 채널을 설정하는 자세한 벙법은 [Teams][6] 설명서를 참조하세요.

#### 통합

{{% notifications-integrations %}}

### 워크플로
[워크플로 자동화][7]를 트리거하거나 모니터링에서 새 워크플로를 만들 수 있습니다. 

모니터에 워크플로를 추가하기 전에 [워크플로에 모니터 트리거를 추가][17]하세요.

모니터 트리거를 추가한 후 [모니터에 기존 워크플로를 추가하거나[8] 새 워크플로를 만듭니다. 모니터 페이지에서 새 워크플로를 만들려면 다음과 같이 하세요.

1. **워크플로 추가**를 클릭합니다.
1. **+** 아이콘을 클릭해 Blueprint를 선택하거나 **처음부터 시작**을 선택합니다.
   {{< img src="/monitors/notifications/create-workflow.png" alt="+ 버튼을 클릭해 새로운 워크플로 추가" style="width:90%;">}}

워크플로 빌드에 대한 자세한 정보는 [워크플로 빌드][9]를 참조하세요.

### 우선순위

모니터와 관련된 우선순위(선택 사항)를 추가합니다. 값 범위는 P1~P5로 P1이 가장 높은 우선순위고 P5가 가장 낮은 우선순위입니다. 알림 메시지에서 모니터 우선순위를 재정의하려면, `{{override_priority 'Pi'}}`를 사용합니다. 이때 `Pi`는 P1~P5 사이입니다.

예를 들어, `alert` 및 `warning` 알림에 대해 각기 다른 우선순위를 설정할 수 있습니다.

```
{{#is_alert}}
{{override_priority 'P1'}}
 ...
{{/is_alert}}
{{#is_warning}}
{{override_priority 'P4'}}
...
{{/is_warning}}
```

### 추가 콘텐츠 토글

모니터링 알림에는 해당 모니터링의 쿼리, 사용한 @ 멘션, 메트릭 스냅샷(메트릭 모니터링용), Datadog의 연관 페이지로 되돌아가는 링크 등의 콘텐츠가 포함됩니다. 개별 모니터링의 경우 알림에서 제외 또는 포함할 콘텐츠를 옵션으로 선택할 수 있습니다.

<div class="alert alert-danger">분포 메트릭 백분위수 집계기(예: `p50`, `p75`, `p95`, 또는 `p99`)를 사용하면 알림에서 스냅샷 그래프를 생성하지 않습니다. </div>

{{< img src="monitors/notifications/monitor_notification_presets.png" alt="모니터링 프리셋 설정" style="width:70%;" >}}

가능한 옵션:

- **기본값**: 숨겨진 콘텐츠가 없습니다.
- **쿼리 숨기기 **: 알림 메시지에서 모니터링 쿼리를 삭제합니다.
- **핸들 숨기기**: 알림 메시지에 사용된 @ 멘션을 삭제합니다.
- **모두 숨기기**: 알림 메시지에 쿼리, 핸들, 스냅샷(메트릭 모니터링용) 또는 바닥글의 추가 링크가 포함되지 않습니다.

**참고**: 통합 설정에 따라 일부 콘텐츠가 기본값으로 표시되지 않을 수도 있습니다.

### 다시 알리기

모니터 다시 알림(선택 사항)을 활성화하여 팀에 문제가 해결되지 않았음을 다시 알릴 수 있습니다.

  {{< img src="monitors/notifications/renotify_options.png" alt="다시 알리기 활성화" style="width:90%;" >}}

다시 알리기 간격, 모니터가 다시 알리는 대상의 모니터 상태(`alert`, `no data` 및 `warn`)를 설정합니다. 부수적으로 전송되는 다시 알림 메시지의 수를 제한하도록 설정할 수 있습니다. 

예를 들어, 모니터를 `stop renotifying after 1 occurrence`로 보내면 기본 알림 이후 하나의 에스컬레이션 메시지를 받게 됩니다.
**참고: 재알림의 [속성 및 태그 변수][2]는 재알림 기간 동안 모니터에서 사용할 수 있는 데이터로 채워집니다.

재알림이 활성화되면 모니터가 특정 기간 동안 선택한 상태 중 하나로 남아 있을 경우 전송되는 에스컬레이션 메시지를 포함할 것인지를 선택할 수 있는 옵션이 있습니다.


에스컬레이션 메시지는 다음 방법으로 추가할 수 있습니다.

* 원본 알림 메시지의 `{{#is_renotify}}` 블록(권장)
* `Configure notifications and automations` 섹션의 *재알림 메시지* 필드
* API 내의 `escalation_message` 속성

`{{#is_renotify}}` 블록을 사용하는 경우 원본 알림 메시지가 재알림에도 포함됩니다. 그러므로 다음을 수행합니다.

1. `{{#is_renotify}}` 블록에 추가되는 상세 설명만 포함해 원본 메시지 상세 정보가 반복되지 않도록 합니다.
2. 그룹 하위 집합에 에스컬레이션 메시지를 전송합니다.

[예시 섹션][12]에서 이러한 사용 사례에 맞게 모니터를 설정하는 방법을 알아보세요.

### 메타데이터

메타데이터(우선순위, 태그, Datadog 팀)을 모니터에 추가하려면 모니터 우선순위를 사용하여 모니터의 중요도를 P 수준(P1~P5)로 설정할 수 있습니다. 메트릭 태그와는 다른 모니터 태그는 UI에서 모니터를 그룹화하고 검색하는 데 사용됩니다. 태그 정책이 설정되면 필수 태그와 태그 값을 추가해야 합니다. 자세한 내용은 [태그 정책][10]을 참조하세요. Datadog Teams는 이 모니터의 소유권 계층을 설정할 수 있도록 해줍니다. 또한 모니터와 연결된 모든 모니터를 확인할 수 있도록 해줍니다. 자세히 알아보려면 [Datadog Teams][11]를 참조하세요.

{{< img src="monitors/notifications/notifications_metadata.png" alt="정책 태그 구성 보기 '정책 태그' 아래에는 '값 선택' 드롭다운 옆에 cost_center, product_id, env라는 세 가지 예시 태그가 있습니다." style="width:100%;" >}}

### 집계

모니터의 쿼리가 그룹화된 경우 알림 그룹에서 하나 이상의 차원을 제거하거나 모두 제거하고 Simple Alert로 알릴 수 있습니다.

{{< img src="monitors/notifications/notifications_aggregation.png" alt="다중 경고로 설정된 집계 구성 뷰" style="width:100%;" >}}

[모니터 구성][18]에서 이 기능에 대한 자세한 내용을 확인하세요.


## 감사 알림

모니터가 생성, 수정, 무음 또는 삭제될 때마다 감사 [이벤트][13]가 생성됩니다. **권한 및 감사 정의 알림** 섹션에서 **알림**을 선택하여 팀원, 채팅 서비스, 그리고 모니터 생성자(이벤트)에게 알립니다.

## 알림 테스트

테스트 알림은 호스트, 메트릭, 이상, 아웃라이어(outlier), 예측, 로그, 럼, 애플리케이션 성능 모니터링(APM), 통합 (점검만), 프로세스 (점검만), 네트워크 (점검만), 커스텀 점검, 이벤트 및 컴포짓과 같은 [모니터 유형][14]에 대해 지원됩니다. 

### 테스트 실행

1. 모니터링을 정의한 후 모니터링 페이지 우하단의 **알림 테스트** 버튼으로 해당 알림을 테스트합니다.

2. 테스트 알림 팝업에서 테스트할 모니터 전환과 그룹을 선택합니다. 쿼리에 [그룹화][15]가 있는 경우에만 사용 가능). 경고 조건에 지정된 임계값에 대해 모니터의 설정에서 사용할 수 있는 상태만 테스트할 수 있습니다. [복구 임계값][16]은 모니터가 더 이상 경고 상태가 아니거나 경고 조건이 없는 경우 Datadog가 이 복구 알림을 전송하므로 예외입니다.

    {{< img src="/monitors/notifications/test_notification_modal.png" alt="이 모니터에 대한 알림 테스트" style="width:70%;" >}}

3. **테스트 실행**을 클릭하여 팀원과 모니터링에 명시한 서비스에 알림을 전송합니다.

### 이벤트

알림 테스트 기능은 이벤트 탐색기에서 검색할 수 있는 이벤트 을 생성합니다. 해당 알림은 알림 제목에 `[TEST]`을 사용하여 누가 테스트를 시작했는지 메시지 바디에 표시합니다.

태그 변수는 Datadog 자식 이벤트의 텍스트에서만 채워집니다. 부모 이벤트의 경우 집계 요약만 표시합니다.

### 변수 {#variables-test-notification}

예를 들어, 메시지 변수는 모니터링이 정의한 범위에 따라 무작위로 선택한 그룹으로 자동 채워집니다. 다음은 예시입니다.

```text
{{#is_alert}}
{{host.name}} <-- 채워짐
{{/is_alert}}
```
## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/monitors/configuration
[2]: /ko/monitors/notify/variables/?tabs=is_alert#attribute-and-tag-variables
[3]: http://daringfireball.net/projects/markdown/syntax
[4]: /ko/monitors/notify/variables/
[5]: /ko/monitors/notify/variables/#conditional-variables
[6]: /ko/account_management/teams/#send-notifications-to-a-specific-communication-channel
[7]: /ko/service_management/workflows/
[8]: /ko/service_management/workflows/trigger/#add-the-workflow-to-your-monitor
[9]: /ko/service_management/workflows/build/
[10]: /ko/monitors/settings/#tag-policies
[11]: /ko/account_management/teams/
[12]: /ko/monitors/notify/variables/?tab=is_renotify#examples
[13]: /ko/events/
[14]: /ko/monitors/types
[15]: /ko/monitors/configuration/
[16]: /ko/monitors/guide/recovery-thresholds/
[17]: /ko/service_management/workflows/trigger/#add-a-monitor-trigger-to-your-workflow
[18]: /ko/monitors/configuration/#set-alert-aggregation