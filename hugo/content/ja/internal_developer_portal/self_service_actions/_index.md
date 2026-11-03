---
aliases:
- /ja/software_catalog/actions
- /ja/software_catalog/self-service
- /ja/service_catalog/self-service
- /ja/software_catalog/self-service_actions
- /ja/software_catalog/self_service_actions
cascade:
  site_support_id: idp
description: プラットフォームチームは、開発者がワンクリックでインフラストラクチャーのプロビジョニング、サービスの構築、デプロイの管理、タスクの自動化を行えるテンプレートを定義および共有できます。
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
- link: https://www.datadoghq.com/blog/software-catalog-self-service-actions/
  tag: ブログ
  text: Datadog Catalog の Self-Service Actions でエンジニアリングチームを強化
title: Self-Service Actions
---
[Self-Service Actions][17] は、ソフトウェア開発ライフサイクル全体にわたりタスクを効率化するテンプレートをプラットフォームチームが定義および共有するうえで役立ちます。開発者は、これらの定義済みアクションを使用して次のことができます。

- 適切な構成でマイクロサービスとインフラストラクチャーを構築する。
- 開発環境を初期化する。
- 環境全体でデプロイを管理する。
- 実行中のサービスをアクティブに監視および最適化する。

各タイルはアプリを表しており、定義済みのアクションを実行するための構造化されたインターフェースを提供します。アプリは [App Builder][2] を通じて作成され、[Action Catalog][7] と [Workflow Automation][1] によって強化され、開発者のワークフロー効率化のためにカタログに表示されます。

## 開発者のワークフローを自動化する{#automate-developer-workflows}

カタログで新しいアプリを作成するには、サンプルから始めることも、ゼロから構築することもできます。大まかに言うと、新しいアプリの作成には以下のステップが含まれます。

1. [App Builder][2] を使用して、開発者から入力を収集するための動的で使いやすいフォームを作成します。
1. アプリから Datadog の[アクション][7]を呼び出し、外部サービスへの API 呼び出しを開始したり、カスタムロジックを実行したり、データを変換したりします。
1. [Workflow Automation][1] を使用して、複数のアクションを含むエンドツーエンドのプロセスを調整します。
1. アプリを Datadog のカタログと統合し、動的でセルフサービス型のワークフローを実現します。

{{< img src="tracing/software_catalog/self-service-ui.png" alt="Self-Service に公開する" style="width:100%;" >}}

### サンプルから始める{#start-from-an-example}

すぐに開始するには、[App Builder Blueprints][9] と [Workflow Automation Blueprints][15] を調べて、それぞれアプリとワークフローを構成する方法のサンプルを確認してください。ブループリントに対して、入力の構成、インテグレーションのセットアップ、権限の構成、その他の調整を行って、ニーズに合わせてカスタマイズできます。

たとえば、App Builder Blueprints を使用して以下のことができます。

- **テンプレートから新しいサービスを構築する:** 開発者から入力を収集するフォームを構成し、ソースコード管理 (たとえば、GitHub や GitLab) のテンプレートと統合して、開発者向けに新しいリポジトリ、プルリクエスト、またはマージリクエストを生成します。詳細については、[ソフトウェアテンプレートのドキュメント][16]をお読みください。
- **インフラストラクチャーのプロビジョニング:** 開発者が少しの入力とワンクリックで新しいインフラストラクチャー (たとえば、S3バケット) を立ち上げられるようにします。ソース管理または Workflow Automation 内の承認アクションを通じて、SRE またはプラットフォームエンジニアリングチームから承認を収集します。
- **問題の修正:** クラウドインフラストラクチャーまたは Kubernetes からのデータを統合し、開発者がシンプルで安全な修正アクションを実行できるようにします。手動で、モニターへの応答として、または外部 API 呼び出しから、アクションをトリガーします。
- **コード変更とデプロイの管理:** デプロイ、機能フラグの変更などを管理します。Datadog から直接変更を開始し、そのステータスと承認を追跡します。
- **開発環境のプロビジョニング:** 開発者向けにオンデマンドで一時的な環境を立ち上げます。Workflow Automation を使用して、未使用のインフラストラクチャーを自動的にプロビジョニング解除し、コストを管理します。

### ゼロから開始する{#start-from-scratch}

アプリをゼロから構築には、以下の手順に従います。

1. App Builder を使用してフォームを作成します。

    1. 左側のメニューから [**Actions**] (アクション) > [**App Builder**] に移動し、[**New App**] (新しいアプリ) を選択します。
    1. 名前と説明を入力し、ドラッグアンドドロップエディターを使用して、必要なパラメーターを収集するフォームを作成します。
       - `Form` コンポーネントを使用することも、カスタム UI を構築することもできます。
    1. [**New Query**] (新しいクエリ) を選択し、[**Trigger workflow**] (ワークフローをトリガー) アクションを使用してワークフローを呼び出し、パラメーターを渡します。
       - [Action Catalog][7] で組み込みのインテグレーションを探すか、`HTTP` アクションを使用して利用できないインテグレーションとやり取りします。
    1. フォームを送信してワークフローをトリガーするための**ボタン**を作成します。
    1. アプリを保存して公開します。

1. アプリを[アクション][7]または[ワークフロー][6]とペアリングして、プロセスを自動化します。

   {{< img src="tracing/software_catalog/templating-workflow.png" alt="ソフトウェアテンプレート自動化構築用ワークフロー" style="width:100%;" >}}

1. アプリとワークフローをテストします。
   
   1. [**View App**] (アプリを表示) をクリックして、スタンドアロンページでアプリをプレビューします。
   1. [Workflow Automation][3] でワークフローの実行を監視します。

### アプリを公開する{#publish-your-app}

ソフトウェアテンプレートの構成とテストが完了したら、チームが使用できるように公開します。公開フローでは、次のことができます。

- アクセスを制御するための権限を定義する。
- アプリを Dashboard または Self-Service Actions に追加して、簡単に見つけられるようにする。

{{< img src="tracing/software_catalog/self-service-publish.png" alt="Self-Service に公開する" style="width:100%;" >}}
    

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
[15]: https://app.datadoghq.com/workflow/blueprints
[16]: /ja/internal_developer_portal/self_service_actions/software_templates/
[17]: https://app.datadoghq.com/software/self-service