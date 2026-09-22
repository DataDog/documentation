---
aliases:
- /ja/llm_observability/guide/llm_observability_and_apm
- /ja/llm_observability/monitoring/llm_observability_and_apm/
description: Agent Observability のスパンと APM のスパンを移動する方法を学び、LLM 固有の操作とより広範なアプリケーションエコシステムについて詳しく知ることができます。
further_reading:
- link: /llm_observability/quickstart/terms/
  tag: ドキュメント
  text: Agent Observability のスパンについて学ぶ
- link: /glossary/#span/
  tag: ドキュメント
  text: APM のスパンについて学ぶ
- link: https://www.datadoghq.com/blog/troubleshooting-rag-llms/
  tag: ブログ
  text: RAG ベースの LLM アプリケーションのトラブルシューティング
- link: https://learn.datadoghq.com/courses/llm-obs-investigations
  tag: ラーニングセンター
  text: LLM Observability で調査する
title: Agent Observability と APM の関連付け
---
## 概要 {#overview}

このガイドでは、Datadog で Agent Observability と APM の両方を使用して、Agent Observability と APM の[スパン][6]を関連付ける方法を説明します。

LLM 固有の操作を Agent Observability で、より広範なアプリケーションを APM でインスツルメンテーションすることで、次のことが可能になります。



* エンドツーエンドの可視性を得る: アプリケーション全体のコンテキストで、LLM アプリケーションの上流および下流のリクエストを詳しく調べます。
* APM から Agent Observability へ深く掘り下げる: アプリケーションの問題が、OpenAI の呼び出しなど、LLM 固有のアプリケーションに特有のものかどうかを調べます。

## セットアップ {#setup}

Agent Observability SDK は、APM の dd-tracer を基に作成されます。そのため、Agent Observability は [Application Performance Monitoring (APM)][7] と併用できるようになっています。

[Python 用 Agent Observability SDK][1] を APM の [`dd-tracer`(トレーサー)][2] と併用している場合は、追加のセットアップなしで Datadog APM と Agent Observability のスパン間を移動できます。

[Agent Observability API][3] を APM 用の `dd-tracer` と併用している場合は、次のようにします。

1. トレーサーからスパン ID を取得するための適切なメソッドを使用します (例: Go トレーサーの場合は `span.Context().SpanID()` を使用します)。
1. すべての Agent Observability API リクエストに、キャプチャされたスパン ID を含めます。こうすると、Datadog で APM のスパンと Agent Observability のスパンがリンクされます。

## スパン間を移動する {#navigate-between-spans}

このインテグレーションを使用すると、アプリケーションスタック全体でデータを関連付け、LLM アプリケーションがほかのコンポーネントとどのように相互作用しているかを把握できます。また、問題をより迅速に解決し、アプリケーションのパフォーマンスを最適化することもできます。

{{< img src="llm_observability/guides/apm/end_to_end_tracing.mp4" alt="この動画では、Datadog で Agent Observability のスパンと APM のスパンの間を移動する機能を紹介しています。" style="width:100%" video=true >}}

### Agent Observability から APM へ {#from-agent-observability-to-apm}

アプリケーションエコシステム内での LLM 操作のより広範なコンテキストを理解するには、[Agent Observability エクスプローラー][4]で Agent Observability のスパンを選択し、{{< ui >}}APM span{{< /ui >}}をクリックして、関連する APM スパンに移動します。

{{< img src="llm_observability/guides/apm/llm_span.png" alt="Agent Observability の [Traces](トレース) ページから移動できる、関連する APM のスパンを持つ Agent Observability のスパン" style="width:100%;" >}}

### APM から Agent Observability へ {#from-apm-to-agent-observability}

LLM 固有のインサイトを確認するには、[Trace Explorer][5] で APM のスパンを選択し、[{{< ui >}}Info{{< /ui >}}] タブの [Agent Observability] セクションにある [{{< ui >}}View Span{{< /ui >}}](スパンを表示) をクリックして、対応する Agent Observability のスパンに移動します。

{{< img src="llm_observability/guides/apm/apm_span.png" alt="APM の [Traces] ページから移動できる、関連する Agent Observability のスパンを持つ APM のスパン" style="width:100%;" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/llm_observability/setup/sdk/
[2]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/
[3]: /ja/llm_observability/setup/api/
[4]: https://app.datadoghq.com/llm/traces
[5]: https://app.datadoghq.com/apm/traces
[6]: /ja/llm_observability/quickstart/terms/#spans
[7]: /ja/tracing