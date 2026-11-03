---
aliases:
- /ko/incident_response/case_management/approvals/
further_reading:
- link: /incident_response/work_management/automation_rules
  tag: 설명서
  text: 작업 항목 자동화 규칙
- link: /incident_response/work_management
  tag: 설명서
  text: 작업 관리
title: 작업 항목 승인
---
## 개요 {#overview}

작업 항목 승인을 통해 작업 항목에 대한 조치를 취하기 전에 하나 이상의 팀 구성원에게 승인을 요청할 수 있으며, 이는 변경 관리 워크플로를 지원합니다. 이 기능은 모든 표준 및 사용자 지정 작업 유형에서 사용할 수 있습니다. 모든 승인 활동은 작업 항목의 활동 타임라인에서 추적됩니다.

## 승인 요청 {#requesting-approvals}

작업 항목에 대한 승인을 요청하려면 다음 단계를 따르세요.
1. 작업 항목에서 오른쪽의 **More Options** 아이콘을 클릭합니다.
1. **Request approval**을 선택합니다.
1. **Add reviewer** 드롭다운을 사용하여 하나 이상의 사용자를 선택합니다.
1. (선택 사항) **요청 설명** 필드에 메시지를 입력합니다.
1. **Request**를 클릭합니다.

**참고**: 검토자가 응답한 후에는 요청을 수정할 수 없습니다.

승인을 요청하면 작업 항목 세부 정보 패널에 **Reviewers** 섹션이 나타납니다. 각 검토자의 이름과 현재 상태(요청됨, 승인됨 또는 거절됨)가 표시됩니다. 검토자 목록을 수정하려면 **Reviewers** 옆의 편집 아이콘을 클릭합니다. 모든 승인 이벤트는 작업 항목의 활동 타임라인에 기록됩니다.

### Notifications {#notifications}

- 승인이 요청되면 승인자에게 이메일로 알림이 전송됩니다.
- 승인 또는 거절이 수신될 때마다 요청자에게 알림이 전송됩니다.

### 권한 {#permissions}

| 액션 | 필수 권한 |
|---|---|
| 작업 항목 승인 요청 | 사례 쓰기 |
| 작업 항목의 승인자로 추가 | 사례 읽기 |
| 작업 항목 승인 또는 거절 | 사례 읽기 |

자세한 정보를 확인하려면 [Datadog 역할 권한][2]을 참조하세요.

## 자동화 규칙 {#automation-rules}

작업 항목 승인 이벤트를 기반으로 작업 항목 자동화 규칙을 트리거할 수 있습니다. 예를 들어, 모든 승인이 완료되면 작업 항목 상태를 자동으로 업데이트하도록 워크플로를 트리거할 수 있습니다.

사용 가능한 트리거는 다음과 같습니다.
- 작업 항목이 받는 첫 번째, 개별 또는 모든 승인
- 작업 항목이 받는 첫 번째 또는 개별 승인 거절

설정 지침은 [작업 항목 자동화 규칙][1]을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/incident_response/work_management/automation_rules
[2]: /ko/account_management/rbac/permissions/#case-and-incident-management