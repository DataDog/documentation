---
aliases:
  - /ja/guides/azure/
  - /ja/integrations/azure_storage/
categories:
  - cloud
  - azure
  - log collection
ddtype: クローラー
dependencies: []
description: インスタンスや多数の Azure サービスからメトリクスを収集
doc_link: 'https://docs.datadoghq.com/integrations/azure/'
further_reading:
  - link: 'https://www.datadoghq.com/blog/how-to-monitor-microsoft-azure-vms/'
    tag: ブログ
    text: Microsoft Azure VM の監視方法
  - link: 'https://docs.datadoghq.com/integrations/faq/azure-troubleshooting/'
    tag: FAQ
    text: Azure のトラブルシューティング
  - link: 'https://docs.datadoghq.com/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/'
    tag: FAQ
    text: クラウドインスタンスに Datadog Agent をインストールした方がよいのはなぜですか
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

* Agent をインストールして、またはインストールしないで、Azure VM からメトリクスを取得できます。
* Azure VM に Azure 固有の情報 (場所など) をタグ付けできます。
* 他のサービスのメトリクスを取得できます。Application Gateway、App Service (Web および Mobile)、Batch サービス、イベントハブ、IOT Hub、Logic App、Redis Cache、サーバーファーム (App Service プラン)、SQL データベース、SQL 可変プール、仮想マシンスケールセットなどが含まれます。

関連するインテグレーションは、次のとおりです。

| 統合                     | 説明                                                                                               |
|---------------------------------|-----------------------------------------------------------------------------------------------------------|
| [Analysis Services][41]         | クラウドでデータモデルを提供するサービス                                                         |
| [API Management][42]            | API を公開、セキュリティ保護、変換、管理、監視するサービス                                      |
| [App Service][7]                | Web、モバイル、API、およびビジネスロジックアプリケーションをデプロイおよびスケーリングするためのサービス                      |
| [App Service Environment][70]   | App Service のアプリを大規模かつ安全に実行するための環境を提供するサービス               |
| [App Service Plan][69]          | Web アプリを実行するためのコンピューティングリソースのセット                                                          |
| [Application Gateway][56]       | Web アプリケーションへのトラフィックを管理できる Web トラフィックロードバランサー                  |
| [Automation][43]                | 複数の環境を横断して自動化と構成管理を提供するサービス                 |
| [Batch Service][8]              | マネージド型のタスクスケジューラーおよびプロセッサー                                                                      |
| [Cognitive Services][44]        | AI やデータサイエンスの知識なしでアプリケーションの構築を可能にする API、SDK、サービス       |
| [Container Instances][45]       | 基底のインフラストラクチャーをプロビジョニングおよび管理する必要なく、コンテナをデプロイするサービス     |
| [Container Service][52]         | 実稼働準備が整った Kubernetes、DC/OS、または Docker Swarm クラスター                                            |
| [Cosmos DB][46]                 | ドキュメント、キー/値、ワイドカラム、グラフデータベースなどをサポートするデータベースサービス                   |
| [Customer Insights][47]         | オーガニゼーションが複数のデータセットを結合して、360 度の包括的な顧客ビューを構築できるようにするサービス                |
| [Data Factory][48]              | データの保管・移動・処理サービスを、自動化されたデータパイプラインとして構築するサービス       |
| [Data Lake Analytics][49]       | ビッグデータを簡略化する分析ジョブサービス                                                        |
| [Data Lake Store][50]           | ビッグデータ分析を可能にする無制限のデータレイク                                                     |
| [Database for MariaDB][51]      | エンタープライズ対応のフルマネージド型コミュニティ MariaDB データベースを提供するサービス                       |
| [Event Grid][54]                | 公開/サブスクライブモデルを使用して均一なイベント消費を可能にするイベントルーティングサービス       |
| [Event Hub][9]                  | マネージド型の大規模データストリーミングサービス                                                                   |
| [ExpressRoute][57]              | オンプレミスのネットワークをクラウドに拡張するサービス                                             |
| [HDInsights][55]                | 膨大な量のデータを処理するクラウドサービス                                                   |
| [IOT Hub][10]                   | 何十億もの IOT 資産の接続、監視、管理                                                       |
| [Key Vault][53]                 | クラウドアプリケーションおよびサービスが使用する暗号化キーを保護および管理するサービス |
| [Load Balancer][58]             | アプリケーションをスケーリングし、サービスの高可用性を実現                                    |
| [Logic App][11]                 | 強力なインテグレーションソリューションの構築                                                                      |
| [Network Interfaces][59]        | VM とインターネット、Azure、オンプレミスリソースとの通信を提供                                 |
| [Notification Hubs][61]         | 任意のバックエンドから任意のプラットフォームへ通知を送信できるようにするプッシュエンジン                     |
| [Public IP Address][60]         | インターネットとのインバウンド通信およびアウトバウンド接続を可能にするリソース                |
| [Redis Cache][12]               | マネージド型のデータキャッシュ                                                                                        |
| [Relay][62]                     | 企業ネットワーク内で実行されているサービスをパブリッククラウドに安全に公開                          |
| [Search][63]                    | 優れた検索エクスペリエンスを追加するためのツールを提供する、サービスとしての検索クラウドソリューション             |
| Storage                         | [BLOB][65]、[ファイル][66]、[キュー][67]、[テーブル][68]のためのストレージ                                      |
| [Stream Analytics][64]          | デバイスからの大量のデータストリーミングを調べるイベント処理エンジン                        |
| [SQL Database][14]              | クラウドの拡張性の高いリレーショナルデータベース                                                          |
| [SQL Database Elastic Pool][15] | 複数のデータベースのパフォーマンス管理                                                              |
| [Virtual Machine][16]           | 仮想マシン管理サービス                                                                        |
| [Virtual Machine Scale Set][17] | 同一の VM をセットでデプロイ、管理、オートスケーリング                                                      |

