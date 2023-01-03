---
app_id: gremlin
app_uuid: 451a4863-1767-4c11-8831-d196ae4643d0
assets:
  integration:
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: gremlin.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Gremlin
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 不明
  sales_email: support@gremlin.com
  support_email: support@gremlin.com
categories:
- コラボレーション
- 問題追跡
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/gremlin/README.md
display_on_public_website: true
draft: false
git_integration_title: gremlin
integration_id: gremlin
integration_title: Gremlin
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: gremlin
oauth: {}
public_title: Gremlin
short_description: Gremlin で発生したイベントを Datadog に送信
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Collaboration
  - Category::Issue Tracking
  configuration: README.md#Setup
  description: Gremlin で発生したイベントを Datadog に送信
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Gremlin
---



## 概要

Gremlin の攻撃の表示、再実行、停止を Datadog から直接行うことができます。

Gremlin を Datadog の[イベント][1]と組み合わせると、Datadog のワークフローに障害テストのコンテキストを効果的に追加できます。

- ダッシュボードに攻撃イベントを重ねて表示することで、Gremlin がメトリクスにいつどのように影響しているかを正確に特定できます。
- Datadog の[イベントストリーム][2]から Gremlin の攻撃を表示、再実行、停止できます。

![スナップショット][3]

## セットアップ

### コンフィギュレーション

このインテグレーションを有効にするには、Gremlin に Datadog API キーを渡す必要があります。それには、[インテグレーションページ][4]で、**Datadog** の行にある **Add** ボタンをクリックします。**Datadog API キー**の入力を求められます。キーを入力すると、インテグレーションが初期化されます。

- API キー: <span class="hidden-api-key">\${api_key}</span>

これで、このインテグレーションからのイベントが[イベントストリーム][2]に表示されるようになります。

## 収集データ

### メトリクス

Gremlin インテグレーションは、メトリクスを提供しません。

### イベント

Gremlin で攻撃が開始または停止されると、Gremlin インテグレーションがイベントを [Datadog のイベントストリーム][4]に送信します。

### サービスのチェック

Gremlin インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Gremlin が Datadog を使用して自社の Chaos Engineering サービスを監視する方法][6]

[1]: https://docs.datadoghq.com/ja/getting_started/#events
[2]: https://app.datadoghq.com/event/stream
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/gremlin/images/events-overlay.png
[4]: https://app.gremlin.com/settings/integrations
[5]: https://docs.datadoghq.com/ja/help/
[6]: https://www.datadoghq.com/blog/gremlin-datadog/