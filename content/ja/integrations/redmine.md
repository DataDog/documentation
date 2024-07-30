---
categories:
- collaboration
- developer tools
- issue tracking
dependencies: []
description: Redmine のアップデートを Datadog のイベントストリームで表示、検索、議論。
doc_link: https://docs.datadoghq.com/integrations/redmine/
draft: false
git_integration_title: redmine
has_logo: true
integration_id: redmine
integration_title: Redmine
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: redmine
public_title: Datadog-Redmine インテグレーション
short_description: Redmine のアップデートを Datadog のイベントストリームで表示、検索、議論。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Redmine はオープンソースのプロジェクト管理 Web アプリケーションです。Redmine のアクティビティを Datadog でキャプチャすることで、以下のことが可能になります。

- 開発サイクルを追跡できます。
- Datadog イベントストリームに未解決の問題を表示できます。
- プロジェクトについてチームで議論できます。

Redmine 構成に必要な項目は、目的のアクティビティフィードの完全な URL です。複数の URL を追加できます。

## 計画と使用

### インフラストラクチャーリスト

インテグレーションを構成するには、[Redmine インテグレーションタイル][1]を参照してください。

## リアルユーザーモニタリング

### データセキュリティ

Redmine インテグレーションには、メトリクスは含まれません。

### ヘルプ

作成された問題はすべて Datadog 内でイベントとして表示されます。インテグレーションをインストールして構成した後、[Events Explorer][2] で `source:redmine` を検索すると、Redmine のアクティビティフィードで問題を確認することができます。

### ヘルプ

Redmine インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://app.datadoghq.com/integrations/redmine
[2]: https://docs.datadoghq.com/ja/service_management/events/explorer/
[3]: https://docs.datadoghq.com/ja/help/