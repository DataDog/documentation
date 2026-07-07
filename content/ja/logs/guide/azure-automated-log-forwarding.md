---
aliases:
- /ja/logs/guide/azure-logging-guide/
- /ja/logs/guide/azure-automated-logs-architecture/
further_reading:
- link: https://www.datadoghq.com/blog/monitoring-azure-platform-logs/
  tag: ブログ
  text: Microsoft Azure プラットフォームログをモニタリングするためのベストプラクティス
title: Azure 自動ログ転送のセットアップ
---
## 概要 {#overview}

このガイドを使用して、Azure 自動ログ転送をセットアップおよび管理します。ログ転送は、Datadog で直接構成するか、Azure Resource Manager (ARM) テンプレートを使用してデプロイできます。

ARM テンプレートは、ログを収集して Datadog に転送するサブスクリプションに一連の Azure サービス (ストレージアカウントと関数アプリ) からリソースをデプロイします。これらのサービスは、ログの量に応じて自動的にスケールアップまたはスケールダウンします。スケーリングは、選択したサブスクリプションとリージョンにデプロイされた一連の関数アプリで構成されるコントロールプレーンによって管理されます。ストレージアカウントと関数アプリは、Datadog にログを転送する各サブスクリプションにデプロイされます。

**すべてのサイト**: 自動ログ転送はすべての [Datadog サイト][4] で使用できます。

**サポートされる Azure 環境**: 自動ログ転送は Azure Commercial (Public) クラウドのみをサポートしています。Azure Government および Azure China はサポートされていません。Datadog for Government サイトを使用している場合、この機能は Azure Commercial クラウドのワークロードでのみ使用できます。

## 自動セットアップか手動セットアップかの選択 {#how-to-choose-between-automated-and-manual-setup}

手動セットアップ方法を選択するのは、次のような場合です。
   - リソースにカスタムタグを適用する

自動セットアップ方法を使用するのは、次のような場合です。
   - Azure ポータルを通じてデプロイメントを自動化する
   - 宣言型テンプレートを通じてインフラストラクチャーを管理する
   - アクセス、タグ、および請求を中央で制御する
   - リソースを正しい順序で一貫した方法で再デプロイする
   - イベントハブではなくストレージアカウントを使用することでコストを削減する

## セットアップ {#setup}

### Configure Log Forwarding {#configure-log-forwarding}

**Configure Log Forwarding** フローを使用して、Datadog で直接新しいログフォワーダーをセットアップするか既存のログフォワーダーを管理します。このフローを使用して、ゼロから自動ログ転送をデプロイしたり、既存のセットアップを更新したりできます。たとえば、サブスクリプションの追加や削除、ログフィルターの変更などです。

1. Datadog で [{{< ui >}}Integrations > Azure{{< /ui >}}][16] の順に移動します。
1. {{< ui >}}Configure Log Forwarding{{< /ui >}} をクリックします。
1. 新しいセットアップをデプロイするか既存のセットアップを更新するかを選択します。
1. 提供されたコマンドをコピーし、Azure Cloud Shell に貼り付けます。
1. ログを転送するサブスクリプションを選択します。
1. 必要に応じて、ログフィルターを追加または削除します。
1. {{< ui >}}Confirm{{< /ui >}} をクリックします。

### ARM テンプレート {#arm-template}

または、[Azure Public ARM テンプレート][1]を使用して自動ログ転送をデプロイすることもできます。下記のセクションで、テンプレートの各ページを完了するための手順を示します。

#### Basics (基本) {#basics}

1. {{< ui >}}Project details{{< /ui >}} の下で、管理グループを選択します。これは、ARM テンプレートで自動ログ転送用に選択したサブスクリプションに対する権限を付与するために必要です。
2. {{< ui >}}Instance details{{< /ui >}} の下で、次の値を選択します。
   - {{< ui >}}Region{{< /ui >}}。コントロールプレーンがデプロイされる場所です。
   - {{< ui >}}Subscriptions to Forward Logs{{< /ui >}}。ログ転送のために構成されるサブスクリプションです。
   - {{< ui >}}Control Plane Subscription{{< /ui >}}。コントロールプレーンがデプロイされるサブスクリプションです。
   - {{< ui >}}Resource Group Name{{< /ui >}}。コントロールプレーンで使用するリソースグループです。コントロールプレーンサービスの管理を簡素化するために、新しい未使用のリソースグループ名を選択することをお勧めします。

