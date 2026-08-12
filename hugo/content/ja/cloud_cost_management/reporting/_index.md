---
aliases:
- /ja/cloud_cost_management/reports
description: Cloud Cost Management レポートで組織の支出を追跡します.
further_reading:
- link: /cloud_cost_management/reporting/scheduled_reports
  tag: ドキュメント
  text: スケジュール設定済みのコスト レポート
- link: /cloud_cost_management/reporting/explorer
  tag: ドキュメント
  text: Cost Explorer
- link: /cloud_cost_management/
  tag: ドキュメント
  text: Cloud Cost Management について
private: true
title: Cost Reports
---

## 概要

Datadog の Cloud Cost Monitoring (CCM) Reports は、FinOps および財務チームがクラウド コストを効率的に管理できるようにします。この機能は、詳細なコスト分析のための中央集約型プラットフォームを提供し、クラウド コストや予算データを探索・分析・共有できます。

Reports を使用すると、次のことが可能です:

- [AWS][1]、[Azure][2]、[Google Cloud][3]、[Oracle][12]、および [SaaS プロバイダー][4] のコストを集約・分析します。
- フィルター、グルーピング、複数のチャート タイプで可視化し、カスタマイズします。
- 支出を追跡し、将来のコストを予測するために、コスト レポートや予算レポートを作成します。
- レポートを保存、スケジュール設定し、チームと共有します。

## 最適なツールを選ぶ

柔軟な調査には **[Cost Explorer][13]** を、標準化された定期的な分析には **Cost Reports** を使用します。

| 機能 | Cost Explorer | Cost Reports |
|---------|---------------|--------------|
| ユース ケース | アドホックな分析と調査 | 保存済みビューとスケジュール配信 |
| クエリ | 動的 (既定では保存されません) | 保存済みで再利用可能 |
| テンプレート | テンプレートはありません | 事前に用意されたテンプレートを利用可能 |
| スケジューリング | スケジュール不可 | メール / Slack へのスケジュールが可能 |
| ワークフロー | 反復的な探索 | 定期的なレポーティング |

## CCM レポートを作成する

1. Datadog で [**Cloud Cost > Analyze > Reports**][5] に移動します。
1. **New Report** をクリックして最初から作成するか、ギャラリーからテンプレートを選択してワークフローを加速します。

   {{< img src="cloud_cost/cost_reports/create-new-report.png" alt="新しいレポートの作成、またはテンプレートからの作成。" style="width:100%;" >}}

   **利用可能なテンプレート:**
   - **AWS Spend by Service Name**: EC2、S3、Lambda のコストを把握します。
   - **Azure Spend by Service Name**: Virtual Machines や Azure Monitor などの Azure サービス別にコストを内訳化します。
   - **GCP Spend by Service Name**: Compute Engine、BigQuery、Kubernetes Engine などの GCP サービス別にコストを内訳化します。
   - **Spend by Provider**: AWS、Azure、Google Cloud、Oracle Cloud などの間でコストを比較します。

## レポートのカスタマイズ

{{< img src="cloud_cost/cost_reports/customization-options-aws-1.png" alt="クラウド プロバイダーの選択、フィルタリング、グルーピング、可視化の変更、高度なオプションの使用によるレポートのカスタマイズ。" style="width:100%;" >}}

### レポートの種類を選択

作成するレポートの種類を選択します:

- **Cost**: サービス、リージョン、チームなどにわたって、費用がどこに使われているかを把握します。
- **Budget**: 事前に定義した予算目標に対する支出を追跡し、将来のコストを予測します。

### フィルターを適用

プロバイダー、プロダクト、タグ、リージョン、コスト タイプなどで、配賦対象に含めたい特定のコストだけをフィルターし、ルールがクラウド支出の適切なサブセットに正確に適用されるようにします。

| フィルター条件 | ユース ケース |
|--------|----------|
| クラウド プロバイダー (例: AWS、Azure、GCP、Snowflake) | AWS のサポート料金など、特定のクラウド プロバイダー由来のコストにのみ配賦ルールを適用します。Azure や GCP のコストには適用しません。 |
| プロダクトまたはサービス (例: EC2、S3、RDS) | 特定のプロダクトまたはサービスに関連するコストを配賦します。たとえば、すべての AWS コストではなく、EC2 のコストだけをチーム間で振り分けます。 |
| タグ (`env:prod`, `team:analytics`) | リソース タグに基づいてコストを含める / 除外します。たとえば、本番リソース (`env:prod`) のコストのみ、またはアナリティクス チームにタグ付けされたリソースのみを対象に配賦します。 |
| リージョン | 特定の地理的なリージョン内のリソースに対してのみコストを配賦します。たとえば、`us-east-1` のリソースのコストを `eu-west-1` のものとは別に分割します。 |
| コスト タイプ (usage、support、untagged) | 使用料、サポート料金、未タグ付けのコストなど、特定のタイプのコストにのみ配賦します。たとえば、チームにリソースへのタグ付けを促すため、未タグ付けのコストだけを配賦します。 |
| カスタム条件 | 複数のフィルターを組み合わせた固有のビジネス要件がある場合は、カスタム条件を作成します。たとえば、特定のリージョン `us-west-2` で `env:prod` とタグ付けされた EC2 のコストだけを配賦したい場合です。 |

### データをグループ化
- より深いインサイトのため、プロバイダー名、サービス名、またはカスタム リソース タグでグループ化します。

### データの見え方を変更
- **visualization option** を選択します:
  - **Bar chart**: 複数カテゴリのコストを横並びで比較し、主要なコスト ドライバーを特定できます。
  - **Pie chart**: 各セグメントの割合を表示します。カテゴリ数が少ない場合の相対的なコスト比率の把握に最適です。
  - **Treemap**: 階層構造のデータと多数のカテゴリの相対的なサイズを同時に表示し、全体構造と最大の寄与要因を 1 つのビューで確認できます。
- **table view** を変更します:
  - **Summary**: コストの全体像を統合して表示します。
  - **Day over day**、**week over week** または **month over month**: コストが日次・週次・月次でどのように変化しているかを分析し、トレンドや異常な変動を特定します。
- **time frame** を更新して、クラウド支出のトレンドを監視します。

### 詳細オプション (任意)

- **Show usage charges only**: すべての支出 (手数料、税金、返金) を含めるか、使用料のみに絞り込むかを選択します。
- **Cost type**: レポーティング、分析、財務管理のニーズに最も合致するコスト タイプを選択します。プロバイダーに基づく各コスト タイプの定義を確認してください: [AWS][7]、[Azure][8]、[Google Cloud][9]、[カスタム][10]。

  **注**: これらのオプションの利用可否は、選択したプロバイダーによって異なります。

## レポートを保存して共有

レポートを作成・カスタマイズしたら、メインの Reports ページと各レポート カードのビューの両方から保存および共有できます。

- **レポートを保存**すると、個人またはチームで利用できるようになります。
- URL をコピーするか、CSV または PNG にエクスポートして**レポートを共有**します。
- **レポートをスケジュール**して、チームに自動送信します。[レポートのスケジュール設定について詳しく学ぶ][11]。
- **レポート ビューを Dashboards にエクスポート**し、他のウィジェットと並べてコストを追跡します。
- **保存済みレポートを検索**して必要なものを見つけます (メインの Reports ページからのみ利用可能)。

## 参考資料

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