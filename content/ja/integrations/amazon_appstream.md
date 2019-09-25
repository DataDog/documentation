---
categories:
  - クラウド
  - aws
ddtype: クローラー
dependencies: []
description: Amazon AppStream のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/amazon_appstream/'
git_integration_title: amazon_appstream
has_logo: true
integration_title: Amazon AppStream
is_public: true
kind: インテグレーション
manifest_version: 1
name: amazon_appstream
public_title: Datadog-Amazon AppStream インテグレーション
short_description: Amazon AppStream のキーメトリクスを追跡
version: 1
---
## 概要
Amazon AppStream は、AWS から Web ブラウザへデスクトップアプリケーションをストリーミングできるフルマネージド型の安全なアプリケーションストリーミングサービスです。

このインテグレーションを有効にすると、Datadog にすべての AppStream メトリクスを表示できます。

## セットアップ
### インストール
[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集
1. [AWS インテグレーションタイル][2]のメトリクス収集で、`AppStream` をオンにします。

2. [Datadog - Amazon AppStream インテグレーション][3]をインストールします。

## 収集データ
### メトリクス
{{< get-metrics-from-git "amazon_appstream" >}}


### イベント
Amazon AppStream インテグレーションには、イベントは含まれません。

### サービスのチェック
Amazon AppStream インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-appstream
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_appstream/amazon_appstream_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/


{{< get-dependencies >}}