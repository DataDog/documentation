---
aliases:
- /ja/integrations/gcp/
categories:
- cloud
- google cloud
- iot
- log collection
- network
dependencies: []
description: 豊富な GCP メトリクスを収集してホストマップ内のインスタンスを視覚化。
doc_link: https://docs.datadoghq.com/integrations/google_cloud_platform/
draft: false
git_integration_title: google_cloud_platform
has_logo: true
integration_id: google-cloud-platform
integration_title: Google Cloud Platform
integration_version: ''
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
Datadog の GCP インテグレーションは、<a href="https://cloud.google.com/monitoring/api/metrics_gcp">すべての Google Cloud メトリクス</a>を収集するように構築されています。Datadog では継続的にドキュメントを更新してすべてのサブインテグレーションを表示できるように努めていますが、新しいメトリクスやサービスがクラウドサービスから次々にリリースされるため、インテグレーション一覧が追い付かないことがあります。
</div>

| インテグレーション                       | 説明                                                             |
| --------------------------------- | ----------------------------------------------------------------------- |
| [App Engine][1]                   | スケーラブルなアプリケーションを構築できる PaaS (サービスとしてのプラットフォーム)             |
| [Big Query][2]                    | 企業向けデータウェアハウス                                               |
| [Bigtable][3]                     | NoSQL ビッグデータデータベースサービス                                         |
| [Cloud SQL][4]                    | MySQL データベースサービス                                                  |
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
| [Kubernetes Engine][23]           | クラスターマネージャーとオーケストレーションシステム                                |
| [機械学習][24]            | 機械学習サービス                                               |
| [Pub/Sub][25]                     | リアルタイムメッセージングサービス                                             |
| [Spanner][26]                     | 水平方向に拡張可能でグローバルな一貫性を持つリレーショナルデータベースサービス |
| [Cloud Logging][27]               | リアルタイムのログ管理および分析                                   |
| [Storage][28]                     | 統合型オブジェクトストレージ                                                  |
| [VPN][29]                         | マネージド型のネットワーク機能                                           |

## セットアップ

### メトリクスの収集

#### インストール

{{% site-region region="gov" %}}
<div class="alert alert-warning">
    サービスアカウントのなりすましは、{{< region-param key="dd_site_name" >}} サイトでは使用できません。
</div>
{{% /site-region %}}

[サービスアカウントのなりすまし][30]やプロジェクトの自動検出を利用して、Datadog と [Google Cloud][31] をインテグレーションすることが可能です。

この方法では、関連するプロジェクトに IAM ロールを割り当てることで、サービスアカウントに見えるすべてのプロジェクトを監視することができます。これらのロールをプロジェクトに個別に割り当てることもできますし、組織やフォルダレベルでこれらのロールを割り当てることで、プロジェクトのグループを監視するように Datadog を構成することもできます。このようにロールを割り当てることで、Datadog は、将来的にグループに追加される可能性のある新しいプロジェクトを含め、与えられたスコープ内のすべてのプロジェクトを自動的に発見し監視することができます。

##### 前提条件

* 組織でドメインによるアイデンティティを制限している場合、Datadog の顧客アイデンティティをポリシーで許可値として追加する必要があります。Datadog の顧客アイデンティティ: `C0147pk0i`

* サービスアカウントのなりすましとプロジェクトの自動検出は、プロジェクトを監視するために特定のロールと API が有効になっていることに依存しています。開始する前に、監視するプロジェクトで以下の API が有効になっていることを確認してください。
  * [Cloud Resource Manager API][32]
  * [Google Cloud Billing API][33]
  * [Cloud Monitoring API][34]
  * [Compute Engine API][35]
  * [Cloud Asset API][36]
  * [IAM API][37]

##### 1. Google Cloud サービスのアカウントを作成する

1. [Google Cloud コンソール][38]を開きます。
2. **IAM & Admin** > **Service Accounts** に移動します。
3. 上部の **Create service account** をクリックします。
4. サービスアカウントに一意の名前を付け、それから **Create and continue** をクリックします。
5. サービスアカウントに以下のロールを追加します。
   * Monitoring Viewer
   * Compute Viewer
   * Cloud Asset Viewer
   * Browser
6. **Continue**、**Done** の順にクリックすると、サービスアカウントの作成が完了します。

