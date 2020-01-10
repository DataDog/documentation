---
title: タグの使用方法
kind: documentation
aliases:
  - /ja/getting_started/tagging/using_tags/
further_reading:
  - link: /tagging
    tag: Documentation
    text: タグの概要
  - link: tagging/assigning_tags
    tag: Documentation
    text: タグの割り当て方法
---
[タグの割り当て][1]後に、Datadog プラットフォームでタグを使用してデータの絞り込みおよびグループ化を開始します。タグを使用して、データを含めたり除外したりできます。複数のタグを含めたり除外したりする場合:

* 含めるには `AND` ロジックを使用します
* 除外するには `OR` ロジックを使用します

## イベント

[イベントストリーム][2]は、指定された期間に環境内で発生したすべてのイベントを表示します。タグを使用して、イベント リストを絞り込み、イベントのサブセットに注目します。そのタグを持つホストまたは[インテグレーション][3]のすべてのイベントを表示するには、`tags:` に続けてタグを入力します。以下の例は、`tags:service:coffee-house` を使用してタグ `service:coffee-house` を検索します。複数のタグを検索するには、`tags:service:coffee-house,host:coffeehouseprod` のように各タグをカンマで区切ります。

{{< img src="tagging/using_tags/eventtags.png" alt="Events List and Tags"  style="width:80%;">}}

## ダッシュボード

{{< tabs >}}
{{% tab "Assignment" %}}

タグを使用し、メトリクスを絞り込んで[ダッシュボード グラフ][1]に表示するか、表示するメトリクスのグループを作成します。表示するメトリクスを絞り込むには、**from** テキストボックスにタグを入力します。これにより、この特定のタグ (この例では `service:coffee-house`) が割り当てられたすべてのソースについて、選択されたメトリクスが表示されます。

{{< img src="tagging/using_tags/dashboardtags_1.png" alt="Tags in Dashboards from textbox"  style="width:80%;">}}

タグを使用して集計されたグループを作成するには、**avg by** テキストボックスにタグのキー部分を入力します。たとえば、`service:coffee-house` のようにキー `service` でタグ付けされたメトリクスを表示する時系列グラフでは、**avg by** テキストボックスに `service` を入力すると、`service` のタグ値ごとに 1 つの行が表示されます。各行は、この `service` タグ値を共有するすべてのソースの平均のメトリクス値を表します。

{{< img src="tagging/using_tags/dashboardtags.png" alt="Tags in Dashboards avg by textbox"  style="width:80%;">}}

タグを使用して、ダッシュボードでイベントを重ねることもできます。これは、[イベントストリーム][2]と同じように機能します。
`tags:` に続けてタグを入力します。一致するイベントは、縦棒としてグラフに重なります。以下の例は、`tags:service:coffee-house` を使用します。

{{< img src="tagging/using_tags/dashboardeventtags.png" alt="Event Overlays in Dashboards"  style="width:80%;">}}

ダッシュボードのグラフの **from** タグの切り替え時間を短縮するには、[テンプレート変数][3]を使用します。以下の例では、`service` を使用して `service` タグキーを表します。テンプレート変数を使用するには、グラフ クエリの **from** テキストボックスに `$service` テンプレート変数を追加します。

{{< img src="tagging/using_tags/dashboardtemplatevariables.png" alt="Dashboard Template Variables"  style="width:80%;">}}


[1]: /ja/graphing/dashboards
[2]: /ja/graphing/event_stream
[3]: /ja/graphing/dashboards/template_variables
{{% /tab %}}
{{% tab "Examples" %}}

以下は、時系列チャートエディターを使用したタグの例です。最初のスクリーンショットでは、タグは適用されていません。すべてのホストでの平均 CPU 使用率が表示されます。

{{< img src="tagging/using_tags/Tags_1.png" alt="Tags_1"  style="width:75%;">}}

次に、タグ (`region:eastus`) を **from** テキストボックスに含めるようにエディターを更新します。これにより、Datadog は米国東部リージョンでの CPU 使用率を参照できます。この例では `region` タグを使用しますが、`application`、`service`、`environment` など、Datadog プラットフォームに送信された任意のタグを使用できます。

{{< img src="tagging/using_tags/Tags_2.png" alt="Tags_2"  style="width:75%;">}}

最後に、2 番目の空フィールド (**avg by** テキストボックス) を使用して、各 `host` の個別の時系列線を表示します。米国東部リージョンで実行されている個別のホストのサーバー CPU が表示されます。

{{< img src="tagging/using_tags/Tags_3.png" alt="Tags_3"  style="width:75%;">}}

必要に応じて、タグを追加して範囲をさらに絞り込みます。たとえば、`region:eastus` や `env:production` のホストなどです。タグは Datadog 全体で使用でき、すべてのコア要素 (メトリクス、トレース、ログ) に適用されます。

{{% /tab %}}
{{< /tabs >}}

## インフラストラクチャー

