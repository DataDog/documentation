---
aliases:
- /ja/service_catalog/self-service
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

[Self-Service][17] は、開発者が Datadog 内で直接アクションを実行できる集中型インターフェイスです。プラットフォーム チームは、ソフトウェア開発ライフサイクル全体のタスクを効率化するためのゴールデン パスを定義して共有できます。例えば、Self-Service を使用すると次のことができます:

- 適切な構成でマイクロサービスおよびインフラストラクチャーを構築する
- 開発環境を初期化する
- 環境間のデプロイメントを管理する
- 稼働中のサービスを継続的に監視・最適化する

Self-Service の各タイルはアプリを表し、あらかじめ定義されたアクションを実行するための構造化されたインターフェイスを提供します。アプリは [App Builder][2] で作成され、[Actions Catalog][7] と [Workflow Automation][1] によって動作し、Self-Service に表示されて開発者のワークフローを合理化します。

## 開発者のワークフローを自動化

Self-Service で新しいアプリを作成するには、サンプルから始めるか、ゼロから構築できます。大まかな流れは次のとおりです:

1. [App Builder][2] を使用して、開発者からの入力を収集する動的で使いやすいフォームを作成します。
1. アプリから Datadog の [Actions][7] を呼び出し、外部サービスへの API 呼び出しを開始したり、カスタム ロジックを実行したり、データを変換したりします。
1. [Workflow Automation][1] を使用して、複数のアクションを伴うエンド ツー エンドのプロセスをオーケストレーションします。
1. アプリを Datadog の Software Catalog と統合し、動的かつセルフ サービスなワークフローを有効にします.

{{< img src="tracing/software_catalog/self-service-ui.png" alt="Self-Service へ公開" style="width:100%;" >}}

### サンプルから始める

すぐに始めるには、アプリやワークフローの設定例として [App Builder Blueprints][9] と [Workflow Automation Blueprints][15] を参照してください。入力の設定、インテグレーションのセットアップ、権限の構成など、要件に合わせてブループリントを調整できます。

例えば、App Builder Blueprints を使うと次のことができます:

- **テンプレートから新しいサービスをスキャフォールド:** 開発者から入力を収集するフォームを構成し、ソース コード 管理のテンプレート (例: Github) と統合して、開発者向けに新しいリポジトリまたは PR を生成します。詳しくは [ソフトウェア テンプレートのドキュメント][16] を参照してください。
- **インフラストラクチャーをプロビジョニング:** 少ない入力と 1 回のクリックで、開発者が新しいインフラストラクチャー (例: S3 バケット) を立ち上げられるようにします。ソース コントロールや Workflow Automation 内の Approval アクションを通じて、SRE または プラットフォーム エンジニアリング チームから承認を収集します。
- **問題を是正:** クラウド インフラストラクチャーや Kubernetes からデータを統合し、開発者が簡単かつ安全なリメディエーション アクションを実行できるようにします。アクションは手動で、モニターへの反応で、または外部の API 呼び出しからトリガーできます。
- **コード変更とデプロイメントを管理:** デプロイメント、フィーチャー フラグの変更などを管理します。Datadog から直接変更を開始し、そのステータスと承認を追跡します。
- **開発者環境をプロビジョニング:** 開発者のための短命 (エフェメラル) な環境をオンデマンドで立ち上げます。Workflow Automation を使用して、未使用のインフラストラクチャーを自動的に破棄し、コストを抑制します。

### ゼロから始める

最初からアプリを構築したい場合:

1. App Builder を使用してフォームを作成します:

    1. 左側のメニューから **Actions** > **App Builder** に移動し、**New App** を選択します。
    1. 名前と説明を入力し、ドラッグ アンド ドロップ エディタを使用して、必要なパラメータを収集するフォームを作成します。
       - `Form` コンポーネントを使用するか、カスタム UI を構築できます。
    1. **New Query** を選択し、**Trigger workflow** アクションを使用してワークフローを呼び出し、パラメータを渡します。
       - 組み込みのインテグレーションについては [Actions Catalog][7] を参照するか、利用できないインテグレーションとやり取りするために `HTTP` アクションを使用します。
    1. フォームを送信しワークフローをトリガーする **Button** を作成します。
    1. アプリを保存して公開します。

1. アプリを [Actions][7] または [Workflow][6] と組み合わせて、プロセスを自動化します。

   {{< img src="tracing/software_catalog/templating-workflow.png" alt="ソフトウェア テンプレート自動化を構築するためのワークフロー" style="width:100%;" >}}

1. アプリとワークフローをテストする:

   1. **View App** をクリックして、スタンドアロン ページでアプリをプレビューします。
   1. [Workflow Automation][3] でワークフローの実行を監視します。

### アプリを公開する

Software Template の設定とテストが完了したら、チームが利用できるように公開します。公開フローでは次のことができます:

- アクセスを制御する権限を定義します。
- 簡単に見つけられるよう、アプリを Dashboard や Self-Service ポータルに追加します。

{{< img src="tracing/software_catalog/self-service-publish.png" alt="Self-Service へ公開" style="width:100%;" >}}


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
[15]: https://app.datadoghq.com/workflow/blueprints
[16]: /ja/software_catalog/self-service/software_templates
[17]: https://app.datadoghq.com/software/self-service