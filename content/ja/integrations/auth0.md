---
app_id: auth0
app_uuid: 0c91d12e-f01e-47d9-8a07-4dba1cde4b67
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: auth0.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10098
    source_type_name: Auth0
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Auth0
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- インシデント
- ログの収集
- セキュリティ
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/auth0/README.md
display_on_public_website: true
draft: false
git_integration_title: auth0
integration_id: auth0
integration_title: Auth0
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: auth0
public_title: Auth0
short_description: Auth0 イベントを表示し、分析します。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Incidents
  - Category::Log Collection
  - Category::Security
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Auth0 イベントを表示し、分析します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Auth0
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Auth0 は、開発者や企業がアプリケーションを安全に保つために必要なビルディングブロックを提供する、開発チーム向けの認証プラットフォームです。


このインテグレーションにより、Auth0 の Log Streaming を活用して Datadog に直接ログを送信できます。ログは、Auth0 で生成される度にリアルタイムで送信されるので、顧客は利用中の Auth0 テナントに関する最新情報を得ることができます。このインテグレーションを利用する主なメリットの 1 つは、トレンドを把握するためにデータを収集して視覚化できることです。エンジニアリングチームは、エラー率とトラフィックデータを視覚化します。セキュリティチームは、認証トラフィックを視覚化し、リスクの高いアクションに対しアラートを設定します。

### 主なユースケース

#### アクティビティを ID データと関連付けて、トレンドを表面化

ID データからは、誰がどのようなアクティビティを行ったのかについて、重要なインサイトを得ることができます。このデータを活用することで、チームは使用中のシステム全体においてユーザー行動に関する理解を深めることができます。

#### システムのアーキテクチャや開発についての意思決定

アイデンティティのトレンドを長期間追跡することで、チームは製品開発やシステムのアーキテクチャについて、情報に基づいた判断をすることができます。例えば、ログイン時間のピークや認証アクティビティ、地理情報に紐づくアクティビティの追跡に基づき、開発の優先順位を決定できます。

#### パフォーマンスおよびセキュリティのインシデントに迅速に対応

ID 情報を使って、セキュリティやパフォーマンスのインシデントを迅速に特定することができます。例えば、ログインが異常な回数試みられ、失敗している場合は、クレデンシャルスタッフィング攻撃 (認証システムを標的とした最も一般的な脅威の 1 つ) の可能性を疑うことができます。

しきい値を構成することで、セキュリティチームは不審なイベントが発生した際に通知するためのアラートを設定でき、セキュリティインシデントにより早急に対応することができます。

## 計画と使用

コンフィギュレーションはすべて [Auth0 ダッシュボード][1]で行います。

1. [Auth0 ダッシュボード][1]にログインします。
2. **Logs** > **Streams** の順に移動します。
3. **+ Create Stream** をクリックします。
4. Datadog を選択し、新しい Datadog イベントストリームにユニークな名前を入力します。
5. 次の画面で、以下の設定を Datadog イベントストリームに対して行います。


    | 設定          | 説明                                                |
    | ---------------- | ---------------------------------------------------------- |
    | `API Key`        | [Datadog API キー][2]を入力します。                           |
    | `Region`           | ご使用の [Datadog サイト][3]。たとえば、app.datadoghq.eu の場合は `EU`、app.datadoghq.com の場合は `US1`、us3.datadoghq.com の場合は `US3`。 |


6. Save をクリックします。

その後、Auth0 がテナントログを書き込む際に、ソースとサービスに `auth0` がセットされたログイベントのコピーを Datadog で受け取るようになります。

### 検証

ログを Datadog に表示します。

1. **Logs** > **Livetail** の順に移動します。
2. `source:auth0` を設定して、Auth0 ログを確認します。

## リアルユーザーモニタリング

### 収集データ

Auth0 のログが収集され、Datadog に送信されます。送信されるログのタイプについては、[ログのイベントタイプコード][4]を参照してください。

### データセキュリティ

auth0 には、メトリクスは含まれません。

### ヘルプ

auth0 には、サービスのチェック機能は含まれません。

### ヘルプ

auth0 には、イベントは含まれません。

## ヘルプ

ヘルプが必要な場合は、[Datadog サポート][5]までお問い合せください。
このインテグレーションの詳細は、Datadog の[ブログ記事][6]でご確認いただけます。

[1]: https://manage.auth0.com
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://docs.datadoghq.com/ja/getting_started/site/
[4]: https://auth0.com/docs/logs/references/log-event-type-codes
[5]: https://docs.datadoghq.com/ja/help/
[6]: https://www.datadoghq.com/blog/monitor-auth0-with-datadog/