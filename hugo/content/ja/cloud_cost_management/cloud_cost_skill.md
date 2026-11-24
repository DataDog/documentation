---
algolia:
  rank: 75
  tags:
  - cloud cost
  - cloud cost management
  - ccm
  - finops
  - cloud cost skill
  - savings analysis
  - savings opportunities
  - bits ai assistant
  - bits assistant
  - mcp
description: Bits Chat で Cloud Cost スキルを使用して、Cloud Cost の所見の調査、説明、共有を行い、コスト削減の機会を特定します。
further_reading:
- link: /bits_ai/bits_chat/
  tag: ドキュメント
  text: Bits Chat
- link: /mcp_server/
  tag: ドキュメント
  text: Datadog MCP Server
- link: /cloud_cost_management/reporting/explorer/
  tag: ドキュメント
  text: コストエクスプローラー
- link: /cloud_cost_management/planning/budgets/
  tag: ドキュメント
  text: 予算
- link: /cloud_cost_management/recommendations/
  tag: ドキュメント
  text: Cloud Cost Recommendations
- link: https://www.datadoghq.com/blog/cloud-cost-skill-bits-chat/
  tag: ブログ
  text: Bits Chat の Cloud Cost スキルを使用してコストに関するあらゆる質問により迅速に回答
title: Bits Chat の Cloud Cost スキル
---
## 概要 {#overview}

Cloud Cost スキルは、[Bits Chat][1] における Cloud Cost Management 分析ワークフローです。これは、根本原因分析、予算追跡、コスト削減の特定、一般的なコストに関する質問への回答など、FinOps タスクのために設計されています。たとえば、Bits Chat に次を依頼することができます。

- [コストモニターアラート][2]、[コスト異常][3]、および[コスト変動][4]を調査する
- 費用が発生しているチーム、サービス、アカウント、地域、またはリソースを特定する
- クラウド、SaaS、カスタム、または Datadog コストについて随時発生する質問に回答する
- 実際の支出と予測を[予算][5]と比較する
- チーム、サービス、またはその他のスコープで、オーナー、推定削減額、裏付けとなる証拠が示されているコスト削減の機会を特定する
- CPU、メモリ、リクエスト量、またはストレージサイズなどの監視可能性メトリクスとコスト変動を相関させる
- 調査をキャプチャして引き継ぎや将来の参照のために [Notebooks][15] を作成する

## 前提条件 {#prerequisites}

Bits Chat で Cloud Cost スキルを使用するには、次を行う必要があります。

- 分析したいコストソースのために [Cloud Cost Management][6] をセットアップする
- 次の権限を持っている
  - [Bits Chat アクセス][7]権限
  - 問い合わせるデータに対する [Cloud Cost Management の権限][8]
  - (オプション) 調査 [Notebooks][15] を作成または編集したい場合は [Notebook の権限][9]

## Cloud Cost スキルを使用して調査を開始する{#start-an-investigation-with-the-cloud-cost-skill}

{{< img src="cloud_cost/cc_skill_anomalies.png" alt="各グラフに [Investigate with Bits AI] (Bits AIで調査) ボタンが表示されている、コスト異常のグラフ。" style="width:80%;" >}}

[コスト異常][3]などの調査を開始したい場合は、{{< ui >}}Investigate{{< /ui >}} をクリックするか、 {{< img src="bits_ai/dev_agent/twinkling_stars_icon.png" inline="true" style="width:24px">}} (きらきら星アイコン) をクリックして、Cloud Cost スキルを開きます。

また、Datadog の任意のページのナビゲーションバーの右上にある{{< ui >}}Ask Bits{{< /ui >}}をクリックして、Bits Chatを開き、コストに関する質問をすることもできます。

