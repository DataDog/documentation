---
description: Grok Parser プロセッサを使用して、カスタムログや非標準ログを構造化するパースルールを生成する方法を学びます。
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/otel-ai-observability-pipelines-clickhouse/
  tag: ブログ
  text: Observability Pipelines を使用して、AI アプリから ClickHouse および Datadog へ OTel データをルーティングする
- link: https://www.datadoghq.com/blog/observability-pipelines-mssp
  tag: ブログ
  text: Datadog Observability Pipelines を使用して、MSSP 向けのログ収集と集約を簡素化する
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Grok Parser プロセッサ
---
{{< product-availability >}}

{{< callout url="#" btn_hidden="true" header="プレビュー版を利用しましょう" >}}
ルールごとのフィルターと AI 生成のパースルールはプレビュー版です。アクセスをリクエストするには、アカウントマネージャーにお問い合わせください。
{{< /callout >}}

## 概要 {#overview}

カスタムアプリケーションのログや非標準ログは、構造化フォーマットへのパースが難しいことがよくあります。この問題を解決するには、Grok Parser プロセッサを使用して AI でパースルールを生成するか、ベンダー固有のフォーマット (Apache、Airflow、MySQL など) にライブラリルールを適用するか、独自のパースルールを作成します。次に、サンプルデータでルールをテストして構文を検証し、パースされたログ出力をプレビューします。