{{< img src="integrations/google_cloud_platform/create-service-account.png" alt="Google Cloud コンソールのインターフェイスで、'Create service account' フローを表示しています。'Grant this service account access to project' の下に、説明にある 4 つのロールが追加されています。" style="width:70%;">}}

##### 2. サービスアカウントに Datadog プリンシパルを追加する

1. Datadog で、[**Integrations** > **Google Cloud Platform**][39] に移動します。
2. **Add GCP Account** をクリックします。構成されたプロジェクトがない場合、自動的にこのページにリダイレクトされます。
3. Datadog プリンシパルを生成していない場合は、**Generate Principal** ボタンをクリックします。
4. Datadog プリンシパルをコピーして、次のセクションのために保管しておきます。
   {{< img src="integrations/google_cloud_platform/principal-2.png" alt="Datadog のインターフェイスで、'Add New GCP Account' フローを表示しています。最初のステップである 'Add Datadog Principal to Google' では、ユーザーが Datadog プリンシパルを生成してクリップボードにコピーするためのテキストボックスが表示されます。2 番目のステップである 'Add Service Account Email’ では、ユーザーがセクション 3 で入力するテキストボックスがあります。" style="width:70%;">}}
   [次のセクション](#3-complete-the-integration-setup-in-datadog)では、このウィンドウを開いたままにしておきます。
5. [Google Cloud コンソール][38]の **Service Acounts** メニューから、[最初のセクション](#1-create-your-google-cloud-service-account)で作成したサービスアカウントを見つけてください。
6. **Permissions** タブを開き、**Grant Access** をクリックします。
   {{< img src="integrations/google_cloud_platform/grant-access.png" alt="Google Cloud コンソールインターフェイスで、Service Accounts の下にある Permissions タブを表示しています。" style="width:70%;">}}
7. Datadog プリンシパルを **New principals** テキストボックスに貼り付けます。
8. **Service Account Token Creator** のロールを割り当て、**Save** をクリックします。
   {{< img src="integrations/google_cloud_platform/add-principals-blurred.png" alt="Google Cloud コンソールのインターフェイスで、'Add principals' ボックスと 'Assign roles' インターフェイスを表示しています。" style="width:70%;">}}

**注**: 以前に Datadog の共有プリンシパルを使用してアクセスを構成した場合、これらの手順を完了した後、そのプリンシパルの権限を取り消すことができます。

##### 3. Datadog でインテグレーション設定を完了する

1. Google Cloud コンソールで、**Service Account** > **Details** タブに移動します。そこには、この Google サービスアカウントに関連するメールが記載されています。これは、`<sa-name>@datadog-sandbox.iam.gserviceaccount.com` に似ています。
2. このメールをコピーします。
3. Datadog のインテグレーション構成タイル ([前セクション](#2-add-the-datadog-principal-to-your-service-account)で Datadog プリンシパルをコピーしたところ) に戻ります。
4. **Add Service Account Email** の下にあるボックスに、以前コピーしたメールを貼り付けます。
5. **Verify and Save Account** をクリックします。

約 15 分で、Datadog にメトリクスが表示されます。

##### 4. 他のプロジェクトにロールを割り当てる (オプション)

プロジェクトの自動検出により、監視対象のプロジェクトを追加するプロセスが簡素化されます。サービスアカウントに他のプロジェクト、フォルダ、または組織へのアクセスを許可すると、Datadog はこれらのプロジェクト (およびフォルダや組織にネストされたプロジェクト) を検出し、自動的にインテグレーションタイルに追加します。

1. 希望するスコープでロールを割り当てるための適切な権限があることを確認してください。
   * Project IAM Admin (またはそれ以上)
   * Folder Admin
   * Organization Admin
2. Google Cloud コンソールで、**IAM** ページに移動します。
3. プロジェクト、フォルダ、または組織を選択します。
4. リソースに対して他のロールをまだ持っていないプリンシパルにロールを付与するには、**Grant Access** をクリックし、先に作成したサービスアカウントのメールを入力します。
5. 以下のロールを割り当てます。
   * Compute Viewer
   * Monitoring Viewer
   * Cloud Asset Viewer


   **注**: Browser ロールは、サービスアカウントのデフォルトプロジェクトにのみ必要です。
6. **保存**をクリックします。

#### コンフィギュレーション

オプションで、特定のプロジェクトのドロップダウンメニューの下にある **Limit Metric Collection** テキストボックスにタグを入力することで、Datadog にプルされる GCE インスタンスを制限できます。定義されたタグのいずれかに一致するホストだけが Datadog にインポートされます。複数のホストに一致するワイルドカード (1 文字の場合は `?`、複数文字の場合は `*`)、または特定のホストを除外する `!` を使用できます。次の例では、`c1*` サイズのインスタンスは含まれますが、ステージングホストは除外されます。

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

詳細については、[ラベルの作成と管理][40]に関する Google のドキュメントを参照してください。

### ログの収集

GCE または GKE で実行されているアプリケーションの場合は、Datadog Agent を使用してローカルでログを収集できます。GCP サービスのログは、Google Cloud Logging で収集され、HTTP プッシュフォワーダーを使用して Cloud Pub/Sub へ送信されます。ログを収集するには、次の 5 つの手順を行う必要があります。

1. [Google Cloud Platform インテグレーション](#installation)をまだセットアップしていない場合は、最初にセットアップします。
2. [新しい Cloud Pub/Sub を作成](#create-a-cloud-pub-sub)します。
3. [ログを Datadog へ転送する Pub/Sub をセットアップ](#forward-logs-to-datadog)します。
4. [Google Cloud から Pub/Sub へのログのエクスポート](#export-logs-from-google-cloud)を構成します。

**警告**: Pub/Sub は、[Google Cloud の割り当てと制限][37]の対象となります。Datadog では、ログ数がこの制限を上回る場合は、ログを複数のトピックに分割することをお勧めしています。この制限に近づいたときに自動的に通知されるようにモニターを設定する方法については、[ログの転送を監視する](#monitor-the-log-forwarding)セクションを参照してください。

#### Cloud Pub/Sub を作成する

1. [Cloud Pub/Sub コンソール][42]に移動し、新しいトピックを作成します。

    {{< img src="integrations/google_cloud_platform/create_a_topic.png" alt="トピックを作成する" style="width:80%;">}}

2. トピックに `export-logs-to-datadog` のような明示的な名前を付け、_保存_します。

#### ログを Datadog に転送する

1. Pub/Sub Topics の概要ページに戻り、左側のナビゲーションで、`Subscriptions` の選択を追加します。`Create Subscription` を選択します。
2. サブスクリプション ID を作成し、先に作成したトピックを選択します。
3. `Push` メソッドを選択し、以下を入力します: `https://gcp-intake.logs.{{< region-param key="dd_site" code="true" >}}/api/v2/logs?dd-api-key=<DATADOG_API_KEY>&dd-protocol=gcp`

   [API キー][43]を作成または [Datadog Organization Settings -> API Keys][44] で既存の API キーを選択できます。


4. **サブスクリプションの有効期限**、**承認期限**、**メッセージの保存期間**、**デッドレター** など、他のオプションを構成します。
5. **Retry policy** で、`Retry after exponential backoff delay` を選択します。
6. 最下部にある `作成` を押します。

Pub/Sub が Google Cloud Logging からログを受け取り、Datadog へ転送する準備ができました。

#### Google Cloud からログをエクスポート

1. [ログエクスプローラーページ][45]に移動し、エクスポートするログを絞り込みます。
2. **Log Router** タブより、**Create Sink** を選択します。
3. シンクに名前を設定します。
4. エクスポート先として _Cloud Pub/Sub_ を選択し、エクスポート用に作成された Pub/Sub を選択します。**注**: この Pub/Sub は別のプロジェクト内に配置することもできます。

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Google Cloud Pub/Sub ログを Pub Sub へエクスポート" >}}

5. **Create Sink**をクリックし、確認メッセージが表示されるまで待ちます。

**注**: 異なるシンクを使用して、Google Cloud Logging から同じ Pub/Sub への複数のエクスポートを作成することができます。

**警告**: Pub/Sub は、[Google Cloud の割り当てと制限][37]の対象となります。Datadog では、ログ数がこの制限を上回る場合は、ログを複数のトピックに分割することをお勧めしています。この制限に近づいたときに自動的に通知されるようにモニターを設定する方法については、[ログの転送を監視する](#monitor-the-log-forwarding)セクションを参照してください。

#### ログの転送を監視する

Pub/Sub は、[Google Cloud の割り当てと制限][41]の対象となります。Datadog では、ログ数がこの制限を上回る場合は、複数のフィルターでログをトピック毎に分割することをお勧めしています。

この割り当てに達したときに自動的に通知されるようにするには、[Pub/Sub メトリクスインテグレーション][25]を有効にし、メトリクス `gcp.pubsub.subscription.num_outstanding_messages` でモニターをセットアップします。Datadog へログをエクスポートするサブスクリプションでこのモニター絞り込み、このメトリクスが 1000 を超えないようにします。以下に例を示します。

{{< img src="integrations/google_cloud_platform/log_pubsub_monitoring-v2.png" alt="Pub Sub 監視" style="width:80%;">}}

#### ログのサンプリング

オプションとして、[sample 関数][46]を使用することで、クエリ中にログをサンプリングすることができます。例えば、ログの 10% だけを取り込むには、`sample(insertId, 0.1)` を使用します。

## 収集データ

### メトリクス

メトリクスについては、個別の Google Cloud インテグレーションのページを参照してください。

### イベント

Google Cloud Platform によって生成されたすべてのサービスイベントが [Datadog のイベントストリーム][47]に転送されます。

### サービスのチェック

Google Cloud Platform インテグレーションには、サービスのチェック機能は含まれません。

### タグ

タグは、Google Cloud Platform と Google Compute Engine の様々な構成オプションに基づいて自動的に割り当てられます。`project_id` タグは、すべてのメトリクスに追加されます。追加のタグは、利用可能な場合に Google Cloud Platform から収集され、メトリクスの種類に応じて異なります。

また、Datadog は以下をタグとして収集します。

- `<キー>:<値>` ラベルが付けられたホスト。
- Custom labels from Google Pub/Sub、GCE、Cloud SQL、Cloud Storage のカスタムラベル

## トラブルシューティング

### ユーザー定義の _gcp.logging_ メトリクスに不正なメタデータが適用される

非標準の _gcp.logging_ メトリクス ([Datadog に付属するログメトリクス以外のメトリクス][48]など) に適用されるメタデータが Google Cloud Logging と一致しない場合があります。

このような場合は、メタデータを手動で設定する必要があります。それには、[メトリクスサマリーページ][49]に移動し、問題となっているメトリクスを検索して選択し、メタデータの横にある鉛筆アイコンをクリックします。

ご不明な点は、[Datadog のサポートチーム][50]までお問い合わせください。


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
[23]: https://docs.datadoghq.com/ja/integrations/google_kubernetes_engine/
[24]: https://docs.datadoghq.com/ja/integrations/google_cloud_ml/
[25]: https://docs.datadoghq.com/ja/integrations/google_cloud_pubsub/
[26]: https://docs.datadoghq.com/ja/integrations/google_cloud_spanner/
[27]: https://docs.datadoghq.com/ja/integrations/google_stackdriver_logging/
[28]: https://docs.datadoghq.com/ja/integrations/google_cloud_storage/
[29]: https://docs.datadoghq.com/ja/integrations/google_cloud_vpn/
[30]: https://cloud.google.com/iam/docs/service-account-overview#impersonation
[31]: /ja/integrations/google_cloud_platform/
[32]: https://console.cloud.google.com/apis/library/cloudresourcemanager.googleapis.com
[33]: https://console.cloud.google.com/apis/library/cloudbilling.googleapis.com
[34]: https://console.cloud.google.com/apis/library/monitoring.googleapis.com
[35]: https://console.cloud.google.com/apis/library/compute.googleapis.com
[36]: https://console.cloud.google.com/apis/library/cloudasset.googleapis.com
[37]: https://console.cloud.google.com/apis/library/iam.googleapis.com
[38]: https://console.cloud.google.com/
[39]: https://app.datadoghq.com/integrations/google-cloud-platform
[40]: https://cloud.google.com/compute/docs/labeling-resources
[41]: https://cloud.google.com/pubsub/quotas#quotas
[42]: https://console.cloud.google.com/cloudpubsub/topicList
[43]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[44]: https://app.datadoghq.com/organization-settings/api-keys
[45]: https://console.cloud.google.com/logs/viewer
[46]: https://cloud.google.com/logging/docs/view/logging-query-language#sample
[47]: https://app.datadoghq.com/event/stream
[48]: https://docs.datadoghq.com/ja/integrations/google_stackdriver_logging/#metrics
[49]: https://app.datadoghq.com/metric/summary
[50]: https://docs.datadoghq.com/ja/help/