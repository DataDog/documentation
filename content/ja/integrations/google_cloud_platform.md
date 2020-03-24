---
aliases:
  - /ja/integrations/gcp/
categories:
  - cloud
  - google cloud
  - log collection
ddtype: 「クロール」
dependencies: []
description: 豊富な GCP メトリクスを収集してホストマップ内のインスタンスを視覚化。
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_platform/'
git_integration_title: google_cloud_platform
has_logo: true
integration_title: Google Cloud Platform
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: google_cloud_platform
public_title: Datadog-Google Cloud Platform インテグレーション
short_description: 豊富な GCP メトリクスを収集してホストマップ内のインスタンスを視覚化。
version: '1.0'
---
## 概要

Google Cloud Platform に接続して、すべての Google Compute Engine (GCE) ホストを Datadog に表示できます。GCE ホストタグと追加した GCE ラベルがホストに自動的にタグ付けされるため、Datadog のインフラストラクチャー概要にホストを表示し、分類することができます。

関連するインテグレーションは、次のとおりです。

| インテグレーション                       | 説明                                                             |
| --------------------------------- | ----------------------------------------------------------------------- |
| [App Engine][1]                   | スケーラブルなアプリケーションを構築できる PaaS (サービスとしてのプラットフォーム)             |
| [Big Query][2]                    | 企業向けデータウェアハウス                                               |
| [Bigtable][3]                     | NoSQL ビッグデータデータベースサービス                                         |
| [CloudSQL][4]                     | MySQL データベースサービス                                                  |
| [Cloud APIs][5]                   | すべての Google Cloud Platform サービス向けのプログラムインターフェイス          |
| [Cloud Composer][6]               | フルマネージド型のワークフローオーケストレーションサービス                          |
| [Cloud Dataproc][7]               | Apache Spark と Apache Hadoop のクラスターを実行するためのクラウドサービス     |
| [Cloud Filestore][8]              | 高パフォーマンスのフルマネージド型ファイルストレージ                            |
| [Cloud Firestore][9]              | モバイル、Web、およびサーバー開発向けの柔軟でスケーラブルなデータベース   |
| [Cloud Interconnect][10]          | ハイブリッド接続                                                     |
| [Cloud IoT][11]                   | セキュリティ保護されたデバイス接続および管理                                 |
| [Cloud Load Balancing][12]        | 負荷分散型コンピューティングリソースの分配                              |
| [Cloud Memorystore for Redis][13] | フルマネージド型のインメモリデータストアサービス                            |
| [Cloud Router][14]                | BGP を使用して、VPC とオンプレミスネットワークとの間でルートを交換  |
| [Cloud Run][15]                   | HTTP 経由でステートレスコンテナを実行するマネージド型のコンピューティングプラットフォーム    |
| [Cloud Tasks][16]                 | 分散型タスクキュー                                                 |
| [Cloud TPU][17]                   | 機械学習モデルのトレーニングと実行                                   |
| [Compute Engine][18]              | 高パフォーマンスの仮想マシン                                       |
| [Container Engine][19]            | Google が管理する Kubernetes                                           |
| [Datastore][20]                   | NoSQL データベース                                                          |
| [Firebase][21]                    | アプリケーション開発用のモバイルプラットフォーム                             |
| [Functions][22]                   | イベントベースのマイクロサービスを構築するためのサーバーレスプラットフォーム              |
| [Machine Learning][23]            | 機械学習サービス                                               |
| [Pub/Sub][24]                     | リアルタイムメッセージングサービス                                             |
| [Spanner][25]                     | 水平方向に拡張可能でグローバルな一貫性を持つリレーショナルデータベースサービス |
| [Stackdriver Logging][26]         | リアルタイムのログ管理および分析                                   |
| [Storage][27]                     | 統合型オブジェクトストレージ                                                  |
| [VPN][28]                         | マネージド型のネットワーク機能                                           |

## セットアップ

### メトリクスの収集

#### インストール

Datadog <> Google Cloud インテグレーションは、サービスアカウントを使用して Google Cloud と Datadog の間の API 接続を作成します。以下では、サービスアカウントを作成し、Datadog にサービスアカウント認証情報を提供して、自動的に API 呼び出しを開始するための手順を説明します。

