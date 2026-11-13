---
aliases:
- /ja/integrations/guide/azure-manual-setup/
- /ja/integrations/guide/azure-programmatic-management/
description: Azure アプリ登録インテグレーションオプションを使用して、Microsoft Azure を Datadog と接続します。メトリクス収集、ログ転送、および
  Agent のインストールを構成します。
further_reading:
- link: https://docs.datadoghq.com/integrations/azure/#overview
  tag: ドキュメント
  text: Microsoft Azure インテグレーション
- link: https://docs.datadoghq.com/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: ガイド
  text: クラウドインスタンスに Datadog Agent をインストールするメリットは何ですか。
- link: https://www.datadoghq.com/blog/azure-integration-onboarding/
  tag: ブログ
  text: ガイド付きオンボーディングで Azure インテグレーションのセットアップを加速
- link: https://www.datadoghq.com/blog/azure-secretless-authentication/
  tag: ブログ
  text: シークレットレス認証を使用して Azure シークレットのローテーションを回避する
title: Azure の概要
---
## 概要 {#overview}

Datadog には Azure インテグレーションの構成オプションが複数あります。このガイドでは、Azure を使い始めるために利用可能なさまざまなオプションの概要を説明し、特定のユースケースに対応した Azure リソースやチュートリアルへのリンクも掲載しています。

## 前提条件 {#prerequisites}

[Datadog アカウント][2]をまだ作成していない場合は作成します。

{{% collapse-content title="インテグレーションのセットアップに必要な権限" level="h3" expanded=false id="required-permissions" %}}

### Azure {#in-azure}

Microsoft Entra ID ユーザーには、次の権限が必要です。

#### アプリ登録を作成する権限 {#permission-to-create-an-app-registration}

ユーザーは次の**いずれか**に該当している必要があります。

- `Users can register applications` が `Yes` に設定されている
- ユーザーに[アプリケーション開発者][38]ロールがある

##### サブスクリプション内の管理者ロール {#admin-roles-within-your-subscriptions}

監視するサブスクリプション内で、次のいずれかを持っている必要があります。

- {{< ui >}}Owner{{< /ui >}} ロール
- {{< ui >}}Contributor{{< /ui >}} ロールと {{< ui >}}User Access Admin{{< /ui >}} ロールの両方

#### Graph API 権限を追加および承諾する権限 {#permission-to-add-and-grant-consent-for-graph-api-permissions}

必要な権限は[特権ロール管理者ロール][25]に含まれています。

### Datadog {#in-datadog}

`Datadog Admin Role`、または `azure_configurations_manage` 権限を持つ他のいずれかのロール。

{{% /collapse-content %}}

{{< site-region region="us3" >}}

<div class="alert alert-danger"><a href="https://docs.datadoghq.com/cloud_cost_management/setup/azure/?tab=billingaccounts&site=us3#overview">Cloud Cost Management</a> および<a href="https://docs.datadoghq.com/logs/log_configuration/archives/?tab=azurestorage">ログアーカイブ</a>では、アプリ登録セットアップ方法を使用する必要があります。Azure Native インテグレーションを使用している Datadog アカウントの場合は、このページのセットアップ手順に従ってアプリ登録を作成してください。サブスクリプションが両方の方法で接続されている場合、Azure インテグレーションタイルに冗長であることを示す警告が表示されます。この警告は、Cloud Cost Management およびログアーカイブに関しては無視してかまいません。
</div>

{{< /site-region >}}


## セットアップ {#setup}

アプリ登録を通じて {{< ui >}}Azure integration{{< /ui >}} をセットアップするには、このページの手順に従います。これは、すべての Datadog サイトで利用可能です。セットアップ中に、アプリ登録を Datadog で認証する際に、**シークレットレス認証** (推奨) または**クライアントシークレット**のいずれを使用するかを選択します。

{{< img src="/getting_started/integrations/azure/GSwAzure_siteSelector.mp4" alt="US3 サイトのサイトセレクター" video=true >}}

### 認証方法 {#authentication-methods}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-info">シークレットレス認証は、US1-FED および US2-FED サイトではサポートされていません。<strong>クライアントシークレット</strong>方法を使用して認証します。</div>
{{< /site-region >}}

<div class="alert alert-info">シークレットレス認証では、Azure Government や 21Vianet が運営する Azure (Azure 中国*) などの Azure ソブリンクラウドにおけるアプリ登録をサポートしていません。これらのクラウドのテナントは、<strong>クライアントシークレット</strong>方法を使用して認証します。</div>

\*{{% mainland-china-disclaimer %}}

Azure インテグレーションは、次の 2 つの認証方法をサポートしています。

