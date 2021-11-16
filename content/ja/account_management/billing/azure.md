---
title: Azure インテグレーションの請求
kind: documentation
---
## 概要

[Datadog で監視されているすべての Azure 仮想マシン][1]に対して課金が発生します。これらのマシンは、Datadog Agent がインストールされているかどうかにかかわらず、課金対象になります。Azure インテグレーションによって使用される Azure VM で Agent を実行している場合、二重に課金されることはありません。

また、Datadog は Azure App Service Plan 内のノードも課金対象ホストとしてカウントします。**注**: Shared、Dynamic または Free ティアの App Service Plans にはノード数が関連付けられておらず、Datadog の請求には影響しません。
Azure インテグレーションは、毎月の請求に影響を与えることなく、他のすべての Azure リソース (Azure SQL DB、Azure Redis Cache、Azure Load Balancer など) のメトリクスを収集します。

## Azure VM の除外

Datadog-Azure インテグレーションタイルを使用して、Datadog によって監視される VM をフィルタリングします。Configuration タブに移動して、既存の App Registration を編集するか、新規追加します。各フィルターは、“Optionally limit metrics collection to hosts with tag:” の設定に基づいて制御されます。

インテグレーションタイルで既存の Azure テナントに制限を追加した場合は、それまでに検出された VM がインフラストラクチャーリストに最長 2 時間残る可能性があります。移行時間中、VM のステータスは `???` と表示されます。これは、課金対象に含まれません。

Agent が実行されている VM は引き続き表示され、課金対象に含まれます。制限オプションの使用は、Agent が実行されていない VM にのみ適用されます。

## Azure App Service Plan の除外

Datadog-Azure インテグレーションタイルを使用して、Datadog によって監視される Azure App Service Plan をフィルタリングします。Configuration タブに移動して、既存の App Registration を編集するか、新規追加します。フィルターは、“Optionally limit metrics collection to App Service Plans with tag:” の設定に基づいて制御されます。

**注**: これは、App Service Plan で実行されているすべてのアプリまたは関数のメトリクスをフィルターします。

## トラブルシューティング

技術的な質問については、[Datadog のサポートチーム][2]にお問い合わせください。

課金に関するご質問は、[カスタマーサクセス][3]マネージャーにお問い合わせください。

[1]: https://app.datadoghq.com/account/settings#integrations/azure
[2]: /ja/getting_started/tagging/using_tags/#integrations
[3]: /ja/infrastructure/