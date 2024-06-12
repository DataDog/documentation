---
app_id: buddy
app_uuid: f9d740e2-31b5-427c-a65b-41984656cc73
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: buddy.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10004
    source_type_name: Buddy
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Buddy
  sales_email: support@buddy.works
  support_email: support@buddy.works
categories:
- automation
- developer tools
- event management
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/buddy/README.md
display_on_public_website: true
draft: false
git_integration_title: buddy
integration_id: buddy
integration_title: Buddy
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: buddy
public_title: Buddy
short_description: Web 開発者向けのワンクリック自動配信および作業中 Web サイトのプレビュー機能。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Category::Developer Tools
  - Category::Event Management
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Web 開発者向けのワンクリック自動配信および作業中 Web サイトのプレビュー機能。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Buddy
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要
Buddy は、Web サイトやアプリケーションのビルド、テスト、デプロイに使用できる継続的インテグレーション自動化プラットフォームです。

Buddy インテグレーションにより、以下のことが可能になります。

- Buddy のデプロイメントに関するイベントを Datadog に送信できます。
- デプロイの詳細を Datadog のメトリクスと関連付けることができます。
- パイプラインのパフォーマンススパイクの原因を検出できます。

![Datadog インテグレーション][1]

## 計画と使用

- Datadog のアカウント設定で、[Integrations -> APIs][2] に移動し、**API キー**トークンをコピーします。

- [Buddy アカウントにサインイン][3]し、追跡したいデプロイメントアクションを含むパイプラインに移動します。

- パイプラインの末尾にあるプラス記号をクリックし、**Notifications** セクションで **Datadog** を選択します。

- Datadog アカウントの名前を入力し、コピーした API キーを貼り付けます。

- [Buddy のパラメーター][4]を使用して、送信されるイベントとコンテンツのタイトルを定義します。次に例を示します。

```text
# イベントタイトル
${'${execution.pipeline.name} execution #${execution.id}'}

# コンテンツ
${'${execution.to_revision.revision} - ${execution.to_revision.message}'}
```

- 準備ができたら、**Add action** をクリックしてパイプラインを実行します。すべての成功したデプロイについて、Buddy から Datadog にイベントが送信されます。

![スナップショット][5]

## リアルユーザーモニタリング

### データセキュリティ

Buddy チェックには、メトリクスは含まれません。

### ヘルプ

すべての Buddy デプロイイベントが [Datadog のイベントストリーム][6]に送信されます。

### ヘルプ

Buddy チェックには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][7]までお問い合わせください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/buddy/images/datadog-integration.png
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.buddy.works/login
[4]: https://buddy.works/knowledge/deployments/what-parameters-buddy-use
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/buddy/images/snapshot.png
[6]: https://docs.datadoghq.com/ja/events/
[7]: https://docs.datadoghq.com/ja/help/