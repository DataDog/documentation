---
aliases:
- /ja/infrastructure/cloud_cost_management
- /ja/integrations/cloudability
cascade:
  algolia:
    rank: 70
    subcategory: Cloud Cost Management
    tags:
    - cloud cost
    - cloud integrations
    - cloud cost management
    - cloud cost aws
    - cloud cost azure
    - cloud cost google cloud
    - cloud cost gcp
    - data collected aws
    - data collected azure
    - data collected google cloud
further_reading:
- link: /monitors/types/cloud_cost/
  tag: ドキュメント
  text: Cloud Cost モニターを作成する
- link: /cloud_cost_management/tags/
  tag: ドキュメント
  text: Cloud Cost Management におけるタグについて
- link: /cloud_cost_management/cloud_cost_skill/
  tag: ドキュメント
  text: Bits Chat で Cloud Cost スキルを使用してください
- link: https://www.datadoghq.com/blog/control-your-cloud-spend-with-datadog-cloud-cost-management/
  tag: ブログ
  text: Datadog Cloud Cost Management でクラウドコストの可視化とコントロールを実現する
- link: https://www.datadoghq.com/blog/manage-ai-cost-and-performance-with-datadog/
  tag: ブログ
  text: 'AI ROI の推進: 責任を持ってスケールできるように、Datadog がコスト、パフォーマンス、インフラストラクチャーを結び付ける方法'
- link: https://www.datadoghq.com/blog/cloud-cost-management-container-support/
  tag: ブログ
  text: Datadog Cloud Cost Management で Kubernetes と ECS の支出を把握する
- link: https://www.datadoghq.com/blog/google-cloud-cost-management/
  tag: ブログ
  text: Datadog でエンジニアが Google Cloud のコストを管理するための権限を与える
- link: https://www.datadoghq.com/blog/total-cost-of-service-ownership-ccm/
  tag: ブログ
  text: サービスに関連するクラウドや SaaS のコストを迅速かつ包括的に分析する
- link: https://www.datadoghq.com/blog/cloud-costs-study-learnings/
  tag: ブログ
  text: Cloud Cost の調査から得られた主な知見
- link: https://www.datadoghq.com/blog/unit-economics-ccm/
  tag: ブログ
  text: Datadog Cloud Cost Management でユニットエコノミクスをモニターする
- link: https://www.datadoghq.com/blog/finops-at-datadog/
  tag: ブログ
  text: Datadog で成功した FinOps プラクティスをどのように構築したか
- link: https://www.datadoghq.com/blog/cloud-cost-management-saved-millions/
  tag: ブログ
  text: Cloud Cost Management により年間 150 万ドルを節約した方法
- link: https://www.datadoghq.com/blog/cloud-cost-management-oci/
  tag: ブログ
  text: Datadog Cloud Cost Management を使用して、OCI コストを管理および最適化する
- link: https://www.datadoghq.com/blog/cambia-health-cost-optimization
  tag: ブログ
  text: Cambia Health Solutions が Cloud Cost Management と Datadog Resource Catalog
    を使用して月額 30,000 ドルを節約した方法
