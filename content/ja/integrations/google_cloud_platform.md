---
aliases:
- /ja/integrations/gcp/
categories:
- cloud
- google cloud
- iot
- log collection
- network
custom_kind: integration
dependencies: []
description: 豊富な GCP メトリクスを収集してホストマップ内のインスタンスを視覚化します。
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
manifest_version: '1.0'
name: google_cloud_platform
public_title: Datadog-Google Cloud Platform インテグレーション
short_description: 豊富な GCP メトリクスを収集してホストマップ内のインスタンスを視覚化。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Google Cloud Platform に接続して、すべての Google Compute Engine (GCE) ホストを Datadog に表示できます。GCE ホストタグと追加した GCE ラベルがホストに自動的にタグ付けされるため、Datadog のインフラストラクチャー概要にホストを表示し、分類することができます。

<div class="alert alert-danger">
Datadog の GCP インテグレーションは、<a href="https://cloud.google.com/monitoring/api/metrics_gcp">すべての Google Cloud メトリクス</a>を収集するように構築されています。Datadog では継続的にドキュメントを更新してすべてのサブインテグレーションを表示できるように努めていますが、新しいメトリクスやサービスがクラウドサービスから次々にリリースされるため、インテグレーション一覧が追い付かないことがあります。
</div>

| インテグレーション                         | 説明                                                                           |
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
| [Private Service Connect][29]       | プライベート VPC 接続でマネージドサービスにアクセスする                                  |
| [Pub/Sub][30]                       | リアルタイムメッセージングサービス                                                           |
| [Spanner][31]                       | 水平方向に拡張可能でグローバルな一貫性を持つリレーショナルデータベースサービス               |
| [Storage][32]                       | 統合型オブジェクトストレージ                                                                |
| [Vertex AI][33]                     | カスタムの機械学習 (ML) モデルの構築、トレーニング、デプロイを行います。                          |
| [VPN][34]                           | マネージド型のネットワーク機能                                                         |

## セットアップ

Datadog の Google Cloud インテグレーションをセットアップして、Google Cloud サービスからメトリクスとログを収集します。

### 前提条件

1. 組織でドメインによるアイデンティティを制限している場合、Datadog の顧客アイデンティティをポリシーで許可値として追加する必要があります。Datadog の顧客アイデンティティ: `C0147pk0i`

2. サービスアカウントのなりすましとプロジェクトの自動検出は、プロジェクト監視のために特定のロールと API が有効化されていることを前提としています。開始する前に、監視するプロジェクトで以下の API が有効になっていることを確認してください。
  * [Cloud Resource Manager API][35]
  * [Google Cloud Billing API][36]
  * [Cloud Monitoring API][37]
  * [Compute Engine API][38]
  * [Cloud Asset API][39]
  * [IAM API][40]

3. 監視対象のプロジェクトが、他の複数のプロジェクトからメトリクスを取り込む[スコーピングプロジェクト][41]として構成されていないことを確認してください。

### メトリクスの収集

#### インストール

{{< site-region region="gov" >}}

{{< region-param key="dd_site_name" >}} サイトの Datadog Google Cloud インテグレーションは、サービスアカウントを使用して、Google Cloud と Datadog 間の API 接続を作成します。以下の手順に従って、サービスアカウントを作成し、Datadog にサービスアカウントの資格情報を提供することで、API 呼び出しを自動化します。

[サービスアカウントのなりすまし][209] は {{< region-param key="dd_site_name" >}} サイトでは利用できません。

**注**: [Google Cloud 請求][204]、[Cloud Monitoring API][205]、[Compute Engine API][206]、[Cloud Asset API][207] は、監視したいすべてのプロジェクトで有効にしておく必要があります。

1. Datadog とインテグレーションしたい Google Cloud プロジェクトの [Google Cloud 資格情報ページ][202]に移動します。
2. **Create credentials** (資格情報の作成) をクリックします。
3. **Service account** (サービスアカウント) を選択します。

    {{< img src="integrations/google_cloud_platform/SelectServiceAccount2.png" alt="設定" popup="true" style="width:80%;">}}

4. サービスアカウントに一意の名前とオプションの説明を付けます。
5. **Create and continue** (作成して続行) をクリックします。
6. 以下のロールを追加します。
    - コンピュートビューア
    - モニタリングビューア
    - クラウドアセットビューア
7.  **Done** をクリックします。
    **注**: Compute Engine と Cloud Asset のロールを選択するには、Service Account Key Admin である必要があります。選択したロールはすべて、Datadog があなたに代わってメトリクス、タグ、イベント、ユーザーラベルを収集できるようにします。