コスト削減の機会を特定するには、[Cloud Cost Recommendations][17] ページで [{{< ui >}}Optimize{{< /ui >}}] (最適化) をクリックします。詳細については、[コスト削減の分析](#savings-analysis)セクションを参照してください。

例のプロンプト:

- `Investigate why EC2 costs increased last week for team:payments.`
- `Which teams are responsible for the highest S3 storage costs this month?`
- `Why is the infrastructure budget projected to go over this month?`
- `Show total cloud cost by provider for the last 30 complete days.`
- `Find savings opportunities for team:payments.`

### コスト変動の調査 {#cost-change-investigations}

Cloud Cost スキルを使用してコスト変動を調査すると、Bits Chat は簡潔な要約を提供し、その後、次に何を探求したいかを尋ねます。初期分析には通常、以下が含まれます。

- 基準期間と調査期間の毎日のコストチャート
- 基準期間、調査期間、総金額、パーセンテージ変化、および当てはまる場合の予測年間影響
- 価格変動と消費変動を区別するためのレート対使用状況のコンテキスト
- コストタグに基づくオーナーまたはチームの帰属

{{< img src="cloud_cost/cc_skill_cost_summary.png" alt="初期分析が示されている Bits Chat による調査の要約。" style="width:60%;" >}}

初期要約の後、Bits Chat は次のことができます。

- 変化を引き起こしている主要なサービス、アカウント、地域、リソース、またはタグを見つける
- コスト変動を CPU リクエスト、メモリリクエスト、リクエスト数、バケットサイズ、またはデータベース使用量などのメトリクスと相関させる
- 関連する予算を見つけ、実際の支出または予測支出を予算目標と比較する
- サービスを所有するチームのために Datadog ノートブックを作成し、所見を確認し、それに基づいて行動を起こす
- 調査を記録のためにノートブックに保存する

### 予算と予測 {#budgets-and-forecasting}

[予算][5]をセットアップした後、Bits Chat の Cloud Cost スキルを使用して、予算の状況と費用を説明します。Bits Chat は要約を手助けできます。

- 実際の費用と予算額の比較
- 予測支出と予算額の比較
- 予算のフィルターに基づいて、予算がカバーするコストスコープ
- オーバーランに寄与している予算項目、チーム、サービス、またはプロバイダー

初期要約の後、Bits Chat は次のことができます。

- 費用を発生させている上位のサービス、アカウント、地域、リソース、またはタグを見つける
- コスト変動に寄与しているリソースを所有するチームを特定する
- 予算を更新する
- 調査を記録のためにノートブックに保存する

### コスト削減の分析 {#savings-analysis}

Bits Chat にチーム、サービス、またはその他のスコープでコスト削減の機会を特定するよう依頼するか、[Cloud Cost Recommendations][17] ページのフィルターバーにある [{{< ui >}}Optimize{{< /ui >}}] (最適化) をクリックします。Bits Chat はスコープのコストと使用状況データを調査し、特定したコスト削減の機会を要約します。要約には通常、以下の内容が含まれます。

- スコープの現在の年間コストと推定年間削減額合計
- コスト削減の機会をまとめたテーブル。各機会には、所有チーム、推定年間削減額、**労力**、**リスク**、**信頼度** の評価が含まれます
- スコープに関する既存の [Work Management][18] ワークアイテム、Jira チケット、および関連 Cloud Cost 推奨事項

初期要約の後、Bits Chat は次のことができます。

- コスト削減の機会を裏付ける証拠を説明する
- 各所有チーム向けに詳細な記述を記載したワークアイテムまたは[ノートブック][15]を作成する
- 会話内に詳細な記述をすべて表示する

## コスト分析のために Datadog MCP Server を使用する {#use-the-datadog-mcp-server-for-cost-analysis}

[Datadog MCP Server][10]は、外部 AI エージェントが Datadog データをクエリできるようにします。これは、IDE、ターミナルベースのアシスタント、またはカスタム AI ワークフローからコストに関する質問をしたいときに便利です。

外部 AI エージェントを使用するには、[Datadog MCP Server をセットアップします][11]。MCP クライアントによりツールセットがフィルタリングされる場合、エージェントがツールを呼び出せるようにするため、関連するツールセットを有効にしておく必要があります。

- [`cost_recommendations`][16] でコスト削減に関する推奨事項を一覧表示するには、`cost` ツールセットを有効にします。
- メトリクスツールで Cloud Cost Management のメトリクスをクエリするには、`core` ツールセットを有効にします。

### コスト削減の推奨事項を一覧表示する {#list-cost-saving-recommendations}

`cost` ツールセットにある [`cost_recommendations`][16] ツールは、組織のコスト削減に関する推奨事項を、1 日あたりの推定削減可能額が高い順に一覧表示します。クラウドプロバイダー、推奨事項タイプ、ステータス、削減額のしきい値、リソースタグでフィルタリングできます。このツールを使用するには、`Cloud Cost Management Read` 権限が必要です。

`cost` ツールセットのプロンプトの例:

- `What are my top cloud cost-saving recommendations?`
- `How much could I save per day, and how many open recommendations do I have?`
- `Show me open AWS recommendations for my Kubernetes clusters.`

### Cloud Cost Management のメトリクスをクエリする {#query-cloud-cost-management-metrics}

`core` ツールセットには、Cloud Cost Management のデータをクエリできるメトリクスツールが用意されています。

| MCP ツール                          | 使用状況                                 |
| --------------------------------- | ------------------------------------- |
| [`get_datadog_metric`][12]         | コストメトリクスをクエリし、期間を比較し、プロバイダー、サービス、チーム、アカウント、リソース、またはタグでコストをグループ化します。|
| [`get_datadog_metric_context`][13] | クエリする前にコストメトリクスのメタデータ、利用可能なタグキー、およびタグ値を発見します。              |

エージェントに Cloud Cost Management メトリクスの `use_cloud_cost` を `true` に設定するように依頼してください。たとえば、`all.cost`、`aws.cost.*`、`azure.cost.*`、`gcp.cost.*`、`oci.cost.*`、`custom.cost.*`、または`datadog.cost.*` などのメトリクスです。コストの変動を説明する監視可能性メトリクス、たとえば Kubernetes の CPU や S3 バケットのサイズについては、標準のメトリクスクエリの動作を使用してください。

`core` ツールセットのプロンプトの例:

- `Use Datadog MCP to query cloud cost data. Set use_cloud_cost=true and show daily all.cost grouped by provider for the last 30 complete days.`
- `Use get_datadog_metric_context with use_cloud_cost=true to find available tags for aws.cost.net.amortized.shared.resources.allocated, then group EC2 costs by team.`
- `Compare this week's complete EC2 cost to the previous week and explain which teams or accounts changed the most.`

接続手順、サポートされているクライアント、およびツールセットの構成については、[Datadog MCP Server をセットアップする][11]を参照してください。MCP ツールの完全なリファレンスについては、[Datadog MCP Server ツール][14]を参照してください。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/bits_ai/bits_chat/
[2]: https://app.datadoghq.com/cost/monitor/monitors
[3]: https://app.datadoghq.com/cost/monitor/anomalies
[4]: https://app.datadoghq.com/cost/summarize/overview
[5]: https://app.datadoghq.com/cost/plan/budgets
[6]: /ja/cloud_cost_management/setup/
[7]: /ja/account_management/rbac/permissions/#bits-assistant
[8]: /ja/cloud_cost_management/setup/permissions/
[9]: /ja/account_management/rbac/permissions/#notebooks
[10]: /ja/mcp_server/
[11]: /ja/mcp_server/setup/
[12]: /ja/mcp_server/tools/#get_datadog_metric
[13]: /ja/mcp_server/tools/#get_datadog_metric_context
[14]: /ja/mcp_server/tools/
[15]: /ja/notebooks/
[16]: /ja/mcp_server/tools/#cost_recommendations
[17]: https://app.datadoghq.com/cost/optimize/recommendations
[18]: /ja/incident_response/work_management/