---
aliases:
- /ja/service_catalog/software_templates
- /ja/software_catalog/software_templates
- /ja/software_catalog/self-service/software_templates
- /ja/software_catalog/self_service_actions/software_templates
- /ja/software_catalog/self-service_actions/software_templates
description: カタログ内に再利用可能なソフトウェアテンプレートを作成し、開発者が組織のベストプラクティスに沿ったインフラストラクチャーのプロビジョニングやマイクロサービスの構築を行うことを支援します。
further_reading:
- link: https://www.datadoghq.com/blog/app-builder-remediation/
  tag: ブログ
  text: App Builder でインシデントの解決を迅速化
- link: /actions/app_builder/
  tag: ドキュメント
  text: App Builder について
- link: /actions/workflows/
  tag: ドキュメント
  text: ワークフローについて
title: ソフトウェアテンプレート
---
カタログ内にソフトウェアテンプレートを作成し、開発者がベストプラクティスに沿ったインフラストラクチャーの迅速なプロビジョニングやマイクロサービスの作成を行うことを支援します。

## ソフトウェアテンプレートを作成する{#create-a-software-template}

ソフトウェアテンプレートは Git リポジトリに保存され、再利用可能なフレームワークとして機能します。[アプリを構築][2]して入力を収集し、それらをテンプレートリポジトリに渡してカスタマイズされた構成を生成します。

ソフトウェアテンプレートを作成するには、以下の方法があります。
- 構築済みの Blueprints を使用して、例から開始します。
- 独自のテンプレートとワークフローを定義して、ゼロから開始します。

### 例から開始する{#start-from-an-example}

[App Builder Blueprints][9] を使用すると、アプリやワークフローを迅速に構成できます。これらのブループリントは、入力の変更、ソース管理やクラウドプロバイダーとの統合、権限の調整によってカスタマイズ可能な実例を提供します。

ブループリントの例:

- **[Scaffold New Service blueprint][11]**: 開発者の入力を収集し、GitHub と統合して、新しいリポジトリやプルリクエストを生成するフォームを作成します。
- **[Create S3 Bucket blueprint][10]**: GitHub のフォームを使用して、S3 バケット用の Terraform コードを生成します。
- **[Provision EKS Cluster blueprint][13]**: GitHub でKubernetes クラスター用の Terraform コードを生成します。
- **[Provision RDS Instance blueprint][14]**: API 呼び出しを通じて AWS で RDS インスタンスをプロビジョニングします。

ブループリントを使用するには、以下の手順に従います。

1. [**App Builder Blueprints**][9]でブループリントを選択します。
1. 必要な入力を取得するようにフォームフィールドをカスタマイズします。
1. [**Save as New App**] をクリックして、テンプレートワークフローにリンクされたアプリを作成します。

### ゼロから開始する{#start-from-scratch}

ソフトウェアテンプレートをゼロから構築するには、以下の手順に従います。

1. App Builder を使用してフォームを作成します。

    1. 左側のメニューから [**Actions**] > [**App Builder**] に移動し、[**New App**] を選択します。
    1. 名前と説明を入力し、ドラッグアンドドロップエディターを使用して、必要なパラメーターを収集するフォームを作成します。
       - `Form` コンポーネントを使用することも、カスタム UI を構築することもできます。
    1. [**New Query**] を選択し、**Trigger workflow** アクションを使用してワークフローを呼び出し、パラメーターを渡します。
       - [Action Catalog][7] で組み込みのインテグレーションを探すか、`HTTP` アクションを使用して利用できないインテグレーションとやり取りします。
    1. フォームを送信してワークフローをトリガーするための**ボタン**を作成します。
    1. アプリを保存して公開します。

2. テンプレートのための[ワークフローを作成][6]します。
   
   1. [Workflow Automation][3] に移動し、[**New Workflow**] をクリックします。
   1. 名前を入力し、関連するタグを追加し、ユーザーから収集したい入力パラメーターを定義します。
  
