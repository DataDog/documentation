---
description: Datadog 경보로 트리거되는 엔드투엔드 프로세스를 자동화할 수 있습니다. Jira 및 Slack과 통합되는 워크플로를 만들어
  문제를 더 빠르게 해결할 수 있습니다.
further_reading:
- link: https://www.datadoghq.com/blog/automate-end-to-end-processes-with-datadog-workflows/
  tag: 블로그
  text: Datadog 워크플로를 통해 엔드투엔드 프로세스를 자동화하고 이벤트에 신속히 대응하기
- link: /actions/workflows/access_and_auth/
  tag: 설명서
  text: 액세스 및 인증
- link: /security/cloud_security_management/workflows/
  tag: 설명서
  text: 보안 워크플로 자동화
title: Workflow Automation 시작하기
---
## 개요 {#overview}

Workflow Automation을 사용하면 Datadog 경보 및 보안 신호에 대응하여 엔드투엔드 프로세스를 자동화할 수 있습니다. Workflow Automation은 실시간 관측 가능성 데이터를 기반으로 하므로 사용자가 문제를 더 빠르게 해결하고 시스템의 가용성과 보안을 선제적으로 유지 관리할 수 있습니다.

이 가이드에 따라 모니터 경보에 의해 트리거되는 사용자 지정 워크플로를 만들어 보세요. 트리거되면 워크플로는 Jira에서 작업을 생성하고 Jira 티켓에 대한 링크와 함께 Slack으로 알림을 보냅니다. 이 가이드에서는 워크플로의 한 단계에서 다른 단계로 데이터를 전달하고, 워크플로를 저장 및 게시하고, 워크플로의 실행 기록을 보는 방법을 살펴봅니다.

## 전제 조건 {#prerequisites}

시작하기 전에 [Datadog 계정][1]에 Jira 및 Slack 통합이 설치되어 있어야 합니다. 설치 지침은 [Slack][2] 및 [Jira 통합][3] 설명서를 참조하세요.

Jira 및 Slack 통합 타일에서 설정한 계정 자격 증명 및 인증은 Workflow Automation의 Jira 및 Slack 작업으로 자동으로 전파됩니다. 일부 통합은 인증을 위해 추가 구성이 필요합니다. 자세한 내용은 [Connections][4]를 참조하세요.

## 워크플로 빌드 {#build-the-workflow}

### 모니터 트리거를 사용하여 워크플로 만들기 {#create-a-workflow-with-a-monitor-trigger}
모니터나 보안 신호와 같은 경보 또는 일정에서 아니면 수동으로 워크플로를 트리거할 수 있습니다. 이 경우 모니터 트리거가 있는 워크플로를 만드세요.

다음 단계에 따라 워크플로를 만드세요.
1. [{{< ui >}}Workflow Automation{{< /ui >}}][5] 페이지에서 {{< ui >}}New Workflow{{< /ui >}}를 클릭합니다.
1. 워크플로의 이름과 설명을 입력합니다. 이 예시 워크플로에서 사용하는 이름과 설명은 다음과 같습니다.<br>
   이름: `Create a Jira Ticket`.<br>
   설명: `Create a Jira issue and Slack notification when there is a monitor alert`.

다음 단계에 따라 모니터를 추가하고 구성하세요.
1. 워크플로 캔버스에서 {{< ui >}}Add Trigger{{< /ui >}}를 클릭하고 {{< ui >}}Monitor{{< /ui >}}를 선택합니다.
1. {{< ui >}}Configure{{< /ui >}} 탭에서 `@workflow-` 옆에 워크플로의 고유 ID인 `Create-Jira-Ticket`을 입력합니다.<br>
   워크플로 핸들은 항상 `@workflow-`로 시작합니다. 나중에 이 핸들을 사용하여 워크플로를 모니터 알림에 연결합니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭하여 워크플로를 저장합니다.

{{< img src="/getting_started/workflow_automation/trigger1.png" alt="워크플로 트리거">}}

