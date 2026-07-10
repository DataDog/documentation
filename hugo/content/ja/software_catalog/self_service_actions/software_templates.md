---
aliases:
- /ja/service_catalog/software_templates
- /ja/software_catalog/software_templates
- /ja/software_catalog/self-service/software_templates
further_reading:
- link: https://www.datadoghq.com/blog/app-builder-remediation/
  tag: ブログ
  text: App Builder でインシデントの復旧をより迅速に
- link: /service_management/app_builder/
  tag: ドキュメント
  text: App Builder について
- link: /service_management/workflows/
  tag: ドキュメント
  text: ワークフローについて
title: Software Templates
---

Software Catalog 内に Software Templates を作成し、開発者がインフラストラクチャーをすばやくプロビジョニングし、ベスト プラクティスに沿ったマイクロ サービスを作成できるようにします。

{{< callout url="https://forms.gle/6Er52qd3BCERhotg7" d_target="#signupModal" btn_hidden="false">}}
  Software Templates はプレビュー中です。アクセスをリクエストするにはフォームに記入してください。
{{< /callout >}}

## Software Template を作成する

Software Template は Git リポジトリに保存され、再利用可能なフレームワークとして機能します。[アプリを構築する][2] ことで、入力を収集し、それらをテンプレート リポジトリに渡してカスタマイズされた構成を生成できます。

Software Template を作成する方法:
- 事前構築済みのブループリントのサンプルから始める。
- 独自のテンプレートとワークフローを定義してゼロから始める。

### サンプルから始める

[App Builder Blueprints][9] を使用して、アプリまたはワークフローをすばやく構成します。これらのブループリントは、入力の変更、ソース コントロールやクラウド プロバイダーとの統合、権限の調整によってカスタマイズできる実用的なサンプルを提供します。

ブループリントの例:

- **[Scaffold New Service blueprint][11]**: 開発者の入力を収集するフォームを作成し、GitHub と連携し、新しいリポジトリまたは pull request を生成します。
- **[Create S3 Bucket blueprint][10]**: GitHub のフォームを使用して S3 バケット用の Terraform コードを生成します。
- **[Provision EKS Cluster blueprint][13]**: GitHub で Kubernetes クラスター用の Terraform コードを生成します。
- **[Provision RDS Instance blueprint][14]**: API コールを通じて AWS で RDS インスタンスをプロビジョニングします。

ブループリントを使用するには:

1. [**App Builder Blueprints**][9] でブループリントを選択します。
1. 必須入力を取得できるようにフォーム フィールドをカスタマイズします。
1. **Save as New App** をクリックして、テンプレート ワークフローにリンクされたアプリを作成します。

### ゼロから始める

Software Template をゼロから構築するには:

1. App Builder を使用してフォームを作成します:

    1. 左側のメニューから **Actions** > **App Builder** に移動し、**New App** を選択します。
    1. 名前と説明を入力し、ドラッグ アンド ドロップ エディタを使用して、必要なパラメータを収集するフォームを作成します。
       - `Form` コンポーネントを使用するか、カスタム UI を構築できます。
    1. **New Query** を選択し、**Trigger workflow** アクションを使用してワークフローを呼び出し、パラメータを渡します。
       - 組み込みのインテグレーションについては [Actions Catalog][7] を参照するか、利用できないインテグレーションとやり取りするために `HTTP` アクションを使用します。
    1. フォームを送信しワークフローをトリガーする **Button** を作成します。
    1. アプリを保存して公開します。

2. テンプレート用に [ワークフローを作成する][6]:

   1. [Workflow Automation][3] に移動し、**New Workflow** をクリックします。
   1. 名前を入力し、関連するタグを追加し、ユーザーから収集したい入力パラメータを定義します。

3. テンプレート ワークフローを構成します:

   1. テンプレート ファイルを取得するには、GitHub、Gitlab、または HTTP の [アクション][7] を使用します。
   1. Apply Template [アクション][7] を使用してテンプレート リポジトリを操作し、入力パラメータを渡します。
   1. GitHub、Gitlab、または HTTP の [アクション][7] を使用して、プロジェクト ファイルをリポジトリにアップロードします。
   1. ワークフローを保存します。

  {{< img src="tracing/software_catalog/templating-workflow.png" alt="Software Template の自動化を構築するためのワークフロー" style="width:100%;" >}}

4. アプリとワークフローをテストする:

   1. **View App** をクリックして、アプリをスタンドアロン ページとしてプレビューします。
   1. [Workflow Automation][3] でテンプレート適用プロセスを監視します。

## アプリを公開する

Software Template の設定とテストが完了したら、チームが利用できるように公開します。公開フローでは次のことができます:

- アクセスを制御する権限を定義します。
- 簡単に見つけられるよう、アプリを Dashboard または Self-Service Actions に追加します。

{{< img src="tracing/software_catalog/self-service-publish.png" alt="Self-Service へ公開" style="width:100%;" >}}

## 利用可能なテンプレート アクション

Datadog App Builder と Workflow Automation の Software Catalog で、次のアクションが利用できます。完全な一覧は [Action Catalog][7] を参照してください。

- **Templating**
  - "Apply template": 入力パラメータをファイル群に適用します。
- **GitHub**
  - "Create or update file": GitHub リポジトリでファイルを作成または更新します。
  - "Edit configuration file": YAML または JSON の構成ファイルを変更します。
  - "Trigger GitHub Actions workflow": GitHub Actions のワークフローを起動します。
  - "Search repositories": リポジトリの一覧を取得します。
  - "Create pull request": pull request を作成します。
- **GitLab**
  - "Create file": GitLab リポジトリにファイルを作成します。
  - "Create project": GitLab のプロジェクトを作成します。
- **Azure DevOps**
  - "Run pipeline": Azure DevOps でパイプラインを実行します。
- **Retrieve Service Information**
  - "List entity definitions": Datadog Software Catalog からすべてのサービス定義を取得します (v3.0 以前)。
  - "Get service dependencies": サービスの上流および下流の依存関係を取得します。
- **Approvals**
  - "Make a decision": Slack または Microsoft Teams を使用して承認をリクエストします。
    - 既存の変更管理プロセスがある場合は、ServiceNow、Jira、または HTTP 呼び出しとのインテグレーションを使用してください。
- **HTTP**
  - "Make request": 外部 API とやり取りするために HTTP リクエストを実行します。
- **Data Transformation**
  - "Expression", "Function": JavaScript でデータ変換を実行します。
    - カスタム JavaScript コードの作成には Bits AI を活用できます。
- **Private Actions**
  - プライベート リソースとやり取りするには、[Private Action Runner][12] を使用します。


## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/service_management/workflows/
[2]: /ja/service_management/app_builder/
[3]: https://app.datadoghq.com/workflow
[4]: https://www.cookiecutter.io/
[5]: https://gist.github.com/enbashi/366c62ee8c5fc350d52ddabc867602d4#file-readme-md
[6]: /ja/service_management/workflows/build/#create-a-custom-workflow
[7]: /ja/actions/actions_catalog/
[9]: https://app.datadoghq.com/app-builder/blueprints
[10]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=create-new-s3-bucket&viewMode=edit
[11]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=scaffolding&viewMode=edit
[12]: /ja/actions/private_actions/
[13]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=data&showActionCatalog=false&template=provision-eks-cluster&viewMode=edit&visibleDataItemId=createOrUpdateFile0-action
[14]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=data&showActionCatalog=false&template=rds_provision_instance&viewMode=edit&visibleDataItemId=createDbInstance0-action