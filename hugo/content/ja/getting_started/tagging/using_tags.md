---
aliases:
- /ja/tagging/using_tags/
description: Datadog 製品でのタグの使用方法について説明します。
further_reading:
- link: https://www.datadoghq.com/blog/tagging-best-practices/
  tag: ブログ
  text: インフラストラクチャーとアプリケーションにタグを付けるためのベストプラクティス
- link: /getting_started/tagging/
  tag: ドキュメント
  text: タグの概要
- link: /getting_started/tagging/assigning_tags/
  tag: ドキュメント
  text: タグの割り当て方法
title: タグの使用
---
## 概要 {#overview}

[タグの割り当て][1]後に、Datadog プラットフォームでタグを使用して、データのフィルタリングとグループ化を開始します。タグを使用して、データを含めたり除外したりできます。

複数のタグを含めたり除外したりする場合:

* Include (含める) では `AND` ロジックを使用します
* Exclude (除外する) では `OR` ロジックを使用します

## イベント {#events}

[Events Explorer][2] には、環境から指定された期間内のイベントが表示されます。タグを使用してイベントリストをフィルタリングし、イベントのサブセットに絞り込みます。`tags:` に続けてタグを入力すると、そのタグを持つホスト、[インテグレーション][3]、またはサービスからのすべてのイベントが表示されます。たとえば、`tags:(service:coffee-house)` を使用してタグ `service:coffee-house` を検索します。

複数のタグのいずれかに一致するイベントを検索するには、各タグを OR で区切ってください: `tags:(service:coffee-house OR host:coffeehouseprod)`。複数のタグすべてに一致するイベントを検索するには、各タグを AND で区切ってください: `tags:(service:coffee-house AND host:coffeehouseprod)`。

## ダッシュボード {#dashboards}

{{< tabs >}}
{{% tab "割り当て" %}}

タグを使用して、[ダッシュボードグラフ][1]に表示するメトリクスをフィルタリングしたり、表示するメトリクスの集計グループを作成したりします。表示するメトリクスをフィルタリングするには、{{< ui >}}from{{< /ui >}} テキストボックスにタグを入力します。このメトリクスは、その特定のタグが割り当てられているすべてのソースで表示されます (下の例では `service:web-store`)。

{{< img src="tagging/using_tags/dashboards_tags_example.png" alt="ダッシュボードでメトリクスをフィルタリングするには、'from' フィールドにタグを追加します。この例では、メトリクスは 'service:web-store' でフィルタリングされています。" style="width:80%;">}}

ブールフィルターを使用した高度なタグ値のフィルタリングも利用可能です。以下のブール構文がサポートされています。

* `NOT`, `!`
* `AND`, `,`
* `OR`
* `key IN (tag_value1, tag_value2,...)`
* `key NOT IN (tag_value1, tag_value2,...)`

`AND`、`ORs` を使用して、特定のタグ全体のメトリクスを確認します。

{{< img src="tagging/using_tags/dashboard_advanced_tags_AND_OR.png" alt="AND/OR を使用したブールフィルター" style="width:80%;">}}

`IN`、`NOT IN` を使用して、メトリクスを特定のタグにすばやく絞り込みます。

{{< img src="tagging/using_tags/dashboard_advanced_tags_NOT_IN.png" alt="IN/NOT IN を使用したブールフィルター" style="width:80%;">}}

タグを使用して集計グループを作成するには、{{< ui >}}avg by{{< /ui >}} テキストボックスにタグのキー部分を入力します。たとえば、`service:web-store` のように `service` というキーでタグ付けされたメトリクスを表示する時系列グラフがある場合、{{< ui >}}avg by{{< /ui >}} テキストボックスに `service` と入力すると、`service` タグ値ごとに 1 本の線が表示されます。各線は、その `service` タグ値を共有するすべてのソースの平均メトリクス値を表します。

{{< img src="tagging/using_tags/dashboard_group_by_tags.png" alt="ダッシュボードの avg by テキストボックスのタグ" style="width:80%;">}}

