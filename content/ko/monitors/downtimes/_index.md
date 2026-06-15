---
aliases:
- /ko/monitors/notify/downtimes/
cascade:
  algolia:
    subcategory: Downtimes
    tags:
    - downtimes
    - mute monitors
description: Datadog 모니터링에서 특정 시간 동안 경보를 전송하지 않도록 가동 중지 예약
further_reading:
- link: /monitors/guide/suppress-alert-with-downtimes
  tag: 가이드
  text: 가동 중지로 경보 차단
- link: /monitors/guide/scoping_downtimes
  tag: 가이드
  text: 가동 중지 일정의 범위 지정
- link: /monitors/quality/
  tag: 설명서
  text: 오랜 기간 음소거 상태인 모니터링 조회
- link: /monitors/
  tag: 설명서
  text: 모니터링 생성
- link: /monitors/notify/
  tag: 설명서
  text: 모니터링 알림
title: 가동 중지
---
## 개요 {#overview}

모니터링을 트리거하지 않고 시스템 종료, 오프라인 유지보수 또는 업그레이드를 위한 가동 중지를 예약합니다. 가동 중지는 모든 모니터링의 경보 및 알림을 음소거하지만, 모니터링 상태 전환은 방지하지 않습니다.

{{< img src="/monitors/downtimes/downtime_overview.png" alt="가동 중지의 예" style="width:100%;" >}}

## 설정 {#setup}

### 가동 중지 일정 생성 {#create-a-downtime-schedule}

Datadog에서 모니터링 가동 중지를 예약하려면 [**가동 중지 관리**][1] 페이지로 이동합니다. 그런 다음 오른쪽 상단의 **Schedule Downtime** 버튼을 클릭합니다.

개별 모니터링을 해제하려면 모니터링 상태 페이지 상단의 **Mute** 버튼을 클릭합니다. 이렇게 하면 해당 모니터링에 대한 가동 중지 일정이 생성됩니다.

### 음소거할 항목 선택 {#choose-what-to-silence}

