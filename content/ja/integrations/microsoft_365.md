---
categories:
  - ログの収集
  - セキュリティ
ddtype: crawler
dependencies: []
description: Microsoft 365 に接続して組織の監査ログを Datadog のログにプル転送。
doc_link: 'https://docs.datadoghq.com/integrations/microsoft_365/'
draft: false
git_integration_title: microsoft_365
has_logo: true
integration_id: ''
integration_title: Microsoft 365
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: microsoft_365
public_title: Datadog-Microsoft 365 インテグレーション
short_description: Microsoft 365 監査ログを Datadog に表示
version: '1.0'
---
## 概要

Microsoft 365 と統合して、以下のことができます。

- Datadog のロギング製品を使用して、監査ログを表示、パース
- Microsoft 365 プラットフォームからのイベントにモニターを設定
- Datadog のセキュリティツールスイートを活用してセキュリティ規則を設定

Datadog は、以下のタイプの監査ログを収集します。

* `Audit.General`
* `Audit.Exchange`
* `Audit.SharePoint`
* `Audit.AzureActiveDirectory`
* `DLP.All`

## セットアップ

### インストール

[Datadog Microsoft 365 タイル][1]を使用してインテグレーションをインストールします。

**Install a New Tenant** をクリックすると、認証のために Microsoft 365 アカウントにログインするページが開きます。監理者アカウントでログインする必要があります。

オプションとして、この新規設定するテナントのすべてのログにアタッチされるカスタムタグをコンマ区切りで追加できます（例: `environment:prod,team:us`）。このタグは、ログのフィルタリング/分析に使用することが可能です。

**注**: Datadog の監査ログを使用するには、組織の[監査ログが有効][2]である必要があります。

## 収集データ

### ログ

Microsoft 365 インテグレーションでは、監査ログごとに 1 つのログイベントが生成されます。収集されたログは、ソース `microsoft-365` でタグ付けされます。

## トラブルシューティング

Datadog のログインテークは、最大過去 18 時間までさかのぼったログイベントのみをサポートします。この期間より前のタイムスタンプのログイベントは破棄されます。

Datadog では、異なる Microsoft エンドポイントが必要となるため、GCC、GCC High、または DoD 環境のテナントに対応していません。

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#integrations/microsoft_365
[2]: https://docs.microsoft.com/en-us/microsoft-365/compliance/turn-audit-log-search-on-or-off?view=o365-worldwide#turn-on-audit-log-search
[3]: https://docs.datadoghq.com/ja/help/