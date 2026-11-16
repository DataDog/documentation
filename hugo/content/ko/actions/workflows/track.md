---
algolia:
  tags:
  - workflow
  - workflows
  - workflow automation
aliases:
- /ko/service_management/workflows/track
description: 대시보드, 감사 추적, 이벤트 관리 및 사용량 속성을 사용하여 워크플로 활동, 메트릭 및 비용을 모니터링합니다.
disable_toc: false
further_reading:
- link: /actions/workflows/build
  tag: 문서
  text: 워크플로 빌드
- link: /account_management/audit_trail/
  tag: 문서
  text: Datadog Audit Trail
- link: /account_management/billing/usage_attribution/
  tag: 문서
  text: 사용량 속성
title: 워크플로 추적
---
{{< site-region region="gov2" >}}
<div class="alert alert-info">Workflow Automation은 선택한 Datadog 사이트({{< region-param key=dd_site_name >}})에서 미리보기로 제공됩니다.</div>
{{< /site-region >}}

이 페이지에서는 다양한 종류의 워크플로 활동 및 워크플로 비용을 추적하는 방법을 설명합니다.

## 기본 제공 대시보드 {#out-of-the-box-dashboard}

워크플로 개요 대시보드는 Datadog 워크플로 및 실행에 관해 상위 수준의 개요를 제시합니다. 대시보드를 찾으려면 [대시보드 목록][2]으로 이동하여 {{< ui >}}Workflows Overview{{< /ui >}}를 검색합니다.

{{< img src="actions/workflows/workflows-dashboard.png" alt="워크플로 개요 대시보드" style="width:80%;" >}}


## Audit Trail에서 워크플로 편집 및 실행 조회 {#view-workflow-edits-and-runs-in-audit-trail}

Audit Trail을 사용하여 워크플로 편집 및 실행을 조회할 수 있습니다.

예를 들어, 워크플로를 편집한 사람을 확인하려면 다음 단계를 수행하세요.

1. 워크플로에서 오른쪽 상단 모서리에 있는 <i class="icon-cog-2"></i> **(톱니바퀴)**을 클릭하고 {{< ui >}}View audit events{{< /ui >}}를 클릭합니다.<br>현재 워크플로로 필터링된 Audit Trail 검색이 열립니다.
1. 왼쪽의 {{< ui >}}Core{{< /ui >}} 필터 아래에서 {{< ui >}}Action{{< /ui >}}을 확장합니다.
1. {{< ui >}}Modified{{< /ui >}} 위로 마우스를 가져간 후 {{< ui >}}Only{{< /ui >}}를 클릭하여 워크플로 편집만 표시하도록 결과를 필터링합니다.<br>{{< ui >}}User ID{{< /ui >}} 열에는 각 편집을 수행한 사용자의 사용자 이름이 표시됩니다.


## 실행 알림{#notify-about-runs}

기본 제공 워크플로 알림 사용에 대한 지침은 [워크플로 알림][3]을 참조하세요.


## Datadog 모니터링을 사용하여 워크플로 메트릭 추적 {#track-workflow-metrics-with-a-datadog-monitor}

Datadog 모니터링을 사용하여 다양한 워크플로 메트릭을 추적할 수 있습니다.

사용 가능한 메트릭 목록은 다음과 같습니다.

| 메트릭 | 설명 |
| ------ | ----------- |
| `datadog.workflows.count`                      | 삭제되지 않은 워크플로 수                       |
| `datadog.workflows.executions.started`         | 시작된 워크플로 인스턴스 수   |
| `datadog.workflows.executions.completed`       | 완료된 워크플로 인스턴스 수      |
| `datadog.workflows.steps.executions.started`   | 시작된 워크플로 인스턴스 단계 수   |
| `datadog.workflows.steps.executions.completed` | 완료된 워크플로 인스턴스 단계 수 |

일일 워크플로 실행이 특정 임계값을 초과하는지 추적하는 모니터링을 만들려면 다음 단계를 수행하세요.

