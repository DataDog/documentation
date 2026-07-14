---
aliases:
- /ja/tracing/software_catalog/use_cases/incident_response
- /ja/tracing/software_catalog/guides/upstream-downstream-dependencies
- /ja/software_catalog/guides/upstream-downstream-dependencies
- /ja/tracing/service_catalog/guides/upstream-downstream-dependencies
- /ja/service_catalog/guides/upstream-downstream-dependencies
- /ja/service_catalog/use_cases/upstream_downstream_dependencies
further_reading:
- link: /service_management/incident_management/
  tag: ドキュメント
  text: インシデント管理
- link: /integrations/pagerduty/
  tag: ドキュメント
  text: PagerDuty インテグレーション
title: インシデント対応の改善
---


Software Catalog は、次の点でインシデント対応を強化します:

- 所有者情報、連絡チャネル、監視およびトラブルシューティング リソースを検証して集約することで、オンコール時の体験を改善します。
- runbook やドキュメントなどの解決策とツールを、既存のオブザーバビリティ ワークフローに直接組み込みます。
- 上流と下流の依存関係の所有者を特定するプロセスを簡素化し、インシデントからの復旧を迅速化します。

Software Catalog は [Datadog Incident Management][1] と [PagerDuty][2] とも連携しており、Service Details ページの Reliability タブで関連するインシデントを確認できます。

**注**: Datadog Incidents は自動的に Software Catalog にリンクされますが、各サービスのインシデント データを正確にするため、インシデントには `SERVICE` タグを付与してください。PagerDuty インテグレーションは、Software Catalog のインシデント情報と連携するために手動で設定する必要があります。

{{< img src="tracing/software_catalog/incident-mgmt-reliability.png" alt="サービスの Reliability タブ。サービス全体とバージョン別のインシデントとエラー メトリクスを表示" style="width:100%;" >}}

上流と下流の依存関係におけるインシデント ステータスを確認するには、Software Catalog でサービスをクリックして Service Details ページを開き、Dependencies タブをクリックします。

{{< img src="tracing/software_catalog/incident-mgmt-incident-status.png" alt="サービスの Dependencies タブ。上流と下流の依存関係を表示し、インシデントの影響を受けているものを強調表示" style="width:100%;" >}}



## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/service_management/incident_management/
[2]: /ja/integrations/pagerduty/