---
aliases:
- /ja/service_catalog/software_templates
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
title: Self-Service
---

## 開発者のワークフローを自動化
[App Builder][2] を使用して、開発者からの入力を収集する、動的でユーザー フレンドリーなフォームを作成します。アプリから Datadog の [Actions][7] を呼び出して、外部サービスへの API 呼び出しを開始したり、カスタム ロジックやデータ変換を実行したりします。[Workflow Automation][1] を使用して、複数のアクションによる エンド ツー エンド のプロセスをオーケストレーションします。これらを Datadog の Software Catalog と統合して、動的でセルフ サービスなワークフローを実現します。

{{< img src="tracing/service_catalog/self-service-ui.png" alt="Self-Service に公開" style="width:100%;" >}}

{{< callout url="https://forms.gle/6Er52qd3BCERhotg7" d_target="#signupModal" btn_hidden="false">}}
  Software Templates はプレビュー中です。アクセスをリクエストするにはフォームに記入してください。
{{< /callout >}}

### ソフトウェア テンプレートのワークフローを作成
Datadog でソフトウェア テンプレートを使用するには、目的のテンプレートを含む Git リポジトリを作成します。ゼロから開始することも、サンプルから学べるクイック スタート Blueprints を利用することもできます。

#### サンプルから始める
[App Builder Blueprints][9] に移動し、次の blueprint のいずれかを選択します。これらは、開始にあたり App または Workflow をどのように構成するかの例です。入力の構成、ソース コード管理やクラウド プロバイダーとの統合の設定、権限の構成など、ニーズに合わせてサンプルを更新できます。

##### Scaffold New Service

[Scaffold New Service blueprint][11] は、テンプレートから新しい Lambda 関数を作成する例を示します。フォームは、対応する Git リポジトリに渡す開発者からの入力を取得します。

1. アプリから、開発者から取得したいパラメータを含めるようにフォームをカスタマイズします。
2. **Save as New App** をクリックしてアプリを保存します。これにより、対応するテンプレート用のワークフローも作成されます。

##### Terraform で S3 バケットを作成

[Create S3 Bucket blueprint][10] は、GitHub のフォームを使用して S3 バケットの Terraform コードを生成する方法の例を示します。

##### Kubernetes クラスターをプロビジョニング

[Provision EKS Cluster blueprint][12] は、GitHub で Kubernetes クラスターの Terraform コードを生成する例を示します。

##### RDS インスタンスをプロビジョニング

[Provision RDS Instance blueprint][13] は、AWS と直接統合して RDS インスタンスをプロビジョニングする例を示します。


#### ゼロから始める
Datadog でテンプレートを構成するには、[Workflow Automation][3] ページに移動します。

1. App Builder を使用して、開発者向けフロント エンド用のフォームを作成します:
   - **Actions** > **App Builder** に移動し、**New App** を選択します。
   - 名前と説明を入力し、ドラッグ アンド ドロップ エディターを使用して、テンプレートに必要なパラメータを収集するフォームを作成します。
   - `Form` コンポーネントを利用するか、カスタム UI を構築できます。
   - UI の作成が完了したら、**New Query** を選択し、**Trigger workflow** アクションを使用してテンプレート用のワークフローを呼び出し、関連するパラメータを渡します。[Actions Catalog][7] で利用可能な統合を確認するか、`HTTP` アクションを利用して、標準で提供されていないあらゆる統合と連携することもできます。
   - フォームを送信し、ワークフローをトリガーし、テンプレートにパラメータを渡す **Button** を作成します。
   - アプリを保存して公開します。

2. テンプレート用に [ワークフローを作成する][6]:
   - [Workflow Automation][3] ページで **New Workflow** をクリックします。
   - 名前を入力し、関連するタグを追加し、ユーザーから収集したい入力パラメータを定義します。

3. テンプレート ワークフローを構成します:
   - テンプレート ファイルを取得するには、GitHub、Gitlab、または HTTP の [アクション][7] を使用します。
   - Apply Template [アクション][7] を使用してテンプレート リポジトリを操作し、入力パラメータを渡します。
   - GitHub、Gitlab、または HTTP の [アクション][7] を使用して、プロジェクト ファイルをリポジトリにアップロードします。
   - ワークフローを保存します。

  {{< img src="tracing/software_catalog/templating-workflow.png" alt="ソフトウェア テンプレート自動化を構築するためのワークフロー" style="width:100%;" >}}

4. App と Workflow をテスト:
   - **View App** をクリックして、スタンドアロン ページのプレビューで App を表示します。
   - [Workflow Automation][3] で、ワークフローによるテンプレート処理の成否を追跡します。

### App の公開
App のセットアップとテストが完了したら、チーム メンバーが使用できるように公開できます。公開フローでは permissions の定義を求められ、その後、App を Dashboard または Self-Service ポータルに追加できます。

  {{< img src="tracing/service_catalog/self-service-publish.png" alt="Self-Service に公開" style="width:100%;" >}}

### 利用可能な Software Catalog の Actions

以下は、Datadog App Builder と Workflow Automation における Software Catalog 向けの Actions の一覧です。完全な一覧は [Action Catalog][7] で確認できます。

- **Templating**
  - "Apply template" で、ファイル一式にパラメータを適用します。
- **GitHub**
  - "Create or update file" で新しいファイルを作成します。
  - "Edit configuration file" で YAML や JSON ファイルを操作します。
  - "Trigger GitHub Actions workflow run" で GitHub Actions の実行を開始します。
  - "Search repositories" でリポジトリの一覧を返します。
  - "Create pull request" で pull request を作成します。
- **Retrieve Service Information**
  - "Get service definition" で単一のサービスの定義を取得します。
  - "List service definitions" で Datadog Software Catalog からすべての定義を取得します。
  - "Get service dependencies" でサービスの直近の上流・下流の依存サービスを取得します。
- **Incident Triage**
  - "Get service PagerDuty on call"
  - 他の Actions と連携すると、重大なイベントに基づいてワークフローをトリガーできます (例: ランブックの実行)。
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