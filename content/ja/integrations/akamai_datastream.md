---
aliases:
- /ja/integrations/akamai/
categories:
- キャッシュ
- クラウド
dependencies: []
description: Akamai DataStream を Datadog と統合
doc_link: https://docs.datadoghq.com/integrations/akamai_datastream/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/akamai-cdn-performance/
  tag: ブログ
  text: Akamai を Datadog と統合して CDN のパフォーマンスを監視
git_integration_title: akamai_datastream
has_logo: true
integration_id: ''
integration_title: Akamai DataStream
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: akamai_datastream
public_title: Datadog-Akamai DataStream
short_description: Akamai DataStream を Datadog と統合
team: web-integrations
version: '1.0'
---

## 概要

Datadog を Akamai DataStream と接続すると、CDN の健全性、レイテンシー、オフロード、エラーなどのメトリクスを表示できます。

## セットアップ

### インストール

Datadog の [Akamai インテグレーションタイル][1]を使用して、インテグレーションをインストールします。

### コンフィギュレーション

#### メトリクスの収集

最初に、Akamai アカウントを追加します。

1. Luna Control Center で、Configure > Organization > Manage APIs にアクセスし、「DataStream」API への「読み取り専用」以上のアクセス権を持つ新しいクライアントを作成します。
2. 「Users and API Clients」リストで、新しく作成した API を選択します。「Credentials」で、新しいクライアントトークンを作成します。所定の情報を Datadog の [Akamai インテグレーションタイル][1]にコピーします。「Update Configuration」を押します。

監視するストリームのリストを追加します。

1. DataStream (Configure > Performance Analytics > DataStream と選択) で、"Aggregated metrics" として設定されているストリームを選択し、その ID を Akamai インテグレーションタイルのストリームリストセクションにコピーします。

複数のアカウント (またはホスト) を設定できますが、各ストリームを必ず 1 つのアカウントにリンクしてください。

<div class="alert alert-warning">
「Aggregated metrics」タイプのストリームだけがサポートされています。
</div>

#### ログの収集

{{< site-region region="us3" >}}

ログ収集は、このサイトではサポートされていません。

{{< /site-region >}}

{{< site-region region="us,eu,gov" >}}

Akamai DataStream 1.0 および 2.0 では、HTTP(s) エンドポイントを介して gzip 形式のログを Datadog に送信できます。Datadog へログをストリームするには、Akamai 内で以下のフィールドに入力します。

1. **Name**: エンドポイントのわかりやすい説明を入力します。

2. **Endpoint**: ログを送信および保存するための Datadog エンドポイントを入力します: {{< region-param key="http_endpoint" code="true" >}}`/v1/input`

3. **Tags** (任意): Datadogでログのフィルタリングおよびグループ化に使用する、カンマ区切りのタグ一覧（例: `env:staging,team:web`）を入力します。

4. **Source**: ソース名として `akamai` を入力します。

5. **Service** (任意): Datadog アカウントに関連付けられたログイベントを生成するアプリケーション名またはサービス名を入力します。

6. **API key**: [Datadog API キー][1]を入力します。

7. **Send compressed data** (任意): 宛先に送信されたログを gzip 形式で圧縮するにはこのチェックボックスを選択します。

8. **Validate & Save**: 宛先への接続を検証し詳細を保存するには、これをクリックします。

[1]: https://app.datadoghq.com/organization-settings/api-keys

{{< /site-region >}}

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
[3]: https://docs.datadoghq.com/ja/help/