---
aliases:
- /ja/tagging/using_tags/
description: Datadog 製品でのタグの使用方法について説明します。
further_reading:
- link: https://www.datadoghq.com/blog/tagging-best-practices/
  tag: ブログ
  text: インフラストラクチャーとアプリケーションにタグを付けるためのベストプラクティス
- link: /getting_started/tagging/
  tag: Documentation
  text: タグの概要
- link: /getting_started/tagging/assigning_tags/
  tag: ドキュメント
  text: タグの割り当て方法
title: タグの使用方法
---

## 概要

[タグの割り当て][1]後に、Datadog プラットフォームでタグを使用してデータの絞り込みおよびグループ化を開始します。タグを使用して、データを含めたり除外したりできます。

複数のタグを含めたり除外したりする場合:

* 含めるには `AND` ロジックを使用します
* 除外するには `OR` ロジックを使用します

## イベント

[イベントエクスプローラー][2]は、指定された期間の環境からのイベントを表示します。タグを使用して、イベントリストをフィルターし、イベントのサブセットに焦点を当てることができます。`tags:` の後にタグを入力すると、そのタグを持つホスト、[インテグレーション][3]、またはサービスからのすべてのイベントを見ることができます。例えば、`service:coffee-house` というタグを検索するには、`tags:service:coffee-house` を使用します。

複数のタグを包括的に検索する場合は、括弧を使用し、各タグを OR で区切ってください: `tags:(service:coffee-house OR host:coffeehouseprod)`。複数のタグを排他的に検索するには、各タグを AND で区切ってください: `tags:(service:coffee-house AND host:coffeehouseprod)`。

## ダッシュボード  

{{< tabs >}}
{{% tab "Assignment" %}}

タグを使用し、メトリクスを絞り込んで[ダッシュボード グラフ][1]に表示するか、表示するメトリクスのグループを作成します。表示するメトリクスを絞り込むには、**from** テキストボックスにタグを入力します。こうすることで、選択したメトリクスに、この特定のタグ (この例では `service:coffee-house`) が割り当てられたすべてのソースが表示されます。

{{< img src="tagging/using_tags/dashboardtags_1.png" alt="ダッシュボードの from テキストボックスに入力されたタグ" style="width:80%;">}}

高度なタグ値のフィルタリングはブールフィルターでも使用できます。次のブール構文がサポートされます。

* `NOT`, `!`
* `AND`, `,`
* `OR`
* `key IN (tag_value1, tag_value2,...)`
* `key NOT IN (tag_value1, tag_value2,...)`

`AND`、`OR` を使用して、特定のタグ全体のメトリクスを確認します。

{{< img src="tagging/using_tags/dashboard_boolean_1.png" alt="AND/OR を使用したブールフィルター" style="width:80%;">}}

`IN`、`NOT IN` を使用して、メトリクスを特定のタグにフィルタリングします。

{{< img src="tagging/using_tags/dashboards_boolean_2.png" alt="IN/NOT IN によるブールフィルター" style="width:80%;">}}

タグを使用して集計されたグループを作成するには、**avg by** テキストボックスにタグのキー部分を入力します。たとえば、`service:coffee-house` のようにキー `service` でタグ付けされたメトリクスを表示する時系列グラフでは、**avg by** テキストボックスに `service` を入力すると、`service` のタグ値ごとに 1 つの行が表示されます。各行は、この `service` タグ値を共有するすべてのソースの平均のメトリクス値を表します。

{{< img src="tagging/using_tags/dashboardtags.png" alt="ダッシュボードの avg by テキストボックスに入力されたタグ" style="width:80%;">}}

タグを使用して、ダッシュボードでイベントを重ねることもできます。これは、[イベントエクスプローラー][2]と同じように機能します。
`tags:` に続けてタグを入力します。一致するイベントは、縦棒としてグラフに重なります。以下の例は、`tags:service:coffee-house` を使用します。

{{< img src="tagging/using_tags/dashboardeventtags.png" alt="ダッシュボードでのイベントオーバーレイ" style="width:80%;">}}

ダッシュボードのグラフの **from** タグの切り替え時間を短縮するには、[テンプレート変数][3]を使用します。以下の例では、`service` を使用して `service` タグキーを表します。テンプレート変数を使用するには、グラフ クエリの **from** テキストボックスに `$service` テンプレート変数を追加します。

{{< img src="tagging/using_tags/dashboardtemplatevariables.png" alt="ダッシュボードテンプレート変数" style="width:80%;">}}

