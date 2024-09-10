---
aliases:
- /ko/monitors/notify/downtimes/
description: 'Datadog 모니터에서 특정 시간 동안 경고를 전송하지 않도록 다운타임을 예약합니다 '
further_reading:
- link: /monitors/guide/suppress-alert-with-downtimes
  tag: 가이드
  text: 다운타임으로 알림 억제
- link: /monitors/guide/scoping_downtimes
  tag: 가이드
  text: 다운타임 스케줄 범위 지정
- link: /monitors/
  tag: 설명서
  text: 모니터 생성
- link: /monitors/notify/
  tag: 설명서
  text: 모니터 알림
title: 다운타임
---

## 개요

모니터를 작동하지 않고 시스템 종료, 오프라인 유지 관리 또는 업그레이드를 하기 위해 다운타임을 예약합니다. 다운타임 시에는 모든 모니터의 경고 및 알림이 꺼지지만 모니터 상태 전환은 유지됩니다. 

## 새 다운타임 스케줄 생성

Datadog에서 [모니터 다운타임][1]을 예약하려면 _Monitors > Manage Downtimes_로 이동한 후 오른쪽 상단에 있는 **Schedule Downtime** 버튼을 클릭합니다.

개별 모니터를 음소거하려면 모니터 상태 페이지 상단의 **Mute** 버튼을 클릭하세요. 해당 모니터에 대한 다운타임 스케줄이 생성됩니다.

## 음소거 항목 선택하기

