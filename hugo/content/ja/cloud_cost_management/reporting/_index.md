---
aliases:
- /ja/cloud_cost_management/reports
description: Cloud Cost Management レポートで組織の支出を追跡します。
further_reading:
- link: /cloud_cost_management/reporting/scheduled_reports
  tag: ドキュメント
  text: スケジュール済みのコストレポート
- link: /cloud_cost_management/reporting/explorer
  tag: ドキュメント
  text: コストエクスプローラー
- link: /cloud_cost_management/reporting/dashboards
  tag: ドキュメント
  text: Dashboards
- link: /cloud_cost_management/
  tag: ドキュメント
  text: Cloud Cost Management について
- link: https://www.datadoghq.com/blog/cloud-cost-management-ai-costs/
  tag: ブログ
  text: Datadog Cloud Cost Management を使用して、プロバイダーに AI コストを割り当てる
private: true
title: コストレポート
---
## 概要{#overview}

Datadog の CCM (Cloud Cost Management) レポートを使用すると、財務運用および財務チームはクラウドコストを効率的に管理することができます。この機能では、詳細なコスト分析のための一元化されたプラットフォームが提供されるため、クラウドコストや予算データを探索、分析、共有できます。

レポートを使用すると、次のことができます。

- [AWS][1]、[Azure][2]、[Google Cloud][3]、[Oracle][12]、および [SaaS プロバイダー][4]からのコストを一元管理して分析します。
- フィルター、グループ化、および複数のグラフタイプを使用して視覚化し、カスタマイズします。
- コストおよび予算レポートを作成して、支出を追跡し、将来のコストを予測します。
- レポートを保存、スケジュールし、チームと共有します。

## 適切なツールを選択する {#choose-the-right-tool}

柔軟に調査する場合は**[コストエクスプローラー][13]**を使用し、標準化された定期的な分析を行う場合は**コストレポート**を使用します。

| 機能 | コストエクスプローラー | コストレポート |
|---------|---------------|--------------|
| ユースケース | アドホックな分析と調査 | 保存されたビューと定期配信 |
| クエリ | 動的、デフォルトでは未保存 | 保存され、再利用可能 |
| テンプレート | テンプレートなし | 事前作成済みのテンプレートを利用可能 |
| スケジュール | スケジュール不可 | メール/Slack に対してスケジュール可能 |
| ワークフロー | 反復的な調査 | 定期的なレポート作成 |

## CCM レポートを作成する {#create-a-ccm-report}

1. Datadog の [**[Cloud Cost] > [Analyze] (分析) > [Reports] (レポート)**][5] に移動します。
1. [{{< ui >}}New Report{{< /ui >}}] (新規レポート) をクリックしてゼロから開始するか、ギャラリーからテンプレートを選択してすばやくワークフローを開始します。

   {{< img src="cloud_cost/cost_reports/create-new-report-1.png" alt="新しいレポートを作成するか、テンプレートから作成する" style="width:100%;" >}}

   **利用可能なテンプレート:**
   - [{{< ui >}}AWS Spend by Service Name{{< /ui >}}] (サービス名別の AWS 支出): EC2、S3、Lambda のコストを把握します。
   - [{{< ui >}}Azure Spend by Service Name{{< /ui >}}] (サービス名別の Azure 支出): 仮想マシンや Azure Monitor などの Azure サービス別にコストの内訳を表示します。
   - [{{< ui >}}GCP Spend by Service Name{{< /ui >}}] (サービス名別の GCP 支出): Compute Engine、BigQuery、Kubernetes Engine などの GCP サービス別にコストの内訳を表示します。
   - [{{< ui >}}Datadog Spend by Product{{< /ui >}}] (製品別の Datadog 支出): Infrastructure Hosts、Custom Metrics、Indexed Logs などの Datadog 製品別にコストの内訳を表示します。
   - [{{< ui >}}Spend by Provider{{< /ui >}}] (プロバイダー別の支出): AWS、Azure、Google Cloud、Oracle Cloud などのコストを比較します。

