---
aliases:
  - /ja/integrations/gcp/
categories:
  - cloud
  - google cloud
  - log collection
ddtype: クローラー
dependencies: []
description: 豊富な GCP メトリクスを収集してホスト内のインスタンスを視覚化 map.
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_platform/'
git_integration_title: google_cloud_platform
has_logo: true
integration_title: Google Cloud Platform
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: google_cloud_platform
public_title: Datadog-Google Cloud Platform インテグレーション
short_description: 豊富な GCP メトリクスを収集してホスト内のインスタンスを視覚化 a host map.
version: '1.0'
---
## 概要

Google Cloud Platform に接続して、すべての Google Compute Engine (GCE) ホストを Datadog に表示できます。GCE ホストタグと追加した GCE ラベルがホストに自動的にタグ付けされるため、Datadog のインフラストラクチャー概要にホストを表示し、分類することができます。

関連するインテグレーションは、次のとおりです。

| インテグレーション                       | 説明                                                             |
|-----------------------------------|-------------------------------------------------------------------------|
| [App Engine][1]                   | スケーラブルなアプリケーションを構築できる PaaS (サービスとしてのプラットフォーム)             |
| [Big Query][2]                    | 企業向けデータウェアハウス                                               |
| [Bigtable][32]                    | NoSQL ビッグデータデータベースサービス                                         |
| [CloudSQL][3]                     | MySQL データベースサービス                                                  |
| [Cloud APIs][43]                  | すべての Google Cloud Platform サービス向けのプログラムインターフェイス          |
| [Cloud Composer][35]              | フルマネージド型のワークフローオーケストレーションサービス                          |
| [Cloud Dataproc][36]              | Apache Spark と Apache Hadoop のクラスターを実行するためのクラウドサービス     |
| [Cloud Filestore][38]             | 高パフォーマンスのフルマネージド型ファイルストレージ                            |
| [Cloud Firestore][37]             | モバイル、Web、およびサーバー開発向けの柔軟でスケーラブルなデータベース   |
| [Cloud Interconnect][39]          | ハイブリッド接続                                                     |
| [Cloud IoT][33]                   | セキュリティ保護されたデバイス接続および管理                                 |
| [Cloud Load Balancing][40]        | 負荷分散型コンピューティングリソースの分配                              |
| [Cloud Memorystore for Redis][41] | フルマネージド型のインメモリデータストアサービス                            |
| [Cloud Router][42]                | BGP を使用して、VPC とオンプレミスネットワークとの間でルートを交換  |
| [Cloud Run][4]                    | HTTP 経由でステートレスコンテナを実行するマネージド型のコンピューティングプラットフォーム    |
| [Cloud Tasks][34]                 | 分散型タスクキュー                                                 |
| [Cloud TPU][44]                   | 機械学習モデルのトレーニングと実行                                   |
| [Compute Engine][5]               | 高パフォーマンスの仮想マシン                                       |
| [Container Engine][6]             | Google が管理する Kubernetes                                           |
| [Datastore][7]                    | NoSQL データベース                                                          |
| [Firebase][8]                     | アプリケーション開発用のモバイルプラットフォーム                             |
| [Functions][9]                    | イベントベースのマイクロサービスを構築するためのサーバーレスプラットフォーム              |
| [Machine Learning][10]            | 機械学習サービス                                               |
| [Pub/Sub][11]                     | リアルタイムメッセージングサービス                                             |
| [Spanner][12]                     | 水平方向に拡張可能でグローバルな一貫性を持つリレーショナルデータベースサービス |
| [Stackdriver Logging][13]         | リアルタイムのログ管理および分析                                   |
| [Storage Gateway][14]                     | 統合型オブジェクトストレージ                                                  |
| [VPN][15]                         | マネージド型のネットワーク機能                                           |

## セットアップ
### メトリクスの収集
#### インストール

Datadog <> Google Cloud インテグレーションは、サービスアカウントを使用して Google Cloud と Datadog の間の API 接続を作成します。以下では、サービスアカウントを作成し、Datadog にサービスアカウント認証情報を提供して、自動的に API 呼び出しを開始するための手順を説明します。

