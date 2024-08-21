---
description: Datadog Azure インテグレーションを手動でセットアップする手順
further_reading:
- link: https://docs.datadoghq.com/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: Documentation
  text: クラウドインスタンスに Datadog Agent をインストールした方がよいのはなぜですか
- link: https://docs.datadoghq.com/integrations/guide/azure-portal/
  tag: Documentation
  text: Azure Portal の Datadog
- link: https://www.datadoghq.com/blog/azure-government-monitoring-datadog/
  tag: ブログ
  text: Datadog で Azure Government を監視する
- link: https://www.datadoghq.com/blog/azure-container-apps/
  tag: ブログ
  text: Datadog で Azure Container Apps を監視する
- link: https://www.datadoghq.com/blog/how-to-monitor-microsoft-azure-vms/
  tag: ブログ
  text: Microsoft Azure VM の監視方法
- link: https://www.datadoghq.com/blog/azure-app-service-datadog-serverless-view/
  tag: ブログ
  text: Datadog サーバーレスビューで Azure App Service を確認する
title: Azure インテグレーション手動セットアップガイド
---

## 概要

Use this guide to manually set up the [Datadog Azure integration][1] through an app registration with read permissions to the monitored subscriptions.

**All sites**: All Datadog sites can use the steps on this page to complete the app registration credential process for Azure metric collection and the Event Hub setup for sending Azure Platform Logs.

**US3**: If your organization is on the Datadog US3 site, you can use the Azure Native integration to streamline management and data collection for your Azure environment. Datadog recommends using this method when possible. Setup entails creating a [Datadog resource in Azure][12] to link your Azure subscriptions to your Datadog organization. This replaces the app registration credential process for metric collection and Event Hub setup for log forwarding. See the [Azure Native manual setup][13] guide for more information.

## セットアップ

### Azure CLI を使用して統合する

To integrate Datadog with Azure using the Azure CLI, Datadog recommends using the [Azure Cloud Shell][7].

{{< tabs >}}
{{% tab "Azure CLI" %}}

First, log into the Azure account you want to integrate with Datadog:

```shell
az login
```

サービスプリンシパルを作成し、Azure リソースへのアクセスを構成します。

```shell
az ad sp create-for-rbac
```

サブスクリプションのリストを表示し、`subscription_id` をコピーアンドペーストできるようにします。

```shell
az account list --output table
```

次の形式を使用して、サービスプリンシパルとなるアプリケーションを作成します。

```shell
az ad sp create-for-rbac --role "Monitoring Reader" --scopes /subscriptions/{subscription_id}
```

出力例:
```text
{
  "appId": "4ce52v13k-39j6-98ea-b632-965b77d02f36",
  "displayName": "azure-cli-2025-02-23-04-27-19",
  "password": "fe-3T~bEcFxY23R7NHwVS_qP5AmxLuTwgap5Dea6",
  "tenant": "abc123de-12f1-82de-97bb-4b2cd023bd31"
}
```

- このコマンドは、監視するサブスクリプションに対する `monitoring reader` ロールをサービスプリンシパルに付与します。
- The `appID` generated from this command must be entered in the [Datadog Azure integration tile][1] under **Client ID**.
- Enter the generated `Tenant ID` value in the [Datadog Azure integration tile][1] under **Tenant name/ID**.
- `--scope` は複数の値をサポートすることができ、一度に複数のサブスクリプションまたは管理グループを追加することができます。**[az ad sp][2]** ドキュメントにある例を参照してください。
- 自分で選択した名前を使用する場合は、`--name <CUSTOM_NAME>` を追加します。それ以外の場合は、Azure によって一意の名前が生成されます。この名前は、セットアッププロセスでは使用されません。
- Add `--password <CUSTOM_PASSWORD>` to use a hand-picked password. Otherwise Azure generates a unique one. This password must be entered in the [Datadog Azure integration tile][1] under **Client Secret**.

管理グループは、スコープとして有効かつ推奨されるオプションです。例:

```shell
az account management-group entities list --query "[?inheritedPermissions!='noaccess' && permissions!='noaccess'].{Name:displayName,Id:id}" --output table
```

- このコマンドは、ユーザーがアクセスできるすべてのサブスクリプションと管理グループを表示します。
- ID を結合して、サービスプリンシパルを作成します。このコマンドを 1 つ実行するだけで、ユーザーを作成し、すべての管理グループ/サブスクリプションにロールを割り当てることができます

