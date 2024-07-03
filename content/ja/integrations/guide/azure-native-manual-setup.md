---
description: Steps for manually setting up the Datadog Azure native integration
further_reading:
- link: https://docs.datadoghq.com/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: Documentation
  text: Why should I install the Datadog Agent on my cloud instances?
- link: https://docs.datadoghq.com/integrations/guide/azure-portal/
  tag: Documentation
  text: Datadog in the Azure Portal
- link: https://www.datadoghq.com/blog/azure-government-monitoring-datadog/
  tag: Blog
  text: Monitor Azure Government with Datadog
- link: https://www.datadoghq.com/blog/azure-container-apps/
  tag: Blog
  text: Monitor Azure Container Apps with Datadog
- link: https://www.datadoghq.com/blog/how-to-monitor-microsoft-azure-vms/
  tag: Blog
  text: How to Monitor Microsoft Azure VMs
- link: https://www.datadoghq.com/blog/azure-app-service-datadog-serverless-view/
  tag: Blog
  text: Explore Azure App Service with the Datadog Serverless view
title: Azure Native Integration Manual Setup Guide
---

{{< site-region region="us3" >}}

## 概要

Use this guide to manually set up the Datadog Azure Native integration through creation of the Datadog resource in Azure.

The Datadog resource streamlines management and data collection for your Azure environment. Datadog recommends using this method when possible. This replaces the App Registration credential process used by the standard Azure integration for metric collection and Event Hub setup for log forwarding.

### 前提条件

#### 必要なアクセス許可

To set up the Azure Native integration, you must be an **Owner** on any Azure subscriptions you want to link, and **Admin** for the Datadog organization you are linking them to. Ensure you have the appropriate access before starting the setup.

## セットアップ

Configuring the Azure integration requires the creation of a Datadog resource in Azure. These resources represent the connection or link between a Datadog organization and an Azure subscription. Multiple Azure subscriptions can be connected to Datadog with a single Datadog resource. 

Azure に Datadog リソースを作成するには、2 つのオプションがあります。

1. 既存の Datadog 組織へリンク。より一般的なアクションです。まだリンクしていない Azure サブスクリプションを監視するよう Datadog 組織を構成するには、このオプションを使用します。このアクションは、Datadog の請求プランに影響しません。

2. 新しい Datadog オーガニゼーションを作成。このフローは、あまり一般的ではありません。まだ Datadog オーガニゼーションをお持ちでなく、Azure Marketplace を通じて有料プランを始める場合はこのオプションを使用します。新しい Datadog オーガニゼーションを作成し、請求プランを選択して、関連する Azure サブスクリプションをリンクして監視できます。

**Note**: Trials are not available through the **Create a new Datadog organization** option in Azure. To get started with a free trial, first [create a trial Datadog org on the US3 site][1]. Then use the linking flow to add any subscriptions you want to monitor.

Once you create a Datadog resource, data collection begins for the associated subscription. See details for using this resource to configure, manage, and deploy Datadog in the [Managing the Azure Native Integration][2] guide.

### Create a Datadog resource

To start monitoring an Azure subscription, navigate to the [Datadog Service page in Azure][3] and select the option to create a new Datadog resource:
{{< img src="integrations/azure/azure-us3-dd-service.png" alt="Azure US3 Datadog Service" responsive="true" style="width:90%;">}}

**Link Azure subscription to an existing Datadog organization** または **Create a new Datadog organization** を選択します。リンクの方がより一般的なアクションです。まだリンクしていない Azure サブスクリプションのモニタリングの構成に、このオプションを使用します。Datadog をまだご利用でなく、有料プランを新規で開始したいお客様のみ **Create** フローを選択してください。

{{< img src="integrations/azure/azure-us3-create-dd-resource1.png" alt="Azure US3 Datadog リソースの作成" responsive="true" style="width:90%;">}}

**Note**: New Datadog organizations created through the Azure portal automatically have billing consolidated into their Azure invoice. This usage counts towards your organization's [MACC][4] if applicable.

### SSO コンフィギュレーション

_(Optional)_: You can configure [single sign-on (SSO)][5] during the process of creating a new Datadog organization in Azure. You can also configure SSO later. To configure SSO during the initial creation, first create a Datadog enterprise gallery app.

### コンフィギュレーション {#configuration-us3}

{{< tabs >}}
{{% tab "Link" %}}

#### ベーシック {#basics-link}

