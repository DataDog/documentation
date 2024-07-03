---
algolia:
  tags:
  - logs and traces
aliases:
- /ja/tracing/advanced/connect_logs_and_traces/
- /ja/tracing/connect_logs_and_traces/
description: Connect your logs and traces to correlate them in Datadog.
kind: documentation
title: Correlate Logs and Traces
type: multi-code-lang
---

{{< img src="tracing/connect_logs_and_traces/trace_id_injection.png" alt="Logs in Traces" style="width:100%;">}}

The correlation between Datadog APM and Datadog Log Management is improved by the injection of trace IDs, span IDs, `env`, `service`, and `version` as attributes in your logs. With these fields you can find the exact logs associated with a specific service and version, or all logs correlated to an observed [trace][1].

It is recommended to configure your application's tracer with `DD_ENV`, `DD_SERVICE`, and `DD_VERSION`. This will provide the best experience for adding `env`, `service`, and `version`. See the [unified service tagging][2] documentation for more details.

トレースとログに相関性を持たせる前に、ログが JSON として送信されているか、[適切な言語レベルログプロセッサーによってパースされている][3]ことを確認します。トレースとログの相関が機能するためには、言語レベルログが Datadog 属性に変換される_必要があります_。

自動または手動でログをトレースに接続する方法の詳細については、以下から言語を選択してください。

{{< partial name="apm/apm-connect-logs-and-traces.html" >}}

[1]: /ja/tracing/glossary/#trace
[2]: /ja/getting_started/tagging/unified_service_tagging
[3]: /ja/agent/logs/#enabling-log-collection-from-integrations