[1]: https://app.datadoghq.com/integrations/azure
[2]: https://learn.microsoft.com/en-us/cli/azure/ad/sp?view=azure-cli-latest
{{% /tab %}}
{{% tab "Azure CLI Classic" %}}

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
- The `<PASSWORD>` you choose must be entered in the [Datadog Azure integration tile][1] under **Client Secret**.
- このコマンドから返される`オブジェクト ID` を、次のコマンドの `<OBJECT_ID>` の代わりに使用します。

次の形式を使用して、サービスプリンシパルとなるアプリケーションを作成します。

```text
azure role assignment create --objectId <オブジェクト_ID> -o "Monitoring Reader" -c /subscriptions/<サブスクリプション_ID>/
```

- このコマンドは、監視するサブスクリプションに対する `monitoring reader` ロールをサービスプリンシパルに付与します。
- The `Service Principal Name` generated from this command must be entered in the [Datadog Azure integration tile][1] under **Client ID**.
- `<SUBSCRIPTION_ID>` は監視対象の Azure サブスクリプションです。これは、`azure account show` コマンドを使用すると、またはポータルに `ID` として一覧表示されます。

[1]: https://app.datadoghq.com/integrations/azure
{{% /tab %}}
{{< /tabs >}}

### Azure ポータルを使用して統合する

{{< tabs >}}
{{% tab "ARM template" %}}

1. In the Azure integration tile, select **Configuration** > **New App Registration** > **Using Azure Portal**.

2. Select **Management Group (Auto-Discover)** or **Individual Subscriptions**.
   - If you select Management Group, Datadog automatically discovers and monitors any subscriptions within that selected scope, including any subscriptions created in the future. You must have the owner role in the Management Group selected.
   - If you select Individual Subscriptions, you must have the owner role in any subscriptions you want to monitor.

3. Click **Open Template**.

{{< img src="integrations/guide/azure_manual_setup/azure_tile_arm_template.png" alt="The Azure tile in the Datadog integrations page with Using Azure Portal and Management Group selected" popup="true" style="width:80%;" >}}

4. Select the **Region**, **Subscription**, and **Resource Group** for the template to be deployed.

   **Note**: The selection of region, subscription, and resource group only defines where this template is deployed. It has no impact on which subscriptions are monitored by Datadog.

5. **Next** をクリックします。

6. Select the _Create new_ option in **Service principal type**. 
7. Click the **Change selection** link in **Service principal**.
A form to create a new app registration is displayed:

{{< img src="integrations/guide/azure_manual_setup/arm_template_service_principal.png" alt="The service principal page in the Azure ARM template with the option to Create New selected and the link to Change Selection highlighted" popup="true" style="width:80%;" >}}

8. Enter a name for the app registration, select the supported account types, and click **Register**.

9. A page opens to create a client secret. Click **+ New client secret** to add a client secret.

10. Copy the value of the client secret, and click the close **(X)** button in the top-right corner of the screen.

11. Paste the value of the client secret in the corresponding field on the template, and click **Next**.

12. Provide a Datadog API key and Datadog Application key value in the corresponding fields. If you launched the template from the Azure integration page in Datadog, you can copy the keys provided there. Otherwise, you can find your API and App keys in the Access section of the Organization Settings.

    **Note**: If you've selected to monitor individual subscriptions rather than a management group, select the subscriptions to monitor from the **Subscriptions to monitor** dropdown.

13. Select your Datadog site, as well as any other integration configuration options, such as host filters and whether to collect resources for [Cloud Security Management][17].

14. Click **Review + create**, then click **Create**.

15. Once the deployment has completed, click **Done** in the Azure integration page in Datadog to refresh the list and review your newly added App Registration.