## セットアップ
### インストール

Azure CLI ツールまたは Azure ポータルを使用して、Microsoft Azure アカウントを Datadog と統合します。このインテグレーション方法は、すべての Azure クラウド (パブリック、中国、ドイツ、政府) で自動的に機能します。以下の手順に従うと、Datadog は、使用されているクラウドを自動的に検出してインテグレーションを完了します。

#### Azure CLI を使用して統合する

Azure CLI を使用して Datadog を Azure と統合するには、[Azure CLI をインストール][6]しておく必要があります。

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
az ad sp create-for-rbac --role reader --scopes /subscriptions/{subscription_id}
```

* このコマンドは、監視するサブスクリプションに対する `reader` ロールをサービスプリンシパルに付与します。
* このコマンドによって生成された` appID `を [Datadog Azure インテグレーションタイル][1]の **Client ID** に入力する必要があります。
* 自分で選択した名前を使用する場合は、`--name <CUSTOM_NAME>` を追加します。それ以外の場合は、Azure によって一意の名前が生成されます。この名前は、セットアッププロセスでは使用されません。
* 自分で選択したパスワードを使用する場合は、`--password <CUSTOM_PASSWORD>` を追加します。それ以外の場合は、Azure によって一意のパスワードが生成されます。このパスワードは、[Datadog Azure インテグレーションタイル][1]の **Client Secret** に入力する必要があります。

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

* `<NAME>` は使用されませんが、セットアッププロセスの一環として必要です。
* 選択した `<PASSWORD>` は、[Datadog Azure インテグレーションタイル][1]の **Client Secret** に入力する必要があります。
* このコマンドから返される`オブジェクト ID` を、次のコマンドの `<OBJECT_ID>` の代わりに使用します。

次の形式を使用して、サービスプリンシパルとなるアプリケーションを作成します。
```text
azure role assignment create --objectId <OBJECT_ID> -o Reader -c /subscriptions/<SUBSCRIPTION_ID>/
```

* このコマンドは、監視するサブスクリプションに対する `reader` ロールをサービスプリンシパルに付与します。
* このコマンドによって生成された`サービスプリンシパル名`を [Datadog Azure インテグレーションタイル][1]の **Client ID** に入力する必要があります。
* `<SUBSCRIPTION_ID>` は監視対象の Azure サブスクリプションです。これは、`azure account show` コマンドを使用すると、またはポータルに `ID` として一覧表示されます。

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

* `name`、`home-page`、`identifier-uris` は使用されませんが、セットアッププロセスの一環として必要です。
* 選択した `password` は、[Datadog Azure インテグレーションタイル][1]の **Client Secret** に入力する必要があります。
* このコマンドから返される `AppId` は、次のコマンドで使用します。また、[Datadog Azure インテグレーションタイル][1]の **Client ID** に入力する必要があります。

以下を使用して、サービスプリンシパルを作成します。

Azure cli < 0.10.2 の場合
```text
azure ad sp create {app-id}
```

Azure cli >= 0.10.2 の場合
```text
azure ad sp create -a {app-id}
```

* このコマンドから返される`オブジェクト ID` を、次のコマンドの `<OBJECT_ID>` の代わりに使用します。

次の形式を使用して、Active Directory アプリケーションを作成します。
```text
azure role assignment create --objectId <OBJECT_ID> --roleName Reader --subscription <SUBSCRIPTION_ID>
```

* このコマンドは、監視するサブスクリプションに対する `reader` ロールをサービスプリンシパルに付与します。
* `<SUBSCRIPTION_ID>` は監視対象の Azure サブスクリプションです。これは、`azure account show` コマンドを使用すると、またはポータルに `ID` として一覧表示されます。


[1]: https://app.datadoghq.com/account/settings#integrations/azure

{{% /tab %}}
{{< /tabs >}}

#### Azure ポータルを使用して統合する

1. Active Directory で [Web アプリケーションを作成し](#creating-the-web-application)、正しい資格情報を Datadog に渡します。
2. 監視するサブスクリプションに対する[読み取りアクセス権をこのアプリケーションに付与](##giving-read-permissions-to-the-application)します。

##### Web アプリケーションを作成する

1. **Azure Active Directory** で、**アプリの登録**に移動し、**新規登録**をクリックします。

2. 以下の各項目を入力し、**作成**ボタンをクリックします。**注**: 名前とサインオン URL は使用されませんが、セットアッププロセスで必要です。
  * 名前: `Datadog Auth`
  * サポート対象のアカウントの種類: `この組織ディレクトリのアカウントのみ (Datadog)`
  * リダイレクト URI - オプション - `https://app.datadoghq.com`