タグを使用して、ダッシュボードにイベントをオーバーレイすることもできます。これは [Events Explorer][2] と同じように機能します。
一致するイベントは、グラフ上に垂直バーとしてオーバーレイされます。以下の例では `service:web-store` を使用しています。

{{< img src="tagging/using_tags/dashboard_event_overlays.png" alt="タグを使用してダッシュボードに Event Overlays を追加する" style="width:80%;">}}

[テンプレート変数][3]を使用すると、ダッシュボードのグラフで {{< ui >}}from{{< /ui >}} タグを切り替える時間を節約できます。以下の例では、`service` を使用して `service` タグキーを表しています。テンプレート変数を使用するには、グラフクエリの {{< ui >}}from{{< /ui >}} テキストボックスに `$service` テンプレート変数を追加します。

{{< img src="tagging/using_tags/dashboard_dynamic_template_variables.png" alt="ダッシュボードのテンプレート変数" style="width:80%;">}}

[1]: /ja/dashboards/
[2]: /ja/events/
[3]: /ja/dashboards/template_variables/
{{% /tab %}}
{{% tab "例" %}}

以下は、時系列グラフエディターを使用したタグの例です。最初のスクリーンショットでは、タグは適用されておらず、すべてのホストの平均 CPU 使用率が表示されています。

{{< img src="tagging/using_tags/dashboard_timeseries_graph_editor_no_tags.png" alt="タグが追加されていない時系列グラフエディター" style="width:75%;">}}

次に、エディターが更新され、{{< ui >}}from{{< /ui >}} テキストボックスにタグ (`region:eastus`) が含まれるようになり、Datadog が米国東部リージョンの CPU 使用率を確認できるようになります。ここでは、`region` タグを例として使用していますが、`application`、`service`、`environment` など、Datadog プラットフォームに送信された任意のタグを使用できます。

{{< img src="tagging/using_tags/dashboard_timeseries_graph_editor_from_tag.png" alt="'region:us-east-1' タグでフィルタリングされた時系列グラフエディター" style="width:75%;">}}

最後に、2 番目の空のフィールド ({{< ui >}}avg by{{< /ui >}}テキストボックス) を使用して、`host` ごとに個別の時系列の線を表示します。米国東部リージョンで実行されている個々のホストのサーバー CPU が表示されます。

{{< img src="tagging/using_tags/dashboard_timeseries_graph_editor_sumby_tag.png" alt="'region:us-east-1' でフィルタリングされ、'host' でグループ化された時系列グラフエディター" style="width:75%;">}}

必要に応じて、スコープをさらに絞り込むためにタグを追加します (例: `region:eastus` および `env:production` のホスト)。タグは Datadog 全体で使用でき、すべてのコア要素 (メトリクス、トレース、ログ) に適用することができます。

{{% /tab %}}
{{< /tabs >}}

## インフラストラクチャー {#infrastructure}

[ホストマップ][4]、[インフラストラクチャーリスト][5]、[Containers][6]、および[プロセス][7]をフィルタリングするには、ページ上部の {{< ui >}}Filter by{{< /ui >}} テキストボックスにタグを入力します。ホストと Containers は、{{< ui >}}Group by{{< /ui >}} テキストボックスを使用してタグキーでグループ化できます。グループボックスに `service` と入力すると、各サービスがグループ見出しとして表示されます。

{{< tabs >}}
{{% tab "ホストマップ" %}}

このセクションでは、タグを使用してホストをフィルタリングまたはグループ化します。

{{< img src="tagging/using_tags/hostmaptags.png" alt="Host Map タグ" style="width:80%;">}}

または、コンテナ

{{< img src="tagging/using_tags/containermaptags.png" alt="Container Map タグ" style="width:80%;">}}
{{% /tab %}}

{{% tab "インフラストラクチャーリスト" %}}

以下は、Infrastructure List ページのテキストボックスによるフィルタリングおよびグループ化です。

{{< img src="tagging/using_tags/infrastructuretags.png" alt="インフラストラクチャーリストのタグ" style="width:80%;">}}
{{% /tab %}}

