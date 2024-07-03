---
description: Steps for programmatically managing the Azure integration with Datadog
further_reading:
- link: https://docs.datadoghq.com/integrations/azure/
  tag: Documentation
  text: Azure Integration
title: Azure Integration Programmatic Management Guide
---

## 概要

 This guide demonstrates how to programmatically manage the Azure integration with Datadog, as well as other Azure resources such as the Datadog Agent VM extension. This enables you to manage observability across multiple accounts at once.

**All sites**: すべての [Datadog サイト][3]は、このページのステップを使用して、Azure メトリクス収集のための App Registration の認証プロセスと、Azure プラットフォームログを送信するための Event Hub のセットアップを完了することができます。

**US3**: 組織が Datadog US3 サイトにある場合、Azure Native インテグレーションを使用して、Azure 環境の管理とデータ収集を効率化することができます。Datadog では、可能な限りこの方法を使用することを推奨しています。セットアップには、[Azure 内の Datadog リソース][14]を作成して、Azure サブスクリプションを Datadog 組織にリンクします。これは、メトリクス収集のためのアプリ登録の認証プロセスとログ転送のための Event Hub のセットアップを置き換えるものです。詳細は、[Azure Native Integration の管理ガイド][1]を参照してください。

## Datadog Azure integration

標準の Azure インテグレーションでは、メトリクス収集を実装するためのアプリ登録の認証プロセスと、Azure プラットフォームログを送信するための Azure Event Hub のセットアップを使用します。Datadog を Azure 環境とインテグレーションする前に、Azure でアプリ登録を作成し、Datadog が提供されたスコープ (サブスクリプションまたは管理グループ) を監視するための **Monitoring Reader** 権限で構成します。アプリ登録がまだ作成されていない場合は、[Azure Portal 経由でのインテグレーション][6]または [Azure CLI 経由でのインテグレーション][4]でセットアップ手順を参照してください。

**注**: Azure でアプリ登録を作成するときに、管理グループレベルで読み取り権限を割り当てることで、複数のサブスクリプションを監視し、管理グループ内の新しいサブスクリプションを自動的に監視することができます。

### Terraform

以下の手順に従って、[Terraform][13] を使ってインテグレーションをデプロイします。

1. [Datadog Terraform プロバイダー][15]を構成し、Terraform の構成で Datadog API と対話するように設定します。

2. 以下の例を基本テンプレートとして、Terraform のコンフィギュレーションファイルを設定します。変更を適用する前に、以下のパラメーターを確実に更新してください。
    * `tenant_name`: Azure Active Directory ID。
    * `client_id`: Your Azure application (client) ID.
    * `client_secret`: Azure Web アプリケーション秘密キー。

   さらなる使用例やオプションパラメーターの全リスト、Datadog の追加リソースについては、Terraform レジストリの [Datadog Azure インテグレーションリソース][17]ページを参照してください。

{{< code-block lang="hcl" filename="" disable_copy="false" collapsible="false" >}}

resource "datadog_integration_azure" "sandbox" {
  tenant_name   = "<AZURE_TENANT_NAME>"
  client_id     = "<AZURE_CLIENT_ID>"
  client_secret = "<AZURE_CLIENT_SECRET_KEY>"
}

{{< /code-block >}}

3. `terraform apply` を実行します。データが収集され始めるまで最大 10 分間待ち、すぐに使える Azure 概要ダッシュボードを表示して、Azure リソースから送信されたメトリクスを確認します。

#### 複数のサブスクリプションまたはテナントの管理

複数のサブスクリプションまたはテナントにまたがって Terraform リソースを管理するために、エイリアスを持つ複数の provider ブロックを使用できます。詳しくは [Provider Configuration][9] をお読みください。

### インテグレーションステータスの監視

インテグレーションが構成されると、Datadog は Azure API への連続した一連のコールを実行し始め、Azure 環境から重要な監視データを収集します。これらのコールは、時々エラーを返します (例えば、提供された資格情報が期限切れの場合など)。これらのエラーは、Datadog が監視データを収集する能力を阻害またはブロックする可能性があります。

重大なエラーが発生すると、Azure インテグレーションは Datadog イベントエクスプローラーにイベントを生成し、5 分ごとに再パブリッシュします。これらのイベントが検出されたときにトリガーし、適切なチームに通知するイベントモニターを構成することができます。

Datadog は、始めるためのテンプレートとして使用できる推奨モニターを提供します。推奨モニターを使用するには、

