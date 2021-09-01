---
"categories":
- "monitoring"
- "notification"
"ddtype": "crawler"
"dependencies": []
"description": "Pingdom が収集したアップタイム、応答時間、アラートを Datadog で参照。"
"doc_link": "https://docs.datadoghq.com/integrations/pingdom/"
"draft": false
"git_integration_title": "pingdom"
"has_logo": true
"integration_id": ""
"integration_title": "Pingdom"
"is_public": true
"kind": "インテグレーション"
"manifest_version": "1.0"
"name": "pingdom"
"public_title": "Datadog-Pingdom インテグレーション"
"short_description": "Pingdom が収集したアップタイム、応答時間、アラートを Datadog で参照。"
"version": "1.0"
---

## 概要

他のイベントやメトリクスに関連付けて、ユーザー中心の Pingdom パフォーマンスメトリクスを Datadog で追跡します。

Datadog は、Pingdom Web サイトで構成されているすべてのサイトの `response_time` メトリクスを追跡します。

[インテグレーションステータスモニター][1]を構成することで、Pingdom イベントを追加できます。

<div class="alert alert-info">
メトリクスのインポートは、Starter レベル以上の Pingdom ユーザーで行うことができます。
</div>

## セットアップ

### インストール

1. Pingdom インテグレーションタイルを開きます。
2. Pingdom アカウントのユーザー名とパスワードを入力します (チームアカウントがある場合は、ご自身の認証情報を使用し、チェックの取得元のアカウントを指定できます)。
3. 一部のチェックをオフにして無視したり、生成されるイベントにタグを追加することもできます。

## 収集データ

### メトリクス
{{< get-metrics-from-git "pingdom" >}}


### イベント

Pingdom インテグレーションには、イベントは含まれません。

### サービスのチェック

Pingdom インテグレーションは、トランザクションチェックを取得し、それをサービスチェックとしてレポートします。

`pingdom.status` チェックについて、以下の表に、Pingdom トランザクションチェックの結果と Datadog サービスチェックの結果の対応関係を示します。

| Datadog ステータス | Pingdom ステータス      |
| -------------- | ------------------- |
| `OK`           | `up`                |
| `CRITICAL`     | `down`              |
| `WARNING`      | `unconfirmed_down`  |
| `UNKNOWN`      | `unknown`、`paused` |

## トラブルシューティング

### ユーザー/パスワードの更新時にエラーを受け取るのはなぜですか

Pingdom 認証情報の保存時に以下が表示されることがあります。

`“There was an issue while testing your Pingdom configuration: Not permitted for account type”`.

Pingdom アカウント所有者の電子メールアドレスを **(Optional) Account to query** フィールドに追加し、保存してください。

[1]: https://app.datadoghq.com/monitors#create/integration
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/pingdom/pingdom_metadata.csv

