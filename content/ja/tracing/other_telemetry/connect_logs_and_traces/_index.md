---
algolia:
  tags:
  - logs and traces
aliases:
- /ja/tracing/advanced/connect_logs_and_traces/
- /ja/tracing/connect_logs_and_traces/
description: ログとトレースを接続して Datadog で関連付けます。
title: ログとトレースの相関
type: multi-code-lang
---
{{< img src="tracing/connect_logs_and_traces/logs-trace-correlation.png" alt="トレース内のログ" style="width:100%;">}}

Datadog APM と Datadog Log Management の相関は、トレース ID、スパン ID、`env`、`service`、および `version` をログの属性として注入することによって改善されます。これらのフィールドを使用すると、特定のサービスとバージョンに関連付けられた正確なログや、観測された[トレース][1]に関連するすべてのログを見つけることができます。

アプリケーションのトレーサーを `DD_ENV`、`DD_SERVICE`、および `DD_VERSION` で構成することをお勧めします。これにより、`env`、`service`、および `version` を追加する際の最良の体験が提供されます。詳細については、[統合サービスタグ付け][2]のドキュメントを参照してください。

トレースとログに相関性を持たせる前に、ログが JSON として送信されているか、[適切な言語レベルログプロセッサーによってパースされている][3]ことを確認します。トレースとログの相関が機能するためには、言語レベルログが Datadog 属性に変換される_必要があります_。

**注**: トレースとログは独立してサンプリングされます。相関が構成された後でも、ログには、取り込まれなかったトレースや、[トレースのサンプリング][4]によって保持されなかったトレースを参照するトレース ID が含まれている場合があります。これは構成エラーを示すものではありません。詳細については、[トレース ID はあるが関連するトレースが見つからない場合][5]を参照してください。

自動または手動でログをトレースに接続する方法の詳細については、以下から言語を選択してください。

{{< card-grid card_width="170px">}}
  {{< image-card href="java/" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="python/" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="go/" src="integrations_logos/go-metro.png" alt="go" >}}
  {{< image-card href="ruby/" src="integrations_logos/ruby.png" alt="Ruby" >}}
  {{< image-card href="nodejs/" src="integrations_logos/nodejs.png" alt="Node.js" >}}
  {{< image-card href="dotnet/" src="integrations_logos/dotnet_text.png" alt=".Net" >}}
  {{< image-card href="php/" src="integrations_logos/php.png" alt="PHP" >}}
  {{< image-card href="opentelemetry/" src="integrations_logos/otel.png" alt="OpenTelemetry" >}}
{{< /card-grid >}}

[1]: /ja/tracing/glossary/#trace
[2]: /ja/getting_started/tagging/unified_service_tagging
[3]: /ja/agent/logs/#enabling-log-collection-from-integrations
[4]: /ja/tracing/trace_pipeline/ingestion_controls/
[5]: /ja/logs/troubleshooting/#log-has-a-trace-id-but-the-associated-trace-is-missing