{{< img src="integrations/azure/Azure_create_ad.png" alt="Azure create app"   style="width:80%;" >}}

##### 読み取りアクセス許可をアプリケーションに付与する

1. 検索ボックスまたは左のサイドバーから、**サブスクリプション**に移動します。

    {{< img src="integrations/azure/subscriptions_icon.png" alt="subscriptions icon"   style="width:25%">}}

2. 監視するサブスクリプションをクリックします。
3. サブスクリプションのメニューで**アクセス制御 (IAM)**を選択し、次に**追加** -> **ロールの割り当ての追加**を選択します。

    {{< img src="integrations/azure/azure-add-role.png" alt="Add Role Assignment"   style="width:80%">}}

4. **役割**では、閲覧者を選択します。**選択**では、前の手順で作成したアプリケーションの名前を選択します。

    {{< img src="integrations/azure/azure-select-role-app.png" alt="Select Role and App"   style="width:60%">}}

5. **保存**をクリックします。
6. Datadog を使用して監視する他のサブスクリプションについても、この手順を繰り返します。**注**: Azure Lighthouse のユーザーは、顧客テナントからサブスクリプションを追加できます。

**注**: ARM によってデプロイされた VM がメトリクスを収集できるようにするには、診断を有効にする必要があります。[診断の有効化][3]を参照してください。