8. ページの下部で、サービスアカウントを見つけて、今作成したものを選択します。
9. **Add Key** -> **Create new key** (キーを追加 -> 新しいキーを作成) をクリックし、タイプとして **JSON** を選択します。
10. **Create** (作成) をクリックします。JSON キーファイルがコンピュータにダウンロードされます。このファイルは、インストールを完了するために必要ですので、保存場所に注意してください。
11. [Datadog Google Cloud Integration ページ][203]に移動します。
12. **Configuration** (構成) タブで、**Upload Key File** (キーファイルのアップロード) を選択して、このプロジェクトを Datadog とインテグレーションします。
13. オプションで、タグを使用して、このインテグレーションからホストを除外することができます。これに関する詳しい説明は [構成セクション](#configuration)にあります。

    {{< img src="integrations/google_cloud_platform/ServiceAccountAdded.png" alt="設定" popup="true" style="width:80%;">}}

14. _Install/Update_ (インストール/更新) をクリックします。
15. 複数のプロジェクトを監視する場合は、次の方法のいずれかを使用します。

    - 複数のサービスアカウントを使用する場合は、上のプロセスを繰り返します。
    - 手順 10 でダウンロードした JSON ファイルの `project_id` を更新して、同じサービスアカウントを使用します。その後、手順 11-14 で説明したように、ファイルを Datadog にアップロードします。

### 構成

オプションで、特定のプロジェクトのドロップダウンメニューの下にある **Limit Metric Collection** テキストボックスにタグを入力することで、Datadog にプルされる GCE インスタンスを制限できます。定義されたタグのいずれかに一致するホストだけが Datadog にインポートされます。複数のホストに一致するワイルドカード (1 文字の場合は `?`、複数文字の場合は `*`)、または特定のホストを除外する `!` を使用できます。次の例では、`c1*` サイズのインスタンスは含まれますが、ステージングホストは除外されます。

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

詳細は Google のドキュメントの[ラベルの作成と管理][208]を参照してください。

[202]: https://console.cloud.google.com/apis/credentials
[203]: https://app.datadoghq.com/account/settings#integrations/google_cloud_platform
[204]: https://support.google.com/cloud/answer/6293499?hl=en
[205]: https://console.cloud.google.com/apis/library/monitoring.googleapis.com
[206]: https://console.cloud.google.com/apis/library/compute.googleapis.com
[207]: https://console.cloud.google.com/apis/api/cloudasset.googleapis.com/overview
[208]: https://cloud.google.com/compute/docs/labeling-resources
[209]: https://cloud.google.com/iam/docs/service-account-impersonation

{{< /site-region >}}

{{< site-region region="us,us3,us5,eu,ap1" >}}
[サービスアカウントのなりすまし][301]とプロジェクトの自動発見を使用して、Datadog と [Google Cloud][302] を統合することができます。

この方法では、関連するプロジェクトに IAM ロールを割り当てることで、サービスアカウントから見えるすべてのプロジェクトを監視することができます。これらのロールを個別にプロジェクトに割り当てることもできますし、組織レベルやフォルダレベルでこれらのロールを割り当てて、プロジェクトのグループを監視するように Datadog を構成することもできます。このようにロールを割り当てることで、Datadog は、指定されたスコープ内のすべてのプロジェクト (将来的にそのグループに追加される新しいプロジェクトも含む) を自動的に発見・監視することができます。

#### 1. Google Cloud サービスのアカウントを作成する

1. [Google Cloud コンソール][303]を開きます。
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

#### 2. サービスアカウントに Datadog プリンシパルを追加する

1. Datadog の [**Integrations** > **Google Cloud Platform**][304] に移動します。
2. **Add GCP Account** をクリックします。構成されたプロジェクトがない場合、自動的にこのページにリダイレクトされます。
3. Datadog プリンシパルを生成していない場合は、**Generate Principal** ボタンをクリックします。
4. Datadog プリンシパルをコピーして、次のセクションのために保管しておきます。
   {{< img src="integrations/google_cloud_platform/principal-2.png" alt="Datadog のインターフェイスで、'Add New GCP Account' フローを表示しています。最初のステップである 'Add Datadog Principal to Google' では、ユーザーが Datadog プリンシパルを生成してクリップボードにコピーするためのテキストボックスが表示されます。2 番目のステップである 'Add Service Account Email’ では、ユーザーがセクション 3 で入力するテキストボックスがあります。" style="width:70%;">}}
   [次のセクション](#3-complete-the-integration-setup-in-datadog)では、このウィンドウを開いたままにしておきます。
5. [Google Cloud コンソール][303] の **Service Accounts** (サービスアカウント) メニューで、[最初のセクション](#1-create-your-google-cloud-service-account)で作成したサービスアカウントを探します。
6. **Permissions** タブを開き、**Grant Access** をクリックします。
   {{< img src="integrations/google_cloud_platform/grant-access.png" alt="Google Cloud コンソールインターフェイスで、Service Accounts の下にある Permissions タブを表示しています。" style="width:70%;">}}
7. Datadog プリンシパルを **New principals** テキストボックスに貼り付けます。
8. **Service Account Token Creator** のロールを割り当て、**Save** をクリックします。
   {{< img src="integrations/google_cloud_platform/add-principals-blurred.png" alt="Google Cloud コンソールのインターフェイスで、'Add principals' ボックスと 'Assign roles' インターフェイスを表示しています。" style="width:70%;">}}

**注**: 以前に Datadog の共有プリンシパルを使用してアクセスを構成した場合、これらの手順を完了した後、そのプリンシパルの権限を取り消すことができます。

#### 3. Datadog でインテグレーション設定を完了する

1. Google Cloud コンソールで、**Service Account** > **Details** タブに移動します。そこには、この Google サービスアカウントに関連するメールが記載されています。これは、`<sa-name>@<project-id>.iam.gserviceaccount.com` に似ています。
2. このメールをコピーします。
3. Datadog のインテグレーション構成タイル ([前セクション](#2-add-the-datadog-principal-to-your-service-account)で Datadog プリンシパルをコピーしたところ) に戻ります。
4. **Add Service Account Email** の下にあるボックスに、以前コピーしたメールを貼り付けます。
5. **Verify and Save Account** をクリックします。

約 15 分で、Datadog にメトリクスが表示されます。

#### 4. 他のプロジェクトにロールを割り当てる (オプション)

プロジェクトの自動発見により、監視対象のプロジェクトを追加するプロセスが簡素化されます。サービスアカウントに他のプロジェクト、フォルダ、または組織へのアクセスを許可すると、Datadog はこれらのプロジェクト (およびフォルダや組織にネストされたプロジェクト) を発見し、インテグレーションタイルに自動的に追加します。

1. 希望するスコープでロールを割り当てるための適切な権限があることを確認してください。
   * Project IAM Admin (またはそれ以上)
   * Folder Admin
   * Organization Admin
2. Google Cloud コンソールで、**IAM** ページに移動します。
3. プロジェクト、フォルダ、または組織を選択します。
4. リソースに対して他のロールをまだ持っていないプリンシパルにロールを付与するには、**Grant Access** をクリックし、前に作成したサービスアカウントのメールを入力します。
5. 以下のロールを割り当てます。
   * コンピュートビューア
   * モニタリングビューア
   * クラウドアセットビューア
   **注**: Browser ロールは、サービスアカウントのデフォルトプロジェクトでのみ必要です。
6. **Save** をクリックします。

[301]: https://cloud.google.com/iam/docs/service-account-overview#impersonation
[302]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/
[303]: https://console.cloud.google.com/
[304]: https://app.datadoghq.com/integrations/google-cloud-platform

{{< /site-region >}}

#### 構成

オプションとして、特定のプロジェクトのドロップダウンメニューの下にある **Limit Metric Collection** (メトリクス収集の制限) テキストボックスにタグを入力することで、Datadog に取り込む GCE インスタンスを制限することができます。定義されたタグに一致するホストのみが Datadog にインポートされます。ワイルドカード (`?` は 1 文字、`*` は複数文字) を使って多くのホストにマッチさせたり、`!` を使って特定のホストを除外することができます。この例では、すべての `c1*` サイズのインスタンスを含めますが、ステージングホストは除外します。

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

詳細については、[ラベルの作成と管理][42]に関する Google のドキュメントを参照してください。

### ログ収集

[Google Cloud Dataflow][43] と [Datadog テンプレート][44]を使用して、Google Cloud サービスからのログを Datadog に転送します。この方法では、Datadog に転送する前にイベントの圧縮とバッチ処理の両方が可能です。このセクションの指示に従って、以下を行います。

[1](#1-create-a-cloud-pubsub-topic-and-subscription)。Pub/Sub [トピック][45]と[プルサブスクリプション][46]を作成し、構成されたログシンクからログを受信します。
[2](#2-create-a-custom-dataflow-worker-service-account)。カスタム Dataflow ワーカーサービスアカウントを作成し、Dataflow パイプラインワーカーに[最小権限][47]を提供します。
[3](#3-export-logs-from-google-cloud-pubsub-topic)。[ログシンク][48]を作成し、Pub/Sub トピックにログを公開します。
[4](#4-create-and-run-the-dataflow-job)。[Datadog テンプレート][44]を使用して Dataflow ジョブを作成し、Pub/Sub サブスクリプションから Datadog にログをストリーミングします。

GCE や GKE ログを含め、ログシンクで作成したロギングフィルターを通して、どのログを Datadog に送信するかを完全に制御することができます。フィルターの書き方については、Google の[ロギングクエリ言語ページ][49]を参照してください。

**注**: Google Cloud Dataflow を使用するには、Dataflow API を有効にする必要があります。詳細は Google Cloud ドキュメントの [API の有効化][50]を参照してください。

GCE または GKE で実行されているアプリケーションからログを収集するには、[Datadog Agent][51] を使用することもできます。

<div class="alert alert-warning">

<a href="https://docs.datadoghq.com/logs/guide/collect-google-cloud-logs-with-push/" target="_blank">Pub/Sub Push サブスクリプションを使用した Google Cloud のログ収集</a>は、以下の理由で非推奨となっています。

- Google Cloud VPC を使用している場合、新しい Push サブスクリプションを外部エンドポイントで構成することができない (詳細については、Google Cloud の[サポートされる製品と制限][52]ページを参照してください)
- Push サブスクリプションは、イベントの圧縮やバッチ処理を提供しないため、非常に少ないログ量にのみ適している

<strong>Push</strong> サブスクリプションのドキュメントは、トラブルシューティングやレガシーセットアップの変更のためにのみ維持されます。代わりに Datadog Dataflow テンプレートで <strong>Pull</strong> サブスクリプションを使用して、Google Cloud ログを Datadog に転送してください。
</div>

#### 1. Cloud Pub/Sub トピックとサブスクリプションを作成する

1. [Cloud Pub/Sub コンソール][53]に移動し、新しいトピックを作成します。 **Add a default subscription** (デフォルトのサブスクリプションを追加する) オプションを選択して、セットアップを簡素化します。

   **注**: 手動で [Cloud Pub/Sub サブスクリプション][54]を **Pull** 配信タイプで構成することもできます。手動で Pub/Sub サブスクリプションを作成する場合は、`Enable dead lettering` (デッドレタリングを有効にする) ボックスの**チェックを外したまま**にしてください。詳細については、[サポートされていない Pub/Sub 機能][55]を参照してください。

{{< img src="integrations/google_cloud_platform/create_a_topic.png" alt="Google Cloud Console の Create a topic ページで、 Add a default subscription チェックボックスが選択されている" style="width:80%;">}}

2. トピックに `export-logs-to-datadog` のような明示的な名前を付け、**Create** をクリックします。

3. Datadog API によって拒否されたログメッセージを処理するために、追加のトピックとデフォルトのサブスクリプションを作成します。このトピックの名前は、Datadog Dataflow テンプレート内で `outputDeadletterTopic` [テンプレートパラメーター][56]のパス構成の一部として使用されます。失敗したメッセージの問題を検査して修正したら、[Pub/Sub to Pub/Sub テンプレート][56]ジョブを実行して元の `export-logs-to-datadog` トピックに送り返します。

4. Datadog では、[Secret Manager][58] で有効な Datadog API キーの値でシークレットを作成し、後で Datadog Dataflow テンプレートで使用することを推奨しています。

**警告**: クラウド Pub/Sub は [Google Cloud のクォータと制限][59]の対象となります。ログの数がこれらの制限を超える場合、Datadog はログを複数のトピックに分割することを推奨します。これらの制限に近づいた場合のモニター通知のセットアップについては、[Pub/Sub ログ転送の監視のセクション](#monitor-the-cloud-pubsub-log-forwarding)を参照してください。

#### 2. カスタム Dataflow ワーカーサービスアカウントを作成する

Dataflow パイプラインワーカーのデフォルトの動作は、プロジェクトの [Compute Engine のデフォルトのサービスアカウント][60]を使用することです。このアカウントは、プロジェクト内のすべてのリソースへの権限を付与します。**Production** 環境からログを転送している場合は、代わりに必要なロールと権限のみを持つカスタムワーカーのサービスアカウントを作成し、このサービスアカウントを Dataflow パイプラインワーカーに割り当てる必要があります。

1. Google Cloud コンソールの [Service Accounts][61] ページにアクセスし、プロジェクトを選択します。
2. **CREATE SERVICE ACCOUNT** をクリックし、サービスアカウントに分かりやすい名前を付けます。**CREATE AND CONTINUE** をクリックします。
3. 必要な権限テーブルにロールを追加し、**DONE** をクリックします。

##### 必要なアクセス許可

[Dataflow Admin][62]
: `roles/dataflow.admin` <br> このサービスアカウントが Dataflow の管理者タスクを実行することを許可します。

[Dataflow Worker][63]
: `roles/dataflow.worker` <br> このサービスアカウントが Dataflow のジョブオペレーションを実行することを許可します。

[Pub/Sub Viewer][64]
: `roles/pubsub.viewer` <br> このサービスアカウントが Google Cloud ログで Pub/Sub サブスクリプションからのメッセージを表示することを許可します。

[Pub/Sub Subscriber][65]
: `roles/pubsub.subscriber` <br> このサービスアカウントが Google Cloud ログで Pub/Sub サブスクリプションからのメッセージを取得することを許可します。

[Pub/Sub Publisher][66]
: `roles/pubsub.publisher`<br> このサービスアカウントが別のサブスクリプションに失敗したメッセージを公開することを許可します。これにより、ログの解析や再送信が可能になります。

[Secret Manager Secret Accessor][67]
: `roles/secretmanager.secretAccessor` <br> このサービスアカウントが Secret Manager で Datadog API キーにアクセスすることを許可します。

[Storage Object Admin][68]
: `roles/storage.objectAdmin`<br> このサービスアカウントがファイルのステージング用に指定された Cloud Storage バケットに対する読み取りと書き込みを行うことを許可します。

**注**: Dataflow パイプラインワーカー用のカスタムサービスアカウントを作成しない場合は、デフォルトの Compute Engine のサービスアカウントが上記の必要な権限を持っていることを確認してください。

#### 3. Google Cloud Pub/Sub トピックからログをエクスポートする

1. Google Cloud コンソールの [Logs Explorer ページ][69]に移動します。
2. **Log Router** タブより、**Create Sink** を選択します。
3. シンクに名前を設定します。
4. 宛先として _Cloud Pub/Sub_ を選択し、その目的で作成された Cloud Pub/Sub トピックを選択します。**注**: Cloud Pub/Sub トピックは別のプロジェクトに存在する場合があります。

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Google Cloud Pub/Sub ログを Pub Sub へエクスポート" >}}

5. Choose the logs you want to include in the sink with an optional inclusion or exclusion filter. You can filter the logs with a search query, or use the [sample function][70]. For example, to include only 10% of the logs with a `severity` level of `ERROR`, create an inclusion filter with `severity="ERROR" AND sample(insertId, 0.1)`.

    {{< img src="integrations/google_cloud_platform/sink_inclusion_filter_2.png" alt="The inclusion filter for a Google Cloud logging sink with a query of severity=ERROR and sample(insertId, 0.1)" >}}

6. **Create Sink** をクリックします。

**注**: 異なるシンクを利用して、Google Cloud Logging から同一の Cloud Pub/Sub トピックに対して複数のエクスポートを行うことが可能です。

#### 4. Dataflow ジョブを作成して実行する

1. Google Cloud コンソールの[テンプレートからジョブを作成する][71]ページに移動します。
2. ジョブに名前を付け、Dataflow 地域エンドポイントを選択します。
3. **Dataflow template** ドロップダウンで `Pub/Sub to Datadog` を選択すると、**Required parameters** セクションが表示されます。
   a. **Pub/Sub input subscription** ドロップダウンで入力サブスクリプションを選択します。
   b. **Datadog Logs API URL** フィールドに以下の値を入力します。

   ```shell
   https://{{< region-param key="http_endpoint" code="true" >}}

   ```
   **注**: 上記の URL をコピーする前に、ページの右側にある Datadog サイトセレクタが [Datadog サイト][65]に設定されていることを確認してください。

   c. **Output deadletter Pub/Sub topic** ドロップダウンで、メッセージの失敗を受信するために作成されたトピックを選択します。
   d. **Temporary location** フィールドで、ストレージバケット内の一時ファイルのパスを指定します。

{{< img src="integrations/google_cloud_platform/dataflow_parameters.png" alt="Datadog Dataflow テンプレートの必須パラメーター" style="width:80%;">}}

4. **Optional Parameters** で `Include full Pub/Sub message in the payload` にチェックを入れます。

5. [ステップ 1](#1-create-a-cloud-pubsub-topic-and-subscription) で言及したように Datadog API キーの値で Secret Manager にシークレットを作成した場合は、シークレットの**リソース名**を **Google Cloud Secret Manager ID** フィールドに入力します。

{{< img src="integrations/google_cloud_platform/dataflow_template_optional_parameters.png" alt="Datadog Dataflow テンプレートのオプションパラメーター。Google Cloud Secret Manager ID と Source of the API key passed フィールドが両方ハイライトされています" style="width:80%;">}}

その他の使用可能なオプションの詳細については、Dataflow テンプレートの[テンプレートパラメーター][56]を参照してください。

   - `apiKeyKMSEncryptionKey` を [Cloud KMS][72] のキー ID に設定し、`apiKey` を暗号化された API キーに設定した `apiKeySource=KMS`
   - **非推奨**: `apiKeySource=PLAINTEXT` で、`apiKey` にプレーンテキストの API キーを設定

6. カスタムワーカーサービスアカウントを作成した場合は、**Service account email** ドロップダウンでそれを選択します。

{{< img src="integrations/google_cloud_platform/dataflow_template_service_account.png" alt="Datadog Dataflow テンプレートのオプションパラメーター。サービスアカウントのメールドロップダウンがハイライトされています" style="width:80%;">}}

7. **RUN JOB** をクリックします。

**注**: 共有 VPC を使用している場合は、Dataflow ドキュメントの[ネットワークとサブネットワークを指定する][73]ページで `Network` と `Subnetwork` パラメーターの指定に関するガイドラインを参照してください。

#### 検証

Cloud Pub/Sub トピックに配信された新しいログイベントは、[Datadog ログエクスプローラー][74]に表示されます。

**注**: [Google Cloud Pricing Calculator][75] を使用して、予想コストを計算できます。

#### Cloud Pub/Sub ログの転送を監視する

[Google Cloud Pub/Sub インテグレーション][30]は、ログ転送のステータスを監視するのに役立つメトリクスを提供します。

   - `gcp.pubsub.subscription.num_undelivered_messages` は配信保留中のメッセージ数を表します
   - `gcp.pubsub.subscription.oldest_unacked_message_age` は、サブスクリプション内の最も古い未承認メッセージの年齢を表します

上記のメトリクスを[メトリクスモニター][76]とともに使用すると、入力およびデッドレターサブスクリプション内のメッセージに対するアラートを受け取ることができます。

#### Dataflow パイプラインを監視する

Datadog の [Google Cloud Dataflow インテグレーション][9]を使用して、Dataflow パイプラインのあらゆる側面を監視することができます。すぐに使えるダッシュボード上で、Dataflow ワークロードを実行している GCE インスタンスに関する情報や Pub/Sub スループットなどのコンテキストデータでリッチ化された、すべての Dataflow 主要メトリクスを確認できます。

また、あらかじめ構成されている [Recommended Monitor][77] を使用して、パイプラインのバックログ時間の増加に対する通知をセットアップすることもできます。詳細は、Datadog ブログの [Datadog による Dataflow パイプラインの監視][78]を参照してください。

### リソース変更の収集

Google の [Cloud Asset Inventory][79] がクラウドリソースの変更を検出すると、Datadog でリソースイベントを受け取ることができます。

Google Cloud インテグレーションページの [Resource Collection タブ][80]で **Enable Resource Collection** を選択していることを確認します。次に、以下の手順に従って、変更イベントを Pub/Sub トピックから Datadog [イベントエクスプローラー][81] に転送します。

#### Cloud Pub/Sub トピックとサブスクリプションを作成する

##### トピックの作成

1. [Google Cloud Pub/Sub トピックページ][53]で、**CREATE TOPIC** をクリックします。
2. トピックにわかりやすい名前をつけます。
3. デフォルトのサブスクリプションを追加するオプションの**チェックを外します**。
4. **CREATE** をクリックします。

##### サブスクリプションの作成

1. [Google Cloud Pub/Sub サブスクリプションページ][54]で、**CREATE SUBSCRIPTION** をクリックします。
2. サブスクリプション名に `export-asset-changes-to-datadog` と入力します。
3. 先ほど作成した Cloud Pub/Sub トピックを選択します。
4. 配信タイプとして **Pull** を選択します。
5. **CREATE** をクリックします。

#### アクセス権を付与する

この Pub/Sub サブスクリプションから読み取るには、インテグレーション が使用する Google Cloud サービス アカウントに、サブスクリプションに対する `pubsub.subscriptions.consume` 権限が必要です。これを許可する最小限の権限を持つデフォルトのロールは **Pub/Sub subscriber** ロールです。このロールを付与するには、以下の手順に従います。

1. [Google Cloud Pub/Sub サブスクリプションページ][54]で、`export-asset-changes-to-datadog` サブスクリプションをクリックします。
2. ページ右側の**情報パネル**で、**Permissions** タブ をクリックします。情報パネルが表示されない場合は、**SHOW INFO PANEL** をクリックしてください。
3. **ADD PRINCIPAL** をクリックします。
4. Datadog Google Cloud インテグレーションが使用する**サービスアカウントのメールアドレス**を入力します。サービスアカウントは、Datadog の [Google Cloud インテグレーションページ][82]の **Configuration** タブの左側に表示されます。

#### アセットフィードを作成する

[Cloud Shell][83] または [gcloud CLI][84] で以下のコマンドを実行し、上記で作成した Pub/Sub トピックに変更イベントを送信する Cloud Asset Inventory フィードを作成します。

{{< tabs >}}
{{% tab "プロジェクト" %}}
```bash
gcloud asset feeds create <FEED_NAME>
--project=<PROJECT_ID>
--pubsub-topic=projects/<PROJECT_ID>/topics/<TOPIC_NAME>
--asset-names=<ASSET_NAMES>
--asset-types=<ASSET_TYPES>
--content-type=<CONTENT_TYPE>
--condition-title=<CONDITION_TITLE>
```

プレースホルダーの値を下記の要領で更新します。

   - `<FEED_NAME>`: Cloud Asset Inventory フィードのわかりやすい名前。
   - `<PROJECT_ID>`: Google Cloud プロジェクト ID。
{{% /tab %}}

{{% tab "フォルダー" %}}
```bash
gcloud asset feeds create <FEED_NAME>
--folder=<FOLDER_ID>
--pubsub-topic=projects/<PROJECT_ID>/topics/<TOPIC_NAME>
--asset-names=<ASSET_NAMES>
--asset-types=<ASSET_TYPES>
--content-type=<CONTENT_TYPE>
--condition-title=<CONDITION_TITLE>
```

プレースホルダーの値を下記の要領で更新します。

   - `<FEED_NAME>`: Cloud Asset Inventory フィードのわかりやすい名前。
   - `<FOLDER_ID>`: Google Cloud フォルダー ID.
{{% /tab %}}

{{% tab "組織" %}}
```bash
gcloud asset feeds create <FEED_NAME>
--organization=<ORGANIZATION_ID>
--pubsub-topic=projects/<PROJECT_ID>/topics/<TOPIC_NAME>
--asset-names=<ASSET_NAMES>
--asset-types=<ASSET_TYPES>
--content-type=<CONTENT_TYPE>
--condition-title=<CONDITION_TITLE>
```

プレースホルダーの値を下記の要領で更新します。

   - `<FEED_NAME>`: Cloud Asset Inventory フィードのわかりやすい名前。
   - `<ORGANIZATION_ID>`: Google Cloud 組織 ID.
{{% /tab %}}
{{< /tabs >}}
   - `<TOPIC_NAME>`: `export-asset-changes-to-datadog` サブスクリプションにリンクされている Pub/Sub トピックの名前。
   - `<ASSET_NAMES>`: 変更イベント を受け取るリソースの[フルネーム][85]のカンマ区切りリスト。`asset-types` を指定する場合はオプションになります。
   - `<ASSET_TYPES>`: 変更イベント を受け取る[アセットタイプ][86]のカンマ区切りリスト。`asset-names` を指定する場合はオプションになります。
   - `<CONTENT_TYPE>`: アセット 変更イベントを受け取るアセットの[コンテンツタイプ][87] (**オプション**)。
   - `<CONDITION_TITLE>`: フィードに適用する[条件][88]のタイトル (**オプション**)。

Datadog では、すべてのリソースの変更を収集するために、`asset-types`パラメーターを正規表現の `.*` に設定することを推奨しています。

**注**: `asset-names` または`asset-types` パラメーターには、少なくとも 1 つの値を指定する必要があります。

設定可能なパラメータの一覧については、[gcloud asset feeds create][89] のリファレンスを参照してください。

#### 検証

[Datadog イベントエクスプローラー][90]でアセット変更イベント を見つけます。

## 収集データ

### メトリクス

メトリクスについては、個別の Google Cloud インテグレーションのページを参照してください。

#### 累積メトリクス

累積メトリクスは、メトリクス名ごとに `.delta` メトリクスを伴って Datadog にインポートされます。累積メトリクスとは、値が時間の経過とともに常に増加するメトリクスです。たとえば、`sent bytes` のメトリクスは累積的である可能性があります。各値は、その時点でサービスによって送信された総バイト数を記録します。デルタ値は、前回の測定からの変化を表します。

例:

`gcp.gke.container.restart_count` は、CUMULATIVE (累積) メトリクスです。Datadog はこのメトリクスを累積メトリクスとしてインポートする際に、(CUMULATIVE メトリクスの一部として出力される集計値ではなく) デルタ値を含む `gcp.gke.container.restart_count.delta` メトリクスを追加します。詳細については、[Google Cloud メトリクスの種類][91] を参照してください。

### イベント

Google Cloud Platform によって生成されたすべてのサービスイベントが [Datadog のイベントエクスプローラー][92]に転送されます。

### サービスチェック

Google Cloud Platform インテグレーションには、サービスのチェック機能は含まれません。

### タグ

タグは、Google Cloud Platform と Google Compute Engine の様々な構成オプションに基づいて自動的に割り当てられます。`project_id` タグは、すべてのメトリクスに追加されます。追加のタグは、利用可能な場合に Google Cloud Platform から収集され、メトリクスの種類に応じて異なります。

また、Datadog は以下をタグとして収集します。

- `<key>:<value>` ラベルが付けられたホスト。
- Custom labels from Google Pub/Sub、GCE、Cloud SQL、Cloud Storage のカスタムラベル

## トラブルシューティング

### ユーザー定義の _gcp.logging_ メトリクスに不正なメタデータが適用される

非標準の _gcp.logging_ メトリクス ([Datadog に標準で含まれるログメトリクス][93]以外のメトリクスなど) に適用されるメタデータが Google Cloud Logging と一致しない場合があります。

このような場合は、メタデータを手動で設定する必要があります。設定するには、[メトリクスサマリーページ][94]に移動し、問題のメトリクスを検索して選択し、メタデータの横にある鉛筆アイコンをクリックします。

ご不明な点は、[Datadog のサポートチーム][95]までお問い合わせください。

## 参考資料

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
[41]: https://cloud.google.com/monitoring/settings#:~:text=A%20scoping%20project%20hosts%20a,is%20also%20a%20scoping%20project.
[42]: https://cloud.google.com/compute/docs/labeling-resources
[43]: https://cloud.google.com/dataflow
[44]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog
[45]: https://cloud.google.com/pubsub/docs/create-topic
[46]: https://cloud.google.com/pubsub/docs/create-subscription
[47]: https://cloud.google.com/iam/docs/using-iam-securely#least_privilege
[48]: https://cloud.google.com/logging/docs/export/configure_export_v2#creating_sink
[49]: https://cloud.google.com/logging/docs/view/logging-query-language
[50]: https://cloud.google.com/apis/docs/getting-started#enabling_apis
[51]: https://docs.datadoghq.com/ja/agent/
[52]: https://cloud.google.com/vpc-service-controls/docs/supported-products#table_pubsub
[53]: https://console.cloud.google.com/cloudpubsub/topicList
[54]: https://console.cloud.google.com/cloudpubsub/subscription/
[55]: https://cloud.google.com/dataflow/docs/concepts/streaming-with-cloud-pubsub#unsupported-features
[56]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog#template-parameters
[57]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-pubsub
[58]: https://console.cloud.google.com/security/secret-manager
[59]: https://cloud.google.com/pubsub/quotas#quotas
[60]: https://cloud.google.com/compute/docs/access/service-accounts#default_service_account
[61]: https://console.cloud.google.com/iam-admin/serviceaccounts
[62]: https://cloud.google.com/dataflow/docs/concepts/access-control#dataflow.admin
[63]: https://cloud.google.com/dataflow/docs/concepts/access-control#dataflow.worker
[64]: https://cloud.google.com/pubsub/docs/access-control#pubsub.viewer
[65]: https://cloud.google.com/pubsub/docs/access-control#pubsub.subscriber
[66]: https://cloud.google.com/pubsub/docs/access-control#pubsub.publisher
[67]: https://cloud.google.com/secret-manager/docs/access-control#secretmanager.secretAccessor
[68]: https://cloud.google.com/storage/docs/access-control/iam-roles/
[69]: https://console.cloud.google.com/logs/viewer
[70]: https://cloud.google.com/logging/docs/view/logging-query-language#sample
[71]: https://console.cloud.google.com/dataflow/createjob
[72]: https://cloud.google.com/kms/docs
[73]: https://cloud.google.com/dataflow/docs/guides/specifying-networks#shared
[74]: https://app.datadoghq.com/logs
[75]: https://cloud.google.com/products/calculator
[76]: https://docs.datadoghq.com/ja/monitors/types/metric/
[77]: https://www.datadoghq.com/blog/datadog-recommended-monitors/
[78]: https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/
[79]: https://cloud.google.com/asset-inventory/docs/monitoring-asset-changes
[80]: https://app.datadoghq.com/integrations/google-cloud-platform?panel=resources
[81]: https://app.datadoghq.com/event/explorer
[82]: https://app.datadoghq.com/integrations/google-cloud-platform
[83]: https://cloud.google.com/shell
[84]: https://cloud.google.com/sdk/gcloud
[85]: https://cloud.google.com/asset-inventory/docs/resource-name-format
[86]: https://cloud.google.com/asset-inventory/docs/supported-asset-types
[87]: https://cloud.google.com/asset-inventory/docs/overview#content_types
[88]: https://cloud.google.com/asset-inventory/docs/monitoring-asset-changes-with-condition
[89]: https://cloud.google.com/sdk/gcloud/reference/asset/feeds/create
[90]: https://app.datadoghq.com/event/explorer?query=source%3Agoogle_cloud_asset_inventory
[91]: https://cloud.google.com/monitoring/api/v3/kinds-and-types
[92]: https://app.datadoghq.com/event/stream
[93]: https://docs.datadoghq.com/ja/integrations/google_stackdriver_logging/#metrics
[94]: https://app.datadoghq.com/metric/summary
[95]: https://docs.datadoghq.com/ja/help/