[1]: /ja/dashboards/
[2]: /ja/events/
[3]: /ja/dashboards/template_variables/
{{% /tab %}}
{{% tab "Examples" %}}

以下は、時系列チャートエディターを使用したタグの例です。最初のスクリーンショットでは、タグは適用されていません。すべてのホストでの平均 CPU 使用率が表示されます。

{{< img src="tagging/using_tags/Tags_1.png" alt="Tags_1" style="width:75%;">}}

次に、タグ (`region:eastus`) を **from** テキストボックスに含めるようにエディターを更新します。これにより、Datadog は米国東部リージョンでの CPU 使用率を参照できます。この例では `region` タグを使用しますが、`application`、`service`、`environment` など、Datadog プラットフォームに送信された任意のタグを使用できます。

{{< img src="tagging/using_tags/Tags_2.png" alt="Tags_2" style="width:75%;">}}

最後に、2 番目の空フィールド (**avg by** テキストボックス) を使用して、各 `host` の個別の時系列線を表示します。米国東部リージョンで実行されている個別のホストのサーバー CPU が表示されます。

{{< img src="tagging/using_tags/Tags_3.png" alt="Tags_3" style="width:75%;">}}

必要に応じて、タグを追加して範囲をさらに絞り込みます。たとえば、`region:eastus` や `env:production` のホストなどです。タグは Datadog 全体で使用でき、すべてのコア要素 (メトリクス、トレース、ログ) に適用されます。

{{% /tab %}}
{{< /tabs >}}

## インフラストラクチャー

[ホストマップ][4]、[インフラストラクチャーリスト][5]、[コンテナ][6]、[処理][7]を絞り込むには、ページ上部にある **Filter by** テキストボックスにタグを入力します。ホストとコンテナは **Group by** テキストボックスを使い、タグキーでグループ化できます。グループボックスに `service` と入力すると、各サービスがグループの見出しとして表示されます。

{{< tabs >}}
{{% tab "Host Map" %}}

このセクションでは、タグを使用してホストを絞り込みまたはグループ化します。

{{< img src="tagging/using_tags/hostmaptags.png" alt="ホストマップタグ" style="width:80%;">}}

または、コンテナを絞り込みまたはグループ化することもできます。

{{< img src="tagging/using_tags/containermaptags.png" alt="コンテナマップタグ" style="width:80%;">}}
{{% /tab %}}

{{% tab "Infrastructure List" %}}

以下は、インフラストラクチャーリストページのテキストボックスによる絞り込みまたはグループ化です。

{{< img src="tagging/using_tags/infrastructuretags.png" alt="インフラストラクチャーリストにあるタグ" style="width:80%;">}}
{{% /tab %}}

{{% tab "Containers" %}}

以下は、ライブコンテナページのテキストボックスによる絞り込みまたはグループ化です。

{{< img src="tagging/using_tags/livecontainertags.png" alt="ライブコンテナタグ" style="width:80%;">}}
{{% /tab %}}

{{% tab "Processes" %}}

以下は、ライブプロセスページのテキストボックスによる絞り込みまたはグループ化です。

{{< img src="tagging/using_tags/liveprocessestags.png" alt="ライブプロセスタグ" style="width:80%;">}}
{{% /tab %}}
{{< /tabs >}}

## アラート設定

[割り当てられたタグ][32]によってモニターや[モニターのダウンタイム][31]を絞り込むには、検索バーかファセットのチェックボックスを使用します。検索バーの形式は `tag:<キー>:<値>` で、`tag:service:coffee-house` などです。特定のタグを持つモニターを検索から除外するには、 `-` を使用して、`tag:-service:coffee-house` とします。

{{< img src="/tagging/using_tags/manage_monitor_tags.png" alt="検索バーのモニターをタグでフィルター" style="width:80%;">}}

**注**: モニタータグは、メトリクスタグとは異なり、独立しています。詳しくは、[モニタータグ][30]のドキュメントをご覧ください。

新しいモニターを作成する場合は、以下の場所で*メトリクス タグ*を使用します。
* これらのタグがあるメトリクスのみにモニター範囲を制限する **from** テキストボックス。
* 対応するメトリクスをモニター範囲から削除する **excluding** テキストボックス。
* 各タグ値に対するマルチアラートモニターに変換する **avg by** テキストボックス。

## メトリクス

[Metrics Explorer][8] でタグを使用して、複数のタグでメトリクスを絞り込むか、タグ キー別に複数のグラフを表示します。以下の例は、`service:web-store` のメトリクスのグラフを作成します。

{{< img src="tagging/using_tags/metrics_explorer.png" alt="個々のタグにスコープされたメトリクスグラフ" style="width:80%;">}}

