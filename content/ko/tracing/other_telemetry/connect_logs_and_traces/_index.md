---
algolia:
  tags:
  - logs and traces
aliases:
- /ko/tracing/advanced/connect_logs_and_traces/
- /ko/tracing/connect_logs_and_traces/
description: 로그와 트레이스를 연결하여 Datadog에서 상호 연계하세요.
title: 로그 및 트레이스 상호 연계
type: multi-code-lang
---
{{< img src="tracing/connect_logs_and_traces/logs-trace-correlation.png" alt="트레이스의 로그" style="width:100%;">}}

Datadog APM과 Datadog Log Management 간의 상호 연계는 트레이스 ID, 스팬 ID, `env`, `service`, `version`을 로그의 속성으로 주입하면 개선됩니다. 이러한 필드를 사용하여 특정 서비스 및 버전과 연결된 정확한 로그를 찾거나, 관측된 [트레이스][1]와 상호 연계된 모든 로그를 찾을 수 있습니다.

애플리케이션의 트레이서를 `DD_ENV`, `DD_SERVICE` 및 `DD_VERSION`으로 구성하는 것이 좋습니다. 이렇게 하면 `env`, `service`, `version`을 추가하는 데 최선의 경험을 제공합니다. 자세한 내용은 [unified service tagging][2] 설명서를 참조하세요.

트레이스를 로그와 상호 연계하기 전에, 로그를 JSON으로 전송하거나 [적절한 언어 수준 로그 프로세서로 구문 분석][3]해야 합니다. 언어 수준 로그가 Datadog 속성으로 변환되어야_만_ 트레이스와 로그 상호 연계가 작동합니다.

**참고**: 트레이스와 로그는 별개로 샘플링됩니다. 상호 연계가 구성된 뒤에도 로그가 [트레이스 샘플링][4]으로 인해 수집되지 않거나 유지되지 않은 트레이스를 참조하는 트레이스 ID를 포함할 수 있습니다. 그렇다고 구성 오류가 있다는 의미는 아닙니다. 자세한 정보는 [로그에 트레이스 ID가 있지만, 연결된 트레이스가 누락됨][5]을 참조하세요.

로그를 트레이스에 자동 또는 수동으로 연결하는 방법에 대해 자세히 알아보려면 아래에서 원하는 언어를 선택하세요.

{{< partial name="apm/apm-connect-logs-and-traces.html" >}}

[1]: /ko/tracing/glossary/#trace
[2]: /ko/getting_started/tagging/unified_service_tagging
[3]: /ko/agent/logs/#enabling-log-collection-from-integrations
[4]: /ko/tracing/trace_pipeline/ingestion_controls/
[5]: /ko/logs/troubleshooting/#log-has-a-trace-id-but-the-associated-trace-is-missing