1. Datadog インテグレーションをセットアップする Google Cloud プロジェクトの [Google Cloud 認証情報ページ][29]に移動します。
2. _認証情報を作成_を押し、次に_サービスアカウントキー_を選択します。

    {{< img src="integrations/google_cloud_platform/SelectServiceAccount.png" alt="設定" popup="true" style="width:80%;">}}

3. _サービスアカウント_のドロップダウンで、_新しいサービスアカウント_を選択します。
4. サービスアカウントに一意の名前を付けます。
5. _役割_では、Compute Engine —> Compute 閲覧者、モニタリング —> モニタリング閲覧者、および Cloud Asset —> Cloud Asset 閲覧者 を選択します。

   **注**: Compute Engine と Cloud Asset の役割を選択するには、サービスアカウントキー管理者である必要があります。選択されたすべての役割により、Datadog はユーザーに代わってメトリクス、タグ、イベント、ユーザーラベルを収集できます。

6. キーのタイプとして _JSON_ を選択し、_作成_を押します。このファイルはインストールを完了するために必要になるため、ファイルの保存場所をメモしておいてください。
7. [Datadog Google Cloud インテグレーションタイル][30]に移動します。
8. **Configuration** タブで、_Upload Key File_ を選択して、このプロジェクトを Datadog と統合します。
9. オプションで、タグを使用して、このインテグレーションから特定のホストを除外することもできます。この手順の詳細については、[下記](#configuration)を参照してください。

    {{< img src="integrations/google_cloud_platform/ServiceAccountAdded.png" alt="設定" popup="true" style="width:80%;">}}

10. _Install/Update_ を押します。
11. 複数のプロジェクトを監視する場合は、次の方法のいずれかを使用します。

    - 複数のサービスアカウントを使用する場合は、上のプロセスを繰り返します。
    - 同じサービスアカウントを使用する場合は、手順 6 でダウンロードした JSON ファイルで `project_id` を更新します。次に、手順 7 ～ 10 の説明に従って、このファイルを Datadog にアップロードします。

監視するプロジェクトで、[Google Cloud の課金][31]、[Stackdriver Monitoring API][32]、[Compute Engine API][33]、[Cloud Asset API][43] がすべて有効になっている必要があります。

#### コンフィグレーション

オプションで、**Limit Metric Collection** テキストボックスにタグを入力することで、Datadog にプルされる GCE インスタンスを制限できます。定義されたタグのいずれかに一致するホストだけが Datadog にインポートされます。複数のホストに一致するワイルドカード (1 文字の場合は `?`、複数文字の場合は `*`)、または特定のホストを除外する `!` を使用できます。次の例では、`c1*` サイズのインスタンスは含まれますが、ステージングホストは除外されます。

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

### ログの収集

GCE または GKE で実行されているアプリケーションの場合は、Datadog Agent を使用してローカルでログを収集できます。GCP サービスのログは、Stackdriver 経由で収集され、HTTP プッシュフォワーダーを使用して Cloud Pub/Sub へ送信されます。ログを収集するには、次の 5 つの手順を行う必要があります。

1. [Google Cloud Platform インテグレーション](#installation)をまだセットアップしていない場合は、最初にセットアップします。
2. [新しい Cloud Pub/Sub を作成](#create-a-cloud-pub-sub)します。
3. [ログを Datadog へ転送する Pub/Sub をセットアップ](#configure-the-pub-sub-to-forward-logs-to-datadog)します。
4. [Stackdriver から Pub/Sub へのログのエクスポート](#export-logs-from-stackdriver-to-the-pub-sub)を構成します。

**警告**: Pub/Sub は、[Google Cloud の割り当てと制限][34]の対象となります。Datadog は、ログ数がこの制限を上回る場合は、ログを複数の Pub/Sub に分割することをお勧めします。この制限に近づいたときに自動的に通知されるようにモニターを設定する方法については、[ログの転送を監視する](#monitor-the-log-forwarding)セクションを参照してください。

#### Cloud Pub/Sub を作成する

1. [Cloud Pub/Sub コンソール][35]に移動し、新しいトピックを作成します。

    {{< img src="integrations/google_cloud_platform/create_a_topic.png" alt="トピックを作成する" style="width:80%;">}}

2. トピックに `export-logs-to-datadog` のような明示的な名前を付け、_保存_します。

#### ログを Datadog へ転送する Pub/Sub を構成する

{{< tabs >}}
{{% tab "Datadog US site" %}}

1. 前の手順で作成した Pub/Sub に戻り、新しい`サブスクリプション`を追加します。

    {{< img src="integrations/google_cloud_platform/create_new_subscription.png" alt="新しいサブスクリプションを作成する" style="width:80%;">}}

2. 配信タイプとして `Push` を選択し、`https://gcp-intake.logs.datadoghq.com/v1/input/<DATADOG_API_KEY>/` と入力します。

    {{< img src="integrations/google_cloud_platform/push_method.png" alt="Push メソッド" style="width:80%;">}}

3. 最下部にある `作成` を押します。

これで、Pub/Sub が Stackdriver からログを受け取り、Datadog へ転送する準備ができました。

{{% /tab %}}
{{% tab "Datadog EU site" %}}

1. 前の手順で作成した Pub/Sub に戻り、新しい`サブスクリプション`を追加します。

    {{< img src="integrations/google_cloud_platform/create_new_subscription.png" alt="新しいサブスクリプションを作成する" style="width:80%;">}}

2. 配信タイプとして `Push` を選択し、`https://gcp-intake.logs.datadoghq.eu/v1/input/<DATADOG_API_KEY>/` と入力します。

    {{< img src="integrations/google_cloud_platform/push_method.png" alt="Push メソッド" style="width:80%;">}}

3. 最下部にある `作成` を押します。

これで、Pub/Sub が Stackdriver からログを受け取り、Datadog へ転送する準備ができました。

{{% /tab %}}
{{< /tabs >}}

#### Stackdriver から Pub/Sub へログをエクスポートする

1. [Stackdriver ページ][36]に移動し、エクスポートするログを絞り込みます。
2. `エクスポートを作成`を押し、シンクに適宜名前を付けます。
3. エクスポート先として `Cloud Pub/Sub` を選択し、エクスポート用に作成した Pub/Sub を選択します。この Pub/Sub は、別のプロジェクトに置くこともできます。

    {{< img src="integrations/google_cloud_platform/export_log_from_stackdriver.png" alt="Stackdriver からログをエクスポートする" style="width:80%;">}}

4. `作成`を押し、確認メッセージが表示されるまで待ちます。

**注**: 異なるシンクを使用して、Stackdriver から同じ Pub/Sub への複数のエクスポートを作成することができます。

**警告**: Pub/Sub は、[Google Cloud の割り当てと制限][34]の対象となります。Datadog は、ログ数がこの制限を上回る場合は、ログを複数の Pub/Sub に分割することをお勧めします。この制限に近づいたときに自動的に通知されるようにモニターを設定する方法については、[ログの転送を監視する](#monitor-the-log-forwarding)セクションを参照してください。

#### ログの転送を監視する

Pub/Sub は、[Google Cloud の割り当てと制限][34]の対象となります。Datadog は、ログ数がこの制限を上回る場合は、ログを複数の Pub/Sub に分割することをお勧めします。

この割り当てに達したときに自動的に通知されるようにするには、[Pub/Sub メトリクスインテグレーション][37]を有効にし、メトリクス `gcp.pubsub.subscription.backlog_bytes` に対してモニターをセットアップします。Datadog へログをエクスポートするサブスクリプションでこのモニター絞り込み、このメトリクスが 1 MB を超えないようにします。以下に例を示します。

{{< img src="integrations/google_cloud_platform/log_pubsub_monitoring.png" alt="Pub Sub 監視" style="width:80%;">}}

## 収集データ

### メトリクス

メトリクスについては、個別の Google Cloud インテグレーションのページを参照してください。

### イベント

Google Cloud Platform によって生成されたすべてのサービスイベントが [Datadog のイベントストリーム][38]に転送されます。

### サービスのチェック

Google Cloud Platform インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

### ユーザー定義の _gcp.logging_ メトリクスに不正なメタデータが適用される

非標準の _gcp.logging_ メトリクス ([Datadog に付属するログメトリクス以外のメトリクス][40]) に適用されるメタデータが Stackdriver と一致しない場合があります。

このような場合は、メタデータを手動で設定する必要があります。それには、[メトリクスサマリーページ][41]に移動し、問題となっているメトリクスを検索して選択し、メタデータの横にある鉛筆アイコンをクリックします。

ご不明な点は、[Datadog のサポートチーム][42]までお問い合わせください。

## その他の参考資料

### ナレッジベース

#### 割り当てられるタグ

タグは、Google Cloud Platform および Google Compute Engine に関するさまざまな構成オプションに基づいて、自動的に割り当てられます。自動的に割り当てられるタグを以下に示します。

- Zone
- Instance-type
- Instance-id
- Automatic-restart
- On-host-maintenance
- Project
- Numeric_project_id
- Name

また、`<key>:<value>` ラベルが付けられたホストは、それに応じてタグ付けされます。

[1]: https://docs.datadoghq.com/ja/integrations/google_app_engine
[2]: https://docs.datadoghq.com/ja/integrations/google_cloud_big_query
[3]: https://docs.datadoghq.com/ja/integrations/google_cloud_bigtable
[4]: https://docs.datadoghq.com/ja/integrations/google_cloudsql
[5]: https://docs.datadoghq.com/ja/integrations/google_cloud_apis
[6]: https://docs.datadoghq.com/ja/integrations/google_cloud_composer
[7]: https://docs.datadoghq.com/ja/integrations/google_cloud_dataproc
[8]: https://docs.datadoghq.com/ja/integrations/google_cloud_filestore
[9]: https://docs.datadoghq.com/ja/integrations/google_cloud_firestore
[10]: https://docs.datadoghq.com/ja/integrations/google_cloud_interconnect
[11]: https://docs.datadoghq.com/ja/integrations/google_cloud_iot
[12]: https://docs.datadoghq.com/ja/integrations/google_cloud_loadbalancing
[13]: https://docs.datadoghq.com/ja/integrations/google_cloud_redis
[14]: https://docs.datadoghq.com/ja/integrations/google_cloud_router
[15]: https://docs.datadoghq.com/ja/integrations/google_cloud_run
[16]: https://docs.datadoghq.com/ja/integrations/google_cloud_tasks
[17]: https://docs.datadoghq.com/ja/integrations/google_cloud_tpu
[18]: https://docs.datadoghq.com/ja/integrations/google_compute_engine
[19]: https://docs.datadoghq.com/ja/integrations/google_container_engine
[20]: https://docs.datadoghq.com/ja/integrations/google_cloud_datastore
[21]: https://docs.datadoghq.com/ja/integrations/google_cloud_firebase
[22]: https://docs.datadoghq.com/ja/integrations/google_cloud_functions
[23]: https://docs.datadoghq.com/ja/integrations/google_cloud_ml
[24]: https://docs.datadoghq.com/ja/integrations/google_cloud_pubsub
[25]: https://docs.datadoghq.com/ja/integrations/google_cloud_spanner
[26]: https://docs.datadoghq.com/ja/integrations/google_stackdriver_logging
[27]: https://docs.datadoghq.com/ja/integrations/google_cloud_storage
[28]: https://docs.datadoghq.com/ja/integrations/google_cloud_vpn
[29]: https://console.cloud.google.com/apis/credentials
[30]: http://app.datadoghq.com/account/settings#integrations/google_cloud_platform
[31]: https://support.google.com/cloud/answer/6293499?hl=en
[32]: https://console.cloud.google.com/apis/library/monitoring.googleapis.com
[33]: https://console.cloud.google.com/apis/library/compute.googleapis.com
[34]: https://cloud.google.com/pubsub/quotas#quotas
[35]: https://console.cloud.google.com/cloudpubsub/topicList
[36]: https://console.cloud.google.com/logs/viewer
[37]: https://docs.datadoghq.com/ja/integrations/google_cloud_pubsub/
[38]: https://app.datadoghq.com/event/stream
[39]: https://docs.datadoghq.com/ja/logs
[40]: https://docs.datadoghq.com/ja/integrations/google_stackdriver_logging/#metrics
[41]: https://app.datadoghq.com/metric/summary
[42]: https://docs.datadoghq.com/ja/help
[43]: https://console.cloud.google.com/apis/api/cloudasset.googleapis.com/overview