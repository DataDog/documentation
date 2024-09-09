---
app_id: vercel
app_uuid: 3ee4a2db-aea9-4663-93a9-d5758f71ba9d
assets:
  dashboards:
    Vercel: assets/dashboards/vercel_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: vercel.requests
      metadata_path: metadata.csv
      prefix: vercel.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10213
    source_type_name: Vercel
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Datadog
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- クラウド
- 構成 & デプロイ
- ネットワーク
- プロビジョニング
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/vercel/README.md
display_on_public_website: true
draft: false
git_integration_title: vercel
integration_id: vercel
integration_title: Vercel
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: vercel
public_title: Vercel
short_description: Vercel で実行中のサーバーレスアプリケーションを監視する
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Configuration & Deployment
  - Category::Network
  - Category::Provisioning
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Vercel で実行中のサーバーレスアプリケーションを監視する
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Vercel
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


![Datadog インテグレーション][1]

## 概要

[Vercel][2] は、フロントエンド開発者が高性能のウェブサイトやアプリケーションを構築するためのデプロイおよびコラボレーションプラットフォームです。Vercel は 2016 年に Google や Facebook のエンジニアと共同開発した React フレームワーク「Next.js」の生みの親でもあります。Vercel のユーザーはビルドやレンダリングのプロセスを管理する内蔵のデプロイツールや、サイトをキャッシュして高速検索できる独自の [Edge Network][3] を活用できます。さらに、Vercel は[サーバーレス関数][4]に対応しており、ユーザー認証、フォーム送信、データベースクエリなどバックエンドで不可欠な処理を実現するサーバーレスコードをデプロイすることもできます。

Vercel を Datadog と統合すると、以下のことができます。

- [Datadog のログ管理機能][5]を使用してアプリケーションのログを表示・解析
- Vercel 上で動作しているサーバーレスアプリケーションや API へのリクエスト数および 4xx/5xx  HTTPエラー数の確認
- [Datadog Synthetics][6] によるフロントエンドのパフォーマンス監視

## セットアップ

- [Vercel インテグレーションの構成][7]

## 収集データ

### メトリクス

Vercel インテグレーションには、メトリクスは含まれません。

### サービスチェック

Vercel インテグレーションには、サービスのチェック機能は含まれません。

### イベント

Vercel インテグレーションには、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/vercel/images/logo-full-black.png
[2]: https://vercel.com/
[3]: https://vercel.com/docs/edge-network/overview
[4]: https://vercel.com/docs/serverless-functions/introduction
[5]: /ja/logs/
[6]: /ja/synthetics/
[7]: https://app.datadoghq.com/setup/vercel
[8]: /ja/help/
