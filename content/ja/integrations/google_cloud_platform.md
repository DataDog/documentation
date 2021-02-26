---
aliases:
  - /ja/integrations/gcp/
categories:
  - cloud
  - google cloud
  - log collection
ddtype: crawler
dependencies: []
description: 豊富な GCP メトリクスを収集してホストマップ内のインスタンスを視覚化。
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_platform/'
draft: false
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

<div class="alert alert-warning">
Datadog の GCP インテグレーションは、<a href="https://cloud.google.com/monitoring/api/metrics_gcp">StackDriver からすべてのメトリクス</a>を収集するように構築されています。Datadog では継続的にドキュメントを更新してすべてのサブインテグレーションを表示できるように努めていますが、新しいメトリクスやサービスがクラウドサービスから次々にリリースされるため、インテグレーション一覧が追い付かないことがあります。
</div>

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

**注**: 監視するプロジェクトで、[Google Cloud の課金][29]、[Stackdriver Monitoring API][30]、[Compute Engine API][31]、[Cloud Asset API][32] がすべて有効になっている必要があります。

1. Datadog インテグレーションをセットアップする Google Cloud プロジェクトの [Google Cloud 認証情報ページ][33]に移動します。
2. _Create credentials_ (画面上付近) をクリックし、_Service account_ を選択します。

    {{< img src="integrations/google_cloud_platform/SelectServiceAccount2.png" alt="設定" popup="true" style="width:80%;">}}

3. サービスアカウントに一意の名前を付け、_Create_ をクリックします。
4. 役割に Compute 閲覧者、モニタリング閲覧者、Cloud Asset 閲覧者を追加し、_Done_ をクリックします。

   **注**: Compute Engine と Cloud Asset の役割を選択するには、サービスアカウントキー管理者である必要があります。選択されたすべての役割により、Datadog はユーザーに代わってメトリクス、タグ、イベント、ユーザーラベルを収集できます。

