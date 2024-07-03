---
categories:
- クラウド
- インシデント
- notifications
dependencies: []
description: このインテグレーションにより、Datadog でトリガーされたアラートから Salesforce Incidents を作成し、既存のインシデントに新しい情報を随時更新することができます。
doc_link: https://docs.datadoghq.com/integrations/salesforce_incidents/
draft: false
git_integration_title: salesforce_incidents
has_logo: true
integration_id: ''
integration_title: Salesforce Incidents
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: salesforce_incidents
public_title: Datadog-Salesforce Incidents インテグレーション
short_description: Datadog のアラートから Salesforce Service Cloud のインシデントを作成し、管理します。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Salesforce Incidents インテグレーションを利用すると、モニターアラートイベントから Salesforce Service Cloud にインシデントを作成することができます。Salesforce Datadog Widget を使用すると、インシデントに関連するモニターイベントのタイムラインを Salesforce で直接表示できます。

## 計画と使用

### Datadog と Salesforce Service Cloud の連携

1. [Datadog Salesforce Incidents インテグレーションタイル][1]に移動し、**Add Organization** をクリックします。
2. 組織タイプを選択します。
3. **Connect** をクリックし、Salesforce Service Cloud の認証ページの指示に従います。

### Trusted IP 範囲

Salesforce 組織でトラフィックのフィルタリングに Trusted IP 範囲を使用している場合、インテグレーションを動作させるためには、Datadog に属する **Webhooks** IP プレフィックスからの接続を許可する必要があります。お客様の地域の **Webhooks** IP プレフィックスのリストについては、[Datadog IP 範囲][2]を参照してください。

### インシデントテンプレートの構成

テンプレートは、Datadog のアラートイベントから Salesforce Service Cloud でどのようにインシデントが作成されるかを定義します。

インシデントテンプレートを作成するには

1. **New Incident Template** をクリックします。
2. インシデントテンプレートの名前を入力します。この名前には `salesforce_incidents-` というプレフィックスが付き、モニター通知で使用するハンドルになります (`@salesforce_incidents-my-incident-template-name` のように)。
3. Salesforce Organization を選択します。
4. インシデントを作成する際に使用する件名、説明、所有者、優先順位を指定します。
5. **Save** をクリックします。

### Datadog ウィジェットを Salesforce Service Cloud に追加する

Salesforce Service Cloud に Datadog Widget をインストールするには

1. Salesforce Organization の管理者に、[Salesforce AppExchange][3] から Datadog アプリをインストールしてもらいます。
2. Salesforce Service Cloud で、Incident Record ページに移動します。
3. 歯車のアイコンをクリックし、**Edit page** をクリックします。
4. 左のナビゲーションのカスタムコンポーネントから Datadog ウィジェットをクリックし、ページにドラッグします。
5. **Save** をクリックします。

## API

#### Datadog アラートから Salesforce Service Cloud にインシデントを作成する

Datadog モニターの **Notify your team** または **Say what's happening** セクションに、1 つ以上のインシデントテンプレートの通知ハンドル (例: `@salesforce_incidents-my-incident-template-name`) を含めます。

インシデントは、モニターがトリガーされると作成されます。モニターが解決されるまで、新しいインシデントは作成されません。


## リアルユーザーモニタリング

### データセキュリティ

Salesforce Incidents インテグレーションは、メトリクスを提供しません。

### ヘルプ

Salesforce Incidents インテグレーションには、イベントは含まれません。

### ヘルプ

Salesforce Incidents インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://app.datadoghq.com/integrations/salesforce-incidents
[2]: https://docs.datadoghq.com/ja/api/latest/ip-ranges/
[3]: https://appexchange.salesforce.com/
[4]: https://docs.datadoghq.com/ja/help/