특정 모니터링 이름이나 모니터링 태그를 통해 광범위한 모니터링에 가동 중지 일정을 적용합니다. [*그룹 범위*](#downtime-scope)를 통해 추가 필터를 적용합니다. **Preview affected monitors**를 클릭하여 포함된 모니터링을 확인합니다. 더 많은 예제와 사용 케이스는 [가동 중지 일정의 범위 지정][2]을 참조하세요.

**참고**: 가동 중지가 예약된 후 생성되거나 편집된 모니터링은 범위와 일치하는 경우 자동으로 가동 중지에 포함됩니다.

{{< tabs >}}
{{% tab "모니터링 이름별로" %}}

검색하거나 드롭다운 메뉴를 사용하여 음소거할 모니터링을 선택합니다. 필드가 비어 있으면 기본적으로 모든 모니터링이 음소거됩니다. 가동 중지를 특정 호스트, 기기 또는 임의의 태그로 제한할 범위를 선택할 수도 있습니다. **모든 선택된 범위**가 있는 모니터링만 음소거됩니다.
{{% /tab %}}
{{% tab "모니터링 태그 기준" %}}

하나 이상의 [모니터링 태그][3]를 기반으로 가동 중지를 예약합니다. 단일 가동 중지에 선택할 수 있는 최대 태그 수는 32개입니다. 각 태그는 최대 256자까지 가능합니다. **모든 선택된 태그**가 있는 모니터링만 음소거됩니다. 추가 제약 조건을 위해 범위를 선택할 수도 있습니다.

[3]: /ko/monitors/manage/#monitor-tags
{{% /tab %}}
{{< /tabs >}}

#### 가동 중지 범위 {#downtime-scope}
그룹 범위를 사용하여 가동 중지에 추가 필터를 적용하고 어떤 모니터링을 음소거할지 더 많은 제어를 할 수 있습니다. 가동 중지의 그룹 범위는 모니터링 특정 대상을 매칭한 후에 적용됩니다. 모니터링 태그를 사용하여 여러 모니터링 대상을 지정할 경우, 그룹 범위를 매칭하기 전에 태그가 지정된 모니터링 대상을 먼저 찾습니다.

예를 들어, 모든 서비스의 평균 대기 시간을 확인하는 모니터링은 `web-store` 서비스에서 업그레이드를 실행하는 동안 느린 요청과 잠재적인 오류를 겪을 수 있습니다.

`service:web-store` 관련 알림이 음소거되고, 나머지 서비스에 대한 중요한 경보는 정상적으로 전달되도록 하세요. 모니터링 대상을 선택한 후 Downtime의 그룹 범위에 `service:web-store`를 입력합니다.

**참고**: `service` 및 `host`와 같은 여러 차원이 있는 그룹에서도 작동합니다. `service:web-store`에서 Downtime을 생성하면 예를 들어 `service:web-store,host:a` 또는 `service:web-store,host:b`와 같은 해당 서비스를 포함하는 모든 그룹이 음소거됩니다.

#### 가동 중지 범위 구문 {#downtime-scope-syntax}
가동 중지 범위 쿼리는 플랫폼의 많은 다른 제품이 지원하는 동일한 일반 [검색 구문][3]을 따릅니다. 가동 중지의 범위에 모든 그룹을 포함하려면 `*`를 `Group scope`에 입력합니다. 그룹 범위의 추가 예는 다음과 같습니다.

| 가동 중지 그룹 범위 | 설명 |
| ------------------- | ---------------------- |
| `service:web-store`       | `web-store` 서비스에 대한 모든 알림을 음소거합니다. |
| `service:web-store AND env:dev`       | `dev` 환경에서 실행되는 `web-store` 서비스에 대한 모든 알림을 음소거합니다. |
| `env:(dev OR staging)`       | `dev` 또는 `staging` 환경에 관한 모든 알림을 음소거합니다. |
| `service:web-store AND env:(dev OR staging)`       | `dev` 또는 `staging` 환경에서 실행되는 `web-store` 서비스에 관한 모든 알림을 음소거합니다. |
| `host:authentication-*`       | 이름에 `authentication-` 접두사가 있는 호스트에 관한 모든 알림을 음소거합니다. |
| `host:*-prod-cluster`       | 이름에 `-prod-cluster` 접미사가 있는 호스트에 관한 모든 알림을 음소거합니다. |
| `host:*-prod-cluster`       | 이름에 `-prod-cluster` 접미사가 있는 호스트에 관한 모든 알림을 음소거합니다. |
| `service:webstore AND -env:prod`       | `prod` 환경에서 실행되지 **않는** `web-store` 서비스에 관한 모든 알림을 음소거합니다. |

#### 가동 중지 범위 제한 {#downtime-scope-limitations}
다음과 같은 몇 가지 제한 사항이 **지원되지 않음**이 있습니다.

* 와 같은`team:app AND (service:auth OR (service:graphics-writer AND (env:prod OR (type:metric AND status:ok))))` 두 개 이상의 중첩 수준은 지원되지 않습니다. 가동 중지는 최대 두 개의 중첩 수준만 허용됩니다. 대신, 논리를 분해하기 위해 별도의 가동 중지를 사용하세요.
* 부정은 키/값 쌍 및 `OR`가 있는 태그에 대해서만 지원됩니다. 예: `-key:value` 및 `-key(A OR B)`. `-service:(A AND B)`, `service:(-A OR -B)` 또는 `-service(A B)`와 같은 범위는 지원되지 않습니다.
* 최상위 OR은 지원되지 않습니다. 예: `service:A OR service:B`은 유효하지만 `service:A OR host:X`은 작동하지 않습니다. 두 개의 서로 다른 최상위 태그 간의 `OR`는 두 개의 별도 가동 중지가 필요합니다.
* 키 없는 태그는 `prod AND service:(A or B)` 또는 단순히 `prod`을 지원하지 않습니다. 태그는 키를 가져야 하며, 이 경우 예를 들어 `env:prod`입니다.
* 물음표 와일드카드: `service:auth?`는 지원되지 않습니다. 와일드카드를 사용해야 하는 경우 `*`를 대신 사용하세요.
* 키 내의 잘못된 문자: `en&v:prod`는 유효한 가동 중지 범위가 아니며 거부됩니다.

### 가동 중지 일정 설정 {#set-a-downtime-schedule}

#### One Time {#one-time}

시작 날짜, 시간 및 시간대를 입력하여 일회성 가동 중지를 설정하세요. 필요 시, 종료 날짜와 시간을 설정하세요.

{{< img src="monitors/downtimes/downtime_onetime.jpg" alt="1회 가동 중지 예약을 위한 필드" style="width:90%;">}}

#### Recurring {#recurring}

반복되는 가동 중지는 반복적인 관리 주기에 유용합니다. 시작 날짜, 시간, 시간대, 반복 및 기간을 입력하여 정기 가동 중지를 설정하세요. 필요 시, 종료 날짜 또는 발생 횟수를 지정하세요.

정기 가동 중지의 단일 가동 중지가 종료되면, 단일 가동 중지가 취소되고 동일한 제약 조건과 업데이트된 시작 및 종료 시간으로 새로운 가동 중지가 생성됩니다. <br>
**참고**: 원래 생성자는 새로 생성된 모든 가동 중지와 연결됩니다.

{{< img src="monitors/guide/downtime_business_hour_weekend.png" alt="정기 일정을 사용한 가동 중지 구성으로 비즈니스 시간 외 및 주말 동안 경보를 음소거합니다." style="width:100%;" >}}

[반복 규칙][4](RRULEs)를 사용하여 가동 중지 일정을 정의하세요. 정기 규칙을 생성하는 도구로 공식 [RRULE 생성기][5]를 사용하세요. 일반적인 사용 사례는 RRULES를 사용하여 매월 특정 날짜에 가동 중지를 정의하는 것입니다. 예를 들어, 매월 세 번째 월요일에 설정합니다. 반복에 대한 더 많은 사용 사례는 [가동 중지로 경보 억제][6] 가이드를 참조하세요.

**참고**: RRULE에서 기간을 지정하는 특성은 지원되지 않습니다(예: `DTSTART`, `DTEND`, `DURATION`).

## 알림 {#notifications}
### 메시지 추가 {#add-a-message}

이 가동 중지에 대해 팀에 알릴 메시지를 입력하세요. 메시지 필드는 표준 마크다운 형식과 Datadog의 `@-notification` 구문을 허용합니다. 형식 옵션에 대한 자세한 내용은 [Notifications 페이지][7]를 참조하세요.

### 알림 및 자동화 구성 {#configure-notifications-and-automations}

팀 구성원을 지정하거나 메시지를 서비스 [통합][8]으로 전송하여 알림 및 자동화를 설정합니다. Datadog은 가동 중지가 예약, 시작, 취소 또는 만료될 때마다 지정된 목적지로 알림을 보냅니다. 이 감사 알림은 팀이 시스템의 가동 중지를 인지할 수 있도록 합니다.

### 첫 번째 복구 알림 비활성화 {#disable-first-recovery-notification}

기본적으로, Datadog은 모니터링이 가동 중지 **전**에 트리거되고 가동 중지 **중에**복구되는 경우 복구 알림을 전송합니다. 이는 서드파티 통합을 사용하여 열린 인시던트를 자동으로 종료할 때 유용합니다. 체크박스를 선택하면 이러한 알림이 음소거됩니다.

{{< img src="monitors/downtimes/downtime_first_recovery.png" alt="첫 번째 복구 알림을 음소거합니다." style="width:80%;">}}

첫 번째 복구 알림을 비활성화하는 옵션은 여러 가동 중지 간에 누적 적용됩니다. 예를 들어, 여러 가동 중지가 겹쳐 동일 모니터링을 음소거하는 경우, **최소한 하나**의 가동 중지에서 이 옵션이 선택되면 첫 번째 복구 알림이 음소거됩니다.

**참고**: 이 옵션은 **첫 번째** 복구 알림을 음소거합니다. 모니터링이 가동 중지 중에 다시 트리거되어 복구되면, 이 옵션의 설정과 관계없이 해당 알림이 항상 음소거됩니다.

## 관리 {#manage}

[가동 중지 관리 페이지][1]는 활성 및 예약된 가동 중지 목록을 표시합니다. 가동 중지를 선택하여 세부 정보를 보고, 편집하거나 삭제할 수 있습니다. 세부정보에는 생성자, 범위 및 적용되는 모니터링 목록이 포함됩니다.
패싯 패널과 검색창을 사용하여 `Creator`, `Scope`, `Monitor Tags`, 또는 `Active`, `Automuted`, `Recurring` 파라미터에 따라 목록을 필터링합니다.

{{< img src="monitors/downtimes/downtime_manage.png" alt="가동 중지 관리 페이지" style="width:100%;">}}

### 기록 {#history}

가동 중지 내역은 [상태 모니터링][9] 페이지에서 그룹 전환 내역 위에 덮어씌워져 표시되며, [Event Explorer][10]에서 `tags:audit downtime`를 검색하거나 `tags:audit downtime_id:<DOWNTIME_ID>` ID로 특정 가동 중지를 검색할 수 있습니다.

### 음소거 {#muting}

모니터링은 가능한 상태(`ALERT`, `WARNING`, `RESOLVED`, `NO DATA`) 간에 변경될 때 이벤트를 트리거합니다. 모니터링이 음소거되거나 예약된 가동 중지가 있는 경우, `RESOLVED`에서 다른 상태로의 전환은 이벤트나 알림을 트리거하지 **않습니다**.

{{< img src="monitors/downtimes/downtime_on_alert.png" alt="가동 중지 중 경보로 전환되는 모니터링 상태 그래프는 경보 이벤트를 생성하지 않습니다." style="width:80%;">}}

**참고**: 모니터링 상태 페이지에서 모니터링을 음소거하거나 음소거 해제해도 모니터링과 관련된 예약된 가동 중지가 삭제되지 않습니다. 가동 중지를 편집하거나 삭제하려면 [가동 중지 관리][1] 페이지 또는 [API][11]를 사용하세요.

### 만료 {#expiration}

기본적으로, 가동 중지가 만료될 때 모니터링이 경보할 필요가 있는 상태(`ALERT`, `WARNING` 또는 `NO DATA`)에 있으면 모니터링은 새로운 알림을 전송합니다. 이는 가동 중지 중 상태가 변경되는 모니터링(예: `OK`에서 `ALERT`, `WARNING` 또는 `NO DATA`로)와 가동 중지가 시작될 때 이미 경보 상태인 모니터링에 적용됩니다. 가동 중지가 수동으로 취소되면, 모니터링이 경보 필요가 있는 상태에 진입하더라도 알림이 전송되지 않습니다.

기본 동작을 무시하려면, **알림 및 자동화 구성** 섹션의 옵션을 사용하여 가동 중지 종료 시 전송할 알림을 지정하세요. API로 생성된 가동 중지의 경우, 기본 동작은 `Is cancelled` 옵션을 제외하는 것입니다.

{{< img src="monitors/downtimes/downtime_cancel_expire_notification.png" alt="특정 가동 중지 조건을 가진 모니터링의 알림 및 자동화 구성 섹션" style="width:100%;">}}

**예 1:** 가동 중지가 시작되기 *전* 모니터링이 경보 상태이며, 가동 중지 기간 동안 *지속*되는 경우
1. 가동 중지 중에는 이 경보에 대한 알림이 억제됩니다.
2. 모니터링은 경보 상태를 유지합니다(조건이 계속 충족되므로).
3. 가동 중지가 종료됩니다.
4. 경보 조건이 계속 충족되므로, 알림이 전송됩니다.

**예 2:** 가동 중지가 시작되기 *전* 모니터링이 경보 상태에 있으며, 가동 중지 *중* 복구되는 경우
1. 상태가 `ALERT`에서 `OK`로 전환됩니다.
2. 복구 알림은 가동 중지 동안 전송되지만, 해당 가동 중지 동안의 첫 번째 복구에 대해서만 전송됩니다.

### 모니터링 보고서 {#monitor-report}

모니터링이 가동 중지 중이라고 하더라도 [주간 모니터링 보고서][12]에 모든 경보 상태가 포함됩니다.

## 자동 음소거 {#auto-muting}

Datadog은 특정 클라우드 워크로드의 수동 종료와 관련된 모니터링을 사전에 자동 음소거할 수 있습니다. 다음과 같은 종료에 대한 자동 음소거 시나리오가 지원됩니다.

- **[Amazon EC2 인스턴스][13]** 및 CloudWatch API의 호스트 상태를 기반으로 하는 AWS 자동 확장(Auto Scaling)에 의한 인스턴스 종료.
- **[Google Compute Engine(GCE)][14]** 인스턴스 및 GCE API의 호스트 상태를 기반으로 하는 GCE 자동 확장에 의한 인스턴스 종료.
- **[Azure VMs][15]**, 종료가 수동으로 트리거되었거나 Azure 자동 확장(Auto Scaling)에 의해 트리거되었는지에 관계없이, Azure Resource Health API를 통해 제공되는 상태를 기반으로 자동 음소거가 적용됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/downtimes
[2]: /ko/monitors/guide/scoping_downtimes
[3]: /ko/logs/explorer/search_syntax/
[4]: https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html
[5]: https://icalendar.org/rrule-tool.html
[6]: /ko/monitors/guide/suppress-alert-with-downtimes/
[7]: /ko/monitors/notify/#overview
[8]: /ko/integrations/#cat-notification
[9]: /ko/monitors/status/
[10]: /ko/events/explorer
[11]: /ko/api/latest/downtimes/#cancel-a-downtime
[12]: /ko/account_management/#preferences
[13]: /ko/integrations/amazon_ec2/#ec2-automuting
[14]: /ko/integrations/google_compute_engine/#gce-automuting
[15]: /ko/integrations/azure_vm/#automuting-monitors