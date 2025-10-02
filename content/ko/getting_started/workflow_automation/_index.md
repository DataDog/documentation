---
further_reading:
- link: https://www.datadoghq.com/blog/automate-end-to-end-processes-with-datadog-workflows/
  tag: 블로그
  text: Datadog 워크플로를 통해 엔드투엔드 프로세스 자동화 및 이벤트에 신속하게 대응
- link: /service_management/workflows/access/
  tag: 설명서
  text: 액세스 및 인증
- link: /security/cloud_security_management/workflows/
  tag: 설명서
  text: 보안 워크플로 자동화
title: 워크플로 자동화 시작
---

## 개요

Workflow Automation을 사용하면 Datadog 알림 및 보안 신호에 대응하여 엔드 투 엔드 프로세스를 자동화할 수 있습니다. Workflow Automation은 실시간 관측 데이터를 기반으로 하므로 문제를 더 빠르게 해결하고 시스템의 가용성과 보안을 사전에 유지할 수 있습니다.

모니터 알림에 의해 트리거되는 커스텀 워크플로를 만들려면 이 가이드를 따르세요. 트리거되면 워크플로는 Jira에서 작업을 생성하고 Jira 티켓 링크와 함께 Slack에 알림을 보냅니다. 이 가이드에서는 워크플로의 한 단계에서 다른 단계로 데이터를 전달하고, 워크플로를 저장 및 게시하며, 워크플로의 실행 기록을 보는 방법을 다룹니다.

## 사전 필수 조건

시작하기 전에 [Datadog 계정][1]에 Jira 및 Slack 통합을 설치해야 합니다. 설치 지침은 [Slack][2] 및 [Jira 통합][3] 문서를 참고하세요.

Jira 및 Slack 통합 타일에서 설정한 계정 자격 증명 및 인증은 워크플로 인증의 Jira 및 Slack 작업에 자동으로 전파됩니다. 일부 통합에서는 인증을 위해 추가 설정이 필요합니다. 자세한 내용은 [연결][4]을 참고하세요.

## 워크플로 구축하기

### 모니터 트리거로 워크플로 만들기
모니터나 보안 신호와 같은 알림에서, 일정에서, 또는 수동으로 워크플로를 트리거할 수 있습니다. 모니터 트리거를 사용하여 워크플로를 생성하세요.

워크플로 생성
1. **[Workflow Automation][5]** 페이지에서 **New Workflow**를 클릭합니다.
1. 워크플로의 이름과 설명을 입력합니다. 예제 워크플로에서는 다음 이름과 설명을 사용합니다.<br>
   이름: `Create a Jira Ticket`.<br>
   설명: `Create a Jira issue and Slack notification when there is a monitor alert`.

모니터를 추가하고 구성합니다.
1. 워크플로 캔버스에서 **Add Trigger**를 클릭하고 **Monitor**를 선택합니다.
1. **Configure** 탭에서 `@workflow-` 옆에 워크플로: `Create-Jira-Ticket`에 대한 고유 ID 를 입력합니다.<br>
   워크플로 핸들은 항상 `@workflow-`로 시작합니다. 나중에 이 핸들을 사용하여 워크플로를 모니터 알림에 연결합니다.
1. **Save**를 클릭하여 워크플로를 저장합니다.

{{< img src="/getting_started/workflow_automation/trigger1.png" alt="워크플로용 트리거">}}

### Jira 및 Slack 작업 추가하기
Jira 단계를 추가하고 구성합니다.
1. 워크플로 캔버스에서 **+** 아이콘을 클릭합니다.
1. Jira 작업을 검색하고 **Create issue**를 선택합니다.
1. 워크플로 캔버스에서 **Create issue** 단계를 클릭합니다.
1. **Configure** 탭에서 **Jira Account**를 선택합니다. 계정은 Jira 통합 타일의 **Jira Account**섹션에 있는 Jira URL과 일치해야 합니다.
1. 워크플로가 생성하는 Jira 이슈에 대한 **Project** 및 **Issue type**을 입력합니다.
1. Jira 이슈에 대한 **Summary** 및 **Description**을 입력하고 컨텍스트 변수를 사용하여 워크플로를 트리거하는 모니터의 데이터를 전달합니다. 컨텍스트 변수를 이중 중괄호(`{{`)로 묶어 단계에서 컨텍스트 변수에 액세스할 수 있습니다.<br><br>
   다음 예제 설명에서는 소스, 트리거 및 워크플로 변수를 사용하여 다음을 전달합니다.
   - 모니터 알림을 발생시킨 소스
   - 영향을 받은 모니터에 대한 링크
   - 워크플로 이름 및 워크플로 ID

   ```
   The CPU usage is above the 95% threshold for {{ Trigger.hostname }}

   Please investigate - see this Datadog Dashboard to view all workflow executions:
   https://app.datadoghq.com/dash/integration/workflow_automation?refresh_mode=sliding&from_ts=1698164453793&to_ts=1698168053793&live=true.

   The workflow that created this Jira issue is
   {{ WorkflowName }} : {{ WorkflowId }}

   The monitor that triggered the workflow can be found here: {{ Source.url }}
   ```

   컨텍스트 변수에 대한 자세한 내용은 **[Context variables][6]**를 참조하세요.

1. **Configure** 탭에서  **Test**를 클릭하여 Jira 작업을 테스트합니다. 작업을 테스트하면 실제 Jira 티켓이 생성됩니다.
1. **Save**를 클릭하여 워크플로를 저장합니다.

