---
aliases:
- /ja/integrations/azure_notificationhubs
categories:
- azure
- クラウド
- notifications
dependencies: []
description: Azure Notification Hubs のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/azure_notification_hubs/
draft: false
git_integration_title: azure_notification_hubs
has_logo: true
integration_id: azure-notificationhubs
integration_title: Microsoft Azure Notification Hubs
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_notification_hubs
public_title: Datadog-Microsoft Azure Notification Hubs インテグレーション
short_description: Azure Notification Hubs のキーメトリクスを追跡
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Azure Notification Hubs は、任意のバックエンド (クラウドまたはオンプレミス) から任意のプラットフォーム (iOS、Android、Windows、Kindle、Baidu など) に通知を送信できる、使いやすくスケールアウトされたプッシュエンジンを提供します。

Datadog Azure インテグレーションを使用して、Azure Notification Hubs からメトリクスを収集できます。

## 計画と使用

### インフラストラクチャーリスト

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "azure_notification_hubs" >}}


### ヘルプ

Azure Notification Hubs インテグレーションには、イベントは含まれません。

### ヘルプ

Azure Notification Hubs インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_notification_hubs/azure_notification_hubs_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/