---
aliases:
- /ja/guides/azure/
- /ja/integrations/azure_storage/
categories:
- cloud
- azure
- log collection
dependencies: []
description: インスタンスや多数の Azure サービスからメトリクスを収集
doc_link: https://docs.datadoghq.com/integrations/azure/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/azure-app-service-datadog-serverless-view/
  tag: ブログ
  text: Datadog サーバーレスビューで Azure App Service を見通す
- link: https://www.datadoghq.com/blog/how-to-monitor-microsoft-azure-vms/
  tag: ブログ
  text: Microsoft Azure VM の監視方法
- link: https://docs.datadoghq.com/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: よくあるご質問
  text: クラウドインスタンスに Datadog Agent をインストールするメリットは何ですか？
- link: https://www.datadoghq.com/blog/monitoring-azure-platform-logs/
  tag: ブログ
  text: Microsoft Azure プラットフォームログをモニタリングするためのベストプラクティス
- link: https://www.datadoghq.com/blog/azure-service-health-monitoring-datadog/
  tag: ブログ
  text: Azure Service の健全性イベントを Datadog で監視
- link: https://docs.datadoghq.com/integrations/guide/azure-portal/
  tag: Documentation
  text: Azure ポータルの Datadog
- link: https://www.datadoghq.com/blog/azure-government-monitoring-datadog/
  tag: ブログ
  text: Datadog で Azure Government を監視する
git_integration_title: azure
has_logo: true
integration_id: azure
integration_title: Microsoft Azure
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: azure
public_title: Datadog-Microsoft Azure インテグレーション
short_description: インスタンスや多数の Azure サービスからメトリクスを収集
version: '1.0'
---

## 概要

Datadog の Azure インテグレーションにより、Azure 環境からのメトリクスおよびログの収集が可能になります。コンフィギュレーションオプションは、オーガニゼーションで使用している Datadog のサイトにより異なります。

**All Sites:** すべての Datadog サイトは、メトリクス収集を実装するための App Registration 資格情報プロセス、および Azure Platform Logs を送信するための Event Hub セットアップを使用できます。 
**US3:** Datadog US3 サイトをご利用の場合は、Azure にネイティブに組み込まれたワークフローを使用して、メトリクスと Azure Platform Logs の収集を効率化します。Datadog では、可能な限りこの方法を使用することを推奨しています。これは、Azure のサブスクリプションを Datadog の組織にリンクするために、Azure で Datadog リソースを作成することを必要とします。  
**注:** Azure Blob Storage にログをアーカイブする場合も、App Registration が必要です。Azure Blob Storage にログをアーカイブする場合は、ドキュメントページの右側にある "site" を "US" に設定します。アーカイブ目的で作成された App Registrations は、"Storage Blob Data Contributor" ロールのみが必要です。ストレージバケットが Datadog Resource を通じて監視されているサブスクリプションにある場合、App Registration が冗長であることに関する警告が表示されます。この警告は、無視することができます。

{{< site-region region="us,eu,us5,gov" >}}
<div class="alert alert-info"><strong>このページのサイドパネルのサイト US3 を選択または<a href="?site=us3">このリンク</a>をクリックしてドキュメントの US3 バージョンを表示します。</strong></div>
{{< /site-region >}}

Microsoft Azure に接続すると、以下のことができます。
- Datadog Agent をインストールして、またはインストールせずに、Azure VM からメトリクスを取得。
- すべての Azure サービスの標準 Azure モニターメトリクスを収集: Application Gateway、App Service (Web および Mobile)、Batch サービス、イベントハブ、IoT Hub、Logic App、Redis Cache、サーバーファーム (App Service プラン)、SQL データベース、SQL 可変プール、仮想マシンスケールセットなど。
- リージョン、リソースグループ、カスタム Azure タグなど関連リソースについての Azure 固有の情報を Azure メトリクスにタグ付け。
- Datadog が生成したメトリクスを取得し Azure 環境固有のインサイトを提供。
- ログ、メトリクス、APM トレーシング、ユーザーアクティビティなどの間および Datadog 組織内の Azure アプリケーションからのデータを関連付け。

<div class="alert alert-warning">
Datadog の Azure インテグレーションは、<a href="https://docs.microsoft.com/en-us/azure/azure-monitor/platform/metrics-supported">Azure Monitor からすべてのメトリクス</a>を収集するように構築されています。Datadog では継続的にドキュメントを更新してすべてのサブインテグレーションを表示できるように努めていますが、新しいメトリクスやサービスがクラウドサービスから次々にリリースされるため、インテグレーション一覧が追い付かないことがあります。<br><code>azure.*.status</code> および <code>azure.*.count</code> メトリクスは、Datadog により Azure Resource Health から生成されています。詳細は、<a href="https://docs.datadoghq.com/integrations/faq/azure-status-metric">Azure の状態およびカウントメトリクス</a>をご参照ください。
</div>

| インテグレーション                     | 説明                                                                                               |
|---------------------------------|-----------------------------------------------------------------------------------------------------------|
| [Analysis Services][1]          | クラウドでデータモデルを提供するサービス                                                         |
| [API Management][2]             | API を公開、セキュリティ保護、変換、管理、監視するサービス                                      |
| [App Service][3]                | Web、モバイル、API、およびビジネスロジックアプリケーションをデプロイおよびスケーリングするためのサービス                      |
| [App Service Environment][4]    | App Service のアプリを大規模かつ安全に実行するための環境を提供するサービス               |
| [App Service Plan][5]           | Web アプリを実行するためのコンピューティングリソースのセット                                                          |
| [Application Gateway][6]        | Web アプリケーションへのトラフィックを管理できる Web トラフィックロードバランサー                  |
| [Automation][7]                 | 複数の環境を横断して自動化と構成管理を提供するサービス                 |
| [Batch Service][8]              | マネージド型のタスクスケジューラーおよびプロセッサー                                                                      |
| [Cognitive Services][9]         | AI やデータサイエンスの知識なしでアプリケーションの構築を可能にする API、SDK、サービス       |
| [Container Instances][10]       | 基底のインフラストラクチャーをプロビジョニングおよび管理する必要なく、コンテナをデプロイするサービス     |
| [Container Service][11]         | 実稼働準備が整った Kubernetes、DC/OS、または Docker Swarm クラスター                                            |
| [Cosmos DB][12]                 | ドキュメント、キー/値、ワイドカラム、グラフデータベースなどをサポートするデータベースサービス                   |
| [Customer Insights][13]         | オーガニゼーションが複数のデータセットを結合して、360 度の包括的な顧客ビューを構築できるようにするサービス                |
| [Data Explorer][14]             | 迅速かつスケーラブルなデータ調査サービス                                                        |
| [Data Factory][15]              | データの保管・移動・処理サービスを、自動化されたデータパイプラインとして構築するサービス       |
| [Data Lake Analytics][16]       | ビッグデータを簡略化する分析ジョブサービス                                                        |
| [Data Lake Store][17]           | ビッグデータ分析を可能にする無制限のデータレイク                                                     |
| [Database for MariaDB][18]      | エンタープライズ対応のフルマネージド型コミュニティ MariaDB データベースを提供するサービス                       |
| [Event Grid][19]                | 公開/サブスクライブモデルを使用して均一なイベント消費を可能にするイベントルーティングサービス       |
| [Event Hub][20]                 | マネージド型の大規模データストリーミングサービス                                                                   |
| [ExpressRoute][21]              | オンプレミスのネットワークをクラウドに拡張するサービス                                             |
| [Firewall][22]                  | Azure Virtual Network のリソースを保護するクラウドネイティブのネットワークセキュリティ                            |
| [Functions][23]                 | イベントトリガーに呼応してコードをサーバーレスで実行するサービス                                      |
| [HDInsights][24]                | 膨大な量のデータを処理するクラウドサービス                                                   |
| [IOT Hub][25]                   | 何十億もの IOT 資産の接続、監視、管理                                                       |
| [Key Vault][26]                 | クラウドアプリケーションおよびサービスが使用する暗号化キーを保護および管理するサービス |
| [Load Balancer][27]             | アプリケーションをスケーリングし、サービスの高可用性を実現                                    |
| [Logic App][28]                 | 強力なインテグレーションソリューションの構築                                                                      |
| [Machine Learning][29]          | モデルをより早く構築しデプロイするための、エンタープライズレベルの機械学習サービス                              |
| [Network Interfaces][30]        | VM とインターネット、Azure、オンプレミスリソースとの通信を提供                                 |
| [Notification Hubs][31]         | 任意のバックエンドから任意のプラットフォームへ通知を送信できるようにするプッシュエンジン                     |
| [Public IP Address][32]         | インターネットとのインバウンド通信およびアウトバウンド接続を可能にするリソース                |
| [Redis Cache][33]               | マネージド型のデータキャッシュ                                                                                        |
| [Relay][34]                     | 企業ネットワーク内で実行されているサービスをパブリッククラウドに安全に公開                          |
| [Cognitive Search][35]          | 優れた検索エクスペリエンスを追加するためのツールを提供する、サービスとしての検索クラウドソリューション             |
| Storage                         | [BLOB][36]、[ファイル][37]、[キュー][38]、[テーブル][39]のためのストレージ                                      |
| [Stream Analytics][40]          | デバイスからの大量のデータストリーミングを調べるイベント処理エンジン                        |
| [SQL Database][41]              | クラウドの拡張性の高いリレーショナルデータベース                                                          |
| [SQL Database Elastic Pool][42] | 複数のデータベースのパフォーマンス管理                                                              |
| [Usage and Quotas][43]          | お使いの Azure の使用状況を示します。                                                                                  |
| [Virtual Machine][44]           | 仮想マシン管理サービス                                                                        |
| [Virtual Machine Scale Set][45] | 同一の VM をセットでデプロイ、管理、オートスケーリング                                                      |
| [Virtual Network][46]           | Azure リソースがお互いと、インターネットと、オープンプレミスネットワークと、安全に通信できるようにします。    |

