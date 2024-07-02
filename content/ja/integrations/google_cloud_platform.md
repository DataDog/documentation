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
further_reading:
- link: https://www.datadoghq.com/blog/cspm-for-gcp-with-datadog/
  tag: ブログ
  text: Datadog による Google Cloud 環境のコンプライアンスとセキュリティポスチャの改善
- link: https://www.datadoghq.com/blog/google-cloud-vertex-ai-monitoring-datadog/
  tag: ブログ
  text: Datadog による Google Cloud Vertex AI の監視
- link: https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/
  tag: ブログ
  text: Datadog による Dataflow パイプラインの監視
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_gcp_sts
  tag: Terraform
  text: Terraform による Google Cloud インテグレーションの作成と管理
- link: https://www.datadoghq.com/blog/track-bigquery-costs-performance/
  tag: ブログ
  text: Datadog による BigQuery の監視
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

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Google Cloud Platform に接続して、すべての Google Compute Engine (GCE) ホストを Datadog に表示できます。GCE ホストタグと追加した GCE ラベルがホストに自動的にタグ付けされるため、Datadog のインフラストラクチャー概要にホストを表示し、分類することができます。

<div class="alert alert-warning">
Datadog の GCP インテグレーションは、<a href="https://cloud.google.com/monitoring/api/metrics_gcp">すべての Google Cloud メトリクス</a>を収集するように構築されています。Datadog では継続的にドキュメントを更新してすべてのサブインテグレーションを表示できるように努めていますが、新しいメトリクスやサービスがクラウドサービスから次々にリリースされるため、インテグレーション一覧が追い付かないことがあります。
</div>

| Datadog クリップボード                         | 説明                                                                           |
|-------------------------------------|---------------------------------------------------------------------------------------|
| [App Engine][1]                     | スケーラブルなアプリケーションを構築できる PaaS (サービスとしてのプラットフォーム)                           |
| [Big Query][2]                      | 企業向けデータウェアハウス                                                             |
| [Bigtable][3]                       | NoSQL ビッグデータデータベースサービス                                                       |
| [Cloud SQL][4]                      | MySQL データベースサービス                                                                |
| [Cloud APIs][5]                     | すべての Google Cloud Platform サービス向けのプログラムインターフェイス                        |
| [Cloud Armor][6]                   | DoS 攻撃や Web 攻撃から保護するネットワークセキュリティサービス    |
| [Cloud Composer][7]                 | フルマネージド型のワークフローオーケストレーションサービス                                        |
| [Cloud Dataproc][8]                 | Apache Spark と Apache Hadoop のクラスターを実行するためのクラウドサービス                   |
| [Cloud Dataflow][9]                | ストリームおよびバッチモードでデータを変換し、リッチ化するためのフルマネージドサービス |
| [Cloud Filestore][10]                | 高パフォーマンスのフルマネージド型ファイルストレージ                                          |
| [Cloud Firestore][11]                | モバイル、Web、およびサーバー開発向けの柔軟でスケーラブルなデータベース                 |
| [Cloud Interconnect][12]            | ハイブリッド接続                                                                   |
| [Cloud IoT][13]                     | セキュリティ保護されたデバイス接続および管理                                               |
| [Cloud Load Balancing][14]          | 負荷分散型コンピューティングリソースの分配                                            |
| [Cloud Logging][15]                 | リアルタイムのログ管理および分析                                                 |
| [Cloud Memorystore for Redis][16]   | フルマネージド型のインメモリデータストアサービス                                          |
| [Cloud Router][17]                  | BGP を使用して、VPC とオンプレミスネットワークとの間でルートを交換                |
| [Cloud Run][18]                     | HTTP 経由でステートレスコンテナを実行するマネージド型のコンピューティングプラットフォーム                  |
| [Cloud Security Command Center][19] | Security Command Center は脅威レポートサービスです。                                |
| [Cloud Tasks][20]                   | 分散型タスクキュー                                                               |
| [Cloud TPU][21]                     | 機械学習モデルのトレーニングと実行                                                 |
| [Compute Engine][22]                | 高パフォーマンスの仮想マシン                                                     |
| [Container Engine][23]              | Google が管理する Kubernetes                                                         |
| [Datastore][24]                     | NoSQL データベース                                                                        |
| [Firebase][25]                      | アプリケーション開発用のモバイルプラットフォーム                                           |
| [Functions][26]                     | イベントベースのマイクロサービスを構築するためのサーバーレスプラットフォーム                            |
| [Kubernetes Engine][27]             | クラスターマネージャーとオーケストレーションシステム                                              |
| [Machine Learning][28]              | 機械学習サービス                                                             |
| [Private Service Connect][29]       | プライベート VPC 接続でマネージドサービスにアクセスする
| [Pub/Sub][30]                       | リアルタイムメッセージングサービス                                                           |
| [Spanner][31]                       | 水平方向に拡張可能でグローバルな一貫性を持つリレーショナルデータベースサービス               |
| [Storage][32]                       | 統合型オブジェクトストレージ                                                                |
| [Vertex AI][33]                     | カスタムの機械学習 (ML) モデルの構築、トレーニング、デプロイを行います。                          |
| [VPN][34]                           | マネージド型のネットワーク機能                                                         |

