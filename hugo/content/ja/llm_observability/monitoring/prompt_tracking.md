---
description: Prompt Tracking を使用して、プロンプトテンプレートとバージョンを追跡します。
further_reading:
- link: https://www.datadoghq.com/blog/llm-prompt-tracking
  tag: ブログ
  text: Datadog LLM Observability を使用して、LLM プロンプトを追跡、比較、最適化します。
- link: https://learn.datadoghq.com/courses/llm-obs-investigations
  tag: ラーニングセンター
  text: LLM Observability で調査します。
title: Prompt Tracking
---
## 概要 {#overview}

Prompt Tracking は、プロンプトテンプレートとバージョンを LLM 呼び出しにリンクします。Prompt Tracking は、Agent Observability のトレース、スパン、Playground、およびプロンプトの作成とバージョン管理のための集中レジストリを提供する [Prompt Management][8] と連携して動作します。

Prompt Tracking では、以下のことが可能です。
- LLM アプリケーションまたはエージェントで使用されるすべてのプロンプトを、呼び出し回数とレイテンシーの経時的な推移とともに確認します。
- 呼び出し数、レイテンシー、使用トークン数、コスト別にプロンプトやバージョンを比較します。
- プロンプトに関する詳細情報を確認します。バージョン履歴の確認、テキスト差分の表示、および特定のバージョンを使用したトレースへの移動が可能です。
- [Trace Explorer][1] をプロンプト名、ID、またはバージョンでフィルタリングして、影響を受けたリクエストを特定します。
- 任意のスパンから正確なテンプレートと変数を [Agent Observability Playground][2] に入力して、実行を再現します。

{{< img src="llm_observability/monitoring/llm-prompt-tracking-hero.png" alt="Agent Observability におけるアプリのプロンプトビュー。" style="width:100%;" >}}

## Prompt Tracking をセットアップする {#set-up-prompt-tracking}

Agent Observability が有効な場合、`LLMObs.get_prompt()` を使用して [Prompt Management][8] レジストリから取得されたプロンプトは、`prompt.format()` によって返された値がサポートされている自動インスツルメンテーション済みの LLM 呼び出しに直接渡されると、自動的に追跡されます。フォーマットされた値がコピーまたは変換される場合は、Prompt Management のドキュメントで説明されているように `LLMObs.annotation_context()` を使用します。以下のセットアップオプションは、レジストリ外で定義されたプロンプトに適用されます。

### 構造化プロンプトメタデータを使用する場合{#with-structured-prompt-metadata}
Prompt Tracking を使用するには、構造化プロンプトメタデータ (ID、オプションのバージョン、テンプレート、変数) を送信できます。

#### Agent Observability Python SDK {#agent-observability-python-sdk}
Agent Observability Python SDK (`dd-trace` v3.16.0 以降) を使用している場合は、`prompt` 引数またはヘルパーを使用して、LLM スパンにプロンプトメタデータを添付します。[Agent Observability Python SDK のドキュメント][3] を参照してください。

#### Agent Observability Node.js SDK {#agent-observability-nodejs-sdk}
Agent Observability Node.js SDK (`dd-trace` v5.83.0 以降) を使用している場合は、`prompt` オプションを使用して LLM スパンにプロンプトメタデータを添付します。[Agent Observability Node.js SDK のドキュメント][6] を参照してください。

#### Agent Observability API {#agent-observability-api}
Agent Observability API インテークを使用している場合は、Spans API エンドポイントにプロンプトメタデータを送信します。[Agent Observability HTTP API リファレンスドキュメント][4] を参照してください。

#### OpenTelemetry Instrumentation {#opentelemetry-instrumentation}
[OpenTelemetry Instrumentation][7] を使用している場合は、プロンプト情報を含む JSON 文字列を `_dd.ml_obs.prompt_tracking` 属性に設定することで、LLM スパンにプロンプトメタデータを添付できます。

任意の LLM スパンに属性を設定します。

{{< tabs >}}
{{% tab "Python" %}}

```python
import json

span.set_attribute("_dd.ml_obs.prompt_tracking", json.dumps({
    "name": "greeting-prompt",
    "version": "v1",
    "template": "Hello {{name}}, tell me about {{topic}}",
    "variables": {"name": "Alice", "topic": "weather"}
}))
```
{{% /tab %}}
{{% tab "JavaScript" %}}

```javascript
span.setAttribute("_dd.ml_obs.prompt_tracking", JSON.stringify({
    name: "greeting-prompt",
    version: "v1",
    template: "Hello {{name}}, tell me about {{topic}}",
    variables: { name: "Alice", topic: "weather" }
}));
```
{{% /tab %}}
{{% tab "Go" %}}

