---
algolia:
  tags:
  - metric name pricing
  - custom metrics
  - estimated usage metrics
description: Datadogのカスタムメトリクス体験が、メトリクス名の料金を反映するようにどのように更新されたかを学びます。これには、タグの管理モーダル、メトリックサイドパネル、ボリューム管理ページ、プランと使用状況ページ、推定使用メトリクスの変更が含まれます。
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

**注意**: このページが適用されるのは、あなたの組織が[メトリクス名の料金][1]を利用している場合のみです。御社の契約で時系列 (カーディナリティ) 価格設定が使用されている場合、メトリクスエクスペリエンスは変わりません。

## 変更の概要 {#summary-of-changes}

| 機能 | 説明 |
|---------|-------------|
| [タグ管理モーダル](#manage-tags-modal) | タグ変更の影響をカーディナリティボリュームではなくポイントボリュームに基づいて推定します。|
| [メトリックサイドパネル](#metric-side-panel) | は、時系列ボリュームではなく、取り込まれたポイントボリュームとインデックスされたポイントボリュームを表示します。|
| [[Volume Management] (ボリューム管理) ページ](#volume-management-page) | [Volume Overview] (ボリュームの概要) グラフにメトリクス名の料金に対する新しい請求ディメンションが表示されます。|
| [[Plan & Usage] (プランと使用状況) ページ](#plan--usage-page) | メトリクス名の料金の請求内訳を反映します。|
| [推定使用量メトリクス](#estimated-usage-metrics) | 新しいポイントボリュームメトリクスがカーディナリティベースの推定使用量メトリクスに取って代わります。|

## [Manage Tags] (タグ管理) モーダル{#manage-tags-modal}

カスタムメトリクスのタグを設定する際、**[タグ管理] モーダル**は、タグ変更の影響をカーディナリティボリュームではなく**ポイントボリューム**に対して推定します。

{{< img src="metrics/guide/metric_name_pricing_experience/manage-tags-modal.png" alt="使用予測チャートを示す [タグ管理] モーダル。月初からの使用量、現在の構成での使用量、提案された構成での使用量を示す 3 つの線があります。[datacenter] (データセンター) と [service] (サービス) のタグは、[Include tags] (タグを含める) タブで構成されます。" style="width:100%;" >}}

タグの構成に関する詳細は、[Metrics without Limits™][2] を参照してください。

## メトリクスサイドパネル{#metric-side-panel}

メトリック詳細のサイドパネルは、時系列ボリュームではなく、**取り込まれたポイントボリュームとインデックスされたポイントボリューム**を表示します。

メトリクスサイドパネルを開くには、[[Metrics Summary] ページ][3]で任意のメトリクス名をクリックしてください。

{{< img src="metrics/guide/metric_name_pricing_experience/metric-side-panel.png" alt="メトリクス詳細サイドパネル。上部に [INGESTED POINTS] (取り込まれたポイント) と[INDEXED POINTS] (インデックスされたポイント) が、ホストとタグ値と共に表示されています。" style="width:100%;" >}}

## [Volume Management] (ボリューム管理) ページ{#volume-management-page}

[[ボリューム管理] ページ][4]のボリューム概要グラフは、メトリクス名の料金の請求ディメンションを表示します。

- 推定ユニークメトリクス名数
- 請求可能なインデックスされたポイントのボリューム
- 取り込まれたポイントとインデックスされたポイントの比率

{{< img src="metrics/guide/metric_name_pricing_experience/volume-overview-graphs.png" alt="メトリクス名の料金に関する 3 つのボリューム概要グラフ: 推定ユニークメトリクス名数 (インデックスされたポイント数が月初来で 100 を超えるメトリクスのカウント)、推定総ポイント (月初来のメトリクス当たりの割り当てが 10M を超えるインデックスされたポイントの合計数)、および取り込まれたポイントとインデックスされたポイントの推定比率。" style="width:100%;" >}}

## [Plan & Usage] (プランと使用量) ページ{#plan-usage-page}

[[Plan & Usage] ページ][5]は、新しいモデルの組織に対するメトリクス名の料金の請求内訳を反映します。

{{< img src="metrics/guide/metric_name_pricing_experience/plan-usage-page.png" alt="[Plan & Usage Cost Breakdown] (プランと使用状況のコスト内訳) ページ。インデックスされたポイント、取り込まれたポイント、メトリック名が、サマリーテーブルと累積コスト内訳チャートで異なる製品ラインアイテムとして表示されています。" style="width:100%;" >}}

## 推定使用量メトリクス {#estimated-usage-metrics}

Datadog は、メトリクス名の料金の使用量をリアルタイムで監視できるように、推定使用量メトリクスを提供します。これらのメトリクスを使用して、コストの可視性のためにモニターとダッシュボードをセットアップしてください。

<div class="alert alert-warning">カーディナリティに基づく推定使用量メトリクス (<code>datadog.estimated_usage.metrics.custom</code> および関連メトリクス) を、メトリクス名の料金を使用している組織は利用できなくなりました。カーディナリティに基づくメトリクスを使用しているモニター、ダッシュボード、またはその他の資産は、データの受信を停止しました。代わりに、以下に示すポイントボリュームメトリクスを使用してください。</div>

### 請求可能な使用量メトリクス{#billable-usage-metrics}

これらのメトリクスを使用して、月初来の請求可能な使用量を推定してください。

| メトリクス | それが表すもの |
|--------|-------------------|
| `datadog.estimated_usage.billable.metrics` | インデックスされたポイント数が月初来で 100 を超えるメトリクス名のカウント。|
| `datadog.estimated_usage.billable.points` | 月初来のメトリクス名当たり 10M ポイントを超えるインデックスされたポイントの合計数。|
| `datadog.estimated_usage.metrics.points.ratio` | 取り込まれたポイント数合計とインデックスポイント合計数の比較。|

### ポイントボリューム使用量メトリクス{#points-volume-usage-metrics}

より細かい分析を行うには、以下のリアルタイムおよび時間単位のメトリクスを使用します。

| メトリクス | それが表すもの |
|--------|-------------------|
| `datadog.estimated_usage.metrics.points.indexed` | 60 分間のローリングウィンドウ内の推定インデックスされたカスタムメトリクスポイントの数。|
| `datadog.estimated_usage.metrics.points.indexed.by_tag` | 使用量帰属タグで分類された、60 分間のローリングウィンドウ内の推定インデックスカスタムメトリクスポイント数。|
| `datadog.estimated_usage.metrics.points.indexed.hourly` | 月初来の累積計算のために、毎時提出されるインデックスされたカスタムメトリクスポイントの推定総数。|
| `datadog.estimated_usage.metrics.points.ingested` | 60 分間のローリングウィンドウ内の取り込まれたカスタムメトリクスポイントの推定数。|
| `datadog.estimated_usage.metrics.points.ingested.hourly` | 月初来の累積計算のために、毎時提出される取り込まれたカスタムメトリクスポイントの推定総数。|

詳細については、[推定使用量メトリクス][6]を参照してください。

## メトリクス使用量の管理{#managing-your-metric-usage}

メトリクス名の料金の下で使用量を最適化するには、以下のツールを使用します。

- **メトリクス名**: 使用されていない、または不要なカスタムメトリクスが Datadog に送信されないように、[エージェント側フィルタリング][9]を使用して、請求可能なメトリクス名の数を減らします。
- **インデックスされたポイントおよび取り込まれたポイント**: メトリクスごとにタグの許可リストまたはブロックリストを構成するには [Metrics without Limits™][2] を使用し、メトリクスグループ全体にわたって組織全体のタグ構成を適用するには[タグインデックスルール][10]を使用して、インデックスポイントのボリュームとメトリクスごとの超過を減らします。

## トラブルシューティング{#troubleshooting}

技術的な質問については、[Datadog サポートチーム][7]にお問い合わせください。

請求に関するご質問は、[カスタマーサクセス][8]マネージャーにお問い合わせください。

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