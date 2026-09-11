---
aliases:
- /ja/continuous_integration/dora_metrics
- /ja/dora_metrics/
description: DORA Metrics を使用して組織のソフトウェアデリバリープロセスを測定および改善する方法を学びます。
further_reading:
- link: /delivery_performance/dora_metrics/calculation/
  tag: ドキュメント
  text: Datadog での DORA Metrics の計算方法について
- link: /continuous_delivery/deployments
  tag: ドキュメント
  text: Deployment Visibility について
- link: /events
  tag: ドキュメント
  text: Event Management について
- link: /monitors/types/metric
  tag: ドキュメント
  text: メトリクスモニターについて
- link: /catalog
  tag: ドキュメント
  text: カタログについて
- link: https://www.datadoghq.com/blog/platform-engineering-metrics/
  tag: ブログ
  text: プラットフォームエンジニアリングチームのための成功メトリクス
- link: https://www.datadoghq.com/blog/dora-metrics-software-delivery/
  tag: ブログ
  text: DORA Metrics を活用してソフトウェアデリバリーを改善するためのベストプラクティス
- link: https://www.datadoghq.com/blog/datadog-dora-metrics/
  tag: ブログ
  text: Datadog DORA Metrics でソフトウェアデリバリーの成功を促進する 3 つの方法
- link: https://www.datadoghq.com/blog/devsecops-2026-study-learnings
  tag: ブログ
  text: 2026 年版 State of DevSecOps 調査の主なポイント
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: リリースノート
  text: Software Delivery の最新リリースをチェック！(アプリログインが必要です)
is_beta: true
title: DORA Metrics
---
## 概要 {#overview}

DevOps Research and Assessment (DORA) Metricsは、ソフトウェア開発の速度と安定性を示す [4 つの主要なメトリクス][1]です。

デプロイ頻度
: 組織が本番環境へのリリースを成功させる頻度。

変更リードタイム
: コミットが本番環境に反映されるまでにかかる時間。

変更障害率
: 失敗して即時の介入が必要となるデプロイの割合。

デプロイ失敗からの復旧時間
: 失敗して即時の介入が必要となるデプロイから復旧するまでにかかる時間。

DORA Metrics を定義および追跡することで、チームや組織のソフトウェアデリバリーのスピードと品質における改善領域を特定できます。

## DORA Metrics のセットアップ{#set-up-dora-metrics}

デプロイイベントを Datadog に送信するためのデータソースの設定を開始するには、[セットアップドキュメント][2]を参照してください。

## DORA Metrics の分析{#analyze-dora-metrics}

デプロイイベントのデータソースをセットアップした後、[{{< ui >}}Software Delivery{{< /ui >}} > {{< ui >}}Delivery Performance{{< /ui >}} > {{< ui >}}DORA Metrics{{< /ui >}}][4] に移動して、各メトリクスの改善点や回帰を特定します。また、チーム、サービス、リポジトリ、環境、期間、および[カスタムタグ][8]でメトリクスを集計し、経時的な傾向を比較することもできます。

{{< img src="delivery_performance/dora_metrics/dora_ui_3.png" alt="Language カスタムタグでフィルタリングされた DORA Metrics の計算の概要" style="width:100%;" >}}

{{< ui >}}View Deployments{{< /ui >}} をクリックすると、デプロイイベントのリストを示す新しいタブが開きます。

{{< img src="delivery_performance/dora_metrics/deployments_list.png" alt="[Deployments Breakdown] にメトリクスの内訳と関連イベントのリストを表示" style="width:100%;" >}}

{{< ui >}}View Change Failures{{< /ui >}} をクリックすると、変更障害としてマークされたデプロイイベントのリストを示すサイドパネルが開きます。

{{< img src="delivery_performance/dora_metrics/change_failures_list.png" alt="[Change Failures Breakdown] にメトリクスの内訳と関連イベントのリストを表示" style="width:100%;" >}}

## DORA Metrics データの使用{#use-dora-metrics-data}

### DORA Metrics ウィジェットのエクスポート{#export-dora-metrics-widgets}
視覚化ウィジェットをダッシュボードやノートブックにエクスポートします。

いずれの視覚化も {{< ui >}}Export{{< /ui >}} アイコンをクリックしてダッシュボードやノートブックに追加できます。DORA Metrics によって計算されるメトリクスの詳細については、[データ収集に関するドキュメント][3]を参照してください。

### カスタムダッシュボードの作成{#create-custom-dashboards}

DORA Metrics を使用してカスタムダッシュボードを構築し、コミットやプルリクエストから本番環境へのデプロイに至るまで、デリバリーワークフローをエンドツーエンドで分析します。たとえば、チーム間のコードレビューパフォーマンスを比較して、承認の遅れによってどのチームが停滞しているかを特定し、ワークフローの改善においてどこに優先して投資すべきかを調べます。

{{< img src="delivery_performance/dora_metrics/dashboard.png" alt="DORA Metrics のカスタムダッシュボードの例" style="width:100%;" >}}

ダッシュボードやグラフ内では、カスタムタグは[属性][7]として扱われます。カスタムタグでフィルタリングまたはグループ化するには、そのタグに `@` 記号を付ける必要があります。

{{< img src="delivery_performance/dora_metrics/graph_with_custom_tag.png" alt="カスタムタグでグループ化された DORA Metrics のカスタムグラフの例" style="width:100%;" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/knowledge-center/dora-metrics/
[2]: /ja/delivery_performance/dora_metrics/setup/
[3]: /ja/delivery_performance/dora_metrics/data_collected/
[4]: https://app.datadoghq.com/ci/dora
[5]: /ja/monitors/types/metric/?tab=threshold
[6]: /ja/monitors/
[7]: /ja/dashboards/guide/quick-graphs/#graphing-events
[8]: /ja/delivery_performance/dora_metrics/data_collected/#custom-tags