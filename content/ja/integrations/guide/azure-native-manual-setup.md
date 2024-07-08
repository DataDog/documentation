---
description: Datadog Azure Native インテグレーションを手動でセットアップする手順
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
title: Azure Native インテグレーション手動セットアップガイド
---

{{< site-region region="us3" >}}

## 概要

このガイドを使用して、Azure の Datadog リソースの作成を通じて、Datadog Azure Native インテグレーションを手動でセットアップします。

Datadog リソースは、Azure 環境の管理とデータ収集を効率化します。Datadog では、可能な限りこの方法を使用することを推奨しています。これは、メトリクス収集のための標準の Azure インテグレーションとログ転送のための Event Hub セットアップで使用される App Registration 資格情報プロセスを置き換えます。

### 前提条件

#### 必要なアクセス許可

Azure Native インテグレーションを設定するには、リンクしたい Azure サブスクリプションの **Owner** であり、リンク先の Datadog 組織の **Admin** である必要があります。セットアップを開始する前に、適切なアクセス権を持っていることを確認してください。

## セットアップ

Azure インテグレーションを構成するには、Azure に Datadog リソースを作成する必要があります。これらのリソースは、Datadog 組織と Azure サブスクリプション間の接続またはリンクを表します。1 つの Datadog リソースで複数の Azure サブスクリプションを Datadog に接続することができます。

Azure に Datadog リソースを作成するには、2 つのオプションがあります。

1. 既存の Datadog 組織へリンク。より一般的なアクションです。まだリンクしていない Azure サブスクリプションを監視するよう Datadog 組織を構成するには、このオプションを使用します。このアクションは、Datadog の請求プランに影響しません。

2. 新しい Datadog オーガニゼーションを作成。このフローは、あまり一般的ではありません。まだ Datadog オーガニゼーションをお持ちでなく、Azure Marketplace を通じて有料プランを始める場合はこのオプションを使用します。新しい Datadog オーガニゼーションを作成し、請求プランを選択して、関連する Azure サブスクリプションをリンクして監視できます。

**注**: Azure の **Create a new Datadog organization** オプションを使用すると、トライアルをご利用いただけません。無料トライアルを開始するには、まず [US3 サイトでトライアルの Datadog 組織を作成][1]し、リンクフローを使用して監視するサブスクリプションを追加します。

Datadog リソースを作成すると、関連するサブスクリプションのデータ収集が開始します。このリソースを使用して Datadog を構成、管理、デプロイするには、[Azure Native インテグレーションの管理][2]ガイドで詳細をご確認ください。

### Datadog リソースの作成

Azure サブスクリプションのモニタリングを開始するには、[Azure の Datadog サービスページ][3]へ移動し、新しい Datadog リソースを作成するオプションを選択します。
{{< img src="integrations/azure/azure-us3-dd-service.png" alt="Azure US3 Datadog サービス" responsive="true" style="width:90%;">}}

**Link Azure subscription to an existing Datadog organization** または **Create a new Datadog organization** を選択します。リンクの方がより一般的なアクションです。まだリンクしていない Azure サブスクリプションのモニタリングの構成に、このオプションを使用します。Datadog をまだご利用でなく、有料プランを新規で開始したいお客様のみ **Create** フローを選択してください。

{{< img src="integrations/azure/azure-us3-create-dd-resource1.png" alt="Azure US3 Datadog リソースの作成" responsive="true" style="width:90%;">}}

**注**: Azure ポータルを通じて作成された新しい Datadog 組織の請求は、Azure の請求書に自動的に統合されます。該当する場合、この使用は組織の [MACC][4] にカウントされます。

### SSO コンフィギュレーション

_(オプション)_: Azure で新しい Datadog 組織を作成するプロセスで、[シングルサインオン (SSO)][5] を構成できます。後で SSO を構成することも可能です。初めの作成時に SSO を構成するには、まず Datadog Enterprise Gallery アプリを作成します。

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
| リソースグループ       | 新しいリソースグループを作成するか、既存のものを使用します。[リソースグループ][5]は、Azure ソリューションの関連リソースを格納するコンテナです。                                                                                 |
| Resource name        | Datadog リソースの名前を指定します。推奨される名前の付け方は、次のようになります。`subscription_name-datadog_org_name`                                                                                                         |
| 場所             | 場所は West US 2 で、Datadog の US3 サイトが Azure でホストされている場所です。これは、Datadog の使用に何の影響も与えません。すべての [Datadog サイト][1]と同様に、US3 サイトは完全に SaaS で、すべての Azure リージョンのモニタリングと、他のクラウドプロバイダーおよびオンプレミスホストをサポートします。 |
| Datadog オーガニゼーション | 認証ステップが完了すると、Datadog 組織名がリンク先の Datadog 組織の名前に設定されます。Datadog サイトには US3 が設定されます。                                                                                                                                |