## インテグレーション

一部のインテグレーションでは、オプションでタグを使用してメトリクスを制限できます。

{{< tabs >}}
{{% tab "AWS" %}}

The [AWS インテグレーションタイル][1] には、`to hosts with tag` と `to Lambdas with tag` という 2 つのタグフィルターがあります。

これらのフィールドでは、EC2 や Lambda リソースの収集に使うフィルターを定義する、コンマで区切られたタグのリスト（`<KEY>:<VALUE>` 形式）が使用できます。`<KEY>:<VALUE>` はタグに基づく監視に応じて関数を含めたり除外したりできます。タグを除外するように指定するには、タグキーの前に `!` を入力します。`?` （1 文字の場合）や `*` （複数文字の場合）のようなワイルドカードも使用できます。

フィルターには、`OR` ステートメントを使用して包含タグが存在するリソースが含まれます。以下のフィルター例は、`datadog:monitored` または `env:production` タグを含む EC2 インスタンスを収集します。

```text
datadog:monitored,env:production
```

除外タグを指定すると、それが優先され `AND` ステートメントとなります。以下のフィルター例では、`datadog:monitored` または `env:production` または `c1.*` 値を持つ `instance-type` タグで `region:us-east-1` タグではないタグを含む EC2 インスタンスを収集します。

```text
datadog:monitored,env:production,instance-type:c1.*,!region:us-east-1
```

AWS のタグ付けに関する詳細は、[EC2][2] および [Lambda][3] ドキュメントを参照してください。

[1]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[2]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html
[3]: https://docs.aws.amazon.com/lambda/latest/dg/tagging.html
{{% /tab %}}
{{% tab "Azure" %}}

[Azure インテグレーションタイル][1] には、`Optionally filter to VMs with tag` というタグフィルターがあります。

このフィールドでは、Azure VM からメトリクスを収集する際に使用されるフィルターを定義する、カンマ区切りのタグのリスト（`<KEY>:<VALUE>` 形式）を受け付けます。`?` (1 文字の場合) や `*` (複数文字の場合) などのワイルドカードも使用できます。定義されたタグのいずれかに一致する VM だけが Datadog にインポートされ、それ以外は無視されます。

特定のタグと一致する VM は、タグの前に `!` を加えることで除外することもできます。たとえば、

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

[1]: https://app.datadoghq.com/account/settings#integrations/azure
{{% /tab %}}
{{% tab "Google Cloud" %}}

[Google Cloud インテグレーションタイル][1] には、タグフィルター `to hosts with tag` があります。

このフィールドでは、GCP からメトリクスを収集する際に使用されるフィルターを定義する、カンマ区切りの GCP ラベルのリスト（`<KEY>:<VALUE>` 形式）を受け付けます。`?` (1 文字の場合) や `*` (複数文字の場合) などのワイルドカードも使用できます。定義されたタグのいずれかに一致するホストだけが Datadog にインポートされ、それ以外は無視されます。

特定のラベルと一致するホストは、タグの前に `!` を加えることで除外することができます。たとえば、

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

[ラベルの作成と管理][2]については、Google Cloud のドキュメントを参照してください。

[1]: https://app.datadoghq.com/account/settings#integrations/google-cloud-platform
[2]: https://cloud.google.com/compute/docs/labeling-resources
{{% /tab %}}
{{< /tabs >}}

## APM

{{< tabs >}}
{{% tab "トレースエクスプローラー" %}}

[トレースエクスプローラー][1]では、検索バーやファセットチェックボックスを使用して、タグでトレースをフィルターすることができます。検索バーのフォーマットは `<KEY>:<VALUE>` で、例えば `service:coffee-house` のようになります。高度な検索については、[クエリ構文][2]を参照してください。

{{< img src="tagging/using_tags/trace_explorer.png" alt="トレースエクスプローラータグ" style="width:80%;">}}

[1]: /ja/tracing/trace_explorer/search/
[2]: /ja/tracing/trace_explorer/query_syntax/
{{% /tab %}}
{{% tab "Service Map" %}}

[タグの割り当て][1]後、サービスマップを使用して、特定のサービスをクリックしてアプリケーションのそれぞれの領域に移動できます。以下の例では、タグ `service:coffee-house` で絞り込んで、[分析][2]、[モニター][3]、[ログ][4]、[ホストマップ][5]を表示します。

{{< img src="tagging/using_tags/servicemaptags.png" alt="サービスマップタグ" style="width:80%;">}}

