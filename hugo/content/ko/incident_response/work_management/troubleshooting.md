---
aliases:
- /ko/service_management/case_management/troubleshooting/
- /ko/incident_response/case_management/troubleshooting/
title: 문제 해결
---
## 개요 {#overview}

이 가이드는 Work Management의 타사 통합 관련 문제를 해결하는 데 도움을 주기 위한 것입니다. 문제가 계속되면 추가 지원을 위해 [Datadog 지원팀][1]에 문의하세요.

## Jira {#jira}

사용자 지정 필드가 있는 Jira 이슈 유형, 비공개 Jira 프로젝트 및 온프레미스 Jira 인스턴스는 지원되지 않습니다. 동기화를 통한 자동 Jira 티켓 생성에 문제가 있는 경우 다음 섹션을 참조하세요.

### 구성 {#configuration}

1. Jira 프로젝트가 Jira 통합 설정 화면의 드롭다운에 입력되지 않는 경우, `manage_integrations` 권한이 있는지 검사하십시오. 

1. Jira에서 이벤트를 수신하도록 웹훅을 설정했는지 확인하십시오.

### 동기화 및 업데이트 {#syncing-and-updates}

1. Jira 이슈와 동기화 중인 작업 항목을 다른 Work Management 프로젝트로 이동하면 동기화가 중지됩니다. 이동 후 새 프로젝트의 작업 항목에는 연결된 Jira 이슈가 없습니다.
1. Jira 워크플로에서 허용되지 않는 방식으로 작업 항목의 상태를 업데이트하면 해당 작업 항목은 상태 매핑과 동기화되지 않습니다.
1. Work Management 또는 Jira에서의 삭제를 포함한 코멘트 업데이트는 다른 쪽에 반영되지 않습니다.
1. 양방향 통합이 활성화된 후 생성된 작업 항목만 동기화됩니다. Datadog은 통합이 활성화되기 전에 존재했던 작업 항목을 소급하여 동기화하지 않습니다.

### Jira 이슈 리포터 {#jira-issue-reporter}

1. Jira 이슈 리포터가 Jira 통합을 설정한 Datadog 사용자로 반영되는 몇 가지 시나리오가 있습니다. 다음은 해당 시나리오의 일부 예시입니다.
    - 작업 항목을 생성한 Datadog 사용자가 Jira 계정이 없는 경우
    - Jira 사용자가 이메일 가시성을 숨긴 경우
1. 미러링된 Jira 이슈의 리포터가 업데이트되어도 "생성한 사용자" 필드는 편집할 수 없으므로 이는 Work Management에 반영되지 않습니다.



[1]: https://docs.datadoghq.com/ko/help/