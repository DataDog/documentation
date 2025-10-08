---
app_id: invary
app_uuid: 13509f2d-d922-4d8b-b3c2-7a8c2dd7fc54
assets:
  dashboards:
    Invary Runtime Integrity: assets/dashboards/invary_runtime_integrity.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10409
    source_type_name: Invary
  oauth: assets/oauth_clients.json
author:
  homepage: https://www.invary.com
  name: Invary
  sales_email: sales@invary.com
  support_email: support@invary.com
categories:
- 自動化
- ログの収集
- OS & システム
- セキュリティ
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/invary/README.md
display_on_public_website: true
draft: false
git_integration_title: invary
integration_id: invary
integration_title: Invary
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: invary
public_title: Invary
short_description: オペレーティングシステムのランタイム整合性を可視化
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Category::Log Collection
  - Category::OS & System
  - Category::Security
  - Submitted Data Type::Logs
  - Supported OS::Linux
  - Offering::Integration
  configuration: README.md#Setup
  description: オペレーティングシステムのランタイム整合性を可視化
  media:
  - caption: Invary Runtime Integrity OOTB ダッシュボード
    image_url: images/dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Invary
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Invary で管理されるオペレーティングシステムのランタイム整合性を可視化します。

Invary はオペレーティングシステムのランタイム整合性を検証し、他のシステムを欺く可能性があるルートキットを検出します。このインテグレーションにより、Invary のランタイム整合性評価結果を Datadog にストリーミングし、ログとして保存することが可能です。Invary の評価イベントには、エンドポイントの整合性の全体的なステータスと、侵害されている場合はエンドポイントのカーネルのどの部分が侵害されているかの詳細が含まれます。Invary の評価イベントの詳細な例は [developers.invary.com][1] を参照してください。

このインテグレーションには、Invary で管理されるエンドポイントのランタイム整合性を可視化するためのすぐに使えるダッシュボードも付属しています。ダッシュボードでは、現在整合性が失われているエンドポイントや、時間経過に伴うエンドポイントの整合性の推移がわかります。さらに、このダッシュボードでは使用中のディストリビューションやカーネルバージョンなど、ランタイム時の OS インベントリに関する情報も提供します。

このインテグレーションは [Invary API][1] を使用します。

## セットアップ

### インストール

Invary インテグレーションを利用すると、Invary SaaS プラットフォームからエンドポイントや評価結果に関する詳細を Datadog インスタンスに転送できます。サーバーに追加のインストールは不要です。

### 構成

1. Invary が Datadog インスタンスと通信できるように、OAuth 認可フローを完了してください。
2. ランタイム整合性の全体像を把握するには、「Invary Runtime Integrity」ダッシュボードを確認してください。

### 検証

1. 最新かつ適切な評価情報を確認するには、「Invary Runtime Integrity」ダッシュボードを参照してください。
2. ログを確認するには、`source:invary` を基本クエリとして使用してください。

### アンインストール

- このインテグレーションをアンインストールすると、それ以前に与えられた認可は全て取り消されます。
- さらに、[API Keys ページ][2]でインテグレーション名を検索し、このインテグレーションに関連付けられているすべての API キーが無効化されていることを確認してください。

## 収集データ

### Logs

Invary はランタイム整合性評価の結果を `source:invary` タグ付きで転送します。

### メトリクス
Invary Runtime Integrity インテグレーションにはメトリクスは含まれていません。

### サービスチェック
Invary Runtime Integrity インテグレーションにはサービスチェックは含まれていません。

### イベント
Invary Runtime Integrity インテグレーションにはイベントは含まれていません。

## トラブルシューティング

サポートが必要ですか？ [Invary サポート][3]にお問い合わせください。


[1]: https://developers.invary.com/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: mailto:support@invary.com