[1]: /ja/getting_started/tagging/assigning_tags/
[2]: /ja/tracing/app_analytics/search/
[3]: /ja/monitors/manage/
[4]: /ja/logs/explorer/search/
[5]: /ja/infrastructure/hostmap/
{{% /tab %}}

{{< /tabs >}}

## ノートブック

[ノートブック][9]グラフを作成するときに、**from** テキストボックスでタグを使用してメトリクスを制限します。さらに、**avg by** テキストボックスでタグを使用してメトリクスをグループ化します。以下の例では、メトリクスは `service:coffee-house` に制限され、`host` でグループ化されます。

{{< img src="tagging/using_tags/notebooktags.png" alt="ノートブックタグ" style="width:80%;">}}

タグを除外するには、`</>` を使用してテキストを編集して、`!<KEY>:<VALUE>` の形式でタグを追加します。以下の例では、`!service:coffeehouse` を使用して `service:coffeehouse` を除外します。

{{< img src="tagging/using_tags/notebooktagsexclude.mp4" alt="ノートブック除外タグ" video="true" width="80%">}}

## ログ管理

ログ[検索][10]、[分析][11]、[パターン][12]、[Live Tail][13]は、検索バーまたはファセットのチェックボックスを使用して、タグでログを絞り込みます。検索バーの形式は `<KEY>:<VALUE>` で、`service:coffee-house` などです。高度な検索については、[ログ検索][10]を参照してください。

{{< tabs >}}
{{% tab "Search" %}}

{{< img src="tagging/using_tags/logsearchtags.png" alt="ログ検索タグ" style="width:80%;">}}

{{% /tab %}}
{{% tab "Analytics" %}}

{{< img src="tagging/using_tags/loganalyticstags.png" alt="ログ分析タグ" style="width:80%;">}}

{{% /tab %}}
{{% tab "Patterns" %}}

{{< img src="tagging/using_tags/logpatternstags.png" alt="Log Patterns タグ" style="width:80%;">}}

{{% /tab %}}
{{% tab "Live Tail" %}}

{{< img src="tagging/using_tags/livetailtags.mp4" alt="Live Tail タグ" video="true" width="80%">}}

{{% /tab %}}
{{< /tabs >}}

さらに、タグを使用してログ [パイプライン][14]を絞り込みます。以下の例では、パイプラインはタグ `service:coffee-house` でログを絞り込みます。

{{< img src="tagging/using_tags/logpipelinetags.png" alt="パイプラインタグ" style="width:80%;">}}

## RUM & セッションリプレイ

[RUM エクスプローラー][15]は、環境から指定された期間内のイベントを視覚化します。

RUM のイベントデータをタグでフィルターするには、検索バーまたはファセットチェックボックスを使用します。検索バーのフォーマットは `<KEY>:<VALUE>` で、例えば `service:shopist` のようになります。詳細な検索については、[RUM イベントを検索する][16]を参照してください。

{{< img src="tagging/using_tags/rumtags.png" alt="RUM タグ" style="width:80%;">}}

## Synthetics

{{< tabs >}}
{{% tab "Synthetic テスト" %}}

[Synthetic Tests][1] ページでは、Synthetic テストの一覧が表示されます。

テストをタグでフィルターするには、検索バーまたはファセットチェックボックスを使用します。検索バーのフォーマットは `<KEY>:<VALUE>` で、例えば `tag:mini-website` のようになります。詳細な検索については、[Synthetic テストの検索と管理][2]を参照してください。

{{< img src="tagging/using_tags/syntheticstags.png" alt="Synthetics タグ" style="width:80%;">}}


[1]: https://app.datadoghq.com/synthetics/tests
[2]: /ja/synthetics/search/
{{% /tab %}}
{{% tab "エクスプローラー" %}}

[Synthetic Monitoring & Continuous Testing Explorer][1] は、[CI パイプライン][2]内のテスト実行や実行のバッチを表示します。

テスト実行をタグでフィルターするには、検索バーまたはファセットチェックボックスを使用します。検索バーのフォーマットは `<KEY>:<VALUE>` で、例えば `@ci.provider.name:github` のようになります。詳細な検索については、[テストバッチを検索する][3]を参照してください。

{{< img src="tagging/using_tags/syntheticscitags.png" alt="Synthetics と CI タグ" style="width:80%;">}}


[1]: https://app.datadoghq.com/synthetics/explorer/
[2]: /ja/continuous_testing/cicd_integrations
[3]: /ja/continuous_testing/explorer/search/
{{% /tab %}}
{{< /tabs >}}

## サービスレベル目標

{{< tabs >}}
{{% tab "Manage SLOs" %}}

