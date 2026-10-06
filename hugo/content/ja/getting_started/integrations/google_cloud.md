---
description: Google Cloud 環境の包括的な監視を設定します。サービスアカウントの構成、メトリクス収集の有効化、ログ転送と Agent のインストールについて確認します。
further_reading:
- link: https://docs.datadoghq.com/integrations/google_cloud_platform/?tab=dataflowmethodrecommended
  tag: ドキュメント
  text: Google Cloud インテグレーション
- link: https://docs.datadoghq.com/account_management/billing/google_cloud/
  tag: ガイド
  text: Google Cloud インテグレーションの課金
- link: https://docs.datadoghq.com/integrations/guide/cloud-metric-delay/
  tag: ガイド
  text: クラウドメトリクスの遅延
- link: https://docs.datadoghq.com/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: ガイド
  text: クラウドインスタンスに Datadog Agent をインストールした方がよいのはなぜですか
- link: https://www.datadoghq.com/blog/gke-dashboards-integration-improvements/
  tag: ブログ
  text: 新しい GKE ダッシュボードとメトリクスにより、環境へのより深い可視性が得られます
- link: https://www.datadoghq.com/blog/google-cloud-private-service-connect/
  tag: ブログ
  text: Datadog にプライベートにアクセスし、Google Cloud Private Service Connect の使用状況をモニタリングする
- link: https://www.datadoghq.com/blog/track-bigquery-costs-performance/
  tag: ブログ
  text: Datadog で BigQuery をモニタリングする
- link: https://www.datadoghq.com/blog/google-cloud-cost-management/
  tag: ブログ
  text: Datadog でエンジニアが Google Cloud のコストを管理するための権限を与える
- link: https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/
  tag: ブログ
  text: Datadog を使用して Google Cloud Run サービスからトレース、ログ、およびカスタムメトリクスを収集する
- link: https://learn.datadoghq.com/courses/getting-started-gcp
  tag: ラーニングセンター
  text: Datadog を使用した Google Cloud のオブザーバビリティの始め方
title: Google Cloud の始め方
---
## 概要 {#overview}

このガイドを使用して、Google Cloud 環境の監視を開始してください。このアプローチにより、複数のプロジェクトを持つ Google Cloud 環境のセットアップが簡素化され、監視範囲を最大化できます。

## Google Cloud データが Datadog に到達する仕組み {#how-google-cloud-data-reaches-datadog}

{{% google-cloud-data-collection-paths %}}

## セットアップ {#setup}

### 前提条件 {#prerequisites}
1) [Datadog アカウント][1] を作成します
2) いずれかの Google Cloud プロジェクトで [サービスアカウント][2] を設定します
3) 以下の Google Cloud の前提条件を確認してください。

{{% site-region region="us,us3,us5,eu,ap1,ap2,uk1" %}}
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;● 組織でドメインによるアイデンティティを制限している場合、Datadog の顧客アイデンティティ `C0147pk0i` をポリシーで許可値として追加する必要があります。
{{% /site-region %}}
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;● Google Cloud インテグレーションでは、監視対象とする**各プロジェクト**で以下の API を有効にする必要があります。

<div class="alert alert-danger">監視対象のプロジェクトが、他の複数のプロジェクトからメトリクスを取り込む<a href="https://cloud.google.com/monitoring/settings#:~:text=A%20scoping%20project%20hosts%20a,is%20also%20a%20scoping%20project.">スコーピングプロジェクト</a>として構成されていないことを確認してください。</div>

[Cloud Monitoring API][3]
: Datadog が Google Cloud メトリクスデータをクエリできるようにします。

[Compute Engine API][4]
: Datadog がコンピュートインスタンスデータを検出できるようにします。

[Cloud Asset API][5]
: Datadog が Google Cloud リソースをリクエストし、対応するラベルをメトリクスのタグとして関連付けられるようにします。

[Cloud Resource Manager API][6]
: Datadog がメトリクスに正しいリソースとタグを追加できるようにします。

[IAM API][7]
: Datadog が Google Cloud で認証できるようにします。