{{% tab "Containers" %}}

以下は、Live Containers ページのテキストボックスによるフィルタリングおよびグループ化です。

{{< img src="tagging/using_tags/livecontainertags.png" alt="Live Container タグ" style="width:80%;">}}
{{% /tab %}}

{{% tab "プロセス" %}}

以下は、Live Processes ページのテキストボックスによるフィルタリングおよびグループ化です。

{{< img src="tagging/using_tags/liveprocessestags.png" alt="Live Process タグ" style="width:80%;">}}
{{% /tab %}}
{{< /tabs >}}

## モニター {#monitors}

モニターおよび[モニターのダウンタイム][31]を[割り当てられたタグ][32]でフィルタリングするには、検索バーまたはファセットのチェックボックスを使用します。検索バーの形式は `tag:"<KEY>:<VALUE>"` です。たとえば、`tag:"service:coffee-house"` です。タグキーの任意の値に一致させるには、引用符内で Wildcard がサポートされていないため、引用符を使用する代わりにバックスラッシュ (`\`) でコロンをエスケープします。たとえば、`tag:service\:*` は、`service` タグを持つすべてのモニターを返します。特定のタグを持つモニターを検索から除外するには、`-` を使用します。たとえば、`-tag:"service:coffee-house"` です。

{{< img src="/tagging/using_tags/manage_monitor_tags.png" alt="検索バーでタグを使用してモニターをフィルタリングする" style="width:80%;">}}

**注**: モニタータグは、メトリクスタグとは異なる別のものです。詳細については、[モニタータグ][30]に関するドキュメントを参照してください。

新しいモニターを作成する場合は、以下の場所で*メトリクスタグ*を使用します。
* これらのタグがあるメトリクスのみにモニター範囲を制限する {{< ui >}}from{{< /ui >}} テキストボックス。
* {{< ui >}}excluding{{< /ui >}}対応するメトリクスをモニターのスコープから削除するテキストボックス。
* {{< ui >}}avg by{{< /ui >}}モニターを各タグ値でマルチアラートモニターに変換するテキストボックス。

## メトリクス {#metrics}

[Metrics Explorer][8] でタグを使用して、タグでメトリクスをフィルタリングしたり、タグキーごとに複数のグラフを表示したりします。以下の例では、`service:web-store` のメトリクスをグラフ化しています。

{{< img src="tagging/using_tags/metrics_explorer.png" alt="個別のタグにスコープを絞ったメトリクスグラフ" style="width:80%;">}}

## Integrations {#integrations}

一部の Integrations では、オプションでタグを使用してメトリクスを制限できます。

{{< tabs >}}
{{% tab "AWS" %}}

[AWS インテグレーションタイル][1]には、タグフィルター `to hosts with tag` と `to Lambdas with tag` があります。

これらのフィールドには、EC2 または Lambda リソースの収集に使用するフィルターを定義する、カンマ区切りのタグのリスト (`<KEY>:<VALUE>` 形式) を入力できます。これらの `<KEY>:<VALUE>` を使用して、タグに基づいてモニタリング対象の関数を含めたり除外したりできます。タグを除外するように指定するには、タグキーの前に `!` を追加します。また、`?` (単一文字用) や `*` (複数文字用) などの Wildcard も使用できます。

フィルターでは、`OR` ステートメントを使用して、任意の inclusion タグが存在するリソースを含めます。以下のフィルターの例では、タグ `datadog:monitored` または `env:production` を含む EC2 インスタンスを収集します。

```text
datadog:monitored,env:production
```

タグの除外を指定した場合、それが優先され、`AND` ステートメントが形成されます。以下のフィルターの例では、タグ `datadog:monitored`、または `env:production`、または `c1.*` 値を持つ `instance-type` タグを含み、かつ `region:us-east-1` タグを含まない EC2 インスタンスを収集します。

```text
datadog:monitored,env:production,instance-type:c1.*,!region:us-east-1
```

AWS のタグ付けに関する詳細は、[EC2][2] および [Lambda][3] ドキュメントを参照してください。

[1]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[2]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html
[3]: https://docs.aws.amazon.com/lambda/latest/dg/tagging.html
{{% /tab %}}
{{% tab "Azure" %}}

[Azure インテグレーションタイル][1]には、タグフィルター `Optionally filter to VMs with tag` があります。

このフィールドには、Azure VM からメトリクスを収集するために使用されるフィルターを定義する、カンマ区切りのタグのリスト (`<KEY>:<VALUE>` 形式) を入力できます。また、`?` (単一文字用) や `*` (複数文字用) などの Wildcard も使用できます。定義したタグのいずれかに一致する VM のみが Datadog にインポートされます。残りは無視されます。

特定のタグと一致する VM は、タグの前に `!` を加えることで除外することもできます。たとえば、以下のとおりです。

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

[1]: https://app.datadoghq.com/account/settings#integrations/azure
{{% /tab %}}
{{% tab "Google Cloud" %}}

[Google Cloud インテグレーションタイル][1]には、タグフィルター `to hosts with tag` があります。

このフィールドは、GCP からメトリクスを収集するために使用されるフィルターを定義する、GCP ラベルのカンマ区切りリスト (`<KEY>:<VALUE>` 形式) を入力できます。また、`?` (単一文字用) や `*` (複数文字用) などの Wildcard も使用できます。定義したラベルのいずれかに一致するホストのみが Datadog にインポートされます。残りは無視されます。

特定のラベルと一致するホストは、タグの前に `!` を加えることで除外することができます。たとえば、以下のとおりです。

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

[ラベルの作成と管理][2]の詳細については、Google Cloud ドキュメントを参照してください。

[1]: https://app.datadoghq.com/account/settings#integrations/google-cloud-platform
[2]: https://cloud.google.com/compute/docs/labeling-resources
{{% /tab %}}
{{< /tabs >}}

## APM {#apm}

{{< tabs >}}
{{% tab "Trace Explorer" %}}

[Trace Explorer][1] では、検索バーまたはファセットのチェックボックスを使用して、タグでトレースをフィルタリングできます。検索バーの形式は `<KEY>:<VALUE>` です。たとえば、`service:coffee-house` です。高度な検索については、[クエリ構文][2]を参照してください。

{{< img src="tagging/using_tags/trace_explorer.png" alt="Trace Explorer タグ" style="width:80%;">}}

[1]: /ja/tracing/trace_explorer/search/
[2]: /ja/tracing/trace_explorer/query_syntax/
{{% /tab %}}
{{% tab "Service Map" %}}

[タグの割り当て][1]後、Service Map を使用して、特定のサービスをクリックすることでアプリケーションのさまざまな領域に移動できます。以下の例では、タグ `service:coffee-house` でフィルタリングされた [Analytics][2]、[モニター][3]、[ログ][4]、および [ホストマップ][5]が表示されています。

{{< img src="tagging/using_tags/servicemaptags.png" alt="Service Map タグ" style="width:80%;">}}

[1]: /ja/getting_started/tagging/assigning_tags/
[2]: /ja/tracing/app_analytics/search/
[3]: /ja/monitors/manage/
[4]: /ja/logs/explorer/search/
[5]: /ja/infrastructure/hostmap/
{{% /tab %}}

{{< /tabs >}}

## Notebooks {#notebooks}

[ノートブック][9]のグラフを作成する際、{{< ui >}}from{{< /ui >}} テキストボックスでタグを使用してメトリクスを制限します。さらに、{{< ui >}}avg by{{< /ui >}} テキストボックスでタグを使用してメトリクスをグループ化します。以下の例では、メトリクスは `service:coffee-house` に制限され、`host` でグループ化されています。

{{< img src="tagging/using_tags/notebooktags.png" alt="Notebook タグ" style="width:80%;">}}

タグを除外するには、`</>` を使用してテキストを編集し、`!<KEY>:<VALUE>` の形式でタグを追加します。以下の例では、`!service:coffeehouse` を使用して `service:coffeehouse` が除外されています。

{{< img src="tagging/using_tags/notebooktagsexclude.mp4" alt="Notebook Exclude タグ" video="true" width="80%">}}

## ログ {#logs}

ログの[検索][10]、[Analytics][11]、[パターン][12]、[Live Tail][13] では、検索バーまたはファセットのチェックボックスを使用してタグでログをフィルタリングします。検索バーの形式は `<KEY>:<VALUE>` です。たとえば、`service:coffee-house` です。高度な検索については、[ログを検索][10]を参照してください。

さらに、タグはログの[パイプライン][14]をフィルタリングするためにも使用されます。たとえば、coffee-house サービスからのログのみをパイプラインに通す場合は、フィルターフィールドにタグ `service:coffee-house` を追加します。

## RUM および Session Replay {#rum-session-replay}

[RUM エクスプローラー][15]は、環境から指定された一定期間内のイベントを視覚化します。

RUM イベントデータをタグでフィルタリングするには、検索バーまたはファセットのチェックボックスを使用します。検索バーの形式は `<KEY>:<VALUE>` です。たとえば、`service:shopist` です。高度な検索については、[RUM イベントの検索][16]を参照してください。

{{< img src="tagging/using_tags/rumtags.png" alt="RUM タグ" style="width:80%;">}}

## Synthetics {#synthetics}

{{< tabs >}}
{{% tab "Synthetic テスト" %}}

[Synthetic Tests][1] ページでは、Synthetic テストの一覧が表示されます。

テストをタグでフィルタリングするには、検索バーまたはファセットのチェックボックスを使用します。検索バーの形式は `<KEY>:<VALUE>` です。たとえば、`tag:mini-website` です。高度な検索については、[Synthetic テストの検索と管理][2]を参照してください。

{{< img src="tagging/using_tags/syntheticstags.png" alt="Synthetics タグ" style="width:80%;">}}


[1]: https://app.datadoghq.com/synthetics/tests
[2]: /ja/synthetics/search/
{{% /tab %}}
{{% tab "エクスプローラー" %}}

[Synthetic Monitoring & Testing Results Explorer][1] は、[CI パイプライン][2]内でのテスト実行や実行のバッチを表示します。

テスト実行をタグでフィルタリングするには、検索バーまたはファセットのチェックボックスを使用します。検索バーの形式は `<KEY>:<VALUE>` です。たとえば、`@ci.provider.name:github` です。高度な検索については、[テストバッチの検索][3]を参照してください。

{{< img src="tagging/using_tags/syntheticscitags.png" alt="Synthetics と CI タグ" style="width:80%;">}}


[1]: https://app.datadoghq.com/synthetics/explorer/
[2]: /ja/continuous_testing/cicd_integrations
[3]: /ja/continuous_testing/explorer/search/
{{% /tab %}}
{{< /tabs >}}

## Service Level Objectives {#service-level-objectives}

{{< tabs >}}
{{% tab "SLO の管理" %}}

SLO を[割り当てられたタグ][1]でフィルタリングするには、検索バーまたはファセットのチェックボックスを使用します。検索バーの形式は `<KEY>:<VALUE>` です。たとえば、`journey:add_item` です。検索から特定のタグを持つ SLO を除外するには、`-` を使用します。たとえば `-journey:add_item` です。

{{< img src="tagging/using_tags/manage_slo_tags.png" alt="SLO タグ" style="width:80%;">}}

SLO タグは、SLO の基礎となるメトリクスまたはモニターで使用されるメトリクスまたはモニタータグとは異なる別のものです。

[1]: /ja/getting_started/tagging/assigning_tags/?tab=servicelevelobjectives#ui
{{% /tab %}}

{{% tab "メトリクスベースの SLO" %}}

[メトリクスベースの SLO][1] を作成する場合、SLO の成功率メトリクスクエリでメトリクスタグを使用します (すべてのメトリクスは同じセットのメトリクスタグを使用する必要があります)。

メトリクスのスコープをこれらのタグのみに制限するための * {{< ui >}}from{{< /ui >}} テキストボックス。
* {{< ui >}}sum by{{< /ui >}}SLO 全体と各タグ値のステータスの割合および残りのエラーバジェットを表示する、グループ化されたメトリクスベースの SLO を作成するためのテキストボックス。

[1]: /ja/service_level_objectives/metric/
{{% /tab %}}
{{% tab "モニターベースの SLO" %}}

単一の[グループ化されたモニター][2]を使用して[モニターベースの SLO][1] を作成する場合、{{< ui >}}Calculate on selected groups{{< /ui >}} トグルを使用して、基になるモニターから最大 20 個のタグ値を選択し、SLO 全体および各タグ値のステータス割合と残りのエラーバジェットを表示します。

{{< img src="tagging/using_tags/monitor_based_slo_tags.png" alt="モニターベースの SLO タグ" style="width:80%;">}}

[1]: /ja/service_level_objectives/monitor/
[2]: /ja/getting_started/tagging/using_tags/?tab=newmonitor#monitors
{{% /tab %}}
{{< /tabs >}}

## CI Visibility {#ci-visibility}

{{< tabs >}}
{{% tab "テスト実行" %}}

[CI Visibility Explorer][101] では、CI パイプラインで実行されているテスト実行を表示します。

テスト実行をタグでフィルタリングするには、検索バーまたはファセットのチェックボックスを使用します。検索バーの形式は `<KEY>:<VALUE>` です。たとえば、`@test.status:failed` です。高度な検索については、[Test Optimization Explorer の検索構文][102]を参照してください。

{{< img src="/continuous_integration/test_runs.png" alt="CI Visibility Explorer のテスト実行" style="width:80%;">}}

[101]: https://app.datadoghq.com/ci/test-runs
[102]: /ja/tests/explorer/search_syntax

{{% /tab %}}
{{% tab "パイプライン実行" %}}

[CI Visibility Explorer][101] は、CI パイプライン実行を表示します。

タグでパイプライン実行をフィルタリングするには、検索バーまたはファセットのチェックボックスを使用します。検索バーの形式は `<KEY>:<VALUE>` です。たとえば、`@ci.provider.name:gitlab` です。高度な検索については、[CI パイプラインの検索と管理][102]を参照してください。

{{< img src="/continuous_integration/pipeline_executions.png" alt="CI Visibility Explorer のパイプライン実行" style="width:80%;">}}

[101]: https://app.datadoghq.com/ci/pipeline-executions
[102]: /ja/continuous_testing/explorer/search/

{{% /tab %}}
{{< /tabs >}}

## DORA Metrics {#dora-metrics}

[DORA Metrics Explorer][33] には、DORA Metrics の集計が表示されます。表示されるメトリクスと集計をタグでフィルタリングするには、{{< ui >}}\+ Filter{{< /ui >}} ボタンを使用して既存のタグにファセットを追加します。グラフやダッシュボードでタグを使用してクエリを実行する方法については、[DORA Metrics カスタムダッシュボードの作成][34]を参照してください。

{{< img src="/delivery_performance/dora_metrics/dora_ui_3.png" alt="Language カスタムタグでフィルタリングされた DORA Metrics 計算の概要" style="width:80%;">}}

## Developers {#developers}

タグは [API][17] でさまざまな使い方ができます。

各セクションへのリンクはこのリストをご覧ください。

* [モニターのダウンタイムのスケジューリング][18]
* [Event Explorer のクエリ][19]
* [ホストの検索][20]
* [AWS][21] や [Google Cloud][22] のインテグレーション
* [時系列ポイントのクエリ][23]
* [すべてのモニターの詳細を取得][24]
* [モニターのミュート][25]
* [モニターの検索][24]
* [モニターグループの検索][24]
* [スクリーンボードの作成][26]
* [Timeboard の作成][26]
* [SLO の作成][27]
* [SLO の詳細を取得][28]
* [SLO の更新][29]

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/assigning_tags/
[2]: /ja/events/explorer
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
[33]: https://app.datadoghq.com/ci/dora
[34]: /ja/delivery_performance/dora_metrics/#create-custom-dashboards