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
ddtype: check
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

開発チーム向けの認証プラットフォーム、Auth0 は開発者や企業がアプリケーションを安全に保つために必要なビルディングブロックを提供します。



Datadog とのインテグレーションは、Auth0 の Log Streaming が請負います。これは、ログイベントが Auth0 で生成されるごとに一括送信する機能で、これにより顧客は Auth0 テナントの最新情報を取得できます。Log streaming は従来の 10 倍以上のログを送信でき、エラー処理で配信も保証しています。一般的なウェブフックもリリースできるようになったため、大部分のサードパーティー製ツールへほぼリアルタイムでログを配信することができます。


#### Datadog とのインテグレーションにより次のようなメリットが挙げられます。

余計な開発時間をかけずに Auth0 データを視覚化

Datadog を使用する主なメリットの 1 つは、傾向を把握するためにデータを収集して視覚化できることです。エンジニアリングチームは、それを利用してエラー率とトラフィックデータを視覚化します。セキュリティチームは、それを利用して認証トラフィックを視覚化し、リスクの高いアクションに対しアラートを設定します。


#### ID データ

ID データはこれらすべての使用事例に対し重要な知見を提供するため、チームはよりよく問題を把握し、情報に基づいた判断をすることができます。

#### システムのアーキテクチャや開発について情報に基づく意思決定を行う

識別に関する傾向を経時的に追跡することで、チームは製品開発やシステムのアーキテクチャに関して情報に基づいた判断をすることができます。たとえば、認証データを使い製品開発における優先順位を決めることができます。また、ユーザーがアプリにアクセスする場所とピークのログイン時間を追跡することで、システムアーキテクチャチームはリソースを拡張する時間と場所を判断することができます。


#### パフォーマンスおよびセキュリティのインシデントに迅速に対応

履歴データを監視して傾向を特定するのに加え、ID 情報を使用してセキュリティおよびパフォーマンスのインシデントを迅速に特定することも同じくらい重要です。たとえば、ログイン試行の失敗回数が急激に増える原因として、クレデンシャルスタッフィング攻撃（認証システムを標的とした最も一般的な脅威の 1 つ）の可能性を疑うことができます。

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

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://manage.auth0.com
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://auth0.com/docs/logs/references/log-event-type-codes
[4]: https://docs.datadoghq.com/ja/help/