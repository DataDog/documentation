---
categories:
- monitoring
- notification
dependencies: []
description: OpsGenie を Datadog のアラートとイベントで通知チャンネルとして使用。
doc_link: https://docs.datadoghq.com/integrations/opsgenie/
draft: false
git_integration_title: opsgenie
has_logo: true
integration_id: ''
integration_title: OpsGenie
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: opsgenie
public_title: Datadog-OpsGenie インテグレーション
short_description: OpsGenie を Datadog のアラートとイベントで通知チャンネルとして使用。
version: '1.0'
---

## 概要

`@opsgenie` を使用して、次の方法でアラートを作成できます。

- イベントストリームから作成
- スナップショットを取得して作成
- メトリクスアラートがトリガーされたときに作成

## セットアップ

### コンフィギュレーション

#### Opsgenie で Datadog インテグレーションを作成する

1. Opsgenie アカウントにログインし、[Opsgenie のインテグレーション][1]ページに移動します。
2. Datadog を検索し、タイルをクリックします。
3. Choose the recipients of Datadog alerts in Opsgenie using the **Responders** field.
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

## 収集データ

### メトリクス

Opsgenie インテグレーションには、メトリクスは含まれません。

### イベント

Opsgenie インテグレーションには、イベントは含まれません。

### サービスのチェック

Opsgenie インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://app.opsgenie.com/settings/integration/integration-list
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/account/settings
[4]: https://docs.datadoghq.com/ja/help/