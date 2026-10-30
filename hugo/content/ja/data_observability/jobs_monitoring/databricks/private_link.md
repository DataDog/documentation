---
description: 'プライベートアクションランナーを使用して、プライベートリンク接続でデプロイされた Databricks ワークスペースの Data Observability:
  Jobs Monitoring をセットアップします。'
further_reading:
- link: /data_observability/jobs_monitoring/databricks
  tag: ドキュメント
  text: 'Databricks の Data Observability: Jobs Monitoring'
- link: /actions/private_actions
  tag: ドキュメント
  text: プライベートアクションランナー
title: プライベートリンク接続
---
<div class="alert alert-info">プライベートリンク接続を介した Databricks の監視はプレビュー版です。</div>

[プライベートリンク接続][1]を使用してデプロイされた Databricks ワークスペースはパブリックインターネットから隔離されているため、Datadog が Databricks API に直接アクセスすることはできません。これらのワークスペースを監視するには、環境内で[プライベートアクションランナー][2] (PAR) をデプロイします。ランナーは Datadog にリクエストをポーリングし、Databricks API に対してローカルで実行し、既存の [Datadog VPC エンドポイント][3]を通じて結果を返送します。

## アーキテクチャ {#architecture}

プライベートリンクの監視は、プライベートアクションランナーの[ポーリングアーキテクチャ][4]に基づいて構築されています。Datadog は、Databricks API をクエリするための[スクリプト][5]を含む、プライベートアクションランナーイメージのカスタムバージョンを提供しています。

{{< img src="data_jobs/databricks/privatelink-architecture-2.png" alt="プライベートアクションランナーが Datadog にリクエストをポーリングし、Databricks API に対して実行し、VPC エンドポイント経由で結果を返す様子を示すアーキテクチャ図。" style="width:100%;" >}}

リクエストフローは次のように機能します。

1. [プライベートアクションランナー][2]が Datadog バックエンドに接続し (パブリックインターネット経由、または[プライベートリンク][3]を使用)、保留中のリクエストをクエリします。リクエストが見つかった場合、詳細がランナーに返されます。
1. Databricks の資格情報 (クライアント ID とシークレット) がシークレットストレージから取得されます。その資格情報を使用してランナーから Databricks API を呼び出すことで、セッション用のトークンが生成されます。
1. ランナーは、取得したクエリを Databricks API に対して実行します。結果がランナーに返されます。
1. ランナーは、処理のために結果を Datadog バックエンドに転送します。

Datadog へのすべての認証は、基盤となるプライベートアクションランナーによって処理されます。インストール時にランナー上でローカルに構成された許可リストが設定され、実行可能なアクションが必要なものだけに制限されます。Datadog 内でアクセス制御を構成して、どのユーザーやチームがランナーを使用できるかを管理することもできます。詳細については、[プライベートアクションランナーへのアクセスを管理する][16]を参照してください。

## インストール {#installation}

### ステップ 1: Datadog の前提条件 {#step-1-datadog-prerequisites}

1. 以下の中からいずれか **1 つ**の方法を使用して、VPC 内から Datadog API エンドポイントへの接続を確立します。
   - パブリックインターネットへのエグレス (NAT ゲートウェイなどを経由)
   - プライベートリンク VPC エンドポイントまたはサービスを介した Datadog へのエグレス:
     - **AWS**: [VPC エンドポイントのセットアップ][3] (US1、AP1、および AP2 で利用可能)
     - **Azure**: [プライベートリンクサービスのセットアップ][6] (US3 のみで利用可能)。これには、Datadog Azure アカウントでの承認が必要です。手順に記載されているとおり、Datadog サポートにお問い合わせください。
     - **GCP**: [プライベートサービス接続エンドポイントのセットアップ][7] (US5 および EU1 で利用可能)
1. Datadog サービスアカウントを作成します。
   1. [サービスアカウント][8]ページに移動します。
   1. **新しいサービスアカウント**をクリックします。
   1. サービスアカウントの名前とメールアドレスを入力します。
   1. **ロールの割り当て**で、**Datadog 標準ロール**を選択します。または、`Connections Resolve` 権限を持つカスタムロールを選択します。
   1. **サービスアカウントを作成する**をクリックします。
1. Datadog アカウントで [Remote Configuration][17] が有効になっていることを確認します。

### ステップ 2: Databricks の前提条件 {#step-2-databricks-prerequisites}

{{< tabs >}}

{{% tab "Databricks マネージドサービスプリンシパル" %}}