| 方法 | 仕組み | 管理するもの |
|---|---|---|
| **シークレットレス認証** (推奨) | Datadog と Azure は、Azure フェデレーション資格情報と OIDC (OpenID Connect) [ワークロードアイデンティティフェデレーション][54]を使用して、信頼されたアイデンティティ関係を確立します。アプリ登録は、保存されたシークレットではなく Datadog の OIDC アイデンティティを信頼するため、Datadog がシークレットを保存することはありません。| ローテーションや更新が必要なものがないため、資格情報の期限切れによる取り込み漏れのリスクが軽減されます。|
| **クライアントシークレット** | Datadog は、アプリ登録からのクライアントシークレットを保存し、それを使用して認証します。| 期限が切れる前にシークレットを最新の状態に保ちます。|

認証方法は、アプリ登録を作成または構成する際に選択します。

{{< img src="/getting_started/integrations/azure/GSwAzure_authenticationMethod.png" alt="Azure インテグレーション設定の認証方法ステップ。推奨されるシークレットレス認証とクライアントシークレットオプションが表示されている" style="width:100%;" >}}

{{% collapse-content title="クイックスタート (推奨)" level="h3" expanded=false id="quickstart-setup" %}}

### 次の場合はクイックスタートセットアップ方法を選択... {#choose-the-quickstart-setup-method-if}

- 初めて Datadog をセットアップする場合。
- UI ベースのワークフローが希望で、必要な監視権限を持つサービスプリンシパルを作成するのにかかる時間を最小限に抑えたい場合。
- スクリプトや CI/CD パイプラインでセットアップ手順を自動化したい場合。

### 手順 {#instructions}

1. Azure インテグレーションタイルで、{{< ui >}}\+ Add New App registration{{< /ui >}} をクリックし、{{< ui >}}Quickstart{{< /ui >}} を選択します。
2. セットアップスクリプトをコピーし、Azure Cloud Shell で実行します。
3. Datadog UI に戻ります。セットアップスクリプトの右上隅に {{< ui >}}CONNECTED{{< /ui >}} と表示されているはずです。
4. データを収集するサブスクリプションと管理グループを選択します。
5. {{< ui >}}Authentication Method{{< /ui >}} で、フェデレーション資格情報を使用して認証する場合は {{< ui >}}Secretless Auth{{< /ui >}} (推奨) を選択し、クライアントシークレットを保存し、それを使用して認証する場合は {{< ui >}}Client Secret{{< /ui >}} を選択します。
6. 必要に応じて、メトリクス収集トグルをクリックして Azure からのすべてのメトリクス収集を無効にします。[{{< ui >}}Advanced Configuration{{< /ui >}} ドロップダウンを展開して、メトリクスを次の基準でフィルタリングすることもできます。
   - リソースプロバイダー
   - タグ
   - ホスト
   - アプリサービスプラン
   - コンテナアプリ

また、クリックすることで、[Azure Application Insights][36] からのカスタムメトリクスの収集を有効にし、使用量メトリクスの収集を無効にすることもできます。

7. 必要に応じて、リソース収集トグルをクリックして、Azure リソースからの構成情報の収集を無効にします。
8. ログ収集を有効にして、ログを Datadog に転送するために必要なサービスと診断設定をセットアップおよび構成します。
   1. テナントにログフォワーダーがすでに存在する場合は、そのスコープが変更されて拡張されます。変更された設定は、既存のものに加え、新たに選択されたサブスクリプションや管理グループにも適用されます。
   2. 新しいログフォワーダーを作成する場合は次のようにします。
      1. ログフォワーダーのコントロールプレーンを保存するリソースグループの名前を入力します。
      2. ログ転送オーケストレーション (LFO) のコントロールプレーンサブスクリプションを選択します。
      3. コントロールプレーンのリージョンを選択します。<br>
   **注**: リソースグループ名、コントロールプレーンサブスクリプション、およびリージョンのフィールドは、新しいログフォワーダーを作成する際にのみ表示されます。
   3. 必要に応じて、{{< ui >}}Log filtering options{{< /ui >}} を開いてタグでログをフィルタリングするか、正規表現を使用して特定の情報 (PII など) についてのフィルタリングを適用します。

   このアーキテクチャの詳細については、自動ログ転送ガイドの[アーキテクチャセクション][34]を参照してください。

9. {{< ui >}}Confirm{{< /ui >}}] をクリックしてセットアップを終了します。

{{% /collapse-content %}}

{{% collapse-content title="Terraform" expanded=false level="h3" id="terraform-setup" %}}

