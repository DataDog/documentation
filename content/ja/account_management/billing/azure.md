---
title: Azure インテグレーションの課金
kind: faq
---
## 概要

Datadog で監視されているすべての Azure 仮想マシンに対して課金が発生します。これらのマシンは、Datadog Agent がインストールされているかどうかにかかわらず、課金対象になります。Azure インテグレーションによって使用される Azure VM で Agent を実行している場合、**二重に課金されることはありません**。

他の Azure リソース (Azure SQL、Azure App Services、Azure Redis Cache など) は毎月の請求に含まれません。

### VM の除外

[Datadog-Azure インテグレーションタイル][1]を使用して、Datadog が監視する VM を絞り込むことができます。**Configuration** タブに移動し、既存のテナントを編集するか、新しいテナントを追加します。各テナントは、**Optionally filter to VMs with tag** の設定に基づいて制御されます。次は、[ホストタグ][2]で VM を制限する例です。

{{< img src="account_management/billing/azure_vm_filter.png" alt="Azure VM Filter" responsive="true">}}

インテグレーションタイルで既存の Azure テナントに制限を追加した場合は、それまでに検出された VM が[インフラストラクチャーリスト][3]に最長 24 時間残る可能性があります。移行時間中、VM のステータスは `???` と表示されます。これは、課金対象に含まれません。

Agent が実行されている VM は引き続き表示され、課金対象に含まれます。制限オプションの使用は、Agent が実行されていない VM にのみ適用されます。

## トラブルシューティング
技術的な質問については、[Datadog のサポートチーム][4]にお問い合わせください。

課金に関するご質問は、[カスタマーサクセス][5]マネージャーにお問い合わせください。

[1]: https://app.datadoghq.com/account/settings#integrations/azure
[2]: /ja/tagging/using_tags/#integrations
[3]: /ja/graphing/infrastructure
[4]: /ja/help
[5]: mailto:success@datadoghq.com