[割り当てられたタグ][1]によって SLO を絞り込むには、検索バーかファセットのチェックボックスを使用します。検索バーの形式は、`<KEY>:<VALUE>`です (例: `journey:add_item`)。特定のタグを持つ SLO を検索から除外するには、`-` を使用します (例: `-journey:add_item`)。

{{< img src="tagging/using_tags/manage_slo_tags.png" alt="SLO タグ" style="width:80%;">}}

SLO タグは、SLO の基礎となるメトリクスまたはモニターで使用されるメトリクスまたはモニタータグとは異なる別のものです。

[1]: /ja/getting_started/tagging/assigning_tags/?tab=servicelevelobjectives#ui
{{% /tab %}}

{{% tab "Metric-based SLOs" %}}

[メトリクスベースの SLO][1] を作成する場合、SLO の成功率メトリクスクエリでメトリクスタグを使用します（すべてのメトリクスは同じセットのメトリクスタグを使用する必要があります）。

* これらのタグのみにメトリクス範囲を制限する **from** テキストボックス。
* SLO 全体と各タグ値のステータス割合および残りのエラーバジェットを表示する、グループ化されたメトリクスベースの SLO を作成するための **sum by** テキストボックス。

{{< img src="tagging/using_tags/metric_based_slo_tags.png" alt="メトリクスベースの SLO タグ" style="width:80%;">}}

[1]: /ja/service_management/service_level_objectives/metric/
{{% /tab %}}
{{% tab "Monitor-based SLOs" %}}

単一の[グループ化されたモニター][2]を使用して[モニターベースの SLO][1] を作成する場合、**選択されたグループで計算** トグルを使用して、基底のモニターから最大 20 個のタグ値を選択し、SLO 全体および各タグ値のステータス割合および残りのエラーバジェットを表示します。

{{< img src="tagging/using_tags/monitor_based_slo_tags.png" alt="モニターベースの SLO タグ" style="width:80%;">}}

[1]: /ja/service_management/service_level_objectives/monitor/
[2]: /ja/getting_started/tagging/using_tags/?tab=newmonitor#monitors
{{% /tab %}}
{{< /tabs >}}

## 開発者

タグは [API][17] でさまざまな使い方ができます。

各セクションへのリンクはこのリストをご覧ください。

* [モニターのダウンタイムのスケジューリング][18]
* [イベントエクスプローラーのクエリ][19]
* [ホストの検索][20]
* [AWS][21] や [Google Cloud][22] のインテグレーション
* [時系列ポイントのクエリ][23]
* [すべてのモニターの詳細を取得][24]
* [モニターのミュート][25]
* [モニターの検索][24]
* [モニターグループの検索][24]
* [スクリーンボードの作成][26]
* [タイムボードの作成][26]
* [SLO を作成する][27]
* [SLO の詳細を取得する][28]
* [SLO を更新する][29]

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/assigning_tags/
[2]: /ja/service_management/events/explorer
[3]: /ja/integrations/
[4]: /ja/infrastructure/hostmap/
[5]: /ja/infrastructure/
[6]: /ja/infrastructure/livecontainers/
[7]: /ja/infrastructure/process/
[8]: /ja/metrics/explorer/
[9]: /ja/notebooks/
[10]: /ja/logs/explorer/search/
[11]: /ja/logs/explorer/analytics/
[12]: /ja/logs/explorer/patterns/
[13]: /ja/logs/live_tail/
[14]: /ja/logs/log_configuration/pipelines
[15]: /ja/real_user_monitoring/explorer/
[16]: /ja/real_user_monitoring/explorer/search/
[17]: /ja/api/
[18]: /ja/api/v1/downtimes/#schedule-a-downtime
[19]: /ja/api/v1/events/#query-the-event-stream
[20]: /ja/api/v1/hosts/
[21]: /ja/api/v1/aws-integration/
[22]: /ja/api/v1/gcp-integration/
[23]: /ja/api/v1/metrics/#query-timeseries-points
[24]: /ja/api/v1/monitors/#get-all-monitor-details
[25]: /ja/api/v1/monitors/#mute-a-monitor
[26]: /ja/api/v1/dashboards/#create-a-new-dashboard
[27]: /ja/api/v1/service-level-objectives/#create-a-slo-object
[28]: /ja/api/v1/service-level-objectives/#get-a-slos-details
[29]: /ja/api/v1/service-level-objectives/#update-a-slo
[30]: /ja/monitors/manage/#monitor-tags
[31]: /ja/monitors/downtimes/
[32]: /ja/getting_started/tagging/assigning_tags?tab=monitors