5. ページ下部に表示されるサービスアカウントの中から、先ほど作成したものを選択します。_Add Key_ -> _Create new key_ の順にクリックし、種類として _JSON_ を選択します。その後 _Create_　および _Save_ をクリックします。インストールの完了に必要となるため、このファイルの保存場所をメモしておいてください。
6. [Datadog Google Cloud インテグレーションタイル][34]に移動します。
7. **Configuration** タブで、_Upload Key File_ を選択して、このプロジェクトを Datadog と統合します。
8. オプションで、タグを使用して、このインテグレーションから特定のホストを除外することもできます。この手順の詳細については、[下記](#configuration)を参照してください。

    {{< img src="integrations/google_cloud_platform/ServiceAccountAdded.png" alt="設定" popup="true" style="width:80%;">}}

9. _Install/Update_ を押します。
10. 複数のプロジェクトを監視する場合は、次の方法のいずれかを使用します。

    - 複数のサービスアカウントを使用する場合は、上のプロセスを繰り返します。
    - 同じサービスアカウントを使用する場合は、手順 6 でダウンロードした JSON ファイルで `project_id` を更新します。次に、手順 7 ～ 10 の説明に従って、このファイルを Datadog にアップロードします。

#### コンフィギュレーション

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

**警告**: Pub/Sub は、[Google Cloud の割り当てと制限][35]の対象となります。Datadog では、ログ数がこの制限を上回る場合は、ログを複数のトピックに分割することをお勧めしています。この制限に近づいたときに自動的に通知されるようにモニターを設定する方法については、[ログの転送を監視する](#ログの転送を監視する)セクションを参照してください。

#### Cloud Pub/Sub を作成する

1. [Cloud Pub/Sub コンソール][36]に移動し、新しいトピックを作成します。

    {{< img src="integrations/google_cloud_platform/create_a_topic.png" alt="トピックを作成する" style="width:80%;">}}

2. トピックに `export-logs-to-datadog` のような明示的な名前を付け、_保存_します。

#### ログを Datadog へ転送する Pub/Sub を構成する

{{< tabs >}}
{{% tab "Datadog US site" %}}

1. Pub/Sub Topics の概要ページに戻り、左側のナビゲーションで、`Subscriptions` の選択を追加します。`Create Subscription` を選択します。
2. サブスクリプション ID を作成し、先に作成したトピックを選択します。
3. 配信タイプとして `Push` を選択し、`https://gcp-intake.logs.datadoghq.com/v1/input/<DATADOG_API_KEY>/` と入力します。

  {{< img src="integrations/google_cloud_platform/select_push_method.png" alt="Push メソッド" style="width:80%;">}}

4. **サブスクリプションの有効期限**、**承認期限**、**メッセージの保存期間**、**デッドレター** など、他のオプションを設定します。
5. 最下部にある `作成` を押します。

これで、Pub/Sub が Stackdriver からログを受け取り、Datadog へ転送する準備ができました。

{{% /tab %}}
{{% tab "Datadog EU site" %}}

1. Pub/Sub Topics の概要ページに戻り、左側のナビゲーションで、`Subscriptions` の選択を追加します。`Create Subscription` を選択します。
2. サブスクリプション ID を作成し、先に作成したトピックを選択します。
3. 配信タイプとして `Push` を選択し、`https://gcp-intake.logs.datadoghq.eu/v1/input/<DATADOG_API_KEY>/` と入力します。

  {{< img src="integrations/google_cloud_platform/select_push_method.png" alt="Push メソッド" style="width:80%;">}}

4. **サブスクリプションの有効期限**、**承認期限**、**メッセージの保存期間**、**デッドレター** など、他のオプションを設定します。
5. 最下部にある `作成` を押します。

{{% /tab %}}
{{< /tabs >}}

#### Stackdriver から Pub/Sub へログをエクスポートする

1. [ログエクスプローラーページ][37]に移動し、エクスポートするログを絞り込みます。
2. **Actions** メニューから **Create Sink** を選択します。
3. シンクに名前を設定します。
4. エクスポート先として _Cloud Pub/Sub_ を選択し、エクスポート用に作成された Pub/Sub を選択します。**注**: この Pub/Sub は別のプロジェクト内に配置することもできます。

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Google Cloud Pub/Sub ログを Pub Sub へエクスポート" >}}

5. **Create Sink**をクリックし、確認メッセージが表示されるまで待ちます。

**注**: 異なるシンクを使用して、Stackdriver から同じ Pub/Sub への複数のエクスポートを作成することができます。

**警告**: Pub/Sub は、[Google Cloud の割り当てと制限][35]の対象となります。Datadog では、ログ数がこの制限を上回る場合は、ログを複数のトピックに分割することをお勧めしています。この制限に近づいたときに自動的に通知されるようにモニターを設定する方法については、[ログの転送を監視する](#ログの転送を監視する)セクションを参照してください。

#### ログの転送を監視する

Pub/Sub は、[Google Cloud の割り当てと制限][35]の対象となります。Datadog では、ログ数がこの制限を上回る場合は、複数のフィルターでログをトピック毎に分割することをお勧めしています。

この割り当てに達したときに自動的に通知されるようにするには、[Pub/Sub メトリクスインテグレーション][24]を有効にし、メトリクス `gcp.pubsub.subscription.num_outstanding_messages` でモニターをセットアップします。Datadog へログをエクスポートするサブスクリプションでこのモニター絞り込み、このメトリクスが 1000 を超えないようにします。以下に例を示します。

{{< img src="integrations/google_cloud_platform/log_pubsub_monitoring-v2.png" alt="Pub Sub 監視" style="width:80%;">}}

## 収集データ

### メトリクス

メトリクスについては、個別の Google Cloud インテグレーションのページを参照してください。

### イベント

Google Cloud Platform によって生成されたすべてのサービスイベントが [Datadog のイベントストリーム][38]に転送されます。

### サービスのチェック

Google Cloud Platform インテグレーションには、サービスのチェック機能は含まれません。

### タグ

タグは、Google Cloud Platform および Google Compute Engine に関するさまざまな構成オプションに基づいて、自動的に割り当てられます。自動的に割り当てられるタグを以下に示します。

- Zone
- Instance-type
- Instance-id
- Automatic-restart
- On-host-maintenance
- Project
- Numeric_project_id
- 名前

また、Datadog は以下をタグとして収集します。

- `<キー>:<値>` ラベルが付けられたホスト。
- Custom labels from Google Pub/Sub、GCE、CloudSQL、Cloud Storage のカスタムラベル

## トラブルシューティング

### ユーザー定義の _gcp.logging_ メトリクスに不正なメタデータが適用される

非標準の _gcp.logging_ メトリクス ([Datadog に付属するログメトリクス以外のメトリクス][39]) では、適用されるメタデータが Stackdriver と一致しない場合があります。

このような場合は、メタデータを手動で設定する必要があります。設定するには、[メトリクスサマリーページ][40]に移動し、問題のメトリクスを検索して選択し、メタデータの横にある鉛筆アイコンをクリックします。

ご不明な点は、[Datadog のサポートチーム][41]までお問合せください。


[1]: https://docs.datadoghq.com/ja/integrations/google_app_engine/
[2]: https://docs.datadoghq.com/ja/integrations/google_cloud_big_query/
[3]: https://docs.datadoghq.com/ja/integrations/google_cloud_bigtable/
[4]: https://docs.datadoghq.com/ja/integrations/google_cloudsql/
[5]: https://docs.datadoghq.com/ja/integrations/google_cloud_apis/
[6]: https://docs.datadoghq.com/ja/integrations/google_cloud_composer/
[7]: https://docs.datadoghq.com/ja/integrations/google_cloud_dataproc/
[8]: https://docs.datadoghq.com/ja/integrations/google_cloud_filestore/
[9]: https://docs.datadoghq.com/ja/integrations/google_cloud_firestore/
[10]: https://docs.datadoghq.com/ja/integrations/google_cloud_interconnect/
[11]: https://docs.datadoghq.com/ja/integrations/google_cloud_iot/
[12]: https://docs.datadoghq.com/ja/integrations/google_cloud_loadbalancing/
[13]: https://docs.datadoghq.com/ja/integrations/google_cloud_redis/
[14]: https://docs.datadoghq.com/ja/integrations/google_cloud_router/
[15]: https://docs.datadoghq.com/ja/integrations/google_cloud_run/
[16]: https://docs.datadoghq.com/ja/integrations/google_cloud_tasks/
[17]: https://docs.datadoghq.com/ja/integrations/google_cloud_tpu/
[18]: https://docs.datadoghq.com/ja/integrations/google_compute_engine/
[19]: https://docs.datadoghq.com/ja/integrations/google_container_engine/
[20]: https://docs.datadoghq.com/ja/integrations/google_cloud_datastore/
[21]: https://docs.datadoghq.com/ja/integrations/google_cloud_firebase/
[22]: https://docs.datadoghq.com/ja/integrations/google_cloud_functions/
[23]: https://docs.datadoghq.com/ja/integrations/google_cloud_ml/
[24]: https://docs.datadoghq.com/ja/integrations/google_cloud_pubsub/
[25]: https://docs.datadoghq.com/ja/integrations/google_cloud_spanner/
[26]: https://docs.datadoghq.com/ja/integrations/google_stackdriver_logging/
[27]: https://docs.datadoghq.com/ja/integrations/google_cloud_storage/
[28]: https://docs.datadoghq.com/ja/integrations/google_cloud_vpn/
[29]: https://support.google.com/cloud/answer/6293499?hl=en
[30]: https://console.cloud.google.com/apis/library/monitoring.googleapis.com
[31]: https://console.cloud.google.com/apis/library/compute.googleapis.com
[32]: https://console.cloud.google.com/apis/api/cloudasset.googleapis.com/overview
[33]: https://console.cloud.google.com/apis/credentials
[34]: http://app.datadoghq.com/account/settings#integrations/google_cloud_platform
[35]: https://cloud.google.com/pubsub/quotas#quotas
[36]: https://console.cloud.google.com/cloudpubsub/topicList
[37]: https://console.cloud.google.com/logs/viewer
[38]: https://app.datadoghq.com/event/stream
[39]: https://docs.datadoghq.com/ja/integrations/google_stackdriver_logging/#metrics
[40]: https://app.datadoghq.com/metric/summary
[41]: https://docs.datadoghq.com/ja/help/