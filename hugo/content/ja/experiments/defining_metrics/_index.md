---
aliases:
- /ja/product_analytics/experimentation/defining_metrics/
description: 実験で測定したいメトリクスを作成します。
further_reading:
- link: https://www.datadoghq.com/blog/datadog-product-analytics/
  tag: ブログ
  text: Product Analytics を活用してデータドリブンな設計の意思決定を行う
- link: https://www.datadoghq.com/blog/how-we-built-datadog-experiments/
  tag: ブログ
  text: Datadog Experiments の構築方法
title: 実験メトリクスを作成する
---
## 概要 {#overview}

実験で測定したいメトリクスを作成します。Real User Monitoring (RUM)、Product Analytics、または独自のウェアハウスのデータを使用して、Datadog Experiments のメトリクスを作成できます。

<div class="alert alert-info">組織でカスタムロールを使用している場合は、実験メトリクスを作成するために適切な <a href="https://docs.datadoghq.com/account_management/rbac/permissions/#product-analytics">Product Analytics 権限</a>が必要です。</div>

## メトリクスを作成する {#create-a-metric}

データソースを選択:

{{< tabs >}}
{{% tab "Product Analytics または RUM" %}}

### 前提条件 {#prerequisites}

Product Analytics または RUM データからメトリクスを作成するには、アプリケーションに Datadog の [クライアントサイド SDK][3] がインストールされており、データがアクティブにキャプチャされている必要があります。SDK をまだ構成していない場合は、アプリケーションタイプを選択して開始します。

- [Android および Android TV][4]
- [iOS と tvOS][5]
- [Browser (JavaScript)][6]
- [React Native][7]

Product Analytics は、Real User Monitoring (RUM) と同じ SDK および構成を使用します。RUM のセットアップドキュメントを使用して SDK を構成した後、Product Analytics UI でメトリクスを作成します。

### Product Analytics または RUM データを使用してメトリクスを作成する {#create-a-metric-using-product-analytics-or-rum-data}

実験用のメトリクスを作成するには、以下の手順を実行します。

1. Datadog Product Analytics の [メトリクスページ][1] に移動します。
1. {{< ui >}}Metrics{{< /ui >}} タブを選択し、右上隅の {{< ui >}}Create Metric{{< /ui >}} をクリックします。
1. {{< ui >}}Metric name{{< /ui >}} を追加し、必要に応じて {{< ui >}}Description{{< /ui >}} を追加します。
1. {{< ui >}}Metric definition{{< /ui >}} セクションで、{{< ui >}}Select an event{{< /ui >}} をクリックしてイベントピッカーを開きます。右側のチャートは、メトリクスを構成するとリアルタイムで更新されます。
   1. 特定のイベントを検索するか、{{< ui >}}By Type{{< /ui >}} フィルターを使用してイベントタイプ別に参照します。
