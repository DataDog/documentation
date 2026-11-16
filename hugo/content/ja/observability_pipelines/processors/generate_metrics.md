---
description: Generate Metrics プロセッサーを使用して、クエリに一致するログからカウント、ゲージ、またはディストリビューションメトリクスを作成する方法を学びます。
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: ログベースのメトリクスプロセッサーを生成する
---
{{< product-availability >}}

## 概要 {#overview}

多くの種類のログは、KPI などの傾向を長期間にわたって追跡するために使用されます。ログからメトリクスを生成することは、CDN ログ、VPC フローログ、ファイアウォールログ、ネットワークログなど、大量のログからログデータを要約するための費用対効果の高い方法です。Generate Metrics プロセッサーを使用して、クエリに一致するログからカウント、ゲージ、またはディストリビューションメトリクスを生成し、そのメトリクスを送信先に送信します。

**注**: ログから生成され、Datadog にルーティングされたメトリクスは [カスタムメトリクス][1] であり、それに応じて課金されます。詳細については、[カスタムメトリクスの課金][2] を参照してください。

## セットアップ {#setup}

プロセッサーをセットアップするには、

{{< ui >}}Manage Metrics{{< /ui >}}をクリックして、新しいメトリクスを作成するか、既存のメトリクスを編集します。これにより、サイドパネルが開きます。

