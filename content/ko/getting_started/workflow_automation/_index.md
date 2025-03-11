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

워크플로 인증을 사용하면 Datadog 경고 및 보안 신호에 대응하여 엔드투엔드 프로세스를 자동화할 수 있습니다. 워크플로 인증은 실시간 관찰 가능 데이터를 기반으로 하므로 이슈를 보다 신속하게 해결하고 시스템의 가용성 및 보안을 사전 예방으로 유지할 수 있습니다. 

이 가이드에 따라 모니터 알림에 의해 트리거된 커스텀 워크플로를 생성합니다. 이 가이드가 트리거되면 워크플로는 Jira에 업무를 생성하고 Jira 티켓 링크와 함께 Slack에 메세지를 보냅니다. 이 가이드에서는 워크플로의 다음 단계로 데이터를 전달하고 워크플로를 저장 및 게시하며 워크플로의 실행 기록을 볼 수 있습니다.

## 필수 요구 사항

시작하기 전에 [Datadog 계정][1]에 Jira와 Slack 통합이 설치되어 있어야 합니다. 설치 방법은 [Slack][2] 및 [Jira 통합][3] 문서를 참고하세요.

Jira 및 Slack 통합 타일에서 설정한 계정 자격 증명 및 인증은 워크플로 인증의 Jira 및 Slack 작업에 자동으로 전파됩니다. 일부 통합에서는 인증을 위해 추가 설정이 필요합니다. 자세한 내용은 [연결][4]을 참고하세요.

## 워크플로 구축

### 모니터 트리거를 사용하여 워크플로 생성
모니터 또는 보안 신호와 같은 알림, 예약, 또는 수동으로 워크플로를 트리거할 수 있습니다. 이 경우 모니터 트리거를 사용하여 워크플로를 생성합니다.

모니터 트리거를 사용하여 워크플로를 생성하는 방법:

1. Datadog에서 **Service Management** > **[Workflow Automation][5]**으로 이동합니다.
2. **New Workflow**를 클릭합니다.
3. 워크플로의 이름과 설명을 입력합니다. 샘플 이름의 경우 `Create a Jira Ticket`를 사용합니다(샘플 설명 예: `Create a Jira issue and Slack notification when there is a monitor alert`).
4. **Monitor or Security Signal**를 선택합니다.
5. **Create**을 클릭합니다.
6. 워크플로우 캔버스에서 **Monitor 또는 Security Signal** 트리거를 클릭합니다.
7. **Configure** 탭의 `@workflow-` 옆에 워크플로의 고유 ID`@workflow-Create-Jira-Ticket`를 입력합니다. 워크플로 핸들은 항상 `@workflow-`로 시작합니다. 나중에 이 핸들을 사용하여 워크플로를 모니터 알림에 연결합니다.
8. **Save**를 클릭하여 워크플로를 저장합니다.

{{< img src="/getting_started/workflow_automation/trigger.png" alt="워크플로우 트리거">}}

### Jira 및 Slack 작업 추가
Jira 단계 추가하는 방법:
1. 워크플로 캔버스에서 **Add a step to get started**를 클릭합니다.
2. Jira 작업을 검색하여 **Create issue**를 선택하고 **Create issue** 단계를 클릭한 후 **Jira account**을 선택합니다. 계정은 Jira 통합 타일의 **Accounts** 섹션에 있는 Jira URL에 해당해야 합니다.
3. 워크플로에서 생성하는 Jira 이슈에 **Project** 및 **Issue type**를 입력합니다.
4. 워크플로를 트리거하는 모니터의 데이터를 전달하기 위해 컨텍스트 변수를 사용하여 Jira 이슈의 **요약** 및 **설명**을 입력합니다. 이중 괄호(`{{`)로 둘러싸서 단계에서 컨텍스트 변수에 액세스할 수 있습니다. 다음 설명 예제에서는 소스, 트리거, 워크플로 변수를 사용해 모니터 경고를 트리거한 소스, 영향을 받는 모니터의 링크, 워크플로 이름 및 워크플로 ID를 전달합니다.

```
CPU 사용량이 {{ Trigger.hostname }}의 95% 임계값을 초과

살펴보기 - 모든 워크플로 실행을 보려면 Datadog 대시보드를 참고하세요.
https://app.datadoghq.com/dash/integration/workflow_automation?refresh_mode=sliding&from_ts=1698164453793&to_ts=1698168053793&live=true. 

Jira 이슈를 만든 워크플로우는
{{ WorkflowName }} : {{ WorkflowId }}

워크플로를 트리거한 모니터는 다음에서 확인할 수 있습니다. {{ Source.url }}
```

컨텍스트 변수에 관한 자세한 내용은 **[컨텍스트 변수][6]**를 참고하세요.

5. 작업의 **Configure** 탭에서 녹색 **Test** 아이콘을 클릭하여 Jira 작업을 테스트합니다.
6. **Save**를 클릭하여 워크플로를 저장합니다.

