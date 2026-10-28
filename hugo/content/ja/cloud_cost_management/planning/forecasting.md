---
description: Cloud Cost Management の予測機能を使用して、将来のクラウドコストを予測し、情報に基づいた意思決定を行います。
further_reading:
- link: /cloud_cost_management/planning/budgets
  tag: ドキュメント
  text: Cloud Cost Management の予算について学ぶ
- link: /cloud_cost_management/reporting/
  tag: ドキュメント
  text: Cloud Cost Management のレポートについて学ぶ
- link: /cloud_cost_management/
  tag: ドキュメント
  text: Cloud Cost Management
- link: https://www.datadoghq.com/blog/cloud-cost-management-budget-forecasting/
  tag: ブログ
  text: Datadog の予算予測機能を使用して、クラウド支出を計画および管理します。
title: 予測
---
## 概要 {#overview}

Cloud Cost Management (CCM) の予測機能は、過去の支出パターンに基づいて将来のクラウドコストを予測するのに役立ちます。予測機能を使用して、コストの傾向を予測し、予算をより効果的に計画し、リソースの割り当てについてデータに基づいた意思決定を行います。

予測機能は以下で利用できます。
- [**レポート**](#view-forecasts-in-reports): コストレポートおよび予算レポートで予測トグルを有効にすると、予測コストを可視化できます。
- [**予算**](#view-forecasts-in-budgets): 予算カードで予測コストを直接確認し、予算を超過する見込みがあるかどうかを確認できます。

予測機能を使用すると、次のことができます。

- 過去のデータに基づいて**支出の傾向**を把握し、将来のコストを予測します。
- **実際の支出と並べて**予測コストを可視化し、パターンを特定してコストの傾向を把握します。
- 予測データを使用して**現実的な予算目標**を設定し、コスト超過を回避します。
- 予測コストが**予算目標**を超過する見込みがあるかどうかを確認し、予算の健全性を追跡します。

## 予測の仕組み {#how-forecasting-works}

Cloud Cost Management は、予測アルゴリズムを使用してコスト予測を生成します。予測モデルは、過去の支出データを分析して、クラウドコストのパターンや傾向を特定します。これには以下が含まれます。

- **予測可能なスケジュール** (毎週や毎月のサイクルなど) で発生する定期的なコスト。
- 時間の経過とともにコストが**増加、減少、または安定しているかどうか**。
- **特定の期間やイベント**に対応する支出の変化。

### 柔軟な予測オプション{#flexible-forecasting-options}

計画のニーズに合わせて、さまざまな期間やロールアップ間隔の予測を生成できます。

- {{< ui >}}Forecast periods{{< /ui >}}: 過去の支出データに基づいて、次の請求期間、当月、当年、またはカスタムの日付範囲のコストを予測します。
- {{< ui >}}Rollup intervals{{< /ui >}}: 分析要件に応じて、日次または月次の間隔で予測を表示します。

### データ要件{#data-requirements}

正確な予測を生成するために、CCM には以下が必要です。

- **64 日以上の連続したコストデータ**: これにより、モデルが意味のあるパターンを特定するために十分な情報を確保できます。利用可能な日数がこれより少ない場合、モデルは残りの日数をゼロで埋めて予測を生成します。
- **最近のデータ**: モデルは、過去最大 64 日間のコスト履歴を使用して予測を生成します。

## Bits とカスタム予測{#bits-and-custom-forecasts}

Datadog が過去の支出から自動的に生成する予測は、**Bits 予測**と呼ばれます。これはトレンドに基づいているため、過去のパターンを将来に投影しますが、製品のローンチ、移行、季節的な需要など、計画されたビジネスイベントを考慮することはできません。

[予算][3]では、**カスタム予測**と呼ばれる独自の月次値で Bits 予測を上書きできます。Datadog は Bits 予測にカスタム予測を重ね合わせるため、設定した場所では上書きが優先されます。予算および予算モニターは、デフォルトで上書きされた予測を使用します。

カスタム予測値を設定するには、[予算予測のカスタマイズ][4]を参照してください。

## レポートで予測を表示する {#view-forecasts-in-reports}

Datadog で [**Cloud Cost > Analyze > Reports**][1] に移動し、コストレポートと予算レポートで予測を有効にします。

### コストレポート {#cost-reports}

1. {{< ui >}}Cost{{< /ui >}} レポートを開くか、作成します。
2. 左側のパネルで {{< ui >}}Show forecast{{< /ui >}} を切り替えて、予測を有効にします。
3. {{< ui >}}Until end of{{< /ui >}} ドロップダウンから予測期間 (次の期間、当月、当年、またはカスタム範囲) を選択します。
4. ロールアップ間隔 (日次、週次、または月次) を選択します。

{{< img src="cloud_cost/forecasts/cost-report-with-forecast.png" alt="左側のパネルに予測の切り替えが表示され、履歴データとともにハッチングパターンで予測コストが表示されているコストレポート" style="width:100%;" >}}

レポートには以下が表示されます。
- {{< ui >}}Forecast toggle and controls{{< /ui >}}: 予測を有効にし、期間とロールアップ間隔を選択。
- {{< ui >}}Historical costs{{< /ui >}}: 実績支出を単色で表示。
- {{< ui >}}Forecasted costs{{< /ui >}}: ハッチングパターンで表示される予測コスト。
- {{< ui >}}Forecast summary card{{< /ui >}}: 選択した期間の合計予測コスト。

### 予算レポート {#budget-reports}

1. レポートを作成するか、既存の {{< ui >}}Budget{{< /ui >}} レポートを開きます。
2. 左側のパネルで {{< ui >}}Show forecast{{< /ui >}} を切り替えて、予測を有効にします。
3. {{< ui >}}Until end of{{< /ui >}} ドロップダウンから予測期間 (次の期間、当月、当年、またはカスタム範囲) を選択します。

{{< img src="cloud_cost/forecasts/budget_report_forecast-2.png" alt="左側のパネルに予測の切り替えがあり、履歴データとともに予測コストが表示される予算レポート" style="width:100%;" >}}

レポートには以下が表示されます。
- {{< ui >}}Forecast toggle and controls{{< /ui >}}: 左側のパネルにあり、予測を有効にして期間を選択。
- {{< ui >}}Historical costs{{< /ui >}}: 実績支出を単色で表示。
- {{< ui >}}Forecasted costs{{< /ui >}}: ハッチングパターンで表示される予測コスト。
- {{< ui >}}Forecast summary card{{< /ui >}}: 選択した期間の合計予測コスト。

## 予算の予測を表示する {#view-forecasts-in-budgets}

Datadog の [**Cloud Cost &gt; Plan &gt; Budgets**][2] に移動して、予算サマリーの予測を表示します。

予算カードには、利用可能な場合に予測情報が自動的に表示され、各予算期間の予測コストが示されます。

予測コストが予算を超えると予想される場合、予算ステータスに {{< ui >}}Projected Over{{< /ui >}} が表示され、予算を超過する前に対処できるようになります。

{{< img src="cloud_cost/forecasts/budget-list-with-forecast.png" alt="予算カードに予測値が表示されている予算リスト" style="width:100%;" >}}

詳細な予測情報を表示するには、

1. Budgets ページから、任意の予算の {{< ui >}}View Performance{{< /ui >}} をクリックして、詳細な予算ビューを開きます。
2. 予算パフォーマンスビューで、{{< ui >}}Show Forecast{{< /ui >}} をオンにして予測を有効にします。
3. 予算パフォーマンスチャートには次の項目が表示されます。
   - {{< ui >}}Actual costs{{< /ui >}}: 現在の支出を単色で表示。
   - {{< ui >}}Forecasted costs{{< /ui >}}: 実際のコストを超える部分がハッチングパターンで表示される予測コスト。
   - {{< ui >}}Forecasted Past{{< /ui >}}: 予測の開始位置を示す垂直線。

{{< img src="cloud_cost/forecasts/updated_budget_status_forecast-1.png" alt="予測の切り替えスイッチと、ハッチングパターンで表示された予測コストを示す予算パフォーマンスビュー" style="width:100%;" >}}

デフォルトでは、Datadog は自動 Bits 予測と、予算で設定したカスタム予測値を組み合わせます。Bits 予測を独自の月次値で上書きするには、[予算予測のカスタマイズ][4]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/analyze/reports
[2]: https://app.datadoghq.com/cost/plan/budgets
[3]: /ja/cloud_cost_management/planning/budgets
[4]: /ja/cloud_cost_management/planning/budgets#customize-your-budget-forecast