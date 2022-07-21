---
categories:
- cloud
- AWS
- ログの収集
dependencies: []
description: 主要な AWS Certificate Manager メトリクスを追跡します。
doc_link: https://docs.datadoghq.com/integrations/amazon_certificate_manager/
draft: false
git_integration_title: amazon_certificate_manager
has_logo: true
integration_id: amazon-certificate-manager
integration_title: AWS Certificate Manager
integration_version: ''
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_certificate_manager
public_title: Datadog-AWS Certificate Manager インテグレーション
short_description: 主要な AWS Certificate Manager メトリクスを追跡します。
version: '1.0'
---

## 概要

AWS Certificate Manager を使用すると、SSL/TLS 証明書をプロビジョニング、管理、デプロイして AWS サービスや内部の接続済みリソースに利用できます。

このインテグレーションを有効にすると、Datadog ですべての Certificate Manager メトリクスを表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`CertificateManager` をオンにします。
2. [Datadog - AWS Certificate Manager インテグレーション][3]をインストールします。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_certificate_manager" >}}


### イベント

AWS Certificate Manager インテグレーションは、EventBridge からの証明書期限とステータス変更イベントをサポートします。

### サービスのチェック

AWS Certificate Manager インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-certificate-manager
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_certificate_manager/amazon_certificate_manager_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/