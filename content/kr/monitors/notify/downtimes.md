---
aliases:
- /kr/monitors/downtimes/
description: 'Datadog 모니터에서 특정 시간 동안 경고를 전송하지 않도록 다운타임을 예약합니다 '
further_reading:
- link: /monitors/
  tag: 설명서
  text: 모니터 생성
- link: /monitors/notify/
  tag: 설명서
  text: 모니터 알림
- link: /monitors/manage/
  tag: 설명서
  text: 모니터 관리
kind: 설명서
title: 다운타임
---

모니터를 작동하지 않고 시스템 종료, 오프라인 유지 관리 또는 업그레이드를 하기 위해 다운타임을 예약합니다. 다운타임 시에는 모든 모니터의 경고 및 알림이 꺼지지만 모니터 상태 전환은 유지됩니다. 

## 예약

Datadog에서 [모니터 다운타임][1]을 예약하려면 탐색바를 사용하세요: _모니터 –> 다운타임 관리_. 그리고 오른쪽 상단의 **다운타임 예약하기** 버튼을 클릭하세요. 

### 음소거 항목 선택하기

{{< tabs >}}
{{% tab "By Monitor Name" %}}

드롭다운을 검색하거나 사용하여 음소거할 모니터를 선택합니다. 필드를 비워두면 기본적으로 모든 모니터가 음소거됩니다. 다운타임 범위를 선택하여 특정 호스트, 장치 또는 임의 태그로 제한할 수도 있습니다. 그러면 **모든 선택 범위**에 해당하는 모니터만 음소거됩니다.

{{% /tab %}}
{{% tab "By Monitor Tags" %}}

하나 이상의 [모니터 태그][1]를 기반으로 다운타임을 예약합니다. 32개의 태그 한도 중 하나 이상의 태그를 선택하세요. 각 태그의 길이는 최대 256자 입니다. **모든 선택 태그**에 해당하는 모니터만 음소거됩니다. 추가 제한 조건에 대한 범위도 선택할 수 있습니다.

[1]: /kr/monitors/manage/#monitor-tags
{{% /tab %}}
{{< /tabs >}}

범위 제한이 있는 모니터의 음소거를 선택한 경우 **지정된 모니터 미리 보기**를 클릭하여 포함된 모니터를 확인합니다. 다운타임 예약 후에 생성되거나 편집된 모든 모니터는 범위에 일치하는 경우 다운타임에 자동 포함됩니다.

#### 다운타임 범위

단순 경보 모니터를 위해  다운타임을 예약한 경우, 단순 경보 모니터가 모든 보고 소스를 집계하여 단일 경보를 전송하므로 `Group scope`필드는 무시할 수 있습니다. 

다중 경보 모니터가 포함된 경우, 범위에 적용된 해당 그룹에 대해서만 음소거됩니다. 예를 들어, 다운타임의 범위를 `host:X`로 지정하고, `host:X`와 `host:Y` 에서 다중 경보를 작동하는 경우, Datadog는 `host:Y`에 대한 모니터 알림을 생성하지만 `host:X`의 알림은 생성하지 않습니다. 

다중 경고 모니터에 적용되는 다운타임 범위에 모든 그룹을 포함시키려면, `Group scope`에서 `All`을 선택합니다. 

아래의 예는 다중 경보 모니터가 `Group scope`에 어떻게 적용될 수 있는지 보여줍니다.

{{< tabs >}}
{{% tab "By Monitor Name" %}}

**예 1: 특정 서비스의 알림 음소거**

1. 다운타임을 한 그룹에서만 예약하려면 (여기에서는`service:web-store`), `Group scope` 필드에서 해당 그룹으로 들어가세요. 
2. **지정된 모니터 미리 보기**는 선택한 모니터가 여전히 범위 내에 있음을 나타내므로, 예약된 다운타임 중 `service:web-store` 그룹에 대한 경고가 음소거됩니다.

{{< img src="monitors/downtimes/downtime_examplebyname1_downtime.jpg" alt="downtime example of 'By Monitor Name' with preview of affected monitors" style="width:80%;">}}