```go
span.SetAttributes(attribute.String("_dd.ml_obs.prompt_tracking",
    `{"name":"greeting-prompt","version":"v1","template":"Hello {{name}}, tell me about {{topic}}","variables":{"name":"Alice","topic":"weather"}}`,
))
```
{{% /tab %}}
{{< /tabs >}}

Prompt Tracking JSON では、以下のフィールドがサポートされています。

| フィールド | 型 | 必須 | 説明 |
|-------|------|----------|-------------|
| `template` | string | はい (または `chat_template`) | 単一メッセージプロンプトのテンプレート文字列 |
| `chat_template` | array | はい (または `template`) | `{"role": "...", "content": "..."}` メッセージテンプレートのリスト |
| `id` | string | いいえ | プロンプトの一意の識別子。省略された場合は `{ml_app}_unnamed-prompt` にデフォルト設定されます |
| `name` | string | いいえ | プロンプト名。`id` が省略された場合の `id` のフォールバックとして使用されます |
| `version` | string | いいえ | ユーザー指定のバージョンタグ |
| `variables` | object | いいえ | テンプレート変数の置換 |
| `rag_context_variables` | array of strings | いいえ | RAG コンテキスト (グラウンドトゥルース) を含む `variables` 内の変数名。RAG 評価ツールで使用されます |
| `rag_query_variables` | array of strings | いいえ | ユーザーのクエリを含む `variables` 内の変数名。RAG 評価ツールで使用されます |

<div class="alert alert-info">プロンプトテンプレートを使用している場合、Agent Observability はプロンプトの内容に基づいてバージョン情報を自動的に付与できます。</div>

### LangChain テンプレートを使用する場合 {#with-langchain-templates}
LangChain プロンプトテンプレートを使用している場合、Datadog はコードを変更することなくプロンプトメタデータを自動的に取得します。ID はモジュール名またはテンプレート名から生成されます。これらの ID を上書きするには、[Agent Observability 自動インスツルメンテーション: LangChain][5] を参照してください。

## Agent Observability で Prompt Tracking を使用する {#use-prompt-tracking-in-agent-observability}

Agent Observability でアプリを表示し、左側の {{< ui >}}Prompts{{< /ui >}} を選択します。_プロンプトビュー_には、以下の情報が表示されます。

- {{< ui >}}Prompt Call Count{{< /ui >}}: プロンプト (またはバージョン) ごとの呼び出し回数を時系列で表示するチャート
- {{< ui >}}Recent Prompt Updates{{< /ui >}}: 最終更新日時、呼び出し回数、平均レイテンシー、呼び出しごとの平均トークン数など、最近のプロンプト更新に関する情報
- {{< ui >}}Most Tokens Used{{< /ui >}}: 合計 (入力または出力) トークン数でランク付けされたプロンプト
- {{< ui >}}Highest Latency Prompts{{< /ui >}}: 平均実行時間でランク付けされたプロンプト

{{< img src="llm_observability/monitoring/prompt_details.png" alt="単一プロンプトの詳細ビュー。" style="width:100%;" >}}

プロンプトをクリックすると、バージョンアクティビティや各種メトリクスに関する情報を含む詳細サイドパネルビューが開きます。また、2 つのバージョンの差分表示、選択したバージョンを使用するスパンで事前フィルタリングされた Trace Explorer の起動、選択したバージョンのテンプレートと変数が事前入力された Playground セッションの開始も可能です。

{{< img src="llm_observability/monitoring/prompt_tracking_trace_explorer3.png" alt="Agent Observability におけるアプリのプロンプトビュー。" style="width:100%;" >}}

Agent Observability の Trace Explorer を使用して、プロンプトの使用状況からリクエストを検索できます。プロンプトの名前、ID、バージョンを、トレースレベルおよびスパンレベルの検索のファセットとして使用できます。LLM スパンをクリックすると、それを生成したプロンプトが表示されます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/traces
[2]: https://app.datadoghq.com/llm/playground
[3]: /ja/llm_observability/instrumentation/sdk/?tab=python#prompt-tracking
[4]: /ja/llm_observability/instrumentation/api/?tab=model#prompt
[5]: /ja/llm_observability/instrumentation/auto_instrumentation?tab=python#langchain
[6]: /ja/llm_observability/instrumentation/sdk/?tab=nodejs#prompt-tracking
[7]: /ja/llm_observability/instrumentation/otel_instrumentation
[8]: /ja/llm_observability/monitoring/prompt_management