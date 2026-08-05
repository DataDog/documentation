---
aliases:
- /ja/tracing/software_catalog/guides/cloud_cost_management
- /ja/software_catalog/guides/cloud_cost_management
- /ja/tracing/service_catalog/guides/cloud_cost_management
- /ja/service_catalog/guides/cloud_cost_management
- /ja/service_catalog/use_cases/cloud_cost_management
- /ja/software_catalog/use_cases/cloud_cost_management
further_reading:
- link: /tracing/software_catalog/
  tag: ドキュメント
  text: Datadog Software Catalog
- link: /tracing/software_catalog/scorecards/
  tag: ドキュメント
  text: Datadog Scorecards
- link: /cloud_cost_management/
  tag: ドキュメント
  text: Datadog Cloud Cost Management
- link: https://www.datadoghq.com/blog/monitor-cloud-costs-with-scorecards/
  tag: ブログ
  text: Scorecards でクラウドコストを監視するためのベストプラクティス
title: クラウドコストの管理と最適化
---

Datadog の [Software Catalog][4]、[Scorecards][2]、[Workflow Automation][5] により、組織はクラウド コストをチーム単位できめ細かく監視および最適化でき、適切なコスト配分と運用ルールへの準拠を確保できます。

## コストの急増を事前に監視する

[Datadog の Cloud Cost Management][1] は、Software Catalog と統合され、コストの異常をリアルタイムで検出し警告します。チームは、スパイクをトラフィックの変動、デプロイメント、PR のマージなどのサービスレベルの変化と相関付けることで、迅速に調査を行うことができます。 

{{< img src="tracing/software_catalog/ccm-use-cases-cost-spikes.png" alt="Software Catalog 内のサービスの Costs タブ。インフラストラクチャーのさまざまなコンポーネントのコストメトリクスを表示。" >}}

## コストのコンプライアンスと透明性を確保する

チームは、[Scorecards][2] を使って、クラウドリソースにタグを付け、コンプライアンスを追跡することで、コスト配分を監視し、最適化することができます。 

たとえば、インフラストラクチャー コンポーネントに "team" タグを適用し、この運用を徹底するカスタムのスコアカード ルールを設定することで、チーム単位のコスト追跡を有効にできます。

Datadog は、コスト管理プロセスの構築を支援するために、事前構成済みの[ワークフロー ブループリント][3]を提供します。ブループリントをそのまま使用することも、ユースケースに合わせて評価ロジックを変更することもできます。

{{< img src="tracing/software_catalog/ccm-use-cases-finops.png" alt="サービスのコストの 80% にチーム タグが付与されていることを要件とするスコアカード ルール。" >}}


## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/cloud_cost_management/
[2]: /ja/software_catalog/scorecards/
[3]: https://app.datadoghq.com/workflow/blueprints?selected_category=SCORECARDS
[4]: /ja/software_catalog/
[5]: /ja/service_management/workflows/