##### インテグレーションを完了する

1. **アプリの登録**で、作成したアプリを選択します。**アプリケーション ID** と**テナント ID** をコピーし、[Datadog Azure インテグレーションタイル][1]の **Client ID** と **Tenant ID** に貼り付けます。

2. 同じアプリで、**管理** -> **証明書とシークレット**に移動します。
3. `datadogClientSecret` という新しいクライアントシークレットを追加し、有効期限の期間を選択し、**追加**をクリックします。

    {{< img src="integrations/azure/Azure_client_secret.png" alt="azure client secret"   style="width:80%">}}

3. キー値が表示されたら、コピーして [Datadog Azure インテグレーションタイル][1]の **Client Secret** に貼り付け、**Install Integration** または **Update Configuration** をクリックします。

### コンフィグレーション

オプションで、**Optionally filter to VMs with tag** にタグを入力することで、Datadog にプルされる Azure VM を制限できます。

この `<KEY>:<VALUE>` 形式のタグのカンマ区切りリストは、メトリクスを収集する際に使用されるフィルターを定義します。`?` (1 文字の場合) や `*` (複数文字の場合) などのワイルドカードも使用できます。定義されたタグのいずれかに一致する VM だけが Datadog にインポートされます。それ以外は無視されます。タグの前に `!` を追加することで、指定されたタグに一致する VM を除外することもできます。たとえば、以下のとおりです。

