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

監視するサブスクリプションの読み取り権限を持つアプリ登録を通じて [Datadog Azure インテグレーション][1]を手動でセットアップするには、このガイドをご利用ください。

**All sites**: すべての Datadog サイトは、このページのステップを使用して、Azure メトリクス収集のためのアプリ登録の認証プロセスと、Azure プラットフォームログを送信するための Event Hub のセットアップを完了することができます。

**US3**: 組織が Datadog US3 サイトにある場合、Azure Native インテグレーションを使用して、Azure 環境の管理とデータ収集を効率化することができます。Datadog では、可能な限りこの方法を使用することを推奨しています。セットアップには、[Azure 内の Datadog リソース][12]を作成して、Azure サブスクリプションを Datadog 組織にリンクします。これは、メトリクス収集のためのアプリ登録の認証プロセスとログ転送のための Event Hub のセットアップに取って代わるものです。詳細は、[Azure Native の手動セットアップ][13]ガイドを参照してください。

## セットアップ

### Azure CLI を使用して統合する

Azure CLI を使用して Datadog と Azure を統合する場合、Datadog は [Azure Cloud Shell][7] を使用することを推奨しています。

{{< tabs >}}
{{% tab "Azure CLI" %}}

最初に、Datadog と統合する Azure アカウントにログインします。

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
- このコマンドによって生成された ` appID ` を [Datadog Azure インテグレーションタイル][1]の **Client ID** に入力する必要があります。
- 生成された`Tenant ID` 値を [Datadog Azure インテグレーションタイル][1]の **Tenant name/ID** に入力します。
- `--scope` は複数の値をサポートすることができ、一度に複数のサブスクリプションまたは管理グループを追加することができます。**[az ad sp][2]** ドキュメントにある例を参照してください。
- 自分で選択した名前を使用する場合は、`--name <CUSTOM_NAME>` を追加します。それ以外の場合は、Azure によって一意の名前が生成されます。この名前は、セットアッププロセスでは使用されません。
- 自分で選択したパスワードを使用する場合は、`--password <CUSTOM_PASSWORD>` を追加します。それ以外の場合は、Azure によって一意のパスワードが生成されます。このパスワードは、[Datadog Azure インテグレーションタイル][1]の **Client Secret** に入力する必要があります。

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
- 選択した `<PASSWORD>` は、[Datadog Azure インテグレーションタイル][1]の **Client Secret** に入力する必要があります。
- このコマンドから返される`オブジェクト ID` を、次のコマンドの `<OBJECT_ID>` の代わりに使用します。

次の形式を使用して、サービスプリンシパルとなるアプリケーションを作成します。

```text
azure role assignment create --objectId <オブジェクト_ID> -o "Monitoring Reader" -c /subscriptions/<サブスクリプション_ID>/
```

- このコマンドは、監視するサブスクリプションに対する `monitoring reader` ロールをサービスプリンシパルに付与します。
- このコマンドによって生成された `Service Principal Name` を [Datadog Azure インテグレーションタイル][1]の **Client ID** に入力する必要があります。
- `<SUBSCRIPTION_ID>` は監視対象の Azure サブスクリプションです。これは、`azure account show` コマンドを使用すると、またはポータルに `ID` として一覧表示されます。

[1]: https://app.datadoghq.com/integrations/azure
{{% /tab %}}
{{< /tabs >}}

### Azure ポータルを使用して統合する

{{< tabs >}}
{{% tab "ARM テンプレート" %}}

1. Azure インテグレーションタイルで、**Configuration** > **New App Registration** > **Using Azure Portal** を選択します。

2. **Management Group (Auto-Discover)** または **Individual Subscriptions** を選択します。
   - Management Group を選択した場合、Datadog は、その選択されたスコープ内のすべてのサブスクリプション (将来作成されるサブスクリプションを含む) を自動的に検出して監視します。選択した管理グループの所有者ロールが必要です。
   - Individual Subscriptions を選択した場合、監視するサブスクリプションの所有者ロールが必要です。

3. **Open Template** をクリックします。

{{< img src="integrations/guide/azure_manual_setup/azure_tile_arm_template.png" alt="Using Azure Portal と Management Group が選択された、Datadog インテグレーションページの Azure タイル " popup="true" style="width:80%;" >}}

4. テンプレートをデプロイする **Region**、**Subscription**、**Resource Group** を選択します。

   **注**: 地域、サブスクリプション、リソースグループの選択は、このテンプレートがデプロイされる場所を定義するためだけのものです。どのサブスクリプションが Datadog によって監視されるかには影響しません。

5. **Next** をクリックします。

6. **Service principal type** で _Create new_ オプションを選択します。 
7. **Service principal** で **Change selection** のリンクをクリックします。
新規アプリ登録の作成フォームが表示されます。

{{< img src="integrations/guide/azure_manual_setup/arm_template_service_principal.png" alt="Create New のオプションが選択され、Change Selection のリンクがハイライト表示された、Azure ARM テンプレートのサービスプリンシパルページ" popup="true" style="width:80%;" >}}

8. アプリ登録の名前を入力し、サポートされているアカウントの種類を選択して、**Register** をクリックします。

9. クライアントシークレットを作成するページが開きます。クライアントシークレットを追加するには、**+ New client secret** をクリックします。

10. クライアントシークレットの値をコピーし、画面右上の閉じる **(X)** ボタンをクリックします。

11. クライアントシークレットの値をテンプレートの対応するフィールドに貼り付け、**Next** をクリックします。