### Jira 및 Slack 작업 추가 {#add-the-jira-and-slack-actions}
다음 단계에 따라 Jira 단계를 추가하고 구성하세요.
1. 워크플로 캔버스에서 {{< ui >}}\+{{< /ui >}} 아이콘을 클릭합니다.
1. Jira 액션을 검색하고 {{< ui >}}Create issue{{< /ui >}}를 선택합니다.
1. 워크플로 캔버스에서 {{< ui >}}Create issue{{< /ui >}} 단계를 클릭합니다.
1. {{< ui >}}Configure{{< /ui >}} 탭에서 {{< ui >}}Jira Account{{< /ui >}}를 선택합니다. 계정은 Jira 통합 타일의 {{< ui >}}Accounts{{< /ui >}} 섹션에 있는 Jira URL과 일치해야 합니다.
1. 워크플로가 생성하는 Jira 이슈에 대해 {{< ui >}}Project{{< /ui >}} 및 {{< ui >}}Issue type{{< /ui >}}을 입력합니다.
1. 워크플로를 트리거하는 모니터의 데이터를 전달할 수 있도록 컨텍스트 변수를 사용하여 Jira 이슈에 대한 {{< ui >}}Summary{{< /ui >}} 및 {{< ui >}}Description{{< /ui >}}을 입력합니다. 이중 중괄호('{{')로 묶으면 단계에서 컨텍스트 변수에 액세스할 수 있습니다.<br><br>
   다음 예시 설명에서는 소스, 트리거 및 워크플로 변수를 사용하여 다음 정보를 전달합니다.
   - 모니터 경보를 트리거한 소스
   - 영향을 받는 모니터에 대한 링크
   - 워크플로 이름 및 워크플로 ID

   ```
   The CPU usage is above the 95% threshold for {{ Trigger.hostname }}

   Investigate - see this Datadog Dashboard to view all workflow runs:
   https://app.datadoghq.com/dash/integration/workflow_automation?refresh_mode=sliding&from_ts=1698164453793&to_ts=1698168053793&live=true.

   The workflow that created this Jira issue is
   {{ WorkflowName }} : {{ WorkflowId }}

   The monitor that triggered the workflow can be found here: {{ Source.url }}
   ```

   For more information on context variables, see [Context variables][6].

1. Test the Jira action by clicking {{< ui >}}Test{{< /ui >}} in the {{< ui >}}Configure{{< /ui >}} tab. Testing the action creates a real Jira ticket.
1. Click {{< ui >}}Save{{< /ui >}} to save your workflow.

Next, add the Slack step:
1. Click the plus icon on the workflow canvas to add another step.
1. Search for Slack and select {{< ui >}}Send message{{< /ui >}}.
1. Enter the {{< ui >}}Slack Workspace name{{< /ui >}}.
1. Enter the {{< ui >}}Slack Channel name{{< /ui >}}.
1. For a more useful Slack notification, use step output variables. Step output variables allow you to pass data from the Jira step to the Slack step in your workflow. Use the following message text to include the Jira issue key, the monitor name, and the Jira issue in the Slack message:

   ```
   The monitor named {{ Source.monitor.name }} triggered and created a new Jira issue
   {{ Steps.Create_issue.issueKey }}: {{ Steps.Create_issue.issueUrl }}

   The workflow that created this Jira issue is {{ WorkflowName }}
   ```

1. To test the action, click {{< ui >}}Test{{< /ui >}} in the {{< ui >}}Configure{{< /ui >}} tab. Testing an action creates a real Slack message.
1. To view your workflow's name in the monitor's notification dropdown, save and publish your workflow. Click {{< ui >}}Publish{{< /ui >}} from the workflow's page.

## Test and publish the workflow 

<div class="alert alert-info">Testing a workflow connected to active Slack and Jira accounts creates actual Slack messages and Jira tickets.</div>

Click {{< ui >}}Save{{< /ui >}} to apply your changes to the workflow. Next, manually trigger the workflow to test it.

To trigger the workflow manually, click {{< ui >}}Run{{< /ui >}} from the workflow page, and enter the values for the trigger variables.

{{< img src="/getting_started/workflow_automation/run_workflow.png" alt="수동으로 워크플로 트리거" style="width:90%;" >}}

워크플로를 실행하면 Jira 티켓이 생성되고 Slack 메시지가 전송되는지 확인하세요.

