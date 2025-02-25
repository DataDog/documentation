---
app_id: uptime
app_uuid: 937f96ea-644f-4903-9f74-cdc5e8b46dd8
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: uptime.response_time
      metadata_path: metadata.csv
      prefix: uptime
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10001
    source_type_name: Uptime
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Uptime
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- notifications
- metrics
- event management
- os & system
- testing
custom_kind: インテグレーション
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
  - Category::Notifications
  - Category::Metrics
  - Category::Event Management
  - Category::OS とシステム
  - Category::Testing
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: アップタイムとパフォーマンスの監視を容易に実行
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Uptime.com
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Uptime.com は、Web アプリケーションや API に対してリアルタイムアラートと詳細なパフォーマンス分析を提供する、包括的な Web サイトモニタリングサービスです。

Uptime.com と Datadog を連携させることで、Uptime.com のモニタリングを Datadog プラットフォームと組み合わせ、モニタリング機能を強化できます。主な機能は以下のとおりです。

- Uptime.com のアラートは、自動的に Datadog 上で対応するイベントを生成します。
- Datadog のイベントは、低い優先度を割り当てたり、追跡のためにコメントを残したりできます。
- 応答時間のチェックは、Datadog のメトリクスとして追跡されます。
- メトリクスは 1 分間隔のチェックで得られる 5 つのデータポイントを基に、5 分ごとに更新されます。

この連携により、パフォーマンスの問題を事前に発見・解決し、ダウンタイムを最小限に抑えながら、サイト全体の信頼性を向上させることができます。

![Uptime.com のグラフ][1]

## セットアップ

### 構成

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

### サービスチェック

Uptime チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/uptime/images/snapshot.png
[2]: https://uptime.com/integrations/manage/
[3]: https://github.com/DataDog/integrations-extras/blob/master/uptime/metadata.csv
[4]: https://docs.datadoghq.com/ja/help/