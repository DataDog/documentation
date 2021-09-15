---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - os & system
creates_events: true
ddtype: crawler
dependencies:
  - https://github.com/DataDog/integrations-extras/blob/master/uptime/README.md
display_name: Uptime
draft: false
git_integration_title: uptime
guid: 5da2ddb8-ecf7-4971-a3ee-e42752efc1f5
integration_id: uptime
integration_title: Uptime
is_public: true
kind: インテグレーション
maintainer: jeremy-lq
manifest_version: 1.0.0
metric_prefix: uptime
metric_to_check: uptime.response_time
name: uptime
public_title: Datadog-Uptime インテグレーション
short_description: アップタイムとパフォーマンスの監視を容易に実行
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

アプリからイベントとメトリクスをリアルタイムに取得して、以下のことができます。

- ダウンタイムや中断を追跡および通知できます。
- Synthetic リクエストの応答時間メトリクスを視覚化できます。

![Uptime.com のグラフ][1]

## セットアップ

### コンフィギュレーション

Uptime アカウント内で Datadog のインテグレーションを有効にするには、[Notifications > Integrations][2] に移動し、新しいプッシュ通知プロファイルを追加する際にプロバイダータイプとして Datadog を選択します。

下記は、Uptime アカウントで Datadog を構成する際に表示されるフィールドです。
shell
- Name: Datadog プロファイルに割り当てる参照名。Uptime アカウント内で複数のプロバイダープロファイルを整理するために役立ちます。

- API キー: <span class="hidden-api-key">\${api_key}</span>

- Application Key: <span class="app_key" data-name="uptime"></span>

Datadog プロファイルの構成が完了したら、Alerting > Contacts にある連絡先グループにプロファイルを割り当てる必要があります。プロファイルは、連絡先グループの Push Notifications フィールドに割り当てます。

## 収集データ

### メトリクス
{{< get-metrics-from-git "uptime" >}}


### イベント

Uptime インテグレーションは、アラートが発生または解決したときに、Datadog のイベントストリームにイベントを送信します。

### サービスのチェック

Uptime チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/uptime/images/snapshot.png
[2]: https://uptime.com/integrations/manage/
[3]: https://github.com/DataDog/integrations-extras/blob/master/uptime/metadata.csv
[4]: https://docs.datadoghq.com/ja/help/