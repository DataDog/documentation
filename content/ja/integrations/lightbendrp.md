---
categories:
- cloud
dependencies: []
description: Akka ベースのアプリケーションのアクターおよびディスパッチャーイベントを追跡
doc_link: https://docs.datadoghq.com/integrations/lightbendrp/
draft: false
git_integration_title: lightbendrp
has_logo: true
integration_id: lightbendrp
integration_title: Lightbend
integration_version: ''
is_public: true
manifest_version: '1.0'
name: lightbendrp
public_title: Datadog-Lightbend インテグレーション
short_description: Akka ベースのアプリケーションのアクターおよびディスパッチャーイベントを追跡
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/lightbendrp/dashboard_lightbendrp.png" alt="Lightbend Reactive Platform ダッシュボード" popup="true">}}

## 概要

[Lightbend Reactive Platform アプリケーション][1]からリアルタイムにメトリクスを取得して、以下のことができます。

- アクターのパフォーマンスメトリクスを視覚化できます。
- 予期せぬイベント (例外、未処理のメッセージ、デッドレターなど) を追跡できます。
- アプリケーションのリモート特性について詳細を把握できます。
- ディスパッチャーメトリクスを掘り下げてアプリケーションパフォーマンスを調整できます。

## セットアップ

### インストール

このインテグレーションは Lightbend Monitoring を使用しますが、これには[サブスクリプション][2]が必要です。

Lightbend Monitoring と Datadog を統合する最も簡単な方法は、[Datadog プラグイン][3]を使用することです。

デフォルトでは、Lightbend Monitoring はネットワーク経由ですべてのメトリクスを送信しますが、構成を設定することで、報告されるフィールドを制限することができます (下の例を参照)。

Datadog プラグインはデフォルト構成を使用しますが、これは上書きできます。

```text
cinnamon.datadog {
  statsd {
    host = "192.168.0.1"
    port = 8888
    frequency = 60s
  }

  report {
    histogram = ["min", "max", "p98", "p99", "p999"]
  }
}
```

構成値について説明します。

- `cinnamon.datadog.statsd.host`: DogStatsD インスタンスの IP アドレス。
- `cinnamon.datadog.statsd.port`: DogStatsD インスタンスのポート番号。
- `cinnamon.datadog.statsd.frequency`: Cinnamon から DogStatsD インスタンスにデータをプッシュする頻度。
- `cinnamon.datadog.report.histogram`: DogStatsD に送信するヒストグラムデータを絞り込む方法。上の例では、`max` と `p99` だけが送信されます。

構成の詳細については、[Lightbend Monitoring のドキュメント][4]を参照してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "lightbendrp" >}}


### イベント

Lightbend Reactive Platform インテグレーションには、イベントは含まれません。

### サービスのチェック

Lightbend Reactive Platform インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

[1]: https://www.lightbend.com/platform
[2]: https://www.lightbend.com/platform/subscription
[3]: https://developer.lightbend.com/docs/monitoring/2.3.x/plugins/datadog/datadog.html
[4]: https://developer.lightbend.com/docs/monitoring/2.3.x/home.html
[5]: https://github.com/DataDog/dogweb/blob/prod/integration/lightbendrp/lightbendrp_metadata.csv
[6]: https://docs.datadoghq.com/ja/help/