---
app_id: google-cloud-platform
app_uuid: 8516e126-1eac-45e5-8e34-ff43db45f362
assets:
  dashboards:
    gce: assets/dashboards/gce.json
    gcp_overview: assets/dashboards/gcp_overview.json
  integration:
    auto_install: false
    events:
      creates_events: true
    metrics:
      check: gcp.gce.instance.cpu.utilization
      metadata_path: metadata.csv
      prefix: gcp
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 61
    source_type_name: Google Cloud Platform
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
- google cloud
- iot
- log collection
- network
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: google_cloud_platform
integration_id: google-cloud-platform
integration_title: Google Cloud Platform
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_cloud_platform
public_title: Google Cloud Platform
short_description: Google Cloud Platform は、クラウド コンピューティング プラットフォームを構成するウェブ サービスの集合体です。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::クラウド
  - Category::Google Cloud
  - Category::IoT
  - Category::ログの収集
  - Category::ネットワーク
  - Offering::Integration
  configuration: README.md#Setup
  description: 「Google Cloud Platform は、クラウドコンピューティングプラットフォームを構成するウェブサービスの集合体です。
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/cspm-for-gcp-with-datadog/
  - resource_type: blog
    url: https://www.datadoghq.com/blog/google-cloud-vertex-ai-monitoring-datadog/
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/
  - resource_type: その他
    url: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_gcp_sts
  - resource_type: blog
    url: https://www.datadoghq.com/blog/track-bigquery-costs-performance/
  - resource_type: blog
    url: https://www.datadoghq.com/blog/recent-changes-tab/
  support: README.md#Support
  title: Google Cloud Platform
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->

{{< site-region region="gov" >}}
<div class="alert alert-warning"><a href="https://cloud.google.com/iam/docs/service-account-impersonation">サービス アカウントのなりすまし</a>は、選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) ではご利用いただけません。</div>
{{< /site-region >}}


## 概要

このガイドを使用して、Google Cloud 環境のモニタリングを始めてください。この方法を使うことで、複数プロジェクトを持つ Google Cloud 環境のセットアップが簡素化され、最大限のモニタリング範囲を確保できます。

{{% collapse-content title="Google Cloud インテグレーションの一覧を見る" level="h4" %}}
<div class="alert alert-warning">
Datadog の Google Cloud インテグレーションは、<a href="https://cloud.google.com/monitoring/api/metrics_gcp">すべての Google Cloud メトリクス</a>を収集します。Datadog では継続的にドキュメントを更新して、依存関係にあるすべてのインテグレーションを表示できるようにしていますが、インテグレーション一覧が最新のクラウド サービスのメトリクスやサービスに追いつかないことがあります。

 特定の Google Cloud サービスのインテグレーションが表示されない場合は、<a href="https://www.datadoghq.com/support/">Datadog サポート</a>までご連絡ください。
</div>

| インテグレーション                         | 説明                                                                            |
|-------------------------------------|---------------------------------------------------------------------------------------|
| [App Engine][1]                     | スケーラブルなアプリケーションを構築できる PaaS (サービスとしてのプラットフォーム)                           |
| [BigQuery][2]                       | 企業向けデータウェアハウス                                                             |
| [Bigtable][3]                       | NoSQL ビッグデータデータベースサービス                                                       |
| [Cloud SQL][4]                      | MySQL データベースサービス                                                                |
| [Cloud APIs][5]                     | すべての Google Cloud Platform サービス向けのプログラムインターフェイス                        |
| [Cloud Armor][6]                   | DoS 攻撃や Web 攻撃から保護するネットワーク セキュリティ サービス    |
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
| [Cloud Run][18]                     | HTTP 経由でステートレス コンテナを実行するマネージド型のコンピューティング プラットフォーム                  |
| [Cloud Security Command Center][19] | Security Command Center は脅威レポート サービスです                                |
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
{{% /collapse-content %}}

## セットアップ

Datadog の Google Cloud インテグレーションをセットアップして、Google Cloud サービスからメトリクスとログを収集します。

### 前提条件

1. 組織でドメインによるアイデンティティを制限している場合、Datadog の顧客アイデンティティをポリシーで許可値として追加する必要があります。Datadog の顧客アイデンティティ: `C0147pk0i`

2. サービス アカウントのなりすましとプロジェクトの自動検出は、プロジェクト監視のために特定のロールと API が有効化されていることを前提としています。開始する前に、監視する**各プロジェクト**で以下の API が有効になっていることを確認してください。

[Cloud Monitoring API][35]
: Datadog が Google Cloud のメトリクス データを照会できるようにします。

[Compute Engine API][36]
: Datadog が Compute Engine インスタンスのデータを検出できるようにします。

[Cloud Asset API][37]
: Datadog が Google Cloud リソースを取得し、関連するラベルをタグとしてメトリクスに関連付けられるようにします。

[Cloud Resource Manager API][38]
: Datadog がメトリクスに正しいリソースやタグを追加できるようにします。

[IAM API][39]
: Datadog が Google Cloud で認証を行えるようにします。

[Cloud Billing API][40]
: 開発者が Google Cloud Platform プロジェクトの課金をプログラム上で管理できるようにします。詳細は [Cloud Cost Management (CCM)][41] のドキュメントを参照してください。

3. 監視対象のプロジェクトが、他の複数のプロジェクトからメトリクスを取り込む[スコーピング プロジェクト][42]として構成されていないことを確認してください。

### メトリクスの収集

#### インストール

{{< tabs >}}
{{% tab "組織レベルおよびフォルダー レベルのプロジェクトの自動検出" %}}


{{< site-region region="gov" >}}
組織レベルのメトリクスの収集は、{{< region-param key="dd_site_name" >}} サイトではご利用いただけません。
{{< /site-region >}}



{{< site-region region="us,us3,us5,eu,ap1" >}}
組織レベル、またはフォルダー レベルでのモニタリングは、組織またはフォルダー内に現在存在するすべてのプロジェクトだけでなく、将来新たに作成される可能性のあるプロジェクトも包括的にカバーするために推奨されます。

**注**: Google Cloud での設定を完了するには、[Google Cloud Identity][408] ユーザー アカウントに、希望するスコープで `Admin` ロールが割り当てられている必要があります (例: `Organization Admin`)。

{{% collapse-content title="1. デフォルトプロジェクトで Google Cloud サービスアカウントを作成する" level="h5" %}}
1. [Google Cloud コンソール][401]を開きます。
2. **IAM & Admin** > **Service Accounts** に移動します。
3. 画面上部の **Create service account** をクリックします。
4. サービスアカウントに一意の名前を付けます。
5. **Done** をクリックしてサービスアカウントの作成を完了します。

[401]: https://console.cloud.google.com/
{{% /collapse-content %}}

