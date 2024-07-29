---
aliases:
- /ja/tracing/advanced/connect_logs_and_traces/
- /ja/tracing/connect_logs_and_traces/
description: ログとトレースを接続して Datadog で関連付けます。
title: ログとトレースの接続
type: multi-code-lang
---

{{< img src="tracing/connect_logs_and_traces/trace_id_injection.png" alt="トレースのログ" style="width:100%;">}}

Datadog APM と Datadog Log Management の間の相関関係は、ログの属性としてトレース ID、スパン ID、`env`、`service`、`version` を挿入することで改善されています。これらのフィールドを使用すると、特定のサービスとバージョンに関連付けられた正確なログ、または観測された[トレース][1]に関連付けられたすべてのログを見つけることができます。

アプリケーションのトレーサを `DD_ENV`、`DD_SERVICE`、`DD_VERSION` で構成することをお勧めします。これは、`env`、`service`、`version` を追加する際のベストプラクティスです。詳細については、[統合サービスタグ付け][2]のドキュメントを参照してください。

**注**: PHP Tracer は、ログの統合サービスタグ付けのコンフィギュレーションをサポートしていません。

トレースとログに相関性を持たせる前に、ログが JSON として送信されているか、[適切な言語レベルログプロセッサーによってパースされている][3]ことを確認します。トレースとログの相関が機能するためには、言語レベルログが Datadog 属性に変換される_必要があります_。

自動または手動でログをトレースに接続する方法の詳細については、以下から言語を選択してください。

{{< partial name="apm/apm-connect-logs-and-traces.html" >}}

[1]: /ja/tracing/glossary/#trace
[2]: /ja/getting_started/tagging/unified_service_tagging
[3]: /ja/agent/logs/#enabling-log-collection-from-integrations