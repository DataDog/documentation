---
aliases:
- /ko/service_management/case_management/create_notifications_and_third_party_tickets
- /ko/service_management/case_management/notifications_integrations/
- /ko/incident_response/case_management/notifications_integrations/
further_reading:
- link: /incident_response/work_management/troubleshooting
  tag: 설명서
  text: 타사 통합 문제 해결
- link: https://www.datadoghq.com/blog/servicenow-datadog-incident-response
  tag: 블로그
  text: Datadog과 ServiceNow ITSM을 통합하여 Incident Response 가속화하기
- link: https://www.datadoghq.com/blog/forms-case-management-requests/
  tag: 블로그
  text: Datadog Forms 및 Case Management로 요청 흐름 간소화하기
- link: https://www.datadoghq.com/blog/work-management/
  tag: 블로그
  text: Datadog Work Management를 통한 사람 및 에이전트형 작업의 중앙 집중화하기
title: 알림 및 통합
---
## 개요 {#overview}

Work Management는 알림 또는 티켓을 자동 또는 수동으로 생성하기 위한 타사 통합을 생성할 수 있습니다.
- 자동: 새 작업 항목이 생성될 때마다 새 티켓이나 알림이 생성됩니다.
- 수동: 사용자가 특정 작업 항목에 대해 티켓이나 알림을 생성하도록 선택합니다.

Work Management를 타사 시스템과 연결하여 Datadog 솔루션을 기존 워크플로 및 프로세스에 통합할 수 있습니다. Jira 및 ServiceNow 통합을 통해 Datadog의 풀스택 텔레메트리를 사용하여 작업 항목을 해결하는 동시에 이러한 타사 시스템에 기록을 유지할 수 있습니다.


## 알림 {#notifications}

새 작업 항목이 생성될 때 알림을 받으려면 조회를 생성하세요.
1. 알림을 받을 프로젝트로 이동합니다.
1. 아직 프로젝트 멤버가 아닌 경우 **Join This Project**를 클릭합니다.
1. **조회 추가**를 클릭합니다.
1. **이름** 필드에 조회 이름을 입력합니다.
1. 검색 상자에 필터링된 쿼리를 입력하여 알림을 받을 작업 항목을 조회합니다.
1. 수신자 필드에서 알림을 받을 방법을 선택합니다.
1. **Save**를 클릭합니다.

### 알림 옵션 {#notification-options}

| 통합     | 구성    |
| --------------- | ---------------- |
| 이메일           | 하나 이상의 이메일 주소를 선택합니다. |
| Slack           | Slack 작업 공간 및 채널을 선택합니다. |
| Microsoft Teams | Microsoft Teams 테넌트를 Datadog에 연결한 경우 테넌트, 팀, 채널을 선택합니다. 그 외의 경우 커넥터를 선택합니다.|
| PagerDuty       | 서비스를 선택합니다. |
| Webhooks        | 웹훅 이름을 선택합니다. |

## 알림 규칙 {#notification-rules}

프로젝트 설정에서 알림 규칙을 구성하여 주요 작업 항목 업데이트에 대한 경보를 받을 수 있습니다. 알림 규칙을 생성하려면 다음 단계를 따르세요.

1. [**프로젝트 설정**][1]으로 이동하여 프로젝트를 클릭해 설정을 확장합니다.
1. 확장된 메뉴에서 **알림**을 클릭합니다.
1. **+ Create Rule**을 클릭하여 알림 규칙을 추가합니다.
1. 쿼리 필드에 필터를 입력하여 특정 작업 항목으로 알림 범위를 제한합니다. 예를 들면 다음과 같습니다.
   ```
   priority:P1 OR priority:P2
   ```
   **모든 작업 항목**에 대한 알림을 받으려면 쿼리를 비워 둡니다.
1. 알림을 전송할 조건을 선택합니다. 다음 중 하나 이상을 선택할 수 있습니다.
   - 작업 항목 생성
   - 상태 전환
   - 우선순위 변경
   - 담당자 변경
   - 새로운 경보 상관관계(이벤트 관리 작업 항목의 경우)
