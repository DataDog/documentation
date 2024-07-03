---
aliases:
- /ja/integrations/faq/my-Azure-vm-is-powered-down-why-is-it-still-listed-in-my-infrastructure-list
further_reading:
- link: /account_management/billing/azure/
  tag: FAQ
  text: Azure integration billing
- link: /account_management/billing/azure/#azure-vm-exclusion
  tag: Documentation
  text: Filter Azure VMs by tag
title: Powered-down Azure VMs on the Infrastructure List
---

Azure の VM をパワーダウンしても、Datadog Azure インテグレーションは、その VM のメトリクス `azure.vm.status` を収集します。このメトリクスには、`status:running`、`status:not_running`、または `status:unknown` というタグが付けられています。

これは意図的なものですが、その VM はインフラストラクチャーリストに残ります。VM がこのメトリクスのみを報告する場合、請求可能なホスト数にはカウントされません。請求に関する詳細については、Datadog [請求セクション][1]を参照してください。

Azure VM を破壊した場合、3 時間以内にインフラストラクチャーリストからフェイズアウトします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/billing/