---
further_reading:
- link: /security/automation_pipelines
  tag: 설명서
  text: 자동화 파이프라인
- link: /security/ticketing_integrations
  tag: 설명서
  text: 티켓팅 통합
- link: /incident_response/work_management
  tag: 설명서
  text: Case Management
products:
- icon: cloud-security-management
  name: Cloud Security
  url: /security/cloud_security_management/
- icon: security-code-security
  name: Code Security
  url: /security/code_security/
- icon: app-sec
  name: App and API Protection
  url: /security/application_security/
- icon: security-workload-security
  name: Workload Protection
  url: /security/workload_protection/
site_support_id: case_management
title: 티켓 생성 규칙
---
{{< product-availability >}}

새로운 탐지 결과를 발견하면 Jira 또는 Case Management에서 티켓을 자동으로 생성하도록 티켓 생성 규칙을 구성하세요. 이 접근 방식은 수동 분류 없이 기존 엔지니어링 워크플로에서 보안 문제를 추적하여 팀이 새로운 위협에 대규모로 신속하게 대응할 수 있도록 돕습니다. 보안 탐지 결과와의 티켓팅 통합에 대한 자세한 내용은 [티켓팅 통합][3]을 참조하세요.

## 티켓 생성 규칙 생성하기 {#create-a-ticket-creation-rule}

1. Datadog에서 **Security** > **Settings** > [Findings Automation][2]로 이동합니다. **Add a New Rule**을 클릭한 다음 **Create Ticket**을 선택합니다. Create a New Rule 페이지가 열립니다.
1. **Rule name** 아래에 규칙을 설명하는 이름을 입력합니다(예: "엔지니어링 팀을 위한 중요 취약성").
1. 다음 필드에 규칙 기준을 추가합니다.
    - **다음 유형 중 하나**: 규칙이 검사해야 하는 탐지 결과의 유형입니다. 사용 가능한 유형은 다음과 같습니다.
      - 런타임 코드 취약성
      - 정적 코드 취약성
      - 라이브러리 취약성
      - 시크릿
      - 코드형 인프라
      - 컨테이너 이미지 취약성
      - 호스트 취약성
      - 구성 오류
      - 공격 경로
      - ID 위험
      - API 보안
      - 워크로드 활동
    - **이 태그 또는 속성 중 하나**: 규칙이 적용되려면 일치해야 하는 리소스 태그 또는 속성입니다.
1. 규칙에 심각도 기준을 추가하려면 **Add Severity**를 클릭합니다.
1. 티켓팅 시스템을 선택하고 티켓 대상을 구성합니다.
   - **Jira**
     - **Jira Account**: 사용할 Atlassian 인스턴스를 선택합니다.
     - **Space**: Jira 프로젝트를 선택합니다. 이 스페이스가 [Jira 웹훅][5]에 추가되어 있는지 확인하세요.
     - **Ticket Type**: 생성할 Jira 이슈 유형을 선택합니다(예: **작업**).
     - **Assignee**(선택 사항): 자동으로 생성된 티켓을 할당할 사용자를 지정합니다.
     - Datadog이 생성하는 Jira 티켓에 필드를 더 추가하려면 **Add Optional Field**를 사용하세요.
     - **Data Sync Settings**를 확장하여 연결된 Case Management 프로젝트 및 양방향 동기화 구성을 검토하거나 업데이트하세요.
   - **Case Management**
     - **Case Management Project**: 기존 Case Management 프로젝트를 선택하거나 새로 만드세요.
     - **Assignee**(선택 사항): 자동으로 생성된 케이스를 할당할 사용자를 지정합니다.