{{% collapse-content title="2. 組織またはフォルダレベルでサービスアカウントを追加する" level="h5" %}}
1. Google Cloud コンソールで、**IAM** ページに移動します。
2. フォルダまたは組織を選択します。
3. リソースに対して他のロールをまだ持っていないプリンシパルにロールを付与するには、**Grant Access** をクリックし、前に作成したサービスアカウントのメールを入力します。
4. サービスアカウントのメールアドレスを入力します。
5. 以下のロールを割り当てます。
  - [Compute Viewer][402]: Compute Engine リソースの取得およびリスト表示を行う**読み取り専用**アクセスを提供します。
  - [Monitoring Viewer][403]: Google Cloud 環境で利用可能な監視データへの**読み取り専用**アクセスを提供します。
  - [Cloud Asset Viewer][404]: クラウド アセットのメタデータへの**読み取り専用**アクセスを提供します。
  - [Browser][405]: プロジェクトの階層を参照するための**読み取り専用**アクセスを提供します。
  - [Service Usage Consumer][406] (**任意**、マルチ プロジェクト環境向け): Datadog サポートによる有効化後に、[プロジェクト単位のコストおよび API クォータ使用量の帰属](#enable-per-project-cost-and-api-quota-attribution)を可能にします。
6. **Save** をクリックします。

**注**: `Browser` ロールはサービス アカウントを作成したデフォルト プロジェクトでのみ必要です。他のプロジェクトでは、上記の他のロールだけを付与すれば問題ありません。

[402]: https://cloud.google.com/compute/docs/access/iam#compute.viewer
[403]: https://cloud.google.com/monitoring/access-control#monitoring_roles
[404]: https://cloud.google.com/iam/docs/understanding-roles#cloudasset.viewer
[405]: https://cloud.google.com/resource-manager/docs/access-control-proj#browser
[406]: https://cloud.google.com/service-usage/docs/access-control#serviceusage.serviceUsageConsumer
{{% /collapse-content %}}

{{% collapse-content title="3. Datadog のプリンシパルをサービスアカウントに追加する" level="h5" %}}
**注**: 以前に共有 Datadog プリンシパルを使ってアクセスを構成していた場合は、これらの手順を完了した後、そのプリンシパルへの権限を取り消すことができます。

1. Datadog で **Integrations** > [**Google Cloud Platform**][407] に移動します。
2. **Add Google Cloud Account** をクリックします。
プロジェクトが構成されていない場合は、このページへ自動的にリダイレクトされます。
3. Datadog プリンシパルをコピーして、次のセクションのために保管しておきます。

{{< img src="integrations/google_cloud_platform/principal-2.png" alt="Datadog の Google Cloud インテグレーションタイルで、新しい Google Cloud アカウントを追加する画面" style="width:70%;">}}

**注**: このウィンドウはセクション 4 のために開いたままにしてください。

4. [Google Cloud コンソール][409] の **Service Accounts** メニューで、セクション 1 で作成したサービス アカウントを探します。
5. **Permissions** タブに移動して **Grant Access** をクリックします。

{{< img src="integrations/google_cloud_platform/grant-access.png" alt="Google Cloud コンソールインターフェイスで、Service Accounts の下にある Permissions タブを表示しています。" style="width:70%;">}}

6. Datadog プリンシパルを **New principals** テキストボックスに貼り付けます。
7. **Service Account Token Creator** ロールを割り当てます。
8. **Save** をクリックします。

[407]: https://app.datadoghq.com/integrations/google-cloud-platform
[409]: https://console.cloud.google.com/
{{% /collapse-content %}}

{{% collapse-content title="4. Datadog でインテグレーションセットアップを完了する" level="h5" %}}
1. Google Cloud コンソールで、**Service Account** > **Details** タブに移動します。このページで、先ほど作成した Google サービスアカウントに紐づくメールアドレスを確認します。形式は `<SA_NAME>@<PROJECT_ID>.iam.gserviceaccount.com` です。
2. このメールをコピーします。
3. 先ほど Datadog プリンシパルをコピーした Datadog 側のインテグレーション設定画面に戻ります。
4. コピーしたメール アドレスを **Add Service Account Email** に貼り付けます。
5. **Verify and Save Account** をクリックします。
{{% /collapse-content %}}

メトリクスは、セットアップから約 **15 分**後に Datadog に表示されます。

[408]: https://cloud.google.com/identity/docs/overview
{{< /site-region >}}


#### 複数プロジェクトをモニタリングする際のベストプラクティス

##### プロジェクト単位のコストおよび API クォータ使用量の帰属を有効化する

デフォルトでは、モニタリング API コールや API クォータの使用量にかかるコストは、この連携用のサービスアカウントを含むプロジェクトに帰属します。複数のプロジェクトを持つ Google Cloud 環境のベストプラクティスとして、モニタリング API コールと API クォータ使用量をプロジェクト単位で帰属させる設定を有効にしてください。これを有効化すると、コストとクォータの使用量はサービスアカウントを含むプロジェクトではなく、*問い合わせを受ける側のプロジェクト*に帰属するようになります。これにより、各プロジェクトが発生させるモニタリングコストを可視化できるほか、API レートリミットへの到達を防ぎやすくなります。

この機能を有効にするには
1. Datadog サービス アカウントが、希望するスコープ (フォルダまたは組織) で [Service Usage Consumer][1] ロールを持つことを確認します。
2. [Google Cloud integration ページ][2]の **Projects** タブで、**Enable Per Project Quota** トグルをクリックします。

[1]: https://cloud.google.com/service-usage/docs/access-control#serviceusage.serviceUsageConsumer
[2]: https://app.datadoghq.com/integrations/google-cloud-platform
{{% /tab %}}

{{% tab "プロジェクト レベルのメトリクスの収集" %}}


{{< site-region region="gov" >}}
{{< region-param key="dd_site_name" >}} サイトの Datadog Google Cloud インテグレーションは、サービス アカウントを使用して、Google Cloud と Datadog 間の API 接続を作成します。以下の手順に従って、サービス アカウントを作成し、Datadog にサービス アカウントの認証情報を提供すると、Datadog があなたに代わって API 呼び出しを行えるようになります。

[サービス アカウントのなりすまし][201] は {{< region-param key="dd_site_name" >}} サイトでは利用できません。

**注**: [Google Cloud 請求][204]、[Cloud Monitoring API][205]、[Compute Engine API][206]、[Cloud Asset API][207] は、監視したいすべてのプロジェクトで有効にしておく必要があります。

1. Datadog とインテグレーションしたい Google Cloud プロジェクトの [Google Cloud 資格情報ページ][202]に移動します。
2. **Create credentials** (資格情報の作成) をクリックします。
3. **Service account** (サービスアカウント) を選択します。

    {{< img src="integrations/google_cloud_platform/SelectServiceAccount2.png" alt="設定" popup="true" style="width:80%;">}}

4. サービスアカウントに一意の名前とオプションの説明を付けます。
5. **Create and continue** (作成して続行) をクリックします。
6. 以下のロールを追加します。
    - Compute Viewer
    - Monitoring Viewer
    - Cloud Asset Viewer
7.  **Done** をクリックします。
    **注**: Compute Engine と Cloud Asset のロールを選択するには、Service Account Key Admin である必要があります。選択したロールはすべて、Datadog があなたに代わってメトリクス、タグ、イベント、ユーザーラベルを収集できるようにします。
8. ページの下部で、サービス アカウントを見つけて、先ほど作成したものを選択します。
9. **Add Key** -> **Create new key** (キーを追加 -> 新しいキーを作成) をクリックし、タイプとして **JSON** を選択します。
10. **Create** (作成) をクリックします。JSON キーファイルがコンピュータにダウンロードされます。このファイルは、インストールを完了するために必要ですので、保存場所に注意してください。
11. [Datadog Google Cloud Integration ページ][203]に移動します。
12. **Configuration** (構成) タブで、**Upload Key File** (キーファイルのアップロード) を選択して、このプロジェクトを Datadog とインテグレーションします。
13. オプションで、タグを使用して、このインテグレーションからホストを除外することができます。これに関する詳しい説明は [構成セクション](#configuration)にあります。

    {{< img src="integrations/google_cloud_platform/ServiceAccountAdded.png" alt=“設定" popup="true" style="width:80%;">}}

14. _Install/Update_ (インストール/更新) をクリックします。
15. 複数のプロジェクトを監視する場合は、次の方法のいずれかを使用します。

    - 複数のサービスアカウントを使用する場合は、上のプロセスを繰り返します。
    - 手順 10 でダウンロードした JSON ファイルの `project_id` を更新して、同じサービスアカウントを使用します。その後、手順 11-14 で説明したように、ファイルを Datadog にアップロードします。

[201]: https://cloud.google.com/iam/docs/service-account-impersonation
[202]: https://console.cloud.google.com/apis/credentials
[203]: https://app.datadoghq.com/account/settings#integrations/google_cloud_platform
[204]: https://support.google.com/cloud/answer/6293499?hl=en
[205]: https://console.cloud.google.com/apis/library/monitoring.googleapis.com
[206]: https://console.cloud.google.com/apis/library/compute.googleapis.com
[207]: https://console.cloud.google.com/apis/api/cloudasset.googleapis.com/overview
{{< /site-region >}}



{{< site-region region="us,us3,us5,eu,ap1" >}}
[サービスアカウントのなりすまし][301]とプロジェクトの自動発見を使用して、Datadog と [Google Cloud][302] を統合することができます。

この方法では、関連するプロジェクトに IAM ロールを割り当てることで、サービスアカウントから見えるすべてのプロジェクトを監視することができます。これらのロールを個別にプロジェクトに割り当てることもできますし、組織レベルやフォルダレベルでこれらのロールを割り当てて、プロジェクトのグループを監視するように Datadog を構成することもできます。このようにロールを割り当てることで、Datadog は、指定されたスコープ内のすべてのプロジェクト (将来的にそのグループに追加される新しいプロジェクトも含む) を自動的に発見・監視することができます。

{{% collapse-content title="1. Google Cloud サービス アカウントを作成する" level="h5" id="create-service-account" %}}
1. [Google Cloud コンソール][303]を開きます。
2. **IAM & Admin** > **Service Accounts** に移動します。
3. 上部の **Create service account** をクリックします。
4. サービスアカウントに一意の名前を付け、それから **Create and continue** をクリックします。
5. サービスアカウントに以下のロールを追加します。
   * Monitoring Viewer
   * Compute Viewer
   * Cloud Asset Viewer
   * ブラウザ
6. **Continue**、**Done** の順にクリックすると、サービスアカウントの作成が完了します。

{{< img src="integrations/google_cloud_platform/create-service-account.png" alt="Google Cloud コンソールのインターフェイスで、'Create service account' フローを表示しています。'Grant this service account access to project' の下に、説明にある 4 つのロールが追加されています。" style="width:70%;">}}

[303]: https://console.cloud.google.com/
{{% /collapse-content %}}

{{% collapse-content title="2. Datadog プリンシパルをサービス アカウントに追加する" level="h5" id="add-principal-to-service-account" %}}
1. Datadog で [**Integrations** > **Google Cloud Platform**][305] に移動します。
2. **Add GCP Account** をクリックします。構成されたプロジェクトがない場合、自動的にこのページにリダイレクトされます。
3. Datadog プリンシパルを生成していない場合は、**Generate Principal** ボタンをクリックします。
4. Datadog プリンシパルをコピーして、次のセクションのために保管しておきます。
   {{< img src="integrations/google_cloud_platform/principal-2.png" alt="Datadog のインターフェイスで、'Add New GCP Account' フローを表示しています。最初のステップである 'Add Datadog Principal to Google' では、ユーザーが Datadog プリンシパルを生成してクリップボードにコピーするためのテキストボックスが表示されます。2 番目のステップである 'Add Service Account Email’ では、ユーザーがセクション 3 で入力するテキストボックスがあります。" style="width:70%;">}}

   **注:** このウィンドウは次のセクションのために開いたままにしてください。
5. [Google Cloud コンソール][304] の **Service Accounts** (サービス アカウント) メニューで、[最初のセクション](#create-service-account)で作成したサービス アカウントを探します。
6. **Permissions** タブを開き、**Grant Access** をクリックします。
   {{< img src="integrations/google_cloud_platform/grant-access.png" alt="Google Cloud コンソールインターフェイスで、Service Accounts の下にある Permissions タブを表示しています。" style="width:70%;">}}
7. Datadog プリンシパルを **New principals** テキストボックスに貼り付けます。
8. **Service Account Token Creator** のロールを割り当て、**SAVE** をクリックします。
   {{< img src="integrations/google_cloud_platform/add-principals-blurred.png" alt="Google Cloud コンソールのインターフェイスで、'Add principals' ボックスと 'Assign roles' インターフェイスを表示しています。" style="width:70%;">}}

**注**: 以前に Datadog の共有プリンシパルを使用してアクセスを構成した場合、これらの手順を完了した後、そのプリンシパルの権限を取り消すことができます。

[304]: https://console.cloud.google.com/
[305]: https://app.datadoghq.com/integrations/google-cloud-platform
{{% /collapse-content %}}

{{% collapse-content title="3. Datadog でインテグレーション セットアップを完了する" level="h5" %}}
1. Google Cloud コンソールで、**Service Account** > **Details** タブに移動します。そこには、この Google サービスアカウントに関連するメールが記載されています。これは、`<sa-name>@<project-id>.iam.gserviceaccount.com` に似ています。
2. このメールをコピーします。
3. Datadog のインテグレーション構成タイル ([前セクション](#add-principal-to-service-account)で Datadog プリンシパルをコピーしたところ) に戻ります。
4. **Add Service Account Email** の下にあるボックスに、以前コピーしたメールを貼り付けます。
5. **Verify and Save Account** をクリックします。

約 15 分で、Datadog にメトリクスが表示されます。
{{% /collapse-content %}} 

[301]: https://cloud.google.com/iam/docs/service-account-impersonation
[302]: /ja/integrations/google_cloud_platform/
{{< /site-region >}}


{{% /tab %}}
{{< /tabs >}}

#### 検証

メトリクスを確認するには、左のメニューから **Metrics** > **Summary** に移動し、`gcp` で検索してください:

{{< img src="integrations/google_cloud_platform/gcp_metric_summary.png" alt="GCP で始まるメトリクスをフィルタリングした Datadog の Metric Summary ページ" style="width:100%;" >}}

#### 設定

{{% collapse-content title="メトリクス ネームスペースごとにメトリクス収集を制限する" level="h5" %}}

オプションで、Datadog で監視する Google Cloud サービスを選択できます。特定の Google サービスに対してメトリクスの収集を設定することで、重要なサービスの可視性を維持しながら、Google Cloud Monitoring API のコストを最適化できます。

Datadog の [Google Cloud インテグレーション ページ][43]にある **Metric Collection** タブで、除外するメトリクス ネームスペースの選択を解除します。すべてのメトリクス ネームスペースの収集を無効にすることもできます。

{{< img src="integrations/google_cloud_platform/limit_metric_namespaces.png" alt="Datadog の Google Cloud インテグレーション ページにある Metric Collection タブ" style="width:80%;">}}
{{% /collapse-content %}}

{{% collapse-content title="タグごとにメトリクスの収集を制限する" level="h5" %}}

デフォルトでは、すべての Google Compute Engine (GCE) インスタンスが Datadog のインフラストラクチャー概要に表示されます。Datadog は、GCE ホスト タグと、追加した GCE ラベルをインスタンスに自動的にタグ付けします。

オプションで、タグを使用して Datadog に取り込むインスタンスを制限できます。プロジェクトの **Metric Collection** タブにある **Limit Metric Collection Filters** テキスト ボックスにタグを入力します。定義したタグのいずれかに一致するホストのみが Datadog に取り込まれます。ワイルド カード (1 文字の場合は `?`、複数文字の場合は `*`) を使用して多数のホストに一致させることも、`!` を使用して特定のホストを除外することもできます。以下の例では、`c1*` のサイズのインスタンスをすべて含みつつ、ステージング ホストは除外しています:

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

詳細については、Google の[ラベルを使用してリソースを整理する][44]のページを参照してください。

{{% /collapse-content %}}

#### Datadog Agent の活用

[Datadog Agent][45] を使用して、インフラストラクチャーから[最も高粒度で低遅延なメトリクス][46]を収集できます。[GKE][47] を含む任意のホストに Agent をインストールすると、収集可能な[トレース][48]と[ログ][49]からより深いインサイトを得ることができます。詳細については、[クラウド インスタンスに Datadog Agent をインストールするメリットは何ですか？][50]をご覧ください。

## ログ収集

{{< tabs >}}
{{% tab "Dataflow を使う方法 (推奨)" %}}

[Google Cloud Dataflow][1] と [Datadog テンプレート][2]を使用して、Google Cloud サービスからのログを Datadog に転送します。この方法では、Datadog に転送する前にイベントの圧縮とバッチ処理の両方が可能です。

[terraform-gcp-datadog-integration][3] モジュールを使って Terraform 経由でこのインフラストラクチャーを管理するか、このセクションの指示に従って次の作業を行ってください。

1. 設定されたログ シンクからログを受信するために、Pub/Sub [トピック][4] と [プル サブスクリプション][5] を作成する。
2. カスタム Dataflow ワーカー サービス アカウントを作成し、Dataflow パイプライン ワーカーに[最小権限][6]を付与する。
3. [ログ シンク][7]を作成し、Pub/Sub トピックにログを公開する。
4. [Datadog テンプレート][2]を使用して Dataflow ジョブを作成し、Pub/Sub サブスクリプションからログを Datadog にストリーミングする。

GCE や GKE ログを含め、ログ シンクで作成したロギング フィルターを通して、どのログを Datadog に送信するかを完全に制御できます。フィルターの書き方については、Google の[ロギング クエリ言語ページ][8]を参照してください。作成されたアーキテクチャの詳細については、Cloud Architecture Center の [Google Cloud から Datadog にログをストリーミングする][9]を参照してください。

**注**: Google Cloud Dataflow を使用するには、**Dataflow API** を有効にする必要があります。詳細は Google Cloud ドキュメントの [API の有効化][10]を参照してください。

GCE や GKE 上で稼働するアプリケーションからログを収集する場合は、[Datadog Agent][11] を使用することも可能です。

#### 1. Cloud Pub/Sub トピックとサブスクリプションを作成する

1. [Cloud Pub/Sub コンソール][12]に移動し、新しいトピックを作成します。 **Add a default subscription** (デフォルトのサブスクリプションを追加する) オプションを選択して、セットアップを簡素化します。

   **注**: 手動で [Cloud Pub/Sub サブスクリプション][13]を **Pull** 配信タイプで構成することもできます。手動で Pub/Sub サブスクリプションを作成する場合は、`Enable dead lettering` (デッド レタリングを有効にする) ボックスの**チェックを外したまま**にしてください。詳細については、[サポートされていない Pub/Sub 機能][14]を参照してください。

{{< img src="integrations/google_cloud_platform/create_a_topic.png" alt="Google Cloud Console の Create a topic ページで、 Add a default subscription チェックボックスが選択されている" style="width:80%;">}}

2. トピックに `export-logs-to-datadog` のような明示的な名前を付け、**Create** をクリックします。

3. Datadog API によって拒否されたログメッセージを処理するために、追加のトピックとデフォルトのサブスクリプションを作成します。このトピックの名前は、Datadog Dataflow テンプレート内で `outputDeadletterTopic` [テンプレート パラメーター][10]のパス構成の一部として使用されます。失敗したメッセージの問題を検査して修正したら、[Pub/Sub to Pub/Sub テンプレート][15]ジョブを実行して元の `export-logs-to-datadog` トピックに送り返します。

4. Datadog では、[Secret Manager][16] で有効な Datadog API キーの値でシークレットを作成し、後で Datadog Dataflow テンプレートで使用することを推奨しています。

**警告**: Cloud Pub/Sub は [Google Cloud のクォータと制限][7]の対象となります。ログの数がこれらの制限を超える場合、Datadog はログを複数のトピックに分割することを推奨します。これらの制限に近づいた場合のモニター通知のセットアップについては、[Pub/Sub ログ転送の監視のセクション](#monitor-the-cloud-pubsub-log-forwarding)を参照してください。

#### 2. カスタム Dataflow ワーカーサービスアカウントを作成する

Dataflow パイプライン ワーカーはデフォルトで、プロジェクトの [Compute Engine のデフォルトのサービス アカウント][17]を使用します。このアカウントには、プロジェクト内のすべてのリソースへの権限が付与されます。**Production** 環境からログを転送している場合は、代わりに必要なロールと権限のみを持つカスタム ワーカーのサービス アカウントを作成し、このサービス アカウントを Dataflow パイプライン ワーカーに割り当てる必要があります。

1. Google Cloud コンソールの [Service Accounts][18] ページにアクセスし、プロジェクトを選択します。
2. **CREATE SERVICE ACCOUNT** をクリックし、サービスアカウントに分かりやすい名前を付けます。**CREATE AND CONTINUE** をクリックします。
3. 必要な権限テーブルにロールを追加し、**DONE** をクリックします。

##### 必要なアクセス許可

[Dataflow Admin][19]
: `roles/dataflow.admin` <br> このサービス アカウントが Dataflow の管理タスクを実行することを許可します。

[Dataflow Worker][20]
: `roles/dataflow.worker` <br> このサービス アカウントが Dataflow ジョブのオペレーションを実行することを許可します。

[Pub/Sub Viewer][21]
: `roles/pubsub.viewer` <br> このサービス アカウントが、Google Cloud ログを含む Pub/Sub サブスクリプションからのメッセージを表示することを許可します。

[Pub/Sub Subscriber][22]
: `roles/pubsub.subscriber` <br> このサービス アカウントが、Google Cloud ログを含む Pub/Sub サブスクリプションからのメッセージを受信することを許可します。

[Pub/Sub Publisher][1]
: `roles/pubsub.publisher`<br> このサービス アカウントが別のサブスクリプションに失敗したメッセージを公開することを許可します。これにより、ログの解析や再送信が可能になります。

[Secret Manager Secret Accessor][23]
: `roles/secretmanager.secretAccessor` <br> このサービス アカウントが Secret Manager で Datadog API キーにアクセスすることを許可します。

[Storage Object Admin][24]
: `roles/storage.objectAdmin`<br> このサービス アカウントが、ステージング ファイル用に指定された Cloud Storage バケットに対して読み取りと書き込みを行うことを許可します。

**注**: Dataflow パイプラインワーカー用のカスタムサービスアカウントを作成しない場合は、デフォルトの Compute Engine のサービスアカウントが上記の必要な権限を持っていることを確認してください。

#### 3. Google Cloud Pub/Sub トピックからログをエクスポートする

1. Google Cloud コンソールの [Logs Explorer ページ][25]に移動します。
2. **Log Router** タブより、**Create Sink** を選択します。
3. シンクに名前を設定します。
4. 宛先として _Cloud Pub/Sub_ を選択し、その目的で作成された Cloud Pub/Sub トピックを選択します。**注**: Cloud Pub/Sub トピックは別のプロジェクトに存在する場合があります。 

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Google Cloud Pub/Sub ログを Pub Sub へエクスポート" >}}

5. オプションの包含フィルターまたは除外フィルターを使用して、ログ シンクに含めるログを選択します。検索クエリでログをフィルタリングするか、[サンプル関数][5]を使用できます。例えば、`severity` (重大度) レベルが `ERROR` のログの 10% のみを含めるには、`severity="ERROR" AND sample(insertId, 0.1)` の包含フィルターを作成します。

    {{< img src="integrations/google_cloud_platform/sink_inclusion_filter_2.png" alt="severity=ERROR および sample(insertId, 0.1) のクエリによる Google Cloud ロギング シンクの包含フィルター" >}}

6. **Create Sink** をクリックします。

**注**: 異なるシンクを利用して、Google Cloud Logging から同一の Cloud Pub/Sub トピックに対して複数のエクスポートを行うことが可能です。

#### 4. Dataflow ジョブを作成して実行する

1. Google Cloud コンソールの[テンプレートからジョブを作成する][17]ページに移動します。
2. ジョブに名前を付け、Dataflow 地域エンドポイントを選択します。
3. **Dataflow template** ドロップダウンで `Pub/Sub to Datadog` を選択すると、**Required parameters** セクションが表示されます。 
   a. **Pub/Sub input subscription** ドロップダウンで入力サブスクリプションを選択します。
   b. **Datadog Logs API URL** フィールドに以下の値を入力します。
   <pre>https://{{< region-param key="http_endpoint" code="true" >}}</pre>

   **注**: 上記の URL をコピーする前に、ページの右側にある Datadog サイト セレクタが [Datadog サイト][22]に設定されていることを確認してください。

   c. **Output deadletter Pub/Sub topic** ドロップダウンで、メッセージの失敗を受信するために作成されたトピックを選択します。
   d. **Temporary location** フィールドで、ストレージ バケット内の一時ファイルのパスを指定します。

{{< img src="integrations/google_cloud_platform/dataflow_parameters.png" alt="Datadog Dataflow テンプレートの必須パラメーター" style="width:80%;">}}

4. **Optional Parameters** で `Include full Pub/Sub message in the payload` にチェックを入れます。

5. [ステップ 1](#1-create-a-cloud-pubsub-topic-and-subscription) で言及したように Datadog API キーの値で Secret Manager にシークレットを作成した場合は、シークレットの**リソース名**を **Google Cloud Secret Manager ID** フィールドに入力します。

{{< img src="integrations/google_cloud_platform/dataflow_template_optional_parameters.png" alt="Datadog Dataflow テンプレートのオプション パラメーター。Google Cloud Secret Manager ID と Source of the API key passed フィールドが両方ハイライトされています" style="width:80%;">}}

その他の使用可能なオプションの詳細については、Dataflow テンプレートの[テンプレート パラメーター][10]を参照してください:

   - `apiKeyKMSEncryptionKey` を [Cloud KMS][19] のキー ID に設定し、`apiKey` を暗号化された API キーに設定した `apiKeySource=KMS`
   - **非推奨**: `apiKeySource=PLAINTEXT` で、`apiKey` にプレーンテキストの API キーを設定

6. カスタム ワーカー サービス アカウントを作成した場合は、**Service account email** ドロップダウンでそれを選択します。

{{< img src="integrations/google_cloud_platform/dataflow_template_service_account.png" alt="Datadog Dataflow テンプレートのオプションパラメーター。サービスアカウントのメールドロップダウンがハイライトされています" style="width:80%;">}}

7. **RUN JOB** をクリックします。

**注**: 共有 VPC を使用している場合は、Dataflow ドキュメントの[ネットワークとサブネットワークを指定する][20]ページで `Network` と `Subnetwork` パラメーターの指定に関するガイドラインを参照してください。

#### 検証

Cloud Pub/Sub トピックに配信された新しいログ イベントは、[Datadog ログ エクスプローラー][24]に表示されます。

**注**: [Google Cloud Pricing Calculator][26] を使用して、潜在的なコストを計算することができます。

#### Cloud Pub/Sub ログの転送を監視する

[Google Cloud Pub/Sub インテグレーション][4]は、ログ転送のステータスを監視するのに役立つメトリクスを提供します。

   - `gcp.pubsub.subscription.num_undelivered_messages` は配信保留中のメッセージ数を表します
   - `gcp.pubsub.subscription.oldest_unacked_message_age` は、サブスクリプション内の最も古い未承認メッセージの年齢を表します

上記のメトリクスを[メトリクス モニター][27]とともに使用すると、入力およびデッドレター サブスクリプション内のメッセージに関するアラートを受け取ることができます。

#### Dataflow パイプラインを監視する

Datadog の [Google Cloud Dataflow インテグレーション][28]を使用して、Dataflow パイプラインのあらゆる側面を監視することができます。すぐに使えるダッシュボード上で、Dataflow ワークロードを実行している GCE インスタンスに関する情報や Pub/Sub スループットなどのコンテキスト データでリッチ化された、すべての主要 Dataflow メトリクスを確認できます。

また、あらかじめ構成されている [Recommended Monitor][29] を使用して、パイプラインのバックログ時間の増加に対する通知をセットアップすることもできます。詳細は、Datadog ブログの [Datadog による Dataflow パイプラインの監視][30]を参照してください。


[1]: https://cloud.google.com/dataflow
[2]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog
[3]: https://github.com/GoogleCloudPlatform/terraform-gcp-datadog-integration
[4]: /ja/integrations/google_cloud_pubsub/
[5]: https://cloud.google.com/pubsub/docs/create-subscription
[6]: https://www.datadoghq.com/blog/datadog-recommended-monitors/
[7]: https://cloud.google.com/logging/docs/export/configure_export_v2#creating_sink
[8]: https://cloud.google.com/logging/docs/view/logging-query-language
[9]: https://cloud.google.com/architecture/partners/stream-cloud-logs-to-datadog
[10]: https://cloud.google.com/apis/docs/getting-started#enabling_apis
[11]: /ja/agent/
[12]: https://console.cloud.google.com/cloudpubsub/topicList
[13]: https://console.cloud.google.com/cloudpubsub/subscription/
[14]: https://cloud.google.com/pubsub/docs/access-control#pubsub.viewer
[15]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-pubsub
[16]: https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/
[17]: https://console.cloud.google.com/dataflow/createjob
[18]: https://console.cloud.google.com/iam-admin/serviceaccounts
[19]: https://cloud.google.com/kms/docs
[20]: https://cloud.google.com/dataflow/docs/guides/specifying-networks#shared
[21]: https://cloud.google.com/dataflow/docs/concepts/access-control#dataflow.worker
[22]: https://console.cloud.google.com/logs/viewer
[23]: https://cloud.google.com/logging/docs/view/logging-query-language#sample
[24]: https://app.datadoghq.com/logs
[25]: https://cloud.google.com/pubsub/docs/access-control#pubsub.subscriber
[26]: https://cloud.google.com/products/calculator
[27]: /ja/monitors/types/metric/
[28]: https://cloud.google.com/pubsub/docs/access-control#pubsub.publisher
[29]: https://cloud.google.com/secret-manager/docs/access-control#secretmanager.secretAccessor
[30]: https://cloud.google.com/storage/docs/access-control/iam-roles/
{{% /tab %}}
{{% tab "Pub/Sub Push を使う方法 (レガシー)" %}}

<a href="/logs/guide/collect-google-cloud-logs-with-push/" target="_blank">Pub/Sub Push サブスクリプションによる Google Cloud ログの収集</a>は**非推奨化が進行中**です。

**Push** サブスクリプションに関する上記のドキュメントは、トラブルシューティングやレガシー セットアップの変更のためにのみ維持されています。

代わりに Google Cloud のログを Datadog に転送するには、[Dataflow を使う方法][1]の説明に従い、**Pull** サブスクリプションを Datadog Dataflow テンプレートとともに使用します。


[1]: http://docs.datadoghq.com/integrations/google_cloud_platform/?tab=dataflowmethodrecommended
{{% /tab %}}
{{< /tabs >}}

## 拡張型 BigQuery 監視

{{< callout url="https://www.datadoghq.com/product-preview/bigquery-monitoring/" header="プレビューに参加しましょう！" >}}
   拡張型 BigQuery 監視はプレビュー版です。クエリ パフォーマンスに関するインサイトを得るために、こちらのフォームから登録してください。
{{< /callout >}}

拡張型 BigQuery 監視により、BigQuery 環境を詳細に可視化できます。

### BigQuery ジョブのパフォーマンス監視

BigQuery ジョブのパフォーマンスを監視するには、各 Google Cloud プロジェクトの Datadog サービス アカウントに [BigQuery Resource Viewer][51] ロールを付与します。

**注**:
   - [セットアップ セクション](#setup)で説明されているように、Datadog で Google Cloud サービス アカウントの検証を完了しておく必要があります。
   - 拡張型 BigQuery 監視用のログを収集するために、Dataflow をセットアップする必要は**ありません**。

1. Google Cloud コンソールで、[IAM ページ][52]に移動します。
2. **Grant access** をクリックします。
3. **New principals** にサービス アカウントのメール アドレスを入力します。
4. [BigQuery Resource Viewer][51] ロールを割り当てます。
5. **SAVE** をクリックします。
6. Datadog の [Google Cloud インテグレーション ページ][43]で、**BigQuery** タブをクリックします。
7. **Enable Query Performance** トグルをクリックします。

### BigQuery データ品質監視

BigQuery データ品質監視は、BigQuery テーブルの品質メトリクス (鮮度や行数・サイズの更新など) を提供します。[Data Quality Monitoring ページ][53]でテーブルのデータを詳しく調べることができます。

品質メトリクスを収集するには、使用している各 BigQuery テーブルに対して、Datadog サービス アカウントに [BigQuery Metadata Viewer][54] ロールを付与します。

**注**: BigQuery Metadata Viewer は、BigQuery のテーブル、データセット、プロジェクト、または組織レベルで適用できます。
   - データセット内の全テーブルのデータ品質監視を行うには、データセット レベルでアクセス権を付与します。
   - プロジェクト内の全データセットのデータ品質監視を行うには、プロジェクト レベルでアクセス権を付与します。

1. [BigQuery][55] に移動します。
2. エクスプローラーで、目的の BigQuery リソースを検索します。
3. リソースの横にある 3 つのドット メニューをクリックし、**Share -> Manage Permissions** をクリックします。

{{< img src="integrations/google_cloud_platform/bigquery_manage_permissions.png" alt="BigQuery データセット リソースの Manage Permissions メニュー" style="width:80%;">}}

4. **ADD PRINCIPAL** をクリックします。
5. New principals のボックス内に、Google Cloud インテグレーション用に設定した Datadog サービス アカウントを入力します。
6. [BigQuery Metadata Viewer][54] ロールを割り当てます。
7. **SAVE** をクリックします。
8. Datadog の [Google Cloud インテグレーションページ][43]で、**BigQuery** タブをクリックします。
9. **Enable Data Quality** トグルをクリックします。

### BigQuery ジョブ ログの保持期間

Datadog は、`data-observability-queries` と呼ばれる新しい[ログ インデックス][56]を設定し、BigQuery ジョブのログを 15 日間インデックス化することを推奨しています。ログを取り込むには、以下のインデックス フィルターを使用します:

```bash
service:data-observability @platform:*
```

コストの見積もりについては、[ログ管理の料金ページ][57]を参照してください。

## Resource changes collection

{{< callout url="https://www.datadoghq.com/private-beta/recent-changes-tab/" >}}
  <strong>Resource changes collection</strong> はプレビュー版です。アクセスをリクエストするには、添付のフォームをご利用ください。
{{< /callout >}}

Google Cloud インテグレーション ページの [Resource Collection タブ][58]で **Enable Resource Collection** を選択します。これにより、Google の [Cloud Asset Inventory][59] がクラウド リソースの変更を検出したときに、Datadog でリソース イベントを受信できるようになります。

次に、以下の手順に従って、Pub/Sub トピックから Datadog の [イベント エクスプローラー][60] に変更イベントを転送します。

{{% collapse-content title="Google Cloud CLI" level="h4" %}}
### Cloud Pub/Sub トピックとサブスクリプションを作成する

#### トピックの作成

1. [Google Cloud Pub/Sub トピック ページ][61]で、**CREATE TOPIC** をクリックします。
2. トピックにわかりやすい名前をつけます。
3. デフォルトのサブスクリプションを追加するオプションの**チェックを外します**。
4. **CREATE** をクリックします。

#### サブスクリプションの作成

1. [Google Cloud Pub/Sub サブスクリプション ページ][62]で、**CREATE SUBSCRIPTION** をクリックします。
2. サブスクリプション名に `export-asset-changes-to-datadog` と入力します。
3. 先ほど作成した Cloud Pub/Sub トピックを選択します。
4. 配信タイプとして **Pull** を選択します。
5. **CREATE** をクリックします。

### アクセス権を付与する

この Pub/Sub サブスクリプションから読み取るには、インテグレーション が使用する Google Cloud サービス アカウントに、サブスクリプションに対する `pubsub.subscriptions.consume` 権限が必要です。これを許可する最小限の権限を持つデフォルトのロールは **Pub/Sub subscriber** ロールです。このロールを付与するには、以下の手順に従います。

1. [Google Cloud Pub/Sub サブスクリプション ページ][62]で、`export-asset-changes-to-datadog` サブスクリプションをクリックします。
2. ページ右側の**情報パネル**で、**Permissions** タブ をクリックします。情報パネルが表示されない場合は、**SHOW INFO PANEL** をクリックしてください。
3. **ADD PRINCIPAL** をクリックします。
4. Datadog Google Cloud インテグレーションが使用する**サービス アカウントのメール アドレス**を入力します。サービス アカウントは、Datadog の [Google Cloud インテグレーション ページ][43]の **Configuration** タブの左側に表示されます。

### アセットフィードを作成する

[Cloud Shell][63] または [gcloud CLI][64] で以下のコマンドを実行し、上記で作成した Pub/Sub トピックに変更イベントを送信する Cloud Asset Inventory フィードを作成します。

{{< tabs >}}

{{% tab "プロジェクト" %}}

```bash
gcloud asset feeds create <FEED_NAME>
--project=<PROJECT_ID>
--pubsub-topic=projects/<PROJECT_ID>/topics/<TOPIC_NAME>
--asset-names=<ASSET_NAMES>
--asset-types=<ASSET_TYPES>
--content-type=<CONTENT_TYPE>
```

プレースホルダーの値を下記の要領で更新します。

   - `<FEED_NAME>`: Cloud Asset Inventory フィードのわかりやすい名前。
   - `<PROJECT_ID>`: Google Cloud プロジェクト ID。
   - `<TOPIC_NAME>`: `export-asset-changes-to-datadog` サブスクリプションにリンクされている Pub/Sub トピックの名前。
   - `<ASSET_NAMES>`: 変更イベントを受け取るリソースの[フル ネーム][1]のカンマ区切りリスト。`asset-types` を指定する場合は**オプション**です。
   - `<ASSET_TYPES>`: 変更イベントを受け取る[アセット タイプ][2]のカンマ区切りリスト。`asset-names` を指定する場合は**オプション**です。
   - `<CONTENT_TYPE>`: 変更イベントを受け取るアセットの[コンテンツ タイプ][3] (**オプション**)。

[1]: https://cloud.google.com/asset-inventory/docs/resource-name-format
[2]: https://cloud.google.com/asset-inventory/docs/supported-asset-types
[3]: https://cloud.google.com/asset-inventory/docs/overview#content_types
{{% /tab %}}
{{% tab "フォルダー" %}}
```bash
gcloud asset feeds create <FEED_NAME>
--folder=<FOLDER_ID>
--pubsub-topic=projects/<PROJECT_ID>/topics/<TOPIC_NAME>
--asset-names=<ASSET_NAMES>
--asset-types=<ASSET_TYPES>
--content-type=<CONTENT_TYPE>
```

プレースホルダーの値を下記の要領で更新します。

   - `<FEED_NAME>`: Cloud Asset Inventory フィードのわかりやすい名前。
   - `<FOLDER_ID>`: Google Cloud フォルダー ID.
   - `<TOPIC_NAME>`: `export-asset-changes-to-datadog` サブスクリプションにリンクされている Pub/Sub トピックの名前。
   - `<ASSET_NAMES>`: 変更イベントを受け取るリソースの[フルネーム][1]のカンマ区切りリスト。`asset-types` を指定する場合は**オプション**になります。
   - `<ASSET_TYPES>`: 変更イベント を受け取る[アセットタイプ][2]のカンマ区切りリスト。`asset-names` を指定する場合は**オプション**になります。
   - `<CONTENT_TYPE>`: 変更イベントを受け取るアセットの[コンテンツタイプ][3] (**オプション**)。


[1]: https://cloud.google.com/asset-inventory/docs/resource-name-format
[2]: https://cloud.google.com/asset-inventory/docs/supported-asset-types
[3]: https://cloud.google.com/asset-inventory/docs/overview#content_types
{{% /tab %}}

{{% tab "組織" %}}

```bash
gcloud asset feeds create <FEED_NAME>
--organization=<ORGANIZATION_ID>
--pubsub-topic=projects/<PROJECT_ID>/topics/<TOPIC_NAME>
--asset-names=<ASSET_NAMES>
--asset-types=<ASSET_TYPES>
--content-type=<CONTENT_TYPE>
```

プレースホルダーの値を下記の要領で更新します。

   - `<FEED_NAME>`: Cloud Asset Inventory フィードのわかりやすい名前。
   - `<ORGANIZATION_ID>`: Google Cloud 組織 ID.
   - `<TOPIC_NAME>`: `export-asset-changes-to-datadog` サブスクリプションにリンクされている Pub/Sub トピックの名前。
   - `<ASSET_NAMES>`: 変更イベントを受け取るリソースの[フルネーム][1]のカンマ区切りリスト。`asset-types` を指定する場合は**オプション**になります。
   - `<ASSET_TYPES>`: 変更イベント を受け取る[アセットタイプ][2]のカンマ区切りリスト。`asset-names` を指定する場合は**オプション**になります。
   - `<CONTENT_TYPE>`: 変更イベントを受け取るアセットの[コンテンツタイプ][3] (**オプション**)。


[1]: https://cloud.google.com/asset-inventory/docs/resource-name-format
[2]: https://cloud.google.com/asset-inventory/docs/supported-asset-types
[3]: https://cloud.google.com/asset-inventory/docs/overview#content_types
{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Terraform" level="h4" %}}
### アセットフィードを作成する

以下の Terraform テンプレートをコピーし、必要な引数を代入します。

{{< tabs >}}
{{% tab "プロジェクト" %}}

```h
locals {
  project_id = "<PROJECT_ID>"
}

resource "google_pubsub_topic" "pubsub_topic" {
  project = local.project_id
  name    = "<TOPIC_NAME>"
}

resource "google_pubsub_subscription" "pubsub_subscription" {
  project = local.project_id
  name    = "export-asset-changes-to-datadog"
  topic   = google_pubsub_topic.pubsub_topic.id
}

resource "google_pubsub_subscription_iam_member" "subscriber" {
  project      = local.project_id
  subscription = google_pubsub_subscription.pubsub_subscription.id
  role         = "roles/pubsub.subscriber"
  member       = "serviceAccount:<SERVICE_ACCOUNT_EMAIL>"
}

resource "google_cloud_asset_project_feed" "project_feed" {
  project      = local.project_id
  feed_id      = "<FEED_NAME>"
  content_type = "<CONTENT_TYPE>" # オプション。使用しない場合は削除。

  asset_names = ["<ASSET_NAMES>"] # asset_types を指定する場合はオプション。使用しない場合は削除。
  asset_types = ["<ASSET_TYPES>"] # asset_names を指定する場合はオプション。使用しない場合は削除。

  feed_output_config {
    pubsub_destination {
      topic = google_pubsub_topic.pubsub_topic.id
    }
  }
}
```

プレースホルダーの値を下記の要領で更新します。

   - `<PROJECT_ID>`: Google Cloud プロジェクト ID。
   - `<TOPIC_NAME>`: `export-asset-changes-to-datadog` サブスクリプションにリンクする Pub/Sub トピックの名前。
   - `<SERVICE_ACCOUNT_EMAIL>`: Datadog Google Cloud インテグレーションで使用されるサービス アカウントのメール アドレス。
   - `<FEED_NAME>`: Cloud Asset Inventory フィードのわかりやすい名前。
   - `<ASSET_NAMES>`: 変更イベントを受け取るリソースの[フルネーム][1]のカンマ区切りリスト。`asset-types` を指定する場合は**オプション**になります。
   - `<ASSET_TYPES>`: 変更イベント を受け取る[アセットタイプ][2]のカンマ区切りリスト。`asset-names` を指定する場合は**オプション**になります。
   - `<CONTENT_TYPE>`: 変更イベントを受け取るアセットの[コンテンツタイプ][3] (**オプション**)。


[1]: https://cloud.google.com/asset-inventory/docs/resource-name-format
[2]: https://cloud.google.com/asset-inventory/docs/supported-asset-types
[3]: https://cloud.google.com/asset-inventory/docs/overview#content_types
{{% /tab %}}

{{% tab "フォルダー" %}}

```h
locals {
  project_id = "<PROJECT_ID>"
}

resource "google_pubsub_topic" "pubsub_topic" {
  project = local.project_id
  name    = "<TOPIC_NAME>" 
}

resource "google_pubsub_subscription" "pubsub_subscription" {
  project = local.project_id
  name    = "export-asset-changes-to-datadog"
  topic   = google_pubsub_topic.pubsub_topic.id
}

resource "google_pubsub_subscription_iam_member" "subscriber" {
  project      = local.project_id
  subscription = google_pubsub_subscription.pubsub_subscription.id
  role         = "roles/pubsub.subscriber"
  member       = "serviceAccount:<SERVICE_ACCOUNT_EMAIL>"
}

resource "google_cloud_asset_folder_feed" "folder_feed" {
  billing_project = local.project_id
  folder          = "<FOLDER_ID>"
  feed_id         = "<FEED_NAME>"
  content_type    = "<CONTENT_TYPE>" # オプション。使用しない場合は削除。

  asset_names = ["<ASSET_NAMES>"] # asset_types を指定する場合はオプション。使用しない場合は削除。
  asset_types = ["<ASSET_TYPES>"] # asset_names を指定する場合はオプション。使用しない場合は削除。

  feed_output_config {
    pubsub_destination {
      topic = google_pubsub_topic.pubsub_topic.id
    }
  }
}
```

プレースホルダーの値を下記の要領で更新します。

   - `<PROJECT_ID>`: Google Cloud プロジェクト ID。
   - `<FOLDER_ID>`: このフィードを作成するフォルダーの ID。
   - `<TOPIC_NAME>`: `export-asset-changes-to-datadog` サブスクリプションにリンクする Pub/Sub トピックの名前。
   - `<SERVICE_ACCOUNT_EMAIL>`: Datadog Google Cloud インテグレーションで使用されるサービスアカウントのメールアドレス。
   - `<FEED_NAME>`: Cloud Asset Inventory フィードのわかりやすい名前。
   - `<ASSET_NAMES>`: 変更イベントを受け取るリソースの[フルネーム][1]のカンマ区切りリスト。`asset-types` を指定する場合は**オプション**になります。
   - `<ASSET_TYPES>`: 変更イベント を受け取る[アセットタイプ][2]のカンマ区切りリスト。`asset-names` を指定する場合は**オプション**になります。
   - `<CONTENT_TYPE>`: 変更イベントを受け取るアセットの[コンテンツタイプ][3] (**オプション**)。


[1]: https://cloud.google.com/asset-inventory/docs/resource-name-format
[2]: https://cloud.google.com/asset-inventory/docs/supported-asset-types
[3]: https://cloud.google.com/asset-inventory/docs/overview#content_types
{{% /tab %}}

{{% tab "組織" %}}

```h
locals {
  project_id = "<PROJECT_ID>"
}

resource "google_pubsub_topic" "pubsub_topic" {
  project = local.project_id
  name    = "<TOPIC_NAME>"
}

resource "google_pubsub_subscription" "pubsub_subscription" {
  project = local.project_id
  name    = "export-asset-changes-to-datadog"
  topic   = google_pubsub_topic.pubsub_topic.id
}

resource "google_pubsub_subscription_iam_member" "subscriber" {
  project      = local.project_id
  subscription = google_pubsub_subscription.pubsub_subscription.id
  role         = "roles/pubsub.subscriber"
  member       = "serviceAccount:<SERVICE_ACCOUNT_EMAIL>"
}

resource "google_cloud_asset_organization_feed" "organization_feed" {
  billing_project = local.project_id
  org_id          = "<ORGANIZATION_ID>"
  feed_id         = "<FEED_NAME>"
  content_type    = "<CONTENT_TYPE>" # オプション。使用しない場合は削除。

  asset_names = ["<ASSET_NAMES>"] # asset_types を指定する場合はオプション。使用しない場合は削除。
  asset_types = ["<ASSET_TYPES>"] # asset_names を指定する場合はオプション。使用しない場合は削除。

  feed_output_config {
    pubsub_destination {
      topic = google_pubsub_topic.pubsub_topic.id
    }
  }
}
```

プレースホルダーの値を下記の要領で更新します。

   - `<PROJECT_ID>`: Google Cloud プロジェクト ID。
   - `<TOPIC_NAME>`: `export-asset-changes-to-datadog` サブスクリプションにリンクする Pub/Sub トピックの名前。
   - `<SERVICE_ACCOUNT_EMAIL>`: Datadog Google Cloud インテグレーションで使用されるサービスアカウントのメールアドレス。
   - `<ORGANIZATION_ID>`: Google Cloud 組織 ID.
   - `<FEED_NAME>`: Cloud Asset Inventory フィードのわかりやすい名前。
   - `<ASSET_NAMES>`: 変更イベントを受け取るリソースの[フルネーム][1]のカンマ区切りリスト。`asset-types` を指定する場合は**オプション**になります。
   - `<ASSET_TYPES>`: 変更イベント を受け取る[アセットタイプ][2]のカンマ区切りリスト。`asset-names` を指定する場合は**オプション**になります。
   - `<CONTENT_TYPE>`: 変更イベントを受け取るアセットの[コンテンツタイプ][3] (**オプション**)。


[1]: https://cloud.google.com/asset-inventory/docs/resource-name-format
[2]: https://cloud.google.com/asset-inventory/docs/supported-asset-types
[3]: https://cloud.google.com/asset-inventory/docs/overview#content_types
{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

Datadog では、すべてのリソースの変更を収集するために、`asset-types`パラメーターを正規表現の `.*` に設定することを推奨しています。

**注**: `asset-names` または `asset-types` パラメーターには、少なくとも 1 つの値を指定する必要があります。

設定可能なパラメーターの一覧については、[gcloud asset feeds create][65] のリファレンスを参照してください。

### リソース変更の収集を有効にする

Google Cloud インテグレーション ページの [Resource Collection タブ][58]で、**Enable Resource Changes Collection** をクリックします。

{{< img src="integrations/google_cloud_platform/enable_resource_change_collection.png" alt="Datadog の Google Cloud インテグレーション タイルにある Enable Resource Changes Collection トグル" popup="true" style="width:80%;">}}

#### 検証

[Datadog イベント エクスプローラー][66]でアセット変更イベントを見つけます。

## Private Service Connect


{{< site-region region="us,us3,ap1,gov" >}}
<div class="alert alert-info">Private Service Connect は US5 と EU の Datadog サイトでのみ使用できます。</div>
{{< /site-region >}}


[Google Cloud Private Service Connect インテグレーション][29]を利用すると、Private Service Connect を通じた接続状況、転送されたデータ、ドロップされたパケットを可視化できます。これにより、プロデューサーとコンシューマーの両方について、Private Service Connect 接続から得られる重要なメトリクスを把握できます。
[Private Service Connect (PSC)][67] は Google Cloud のネットワーキング製品で、[Google Cloud サービス][68]、[サード パーティ パートナーのサービス][69]、および自社アプリケーションに対し、Virtual Private Cloud (VPC) から直接アクセスすることを可能にします。

詳細については、Datadog ブログの [Datadog にプライベートにアクセスし、Google Cloud Private Service Connect の使用状況をモニタリングする][70]を参照してください。

## 収集データ

### メトリクス

メトリクスについては、個別の Google Cloud インテグレーションのページを参照してください。

#### 累積メトリクス

累積メトリクスは、メトリクス名ごとに `.delta` メトリクスを伴って Datadog にインポートされます。累積メトリクスとは、値が時間の経過とともに常に増加するメトリクスです。たとえば、`sent bytes` のメトリクスは累積的である可能性があります。各値は、その時点でサービスによって送信された総バイト数を記録します。デルタ値は、前回の測定からの変化を表します。

例:

 `gcp.gke.container.restart_count` は、CUMULATIVE (累積) メトリクスです。Datadog はこのメトリクスを累積メトリクスとしてインポートする際に、(CUMULATIVE メトリクスの一部として出力される集計値ではなく) デルタ値を含む `gcp.gke.container.restart_count.delta` メトリクスを追加します。詳細については、[Google Cloud メトリクスの種類][71] を参照してください。

### イベント

Google Cloud Platform によって生成されたすべてのサービス イベントが [Datadog のイベント エクスプローラー][72]に転送されます。

### サービス チェック

Google Cloud Platform インテグレーションには、サービスのチェック機能は含まれません。

### タグ

タグは、Google Cloud Platform と Google Compute Engine の様々な構成オプションに基づいて自動的に割り当てられます。`project_id` タグは、すべてのメトリクスに追加されます。追加のタグは、利用可能な場合に Google Cloud Platform から収集され、メトリクスの種類に応じて異なります。

また、Datadog は以下をタグとして収集します。

- `<key>:<value>` ラベルが付けられたホスト。
- Custom labels from Google Pub/Sub、GCE、Cloud SQL、Cloud Storage のカスタムラベル

## トラブルシューティング

### ユーザー定義の _gcp.logging_ メトリクスに不正なメタデータが適用される

非標準の _gcp.logging_ メトリクス ([Datadog に標準で含まれるログ メトリクス][73]以外のメトリクスなど) に適用されるメタデータが Google Cloud Logging と一致しない場合があります。

このような場合は、メタデータを手動で設定する必要があります。設定するには、[メトリクス サマリー ページ][74]に移動し、問題のメトリクスを検索して選択し、メタデータの横にある鉛筆アイコンをクリックします。

ご不明な点は、[Datadog のサポート チーム][75]までお問い合わせください。

## 参考資料
役立つドキュメント、リンク、記事:

- [Datadog による Google Cloud 環境のコンプライアンスとセキュリティ ポスチャの改善][76]
- [Datadog による Google Cloud Vertex AI の監視][77]
- [Datadog による Dataflow パイプラインの監視][78]
- [Terraform による Google Cloud インテグレーションの作成と管理][79]
- [Datadog で BigQuery をモニタリングする][80]
- [Resource Catalog の Recent Changes でインフラストラクチャーの変更をより迅速にトラブルシューティングする][81]
- [Google Cloud から Datadog にログをストリーミングする][82]


[1]: /ja/integrations/google_app_engine/
[2]: /ja/integrations/google_cloud_bigquery/
[3]: /ja/integrations/google_cloud_bigtable/
[4]: /ja/integrations/google_cloudsql/
[5]: /ja/integrations/google_cloud_apis/
[6]: /ja/integrations/google_cloud_armor/
[7]: /ja/integrations/google_cloud_composer/
[8]: /ja/integrations/google_cloud_dataproc/
[9]: /ja/integrations/google_cloud_dataflow/
[10]: /ja/integrations/google_cloud_filestore/
[11]: /ja/integrations/google_cloud_firestore/
[12]: /ja/integrations/google_cloud_interconnect/
[13]: /ja/integrations/google_cloud_iot/
[14]: /ja/integrations/google_cloud_loadbalancing/
[15]: /ja/integrations/google_stackdriver_logging/
[16]: /ja/integrations/google_cloud_redis/
[17]: /ja/integrations/google_cloud_router/
[18]: /ja/integrations/google_cloud_run/
[19]: /ja/integrations/google_cloud_security_command_center/
[20]: /ja/integrations/google_cloud_tasks/
[21]: /ja/integrations/google_cloud_tpu/
[22]: /ja/integrations/google_compute_engine/
[23]: /ja/integrations/google_container_engine/
[24]: /ja/integrations/google_cloud_datastore/
[25]: /ja/integrations/google_cloud_firebase/
[26]: /ja/integrations/google_cloud_functions/
[27]: /ja/integrations/google_kubernetes_engine/
[28]: /ja/integrations/google_cloud_ml/
[29]: /ja/integrations/google_cloud_private_service_connect/
[30]: /ja/integrations/google_cloud_pubsub/
[31]: /ja/integrations/google_cloud_spanner/
[32]: /ja/integrations/google_cloud_storage/
[33]: /ja/integrations/google_cloud_vertex_ai/
[34]: /ja/integrations/google_cloud_vpn/
[35]: https://console.cloud.google.com/apis/library/monitoring.googleapis.com
[36]: https://console.cloud.google.com/apis/library/compute.googleapis.com
[37]: https://console.cloud.google.com/apis/library/cloudasset.googleapis.com
[38]: https://console.cloud.google.com/apis/library/cloudresourcemanager.googleapis.com
[39]: https://console.cloud.google.com/apis/library/iam.googleapis.com
[40]: https://console.cloud.google.com/apis/library/cloudbilling.googleapis.com
[41]: /ja/cloud_cost_management/setup/google_cloud/
[42]: https://cloud.google.com/monitoring/settings#:~:text=A%20scoping%20project%20hosts%20a,is%20also%20a%20scoping%20project.
[43]: https://app.datadoghq.com/integrations/google-cloud-platform
[44]: https://cloud.google.com/compute/docs/labeling-resources
[45]: /ja/agent/
[46]: /ja/data_security/data_retention_periods/
[47]: /ja/integrations/gke/
[48]: /ja/tracing/
[49]: /ja/logs/
[50]: /ja/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
[51]: https://cloud.google.com/bigquery/docs/access-control#bigquery.resourceViewer
[52]: https://console.cloud.google.com/iam-admin/
[53]: https://app.datadoghq.com/datasets/tables/explore
[54]: https://cloud.google.com/bigquery/docs/access-control#bigquery.metadataViewer
[55]: https://console.cloud.google.com/bigquery
[56]: https://app.datadoghq.com/logs/pipelines/indexes
[57]: https://www.datadoghq.com/pricing/?product=log-management#products
[58]: https://app.datadoghq.com/integrations/google-cloud-platform?panel=resources
[59]: https://cloud.google.com/asset-inventory/docs/monitoring-asset-changes
[60]: https://app.datadoghq.com/event/explorer
[61]: https://console.cloud.google.com/cloudpubsub/topicList
[62]: https://console.cloud.google.com/cloudpubsub/subscription/
[63]: https://cloud.google.com/shell
[64]: https://cloud.google.com/sdk/gcloud
[65]: https://cloud.google.com/sdk/gcloud/reference/asset/feeds/create
[66]: https://app.datadoghq.com/event/explorer?query=source%3Agoogle_cloud_asset_inventory
[67]: https://cloud.google.com/vpc/docs/private-service-connect
[68]: https://cloud.google.com/vpc/docs/private-service-connect-compatibility#google-services
[69]: https://cloud.google.com/vpc/docs/private-service-connect-compatibility#third-party-services
[70]: https://www.datadoghq.com/blog/google-cloud-private-service-connect/
[71]: https://cloud.google.com/monitoring/api/v3/kinds-and-types
[72]: https://app.datadoghq.com/event/stream
[73]: /ja/integrations/google_stackdriver_logging/#metrics
[74]: https://app.datadoghq.com/metric/summary
[75]: /ja/help/
[76]: https://www.datadoghq.com/blog/cspm-for-gcp-with-datadog/
[77]: https://www.datadoghq.com/blog/google-cloud-vertex-ai-monitoring-datadog/
[78]: https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/
[79]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_gcp_sts
[80]: https://www.datadoghq.com/blog/track-bigquery-costs-performance/
[81]: https://www.datadoghq.com/blog/recent-changes-tab/
[82]: https://cloud.google.com/architecture/partners/stream-cloud-logs-to-datadog