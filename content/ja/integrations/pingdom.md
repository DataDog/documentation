---
categories:
- notifications
dependencies: []
description: レガシー Pingdom モニタリングエンドポイントの既存の構成を管理し、移行します。
doc_link: https://docs.datadoghq.com/integrations/pingdom/
draft: false
git_integration_title: pingdom
has_logo: true
integration_id: ''
integration_title: Pingdom Legacy API (V2.1)
integration_version: ''
is_public: true
manifest_version: '1.0'
name: pingdom
public_title: Datadog-Pingdom Legacy API (V2.1) インテグレーション
short_description: レガシー Pingdom モニタリングエンドポイントの既存の構成を管理し、移行します。
team: web-integrations
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

<div class="alert alert-danger">
このインテグレーションは非推奨であり、依存する API はいつサポートを失うかわかりません。代わりに <a href="https://docs.datadoghq.com/integrations/pingdom_v3/" class="alert-link">Datadog Pingdom V3 インテグレーション</a>を使用してください。
</div>

他のイベントやメトリクスに関連付けて、ユーザー中心の Pingdom パフォーマンスメトリクスを Datadog で追跡します。

Datadog は、Pingdom Web サイトで構成されているすべてのサイトの `response_time` メトリクスを追跡します。

[インテグレーションステータスモニター][1]を構成することで、Pingdom イベントを追加できます。

<div class="alert alert-info">
メトリクスのインポートは、Starter レベル以上の Pingdom ユーザーで行うことができます。
</div>

## 計画と使用

### インフラストラクチャーリスト

1. Pingdom インテグレーションタイルを開きます。
2. Pingdom アカウントのユーザー名とパスワードを入力します (チームアカウントがある場合は、ご自身の認証情報を使用し、チェックの取得元のアカウントを指定できます)。
3. 一部のチェックをオフにして無視したり、生成されるイベントにタグを追加することもできます。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "pingdom" >}}


### ヘルプ

Pingdom インテグレーションには、イベントは含まれません。

### ヘルプ

Pingdom インテグレーションは、トランザクションチェックを取得し、それをサービスチェックとしてレポートします。

`pingdom.status` チェックについて、以下の表に、Pingdom トランザクションチェックの結果と Datadog サービスチェックの結果の対応関係を示します。

| Datadog ステータス | Pingdom ステータス      |
| -------------- | ------------------- |
| `OK`           | `up`                |
| `CRITICAL`     | `down`              |
| `WARNING`      | `unconfirmed_down`  |
| `UNKNOWN`      | `unknown`、`paused` |

## ヘルプ

### ユーザー名またはパスワードの更新時にエラーが発生する

Pingdom 認証情報の保存時に以下のエラーが表示されることがあります。

`“There was an issue while testing your Pingdom configuration: Not permitted for account type”`.

Pingdom アカウント所有者の電子メールアドレスを **(Optional) Account to query** フィールドに追加し、保存してください。

[1]: https://app.datadoghq.com/monitors/create/integration
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/pingdom/pingdom_metadata.csv