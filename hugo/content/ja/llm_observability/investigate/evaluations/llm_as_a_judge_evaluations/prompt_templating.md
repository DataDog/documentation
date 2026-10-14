---
aliases:
- /ja/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/prompt_templating/
- /ja/llm_observability/configure/evaluations/llm_as_a_judge_evaluations/prompt_templating/
description: カスタム LLM-as-a-judge 評価プロンプトで使用されるテンプレート (変数、配列演算子、スパンおよびトレースフィルター、セッションパス、解決ルール)
  のリファレンス。
further_reading:
- link: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations
  tag: ドキュメント
  text: カスタム LLM-as-a-Judge 評価
- link: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/session_level_evaluations
  tag: ドキュメント
  text: セッションレベル評価
- link: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/trace_level_evaluations
  tag: ドキュメント
  text: トレースレベル評価
title: プロンプトテンプレート
---
カスタム LLM-as-a-judge プロンプトは、フィールドパスを `{{ ... }}` で囲むことで、セッション、トレース、またはスパンのデータを {{< ui >}}User{{< /ui >}} メッセージに挿入します。システムプロンプトには LLM ジャッジへの静的な指示が含まれており、プレースホルダーは解決されません。同じ構文がテストペインと評価時の両方で機能します。利用可能なパスは、セッション、トレース、スパンといった評価スコープによって異なります。

## 概要 {#at-a-glance}

| パターン | 説明 |
|---|---|
| `{{traces}}` | Every trace in the session as JSON |
| `{{traces[0].spans[0].meta.input.value}}` | First span of the first trace |
| `{{traces[*].spans[*].name}}` | Fan-out across traces and spans |
| `{{traces[*].spans[meta.span.kind:llm].meta.output.value}}` | Filter spans by attribute across a session |
| `{{spans}}` | Every span in the trace as JSON (trace scope) |
| `{{spans[0].name}}` | Pick one span from a trace (trace scope) |
| `{{spans[name:my-span].meta.input.value}}` | Filter spans by attribute (trace scope) |
| `{{name}}` | Direct field (span scope) |
| `{{meta.input.value}}` | Dot notation for nested fields (span scope) |
| `{{meta.input.messages[0].content}}` | Array index (0-based) (span scope) |
| `{{meta.input.messages[1,3].content}}` | Inclusive array range (span scope) |
| `{{meta.input.messages[*].content}}` | Array wildcard (fan-out) (span scope) |
| `{{meta.input.messages.content}}` | Implicit fan-out (same as `[*]`) (span scope) |
| `{{span_input}}`, `{{span_output}}` | Aliases for span input and output fields (span scope) |
| `{{*}}` | JSON としてのペイロード全体 (セッション、トレース、またはスパンのスコープ) |

`{{` を入力するとオートコンプリートのドロップダウンが開き、選択したサンプルで使用可能なフィールドが表示されます。

## セッションスコープ構文 {#session-scope-syntax}

セッションスコープ評価では、[ユーザーセッション][1] 内のすべてのトレースが `traces` 配列の下に公開されます。各トレースには独自の `spans` 配列が含まれているため、1 つのプロンプトで複数のトレースとスパンを読み取ることができます。`{{traces[...]}}` paths (and nested `{{traces[...].spans[...]}}` paths) to build session-level judges. The `{{span_input}}` and `{{span_output}}` エイリアスは、セッションスコープでは使用できません。

セッションレベル評価では、スパンに `session_id` がタグ付けされている必要があります。アプリケーションをインスツルメントするには、[ユーザーセッションの追跡][1] を参照してください。構成、プロンプトの例、およびセッションスコープを選択する際のガイダンスについては、[セッションレベル評価][2] を参照してください。

### セッション全体を参照する {#reference-the-whole-session}

```
{{traces}}    # JSON of every trace in the session (each trace includes its spans)
{{*}}         # Entire session payload as JSON, including top-level metadata
```

### インデックスでトレースまたはスパンを選択する {#pick-a-trace-or-span-by-index}

```
{{traces[0].spans[0].meta.input.value}}    # First span of the first trace
{{traces[*].spans[*].name}}                # Newline-joined names of every span in the session
{{traces[1].spans}}                        # JSON of every span in the second trace
```

### 属性でスパンをフィルタリングする {#filter-spans-by-attribute}

`spans` の `[field.path:value]` は、`field.path` でのフィールドが `value` と等しいスパンのみを保持します。より深いパスと組み合わせることで、セッション全体の入力または出力を抽出できます。一致する対象がない場合、フィルターは空白の文字列にフォールバックします。

```
{{traces[0].spans[name:my-span].meta.input.value}}
{{traces[*].spans[meta.span.kind:llm].meta.output.value}}
{{traces[*].spans[meta.span.kind:tool].meta.input.parameters}}
```

### トレース間でファンアウトする {#fan-out-across-traces}

`[*]` を `traces` または `spans` で使用してファンアウトします。一致するすべての要素の値は改行 (`\n`) で結合されるか、解決された値がオブジェクトの場合は JSON としてシリアル化されます。

```
{{traces[*].spans[meta.span.kind:llm].meta.input.messages[*].content}}
{{traces[*].spans[meta.span.kind:llm].meta.output.messages[*].content}}
```

## トレーススコープ構文 {#trace-scope-syntax}

