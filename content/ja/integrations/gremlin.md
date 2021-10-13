---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - コラボレーション
  - 問題追跡
creates_events: true
ddtype: crawler
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/gremlin/README.md'
display_name: Gremlin
draft: false
git_integration_title: gremlin
guid: 087cb38a-d119-4db6-8c54-30700fc1f355
integration_id: gremlin
integration_title: Gremlin
is_public: true
kind: インテグレーション
maintainer: support@gremlin.com
manifest_version: 1.0.0
name: gremlin
public_title: Datadog-Gremlin インテグレーション
short_description: Gremlin で発生したイベントを Datadog に送信
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
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

インフラストラクチャーの監視の詳細および Datadog の全インテグレーションについては、[ブログ記事][6]を参照してください。

[1]: https://docs.datadoghq.com/ja/getting_started/#events
[2]: https://app.datadoghq.com/event/stream
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/gremlin/images/events-overlay.png
[4]: https://app.gremlin.com/settings/integrations
[5]: https://docs.datadoghq.com/ja/help/
[6]: https://www.datadoghq.com/blog