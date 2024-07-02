---
title: プライベート ロケーション モニタリング
kind: ドキュメント
description: プライベートロケーションを監視する
aliases:
- /synthetics/private_locations/monitoring
further_reading:
- link: getting_started/incident_management/
  tag: ドキュメント
  text: プライベートロケーションの概要
- link: synthetics/private_locations/dimensioning
  tag: ドキュメント
  text: プライベートロケーションのディメンション
- link: agent/
  tag: ドキュメント
  text: Datadog Agent をインストールする
---

## 概要

プライベートロケーションでは、すぐに使える[メトリクス][1]のセットがあり、プライベートロケーションの健康状態を高いレベルで把握することができます。これらのメトリクスは、[Settings][2] ページの各プライベートロケーションのサイドパネルで可視化したり、[ダッシュボード][3]でこれらのメトリクスをグラフ化したりすることができます。

{{<img src="synthetics/private_locations/pl_monitoring_table_reporting_1.png" alt="Private location monitor list" style="width:100%;">}}

[**Synthetics Settings**][2] の **Private Locations** タブには、プライベートロケーションとそのレポートステータス、モニターステータスが表示されます。

プライベートロケーションをクリックすると、**Health** と **Metadata** の詳細を含むパネルが表示されます。**Health** タブの表には、すべてのレポーティングワーカーと、それらが実行しているイメージバージョンが表示されます。新しいイメージバージョン用にプルする必要があるワーカーの数を把握することができます。

**Monitors** では、プライベートロケーションに何か問題が発生したときに、`ALERT` などのステータス警告を表示することができます。例えば、プライベートロケーションがレポートしなくなった、プライベートロケーションのプロビジョニングが不足した、プライベートロケーションのワーカーが古いバージョンのイメージを実行している、などです。

{{<img src="synthetics/private_locations/pl_monitoring_side_panel.png" alt="Private location monitoring side panel" style="width:100%;">}}

## デフォルトのモニター

プライベートロケーションを作成すると、3 個のモニターが追加されます。

| モニター名                                                                        | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
|-------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **[Synthetic Private Locations] {{location_id.name}} stopped reporting**              | このモニターは、[`synthetics.pl.worker.running`][1] メトリクスがプライベートロケーションの 1 つのデータを報告しなくなると、`NO DATA` アラートをトリガーします。これは、プライベートロケーションのワーカーが強制終了されたか、実行が停止されたことを示します。                                                                                                                                                                                                                                                                                  |
| **[Synthetic Private Locations] {{location_id.name}} is underprovisioned**            | このモニターは、[`synthetics.pl.worker.remaining_slots`][1] メトリクスが 30 分間の平均で 1.5 以下になると `ALERT` をトリガーします。これは、プライベートロケーションのプロビジョニングが不十分であることを示します。プライベートロケーションに割り当てられたすべてのテストを実行するのに十分なリソースがあることを確認するために、[プライベートロケーションを垂直または水平にスケール][4]してください。                                                                                                                                                      |
| **[Synthetic Private Locations] {{location_id.name}} uses an outdated image version** | このモニターは、プライベートロケーションの 1 つで [`synthetics.pl.worker.outdated`][1] メトリクスが `1` を報告し始めると、`ALERT` をトリガーします。これは、少なくとも 1 つのプライベートロケーションワーカーで、古いバージョンのプライベートロケーションイメージが実行されていることを示しています。[Google Container Registry][5] または [Windows Installer List][8] で最新バージョンのイメージを確認し、`datadog/synthetics-private-location-worker` イメージを `latest` タグでプルして、ワーカーをそのイメージバージョンにアップグレードしてください。 |

デフォルトでは、これらのモニターにハンドルは設定されていません。モニターの 1 つが故障し始めた場合に警告を受けるには、モニターの [Notification セクション][6]にハンドルを追加してください。

**Monitors** タブのモニターは、プライベートロケーション ID に対応するグループを持っているか、`location_id:<ID_OF_THE_PL>` というタグが付けられています。

## Datadog Agent でプライベートロケーションを監視する

Datadog では、すぐに使えるプライベートロケーションのメトリクスに加え、[Datadog Agent][7] をプライベートロケーションと一緒にインストールすることを推奨しています。

[Datadog Agent][7] は、基盤となるワーカーのヘルスメトリクス (メモリ使用量、制限、CPU、ディスクなど) を提供することで、プライベートロケーションを詳細に可視化することができます。これらのメトリクスを使用してグラフを作成し、リソースが少ない場合にアラートを設定することができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /synthetics/metrics/
[2]: https://app.datadoghq.com/synthetics/settings/private-locations
[3]: /dashboards/
[4]: /synthetics/private_locations/dimensioning
[5]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/synthetics-private-location-worker
[6]: /monitors/notify/
[7]: /agent/
[8]: https://ddsynthetics-windows.s3.amazonaws.com/installers.json