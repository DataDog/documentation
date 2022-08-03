---
aliases:
- /ja/integrations/faq/my-Azure-vm-is-powered-down-why-is-it-still-listed-in-my-infrastructure-list
further_reading:
- link: /account_management/billing/azure/
  tag: よくあるご質問
  text: Azure インテグレーションの課金
- link: /integrations/azure/#configuration
  tag: ドキュメント
  text: タグで Azure VM をフィルターする
kind: ガイド
title: インフラストラクチャーリストのパワーダウンした Azure VM
---

Azure の VM をパワーダウンしても、Datadog Azure インテグレーションは、その VM のメトリクス `azure.vm.status` を収集します。このメトリクスには、`status:running`、`status:not_running`、または `status:unknown` というタグが付けられています。

これは意図的なものですが、その VM はインフラストラクチャーリストに残ります。VM がこのメトリクスのみを報告する場合、請求可能なホスト数にはカウントされません。請求に関する詳細については、Datadog [請求セクション][1]を参照してください。

Azure VM を破壊した場合、3 時間以内にインフラストラクチャーリストからフェイズアウトします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/billing/