3. 예약된 다운타임이 시작하면서 이 모니터에서 `service:web-store` 그룹에 대한 경고만 음소거됩니다.

{{< img src="monitors/downtimes/downtime_examplebyname1_monitor.jpg" alt="Evaluation graph showing downtime for group service:web-store" style="width:80%;">}}

4. 다운타임을 하나 이상의 그룹에서 예약하려면(예를 들면 `service:synthesizer` 및 `service:consul`), 각 그룹마다 다운타임을 추가로 생성할 수 있습니다. 

**예 2: `env`및 `service` 그룹 모니터의 특정 환경에 대한 알림 음소거**

1. 한 그룹에 대해 다운타임을 예약하려면(이 경우에는`env:dev`), `Group scope` 필드의 그룹으로 들어갑니다. 
2. **지정된 모니터 미리 보기**는 선택한 모니터가 아직 범위 내에 있음을 나타내므로, 예약된 다운타임 중`env:dev` 그룹에 대한 경고가 음소거됩니다.

{{< img src="monitors/downtimes/downtime_examplebyname2_downtime.jpg" alt="downtime by monitor name with dev environment in scope" style="width:80%;">}}

3. 예약된 다운타임이 시작되면, `env:dev` 그룹 **및** `dev` 환경 관련 모든 서비스에 대한 경고가 음소거됩니다. 

{{< img src="monitors/downtimes/downtime_examplebyname2_monitor.jpg" alt="group status shows dev environment and related services muted during downtime" style="width:80%;">}}

4. 하나 이상의 '그룹별'로 다운타임을 예약하려면,(예를 들어 `env:dev`와 `service:web-store`의 경우), 다운타임에 범위를 추가합니다. 
{{% /tab %}}
{{% tab "By Monitor Tags" %}}

공통 모니터 태그를 기반으로 다운타임이 예약되고 하나의 '그룹별' 범위가 있는 다중 경고 모니터가 범위에 포함되는 경우,`Group scope` 필드를 사용하여 범위 내 공통 모니터 그룹을 음소거할 수 있습니다.  

**예 1:  각기 하나의 '그룹별' 범위가 있는 다중 경고 모니터 2개에 공통되는 `downtime:true` 모니터 태그가 있습니다.**

1. *모니터 A*는 여러 `service` 그룹의 평균 메트릭을 보고하는 호스트를 위한 다중 경고 모니터입니다.
2. *모니터 B*는 `service:web-store`의 동일 메트릭을 보고하는 호스트를 위한 다중 경고 모니터입니다.
3. `downtime:true` 모니터 태그가 있는 모든 모니터에 다운타임이 예약됩니다.
4. 이 다운타임은 `service:web-store` 그룹으로 제한됩니다. 
5. 지정된 모니터 미리 보기는 두 모니터의 범위에 `service:web-store` 그룹이 모두 포함되어 있다는 것을 나타냅니다. 

{{< img src="monitors/downtimes/downtime_examplebytag1_downtime.jpg" alt="downtime example of 'By Monitor Tags' with preview of affected monitors" style="width:80%;">}}

6. *모니터 A*는 다운타임이 범위 내 그룹에 한해서 시작되었음을 나타냅니다: `service:web-store`

{{< img src="monitors/downtimes/downtime_examplebytag1_monitor.jpg" alt="Evaluation graph showing downtime for group service:web-store" style="width:80%;">}}

7. *모니터 B*는 `service:web-store`에 대해 다운타임이 시작된 것을 나타냅니다. 모든 모니터의 (`host`별) 그룹이 `service:web-store`에 속하기 때문에, 결과적으로 해당 모니터의 다운타임 동안 모든 호스트가 음소거됩니다.

{{< img src="monitors/downtimes/downtime_examplebytag1_monitor2.jpg" alt="Evaluation graph showing downtime for group service:web-store and both affected hosts" style="width:80%;">}}

{{% /tab %}}
{{< /tabs >}}

### 스케줄

{{< tabs >}}
{{% tab "One Time" %}}

시작 날짜, 시간 및 시간대를 입력하여 일회성 다운타임을 설정합니다. 종료 날짜 및 시간은 선택적으로 지정합니다.

