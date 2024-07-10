---
further_reading:
- link: /logs/explorer/
  tag: Documentation
  text: ログの調査方法
title: Datadog リソースによる Azure ログの送信
---

{{< site-region region="us3" >}}

## 概要

このガイドを使用して、[Azure の Datadog リソース][7]を介して、Azure サブスクリプションから Datadog に直接ログを設定し、管理します。3 種類の Azure ログの収集を管理できます。以下のセクションで説明と詳細をご覧ください。

   - [アクティビティログ](#activity-logs)
   - [Azure リソースログ](#azure-resource-logs)
   - [Azure Active Directory (Azure AD) ログ](#azure-active-directory-azure-ad-logs)

**注**: Azure の Datadog リソースは、Datadog US3 サイトの Datadog 組織でのみ利用可能です。その他の [Datadog サイト][5]を使用している場合は、構成オプションについて [Azure ログを Datadog に送信][6]のガイドを参照してください。

## アクティビティログ

[コントロールプレーン][1]におけるリソースの運用に関するインサイトを提供します。アクティビティログを使用して、書き込み作業の何、誰、いつを決定します (`PUT`、`POST`、`DELETE`)。

アクティビティログを Datadog に送信するには、**Send subscription activity logs** を選択します。このオプションを有効にしない場合、アクティビティログは Datadog に送信されません。

## Azure リソースログ 

[データプレーン][1]における Azure リソースの運用に関するインサイトを提供します。たとえば、Key Vault からシークレットを取得する、データベースへのリクエストを作成する、などはデータプレーンの運用です。リソースログのコンテンツは、Azure のサービスおよびリソースタイプにより異なります。

Azure リソースログを Datadog に送信するには、**Send Azure resource logs for all defined resources** を選択します。Azure リソースログの種類は、[Azure 監視リソースログのカテゴリー][2]に一覧があります。このオプションが有効な場合、サブスクリプションで作成された新しいリソースを含むすべてのリソースログが Datadog に送信されます。

オプションで、Azure リソースタグを使用して Datadog にログを送信する Azure リソースを絞り込むことができます。

### ログ送信のタグルール

- `include` タグのある Azure リソースは Datadog にログを送信します。
- `exclude` タグのある Azure リソースは Datadog にログを送信しません。
- 包含および除外ルールの間で競合がある場合は、除外が優先されます。

たとえば、下記のスクリーンショットは、`Datadog = True` とタグ付けされた仮想マシン、仮想マシンスケールセット、アプリサービスプランのみがメトリクスおよびログを Datadog に送信するというタグルールを示したものです。

{{< img src="integrations/azure/azure-us3-create-dd-resource3.png" alt="Azure US3 Datadog リソースログの作成" responsive="true" style="width:90%;">}}

## Azure Active Directory (Azure AD) ログ

Azure AD ログには、サインインアクティビティの履歴と、特定のテナントの Azure AD で行われた変更の監査証跡が含まれています。これらのログを Datadog に送信するには、まず Datadog リソースを作成するプロセスを完了します。Azure に Datadog リソースを作成したら、[Azure Portal の Datadog][3] ガイドのセットアップ手順に従います。

[1]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/control-plane-and-data-plane
[2]: https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/resource-logs-categories
[3]: https://docs.datadoghq.com/ja/integrations/guide/azure-portal/#azure-active-directory-logs
[4]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Datadog%2Fmonitors
[5]: /ja/getting_started/site/
[6]: /ja/logs/guide/azure-logging-guide
[7]: https://learn.microsoft.com/en-us/azure/partner-solutions/datadog/
{{< /site-region >}}

{{< site-region region="us,eu,us5,gov,ap1" >}}

<div class="alert alert-info">Azure の Datadog リソースは、Datadog の US3 サイト上の組織でのみ利用可能です。別の Datadog サイトを使用している場合、構成オプションについては、<a href="https://docs.datadoghq.com/logs/guide/azure-logging-guide/" target="_blank">Azure ログを Datadog に送信</a>のガイドを参照してください。Datadog US3 サイトを使用している場合は、このページの右側にある<a href="?site=us3" target="_blank">サイトセレクタを変更</a>してください。</div>

{{< /site-region >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}