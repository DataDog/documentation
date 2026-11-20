---
algolia:
  tags:
  - metric name pricing
  - custom metrics
  - estimated usage metrics
description: Datadog のカスタムメトリクス体験がメトリクス名の料金を反映するようにどのように更新されたかを学びます。これには、タグの管理モーダル、メトリクスサイドパネル、ボリューム管理ページ、プランと使用状況ページ、推定使用量メトリクスの変更が含まれます。
further_reading:
- link: /account_management/billing/metric_name_pricing/
  tag: ドキュメント
  text: Custom Metrics のメトリクス名の料金
- link: /metrics/metrics-without-limits/
  tag: ドキュメント
  text: Metrics without Limits™
- link: /account_management/billing/usage_metrics/
  tag: ドキュメント
  text: 推定使用量メトリクス
- link: /metrics/volume/
  tag: ドキュメント
  text: メトリクスボリューム管理
title: メトリクス名の料金に関するメトリクスエクスペリエンスの変更
---
## 概要 {#overview}

カスタムメトリクス向けの[メトリクス名の料金請求モデル][1]により、Datadog は使用状況の測定方法を反映するようにメトリクスエクスペリエンスを更新しました。このガイドでは、メトリクス名の料金を利用している組織向けに、Datadogの UI と API で何が変更されたかを説明します。

**注**: このページが適用されるのは、組織が[メトリクス名の料金][1]を利用している場合のみです。御社の契約で時系列 (カーディナリティ) 価格設定が使用されている場合、メトリクスエクスペリエンスは変わりません。

## 変更の概要 {#summary-of-changes}