title: Cloud Cost Management
---
{{< learning-center-callout header="エンゲージメントウェビナーセッションに参加する" hide_image="true" btn_title="サインアップ" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Cloud+Cost+Management">}}
  クラウドプロバイダーのコストを調査し、リアルタイムのテレメトリデータと相関付けます。クラウドコストの発生源、変動、最適化の機会についての具体的なインサイトとアラートを得ることができます。
{{< /learning-center-callout >}}

## 概要 {#overview}

Cloud Cost Management は、エンジニアリングチームや財務チームに、インフラストラクチャーの変更がコストに与える影響を理解し、組織全体の支出を割り当て、非効率性を特定するためのインサイトを提供します。

{{< img src="cloud_cost/summary.png" alt="Datadog の Cloud Cost Summary ページで、クラウドプロバイダーのコストと使用状況をすべて把握することができます" style="width:100%;" >}}

Datadog はクラウドコストデータを取り込み、[**エクスプローラー**ページ][1]の検索クエリで使用可能なメトリクスに変換します。コスト上昇時には、その上昇を使用量メトリクスと相関付けて根本原因を特定することができます。

## セットアップ {#setup}

{{< whatsnext desc="Cloud Cost Management でクラウドコストの管理を開始するには、以下のドキュメントを参照してください。">}}
  {{< nextlink href="/cloud_cost_management/setup/aws">}}<u>AWS</u>: AWS の請求のために Cloud Cost Management を構成します。{{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/setup/azure">}}<u>Azure</u>: Azure の請求のために Cloud Cost Management を構成します。{{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/setup/google_cloud">}}<u>Google Cloud</u>: Google Cloud の請求のために Cloud Cost Management を構成します。{{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/setup/oracle">}}<u>Oracle</u>: Oracle の請求のために Cloud Cost Management を構成します。{{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/setup/saas_costs">}}<u>SaaS および AI コスト</u>: サポートされている SaaS コストプロバイダーから Datadog にコストデータを送信します。{{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/setup/custom">}}<u>カスタムコスト</u>: 任意のコストデータソースを Datadog にアップロードします。{{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/datadog_costs">}}<u>Datadog のコスト</u>: 日々の Datadog の費用と利用メトリクスを可視化します。{{< /nextlink >}}
 {{< /whatsnext >}}

## クラウドコストデータを活用する {#use-cloud-cost-data}

インフラストラクチャーの費用と関連する利用メトリクスを 15 か月間保持し、潜在的な非効率性や節約の機会を可視化します。

ダッシュボード作成時、検索クエリのデータソースとして {{< ui >}}Cloud Cost{{< /ui >}} を選択します。

{{< img src="cloud_cost/cloud_cost_data_source-1.png" alt="ダッシュボードウィジェット作成時にデータソースとして利用できる Cloud Cost" style="width:80%;" >}}

オプションで、[Metrics API][2] を使用してクラウドコストデータの時系列グラフをプログラムでエクスポートすることができます。

## 日々の Datadog コストデータを活用する {#use-daily-datadog-cost-data}

Datadog の日々の費用と関連する利用メトリクスを 15 か月間保持し、潜在的な非効率性や節約の機会を可視化します。[Datadog のコスト][5]に関する詳細はこちら。

ダッシュボードを作成する際に、{{< ui >}}Cloud Cost{{< /ui >}} をデータソースとして選択し、利用可能なコストタイプから {{< ui >}}Datadog{{< /ui >}} を選択します。

{{< img src="cloud_cost/datadog_costs/dashboard-updated.png" alt="ダッシュボードの Cloud Cost データソースのオプションとしての Datadog コスト" style="width:80%;" >}}

オプションで、[Metrics API][2] を使用して Datadog コストデータの時系列グラフをプログラムでエクスポートすることができます。

## タグ付けとコストの割り当て {#tagging-and-cost-allocation}

[タグに関するドキュメント][5]を読むことで、Cloud Cost Management におけるタグの取得、強化、および管理方法を学習します。

タグルールを作成することで、欠落したタグや誤ったタグを修正し、組織のビジネスロジックに沿った推論タグを追加することができます。

## コストモニターの作成 {#create-a-cost-monitor}

[Cloud Cost モニター][3]を作成して、クラウド支出を積極的に管理・最適化しましょう。クラウド費用を監視するために、{{< ui >}}Cost Changes{{< /ui >}} または {{< ui >}}Cost Threshold{{< /ui >}} を選択できます。

{{< img src="cloud_cost/monitor.png" alt="コストの変動をアラートする Cloud Cost モニターの作成" style="width:100%;" >}}

## コストの割り当て {#allocate-costs}

[コンテナコスト割り当てメトリクス][4]を活用して、Kubernetes、AWS ECS、Azure、Google Cloud 全体のクラスターやワークロードに関連するコストを把握しましょう。ポッドレベルのコストを可視化し、アイドルリソースのコストを特定し、リソースタイプ別にコストを分析することができます。

## 権限 {#permissions}

Cloud Cost Management は、コストデータおよびほとんどの CCM 構成へのアクセスを制御するために以下の権限を使用します。
- `cloud_cost_management_read`
- `cloud_cost_management_write`

ページごとの要件の詳細な内訳については、[アクセス許可][9]を参照してください。

## データ履歴のレビュー {#review-data-history}

{{< img src="cloud_cost/ccm-data-history.png" alt="Cloud Cost 設定で Cloud Cost データ履歴を表示します。" style="width:100%;" >}}

{{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Data History{{< /ui >}}ページでクラウドコストデータの新鮮さと処理ステータスをモニターします。

- {{< ui >}}Last Bill Received{{< /ui >}}: クラウドまたは SaaS プロバイダーが CCM に表示される請求データを生成した場合。
- {{< ui >}}Last Processed{{< /ui >}}: Datadogがクラウドプロバイダーから請求データを最後に処理した場合。以下が含まれます。
  - タグパイプラインルール (デフォルトで最大 3 か月の履歴データを遡って処理します)
  - コスト配分ルール (デフォルトで最大 1 か月の履歴データを遡って処理します)

このページを使用してデータの遅延をトラブルシューティングしたり、最近のタグパイプラインやコスト配分の変更が適用されたことを確認したりします。

## コスト分析に AI を使用する {#use-ai-for-cost-analysis}

[Bits Chat の Cloud Cost スキル][10]を使用して、コストの変化を調査し、可能性のある所有者を特定し、予算に対する支出を比較し、コストと可観測性メトリクスを相関させ、エンジニアリングチーム向けの引き継ぎノートブックを作成します。

{{< img src="cloud_cost/cc_skill_cost_summary.png" alt="Bits Chat の調査サマリーに初期分析が表示されています。" style="width:60%;" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/explorer
[2]: /ja/api/latest/metrics/#query-timeseries-data-across-multiple-products
[3]: /ja/monitors/types/cloud_cost/
[4]: /ja/cloud_cost_management/container_cost_allocation
[5]: /ja/cloud_cost_management/tags/
[6]: /ja/account_management/rbac/data_access/
[7]: https://www.datadoghq.com/product-preview/data-access-control/
[8]: /ja/cloud_cost_management/datadog_costs
[9]: /ja/cloud_cost_management/setup/permissions
[10]: /ja/cloud_cost_management/cloud_cost_skill/