이전 지침서에서는 Jira 티켓을 생성하는 단계를 설정했습니다. 다음으로 Slack 단계를 추가합니다.
1. 워크플로 캔버스에서 더하기 아이콘을 클릭해 다른 단계를 추가합니다.
2. Slack 작업을 검색하고 **Send message**를 선택합니다.
3. **Slack 워크스페이스 이름**을 입력합니다.
4. **Slack 채널 이름**을 입력합니다.
5. Slack 알림을 보다 유용하게 사용하려면 단계 출력 변수를 사용합니다. 단계 출력 변수를 사용하면 워크플로의 Jira 단계에서 Slack 단계로 데이터를 전달할 수 있습니다. 다음 메시지 텍스트를 사용해 Slack 메시지에 Jira 이슈 키와 Jira 이슈를 포함할 수 있습니다.

```
{{ Source.monitor.name }}라는 이름의 모니터가 새로운 Jira 이슈 트리거 및 생성 
{{ Steps.Create_issue.issueKey }}: {{ Steps.Create_issue.issueUrl }}

Jira 이슈를 만든 워크플로는 {{ WorkflowName }}임
```

6. 작업의 **Configure** 탭에서 녹색 **Test** 아이콘을 클릭하여 이 Slack 작업을 테스트합니다.
7. 모니터의 알림 드롭다운에 워크플로 이름을 보려면 워크플로를 저장한 후 게시하세요. 워크플로 페이지에서 **Publish**를 클릭합니다.

## 워크플로 테스트 및 게시

변경 사항을 적용하려면 **Save**를 클릭하여 워크플로를 저장해야 합니다. 다음으로 워크플로를 수동으로 트리거하여 테스트합니다.

{{< img src="/getting_started/workflow_automation/run_workflow.png" alt="수동으로 워크플로 트리거" style="width:90%;" >}}

워크플로를 수동으로 트리거하려면 워크플로 페이지에서 **Run**을 클릭하고 트리거 변수의 값을 입력합니다.

워크플로를 실행하면 지정한대로 Jira 티켓이 생성되고 Slack 메시지가 전송되는지 확인합니다.

게시하기 전에는 예약 및 트리거된 워크플로가 자동으로 트리거되지 않습니다. 워크플로를 게시하려면 워크플로 페이지에서 **Publish**를 클릭하세요.

<div class="alert alert-info">활성화된 Slack 및 Jira 계정에 연결된 워크플로를 테스트하면 실제 Slack 메시지와 Jira 티켓이 생성됩니다.</div>

## 워크플로를 트리거하는 모니터 업데이트

1. Datadog에서 [모니터 페이지][7]로 이동합니다.
2. 워크플로를 트리거하고 편집하거나 새 모니터를 만드는 데 사용할 모니터를 찾습니다.
3. 메시지 섹션에서 전체 워크플로 기재 이름을 경고 알림에 추가합니다. 언급된 이름은 `@workflow-`로 시작합니다. 예를 들어, `@workflow-Create-Jira-Ticket`입니다.
    - 구문 `@workflow-name(key=value, key=value)`와 함께 쉼표로 구분된 목록을 사용해 트리거 변수를 워크플로에 전달할 수 있습니다(예: `@workflow-Create-Jira-Ticket(hostname=host.name)`).
4. **Test Notifications**를 클릭하여 워크플로 및 모니터의 모든 알림을 테스트합니다.
5. 모니터를 저장합니다.

{{< img src="/getting_started/workflow_automation/monitor_trigger.png" alt="모니터에서 워크플로우 트리거">}}

모니터 임계값에 도달할 때마다 모니터는 워크플로 실행을 트리거합니다.

## 실행 기록

워크플로를 트리거하면 **실행 기록** 보기에서 워크플로의 진행 상황 및 디버그 실패 단계를 볼 수 있습니다. 실행된 단계를 선택하면 입력, 출력, 실행 컨텍스트 및 오류 메시지를 볼 수 있습니다. 아래 예는 잘못된 Jira 설정으로 인해 실패한 단계를 보여줍니다.

{{< img src="/getting_started/workflow_automation/testing_the_workflow.mp4" alt="워크플로 테스트 미리보기" style="width:100%" video=true >}}

워크플로우를 편집하려면 **Configuration**을 클릭하고, 실행 내역 보기로 돌아가려면 **Run History**을 클릭합니다.

이전 워크플로 실행 목록과 각 실행이 성공했는지 실패했는지를 보려면 초기 실행 기록 보기를 사용합니다. 워크플로 캔버스를 클릭하여 언제든지 초기 실행 기록으로 돌아갑니다.

## 결론

모니터가 워크플로를 트리거하면 엔지니어링 팀에서 검토할 Jira 이슈가 생성됩니다. 다음은 Jira 이슈 예시입니다.

{{< img src="/getting_started/workflow_automation/jira_ticket.png" alt="워크플로에서 생성된 Jira 티켓">}}

또한 이 워크플로는 Slack 메시지를 생성하여 팀에 Jira 이슈를 알리고 경고를 모니터링합니다. 다음은 Slack 알림 예시입니다.

{{< img src="/getting_started/workflow_automation/slack-message.png" alt="워크플로우에서 생성된 Slack 메시지">}}

## 다음에는 무엇을 해야 하나요?

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
[8]: /ko/service_management/workflows/actions_catalog/
[9]: /ko/workflows/build
[10]: /ko/service_management/workflows/actions_catalog/generic_actions/#http
[11]: /ko/service_management/workflows/actions_catalog/generic_actions/#data-transformation