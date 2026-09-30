---
further_reading:
- link: /error_tracking/explorer/
  tag: 설명서
  text: Error Tracking 탐색기
- link: /error_tracking/issue_states/
  tag: 설명서
  text: Error Tracking에서 문제 상태 확인
- link: /integrations/linear/
  tag: 설명서
  text: Linear 통합
is_beta: false
private: false
site_support_id: linear_error_tracking
title: Linear와 Error Tracking 통합
---
## 개요 {#overview}

Linear를 Error Tracking과 통합하여 Linear 이슈를 생성하고 Error Tracking 이슈에 연결하세요. 이 통합을 통해 할 수 있는 작업은 다음과 같습니다.

- Error Tracking 이슈 패널에서 직접 Linear 이슈 생성
- 여러 Error Tracking 이슈를 하나의 Linear 이슈로 그룹화

## 전제 조건 {#prerequisites}

1. [Datadog용 Linear 통합][7]을 설정합니다.
2. 다음 [권한][1]이 있는지 확인합니다.
   - Error Tracking 읽기
   - Error Tracking 이슈 쓰기
   - 케이스 읽기
   - 케이스 쓰기
   - Integrations 읽기

## Error Tracking 이슈에서 Linear 이슈 생성 {#create-a-linear-issue-from-an-error-tracking-issue}

이슈 패널에서 직접 Linear 이슈를 생성하여 해당 이슈에 대한 조사 작업을 그룹화하려면 다음 단계를 따르세요.

1. [Error Tracking 탐색기][2]로 이동합니다.
2. 이슈를 클릭하여 이슈 패널을 엽니다.
3. 이슈 패널의 **Actions** 드롭다운에서 **Add Linear issue**를 클릭합니다.
4. 새 Linear 이슈에 사용할 Linear 작업 공간과 팀을 선택합니다.
5. 필요에 따라 Data Sync 설정을 열어 Datadog과 Linear 간의 데이터 동기화 방식을 구성합니다.
6. **Create**를 클릭하여 Linear 이슈를 생성합니다.

{{< img src="error_tracking/create-linear-issue.png" alt="Error Tracking 이슈에서 Linear 이슈 생성" style="width:100%;" >}}

Linear 이슈가 생성되면 Error Tracking 이슈에 연결되어 이슈 패널에 표시됩니다. Error Tracking 이슈 상태가 자동으로 **REVIEWED**로 변경됩니다.

