---
title: Azure Integration Billing
---

## 概要

[Datadog で監視されているすべての Azure 仮想マシン][1]に対して課金が発生します。これらのマシンは、Datadog Agent がインストールされているかどうかにかかわらず、課金対象になります。Azure インテグレーションによって使用される Azure VM で Agent を実行している場合、二重に課金されることはありません。さらに、Datadog は、Azure App Service Plans 内のノードを請求対象のホストとしてカウントします。

**注**: Shared、Dynamic、Free ティアの App Service Plans には、関連するノードカウントはなく、Datadog の請求には影響しません。

Azure インテグレーションは、その他のすべての Azure リソース (Azure SQL DB、Azure Redis Cache、Azure Load Balancer など) のメトリクスを、毎月の請求に影響を与えることなく収集します。収集されるメトリクスの包括的なリストについては、[Azure Monitor でサポートされるメトリクス][6]を参照してください。

## Azure VM の除外

Datadog-Azure インテグレーションタイルを使用して、Datadog によって監視される VM をフィルタリングします。Configuration タブに移動して、既存の App Registration を編集するか、新規追加します。各フィルターは、"Optionally limit metrics collection to hosts with tag:" の設定に基づいて制御されます。

インテグレーションタイルで既存の Azure テナントに制限を追加した場合は、それまでに検出された VM がインフラストラクチャーリストに最長 2 時間残る可能性があります。移行時間中、VM のステータスは `???` と表示されます。これは、課金対象に含まれません。

Agent が実行されている VM は引き続き表示され、課金対象に含まれます。制限オプションの使用は、Agent が実行されていない VM にのみ適用されます。

## Azure App Service Plan の除外

Datadog-Azure インテグレーションタイルを使用して、Datadog によって監視される Azure App Service Plan をフィルタリングします。Configuration タブに移動して、既存の App Registration を編集するか、新規追加します。フィルターは、"Optionally limit metrics collection to App Service Plans with tag:" の設定に基づいて制御されます。

**注**: これは、App Service Plan で実行されているすべてのアプリまたは関数のメトリクスをフィルターします。

## App Insights カスタムメトリクス

[カスタムメトリクスの収集を有効にする][5]場合、Datadog は、インテグレーション範囲内の Azure App Insights インスタンスに書き込まれたすべてのカスタムメトリクスを収集します。これらのメトリクスは、Datadog ではカスタムメトリクスとみなされ、コストに影響を与える可能性があります。[カスタムメトリクス請求ガイド][4]を参照してください。

## トラブルシューティング

技術的な質問については、[Datadog のサポートチーム][2]にお問い合わせください。

課金に関するご質問は、[カスタマーサクセス][3]マネージャーにお問い合わせください。

[1]: https://app.datadoghq.com/account/settings#integrations/azure
[2]: /ja/getting_started/tagging/using_tags/#integrations
[3]: /ja/infrastructure/
[4]: /ja/account_management/billing/custom_metrics/?tab=countrate
[5]: /ja/integrations/azure#configuration
[6]: https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/metrics-supported