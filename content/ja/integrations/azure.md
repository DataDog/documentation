---
aliases:
  - /ja/guides/azure/
  - /ja/integrations/azure_storage/
categories:
  - cloud
  - azure
  - log collection
ddtype: crawler
dependencies: []
description: インスタンスや多数の Azure サービスからメトリクスを収集
doc_link: 'https://docs.datadoghq.com/integrations/azure/'
further_reading:
  - link: 'https://www.datadoghq.com/blog/how-to-monitor-microsoft-azure-vms/'
    tag: ブログ
    text: Microsoft Azure VM の監視方法
  - link: 'https://docs.datadoghq.com/integrations/faq/azure-troubleshooting/'
    tag: よくあるご質問
    text: Azure のトラブルシューティング
  - link: 'https://docs.datadoghq.com/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/'
    tag: よくあるご質問
    text: クラウドインスタンスに Datadog Agent をインストールするメリットは何ですか？
git_integration_title: azure
has_logo: true
integration_title: Microsoft Azure
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: azure
public_title: Datadog-Microsoft Azure インテグレーション
short_description: インスタンスや多数の Azure サービスからメトリクスを収集
version: '1.0'
---
## 概要

Microsoft Azure に接続すると、以下のことができます。

-   Agent をインストールして、またはインストールしないで、Azure VM からメトリクスを取得できます。
-   Azure VM に Azure 固有の情報 (場所など) をタグ付けできます。
-   他のサービスのメトリクスを取得できます。Application Gateway、App Service (Web および Mobile)、Batch サービス、イベントハブ、IOT Hub、Logic App、Redis Cache、サーバーファーム (App Service プラン)、SQL データベース、SQL 可変プール、仮想マシンスケールセットなどが含まれます。

<div class="alert alert-warning">
Datadog の Azure インテグレーションは、<a href="https://docs.microsoft.com/en-us/azure/azure-monitor/platform/metrics-supported">Azure Monitor からすべてのメトリクス</a>を収集するように構築されています。Datadog では継続的にドキュメントを更新してすべてのサブインテグレーションを表示できるように努めていますが、新しいメトリクスやサービスがクラウドサービスから次々にリリースされるため、インテグレーション一覧が追い付かないことがあります。<br><code>azure.*.status</code> および <code>azure.*.count</code> メトリクスは、Datadog により Azure Resource Health から生成されています。<a href="https://docs.datadoghq.com/integrations/faq/azure-status-metric">このメトリクスに関する詳細は、こちらでご確認いただけます</a>。
</div>

| 統合                     | 説明                                                                                               |
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

### インストール

Azure CLI ツールまたは Azure ポータルを使用して、Microsoft Azure アカウントを Datadog と統合します。このインテグレーション方法は、すべての Azure クラウド (パブリック、中国、ドイツ、政府) で自動的に機能します。以下の手順に従うと、Datadog は、使用されているクラウドを自動的に検出してインテグレーションを完了します。

#### Azure CLI を使用して統合する