{{< img src="monitors/downtimes/downtime_onetime.jpg" alt="fields for scheduling one time downtime" style="width:80%;">}}

{{% /tab %}}
{{% tab "Recurring" %}}

반복되는 다운타임은 반복적인 관리 주기에 유용합니다.

시작 날짜, 시간, 시간대, 반복 및 기간을 입력하여 반복되는 다운타임을 설정합니다. 종료 날짜 또는 발생 횟수를 선택적으로 지정합니다.

반복되는 다운타임의 단일 다운타임이 종료되면, 해당 다운타임은 취소되고 동일한 제한 조건과 업데이트된 시작 및 종료 시간으로 새로운 다운타임이 생성됩니다. **참고**: 본래의 생성자는 새로 생성된 모든 다운타임과 연계됩니다.

{{< img src="monitors/downtimes/downtime_recurring.jpg" alt="fields for scheduling recurring downtime" style="width:80%;">}}

RRULE 또는 [반복 규칙][1]을 사용하여 다운타임 예약을 정의합니다. 공식 [RRULE 제너레이터][2]를 도구로 사용하여 반복 규칙을 생성합니다.

일반적인 사용 사례는 RRULES를 통해 매월 특정 날짜에 다운타임을 정의하는 것입니다. 예를 들어, 매월 세 번째 월요일에 설정합니다:

{{< img src="monitors/downtimes/downtime_rrule.jpg" alt="downtime on alert" style="width:80%;">}}

**참고**: RRULE에서 기간을 지정하는 속성은 지원되지 않습니다(예: `DTSTART`,`DTEND`, `DURATION` ).


[1]: https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html
[2]: https://icalendar.org/rrule-tool.html
{{% /tab %}}
{{< /tabs >}}

### 메세지 추가하기

이 다운타임에 대해 팀에게 알리는 메시지를 입력하세요. 메시지 필드에는 표준 [마크다운 서식][2] 및 Datadog의 `@-notification` 구문을 쓸 수 있습니다.

### 팀에 알림 전송하기

팀 구성원을 지정하여 팀에 알리거나 서비스[통합][3]에 메시지를 전송합니다. Datadog는 다운타임이 예약, 시작, 취소 및 만료될 때마다 지정된 대상에게 알림을 보냅니다. 팀은 이러한 감사 알림으로 시스템의 다운타임을 파악합니다.

#### 첫 번째 복구 알림 비활성화

기본적으로, Datadog는 다운타임 **전**에 작동하고 다운타임 **중**에 복구되는 모니터에 대한 복구 알림을 보냅니다. 타사 통합을 사용하여 열린 인시던트를 자동으로 닫을 때 유용한 알림입니다. 체크박스를 선택하면 이 알림이 음소거됩니다. 

{{< img src="monitors/downtimes/downtime_first_recovery.png" alt="mute first recovery notification" style="width:80%;">}}

첫 번째 복구 알림을 비활성화하는 옵션이 여러 다운타임 사이에 추가됩니다. 예를 들어 여러 다운타임이 겹치면서 동일한 모니터를 음소거하는 경우, **하나 이상**의 다운타임이 비활성화 옵션으로 선택된 경우에 첫 번째 복구 알림이 음소거됩니다. 

**참고**: 이 옵션은 **첫 번째** 복구 알림을 음소거합니다. 다운타임 동안 모니터가 다시 작동 및 복구를 진행하면, 이 옵션의 설정에 관계없이 해당 알림이 항상 음소거됩니다.

## 관리하기

다운타임 관리 페이지에는 활성 및 예약된 다운타임 목록이 표시됩니다. 다운타임을 선택하여 세부정보를 보거나 수정 또는 삭제할 수 있습니다. 세부 정보에는 생성자, 범위 및 적용되는 모니터 목록이 포함됩니다.
측면 패널과 검색 표시줄을 사용하여 `Creator`, `Scope`, `Monitor Tags` , 또는 `Active`, `Automuted`, `Recurring` 매개변수에 대한 목록을 필터링합니다.

{{< img src="monitors/downtimes/downtime_manage.png" alt="manage downtime page" style="width:100%;">}}

### 내역