[이름](#by-monitor-name)별로 특정 모니터에 다운타임 스케줄을 적용하거나, [태그](#by-monitor-tag)별로 광범위한 모니터에 다운타임 스케줄을 적용합니다. [*그룹 범위*](#downtime-scope)를 통해 추가 필터를 적용합니다. **Preview effected monitors**를 클릭하면 포함된 모니터를 확인할 수 있습니다. 자세한 예 및 사용 사례는 [다운타임 스케줄 범위 지정][2]을 참조하세요.

**참고**: 다운타임이 예약된 후 생성되거나 편집된 모니터가 범위와 일치하면 자동으로 다운타임에 포함됩니다.

### 모니터 이름 기준

드롭다운 메뉴를 검색하거나 사용하여 음소거할 모니터를 선택합니다. 필드를 비워 두면 기본적으로 모든 모니터가 음소거됩니다. 다운타임을 특정 호스트, 디바이스 또는 임의 태그로 제한하는 범위를 선택할 수도 있습니다. **선택한 모든 범위**가 있는 모니터만 음소거됩니다.

### 모니터 태그 기준

하나 이상의 [모니터 태그][3]를 기반으로 다운타임을 예약합니다. 단일 다운타임에 대해 선택할 수 있는 최대 태그 수는 32개입니다. 각 태그의 길이는 최대 256자입니다. **선택한 모든 태그**를 가진 모니터만 음소거됩니다. 추가 제약 조건에 대한 범위를 선택할 수도 있습니다.

### 다운타임 범위
그룹 범위를 사용하면 다운타임에 추가 필터를 적용하고 음소거할 모니터를 더 효과적으로 제어할 수 있습니다. 다운타임의 그룹 범위는 모니터링 특정 대상 이후에 일치합니다. 모니터 태그를 사용하여 여러 모니터를 대상으로 지정하면 그룹 범위와 일치하기 전에 태그가 지정된 모니터링을 찾습니다.

다운타임 범위는 모니터의 쿼리 필터 또는 모니터의 그룹 이름이라는 두 가지 가능한 대상과 일치합니다.

#### 모니터 그룹 이름 범위 지정
그룹 범위를 적용하여 음소거할 모니터를 더 세밀하게 제어할 수 있습니다 예를 들어, 한 모니터가 모든 서비스의 평균 지연 시간을 보고 있다고 가정해 보겠습니다. `web-store` 서비스에서 업그레이드를 실행할 계획이며 느린 요청과 잠재적 오류가 예상됩니다.

{{< img src="monitors/downtimes/downtime_examplebyname1_monitor.png" alt="group service:web-store에 대한 다운타임을 보여주는 상태 그래프" style="width:90%;">}}

알림과 관련된 `service:web-store`은 음소거 상태로 유지하고 나머지 서비스에 대한 기타 중요한 알림이 정상적으로 전달되는지 확인하려고 합니다. 모니터 대상을 선택한 후 다운타임의 그룹 범위에 `service:web-store`를 입력합니다.

**참고**: 이는 `service` 및 `host`같이 다중 차원을 가진 그룹에서도 작동합니다. `service:web-store`에 다운타임을 생성하면 예를 들어 `service:web-store,host:a` 또는 `service:web-store,host:b`와 같이 해당 서비스가 포함된 모든 그룹이 음소거됩니다.

#### 모니터 쿼리 필터 범위 지정
모니터 쿼리를 필터링하여 원하는 차원만 확인할 수 있습니다. 특정 차원을 대상으로 하는 다운타임을 생성하세요. 추가로 그룹화할 필요가 없습니다.

{{< img src="/monitors/downtimes/downtime_scope_query.png" alt="모니터의 쿼리 필터 예제" style="width:100%;" >}}

위 모니터는 모니터 특정 대상과 일치하는 다운타임에 의해 음소거되며 범위는 `env:prod`에 의해 지정됩니다.

#### 다운타임 범위 구문
다운타임 범위 쿼리는 플랫폼의 다른 많은 제품에서 지원하는 것과 동일한 공통 [검색 구문][19]을 따릅니다. 다운타임 범위에 모든 그룹을 포함하려면 `Group scope`에 대해 `*`을 입력합니다. 그룹 범위의 추가 예는 다음과 같습니다:

| 다운타임 그룹 범위  | 설명 |
| ------------------- | ---------------------- |
| `service:web-store`       | `web-store` 서비스에 대한 모든 알림을 음소거합니다. |
| `service:web-store AND env:dev`       | `dev` 환경에서 실행 중인 `web-store` 서비스에 대한 모든 알림을 음소거합니다. |
| `env:(dev OR staging)`       | `dev` 또는 `staging` 환경과 관련된 모든 알림을 음소거합니다. |
| `service:web-store AND env:(dev OR staging)`       | `dev` 또는 `staging`환경에서 실행 중인 `web-store` 서비스와 관련된 모든 알림을 음소거합니다. |
| `host:authentication-*`       | 이름 앞에 `authentication-` 접두사가 붙는 호스트와 관련된 모든 알림을 음소거합니다. |
| `host:*-prod-cluster`       | 이름에 `-prod-cluster` 접미사가 붙는 호스트와 관련된 모든 알림을 음소거합니다. |
| `host:*-prod-cluster`       | 이름에 `-prod-cluster` 접미사가 붙는 호스트와 관련된 모든 알림을 음소거합니다. |
| `service:webstore AND -env:prod`       | `prod` 환경에서 실행되고 있지 **않은** `web-store` 서비스에 대한 모든 알림을 음소거합니다. |

#### 다운타임 범위 제한
다음과 같이 **지원되지 않는** 몇 가지 제한 사항이 있습니다.

* 예를 들어 `team:app AND (service:auth OR (service:graphics-writer AND (env:prod OR (type:metric AND status:ok))))`같이 두 단계 이상의 중첩이 지원되지 않습니다. 다운타임은 최대 두 레벨의 중첩을 허용합니다. 대신 별도의 다운타임을 사용하여 로직을 나누세요.
* 부정은 키/값 쌍과 `OR`의 태그에 대해서만 지원됩니다. 예를 들어 `-key:value` and `-key(A OR B)`. Scopes such as `-service:(A AND B)`, `service:(-A OR -B)`, or `-service(A B)` 는 지원되지 않습니다.
* 예를 들어 `service:A OR host:X`와 같이 상위 레벨 OR은 지원되지 않습니다. 이렇게 하려면 두 번의 별도의 다운타임이 필요합니다.
* `prod AND service:(A or B)` 또는 `prod`와 같은 키가 없는 태그는 지원되지 않습니다. 예를 들어 `env:prod`같이 태그에는 키가 있어야 합니다.
* 물음표 와일드카드: `service:auth?`는 지원되지 않습니다. 와일드카드를 사용해야 하는 경우 대신 `*`를 사용하세요.
* 키 내의 잘못된 문자: `en&v:prod`는 유효한 다운타임 범위가 아니므로 거부됩니다.

## 다운타임 스케줄 설정

### 1회

시작 날짜, 시간 및 시간대를 입력하여 일회성 다운타임을 설정합니다. 종료 날짜 및 시간은 필요 시 지정합니다.

{{< img src="monitors/downtimes/downtime_onetime.jpg" alt="1회 다운타임 예약 필드" style="width:90%;">}}

 ### 반복

반복 다운타임은 반복되는 유지 관리 기간에 유용합니다. 시작 날짜, 시간, 표준 시간대, 반복 및 기간을 입력하여 반복되는 다운타임을 설정합니다. 원하는 경우 종료 날짜 또는 발생 횟수를 지정합니다.

반복되는 다운타임의 단일 다운타임이 종료되면 단일 다운타임이 취소되고 동일한 제약 조건과 업데이트된 시작 및 종료 시간으로 새로운 다운타임이 생성됩니다.<br>
**참고**: 원래 작성자는 새로 생성된 모든 다운타임과 연결됩니다.

{{< img src="monitors/guide/downtime_business_hour_weekend.png" alt="업무 시간 외 및 주말 동안 알림을 음소거하도록 반복 일정을 사용하여 다운타임을 설정합니다." style="width:100%;" >}}

[반복 규칙][6](RRULEs)을 사용하여 다운타임 스케줄을 정의합니다. 공식 [RRULE 생성기][7]를 반복 규칙을 생성하는 도구로 사용하세요. 일반적인 사용 사례는 RRULES를 사용하여 매달 세 번째 월요일과 같은 특정 날짜의 다운타임을 정의하는 것입니다. 반복에 대한 자세한 사용 사례는 [다운타임으로 알림 억제][8] 가이드를 참조하세요.

**참고**: RRULE에서 기간을 지정하는 속성은 지원되지 않습니다(예: `DTSTART`, `DTEND`, `DURATION`).

## 알림
### 메세지 추가

이 다운타임에 대해 팀에 알릴 메시지를 입력합니다. 메시지 필드에는 표준 마크다운 서식과 Datadog의 `@-notification` 구문을 사용할 수 있습니다. 서식 지정 옵션에 대한 자세한 내용은 [알림 페이지][9]를 참조하세요.

### 팀에 알리기

팀원을 지정하여 팀에 알리거나 서비스 [통합][10]으로 메시지를 보냅니다. Datadog은 다운타임이 예약, 시작, 취소 또는 만료될 때마다 지정된 대상으로 알림을 보냅니다. 이러한 감사(audit) 알림을 통해 팀은 시스템의 다운타임을 인지할 수 있습니다.

### 첫 번째 복구 알림 비활성화

기본적으로, Datadog는 다운타임 **이전**에 트리거되어 다운타임 **중**에 복구되는 모니터에 대한 복구 알림을 보냅니다. 이는 타사 통합을 사용하여 열린 인시던트를 자동으로 종료할 때 유용한 알림입니다. 체크박스를 선택하면 이 알림이 음소거됩니다. 

{{< img src="monitors/downtimes/downtime_first_recovery.png" alt="첫 복구 알림 음소거" style="width:80%;">}}

첫 번째 복구 알림을 비활성화하는 옵션이 여러 다운타임 사이에 추가됩니다. 예를 들어 여러 다운타임이 겹치면서 동일한 모니터를 음소거하는 경우, **최소 하나의**의 다운타임이 비활성화 옵션으로 선택된 경우에 첫 번째 복구 알림이 음소거됩니다.

**참고**: 이 옵션은 **첫 번째** 복구 알림을 음소거합니다. 다운타임 동안 모니터가 다시 작동 및 복구를 진행하면, 이 옵션의 설정에 관계없이 해당 알림이 항상 음소거됩니다.

## 관리하기

[다운타임 관리 페이지][11]에는 활성화된 다운타임과 예정된 다운타임의 목록이 표시됩니다. 다운타임을 선택하여 세부 정보를 보거나 편집하거나 삭제할 수 있습니다. 세부 정보에는 작성자, 범위, 적용되는 모니터 목록이 포함됩니다.
패싯 패널과 검색 막대를 사용하여 `Creator`, `Scope`, `Monitor Tags`, `Active`, `Automuted`, `Recurring` 파라미터의 목록을 필터링합니다.

{{< img src="monitors/downtimes/downtime_manage.png" alt="다운타임 페이지 관리" style="width:100%;">}}

### 기록

다운타임 내역은 그룹 전환 내역 위에 겹쳐서 [모니터 상태][12] 페이지에서 볼 수 있으며, [이벤트 탐색기][13]에서 `tags:audit downtime`를 검색하거나 `tags:audit downtime_id:<DOWNTIME_ID>`를 사용해 특정 다운타임을 ID로 검색하여 볼 수 있습니다.


### 음소거하기 

모니터는 다음과 같은 상태로 변환될 때 이벤트를 트리거합니다: `ALERT`, `WARNING`, `RESOLVED`, `NO DATA`. 모니터가 음소거되었거나 예약된 다운타임이 있는 경우, `RESOLVED`에서 다른 상태로 전환해도 이벤트나 알림은 작동하지 **않습니다**.

{{< img src="monitors/downtimes/downtime_on_alert.png" alt="다운타임 동안 알림으로의 상태 전환을 보여주는 모니터 상태 그래프는 알림 이벤트를 생성하지 않습니다." style="width:80%;">}}

**참고**: 모니터 상태 페이지에서 모니터를 음소거하거나 해제해도 모니터와 관련된 예정된 다운타임은 삭제되지 않으습니다. 다운타임을 편집하거나 삭제하려면 [다운타임 관리][1] 페이지 또는 [API][14]를 사용하세요.

### 만료

기본적으로 모니터가 다운타임이 만료될 때 알림이 필요한 상태(`ALERT`, `WARNING`, 또는 `NO DATA`)인 경우 모니터에서 새 알림을 트리거합니다. 이는 다운타임 중 상태가 변경되는 모니터(예: `OK`에서 `ALERT`, `WARNING`, 또는 `NO DATA`)와 다운타임이 시작될 때 이미 알림이 필요한 상태인 모니터에 적용됩니다. 다운타임이 수동으로 취소되면 모니터가 알림이 필요한 상태에 들어갔더라도 알림이 전송되지 않습니다.

기본 동작을 재정의하려면 "Notify Your Team" 섹션의 옵션을 사용하여 다운타임 종료 시 전송할 알림을 지정합니다. API로 생성된 다운타임의 경우 기본 동작은 `is_cancelled` 옵션을 제외하는 것입니다.

{{< img src="monitors/downtimes/downtime_cancel_expire_notification.png" alt="특정 다운타임 조건이 있는 모니터의 팀 알림 섹션 구성하기" style="width:100%;">}}

**예 1:** 다운타임이 시작되기 *전* 모니터가 경고 상태이고 다운타임 중에 *계속*되는 경우:
1. 다운타임 중에는 이 경고에 대한 알림이 표시되지 않습니다.
2. (조건이 계속 충족되기 때문에) 모니터는 경고 상태를 유지합니다.
3. 다운타임이 종료됩니다.
4. 경고 조건이 계속 충족되므로, 알림이 전송됩니다.

**예 2:** 다운타임이 시작되기 *전* 모니터가 경고 상태에 있고 다운타임 *중* 복구되는 경우:
1. 상태가 `ALERT`에서 `OK`로 변경됩니다.
2. 복구 알림은 다운타임 동안 전송되지만, 해당 다운타임 동안의 첫 번째 복구에 대해서만 전송됩니다.

### 모니터 리포트

모니터가 다운타임 상태인 경우에도 [주간 모니터 리포트][15]에 모든 경고 상태가 포함됩니다.

## 자동 음소거

Datadog은 특정 클라우드 워크로드의 수동 종료와 관련된 모니터를 능동적으로 음소거할 수 있습니다. 셧다운을 위해 다음과 같은 자동 음소거 시나리오가 지원됩니다:

- **[Amazon EC2 인스턴스][16] 및 인스턴스 종료는 CloudWatch API의 호스트 상태를 기반으로 AWS 오토스케일링에 의해 트리거됩니다.
- **[Google Compute Engine (GCE)][17]** 인스턴스 및 인스턴스 종료는 GCE API의 호스트 상태를 기반으로 GCE 오토스케일링에 의해 트리거됩니다.
- **[Azure VM][18]**, 종료가 수동으로 트리거되었는지 또는 Azure 오토스케일링에 의해 트리거되었는지 여부에 관계없이 Azure Resource Health API를 통해 제공되는 상태를 기반으로 합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/downtimes
[2]: /ko/monitors/guide/scoping_downtimes
[3]: /ko/monitors/manage/#monitor-tags
[4]: /ko/monitors/manage/search/
[5]: /ko/monitors/configuration/?tab=thresholdalert#alert-grouping
[6]: https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html
[7]: https://icalendar.org/rrule-tool.html
[8]: /ko/monitors/guide/suppress-alert-with-downtimes/
[9]: /ko/monitors/notify/#overview
[10]: /ko/integrations/#cat-notification
[11]: https://app.datadoghq.com/monitors/downtimes
[12]: /ko/monitors/manage/status/
[13]: /ko/service_management/events/explorer
[14]: /ko/api/latest/downtimes/#cancel-a-downtime
[15]: /ko/account_management/#preferences
[16]: /ko/integrations/amazon_ec2/#ec2-automuting
[17]: /ko/integrations/google_compute_engine/#gce-automuting
[18]: /ko/integrations/azure_vm/#automuting-monitors
[19]: /ko/logs/explorer/search_syntax/