[Host Map][4]、[インフラストラクチャー リスト][5]、[コンテナ][6]、[プロセス][7]を絞り込むには、ページ上部にある **Filter by** テキストボックスにタグを入力します。ホストとコンテナは、**Group by** テキストボックスを使用してタグキーでグループ化できます。グループ ボックスに `service` を入力すると、各サービスがグループ見出しになります。

{{< tabs >}}
{{% tab "Host Map" %}}

このセクションでは、タグを使用してホストを絞り込みまたはグループ化します。

{{< img src="tagging/using_tags/hostmaptags.png" alt="Host Map Tags"  style="width:80%;">}}

または、コンテナを絞り込みまたはグループ化することもできます。

{{< img src="tagging/using_tags/containermaptags.png" alt="Container Map Tags"  style="width:80%;">}}
{{% /tab %}}

{{% tab "Infrastructure List" %}}

以下は、インフラストラクチャーリストのページのテキストボックスによる絞り込みまたはグループ化です。

{{< img src="tagging/using_tags/infrastructuretags.png" alt="Tags in the Infrastructure List"  style="width:80%;">}}
{{% /tab %}}

{{% tab "Containers" %}}

以下は、ライブコンテナのページのテキストボックスによる絞り込みまたはグループ化です。

{{< img src="tagging/using_tags/livecontainertags.png" alt="Live Container Tags"  style="width:80%;">}}
{{% /tab %}}

{{% tab "Processes" %}}

以下は、ライブプロセスのページのテキストボックスによる絞り込みまたはグループ化です。

{{< img src="tagging/using_tags/liveprocessestags.png" alt="Live Process Tags"  style="width:80%;">}}
{{% /tab %}}
{{< /tabs >}}

## モニター

{{< tabs >}}
{{% tab "Manage Monitors" %}}

[割り当てられたタグ][1]によってモニターを絞り込むには、検索バーかファセットのチェックボックスを使用します。検索バーの形式は `tag:<KEY>:<VALUE>` で、`tag:service:coffee-house` などです。**注**: モニター タグは、メトリクス タグとは別のもので、独立しています。

{{< img src="tagging/using_tags/managemonitorstags.png" alt="Manage Monitors Tags"  style="width:80%;">}}


[1]: /ja/tagging/assigning_tags
{{% /tab %}}

{{% tab "New Monitor" %}}

[モニター][1]を作成する場合は、以下の場所でメトリクス タグを使用します。

* これらのタグがあるメトリクスのみにモニター範囲を制限する **from** テキストボックス。

* 対応するメトリクスをモニター範囲から削除する **excluding** テキストボックス。

* モニターを各タグ値で複数警告モニターに変換する **avg by** テキストボックス。

{{< img src="tagging/using_tags/newmonitortags.png" alt="New Monitor Tags"  style="width:80%;">}}


[1]: /ja/monitors/monitor_types
{{% /tab %}}
{{% tab "Manage Downtime" %}}

モニター タグ別に[ダウンタイム][1]を絞り込むには、検索バーに `service:coffee-house` などのタグ名を入力します。

{{< img src="tagging/using_tags/managedowntimetags.png" alt="Manage Monitors Tags"  style="width:80%;">}}


[1]: /ja/monitors/downtimes
{{% /tab %}}
{{< /tabs >}}

## メトリクス

[Metrics Explorer][8] でタグを使用して、複数のタグでメトリクスを絞り込むか、タグ キー別に複数のグラフを表示します。以下の例は、`service:coffee-house` のメトリクスのグラフを作成し、`host` ごとに 1 つのグラフを表示します。

{{< img src="tagging/using_tags/metricsexplorertags.png" alt="Manage Monitors Tags"  style="width:80%;">}}

## インテグレーション

[AWS][9]、[Google Cloud][10]、[Azure][11] などの一部のインテグレーションでは、オプションでタグを使用してメトリクスを制限できます。専用のインテグレーション タイルで、`<KEY>:<VALUE>` の形式でタグのカンマ区切りのリストを使用します。

{{< img src="tagging/using_tags/integrationtags.png" alt="Optionally limit metrics collection"  style="width:80%;">}}

メトリクスを収集するときに使用されるフィルターを定義します。`?` (1 文字の場合) や `*` (複数文字の場合) などのワイルドカードも使用できます。定義されたタグのいずれかに一致するホストのみが Datadog にインポートされます。それ以外は無視されます。タグの前に `!` を追加することで、指定されたタグに一致するホストを除外することもできます。

例: `datadog:monitored,env:production,instance-type:c1.*,!region:us-east-1`

## APM

{{< tabs >}}
{{% tab "App Analytics" %}}

[トレース検索][1]では、検索バーまたはファセットのチェックボックスを使用して、タグでトレースを絞り込みます。検索バーの形式は `<KEY>:<VALUE>` で、`service:coffee-house` などです。高度な検索については、[トレース検索][2]のページを参照してください。

{{< img src="tagging/using_tags/tracesearchtags.png" alt="Trace Search Tags"  style="width:80%;">}}


[1]: /ja/tracing/search/
[2]: /ja/tracing/search/#search-bar
{{% /tab %}}
{{% tab "Service Map" %}}

