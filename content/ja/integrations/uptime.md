---
app_id: uptime
app_uuid: 937f96ea-644f-4903-9f74-cdc5e8b46dd8
assets:
  integration:
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: uptime.response_time
      metadata_path: metadata.csv
      prefix: uptime
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Uptime
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Uptime
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- notification
- os & system
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/uptime/README.md
display_on_public_website: true
draft: false
git_integration_title: uptime
integration_id: uptime
integration_title: Uptime.com
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: uptime
public_title: Uptime.com
short_description: アップタイムとパフォーマンスの監視を容易に実行
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::通知
  - Category::OS とシステム
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: アップタイムとパフォーマンスの監視を容易に実行
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Uptime.com
---



## 概要

アプリからイベントとメトリクスをリアルタイムに取得して、以下のことができます。

- ダウンタイムや中断を追跡および通知できます。
- Synthetic リクエストの応答時間メトリクスを視覚化できます。

![Uptime.com のグラフ][1]

## セットアップ

### コンフィギュレーション

Uptime アカウント内で Datadog インテグレーションを有効にするには、[Notifications > Integrations][2] に移動し、新しいプッシュ通知プロファイルを追加する際にプロバイダータイプとして Datadog を選択します。

下記は、Uptime アカウントで Datadog を構成する際に表示されるフィールドです。
shell
- Name: Datadog プロファイルに割り当てる参照名。Uptime アカウント内で複数のプロバイダープロファイルを整理するために役立ちます。

- API キー: <span class="hidden-api-key">\${api_key}</span>

- Application Key: <span class="app_key" data-name="uptime"></span>

Datadog プロファイルの構成が完了したら、_Alerting > Contacts_ にある連絡先グループにプロファイルを割り当てます。プロファイルは、連絡先グループの **Push Notifications** フィールドに割り当てます。

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