## セットアップ

{{< site-region region="us,eu,gov,us5" >}}

### インストール

Azure CLI ツールまたは Azure ポータルを使用して、Microsoft Azure アカウントを Datadog と統合します。このインテグレーション方法は、すべての Azure クラウド (パブリック、中国、ドイツ、政府) で自動的に機能します。

以下の手順に従うと、Datadog は使用されているクラウドを自動的に検出してインテグレーションを完了します。

#### Azure CLI を使用して統合する

Azure CLI を使用して Datadog を Azure と統合するには、[Azure CLI をインストール][44]しておく必要があります。

{{< tabs >}}
{{% tab "Azure CLI v2.0" %}}

最初に、Datadog と統合する Azure アカウントにログインします。

```text
az login
```

account show コマンドを実行します。

```text
az account show
```

生成された`テナント ID` 値を [Datadog Azure インテグレーションタイル][1]の **Tenant name/ID** に入力します。

次の形式を使用して、サービスプリンシパルとなるアプリケーションを作成します。

```text
az ad sp create-for-rbac --role "Monitoring Reader" --scopes /subscriptions/{subscription_id}
```

- このコマンドは、監視するサブスクリプションに対する `monitoring reader` ロールをサービスプリンシパルに付与します。
- このコマンドによって生成された` appID `を [Datadog Azure インテグレーションタイル][1]の **Client ID** に入力する必要があります。
- 自分で選択した名前を使用する場合は、`--name <CUSTOM_NAME>` を追加します。それ以外の場合は、Azure によって一意の名前が生成されます。この名前は、セットアッププロセスでは使用されません。
- 自分で選択したパスワードを使用する場合は、`--password <CUSTOM_PASSWORD>` を追加します。それ以外の場合は、Azure によって一意のパスワードが生成されます。このパスワードは、[Datadog Azure インテグレーションタイル][1]の **Client Secret** に入力する必要があります。


[1]: https://app.datadoghq.com/account/settings#integrations/azure
{{% /tab %}}
{{% tab "Azure CLI v1.0" %}}

最初に、Datadog と統合する Azure アカウントにログインします。

```text
azure login
```

account show コマンドを実行します。

```text
az account show
```

生成された`テナント ID` 値を [Datadog Azure インテグレーションタイル][1]の **Tenant name/ID** に入力します。

名前とパスワードを作成します。

```text
azure ad sp create -n <NAME> -p <PASSWORD>
```

- `<NAME>` は使用されませんが、セットアッププロセスの一環として必要です。
- 選択した `<PASSWORD>` は、[Datadog Azure インテグレーションタイル][1]の **Client Secret** に入力する必要があります。
- このコマンドから返される`オブジェクト ID` を、次のコマンドの `<OBJECT_ID>` の代わりに使用します。

次の形式を使用して、サービスプリンシパルとなるアプリケーションを作成します。

```text
azure role assignment create --objectId <オブジェクト_ID> -o "Monitoring Reader" -c /subscriptions/<サブスクリプション_ID>/
```

- このコマンドは、監視するサブスクリプションに対する `monitoring reader` ロールをサービスプリンシパルに付与します。
- このコマンドによって生成された`サービスプリンシパル名`を [Datadog Azure インテグレーションタイル][1]の **Client ID** に入力する必要があります。
- `<SUBSCRIPTION_ID>` は監視対象の Azure サブスクリプションです。これは、`azure account show` コマンドを使用すると、またはポータルに `ID` として一覧表示されます。


[1]: https://app.datadoghq.com/account/settings#integrations/azure
{{% /tab %}}
{{% tab "Azure CLI inferiors to v1.0" %}}

最初に、Datadog と統合する Azure アカウントにログインします。

```text
azure login
```

account show コマンドを実行します。

```text
az account show
```

生成された`テナント ID` 値を [Datadog Azure インテグレーションタイル][1]の **Tenant name/ID** に入力します。

名前、ホームページ、識別子 URI、パスワードを作成します。

```text
azure ad app create --name "<NAME>" --home-page "<URL>" --identifier-uris "<URL>" --password "<PASSWORD>"
```

- `name`、`home-page`、`identifier-uris` は使用されませんが、セットアッププロセスの一環として必要です。
- 選択した `password` は、[Datadog Azure インテグレーションタイル][1]の **Client Secret** に入力する必要があります。
- このコマンドから返される `AppId` は、次のコマンドで使用します。また、[Datadog Azure インテグレーションタイル][1]の **Client ID** に入力する必要があります。

以下を使用して、サービスプリンシパルを作成します。

Azure cli < 0.10.2 の場合

```text
azure ad sp create {app-id}
```

Azure cli >= 0.10.2 の場合

```text
azure ad sp create -a {app-id}
```

- このコマンドから返される`オブジェクト ID` を、次のコマンドの `<OBJECT_ID>` の代わりに使用します。

次の形式を使用して、Active Directory アプリケーションを作成します。

```text
azure role assignment create --objectId <オブジェクト_ID> --roleName "Monitoring Reader" --subscription <サブスクリプション_ID>
```

- このコマンドは、監視するサブスクリプションに対する `monitoring reader` ロールをサービスプリンシパルに付与します。
- `<SUBSCRIPTION_ID>` は監視対象の Azure サブスクリプションです。これは、`azure account show` コマンドを使用すると、またはポータルに `ID` として一覧表示されます。


