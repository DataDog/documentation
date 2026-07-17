---
app_id: neoload
categories:
- notifications
- testing
custom_kind: integration
description: NeoLoad によるパフォーマンステスト結果のモニタリングと分析
integration_version: 1.0.0
media:
- caption: NeoLoad パフォーマンステストダッシュボード
  image_url: images/neoload-dashboard.png
  media_type: image
supported_os:
- linux
- windows
- macos
title: NeoLoad
---
## 概要

[Tricentis NeoLoad](https://www.tricentis.com/products/performance-testing-neoload) simplifies and scales performance testing for APIs and microservices, as well as end-to-end application testing through protocol and browser-based capabilities.

NeoLoad インテグレーションを使用すると、NeoLoad テストのパフォーマンスメトリクスを追跡して次のことができます。

- アプリケーションの性能と NeoLoad の負荷試験メトリクスを関連付けることができます。
- Analyze and visualize NeoLoad metrics in Datadog like throughput, errors, and performance using the out-of-the-box dashboard or [Metrics Explorer](https://docs.datadoghq.com/metrics/explorer).

## セットアップ

### 設定

For detailed instructions on NeoLoad configuration, follow the [NeoLoad documentation](https://documentation.tricentis.com/neoload/latest/en/content/reference_guide/datadog.htm). Since NeoLoad version 9.1, you can choose which metrics to send in the **Push Counters** configuration of the Datadog Connector in NeoLoad.

デフォルトの NeoLoad ダッシュボードをダッシュボードリストに追加するには、Datadog で NeoLoad インテグレーションをインストールします。

## 収集データ

### メトリクス

| | |
| --- | --- |
| **NeoLoad.Controller.User.Load** <br>(count) | Number of Virtual Users running during a NeoLoad test<br>_Shown as user_ |
| **NeoLoad.Controller.Throughput** <br>(count) | Throughput during a NeoLoad test<br>_Shown as megabyte_ |
| **NeoLoad.Request.PerSecond** <br>(rate) | Number of HTTP requests sent per second during a NeoLoad test<br>_Shown as request_ |
| **NeoLoad.Transaction.PerSecond** <br>(rate) | Number of Transactions completed per second during a NeoLoad test<br>_Shown as transaction_ |
| **NeoLoad.Request.Errors** <br>(count) | Number of errors during a NeoLoad test<br>_Shown as error_ |

### イベント

All NeoLoad performance tests events are sent to your [Datadog Events Explorer](https://docs.datadoghq.com/events/).
NeoLoad sends events to the Datadog API when a performance test starts and ends.
Set the option in the **Push Counters** configuration of the Datadog Connector in NeoLoad. Available since NeoLoad 9.1.

## トラブルシューティング

Need help? Contact [Datadog support](https://docs.datadoghq.com/help/) or [Tricentis NeoLoad support](https://support-hub.tricentis.com/).