1. Databricks サービスプリンシパルを作成します ([Databricks ドキュメント][9])。
   1. ワークスペース管理者として、Databricks ワークスペースにログインします。
   1. 上部のバーのユーザー名をクリックし、**設定**を選択します。
   1. **ID とアクセス**タブをクリックします。
   1. **サービスプリンシパル**の横にある**管理**をクリックします。
   1. **サービスプリンシパルを追加**をクリックし、**新しく追加**をクリックして名前を入力します。
      - または、別のワークスペースのサービスプリンシパルを再利用する場合は、既存のサービスプリンシパルを選択して次のステップをスキップします。
   1. **追加**をクリックします。
1. Databricks サービスプリンシパルのシークレットを生成します ([Databricks ドキュメント][10])。
   1. 上記で作成したサービスプリンシパルを選択します。
   1. **シークレット**タブをクリックし、**シークレットを生成する**をクリックします。
   1. シークレットの有効期間を日単位で設定します (最大 730 日)。
   1. **生成**をクリックします。
   1. 以下の中からいずれか **1 つ**の方法を使用して、Databricks の資格情報をランナーで利用できるようにします。
      - **クラウドシークレットストレージ** (AWS Secrets Manager、AWS Parameter Store、Azure Key Vault、または Google Cloud Secret Manager): 資格情報を JSON ブロブとして保存します。
        ```json
        {"client_id": "<CLIENT_ID>", "client_secret": "<CLIENT_SECRET>"}
        ```
        Make note of the secret path (AWS ARN, AKV URL, or Google Cloud resource name). You enter this in the integration tile or set it as the `DATABRICKS_SECRET_PATH` environment variable on the runner container or pod.
      - **Environment variables**: Set `DATABRICKS_CLIENT_ID` and `DATABRICKS_CLIENT_SECRET` directly on the runner container or pod. When using this method, leave the **Secret Path** field blank in the integration tile.
1. サービスプリンシパルのワークスペースへのアクセスとエンタイトルメントをプロビジョニングします。詳細については、[権限][11]を参照してください。
   1. サービスプリンシパルに**ワークスペース管理者**権限を付与します。これにより、Datadog は init スクリプトのインストールと更新を自動的に管理できるようになります。または、ジョブ、クラスター、クエリを監視するためのより[詳細な権限][11]を割り当てます。
      1. **ID とアクセス**タブをクリックします。
      1. **グループ**の横にある**管理**をクリックします。
      1. **管理者**グループを選択します。
      1. **メンバーを追加**をクリックし、上記で追加したサービスプリンシパルを選択します。
      1. **追加**をクリックします。
   1. Databricks のコストデータにアクセスしたり、サーバーレスジョブを監視したりするには、SQL ウェアハウスでサービスプリンシパルに `CAN USE` を付与し、Unity Catalog で[システムテーブル][20]への読み取りアクセス権を付与します。詳細については、[権限][11]を参照してください。
   1. サーバーレスジョブを監視したり、SQL ウェアハウスおよびクエリモニタリングを使用したりするには、サービスプリンシパルを `databricks_pii_access` アカウントレベルのグループに追加します。Databricks は、このグループ以外のプリンシパルに対して SQL クエリテキストをマスキングします。詳細については、[クエリテキストへのアクセス][21]を参照してください。

[9]: https://docs.databricks.com/aws/en/admin/users-groups/manage-service-principals?language=Workspace%C2%A0admin%C2%A0settings#-add-service-principals-to-your-account
[10]: https://docs.databricks.com/aws/en/dev-tools/auth/oauth-m2m#-step-1-create-an-oauth-secret
[11]: /ja/data_observability/jobs_monitoring/databricks/#permissions
[20]: https://docs.databricks.com/aws/en/admin/system-tables/
[21]: /ja/data_observability/jobs_monitoring/databricks/#query-text-access

{{% /tab %}}

{{% tab "Microsoft Entra ID マネージドサービスプリンシパル" %}}

1. サービスプリンシパルの Microsoft Entra ID アプリケーションを登録します ([Microsoft Entra ドキュメント][22])。
   1. [Microsoft Entra 管理センター][23]に、クラウドアプリケーション管理者以上の権限でサインインします。
   1. **Entra ID > アプリの登録**に移動し、**新規登録**をクリックします。
   1. 名前を入力し、**登録**をクリックします。
   1. アプリケーションの**概要**ページで、**アプリケーション (クライアント) ID** と**ディレクトリ (テナント) ID**をメモします。