1. ドロップダウンから[集計方法](#aggregation-methods)を選択します。デフォルトは {{< ui >}}Count of events{{< /ui >}} です。
1. {{< ui >}}Add Filter{{< /ui >}} をクリックして、追加のプロパティで[メトリクスをフィルタリング](#add-filters)します。
1. (オプション) {{< ui >}}Additional settings{{< /ui >}} セクションで、以下を行います。
   1. このメトリクスが重要な意思決定のために承認されていることを示すには、{{< ui >}}Mark as certified{{< /ui >}} をオンにします。これには、Product Analytics 認定メトリクス書き込み権限が必要です。
   1. 必要に応じて [{{< ui >}}Experiment settings{{< /ui >}}](#advanced-options) および {{< ui >}}Units{{< /ui >}} を調整します。デフォルト設定は、ほとんどのユースケースに対応しています。
1. {{< ui >}}Save{{< /ui >}} をクリックします。

{{< img src="/product_analytics/experiment/exp_create_new_metric.png" alt="メトリクス名が「メトリクスの例」に設定され、「カートへ追加をクリック」イベントが選択され、集計方法のドロップダウンがイベント数に設定され、追加設定セクションがあり、右側に棒グラフのプレビューが表示され、保存ボタンが強調表示されている、メトリクスの作成ページ。" style="width:90%;" >}}

[1]: https://app.datadoghq.com/product-analytics/experimentation-metrics
[3]: /ja/real_user_monitoring/#get-started
[4]: /ja/real_user_monitoring/application_monitoring/android/setup/?tab=kotlin
[5]: /ja/real_user_monitoring/application_monitoring/ios/setup/?tab=swift-package-manager--spm
[6]: /ja/real_user_monitoring/application_monitoring/browser/setup/client/?tab=npm
[7]: /ja/real_user_monitoring/application_monitoring/react_native/setup/?platform=react_native

### フィルターを追加する {#add-filters}

サービス、国、デバイスタイプなどの {{< ui >}}Event properties{{< /ui >}} フィルターを選択して、メトリクスをフィルタリングできます。{{< ui >}}By Data Type{{< /ui >}} フィルターを使用して、利用可能なプロパティのリストをタイプ (文字列やブール値など) で絞り込みます。

必要なプロパティが表示されない場合は、{{< ui >}}Custom property{{< /ui >}} フィールドにプロパティ名 (例: `@context.tracking`) を入力し、{{< ui >}}Add{{< /ui >}} をクリックします。

{{< img src="/product_analytics/experiment/exp_filter_by_2.png" alt="メトリクス定義セクション内にフィルターパネルが開いている。選択されたすべてのプロパティ、中央にはアプリケーション ID、サービス、ブラウザ名、国などのイベントプロパティ、左側には数値、文字列、ブール値のオプションがあるデータタイプフィルター、下部にはプレースホルダー「例: @context.tracking」と表示されるテキストフィールドと追加ボタンがあるカスタムプロパティセクションが表示されている。" style="width:90%;" >}}

{{% /tab %}}
{{% tab "ウェアハウス" %}}

### 前提条件 {#prerequisites-1}

ウェアハウスデータからメトリクスを作成するには、[ウェアハウスを Datadog に接続][8] する必要があります。Datadog は、BigQuery、Databricks、Redshift、Snowflake をサポートしています。

ウェアハウスを接続した後、SQL モデルを作成してデータを Datadog にマッピングし、そのモデルを使用してメトリクスを作成します。

### SQL モデルを作成する {#create-a-sql-model}

SQL クエリを書き込んでデータを定義およびプレビューし、モデルを構成してデータを Datadog にマッピングします。

#### SQL を書き込む {#write-your-sql}

まず、クエリを書き込んでデータを取得します。

1. Datadog Product Analytics の [メトリクスページ][1] に移動します。
1. {{< ui >}}Metric SQL Models{{< /ui >}} タブを選択し、{{< ui >}}Create SQL Model{{< /ui >}} をクリックします。
1. {{< ui >}}Write SQL{{< /ui >}} セクションで、目的のデータを返す SQL クエリを入力します。SQL エディターは `SELECT * FROM` およびより高度な SQL ステートメントをサポートしています。
1. {{< ui >}}Run{{< /ui >}} をクリックしてデータをプレビューします。

{{< img src="/product_analytics/experiment/exp_create_metric_sql_models_writesql_1.png" alt="メトリクス SQL モデルを作成するページの SQL 書き込みセクション。収益注文テーブルから user_id、revenue_timestamp、および amount を取得する SELECT クエリが表示され、その下に USER_ID、REVENUE_TIMESTAMP、および AMOUNT 列を表示するクエリのプレビューが成功例として表示されている。" style="width:80%;" >}}

大規模なテーブルの場合は、[SQL テンプレート変数][13] を使用して Datadog の日付フィルターをクエリにプッシュし、実行ごとにデータウェアハウスがスキャンするデータ量を削減します。

#### ウェアハウスデータを Datadog にマッピングする {#map-your-warehouse-data-to-datadog}

データをプレビューした後、それを Datadog にマッピングします。{{< ui >}}Structure your model{{< /ui >}} セクションで以下を行います。

1. {{< ui >}}Metric SQL Model Name{{< /ui >}} を追加します (例: **Revenue Orders**)。
1. (オプション) この SQL モデルが重要な意思決定のために承認されていることを示すには、{{< ui >}}Mark as certified{{< /ui >}} をオンにします。これには、Product Analytics 認定メトリクス書き込み権限が必要です。
1. ウェアハウステーブルの列を以下にマッピングします。
   - {{< ui >}}Timestamp column{{< /ui >}}
     - メトリクスイベントに関連付けられたタイムスタンプをリストする列。
     - 分析には、対象が実験に登録された後に作成された行のみが含まれます。
   - {{< ui >}}Subject Type{{< /ui >}}
     - Datadog が実験グループをランダムに割り当てるために使用する属性。
     - [Subject Types][12] ページで、サブジェクトタイプとそのデフォルトのウェアハウス列を定義できます。たとえば、個々のユーザーには `user_id` を、組織アカウントには `org_id` を使用できます。
   - {{< ui >}}Measures{{< /ui >}} (オプション)
     - Datadog がメトリクスに集計できるウェアハウステーブルの数値列 (例: `revenue` または `amount` 列)。
     - 各 SQL モデルには、{{< ui >}}each record{{< /ui >}} メジャーが自動的に含まれます。このメジャーを使用して、特定の実験サブジェクトについてテーブル内の関連する行数をカウントします。
1. {{< ui >}}Create Metric SQL Model{{< /ui >}} をクリックして SQL モデルを保存します。

{{< img src="/product_analytics/experiment/exp_create_metrics_sql_model_structure4.png" alt="モデルの構造パネル。メトリクス SQL モデル名フィールドが「収益注文」に設定されて強調表示され、認定済みトグルとしてマークされ、タイムスタンプ列が REVENUE_TIMESTAMP に設定され、対象タイプがユーザー (@usr.id) に設定されて列セレクターで USER_ID が選択され、メジャードロップダウンに「収益注文 (各レコード)」が表示され、メトリクス SQL モデルの作成ボタンが強調表示されている。" style="width:80%;" >}}

### SQL モデルを使用してメトリクスを作成する {#create-a-metric-using-your-sql-model}

SQL モデルを作成したら、それを使用してメトリクスを作成します。

1. Datadog Product Analytics の [メトリクスページ][1] に移動します。
1. {{< ui >}}Metrics{{< /ui >}} タブを選択し、右上隅の {{< ui >}}Create Metric{{< /ui >}} をクリックします。
1. {{< ui >}}Metric name{{< /ui >}} を追加し、必要に応じて {{< ui >}}Description{{< /ui >}} を追加します。
1. {{< ui >}}Metric definition{{< /ui >}} セクションで、{{< ui >}}Select an event{{< /ui >}} をクリックしてイベントピッカーを開きます。右側のチャートは、メトリクスを構成するとリアルタイムで更新されます。
   1. 関連する SQL モデルを選択します。SQL モデルはそれぞれのソースの下に表示されます (例: **Snowflake** の下の **Revenue Orders**)。
1. ドロップダウンから[集計方法](#aggregation-methods)を選択します。
1. (オプション) {{< ui >}}Additional settings{{< /ui >}} セクションで、以下を行います。
   1. このメトリクスが重要な意思決定のために承認されていることを示すには、{{< ui >}}Mark as certified{{< /ui >}} をオンにします。これには、Product Analytics 認定メトリクス書き込み権限が必要です。
   1. 必要に応じて [{{< ui >}}Experiment settings{{< /ui >}}](#advanced-options) および {{< ui >}}Units{{< /ui >}} を調整します。デフォルト設定は、ほとんどのユースケースに対応しています。
1. {{< ui >}}Save{{< /ui >}} をクリックします。

{{< img src="/product_analytics/experiment/exp_create_metric_from_sqlmodel_2.png" alt="メトリクスの作成イベントピッカー。すべてのイベントが選択されており、左側には Snowflake、アクション、ビュー、セッション、エラー、ロングタスクなどのイベントタイプ、右側には Snowflake の下に収益注文 SQL モデルがハイライト表示されている。メジャー: amount とフィルタリング可能なディメンション: N/A が表示されている。" style="width:80%;" >}}

[1]: https://app.datadoghq.com/product-analytics/experimentation-metrics
[8]: /ja/experiments/guide/connecting_a_data_warehouse/
[12]: https://app.datadoghq.com/product-analytics/experiments/settings/subject-types
[13]: /ja/experiments/concepts/sql_template_variables/

{{% /tab %}}
{{< /tabs >}}

## 集計方法 {#aggregation-methods}

集計方法は、Datadog が各実験対象のデータをどのように要約するかを決定します。実験対象とは、Datadog が実験のためにランダム化する単位です。通常これはユーザーですが、実験の設定方法によっては、組織、Cookie、またはデバイスになる場合もあります。

Datadog Experiments は、以下の集計方法をサポートしています。

- {{< ui >}}Count of events{{< /ui >}} (デフォルト)
- {{< ui >}}Count of unique users{{< /ui >}} (コンバージョンメトリクスに有用)
- {{< ui >}}Sum of{{< /ui >}}イベントプロパティ (収益メトリクスに有用)
- {{< ui >}}Distinct values of{{< /ui >}}イベントプロパティ (ユニークページビューメトリクスに有用)
- イベントプロパティの {{< ui >}}Percentile{{< /ui >}} (レイテンシーメトリクスに有用)
- {{< ui >}}Average of{{< /ui >}}イベントプロパティ (満足度メトリクスに有用)

{{< img src="/product_analytics/experiment/exp_default_metric_agg_1.png" alt="集計方法のドロップダウン。上部にユニークユーザー数 (選択済み) とイベント数が表示され、その後にメジャーを選択セクションが続き、合計、個別の値、パーセンタイル、平均のオプションがあり、右側に「イベントを実行したユーザー数」という説明が表示されている。" style="width:90%;" >}}

Datadog は、各実験対象のメトリクスを計算します。たとえば、ユーザーごとにランダム化された実験における {{< ui >}}Count of events{{< /ui >}} メトリクスは、バリアント (実験グループ) 内の全ユーザーのイベント総数をそのバリアント内のユーザー数で割って計算します。

### 比率メトリクス {#ratio-metrics}

{{< ui >}}Create Ratio{{< /ui >}} をクリックすると、デフォルトの実験対象数以外の値でメトリクスを割ることができます。分母にはいずれかの[集計方法](#aggregation-methods)を使用できます。たとえば、購入数を製品ページビュー数で割ることで、登録ユーザー全体ではなくファネルの特定のステップにおけるコンバージョンを測定できます。

Datadog は、[デルタ法][2] を使用して分子と分母の間の相関関係を考慮します。

{{< img src="/product_analytics/experiment/exp_create_ratio_new_ui.png" alt="メトリクス定義セクション。「カートに追加をクリック」イベントとイベント数の集計、フィルター追加オプション、その下に強調表示された比率作成ボタン、および認定済みとグルとしてマーク、実験設定、単位を含む、追加設定セクションが表示されている。" style="width:90%;" >}}

## 高度なオプション {#advanced-options}

Datadog Experiments は、以下の高度なオプションをサポートしています。これらはメトリクスを作成する際に、{{< ui >}}Additional settings{{< /ui >}} > {{< ui >}}Experiment settings{{< /ui >}} で変更できます。

期間フィルター
: デフォルトでは、Datadog はユーザーの最初の接触から実験終了までのすべてのイベントを含めます。この設定を使用して、「7 日以内のセッション」のような期間制限のある値を測定します。期間フィルターを追加すると、メトリクスには、実験が最初にユーザーを登録した時点から始まる、指定された期間内のイベントのみが含まれます。

希望するメトリクスの方向
: Datadog は、統計的に有意な結果を強調表示します。この設定を使用して、このメトリクスを増加させるか減少させるかを指定します。

外れ値の処理
: 実際のデータには、実験結果に影響を与える可能性のある極端な外れ値が含まれることがよくあります。この設定を使用して、Datadog がデータを切り捨てるしきい値を設定します。たとえば、99% の上限を設定して、メトリクスの 99 パーセンタイルですべての結果を切り捨てます。

## 参考資料 {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[2]: https://en.wikipedia.org/wiki/Delta_method