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
custom_kind: integration
manifest_version: '1.0'
name: crowdstrike
public_title: CrowdStrike
short_description: CrowdStrike の検出イベントやアラートを Datadog のログとしてリアルタイムに収集します。
team: web-integrations
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

[CrowdStrike][1] は、エンドポイント、ワークロード、データ、アイデンティティを包括的に視覚化し、保護することで、侵害、ランサムウェア、サイバー攻撃を阻止するシングルエージェントソリューションです。

CrowdStrike インテグレーションにより、CrowdStrike の検出イベントやアラートを Datadog のログとしてリアルタイムに収集することができます。

## 計画と使用

### インフラストラクチャーリスト

インストールは必要ありません。

### ブラウザトラブルシューティング

#### イベントストリーミングの有効化

[イベントストリーム][2]に接続する前に、[CrowdStrike のサポートチームに連絡][3]して、顧客アカウントで API のストリーミングを有効にしてください。

#### CrowdStrike のアカウントに接続する

ストリーミングを有効にしたら、CrowdStrike に新しい API クライアントを追加します。

1. Falcon コンソールにサインインします。
1. [Support > API Clients and Keys][4] に移動します。
1. **Add new API client** をクリックします。
1. Falcon および API アクションログで API クライアントを識別する、説明的なクライアント名を入力します (例えば、`Datadog` など)
1. オプションで、API クライアントの使用目的などの説明を入力します。
1. すべての API スコープで **Read** アクセスを選択します。
1. **Add** をクリックします。

#### ログ収集の有効化

Datadog の [CrowdStrike インテグレーションタイル][5]に API クライアントの詳細を追加します。

1. **Connect a CrowdStrike Account** をクリックします。
1. API クライアント ID、クライアントシークレット、API ドメインをコピーします。
1. オプションで、カンマで区切られたタグのリストを入力します。
1. **Submit** をクリックします。

数分後、[Crowdstrike Log Overview ダッシュボード][7]に `crowdstrike` というソースの[ログ][6]が表示されます。

## リアルユーザーモニタリング

### データセキュリティ

CrowdStrike インテグレーションには、メトリクスは含まれません。

### ヘルプ

CrowdStrike インテグレーションにより、Datadog は以下のイベントを取り込むことができるようになります。

* 検出の概要
* ファイアウォールマッチ
* アイデンティティ保護
* Idp 検出の概要
* インシデント概要
* 認証イベント
* 検出ステータスの更新
* アップロードされた IoC
* ネットワーク封じ込めイベント
* IP 許可リストのイベント
* ポリシー管理イベント
* CrowdStrike ストアアクティビティ
* リアルタイム応答セッションの開始/終了
* イベントストリームの開始/停止

これらのイベントは [Crowdstrike Log Overview ダッシュボード][7]に表示されます。

### ヘルプ

CrowdStrike インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://www.crowdstrike.com/
[2]: https://docs.datadoghq.com/ja/service_management/events/explorer/
[3]: https://supportportal.crowdstrike.com/
[4]: https://falcon.crowdstrike.com/support/api-clients-and-keys
[5]: https://app.datadoghq.com/integrations/crowdstrike
[6]: /ja/logs/
[7]: https://app.datadoghq.com/dash/integration/32115/crowdstrike-overview
[8]: https://docs.datadoghq.com/ja/help/