1. [New Monitor][4]로 이동하여 {{< ui >}}Metric{{< /ui >}} 모니터링 유형을 선택합니다.
1. {{< ui >}}Define the metric{{< /ui >}}에서 {{< ui >}}a{{< /ui >}}에 대해 `datadog.workflows.executions.started`를 입력합니다.
1. _필요시_ 모니터링을 특정 워크플로로 제한하려면 {{< ui >}}from{{< /ui >}}에 `workflow_id:[WORKFLOW-ID]`를 입력하고 `[WORKFLOW-ID]`를 워크플로 ID로 대체합니다.
1. {{< ui >}}Evaluation Details{{< /ui >}}에 대해 다음 값을 사용합니다.
    - {{< ui >}}Evaluate the{{< /ui >}}: `sum`
    - {{< ui >}}Of the query over the{{< /ui >}}: `last 1 day`.
1. {{< ui >}}Set alert conditions{{< /ui >}}에 대해 {{< ui >}}above{{< /ui >}}를 선택한 다음 경보 및 주의 임계값을 입력합니다. 예를 들어 {{< ui >}}Alert threshold{{< /ui >}}에 `200`을 입력하고 {{< ui >}}Warning threshold{{< /ui >}}에 `150`을 입력할 수 있습니다.
1. {{< ui >}}Configure notifications & automations{{< /ui >}}에서 워크플로 이름을 지정한 다음 메시지 텍스트를 입력합니다. 예를 들어 다음과 같은 메시지 텍스트를 사용할 수 있습니다.

    {{< code-block lang="none" >}}@slack-alert-channel

{{#is_warning}}
Workflow has executed {{warn_threshold}} times in the last day; manual action might be needed to avoid alerting.
{{/is_warning}}
{{#is_alert}}
Workflow has executed {{threshold}} times in the last day, which is our budget threshold for workflows. We should unpublish the workflow to avoid any more automatic executions for the day.
{{/is_alert}}
{{< /code-block >}}
1. {{< ui >}}Create{{< /ui >}}를 클릭합니다.


## 이벤트 관리자에서 워크플로 이벤트 조회 {#view-workflow-events-in-event-manager}

[이벤트 관리자][5]를 사용하여 `source:workflow_automation`에 대해 필터링함으로써 워크플로 시작 및 완료 이벤트를 조회할 수 있습니다.

특정 워크플로에 대한 이벤트를 보려면 {{< ui >}}Search facets{{< /ui >}} 상자에서 `workflow.workflow_id`를 검색합니다. 특정 ID 세트를 선택하면 해당 워크플로에 대한 이벤트만 볼 수 있습니다.

또한 {{< ui >}}Status{{< /ui >}}를 기준으로 출력을 필터링하여 `info`, `warn` 또는 `error` 메시지만 볼 수 있습니다.


## 사용량 속성에서 워크플로 청구 추적 {#track-workflow-billing-in-usage-attribution}

<div class="alert alert-danger">
사용량 속성은 Enterprise 플랜에 포함된 고급 기능입니다. 다른 모든 플랜에 대해서는 계정 담당자에게 문의하거나 <a href="mailto:success@datadoghq.com">success@datadoghq.com</a>에 기능 사용을 요청해야 합니다.
</div>

워크플로 실행에 대한 청구를 추적하려면 다음 단계를 수행하세요.

1. [Usage Attribution][6] 페이지로 이동합니다.
1.  왼쪽의 {{< ui >}}Products{{< /ui >}} 아래에서 {{< ui >}}Workflow Executions{{< /ui >}}을 검색합니다.
1. {{< ui >}}Workflow Executions{{< /ui >}} 위로 마우스를 가져간 다음 {{< ui >}}Only{{< /ui >}}를 클릭하면 워크플로에 대한 사용량 속성만 조회할 수 있습니다.


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>질문이나 피드백이 있으신가요? [Datadog 커뮤니티 슬랙][1]의 **#workflows** 채널에 참여하세요.


[1]: https://chat.datadoghq.com/
[2]: https://app.datadoghq.com/dashboard/lists
[3]: /ko/actions/workflows/build/#workflow-notifications
[4]: https://app.datadoghq.com/monitors/create
[5]: https://app.datadoghq.com/event/explorer?query=source%3Aworkflow_automation
[6]: https://app.datadoghq.com/billing/usage-attribution