[1]: https://app.datadoghq.com/account/settings#integrations/azure
{{% /tab %}}
{{< /tabs >}}

#### Azure ポータルを使用して統合する

1. Active Directory で[アプリ登録を作成](#creating-the-app-registration)し、正しい認証情報を Datadog に渡します。
2. 監視するサブスクリプションに対する[読み取りアクセス権をアプリケーションに付与](#giving-read-permissions-to-the-application)します。

##### アプリ登録の作成

1. **Azure Active Directory** で、**App Registrations** に移動し、**New registration** をクリックします。
2. 以下の各項目を入力し、**Create** ボタンをクリックします。名前とサインオン URL は使用されませんが、セットアッププロセスで必要です。

    - 名前: `Datadog Auth`
    - サポート対象のアカウントの種類: `この組織ディレクトリのアカウントのみ (Datadog)`
    - リダイレクト URI: {{< region-param key="dd_full_site" code="true" >}}

{{< img src="integrations/azure/Azure_create_ad.png" alt="Azure でアプリを作成" popup="true" style="width:80%;" >}}

##### 読み取りアクセス許可をアプリケーションに付与する

1. 検索ボックスまたは左のサイドバーから、**サブスクリプション**に移動します。

    {{< img src="integrations/azure/subscriptions_icon.png" alt="サブスクリプションアイコン" popup="true" style="width:25%">}}

2. 監視するサブスクリプションをクリックします。
3. サブスクリプションのメニューで **Access control (IAM)** を選択し、**Add** > **Add role assignment** を選択します。

    {{< img src="integrations/azure/azure-add-role.png" alt="ロールの割り当ての追加" popup="true" style="width:80%">}}

4. **Role** には、**Monitoring Reader** を選択します。**Select** では、前の手順で作成したアプリケーションの名前を選択します。

    {{< img src="integrations/azure/azure-select-role-app.png" alt="ロールとアプリを選択" popup="true" style="width:60%">}}

5. **保存**をクリックします。
6. Datadog を使用して監視する他のサブスクリプションについても、この手順を繰り返します。**注**: Azure Lighthouse のユーザーは、顧客テナントからサブスクリプションを追加できます。

**注**: ARM によってデプロイされた VM がメトリクスを収集できるようにするには、診断を有効にする必要があります。[診断の有効化][45]を参照してください。

##### インテグレーションを完了する

1. **アプリの登録**で、作成したアプリを選択します。**アプリケーション ID** と**テナント ID** をコピーし、[Datadog Azure インテグレーションタイル][46]の **Client ID** と **Tenant ID** に貼り付けます。
2. 同じアプリで、**Manage** > **Certificates and secrets** と移動します。
3. `datadogClientSecret` という新しい **Client Secret** を追加し、**Expires** に期間を選択して **Add** をクリックします。

    {{< img src="integrations/azure/Azure_client_secret.png" alt="Azure のクライアントシークレット" popup="true" style="width:80%">}}

4. キー値が表示されたら、コピーして [Datadog Azure インテグレーションタイル][46]の **Client Secret** に貼り付け、**Install Integration** または **Update Configuration** をクリックします。

**注**: Azure コンフィギュレーションの変更が Datadog で反映されるまで、最大で 20 分ほどかかります。

### コンフィギュレーション

Azure ベースのホストのリソース収集を制限するには、Azure のインテグレーションタイルを開きます。**Configuration** タブを選択し、**App Registrations** を開きます。**Metric Collection Filters** の下のテキストボックスにタグのリストを入力します。

この `<KEY>:<VALUE>` 形式のタグリストはカンマ区切りで、メトリクスを収集する際に使用されるフィルターを定義します。`?` (1 文字) や `*` (複数文字) などのワイルドカードも使用できます。

定義されたタグのいずれかに一致する VM だけが Datadog にインポートされます。それ以外は無視されます。タグの前に `!` を追加することで、指定されたタグに一致する VM を除外することもできます。例:

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

### メトリクスの収集

インテグレーションタイルのセットアップが完了すると、メトリクスがクローラーによって収集されます。他のメトリクスを収集する場合は、以下のように、Datadog Agent を VM にデプロイします。

#### Agent のインストール

1. [Azure ポータル][47]で、**VM** > **Settings** > **Extensions** > **Add** と移動し、**Datadog Agent** を選択します。
2. **作成**をクリックし、[Datadog API キー][48]を入力して、**OK**をクリックします。

オペレーティングシステムまたは CI および CD ツールに応じた Agent のインストール方法については、ア[Datadog Agent のインストール手順][49]を参照してください。

**注**: Azure の拡張機能と併せて Datadog Agent をインストールする場合、ドメインコントローラーはご利用いただけません。

#### 検証

新しいサブスクリプションでアプリケーションから取得したメトリクスが表示されるまで数分かかる場合があります。

[Azure VM のデフォルトのダッシュボード][50]に移動し、このダッシュボードにインフラストラクチャーのデータが表示されていることを確認します。

{{< img src="integrations/azure/azure_vm_screenboard.png" alt="Azure VM のスクリーンボード" popup="true" style="width:70%">}}

### ログの収集

Azure から Datadog へログを送信する最適な方法は、Agent または DaemonSet を使うことです。一部のリソースではできない場合があります。その場合、Azure Event Hub を使いログ転送パイプラインを作成し、[Azure プラットフォームログ][57]を収集することをお勧めします。Azure プラットフォームログを Event Hub にストリーミングできないリソースには、Blob Storage 転送オプションを使用できます。

{{< tabs >}}

{{% tab "自動インストール" %}}

開始するには、以下のボタンをクリックし、Azure Portal のフォームに入力します。Datadog アカウントにアクティビティログをストリーミングするために必要な Azure リソースが、自動的にデプロイされます。

[![Azure にデプロイ][1]](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fdatadog-serverless-functions%2Fmaster%2Fazure%2Fdeploy-to-azure%2Fparent_template.json)

または、Datadog が提供する、使用できる自動スクリプトが 2 つあります。

最初のスクリプトは、アクティビティログを Datadog アカウントにストリーミングするために必要な Azure リソースを作成、構成します。これらのリソースには、アクティビティログの診断設定、Azure Functions、Event Hub ネームスペース、Event Hub が含まれます。

2 番目のスクリプトは、診断設定なしで、Event Hub と Azure Function の部分のみをデプロイするより一般的なオプションです。これは、ストリーミングソースを構成するために使用できます。いずれの場合も、Event Hub は他のストリーミングソースで使用できます。

**例:**

'westus' からアクティビティログとリソースログの両方をストリーミングする場合は、オプションのパラメーター '-ResourceGroupLocation westus' を含む最初のスクリプトを実行します (アクティビティログはサブスクリプションレベルのソースであるため、任意のリージョンでパイプラインを作成できます)。これがデプロイされると、'westus' のリソースに診断設定を追加することで、同じ Event Hub を介してリソースログを送信できます。

**注:**

このインテグレーションは、イベントを収集しません。

#### Azure から Datadog へのアクティビティログの送信

**ステップ 1:** Azure ポータルで、**Cloud Shell** に移動します。

{{< img src="integrations/azure/azure_cloud_shell.png" alt="azure cloud shell" popup="true" style="width:100%">}}

**ステップ 2:** 以下のコマンドを実行して、自動化スクリプトを Cloud Shell 環境にダウンロードします。

{{< code-block lang="powershell" filename="アクティビティログステップ 1" >}}

(New-Object System.Net.WebClient).DownloadFile("https://raw.githubusercontent.com/DataDog/datadog-serverless-functions/master/azure/eventhub_log_forwarder/activity_logs_deploy.ps1", "activity_logs_deploy.ps1")

{{< /code-block >}}

[スクリプトの内容を表示][2]することもできます。

**ステップ 3:** 以下のコマンドを実行してスクリプトを呼び出します。**`<api_key>`** を [Datadog API トークン][3]に置き換え、**`<subscription_id>`** を Azure サブスクリプション ID に置き換えます。他のオプションのパラメーターを追加して、デプロイを構成することもできます。[オプションのパラメーター](#optional-parameters)を参照してください。

{{< code-block lang="powershell" filename="アクティビティログステップ 2" >}}

./activity_logs_deploy.ps1 -ApiKey <api_key> -SubscriptionId <subscription_id> 

{{< /code-block >}}

#### Azure プラットフォームログを Datadog に送信

Azure プラットフォームログ (リソースログを含む) を送信するための一般的なソリューションの場合、Event Hub とログフォワーダーのみをデプロイすることもできます。
このパイプラインをデプロイした後、各ログソースの診断設定を作成し、Datadog にストリーミングするように構成できます。

**ステップ 1:** Azure ポータルで、**Cloud Shell** に移動します。

**ステップ 2:** 以下のコマンドを実行して、自動化スクリプトを Cloud Shell 環境にダウンロードします。

{{< code-block lang="powershell" filename="プラットフォームログステップ 1" >}}

(New-Object System.Net.WebClient).DownloadFile("https://raw.githubusercontent.com/DataDog/datadog-serverless-functions/master/azure/eventhub_log_forwarder/resource_deploy.ps1", "resource_deploy.ps1")

{{< /code-block >}}

[スクリプトの内容を表示][4]することもできます。

**ステップ 3:** 以下のコマンドを実行してスクリプトを呼び出します。**`<api_key>`** を [Datadog API トークン][3]に置き換え、**`<subscription_id>`** を Azure サブスクリプション ID に置き換えます。他のオプションのパラメーターを追加して、デプロイを構成することもできます。[オプションのパラメーター](#optional-parameters)を参照してください。

{{< code-block lang="powershell" filename="プラットフォームログステップ 2" >}}

./resource_deploy.ps1 -ApiKey <api_key> -SubscriptionId <subscription_id> 

{{< /code-block >}}

**ステップ 4:** Datadog にログを送信するすべての Azure リソースの診断設定を作成します。これらの診断設定を構成して、作成したばかりの Event Hub へのストリーミングを開始します。

**注:** リソースは同じ Azure リージョン内の Event Hub にのみストリーミングできるため、リソースログをストリーミングするリージョンごとにステップ 2 を繰り返す必要があります。

**注:** プラットフォームログパイプライン用にデプロイされたすべての Azure リソースには、デフォルト名に追加された Resource-Group-Location が含まれています。例: 'datadog-eventhub-westus'。ただし、パラメーターをオーバーライドすれば、この規則を変更できます。

#### オプションパラメーター

**注:** パラメーターをカスタマイズするときは、カスタムリソース名が一意であることを確認してください。リソース名が他の Azure リソースのリスト内にまだ存在していないことを確認します。

| -Flag `<Default Parameter>`                                         | 説明                                                                                                                                                           |
|---------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| -DatadogSite `<datadoghq.com>`                                      | このフラグを別の Datadog サイトを使用してパラメーターとして追加して、Datadog インスタンスをカスタマイズします。Datadog サイト: {{< region-param key="dd_site" code="true" >}}    |
| -Environment `<AzureCloud>`                                         | このフラグをパラメーターとして追加して、Azure 独立クラウドのストレージを管理します。追加のオプションは、`AzureChinaCloud`、`AzureGermanCloud`、`AzureUSGovernment` です。 |
| -ResourceGroupLocation `<westus2>`                                  | 更新された Azure-region を使用してこのフラグを追加することにより、Azure リソースグループとリソースがデプロイされるリージョンを選択できます。                     |
| -ResourceGroupName `<datadog-log-forwarder-rg>`                     | 更新されたパラメーターを使用してこのフラグを追加することにより、Azure リソースグループの名前をカスタマイズします。                                                                        |
| -EventhubNamespace `<datadog-ns-4c6c53b4-1abd-4798-987a-c8e671a5c25e>` | 更新済みのパラメーターでこのフラグを追加し、Azure Event Hub の名前空間をカスタマイズします。デフォルトで、`datadog-ns-<globally-unique-ID>` が生成されています。                              |
| -EventhubName `<datadog-eventhub>`                                  | 更新されたパラメーターを使用してこのフラグを追加することにより、Azure Event Hub の名前をカスタマイズします。                                                                             |
| -FunctionAppName `<datadog-functionapp-1435ad2f-7c1f-470c-a4df-bc7289d8b249>`                            | 更新済みのパラメーターでこのフラグを追加し、Azure 関数の名前をカスタマイズします。デフォルトで、`datadog-functionapp-<globally-unique-ID>` が生成されています。                                                                         |
| -FunctionName `<datadog-function>`                                  | 更新されたパラメーターを使用してこのフラグを追加することにより、Azure Function の名前をカスタマイズします。                                                                              |
| -DiagnosticSettingName `<datadog-activity-logs-diagnostic-setting>` | 更新されたパラメーターを使用してこのフラグを追加することにより、Azure 診断設定の名前をカスタマイズします。**(アクティビティログの送信にのみ関連)**                      |

インストールエラーが発生した場合は、[トラブルシューティングセクション](#troubleshooting)を参照すると、一般的なエラーケースをすばやく解決できます。

[1]: https://aka.ms/deploytoazurebutton
[2]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/eventhub_log_forwarder/activity_logs_deploy.ps1
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/eventhub_log_forwarder/resource_deploy.ps1
{{% /tab %}}

{{% tab "手動インストール" %}}

Azure から Datadog にログを送信するには、以下の手順に従ってください。

1. [Azure Event Hub][1] を作成。
2. Datadog-Azure [関数を Event Hub トリガー][2]でセットアップし、Datadog へログを転送します。
3. [診断設定][3]を作成し、Azure サービスが Event Hub へログをストリーミングするように構成する。

以下の手順では、Azure Portal を使用した基本的な初期設定について説明します。手順はすべて、Azure ドキュメントを参照し、CLI、Powershell、リソーステンプレートで実行できます。

#### Azure Event Hub

[Azure Event Hub][1] を作成：

以下の手順に従って、新しいネームスペースを作成するか、既存のネームスペースに新しいイベントハブを追加します。

1. Azure ポータルで、**Event Hubs** 概要に移動し、**Add** をクリックします。
2. 名前、価格帯、サブスクリプション、リソースグループを入力します。
3. 場所を選択します。**注**: Event Hub とログの送信元となるリソースは同じ場所になければなりません。アクティビティログや他のアカウント全体のログソースは、その限りではありません。
4. スループット単位、アベイラビリティーゾーン、および自動インフレに必要なオプションを選択します。
5. **作成**をクリックします。

イベントハブをイベントハブネームスペースに追加します。

1. Azure ポータルで、新規または既存のネームスペースに移動します。
2. **+ Event Hub** をクリックします。
3. 名前、パーティション数、およびメッセージ保持に必要なオプションを選択します。
4. **作成**をクリックします。

#### Datadog Azure 関数

Datadog-Azure [関数を Event Hub トリガー][2]でセットアップし、Datadog へログを転送します。

新しい関数アプリを作成するか、既存の関数アプリを使用して、次のセクションにスキップします。

1. Azure ポータルで、**Function Apps** > **Functions** と移動し、**Add** をクリックします。
2. サブスクリプション、リソースグループ、地域を選択し、関数の名前を入力します。
3. **Publish to Code, Runtime stack to Node.js, and Version to 12 LTS** を選択します。
4. **Next:Hosting** をクリックします。
5. ストレージアカウント、オペレーティングシステム、プランタイプを選択します。
6. 確認し、新しい関数アプリを作成します。
7. デプロイが完了するのを待ちます。

イベントハブトリガーテンプレートを使用して、関数アプリに新しい関数を追加します。

1. 関数アプリリストから新規/既存の関数アプリを選択します。
2. 関数メニューから **Functions** を選択し、**Add** をクリックします。
3. テンプレートメニューから [Azure イベントハブトリガー][2]を選択し、**New** をクリックします。
4. イベントハブ接続用のネームスペースとイベントハブを選択し、**OK** をクリックします。
5. **Create Function** をクリックします。

イベントハブトリガーを Datadog にポイントします。

1. 関数ビューから新しいイベントハブトリガーを選択します。
2. 開発者側メニューの **Code + Test** をクリックします。
3. [Datadog-Azure 関数コード][4]を index.js ファイルに追加します。
4. 関数アプリのコンフィギュレーションタブで `DD_API_KEY` 環境変数を作成して API キーを追加するか、22 行目の `<DATADOG_API_KEY>` を置き換えて関数コードにコピーします。
5. 関数を保存します。
6. トリガーの **Integration** をクリックしてから **Azure Event Hubs** をクリックし、次の設定を確認します。
    a. Event Parameter Name が `eventHubMessages` に設定されている。
    b. Event Hub Cardinality が `Many` に設定されている。
    c. Event Hub Data Type が空のままになっている。
7. **保存**をクリックします。
8. 関数を実行し、[Datadog ログエクスプローラー][5]でテストメッセージをチェックし、設定が正しいことを確認します。

#### アクティビティログ

1. Azure ポータルで、**Activity Log** に移動します。
2. **Diagnostic Settings** をクリックします。
3. **Add diagnostic setting** をクリックします。
4. カテゴリの詳細で、Datadog に送るログのカテゴリを選択します。
5. 送信先情報で、**Stream to an event hub** を選択します。
6. イベントハブのネームスペースと名前を設定します。これらは、ネームスペーストリガーの作成に使用したネームスペースネームのスペースおよび名前と一致する必要があります。
7. 共有アクセスキーを設定します。このキーは送信アクセスまたは管理アクセスで構成しなければなりません。
8. **保存**をクリックします。
9. [Datadog ログエクスプローラー][5]でこのリソースからのログをチェックして、正しくセットアップできたことを確認します。

#### リソースログ

[診断設定][3]を作成し、Azure サービスが Event Hub へログを転送するように構成する。

1. Azure ポータルで、Datadog に送るログのリソースへ移動します。
2. リソースブレードの監視セクションで、**Diagnostic settings** をクリックします。
3. **Add diagnostic setting** をクリックします。
4. カテゴリの詳細で、Datadog に送るログのカテゴリを選択します。
5. 送信先情報で、**Stream to an event hub** を選択します。
6. イベントハブのネームスペースと名前を設定します。これらは、ネームスペーストリガーの作成に使用したネームスペースネームのスペースおよび名前と一致する必要があります。
7. 共有アクセスキーを設定します。このキーは送信アクセスまたは管理アクセスで構成しなければなりません。
8. **保存**をクリックします。
9. [Datadog ログエクスプローラー][5]でこのリソースからのログをチェックして、正しくセットアップできたことを確認します。


[1]: https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-create
[2]: https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-event-hubs-trigger
[3]: https://docs.microsoft.com/en-us/azure/azure-monitor/platform/diagnostic-settings
[4]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/activity_logs_monitoring/index.js
[5]: https://app.datadoghq.com/logs
{{% /tab %}}

{{% tab "Blob Storage" %}}

すべての Azure App Service からログを収集するには、主に以下の手順に従います。

1. [Azure ポータル][2]、[Azure ストレージエクスプローラー][3]、[Azure CLI][4]、または [Powershell][5] から [Azure BLOB ストレージ][1]をセットアップします。
2. BLOB ストレージから Datadog へログを転送する [Datadog-Azure 関数をセットアップ](#create-a-new-azure-blob-storage-function)します。
3. [ログを BLOB ストレージに転送する Azure App Service を構成][6]します。

#### 新しい Azure Blob ストレージ関数を作成する

Azure 関数に精通していない場合は、[Azure Portal で初めての関数を作成する][7]を参照してください。

1. [Azure ポータル][2]で、**Function Apps** > **Functions** と移動し、**Add** をクリックします。
2. サブスクリプション、リソースグループ、地域を選択し、関数の名前を入力します。
3. **Publish Code** とランタイムスタック **Node.js** を選択します。
4. **Next:Hosting** をクリックします。
5. ストレージアカウントとプランの種類を選択し、オペレーティングシステム **Windows** を選択します。
6. 確認し、新しい関数を **Create** します。
7. デプロイが完了したら、関数アプリリストから新しい関数を選択します。
8. 関数を**ポータル内**で作成し、Blog Storage トリガーテンプレート (**More templates…**から選択) を使用することを選択します。必要に応じて、`Microsoft.Azure.WebJobs.Extensions.EventHubs` 拡張をインストールします。
9. **Storage account connection** を選択するか追加し、**Create** を作成します。
10. `index.js` ファイルを作成し、[Datadog-Azure 関数コード][8]を追加します (`<DATADOG_API_KEY>` はご使用の [Datadog API キー][9]に置き換えます)。
11. 関数を保存します。
12. **統合**で、**BLOB パラメーター名**を `blobContent` に設定し、**保存**をクリックします。
13. [Datadog ログエクスプローラー][10]でログをチェックして、正しくセットアップできたことを確認します。


[1]: https://azure.microsoft.com/en-us/services/storage/blobs/
[2]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-portal
[3]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-storage-explorer
[4]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-cli
[5]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-powershell
[6]: https://docs.microsoft.com/en-us/learn/modules/store-app-data-with-azure-blob-storage/
[7]: https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-first-azure-function
[8]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/blobs_logs_monitoring/index.js
[9]: https://app.datadoghq.com/organization-settings/api-keys
[10]: https://app.datadoghq.com/logs
{{% /tab %}}
{{< /tabs >}}

[44]: https://azure.microsoft.com/en-us/documentation/articles/xplat-cli-install
[45]: https://docs.datadoghq.com/ja/integrations/faq/azure-troubleshooting/#enable-diagnostics
[46]: https://app.datadoghq.com/account/settings#integrations/azure
[47]: https://portal.azure.com
[48]: https://app.datadoghq.com/organization-settings/api-keys
[49]: https://app.datadoghq.com/account/settings#agent
[50]: https://app.datadoghq.com/screen/integration/azure_vm
[52]: https://docs.datadoghq.com/ja/events/
[57]: https://docs.microsoft.com/en-us/azure/azure-monitor/platform/platform-logs-overview
{{< /site-region >}}

{{< site-region region="us3" >}}

### 前提条件

#### 必要なアクセス許可
Azure Datadog インテグレーションをセットアップするには、Azure サブスクリプションの **Owner** アクセスが必要です。セットアップを開始する前に、適切なアクセス権限があることをご確認ください。

#### SSO コンフィギュレーション

_(オプション)_: Azure で新しい Datadog オーガニゼーションを作成するプロセスで、[シングルサインオン (SSO)](#saml-sso-configuration) を構成できます。後で SSO を構成することも可能です。初めの作成時に SSO を構成するには、まず Datadog Enterprise Gallery アプリを作成します。

### インストール {#installation-us3}

Azure インテグレーションの構成には、Azure に Datadog リソースの作成が必要です。このリソースは、Datadog オーガニゼーションと Azure サブスクリプションの間の接続またはリンクを表します。Datadog で監視する各サブスクリプションに、1 つのDatadog リソースが必要です。

Azure に Datadog リソースを作成するには、2 つのオプションがあります。

1. 既存の Datadog オーガニゼーションへリンク。より一般的なアクションです。まだリンクしていない Azure サブスクリプションを監視するよう Datadog オーガニゼーションを構成するには、このオプションを使用します。このアクションは、Datadog の請求プランに影響しません。

2. 新しい Datadog オーガニゼーションを作成。このフローは、あまり一般的ではありません。まだ Datadog オーガニゼーションをお持ちでなく、Azure Marketplace を通じて有料プランを始める場合はこのオプションを使用します。新しい Datadog オーガニゼーションを作成し、請求プランを選択して、関連する Azure サブスクリプションをリンクして監視できます。
**注**: Azure の “Create a new Datadog organization” オプションを使用すると、トライアルをご利用いただけません。無料トライアルを開始するには、まず [Datadog の  US3 サイトでトライアルオーガニゼーションを作成][6]し、リンクフローを使用して監視するサブスクリプションを追加します。

Datadog リソースを作成すると、関連するサブスクリプションのデータ収集が開始します。このリソースを使用して Datadog を構成、管理、デプロイするには、[ガイド][7]で詳細をご確認ください。

#### Datadog リソースの作成

Azure サブスクリプションのモニタリングを開始するには、[Azure の Datadog サービスページ][8] へ移動し、新しい Datadog リソースを作成するオプションを選択します。
{{< img src="integrations/azure/azure-us3-dd-service.png" alt="Azure US3 Datadog サービス" responsive="true" style="width:90%;">}}

“Link Azure subscription to an existing Datadog organization” または “Create a new Datadog organization” を選択します。リンクの方がより一般的なアクションです。まだリンクしていない Azure サブスクリプションのモニタリングの構成に、このオプションを使用します。Datadog をまだご利用でなく、有料プランを新規で開始したいお客様のみ “Create” フローを選択してください。

{{< img src="integrations/azure/azure-us3-create-dd-resource1.png" alt="Azure US3 Datadog リソースの作成" responsive="true" style="width:90%;">}}

**注**: Azure ポータルを通じて作成された新しい Datadog オーガニゼーションの請求は、Azure の請求書に自動的に統合されます。該当する場合、この使用はオーガニゼーションの [MACC][1] にカウントされます。

### コンフィギュレーション {#configuration-us3}

**注**: 以下の手順は、Azure Portal を使用したインテグレーションの構成プロセスの概要です。[Azure CLI for Datadog][5] を使用すると、この手順を完了できます。 

{{< tabs >}}
{{% tab "Link" %}}

#### ベーシック {#basics-link}

既存の Datadog オーガニゼーションへのリンクを選択すると、Datadog リソースを作成するためのフォームがポータルに表示されます。
{{< img src="integrations/azure/azure-us3-link-sub.png" alt="Link Azure サブスクリプションを既存の Datadog オーガニゼーションにリンク" responsive="true" style="width:90%;">}}

次の値を指定します。

| プロパティ             | 説明                                                                                                                                                                                                                  |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| サブスクリプション         | Datadog で監視する Azure サブスクリプション。Datadog リソースはこのサブスクリプションに存在します。オーナーのアクセス権限が必要です。                                                                                       |
| リソースグループ       | 新しいリソースグループを作成するか、既存のものを使用します。[リソースグループ][1]は、Azure ソリューションの関連リソースを格納するコンテナです。                                                                                 |
| Resource name        | Datadog リソースの名前を指定します。推奨される名前の付け方は、次のようになります。`subscription_name-datadog_org_name`                                                                                                         |
| 場所             | 場所は West US 2 で、Datadog の US3 サイトが Azure でホストされている場所です。これは、Datadog の使用に何の影響も与えません。すべての [Datadog サイト][2]と同様に、US3 サイトは完全に SaaS で、すべての Azure リージョンのモニタリングと、他のクラウドプロバイダーおよびオンプレミスホストをサポートします。 |
| Datadog オーガニゼーション | 認証ステップが完了すると、Datadog 組織名がリンク先の Datadog 組織の名前に設定されます。Datadog サイトには US3 が設定されます。                                                                                                                                |

**Link to Datadog organization** をクリックして Datadog の認証ウィンドウを開き、Datadog にサインインします。

デフォルトで Azure は現在の Datadog オーガニゼーションを Datadog リソースにリンクします。別のオーガニゼーションをリンクする場合は、認証ウィンドウで該当するオーガニゼーションを選択します。

{{< img src="integrations/azure/azure-us3-select-org.png" alt="Azure US3 Datadog オーガニゼーションの選択" responsive="true" style="width:90%;">}}

oauth フローが完了したら、Datadog オーガニゼーション名が正しいことを確認します。

基本のコンフィギュレーションが完了したら、**Next: Metrics and logs** を選択します。


[1]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/overview#resource-groups
[2]: https://docs.datadoghq.com/ja/getting_started/site/
{{% /tab %}}
{{% tab "Create" %}}

#### ベーシック {#basics-create}

新しい Datadog オーガニゼーションの作成を選択すると、Datadog リソースおよび 新しい Datadog オーガニゼーションの両方を作成するためのフォームがポータルに表示されます。
{{< img src="integrations/azure/azure-us3-create-dd-resource2.png" alt="Azure US3 Datadog リソースの作成" responsive="true" style="width:90%;">}}

次の値を指定します。

| プロパティ             | 説明                                                                                                                                                                                                                  |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| サブスクリプション         | Datadog で監視する Azure サブスクリプション。Datadog リソースはこのサブスクリプションに存在します。オーナーのアクセス権限が必要です。                                                                                       |
| リソースグループ       | 新しいリソースグループを作成するか、既存のものを使用します。[リソースグループ][1]は、Azure ソリューションの関連リソースを格納するコンテナです。                                                                                 |
| Resource name        | Datadog リソースの名前。この名前が新しい Datadog オーガニゼーションに割り当てられます。                                                                                                                                    |
| 場所             | 場所は West US 2 で、Datadog の US3 サイトが Azure でホストされている場所です。これは、Datadog の使用に何の影響も与えません。すべての [Datadog サイト][2]と同様に、US3 サイトは完全に SaaS で、すべての Azure リージョンのモニタリングと、他のクラウドプロバイダーおよびオンプレミスホストをサポートします。 |
| Datadog オーガニゼーション | Datadog のオーガニゼーション名はリソース名に、Datadog サイトは US3 に設定されています。                                                                                                                                |
| 料金プラン         | 利用可能な Datadog 料金プランのリスト。プライベートオファーがある場合は、このドロップダウンに表示されます。                                                                                                                 |
| 請求期間         | 月間。                                                                                                                                                                                                                      |

[1]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/overview#resource-groups
[2]: https://docs.datadoghq.com/ja/getting_started/site/
{{% /tab %}}

{{< /tabs >}}

#### Metrics and logs

##### メトリクスの収集

デフォルトで、サブスクリプション内のすべての Azure リソースのメトリクスが自動的に収集されます。すべてのメトリクスを Datadog に送信するために必要な操作はありません。

###### メトリクスの送信のタグルール

オプションで、リソースにアタッチされた Azure タグを使用して、Azure VM および App Service Plans のメトリクス収集を制限します。

- 仮想マシン、仮想マシンのスケーリングセット、`include` タグの付いた App Service Plans は Datadog にメトリクスを送信します。
- 仮想マシン、仮想マシンのスケーリングセット、`exclude` タグの付いた App Service Plans は Datadog にメトリクスを送信しません。
- 包含および除外ルールの間で競合がある場合は、除外が優先されます。
- 他のリソースのメトリクス収集を制限するオプションはありません。

##### ログの収集

Azure から Datadog に送信できるログには、2 種類あります。

**サブスクリプションレベルのログ** は、[コントロールプレーン][2]におけるリソースの運用に関するインサイトを提供します。アクティビティログを使用して、書き込み作業の何、誰、いつを決定します (PUT、POST、DELETE)。

サブスクリプションレベルのログを Datadog に送信するには、"Send subscription activity logs" を選択します。このオプションを有効にしない場合、サブスクリプションレベルのログは Datadog に送信されません。

**Azure リソースログ** は、[データプレーン][2]における Azure リソースの運用に関するインサイトを提供します。たとえば、Key Vault からシークレットを取得する、データベースへのリクエストを作成する、などはデータプレーンの運用です。リソースログのコンテンツは、Azure のサービスおよびリソースタイプにより異なります。

Azure リソースログを Datadog に送信するには、"Send Azure resource logs for all defined resources" を選択します。Azure リソースログの種類は、[Azure 監視リソースログのカテゴリー][4]に一覧があります。このオプションが有効な場合、サブスクリプションで作成された新しいリソースを含むすべてのリソースログが Datadog に送信されます。

オプションで、Azure リソースタグを使用して Datadog にログを送信する Azure リソースを絞り込むことができます。

###### ログ送信のタグルール

- `include` タグのある Azure リソースは Datadog にログを送信します。
- `exclude` タグのある Azure リソースは Datadog にログを送信しません。
- 包含および除外ルールの間で競合がある場合は、除外が優先されます。

たとえば、下記のスクリーンショットは、`Datadog = True` とタグ付けされた仮想マシン、仮想マシンスケールセット、アプリサービスプランのみがメトリクスおよびログを Datadog に送信するというタグルールを示したものです。

{{< img src="integrations/azure/azure-us3-create-dd-resource3.png" alt="Azure US3 Datadog リソースログの作成" responsive="true" style="width:90%;">}}

メトリクスおよびログの構成が完了したら、**Next: Single sign-on** を選択します。

#### Single sign-on

(オプション) ID プロバイダーとして Azure Active Directory を使用している場合は、Azure ポータルから Datadog へのシングルサインオンを有効にします。

Datadog リソースを既存の Datadog オーガニゼーションにリンクしている場合、このステップではシングルサインオンをセットアップできません。Datadog リソースの作成後にシングルサインオンをセットアップしてください。詳しくは、[シングルサインオンの再構成][3]をご参照ください。

{{< img src="integrations/azure/azure-us3-create-dd-resource4.png" alt="Azure US3 Datadog リソースシングルサインオンの作成" responsive="true" style="width:90%;">}}

Azure Active Directory を通じてシングルサインオンを設定するには、"Enable single sign-on through Azure Active Directory" のチェックボックスを有効にします。

Azure ポータルが、Azure Active Directory から適切な Datadog アプリケーションを取得します。ここでは、Datadog リソースの作成プロセス開始以前に作成された Datadog Enterprise アプリが利用可能になります。

使用する Datadog アプリケーションを選択します。まだ作成していない場合は、[Azure AD Enterprise ギャラリーアプリの作成](#saml-sso-configuration)ドキュメントをご参照ください。

{{< img src="integrations/azure/azure-us3-create-dd-resource5.png" alt="Azure US3 シングルサインオンの有効化" responsive="true" style="width:90%;">}}

**Next: Tags** を選択します。

#### タグ {#tags-us3}

(オプション) 新しい Datadog リソースにカスタムタグをセットアップします。Datadog リソースに適用するタグの名前と値のペアを指定します。

{{< img src="integrations/azure/azure-us3-create-dd-resource6.png" alt="Azure US3 Datadog リソースの作成 タグの追加" responsive="true" style="width:90%;">}}

タグの追加が終了したら、**Next: Review + create** を選択します。

#### 確認 + 作成

選択した項目と利用規約を確認します。検証が完了したら、“Create” を選択します。その後、Azure は Datadog リソースをデプロイします。このリソースは、サブスクリプションを Datadog のアカウントにリンクし、インテグレーションを継続的に管理するための多くの機能を有効にします。詳細と手順については、[Azure ポータルで Datadog を管理するためのガイド][9]を参照してください。

{{< img src="integrations/azure/azure-us3-create-dd-resource7.png" alt="Azure US3 Datadog リソースの作成 承認" responsive="true" style="width:90%;">}}

デプロイプロセスが完了したら、"Go to Resource" を選択して Datadog リソースを確認します。

{{< img src="integrations/azure/azure-us3-deploy-complete.png" alt="Azure US3 Datadog デプロイの完了" responsive="true" style="width:90%;">}}

### Datadog へのアクセス

Datadog リソースを作成したら、関連付けられた Datadog オーガニゼーションにアクセスします。オーガニゼーションを新規作成したか、既存のオーガニゼーションにリンクしたかによって、アクセス方法が異なります。

{{< tabs >}}
{{% tab "作成" %}}

#### SSO 

新しい Datadog オーガニゼーションを作成してSSO を構成した場合、Datadog リソースブレードを使用してログインします。これは、Azure の Datadog リソースから Datadog オーガニゼーションに直接ログインする SAML リンクです。

{{< img src="integrations/azure/azure-us3-access-dd.png" alt="Azure US3 Datadog へのアクセス" responsive="true" style="width:90%;">}}

#### SSO なし

新しい Datadog オーガニゼーションを作成してSSO を構成しなかった場合、概要ブレードの Datadog オーガニゼーションリンクを使用して Datadog のパスワードを設定します。Datadog のパスワードを設定すると、このリンクが[標準の Datadog URL][1] になります。


[1]: http://us3.datadoghq.com
{{% /tab %}}
{{% tab "リンク" %}}

既存の Datadog オーガニゼーションにリンクした場合は、これまでと同様の方法で Datadog オーガニゼーションにアクセスします。

{{% /tab %}}
{{< /tabs >}}

### SAML SSO コンフィギュレーション

Datadog リソース内で Security Assertion Markup Language (SAML) シングルサインオン (SSO) を使用するには、エンタープライズアプリケーションをセットアップする必要があります。

エンタープライズアプリケーションを追加するには、グローバル管理者、クラウドアプリケーション管理者、アプリケーション管理者、またはサービスプリンシパルのオーナーのロールが必要です。

次の手順を使用して、エンタープライズアプリケーションを設定します。
1. Azure ポータルで "Azure Active Directory" を選択します。
2. 左側のパネルで "Enterprise applications" を選択します。
3. "New Application" を選択します。
4. "Add from the gallery" で Datadog を検索します。検索結果から選択して "Add" を選択します。

    {{< img src="integrations/azure/azure-us3-dd-sso-add-app.png" alt="ギャラリーから Datadog アプリケーションを追加する" responsive="true" style="width:90%;">}}

5. アプリが作成できたら、サイドパネルの "Properties" へ移動します。"User assignment required?" を No にして "Save" を選択します。

    {{< img src="integrations/azure/azure-us3-dd-sso-app-prop.png" alt="ユーザー割り当てが必要 - No に設定" responsive="true" style="width:90%;">}}

6. サイドパネルの "Single sign-on" に移動し、SAML を選択します。

    {{< img src="integrations/azure/azure-us3-dd-sso.png" alt="SSO - SAML" responsive="true" style="width:90%;">}}

7. 尋ねられたら "Yes" を選択し、シングルサインオンの設定を保存します。

    {{< img src="integrations/azure/azure-us3-basic-saml.png" alt="Azure US3 Basic SAML コンフィギュレーション" responsive="true" style="width:90%;">}}

8. シングルサインオンの設定が完了しました。

[1]: https://docs.microsoft.com/en-us/azure/marketplace/azure-consumption-commitment-benefit
[2]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/control-plane-and-data-plane
[3]: https://docs.microsoft.com/en-us/azure/partner-solutions/datadog/manage#reconfigure-single-sign-on
[4]: https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/resource-logs-categories
[5]: https://docs.microsoft.com/en-us/cli/azure/datadog?view=azure-cli-latest
[6]: https://us3.datadoghq.com/signup
[7]: https://docs.datadoghq.com/ja/integrations/guide/azure-portal/
[8]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Datadog%2Fmonitors
[9]: https://docs.datadoghq.com/ja/integrations/guide/azure-portal/
{{< /site-region >}}

## 収集データ

### メトリクス

すべての標準 Azure Monitor メトリクスと[一意の Datadog 生成メトリクス][47]。

詳しいメトリクス一覧については、[概要セクション](#overview)で該当する Azure サービスを選択してください。

### イベント

Azure インテグレーションは、自動的に Azure サービス健全性イベントを収集します。これを Datadog で表示するには、[イベントエクスプローラー][48]に移動し、"Azure Service Health" ネームスペースをフィルタリングします。 

### サービスのチェック

Azure インテグレーションには、サービスのチェック機能は含まれません。

### タグ

Azure インテグレーションメトリクス、イベント、およびサービスチェックは、次のタグを受け取ります。

| インテグレーション                             | ネームスペース                                   | Datadog タグキー                                                                                                                                                                                                 |
|-----------------------------------------|---------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| すべての Azure インテグレーション                  | すべて                                         | `cloud_provider`、`region`、`kind`、`type`、`name`、`resource_group`、`tenant_name`、`subscription_name`、`subscription_id`、`status`（該当する場合）                                                            |
| Azure VM インテグレーション                   | `azure.vm.*`                                | `host`、`size`、`operating_system`、`availability_zone`                                                                                                                                                          |
| Azure App Service Plans                 | `azure.web_serverfarms.*`                   | `per_site_scaling`、`plan_size`、`plan_tier`、`operating_system`                                                                                                                                                 |
| Azure App Services Web Apps & Functions | `azure.app_services.*`、`azure.functions.*` | `operating_system`、`server_farm_id`、`reserved`、`usage_state`、`fx_version`（linux ウェブアプリのみ）、`php_version`、`dot_net_framework_version`、`java_version`、`node_version`、`python_version`                |
| Azure SQL DB                            | `azure.sql_servers_databases.*`             | `license_type`、`max_size_mb`、`server_name`、`role`、`zone_redundant`<br>レプリケーションリンクのみ:  `state` `primary_server_name` `primary_server_region` `secondary_server_name` `secondary_server_region` |
| Azure Load Balancer                     | `azure.network_loadbalancers.*`             | `sku_name`                                                                                                                                                                                                       |
| Azure Usage and Quota                   | `azure.usage.*`                             | `usage_category`、`usage_name`                                                                                                                                                                                   |

## トラブルシューティング

[Azure トラブルシューティング][49]をご参照ください。

さらにヘルプが必要な場合は、[Datadog サポート][50]までお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/integrations/azure_analysis_services/
[2]: https://docs.datadoghq.com/ja/integrations/azure_api_management/
[3]: https://docs.datadoghq.com/ja/integrations/azure_app_services/
[4]: https://docs.datadoghq.com/ja/integrations/azure_app_service_environment/
[5]: https://docs.datadoghq.com/ja/integrations/azure_app_service_plan/
[6]: https://docs.datadoghq.com/ja/integrations/azure_application_gateway/
[7]: https://docs.datadoghq.com/ja/integrations/azure_automation/
[8]: https://docs.datadoghq.com/ja/integrations/azure_batch/
[9]: https://docs.datadoghq.com/ja/integrations/azure_cognitive_services/
[10]: https://docs.datadoghq.com/ja/integrations/azure_container_instances/
[11]: https://docs.datadoghq.com/ja/integrations/azure_container_service/
[12]: https://docs.datadoghq.com/ja/integrations/azure_cosmosdb/
[13]: https://docs.datadoghq.com/ja/integrations/azure_customer_insights/
[14]: https://docs.datadoghq.com/ja/integrations/azure_data_explorer/
[15]: https://docs.datadoghq.com/ja/integrations/azure_data_factory/
[16]: https://docs.datadoghq.com/ja/integrations/azure_data_lake_analytics/
[17]: https://docs.datadoghq.com/ja/integrations/azure_data_lake_store/
[18]: https://docs.datadoghq.com/ja/integrations/azure_db_for_mariadb/
[19]: https://docs.datadoghq.com/ja/integrations/azure_event_grid/
[20]: https://docs.datadoghq.com/ja/integrations/azure_event_hub/
[21]: https://docs.datadoghq.com/ja/integrations/azure_express_route/
[22]: https://docs.datadoghq.com/ja/integrations/azure_firewall/
[23]: https://docs.datadoghq.com/ja/integrations/azure_functions/
[24]: https://docs.datadoghq.com/ja/integrations/azure_hd_insight/
[25]: https://docs.datadoghq.com/ja/integrations/azure_iot_hub/
[26]: https://docs.datadoghq.com/ja/integrations/azure_key_vault/
[27]: https://docs.datadoghq.com/ja/integrations/azure_load_balancer/
[28]: https://docs.datadoghq.com/ja/integrations/azure_logic_app/
[29]: https://docs.datadoghq.com/ja/integrations/azure_machine_learning_services/
[30]: https://docs.datadoghq.com/ja/integrations/azure_network_interface/
[31]: https://docs.datadoghq.com/ja/integrations/azure_notification_hubs/
[32]: https://docs.datadoghq.com/ja/integrations/azure_public_ip_address/
[33]: https://docs.datadoghq.com/ja/integrations/azure_redis_cache/
[34]: https://docs.datadoghq.com/ja/integrations/azure_relay/
[35]: https://docs.datadoghq.com/ja/integrations/azure_search/
[36]: https://docs.datadoghq.com/ja/integrations/azure_blob_storage/
[37]: https://docs.datadoghq.com/ja/integrations/azure_file_storage/
[38]: https://docs.datadoghq.com/ja/integrations/azure_queue_storage/
[39]: https://docs.datadoghq.com/ja/integrations/azure_table_storage/
[40]: https://docs.datadoghq.com/ja/integrations/azure_stream_analytics/
[41]: https://docs.datadoghq.com/ja/integrations/azure_sql_database/
[42]: https://docs.datadoghq.com/ja/integrations/azure_sql_elastic_pool/
[43]: https://docs.datadoghq.com/ja/integrations/azure_usage_and_quotas/
[44]: https://docs.datadoghq.com/ja/integrations/azure_vm/
[45]: https://docs.datadoghq.com/ja/integrations/azure_vm_scale_set/
[46]: https://docs.datadoghq.com/ja/integrations/azure_virtual_networks/
[47]: https://www.datadoghq.com/blog/datadog-generated-metrics-azure/
[48]: https://app.datadoghq.com/event/explorer
[49]: https://docs.datadoghq.com/ja/integrations/faq/azure-troubleshooting/
[50]: https://docs.datadoghq.com/ja/help/