## レポートのカスタマイズ {#customizing-your-report}

{{< img src="cloud_cost/cost_reports/customization-options-3.png" alt="クラウドプロバイダーの選択、フィルタリング、グループ化、視覚化の変更、詳細オプションの使用によって、レポートをカスタマイズします。" style="width:100%;" >}}

### レポートの種類を選択する {#select-the-type-of-report}

作成するレポートの種類を選択します。

- [{{< ui >}}Cost{{< /ui >}}] (コスト): サービス、リージョン、チームなどについて、支出の発生場所を把握します。
- [{{< ui >}}Budget{{< /ui >}}] (予算): 事前に定義された予算目標に対する支出を追跡し、将来のコストを予測します。

### フィルターを適用する {#apply-filters}

フィルターを使用して、プロバイダー、製品、タグ、リージョン、コストタイプなど、割り当てる特定のコストのみを含めることで、ルールがクラウド支出の特定のサブセットのみに適用されるようにします。

| フィルター基準 | ユースケース |
|--------|----------|
| クラウドプロバイダー (AWS、Azure、GCP、Snowflake など) | AWS サポート料金など、特定のクラウドプロバイダーからのコストにのみ割り当てルールを適用し、Azure や GCP のコストには適用しません。|
| 製品またはサービス (EC2、S3、RDS など) | 特定の製品またはサービスに関連するコストを割り当てます。たとえば、すべての AWS コストではなく、EC2 コストのみをチーム間で分割します。|
| タグ (`env:prod`、`team:analytics`) | リソースタグに基づいてコストを含めるか除外します。たとえば、本番環境のリソース (`env:prod`) のコストのみ、または分析チームにタグ付けされたリソースのコストのみを割り当てます。|
| リージョン | 特定の地理的リージョン内のリソースのコストのみを割り当てます。たとえば、`us-east-1` のリソースのコストを `eu-west-1` のリソースのコストとは別に分割します。|
| コストタイプ (使用料金、サポート、タグなし) | 使用料金、サポート料金、タグなしコストなど、特定のタイプのコストのみを割り当てます。たとえば、リソースにタグを付けることをチームに奨励する場合は、タグなしコストのみを割り当てます。|
| カスタム基準 | 複数のフィルターを組み合わせる独自のビジネス要件がある場合は、カスタム基準を作成します。たとえば、`env:prod` とタグ付けされている特定のリージョン `us-west-2` にのみ EC2 コストを割り当てる場合です。|

### データをグループ化する {#group-data}
- より詳細なインサイトを得るために、プロバイダー名、サービス名、またはカスタムリソースタグでグループ化します。

### データの表示方法を変更する {#change-how-you-see-your-data}
- **視覚化オプション**を選択します。
  - [{{< ui >}}Bar chart{{< /ui >}}] (棒グラフ): 複数のカテゴリのコストを並べて比較し、コスト上昇の主要因を特定します。
  - [{{< ui >}}Pie chart{{< /ui >}}] (円グラフ): 各セグメントの割合を表示します。少数のカテゴリでのコストの相対的な比率を把握するのに最適です。
  - [{{< ui >}}Treemap{{< /ui >}}] (ツリーマップ): 階層データと多数のカテゴリの相対的なサイズが一度に表示されるため、全体的な構造と最大のコスト要因の両方を単一のビューで確認できます。
- **テーブルビュー**を変更します。
  - [{{< ui >}}Summary{{< /ui >}}] (サマリー): コストの全体像をまとめて確認できます。
  - [{{< ui >}}Day over day{{< /ui >}}] (日次)、[{{< ui >}}week over week{{< /ui >}}] (週次)、または [{{< ui >}}month over month{{< /ui >}}] (月次): 日次、週次、または月次ベースでコストがどのように変化するかを分析し、傾向や異常な変動を特定します。
