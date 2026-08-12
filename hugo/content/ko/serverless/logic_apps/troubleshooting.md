---
description: 진단 설정, 로그 전달 및 Datadog의 APM 스팬 생성을 확인하여 Azure Logic Apps 모니터링에서 누락된 트레이스
  및 로그를 진단합니다.
title: Azure Logic Apps용 Serverless Monitoring 문제 해결
---
## 트레이스가 보이지 않습니다{#i-cannot-see-any-traces}

다음 단계에 따라 Datadog에 트레이스가 나타나지 않는 이유를 진단하세요.

### 1. 진단 설정이 구성되었는지 확인{#1-verify-that-diagnostic-settings-are-configured}

Logic App에 필수 진단 설정이 적용되어 있는지 확인합니다.

1. Azure Portal에서 Logic App을 여세요.
2. 왼쪽 메뉴에서 {{< ui >}}Diagnostic settings{{< /ui >}}로 이동합니다.
3. `datadog_log_forwarding_<ID>`이라는 진단 설정이 있는지 확인합니다.

{{< img src="serverless/logic_apps/diagnostic_settings.png" alt="datadog_log_forwarding 구성이 표시된 Azure Logic App 진단 설정" style="width:100%;" >}}

이 설정은 [Datadog Azure Automated Log Forwarding][1] 서비스에 의해 자동으로 생성됩니다. 설정이 누락된 경우 Azure Automated Log Forwarding 서비스가 올바르게 설치되었는지 확인하세요.

### 2. Logic Apps 로그가 Datadog에 있는지 확인{#2-verify-that-logic-apps-logs-are-in-datadog}

로그가 Datadog으로 전달되고 있는지 확인합니다.

1. Datadog에서 [{{< ui >}}Logs > Live Tail{{< /ui >}}][2]로 이동합니다.
2. `@properties.resource.workflowId:*`를 검색합니다.
3. 필요한 경우 Logic App 워크플로를 몇 번 트리거합니다.

로그가 보이지 않는 경우:
- Azure Automated Log Forwarding 서비스가 올바르게 구성되었는지 확인합니다.

### 3. APM 스팬이 존재하는지 확인{#3-verify-that-apm-spans-exist}

로그에서 트레이스가 생성되고 있는지 확인합니다.

1. Datadog에서 [{{< ui >}}APM > Traces{{< /ui >}}][3]로 이동합니다.
2. 페이지 오른쪽 상단에서 {{< ui >}}Live Search{{< /ui >}}를 선택합니다.
3. `operation_name:azure.logicapps`를 검색합니다.

로그는 보이지만 트레이스가 보이지 않는 경우, 로그가 처리되고 트레이스가 생성될 때까지 몇 분 정도 기다립니다.

## 추가 문제 해결 팁 {#additional-troubleshooting-tips}

### 로그가 Datadog에 나타나지 않을 경우 {#logs-are-not-appearing-in-datadog}

로그가 Datadog에 나타나지 않을 경우:

1. **Azure Automated Log Forwarding 설정 확인**: Event Hubs 네임스페이스와 Datadog 대상이 올바르게 구성되었는지 확인합니다.
2. **진단 설정 로그 카테고리 확인**: 진단 설정이 `WorkflowRuntime` 로그를 캡처하고 있어야 합니다.

### 트레이스가 간헐적으로 누락됨 {#traces-are-missing-intermittently}

트레이스가 일관되지 않게 나타나는 경우:

1. **보존 필터 추가**: `operation_name:azure.logicapps` 쿼리로 [보존 필터][4]를 생성하여 트레이스가 보존되도록 합니다.
2. **보존율 설정**: 디버깅을 위해 보존율을 100%로 설정합니다.
3. **샘플링 확인**: 샘플링 구성으로 인해 트레이스가 드롭되지 않는지 확인합니다.

### 태그가 트레이스에 나타나지 않음 {#tags-are-not-appearing-on-traces}

`env` 및 `service` 태그가 트레이스에 나타나지 않는 경우:

1. **Azure에서 태그 확인하기**: Azure Portal의 Logic App에 태그가 올바르게 설정되었는지 확인합니다.
2. **전파 대기하기**: 태그 변경 사항이 새 실행에 전파되는 데 30분이 걸릴 수 있습니다.
3. **새로운 실행 트리거하기**: 태그를 설정한 후 워크플로를 다시 호출합니다.

## 도움이 더 필요하세요? {#need-more-help}

여기에서 다루지 않은 추가 질문이나 문제가 있는 경우 [Datadog 지원팀][5]에 문의하세요.

[1]: /ko/logs/guide/azure-automated-log-forwarding/
[2]: https://app.datadoghq.com/logs/livetail
[3]: https://app.datadoghq.com/apm/traces?query=operation_name%3Aazure.logicapps
[4]: /ko/tracing/trace_pipeline/trace_retention/#retention-filters
[5]: /ko/help/