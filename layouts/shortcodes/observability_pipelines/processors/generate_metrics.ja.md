多くの種類のログは、KPI などのトレンドを長期間にわたって追跡するテレメトリーとして使用されます。CDN ログ、VPC フロー ログ、ファイアウォール ログ、ネットワーク ログなど、大量のログ データを要約する手段として、ログからメトリクスを生成することはコスト効率が高い方法です。generate metrics プロセッサを使用すると、クエリに一致するログをカウントするカウント メトリクス、またはリクエストの所要時間などログに含まれる数値値を分布として集計するディストリビューション メトリクスを生成できます。

**注**: 生成されたメトリクスは [カスタム メトリクス][10031] として課金されます。詳細は [カスタム メトリクスの課金][10032] を参照してください。

To set up the processor:

Click **Manage Metrics** to create new metrics or edit existing metrics. This opens a side panel.

- If you have not created any metrics yet, enter the metric parameters as described in the [Add a metric](#add-a-metric) section to create a metric.
- If you have already created metrics, click on the metric's row in the overview table to edit or delete it. Use the search bar to find a specific metric by its name, and then select the metric to edit or delete it. Click **Add Metric** to add another metric.

##### Add a metric

 1. Enter a [filter query](#filter-query-syntax). Only logs that match the specified filter query are processed. All logs, regardless of whether they match the filter query, are sent to the next step in the pipeline. **Note**: Since a single processor can generate multiple metrics, you can define a different filter query for each metric.
1. Enter a name for the metric.
1. **Define parameters** セクションで、メトリクスのタイプ (count、gauge、distribution) を選択します。[カウント メトリクスの例](#count-metric-example) と [ディストリビューション メトリクスの例](#distribution-metric-example) を参照してください。詳細は [メトリクスのタイプ](#metrics-types) も参照してください。
    - For gauge and distribution metric types, select a log field which has a numeric (or parseable numeric string) value that is used for the value of the generated metric.
    - For the distribution metric type, the log field's value can be an array of (parseable) numerics, which is used for the generated metric's sample set.
    - **Group by** フィールドでは、メトリクス値をどのようにグループ化するかを決定します。たとえば、4 つのリージョンに数百台のホストが分散している場合、リージョンでグループ化すると各リージョンごとに 1 本の線をグラフ化できます。**Group by** 設定で指定したフィールドは、構成されたメトリクスのタグとして設定されます。
1. Click **Add Metric**.

##### メトリクスタイプ

これらのタイプのメトリクスはログに対して生成できます。詳細は [メトリクスのタイプ][10033] と [ディストリビューション][10034] のドキュメントを参照してください。

| メトリクスタイプ  | 説明                                                                                                                                     | 例                                                                                             |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| COUNT        | Represents the total number of event occurrences in one time interval. This value can be reset to zero, but cannot be decreased.                | You want to count the number of logs with `status:error`.                                         |
| GAUGE        | Represents a snapshot of events in one time interval.                                                                                           | You want to measure the latest CPU utilization per host for all logs in the production environment. |
| DISTRIBUTION | Represent the global statistical distribution of a set of values calculated across your entire distributed infrastructure in one time interval. | You want to measure the average time it takes for an API call to be made.                           |

##### カウント メトリクスの例

`status:error` ログの例の場合:

```
{"status": "error", "env": "prod", "host": "ip-172-25-222-111.ec2.internal"}
```

`"status":"error"` を含むログの数をカウントし、それらを `env` と `host` でグループ化するカウント メトリクスを作成するには、次の情報を入力します:

| 入力パラメーター | 値               |
|------------------|---------------------|
| Filter query     | `@status:error`     |
| メトリクス名      | `status_error_total`|
| メトリクスタイプ      | カウント               |
| グループ化         | `env`, `prod`       |

##### ディストリビューション メトリクスの例

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
| Filter query           | `@method`               |
| メトリクス名            | `status_200_response`   |
| メトリクスタイプ            | Distribution            |
| ログ属性を選択 | `response_time_seconds` |
| グループ化               | `method`                |

[10031]: /ja/metrics/custom_metrics/
[10032]: /ja/account_management/billing/custom_metrics/
[10033]: /ja/metrics/types/
[10034]: /ja/metrics/distributions/
