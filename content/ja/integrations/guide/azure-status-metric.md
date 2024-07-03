---
aliases:
- /ja/integrations/faq/azure-vm-status-is-not-reporting
- /ja/integrations/faq/azure-status-metric
title: Azure のステータスとカウントメトリクス
---

## 概要

Datadog は、[Azure インテグレーション][1]で監視している各リソースに対して、`azure.*.status` と `azure.*.count` という 2 つの追加のメトリクスを生成します。例えば、Datadog で監視している Azure Virtual Machines は、`azure.vm.status` と `azure.vm.count` をレポートします。この 2 つのメトリクスは、同様の情報をカバーしています。

`zure.*.count` メトリクスは `azure.*.status` を改良したもので、非推奨となっています。

## カウントメトリクス

`azure.*.count` メトリクスは、2 つの基本的な情報を提供します。

- そのタイプのリソースの数。
- Azure から報告された各リソースのステータス。

`azure.*.count` メトリクスは、そのリソースタイプの他のメトリクスと同じネームスペースに作成されます (例: `azure.network_loadbalancers.count`)。そのネームスペース内の他のメトリクスと同じメタデータタグをすべて含み、さらに `status` のタグも追加されます。

### ユースケース

`azure.*.count` メトリクスを使うと以下のことができます。

- すべてに対する `azure.vm.count` をグラフ化し、`status` で合計することで、時間経過に対する仮想マシンの数をステータス別に表示するビューを作成します。
- ダッシュボードにクエリウィジェットを作成し、指定されたリソースタイプの数を表示します。利用可能なタグを使用して、地域、リソースグループ、種類、ステータスなど、関連する集計にカウントをスコープします。
- さまざまな Azure リソースのステータスをアラートするためのモニターを作成します。

**注**: デフォルトの視覚化設定により、チャートやクエリウィジェットでリソースが断続的にダブルカウントされているように見える場合があります。これは、特定のステータスにスコープされたモニターまたはウィジェットには影響しません。
Interpolation > none を設定してチャートやクエリウィジェットで[補間][2]をオフにするか、`.fill(null)` を使用すると、この効果を減らすことができます。

ほとんどのリソースタイプで、可能性のあるステータスは次のとおりです。

- Running
- Unavailable
- Unknown
- Degraded
- Failed

仮想マシンには、より詳細なステータスがあります。

- Running
- Stopped_deallocated
- Stopped
- Unknown
- Unavailable
- Degraded
- Failed

`query_failed` というステータスが表示された場合、Azure の [Resource Health プロバイダー](#troubleshooting)を有効化する必要があります。

## ステータスメトリクス

`azure.*.status` メトリクスは、この同じ種類の情報に対する以前のソリューションです。これは、各 Azure リソースタイプの利用可能なリソースの数をレポートします。

### 相違点

`.status` と `.count` のメトリクスの主な違い:

- `azure.*.count` は Azure アカウントに存在するすべてのリソースを含み、`azure.*.status` は利用可能なリソースの数のみを報告します。
- `azure.*.count` には `status` タグが含まれ、リソースの特定の利用可能状態を報告します。一方 `azure.*.status` にはリソースタイプに応じた標準のタグだけが含まれます。
- `azure.*.count` には、メトリクス値の精度と信頼性の向上が含まれています。

## トラブルシューティング

Azure インテグレーションがメトリクスを報告しているが、`azure.*.status` を返していない、または `azure.*.count` が `status:query_failed` を返している場合、Azure サブスクリプションが Azure Resource Health プロバイダーを登録する必要があります。

Azure コマンドラインインターフェイスの使用:
```bash
azure login # Datadog アカウントに関連付けられた Azure ユーザーにログインします
azure config mode arm
azure provider register Microsoft.ResourceHealth
```

Datadog では 5～10 分以内に `azure.*.status` というメトリクスが表示されるはずです。

[1]: /ja/integrations/azure/
[2]: /ja/metrics/guide/interpolation-the-fill-modifier-explained/