1. 알림 대상을 선택합니다. 지원되는 대상은 다음과 같습니다.
   - 이메일
   - Slack
   - Microsoft Teams
   - PagerDuty
   - 웹훅
1. 규칙을 활성화하려면 **Save**를 클릭합니다.

## On-Call 호출 규칙 {#on-call-paging-rules}

작업 항목에서 [Datadog On-Call][4]을 사용하여 수동 또는 자동으로 사용자를 호출할 수 있습니다.

수동으로 호출하려면 다음 단계를 따르세요.
1. 작업 항목 세부 정보를 엽니다.
2. **Page** 버튼을 클릭합니다.

자동으로 호출하려면 프로젝트 설정에서 자동 호출 규칙을 구성하세요.
1. [**프로젝트 설정**][1]으로 이동하여 프로젝트를 클릭해 설정을 확장합니다.
1. 확장된 메뉴에서 **Integrations** > **Datadog On-Call**을 클릭합니다.
1. **작업 항목을 On-Call로 자동 호출**을 켭니다. 그러면 호출 규칙 모달이 열리며, 여기서 첫 번째 규칙을 정의할 수 있습니다.
1. 모달에 쿼리를 입력합니다. 작업 항목이 수명 주기 중 언제든지 지정된 쿼리와 일치하면 Datadog이 자동으로 지정된 팀을 호출합니다.
1. 호출할 팀을 선택합니다.
   - **특정 팀**: 규칙이 트리거될 때 항상 호출할 특정 팀을 선택합니다.
   - **동적 팀 선택**: `Team` 속성을 통해 작업 항목과 연결된 팀을 자동으로 호출합니다.
1. **Add Rule**을 클릭합니다.
1. Datadog On-Call 설정 페이지에서 규칙을 조회합니다. 이 페이지로 돌아와 이 구성을 관리하거나 **New Paging Rule**을 클릭하여 여러 규칙을 추가할 수 있습니다.
1. (선택 사항) 호출이 트리거되면 작업 항목을 On-Call 사용자에게 자동으로 할당하는 기능을 켭니다.

## 타사 티켓 {#third-party-tickets}
프로젝트 설정에서 멤버십을 관리하고, 작업 항목의 자동 닫기를 구성하며, Jira 및 ServiceNow와 같은 타사 통합을 설정할 수 있습니다.

{{% collapse-content title="Jira 구성" level="h3" expanded=false id="jira" %}}
1. Jira 통합이 구성되어 있는지 확인합니다.
1. Work Management 프로젝트 설정에서 **Jira**를 활성화하여 프로젝트에서 수동으로 Jira 이슈를 생성할 수 있도록 합니다.
1. Jira 계정, 이슈를 생성할 프로젝트, 원하는 이슈 유형(스토리, 에픽, 버그 또는 작업 등)을 선택합니다.
1. 프로젝트에서 생성된 각 작업 항목에 대해 Jira 이슈를 자동으로 생성하도록 선택할 수 있습니다.
1. 다음 속성(작업 항목 제목, 설명, 담당자, 댓글, 상태 및 우선순위)에 대해 아래 옵션 중 하나를 선택합니다.
  | 옵션                              | 설명                                                                                                                                   |
  |-------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
  | 작업 항목 생성 시 Jira로 한 번  | 필드가 작업 항목이 생성되는 시점에만 Work Management에서 Jira로 동기화됩니다. 이후의 변경 사항은 양쪽 모두에 반영되지 않습니다.  |
  | 양방향 동기화       | Work Management의 변경 사항이 Jira에 반영되며, 그 반대의 경우도 마찬가지입니다.                                                                              |
  | 동기화 안 함                          | 필드가 Jira로 동기화되지 않습니다.                                                                                                              |
1. 작업 항목 상태 및 우선순위에 대해 Jira 측의 어떤 값에 매핑할지 선택합니다.
1. 변경 사항을 저장합니다.