12. 対応するフィールドに、Datadog API キーと Datadog アプリケーションキーの値を入力します。Datadog の Azure インテグレーションページからテンプレートを起動した場合は、そこで提供されたキーをコピーできます。それ以外の場合は、組織設定の Access セクションで API キーとアプリキーを確認することができます。

    **注**: 管理グループではなく個別のサブスクリプションを監視する選択をした場合は、**Subscriptions to monitor** ドロップダウンから監視するサブスクリプションを選択します。

13. Datadog サイト、およびホストフィルターや [Cloud Security Management][17] 用のリソースを収集するかどうかなど、その他のインテグレーション構成オプションを選択します。

14. **Review + create** をクリックし、次に **Create** をクリックします。

15. デプロイが完了したら、Datadog の Azure インテグレーションページで **Done** をクリックしてリストを更新し、新しく追加されたアプリ登録を確認します。

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
6. Datadog で監視したいサブスクリプションが他にもある場合は、この手順を繰り返します。
**注**: Azure Lighthouse のユーザーは、顧客のテナントからサブスクリプションを追加できます。

**注**: ARM によってデプロイされた VM がメトリクスを収集できるようにするには、診断を有効にする必要があります。[診断の有効化][11]を参照してください。

#### インテグレーションを完了する

1. **App Registrations** で、作成したアプリを選択します。**Application ID** と **Tenant ID** をコピーし、[Datadog Azure インテグレーションタイル][10]の **Client ID** と **Tenant ID** に貼り付けます。
2. 同じアプリで、**Manage** > **Certificates and secrets** と移動します。
3. `datadogClientSecret` という新しい **Client Secret** を追加し、**Expires** に期間を選択して **Add** をクリックします。

    {{< img src="integrations/guide/azure_manual_setup/Azure_client_secret.png" alt="Azure のクライアントシークレット" popup="true" style="width:80%">}}

4. キー値が表示されたら、コピーして [Datadog Azure インテグレーションタイル][10]の **Client Secret** に貼り付け、**Install Integration** または **Update Configuration** をクリックします。

**注**: Azure コンフィギュレーションの変更が Datadog で反映されるまで、最大で 20 分ほどかかります。

[10]: https://app.datadoghq.com/integrations/azure
[11]: /ja/integrations/guide/azure-troubleshooting/#enable-diagnostics
{{% /tab %}}
{{< /tabs >}}

### 構成

Azure ベースのホストのメトリクス収集を制限するには、Azure のインテグレーションタイルを開きます。**Configuration** タブを選択し、**App Registrations** を開きます。**Metric Collection Filters** の下のテキストボックスにタグのリストを入力します。

この `<KEY>:<VALUE>` 形式のタグリストはカンマ区切りで、メトリクスを収集する際に使用されるフィルターを定義します。`?` (1 文字) や `*` (複数文字) などのワイルドカードも使用できます。

定義されたタグのいずれかに一致する VM だけが Datadog にインポートされます。それ以外は無視されます。タグの前に `!` を追加することで、指定されたタグに一致する VM を除外することもできます。例:

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

### インテグレーションステータスの監視

インテグレーションが構成されると、Datadog は Azure API への連続した一連のコールを実行し始め、Azure 環境から重要な監視データを収集します。これらのコールは、時々エラーを返します (例えば、提供された資格情報が期限切れの場合など)。これらのエラーは、Datadog が監視データを収集する能力を阻害またはブロックする可能性があります。

重大なエラーが発生すると、Azure インテグレーションは Datadog イベントエクスプローラーにイベントを生成し、5 分ごとに再パブリッシュします。これらのイベントが検出されたときにトリガーし、適切なチームに通知するイベントモニターを構成することができます。

Datadog は、始めるためのテンプレートとして使用できる推奨モニターを提供します。推奨モニターを使用するには、

1. Datadog で、**Monitors** -> **New Monitor** と進み、[Recommended Monitors][8] タブを選択します。
2. `[Azure] Integration Errors` というタイトルの推奨モニターを選択します。
3. 検索クエリまたはアラート条件に必要な修正を加えます。デフォルトでは、モニターは新しいエラーが検出されるたびにトリガーされ、過去 15 分間エラーが検出されなかったときに解決されます。
4. 必要に応じて、通知メッセージと再通知メッセージを更新します。イベント自体には、イベントに関する適切な情報が含まれており、自動的に通知に含まれることに注意してください。これには、範囲、エラー応答、修復のための一般的な手順に関する詳細な情報が含まれます。
5. Azure のデータ収集に影響を与える問題についてチームにアラートが届くように、好みのチャンネル (メール、Slack、PagerDuty など) を通じて[通知の構成][9]を行います。

### メトリクスの収集

インテグレーションタイルのセットアップが完了すると、メトリクスがクローラーによって収集されます。他のメトリクスを収集する場合は、以下のように、Datadog Agent を VM にデプロイします。

### Agent のインストール

Azure 拡張機能を使用して、Windows VM、Linux x64 VM、および Linux ARM ベースの VM に Datadog Agent をインストールすることができます。また、AKS クラスター拡張機能を使用して、AKS クラスターに Agent をデプロイすることもできます。

{{< tabs >}}
{{% tab "VM 拡張機能" %}}

1. [Azure ポータル][4]で、該当する VM を選択します。
2. 左サイドバーから、**Settings** の下にある **Extensions + applications** を選択します。
3. **+ Add** をクリックします。
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

Azure 環境から Datadog へのログ転送を設定するには、[Azure ログガイド][5]を参照してください。

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