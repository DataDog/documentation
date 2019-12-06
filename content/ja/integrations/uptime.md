---
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - os & system
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/uptime/README.md'
display_name: アップタイム
git_integration_title: uptime
guid: 5da2ddb8-ecf7-4971-a3ee-e42752efc1f5
integration_id: uptime
integration_title: アップタイム
is_public: true
kind: integration
maintainer: jeremy-lq
manifest_version: 1.0.0
metric_prefix: uptime
metric_to_check: uptime.response_time
name: uptime
public_title: Datadog-Uptime インテグレーション
short_description: アップタイムとパフォーマンスの監視を簡単に実行
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

アプリからイベントとメトリクスをリアルタイムに取得して、以下のことができます。

* ダウンタイムや中断を追跡および通知できます。
* Synthetic リクエストの応答時間メトリクスを視覚化できます。

![Uptime.com のグラフ][1]

## セットアップ

### コンフィグレーション

Uptime アカウント内で Datadog のインテグレーションを有効にするには、[Alerting > Push Notifications][2] に移動し、新しいプッシュ通知プロファイルを追加する際にプロバイダータイプとして Datadog を選択します。

以下は、Uptime アカウント内で Datadog を構成する際に表示されるフィールドです。

* Name: Datadog プロファイルに割り当てる参照名。Uptime アカウント内で複数のプロバイダープロファイルを整理するために役立ちます。

* API key: <span class="hidden-api-key">${api_key}</span>

* Application Key: <span class="app_key" data-name="uptime"></span>

<li>Datadog プロファイルの構成が完了したら、プロファイルを Alerting > Contacts に置かれている連絡先グループに割り当てる必要があります。プロファイルは、連絡先グループ内の Push Notifications フィールドで割り当てられます。</li>
</ul>

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
[2]: https://uptime.com/push-notifications/manage
[3]: https://github.com/DataDog/integrations-extras/blob/master/uptime/metadata.csv
[4]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}