다운타임 내역은 [모니터 상태][4] 페이지에서 그룹 전환 내역에 덮어씌워져 표시되며, [이벤트 탐색기][5]에서 `tags:audit,downtime`를 검색하거나 특정 다운타임을 `tags:audit,downtime_id:<DOWNTIME_ID>` ID로 검색할 수 있습니다.

### 음소거하기 

모니터가 `ALERT`, `WARNING`, `RESOLVED` 및 `NO DATA`상태로 전환될 때  이벤트가 작동합니다. 모니터가 음소거되었거나 예약된 다운타임이 있는 경우, `RESOLVED`에서 다른 상태로 전환해도 이벤트나 알림은 작동하지 **않습니다**.

{{< img src="monitors/downtimes/downtime_on_alert.png" alt="downtime on alert" style="width:80%;">}}

**참고**: 모니터 상태 페이지에서 모니터 음소거를 작동 또는 해제해도 모니터와 관련된 다운타임 예약은 삭제되지 않습니다. 다운타임을 편집하거나 삭제하려면, [다운타임 관리][1] 페이지 또는 [API][6]를 사용하세요.

### 만료

다운타임이 만료되었을 때 모니터가 경고 가능 상태 (`ALERT`, `WARNING`, 또는 `NO DATA`)에 있으면 새 알림을 작동합니다. 다운타임 동안에 상태가 변경되는 모니터(예: `OK`에서 `ALERT`, `WARNING` 또는`NO DATA`) 및 다운타임 시작 시에 이미 경고 가능 상태가 있는 모니터에 적용됩니다. **참고**: 다운타임을 수동으로 취소하면 모니터가 경고 가능 상태가 되더라도 알림이 전송되지 않습니다.

**예 1:** 다운타임이 시작되기 *전* 모니터가 경고 상태이고 다운타임 중에 *계속*되는 경우:
1. 다운타임 중에는 이 경고에 대한 알림이 표시되지 않습니다.
2. (조건이 계속 충족되기 때문에) 모니터는 경고 상태를 유지합니다.
3. 다운타임 종료
4. 경고 조건이 계속 충족되므로, 알림이 전송됩니다.

**예 2:** 다운타임이 시작되기 ** 모니터가 경고 상태에 있고 다운타임 *중* 복구되는 경우:
1. 상태가 `ALERT`에서 `OK`로 변경됩니다.
2. 복구 알림은 다운타임 동안 전송되지만, 해당 다운타임 동안의 첫 번째 복구에 대해서만 전송됩니다.

### 모니터 리포트

모니터가 다운타임 중이라고 하더라도 [주간 모니터 보고서][7]에 모든 경고 상태가 포함됩니다.

## 자동-음소거

Datadog는 특정 클라우드 워크로드의 수동 종료와 관련된 모니터를 사전에 음소거할 수 있습니다. 지원되는 시나리오는 다음과 같습니다.

- [AWS EC2 인스턴스][8]의 수동 종료를 위한 자동 음소거 및 클라우드와치(CloudWatch) API의 호스트 상태를 기반으로 하는 AWS 자동 확장에 의한 인스턴스 종료.
- [구글 컴퓨트 엔진(GCE)][9] 인스턴스의 수동 종료를 위한 자동 음소거 및 GCE API의 호스트 상태를 기반으로 하는 GCE 자동 확장에 의해 작동되는 인스턴스 종료.
- Azure Resource Health API를 통해 제공되는 건강 상태를 기반으로 하는 수동 작동 또는 Azure 자동 크기 조정에 의한 [Azure VM][10]의 종료 또는 만료에 대한 자동 음소거.

## {{< partial name="whats-next/whats-next.html" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#/downtime
[2]: http://daringfireball.net/projects/markdown/syntax
[3]: /kr/integrations/#cat-notification
[4]: /kr/monitors/manage/status/
[5]: /kr/events/explorer
[6]: /kr/api/v1/downtimes/#cancel-a-downtime
[7]: /kr/account_management/#preferences
[8]: /kr/integrations/amazon_ec2/#ec2-automuting
[9]: /kr/integrations/google_compute_engine/#gce-automuting
[10]: /kr/integrations/azure_vm/#automuting-monitors