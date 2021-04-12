---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - notification
creates_events: true
ddtype: crawler
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/split/README.md'
display_name: Split
draft: false
git_integration_title: split
guid: 2c48dd0b-418f-4ca7-9b8d-54c857587db4
integration_id: split
integration_title: Split
is_public: true
kind: インテグレーション
maintainer: jeremy-lq
manifest_version: 1.0.1
name: split
public_title: Datadog-Split インテグレーション
short_description: エンジニアリングチームや製品チームに実験用プラットフォームを提供。
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

[Split][1] は、[ロールアウトを制御して行う][2]ためのプラットフォームです。目的の機能を簡単かつ安全な方法で顧客に提供でき、ビジネスの規模に関係なく、極めて優れたユーザーエクスペリエンスを実現すると共にリスクを軽減します。

Split を Datadog と統合すると、以下のことができます。

- イベントストリームに Split の changelog を追加することで、機能の変更の前後関係を確認できます。
- 機能の影響をアプリケーションのパフォーマンスと関連付けることができます。
- 重要な問題が発生する前にそれを回避できます。Datadog のメトリクスとアラートに基づいて、機能を事前に無効にできます。

## セットアップ

- **Datadog で**: API キー <span class="hidden-api-key">\${api_key}</span>を作成

- **Split で**: **Admin Settings** で **Integrations** をクリックし、Marketplace に移動します。Datadog の横にある Add をクリックします。<br/>

![Split のスクリーンショット][3]

- Datadog API キーを貼り付け、Save をクリックします。

![Split のスクリーンショット][4]

Split のデータが Datadog に届くようになります。

## 収集データ

### メトリクス

Split チェックには、メトリクスは含まれません。

### イベント

Split リスト/リスト除外イベントを [Datadog のイベントストリーム][5]にプッシュします。

### サービスのチェック

Split チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

[1]: http://www.split.io
[2]: http://www.split.io/articles/controlled-rollout
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/split/images/in-split.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/split/images/integrations-datadog.png
[5]: https://docs.datadoghq.com/ja/events/
[6]: https://docs.datadoghq.com/ja/help/