[17]: /ja/security/cloud_security_management/
class SampleRegistry
{
    public function put($key, $value)
    {
        \App\some_utility_function('some argument');
        // 挿入されたアイテムの ID を返す
        return 456;
    }

1. Active Directory で[アプリ登録を作成](#creating-the-app-registration)し、正しい認証情報を Datadog に渡します。
2. 監視するサブスクリプションに対する[読み取りアクセス権をアプリケーションに付与](#giving-read-permissions-to-the-application)します。

#### アプリ登録の作成

1. **Azure Active Directory** で、**App Registrations** に移動し、**New registration** をクリックします。
2. 以下の各項目を入力し、**Create** ボタンをクリックします。名前とサインオン URL は使用されませんが、セットアッププロセスで必要です。

    - 名前: `Datadog Auth`
    - サポート対象のアカウントの種類: `この組織ディレクトリのアカウントのみ (Datadog)`
    - リダイレクト URI: {{< region-param key="dd_full_site" code="true" >}}

{{< img src="integrations/guide/azure_manual_setup/Azure_create_ad.png" alt="Azure でアプリを作成" popup="true" style="width:80%;" >}}

#### 読み取りアクセス許可をアプリケーションに付与する

1. 個々のサブスクリプションレベルでアクセスを割り当てるには、検索ボックスまたは左サイドバーから **Subscriptions** に移動してください。

{{< img src="integrations/guide/azure_manual_setup/subscriptions_icon.png" alt="サブスクリプションアイコン" popup="true" style="width:25%">}}

管理グループレベルでアクセスを割り当てるには、**Management Groups** に移動して、監視したいサブスクリプションのセットを含む管理グループを選択します。
**注**: 管理グループレベルでアクセスを割り当てることは、グループに追加された新しいサブスクリプションが、Datadog によって自動的に検出され、監視されることを意味します。

{{< img src="integrations/guide/azure_manual_setup/azure_management_groups_icon.png" alt="管理グループアイコン" popup="true" style="width:25%">}}

テナント全体の監視を構成するには、**Tenant Root Group** にアクセス権を割り当てます。

2. 監視するサブスクリプションをクリックします。
3. サブスクリプションのメニューで **Access control (IAM)** を選択し、**Add** > **Add role assignment** を選択します。

    {{< img src="integrations/guide/azure_manual_setup/azure-add-role.png" alt="ロールの割り当ての追加" popup="true" style="width:80%">}}

4. **Role** には、**Monitoring Reader** を選択します。**Select** では、前の手順で作成したアプリケーションの名前を選択します。

5. **Save** をクリックします。
6. Repeat this process for any additional subscriptions you want to monitor with Datadog.
**Note**: Users of Azure Lighthouse can add subscriptions from customer tenants.

**Note**: Diagnostics must be enabled for ARM deployed VMs to collect metrics, see [Enable diagnostics][11].

#### インテグレーションを完了する

1. Under **App Registrations**, select the App you created, copy the **Application ID** and **Tenant ID**, and paste the values in the [Datadog Azure integration tile][10] under **Client ID** and **Tenant ID**.
2. 同じアプリで、**Manage** > **Certificates and secrets** と移動します。
3. `datadogClientSecret` という新しい **Client Secret** を追加し、**Expires** に期間を選択して **Add** をクリックします。

    {{< img src="integrations/guide/azure_manual_setup/Azure_client_secret.png" alt="Azure のクライアントシークレット" popup="true" style="width:80%">}}

4. When the key value is shown, copy and paste the value in the [Datadog Azure integration tile][10] under **Client Secret** and click **Install Integration** or **Update Configuration**.

**注**: Azure コンフィギュレーションの変更が Datadog で反映されるまで、最大で 20 分ほどかかります。

[10]: https://app.datadoghq.com/integrations/azure
[11]: /ja/integrations/guide/azure-troubleshooting/#enable-diagnostics
{{% /tab %}}
{{< /tabs >}}

### 構成

To limit metric collection for Azure-based hosts, open the integration tile for Azure. Select the **Configuration** tab, then open **App Registrations**. Enter a list of tags in the text box under **Metric Collection Filters**.

この `<KEY>:<VALUE>` 形式のタグリストはカンマ区切りで、メトリクスを収集する際に使用されるフィルターを定義します。`?` (1 文字) や `*` (複数文字) などのワイルドカードも使用できます。

定義されたタグのいずれかに一致する VM だけが Datadog にインポートされます。それ以外は無視されます。タグの前に `!` を追加することで、指定されたタグに一致する VM を除外することもできます。例:

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

### インテグレーションステータスの監視

インテグレーションが構成されると、Datadog は Azure API への連続した一連のコールを実行し始め、Azure 環境から重要な監視データを収集します。これらのコールは、時々エラーを返します (例えば、提供された資格情報が期限切れの場合など)。これらのエラーは、Datadog が監視データを収集する能力を阻害またはブロックする可能性があります。

重大なエラーが発生すると、Azure インテグレーションは Datadog イベントエクスプローラーにイベントを生成し、5 分ごとに再パブリッシュします。これらのイベントが検出されたときにトリガーし、適切なチームに通知するイベントモニターを構成することができます。

Datadog は、始めるためのテンプレートとして使用できる推奨モニターを提供します。推奨モニターを使用するには、

1. In Datadog, go to **Monitors** -> **New Monitor** and select the [Recommended Monitors][8] tab.
2. `[Azure] Integration Errors` というタイトルの推奨モニターを選択します。
3. 検索クエリまたはアラート条件に必要な修正を加えます。デフォルトでは、モニターは新しいエラーが検出されるたびにトリガーされ、過去 15 分間エラーが検出されなかったときに解決されます。
4. 必要に応じて、通知メッセージと再通知メッセージを更新します。イベント自体には、イベントに関する適切な情報が含まれており、自動的に通知に含まれることに注意してください。これには、範囲、エラー応答、修復のための一般的な手順に関する詳細な情報が含まれます。
5. [Configure notifications][9] through your preferred channels (email, Slack, PagerDuty, or others) to make sure your team is alerted about issues affecting Azure data collection.

### メトリクスの収集

インテグレーションタイルのセットアップが完了すると、メトリクスがクローラーによって収集されます。他のメトリクスを収集する場合は、以下のように、Datadog Agent を VM にデプロイします。

### Agent のインストール

Azure 拡張機能を使用して、Windows VM、Linux x64 VM、および Linux ARM ベースの VM に Datadog Agent をインストールすることができます。また、AKS クラスター拡張機能を使用して、AKS クラスターに Agent をデプロイすることもできます。

{{< tabs >}}
{{% tab "VM 拡張機能" %}}

1. [Azure ポータル][4]で、該当する VM を選択します。
2. 左サイドバーから、**Settings** の下にある **Extensions + applications** を選択します。
3. Click **+ Add**.
4. `Datadog Agent` 拡張機能を検索して選択します。
5. **Next** をクリックします。
6. [Datadog API キー][2]と[Datadog サイト][1]を入力し、**OK** をクリックします。

オペレーティングシステムまたは CI/CD ツールに応じた Agent のインストール方法については、[Datadog Agent のインストール手順][3]を参照してください。

**注**: Azure の拡張機能と併せて Datadog Agent をインストールする場合、ドメインコントローラーはご利用いただけません。

[1]: /ja/getting_started/site/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://portal.azure.com
{{% /tab %}}

{{% tab "AKS クラスター拡張機能" %}}

Datadog AKS クラスター拡張機能を使用すると、Azure AKS 内に Datadog Agent をネイティブにデプロイできるため、サードパーティの管理ツールの複雑さを回避できます。AKS クラスター拡張機能を使って Datadog Agent をインストールするには: 

1. Azure ポータルで AKS クラスターに移動します。
2. AKS クラスターの左サイドバーから、**Settings** の下にある **Extensions + applications** を選択します。
3. `Datadog AKS Cluster Extension` を検索して選択します。
4. **Create** をクリックし、表示される指示に従って [Datadog の資格情報][1]と [Datadog のサイト][2]を使用してください。

[1]: /ja/account_management/api-app-keys/
[2]: /ja/getting_started/site/
{{% /tab %}}
{{< /tabs >}}

#### Sending logs

See the [Azure Logging guide][5] to set up log forwarding from your Azure environment to Datadog.

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/azure/
[2]: https://us3.datadoghq.com/signup
[3]: /ja/integrations/guide/azure-portal/
[4]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Datadog%2Fmonitors
[5]: /ja/logs/guide/azure-logging-guide
[6]: /ja/integrations/guide/azure-native-manual-setup/
[7]: https://azure.microsoft.com/en-us/documentation/articles/xplat-cli-install
[8]: https://app.datadoghq.com/monitors/recommended
[9]: /ja/monitors/notify/#configure-notifications-and-automations
[12]: https://learn.microsoft.com/en-us/azure/partner-solutions/datadog/overview
[13]: /ja/integrations/guide/azure-native-manual-setup/