**注**:
- パースするフィールドごとに個別の Grok Parser を作成する必要があります。
- ログは最初に一致したルールでのみパースされるため、[ルールの順序が重要です](#order-of-custom-rules)。
- 2.17 より前の Worker バージョンを使用している場合、プロセッサでログをパースするには、ログに `source` または `ddsource` フィールドと `message` フィールドが含まれている必要があります。

## セットアップ {#setup}

Grok Parser プロセッサは、次の処理を行います。

1. プロセッサレベルのフィルタークエリを使用して、どのログをパーサーに送信するかを決定します。
1. ログでパースする指定フィールドを特定します。
1. (プレビュー) ルールレベルのフィルタークエリを使用して、ログに一致する最初のパースルールを適用します。
1. 指定されたログフィールドをルールの出力で上書きし、そのログをパイプラインの次のステップに送信します。

{{< img src="observability_pipelines/processors/grok_parser_setup.png" alt="フィルタークエリとパース対象フィールドの設定が表示されている Grok Parser プロセッサパネル。" style="width:50%;" >}}

Grok Parser プロセッサをセットアップするには、

1. プロセッサレベルのフィルタークエリを定義します。このフィルタークエリに一致するログのみがパーサーに送信されます。プロセッサによってパースされたかどうかにかかわらず、すべてのログがパイプラインの次のステップに送信されます。クエリの作成に関する詳細については、[ログ検索構文][3]を参照してください。
1. パース対象のログフィールドを入力します。たとえば、`logmessage` と入力すると、`logmessage` 属性の内容がパースされます。フィールドが指定されていない場合、`message` がデフォルトのフィールドとして使用されます。
1. {{< ui >}}Enable Library Rules{{< /ui >}} をオフに切り替えると、すべてのライブラリパースルールが無効になります。
   <br>**注**:
   - ライブラリルールを無効にするには、事前にカスタムパースルールを作成する必要があります。
   - ライブラリルールはデフォルトで適用されます。カスタムパースルールを使用している場合にのみ、ライブラリルールを無効にしてください。
1. をクリックすると、{{< ui >}}View Library Rules{{< /ui >}} インテグレーション用のプリセットルールをプレビューできます。すぐに使えるパースルールをログサンプルでテストできます。詳細については、[ライブラリルール](#library-rules)を参照してください。

### AI 生成またはカスタムのパースルールを作成します{#create-an-ai-generated-or-custom-parsing-rule}

AI 支援またはカスタムのパースルールを設定するには、Grok Parser プロセッサの {{< ui >}}Create Parsing Rules{{< /ui >}} をクリックします。

1. パースルールの名前を入力します。
1. (プレビュー) このルールを適用するログを定義するためのフィルタークエリを入力します。Grok Parser は、ログがルールごとのフィルタークエリに一致する場合にのみルールを実行します。これにより、異なるログ形式に異なるパースルールを適用できます。クエリの作成に関する詳細については、[ログ検索構文][3]を参照してください。
1. パースするログサンプルを入力します。サンプルは、Live Capture からコピーするか、別のソースから貼り付けることができます。
1. (プレビュー) {{< ui >}}Generate New Rule{{< /ui >}}をクリックすると、サンプルログに基づいて AI が新しいパースルールを生成します。それ以外の場合は、[ルールを手動で作成する](#manually-write-rules)を参照して、独自のルールを作成します。
    1. {{< ui >}}Preview Changes{{< /ui >}}パネルでパースされたログを確認します。
    1. {{< ui >}}Generate New Rule{{< /ui >}} をクリックして AI ルールジェネレーターを再実行するか、ログが正しくパースされるようにルールを手動で更新します。パースルールの作成に関する詳細については、[パース][1]を参照してください。
    <br>**注**:
        - AI ルールジェネレーターを再実行すると、新しいルールが作成されます。以前に AI で作成したルールが不要な場合は、手動で削除する必要があります。
        - AI ルールジェネレーターは、サンプルごとに最大 3 回まで実行できます。
    1. ステップ 4 を繰り返し、追加のサンプルログに基づいてルールを作成します。ルールの順序によってどのルールでログをパースするかが決まる仕組みについては、[カスタムルールの順序](#order-of-custom-rules)を参照してください。
1. ルールを追加した後、{{< ui >}}reference a library rule{{< /ui >}} ドロップダウンメニューからライブラリルールを選択して、ライブラリルールを追加できます。複数のライブラリルールを追加できます。詳細については、[ライブラリルール](#library-rules)を参照してください。
1. ヘルパールールを追加する場合は、{{< ui >}}Advanced Settings{{< /ui >}} をクリックします。詳細については、[ヘルパールールを使用して一般的なパターンを再利用する][2]を参照してください。
1. {{< ui >}}Create Rule{{< /ui >}} をクリックします。

{{< img src="observability_pipelines/processors/grok_parser_create_rule.png" alt="Grok Parser プロセッサの「パースルールの作成」モーダル。" style="width:50%;" >}}

ログがパーサーに送信されたものの、どのルールによってもパースされなかった場合、Worker はエラー「`The parser failed to apply rule`」を含むログを生成します。

#### カスタムルールの順序{#order-of-custom-rules}

Grok Parser プロセッサに対して複数のカスタムルールがある場合、ログはクエリが一致した最初のルールによってパースされ、その後パイプラインの次のステップに送信されます。プロセッサは、その後のルールとログを照合しようとはしません。したがって、ログが複数のルールに一致する可能性がある場合は、ルールの順序が重要になります。ルールを並べ替えるには、ドラッグアンドドロップで目的の順序に移動します。

##### 例{#example}

以下のパースルールを持つパーサーを検討します。

1. ルール例 1
1. ルール例 2
1. ルール例 3

パーサーに送信されたログが 3 つのルールクエリすべてに一致する場合、そのログはルール例 1 によって_のみ_パースされます。これは、ルール 2 および 3 よりも前にリストされているためです。

{{< img src="observability_pipelines/processors/grok_parser_rule_order.png" alt="Grok Parser プロセッサで順にリストされた 3 つのパースルール。" style="width:50%;" >}}

#### パースルールを手動で作成する{#manually-write-rules}

パースルールを手動で作成するには、{{< ui >}}Create Parsing Rule{{< /ui >}} モーダルで以下を行います。

1. {{< ui >}}write rules manually{{< /ui >}} をクリックします。
1. ログをパースするためのルールを入力します。Datadog Grok パターンを使用したパースルールの作成については、[パース][1]を参照してください。**注**: `url`、`useragent`、および `csv` フィルターは使用できません。
1. {{< ui >}}Preview Changes{{< /ui >}}パネルでパースされたログを確認し、ログが期待どおりにパースされるまでルールを更新します。
1. 別のルールを手動で作成するには、{{< ui >}}Add rule{{< /ui >}}をクリックします。

### ライブラリルール{#library-rules}

ログがパーサーに送信されると、`source` または `ddsource` フィールドが存在する場合、ライブラリルールが自動的にログに適用されます。たとえば、ログに `source:mysql` が含まれている場合、パーサーはそのログに MySQL ライブラリルールを適用します。Grok Parser プロセッサで {{< ui >}}View Library Rules{{< /ui >}} をクリックすると、利用可能なすべてのライブラリルールを確認できます。ライブラリルールのテーブルを検索し、任意のルールをクリックすると、そのルールがログにどのように適用されるかをプレビューできます。

カスタムルールを作成する際に、ライブラリルールを追加することもできます。詳細については、[AI 支援によるパースルールまたはカスタムパースルールの作成](#create-an-ai-assisted-or-custom-parsing-rule)を参照してください。

## Health メトリクス {#health-metrics}

すべてのプロセッサから出力される[コンポーネントメトリクス][4]および[プロセッサバッファメトリクス][5]については、[Pipelines 使用量メトリクス][6]のドキュメントを参照してください。Parse プロセッサのメトリクスでフィルタリングまたはグループ化するには、タグ `component_type:parse` を使用します。

[1]: /ja/logs/log_configuration/parsing/
[2]: /ja/logs/log_configuration/parsing/?tab=matchers#using-helper-rules-to-reuse-common-patterns\r
[3]: /ja/observability_pipelines/search_syntax/logs/
[4]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics\r
[5]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics\r
[6]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}