3. テンプレートワークフローを構成します。

   1. GitHub、GitLab、または HTTP の[アクション][7]を使用してテンプレートファイルを取得します。
   1. Apply Template [アクション][7]を使用して、テンプレートリポジトリを操作し、入力パラメーターを渡します。
   1. GitHub、GitLab、または HTTP の[アクション][7]を使用して、プロジェクトファイルをリポジトリにアップロードします。
   1. ワークフローを保存します。

  {{< img src="tracing/software_catalog/templating-workflow.png" alt="ソフトウェアテンプレートの自動化を構築するためのワークフロー" style="width:100%;" >}}

4. アプリとワークフローをテストします。

   1. [**View App**] をクリックして、アプリをスタンドアロンページとしてプレビューします。
   1. [Workflow Automation][3] でテンプレートのプロセスを監視します。

## アプリを公開する{#publish-your-app}

ソフトウェアテンプレートの構成とテストが完了したら、チームが使用できるように公開します。公開フローでは、次のことができます。

- アクセスを制御するための権限を定義する。
- アプリを Dashboard または Self-Service Actions に追加して、簡単に見つけられるようにする。

{{< img src="tracing/software_catalog/self-service-publish.png" alt="Self-Service に公開する" style="width:100%;" >}}

## 利用可能なテンプレート操作{#available-templating-actions}

Datadog App Builder および Workflow Automation のカタログでは、以下の操作が利用可能です。完全なリストについては、[Action Catalog][7] を参照してください。

- **テンプレート**
  - [Apply template]: 入力パラメーターを一連のファイルに渡します。
- **GitHub**
  - [Create or update file]: GitHubリポジトリ内にファイルを作成または変更します。
  - [Edit configuration file]: YAML または JSON 構成ファイルを変更します。
  - [Trigger GitHub Actions workflow]: GitHub アクションを開始します。
  - [Search repositories]: リポジトリのリストを取得します。
  - [Create pull request]: プルリクエストを開きます。
- **GitLab**
  - [Create file]: GitLab リポジトリ内にファイルを作成します。
  - [Create project]: GitLab プロジェクトを作成します。
- **Azure DevOps**
  - [Run pipeline]: Azure DevOps でパイプライン実行をトリガーします。
- **サービス情報を取得する**
  - [List entity definitions]: Datadog Catalog (v3.0以前) からすべてのサービス定義を取得します。
  - [Get service dependencies]: サービスの上流および下流の依存関係を取得します。
- **承認**
  - [Make a decision]: Slack または Microsoft Teams を使用して承認を求めます。
    - 既存の変更管理プロセスがある場合は、ServiceNow、Jira、または HTTP 呼び出しとのインテグレーションを使用してください。
- **HTTP**
  - [Make request]: HTTP リクエストを行い、外部 API とやり取りします。
- **データ変換**
  - [Expression]、[Function]: JavaScript を使用してデータ変換を実行します。
    - カスタム JavaScript コードの作成を支援するには、Bits AI を使用してください。
- **Private Actions**
  - プライベートリソースとやり取りするには、[Private Action Runner][12] を使用してください。
    

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/actions/workflows/
[2]: /ja/actions/app_builder/
[3]: https://app.datadoghq.com/workflow
[4]: https://www.cookiecutter.io/
[5]: https://gist.github.com/enbashi/366c62ee8c5fc350d52ddabc867602d4#file-readme-md
[6]: /ja/actions/workflows/build/#create-a-custom-workflow
[7]: /ja/actions/actions_catalog/
[9]: https://app.datadoghq.com/app-builder/blueprints
[10]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=create-new-s3-bucket&viewMode=edit
[11]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=scaffolding&viewMode=edit
[12]: /ja/actions/private_actions/
[13]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=data&showActionCatalog=false&template=provision-eks-cluster&viewMode=edit&visibleDataItemId=createOrUpdateFile0-action
[14]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=data&showActionCatalog=false&template=rds_provision_instance&viewMode=edit&visibleDataItemId=createDbInstance0-action