1. アプリケーションのクライアントシークレットを生成します ([Microsoft Entra ドキュメント][22])。
   1. アプリケーションのページで、**証明書とシークレット**をクリックします。
   1. **クライアントシークレット**タブをクリックし、**新しいクライアントシークレット**をクリックします。
   1. 説明と有効期間を入力し、**追加**をクリックします。
   1. 生成されたシークレットの値をコピーします。これは 1 度だけ表示されます。
   1. 以下の中からいずれか **1 つ**の方法を使用して、Databricks の資格情報をランナーで利用できるようにします。
      - **クラウドシークレットストレージ** (AWS Secrets Manager、AWS Parameter Store、または Azure Key Vault): 資格情報を JSON ブロブとして保存します。
        ```json
        {"client_id": "<CLIENT_ID>", "client_secret": "<CLIENT_SECRET>", "tenant_id": "<TENANT_ID>"}
        ```
        Make note of the secret path (AWS ARN or AKV URL). You enter this in the integration tile or set it as the `DATABRICKS_SECRET_PATH` environment variable on the runner container or pod.
      - **Environment variables**: Set `DATABRICKS_CLIENT_ID`, `DATABRICKS_CLIENT_SECRET`, and `DATABRICKS_AZURE_TENANT_ID` directly on the runner container or pod. When using this method, leave the **Secret Path** field blank in the integration tile.
1. アプリケーションを Microsoft Entra ID マネージドサービスプリンシパルとして Databricks に追加します ([Databricks ドキュメント][24])。
   1. ワークスペース管理者として、Databricks ワークスペースにログインします。
   1. 上部のバーのユーザー名をクリックし、**設定**を選択します。
   1. **ID とアクセス**タブをクリックします。
   1. **サービスプリンシパル**の横にある**管理**をクリックします。
   1. **サービスプリンシパルを追加**をクリックし、**新しく追加**をクリックします。
   1. **Microsoft Entra ID マネージド**を選択し、前述の**アプリケーション (クライアント) ID** を貼り付けます。
   1. 名前を入力し、**追加**をクリックします。
1. サービスプリンシパルのワークスペースへのアクセスとエンタイトルメントをプロビジョニングします。詳細については、[権限][11]を参照してください。
   1. サービスプリンシパルに**ワークスペース管理者**権限を付与します。これにより、Datadog は init スクリプトのインストールと更新を自動的に管理できるようになります。または、ジョブ、クラスター、クエリを監視するためのより[詳細な権限][11]を割り当てます。
      1. **ID とアクセス**タブをクリックします。
      1. **グループ**の横にある**管理**をクリックします。
      1. **管理者**グループを選択します。
      1. **メンバーを追加**をクリックし、上記で追加したサービスプリンシパルを選択します。
      1. **追加**をクリックします。
   1. Databricks のコストデータにアクセスしたり、サーバーレスジョブを監視したりするには、SQL ウェアハウスでサービスプリンシパルに `CAN USE` を付与し、Unity Catalog で[システムテーブル][20]への読み取りアクセス権を付与します。詳細については、[権限][11]を参照してください。
   1. サーバーレスジョブを監視したり、SQL ウェアハウスおよびクエリモニタリングを使用したりするには、サービスプリンシパルを `databricks_pii_access` アカウントレベルのグループに追加します。Databricks は、このグループ以外のプリンシパルに対して SQL クエリテキストをマスキングします。詳細については、[クエリテキストへのアクセス][21]を参照してください。

[11]: /ja/data_observability/jobs_monitoring/databricks/#permissions
[20]: https://docs.databricks.com/aws/en/admin/system-tables/
[21]: /ja/data_observability/jobs_monitoring/databricks/#query-text-access
[22]: https://learn.microsoft.com/en-us/entra/identity-platform/howto-create-service-principal-portal
[23]: https://entra.microsoft.com
[24]: https://learn.microsoft.com/en-us/azure/databricks/admin/users-groups/manage-service-principals#add-service-principals-to-your-account

{{% /tab %}}

{{< /tabs >}}

### ステップ 3: プライベートアクションランナーをセットアップする {#step-3-set-up-the-private-action-runner}

以下の中からいずれか **1 つ**のオプションを使用して、プライベートアクションランナーをセットアップします。

{{< tabs >}}

{{% tab "Helm (Kubernetes)" %}}