1. Datadog で、**Monitors** -> **New Monitor** と進み、[Recommended Monitors][19] タブを選択します。
2. `[Azure] Integration Errors` というタイトルの推奨モニターを選択します。
3. 検索クエリまたはアラート条件に必要な修正を加えます。デフォルトでは、モニターは新しいエラーが検出されるたびにトリガーされ、過去 15 分間エラーが検出されなかったときに解決されます。
4. 必要に応じて、通知メッセージと再通知メッセージを更新します。イベント自体には、イベントに関する適切な情報が含まれており、自動的に通知に含まれることに注意してください。これには、範囲、エラー応答、修復のための一般的な手順に関する詳細な情報が含まれます。
5. Azure のデータ収集に影響を与える問題についてチームにアラートが届くように、好みのチャンネル (メール、Slack、PagerDuty など) を通じて[通知の構成][20]を行います。

#### Sending logs

Azure 環境から Datadog へのログ転送を設定するには、[Azure ログガイド][18]を参照してください。

## Datadog Azure VM 拡張機能

### Terraform

Terraform を使用して、Datadog Agent 拡張機能を作成および管理することができます。以下の手順で Agent を 1 台のマシンにインストールして構成し、zip 圧縮したコンフィギュレーションファイルを blob storage にアップロードして、Terraform の VM Extension ブロックで参照します。

1. [Agent をインストールします][11]。
2. 任意の [Agent 構成][12]を適用します。
3. Windows Server 2008、Vista、およびそれ以降では、`%ProgramData%\Datadog` フォルダを zip ファイルとして保存します。Linux の場合は、`/etc/datadog-agent` フォルダを zip ファイルとして保存します。
4. blob storage にファイルをアップロードします。
5. Terraform ブロック内で blob storage の URL を参照し、VM 拡張機能を作成します。

{{< tabs >}}
{{% tab "Windows" %}}

```
  resource "azurerm_virtual_machine_extension" "example" {
  name                 = "DDAgentExtension"
  virtual_machine_id   = azurerm_virtual_machine.example.id
  publisher            = "Datadog.Agent"
  type                 = "DatadogWindowsAgent"
  type_handler_version = "2.0"
   settings = <<SETTINGS
  {
    "site":"<DATADOG_SITE>"
  }
  SETTINGS
   protected_settings = <<PROTECTED_SETTINGS
  {
    "DATADOG_API_KEY": "<DATADOG_API_KEY>"
  }
  PROTECTED_SETTINGS
```
{{% /tab %}}
{{% tab "Linux" %}}

```
  resource "azurerm_virtual_machine_extension" "example" {
  name                 = "DDAgentExtension"
  virtual_machine_id   = azurerm_virtual_machine.example.id
  publisher            = "Datadog.Agent"
  type                 = "DatadogLinuxAgent"
  type_handler_version = "2.0"
   settings = <<SETTINGS
  {
    "site":"<DATADOG_SITE>"
  }
  SETTINGS
   protected_settings = <<PROTECTED_SETTINGS
  {
    "DATADOG_API_KEY": "<DATADOG_API_KEY>"
  }
  PROTECTED_SETTINGS
```
{{% /tab %}}
{{< /tabs >}}

利用可能な引数の詳細については、Terraform レジストリの [Virtual Machine Extension リソース][10]を参照してください。

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.datadoghq.com/ja/integrations/guide/azure-portal/
[2]: https://learn.microsoft.com/en-us/cli/azure/datadog?view=azure-cli-latest
[3]: /ja/getting_started/site/
[4]: /ja/integrations/guide/azure-manual-setup/?tab=azurecli#integrating-through-the-azure-cli
[5]: /ja/integrations/azure/
[6]: /ja/integrations/guide/azure-manual-setup/?tab=azurecli#integrating-through-the-azure-portal
[9]: https://developer.hashicorp.com/terraform/language/providers/configuration
[10]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/virtual_machine_extension
[11]: https://app.datadoghq.com/account/settings/agent/latest
[12]: /ja/agent/guide/agent-configuration-files/?tab=agentv6v7
[13]: https://www.terraform.io
[14]: https://learn.microsoft.com/en-us/azure/partner-solutions/datadog/overview
[15]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[17]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_azure
[18]: /ja/logs/guide/azure-logging-guide
[19]: https://app.datadoghq.com/monitors/recommended
[20]: /ja/monitors/notify/#configure-notifications-and-automations