1. Datadog インテグレーションをセットアップする Google Cloud プロジェクトの [Google Cloud 認証情報ページ][16]に移動します。
2. 認証情報を作成を押し、次にサービスアカウントキーを選択します。

    {{< img src="integrations/google_cloud_platform/SelectServiceAccount.png" alt="settings"   style="width:80%;">}}

3. サービスアカウントのドロップダウンで、新しいサービスアカウントを選択します。
4. サービスアカウントに一意の名前を付けます。
5. 役割では、Compute Engine —> Compute 閲覧者、モニタリング —> モニタリング閲覧者、および Cloud Asset —> Cloud Asset 閲覧者 を選択します。

    **注**: これらの役割により、Datadog がメトリクス、タグ、イベント、ユーザーラベルを自動的に収集できます。

6. キーのタイプとして JSON を選択し、作成を押します。このファイルはインストールを完了するために必要になるため、ファイルの保存場所をメモしておいてください。
7. [Datadog Google Cloud インテグレーションタイル][17]に移動します。
8. **Configuration** タブで、Upload Key File を選択して、このプロジェクトを Datadog と統合します。
9. オプションで、タグを使用して、このインテグレーションから特定のホストを除外することもできます。この手順の詳細については、[下記](#configuration)を参照してください。

    {{< img src="integrations/google_cloud_platform/ServiceAccountAdded.png" alt="settings"   style="width:80%;">}}

10. Install/Update を押します。
11. 複数のプロジェクトを監視する場合は、次の方法のいずれかを使用します。
    * 複数のサービスアカウントを使用する場合は、上のプロセスを繰り返します。
    * 同じサービスアカウントを使用する場合は、手順 6 でダウンロードした JSON ファイルで `project_id` を更新します。次に、手順 7 ～ 10 の説明に従って、このファイルを Datadog にアップロードします。

監視するプロジェクトで、[Google Cloud の課金][18]、[Stackdriver Monitoring API][19]、および [Compute Engine API][20] がすべて有効になっている必要があります。

#### コンフィグレーション

オプションで、**Limit Metric Collection** テキストボックスにタグを入力することで、Datadog にプルされる GCE インスタンスを制限できます。定義されたタグのいずれかに一致するホストだけが Datadog にインポートされます。複数のホストに一致するワイルドカード (1 文字の場合は `?`、複数文字の場合は `*`)、または特定のホストを除外する `!` を使用できます。次の例では、`c1*` サイズのインスタンスは含まれますが、ステージングホストは除外されます。

```
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

### ログの収集

GCE または GKE で実行されているアプリケーションの場合は、Datadog Agent を使用してローカルでログを収集できます。GCP サービスのログは、Stackdriver 経由で収集され、HTTP プッシュフォワーダーを使用して Cloud Pub/Sub へ送信されます。ログを収集するには、次の 5 つの手順を行う必要があります。

1. [Google Cloud Platform インテグレーション](#installation)をまだセットアップしていない場合は、最初にセットアップします。
2. [新しい Cloud Pub/Sub を作成](#create-a-cloud-pub-sub)します。
3. [ログを Datadog へ転送する Pub/Sub をセットアップ](#configure-the-pub-sub-to-forward-logs-to-datadog)します。
4. [Stackdriver から Pub/Sub へのログのエクスポート](#export-logs-from-stackdriver-to-the-pub-sub)を構成します。

**警告**: Pub/Sub は、[Google Cloud の割り当てと制限][45]の対象となります。ログ数がこの制限を上回る場合は、ログを複数の Pub/Sub に分割することをお勧めします。この制限に近づいたときに自動的に通知されるようにモニターを設定する方法については、[ログの転送を監視する](#monitor-the-log-forwarding)セクションを参照してください。

#### Cloud Pub/Sub を作成する

1. [Cloud Pub/Sub コンソール][21]に移動し、新しいトピックを作成します。

    {{< img src="integrations/google_cloud_platform/create_a_topic.png" alt="Create a topic"  style="width:80%;">}}

2. トピックに `export-logs-to-datadog` のような明示的な名前を付け、保存します。

#### ログを Datadog へ転送する Pub/Sub を構成する

{{< tabs >}}
{{% tab "Datadog US site" %}}

1. 前の手順で作成した Pub/Sub に戻り、新しい`サブスクリプション`を追加します。

    {{< img src="integrations/google_cloud_platform/create_new_subscription.png" alt="Create a new subscription"  style="width:80%;">}}

2. 配信タイプとして `Push` を選択し、`https://gcp-intake.logs.datadoghq.com/v1/input/<DATADOG_API_KEY>/` と入力します。

    {{< img src="integrations/google_cloud_platform/push_method.png" alt="Push method"  style="width:80%;">}}

3. 最下部にある `作成` を押します。

これで、Pub/Sub が Stackdriver からログを受け取り、Datadog へ転送する準備ができました。

{{% /tab %}}
{{% tab "Datadog EU site" %}}

1. 前の手順で作成した Pub/Sub に戻り、新しい`サブスクリプション`を追加します。

    {{< img src="integrations/google_cloud_platform/create_new_subscription.png" alt="Create a new subscription"  style="width:80%;">}}

2. 配信タイプとして `Push` を選択し、`https://gcp-intake.logs.datadoghq.eu/v1/input/<DATADOG_API_KEY>/` と入力します。

    {{< img src="integrations/google_cloud_platform/push_method.png" alt="Push method"  style="width:80%;">}}

3. 最下部にある `作成` を押します。

これで、Pub/Sub が Stackdriver からログを受け取り、Datadog へ転送する準備ができました。

{{% /tab %}}
{{< /tabs >}}

#### Stackdriver から Pub/Sub へログをエクスポートする

1. [Stackdriver ページ][25]に移動し、エクスポートするログを絞り込みます。
2. `エクスポートを作成`を押し、シンクに適宜名前を付けます。
3. エクスポート先として `Cloud Pub/Sub` を選択し、エクスポート用に作成した Pub/Sub を選択します。この Pub/Sub は、別のプロジェクトに置くこともできます。

    {{< img src="integrations/google_cloud_platform/export_log_from_stackdriver.png" alt="Export log from Stackdriver"  style="width:80%;">}}

4. `作成`を押し、確認メッセージが表示されるまで待ちます。

**注**: 異なるシンクを使用して、Stackdriver から同じ Pub/Sub への複数のエクスポートを作成することができます。

**警告**: Pub/Sub は、[Google Cloud の割り当てと制限][45]の対象となります。ログ数がこの制限を上回る場合は、ログを複数の Pub/Sub に分割することをお勧めします。この制限に近づいたときに自動的に通知されるようにモニターを設定する方法については、[ログの転送を監視する](#monitor-the-log-forwarding)セクションを参照してください。

#### ログの転送を監視する

Pub/Sub は、[Google Cloud の割り当てと制限][45]の対象となります。ログ数がこの制限を上回る場合は、ログを複数の Pub/Sub に分割することをお勧めします。

この割り当てに達したときに自動的に通知されるようにするには、[Pub/Sub メトリクスインテグレーション][46]を有効にし、Datadog へログをエクスポートするサブスクリプションで絞り込んだメトリクス `gcp.pubsub.subscription.backlog_bytes` に対してモニターをセットアップして、このメトリクスが 1 MB を超えないようにします。以下に例を示します。

    {{< img src="integrations/google_cloud_platform/log_pubsub_monitoring.png" alt="Pub Sub monitoring"  style="width:80%;">}}

## 収集データ
### メトリクス

メトリクスについては、個別の Google Cloud インテグレーションのページを参照してください。

### イベント

Google Cloud Platform によって生成されたすべてのサービスイベントが [Datadog のイベントストリーム][27]に転送されます。Stackdriver でキャプチャされた他のイベントは、現時点では利用できませんが、将来 [Datadog のログ管理製品][28]に追加される予定です。

### サービスのチェック
Google Cloud Platform インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

### ユーザー定義の gcp.logging メトリクスに不正なメタデータが適用される

非標準の gcp.logging メトリクス ([Datadog に付属するログメトリクス以外のメトリクス][29]) に適用されるメタデータが Stackdriver と一致しない場合があります。

このような場合は、メタデータを手動で設定する必要があります。それには、[メトリクスサマリーページ][30]に移動し、問題となっているメトリクスを検索して選択し、メタデータの横にある鉛筆アイコンをクリックします。

ご不明な点は、[Datadog のサポートチーム][31]までお問合せください。

## その他の参考資料
### ナレッジベース
#### 割り当てられるタグ

タグは、Google Cloud Platform および Google Compute Engine に関するさまざまな構成オプションに基づいて、自動的に割り当てられます。自動的に割り当てられるタグを以下に示します。

* Zone
* Instance-type
* Instance-id
* Automatic-restart
* On-host-maintenance
* Project
* Numeric_project_id
* Name

また、`<key>:<value>` ラベルが付けられたホストは、それに応じてタグ付けされます。


[1]: https://docs.datadoghq.com/ja/integrations/google_app_engine
[2]: https://docs.datadoghq.com/ja/integrations/google_cloud_big_query
[3]: https://docs.datadoghq.com/ja/integrations/google_cloudsql
[4]: https://docs.datadoghq.com/ja/integrations/google_cloud_run
[5]: https://docs.datadoghq.com/ja/integrations/google_compute_engine
[6]: https://docs.datadoghq.com/ja/integrations/google_container_engine
[7]: https://docs.datadoghq.com/ja/integrations/google_cloud_datastore
[8]: https://docs.datadoghq.com/ja/integrations/google_cloud_firebase
[9]: https://docs.datadoghq.com/ja/integrations/google_cloud_functions
[10]: https://docs.datadoghq.com/ja/integrations/google_cloud_ml
[11]: https://docs.datadoghq.com/ja/integrations/google_cloud_pubsub
[12]: https://docs.datadoghq.com/ja/integrations/google_cloud_spanner
[13]: https://docs.datadoghq.com/ja/integrations/google_stackdriver_logging
[14]: https://docs.datadoghq.com/ja/integrations/google_cloud_storage
[15]: https://docs.datadoghq.com/ja/integrations/google_cloud_vpn
[16]: https://console.cloud.google.com/apis/credentials
[17]: http://app.datadoghq.com/account/settings#integrations/google_cloud_platform
[18]: https://support.google.com/cloud/answer/6293499?hl=en
[19]: https://console.cloud.google.com/apis/library/monitoring.googleapis.com
[20]: https://console.cloud.google.com/apis/library/compute.googleapis.com
[21]: https://console.cloud.google.com/cloudpubsub/topicList
[22]: https://search.google.com/search-console/welcome
[23]: https://app.datadoghq.com/account/settings#api
[24]: https://console.cloud.google.com/apis/credentials/domainverification
[25]: https://console.cloud.google.com/logs/viewer
[26]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_platform/google_cloud_platform_metadata.csv
[27]: https://app.datadoghq.com/event/stream
[28]: https://docs.datadoghq.com/ja/logs
[29]: https://docs.datadoghq.com/ja/integrations/google_stackdriver_logging/#metrics
[30]: https://app.datadoghq.com/metric/summary
[31]: https://docs.datadoghq.com/ja/help
[32]: https://docs.datadoghq.com/ja/integrations/google_cloud_bigtable
[33]: https://docs.datadoghq.com/ja/integrations/google_cloud_iot
[34]: https://docs.datadoghq.com/ja/integrations/google_cloud_tasks
[35]: https://docs.datadoghq.com/ja/integrations/google_cloud_composer
[36]: https://docs.datadoghq.com/ja/integrations/google_cloud_dataproc
[37]: https://docs.datadoghq.com/ja/integrations/google_cloud_firestore
[38]: https://docs.datadoghq.com/ja/integrations/google_cloud_filestore
[39]: https://docs.datadoghq.com/ja/integrations/google_cloud_interconnect
[40]: https://docs.datadoghq.com/ja/integrations/google_cloud_loadbalancing
[41]: https://docs.datadoghq.com/ja/integrations/google_cloud_redis
[42]: https://docs.datadoghq.com/ja/integrations/google_cloud_router
[43]: https://docs.datadoghq.com/ja/integrations/google_cloud_apis
[44]: https://docs.datadoghq.com/ja/integrations/google_cloud_tpu
[45]: https://cloud.google.com/pubsub/quotas#quotas
[46]: https://docs.datadoghq.com/ja/integrations/google_cloud_pubsub/


{{< get-dependencies >}}