예약 및 트리거된 워크플로는 게시하기 전까지 자동으로 트리거되지 않습니다. 워크플로를 게시하려면 워크플로 페이지에서 {{< ui >}}Publish{{< /ui >}}를 클릭하세요.

## 워크플로를 트리거하는 모니터 업데이트 {#update-the-monitor-that-triggers-your-workflow}

1. Datadog에서 [{{< ui >}}Monitors{{< /ui >}} 페이지][7]로 이동합니다.
1. 워크플로를 트리거하려는 모니터를 찾아 편집하거나 새 모니터를 만듭니다.
1. {{< ui >}}Configure notifications & automations{{< /ui >}} 섹션에서 {{< ui >}}Add Workflow{{< /ui >}}를 클릭합니다.
1. 워크플로 멘션 이름(`@workflow-Create-Jira-Ticket`)을 사용하여 워크플로를 검색한 후 드롭다운에서 선택합니다.
   - `@workflow-name(key=value, key=value)` 구문을 사용해 쉼표로 구분된 목록의 트리거 변수를 워크플로에 전달할 수 있습니다. 예시: `@workflow-Create-Jira-Ticket(hostname={{host.name}})`.
1. {{< ui >}}Test Notifications{{< /ui >}}를 클릭하여 워크플로와 이 모니터의 모든 알림을 테스트합니다.
1. 모니터를 저장합니다.

{{< img src="/getting_started/workflow_automation/monitor_trigger.png" alt="모니터에서 워크플로 트리거">}}

모니터 임계값에 도달할 때마다 해당 모니터는 워크플로 실행을 트리거합니다.

## 실행 기록{#run-history}

워크플로를 트리거한 후에는 {{< ui >}}Run History{{< /ui >}} 보기에서 진행 상황을 확인하고 실패한 단계를 디버그할 수 있습니다. 실행된 단계를 선택하여 입력, 출력, 실행 컨텍스트 및 오류 메시지를 확인합니다. 아래 예시는 잘못된 Jira 구성으로 인해 실패한 단계를 보여줍니다.

{{< img src="/getting_started/workflow_automation/testing_the_workflow.mp4" alt="워크플로 테스트 미리보기" style="width:100%" video=true >}}

워크플로를 편집하려면 {{< ui >}}Configuration{{< /ui >}}을 클릭하세요. 실행 기록 보기로 돌아가려면 {{< ui >}}Run History{{< /ui >}}를 클릭하세요.

이전 워크플로 실행 목록과 각 실행의 성공 또는 실패 여부를 보려면 초기 실행 기록 보기를 사용하세요. 워크플로 캔버스를 클릭하여 언제든지 초기 실행 기록으로 돌아갈 수 있습니다.

## 결론 {#conclusion}

모니터가 워크플로를 트리거하면 엔지니어링 팀이 검토할 Jira 이슈가 생성됩니다. 다음은 Jira 이슈 예시입니다.

{{< img src="/getting_started/workflow_automation/jira_ticket.png" alt="워크플로에서 생성된 Jira 티켓">}}

또한 워크플로는 Slack 메시지를 생성하여 팀에 Jira 이슈와 모니터 경보를 알립니다. 다음은 Slack 알림 예시입니다.

{{< img src="/getting_started/workflow_automation/slack-message.png" alt="워크플로에서 생성된 Slack 메시지">}}

## 다음 단계 {#whats-next}

* [Action Catalog][8]에서 사용 가능한 모든 워크플로 작업 목록을 살펴봅니다. 
* 기본 제공 [Blueprint][9]에서 워크플로를 빌드합니다.
* [HTTP 작업][10]을 사용하여 모든 엔드포인트에 요청을 보냅니다.
* 워크플로를 통해 흐르는 정보에 필요한 작업을 수행하기 위해 [데이터 변환][11] 작업을 구현합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: /ko/integrations/slack/
[3]: /ko/integrations/jira/
[4]: /ko/actions/connections/
[5]: https://app.datadoghq.com/workflow
[6]: /ko/workflows/build/#context-variables
[7]: https://app.datadoghq.com/monitors/manage
[8]: /ko/actions/actions_catalog/
[9]: /ko/workflows/build
[10]: /ko/actions/workflows/actions/#http
[11]: /ko/actions/workflows/actions/#data-transformation