**참고**:
- 작업 항목은 프로젝트당 한 번에 하나의 외부 리소스와만 동기화될 수 있습니다. Jira 동기화를 활성화하려면 ServiceNow 자동 생성 및 동기화를 비활성화해야 합니다.
- 'Open', 'In Progress', 'Closed'의 핵심 상태를 사용하는 작업 항목만 Jira와 동기화할 수 있습니다.
- 양방향 동기화에는 [웹훅 지원][2]이 필요합니다.
- 이슈 생성은 Jira Cloud 및 Data Center에서 사용할 수 있습니다. 필드 동기화는 Jira Cloud에서만 사용할 수 있습니다.
{{% /collapse-content %}}

{{% collapse-content title="ServiceNow 구성" level="h3" expanded=false id="servicenow" %}}
1. [ITOM 및 ITSM 설정 지침][3]에 따라 ServiceNow 통합을 구성합니다.
1. Work Management 프로젝트 설정에서 ServiceNow를 활성화하여 프로젝트에서 수동으로 ServiceNow 인시던트를 생성할 수 있도록 합니다.
1. ServiceNow 인스턴스 및 할당 그룹을 선택합니다.
1. 프로젝트에서 생성된 각 작업 항목에 대해 ServiceNow 인시던트를 자동으로 생성하도록 선택할 수 있습니다.
1. 다음 속성(상태, 댓글)에 대해 아래 옵션 중 하나를 선택합니다.
  | 옵션     | 설명    |
  | ---  | ----------- |
  |작업 항목 생성 시 ServiceNow로 한 번|필드가 작업 항목이 생성되는 시점에만 Work Management에서 ServiceNow로 동기화됩니다. 이후의 변경 사항은 양쪽 모두에 반영되지 않습니다.|
  |ServiceNow로 모든 업데이트|Work Management의 변경 사항은 ServiceNow에 반영되지만, ServiceNow의 변경 사항은 Work Management에 반영되지 않습니다.|
  |양방향 동기화|Work Management의 변경 사항이 ServiceNow에 반영되며, 그 반대의 경우도 마찬가지입니다.|
  |동기화 안 함|필드가 ServiceNow로 동기화되지 않습니다.|
1. Work Management 상태 값이 매핑될 ServiceNow 상태 값을 선택합니다.
1. 변경 사항을 저장합니다.

**참고**: 작업 항목은 프로젝트당 한 번에 하나의 외부 리소스와만 동기화될 수 있습니다. ServiceNow 동기화를 활성화하려면 Jira 자동 생성 및 동기화를 비활성화해야 합니다. 'Open', 'In Progress', 'Closed'의 핵심 상태를 사용하는 작업 항목만 ServiceNow와 동기화할 수 있습니다.
{{% /collapse-content %}}

{{% collapse-content title="Linear 구성" level="h3" expanded=false id="linear" %}}
1. [Linear 통합][5]이 구성되어 있는지 확인합니다.
1. Work Management 프로젝트 설정에서 **Linear**를 활성화하여 프로젝트에서 수동으로 Linear 이슈를 생성할 수 있도록 합니다.
1. 이슈를 생성할 Linear 작업 공간과 팀을 선택합니다.
1. 프로젝트에서 생성된 각 작업 항목에 대해 Linear 이슈를 자동으로 생성하도록 선택할 수 있습니다.
1. 다음 속성(작업 항목 제목, 설명, 담당자, 댓글, 상태 및 우선순위)에 대해 아래 옵션 중 하나를 선택합니다.
  | 옵션                                  | 설명                                                                                                                                    |
  |-----------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
  | 작업 항목 생성 시 Linear로 한 번    | 필드가 작업 항목이 생성되는 시점에만 Work Management에서 Linear로 동기화됩니다. 이후의 변경 사항은 양쪽 모두에 반영되지 않습니다.  |
  | 양방향 동기화           | Work Management의 변경 사항이 Linear에 반영되며, 그 반대의 경우도 마찬가지입니다.                                                                            |
  | 동기화 안 함                              | 필드가 Linear로 동기화되지 않습니다.                                                                                                             |
