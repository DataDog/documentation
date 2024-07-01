---
description: Datadog と Azure インテグレーションをプログラムで管理する手順
further_reading:
- link: https://docs.datadoghq.com/integrations/azure/
  tag: Documentation
  text: Azure インテグレーション
title: Azure インテグレーションプログラム管理ガイド
---

## 概要

このガイドでは、Datadog と Azure インテグレーション、および Datadog Agent VM 拡張機能などの他の Azure リソースをプログラムで管理する方法を示します。これにより、一度に複数のアカウントで観測可能性を管理することができます。

**全サイト**: すべての Datadog サイトは、このページのステップを使用して、Azure メトリクス収集のための App Registration 資格情報プロセスと、Azure Platform Logs を送信するための Event Hub セットアップを完了することができます。

**US3:** Datadog US3 サイトに組織がある場合、Azure Native インテグレーションを使用して、Azure 環境の管理およびデータ収集を効率化できます。Datadog では、可能な限りこの方法を使用することを推奨しています。セットアップには、Azure サブスクリプションを Datadog 組織にリンクするための [Datadog リソースを Azure に][14]作成することが必要です。これは、メトリクス収集のためのアプリ登録資格情報プロセスと、ログ転送のための Event Hub セットアップを置き換えるものです。

## Datadog Azure インテグレーション

標準の Azure インテグレーションプロセスでは、メトリクス収集を実装するためのアプリ登録資格情報プロセスと、Azure Platform Logs を送信するための Event Hub セットアップを使用します。Datadog アカウントが Datadog の [US3 サイト][3]でホストされている場合、[Azure の Datadog リソース][14]を使用して、Azure 環境と Datadog インテグレーションを作成および管理することができます。これは、Azure Native インテグレーションと呼ばれ、ログやメトリクス収集の構成、Datadog Agent のデプロイ、アカウント設定の管理が可能です。詳細は、[Azure Native インテグレーションの管理][4]を参照してください。

Datadog アカウントが他の [Datadog サイト][3]でホストされている場合は、標準の [Azure インテグレーション][5]を使用して、Azure 環境からモニタリングデータを収集します。

CLI を使用したい場合は、[Datadog の Azure CLI][2] を参照してください。

### Terraform

以下の手順に従って、[Terraform][13] を使ってインテグレーションをデプロイします。

1. [Datadog Terraform プロバイダー][15]を構成し、Terraform の構成で Datadog API と対話するように設定します。

2. 以下の例を基本テンプレートとして、Terraform のコンフィギュレーションファイルを設定します。変更を適用する前に、以下のパラメーターを確実に更新してください。
    * `azure_tenant_name`: Azure Active Directory ID。
    * `client_id`: Azure Web アプリケーションのシークレットキー。
    * `client_secret`: Azure Web アプリケーションのシークレットキー。

   さらなる使用例やオプションパラメーターの全リスト、Datadog の追加リソースについては、Terraform レジストリの [Datadog Azure インテグレーションリソース][17]ページを参照してください。

{{< code-block lang="hcl" filename="" disable_copy="false" collapsible="false" >}}

resource "datadog_integration_azure" "sandbox" {
  tenant_name   = "<AZURE_TENANT_NAME>"
  client_id     = "<AZURE_CLIENT_ID>"
  client_secret = "<AZURE_CLIENT_SECRET_KEY>"
}

{{< /code-block >}}

3. `terraform apply` を実行します。データ収集が開始されるまで最大 10 分待ち、すぐに使える Azure 概要ダッシュボードを表示し、Azure リソースから送信されるメトリクスを確認します。

#### 複数のサブスクリプションまたはテナントの管理

複数のサブスクリプションまたはテナントにまたがって Terraform リソースを管理するために、エイリアスを持つ複数のプロバイダーブロックを使用できます。詳しくは[プロバイダーの構成][9]をお読みください。

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

Terraform を使用して、Datadog Agent 拡張機能を作成および管理することができます。以下の手順で Agent を 1 台のマシンにインストールして構成し、zip 圧縮したコンフィギュレーションファイルを Blob ストレージにアップロードして、VM 拡張機能の Terraform ブロックで参照します。

1. [Agent をインストールします][11]。
2. 任意の [Agent 構成][12]を適用します。
3. Windows Server 2008、Vista、およびそれ以降では、`%ProgramData%\Datadog` フォルダを zip ファイルとして保存します。Linux の場合は、`/etc/datadog-agent` フォルダを zip ファイルとして保存します。
4. Blob ストレージにファイルをアップロードします。
5. Terraform ブロック内で Blob ストレージの URL を参照し、VM 拡張機能を作成します。

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

利用可能な引数の詳細については、Terraform レジストリの[仮想マシン拡張機能リソース][10]を参照してください。

{{< partial name="whats-next/whats-next.html" >}}


[2]: https://learn.microsoft.com/en-us/cli/azure/datadog?view=azure-cli-latest
[3]: /ja/getting_started/site/
[4]: /ja/integrations/guide/azure-portal/
[5]: /ja/integrations/azure/
[6]: /ja/agent/basic_agent_usage/ansible/
[7]: /ja/integrations/azure_container_service/
[9]: https://developer.hashicorp.com/terraform/language/providers/configuration
[10]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/virtual_machine_extension
[11]: https://app.datadoghq.com/account/settings/agent/latest
[12]: /ja/agent/guide/agent-configuration-files/?tab=agentv6v7
[13]: https://www.terraform.io
[14]: https://learn.microsoft.com/en-us/azure/partner-solutions/datadog/overview
[15]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[16]: https://learn.microsoft.com/en-us/cli/azure/monitor/diagnostic-settings?view=azure-cli-latest#az-monitor-diagnostic-settings-create
[17]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_azure
[18]: /ja/logs/guide/azure-logging-guide
[19]: https://app.datadoghq.com/monitors/recommended
[20]: /ja/monitors/notify/#notify-your-team