---
categories:
  - クラウド
  - aws
ddtype: クローラー
dependencies: []
description: Amazon Inspector のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/amazon_inspector/'
git_integration_title: amazon_inspector
has_logo: true
integration_title: Amazon Inspector
is_public: true
kind: インテグレーション
manifest_version: 1
name: amazon_inspector
public_title: Datadog-Amazon Inspector インテグレーション
short_description: Amazon Inspector のキーメトリクスを追跡
version: 1
---
## 概要
Amazon Inspector は、AWS リソースのセキュリティとコンプライアンスの強化を支援するセキュリティ脆弱性評価サービスです。

このインテグレーションを有効にすると、Datadog にすべての Inspector メトリクスを表示できます。

## セットアップ
### インストール
[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集
1. [AWS インテグレーションタイル][2]のメトリクス収集で、`Inspector` をオンにします。

2. [Datadog - Amazon Inspector インテグレーション][3]をインストールします。

## 収集データ
### メトリクス
{{< get-metrics-from-git "amazon_inspector" >}}


### イベント
Amazon Inspector インテグレーションには、イベントは含まれません。

### サービスのチェック
Amazon Inspector インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-inspector
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_inspector/amazon_inspector_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/


{{< get-dependencies >}}