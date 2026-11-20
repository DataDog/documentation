---
aliases:
- /ja/continuous_integration/dora_metrics
description: DORA Metrics を活用して、組織のソフトウェアデリバリープロセスを測定し、改善する方法を学びましょう。
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: リリースノート
  text: Software Delivery の最新リリースをチェック！ (アプリログインが必要です)。
- link: https://www.datadoghq.com/blog/dora-metrics-software-delivery/
  tag: ブログ
  text: DORA Metrics を活用してソフトウェアデリバリーを改善するためのベストプラクティス
- link: /continuous_delivery/deployments
  tag: ドキュメント
  text: Deployment Visibility について
- link: /service_management/events
  tag: ドキュメント
  text: Event Management について
- link: /monitors/types/metric
  tag: ドキュメント
  text: Metric Monitors について
- link: /service_catalog
  tag: ドキュメント
  text: サービスカタログについて
is_beta: true
title: DORA メトリクス
---

{{< site-region region="gov" >}}
DORA Metrics は、選択されたサイト ({{< region-param key="dd_site_name" >}}) では現在利用できません。{{< /site-region >}} DORA Metrics は公開ベータ版です。

## 概要

DevOps Research and Assessment (DORA) メトリクスは、ソフトウェア開発の速度と安定性を示す [4 つの主要なメトリクス][1]です。

Deployment frequency
: 組織が本番環境へのリリースを成功させる頻度。

Lead time for changes
: コミットが本番稼動するまでの時間。

Change failure rate
: デプロイメントによって本番環境で障害が発生した割合。

Time to restore service
: 本番稼動中の障害から組織が回復するのにかかる時間。

DORA メトリクスを定義し追跡することで、チームや組織のソフトウェアデリバリのスピードと品質の改善点を特定することができます。

## DORA メトリクスのセットアップ

デプロイおよびインシデントイベントを Datadog に送信するためのデータソースの構成を開始するには、[セットアップドキュメント][2]を参照してください。

## DORA Metrics の分析

デプロイや障害イベントのデータソースをセットアップした後、[**Software Delivery** > **DORA Metrics**][4] に移動し、各メトリクスの改善点や回帰を特定して、サービスや環境ごとに集計し、長期間の傾向を比較します。

{{< img src="dora_metrics/overview_2.png" alt="特定の週における DORA Metrics の計算とインサイトの概要" style="width:100%;" >}}

視覚化されたデータをチーム、サービス、リポジトリ、環境、期間ごとにフィルタリングして分析できます。

**View Deployments** をクリックすると、デプロイメントイベントのリストに加えて、デプロイ頻度と変更リードタイムのメトリクスを表示するサイドパネルが開きます。

{{< img src="dora_metrics/deployments_2.png" alt="DORA メトリクスページの「デプロイメント内訳」サイドパネル。メトリクスの内訳と関連イベントのリストを表示" style="width:100%;" >}}

**View Failures** をクリックすると、障害イベントのリストに加えて、変更失敗率と平均復旧時間 (MTTR) のメトリクスを表示するサイドパネルが開きます。

{{< img src="dora_metrics/failures_2.png" alt="DORA Metrics ページの Failures Breakdown サイドパネル。メトリクスの内訳と関連イベントのリストが表示されている" style="width:100%;" >}}

## DORA Metrics データの活用

視覚化ウィジェットをダッシュボードやノートブックにエクスポートしたり、既存のインシデントに追加したり、[メトリクスモニター][5]を作成してメトリクスのアラートをトリガーできます。

{{< img src="dora_metrics/export_2.png" alt="Export アイコンをクリックして、視覚化ウィジェットをインシデント、ダッシュボード、ノートブックに追加します" style="width:100%;" >}}

任意の視覚化の **Export** アイコンをクリックして、インシデント、ダッシュボード、またはノートブックに追加します。DORA Metrics によって計算されるメトリクスに関する詳細は、[データ収集のドキュメント][3]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/knowledge-center/dora-metrics/
[2]: /ja/dora_metrics/setup/
[3]: /ja/dora_metrics/data_collected/
[4]: https://app.datadoghq.com/ci/dora
[5]: /ja/monitors/types/metric/?tab=threshold
[6]: /ja/monitors/
