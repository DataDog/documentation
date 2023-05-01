---
categories:
- クラウド
- AWS
- ログの収集
dependencies: []
description: Amazon Elemental MediaLive のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/amazon_medialive/
draft: false
git_integration_title: amazon_medialive
has_logo: true
integration_id: amazon-medialive
integration_title: Amazon Elemental MediaLive
integration_version: ''
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_medialive
public_title: Datadog-Amazon Elemental MediaLive インテグレーション
short_description: Amazon Elemental MediaLive のキーメトリクスを追跡
version: '1.0'
---

## 概要

AWS Elemental MediaLive は、ブロードキャストグレードのライブビデオ処理サービスです。

このインテグレーションを有効にすると、Datadog にすべての MediaLive メトリクスを表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]で、メトリクスコレクションの下にある `MediaLive` にチェックが入っていることを
   確認します。
2. [Datadog - MediaLive インテグレーション][3]をインストールします。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_medialive" >}}


### イベント

MediaLive インテグレーションには、イベントは含まれません。

### サービスのチェック

MediaLive インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-medialive
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_medialive/amazon_medialive_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/