---
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Generate Log-based Metrics プロセッサ
---
{{< product-availability >}}

## 概要 {#overview}

KPI などの傾向を長期間にわたって追跡するために、多くの種類のログが使用されます。ログからメトリクスを生成することは、大容量ログ (CDN ログ、VPC フローログ、ファイアウォールログ、ネットワークログなど) のログデータを要約するための費用対効果の高い方法です。Generate Metrics プロセッサを使用すると、クエリに一致するログからカウント、ゲージ、または分布のメトリクスを生成して、そのメトリクスを送信先に送信できます。

**注**: ログから生成されて Datadog にルーティングされたメトリクスは[カスタムメトリクス][1]となり、それに応じて課金されます。詳細については、[カスタムメトリクスの課金][2]を参照してください。

## セットアップ {#setup}

このプロセッサを設定するには:

[{{< ui >}}Manage Metrics{{< /ui >}}] (メトリクスを管理) をクリックして、新しいメトリクスを作成するか既存のメトリクスを編集します。サイドパネルが開きます。

- まだメトリクスを作成していない場合は、[メトリクスを追加する](#add-a-metric)セクションの説明に従ってメトリクスのパラメータを入力し、メトリクスを作成します。
- すでにメトリクスを作成済みの場合は、概要テーブルでメトリクスの行をクリックして、そのメトリクスを編集または削除します。または、検索バーを使用して名前で特定のメトリクスを検索し、そのメトリクスを選択して編集または削除します。別のメトリクスを追加するには [{{< ui >}}Add Metric{{< /ui >}}] (メトリクスを追加) をクリックします。

### メトリクスを追加する {#add-a-metric}

<div class="alert alert-warning">Generate Metrics プロセッサは、ログ上の <code>timestamp</code> フィールドを使用してメトリクスのタイムスタンプを設定します。ログの <code>timestamp</code> フィールドが文字列値である場合は、代わりにログの処理時間が使用されます。詳細については、<a href="#convert-string-timestamp-to-timestamp-format">文字列のタイムスタンプをタイムスタンプ形式に変換する</a>を参照してください。</div>

1. フィルタークエリを入力します。詳細については、[Logs Search Syntax][5] を参照してください。
   - フィルターに一致するログのみが処理されます。
   - フィルタークエリに一致するかどうかに関係なく、すべてのログがパイプラインの次のステップに送信されます。
   - **注**: 1 つのプロセッサで複数のメトリクスを生成できるため、メトリクスごとに異なるフィルタークエリを定義できます。
1. メトリクスの名前を入力します。
1. [{{< ui >}}Define parameters{{< /ui >}}] (パラメーターを定義) セクションで、メトリクスタイプ (カウント、ゲージ、または分布) を選択します。[カウントメトリクスの例](#count-metric-example)および[分布メトリクスの例](#distribution-metric-example)を参照してください。詳細については、[メトリクスタイプ](#metrics-types)も参照してください。
    - ゲージおよび分布のメトリクスタイプでは、生成されたメトリクスの値として使用される数値 (または解析可能な数値文字列) を持つログフィールドを選択します。
    - 分布のメトリクスタイプでは、値が (解析可能な) 数値の配列であるログフィールドを選択できます。その値は、生成されたメトリクスのサンプルセットに使用されます。
    - [{{< ui >}}Group by{{< /ui >}}] (グループ化) フィールドは、メトリクス値がどのようにグループ化されるかを決定します。たとえば、4 つのリージョンにまたがる数百のホストがある場合、リージョンごとにグループ化することで、リージョンごとに 1 本の線をグラフ化できます。[{{< ui >}}Group by{{< /ui >}}] 設定にリストされたフィールドは、構成されたメトリクスのタグとして設定されます。
1. [{{< ui >}}Add Metric{{< /ui >}}] をクリックします。

### メトリクスの送信先を構成する {#configure-a-metrics-destination}

{{< callout url="#" btn_hidden="true" header="プレビューにご参加ください!">}}
ログから生成されたメトリクスを Splunk HEC、Elasticsearch、または HTTP/S クライアントの送信先に送信する機能は、現在プレビュー版です。アクセスをリクエストするには、アカウントマネージャーにお問い合わせください。
{{< /callout >}}

<div class="alert alert-info">生成されたメトリクスを <a href="/observability_pipelines/destinations/datadog_metrics/">Datadog Metrics</a> 以外の送信先に送信するオプションは、Worker バージョン 2.18 以降で利用可能です。<br><br>すでに Generate Metrics プロセッサが設定されている既存のパイプラインで Worker バージョン 2.18 以降にアップグレードした場合に、Datadog Metrics 以外の送信先を選択するには、以下の手順が必要です。<br>&nbsp;&nbsp;&nbsp;&nbsp;1. 以前の Generate Metrics プロセッサを削除します。<br>&nbsp;&nbsp;&nbsp;&nbsp;2. 新しい Generate Metrics プロセッサを追加して設定します。</div>

{{< img src="observability_pipelines/processors/generate_metrics_destination.png" alt="送信先の選択が強調表示された Generate Metrics プロセッサ。" style="width:50%;" >}}

1. Generate Metrics プロセッサで、[**Add Metrics Destination**] (メトリクスの送信先を追加) をクリックします。<br>**注**: パイプラインシミュレーションを使用している場合は、パイプラインページに戻ってメトリクスの送信先を設定してください。パイプラインシミュレーションページの右上隅にある [**Back to pipeline**] (パイプラインに戻る) をクリックします。
1. デフォルトの送信先は [Datadog Metrics][6] です。別の送信先を選択するには、Datadog Metrics 送信先の鉛筆アイコンをクリックし、[**Change metrics destination**] (メトリクスの送信先を変更) を選択します。
1. 送信先を選択し、その[送信先][7]の設定手順に従います。

## メトリクスタイプ {#metrics-types}

以下のタイプのメトリクスをログに対して生成できます。詳細については、[メトリクスタイプ][3]および[分布][4]のドキュメントを参照してください。

| メトリクスタイプ  | 説明                                                                                                                                         | 例                                                                                       |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| COUNT (カウント)        | 1 つの時間間隔におけるイベント発生の合計数。ゼロにリセットすることはできますが、減らすことはできません。                                         | `status:error` を含むログの数をカウントしたい場合。                                    |
| GAUGE (ゲージ)        | 報告時点での値のスナップショット。                                                                                                  | ホストごとの最新の CPU 使用率を追跡したい場合。                                       |
| DISTRIBUTION (分布) | Datadog に生の値が送信されて、このメトリクスを報告するすべてのホストのパーセンタイル集計 (p95、p99 など) がサーバー側でグローバルに計算されます。| API エンドポイントを提供するすべてのホストの `response_time_seconds` のグローバルな p95 を取得したい場合。|

### カウントメトリクスの例 {#count-metric-example}

次のような `status:error` ログがあったとします。

```
{"status": "error", "env": "prod", "host": "ip-172-25-222-111.ec2.internal"}
```

`"status":"error"` を含むログの数をカウントし、`env` および `host` でグループ化するカウントメトリクスを作成するには、以下の情報を入力します。

| 入力パラメーター | 値               |
|------------------|---------------------|
| Filter query (フィルタークエリ)     | `@status:error`     |
| Metric name (メトリクス名)      | `status_error_total`|
| Metric type (メトリクスタイプ)      | Count               |
| Group by (グループ化)         | `env`、`prod`       |

### 分布メトリクスの例 {#distribution-metric-example}

次のような API レスポンスログがあったとします。

```
{
    "timestamp": "2018-10-15T17:01:33Z",
    "method": "GET",
    "status": 200,
    "request_body": "{"information"}",
    "response_time_seconds: 10
}
```

API 呼び出しにかかる平均時間を測定する分布メトリクスを作成するには、以下の情報を入力します。

| 入力パラメーター       | 値                   |
|------------------------|-------------------------|
| Filter query           | `@method`               |
| Metric name            | `status_200_response`   |
| Metric type            | Distribution            |
| Select a log attribute (ログ属性を選択) | `response_time_seconds` |
| Group by               | `method`                |

## 文字列のタイムスタンプをタイムスタンプ形式に変換する {#convert-string-timestamp-to-timestamp-format}

Generate Metrics プロセッサがメトリクスのタイムスタンプを設定するためにログの `timestamp` フィールドを使用できるのは、そのログフィールドがタイムスタンプ型である場合のみです。`timestamp` フィールドが文字列である場合は、代わりにログが処理された時刻が使用されます。ログの `timestamp` を使用するには、ログを Generate Metrics プロセッサに送信する前に、その文字列をタイムスタンプ型に変換する必要があります。

文字列のタイムスタンプをタイムスタンプ形式に変換するには:

1. パイプラインで Generate Metrics プロセッサの前に[カスタムプロセッサ][8]を追加します。
1. 以下のカスタムスクリプトを含む関数を追加します。
    ```
    .timestamp = parse_timestamp!(.timestamp, format: "%+")
    ```
    See [parse_timestamp][9] for more information.

## ヘルスメトリクス {#health-metrics}

すべてのプロセッサから出力される[コンポーネントメトリクス][10]および[プロセッサバッファメトリクス][11]については、[パイプライン使用状況メトリクス][12]のドキュメントを参照してください。

### Generate Metrics プロセッサのメトリクス {#generate-metrics-processor-metrics}

- 個々のコンポーネントでフィルタリングまたはグループ化するには、`component_id` タグを使用します。
- このプロセッサのメトリクスの `component_type` タグは `generate_metrics` です。

`pipelines.generated_metrics_from_logs_total`
: **説明**: このプロセッサによってログイベントから生成されたメトリクスの数です。
: **メトリクスタイプ**: カウント

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