다음으로 Slack 단계를 추가합니다.
1. 워크플로 캔버스에서 더하기 아이콘을 클릭하여 다른 단계를 추가합니다.
1. Slack을 검색하고 **Send message**를 선택합니다.
1. **Slack Workspace 이름**을 입력합니다.
1. **Slack Channel 이름**을 입력합니다.
1. 보다 유용한 Slack 알림을 얻으려면 단계 출력 변수를 사용합니다. 단계 출력 변수를 사용하면 워크플로의 Jira 단계에서 Slack 단계로 데이터를 전달할 수 있습니다. Slack 메시지에 Jira 이슈 키, 모니터 이름, Jira 이슈를 포함하려면 다음 메시지 텍스트를 사용하세요.

   ```
   The monitor named {{ Source.monitor.name }} triggered and created a new Jira issue
   {{ Steps.Create_issue.issueKey }}: {{ Steps.Create_issue.issueUrl }}

   The workflow that created this Jira issue is {{ WorkflowName }}
   ```

1. 작업을 테스트하려면 **Configure** 탭에서 **Test**를 클릭합니다. 작업을 테스트하면 실제 Slack 메시지가 생성됩니다.
1. 모니터 알림 드롭다운에서 워크플로 이름을 보려면 워크플로를 저장하고 발행해야 합니다. 워크플로 페이지에서 **Publish**를 클릭합니다.

## 워크플로 테스트 및 발행하기

<div class="alert alert-info">사용 중인 Slack 및 Jira 계정에 연결된 워크플로를 테스트하면 실제 Slack 메시지와 Jira 티켓이 생성됩니다.</div>

변경사항을 워크플로에 적용하려면 **Save**를 클릭합니다. 다음으로 워크플로를 수동으로 트리거하여 테스트합니다.

워크플로를 수동으로 트리거하려면 워크플로 페이지에서 **Run**을 클릭하고 트리거 변수에 대한 값을 입력합니다.

{{< img src="/getting_started/workflow_automation/run_workflow.png" alt="워크플로를 수동으로 트리거" style="width:90%;" >}}

워크플로를 실행하면 Jira 티켓이 생성되고 Slack 메시지가 전송되는지 확인합니다.

예약 및 트리거된 워크플로는 발행하기 전까지 자동으로 실행되지 않습니다. 워크플로를 발행하려면 워크플로 페이지에서 **Publish**를 클릭하세요.

## 워크플로를 트리거하는 모니터 업데이트하기

1. Datadog의 [Monitors 페이지][7]로 이동합니다.
1. 워크플로를 트리거하려는 모니터를 찾아 편집하거나 새 모니터를 만듭니다.
1. **Configure notifications & automations** 섹션에서 **Add Workflow**를 클릭합니다.
1. 워크플로 멘션 이름(`@workflow-Create-Jira-Ticket`)을 사용하여 워크플로를 검색하고 드롭다운에서 선택합니다.
   - `@workflow-name(key=value, key=value)` 구문과 함께 쉼표로 구분된 목록을 사용하여 트리거 변수를 워크플로에 전달할 수 있습니다. 예를 들어, `@workflow-Create-Jira-Ticket(hostname={{host.name}})`입니다.
1. 워크플로와 이 모니터의 모든 알림을 테스트하려면 **Test Notifications**를 클릭합니다.
1. 모니터를 저장합니다.

{{< img src="/getting_started/workflow_automation/monitor_trigger.png" alt="모니터에서 워크플로우 트리거">}}

모니터 임계값에 도달할 때마다 모니터는 워크플로 실행을 트리거합니다.

## 실행 기록

워크플로를 트리거한 후 **Run History** 보기에서 진행 상황을 확인하고 실패한 단계를 디버깅할 수 있습니다. 실행된 단계를 선택하여 입력, 출력, 실행 컨텍스트 및 오류 메시지를 확인하세요. 아래 예는 잘못된 Jira 구성으로 인해 실패한 단계를 보여줍니다.

{{< img src="/getting_started/workflow_automation/testing_the_workflow.mp4" alt="워크플로 테스트 미리보기" style="width:100%" video=true >}}

워크플로를 수정하려면 **Configuration**을 클릭합니다. 실행 기록 보기로 돌아가려면 **Run History**를 클릭합니다.

이전 워크플로 실행 목록과 각 실행의 성공 여부를 보려면 초기 실행 기록 보기를 사용합니다. 워크플로 캔버스를 클릭하면 언제든지 초기 실행 기록으로 돌아갈 수 있습니다.

## 결론

모니터가 워크플로를 트리거하면 엔지니어링 팀에서 검토할 Jira 이슈가 생성됩니다. 다음은 Jira 이슈 예시입니다.

{{< img src="/getting_started/workflow_automation/jira_ticket.png" alt="워크플로에서 생성된 Jira 티켓">}}

또한 워크플로는 Slack 메시지를 생성하여 팀에 Jira 이슈를 알리고 알림을 모니터링합니다. 다음은 Slack 알림의 예입니다.

{{< img src="/getting_started/workflow_automation/slack-message.png" alt="워크플로우에서 생성된 Slack 메시지">}}

## 다음 단계

* [작업 카탈로그][8]에서 사용 가능한 모든 워크플로 작업 목록을 탐색합니다.
* 기본으로 제공되는 [블루 프린트][9]로 워크플로를 구축합니다.
* [HTTP 작업][10]을 사용해 엔드포인트 요청을 실행합니다.
* 워크플로를 통해 정보에 필요한 작업을 실행하기 위해 [데이터 변환][11] 작업을 구현합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: /ko/integrations/slack/
[3]: /ko/integrations/jira/
[4]: /ko/service_management/workflows/connections/
[5]: https://app.datadoghq.com/workflow
[6]: /ko/workflows/build/#context-variables
[7]: https://app.datadoghq.com/monitors/manage
[8]: /ko/actions/actions_catalog/
[9]: /ko/workflows/build
[10]: /ko/service_management/workflows/actions/#http
[11]: /ko/service_management/workflows/actions/#data-transformation