既存の Datadog オーガニゼーションへのリンクを選択すると、Datadog リソースを作成するためのフォームがポータルに表示されます。
{{< img src="integrations/azure/azure-us3-link-sub.png" alt="Link Azure サブスクリプションを既存の Datadog オーガニゼーションにリンク" responsive="true" style="width:90%;">}}

次の値を指定します。

| プロパティ             | 説明                                                                                                                                                                                                                  |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| サブスクリプション         | Datadog で監視する Azure サブスクリプション。Datadog リソースはこのサブスクリプションに存在します。オーナーのアクセス権限が必要です。                                                                                       |
| リソースグループ       | Create a new resource group or use an existing one. A [resource group][5] is a container that holds related resources for an Azure solution.                                                                                 |
| Resource name        | Datadog リソースの名前を指定します。推奨される名前の付け方は、次のようになります。`subscription_name-datadog_org_name`                                                                                                         |
| 所在地             | The location is West US2—this is the location where Datadog's US3 site is hosted in Azure. This has no impact on your use of Datadog. Like all [Datadog sites][1], the US3 site is entirely SaaS and supports monitoring all Azure regions as well as other cloud providers and on-premises hosts. |
| Datadog オーガニゼーション | 認証ステップが完了すると、Datadog 組織名がリンク先の Datadog 組織の名前に設定されます。Datadog サイトには US3 が設定されます。                                                                                                                                |

**Link to Datadog organization** をクリックして Datadog の認証ウィンドウを開き、Datadog にサインインします。

デフォルトで Azure は現在の Datadog オーガニゼーションを Datadog リソースにリンクします。別のオーガニゼーションをリンクする場合は、認証ウィンドウで該当するオーガニゼーションを選択します。

{{< img src="integrations/azure/azure-us3-select-org.png" alt="Azure US3 Datadog オーガニゼーションの選択" responsive="true" style="width:90%;">}}

When the OAuth flow is complete, verify the Datadog organization name is correct.

[1]: /ja/getting_started/site/
[2]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/overview#resource-groups
[5]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/overview#resource-groups
{{% /tab %}}
{{% tab "Create" %}}

#### ベーシック {#basics-create}

新しい Datadog オーガニゼーションの作成を選択すると、Datadog リソースおよび 新しい Datadog オーガニゼーションの両方を作成するためのフォームがポータルに表示されます。
{{< img src="integrations/azure/azure-us3-create-dd-resource2.png" alt="Azure US3 Datadog リソースの作成" responsive="true" style="width:90%;">}}

次の値を指定します。

| プロパティ             | 説明                                                                                                                                                                                                                  |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| サブスクリプション         | Datadog で監視する Azure サブスクリプション。Datadog リソースはこのサブスクリプションに存在します。オーナーのアクセス権限が必要です。                                                                                       |
| リソースグループ       | 新しいリソースグループを作成するか、既存のものを使用します。[リソースグループ][2]は、Azure ソリューションの関連リソースを格納するコンテナです。                                                                                 |
| Resource name        | Datadog リソースの名前。この名前が新しい Datadog オーガニゼーションに割り当てられます。                                                                                                                                    |
| 所在地             | The location is West US2—this is the location where Datadog's US3 site is hosted in Azure. This has no impact on your use of Datadog. Like all [Datadog sites][1], the US3 site is entirely SaaS and supports monitoring all Azure regions as well as other cloud providers and on-premises hosts. |
| Datadog オーガニゼーション | Datadog のオーガニゼーション名はリソース名に、Datadog サイトは US3 に設定されています。                                                                                                                                |
| 料金プラン         | 利用可能な Datadog 料金プランのリスト。プライベートオファーがある場合は、このドロップダウンに表示されます。                                                                                                                 |
| 請求期間         | 月間。                                                                                                                                                                                                                      |

[1]: /ja/getting_started/site/
[2]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/overview#resource-groups
{{% /tab %}}
{{< /tabs >}}

### Datadog Agent のデプロイ

{{< tabs >}}
{{% tab "VM 拡張機能" %}}

サブスクリプション内の仮想マシン (VM) のリストを表示するには、左側のサイドバーで **Virtual machine agent** を選択します。このページでは、拡張機能として Datadog Agent を VM にインストールできます。

{{< img src="integrations/guide/azure_native_manual_setup/azure_native_vm_extension.png" alt="Azure の Datadog リソース (Virtual machine Agent が選択され、Install extension オプションが強調表示されています)" responsive="true" style="width:90%;">}}