Error Tracking 이슈가 Linear 이슈에 연결되면 상태, 담당자, 댓글이 양방향으로 동기화됩니다. 자세한 내용은 [Error Tracking 이슈와 Linear 이슈 간의 상태 양방향 동기화](#state-two-way-sync-between-error-tracking-issues-and-linear-issues)를 참조하세요.

## 여러 Error Tracking 이슈를 하나의 Linear 이슈로 그룹화 {#group-multiple-error-tracking-issues-into-a-single-linear-issue}

여러 Error Tracking 이슈를 하나의 Linear 이슈에 연결하여 관련 이슈를 하나의 작업 단위로 그룹화하려면 다음 단계를 따르세요.

1. [Error Tracking 탐색기][2]로 이동합니다.
2. 이슈를 클릭하여 이슈 패널을 엽니다.
3. 이슈 패널의 **Actions** 드롭다운에서 **Add Linear issue**를 클릭합니다.
4. **Add to Existing** 탭에서 Error Tracking 이슈를 그룹화할 Linear 이슈의 URL을 붙여넣습니다.
5. 필요에 따라 Data Sync 설정을 열어 Datadog과 Linear 간의 데이터 동기화 방식을 구성합니다.
6. **Link to Issue**를 클릭하여 Error Tracking 이슈를 Linear 이슈에 연결합니다.
7. 이 그룹에 추가하려는 모든 Error Tracking 이슈에 대해 이 작업을 반복합니다.

{{< img src="error_tracking/add-to-existing-linear-issue.png" alt="기존 Linear 이슈에 Error Tracking 이슈 추가" style="height:300px;" >}}

여러 Error Tracking 이슈가 단일 Linear 이슈에 연결되면 상태, 담당자, 댓글이 양방향으로 동기화됩니다. 자세한 내용은 [Error Tracking 이슈와 Linear 이슈 간의 상태 양방향 동기화](#state-two-way-sync-between-error-tracking-issues-and-linear-issues)를 참조하세요.

Linear 이슈와 Error Tracking 이슈 간의 관계는 1:N 관계입니다. 단일 Linear 이슈는 여러 Error Tracking 이슈에 연결될 수 있지만, Error Tracking 이슈는 하나의 Linear 이슈에만 연결될 수 있습니다.

## Error Tracking 이슈와 Linear 이슈 간의 상태 양방향 동기화 {#state-two-way-sync-between-error-tracking-issues-and-linear-issues}

Datadog 팀과 Linear 팀 간에 양방향 동기화가 활성화 및 구성된 경우, Error Tracking 이슈와 Linear 이슈의 상태가 미러링됩니다. 예상치 못한 동작이 발생할 경우 [문제 해결](#troubleshooting) 섹션에서 구성을 수정하는 방법을 참조하세요.

### 단일 Linear 이슈에 연결된 단일 Error Tracking 이슈 {#single-error-tracking-issue-linked-to-single-linear-issue}

단일 Error Tracking 이슈가 Linear 이슈에 연결되면 해당 상태가 양방향으로 동기화됩니다. 이러한 상태 간의 매핑은 Linear 이슈 생성 양식의 Data Sync 설정에서 구성할 수 있습니다.

{{< img src="error_tracking/linear-status-mapping.png" alt="Error Tracking 이슈 상태를 Linear 이슈 상태에 매핑" style="width:100%;" >}}

### 단일 Linear 이슈에 연결된 여러 Error Tracking 이슈 {#multiple-error-tracking-issues-linked-to-single-linear-issue}

여러 Error Tracking 이슈가 동일한 Linear 이슈에 연결된 경우, 수행하는 작업에 따라 상태가 동기화됩니다. Linear 이슈의 상태를 업데이트하면 연결된 모든 Error Tracking 이슈가 매핑에 따라 이 상태를 반영하도록 업데이트됩니다.

매핑이 다음과 같이 정의되어 있다고 가정하겠습니다.

| Work Management 상태 그룹 | Linear 이슈 상태 |
|------------------------------|--------------------|
| `Open`                       | `Todo`             |
| `In Progress`                | `In Progress`      |
| `Closed`                     | `Done`             |

Error Tracking 이슈의 상태를 업데이트하면 연결된 다른 Error Tracking 이슈와 Linear 이슈의 상태는 다음 규칙에 따라 변경됩니다.

| 초기 상태                                                                  | 작업                                                          | 결과 상태                                                                                       |
|--------------------------------------------------------------------------------|-----------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| Linear 이슈는 `Done` 상태이고 모든 연결된 Error Tracking 이슈는 `Resolved` 상태입니다. | 하나의 Error Tracking 이슈를 `For Review`로 업데이트합니다.                | Linear 이슈가 `Todo`로 변경됩니다. 연결된 다른 Error Tracking 이슈는 `Resolved`로 유지됩니다.         |
| Linear 이슈는 `Todo` 상태이고 모든 연결된 Error Tracking 이슈는 `For Review` 상태입니다. | 하나의 Error Tracking 이슈를 `Resolved`로 업데이트합니다.                  | Linear 이슈는 `Todo`로 유지됩니다. 업데이트된 Error Tracking 이슈는 `Resolved` 상태가 되고, 나머지는 `For Review`로 유지됩니다. |
| Linear 이슈는 `Done` 상태이고, 연결되지 않은 Error Tracking 이슈는 `For Review` 상태입니다. | `For Review` Error Tracking 이슈를 Linear 이슈에 연결합니다. | Linear 이슈는 `Done`로 유지됩니다. 새로 연결된 이슈를 포함하여 모든 연결된 Error Tracking 이슈는 `Resolved` 상태가 됩니다. |
| Linear 이슈는 `Todo` 상태이고, 연결되지 않은 Error Tracking 이슈는 `Resolved` 상태입니다. | `Resolved` Error Tracking 이슈를 Linear 이슈에 연결합니다.   | Linear 이슈는 `Todo`로 유지됩니다. 다른 연결된 Error Tracking 이슈는 `For Review`로 유지되고, 새로 연결된 이슈는 `Resolved`로 유지됩니다. |

## 문제 해결 {#troubleshooting}

Error Tracking에서 티켓팅 시스템을 사용할 때 예상치 못한 동작이 발생하면 다음 문제 해결 단계를 참조하세요. 문제가 계속되면 [Datadog 지원팀][5]에 문의하세요.

### Linear와 Error Tracking 간의 동기화가 중단됨 {#sync-is-broken-between-linear-and-error-tracking}

Linear 이슈와 해당 Error Tracking 이슈 간에 동기화 문제가 발생하는 경우(예: Linear 이슈를 닫을 때 Error Tracking 이슈 상태가 업데이트되지 않는 경우), 다음 단계가 모두 올바르게 구성되어 있는지 확인하세요.

1. 이슈 패널에서 Error Tracking 이슈가 Linear 이슈에 올바르게 연결되어 있는지 확인합니다.
2. Work Management가 Linear와 동기화되도록 올바르게 구성되었는지 확인합니다.

   Datadog은 Error Tracking 이슈와 Linear 이슈를 연결하기 위해 Work Management 작업 항목을 자동으로 생성합니다. 구성을 확인하려면 다음 단계를 따르세요.
   - 이슈 패널에서 연결된 Work Management 작업 항목을 열어 해당 프로젝트를 확인합니다.
   - Work Management 설정에서 이 프로젝트에 Linear 통합이 활성화되어 있는지 확인합니다.
   - 올바른 Linear 작업 공간과 팀이 구성되어 있는지 확인합니다.

3. Work Management 설정에서 이 프로젝트에 Work Management와 Linear 간의 동기화가 활성화되어 있는지 확인합니다. 동기화하려는 필드에 Datadog과 Linear 간의 양방향 동기화가 구성되어 있는지 확인하세요.

4. Linear 설정에서 Datadog과 Linear 간에 업데이트를 자동으로 동기화하도록 웹훅이 구성되어 있는지 확인합니다. 웹훅이 누락된 경우 [Linear 웹훅을 추가][6]하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/rbac/permissions/
[2]: https://app.datadoghq.com/error-tracking/
[5]: /ko/help/
[6]: /ko/integrations/linear/#configure-a-linear-webhook
[7]: /ko/integrations/linear/