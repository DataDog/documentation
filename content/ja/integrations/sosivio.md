---
app_id: sosivio
app_uuid: d98f7912-e5a3-48bc-b63e-612d835bf6b4
assets:
  dashboards:
    sosivio_overview.json: ./assets/dashboards/sosivio_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: sosivio.healthchecks
      metadata_path: metadata.csv
      prefix: sosivio.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10285
    source_type_name: Sosivio
author:
  homepage: https://www.sosiv.io
  name: Sosivio
  sales_email: sales@sosiv.io
  support_email: support@sosiv.io
categories:
- アラート設定
- コンテナ
- kubernetes
- ネットワーク
- notifications
- orchestration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/sosivio/README.md
display_on_public_website: true
draft: false
git_integration_title: sosivio
integration_id: sosivio
integration_title: Sosivio
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: sosivio
public_title: Sosivio
short_description: 手に入れるのは、データではなく答え。Kubernetes の予測型トラブルシューティング。
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Alerting
  - Category::Containers
  - Category::Kubernetes
  - Category::Network
  - Category::Notifications
  - Category::Orchestration
  - Supported OS::Linux
  configuration: README.md#Setup
  description: 手に入れるのは、データではなく答え。Kubernetes の予測型トラブルシューティング。
  media:
  - caption: Datadog の Sosivios ダッシュボード
    image_url: images/datadog-sosivio-dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Sosivio
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Sosivio は、Kubernetes 環境とアプリケーションに特化して構築された予測型トラブルシューティングプラットフォームです。Sosivio は、Kubernetes 環境におけるあらゆる障害に対して、予測型トラブルシューティングツール、根本原因の特定、および即時の修復を提供します。リアルタイムメトリクスとクラスターのヘルスチェックにより、Kubernetes のすべてのフレーバーの観測を即座に開始し、無駄のない AI を使用して重大な障害を事前に予測・防止します。

Sosivio の Datadog インテグレーションにより、ユーザーは Sosivio の障害アラートを Datadog のダッシュボードで直接確認し、Sosivio UI に即座にリダイレクトして障害を修復できます (Sosivio Premium ライセンスが必要です)。また、Datadog のシグナルに Sosivio の根本原因を特定するためのコンテキストを追加することができます。

## 計画と使用

Sosivio のアカウントをお持ちでない方は、[アカウントを作成][1]し、弊社のウェブサイトから直接 Sosivio Premium の 4 週間の無料トライアルにお申し込みください (クレジットカードは必要ありません)。4 週間のトライアル終了後、ライセンスは Sosivio Community Version に変換され、永久に無料となります。アカウントのセットアップが完了したら、Datadog で Sosivio インテグレーションを使い始めることができます。


Sosivio は、製品に必要なすべてのコンポーネントを作成する 1 つのネームスペース ("sosivio" と表示) の下にインストールされます。


### インフラストラクチャーリスト

1. Sosivio Dashboard Configuration ページで、[Datadog API キー][2]と Datadog URL (デフォルトの datadoghq.com サイトでない場合) を追加してください。詳しくは、[Datadog サイト][3]を参照してください。
2. **Install** をクリックします。

詳細については、[Sosivio のドキュメント][4]を参照してください。

## Agent

ヘルプが必要ですか？[Datadog サポート][5]または [Sosivio][6]にご連絡ください。


[1]: https://www.sosiv.io/try-sosivio
[2]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#add-an-api-key-or-client-token
[3]: https://docs.datadoghq.com/ja/getting_started/site/
[4]: https://docs.sosiv.io
[5]: https://docs.datadoghq.com/ja/help/
[6]: mailto:info@sosiv.io