- **時間枠**および**比較時間枠**を更新します。
  - 分析対象のレポート期間を設定するために、時間枠を選択します。
  - コストの変動を特定するために、比較期間を追加します。
    - [{{< ui >}}Default comparison{{< /ui >}}] (デフォルトの比較): 直前の期間と自動的に比較します (例: 今週と先週の比較)。
    - [{{< ui >}}Flexible comparison{{< /ui >}}] (柔軟な比較): 1 年前やカスタムの日付範囲など、任意の期間を選択して季節的なパターンを特定します。両方の期間は同じタイプである必要があります (例: 週と週、月と月)。ただし、日数が異なる月を比較する場合、実際の日数は異なることがあります。
- **予測コスト**を表示します。
  - [{{< ui >}}Show forecast{{< /ui >}}] (予測を表示) をオンに切り替えると、コストレポート上で予測コストを過去の支出と並べて表示できます。サポートされている予測期間とロールアップの詳細については、「[Cloud Cost Management での予測][15]」を参照してください。

### 詳細オプション (オプション) {#advanced-options-optional}

- [{{< ui >}}Show usage charges only{{< /ui >}}] (使用料金のみを表示): すべての支出 (手数料、税金、返金) を含めるか、使用料金のみを表示するかを選択します。
- [{{< ui >}}Cost type{{< /ui >}}] (コストタイプ): レポート作成、分析、または財務管理のニーズに最も適したコストタイプを選択します。プロバイダーに応じた各コストタイプの定義を確認してください: [AWS][7]、[Azure][8]、[Google Cloud][9]、[カスタム][10]。

  **注**: これらのオプションの利用可否は、選択したプロバイダーによって異なります。

## レポートを保存して共有する {#save-and-share-your-report}

作成およびカスタマイズしたレポートは、メインのレポートページと個別のレポートカードビューの両方から保存および共有できます。

- **レポートを保存**して、個人またはチームで使用できるようにします。
- **レポートを共有**するには、URL をコピーするか、CSV または PNG にエクスポートします。
- **レポートをスケジュール**して、チームに自動的に送信されるようにします。[レポートのスケジュールの詳細をご覧ください][11]。
- **レポートビューをダッシュボードにエクスポート**して、他のウィジェットとともにコストを追跡します。[ダッシュボードでのコスト監視の詳細をご覧ください][14]。
- **保存済みレポートを検索**して、必要なものを見つけます (メインのレポートページからのみ利用可能です)。

## 権限{#permissions}

レポートを表示および管理するには、以下の権限が必要です。

| アクション | 必要な権限 |
|---------|---------------|
| レポートの表示 | Cloud Cost Management 読み取り |
| レポートの作成、編集、削除 | Cloud Cost レポートの書き込み |

CCM 権限すべてのリストは、[権限に関するドキュメント][16]を参照してください。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/cloud_cost_management/aws/
[2]: /ja/cloud_cost_management/azure/?tab=billingaccounts
[3]: /ja/cloud_cost_management/google_cloud/
[4]: /ja/cloud_cost_management/saas_costs/
[5]: https://app.datadoghq.com/cost/analyze/reports
[6]: /ja/cloud_cost_management/container_cost_allocation/
[7]: /ja/cloud_cost_management/setup/aws/#cost-types
[8]: /ja/cloud_cost_management/setup/azure/#cost-types
[9]: /ja/cloud_cost_management/setup/google_cloud/#cost-types
[10]: /ja/cloud_cost_management/setup/custom/#cost-metric-types
[11]: /ja/cloud_cost_management/reporting/scheduled_reports
[12]: /ja/cloud_cost_management/oracle/
[13]: /ja/cloud_cost_management/reporting/explorer
[14]: /ja/cloud_cost_management/reporting/dashboards
[15]: /ja/cloud_cost_management/planning/forecasting#view-forecasts-in-reports
[16]: /ja/cloud_cost_management/setup/permissions