| 機能 | 説明 |
|---------|-------------|
| [タグ管理モーダル](#manage-tags-modal) | タグ変更の影響をカーディナリティボリュームではなくポイントボリュームに基づいて推定します。|
| [メトリクスサイドパネル](#metric-side-panel) | は、時系列ボリュームではなく、取り込まれたポイントボリュームとインデックスされたポイントボリュームを表示します。|
| [ボリューム管理ページ](#volume-management-page) | ボリュームの概要グラフにメトリクス名の料金に対する新しい請求ディメンションが表示されます。|
| [プランと使用状況ページ](#plan--usage-page) | メトリクス名の料金の請求内訳を反映します。|
| [推定使用量メトリクス](#estimated-usage-metrics) | 新しいポイントボリュームメトリクスがカーディナリティベースの推定使用量メトリクスに取って代わります。|

## タグ管理モーダル {#manage-tags-modal}

カスタムメトリクスのタグを設定する際、{{< ui >}}Manage Tags{{< /ui >}} モーダルは、タグ変更の影響をカーディナリティボリュームではなく**ポイントボリューム**に対して推定します。

{{< img src="metrics/guide/metric_name_pricing_experience/manage-tags-modal.png" alt="月初からの使用量、現在の構成での使用量、提案された構成での使用量を示す 3 つの線がある、使用予測チャートを示すタグ管理モーダル。データセンターとサービスのタグは、タグを含めるタブで構成されます。" style="width:100%;" >}}

タグの構成に関する詳細は、[Metrics without Limits™][2] を参照してください。

## メトリクスサイドパネル {#metric-side-panel}

メトリクス詳細のサイドパネルは、時系列ボリュームではなく、**取り込まれたポイントボリュームとインデックスされたポイントボリューム**を表示します。

メトリクスサイドパネルを開くには、[Metrics Summary ページ][3]で任意のメトリクス名をクリックしてください。

{{< img src="metrics/guide/metric_name_pricing_experience/metric-side-panel.png" alt="上部に INGESTED POINTS とINDEXED POINTS がホストおよびタグ値と共に表示されている、メトリクス詳細サイドパネル。" style="width:100%;" >}}

## ボリューム管理ページ {#volume-management-page}

[メトリクスボリューム管理ページ][4]のボリューム概要グラフは、以下のメトリクス名の料金の請求ディメンションを表示します。

- 推定ユニークメトリクス名数
- 請求可能なインデックスされたポイントのボリューム
- 取り込まれたポイントとインデックスされたポイントの比率

{{< img src="metrics/guide/metric_name_pricing_experience/volume-overview-graphs.png" alt="メトリクス名の料金に関する 3 つのボリューム概要グラフ: 推定ユニークメトリクス名数 (インデックスされたポイント数が月初来で 100 を超えるメトリクスのカウント)、推定総ポイント (月初来のメトリクス当たりの割り当てが 10M を超えるインデックスされたポイントの合計数)、および取り込まれたポイントとインデックスされたポイントの推定比率。" style="width:100%;" >}}

## プランと使用量ページ {#plan-usage-page}

[プランと使用量ページ][5]は、新しいモデルの組織に対するメトリクス名の料金の請求内訳を反映します。

{{< img src="metrics/guide/metric_name_pricing_experience/plan-usage-page.png" alt="インデックスされたポイント、取り込まれたポイント、メトリクス名が、サマリーテーブルと累積コスト内訳チャートで異なる製品ラインアイテムとして表示されている、プランと使用状況のコスト内訳ページ。" style="width:100%;" >}}

## 推定使用量メトリクス {#estimated-usage-metrics}

Datadog は、メトリクス名の料金の使用量をリアルタイムで監視できるように、推定使用量メトリクスを提供します。これらのメトリクスを使用して、コストの可視性のためにモニターとダッシュボードをセットアップしてください。

<div class="alert alert-warning">カーディナリティに基づく推定使用量メトリクス (<code>datadog.estimated_usage.metrics.custom</code> および関連メトリクス) を、メトリクス名の料金を使用している組織は利用できなくなりました。カーディナリティに基づくメトリクスを使用しているモニター、ダッシュボード、またはその他のアセットは、データの受信を停止しました。代わりに、以下に示すポイントボリュームメトリクスを使用してください。</div>

### 請求可能な使用量メトリクス {#billable-usage-metrics}

これらのメトリクスを使用して、月初来の請求可能な使用量を推定してください。

#### `datadog.estimated_usage.billable.metrics` {#datadogestimated-usagebillablemetrics}

* **それが表すもの:** インデックスされたポイント数が月初来で 100 を超えるメトリクス名のカウント。
* **回答される請求に関する質問:** 今月これまでに請求対象となるメトリクスはいくつあるか。

{{< img src="/metrics/guide/metric_name_pricing_experience/mnp_eum_billable_metrics_example_09012026.png" alt="月初来の請求対象メトリクスの数を示す例" >}}

#### `datadog.estimated_usage.billable.points` {#datadogestimated-usagebillablepoints}

* **それが表すもの:** 月初来のメトリクス名あたり 1000 万ポイントを超えるインデックスされたポイントの合計数。
* **回答される請求に関する質問:**
  * 今月これまでに請求対象となるインデックスポイントボリュームの合計はどれくらいか。
  * どのメトリクスが請求対象インデックスポイントボリュームに寄与しており、その量はどれくらいか。

{{< img src="/metrics/guide/metric_name_pricing_experience/mnp_eum_billable_points_example_08042026.png" alt="月初来の請求対象インデックスポイントボリュームの合計を示す例" >}}

{{< img src="/metrics/guide/metric_name_pricing_experience/mnp_eum_billable_points_bymetric_example_08042026.png" alt="メトリクス別に内訳を表示した請求対象インデックスポイントボリュームの例" >}}

#### `datadog.estimated_usage.metrics.points.ratio` {#datadogestimated-usagemetricspointsratio}

* **それが表すもの:** 取り込まれたポイント数合計とインデックスポイント合計数の比較。
* **回答される請求に関する質問:** 取り込まれたポイント数とインデックスポイント数の比率はどのくらいか。

{{< img src="/metrics/guide/metric_name_pricing_experience/mnp_eum_points_ratio_example_08042026.png" alt="取り込まれたポイント数とインデックスポイント数の比率を示す例" >}}

### ポイントボリューム使用量メトリクス {#points-volume-usage-metrics}

より細かい分析を行うには、以下のリアルタイムおよび時間単位のメトリクスを使用します。

| メトリクス | それが表すもの |
|--------|-------------------|
| `datadog.estimated_usage.metrics.points.indexed` | 60 分間のローリングウィンドウ内の推定インデックスされたカスタムメトリクスポイントの数。|
| `datadog.estimated_usage.metrics.points.indexed.by_tag` | 使用量帰属タグで分類された、60 分間のローリングウィンドウ内の推定インデックスカスタムメトリクスポイント数。|
| `datadog.estimated_usage.metrics.points.indexed.hourly` | 月初来の累積計算のために毎時提出されるインデックスされたカスタムメトリクスポイントの推定総数。|
| `datadog.estimated_usage.metrics.points.ingested` | 60 分間のローリングウィンドウ内の取り込まれたカスタムメトリクスポイントの推定数。|
| `datadog.estimated_usage.metrics.points.ingested.hourly` | 月初来の累積計算のために毎時提出される取り込まれたカスタムメトリクスポイントの推定総数。|

詳細については、[推定使用量メトリクス][6]を参照してください。

## メトリクス使用量の管理 {#managing-your-metric-usage}

メトリクス名の料金の下で使用量を最適化するには、以下のツールを使用します。

- **メトリクス名**: 使用されていない、または不要なカスタムメトリクスが Datadog に送信されないように、[エージェント側フィルタリング][9]を使用して、請求可能なメトリクス名の数を減らします。
- **インデックスされたポイントおよび取り込まれたポイント**: メトリクスごとにタグの許可リストまたはブロックリストを構成するには [Metrics without Limits™][2] を使用し、メトリクスグループ全体にわたって組織全体のタグ構成を適用するには[タグインデックスルール][10]を使用して、インデックスポイントのボリュームとメトリクスごとの超過を減らします。

## トラブルシューティング {#troubleshooting}

技術的な質問については、[Datadog サポートチーム][7]にお問い合わせください。

請求に関する質問については、[カスタマーサクセス][8]マネージャーにお問い合わせください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/billing/metric_name_pricing/
[2]: /ja/metrics/metrics-without-limits/
[3]: https://app.datadoghq.com/metric/summary
[4]: https://app.datadoghq.com/metric/volume
[5]: https://app.datadoghq.com/billing/usage
[6]: /ja/account_management/billing/usage_metrics/
[7]: /ja/help/
[8]: mailto:success@datadoghq.com
[9]: /ja/metrics/guide/agent-filtering-for-custom-metrics/
[10]: /ja/metrics/guide/tag-indexing-rules/