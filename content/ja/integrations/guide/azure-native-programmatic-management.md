---
description: Datadog と Azure Native インテグレーションをプログラムで管理する手順
further_reading:
- link: https://docs.datadoghq.com/integrations/azure/
  tag: Documentation
  text: Azure インテグレーション
- link: https://docs.datadoghq.com/integrations/guide/azure-portal
  tag: Documentation
  text: Azure Native インテグレーションの管理
title: Azure Native インテグレーションプログラム管理ガイド
---

{{< site-region region="us3" >}}

## 概要

Azure Native インテグレーションは、Azure の Datadog リソースを使用して、Azure 環境の管理とデータ収集を効率化します。Datadog では、可能な限りこの方法を使用することを推奨しています。この方法では、[azurerm_datadog_monitor][3] リソースを作成し、[Monitoring Reader ロール][4]を割り当てて、Azure サブスクリプションを Datadog 組織にリンクします。これは、メトリクス収集のための App Registration 資格情報プロセスとログ転送のための Event Hub セットアップを置き換えるものです。

## セットアップ

**注**: Azure Native インテグレーションを設定するには、リンクしたい Azure サブスクリプションの Owner であり、リンク先の Datadog 組織の Admin である必要があります。

### Terraform

1. [Terraform Azure プロバイダー][1]の構成が完了していることを確認してください。

2. `azurerm_datadog_monitor` リソースを作成し、Terraform で `Monitoring Reader` ロールの割り当てを実行するには、下のテンプレートを使用してください。

#### Azure Datadog Monitor リソース

{{< code-block lang="hcl" filename="" disable_copy="false" collapsible="false" >}}

resource "azurerm_resource_group" "example" {
  name     = "<NAME>"
  location = "<AZURE_REGION>"
}
resource "azurerm_datadog_monitor" "example" {
  name                = "<NAME>"
  resource_group_name = azurerm_resource_group.example.name
  location            = azurerm_resource_group.example.location
  datadog_organization {
    api_key         = "<DATADOG_API_KEY>"
    application_key = "<DATADOG_APPLICATION_KEY>"
  }
  user {
    name  = "<NAME>"
    email = "<EMAIL>"
  }
  sku_name = "Linked"
  identity {
    type = "SystemAssigned"
  }
}

{{< /code-block >}}

#### Reader ロールの監視

{{< code-block lang="hcl" filename="" disable_copy="false" collapsible="false" >}}

data "azurerm_subscription" "primary" {}

data "azurerm_role_definition" "monitoring_reader" {
  name = "Monitoring Reader"
}

resource "azurerm_role_assignment" "example" {
  scope              = data.azurerm_subscription.primary.id
  role_definition_id = data.azurerm_role_definition.monitoring_reader.role_definition_id
  principal_id       = azurerm_datadog_monitor.example.identity.0.principal_id
}

{{< /code-block >}}

3. `terraform apply` を実行します。

## ログの収集

Azure アカウントで Datadog リソースのセットアップが完了したら、Azure ポータルを通じてログの収集を構成します。詳細については、Azure ドキュメントの[メトリクスとログの構成][5]を参照してください。

[1]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs
[2]: /ja/integrations/guide/azure-portal/
[3]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/datadog_monitors
[4]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/datadog_monitors#role-assignment
[5]: https://learn.microsoft.com/en-us/azure/partner-solutions/datadog/create#configure-metrics-and-logs
{{< /site-region >}}

{{< site-region region="us,us5,eu,ap1,gov" >}}

<div class="alert alert-info">Azure Native インテグレーションは、Datadog の US3 サイトの組織のみご利用いただけます。それ以外の <a href="https://docs.datadoghq.com/getting_started/site/" target="_blank">Datadog サイト</a>をご利用の場合は、標準の <a href="https://docs.datadoghq.com/integrations/guide/azure-programmatic-management/" target="_blank">Azure プログラム管理ガイドガイド</a>を参照してください。Datadog US3 サイトをご利用の場合は、本ページの右側にある<a href="?site=us3" target="_blank">サイトセレクターを変更</a>してください。</div>

{{< /site-region >}}

{{< partial name="whats-next/whats-next.html" >}}