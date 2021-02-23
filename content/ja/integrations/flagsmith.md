---
assets:
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - notification
creates_events: true
ddtype: crawler
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/flagsmith/README.md'
display_name: Flagsmith
draft: false
git_integration_title: flagsmith
guid: cb56fcff-3c76-4522-9672-1c3d285728f5
integration_id: flagsmith
integration_title: Flagsmith
is_public: true
kind: インテグレーション
maintainer: support@flagsmith.com
manifest_version: 1.0.0
name: flagsmith
public_title: Flagsmith
short_description: Flagsmith のフラグ変更イベントが Datadog に表示されます
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

[Flagsmith][1] は、Web、モバイル、およびサーバー側のアプリケーション全体の機能管理を容易にします。Datadog Flagsmith インテグレーションにより、Datadog 内でフラグの変更に関する情報を直接表示できるようになります。

すべてのフラグ変更イベントは Datadog に送信されます。これらのイベントは、変更された環境でタグ付けされています。

## セットアップ

[Flagsmith インテグレーションタイル][2]に、[Datadog API キー][3]を入力します。API URL には、米国のサイトを使用している場合は `https://api.datadoghq.com`、EU のサイトを使用している場合は `https://api.datadoghq.eu` と入力します。

## 収集データ

### メトリクス

Flagsmith インテグレーションには、メトリクスは含まれません。

### サービスのチェック

Flagsmith には、サービスのチェック機能は含まれません。

### イベント

すべてのイベントが Datadog のイベントストリームに送信されます。

## トラブルシューティング

サポートが必要な場合は、 [Flagsmith のドキュメント][4]をご覧いただくか、[Datadog サポートまでお問い合わせください][5]。

[1]: https://www.flagsmith.com/
[2]: https://app.datadoghq.com/account/settings#integrations/flagsmith
[3]: https://app.datadoghq.com/account/settings#api
[4]: https://docs.flagsmith.com/integrations/datadog/
[5]: https://docs.datadoghq.com/ja/help/