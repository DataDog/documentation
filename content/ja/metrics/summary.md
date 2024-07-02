---
title: Metrics Summary
description: "Consult the full list of metrics reporting to Datadog."
aliases:
  - /graphing/faq/how-can-i-set-up-custom-units-for-custom-metrics
  - /graphing/metrics/summary/
further_reading:
  - link: /metrics/explorer/
    tag: Documentation
    text: Metrics Explorer
  - link: /metrics/distributions/
    tag: Documentation
    text: Metrics Distributions
---

## 概要

[メトリクスの概要ページ][1]には、過去 1 時間、1 日、または 1 週間の指定されたタイムフレームで Datadog に報告されたメトリクスのリストが表示されます。

**Metric** または **Tag** 検索フィールドを使用して、メトリクス名またはタグでメトリクスを検索します。

{{< img src="metrics/summary/tag_advancedfiltering3.mp4" alt="The metrics summary page with NOT team:* entered in the Tag search bar" video=true style="width:75%;">}}

タグフィルターは、ブーリアンやワイルドカードの構文に対応しており、以下を素早く識別することができます。
* 特定のタグキーでタグ付けされたメトリクス。例: `team`: `team:*`
* 特定のタグキーがないメトリクス。例: `team`: `NOT team:*`


## ファセットパネル

The search bars provide the most comprehensive set of actions to filter the list of metrics. But facets can also filter your metrics by:

- **Configuration**: Metrics with tag configurations
- **Percentiles**: Distribution metrics enabled by percentiles/advanced query capabilities
- **Historical Metrics**: Metrics that have historical metrics ingestion enabled 
- **Query Activity** (Beta): Metrics not queried in the app or by the API in the past 30 days
- **Metric Type**: Differentiate between distribution and non-distribution metrics (counts, gauges, rates)
- **Distribution Metric Origin**: The product from which the metric originated (for example, metrics generated from Logs or APM Spans)

**Note**: A metric included on a Dashboard that has not been loaded by a user in the last 30 days would not be considered actively queried.

{{< img src="metrics/summary/facets4.png" alt="Metrics Facet Panel" style="width:75%;">}}

## 複数のメトリクスのコンフィギュレーション
一度に複数のメトリクスを構成できる 2 つのボタンがあります。

{{< img src="metrics/summary/configurationbuttons2.png" alt="Bulk Configuration Buttons" style="width:75%;">}}

* **Calculate Percentiles**: 複数のディストリビューションメトリクスにパーセンタイル集計を追加します。

{{< img src="metrics/summary/bulkpercentiles.jpg" alt="一括パーセンタイル" style="width:75%;">}}

* **Configure Tags**: Metrics without Limits™ を使用して、ネームスペースに一致する複数のカスタムメトリクスにタグを構成します

{{< img src="metrics/summary/bulkconfig_new-compressed.mp4" alt="一括メトリクスタグ構成" video="true" style="width:100%;" >}}


## メトリクスの詳細サイドパネル

メトリクスのメタデータとタグの詳細については、メトリクス名をクリックして詳細サイドパネルを表示してください。

{{< img src="metrics/summary/mwl_sidepanel.jpg" alt="メトリクスパネル" style="width:75%;">}}

### メトリクス名

[メトリクスエクスプローラー][2]や[ダッシュボード][3]などに表示されるメトリクスの名前です。

### Ingested custom metrics

メトリクス名は、関連するタグ値の組み合わせによって、複数のインジェストされたカスタムメトリクスを発行することができます。インジェストされたカスタムメトリクスは、元々コードで送信されたすべてのデータを表します。

詳細については、[カスタムメトリクス][4]のドキュメントをご覧ください。

### Indexed custom metrics

インジェストされたカスタムメトリクスとは異なり、インデックスされたカスタムメトリクスは、Datadog プラットフォーム全体でクエリ可能な状態を維持するものを表しています。この数は、パーセンタイル集計の追加や削除、または Metrics without Limits™ の使用によって影響を受ける可能性があります。詳しくは、[Metrics without Limits™][10] のドキュメントを参照してください。<br>

### ホスト

メトリクスをレポートしているホストの総数。

### タグ値

メトリクスにアタッチされた一意のタグ値の総数。

[タグ付けに関する詳しい説明][5]。

### メトリクスメタデータ

メトリクスに作成されたメタデータを表示します。ほとんどのメタデータは、メトリクスの概要ページ、または [Datadog API][6] を使用して変更できます。

#### メトリクスの単位

メトリクスの単位 (バイト、秒、リクエスト、クエリなど) を表示します。詳しくは、[メトリクスの単位][7]のページを参照してください。

Datadog にカスタムメトリクスを送信する際、グラフのメトリクスにカーソルを合わせた時に表示される[計測単位][1]を変更することが可能です。

**注**: メトリクスのグラフの表示方法は変わりません。元の値の測定単位がマウスを合わせた時に変わるだけです。読みやすい形式になるよう自動的に変更されます。たとえば、バイト (`B`) がキロバイト (`KiB`) の表示に変わる場合があります。

#### メトリクスタイプ

メトリクスタイプ (GAUGE、RATE、COUNT、DISTRIBUTION など) を表示します。詳しくは、[メトリクスタイプ][8]のページを参照してください。