1. 작업 항목 상태의 경우 Linear 측의 어떤 상태에 매핑할지 선택합니다.
1. 변경 사항을 저장합니다.

**참고**:
- 'Open', 'In Progress', 'Closed'의 핵심 상태를 사용하는 작업 항목만 Linear와 동기화할 수 있습니다.
- 양방향 동기화에는 [웹훅 지원][6]이 필요합니다.
{{% /collapse-content %}}

## 인시던트 자동 에스컬레이션 {#incident-auto-escalation}

이벤트 발생량이 많을 때 수동으로 인시던트를 선언하면 지연이 발생하고 중요한 상황에서 위험 노출이 증가할 수 있습니다. Work Management의 인시던트 자동 에스컬레이션을 사용하면 작업 항목이 정의된 기준과 일치할 때 자동으로 인시던트를 선언할 수 있어 수동 개입이 필요하지 않습니다.

[프로젝트 설정 페이지][1]로 이동하여 **Integrations** > **Datadog Incidents**를 클릭하고 **작업 항목을 Incidents로 자동 에스컬레이션**을 켭니다.

활성화되면 지정된 쿼리 기준을 충족하는 모든 작업 항목(수명 주기 중 언제든지)이 자동으로 인시던트를 트리거하여 팀의 대응 시간을 단축할 수 있습니다.

## Slack 미러링 {#slack-mirroring}
Slack 통합을 사용하면 작업 항목에 연결된 Slack 알림 스레드의 답글이 작업 항목 활동 타임라인에 자동으로 미러링됩니다. 이렇게 하면 Datadog에서 수동으로 업데이트할 필요 없이 작업 항목 컨텍스트를 최신 상태로 유지할 수 있습니다. 작업 항목에 대한 Slack 스레드 미러링은 다음을 지원합니다.
- Work Management에서 생성된 [Slack 알림][8]
- [케이스 핸들][7]을 사용하는 모니터에서 생성된 Slack 알림
- [Slack 통합][9]을 사용하여 Slack에서 직접 생성된 작업 항목에 대한 Slack 스레드

**Slack 스레드 미러링을 구성하려면** 다음 단계를 따르세요.

Datadog 조직에 [Slack 통합][9]이 구성되어 있는지 확인하세요.

Slack 스레드 미러링은 모든 Work Management 프로젝트에 대해 기본적으로 활성화되어 있습니다. 특정 프로젝트에서 비활성화하려면 다음 단계를 따르세요.
1. [**프로젝트 설정**][1]으로 이동하여 프로젝트를 클릭해 설정을 확장합니다.
1. 확장된 메뉴에서 **Integrations** > **Slack**을 클릭합니다.
1. **Slack 스레드 미러링**을 끕니다.

### 작동 방식 {#how-it-works}

- Slack으로 전송된 모든 작업 항목 알림의 경우, 알림 스레드에서의 활동이 작업 항목으로 다시 미러링됩니다.
- 미러링된 활동에는 모든 텍스트 답글이 포함됩니다(첨부 파일은 지원되지 않음). 각 미러링된 메시지에는 Slack 사용자 이름과 출처로 Slack이 표시됩니다.
- 여러 Slack 스레드에서 단일 작업 항목으로 댓글을 미러링할 수 있습니다.
- 미러링은 단방향입니다. 메시지는 Slack에서 작업 항목으로 흐르며, 작업 항목에서 Slack으로는 흐르지 않습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/work/settings
[2]: /ko/integrations/jira/#configure-a-jira-webhook
[3]: /ko/integrations/servicenow/#itom-and-itsm-setup
[4]: /ko/incident_response/on-call/
[5]: /ko/integrations/linear/
[6]: /ko/integrations/linear/#configure-a-linear-webhook
[7]: /ko/incident_response/work_management/create_work_item#automatic-work-item-creation
[8]: /ko/incident_response/work_management/notifications_integrations#notifications
[9]: /ko/integrations/slack/?tab=datadogforslack