---
app_id: keep
app_uuid: 40ac95c0-35bd-49c8-a5f0-b21037bc87b4
assets:
  oauth: assets/oauth_clients.json
author:
  homepage: https://www.keephq.dev
  name: Keep
  sales_email: founders@keephq.dev
  support_email: tal@keephq.dev
categories:
- alerting
- 開発ツール
- logs-restriction-queries-update-a-restriction-query
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/keep/README.md
display_on_public_website: true
draft: false
git_integration_title: keep
integration_id: keep
integration_title: Keep
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: keep
public_title: Keep
short_description: Keep の AIOps プラットフォームからのモニターメトリクスを Datadog に送信します
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Alerting
  - Category::Developer Tools
  - Category::Incidents
  - Queried Data Type::Metrics
  - Queried Data Type::Logs
  - Queried Data Type::Events
  - Submitted Data Type::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: Keep の AIOps プラットフォームからのモニターメトリクスを Datadog に送信します
  media:
  - caption: Keep の短い製品ツアー
    image_url: images/alerts-page.png
    media_type: ビデオ
    vimeo_id: 906118097
  - caption: Keep のアラートページ
    image_url: images/alerts-page.png
    media_type: image
  - caption: Keep のノイズ低減ルール構築ページ
    image_url: images/alert-rules.png
    media_type: image
  - caption: Keep のワークフロービューア
    image_url: images/workflows.png
    media_type: image
  - caption: Keep のワークフロー構築ページ
    image_url: images/workflow-builder.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Keep
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

[Keep][1] は、オープンソースの AIOps アラート管理および自動化プラットフォームで、可観測性スタックのさまざまな部分に対してアラートを集約し、自動化し、ノイズを低減する機能を提供します。このインテグレーションを使用すると、両方のプラットフォームの強みを活用し、アラート管理とイベント相関を統合的かつ効率的に行うことができます。

Keep は Datadog のモニター、ログ、イベント データを使用してアラートを相関させ、ノイズを低減します。

このインテグレーションの主な機能は以下のとおりです。

- 集中管理されたアラート管理: すべての Datadog アラートを Keep の統合ビューに集約し、効率的な管理と可視性を提供します。
- アラートノイズの削減: Datadog アラートをフィルタリングおよび優先順位付けすることでアラート疲れを最小限に抑え、チームが最も重要なアラートに迅速に対処できるようにします。
- 包括的な分析: Keep の分析ツールを活用して Datadog のアラートから洞察を得ることで、プロアクティブな意思決定やトレンド分析をサポートします。

このインテグレーションは、アラート機能を強化し、運用効率を向上させ、**ノイズや不要な混乱を減らした**データ駆動型の意思決定を望むチームに最適です。

詳しくは、[公式の Keep ドキュメント][2]をご覧ください。



## セットアップ

### インストール

Datadog アカウントの[インテグレーションタイル][3]を使用して、[OAuth2][4] を介して Keep インテグレーションをインストールします。

Keep インテグレーションを設定するには

1. Keep インテグレーション タイルをクリックし、**Install Integration** を選択します。
2. ユーザーは Keep のプラットフォームにリダイレクトされ、Keep アカウントにサインインします。
3. ユーザーは再び Datadog にリダイレクトされ、Datadog アカウントで必要なスコープを確認・承認します。
4. 承認後、ユーザーは Keep のプラットフォームに戻り、インストールが正常に完了したかを確認します。

インストールに成功すると、Keep は Datadog 内に新しい `Webhook` インテグレーションを自動的に作成し、モニターを修正してアラートを送信します。

## アンインストール

- このインテグレーションをアンインストールすると、それ以前に与えられた認可は全て取り消されます。
- また、[API Keys ページ][5]でインテグレーション名を検索して、このインテグレーションに紐付けられた全ての API キーが無効になったことを確認してください。
- [Integrations ページ][6]で `Webhooks` インテグレーションに `keep-datadog-webhook-integration-UUID` が含まれていないことを確認してください。

### 検証

Keep インテグレーションが正しく機能しているかを検証するには、以下の手順に従ってください。
1. [Webhook Integration ページ][6]に移動します。
2. インストールされている `Webhooks` のリストで、`keep-datadog-webhook-integration-UUID` で始まる `Webhook` を探します。

## 収集データ

### メトリクス

Keep インテグレーションにはメトリクスは含まれていません。

### サービスチェック

Keep インテグレーションにはサービスチェックは含まれていません。

### イベント

Keep インテグレーションにはイベントは含まれていません。

## トラブルシューティング

ヘルプが必要ですか？[Keep のサポートチーム][7]にお問い合わせください。

[1]: https://www.keephq.dev/
[2]: https://docs.keephq.dev/providers/documentation/datadog-provider
[3]: https://app.datadoghq.com/integrations/keephq
[4]: https://docs.datadoghq.com/ja/developers/authorization/oauth2_in_datadog/
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://app.datadoghq.com/integrations/webhooks
[7]: mailto:rnd@keephq.dev?subject=[Datadog]%20OAuth%20Integration%20Support