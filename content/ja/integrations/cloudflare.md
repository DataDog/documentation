---
categories:
  - web
ddtype: クローラー
dependencies: []
description: Cloudflare Web トラフィックおよび DNS メトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/cloudflare/'
git_integration_title: cloudflare
has_logo: true
integration_title: Cloudflare
is_public: true
kind: インテグレーション
manifest_version: 1
name: cloudflare
public_title: Datadog-Cloudflare インテグレーション
short_description: Cloudflare Web トラフィックおよび DNS メトリクスを追跡
version: 1
---
## 概要

Datadog を Cloudflare アカウントに接続して、Web トラフィックと DNS のメトリクスを表示します。

## セットアップ
### インストール
Datadog の [Cloudflare インテグレーションタイル][1]を使用して、インテグレーションをインストールします。

### コンフィグレーション

1. Datadog [Cloudflare インテグレーションタイル][1]内の Configuration タブに移動します。
2. 監視するアカウントの電子メールアドレスと、API キーまたはトークンを入力します。Cloudflare API キーと API トークンは、Cloudflare アカウントの My profile > Api Tokens の下にあります。
3. アカウントの名前を追加します。この名前は任意で、メトリクスの `account` タグ内で使用されます。

API トークンを使用する際は、トークンが以下のアクセス許可を持つことを確認してください。

- Zone >  Zone >  Read
- Zone >  Analytics >  Read

## 収集データ
### メトリクス
{{< get-metrics-from-git "cloudflare" >}}


### イベント
Cloudflare インテグレーションには、イベントは含まれません。

### サービスのチェック
Cloudflare インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#integrations/cloudflare
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/cloudflare/cloudflare_metadata.csv
[3]: https://docs.datadoghq.com/ja/help


