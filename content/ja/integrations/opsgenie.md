---
categories:
- collaboration
- notifications
dependencies: []
description: OpsGenie を Datadog のアラートとイベントで通知チャンネルとして使用。
doc_link: https://docs.datadoghq.com/integrations/opsgenie/
draft: false
further_reading:
- link: https://docs.datadoghq.com/tracing/service_catalog/integrations/#opsgenie-integration
  tag: ブログ
  text: サービスカタログとのインテグレーションを利用する
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_opsgenie_service_object
  tag: Terraform
  text: Terraform による Opsgenie サービスオブジェクトの作成と管理
git_integration_title: opsgenie
has_logo: true
integration_id: ''
integration_title: OpsGenie
integration_version: ''
is_public: true
manifest_version: '1.0'
name: opsgenie
public_title: Datadog-OpsGenie インテグレーション
short_description: OpsGenie を Datadog のアラートとイベントで通知チャンネルとして使用。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

`@opsgenie` を使用して、次の方法でアラートを作成できます。

- スナップショットを取得して作成
- メトリクスアラートがトリガーされたときに作成

## 計画と使用

### ブラウザトラブルシューティング

#### Opsgenie で Datadog インテグレーションを作成する

1. Opsgenie アカウントにログインし、[Opsgenie のインテグレーション][1]ページに移動します。
2. Datadog を検索し、タイルをクリックします。
3. Opsgenie の **Responders** フィールドを使用して、Datadog アラートの受信者を選択します。
4. [Integrations > APIs ページ][2]にある Datadog API キーを入力します。
5. Datadog EU サイトを使用している場合は、`Send to Datadog EU` にチェックを入れてください。
6. 必要に応じて、インテグレーションの名前を変更します。
7. 構成を保存します。
8. 後で Datadog で使用するため、キーと名前をコピーします。
9. Opsgenie で Datadog インテグレーションをさらに追加するには、[Opsgenie インテグレーション][1]ページに移動し、上の手順を繰り返します。

#### Opsgenie で作成したインテグレーションを Datadog でリストする

1. Datadog の [Account Integrations][3] で Opsgenie タイルを選択します。
2. 表示されるダイアログボックスで、Configuration タブをクリックします。
3. Datadog インテグレーションごとに提供されたキー (Opsgenie で作成される) を「**Opsgenie API Key**」フィールドに貼り付け、**Service Name** にサービス名を入力します。
   {{< img src="integrations/opsgenie/datadog-add-opsgenie-api-key.png" alt="Datadog で Opsgenie キーを追加" popup="true">}}

## リアルユーザーモニタリング

### データセキュリティ

Opsgenie インテグレーションには、メトリクスは含まれません。

### ヘルプ

Opsgenie インテグレーションには、イベントは含まれません。

### ヘルプ

Opsgenie インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.opsgenie.com/settings/integration/integration-list
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/account/settings
[4]: https://docs.datadoghq.com/ja/help/