---
further_reading:
- link: /error_tracking/explorer/
  tag: 설명서
  text: Error Tracking 탐색기
- link: /error_tracking/issue_states/
  tag: 설명서
  text: Error Tracking에서 문제 상태 확인
- link: /integrations/jira/
  tag: 설명서
  text: Jira 통합
is_beta: false
private: false
site_support_id: jira_error_tracking
title: Jira와 Error Tracking 통합
---
## 개요 {#overview}

Jira를 Error Tracking과 통합하여 Jira 티켓을 생성하고 Error Tracking 이슈에 연결하세요. Error Tracking에 Jira를 사용하면 다음을 수행할 수 있습니다.

- Error Tracking 이슈 패널에서 직접 Jira 티켓 생성
- 여러 Error Tracking 이슈를 하나의 티켓으로 그룹화
- 자동화 규칙을 사용하여 특정 Jira 보드로 이슈를 자동으로 라우팅
- 특정 기준과 일치하는 Error Tracking 이슈에 대해 Jira 티켓을 자동으로 생성

## 전제 조건 {#prerequisites}

<div class="alert alert-info">Error Tracking 이슈에서 티켓을 생성하는 기능은 Jira Cloud 및 Data Center에서 사용할 수 있습니다. Jira와 Error Tracking 간의 이중 동기화는 Jira Cloud에서만 사용할 수 있습니다.</div>

1. [Datadog용 Jira 통합][7]을 설정합니다.
2. 다음 [권한][1]이 있는지 확인합니다.
   - Error Tracking 읽기
   - Error Tracking 이슈 쓰기
   - 케이스 읽기
   - 케이스 쓰기
   - Integrations 읽기

## 이슈에서 티켓 생성 {#create-a-ticket-from-an-issue}

이슈 패널에서 직접 Jira 티켓을 생성하여 해당 이슈에 대한 조사 작업을 그룹화할 수 있습니다.

1. [Error Tracking 탐색기][2]로 이동합니다.
2. 이슈를 클릭하여 이슈 패널을 엽니다.
3. 이슈 패널의 {{< ui >}}Actions{{< /ui >}} 드롭다운에서 {{< ui >}}Add Jira ticket{{< /ui >}}을 클릭합니다.
4. 티켓을 생성할 Jira 계정과 프로젝트를 선택합니다. 그런 다음, 생성할 티켓 유형을 선택합니다.
5. 필요에 따라 Data Sync 설정에 액세스하여 Datadog과 Jira 간의 데이터 동기화 방식을 구성합니다.
6. {{< ui >}}Create{{< /ui >}}를 클릭하여 티켓을 생성합니다.

{{< img src="error_tracking/create-ticket.png" alt="Error Tracking 이슈에서 Jira 티켓 생성" style="width:100%;" >}}

생성된 티켓은 Error Tracking 이슈에 연결됩니다. 티켓 링크가 이슈 패널에 표시되며, 이슈 상태가 자동으로 {{< ui >}}REVIEWED{{< /ui >}}로 변경됩니다.

