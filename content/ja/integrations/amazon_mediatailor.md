---
categories:
  - クラウド
  - aws
ddtype: クローラー
dependencies: []
description: Amazon Elemental MediaTailor のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/amazon_mediatailor/'
git_integration_title: amazon_mediatailor
has_logo: true
integration_title: Amazon Elemental MediaTailor
is_public: true
kind: インテグレーション
manifest_version: 1
name: amazon_mediatailor
public_title: Datadog-Amazon Elemental MediaTailor インテグレーション
short_description: Amazon Elemental MediaTailor のキーメトリクスを追跡
version: 1
---
## 概要
Amazon MediaTailor は、スケーラブルなサーバー側広告挿入を可能にするパーソナライゼーションおよびマネタイゼーションサービスです。

このインテグレーションを有効にすると、Datadog にすべての Elemental MediaTailor メトリクスを表示できます。

## セットアップ
### インストール
[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集
1. [AWS インテグレーションタイル][2]のメトリクス収集で、`MediaTailor` をオンにします。

2. [Datadog - Amazon Elemental MediaTailor インテグレーション][3]をインストールします。

## 収集データ
### メトリクス
{{< get-metrics-from-git "amazon_mediatailor" >}}


### イベント
Amazon Elemental MediaTailor インテグレーションには、イベントは含まれません。

### サービスのチェック
Amazon Elemental MediaTailor インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-mediatailor
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_mediatailor/amazon_mediatailor_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/


{{< get-dependencies >}}