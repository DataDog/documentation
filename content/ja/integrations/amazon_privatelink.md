---
categories:
- クラウド
- AWS
- ログの収集
dependencies: []
description: Amazon PrivateLink のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/amazon_privatelink/
draft: false
git_integration_title: amazon_privatelink
has_logo: true
integration_id: amazon-privatelink
integration_title: Amazon PrivateLink
integration_version: ''
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_privatelink
public_title: Datadog-Amazon PrivateLink インテグレーション
short_description: Amazon PrivateLink のキーメトリクスを追跡
version: '1.0'
---


## 概要

AWS PrivateLink は、VPC、AWS サービス、およびお客様のオンプレミスネットワーク間のプライベート接続を提供します。

このインテグレーションを有効にすると、VPC のエンドポイントやエンドポイントサービスの健全性とパフォーマンスを Datadog で監視することができます。

**重要:** PrivateLink 経由でテレメトリーデータを Datadog に送信したい場合は、[こちらの手順][1]で行ってください。

## セットアップ

### APM に Datadog Agent を構成する

[Amazon Web Services インテグレーション][2]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][3]で、`Metric Collection` タブで `PrivateLinkEndPoints` と `PrivateLinkServices` が
   有効になっていることを確認します。
2. [Datadog - Amazon PrivateLink インテグレーション][4]をインストールします。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_privatelink" >}}


### イベント

Amazon PrivateLink インテグレーションには、イベントは含まれません。

### サービスのチェック

Amazon PrivateLink インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

[1]: https://docs.datadoghq.com/ja/agent/guide/private-link/
[2]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-privatelink
[5]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_privatelink/amazon_privatelink_metadata.csv
[6]: https://docs.datadoghq.com/ja/help/