VM ごとに、次の情報が表示されます。

| 列               | 説明                                                                                                                                                    |
|----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Resource name        | VM の名前                                                                                                                                                  |
| Resource status      | VM が停止しているか実行しているか。Datadog Agent は、実行中の VM にのみインストールできます。VM が停止している場合、Datadog Agent のインストールは無効になります。 |
| Agent バージョン        | Datadog Agent のバージョン番号                                                                                                                               |
| Agent のステータス         | Datadog Agent が VM で実行されているかどうか。                                                                                                                |
| Integrations enabled | Datadog Agent で有効なインテグレーションによって収集される主要なメトリクス。                                                                                  |
| Install method       | Chef、Azure VM 拡張機能など、Datadog Agent のインストールに使用される特定のツール。                                                                    |
| Sending logs         | Datadog Agent が Datadog にログを送信しているかどうか。                                                                                                          |

#### インストール

VM 拡張機能を利用して Azure で直接 Datadog Agent をインストールできます。Datadog Agent のインストール方法は以下の通りです。

1. 適切な VM を選択します。
2. **Install Extension** をクリックします。
3. ポータルで、デフォルトのキーを使用して Agent をインストールすることの確認が求められます。**OK** を選択してインストールを開始します。Agent がインストールされてプロビジョニングされるまで、Azure はステータスを `Installing` (インストール中) と表示します。Datadog Agent がインストールされると、ステータスが `Installed` (インストール済み) に変わります。

#### アンインストール

Datadog Agent が Azure VM 拡張機能でインストールされた場合

1. 適切な VM を選択します。
2. **Uninstall Agent** をクリックします。

Agent が別の方法でインストールされている場合、Datadog リソースを使って Agent をデプロイまたは削除することはできませんが、このページには引き続き Agent に関する情報が表示されます。

{{% /tab %}}
{{% tab "AKS クラスター拡張機能" %}}

Datadog AKS クラスター拡張機能を使用すると、Azure AKS 内に Datadog Agent をネイティブにデプロイできるため、サードパーティの管理ツールの複雑さを回避できます。

#### インストール

AKS クラスター拡張機能を使って Datadog Agent をインストールするには

1. 左サイドバーの **Monitored Resources** セクションにある AKS クラスターをクリックします。
2. AKS クラスターの左サイドバーから、**Settings** の下にある **Extensions + applications** を選択します。
3. `Datadog AKS Cluster Extension` を検索して選択します。
4. **Create** をクリックし、表示される指示に従って [Datadog の資格情報][1]と [Datadog のサイト][2]を使用してください。

#### アンインストール

1. 左サイドバーの **Monitored Resources** セクションにある AKS クラスターをクリックします。
2. AKS クラスターの左サイドバーから、**Settings** の下にある **Extensions + applications** を選択します。
3. Datadog AKS クラスター拡張機能 (その **Type** は `Datadog.AKSExtension`) を選択します。
4. **Uninstall** をクリックします。

[1]: /ja/account_management/api-app-keys/
[2]: /ja/getting_started/site/
{{% /tab %}}
{{< /tabs >}}

[1]: https://us3.datadoghq.com/signup
[2]: https://docs.datadoghq.com/ja/integrations/guide/azure-portal/
[3]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Datadog%2Fmonitors
[4]: https://learn.microsoft.com/en-us/partner-center/marketplace/azure-consumption-commitment-enrollment
[5]: https://docs.datadoghq.com/ja/integrations/azure/?tab=link#saml-sso-configuration
{{< /site-region >}}

{{< site-region region="us,eu,us5,gov,ap1" >}}
<div class="alert alert-info">Azure ネイティブインテグレーションは、Datadog の US3 サイト上の組織でのみ利用可能です。別の Datadog サイトを使用している場合は、Azure サブスクリプションへの読み取り権限を持つアプリ登録を作成する手順について、<a href="https://docs.datadoghq.com/integrations/guide/azure-manual-setup/" target="_blank">Azure マニュアルセットアップガイド</a>を参照してください。Datadog US3 サイトを使用している場合は、このページの右側にある<a href="?site=us3" target="_blank">サイトセレクタを変更</a>してください。</div>

[1]: ?site=us3
{{< /site-region >}}

{{< partial name="whats-next/whats-next.html" >}}