{{< img src="logs/guide/azure-automated-log-forwarding/deployment_basics.png" alt="Azure 自動ログ転送の ARM テンプレートの Basics ページ" popup="true" style="width:100%">}}

3. {{< ui >}}Next{{< /ui >}} をクリックします。

#### Datadog Configuration (Datadog の構成) {#datadog-configuration}

1. [Datadog API キー][2]の値を入力します。
2. [Datadog サイト][4]を選択します。

{{< img src="logs/guide/azure-automated-log-forwarding/deployment_datadog_configuration_2025-02-18.png" alt="Azure 自動ログ転送の ARM テンプレートの [Datadog Configuration] ページ" popup="true" style="width:100%">}}

3. {{< ui >}}Next{{< /ui >}} をクリックします。

#### Deployment (デプロイメント) {#deployment}

1. デプロイメントの警告を確認するためにチェックボックスをクリックします。
2. {{< ui >}}Review + create{{< /ui >}} をクリックします。

#### Review + create (確認と作成) {#review-create}

1. 最終的なデプロイメントの詳細を確認します。
2. {{< ui >}}Create{{< /ui >}} をクリックします。

## リソースタグフィルタリング {#resource-tag-filtering}

タグフィルターを使用して、どの Azure リソースのログを Datadog に転送するかを制御できます。タグフィルターの構文、ワイルドカードのサポート、および例については、Azure スタートアップガイドの[リソースタグフィルタリング][21]を参照してください。

## Log Analytics ワークスペース {#log-analytics-workspaces}

自動ログフォワーダーを使用して Azure Log Analytics ワークスペース (LAW) から Datadog にログを転送することができます。以前は、LAW からの[診断設定][13]ログのみがサポートされていました。[データエクスポートルール][17]を使用して、LAW のログテーブルから Datadog にログを転送することもできます。

### 制限 {#restrictions}

- ログフォワーダーと同じリージョン内の LAW リソースに対してのみ転送をセットアップできます。
- LAW には最大 10 個のデータエクスポートルールを作成できます。LAW にデータエクスポートルールの空きがない場合は、既存のルールを削除して空きを作ってください。
- すべてのログテーブルをエクスポートできるわけではありません。Microsoft の[サポート対象外のテーブル][18]のリストを参照してください。

### Log Analytics ワークスペースからログを転送する {#forward-logs-from-a-log-analytics-workspace}