### 次の場合は Terraform セットアップ方法を選択... {#choose-the-terraform-setup-method-if}

- インフラストラクチャーをコードとして管理し、Datadog Azure インテグレーションをバージョン管理下に置きたい場合。
- 再利用可能なプロバイダーブロックを使用して、複数のテナントまたはサブスクリプションを一貫して構成する必要がある場合。
- Terraform 管理環境に適した、繰り返し可能で監査可能なデプロイメントプロセスを確立したい場合。

### 手順 {#instructions-1}

次の手順に従って、[Terraform][23] で Datadog Azure インテグレーションをデプロイします。

{{< tabs >}}
{{% tab "アプリ登録を作成する" %}}

1. [Azure インテグレーションタイル][100]で、{{< ui >}}\+ Add New App registration{{< /ui >}} をクリックし、{{< ui >}}Terraform{{< /ui >}} を選択します。
2. データを収集するサブスクリプションと管理グループを選択します。
3. {{< ui >}}Authentication Method{{< /ui >}} で、フェデレーション資格情報を使用して認証する場合は {{< ui >}}Secretless Auth{{< /ui >}} を選択し、クライアントシークレットを保存し、それを使用して認証する場合は {{< ui >}}Client Secret{{< /ui >}} を選択します。
4. 必要に応じて、メトリクス収集トグルをクリックして Azure からのすべてのメトリクス収集を無効にします。[{{< ui >}}Advanced Configuration{{< /ui >}} ドロップダウンを展開して、メトリクスを次の基準でフィルタリングすることもできます。
   - リソースプロバイダー
   - タグ
   - ホスト
   - アプリサービスプラン
   - コンテナアプリ

   また、クリックすることで、[Azure Application Insights][101] からのカスタムメトリクスの収集を有効にし、使用量メトリクスの収集を無効にすることもできます。
5. 必要に応じて、リソース収集トグルをクリックして、Azure リソースからの構成情報の収集を無効にします。
6. コマンドをコピーして {{< ui >}}Initialize and apply the Terraform{{< /ui >}} で実行します。

[100]: https://app.datadoghq.com/integrations/azure/
[101]: https://learn.microsoft.com/azure/azure-monitor/app/app-insights-overview
{{% /tab %}}

{{% tab "既存のアプリ登録を使用する" %}}



- 提供されたスコープ (サブスクリプションまたは管理グループ) を Datadog で監視するための {{< ui >}}Monitoring Reader{{< /ui >}} ロールを持つアプリ登録をすでに構成しており、新しいリソースを作成したくない場合。

1. [Datadog Terraform プロバイダー][200]を構成し、Terraform の構成で Datadog API と対話するように設定します。
2. 以下の例を基本テンプレートとして、Terraform の構成ファイルを設定します。変更を適用する前に、以下のパラメーターを更新します。
    * `tenant_name`: Azure Active Directory ID。
    * `client_id`: Azure アプリケーション (クライアント) ID。
    * `secretless_auth_enabled`: クライアントシークレットの代わりにフェデレーション資格情報で認証する場合は、`true` に設定します (推奨)。代わりにクライアントシークレットで認証するには、このパラメーターを削除し、`client_secret` をアプリ登録のシークレット値に設定します。

   シークレット認証には、Datadog のアイデンティティを信頼するアプリ登録でフェデレーション資格情報が必要です。[認証方法](#authentication-methods)を参照してください。

   さらなる使用例やオプションパラメーターの全リスト、Datadog の追加リソースについては、Terraform レジストリの [Datadog Azure インテグレーションリソース][201]ページを参照してください。

{{< code-block lang="hcl" filename="" disable_copy="false" collapsible="false" >}}

resource "datadog_integration_azure" "sandbox" {
  tenant_name             = "<AZURE_TENANT_NAME>"
  client_id               = "<AZURE_CLIENT_ID>"
  secretless_auth_enabled = true
}

{{< /code-block >}}

3. `terraform apply` を実行します。データ収集が開始されるまで最大 10 分待ち、すぐに使える Azure 概要ダッシュボードを表示して、Azure リソースから送信されるメトリクスを確認します。

[200]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[201]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_azure
{{% /tab %}}
{{< /tabs >}}

#### 複数のサブスクリプションまたはテナントの管理 {#managing-multiple-subscriptions-or-tenants}

複数のサブスクリプションまたはテナントにまたがって Terraform リソースを管理するために、エイリアスを持つ複数のプロバイダーブロックを使用できます。詳しくは[プロバイダー構成][22]を参照してください。

### インテグレーションステータスを監視する {#monitor-the-integration-status}

インテグレーションが構成された後、Azure 環境から重要な監視データを収集するために、Datadog で Azure API への連続的な呼び出しが開始されます。これらの呼び出しはエラーを返すことがあります (たとえば、提供された資格情報が期限切れの場合など)。それらのエラーにより、Datadog による監視データの収集が抑制される可能性があります。

重大なエラーが発生すると、Azure インテグレーションは Datadog イベントエクスプローラーにイベントを生成し、5 分ごとに再パブリッシュします。これらのイベントが検出されたときにトリガーし、適切なチームに通知するイベントモニターを構成することができます。

Datadog は、開始するためのモニターテンプレートを提供しています。モニターテンプレートを使用するには、以下の手順に従います。

1. Datadog で {{< ui >}}Monitors{{< /ui >}} に移動し、{{< ui >}}Browse Templates{{< /ui >}} ボタンをクリックします。
2. [[Azure] Integration Errors][26] というタイトルのモニターテンプレートを検索して選択します。
3. 検索クエリやアラート条件に必要な変更を加えます。デフォルトでは、新しいエラーが検出されるたびにモニターがトリガーされ、過去 15 分間エラーが検出されなかったときに解決されます。
4. 通知および再通知メッセージを必要に応じて更新します。イベント自体にイベントに関する関連情報が含まれており、通知に自動的に含まれます。これには、スコープ、エラー応答、および修正のための一般的な手順に関する詳細情報が含まれます。
5. Azure のデータ収集に影響を与える問題についてチームにアラートが届くように、好みのチャンネル (メール、Slack、PagerDuty など) を通じて[通知の構成][27]を行います。

{{% /collapse-content %}}

{{% collapse-content title="既存のアプリ登録を使用する" level="h3" expanded=false id="existing-app-registration-setup" %}}

### 次の場合は既存のアプリ登録セットアップ方法を選択...{#choose-the-existing-app-registration-setup-method-if}

- 提供されたスコープ (サブスクリプションまたは管理グループ) を Datadog で監視するための {{< ui >}}Monitoring Reader{{< /ui >}} ロールを持つアプリ登録をすでに構成しており、新しいリソースを作成したくない場合。

Datadog 用のアプリ登録をセットアップする必要がある場合は、[クイックスタート](#quickstart-setup)または [Terraform](#terraform-setup) のセットアップ方法を参照してください。

### 手順 {#instructions-2}

1. [Datadog Azure インテグレーションタイル][20]で {{< ui >}}Add Existing{{< /ui >}} を選択します。
2. {{< ui >}}Tenant ID{{< /ui >}} フィールドに、ディレクトリ (テナント) ID を貼り付けます。
3. {{< ui >}}Client ID{{< /ui >}} フィールドに、アプリケーション (クライアント) ID を貼り付けます。
4. {{< ui >}}Client Secret Value{{< /ui >}} フィールドに、アプリ登録のクライアントシークレットの値を貼り付けます。
5. 必要に応じて、{{< ui >}}Monitor Automuting{{< /ui >}} トグルをクリックしてモニターの自動ミュートを無効にします。
6. 必要に応じて、メトリクス収集トグルをクリックして Azure からのすべてのメトリクス収集を無効にします。[{{< ui >}}Advanced Configuration{{< /ui >}} ドロップダウンを展開して、メトリクスを次の基準でフィルタリングすることもできます。
   - リソースプロバイダー
   - タグ
   - ホスト
   - アプリサービスプラン
   - コンテナアプリ

また、クリックすることで、[Azure Application Insights][36] からのカスタムメトリクスの収集を有効にし、使用量メトリクスの収集を無効にすることもできます。

6. 必要に応じて、リソース収集トグルをクリックして、Azure リソースからの構成情報の収集を無効にします。
7. {{< ui >}}Create Configuration{{< /ui >}} をクリックします。

{{% /collapse-content %}}

{{% collapse-content title="既存のアプリ登録をシークレット認証に移行する" level="h4" expanded=false id="secretless-migration-setup" %}}

クライアントシークレットを使用してアプリ登録をすでに接続している場合は、設定されているシークレット認証に移行できます。アプリ登録を再作成する必要はありません。シークレット認証は、Azure ソブリンクラウド内のアプリ登録をサポートしていません。[認証方法](#authentication-methods)を参照してください。

1. [Azure インテグレーションタイル][20]の {{< ui >}}Configuration{{< /ui >}} タブで、移行するアプリ登録を選択します。
2. {{< ui >}}General{{< /ui >}} タブで、{{< ui >}}Authentication{{< /ui >}} の下にある {{< ui >}}Set Up Secretless Auth{{< /ui >}} をクリックします。

   {{< img src="/getting_started/integrations/azure/GSwAzure_secretlessMigration.png" alt="シークレット認証を推奨する吹き出しとシークレット認証のセットアップボタンが表示されている、アプリ登録の一般タブ" style="width:100%;" >}}

{{< ui >}}Secretless Authentication Setup{{< /ui >}} ダイアログで、セットアップ方法を選択し、選択した方法の手順を完了します。

{{< img src="/getting_started/integrations/azure/GSwAzure_secretlessSetupModalDatadogIssuer.png" alt="Azure CLI、Terraform、Azure Portal セットアップ方法と、フェデレーション資格情報を作成および検証して、セットアップを完了するための手順が示されているシークレット認証のセットアップダイアログ。" style="width:100%;" >}}

{{< tabs >}}
{{% tab "Azure CLI" %}}

1. 正しいテナント用に構成された Azure CLI を使用して、提供された `az ad app federated-credential create` コマンドをターミナルで実行するか、{{< ui >}}Open Azure Cloud Shell{{< /ui >}} をクリックします。
2. {{< ui >}}Verify Credential{{< /ui >}} をクリックして、認証をテストします。
3. {{< ui >}}Confirm{{< /ui >}} をクリックします。セットアップが成功すると、クライアントシークレットは削除されます。

{{% /tab %}}
{{% tab "Terraform" %}}

この方法では、`azuread` プロバイダーバージョン 3.7.0 以上が必要です。

1. ダイアログに表示されているフェデレーション資格情報リソースを、Datadog Azure インテグレーションを管理する構成と同じ構成に追加してから、適用します。ダイアログから `issuer` と `subject` の値をコピーします。

   {{< code-block lang="hcl" filename="" disable_copy="false" collapsible="false" >}}
resource "azuread_application_federated_identity_credential" "datadog_federated_credential" {
  # Reference the ID of this app registration
  application_id = azuread_application.datadog_app.id
  display_name   = "datadog"
  description    = "Federated credential that permits Datadog to authenticate without storing a client secret"
  audiences      = ["api://AzureADTokenExchange"]
  issuer         = "<ISSUER>"
  subject        = "<SUBJECT>"
}
   {{< /code-block >}}

2. {{< ui >}}Verify Credential{{< /ui >}} をクリックして、認証をテストします。
3. シークレット認証を使用するように `datadog_integration_azure` リソースを変更します。
   - インテグレーションの依存関係リストにフェデレーション資格情報リソースを追加します。
   - `client_secret` 設定を `secretless_auth_enabled = true` に置き換えます。
   - 変更を適用します。

{{% /tab %}}
{{% tab "Azure ポータル" %}}

1. Azure ポータルで、アプリ登録を開き、{{< ui >}}Certificates & secrets{{< /ui >}} > {{< ui >}}Federated credentials{{< /ui >}} > {{< ui >}}Add credential{{< /ui >}} に移動します。
2. {{< ui >}}Other issuer{{< /ui >}} を選択し、{{< ui >}}Issuer{{< /ui >}}、{{< ui >}}Subject{{< /ui >}}、{{< ui >}}Audience{{< /ui >}} の値をダイアログに表示されているとおりに入力します。
3. {{< ui >}}Verify Credential{{< /ui >}} をクリックして、認証をテストします。
4. {{< ui >}}Confirm{{< /ui >}} をクリックします。セットアップが成功すると、クライアントシークレットは削除されます。

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

## メトリクスの収集 {#metric-collection}

Datadog の Azure インテグレーションは、[Azure Monitor][8] からすべてのメトリクスを収集するように構築されています。[インテグレーションページ][9]には、特定の Azure サービス向けのすぐに使用できる追加のダッシュボードやモニターを提供する厳選された事前定義済みのサブインテグレーションが表示されます。これらのインテグレーションの多くは、Datadog が Azure アカウントからのデータを認識したときにデフォルトでインストールされます。ただし、Datadog では、専用のサブインテグレーションタイルがなくても、**Azure Monitor がサポートするリソース**からメトリクスを取り込むことができます。

Azure metrics は、[メトリクスカタログ][55]ページで `Azure` を検索すると確認できます。

{{< img src="/getting_started/integrations/azure/GSwAzure_metricExplorer.png" alt="Azure metrics でフィルタリングされたメトリクスカタログページ" style="width:100%;" >}}

### メトリクスのリソースタグフィルタリング {#resource-tag-filtering-for-metrics}

タグフィルターを使用して、どの Azure リソースのメトリクスを Datadog で収集するかを制御します。[Azure インテグレーションタイル][20]の {{< ui >}}Configuration{{< /ui >}} タブでタグフィルターを構成します。タグフィルターは、`key:value` の形式のタグをカンマで区切ったリストです。フィルター内の少なくとも 1 つのタグに一致するリソースのメトリクスのみが収集されます。

タグフィルターではワイルドカードを使用できます。
- `?` は単一の文字に一致します。
- `*`は複数の文字に一致します。

特定のタグを持つリソースを除外するには、タグの前に `!` を付けます。除外は包含よりも優先されます。リソースは、リスト内のいずれかのタグに一致すればフィルターに一致します。

例: `datadog:monitored,env:production,!plan_tier:basic,instance-type:c1.*`

このフィルターは、`datadog:monitored` または `env:production` のタグが付いたリソースからメトリクスを収集し、`plan_tier:basic` のタグが付いたリソースを除外し、`instance-type` タグが `c1.*` に一致するリソースを含めます。

タグフィルターが設定されていない場合、Datadog はすべての Azure リソースからメトリクスを収集します。

## ログ収集を有効にする {#enable-log-collection}

自動ログ転送機能を使用して、ログを Datadog に転送するために必要なサービスと診断設定をセットアップおよび構成できます。テナントに自動ログ転送コントロールプレーンがすでに存在する場合、このフローによって変更され、選択したサブスクリプションまたは管理グループを含むようにスコープが拡張されます。詳細については、[Azure 自動ログ転送のセットアップ][19]を参照してください。

Datadog では、Azure からのログの送信に Agent または DaemonSet を使用することを推奨しています。直接ストリーミングが不可能な場合は、[Azure インテグレーション][20]の {{< ui >}}Configure Log Forwarding{{< /ui >}} フローを使用して、自動ログ転送のセットアップと管理を Datadog で直接行ってください。[Azure Resource Manager (ARM) テンプレート][19]を使用してログ転送をデプロイすることもできます。どちらの方法でも、ログ転送サービスが自動的に管理されてスケーリングされます。

{{% collapse-content title="自動 (推奨)" level="h3" expanded=false id="automated-log-forwarding-setup" %}}

### 次の場合は自動ログ転送セットアップ方法を選択... {#choose-the-automated-log-forwarding-setup-method-if}

- まだ[クイックスタートセットアップ方法](#azure-quickstart-setup)を通じてログをセットアップしていない場合。
- UI ベースのワークフローが希望で、必要な監視権限を持つサービスプリンシパルを作成するのにかかる時間を最小限に抑えたい場合。
- スクリプトや CI/CD パイプラインでセットアップ手順を自動化したい場合。

### 手順 {#instructions-3}

#### ログ転送を構成する (推奨) {#configure-log-forwarding-recommended}

{{< ui >}}Configure Log Forwarding{{< /ui >}} フローを使用して、Datadog で直接新しいログフォワーダーをセットアップするか既存のログフォワーダーを管理します。

1. Datadog で [{{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Azure{{< /ui >}}][20] の順に移動します。
1. {{< ui >}}Configure Log Forwarding{{< /ui >}} をクリックします。
1. 提供されたコマンドをコピーし、Azure Cloud Shell に貼り付けます。
1. ログを転送するサブスクリプションを選択します。
1. 必要に応じて、ログフィルターを追加または削除します。
1. {{< ui >}}Confirm{{< /ui >}} をクリックします。

詳細については、[Azure 自動ログ転送のセットアップ][19]を参照してください。

#### ARM テンプレート {#arm-template}

または、Azure Resource Manager (ARM) テンプレートを使用してログ転送をデプロイします。

1. Azure で[自動ログ転送 ARM テンプレート][29]を開きます。
1. [基本タブ][30]で Azure プロジェクトとインスタンスの詳細を構成します。
1. [Datadog 構成タブ][31]で Datadog の資格情報を入力します。
1. [デプロイメントタブ][32]でデプロイメントの警告を確認します。
1. [レビュー + 作成タブ][33]でデプロイメントプロセスを開始します。

{{< site-region region="us3" >}}

<div class="alert alert-danger"><a href="https://docs.datadoghq.com/logs/log_configuration/archives/?tab=azurestorage">ログアーカイブ</a>では、アプリ登録セットアップ方法を使用する必要があります。Azure Native インテグレーションを使用している Datadog アカウントの場合は、このページの手順に従ってアプリ登録を作成してください。
</div>

{{< /site-region >}}

詳細については、[Azure 自動ログ転送のアーキテクチャ][34]を参照してください。

{{% /collapse-content %}}

{{% collapse-content title="コンテナアプリ" level="h3" expanded=false id="container-app-log-forwarding-setup" %}}

### 次の場合はコンテナアプリログ転送方法を選択... {#choose-the-container-app-log-forwarding-method-if}

- ログを転送するリソースで[診断設定][53]を手動で構成する場合。

## 手順 {#instructions-4}

1. 下記のボタンをクリックし、Azure ポータルのフォームに入力します。ログを Datadog アカウントに転送するために必要な Azure リソースが Datadog によって自動的にデプロイされます。

   [![Azure にデプロイする](https://aka.ms/deploytoazurebutton)][52]

2. テンプレートのデプロイメントが完了したら、デプロイメント中に作成されたストレージアカウントに Azure プラットフォームログ (リソースログを含む) を送信するように各ログソースの[診断設定][53]をセットアップします。

**注**: リソースは同じ Azure リージョン内のストレージアカウントにのみストリーミングできます。

{{% /collapse-content %}}

{{% azure-log-archiving %}}

### ログのリソースタグフィルタリング {#resource-tag-filtering-for-logs}

タグフィルターを使用して、どの Azure リソースのログを Datadog に転送するかを制御します。ログのタグフィルターを構成するには、[Azure インテグレーションタイル][20]の {{< ui >}}Configure Log Forwarding{{< /ui >}} をクリックしてフローに従います。タグフィルターは、`key:value` の形式のタグをカンマで区切ったリストです。フィルター内の少なくとも 1 つのタグに一致するリソースのログのみが転送されます。

タグフィルターではワイルドカードを使用できます。
- `?` は単一の文字に一致します。
- `*`は複数の文字に一致します。

特定のタグを持つリソースを除外するには、タグの前に `!` を付けます。除外は包含よりも優先されます。リソースは、リスト内のいずれかのタグに一致すればフィルターに一致します。

例: `datadog:monitored,env:production,!plan_tier:basic,instance-type:c1.*`

このフィルターは、`datadog:monitored` または `env:production` のタグが付いたリソースからログを転送し、`plan_tier:basic` のタグが付いたリソースを除外し、`instance-type` タグが `c1.*` に一致するリソースを含めます。

タグフィルターが設定されていない場合、Datadog はすべての Azure リソースからログを転送します。

## Datadog のプラットフォームをさらに活用する {#get-more-from-the-datadog-platform}

### Agent をインストールしてアプリケーションの可視性を向上させる {#install-the-agent-for-greater-visibility-into-your-application}

Azure インテグレーションをセットアップすると、Datadog クローラーが自動的に Azure メトリクスを収集しますが、[Datadog Agent][1] を使えば、Azure インスタンスをさらに深い部分まで可視化することができます。お使いの環境に Datadog Agent をインストールすると、たとえば次のような追加データを収集することができます。
- **アプリケーションの健全性**
- **プロセスの使用状況**
- **システムレベルのメトリクス**

また、内蔵の StatsD クライアントを使用してアプリケーションからカスタムメトリクスを送信し、アプリケーション、ユーザー、システムで発生していることを関連付けることができます。インスタンスに Datadog Agent をインストールする利点の詳細については、[_クラウドインスタンスに Datadog Agent をインストールすべき理由_][15]に関するガイドを参照してください。

Azure 拡張機能を使用して、Windows VM、Linux x64 VM、および Linux ARM ベースの VM に Datadog Agent をインストールします。また、AKS クラスター拡張機能を使用して、AKS クラスターに Agent をデプロイすることもできます。

{{< tabs >}}
{{% tab "VM 拡張機能" %}}

1. [Azure ポータル][4]で、該当する VM を選択します。
2. 左のサイドバーから、{{< ui >}}Settings{{< /ui >}} の下にある {{< ui >}}Extensions + applications{{< /ui >}} を選択します。
3. {{< ui >}}\+ Add{{< /ui >}} をクリックします。
4. {{< ui >}}Datadog Agent{{< /ui >}} 拡張機能を検索して選択します。
5. {{< ui >}}Next{{< /ui >}} をクリックします。
6. [Datadog API キー][2]と [Datadog サイト][1]を入力し、{{< ui >}}OK{{< /ui >}} をクリックします。

オペレーティングシステムまたは CI/CD ツールに応じた Agent のインストール方法については、[Datadog Agent のインストール手順][3]を参照してください。

**注**: Azure 拡張機能を使用して Datadog Agent をインストールする場合、ドメインコントローラーは利用できません。

[1]: /ja/getting_started/site/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://portal.azure.com
{{% /tab %}}

{{% tab "AKS クラスター拡張機能" %}}

Datadog AKS クラスター拡張機能を使用すると、Azure AKS 内に Datadog Agent をネイティブにデプロイできるため、サードパーティの管理ツールの複雑さを回避できます。AKS クラスター拡張機能を使って Datadog Agent をインストールするには、以下の手順を実行します。

1. Azure ポータルで AKS クラスターに移動します。
2. AKS クラスターの左のサイドバーから、{{< ui >}}Settings{{< /ui >}} の下にある {{< ui >}}Extensions + applications{{< /ui >}} を選択します。
3. {{< ui >}}Datadog AKS Cluster Extension{{< /ui >}} を検索して選択します。
4. {{< ui >}}Create{{< /ui >}} をクリックし、[Datadog 資格情報][1]と [Datadog サイト][2]を使用してタイルの指示に従います。

[1]: /ja/account_management/api-app-keys/
[2]: /ja/getting_started/site/
{{% /tab %}}
{{< /tabs >}}

## トラブルシューティング {#troubleshooting}

Azure の高度な構成ガイドの[トラブルシューティング][16]を参照してください。

サポートが必要な場合は、[Datadog サポート][17]にお問い合わせください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/agent/
[2]: https://www.datadoghq.com/
[5]: https://learn.microsoft.com/azure/event-hubs/event-hubs-create
[8]: https://learn.microsoft.com/azure/azure-monitor/reference/supported-metrics/metrics-index
[9]: /ja/integrations/#cat-azure
[15]: /ja/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
[16]: /ja/integrations/guide/azure-advanced-configuration/#azure-integration-troubleshooting
[17]: /ja/help/
[19]: /ja/logs/guide/azure-automated-log-forwarding/
[20]: https://app.datadoghq.com/integrations/azure
[21]: https://learn.microsoft.com/cli/azure/ad/sp?view=azure-cli-latest
[22]: https://developer.hashicorp.com/terraform/language/providers/configuration
[23]: https://www.terraform.io
[25]: https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#privileged-role-administrator
[26]: https://app.datadoghq.com/monitors/templates?q=Azure%20%22integration%20errors%22&origination=all&p=1
[27]: /ja/monitors/notify/#configure-notifications-and-automations
[28]: /ja/integrations/guide/azure-advanced-configuration/#enable-diagnostics
[29]: https://portal.azure.com/#create/Microsoft.Template/uri/CustomDeploymentBlade/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fintegrations-management%2Fmain%2Fazure%2Flogging_install%2Fdist%2Fazuredeploy.json/createUIDefinitionUri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fintegrations-management%2Fmain%2Fazure%2Flogging_install%2Fdist%2FcreateUiDefinition.json
[30]: /ja/logs/guide/azure-automated-log-forwarding/#basics
[31]: /ja/logs/guide/azure-automated-log-forwarding/#datadog-configuration
[32]: /ja/logs/guide/azure-automated-log-forwarding/#deployment
[33]: /ja/logs/guide/azure-automated-log-forwarding/#review--create
[34]: /ja/logs/guide/azure-automated-log-forwarding/#architecture
[35]: /ja/integrations/guide/azure-advanced-configuration/#automated-log-collection
[36]: https://learn.microsoft.com/azure/azure-monitor/app/app-insights-overview
[38]: https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#application-developer
[39]: https://azure.microsoft.com/services/storage/blobs/
[40]: https://docs.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-portal
[41]: https://docs.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-storage-explorer
[42]: https://docs.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-cli
[43]: https://docs.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-powershell
[44]: https://learn.microsoft.com/training/modules/store-app-data-with-azure-blob-storage/
[45]: https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.Web%2Fsites/kind/functionapp
[46]: https://learn.microsoft.com/azure/azure-functions/functions-bindings-storage-blob-trigger?tabs=python-v2%2Cisolated-process%2Cnodejs-v4%2Cextensionv5&pivots=programming-language-csharp
[47]: https://learn.microsoft.com/azure/storage/common/storage-configure-connection-string#configure-a-connection-string-for-an-azure-storage-account
[48]: https://learn.microsoft.com/azure/azure-functions/functions-get-started
[49]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/blobs_logs_monitoring/index.js
[51]: https://app.datadoghq.com/logs
[52]: https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fintegrations-management%2Fmain%2Fazure%2Flogging_install%2Fdist%2Fforwarder.json/uiFormDefinitionUri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fintegrations-management%2Fmain%2Fazure%2Flogging_install%2Fdist%2FmanualForwarderUiDefinition.json
[53]: https://learn.microsoft.com/azure/azure-monitor/platform/diagnostic-settings
[54]: https://learn.microsoft.com/entra/workload-id/workload-identity-federation
[55]: https://app.datadoghq.com/metric/catalog