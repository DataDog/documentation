---
app_id: pingdom
app_uuid: bde11e46-65f6-4cee-b011-f0944c5fb5bb
assets:
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check: pingdom.response_time
      metadata_path: metadata.csv
      prefix: pingdom.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 8
    source_type_name: Pingdom Legacy API (V2.1)
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- モニター
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: pingdom_legacy
integration_id: pingdom
integration_title: Pingdom Legacy API (V2.1)
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: pingdom_legacy
public_title: Pingdom Legacy API (V2.1)
short_description: レガシー Pingdom モニタリングエンドポイントの既存構成を管理および移行します。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Offering::Integration
  - Category::Metrics
  configuration: README.md#Setup
  description: レガシー Pingdom モニタリングエンドポイントの既存構成を管理および移行します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Pingdom Legacy API (V2.1)
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

<div class="alert alert-warning">
このインテグレーションは非推奨であり、依存する API はいつサポートを失うかわかりません。代わりに <a href="https://docs.datadoghq.com/integrations/pingdom_v3/" class="alert-link">Datadog Pingdom V3 インテグレーション</a>を使用してください。
</div>

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
{{< get-metrics-from-git "pingdom_legacy" >}}


### イベント

Pingdom インテグレーションには、イベントは含まれません。

### サービスチェック

Pingdom インテグレーションは、トランザクションチェックを取得し、それをサービスチェックとしてレポートします。

`pingdom.status` チェックについて、以下の表に、Pingdom トランザクションチェックの結果と Datadog サービスチェックの結果の対応関係を示します。

| Datadog ステータス | Pingdom ステータス      |
| -------------- | ------------------- |
| `OK`           | `up`                |
| `CRITICAL`     | `down`              |
| `WARNING`      | `unconfirmed_down`  |
| `UNKNOWN`      | `unknown`、`paused` |

## トラブルシューティング

### ユーザー名またはパスワードの更新時にエラーが発生する

Pingdom 認証情報の保存時に以下のエラーが表示されることがあります。

`“There was an issue while testing your Pingdom configuration: Not permitted for account type”`.

Pingdom アカウント所有者の電子メールアドレスを **(Optional) Account to query** フィールドに追加し、保存してください。

[1]: https://app.datadoghq.com/monitors/create/integration
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/pingdom/pingdom_metadata.csv