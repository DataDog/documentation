---
aliases:
  - /ja/integrations/akamai/
categories:
  - クラウド
ddtype: crawler
dependencies: []
description: Akamai DataStream を Datadog と統合
doc_link: 'https://docs.datadoghq.com/integrations/akamai_datastream/'
further_reading:
  - link: 'https://www.datadoghq.com/blog/akamai-cdn-performance/'
    tag: ブログ
    text: Akamai を Datadog と統合して CDN のパフォーマンスを監視
git_integration_title: akamai_datastream
has_logo: true
integration_title: Akamai DataStream
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: akamai_datastream
public_title: Datadog-Akamai DataStream
short_description: Akamai DataStream を Datadog と統合
version: '1.0'
---
## 概要

Datadog を Akamai DataStream と接続すると、CDN の健全性、レイテンシー、オフロード、エラーなどのメトリクスを表示できます。

## セットアップ

### インストール

Datadog の [Akamai インテグレーションタイル][1]を使用して、インテグレーションをインストールします。

### コンフィグレーション

最初に、Akamai アカウントを追加します。

1. Luna Control Center で、Configure > Organization > Manage APIs にアクセスし、「DataStream」API への「読み取り専用」以上のアクセス権を持つ新しいクライアントを作成します。
2. 「Users and API Clients」リストで、新しく作成した API を選択します。「Credentials」で、新しいクライアントトークンを作成します。所定の情報を Datadog の [Akamai インテグレーションタイル][1]にコピーします。「Update Configuration」を押します。

監視するストリームのリストを追加します。

1. DataStream (Configure > Performance Analytics > DataStream と選択) で、"Aggregated metrics" として設定されているストリームを選択し、その ID を Akamai インテグレーションタイルのストリームリストセクションにコピーします。

複数のアカウント (またはホスト) を設定できますが、各ストリームを必ず 1 つのアカウントにリンクしてください。

<div class="alert alert-warning">
「Aggregated metrics」タイプのストリームだけがサポートされています。
</div>

## 収集データ

### メトリクス
{{< get-metrics-from-git "akamai_datastream" >}}


### イベント

Akamai インテグレーションには、イベントは含まれません。

### サービスのチェック

Akamai インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#integrations/akamai-datastream
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/akamai_datastream/akamai_datastream_metadata.csv
[3]: https://docs.datadoghq.com/ja/help