## 計画と使用

Datadog の Google Cloud インテグレーションをセットアップして、Google Cloud サービスからメトリクスとログを収集します。

### 前提条件

* 組織でドメインによるアイデンティティを制限している場合、Datadog の顧客アイデンティティをポリシーで許可値として追加する必要があります。Datadog の顧客アイデンティティ: `C0147pk0i`

* サービスアカウントのなりすましとプロジェクトの自動検出は、プロジェクト監視のために特定のロールと API が有効化されていることを前提としています。開始する前に、監視するプロジェクトで以下の API が有効になっていることを確認してください。
  * [Cloud Resource Manager API][35]
  * [Google Cloud Billing API][36]
  * [Cloud Monitoring API][37]
  * [Compute Engine API][38]
  * [Cloud Asset API][39]
  * [IAM API][40]

### メトリクスの収集

#### インフラストラクチャーリスト

{{% site-region region="gov" %}}
<div class="alert alert-warning">
サービスアカウントの権限委譲は {{< region-param key="dd_site_name" >}} サイトでは利用できません。
</div>
{{% /site-region %}}

Datadog と [Google Cloud][42] のインテグレーションには、[サービスアカウントの権限委譲][41]とプロジェクトの自動検出を使用することができます。

この方法では、関連するプロジェクトに IAM ロールを割り当てることで、サービスアカウントから見えるすべてのプロジェクトを監視することができます。これらのロールを個別にプロジェクトに割り当てることも、組織レベルやフォルダレベルでこれらのロールを割り当てて、プロジェクトのグループを監視するように Datadog を構成することもできます。このようにロールを割り当てることで、Datadog は、将来グループに追加される可能性のある新しいプロジェクトを含め、指定されたスコープ内のすべてのプロジェクトを自動的に検出して監視することができます。

#### 1. Google Cloud サービスアカウントを作成する

1. [Google Cloud コンソール][43]を開きます。
2. **IAM & Admin** > **Service Accounts** に移動します。
3. 一番上の **Create service account** をクリックします。
4. サービスアカウントに固有の名前を付け、**Create and continue** をクリックします。
5. サービスアカウントに以下のロールを追加します。
* Monitoring Viewer
* Compute Viewer
* Cloud Asset Viewer
* Browser
6. **Continue**、**Done** の順にクリックすると、サービスアカウントの作成が完了します。

{{< img src="integrations/google_cloud_platform/create-service-account.png" alt="'Create service account' を表示している Google Cloud コンソールのインターフェイス。'Grant this service account access to project' の下に、説明にある 4 つのロールが追加されています。" style="width:70%;">}}

#### 2. サービスアカウントに Datadog プリンシパルを追加する