- メトリクスをまだ作成していない場合は、[メトリクスを追加](#add-a-metric)セクションの説明に従ってメトリクスパラメーターを入力し、メトリクスを作成します。
- すでにメトリクスを作成している場合は、概要テーブルでそのメトリクスの行をクリックして編集または削除します。検索バーを使用して名前で特定のメトリクスを検索し、そのメトリクスを選択して編集または削除します。{{< ui >}}Add Metric{{< /ui >}} をクリックして別のメトリクスを追加します。

### メトリクスを追加 {#add-a-metric}

<div class="alert alert-warning">Generate Metrics プロセッサーは、ログの <code>timestamp</code> フィールドを使用してメトリクスのタイムスタンプを設定します。ログの <code>timestamp</code> フィールドが文字列値である場合、代わりにログの処理時間が使用されます。詳細については、<a href="#convert-string-timestamp-to-timestamp-format">文字列タイムスタンプをタイムスタンプ形式に変換</a>を参照してください。</div>

1. フィルタークエリを入力します。詳細については、[ログ検索構文][5] を参照してください。
   - フィルターに一致するログのみが処理されます。
   - フィルタークエリに一致するかどうかにかかわらず、すべてのログがパイプラインの次のステップに送信されます。
   - **注**: 1 つのプロセッサーで複数のメトリクスを生成できるため、メトリクスごとに異なるフィルタークエリを定義できます。
1. メトリクスの名前を入力します。
1. {{< ui >}}Define parameters{{< /ui >}}セクションで、メトリクスタイプ (count、gauge、または distribution) を選択します。[Count メトリクスの例](#count-metric-example)および[Distribution メトリクスの例](#distribution-metric-example)を参照してください。詳細については、[メトリクスタイプ](#metrics-types)も参照してください。
    - Gauge および Distribution メトリクスタイプの場合、生成されるメトリクスの値として使用する、数値 (または解析可能な数値文字列) の値を持つログフィールドを選択します。
    - Distribution メトリクスタイプの場合、ログフィールドの値は (解析可能な) 数値の配列にすることができ、生成されるメトリクスのサンプルセットとして使用されます。
    - {{< ui >}}Group by{{< /ui >}} フィールドは、メトリクスの値をどのようにグループ化するかを決定します。たとえば、4 つのリージョンに数百のホストが分散している場合、リージョンごとのグループ化によって、各リージョンに 1 つの直線をグラフ化することができます。{{< ui >}}Group by{{< /ui >}} にリストされているフィールドは、構成されたメトリクスのタグとして設定されます。
1. {{< ui >}}Add Metric{{< /ui >}} をクリックします。

### メトリクスの送信先を設定する{#configure-a-metrics-destination}

{{< callout url="#" btn_hidden="true" header="プレビューに参加しましょう。">}}
ログから生成されたメトリクスを Splunk HEC、Elasticsearch、または HTTP/S Client の送信先に送信する機能は、プレビュー版です。アクセスをリクエストするには、アカウントマネージャーに連絡してください。
{{< /callout >}}

<div class="alert alert-info"><a href="/observability_pipelines/destinations/datadog_metrics/">Datadog Metrics</a> 以外の送信先に生成されたメトリクスを送信するオプションは、Worker バージョン 2.18 以降で利用できます。<br><br>すでに Generate Metrics プロセッサーが設定されている既存のパイプラインを Worker バージョン 2.18 以降にアップグレードし、Datadog Metrics 以外の送信先を選択する場合は、以下の手順を実行する必要があります。<br>&nbsp;&nbsp;&nbsp;&nbsp;1. 以前の Generate Metrics プロセッサーを削除します。<br>&nbsp;&nbsp;&nbsp;&nbsp;2. 新しい Generate Metrics プロセッサーを追加して構成します。</div>

{{< img src="observability_pipelines/processors/generate_metrics_destination.png" alt="送信先が選択された状態の Generate Metrics プロセッサーを表示しています。" style="width:50%;" >}}

1. Generate Metrics プロセッサーで、**Add Metrics Destination** をクリックします。<br>**注**: Pipeline Simulation を使用している場合は、パイプラインページに戻ってメトリクスの送信先を構成してください。パイプラインシミュレーションページの右上隅にある **Back to pipeline** をクリックします。
1. [Datadog メトリクス][6] がデフォルトの送信先です。別の送信先を選択するには、Datadog Metrics の送信先にある鉛筆アイコンをクリックし、**Change metrics destination** を選択します。
1. 送信先を選択し、特定の [送信先][7] のセットアップ手順に従います。

## メトリクスタイプ {#metrics-types}

ログに対してこれらのタイプのメトリクスを生成できます。詳細については、[メトリクスタイプ][3] および [ディストリビューション][4] のドキュメントを参照してください。

| メトリクスタイプ  | 説明                                                                                                                                         | 例                                                                                       |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| COUNT        | 1 つの時間間隔におけるイベントの発生回数の合計。ゼロにリセットすることはできますが、減らすことはできません。                                         | `status:error` のログの数を計測する。                                    |
| GAUGE        | 報告された時点での値のスナップショット。                                                                                                  | ホストごとの最新の CPU 使用率を追跡する場合。                                       |
| DISTRIBUTION | パーセンタイル集計 (p95、p99 など) をサーバー側で計算するために Datadog に送信される生の値。メトリクスを報告するすべてのホストにわたってグローバルに計算されます。| API エンドポイントを提供するすべてのホストにわたる `response_time_seconds` のグローバル p95 を取得する場合。|

### Count メトリクスの例 {#count-metric-example}

この `status:error` ログの例の場合:

```
{"status": "error", "env": "prod", "host": "ip-172-25-222-111.ec2.internal"}
```

`"status":"error"` を含み、それらを `env` および `host` でグループ化してログの数をカウントする Count メトリクスを作成するには、次の情報を入力します。

| 入力パラメーター | 値               |
|------------------|---------------------|
| フィルタークエリ     | `@status:error`     |
| メトリクス名      | `status_error_total`|
| メトリクスタイプ      | Count               |
| グループ化         | `env`、`prod`       |

### Distribution メトリクスの例 {#distribution-metric-example}

次の API レスポンス ログの例の場合:

```
{
    "timestamp": "2018-10-15T17:01:33Z",
    "method": "GET",
    "status": 200,
    "request_body": "{"information"}",
    "response_time_seconds: 10
}
```

API 呼び出しに要する平均時間を測定するディストリビューション メトリクスを作成するには、次の情報を入力します:

| 入力パラメーター       | 値                   |
|------------------------|-------------------------|
| フィルタークエリ           | `@method`               |
| メトリクス名            | `status_200_response`   |
| メトリクスタイプ            | Distribution            |
| ログ属性を選択してください | `response_time_seconds` |
| グループ化               | `method`                |

## 文字列のタイムスタンプをタイムスタンプ形式に変換 {#convert-string-timestamp-to-timestamp-format}

Generate Metrics プロセッサーは、ログの`timestamp`フィールドがタイムスタンプ型である場合にのみ、そのフィールドを使用してメトリクスのタイムスタンプを設定できます。`timestamp`フィールドが文字列である場合は、代わりにログが処理された時刻が使用されます。ログの `timestamp` を使用するには、ログを Generate Metrics プロセッサーに送信する前に、文字列をタイムスタンプ型に変換する必要があります。

文字列タイムスタンプをタイムスタンプ形式に変換するには、

1. Generate Metrics プロセッサーの前に、パイプラインに [カスタムプロセッサー][8] を追加します。
1. 次のカスタムスクリプトを持つ関数を追加します。
    ```
    .timestamp = parse_timestamp!(.timestamp, format: "%+")
    ```
    See [parse_timestamp][9] for more information.

## 健全性メトリクス {#health-metrics}

すべてのプロセッサーから送信される [コンポーネントメトリクス][10] および [プロセッサーバッファメトリクス][11] については、[パイプライン使用状況メトリクス][12] のドキュメントを参照してください。

### Generate Metrics プロセッサーのメトリクス {#generate-metrics-processor-metrics}

- `component_id` タグを使用して、個々のコンポーネントでフィルタリングまたはグループ化します。
- `component_type` タグは、このプロセッサーのメトリクスに対して `generate_metrics` です。

`pipelines.generated_metrics_from_logs_total`
: **説明**: プロセッサーによってログイベントから生成されたメトリクスの数。
: **メトリクスタイプ**: count

[1]: /ja/metrics/custom_metrics/
[2]: /ja/account_management/billing/custom_metrics/
[3]: /ja/metrics/types/
[4]: /ja/metrics/distributions/
[5]: /ja/observability_pipelines/search_syntax/logs/
[6]: /ja/observability_pipelines/destinations/datadog_metrics/
[7]: /ja/observability_pipelines/destinations/?tab=metrics#destinations
[8]: /ja/observability_pipelines/processors/custom_processor/#setup
[9]: /ja/observability_pipelines/processors/custom_processor/#parse_timestamp
[10]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[11]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[12]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/