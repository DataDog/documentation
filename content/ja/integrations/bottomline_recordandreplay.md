---
app_id: bottomline-recordandreplay
app_uuid: d87fbcfa-71db-4d62-8264-5d88ba2338ce
assets:
  dashboards:
    Bottomline Record and Replay Overview: assets/dashboards/bottomline_activity_overview.json
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: datadog.marketplace.bottomline.mainframe.activity.usr.id.count
      metadata_path: metadata.csv
      prefix: bottomline.mainframe.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Bottomline Mainframe
  monitors:
    Mainframe resource taking long time to respond: assets/monitors/bottomline_mainframe_resource_has_problem.json
author:
  homepage: https://www.bottomline.com/
  name: Bottomline Technologies
  sales_email: partner.cfrm@bottomline.com
  support_email: partner.cfrm@bottomline.com
  vendor_id: bottomline
categories:
- mainframe
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/bottomline_recordandreplay/README.md
display_on_public_website: true
draft: false
git_integration_title: bottomline_recordandreplay
integration_id: bottomline-recordandreplay
integration_title: 'Bottomline の Record and Replay: Mainframe'
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: bottomline_recordandreplay
public_title: 'Bottomline の Record and Replay: Mainframe'
short_description: ネットワークトラフィックを利用して 3270/5250 Mainframe のユーザーとリソースを監視する
supported_os:
- linux
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Mainframe
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  configuration: README.md#Setup
  description: ネットワークトラフィックを利用して 3270/5250 Mainframe のユーザーとリソースを監視する
  media:
  - caption: Mainframe Record and Replay ユーザーセッション
    image_url: images/mainframe_replay.png
    media_type: image
  - caption: Mainframe Record and Replay ダッシュボード
    image_url: images/bt_dashboard.png
    media_type: image
  - caption: Mainframe Record and Replay 概要
    image_url: images/bt_replay.png
    media_type: image
  - caption: Mainframe Record and Replay アーキテクチャ
    image_url: images/bt_architecture.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: 'Bottomline の Record and Replay: Mainframe'
---



## 概要

Bottomline の Mainframe Record and Replay ソリューションは、ネットワークトラフィックを介して 3270/5250 ユーザーを非侵襲的に監視し、顧客がユーザーとシステムを監視するのに役立ちます。

このインテグレーションにより、Datadog で Bottomline の Record and Replay セッションを監視し、リソース使用率、リソースパフォーマンス、ユーザーアクティビティ、セキュリティイベント、およびシステムモニターの可視性を提供することができます。また、お客様は Datadog を通じてユーザーセッションの再生に直接アクセスすることができます。

### アラート設定

このインテグレーションには、Mainframe Resource に問題が発生した場合に報告するモニターが含まれています。

### メトリクス

このチェックによって提供されるメトリクスのリストについては、[metadata.csv][1] を参照してください。

### ダッシュボード  

**Bottomline Record and Replay 概要**: このダッシュボードでは、どのようなリソースが使用されているか、リソースのパフォーマンス、ユーザーアクティビティ、セキュリティイベント、システムモニターを可視化することができます。

## セットアップ

以下のステップバイステップの手順に従って、このチェックをインストールし、ホストで実行中の Agent に対して構成します。

### 前提条件

このインテグレーションを意図したとおりに実行するためには、次の項目が必要です。
  - Datadog Agent がインストールされ、実行されている必要があります。
  - Bottomline の Record and Replay をインストールし、Datadog Agent の構成を変更するための、Datadog Agent が実行しているサーバーへのアクセス。
  - サポートされているデータベース (Oracle または Postgres)。
  - Record and Replay を構成するための Bottomline の Enterprise Manager をインストールするための Windows デスクトップ。


### セットアップ

Bottomline をまだご利用でないお客様は、[Bottomline の Marketplace の出品][2]にアクセスしてライセンスを購入してください。

[こちら][3]の手順に従い、インテグレーションをインストールしてください。

## サポート
サポートや機能のリクエストは、[Bottomline][4] にお問い合わせください。


[1]: https://github.com/DataDog/integrations-extras/blob/master/bottomline_recordandreplay/metadata.csv
[2]: https://app.datadoghq.com/marketplace/app/bottomline-mainframe
[3]: https://github.com/nbk96f1/datadog/tree/main/Documentation
[4]: mailto:partner.cfrm@bottomline.com