[タグの割り当て][1]後、サービスマップを使用して、特定のサービスをクリックしてアプリケーションのそれぞれの領域にジャンプできます。以下の例では、タグ `service:coffee-house` で絞り込んで[トレース検索と分析][2]、[モニター][3]、[ログ][4]、[Host Map][5]を表示します。

{{< img src="tagging/using_tags/servicemaptags.png" alt="Service Map Tags"  style="width:80%;">}}


[1]: /ja/tagging/assigning_tags
[2]: /ja/tracing/search/
[3]: /ja/monitors/manage_monitor
[4]: /ja/logs/explorer/search
[5]: /ja/graphing/infrastructure/hostmap
{{% /tab %}}

{{< /tabs >}}

## ノートブック

[ノートブック][12]グラフを作成するときに、**from** テキストボックスでタグを使用してメトリクスを制限します。さらに、**avg by** テキストボックスでタグを使用してメトリクスをグループ化します。以下の例では、メトリクスは `service:coffee-house` に制限され、`host` でグループ化されます。

{{< img src="tagging/using_tags/notebooktags.png" alt="Notebook Tags"  style="width:80%;">}}

タグを除外するには、`</>` を使用してテキストを編集して、`!<KEY>:<VALUE>` の形式でタグを追加します。以下の例では、`!service:coffeehouse` を使用して `service:coffeehouse` を除外します。

{{< img src="tagging/using_tags/notebooktagsexclude.gif" alt="Notebook Exclude Tags"  style="width:80%;">}}

## ログ

ログ[検索][13]、[分析][14]、[パターン][15]、[Live Tail][16]は、検索バーまたはファセットのチェックボックスを使用してタグ ログを絞り込みます。検索バーの形式は `<KEY>:<VALUE>` で、`service:coffee-house` などです。高度な検索については、[ログ検索][13]のページを参照してください。

{{< tabs >}}
{{% tab "Search" %}}

{{< img src="tagging/using_tags/logsearchtags.png" alt="Log Search Tags"  style="width:80%;">}}

{{% /tab %}}
{{% tab "Analytics" %}}

{{< img src="tagging/using_tags/loganalyticstags.png" alt="Log Analytics Tabs"  style="width:80%;">}}

{{% /tab %}}
{{% tab "Patterns" %}}

{{< img src="tagging/using_tags/logpatternstags.png" alt="Log Patterns Tags"  style="width:80%;">}}

{{% /tab %}}
{{% tab "Live Tail" %}}

{{< img src="tagging/using_tags/livetailtags.gif" alt="Live Tail Tags"  style="width:80%;">}}

{{% /tab %}}
{{< /tabs >}}

さらに、タグを使用してログ [パイプライン][17]を絞り込みます。以下の例では、パイプラインはタグ `service:coffee-house` でログを絞り込みます。

{{< img src="tagging/using_tags/logpipelinetags.png" alt="Pipeline Tags"  style="width:80%;">}}

## 開発者

[API][18] では、タグはさまざまな方法で使用できます。これらのセクションへのリンクは、以下のリストを参照してください。

- [モニターのダウンタイムのスケジューリング][19]
- [イベントストリームのクエリ][20]
- [ホストの検索][21]
- [AWS][22] と [Google Cloud][23] の[インテグレーション][24]
- [時系列ポイントのクエリ][25]
- [すべてのモニターの詳細を取得][26]
- [モニターのミュート][27]
- [検索のモニター][28]
- [グループ検索のモニター][29]
- [スクリーン ダッシュボードの作成][30]
- [タイムボードの作成][31]

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tagging/assigning_tags
[2]: /ja/graphing/event_stream
[3]: /ja/integrations
[4]: /ja/graphing/infrastructure/hostmap
[5]: /ja/graphing/infrastructure
[6]: /ja/graphing/infrastructure/livecontainers
[7]: /ja/graphing/infrastructure/process
[8]: /ja/graphing/metrics/explorer
[9]: /ja/integrations/amazon_web_services
[10]: /ja/integrations/google_cloud_platform
[11]: /ja/integrations/azure
[12]: /ja/graphing/notebooks
[13]: /ja/logs/explorer/search
[14]: /ja/logs/explorer/analytics
[15]: /ja/logs/explorer/patterns
[16]: /ja/logs/live_tail
[17]: /ja/logs/processing/pipelines
[18]: /ja/api
[19]: /ja/api/?lang=python#schedule-monitor-downtime
[20]: /ja/api/?lang=python#query-the-event-stream
[21]: /ja/api/?lang=python#search-hosts
[22]: /ja/api/?lang=python#aws
[23]: /ja/api/?lang=python#google-cloud-platform
[24]: /ja/api/?lang=python#integrations
[25]: /ja/api/?lang=python#query-timeseries-points
[26]: /ja/api/?lang=python#get-all-monitor-details
[27]: /ja/api/?lang=python#mute-a-monitor
[28]: /ja/api/?lang=python#monitors-search
[29]: /ja/api/?lang=python#monitors-group-search
[30]: /ja/api/?lang=python#create-a-screenboard
[31]: /ja/api/?lang=python#create-a-dashboard