이슈가 티켓에 연결되면 상태, 담당자 및 코멘트가 양방향으로 동기화됩니다. 이슈 상태와 티켓 상태가 동기화되는 방식에 대한 자세한 내용은 [이슈와 티켓 간의 상태 양방향 동기화](#state-dual-way-sync-between-issues-and-tickets)를 참조하세요.

## 여러 이슈를 하나의 티켓으로 그룹화 {#group-multiple-issues-into-a-single-ticket}

여러 Error Tracking 이슈를 하나의 Jira 티켓에 첨부하여 관련 이슈를 하나의 작업 단위로 그룹화할 수 있습니다.

1. [Error Tracking 탐색기][2]로 이동합니다.
2. 이슈를 클릭하여 이슈 패널을 엽니다.
3. 이슈 패널의 {{< ui >}}Actions{{< /ui >}} 드롭다운에서 {{< ui >}}Add Jira ticket{{< /ui >}}을 클릭합니다.
4. {{< ui >}}Add to Existing{{< /ui >}} 탭에 이슈를 그룹화할 티켓의 URL을 붙여넣습니다.
5. 필요에 따라 Data Sync 설정에 액세스하여 Datadog과 Jira 간의 데이터 동기화 방식을 구성합니다.
6. {{< ui >}}Link to Issue{{< /ui >}}를 클릭하여 이슈를 티켓에 첨부합니다.
7. 이 그룹에 추가하려는 모든 이슈에 대해 이 작업을 반복합니다.

{{< img src="error_tracking/add-to-existing-ticket.png" alt="기존 Jira 티켓에 Error Tracking 이슈 추가" style="height:300px;" >}}

여러 이슈가 하나의 티켓에 연결되면 해당 이슈의 상태, 담당자, 코멘트가 양방향으로 동기화됩니다. 이슈 상태와 티켓 상태가 동기화되는 방식에 대한 자세한 내용은 [이슈와 티켓 간의 상태 양방향 동기화](#state-dual-way-sync-between-issues-and-tickets)를 참조하세요.

티켓과 이슈 간의 관계는 일대다 관계입니다. 하나의 티켓은 여러 이슈에 연결될 수 있지만, 이슈는 하나의 Jira 티켓에만 연결될 수 있습니다.

## 이슈와 티켓 간의 상태 양방향 동기화 {#state-dual-way-sync-between-issues-and-tickets}

Datadog 프로젝트와 Jira 프로젝트 간에 양방향 동기화가 활성화 및 구성된 경우, Error Tracking 이슈와 Jira 티켓의 상태가 미러링됩니다. 이 상태 동기화에서 예상치 못한 동작이 발생할 경우 [문제 해결](#troubleshooting) 섹션에서 구성을 수정하는 방법을 참조하세요.

### 단일 Jira 티켓에 연결된 단일 Error Tracking 이슈 {#single-error-tracking-issue-linked-to-single-jira-ticket}

단일 Error Tracking 이슈가 Jira 티켓에 연결되면 해당 상태가 양방향으로 동기화됩니다. 이러한 상태 간의 매핑은 티켓 생성 또는 자동화 규칙 양식의 Data Sync 설정에서 구성할 수 있습니다.

{{< img src="error_tracking/jira-status-mapping.png" alt="Error Tracking 이슈 상태를 Jira 티켓 상태에 매핑" style="width:100%;" >}}

### 단일 Jira 티켓에 연결된 여러 Error Tracking 이슈 {#multiple-error-tracking-issues-linked-to-single-jira-ticket}

여러 Error Tracking 이슈가 동일한 Jira 티켓에 연결된 경우, 상황에 따라 해당 이슈들의 상태 간에도 동기화가 이루어집니다. 티켓 상태를 업데이트하면 연결된 모든 이슈가 매핑에 따라 이 상태를 반영하도록 업데이트됩니다.

매핑이 다음과 같이 정의되어 있다고 가정하겠습니다.

| Work Management 상태 그룹 | Jira 티켓 상태 |
|------------------------------|--------------------|
| `Open`                       | `To Do`            |
| `In Progress`                | `In Progress`      |
| `Closed`                     | `Done`             |

이슈 상태를 업데이트하면 연결된 다른 이슈와 Jira 티켓의 결과 상태는 다음 규칙을 따릅니다.

| 초기 상태                                                      | 작업                                                 | 결과 상태                                                                                    |
|--------------------------------------------------------------------|--------------------------------------------------------|----------------------------------------------------------------------------------------------------|
| 티켓이 {{< ui >}}Done{{< /ui >}} 상태이고 모든 이슈가 {{< ui >}}Resolved{{< /ui >}} 상태입니다.                | 하나의 이슈를 {{< ui >}}For Review{{< /ui >}} 상태로 업데이트합니다.                  | 해당 티켓은 {{< ui >}}To Do{{< /ui >}} 상태이지만 다른 모든 이슈는 {{< ui >}}Resolved{{< /ui >}} 상태로 유지됩니다.                                      |
| 티켓이 {{< ui >}}To Do{{< /ui >}} 상태이고 모든 이슈가 {{< ui >}}For Review{{< /ui >}} 상태입니다.             | 하나의 이슈를 {{< ui >}}Resolved{{< /ui >}} 상태로 업데이트합니다.                    | 해당 티켓은 {{< ui >}}To Do{{< /ui >}} 상태이고, 하나의 이슈는 {{< ui >}}Resolved{{< /ui >}} 상태이며, 다른 모든 이슈는 {{< ui >}}For Review{{< /ui >}} 상태로 유지됩니다.              |
| 티켓이 {{< ui >}}Done{{< /ui >}} 상태이고 연결되지 않은 {{< ui >}}For Review{{< /ui >}} 상태의 이슈가 하나 있습니다. | {{< ui >}}For Review{{< /ui >}} 이슈를 {{< ui >}}Done{{< /ui >}} 티켓에 연결합니다. | 해당 티켓이 {{< ui >}}Done{{< /ui >}} 상태이고 새로 연결된 이슈를 포함한 모든 이슈가 {{< ui >}}Resolved{{< /ui >}} 상태입니다.             |
| 티켓이 {{< ui >}}To Do{{< /ui >}} 상태이고 연결되지 않은 {{< ui >}}Resolved{{< /ui >}} 이슈가 하나 있습니다.  | {{< ui >}}Resolved{{< /ui >}} 이슈를 {{< ui >}}To Do{{< /ui >}} 티켓에 연결합니다.  | 해당 티켓이 {{< ui >}}To Do{{< /ui >}} 상태이고 새 이슈를 제외한 모든 이슈가 {{< ui >}}For Review{{< /ui >}} 상태이지만, 새 이슈는 {{< ui >}}Resolved{{< /ui >}} 상태로 유지됩니다. |

## 자동화 규칙 {#automation-rules}

규칙을 구성하여 특정 이슈를 Jira 보드에 일치시킬 수 있습니다. 이슈가 규칙과 일치되면 해당 이슈에 대해 수동 또는 자동으로 생성된 모든 티켓은 규칙에 지정된 보드로 기본 설정됩니다.

### 설정 {#setup}

Error Tracking 이슈에 대한 자동화 규칙을 생성하려면 다음 [권한][1] 중 하나가 필요합니다:
- Error Tracking 쓰기
- Error Tracking 설정 쓰기

### 자동화 규칙 생성 {#create-an-automation-rule}

Jira용 자동화 규칙을 생성하려면 다음 단계를 따르세요.

1. [Error Tracking 설정][3]의 {{< ui >}}Ticketing & Automation{{< /ui >}} 섹션으로 이동합니다.
2. {{< ui >}}New Rule{{< /ui >}}을 클릭합니다.
3. 규칙을 구성합니다.
    - {{< ui >}}Match Criteria{{< /ui >}}: 규칙을 트리거하기 위해 이슈가 충족해야 하는 조건을 정의합니다.
    - {{< ui >}}Destination{{< /ui >}}: 규칙과 일치하는 이슈에서 티켓이 생성될 때 대상 Jira 계정 및 프로젝트를 선택합니다. 생성할 티켓 유형을 선택하고 티켓의 필수 필드에 대한 값을 입력합니다.
    - {{< ui >}}Auto-create{{< /ui >}}: 이슈가 일치할 때 선택적으로 자동 티켓 생성을 활성화합니다.
4. {{< ui >}}Save Rule{{< /ui >}}을 클릭합니다.

{{< img src="error_tracking/create-jira-automation-rule.png" alt="Jira 자동화 규칙 생성" style="width:100%;" >}}

### 일치 기준 {#match-criteria}

다음 속성을 기반으로 규칙을 구성합니다.

- {{< ui >}}Service{{< /ui >}}: 특정 서비스의 이슈 일치(예: `service:web-store`)
- {{< ui >}}Team{{< /ui >}}: [이슈 팀 소유권][4] 기반의 이슈 일치(예: `team:Shopist`)

여러 기준을 조합하여 정밀한 라우팅 규칙을 만들 수 있습니다. 이슈 일치 쿼리는 다음 연산자를 지원합니다.

- `AND`: 논리 AND(예: `service:web-store AND team:Shopist`)
- `OR`: 논리 OR(예: `service:web-store OR team:Shopist`)
- `-`: 논리 NOT(예: `service:web-store -team:Shopist`)

<div class="alert alert-info">규칙은 순서대로 적용됩니다. 이슈와 일치하는 첫 번째 규칙이 적용됩니다.</div>

### 자동 티켓 생성 {#automatic-ticket-creation}

자동화 규칙을 추가할 때 규칙과 일치하는 이슈에 대해 자동 Jira 티켓 생성을 활성화할 수 있습니다.

{{< img src="error_tracking/enable-auto-ticket-creation.png" alt="자동 케이스 생성 활성화" style="height:300px;" >}}

새로운 Error Tracking 이슈가 생성되면 규칙을 평가하고 일치하는 첫 번째 규칙을 적용합니다. 해당 일치 규칙에서 자동 티켓 생성이 활성화된 경우, 규칙에 지정된 Jira 보드에 새 Jira 티켓이 생성되고 일치하는 이슈에 연결됩니다.

## 문제 해결 {#troubleshooting}

Error Tracking에서 티켓팅 시스템을 사용할 때 예상치 못한 동작이 발생하면 다음 문제 해결 단계를 통해 문제를 신속하게 해결할 수 있습니다. 문제가 계속되면 [Datadog 지원팀][5]에 문의하세요.

### Jira와 Error Tracking 간의 동기화가 중단됨 {#sync-is-broken-between-jira-and-error-tracking}

Jira 티켓과 해당 Error Tracking 이슈 간에 동기화 문제가 발생하는 경우(예: Jira 티켓을 닫을 때 이슈 상태가 업데이트되지 않는 경우), 다음 단계가 모두 올바르게 구성되었는지 확인하세요.

1. 이슈 패널에서 이슈가 Jira 티켓에 올바르게 연결되어 있는지 확인합니다.
2. Datadog에서 Error Tracking 이슈와 Jira 티켓의 연결 지점 역할을 할 Work Management 작업 항목을 자동으로 생성한 상태입니다. 이슈 패널에서 이 작업 항목에 액세스하여 해당 항목이 생성된 Work Management 프로젝트를 찾을 수 있습니다. Work Management 설정에서 이 프로젝트에 Jira 통합이 활성화되어 있고 올바른 Jira 계정과 보드가 구성되어 있는지 확인하세요.

3. Work Management 설정에서 이 프로젝트에 Work Management와 Jira 간의 동기화가 활성화되어 있는지 확인합니다. 동기화하려는 필드에 Datadog과 Jira 간의 양방향 동기화가 구성되어 있는지 확인하세요.

4. Datadog과 Jira 간의 업데이트를 자동으로 동기화하려면 웹훅을 구성해야 합니다. Jira 설정에서 이 웹훅을 확인하세요. 웹훅이 누락된 경우 [다음 단계][6]에 따라 웹훅을 추가하고 Datadog과 Jira 간의 동기화 문제를 해결하세요.

### Jira 티켓 리포터가 잘못된 사용자임 {#reporter-on-jira-tickets-is-the-wrong-user}

Error Tracking 이슈에서 Jira 티켓이 생성되면 티켓의 {{< ui >}}Reporter{{< /ui >}} 필드가 티켓 생성을 트리거한 사용자가 아닌 Jira 통합을 구성한 Datadog 사용자로 설정됩니다. 이는 Datadog용 Jira 통합의 알려진 제한 사항이며 Error Tracking에서 생성된 모든 티켓에 적용됩니다. 특정 티켓의 리포터를 변경하려면 생성 후 Jira에서 직접 업데이트하세요.

### 각 Jira 티켓에 대해 새로운 Work Management 프로젝트가 생성됨 {#a-new-work-management-project-is-created-for-each-jira-ticket}

Datadog Work Management는 각 Jira 이슈 유형을 서로 다른 Work Management 프로젝트에 매핑합니다. 이전에 사용된 적 없는 Jira 이슈 유형을 사용하여 Error Tracking 이슈에서 티켓을 생성하면, Error Tracking 이슈와 Jira 티켓을 연결하기 위해 새로운 Work Management 프로젝트가 자동으로 생성됩니다. 이는 시간이 지남에 따라 여러 Jira 이슈 유형으로 티켓을 생성하면 이슈 유형당 하나씩 여러 Work Management 프로젝트가 생성됨을 의미합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/rbac/permissions/
[2]: https://app.datadoghq.com/error-tracking/
[3]: https://app.datadoghq.com/error-tracking/settings/automation/
[4]: /ko/error_tracking/issue_team_ownership/
[5]: /ko/help/
[6]: /ko/integrations/jira/#configure-a-jira-webhook
[7]: /ko/integrations/jira/#setup