**警告**: メトリクスタイプを編集すると、ダッシュボードとモニターの**すべて**に対するメトリクスの動作が変更されます。

#### インテグレーション名

メトリクスがサポートされている[インテグレーション][9]からのものである場合、メタデータにはインテグレーション名がリストされます。この情報は編集できません。

#### 間隔

メトリクスの収集間隔を秒で表示します。

#### メトリクスの説明

メトリクスの内容を理解するのに役立ちます。メトリクスに使用したサポート対象の[インテグレーション][9]から送られてくる説明が表示されます。[カスタムメトリクス][4]の場合は、このフィールドを使用して説明を更新できます。

### タグテーブル

タグテーブルは、メトリクスのデータでアクティブにレポートしているすべてのタグキーとタグ値を探索するための複数の方法を提供します。

タグテーブルを使用して、次のことを行います。

- **Count 列** (一意のタグ値のカウント) でタグキーを並べ替えます。
- タグのページ区切りされたテーブルを検索して、特定のタグキーを探します。
- タグテーブルをダウンロード可能な CSV としてエクスポートします。
- メトリクスに構成したタグと、メトリクスに元々登録されているタグを切り替えることができます。

特定のタグキーについて、次のことができます。

- そのタグキーのすべてのタグ値を検査します。
- 特定のタグ `key:value` を使用して、[メトリクスの概要]ページに表示されるメトリクスのリストをさらにフィルタリングします。
- メトリクスエクスプローラーで、タグ `key:value` ペアによってフィルタリングされたこのメトリクスのグラフを開きます。
- アプリケーション全体でフィルタリングするために、タグ `key:value` をコピーします。

{{< img src="metrics/summary/updated_tags_table.mp4" alt="タグテーブル" video=true style="width:75%;">}}

[タグ付けに関する詳しい説明][5]。

## Metrics Related Assets

{{< img src="metrics/summary/related_assets_dashboards.png" alt="Related Assets for a specified metrics name" style="width:80%;">}}

To determine the value of any metric name to your organization, use Metrics Related Assets. Metrics related assets refers to any dashboard, notebook, monitor, or SLO that queries a particular metric. 

1. Scroll to the bottom of the metric's details side panel to the "Related Assets" section.
2. Click the dropdown button to view the type of related asset you are interested in (dashboards, monitors, notebooks, SLOs). You can additionally leverage the search bar to validate specific assets.


## Metrics without LimitsTM
Metrics without LimitsTM は、Agent やコードレベルの変更を必要とせずに、カスタムメトリクスのサイズを制御できます。

**注:** Metrics without LimitsTM は、カスタムメトリクスでのみ利用可能です。

タグの構成は、メトリクスのタグ一括構成ボタン、またはメトリクスの詳細サイドパネルの **Manage Tags** ボタンで行えます。

{{< img src="metrics/distributions/managetags.png" alt="ディストリビューションでタグを構成する" style="width:80%;">}}

1. **Metrics Summary** テーブルでカスタムディストリビューションのメトリクス名をクリックし、メトリクス詳細のサイドパネルを開きます。
2. **Manage Tags** ボタンをクリックして、タグコンフィギュレーションモーダルを開きます。

3. Select **Include tags...** or **Exclude tags...** to customize the tags you do or don't want to query for. For more information on tag configuration, see the [Metrics without Limits][10] documentation.
4. Preview the effects of your proposed tag configuration with the cardinality estimator before selecting **Save**.

**Note**: The cardinality estimator requires the metric to be older than 48 hours.

### クエリ可能なタグ 

メトリクスが Metrics without LimitsTM で構成されると、どのタグが Queryable のままか、つまり _Indexed Custom Metrics_ のボリュームに寄与するタグを表示することができます。また、_Ingested Custom Metrics_ のボリュームに寄与する、最初に送信されインジェストされたすべてのタグにトグルバックすることができます。

### アドバンスドモードでの集計によるメトリクスの最適化

カウント、ゲージ、レートの各メトリクスタイプのカスタムメトリクスでは、Metrics without LimitsTM のアドバンスモードでオプションで追加の集計を含めることにより、メトリクスの構成をさらに洗練させることができます。デフォルトでは、Datadog は、構成されたメトリクスのクエリの数学的精度を維持するために、メトリクスのタイプに応じて最も頻繁にクエリされる集計の組み合わせを以下に示すように保存します。

- 構成されたカウント/レートは `SUM` の時間/空間集計でクエリ可能です
- 構成されたゲージは `AVG` の時間/空間集計ででクエリ可能です

{{< img src="metrics/summary/customize_aggr_docs.jpg" alt="カウント、レート、ゲージに関する集計の精緻化" style="width:80%;">}}

さらに多くの集計が用意されており、お客様にとって価値のある集計となります。Agent やコードレベルの変更なしに、いつでも集計を追加または削除することができます。

**注**: カウント、レート、ゲージのメトリクスを構成し、集計を削除すると、既存のダッシュボードやモニターに影響を与える可能性があります。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[10]: /metrics/metrics-without-limits
[1]: https://app.datadoghq.com/metric/summary
[2]: /metrics/explorer/
[3]: /dashboards/
[4]: /metrics/custom_metrics/
[5]: /getting_started/tagging/
[6]: /api/v1/metrics/#edit-metric-metadata
[7]: /metrics/units/
[8]: /metrics/types/
[9]: /integrations/