[Cloud Billing API][8]
: 開発者が Google Cloud Platform プロジェクトの課金をプログラムで管理できるようにします。詳細については、[Cloud Cost Management (CCM)](#cloud-cost-management-ccm) セクションを参照してください。

<div class="alert alert-info"><a href="https://console.cloud.google.com/apis/dashboard">Enabled APIs & Services</a> に移動して、これらの API が有効になっているか確認できます。</div>

### メトリクスの収集 {#metric-collection}

{{% google-cloud-collection-scope %}}

<div class="alert alert-info">Google Cloud 組織で <a href="https://cloud.google.com/vpc-service-controls/docs/overview">VPC Service Controls</a> を使用している場合は、Datadog サービスアカウントが保護されたリソースにアクセスできるように明示的に許可する必要があります。これらのサービスアカウントがサービス境界内で許可されていない場合、メトリクス、リソース、およびメタデータの収集が失敗する可能性があります。サイトまたはリージョンのサービスアカウント識別子については、<a href="/help/">Datadog サポート</a>にお問い合わせください。</div>

{{< tabs >}}

{{% tab "組織レベル" %}}

組織レベルの監視は、組織内で今後作成される可能性のあるプロジェクトを含む、すべてのプロジェクトを包括的にカバーするために推奨されます。

**注**: Google Cloud でセットアップを完了するには、[Google Cloud Identity][408] ユーザーアカウントに目的のスコープで `Admin` ロールが割り当てられている必要があります (例: `Organization Admin`)。

{{% collapse-content title="1. デフォルトプロジェクトに Google Cloud サービスアカウントを作成します" level="h4" %}}
1. [Google Cloud コンソール][401] を開きます。
2. {{< ui >}}IAM & Admin{{< /ui >}} > {{< ui >}}Service Accounts{{< /ui >}} に移動します。
3. 上部の {{< ui >}}Create service account{{< /ui >}} をクリックします。
4. サービスアカウントに一意の名前を付けます。
5. {{< ui >}}Done{{< /ui >}} をクリックしてサービスアカウントの作成を完了します。

[401]: https://console.cloud.google.com/
{{% /collapse-content %}}

{{% collapse-content title="2. 組織またはフォルダレベルでサービスアカウントを追加します" level="h4" %}}
1. Google Cloud コンソールで、{{< ui >}}IAM{{< /ui >}} ページに移動します。
2. フォルダまたは組織を選択します。
3. リソースに対して他のロールをまだ持っていないプリンシパルにロールを付与するには、{{< ui >}}Grant Access{{< /ui >}} をクリックし、前に作成したサービスアカウントのメールアドレスを入力します。
4. サービスアカウントのメールアドレスを入力します。
5. 以下のロールを割り当てます。
   - [Compute Viewer][402]: Compute Engine リソースを取得および一覧表示するための**読み取り専用**アクセスを提供します。
   - [Monitoring Viewer][403]: Google Cloud 環境で利用可能な監視データへの**読み取り専用**アクセスを提供します。
   - [Cloud Asset Viewer][404]: クラウドアセットのメタデータへの**読み取り専用**アクセスを提供します。
   - [Browser][405]: プロジェクトの階層を参照するための**読み取り専用**アクセスを提供します。
   - [Service Usage Consumer][406] (**オプション**、マルチプロジェクト環境用): [プロジェクトごとのコストと API クォータの属性](#enable-per-project-cost-and-api-quota-attribution)を提供します。
6. {{< ui >}}Save{{< /ui >}} をクリックします。

**注**: `Browser` ロールは、サービスアカウントのデフォルトプロジェクトでのみ必要です。他のプロジェクトでは、リストされている他のロールのみが必要です。

[402]: https://cloud.google.com/compute/docs/access/iam#compute.viewer
[403]: https://cloud.google.com/monitoring/access-control#monitoring_roles
[404]: https://cloud.google.com/iam/docs/understanding-roles#cloudasset.viewer
[405]: https://cloud.google.com/resource-manager/docs/access-control-proj#browser
[406]: https://cloud.google.com/service-usage/docs/access-control#serviceusage.serviceUsageConsumer
{{% /collapse-content %}}

{{% collapse-content title="3. サービスアカウントに Datadog プリンシパルを追加する" level="h4" %}}
**注**: 以前に Datadog の共有プリンシパルを使用してアクセスを構成した場合は、これらの手順を完了した後、そのプリンシパルの権限を取り消すことができます。

1. Datadog で、{{< ui >}}Integrations{{< /ui >}} > [{{< ui >}}Google Cloud Platform{{< /ui >}}][407] の順に移動します。
2. {{< ui >}}Add Google Cloud Account{{< /ui >}} をクリックします。
プロジェクトが構成されていない場合は、このページへ自動的にリダイレクトされます。
3. Datadog プリンシパルをコピーして、次のセクションで使用するために保管しておきます。

{{< img src="integrations/google_cloud_platform/principal-2.png" alt="Datadog の Google Cloud インテグレーションタイルで新しい Google Cloud アカウントを追加するためのページ" style="width:70%;">}}

**注**: セクション 4 で使用するため、このウィンドウは開いたままにしてください。

4. [Google Cloud コンソール][409] の {{< ui >}}Service Accounts{{< /ui >}} メニューで、セクション 1 で作成したサービスアカウントを探します。
5. {{< ui >}}Permissions{{< /ui >}} タブに移動し、{{< ui >}}Grant Access{{< /ui >}} をクリックします。

{{< img src="integrations/google_cloud_platform/grant-access.png" alt="サービスアカウントの [Permissions] タブが表示されている Google Cloud コンソールのインターフェース。" style="width:70%;">}}

6. {{< ui >}}New principals{{< /ui >}} テキストボックスに Datadog プリンシパルを貼り付けます。
7. {{< ui >}}Service Account Token Creator{{< /ui >}} のロールを割り当てます。
8. {{< ui >}}Save{{< /ui >}} をクリックします。

[407]: https://app.datadoghq.com/integrations/google-cloud-platform
[409]: https://console.cloud.google.com/
{{% /collapse-content %}}

{{% collapse-content title="4. Datadog でインテグレーションの設定を完了する" level="h4" %}}
1. Google Cloud コンソールで、{{< ui >}}Service Account{{< /ui >}} > {{< ui >}}Details{{< /ui >}} タブに移動します。このページで、この Google サービスアカウントに関連付けられているメールアドレスを確認します。形式は `<SA_NAME>@<PROJECT_ID>.iam.gserviceaccount.com` です。
2. このメールをコピーします。
3. 前のセクションで Datadog プリンシパルをコピーした、Datadog のインテグレーション設定画面に戻ります。
4. {{< ui >}}Add Service Account Email{{< /ui >}} でコピーしたメールを貼り付けます。
5. {{< ui >}}Verify and Save Account{{< /ui >}} をクリックします。
{{% /collapse-content %}}

メトリクスは、セットアップ後約 **15 分** で Datadog に表示されます。

[408]: https://cloud.google.com/identity/docs/overview

{{% /tab %}}

{{% tab "プロジェクトレベルおよびフォルダレベル" %}}

{{% collapse-content title="クイックスタート (推奨)" level="h4" expanded=false id="quickstart-setup" %}}

### 前提条件 {#prerequisites-1}

クイックスタート方法を使用するには、Datadog ユーザーロールに API キーおよびアプリケーションキーを作成する権限が必要です。[Datadog 管理ロール][202] を使用している場合は、{{< ui >}}Datadog Admin role{{< /ui >}} が必要です。[カスタムロール][203] を使用している場合は、ロールに少なくとも `api_keys_write` および `user_app_keys` の権限が必要です。

### 次の場合はクイックスタートセットアップを選択してください... {#choose-quick-start-setup-if}

- Google Cloud インテグレーションを初めてセットアップする場合。
- UI ベースのワークフローを希望し、必要な監視権限を持つサービスアカウントの作成にかかる時間を最小限に抑えたい場合。
- スクリプトや CI/CD パイプラインでセットアップ手順を自動化したい。

### 手順 {#instructions}

1. [Google Cloud インテグレーションページ][200] で、{{< ui >}}+ Add GCP Account{{< /ui >}} を選択します。
2. {{< ui >}}Quick Start{{< /ui >}} をクリックします。
3. セットアップスクリプトセクションの {{< ui >}}Copy{{< /ui >}} をクリックします。<br>
   **注**: Datadog では、より高速に実行できる可能性があるため、[gcloud CLI][201] を使用してこのスクリプトをローカルで実行することを推奨しています。Google Cloud 認証情報をローカルで利用でき、マシンに gcloud CLI がインストールされている必要があります。
4. {{< ui >}}Open Google Cloud Shell{{< /ui >}} をクリックするか、[Google Cloud Shell][204] に移動します。
5. シェルプロンプトにスクリプトを貼り付けて実行します。
6. 監視対象のフォルダとプロジェクトを選択します。必要なアクセス権と権限を持つプロジェクトとフォルダのみが表示されます。
7. {{< ui >}}Provide Service Account Details{{< /ui >}}:
   1. サービスアカウントに名前を付けます。
   2. サービスアカウントを配置するプロジェクトを選択します。
8. {{< ui >}}Metric Collection{{< /ui >}} を構成します (オプション)。
   1. 予期される GCE インスタンスのシャットダウンおよびオートスケーリングイベントに対するモニターのサイレンシングオプションを無効にするかどうかを選択します。
   2. 作成したサービスアカウントに関連付けられたメトリクスにタグを適用するかどうかを選択します。
   3. Google Cloud Monitoring のコストを管理するために、特定の Google Cloud サービスのメトリクス収集を無効にするかどうかを選択します。
   4. メトリクス収集が有効になっている Google Cloud サービスに対して、詳細なメトリクスフィルタを適用するかどうかを選択します。
   5. Datadog のコストを管理するために、GCP リソースタイプ `Cloud Run Revision`、`VM Instance`、または `Cloud Function` のメトリクスをタグでフィルタリングするかどうかを選択します。
   **注**: `VM Instance` のフィルタリングは、関連する `gcp.logging.*` メトリクスには影響せず、それらのメトリクスの課金にも影響しません。
9. {{< ui >}}Resource Collection{{< /ui >}} を構成します (Google Cloud 環境内のリソースの属性および構成情報、オプション)。
10. 行う変更の概要が表示されます。確認すると、スクリプトは次の処理を行います。
    - 必要な API を有効にします。
    - 選択した各プロジェクトとフォルダの監視に必要な権限を割り当てます。
    - Datadog でインテグレーションの設定を完了します。

[200]: https://app.datadoghq.com/integrations/google-cloud-platform
[201]: https://cloud.google.com/sdk/docs/install
[202]: /ja/account_management/rbac/permissions/#managed-roles
[203]: /ja/account_management/rbac/permissions/#custom-roles
[204]: https://ssh.cloud.google.com/cloudshell
{{% /collapse-content %}}

{{% collapse-content title="Terraform" level="h4" expanded=false id="terraform-setup" %}}

### 次の場合は Terraform セットアップを選択してください... {#choose-terraform-setup-if}

- インフラストラクチャーをコードとして管理しており、Datadog Google Cloud インテグレーションをバージョン管理下に置きたい場合。
- 再利用可能な provider ブロックを使用して、複数のフォルダまたはプロジェクトを一貫して構成する必要がある場合。
- Terraform 管理環境に適した、繰り返し可能で監査可能なデプロイメントプロセスを確立したい場合。

### 手順 {#instructions-1}

1. [Google Cloud インテグレーションページ][500] で、{{< ui >}}+ Add GCP Account{{< /ui >}} を選択します。
2. {{< ui >}}Terraform{{< /ui >}} を選択します。
3. {{< ui >}}Provide GCP Resources{{< /ui >}} で、監視対象のプロジェクト ID とフォルダ ID を追加します。
4. 監視対象のフォルダとプロジェクトを選択します。
5. {{< ui >}}Provide Service Account Details{{< /ui >}}:
   1. サービスアカウントに名前を付けます。
   2. サービスアカウントを配置するプロジェクトを選択します。
6. {{< ui >}}Metric Collection{{< /ui >}} を構成します (オプション)。
   1. 予期される GCE インスタンスのシャットダウンおよびオートスケーリングイベントに対するモニターのサイレンシングオプションを無効にするかどうかを選択します。
   2. 作成したサービスアカウントに関連付けられたメトリクスにタグを適用するかどうかを選択します。
   3. Google Cloud Monitoring のコストを管理するために、特定の Google Cloud サービスのメトリクス収集を無効にするかどうかを選択します。
   4. メトリクス収集が有効になっている Google Cloud サービスに対して、詳細なメトリクスフィルタを適用するかどうかを選択します。
   5. Datadog のコストを管理するために、GCP リソースタイプ `Cloud Run Revision`、`VM Instance`、または `Cloud Function` のメトリクスをタグでフィルタリングするかどうかを選択します。
7. {{< ui >}}Resource Collection{{< /ui >}} を構成します (Google Cloud 環境内のリソースの属性および構成情報)。
8. 提供された {{< ui >}}Terraform Code{{< /ui >}} をコピーします。
9. コードを `.tf` ファイルに貼り付け、{{< ui >}}Initialize and apply the Terraform{{< /ui >}} コマンドを実行します。成功すると、コマンドは次の処理を行います。
   - 必要な API を有効にします。
   - 選択した各プロジェクトとフォルダの監視に必要な権限を割り当てます。
   - Datadog でインテグレーションの設定を完了します。

[500]: https://app.datadoghq.com/integrations/google-cloud-platform
{{% /collapse-content %}}

{{% collapse-content title="手動" level="h4" expanded=false id="manual-setup" %}}

### 次のような場合は、手動セットアップを選択してください… {#choose-manual-setup-if}

- 少数のプロジェクトやフォルダに対して手動でアクセスを設定する必要があります。
- GCP UI 内で権限と認証情報の割り当てをより詳細に制御したい場合です。

### 手順 {#instructions-2}

1. [Google Cloud インテグレーションページ][600] で、{{< ui >}}+ Add GCP Account{{< /ui >}} を選択します。
2. {{< ui >}}Manual{{< /ui >}} をクリックします。
3. {{< ui >}}Datadog Principal{{< /ui >}} の値をコピーし、{{< ui >}}Open the Google Console{{< /ui >}} をクリックします。
4. サービスアカウントを作成します。
   1. サービスアカウントにわかりやすい名前を付け、{{< ui >}}Create and continue{{< /ui >}} をクリックします。
   2. {{< ui >}}Permissions{{< /ui >}} で、ドロップダウンから {{< ui >}}Service Account Token Creator{{< /ui >}} ロールを検索して追加し、{{< ui >}}Continue{{< /ui >}} をクリックします。
   3. {{< ui >}}Principals with access{{< /ui >}} で、{{< ui >}}Datadog Principal{{< /ui >}} の値を {{< ui >}}Service account users role{{< /ui >}} フィールドに貼り付け、{{< ui >}}Done{{< /ui >}} をクリックします。
5. {{< ui >}}Email{{< /ui >}} 列の下にあるサービスアカウントのリンクをクリックします。
6. {{< ui >}}Email{{< /ui >}} の値をコピーします。
7. Datadog で、サービスアカウントのメールアドレスを {{< ui >}}Add Service Account Email{{< /ui >}} セクションに貼り付けます。
8. {{< ui >}}Metric Collection{{< /ui >}} を構成します (オプション)。
   1. 予期される GCE インスタンスのシャットダウンおよびオートスケーリングイベントに対するモニターのサイレンシングオプションを無効にするかどうかを選択します。
   2. 作成したサービスアカウントに関連付けられたメトリクスにタグを適用するかどうかを選択します。
   3. Google Cloud Monitoring のコストを管理するために、特定の Google Cloud サービスのメトリクス収集を無効にするかどうかを選択します。
   4. メトリクス収集が有効になっている Google Cloud サービスに対して、詳細なメトリクスフィルタを適用するかどうかを選択します。
   5. Datadog のコストを管理するために、GCP リソースタイプ `Cloud Run Revision`、`VM Instance`、または `Cloud Function` のメトリクスをタグでフィルタリングするかどうかを選択します。
9. {{< ui >}}Resource Collection{{< /ui >}} を構成します (Google Cloud 環境内のリソースの属性および構成情報、オプション)。
10. {{< ui >}}Verify and Save Account{{< /ui >}} をクリックします。

[600]: https://app.datadoghq.com/integrations/google-cloud-platform
{{% /collapse-content %}}

{{% /tab %}}

{{< /tabs >}}

#### 検証 {#validation}

メトリクスを確認するには、左側のメニューから {{< ui >}}Metrics{{< /ui >}} > {{< ui >}}Summary{{< /ui >}} に移動し、`gcp` で検索します。

{{< img src="integrations/google_cloud_platform/gcp_metric_summary.png" alt="GCP で始まるメトリクスでフィルタリングされた Datadog のメトリクスサマリーページ" style="width:100%;" >}}

### Google Cloud インテグレーション {#google-cloud-integrations}

Google Cloud インテグレーションは、Google Cloud Monitoring API を通じて、プロジェクトから利用可能なすべての [Google Cloud メトリクス][12] を収集します。インテグレーションは、BigQuery など、Google Cloud アカウントから取り込まれるデータを Datadog が認識すると自動的にインストールされます。

{{% collapse-content title="Datadog がメトリクスを収集する Google Cloud インテグレーションを参照してください" level="h4" %}}
{{% google-cloud-integrations %}}
{{% /collapse-content %}}

多くの主要サービスをモニタリングする際の詳細を知りたい場合は、以下のブログを参照してください。

{{% collapse-content title="インテグレーションのブログ" level="h4" %}}
[Cloud Armor][20]
: Google Cloud Armor は、DDoS 攻撃やアプリケーション攻撃から保護するネットワークセキュリティサービスです。

[BigQuery][21]
: BigQuery はサーバーレスかつマルチクラウド対応のデータウェアハウスで、ビジネスデータから有益なインサイトを得ることができます。

[Cloud Run][22]
: Cloud Run はフルマネージドプラットフォームで、Google Cloud 上のスケーラブルなインフラストラクチャーで直接コードを実行できます。

[Cloud SQL][23]
: Cloud SQL はフルマネージドのリレーショナルデータベースサービスで、MySQL、PostgreSQL、SQL Server に対応しています。

[Compute Engine][24]
: Compute Engine はコンピューティングおよびホスティングサービスで、Google Cloud 上で仮想マシンを作成・実行できます。

[Dataflow][25]
: Dataflow はオートスケーリングとリアルタイムのデータ処理を使用する、フルマネージドのストリーミング分析サービスです。

[Eventarc][26]
: Eventarc はフルマネージドサービスで、イベントドリブンアーキテクチャを構築できます。

[Google Kubernetes Engine (GKE)][27]
: GKE はフルマネージドの Kubernetes サービスです。

[Private Service Connect][28]
: Private Service Connect を利用すると、VPC ネットワーク内からマネージド Google サービスにプライベートにアクセスできます。

[Security Command Center][29]
: Security Command Center は、コード、ID、データのポスチャ管理と脅威検出を提供します。

[Vertex AI][30]
: Vertex AI は、フルマネージドの生成 AI 開発プラットフォームです。
{{% /collapse-content %}}

### メトリクス収集フィルターの制限 {#limit-metric-collection-filters}

メトリクスを収集するサービスやリソースを選択できます。これにより、ユーザーに代わって行われる API 呼び出しの数を減らし、コストを抑えることができます。

{{% collapse-content title="Google Cloud サービス別、および詳細なメトリクスフィルター別にメトリクス収集を制限します。" level="h4" %}}

Datadog の [Google Cloud インテグレーションページ][11] の {{< ui >}}Metric Collection{{< /ui >}} タブで、除外するメトリクス名前空間の選択を解除します。

有効なサービスに詳細なメトリクスフィルタリングを適用するには、該当するサービスをクリックし、`Add filters for gcp.<service>` フィールドでフィルターを適用します。

{{< img src="integrations/google_cloud_platform/limit_metric_collection_2025-11-11.png" alt="Datadog Google Cloud インテグレーションページのメトリクス収集タブ。AI Platform サービスを展開して、Add filters for gcp.ml フィールドを表示した状態" style="width:80%;">}}

**フィルターの例**:

`subscription.*` `topic.*`
: メトリクス収集を、`gcp.<service>.subscription.*` **または** `gcp.<service>.topic.*` に**一致する**メトリクスに制限します。

`!*_cost` `!*_count`
: メトリクス収集を、`gcp.<service>.*_cost` と `gcp.<service>.*_count` の**どちらにも****一致しない**メトリクスに制限します。

`snapshot.*` `!*_by_region`
: メトリクス収集を、`gcp.<service>.snapshot.*` には**一致し**、`gcp.<service>.*_by_region` には**一致しない**メトリクスに制限します。

{{% /collapse-content %}}

{{% collapse-content title="Google Cloud リージョンおよびグローバルリソース別にメトリクス収集を制限します。" level="h4" %}}

Datadog の [Google Cloud インテグレーションページ][11] の {{< ui >}}Metric Collection{{< /ui >}} タブで、メトリクス収集から除外するリージョンの選択を解除します。

リージョンまたは場所の値がチェックボックスに表示されない場合は、{{< ui >}}Additional Locations{{< /ui >}} フィールドに追加します。このフィルターは、Google Cloud によって報告されたラベル値と完全一致するため、リソースに表示されているとおりに値を入力します (例: `us-central`)。

リージョンに関連付けられていないグローバルメトリクスを無効にすることもできます。

{{< img src="integrations/google_cloud_platform/metric_region_filtering.png" alt="Datadog Google Cloud インテグレーションページのメトリクス収集タブ。Enable Global Metrics オプションが強調表示され、リージョンの一部が選択された状態Additional Locations オプションも強調表示され、マルチリージョンフィルターが定義された状態" style="width:80%;">}}

{{% /collapse-content %}}

{{% collapse-content title="ホストまたは Cloud Run インスタンス別にメトリクス収集を制限します" level="h4" %}}
1. Datadog で監視するホストまたは Cloud Run インスタンスにタグ (`datadog:true` など) を割り当てます。
2. Datadog の [Google Cloud インテグレーションページ][11] の {{< ui >}}Metric Collection{{< /ui >}} タブで、{{< ui >}}Limit Metric Collection Filters{{< /ui >}} テキストボックスにタグを入力します。定義したタグのいずれかに一致するホストのみが Datadog にインポートされます。ワイルドカード (`?` は 1 文字、`*` は複数文字) を使用して複数のホストに一致させたり、`!` を使用して特定のホストを除外したりできます。この例では、`c1*` サイズのインスタンスをすべて含め、ステージングホストを除外します。

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

詳細については、[ラベルの作成と管理][44] に関する Google のドキュメントを参照してください。
{{% /collapse-content %}}

以下の例では、ラベル `datadog:true` を持つ Google Cloud ホストのみが Datadog によって監視されます。

{{< img src="integrations/google_cloud_platform/limit_metric_collection.png" alt="Google Cloud インテグレーションタイルでメトリクス収集を制限するためのフィールド" style="width:100%;" >}}

#### プロジェクト単位のコストと API クォータ使用量の帰属を有効にする {#enable-per-project-cost-and-api-quota-attribution}

デフォルトでは、Google Cloud はモニタリング API 呼び出しのコストと API クォータ使用量を、このインテグレーションのサービスアカウントを含むプロジェクトに帰属させます。複数のプロジェクトを持つ Google Cloud 環境では、ベストプラクティスとして、モニタリング API 呼び出しのコストと API クォータ使用量のプロジェクト単位の帰属を有効にします。これを有効にすると、コストとクォータ使用量は、サービスアカウントを含むプロジェクトではなく、*クエリ対象*のプロジェクトに帰属します。これにより、各プロジェクトで発生するモニタリングコストを確認できるほか、API レート制限への到達を防ぐのにも役立ちます。

この機能を有効にするには、
1. Datadog サービスアカウントが、目的のスコープ (フォルダまたは組織) で [Service Usage Consumer][410] ロールを持っていることを確認します。
2. [Google Cloud インテグレーションページ][411] の {{< ui >}}Enable Per Project Quota{{< /ui >}} タブで、{{< ui >}}Projects{{< /ui >}} トグルをクリックします。

[410]: https://cloud.google.com/service-usage/docs/access-control#serviceusage.serviceUsageConsumer
[411]: https://app.datadoghq.com/integrations/google-cloud-platform/

## ログ収集{#log-collection}

Google Cloud 環境からログを転送することで、組織やフォルダ内で発生しているリソースやアクティビティをほぼリアルタイムで監視できるようになります。[ログモニター][37] を設定して問題の通知を受け取ったり、[Cloud SIEM][38] を使用して脅威を検出したり、[Watchdog][39] を活用して未知の問題や異常な動作を特定したりできます。

[Datadog Dataflow テンプレート][14] を使用して、[Google Cloud Dataflow][15] を介して Datadog にログイベントを転送する前に、ログイベントをバッチ処理して圧縮します。これが、ログを転送する最もネットワーク効率の高い方法です。転送するログを指定するには、Google Cloud の [Logging クエリ言語][56] を使用して、包含または除外クエリを含む [Google Cloud Logging シンク][40] を構成します。ログ転送のセットアップオプション (Terraform を含む) と手順については、[Google Cloud Log Forwarding Setup ページ][67] を参照してください。

<div class="alert alert-danger">Google Cloud Dataflow を使用するには、<b>Dataflow API</b> を有効にする必要があります。詳細については、Google Cloud ドキュメントの <a href="https://cloud.google.com/apis/docs/getting-started#enabling_apis"><b>API の有効化</b></a>を参照してください。</div>

## Datadog Agent の活用 {#leveraging-the-datadog-agent}

Google Cloud インテグレーションを構成すると、Datadog は自動的に Google Cloud メトリクスの収集を開始します。ただし、Datadog Agent を使用して、インフラストラクチャーに関するより詳細なインサイトを収集することもできます。

[Datadog Agent][31] は、インフラストラクチャーから [最も高粒度で低遅延なメトリクス][32] を提供し、Google Cloud ホストの CPU、メモリ、ディスク使用量などをリアルタイムで把握できます。
Datadog Agent は [GKE][33] を含むあらゆるホストにインストールできます。

Agent は幅広い [インテグレーション][34] をサポートしており、ホスト上で稼働する特定のサービスやデータベースの可視性を拡張できます。

Agent を通じて収集された [トレース][35] は包括的なアプリケーションパフォーマンス監視 (APM) を可能にし、サービスのエンドツーエンドのパフォーマンスを把握できます。

Agent を通じて収集された [ログ][57] は、Google Cloud リソースおよび環境内で行われているアクティビティを可視化します。

クラウドインスタンスに Agent をインストールする利点については、[クラウドインスタンスに Datadog Agent をインストールした方がよいのはなぜですか][36] を参照してください。

## リソース変更の収集 {#resource-changes-collection}

リソース変更の収集により、Google Cloud 環境内のインフラストラクチャーの変更を監視できます。Google の Cloud Asset Inventory がクラウドリソースの変更を検出すると、イベントが Cloud Pub/Sub トピックとサブスクリプションを通じて Datadog の [Event Management][62] に転送されます。これらのイベントを使用して、インフラストラクチャー内のリスクの高い変更について事前に通知を受けたり、トラブルシューティングに役立てたりできます。

詳細なセットアップ手順については、Google Cloud インテグレーションドキュメントの [resource changes collection セクション][18] を参照してください。

## 関連サービス{#explore-related-services}

### Private Service Connect {#private-service-connect}

<div class="alert alert-info">Private Service Connect は US5 と EU の Datadog サイトでのみ使用できます。</div>

[Google Cloud Private Service Connect integration][58] を使用して、Private Service Connect を介した接続、転送データ、ドロップされたパケットを可視化します。これにより、プロデューサーとコンシューマーの両方について、Private Service Connect 接続からの重要なメトリクスを可視化できます。
[Private Service Connect (PSC)][59] は、[Google Cloud サービス][60]、[サードパーティのパートナーサービス][61]、および自社所有のアプリケーションに Virtual Private Cloud (VPC) から直接アクセスできるようにする Google Cloud ネットワーキング製品です。

詳細については、Datadog ブログの [Datadog にプライベートにアクセスし、Google Cloud Private Service Connect の使用状況をモニタリングする][28] を参照してください。

### Google Cloud Run {#google-cloud-run}

[Google Cloud Run インテグレーション][42] を使用すると、Cloud Run コンテナに関する詳細情報 (メトリクスや監査ログなど) を取得できます。

### Cloud Cost Management (CCM) {#cloud-cost-management-ccm}

Datadog の [Google Cloud Cost Management][45] は、インフラストラクチャー変更がコストに与える影響を把握したり、組織全体の支出を割り当てたり、改善点を見つけたりするためのインサイトをエンジニアリングチームと財務チームに提供します。

### Cloud SIEM {#cloud-siem}

Cloud SIEM は、運用ログやセキュリティログをリアルタイムで分析し、標準搭載のインテグレーションやルールを使用して脅威を検出・調査できます。
この機能を使用するには、[Cloud SIEM の概要][46] を参照してください。

[Google Cloud Security Command Center][47] から Cloud SIEM にセキュリティファインディングを取り込むには、{{< ui >}}Security Findings{{< /ui >}} タブで {{< ui >}}Enable collection of security findings{{< /ui >}} オプションをオンにし、[Google Cloud Security Command Center ガイド][48] に記載されている設定手順に従います。

{{< img src="integrations/google_cloud_platform/security_findings.png" alt="Google Cloud インテグレーションタイルのセキュリティファインディングタブ" style="width:90%;" >}}

### Cloud Security {#cloud-security}

Datadog Cloud Security は、クラウドインフラストラクチャー全体にわたるリアルタイムの脅威検出と継続的な構成監査を提供します。
開始するには、[Cloud Security の設定ガイド][49] を参照してください。

Cloud Security を設定した後、{{< ui >}}Resource Collection{{< /ui >}} タブで {{< ui >}}Enable Resource Collection{{< /ui >}} オプションをオンにすると、[Resource Catalog][50] と Cloud Security 用の構成データの収集が開始されます。次に、以下の手順に従って、Google Cloud で [Misconfigurations and Identity Risks (CIEM)][51] を有効にします。

{{< img src="integrations/google_cloud_platform/resource_collection.png" alt="Google Cloud インテグレーションタイルのリソース収集タブ" style="width:100%;" >}}

### Expanded BigQuery monitoring {#expanded-bigquery-monitoring}

Expanded BigQuery monitoring を使用すると、BigQuery 環境を詳細に可視化できます。詳細については、[BigQuery Data Observability][68] のドキュメントを参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/
[2]: https://cloud.google.com/iam/docs/service-accounts-create
[3]: https://console.cloud.google.com/apis/library/monitoring.googleapis.com
[4]: https://console.cloud.google.com/apis/library/compute.googleapis.com
[5]: https://console.cloud.google.com/apis/library/cloudasset.googleapis.com
[6]: https://console.cloud.google.com/apis/library/cloudresourcemanager.googleapis.com
[7]: https://console.cloud.google.com/apis/library/iam.googleapis.com
[8]: https://console.cloud.google.com/apis/library/cloudbilling.googleapis.com
[10]: https://console.cloud.google.com/
[11]: https://app.datadoghq.com/integrations/google-cloud-platform
[12]: https://cloud.google.com/monitoring/api/metrics_gcp
[13]: https://cloud.google.com/compute/docs/labeling-resources
[14]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog
[15]: https://cloud.google.com/dataflow
[18]: /ja/integrations/google_cloud_platform/#resource-changes-collection
[19]: /ja/help/
[20]: https://www.datadoghq.com/blog/network-attacks-google-cloud-armor/
[21]: https://www.datadoghq.com/blog/track-bigquery-costs-performance/
[22]: https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/
[23]: https://www.datadoghq.com/blog/monitor-google-cloud-sql/
[24]: https://www.datadoghq.com/blog/monitor-google-compute-engine-with-datadog/
[25]: https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/
[26]: https://www.datadoghq.com/blog/incident-response-eventarc-datadog/
[27]: https://www.datadoghq.com/blog/monitor-google-kubernetes-engine/
[28]: https://www.datadoghq.com/blog/google-cloud-private-service-connect/
[29]: https://www.datadoghq.com/blog/datadog-google-security-command-center/
[30]: https://www.datadoghq.com/blog/google-cloud-vertex-ai-monitoring-datadog/
[31]: /ja/agent/
[32]: /ja/extend/guide/data-collection-resolution-retention/#pagetitle:~:text=n/a-,Infrastructure,-Agent%20integrations
[33]: /ja/integrations/gke/?tab=standard
[34]: /ja/integrations/
[35]: /ja/tracing/
[36]: /ja/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
[37]: /ja/monitors/types/log/
[38]: /ja/security/cloud_siem/
[39]: /ja/watchdog/
[40]: https://cloud.google.com/logging/docs/routing/overview#sinks
[41]: /ja/integrations/google_cloud_platform/#setup
[42]: /ja/integrations/google_cloud_run/
[43]: /ja/integrations/google_cloud_run/#log-collection
[44]: /ja/cloud_cost_management/
[45]: /ja/cloud_cost_management/setup/google_cloud/
[46]: /ja/getting_started/cloud_siem/
[47]: https://console.cloud.google.com/projectselector2/security/command-center/overview?supportedpurview=organizationId,folder,project
[48]: /ja/integrations/google_cloud_security_command_center/#installation
[49]: /ja/security/cloud_security_management/setup/
[50]: /ja/infrastructure/resource_catalog/
[51]: /ja/security/cloud_security_management/setup/cloud_integrations/?tab=googlecloud
[52]: https://cloud.google.com/compute/docs/access/iam#compute.viewer
[53]: https://cloud.google.com/monitoring/access-control#monitoring_roles
[54]: https://cloud.google.com/iam/docs/understanding-roles#cloudasset.viewer
[55]: https://cloud.google.com/resource-manager/docs/access-control-proj#browser
[56]: https://cloud.google.com/logging/docs/view/logging-query-language
[57]: /ja/logs/
[58]: /ja/integrations/google_cloud_private_service_connect/
[59]: https://cloud.google.com/vpc/docs/private-service-connect
[60]: https://cloud.google.com/vpc/docs/private-service-connect-compatibility#google-services
[61]: https://cloud.google.com/vpc/docs/private-service-connect-compatibility#third-party-services
[62]: https://app.datadoghq.com/event/overview
[63]: https://cloud.google.com/service-usage/docs/access-control#serviceusage.serviceUsageConsumer
[66]: https://cloud.google.com/identity/docs/overview
[67]: https://docs.datadoghq.com/ja/logs/guide/google-cloud-log-forwarding
[68]: https://docs.datadoghq.com/ja/data_observability/quality_monitoring/data_warehouses/bigquery/