トレーススコープ評価では、トレース内のすべてのスパンが `spans` 配列の下に公開されます。`{{spans...}}` paths to read across spans. The `{{span_input}}` and `{{span_output}}` エイリアスは、トレーススコープでは使用できません。構成、プロンプトの例、およびトレーススコープを選択する際のガイダンスについては、[トレースレベル評価][3] を参照してください。

### トレース全体を参照する {#reference-the-whole-trace}

```
{{spans}}    # JSON of every span in the trace
{{*}}        # Entire trace payload as JSON, including top-level metadata
```

### インデックスでスパンを選択する {#pick-a-span-by-index}

```
{{spans[0].meta.input.value}}    # First span
{{spans[*].name}}                # Newline-joined names of every span
```

### 属性でスパンをフィルタリングする {#filter-spans-by-attribute-1}

`[field.path:value]`は、`field.path` でのフィールドが `value` と等しいスパンのみを保持します。より深いパスと組み合わせることで、一致するスパンの入力または出力を抽出できます。一致するスパンがない場合、フィルターは空白の文字列にフォールバックします。

```
{{spans[name:my-span].meta.input.value}}
{{spans[meta.span.kind:llm].meta.output.value}}
{{spans[meta.span.kind:tool].meta.input.parameters}}
```

## スパンスコープ構文 {#span-scope-syntax}

スパンスコープ評価では、評価ごとに単一のスパンが公開されます。スパン上の JSON パスによってフィールドを参照します。

### 組み込みエイリアス {#built-in-aliases}

| エイリアス | 解決先 |
|---|---|
| `{{span_input}}` | `meta.input.messages[*].content` for LLM spans, `meta.input.value` otherwise |
| `{{span_output}}` | `meta.output.messages[*].content` for LLM spans, `meta.output.value` otherwise |

エイリアスは評価対象のスパンの種類に適応するため、スパンが LLM 呼び出しであるかエージェントステップであるかによって分岐させる必要はありません。

### 直接フィールドパス {#direct-field-paths}

JSON パスを使用して、任意のスパンフィールドを参照します。

```
{{name}}
{{meta.input.value}}
{{meta.output.value}}
{{metrics.input_tokens}}
```

### 配列アクセス {#array-access}

ブラケット表記を使用して、配列フィールドのインデックス指定、スライス、またはファンアウトを行います。

```
{{meta.input.messages[0].content}}     # First message only
{{meta.input.messages[*].content}}     # All messages, joined with newlines
{{meta.input.messages[0,2].content}}   # Inclusive range; out-of-bounds ends are clamped
{{meta.input.messages.content}}        # Implicit fan-out, equivalent to [*]
```

## 解決ルール {#resolution-rules}

| 結果 | 動作 |
|---|---|
| パスが見つからない場合 | 解決先: 空白の文字列 |
| 範囲外のインデックス | 解決先: 空白の文字列 |
| 単一の文字列 | そのまま挿入 |
| 文字列の配列 | 改行で結合 (`\n`) |
| オブジェクトまたは文字列以外の値の配列 | コンパクトな JSON としてシリアル化 |
| 混合配列 (文字列 + オブジェクト) | コンパクトな JSON としてシリアル化 |
| 単一の空白の配列 | 解決先: 空白の文字列 |

たとえば、`meta.input.messages` がスパンである場合:

```json
[
  { "role": "user", "content": "hello" },
  { "role": "user", "content": "help please" }
]
```

| テンプレート | 解決された値 |
|---|---|
| `{{meta.input.messages[0].content}}` | `hello` |
| `{{meta.input.messages[*].content}}` | `hello`<br>`help please` |
| `{{meta.input.messages}}` | `[{"role":"user","content":"hello"},{"role":"user","content":"help please"}]` |

## ヒント {#tips}

- `{{` をプロンプトエディターで入力すると、オートコンプリートドロップダウンが開きます。リストはスコープ (セッション、トレース、またはスパン) および選択されたサンプルに適応します。
- 右側のパネルでサンプルを選択し (セッションスコープの場合は {{< ui >}}Sample Session{{< /ui >}}、トレーススコープの場合は {{< ui >}}Spans in Selected Trace{{< /ui >}}、スパンスコープの場合は {{< ui >}}Filtered Spans{{< /ui >}})、{{< ui >}}Test Evaluation{{< /ui >}} をクリックして、保存前に各プレースホルダーが実際のデータでどのように解決されるかをプレビューします。
- サンプルの JSON ビューにある 3 点メニューを使用して {{< ui >}}Add variable to message{{< /ui >}} を選択すると、フィールドパスを入力せずにプロンプトに挿入できます。
- LLM ジャッジに完全なペイロードを表示させたい場合、`{{*}}` を渡します。これは、どのフィールドが重要かを独自に判断する自由形式のプロンプトに役立ちます。
- 単一のトレースで十分な場合は、`{{traces}}` or targeted `{{traces[...].spans[...]}}` paths for session judges when you need cross-turn context; use `{{spans}}` を使用します。スコープのガイダンスとプロンプトの例については、[セッションレベルの評価][2] を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/llm_observability/instrument/sdk/#tracking-user-sessions
[2]: /ja/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/session_level_evaluations
[3]: /ja/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/trace_level_evaluations