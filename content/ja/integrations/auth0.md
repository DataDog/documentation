---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - ログの収集
  - セキュリティ
creates_events: false
ddtype: crawler
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/auth0/README.md'
display_name: Auth0
draft: false
git_integration_title: auth0
guid: 9308a35c-219e-4d24-ac11-af2511e5041a
integration_id: auth0
integration_title: Auth0
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: auth0.
metric_to_check: ''
name: auth0
public_title: Datadog-Auth0 インテグレーション
short_description: Auth0 イベントを表示し、分析します。
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Auth0 は、開発者や企業がアプリケーションを安全に保つために必要なビルディングブロックを提供する、開発チーム向けの認証プラットフォームです。


このインテグレーションにより、Auth0 の Log Streaming を活用して Datadog に直接ログを送信できます。ログは、Auth0 で生成される度にリアルタイムで送信されるので、顧客は利用中の Auth0 テナントに関する最新情報を得ることができます。このインテグレーションを利用する主なメリットの 1 つは、トレンドを把握するためにデータを収集して視覚化できることです。エンジニアリングチームは、エラー率とトラフィックデータを視覚化します。セキュリティチームは、認証トラフィックを視覚化し、リスクの高いアクションに対しアラートを設定します。

### インテグレーションの主な使用場面

#### アクティビティを ID データと関連付けて、トレンドを表面化

ID データからは、誰がどのようなアクティビティを行ったのかについて、重要なインサイトを得ることができます。このデータを活用することで、チームは使用中のシステム全体においてユーザー行動に関する理解を深めることができます。

#### システムのアーキテクチャや開発について情報に基づく意思決定を行う

アイデンティティのトレンドを長期間追跡することで、チームは製品開発やシステムのアーキテクチャについて、情報に基づいた判断をすることができます。例えば、ログイン時間のピークや認証アクティビティ、地理情報に紐づくアクティビティの追跡に基づき、開発の優先順位を決定できます。

#### パフォーマンスおよびセキュリティのインシデントに迅速に対応

ID 情報を使って、セキュリティやパフォーマンスのインシデントを迅速に特定することができます。例えば、ログインが異常な回数試みられ、失敗している場合は、クレデンシャルスタッフィング攻撃 (認証システムを標的とした最も一般的な脅威の 1 つ) の可能性を疑うことができます。

しきい値を構成することで、セキュリティチームは不審なイベントが発生した際に通知するためのアラートを設定でき、セキュリティインシデントにより早急に対応することができます。



## セットアップ

コンフィギュレーションはすべて [Auth0 ダッシュボード][1]で行います。

1. [Auth0 ダッシュボード][1]にログインします。
2. **Logs** > **Streams** の順に移動します。
3. **+ Create Stream** をクリックします。
4. Datadog を選択し、新しい Datadog イベントストリームにユニークな名前を入力します。
5. 次の画面で、以下の設定を Datadog イベントストリームに対して行います。


    | 設定          | 説明                                                |
    | ---------------- | ---------------------------------------------------------- |
    | `API Key`        | [Datadog API キー][2]を入力します。                           |
    | `Region`         | Datadog EU サイト（app.datadoghq.eu）の場合は `EU` を、それ以外の場合は `GLOBAL` を入力します。   |


6. Save をクリックします。

その後、Auth0 がテナントログを書き込む際に、ソースとサービスに `auth0` がセットされたログイベントのコピーを Datadog で受け取るようになります。

### 検証

ログを Datadog に表示します。

1. **Logs** > **Livetail** の順に移動します。
2. `source:auth0` を設定して、Auth0 ログを確認します。

## 収集データ

### ログ
Auth0 のログが収集され、Datadog に送信されます。送信されるログのタイプについては、[こちら][3]の説明を参照してください。

### メトリクス

auth0 には、メトリクスは含まれません。

### サービスのチェック

auth0 には、サービスのチェック機能は含まれません。

### イベント

auth0 には、イベントは含まれません。

## トラブルシューティング

ヘルプが必要な場合は、[Datadog サポート][4]までお問い合せください。
このインテグレーションの詳細は、Datadog の[ブログ記事][5]でご確認いただけます。

[1]: https://manage.auth0.com
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://auth0.com/docs/logs/references/log-event-type-codes
[4]: https://docs.datadoghq.com/ja/help/
[5]: https://www.datadoghq.com/blog/monitor-auth0-with-datadog/