1. 自動ログフォワーダーをまだ作成していない場合は、[セットアップ](#setup)の手順に従います。すでにログフォワーダーがある場合は、最新バージョンに更新されていることを確認してください。
2. [Azure ポータル][19]で、目的の Log Analytics ワークスペースに移動します。
3. {{< ui >}}Settings{{< /ui >}} の下で、{{< ui >}}Data export{{< /ui >}} をクリックします。
4. {{< ui >}}New export rule{{< /ui >}} をクリックします。
5. ルールに名前を付け、{{< ui >}}Enable upon creation{{< /ui >}} をチェックし、{{< ui >}}Next{{< /ui >}} をクリックします。
6. エクスポートするテーブルを選択します。この選択は、後でデータエクスポートルールを編集することで変更できます。{{< ui >}}Next{{< /ui >}} をクリックします。
7. {{< ui >}}Destination type{{< /ui >}} で {{< ui >}}Storage Account{{< /ui >}} を選択します。ログフォワーダーを含むサブスクリプションを選択し、ログフォワーダーのストレージアカウントを選択します。通常、これらのアカウントには `ddlogstorage` というプレフィックスが付いています。{{< ui >}}Next{{< /ui >}} をクリックします。
8. ルールを確認し、{{< ui >}}Create{{< /ui >}} をクリックします。LAW からのログが数分以内に Datadog に表示されるようになります。

### トラブルシューティング {#troubleshooting}

#### ログが Datadog に表示されない {#logs-are-not-appearing-in-datadog}

データエクスポートルールの作成後に Datadog にログが表示されない場合

1. データエクスポートルールが有効になっていることを確認してください。
1. 宛先ストレージアカウントが自動ログフォワーダーによって作成されたものであることを確認してください (名前は通常 `ddlogstorage` で始まります)。
1. ストレージアカウントでコンテナを確認してください。`am-` というプレフィックスが付いたコンテナが LAW のエクスポートです。`insights-` というプレフィックスのコンテナしか表示されない場合、データエクスポートルールが適切に構成されていない可能性があります。
1. LAW で過去 2 時間以内に新しいログが収集されたことを確認してください。

その他の情報については、Microsoft の[データエクスポートのトラブルシューティングに関する FAQ][20] を参照してください。

#### エクスポートするログの選択 {#selecting-which-logs-are-exported}

データエクスポートルールで、Log Analytics ワークスペースからどのログテーブルをエクスポートするかを指定できます。データエクスポートルールを編集して、テーブルを追加または削除します。

#### 期待されるレイテンシー {#expected-latency}

LAW のログは、通常は Datadog に 2 ～ 5 分以内に表示されますが、最初に表示されるまでには最大 20 分かかる場合があります。LAW のログのプロパティは、LAW 以外のログとは異なる場合があります。

## アーキテクチャ {#architecture}

### 使用されるサービス {#services-used}

- [Azure Function][15] アプリは、Azure サブスクリプション内のリソースを検出し、ログフォワーダーのスケーリングを行い、検出されたリソースに対して診断設定を構成します。
- [Azure Container Apps][8] は、診断設定によって生成されたリソースログを収集し、すでに処理済みのログを追跡し、Datadog に送信します。
- [Azure Storage Accounts][9] は、リソースによって生成されたログおよびサブスクリプション ID、リソース ID、リージョンなどのメタデータを一時的に保存する小規模なキャッシュとして使用されます。

### ハイレベルアーキテクチャ {#high-level-architecture}

{{<img src="/logs/guide/azure_automated_logs_architecture/high_level_architecture_06-13-2025.png" alt="Azure 自動ログ転送の 3 つの主要コンポーネントを示すアーキテクチャ図: コントロールプレーンとログフォワーダー (Datadog が顧客環境にデプロイ) が Azure リソースに接続" style="width:100%">}}

デプロイメントテンプレートにより、選択したサブスクリプションに[コントロールプレーン](#control-plane)と[ログフォワーダー](#log-forwarders)がセットアップされます。

#### コントロールプレーン {#control-plane}

コントロールプレーンは、Azure Function アプリ群とキャッシュ用のストレージアカウントで構成されます。1 つのコントロールプレーンが、選択したサブスクリプションにデプロイされ、次のタスクを実行します。
- 選択したサブスクリプションにおいて、診断設定を通じてログを出力可能なリソースを検出
- 検出したリソースに対して診断設定を自動的に構成し、ログフォワーダーが監視するストレージアカウントにログを送るように設定
- リソースが存在するリージョンでログフォワーダーをスケーリングし、ログ量に合わせて動的に対応

#### ログフォワーダー {#log-forwarders}

ログフォワーダーは、Azure Container Apps のジョブとログ用のストレージアカウントで構成されます。これらは、ログ転送を行う対象として選択された各サブスクリプションに対し、コントロールプレーンによってデプロイされます。サブスクリプションごとにデプロイされるログフォワーダーの数は、リソースによって生成されるログ量に応じてスケールします。ログフォワーダーは次のタスクを実行します。
- リソースの診断設定から生成されるログを一時的にストレージアカウントに保存
- 保存されたログを処理し、Datadog に転送

Azure では、リソースの診断設定は同じリージョンにあるストレージアカウントしか指定できません。そのため、診断設定を持つリソースがある各リージョンでログフォワーダーが起動されます。

詳細は、Azure の [Azure モニターの診断設定][13]を参照してください。

### 詳細アーキテクチャ {#detailed-architecture}

{{<img src="/logs/guide/azure_automated_logs_architecture/detailed_architecture.png" alt="Azure 自動ログ転送のワークフロー図: コントロールプレーンがリソースを検出し、リージョン全体にログフォワーダーをスケールし、診断設定を構成してログをストレージアカウントに送信します。その後。Container Apps が新しいログをチェックして Datadog Log Management に転送します。" style="width:100%">}}

### セキュリティと権限 {#security-and-permissions}

ARM テンプレートは、フォワーダーの管理とリソースへの診断設定を行うために必要な権限だけをコントロールプレーンに付与します。これを実現するため、ARM テンプレートのデプロイ時にリソースグループが作成され、必要な権限が付与されます。その後、追加のサブスクリプションに対して権限を付与したい場合は、同じ ARM テンプレートを再デプロイできます。

#### 使用される権限 {#permissions-used}

- 選択したサブスクリプションの**サブスクリプション**レベルにおける [Monitoring Contributor][10] ロール
   - 診断設定が利用できるリソースを検出し、ストレージへのログ出力を有効にするために必要です。

- 選択したサブスクリプション内のログ転送用リソースグループにおける**リソースグループ**レベルの [Contributor][11] ロール
   - フォワーダーのストレージアカウントや Container Apps ジョブの作成・削除などを管理するために必要です。

- コントロールプレーンの Function Apps を更新するための**コントロールプレーンリソースグループ**レベルの [Website Contributor][12] ロール

リソースに関する情報はエクスポートされません。Datadog はログ出力を有効にするために必要な情報のみを要求し、このアーキテクチャからの唯一の出力は Datadog に送信されるログのみです。

**注**: 必要に応じて、コントロールプレーン自体の健全性メトリクス、ログ、およびイベントをデバッグ目的で Datadog に送信することができます。これを行うには、コントロールプレーンの任意の Function App または Container App で環境変数 `DD_TELEMETRY=true` を設定します。

{{% azure-log-archiving %}}

## アンインストール {#uninstall}

まず、[Azure Cloud Shell][5] を開き、Azure CLI/Bash で実行されていることを確認してください。PowerShell ではありません。

アンインストールスクリプトをダウンロードして実行します。
{{< code-block lang="bash" >}}
wget https://ddazurelfo.blob.core.windows.net/uninstall/uninstall.py
python uninstall.py
{{< /code-block >}}

スクリプトは最初に各サブスクリプションで実行中のインスタンスを検出し、次にアンインストールするインスタンスを選択するように促します。リソースの削除を確認し、リソースが削除されるまで待ちます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://portal.azure.com/#create/Microsoft.Template/uri/CustomDeploymentBlade/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fintegrations-management%2Fmain%2Fazure%2Flogging_install%2Fdist%2Fazuredeploy.json/createUIDefinitionUri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fintegrations-management%2Fmain%2Fazure%2Flogging_install%2Fdist%2FcreateUiDefinition.json
[2]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /ja/getting_started/site/
[5]: https://learn.microsoft.com/en-us/azure/cloud-shell/overview
[8]: https://azure.microsoft.com/products/container-apps
[9]: https://learn.microsoft.com/azure/storage/common/storage-account-overview
[10]: https://learn.microsoft.com/azure/azure-monitor/roles-permissions-security#monitoring-contributor
[11]: https://learn.microsoft.com/azure/role-based-access-control/built-in-roles/privileged#contributor
[12]: https://learn.microsoft.com/azure/role-based-access-control/built-in-roles/web-and-mobile#website-contributor
[13]: https://learn.microsoft.com/azure/azure-monitor/essentials/diagnostic-settings
[14]: https://app.datadoghq.com/integrations/azure/add?config_azure-new-onboarding=true
[15]: https://learn.microsoft.com/azure/azure-functions/
[16]: https://app.datadoghq.com/integrations/azure
[17]: https://learn.microsoft.com/azure/azure-monitor/logs/logs-data-export?tabs=portal
[18]: https://learn.microsoft.com/azure/azure-monitor/logs/logs-data-export?tabs=portal#unsupported-tables
[19]: https://portal.azure.com
[20]: https://learn.microsoft.com/troubleshoot/azure/azure-monitor/log-analytics/workspaces/workspace-data-export-faq
[21]: /ja/getting_started/integrations/azure/#resource-tag-filtering-for-logs