Azure CLI を使用して Datadog を Azure と統合するには、[Azure CLI をインストール][47]しておく必要があります。

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
2. 監視するサブスクリプションに対する[読み取りアクセス権をこのアプリケーションに付与](##giving-read-permissions-to-the-application)します。

##### アプリ登録の作成

1. **Azure Active Directory** で、**アプリの登録**に移動し、**新規登録**をクリックします。
2. 以下の各項目を入力し、**作成**ボタンをクリックします。**注**: 名前とサインオン URL は使用されませんが、セットアッププロセスで必要です。

- 名前: `Datadog Auth`
- サポート対象のアカウントの種類: `この組織ディレクトリのアカウントのみ (Datadog)`
- リダイレクト URI: `https://app.datadoghq.com`、Datadog EU サイトを使用する場合は、`https://app.datadoghq.eu`

{{< img src="integrations/azure/Azure_create_ad.png" alt="Azure でアプリを作成" popup="true" style="width:80%;" >}}

##### 読み取りアクセス許可をアプリケーションに付与する

1. 検索ボックスまたは左のサイドバーから、**サブスクリプション**に移動します。

    {{< img src="integrations/azure/subscriptions_icon.png" alt="サブスクリプションアイコン" popup="true" style="width:25%">}}

2. 監視するサブスクリプションをクリックします。
3. サブスクリプションのメニューで**アクセス制御 (IAM)**を選択し、次に**追加** -> **ロールの割り当ての追加**を選択します。

    {{< img src="integrations/azure/azure-add-role.png" alt="ロールの割り当ての追加" popup="true" style="width:80%">}}

4. **Role** では、 _Monitoring Reader_ を選択します。**Select** では、前の手順で作成したアプリケーションの名前を選択します。

    {{< img src="integrations/azure/azure-select-role-app.png" alt="ロールとアプリを選択" popup="true" style="width:60%">}}

5. **保存**をクリックします。
6. Datadog を使用して監視する他のサブスクリプションについても、この手順を繰り返します。**注**: Azure Lighthouse のユーザーは、顧客テナントからサブスクリプションを追加できます。

**注**: ARM によってデプロイされた VM がメトリクスを収集できるようにするには、診断を有効にする必要があります。[診断の有効化][48]を参照してください。

##### インテグレーションを完了する

1. **App Registrations** で、作成したアプリを選択します。**Application ID** と **Tenant ID** をコピーし、[Datadog Azure インテグレーションタイル][46]の **Client ID** と **Tenant ID** に貼り付けます。
2. 同じアプリで、**Manage** -> **Certificates and secrets** と移動します。
3. `datadogClientSecret` という新しい _Client Secret_ を追加し、 _Expires_ を選択し、**Add** をクリックします。

    {{< img src="integrations/azure/Azure_client_secret.png" alt="Azure のクライアントシークレット" popup="true" style="width:80%">}}

4. キー値が表示されたら、コピーして [Datadog Azure インテグレーションタイル][49]の **Client Secret** に貼り付け、**Install Integration** または **Update Configuration** をクリックします。

### コンフィギュレーション

オプションで、**Optionally filter to VMs with tag** にタグを入力することで、Datadog にプルされる Azure VM を制限できます。

この `<KEY>:<VALUE>` 形式のタグのカンマ区切りリストは、メトリクスを収集する際に使用されるフィルターを定義します。`?` (1 文字の場合) や `*` (複数文字の場合) などのワイルドカードも使用できます。定義されたタグのいずれかに一致する VM だけが Datadog にインポートされます。それ以外は無視されます。タグの前に `!` を追加することで、指定されたタグに一致する VM を除外することもできます。たとえば、以下のとおりです。

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

### メトリクスの収集

インテグレーションタイルのセットアップが完了すると、メトリクスがクローラーによって収集されます。他のメトリクスを収集する場合は、以下のように、Datadog Agent を VM にデプロイします。

#### Agent のインストール

1. [Azure ポータル][47]で、 _VM -> Settings -> Extensions -> Add_ と移動し、Datadog Agent を選択します。
2. **作成**をクリックし、[Datadog API キー][51]を入力して、**OK**をクリックします。

オペレーティングシステムまたは CICD ツールに応じた Agent のインストール方法については、アプリ内の [Datadog Agent のインストール手順][52]を参照してください。

**注**: Azure の拡張機能と併せて Datadog Agent をインストールする場合、ドメインコントローラーはご利用いただけません。

#### 検証

新しいサブスクリプションでアプリケーションから取得したメトリクスが表示されるまで数分かかる場合があります。

[Azure VM のデフォルトのダッシュボード][53]に移動し、このダッシュボードにインフラストラクチャーのデータが表示されていることを確認します。

{{< img src="integrations/azure/azure_vm_screenboard.png" alt="Azure VM のスクリーンボード" popup="true" style="width:70%">}}

### ログの収集

Azure から Datadog へログを送信する最適な方法は、Agent または DaemonSet を使うことです。一部のリソースではできない場合があります。その場合、Azure Event Hub を使いログ転送パイプラインを作成し、[Azure プラットフォームログ][54]を収集することをお勧めします。Azure プラットフォームログを Event Hub にストリーミングできないリソースには、Blob Storage 転送オプションを使用できます。

{{< tabs >}}
{{% tab "Event Hub" %}}

Azure から Datadog にログを送信するには、以下の手順に従ってください。

1. [Azure Event Hub][1] を作成。
2. Datadog-Azure [関数を Event Hub トリガー][2]でセットアップし、Datadog へログを転送します。
3. [診断設定][3]を作成し、Azure サービスが Event Hub へログをストリーミングするように構成する。

以下の手順では、Azure Portal を使用した基本的な初期設定について説明します。手順はすべて、Azure ドキュメントを参照し、CLI、Powershell、リソーステンプレートで実行できます。

#### Azure Event Hub

[Azure Event Hub][1] を作成：

1. Azure ポータルで、*Event Hubs* 概要に移動し、**Add** をクリックします。
2. 名前、価格帯、サブスクリプション、リソースグループを入力します。
3. 場所を選択します。**注**: Event Hub とログの送信元となるリソースは同じ場所になければなりません。アクティビティログや他のアカウント全体のログソースは、その限りではありません。
4. Kafka、ゾーン冗長性、スループット、自動インフレのオプションを設定します。
5. **作成**をクリックします。

#### Datadog-Azure 関数

Datadog-Azure [関数を Event Hub トリガー][2]でセットアップし、Datadog へログを転送します。

1. Azure ポータルで、*Function Apps -> Functions* と移動し、**Add** をクリックします。
2. サブスクリプション、リソースグループ、地域を選択し、関数の名前を入力します。
3. **Publish Code and Runtime stack Node.js** を選択します。
4. **Next:Hosting** をクリックします。
5. ストレージアカウントとプランの種類を選択し、**Operating System Windows** を選択します。
6. 確認し、新しい関数を作成します。
7. デプロイが完了したら、関数アプリリストから新しい関数を選択します。
8. 関数をポータル内で作成し、**More templates…** にある [Event Hub trigger][2]テンプレートを使用することを選択します。必要に応じて、`Microsoft.Azure.WebJobs.Extensions.EventHubs` 拡張をインストールします。
9. Event Hub 接続、コンシューマーグループ、ログ取得元の名前を選択するか追加し、**Create** をクリックします。
10. `index.js` ファイルを作成し、[Datadog-Azure 関数コード][4]を追加します。
11. 環境変数 `DD_API_KEY` を作成し、[Datadog API キー][5]を値として加えます。
12. 関数を保存します。
13. Integrate で、次の設定を確認します。<br>
    a. Event Parameter Name は `eventHubMessages` と設定されます。<br>
    b. Event Hub Cardinality は `Many` と設定されます。<br>
    c. Event Hub Data Type は `Default (Json)` と設定されます。<br>
    **注**: このオプションが標準エディタで利用できない場合は、高度なエディタを使い `dataType` に関する設定を手動ですべて削除します。この変更は標準エディタには反映されないかもしれませんが、問題ではありません。
14. **保存**をクリックします。
15. 関数を実行し、[Datadog ログエクスプローラー][6]でテストメッセージをチェックし、設定が正しいことを確認します。

#### 診断設定

[診断設定][3]を作成し、Azure サービスが Event Hub へログを転送するように構成する。

1. Azure ポータルで、Datadog に送るログのリソースへ移動します。
2. リソースブレードの監視セクションで、**Diagnostic settings** をクリックします。
3. **Add diagnostic setting** をクリックします。
4. カテゴリの詳細で、Datadog に送るログのカテゴリを選択します。
5. 送信先情報で、**Stream to an event hub** を選択します。
6. Event Hub ネームスペースと名前を設定します。これらは Event Hub ネームスペースと前のセクションの手順 9 で定義されたバインディングにある名前と一致しなければなりません。
7. 共有アクセスキーを設定します。このキーは送信アクセスまたは管理アクセスで構成しなければなりません。
8. **保存**をクリックします。
9. [Datadog ログエクスプローラー][6]でこのリソースからのログをチェックして、正しくセットアップできたことを確認します。


[1]: https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-create
[2]: https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-event-hubs-trigger
[3]: https://docs.microsoft.com/en-us/azure/azure-monitor/platform/diagnostic-settings
[4]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/activity_logs_monitoring/index.js
[5]: https://app.datadoghq.com/account/settings#api
[6]: https://app.datadoghq.com/logs
{{% /tab %}}

{{% tab "Blob Storage" %}}

すべての Azure App Service からログを収集するには、主に以下の手順に従います。

1. [Azure ポータル][2]、[Azure ストレージエクスプローラー][3]、[Azure CLI][4]、または [Powershell][5] から [Azure BLOB ストレージ][1]をセットアップします。
2. BLOB ストレージから Datadog へログを転送する [Datadog-Azure 関数をセットアップ](#create-a-new-azure-blob-storage-function)します。
3. [ログを BLOB ストレージに転送する Azure App Service を構成][6]します。

#### 新しい Azure Blob ストレージ関数を作成する

Azure 関数に精通していない場合は、[Azure Portal で初めての関数を作成する][7]を参照してください。

1. [Azure ポータル][2]で、 _Function Apps -> Functions_ と移動し、**Add** をクリックします。
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
[9]: https://app.datadoghq.com/account/settings#api
[10]: https://app.datadoghq.com/logs
{{% /tab %}}
{{< /tabs >}}

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure" >}}


### イベント

Azure インテグレーションは、すべての Azure イベントを Datadog の[イベントストリーム][56]に送信します。

### サービスのチェック

Azure インテグレーションには、サービスのチェック機能は含まれません。

### タグ

Azure インテグレーションメトリクス、イベント、およびサービスチェックは、次のタグを受け取ります。

| インテグレーション                                           | ネームスペース                                   | Datadog タグキー                                                                                                                                                                                                 |
|-------------------------------------------------------|---------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| すべての Azure インテグレーション                                | すべて                                         | `cloud_provider`、`region`、`kind`、`type`、`name`、`resource_group`、`tenant_name`、`subscription_name`、`subscription_id`、`status`（該当する場合）                                                            |
| Azure VM インテグレーション                                 | `azure.vm.*`                                | `host`、`size`、`operating_system`、`availability_zone`                                                                                                                                                          |
| Azure App Service Plans                | `azure.web_serverfarms.*`                   | `per_site_scaling`、`plan_size`、`plan_tier`、`operating_system`                                                                                                                                                 |
| Azure App Services Web Apps & Functions | `azure.app_services.*`、`azure.functions.*` | `operating_system`、`server_farm_id`、`reserved`、`usage_state`、`fx_version`（linux ウェブアプリのみ）、`php_version`、`dot_net_framework_version`、`java_version`、`node_version`、`python_version`                |
| Azure SQL DB                 | `azure.sql_servers_databases.*`             | `license_type`、`max_size_mb`、`server_name`、`role`、`zone_redundant`<br>レプリケーションリンクのみ:  `state` `primary_server_name` `primary_server_region` `secondary_server_name` `secondary_server_region` |
| Azure Load Balancer                    | `azure.network_loadbalancers.*`             | `sku_name`                                                                                                                                                                                                       |
| Azure Usage and Quota                   | `azure.usage.*`                             | `usage_category`、`usage_name`                                                                                                                                                                                   |

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][57]までお問合せください。

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
[47]: https://azure.microsoft.com/en-us/documentation/articles/xplat-cli-install
[48]: https://docs.datadoghq.com/ja/integrations/faq/azure-troubleshooting/#enable-diagnostics
[49]: https://app.datadoghq.com/account/settings#integrations/azure
[50]: https://portal.azure.com
[51]: https://app.datadoghq.com/account/settings#api
[52]: https://app.datadoghq.com/account/settings#agent
[53]: https://app.datadoghq.com/screen/integration/azure_vm
[54]: https://docs.microsoft.com/en-us/azure/azure-monitor/platform/platform-logs-overview
[55]: https://github.com/DataDog/dogweb/blob/prod/integration/azure/azure_metadata.csv
[56]: https://docs.datadoghq.com/ja/events/
[57]: https://docs.datadoghq.com/ja/help/