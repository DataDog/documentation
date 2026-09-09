---
description: Log Explorer で Grok パターンを使用して、クエリ時にログから値を抽出します。
further_reading:
- link: /logs/explorer/calculated_fields/
  tag: ドキュメント
  text: Calculated Fields の詳細はこちら
title: Extractions
---
{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLSffBg9ph2zl-jTGzvgBUcXSifOjvPdRh8vJjzTMIclSB2ZLIw/viewform" btn_hidden="false" header="Calculated Fields Extractions はプレビュー版です">}}
Calculated Fields Extractions を使用して、Log Explorer でクエリ時に Grok パターンを用いてログから値を抽出します。
{{< /callout >}}

## 概要 {#overview}

Calculated Fields Extractions を使用すると、Log Explorer でクエリ時に Grok パースルールを適用できます。これにより、パイプラインを変更したり、データを再インジェストしたりすることなく、生のログメッセージや属性から値を抽出できます。AI を活用したパースで抽出ルールを自動生成することも、独自の Grok パターンを手動で定義して特定のニーズに合わせることもできます。

extraction calculated field を作成するには、[計算フィールドを作成][1]を参照してください。

## 自動パース{#automatic-parsing}

AI を活用した自動パースを使用して、ログデータから Grok ルールを生成します。Datadog はログメッセージの内容を分析し、抽出ルールを自動的に生成するため、Grok パターンを手動で記述する必要がありません。

{{< img src="/logs/explorer/calculated_fields/extractions/calculated_fields_parse_ai.png" alt="Datadog の Calculated Fields における AI を活用した Grok パースの例" style="width:100%;" >}}

ログサイドパネルから自動パースにアクセスするには、2 つの方法があります。

1. copy button の横にある {{< ui >}}AI{{< /ui >}} ボタン <i class="icon-bits-ai"></i> をクリックします。
2. ログメッセージの特定の部分をハイライトし、ポップアップメニューの {{< ui >}}AI{{< /ui >}} ボタン <i class="icon-bits-ai"></i>をクリックします。

{{< ui >}}AI{{< /ui >}} ボタンをクリックすると、Datadog は Calculated Field フォームを自動的に入力します。

1. {{< ui >}}Extract from{{< /ui >}}: デフォルトでは、ログメッセージ全体が設定されます。ドロップダウンを変更して、個々の属性をパースすることもできます。
2. {{< ui >}}Log sample{{< /ui >}}: 選択したログから自動的に入力されます。
3. {{< ui >}}Parsing rule{{< /ui >}}: ログサンプルから自動的に生成されます。

必要に応じて、生成されたルールを確認して修正します。手動で編集するか、{{< ui >}}Generate a new rule{{< /ui >}} をクリックして Datadog に再試行させることができます。また、ログサンプルを修正、挿入、または置換して、異なるログ形式に対してルールをテストすることもできます。

<div class="alert alert-tip">高評価または低評価ボタンを使用してインラインフィードバックを提供し、機能の改善にご協力ください。</div>

## 構文 {#syntax}

抽出フィールドは、Grok パターンを使用してログ属性から値を識別して取得します。Grok パターンは、以下の形式の 1 つ以上のトークンで構成されます。

```
%{PATTERN_NAME:field_name}
```
- `PATTERN_NAME`: Grokマッチャー。
- `field_name`: 抽出された Calculated Field の名前。

複数のパターンを連結して、複雑なログメッセージをパースできます。

## クエリ時にサポートされるマッチャーとフィルター{#supported-matchers-and-filters-at-query-time}

<div class="alert alert-warning"><em>クエリ時</em> (<a href="/logs/explorer/calculated_fields/">Log Explorer</a> 内) で使用可能な Grok パース機能は、マッチャー (<strong>data</strong>、<strong>integer</strong>、<strong>notSpace</strong>、<strong>number</strong>、および <strong>word</strong>) とフィルター (<strong>number</strong>および <strong>integer</strong>) の限定的なサブセットをサポートしています。長期的なパースが必要な場合は、ログパイプラインを定義します。</div>

Log Explorer でのクエリ時の Grok パースは、マッチャーとフィルターの限定的なサブセットをサポートしています。各マッチャーまたはフィルターは、以下の形式の Grok パターンで使用されます。

```
%{MATCHER:field_name}
```

### マッチャー {#matchers}

| マッチャー | Grok パターンの例 |
| ------- | -------------------- |
| `data`<br>_任意の文字列 (非貪欲)_ | `status=%{data:status}` |
| `word`<br>_英数字_ | `country=%{word:country}` |
| `number`<br>_浮動小数点数_ | `value=%{number:float_val}` |
| `integer`<br>_整数値_ | `count=%{integer:count}` |
| `notSpace`<br>_空白以外の文字_ | `path=%{notSpace:request_path}` |

### フィルター{#filters}
フィルターを適用して、抽出された値を数値型にキャストします。フィルターは、マッチャーと同じパターン構文を使用します。

| フィルター| Grok パターンの例|
| ------ | -------------------- |
| `number`<br>_数値文字列を数値としてパースします_ | `latency=%{number:lat}` |
| `integer`<br>_数値文字列を整数としてパースします_ | `users=%{integer:user_count}` |

### 例{#example}
この機能を使用して、取り込みパイプラインを変更することなく、オンデマンドでログフィールドを分析します。
**ログ行**:

```
country=Brazil duration=123ms path=/index.html status=200 OK
```

**Extraction Grok ルール**:

```
country=%{word:country} duration=%{integer:duration} path=%{notSpace:request_path} status=%{data:status}
```
**生成された Calculated Fields**:
- `#country = Brazil`
- `#duration = 123`
- `#request_path = /index.html`
- `#status = 200 OK`

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/explorer/calculated_fields/#create-a-calculated-field