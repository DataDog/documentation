---
further_reading:
- link: /tracing/service_catalog/
  tag: Documentation
  text: Datadog サービスカタログ
kind: ガイド
title: アクティブインシデント時の上流と下流の依存関係を見る
---

サービスカタログは、[Datadog Incident Management][1] や [PagerDuty][2] などのインシデント管理ツールとインテグレーションしており、サービスの詳細の **Reliability** タブで関連する進行中のインシデントに関する情報を確認することができます。

{{< img src="tracing/service_catalog/svc_cat_reliability.png" alt="サービスカタログのサービスの詳細の Reliability タブ。" >}}

Datadog インシデントは、サービスカタログに自動的に接続されます。インシデントに適切な `SERVICE` タグを適用して、サービスのインシデントデータが正確であることを確認します。PagerDuty のインシデントインテグレーションは、[PagerDuty インテグレーション][2]をセットアップしていることが必要です。

サービスのアップストリームとダウンストリームの依存関係のインシデントステータスを確認するには、サービスカタログでサービスをクリックし、サービスの詳細ページで **Dependencies** タブに進みます。

{{< img src="tracing/service_catalog/svc_cat_dependencies.png" alt="サービスカタログのサービスの詳細の Dependencies タブ。" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/incident_management/
[2]: /ja/integrations/pagerduty/