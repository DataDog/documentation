---
aliases:
- /ko/error_tracking/ticketing_systems/case_management/
further_reading:
- link: /error_tracking/explorer/
  tag: 문서
  text: Error Tracking 탐색기
- link: /error_tracking/issue_states/
  tag: 문서
  text: Error Tracking에서 문제 상태 확인
- link: /incident_response/work_management/
  tag: 문서
  text: Work Management
is_beta: false
private: false
title: Work Management와 Error Tracking 통합
---
## 개요 {#overview}

Work Management와 Error Tracking을 통합하여 Work Management 작업 항목을 생성하고 Error Tracking 이슈에 연결할 수 있습니다. Error Tracking용 Work Management를 사용하면 다음 작업을 수행할 수 있습니다.

- Error Tracking 이슈 패널에서 직접 Work Management 작업 항목 생성
- 여러 Error Tracking 이슈를 하나의 작업 항목으로 그룹화
- 자동화 규칙을 사용하여 이슈를 특정 Work Management 프로젝트로 자동 라우팅
- 특정 기준과 일치하는 Error Tracking 이슈에 대해 Work Management 작업 항목을 자동으로 생성

## 설정 {#setup}

Error Tracking용 Work Management 통합을 사용하려면 다음 [권한][1]이 필요합니다.

- Error Tracking 읽기
- Error Tracking 이슈 쓰기
- 케이스 읽기
- 케이스 쓰기

## 이슈에서 작업 항목 생성 {#create-a-work-item-from-an-issue}

이슈 패널에서 직접 Work Management 작업 항목을 생성하여 해당 이슈에 대한 조사 작업을 그룹화할 수 있습니다.

1. [Error Tracking 탐색기][2]로 이동합니다.
2. 이슈를 클릭하여 이슈 패널을 엽니다.
3. 이슈 패널의 {{< ui >}}Actions{{< /ui >}} 드롭다운에서 {{< ui >}}Add Case{{< /ui >}}를 클릭합니다.
4. 작업 항목을 생성할 Work Management 프로젝트를 선택합니다. 기본적으로 작업 항목은 Error Tracking 프로젝트에 자동으로 생성됩니다.
5. {{< ui >}}Create{{< /ui >}}를 클릭하여 작업 항목을 생성합니다.

작업 항목을 생성하면 해당 항목이 Error Tracking 이슈에 연결됩니다. 그러면 작업 항목 링크가 이슈 패널에 표시되며, 이슈 상태가 자동으로 {{< ui >}}REVIEWED{{< /ui >}}로 변경됩니다.

