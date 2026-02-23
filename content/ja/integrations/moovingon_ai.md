---
app_id: moovingon-ai
app_uuid: 1a02140e-4927-49c9-8442-dff81a18c703
assets:
  dashboards:
    moovingon.ai Overview: assets/dashboards/moovingon.ai_overview.json
  logs: {}
  oauth: assets/oauth_clients.json
author:
  homepage: https://www.moovingon.com/
  name: moovingon
  sales_email: sales@moovingon.com
  support_email: support@moovingon.com
categories:
- notifications
- logs-restriction-queries-update-a-restriction-query
- 自動化
- コラボレーション
- イベント管理
- alerting
- 問題追跡
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/moovingon_ai/README.md
display_on_public_website: true
draft: false
git_integration_title: moovingon_ai
integration_id: moovingon-ai
integration_title: moovingon.ai
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: moovingon_ai
public_title: moovingon.ai
short_description: moovingon.ai は NOC のオーケストレーションと自動化のためのプラットフォームです
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Notifications
  - Category::Incidents
  - Category::Automation
  - Category::Collaboration
  - Category::Event Management
  - Category::Alerting
  - Category::Issue Tracking
  - Offering::Integration
  - Queried Data Type::Events
  - Submitted Data Type::Events
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: moovingon.ai は NOC のオーケストレーションと自動化のためのプラットフォームです
  media:
  - caption: moovingon.ai ガイドライン
    image_url: images/moovingon_ai-guidelines.png
    media_type: image
  - caption: moovingon.ai イベント
    image_url: images/moovingon_ai-events.png
    media_type: image
  - caption: moovingon.ai インテグレーション
    image_url: images/moovingon.ai-integrations.png
    media_type: image
  - caption: moovingon.ai 概要ダッシュボード
    image_url: images/moovingon_ai-overview-dashbard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: moovingon.ai
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要
[moovingon.ai][1] は、クラウド運用と NOC 管理のためのプラットフォームです。可観測性スイート全体でアラートを統合し、アラートの処理とインシデント修復のための自動化されたランブックに関連付けます。このインテグレーションを利用することで、Datadog と moovingon.ai のパワーを活用し、インシデント管理を効率的に自動化できます。

moovingon.ai は、Datadog のモニター、ログ、イベント データをアラートの相関付けと集約に使用します。
このインテグレーションの主な機能は以下のとおりです。

1. **アラートの集中管理**: moovingon.ai 内で、moovingon.ai のダッシュボードを使用して Datadog のすべてのアラートを集約し、シンプルな管理と高い可視性を実現します。
2. **包括的なインシデント管理**: コンプライアンスを確保し、修復内容を明確にするために、moovingon.ai で実行されたすべての修復アクションがイベントとして Datadog に送信されます。
3. **広範な分析**: Datadog 内で、moovingon.ai が提供するアナリティクスを活用して、Datadog アラートから知見を導き出せます。プロアクティブな意思決定やトレンド分析に役立ちます。

## セットアップ

### インストール

1. moovingon.ai にログインするため、**Connect Accounts** をクリックします。
2. Datadog のインテグレーション名を入力し、**Submit** をクリックします。
3. Datadog OAuth2 の画面に進み、**Authorize** ボタンをクリックします。
4. オプションとして、Datadog モニターからのすべての通知を moovingon.ai 内で処理するには、**Install/Update the webhook** をクリックします。または、@webhook-moovingon_ai タグを希望のモニターにアタッチします。

## アンインストール

1. moovingon.ai アカウント内で **Settings** --> **Templates** に移動し、関連するすべての Datadog テンプレートを削除します。
2. **Setings** --> **Integrations** に移動し、Datadog インテグレーションを削除します。
3. Datadog 内で、**Integrations**  --> **Integrations** に移動します。
4. moovingon.ai タイルをクリックし、**Uninstall integration** をクリックします。


### メトリクス

moovingon.ai には、メトリクスは含まれません。

### サービスチェック

moovingon.ai にはサービス チェックは含まれていません。

### イベント

moovingon インテグレーションにはイベントが含まれます。

## トラブルシューティング

ご不明な点がございましたら、[moovingon.ai サポート][2]までお問い合わせください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [moovingon.ai と Datadog を使ってネットワーク インシデントの可視性を高める][3]

[1]: https://moovingon.ai/
[2]: mailto:support@moovingon.com
[3]: https://www.datadoghq.com/blog/moovingon-datadog-marketplace/