1. Kubernetes クラスターにプライベートアクションランナーをインストールします ([追加ドキュメント][1]、[Helm チャート][2])。
   1. [プライベートアクションランナーのセットアップ][3]ページに移動します。
   1. **スクリプト**オプションを選択し、**次へ**をクリックします。
   1. **Kubernetes** の手順に従います。
   1. プライベートアクションランナーの下部に「インストールに成功」と表示されるはずです。
1. 既存の `values.yaml` を更新します ([Helm チャートの値][4]を参照)。
   1. `image.repository` を `gcr.io/datadoghq/dd-data-observability-par` に設定します。
   1. `image.tag` を `1.21.0-3` に設定します。
1. 以下の中からいずれか 1 つの方法を使用して、プライベートアクションランナーで資格情報を構成します。
    - `DATABRICKS_CLIENT_ID` および `DATABRICKS_CLIENT_SECRET` 環境変数をランナーに直接設定します。Microsoft Entra ID マネージドサービスプリンシパルを使用する場合は、`DATABRICKS_AZURE_TENANT_ID` も設定します。インテグレーションタイルの「シークレットパス」は空白のままにします。
    - クラウドシークレットストレージを使用します。[ステップ 2](#step-2-databrick-prerequisites) で作成されたシークレットの読み取り権限を持つ ID が Pod に割り当てられていることを確認し ([Azure Workload Identity][5]、[AWS IAM Role][6]、または [GKE Workload Identity][7])、`DATABRICKS_SECRET_PATH` 環境変数を介して、またはインテグレーションタイルの「シークレットパス」フィールドに指定して、シークレットへのパスを提供します。
1. これらの変更を有効にするには、デプロイメントを再起動します。

[1]: https://docs.datadoghq.com/ja/actions/private_actions/set_up_standalone/?tab=kuberneteshelm#install-the-runner
[2]: https://github.com/DataDog/helm-charts/tree/main/charts/private-action-runner
[3]: https://app.datadoghq.com/actions/private-action-runners/new
[4]: https://github.com/DataDog/helm-charts/blob/main/charts/private-action-runner/values.yaml
[5]: https://learn.microsoft.com/en-us/azure/aks/workload-identity-deploy-cluster?tabs=new-cluster
[6]: https://docs.aws.amazon.com/eks/latest/userguide/pod-id-association.html
[7]: https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity

{{% /tab %}}

{{% tab "Docker (VM/EC2)" %}}

1. Docker を使用してプライベートアクションランナーをインストールします ([追加ドキュメント][1]):
   1. [Private Action Runner のセットアップ][2]ページに移動します。
   1. **スクリプト**オプションを選択し、**次へ**をクリックします。
   1. **Docker** の手順に従います。

      **重要**: `gcr.io/datadoghq/private-action-runner:v1.21.0-large` を `gcr.io/datadoghq/dd-data-observability-par:1.21.0-3` に置き換えてください。

   1. プライベートアクションランナーの下部に「インストールに成功」と表示されるはずです。
1. 以下の中からいずれか 1 つの方法を使用して、プライベートアクションランナーで資格情報を構成します。
    - `DATABRICKS_CLIENT_ID` および `DATABRICKS_CLIENT_SECRET` 環境変数をランナーに直接設定します。Microsoft Entra ID マネージドサービスプリンシパルを使用する場合は、`DATABRICKS_AZURE_TENANT_ID` も設定します。インテグレーションタイルの「シークレットパス」は空白のままにします。
    - クラウドシークレットストレージを使用します。[ステップ 2](#step-2-databricks-prerequisites) で作成したシークレットの読み取り権限を持つ ID がインスタンスに割り当てられていることを確認し ([Azure Managed Identity][5]、[AWS IAM Role][6]、または [GCE Service Account][7])、`DATABRICKS_SECRET_PATH` 環境変数を通じて、またはインテグレーションタイルの「シークレットパス」フィールドに指定して、シークレットへのパスを提供します。

1. Docker コンテナを再起動して変更を有効にします。

[1]: https://docs.datadoghq.com/ja/actions/private_actions/set_up_standalone/?tab=docker#install-the-runner
[2]: https://app.datadoghq.com/actions/private-action-runners/new
[3]: https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/how-to-configure-managed-identities?pivots=qs-configure-portal-windows-vm
[4]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/attach-iam-role.html
[5]: https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/how-to-configure-managed-identities?pivots=qs-configure-portal-windows-vm
[6]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/attach-iam-role.html
[7]: https://cloud.google.com/compute/docs/access/create-enable-service-accounts-for-instances

{{% /tab %}}

{{< /tabs >}}

**注:** `gcr.io` にアクセスできない場合は、他のミラーを利用できます。
- `docker.io/datadog/dd-data-observability-par`
- `public.ecr.aws/datadog/dd-data-observability-par`
- `datadoghq.azurecr.io/dd-data-observability-par`
- `asia-docker.pkg.dev/datadoghq/asia.gcr.io/dd-data-observability-par`

### ステップ 4: Datadog を構成する {#step-4-configure-datadog}

1. プライベートアクションランナーにコネクションをアタッチします。
   1. [プライベートアクションランナー][12]ページに移動します。
   1. インストールしたランナーを選択します。
   1. **セットアップを完了**を選択します。
   1. **スクリプト**を選択します。
   1. **ファイルへのパス**を `/etc/data-observability/config/script.yaml` に設定します。
   1. **次へ、アクセスを確認**を選択します。
   1. [ステップ 1](#step-1-datadog-prerequisites) で作成したサービスアカウントを**リゾルバー**アクセス権付きで追加します。このステップは必須です。ランナーはこのサービスアカウントを使用して Datadog リクエストを認証するため、これがないとインテグレーションは機能しません。
   1. **作成してテスト**を選択します。テスト結果にエラーが返されないことを確認します。
1. Databricks インテグレーションをセットアップします。
   1. [Databricks インテグレーション][13]タイルに移動します。
   1. **資格情報**で、**プライベートアクションランナー**を選択します。
      1. **コネクション**で、前のステップで作成したコネクションを選択します。
      1. **サービスアカウント**で、[ステップ 1](#step-1-datadog-prerequisites) で作成したサービスアカウントを選択します。
      1. **シークレットパス**で、[ステップ 2](#step-2-databricks-prerequisites) のシークレットパスを入力します。`DATABRICKS_CLIENT_ID` および `DATABRICKS_CLIENT_SECRET` 環境変数を使用して資格情報を設定した場合、またはランナー上で `DATABRICKS_SECRET_PATH` 環境変数を使用してパスを設定した場合は、このフィールドを空白のままにしてください。
   1. [Datadog-Databricks インテグレーションの設定][14]に記載されている残りのインテグレーション設定を完了します。
      1. **ワークスペース名**、**ワークスペース URL**、および**システムテーブル SQL ウェアハウス ID** を入力します。
      1. 興味のある製品を有効にします。
         **注:** 現時点では、プライベートリンク経由のモデルサービングはサポートされていません。
      1. **Jobs Monitoring** を有効にした場合は、Datadog Agent init スクリプトをデプロイして、クラシックコンピューティングでジョブとクラスターを監視します。[Datadog Agent をインストールする][19]の手順に従って init スクリプトをセットアップし、実行中のクラスターを再起動して変更を反映します。
   1. **Databricks ワークスペースを保存**をクリックします。
   1. 保存時にエラーが発生しないことを確認します。

## 検証 {#validation}

セットアップが完了するとすぐ、[Data Observability: Jobs Monitoring][15] にジョブとクラスターの情報が表示されるはずです。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.databricks.com/aws/en/security/network/front-end/front-end-private-connect
[2]: https://docs.datadoghq.com/ja/actions/private_actions/
[3]: https://docs.datadoghq.com/ja/agent/guide/private-link/?tab=crossregionprivatelinkendpoints&site=us
[4]: https://docs.datadoghq.com/ja/actions/private_actions/#private-action-runner
[5]: https://docs.datadoghq.com/ja/actions/private_actions/run_script/
[6]: https://docs.datadoghq.com/ja/agent/guide/azure-private-link/?site=us3
[7]: https://docs.datadoghq.com/ja/agent/guide/gcp-private-service-connect/?site=us5
[8]: https://app.datadoghq.com/organization-settings/service-accounts
[12]: https://app.datadoghq.com/actions/private-action-runners/
[13]: https://app.datadoghq.com/integrations?search=databr&configPage=new&integrationId=databricks
[14]: /ja/data_observability/jobs_monitoring/databricks/#configure-the-datadog-databricks-integration
[15]: https://app.datadoghq.com/data-jobs/
[16]: https://docs.datadoghq.com/ja/actions/private_actions/enroll_runner/#manage-access-to-owned-runners
[17]: https://app.datadoghq.com/organization-settings/remote-config
[19]: /ja/data_observability/jobs_monitoring/databricks/#install-the-datadog-agent