이슈가 작업 항목에 연결되면 두 항목의 상태, 담당자 및 코멘트가 양방향으로 동기화됩니다.
이슈 상태와 작업 항목 상태의 동기화 방식에 대한 자세한 내용은 [이슈와 작업 항목 간의 상태 양방향 동기화](#state-dual-way-sync-between-issues-and-work-items)를 참조하세요.

## 여러 이슈를 하나의 작업 항목으로 그룹화 {#group-multiple-issues-into-a-single-work-item}

여러 Error Tracking 이슈를 하나의 Work Management 작업 항목에 연결하여 관련 이슈를 하나의 작업 단위로 그룹화할 수 있습니다.

1. [Error Tracking 탐색기][2]로 이동합니다.
2. 이슈를 클릭하여 이슈 패널을 엽니다.
3. 이슈 패널의 {{< ui >}}Actions{{< /ui >}} 드롭다운에서 {{< ui >}}Add Case{{< /ui >}}를 클릭합니다.
4. {{< ui >}}Add to Existing Case{{< /ui >}} 탭에서 이슈를 그룹화할 작업 항목을 선택합니다.
5. {{< ui >}}Attach to Case{{< /ui >}}를 클릭하여 이슈를 작업 항목에 연결합니다.
6. 이 그룹에 추가하려는 모든 이슈에 대해 위 단계를 반복합니다.

연결된 모든 Error Tracking 이슈가 작업 항목 보기에 표시되므로 관련 오류를 한곳에서 확인할 수 있습니다.

여러 이슈가 하나의 작업 항목에 연결되면 상태, 담당자 및 코멘트가 양방향으로 동기화됩니다. 이슈 상태와 작업 항목 상태의 동기화 방식에 대한 자세한 내용은 [이슈와 작업 항목 간의 상태 양방향 동기화](#state-dual-way-sync-between-issues-and-work-items)를 참조하세요.

작업 항목과 이슈 간의 관계는 일대다 관계입니다. 하나의 작업 항목은 여러 이슈에 연결될 수 있지만, 하나의 이슈는 하나의 작업 항목에만 연결할 수 있습니다.

## 이슈와 작업 항목 간의 양방향 상태 동기화 {#state-dual-way-sync-between-issues-and-work-items}

### 단일 Work Management 작업 항목에 연결된 단일 Error Tracking 이슈 {#single-error-tracking-issue-linked-to-single-work-management-work-item}

단일 Error Tracking 이슈가 하나의 Work Management 작업 항목에 연결되면 두 항목의 상태가 양방향으로 동기화됩니다. 이슈 상태는 다음에 매핑됩니다.
해당 작업 항목 상태 그룹의 기본 상태:

| Error Tracking 이슈 상태 | Work Management 상태 그룹 |
|----------------------------|------------------------------|
| {{< ui >}}FOR REVIEW{{< /ui >}}  | {{< ui >}}Open{{< /ui >}}        |
| {{< ui >}}REVIEWED{{< /ui >}}    | {{< ui >}}In Progress{{< /ui >}} |
| {{< ui >}}RESOLVED{{< /ui >}}    | {{< ui >}}Closed{{< /ui >}}      |
| {{< ui >}}IGNORED{{< /ui >}}     | {{< ui >}}Closed{{< /ui >}}      |
| {{< ui >}}EXCLUDED{{< /ui >}}    | {{< ui >}}Closed{{< /ui >}}      |

### 단일 Work Management 작업 항목에 연결된 여러 Error Tracking 이슈 {#multiple-error-tracking-issues-linked-to-single-work-management-work-item}

여러 Error Tracking 이슈가 동일한 Work Management 작업 항목에 연결된 경우 상황에 따라 이슈 간에도 상태가 동기화됩니다.
- 작업 항목의 상태를 업데이트하면 앞서 설명한 상태 매핑에 따라 연결된 모든 이슈의 상태가 업데이트됩니다.
- 이슈의 상태를 업데이트하면 연결된 다른 이슈와 작업 항목의 상태는 다음 규칙에 따라 결정됩니다.

| 변경 전 상태                                                       | 작업                                                 | 변경 후 상태                                                                                 |
|--------------------------------------------------------------------|--------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| 케이스는 {{< ui >}}CLOSED{{< /ui >}} 상태이고 모든 이슈는 {{< ui >}}RESOLVED{{< /ui >}} 상태입니다.                | 하나의 이슈를 {{< ui >}}FOR REVIEW{{< /ui >}} 상태로 업데이트합니다.                  | 케이스는 {{< ui >}}OPEN{{< /ui >}} 상태이지만 다른 모든 이슈는 {{< ui >}}RESOLVED{{< /ui >}} 상태로 유지됩니다.                                      |
| 케이스는 {{< ui >}}OPEN{{< /ui >}} 상태이고 모든 이슈는 {{< ui >}}FOR REVIEW{{< /ui >}} 상태입니다.                | 하나의 이슈를 {{< ui >}}RESOLVED{{< /ui >}} 상태로 업데이트합니다.                    | 케이스는 {{< ui >}}OPEN{{< /ui >}} 상태이고, 하나의 이슈는 {{< ui >}}RESOLVED{{< /ui >}} 상태이며, 다른 모든 이슈는 {{< ui >}}FOR REVIEW{{< /ui >}} 상태로 유지됩니다.              |
| 케이스는 {{< ui >}}CLOSED{{< /ui >}} 상태이며 연결되지 않은 {{< ui >}}FOR REVIEW{{< /ui >}} 상태의 이슈가 하나 있습니다. | {{< ui >}}FOR REVIEW{{< /ui >}} 상태의 이슈를 {{< ui >}}CLOSED{{< /ui >}} 상태의 케이스에 연결합니다. | 케이스는 {{< ui >}}CLOSED{{< /ui >}} 상태이며 새로 연결된 이슈를 포함한 모든 이슈가 {{< ui >}}RESOLVED{{< /ui >}} 상태입니다.          |
| 케이스는 {{< ui >}}OPEN{{< /ui >}} 상태이며 연결되지 않은 {{< ui >}}RESOLVED{{< /ui >}} 상태의 이슈가 하나 있습니다.     | {{< ui >}}RESOLVED{{< /ui >}} 상태의 이슈를 {{< ui >}}OPEN{{< /ui >}} 상태의 케이스에 연결합니다.     | 케이스는 {{< ui >}}OPEN{{< /ui >}} 상태이며, 새 이슈만 {{< ui >}}RESOLVED{{< /ui >}} 상태로 유지되고 나머지 이슈는 모두 {{< ui >}}FOR REVIEW{{< /ui >}} 상태입니다. |

## 자동화 규칙 {#automation-rules}

특정 이슈가 Work Management 프로젝트에 연결되도록 규칙을 구성할 수 있습니다. 예를 들어 이슈가 특정 규칙과 일치하면 해당 이슈에 대해 수동 또는 자동으로 생성되는 작업 항목은 기본적으로 해당 규칙에서 지정한 프로젝트에 배정됩니다.

### 설정 {#setup-1}

Error Tracking 이슈에 대한 자동화 규칙을 생성하려면 다음 [권한][1] 중 하나가 필요합니다.
- Error Tracking 쓰기
- Error Tracking 설정 쓰기

### 자동화 규칙 생성 {#create-an-automation-rule}

Work Management의 자동화 규칙을 생성하려면 다음 단계를 따르세요.

1. [Error Tracking 설정][3]의 {{< ui >}}Ticketing & Automation{{< /ui >}} 섹션으로 이동합니다.
2. {{< ui >}}New Rule{{< /ui >}}을 클릭합니다.
3. 규칙을 구성합니다.
    - {{< ui >}}Match Criteria{{< /ui >}}: 규칙을 트리거하기 위해 이슈가 충족해야 하는 조건을 정의합니다.
    - {{< ui >}}Project{{< /ui >}}: 규칙과 일치하는 이슈에서 작업 항목이 생성될 때 대상 Work Management 프로젝트를 선택합니다.
    - {{< ui >}}Auto-create{{< /ui >}}: 이슈가 규칙과 일치하면 필요시 작업 항목이 자동으로 생성되도록 설정합니다.
4. {{< ui >}}Save Rule{{< /ui >}}을 클릭합니다.

### 일치 기준 {#match-criteria}

다음 속성을 기반으로 규칙을 구성합니다.

- {{< ui >}}Service{{< /ui >}}: 특정 서비스의 이슈 일치(예: `service:web-store`)
- {{< ui >}}Team{{< /ui >}}: [이슈 팀 소유권][4] 기반의 이슈 일치(예: `team:Shopist`)

여러 기준을 조합하여 정밀한 라우팅 규칙을 만들 수 있습니다. 이슈 일치 쿼리는 다음 연산자를 지원합니다.

- `AND`: 논리 AND(예: `service:web-store AND team:Shopist`)
- `OR`: 논리 OR(예: `service:web-store OR team:Shopist`)
- `-`: 논리 NOT(예: `service:web-store -team:Shopist`)

<div class="alert alert-info"> 규칙에는 적용 순서가 있습니다. 이슈와 일치하는 첫 번째 규칙이 적용됩니다.</div>

### 자동 작업 항목 생성 {#automatic-work-item-creation}

자동화 규칙을 추가할 때 해당 규칙과 일치하는 이슈에 대해 작업 항목이 자동으로 생성되도록 설정할 수 있습니다.

기본적으로 새로운 Error Tracking 이슈가 생성되면 규칙을 평가하고 일치하는 첫 번째 규칙을 적용합니다. 일치하는 규칙에서 작업 항목 자동 생성이 활성화되어 있으면 해당 규칙에 지정된 프로젝트에 새로운 Work Management 작업 항목이 생성되어 일치하는 이슈에 연결됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/rbac/permissions/
[2]: https://app.datadoghq.com/error-tracking/
[3]: https://app.datadoghq.com/error-tracking/settings/automation/
[4]: /ko/error_tracking/issue_team_ownership/