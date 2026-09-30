---
app_id: notion
app_uuid: 0a709534-658c-4d8f-99a3-566dd7cd809b
assets:
  dashboards:
    notion_events: assets/dashboards/NotionDashboard.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: notion.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10361
    source_type_name: notion
  oauth: assets/oauth_clients.json
author:
  homepage: https://www.notion.so/
  name: Notion Labs, Inc.
  sales_email: integrations@makenotion.com
  support_email: team@makenotion.com
categories:
- ログの収集
- コラボレーション
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/notion/README.md
display_on_public_website: true
draft: false
git_integration_title: notion
integration_id: notion
integration_title: Notion
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: notion
public_title: Notion
short_description: Notion ワークスペースのイベントを監視し、Datadog で検出をカスタマイズする
supported_os:
- any
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Collaboration
  - Supported OS::Any
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Notion ワークスペースのイベントを監視し、Datadog で検出をカスタマイズする
  media:
  - caption: Notion での Datadog インテグレーションのセットアップ
    image_url: images/Notion_DD.png
    media_type: image
  - caption: Datadog での Notion イベントログ
    image_url: images/Notion_DD_2.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Notion
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Notion はコネクテッドワークスペースであり、モダンなチームがドキュメントを作成・共有し、メモを取り、プロジェクトを管理し、知識を整理するための場所です。すべてが 1 つの場所に集約されています。Notion と Datadog のインテグレーションをインストールすると、[Datadog Cloud SIEM][1] でワークスペースのアクティビティを管理および監視できます。ワークスペースの監査ログをインポートし、リアルタイムの監視、アラート、および分析を行うことが可能です。これにより、潜在的なセキュリティ問題や不審な行動を検出し、調査したり、アクセスに関するトラブルシューティングを容易に行うことができます。

Notion から出力されるイベントの完全なリストについては、[公式の Notion ドキュメント][2]をご覧ください。

## セットアップ

1. Notion タイルを開き、_Install Integration_ をクリックします。

2. _Connect Accounts_ をクリックして、Notion の _Settings &amp; Members_ にリダイレクトします。

3. Notion にログインし、_Connections_ > _Workspace Connections_ > _+Add Connection_ > _Datadog_ の順に進みます。

4. Notion は、Datadog とのインテグレーションを認可するために、一連の OAuth 手順に従うよう指示します。

接続が確立されると、Notion は Datadog にほぼリアルタイムでデータを送信し始めます。

## アンインストール
このインテグレーションをアンインストールすると、すべての以前の認可が取り消されます。
さらに、[API Keys ページ][3]でインテグレーション名を検索し、このインテグレーションに関連するすべての API キーが無効になっていることを確認してください。

Notion で、_Settings &amp; Members_ > _Connections_ > _Workspace Connections_ > _Datadog_ の隣にある ... > _Disconnect_ に移動します。

## サポート
ご不明な点は、[Notion サポート][4]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/security/cloud_siem/
[2]: https://www.notion.so/help/audit-log
[3]: https://app.datadoghq.com/organization-settings/api-keys?filter=Notion
[4]: mailto:team@makenotion.com