```
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

### メトリクスの収集

インテグレーションタイルのセットアップが完了すると、メトリクスがクローラーによって収集されます。他のメトリクスを収集する場合は、以下のように、Datadog Agent を VM にデプロイします。

#### Agent のインストール

1. [Azure ポータル][2]で、VM -> 設定 -> 拡張機能 -> 追加と移動し、Datadog Agent を選択します。
2. **作成**をクリックし、[Datadog API キー][37]を入力して、**OK**をクリックします。

オペレーティングシステムまたは CICD ツールに応じた Agent のインストール方法については、アプリ内の [Datadog Agent のインストール手順][18]を参照してください。

#### 検証

新しいサブスクリプションでアプリケーションから取得したメトリクスが表示されるまで数分かかる場合があります。

[Azure VM のデフォルトのダッシュボード][5]に移動し、このダッシュボードにインフラストラクチャーのデータが表示されていることを確認します。

{{< img src="integrations/azure/azure_vm_screenboard.png" alt="azure vm screenboard"   style="width:70%">}}

### ログの収集

{{< tabs >}}
{{% tab "Event Hub" %}}

App Service 以外のすべての Azure サービスからログを収集するには、主に以下の手順に従います。

1. [Azure ポータル][2]、[Azure CLI][3]、または [Powershell][4] から [Azure イベントハブ][1]を作成します。
2. イベントハブから Datadog へログを転送する [Datadog-Azure 関数をセットアップ](#create-a-new-azure-function)します。
3. [ログをイベントハブに転送する Azure サービスを構成][5]します。

#### 新しい Azure イベントハブ関数を作成する

Azure 関数に精通していない場合は、[Azure Portal で初めての関数を作成する][6]を参照してください。

1. [Azure ポータル][2]で、Function Apps -> 関数 に移動し、**新しい関数** をクリックします。
2. 関数を**ポータル内**で作成し、イベントハブトリガーテンプレート (**その他のテンプレート**で選択) を使用することを選択します。必要に応じて、`Microsoft.Azure.WebJobs.Extensions.EventHubs` 拡張をインストールします。
3. 関数の**名前**を入力します。
4. **イベントハブ接続**を選択または追加します。
5. 右側のメニューで、JavaScript 言語を選択します。
6. ログの取得元の**イベントハブコンシューマーグループ**と**イベントハブ名**を選択します。
7. **作成**をクリックします。
8. `index.js` ファイルを作成し、[Datadog-Azure 関数コード][7]を追加します (`<DATADOG_API_KEY>` はご使用の [Datadog API キー][8]に置き換えます)。
9. 関数を保存します。
10. **統合**で、**イベントパラメーター名**を `eventHubMessages` に設定し、**保存**をクリックします。
11. [Datadog ログエクスプローラー][9]でログをチェックして、正しくセットアップできたことを確認します。

[1]: https://azure.microsoft.com/en-us/services/event-hubs
[2]: https://docs.microsoft.com/en-gb/azure/event-hubs/event-hubs-create
[3]: https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-quickstart-cli
[4]: https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-quickstart-powershell
[5]: https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitor-stream-monitoring-data-event-hubs
[6]: https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-first-azure-function
[7]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/activity_logs_monitoring/index.js
[8]: https://app.datadoghq.com/account/settings#api
[9]: https://app.datadoghq.com/logs

{{% /tab %}}

{{% tab "Blob Storage" %}}

すべての Azure App Service からログを収集するには、主に以下の手順に従います。

1. [Azure ポータル][2]、[Azure ストレージエクスプローラー][6]、[Azure CLI][3]、または [Powershell][4] から [Azure BLOB ストレージ][1]をセットアップします。
2. BLOB ストレージから Datadog へログを転送する [Datadog-Azure 関数をセットアップ](#create-a-new-azure-blob-storage-function)します。
3. [ログを BLOB ストレージに転送する Azure App Service を構成][5]します。

#### 新しい Azure Blob ストレージ関数を作成する

Azure 関数に精通していない場合は、[Azure Portal で初めての関数を作成する][7]を参照してください。

1. [Azure ポータル][2]で、Function Apps -> 関数 に移動し、**新しい関数** をクリックします。
2. 関数を**ポータル内**で作成し、Blob ストレージトリガーテンプレート (**その他のテンプレート**で選択) を使用することを選択します。必要に応じて、`Microsoft.Azure.WebJobs.Extensions.Storage` 拡張をインストールします。
3. 関数の**名前**を入力します。
4. **ストレージアカウント接続**を選択または追加します。
5. 右側のメニューで、JavaScript 言語を選択します。
6. **作成**をクリックします。
7. `index.js` ファイルを作成し、[Datadog-Azure 関数コード][8]を追加します (`<DATADOG_API_KEY>` はご使用の [Datadog API キー][9]に置き換えます)。
8. 関数を保存します。
9. **統合**で、**BLOB パラメーター名**を `blobContent` に設定し、**保存**をクリックします。
10. [Datadog ログエクスプローラー][10]でログをチェックして、正しくセットアップできたことを確認します。

[1]: https://azure.microsoft.com/en-us/services/storage/blobs/
[2]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-portal
[3]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-cli
[4]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-powershell
[5]: https://docs.microsoft.com/en-us/learn/modules/store-app-data-with-azure-blob-storage/
[6]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-storage-explorer
[7]: https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-first-azure-function
[8]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/blobs_logs_monitoring/index.js
[9]: https://app.datadoghq.com/account/settings#api
[10]: https://app.datadoghq.com/logs

{{< tabs >}}
{{% tab "Files" %}}

## 収集データ
### メトリクス
{{< get-metrics-from-git "azure" >}}


### イベント
Azure インテグレーションは、すべての Azure イベントを Datadog の[イベントストリーム][30]に送信します。

### サービスのチェック
Azure インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][40]までお問合せください。

## テンプレートソース: ファイル (Auto-conf)

テンプレートをローカルファイルとして保存する方法はわかりやすく、外部サービスやオーケストレーションプラットフォームを必要としません。この方法の欠点は、テンプレートを変更、追加、または削除するたびに、Agent コンテナを再起動する必要があるという点です。

[1]: https://app.datadoghq.com/account/settings#integrations/azure
[2]: https://portal.azure.com
[3]: https://docs.datadoghq.com/ja/integrations/faq/azure-troubleshooting/#enable-diagnostics
[5]: https://app.datadoghq.com/screen/integration/azure_vm
[6]: https://azure.microsoft.com/en-us/documentation/articles/xplat-cli-install
[7]: https://docs.datadoghq.com/ja/integrations/azure_app_services
[8]: https://docs.datadoghq.com/ja/integrations/azure_batch
[9]: https://docs.datadoghq.com/ja/integrations/azure_event_hub
[10]: https://docs.datadoghq.com/ja/integrations/azure_iot_hub
[11]: https://docs.datadoghq.com/ja/integrations/azure_logic_app
[12]: https://docs.datadoghq.com/ja/integrations/azure_redis_cache
[14]: https://docs.datadoghq.com/ja/integrations/azure_sql_database
[15]: https://docs.datadoghq.com/ja/integrations/azure_sql_elastic_pool
[16]: https://docs.datadoghq.com/ja/integrations/azure_vm
[17]: https://docs.datadoghq.com/ja/integrations/azure_vm_scale_set
[18]: https://app.datadoghq.com/account/settings#agent
[19]: https://github.com/DataDog/dogweb/blob/prod/integration/azure/azure_metadata.csv
[30]: https://docs.datadoghq.com/ja/graphing/event_stream/
[31]: https://docs.microsoft.com/en-gb/azure/event-hubs/event-hubs-create
[32]: https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-quickstart-cli
[33]: https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-quickstart-powershell
[34]: https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitor-stream-monitoring-data-event-hubs
[39]: https://azure.microsoft.com/en-us/services/event-hubs
[40]: https://docs.datadoghq.com/ja/help
[41]: https://docs.datadoghq.com/ja/integrations/azure_analysis_services
[42]: https://docs.datadoghq.com/ja/integrations/azure_api_management
[43]: https://docs.datadoghq.com/ja/integrations/azure_automation
[44]: https://docs.datadoghq.com/ja/integrations/azure_cognitive_services
[45]: https://docs.datadoghq.com/ja/integrations/azure_container_instances
[46]: https://docs.datadoghq.com/ja/integrations/azure_cosmosdb
[47]: https://docs.datadoghq.com/ja/integrations/azure_customer_insights
[48]: https://docs.datadoghq.com/ja/integrations/azure_data_factory
[49]: https://docs.datadoghq.com/ja/integrations/azure_data_lake_analytics
[50]: https://docs.datadoghq.com/ja/integrations/azure_data_lake_store
[51]: https://docs.datadoghq.com/ja/integrations/azure_db_for_mariadb
[52]: https://docs.datadoghq.com/ja/integrations/azure_container_service
[53]: https://docs.datadoghq.com/ja/integrations/azure_key_vault
[54]: https://docs.datadoghq.com/ja/integrations/azure_event_grid
[55]: https://docs.datadoghq.com/ja/integrations/azure_hd_insight
[56]: https://docs.datadoghq.com/ja/integrations/azure_application_gateway
[57]: https://docs.datadoghq.com/ja/integrations/azure_express_route
[58]: https://docs.datadoghq.com/ja/integrations/azure_load_balancer
[59]: https://docs.datadoghq.com/ja/integrations/azure_network_interface
[60]: https://docs.datadoghq.com/ja/integrations/azure_public_ip_address
[61]: https://docs.datadoghq.com/ja/integrations/azure_notification_hubs
[62]: https://docs.datadoghq.com/ja/integrations/azure_relay
[63]: https://docs.datadoghq.com/ja/integrations/azure_search
[64]: https://docs.datadoghq.com/ja/integrations/azure_stream_analytics
[65]: https://docs.datadoghq.com/ja/integrations/azure_blob_storage
[66]: https://docs.datadoghq.com/ja/integrations/azure_file_storage
[67]: https://docs.datadoghq.com/ja/integrations/azure_queue_storage
[68]: https://docs.datadoghq.com/ja/integrations/azure_table_storage
[69]: https://docs.datadoghq.com/ja/integrations/azure_app_service_plan
[70]: https://docs.datadoghq.com/ja/integrations/azure_app_service_environment


{{< get-dependencies >}}