1. **Rate limit**에서 이 규칙이 UTC 일별로 생성할 수 있는 [최대 티켓 수](#daily-ticket-limit)를 입력합니다.
1. 저장하기 전에 규칙을 테스트하려면 **Test Rule**을 클릭하고 일치하는 탐지 결과를 선택한 다음 **Run Test**를 클릭합니다. 테스트가 완료되면 생성된 티켓을 조회하거나 테스트 티켓을 탐지 결과에서 분리할 수 있습니다.
1. **Save**를 클릭합니다. 이 규칙은 새로운 탐지 결과에만 적용됩니다. 결과를 탐지한 후 해당 티켓이 생성되기까지 최대 몇 분이 소요될 수 있습니다.

**참고**: 티켓 생성 규칙은 새로운 결과에 대해서만 티켓을 생성합니다. Datadog은 규칙을 생성할 때 기존 결과에 대해 소급하여 티켓을 생성하지 않습니다.

## 자동으로 생성된 티켓 식별하기 {#identify-automatically-created-tickets}

{{< img src="security/automation_pipelines/ticket_creation_lightning_indicator.png" alt="번개 아이콘으로 표시되며 동일한 규칙에서 생성된 티켓이 있는 모든 결과를 볼 수 있는 링크가 포함되어 있는, 자동화 규칙에 의해 생성된 케이스를 보여주는 Case Management 티켓 팝업" style="width:60%;" >}}

규칙에 의해 생성된 티켓은 탐지 결과 측면 패널 및 탐색기 보기에서 번개 표시기로 표시됩니다. 표시기 위로 마우스를 가져가면 티켓의 이유가 되는 자동화 규칙이 표시되고 해당 규칙에 대한 링크가 제공됩니다.

## 규칙 일치 순서 {#rule-matching-order}

Datadog은 탐지 결과를 식별할 때 티켓 생성 규칙의 시퀀스에 따라 해당 탐지 결과를 평가합니다. 첫 번째 규칙부터 시작하여 일치하는 항목이 있으면 Datadog은 해당 규칙의 구성을 사용하여 티켓을 생성하고 추가 평가를 중단합니다. 일치하는 항목이 없으면 Datadog은 다음 규칙으로 넘어갑니다. 이 프로세스는 일치하는 항목이 발견되거나 모든 규칙을 확인하여 일치하는 항목이 없을 때까지 계속됩니다.

## 일일 티켓 제한 {#daily-ticket-limit}

각 규칙에는 자정(UTC 기준)에 재설정되는 구성 가능한 일일 티켓 제한이 있습니다. 제한에 도달하면 Datadog은 동일한 프로젝트에 규칙이 일일 제한에 도달했음을 설명하는 마지막 티켓을 하나 생성한 다음, 해당 날짜의 나머지 시간 동안 티켓 생성을 중단합니다. 제한을 초과한 탐지 결과는 제한이 초기화될 때 소급하여 티켓이 생성되지 않지만, 수동으로 티켓을 생성할 수는 있습니다.

## 손상된 규칙 {#broken-rules}

프로젝트 구성 오류로 인해 티켓이 생성되지 않는 경우(예: 연결된 Jira 프로젝트가 더 이상 유효하지 않은 경우) Datadog은 자동으로 규칙을 비활성화하고 손상된 것으로 표시합니다.

{{< img src="security/automation_pipelines/ticket_creation_broken_rule.png" alt="'Rule auto-disabled due to a ticketing integration error'라는 경고 툴팁이 표시된 티켓 생성 규칙을 보여주는 Automation Pipelines 목록" style="width:100%;" >}}

자동 티켓 생성을 재개하려면 프로젝트 구성을 수정하고 규칙을 다시 활성화하세요.

## 비활성화되거나 삭제된 규칙 {#disabled-or-deleted-rules}

티켓 생성 규칙을 비활성화하거나 삭제해도 해당 규칙으로 이전에 생성된 티켓은 탐지 결과에 계속 연결되어 있습니다. 해당 티켓은 분리되거나 삭제되지 않습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/security/configuration/findings-automation?opened-sections=create_ticket
[3]: /ko/security/ticketing_integrations/
[5]: /ko/integrations/jira/#configure-a-jira-webhook