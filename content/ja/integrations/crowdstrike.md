---
categories:
- クラウド
- ログの収集
- ログの収集
- ネットワーク
- セキュリティ
dependencies: []
description: CrowdStrike
doc_link: https://docs.datadoghq.com/integrations/crowdstrike/
draft: false
git_integration_title: crowdstrike
has_logo: true
integration_id: ''
integration_title: CrowdStrike
integration_version: ''
is_public: true
kind: integration
manifest_version: '1.0'
name: crowdstrike
public_title: CrowdStrike
short_description: CrowdStrike のリアルタイム検知イベントを Datadog のログとして収集します。
team: web-integrations
version: '1.0'
---

## 概要

CrowdStrike と連携し、以下のイベントを取り込みます。

* 検出の概要
* 認証イベント
* 検出ステータスの更新
* アップロードされた IoC
* ネットワーク封じ込めイベント
* IP 許可リストのイベント
* ポリシー管理イベント
* CrowdStrike ストアアクティビティ
* リアルタイム応答セッションの開始/終了
* イベントストリームの開始/停止

## セットアップ

### インストール

インストールは必要ありません。

### コンフィギュレーション

#### イベントストリーミングの有効化

イベントストリームに接続する前に、顧客のアカウントでストリーミング API を有効にするために、[CrowdStrike のサポートチームにご連絡ください][1]。

#### CrowdStrike のアカウントに接続する

ストリーミングを有効にしたら、新しい API クライアントを追加する必要があります。

* Falcon コンソールにサインインします
* [Support > API Clients and Keys][2] に移動します
* "Add new API client" をクリックします
* Falcon および API アクションログで API クライアントを識別する、説明的なクライアント名を入力します (例えば、"Datadog" など)
* オプションで、API クライアントの使用目的などの説明を入力します
* すべての API スコープで "Read" アクセスを選択します
* "Add" をクリックします
* Datadog に戻り、"Connect a CrowdStrike Account" をクリックします
* API クライアント ID とクライアントシークレットをコピーします
* オプションで、カンマで区切られたタグのリストを入力します

#### 結果

5 分ほど待つと、`crowdstrike` というソースで[ログ][3]が入ってくるのが確認できます。

## 収集データ

### ログ管理

CrowdStrike の falcon イベントは、`crowdstrike` というソースの下にログとして表示されます。

### メトリクス

CrowdStrike インテグレーションには、メトリクスは含まれません。

### サービスのチェック

CrowdStrike インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://supportportal.crowdstrike.com/
[2]: https://falcon.crowdstrike.com/support/api-clients-and-keys
[3]: /ja/logs/
[4]: https://docs.datadoghq.com/ja/help/