**Link to Datadog organization** をクリックして Datadog の認証ウィンドウを開き、Datadog にサインインします。

デフォルトで Azure は現在の Datadog オーガニゼーションを Datadog リソースにリンクします。別のオーガニゼーションをリンクする場合は、認証ウィンドウで該当するオーガニゼーションを選択します。

{{< img src="integrations/azure/azure-us3-select-org.png" alt="Azure US3 Datadog オーガニゼーションの選択" responsive="true" style="width:90%;">}}

OAuth フローが完了したら、Datadog 組織名が正しいことを確認します。

[1]: https://docs.datadoghq.com/ja/getting_started/site/
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
| 場所             | 場所は West US 2 で、Datadog の US3 サイトが Azure でホストされている場所です。これは、Datadog の使用に何の影響も与えません。すべての [Datadog サイト][1]と同様に、US3 サイトは完全に SaaS で、すべての Azure リージョンのモニタリングと、他のクラウドプロバイダーおよびオンプレミスホストをサポートします。 |
| Datadog オーガニゼーション | Datadog のオーガニゼーション名はリソース名に、Datadog サイトは US3 に設定されています。                                                                                                                                |
| 料金プラン         | 利用可能な Datadog 料金プランのリスト。プライベートオファーがある場合は、このドロップダウンに表示されます。                                                                                                                 |
| 請求期間         | 月間。                                                                                                                                                                                                                      |

[1]: https://docs.datadoghq.com/ja/getting_started/site/
[2]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/overview#resource-groups
{{% /tab %}}
{{< /tabs >}}

## Virtual machine agent

サブスクリプション内の仮想マシン (VM) のリストを表示するには、左側のサイドバーで **Virtual machine agent** を選択します。このページでは、拡張機能として Datadog Agent を VM にインストールできます。

{{< img src="integrations/guide/azure_native_manual_setup/azure_native_vm_extension.png" alt="仮想マシン Agent が選択され、Install extension オプションがハイライトされている Azure の Datadog リソース" responsive="true" style="width:90%;">}}

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

#### Install

Datadog Agent をインストールするには、適切な VM を選択し、**Install Agent** をクリックします。ポータルで、デフォルトのキーを使用して Agent をインストールすることの確認が求められます。**OK** を選択してインストールを開始します。Agent がインストールされてプロビジョニングされるまで、Azure はステータスを `Installing` (インストール中) と表示します。Datadog Agent がインストールされると、ステータスが `Installed` (インストール済み) に変わります。

#### アンインストール

Datadog Agent が Azure VM 拡張機能とともにインストールされている場合は、適切な VM を選択して、**Uninstall Agent** をクリックすることで、Agent をアンインストールできます。

Agent が別の方法でインストールされた場合、Datadog リソースを使用して Agent をデプロイまたは削除することはできませんが、Agent に関する情報は引き続きこのページに反映されます。


[1]: https://us3.datadoghq.com/signup
[2]: https://docs.datadoghq.com/ja/integrations/guide/azure-portal/
[3]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Datadog%2Fmonitors
[4]: https://learn.microsoft.com/en-us/partner-center/marketplace/azure-consumption-commitment-enrollment
[5]: https://docs.datadoghq.com/ja/integrations/azure/?tab=link#saml-sso-configuration
{{< /site-region >}}

{{< site-region region="us,eu,us5,gov,ap1" >}}
<div class="alert alert-info">Azure Native インテグレーションは、Datadog の US3 サイト上の組織でのみ利用可能です。別の Datadog サイトを使用している場合は、Azure サブスクリプションへの読み取り権限を持つアプリ登録を作成する手順について、<a href="https://docs.datadoghq.com/integrations/guide/azure-manual-setup/" target="_blank">Azure 手動セットアップガイド</a>を参照してください。Datadog US3 サイトを使用している場合は、このページの右側にある<a href="?site=us3" target="_blank">サイトセレクタを変更</a>してください。</div>

[1]: ?site=us3
{{< /site-region >}}

{{< partial name="whats-next/whats-next.html" >}}