1. Datadog で [**Integrations** > **Google Cloud Platform**][44] に移動します。
2. **Add GCP Account** をクリックします。プロジェクトが構成されていない場合は、自動的にこのページにリダイレクトされます。
3. 組織の Datadog プリンシパルを生成していない場合は、**Generate Principal** ボタンをクリックします。
4. Datadog プリンシパルをコピーして、次のセクションで使用します。
{{< img src="integrations/google_cloud_platform/principal-2.png" alt="'Add New GCP Account' フローを表示している Datadog インターフェイス。最初のステップ 'Add Datadog Principal to Google' では、ユーザーが Datadog プリンシパルを生成してクリップボードにコピーするためのテキストボックスがあります。2 番目のステップである 'Add Service Account Email' には、ユーザーがセクション 3 で入力するテキストボックスがあります。" style="width:70%;">}}
このウィンドウは[次のセクション](#3-Complete-the-integration-setup-in-Datadog)まで開いておいてください。
5. [Google Cloud コンソール][43]の **Service Acounts** メニューから、[最初のセクション](#1-create-your-google-cloud-service-account)で作成したサービスアカウントを探します。
6. **Permissions** タブに移動し、**Grant Access** をクリックします。
{{< img src="integrations/google_cloud_platform/grant-access.png" alt="Google Cloud コンソールのインターフェイスで、Service Accounts の下に Permissions タブが表示されています。" style="width:70%;">}}
7. Datadog プリンシパルを **New principals** テキストボックスに貼り付けます。
8. **Service Account Token Creator** のロールを割り当て、**Save** をクリックします。
{{< img src="integrations/google_cloud_platform/add-principals-blurred.png" alt="'Add principals' ボックスと 'Assign roles' インターフェイスが表示されている Google Cloud コンソールインターフェイス。" style="width:70%;">}}

**注**: 以前に共有 Datadog プリンシパルを使用してアクセスを構成している場合は、この手順を完了した後に、そのプリンシパルの権限を取り消すことができます。

#### 3. Datadog でインテグレーションセットアップを完了する

1. Google Cloud コンソールで、**Service Account** > **Details** タブに移動します。そこで、この Google サービスアカウントに関連付けられているメールアドレスを見つけることができます。`<sa-name>@<project-id>.iam.gserviceaccount.com` のような形式です。
2. このメールアドレスをコピーします。
3. Datadog のインテグレーション構成タイルに戻ります ([前のセクション](#2-add-the-datadog-principal-to-your-service-account)で Datadog プリンシパルをコピーした場所)。
4. **Add Service Account Email** の下にあるボックスに、先ほどコピーしたメールアドレスを貼り付けます。
5. **Verify and Save Account** をクリックします。

約 15 分後、Datadog にメトリクスが表示されます。

#### 4. 他のプロジェクトにロールを割り当てる (オプション)

プロジェクトの自動検出により、監視対象のプロジェクトを追加するプロセスが簡素化されます。サービスアカウントに他のプロジェクト、フォルダ、または組織へのアクセスを許可すると、Datadog はこれらのプロジェクト (およびフォルダや組織にネストされたプロジェクト) を検出し、インテグレーションタイルに自動的に追加します。

1. 必要なスコープでロールを割り当てるための適切な権限があることを確認します。
* プロジェクト IAM 管理者 (またはそれ以上)
* フォルダ管理者
* 組織管理者
2. Google Cloud コンソールで、**IAM** ページに移動します。
3. プロジェクト、フォルダ、または組織を選択します。
4. リソース上で他のロールをまだ持っていないプリンシパルにロールを付与するには、**Grant Access** をクリックし、先ほど作成したサービスアカウントのメールアドレスを入力します。
5. 以下のロールを割り当てます。
* Compute Viewer
* Monitoring Viewer
* Cloud Asset Viewer
**注**: Browser ロールは、サービスアカウントのデフォルトプロジェクトでのみ必要です。
6. **Save** をクリックします。

#### 構成

オプションで、プロジェクトのドロップダウンメニューの下にある **Limit Metric Collection** テキストボックスにタグを入力することで、Datadog に取り込まれる GCE インスタンスを制限することができます。定義されたタグの 1 つに一致するホストのみが Datadog にインポートされます。ワイルドカード (`?` は 1 文字、`*` は複数文字) を使って多くのホストに一致させたり、`!` を使って特定のホストを除外することができます。この例では `c1*` サイズのインスタンスをすべて含めますが、ステージングホストは除外します。

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

詳しくは[ラベルの作成と管理][45]に関する Google のドキュメントを参照してください。

### ログ収集

[Google Cloud Dataflow][46] と [Datadog テンプレート][47]を使用して Google Cloud サービスから Datadog にログを転送します。この方法では、Datadog に転送する前にイベントの圧縮とバッチ処理の両方が提供されます。このセクションの指示に従ってください。

[1](#1-create-a-cloud-pubsub-topic-and-subscription)。構成されたログシンクからログを受信するために、Pub/Sub [トピック][48]と[プルサブスクリプション][49]を作成します
[2](#2-create-a-custom-dataflow-worker-service-account)。カスタム Dataflow ワーカーサービスアカウントを作成し、Dataflow パイプラインワーカーに[最小権限][50]を提供します
[3](#3-export-logs-from-google-cloud-pubsub-topic)。[ログシンク][51]を作成し、ログを Pub/Sub トピックに公開します
[4](#4-create-and-run-the-dataflow-job)。[Datadog テンプレート][47]を使用して Dataflow ジョブを作成し、Pub/Sub サブスクリプションから Datadog にログをストリーミングします

GCE や GKE ログを含め、ログシンクで作成したロギングフィルターを通して、どのログを Datadog に送信するかを完全に制御することができます。フィルターの書き方については Google の [Logging のクエリ言語のページ][52]を参照してください。

**注**: Google Cloud Dataflow を使用するには、Dataflow API を有効にする必要があります。詳細は Google Cloud ドキュメントの [API の有効化][53]を参照してください。

GCE または GKE で実行されているアプリケーションからログを収集するには、[Datadog Agent][54] を使用することもできます。

<div class="alert alert-danger">

<a href="https://docs.datadoghq.com/logs/guide/collect-google-cloud-logs-with-push/" target="_blank">Pub/Sub Push サブスクリプションによる Google Cloud ログの収集</a>は、以下の理由により非推奨になるプロセス中です。

- Google Cloud VPC がある場合、Push サブスクリプションは VPC 外のエンドポイントにアクセスできない
- Push サブスクリプションはイベントの圧縮やバッチ処理を提供しないため、非常に少ないログ量にのみ適している

<strong>Push</strong> サブスクリプションのドキュメントは、トラブルシューティングやレガシーセットアップの変更のためにのみ維持されています。Google Cloud のログを Datadog に転送するには、Datadog Dataflow テンプレートで <strong>Pull</strong> サブスクリプションを代わりに使用してください。
</div>

#### 1. Cloud Pub/Sub トピックとサブスクリプションを作成する

1. [Cloud Pub/Sub コンソール][55]に移動し、新しいトピックを作成します。**Add a default subscription** オプションを選択し、セットアップを簡素化します。

   **注**: 手動で [Cloud Pub/Sub サブスクリプション][56]を **Pull** 配信タイプで構成することもできます。手動で Pub/Sub サブスクリプションを作成する場合は、`Enable dead lettering` ボックスを**オフ**にしたままにしてください。詳細については、[サポートされていない Pub/Sub 機能][57]を参照してください。

{{< img src="integrations/google_cloud_platform/create_a_topic.png" alt="Google Cloud Console の Create a topic ページで、 Add a default subscription チェックボックスが選択されている" style="width:80%;">}}

2. トピックに `export-logs-to-datadog` のような明示的な名前を付け、**Create** をクリックします。

3. Datadog API によって拒否されたログメッセージを処理するために、追加のトピックとデフォルトのサブスクリプションを作成します。このトピックの名前は Datadog Dataflow テンプレート内で `outputDeadletterTopic` [テンプレートパラメーター][58]のパス構成の一部として使用されます。失敗したメッセージの問題を検査して修正したら、[Pub/Sub to Pub/Sub テンプレート][59]ジョブを実行して元の `export-logs-to-datadog` トピックに送り返します。

4. Datadog では、後で Datadog Dataflow テンプレートで使用するために、有効な Datadog API キーを使用して [Secret Manager][60] でシークレットを作成することを推奨しています。

**警告**: Cloud Pub/Sub は、[Google Cloud の割り当てと制限][61]の対象となります。Datadog では、ログ数がこの制限を超える場合は、ログを複数のトピックに分割することをお勧めしています。この制限に近づいた場合のモニター通知のセットアップについては、[Pub/Sub ログの転送を監視する](#monitor-the-cloud-pubsub-log-forwarding)セクションを参照してください。

#### 2. カスタム Dataflow ワーカーサービスアカウントを作成する

Dataflow パイプラインワーカーは、デフォルトの挙動として、プロジェクトの [Compute Engine のデフォルトのサービスアカウント][62]を使用します。これは、プロジェクト内のすべてのリソースに権限を与えるものです。**Production** 環境からログを転送する場合は、代わりに必要なロールと権限のみでカスタムワーカーサービスアカウントを作成し、このサービスアカウントを Dataflow パイプラインワーカーに割り当てる必要があります。

1. Google Cloud コンソールの [Service Accounts][63] ページにアクセスし、プロジェクトを選択します。
2. **CREATE SERVICE ACCOUNT** をクリックし、サービスアカウントに分かりやすい名前を付けます。**CREATE AND CONTINUE** をクリックします。
3. 必要な権限テーブルにロールを追加し、**DONE** をクリックします。

##### 必要なアクセス許可

| ロール                                 | パス                                 | 説明                                                                                                                       |
|--------------------------------------|--------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| [Dataflow Admin][64]                 | `roles/dataflow.admin`               | このサービスアカウントによる Dataflow 管理タスクの実行を許可します                                                               |
| [Dataflow Worker][65]                | `roles/dataflow.worker`              | このサービスアカウントによる Dataflow ジョブ操作の実行を許可します                                                                     |
| [Pub/Sub Viewer][66]                 | `roles/pubsub.viewer`                | このサービスアカウントが Google Cloud ログで Pub/Sub サブスクリプションからのメッセージを表示することを許可します                             |
| [Pub/Sub Subscriber][67]             | `roles/pubsub.subscriber`            | このサービスアカウントが Google Cloud ログで Pub/Sub サブスクリプションからのメッセージを取得することを許可します                          |
| [Pub/Sub Publisher][68]              | `roles/pubsub.publisher`             | このサービスアカウントが別のサブスクリプションにフィールドメッセージを公開することを許可します。これにより、ログの解析や再送信が可能になります |
| [Secret Manager Secret Accessor][69] | `roles/secretmanager.secretAccessor` | このサービスアカウントが Secret Manager で Datadog API キーにアクセスすることを許可します                                                        |
| [Storage Object Admin][70]           | `roles/storage.objectAdmin`          | このサービスアカウントがファイルのステージング用に指定された Cloud Storage バケットに対する読み取りと書き込みを行うことを許可します                              |

**注**: Dataflow パイプラインワーカー用のカスタムサービスアカウントを作成しない場合は、デフォルトの Compute Engine のサービスアカウントが上記の必要な権限を持っていることを確認してください。

#### 3. Google Cloud Pub/Sub トピックからログをエクスポートする

1. Google Cloud コンソールの [Logs Explorer ページ][71]にアクセスします。
2. **Log Router** タブより、**Create Sink** を選択します。
3. シンクに名前を設定します。
4. 宛先として _Cloud Pub/Sub_ を選択し、その目的で作成された Cloud Pub/Sub トピックを選択します。**注**: Cloud Pub/Sub トピックは別のプロジェクトに配置できます。

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Google Cloud Pub/Sub ログを Pub Sub へエクスポート" >}}

5. オプションの包含または除外フィルターを使用して、シンクに含めるログを選択します。検索クエリでログをフィルタリングするか、[sample 関数][72]を使用します。例えば、`severity` レベルが `ERROR` のログの 10% だけを含めるには、`severity="ERROR" AND sample(insertId, 0.01)` の包含フィルターを作成します。

    {{< img src="integrations/google_cloud_platform/sink_inclusion_filter.png" alt="severity=ERROR and sample(insertId, 0.1) のクエリによる Google Cloud ロギングシンクの包含フィルター" >}}

6. **Create Sink** をクリックします。

**注**: 異なるシンクを利用して、Google Cloud Logging から同一の Cloud Pub/Sub トピックに対して複数のエクスポートを行うことが可能です。

#### 4. Dataflow ジョブを作成して実行する

1. Google Cloud コンソールの [Create job from template][73] ページに移動します。
2. ジョブに名前を付け、Dataflow 地域エンドポイントを選択します。
3. **Dataflow template** ドロップダウンで `Pub/Sub to Datadog` を選択すると、**Required parameters** セクションが表示されます。 
   a. **Pub/Sub input subscription** ドロップダウンで入力サブスクリプションを選択します。
   b. **Datadog Logs API URL** フィールドに以下の値を入力します。

   ```shell
   https://{{< region-param key="http_endpoint" code="true" >}}

   ```
   **注**: 上記の URL をコピーする前に、ページの右側にある Datadog サイトセレクタがあなたの [Datadog サイト][67]に設定されていることを確認してください。

   c. **Output deadletter Pub/Sub topic** ドロップダウンで、メッセージの失敗を受信するために作成されたトピックを選択します。
   d. **Temporary location** フィールドで、ストレージバケット内の一時ファイルのパスを指定します。

{{< img src="integrations/google_cloud_platform/dataflow_parameters.png" alt="Datadog Dataflow テンプレートの必須パラメーター" style="width:80%;">}}  

4. [ステップ 1](#1-create-a-cloud-pubsub-topic-and-subscription) で言及したように Datadog API キーの値で Secret Manager にシークレットを作成した場合は、シークレットの**リソース名**を **Google Cloud Secret Manager ID** フィールドに入力します。

{{< img src="integrations/google_cloud_platform/dataflow_template_optional_parameters.png" alt="Datadog Dataflow テンプレートのオプションパラメーター。Google Cloud Secret Manager ID と Source of the API key passed フィールドが両方ハイライトされています" style="width:80%;">}}  

その他の利用可能なオプションの使用については、Dataflow テンプレートの[テンプレートパラメーター][58]を参照してください。

   - `apiKeySource=KMS` で、`apiKeyKMSEncryptionKey`に [Cloud KMS][74] のキー ID を、`apiKey` に暗号化された API キーを設定
   - **非推奨**: `apiKeySource=PLAINTEXT` で、`apiKey` にプレーンテキストの API キーを設定

5. カスタムワーカーサービスアカウントを作成した場合は、**Service account email** ドロップダウンでそれを選択します。

{{< img src="integrations/google_cloud_platform/dataflow_template_service_account.png" alt="Datadog Dataflow テンプレートのオプションパラメーター。サービスアカウントのメールドロップダウンがハイライトされています" style="width:80%;">}}

6. **RUN JOB** をクリックします。

**注**: 共有 VPC がある場合は、Dataflow ドキュメントの[ネットワークとサブネットワークの指定][75]ページを参照して、`Network` と `Subnetwork` パラメーターの指定のガイドラインを確認してください。

#### 検証

[Datadog Log Explorer][76] に Cloud Pub/Sub トピックに配信された新規ログイベントが表示されます。

**注**: [Google Cloud Pricing Calculator][77] を使用して、潜在的なコストを計算することができます。

#### Cloud Pub/Sub ログの転送を監視する

[Google Cloud Pub/Sub インテグレーション][30]は、ログ転送のステータスを監視するのに役立つメトリクスを提供します。

   - `gcp.pubsub.subscription.num_undelivered_messages` は配信保留中のメッセージ数を表します
   - `gcp.pubsub.subscription.oldest_unacked_message_age` は、サブスクリプション内の最も古い未承認メッセージの年齢を表します

上記のメトリクスを[メトリクスモニター][78]と一緒に使用すると、入力とデッドレターサブスクリプション内のメッセージのアラートを受け取ることができます。

#### Dataflow パイプラインを監視する

Datadog の [Google Cloud Dataflow インテグレーション][9]を使用して、Dataflow パイプラインのあらゆる側面を監視することができます。すぐに使えるダッシュボード上で、Dataflow ワークロードを実行している GCE インスタンスに関する情報や Pub/Sub スループットなどのコンテキストデータでリッチ化された、すべての Dataflow 主要メトリクスを確認できます。

また、あらかじめ構成されている [Recommended Monitor][79] を使用して、パイプラインのバックログ時間の増加に対する通知をセットアップすることもできます。詳細は、Datadog ブログの [Datadog による Dataflow パイプラインの監視][80]を参照してください。

## リアルユーザーモニタリング

### データセキュリティ

メトリクスについては、個別の Google Cloud インテグレーションのページを参照してください。

#### 累積メトリクス

累積メトリクスは、メトリクス名ごとに `.delta` メトリクスを伴って Datadog にインポートされます。累積メトリクスとは、値が時間の経過とともに常に増加するメトリクスです。たとえば、`sent bytes` のメトリクスは累積的である可能性があります。各値は、その時点でサービスによって送信された総バイト数を記録します。デルタ値は、前回の測定からの変化を表します。

例:

 `gcp.gke.container.restart_count` は累積的なメトリクスです。このメトリクスを累積メトリクスとしてインポートする際、Datadog は (累積メトリクスの一部として送信される集計値ではなく) デルタ値を含む `gcp.gke.container.restart_count.delta` メトリクスを追加します。詳細については、[Google Cloud メトリクスの種類][81]を参照してください。

### ヘルプ

Google Cloud Platform によって生成されたすべてのサービスイベントが [Datadog のイベントエクスプローラー][82]に転送されます。

### ヘルプ

Google Cloud Platform インテグレーションには、サービスのチェック機能は含まれません。

### Lambda のトレースされた起動の 1 時間単位使用量の取得

タグは、Google Cloud Platform と Google Compute Engine の様々な構成オプションに基づいて自動的に割り当てられます。`project_id` タグは、すべてのメトリクスに追加されます。追加のタグは、利用可能な場合に Google Cloud Platform から収集され、メトリクスの種類に応じて異なります。

また、Datadog は以下をタグとして収集します。

- `<キー>:<値>` ラベルが付けられたホスト。
- Custom labels from Google Pub/Sub、GCE、Cloud SQL、Cloud Storage のカスタムラベル

## ヘルプ

### ユーザー定義の _gcp.logging_ メトリクスに不正なメタデータが適用される

非標準の _gcp.logging_ メトリクス ([Datadog に付属するログメトリクス][83]以外のメトリクスなど) に適用されるメタデータが Google Cloud Logging と一致しない場合があります。

このような場合は、メタデータを手動で設定する必要があります。設定するには、[メトリクスサマリーページ][84]に移動し、問題のメトリクスを検索して選択し、メタデータの横にある鉛筆アイコンをクリックします。

ご不明な点は、[Datadog のサポートチーム][85]までお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/integrations/google_app_engine/
[2]: https://docs.datadoghq.com/ja/integrations/google_bigquery/
[3]: https://docs.datadoghq.com/ja/integrations/google_cloud_bigtable/
[4]: https://docs.datadoghq.com/ja/integrations/google_cloudsql/
[5]: https://docs.datadoghq.com/ja/integrations/google_cloud_apis/
[6]: https://docs.datadoghq.com/ja/integrations/google_cloud_armor/
[7]: https://docs.datadoghq.com/ja/integrations/google_cloud_composer/
[8]: https://docs.datadoghq.com/ja/integrations/google_cloud_dataproc/
[9]: https://docs.datadoghq.com/ja/integrations/google_cloud_dataflow/
[10]: https://docs.datadoghq.com/ja/integrations/google_cloud_filestore/
[11]: https://docs.datadoghq.com/ja/integrations/google_cloud_firestore/
[12]: https://docs.datadoghq.com/ja/integrations/google_cloud_interconnect/
[13]: https://docs.datadoghq.com/ja/integrations/google_cloud_iot/
[14]: https://docs.datadoghq.com/ja/integrations/google_cloud_loadbalancing/
[15]: https://docs.datadoghq.com/ja/integrations/google_stackdriver_logging/
[16]: https://docs.datadoghq.com/ja/integrations/google_cloud_redis/
[17]: https://docs.datadoghq.com/ja/integrations/google_cloud_router/
[18]: https://docs.datadoghq.com/ja/integrations/google_cloud_run/
[19]: https://docs.datadoghq.com/ja/integrations/google_cloud_security_command_center/
[20]: https://docs.datadoghq.com/ja/integrations/google_cloud_tasks/
[21]: https://docs.datadoghq.com/ja/integrations/google_cloud_tpu/
[22]: https://docs.datadoghq.com/ja/integrations/google_compute_engine/
[23]: https://docs.datadoghq.com/ja/integrations/google_container_engine/
[24]: https://docs.datadoghq.com/ja/integrations/google_cloud_datastore/
[25]: https://docs.datadoghq.com/ja/integrations/google_cloud_firebase/
[26]: https://docs.datadoghq.com/ja/integrations/google_cloud_functions/
[27]: https://docs.datadoghq.com/ja/integrations/google_kubernetes_engine/
[28]: https://docs.datadoghq.com/ja/integrations/google_cloud_ml/
[29]: https://docs.datadoghq.com/ja/integrations/google_cloud_private_service_connect/
[30]: https://docs.datadoghq.com/ja/integrations/google_cloud_pubsub/
[31]: https://docs.datadoghq.com/ja/integrations/google_cloud_spanner/
[32]: https://docs.datadoghq.com/ja/integrations/google_cloud_storage/
[33]: https://docs.datadoghq.com/ja/integrations/google_cloud_vertex_ai/
[34]: https://docs.datadoghq.com/ja/integrations/google_cloud_vpn/
[35]: https://console.cloud.google.com/apis/library/cloudresourcemanager.googleapis.com
[36]: https://console.cloud.google.com/apis/library/cloudbilling.googleapis.com
[37]: https://console.cloud.google.com/apis/library/monitoring.googleapis.com
[38]: https://console.cloud.google.com/apis/library/compute.googleapis.com
[39]: https://console.cloud.google.com/apis/library/cloudasset.googleapis.com
[40]: https://console.cloud.google.com/apis/library/iam.googleapis.com
[41]: https://cloud.google.com/iam/docs/service-account-overview#impersonation
[42]: /ja/integrations/google_cloud_platform/
[43]: https://console.cloud.google.com/
[44]: https://app.datadoghq.com/integrations/google-cloud-platform
[45]: https://cloud.google.com/compute/docs/labeling-resources
[46]: https://cloud.google.com/dataflow
[47]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog
[48]: https://cloud.google.com/pubsub/docs/create-topic
[49]: https://cloud.google.com/pubsub/docs/create-subscription
[50]: https://cloud.google.com/iam/docs/using-iam-securely#least_privilege
[51]: https://cloud.google.com/logging/docs/export/configure_export_v2#creating_sink
[52]: https://cloud.google.com/logging/docs/view/logging-query-language
[53]: https://cloud.google.com/apis/docs/getting-started#enabling_apis
[54]: https://docs.datadoghq.com/ja/agent/
[55]: https://console.cloud.google.com/cloudpubsub/topicList
[56]: https://console.cloud.google.com/cloudpubsub/subscription/
[57]: https://cloud.google.com/dataflow/docs/concepts/streaming-with-cloud-pubsub#unsupported-features
[58]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog#template-parameters
[59]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-pubsub
[60]: https://console.cloud.google.com/security/secret-manager
[61]: https://cloud.google.com/pubsub/quotas#quotas
[62]: https://cloud.google.com/compute/docs/access/service-accounts#default_service_account
[63]: https://console.cloud.google.com/iam-admin/serviceaccounts
[64]: https://cloud.google.com/dataflow/docs/concepts/access-control#dataflow.admin
[65]: https://cloud.google.com/dataflow/docs/concepts/access-control#dataflow.worker
[66]: https://cloud.google.com/pubsub/docs/access-control#pubsub.viewer
[67]: https://cloud.google.com/pubsub/docs/access-control#pubsub.subscriber
[68]: https://cloud.google.com/pubsub/docs/access-control#pubsub.publisher
[69]: https://cloud.google.com/secret-manager/docs/access-control#secretmanager.secretAccessor
[70]: https://cloud.google.com/storage/docs/access-control/iam-roles/
[71]: https://console.cloud.google.com/logs/viewer
[72]: https://cloud.google.com/logging/docs/view/logging-query-language#sample
[73]: https://console.cloud.google.com/dataflow/createjob
[74]: https://cloud.google.com/kms/docs
[75]: https://cloud.google.com/dataflow/docs/guides/specifying-networks#shared
[76]: https://app.datadoghq.com/logs
[77]: https://cloud.google.com/products/calculator
[78]: https://docs.datadoghq.com/ja/monitors/types/metric/
[79]: https://www.datadoghq.com/blog/datadog-recommended-monitors/
[80]: https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/
[81]: https://cloud.google.com/monitoring/api/v3/kinds-and-types
[82]: https://app.datadoghq.com/event/stream
[83]: https://docs.datadoghq.com/ja/integrations/google_stackdriver_logging/#metrics
[84]: https://app.datadoghq.com/metric/summary
[85]: https://docs.datadoghq.com/ja/help/