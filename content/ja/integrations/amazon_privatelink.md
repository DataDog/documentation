---
categories:
- AWS
- クラウド
- ログの収集
- ネットワーク
dependencies: []
description: AWS PrivateLink のキーメトリクスを追跡します。
doc_link: https://docs.datadoghq.com/integrations/amazon_privatelink/
draft: false
git_integration_title: amazon_privatelink
has_logo: true
integration_id: ''
integration_title: AWS PrivateLink
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_privatelink
public_title: Datadog-AWS PrivateLink インテグレーション
short_description: AWS PrivateLink のキーメトリクスを追跡します。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

AWS PrivateLink は、VPC、AWS サービス、およびお客様のオンプレミスネットワーク間のプライベート接続を提供します。

このインテグレーションを有効にすると、VPC のエンドポイントやエンドポイントサービスの健全性とパフォーマンスを Datadog で監視することができます。

**重要:** PrivateLink 経由でテレメトリーデータを Datadog に送信したい場合は、[こちらの手順][1]で行ってください。

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][2]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][3]で、`Metric Collection` タブで `PrivateLinkEndPoints` と `PrivateLinkServices` が
   有効になっていることを確認します。
2. [Datadog - AWS PrivateLink インテグレーション][4]をインストールします。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_privatelink" >}}


### ヘルプ

AWS PrivateLink インテグレーションには、イベントは含まれません。

### ヘルプ

AWS PrivateLink インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

[1]: https://docs.datadoghq.com/ja/agent/guide/private-link/
[2]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-privatelink
[5]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_privatelink/amazon_privatelink_metadata.csv
[6]: https://docs.datadoghq.com/ja/help/