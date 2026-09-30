---
further_reading:
- link: /service_management/service_level_objectives/
  tag: ドキュメント
  text: サービスレベル目標
- link: service_management/incident_management/
  tag: ドキュメント
  text: Incident Management
- link: dashboards/
  tag: ドキュメント
  text: Datadog ダッシュボード
title: Reliability Overview
---

{{< callout url="https://www.datadoghq.com/product-preview/engineering-reports/" d_target="#signupModal" btn_hidden="false" header="Engineering Reports のプレビューに参加してください!" >}}
{{< /callout >}}

## 概要

Reliability Overview レポートは、SLO とインシデントを集計したビューを提供し、経営陣が組織の信頼性をひと目で把握できるようにします。

このレポートでできること:
- SLO やインシデントに追加したタグやプロパティ (service や team など) を使って、SLO またはインシデントのグルーピングをカスタマイズする。
- 配下の SLO の残エラー バジェットをもとにしたサマリー スコアを使い、グループ間の SLO パフォーマンスを比較して改善ポイントを特定する。
- 過去 12 か月の信頼性の推移を日次・週次・月次で確認し、時系列でのパフォーマンスを把握する。

Internal Developer Portal (IDP) の "Overview" タブをクリックし、左側メニューで "Reliability Overview" を選択すると、Reliability Overview レポートにアクセスできます。

{{< img src="tracing/eng_reports/reliability-overview-landing2.png" alt="SLO Performance データを表示する Reliability Overview レポートのデフォルト表示" style="width:100%;" >}}

**注:** Datadog IDP Preview にまだ参加していない場合は、Software Catalog ページ上部の "Reports" タブからも Reliability Overview レポートにアクセスできます。

## Reliability Overview レポートを操作する

### 表示を調整する

{{< img src="tracing/eng_reports/reliability-overview-filtered2.png" alt="フィルタリング オプションを示す矢印が付いた Reliability Overview ページ" style="width:100%;" >}}

Reliability Overview レポートの表示は、次の方法で調整できます:

- **集計単位を "Service" または "Team" に切り替える**: service / team 単位で SLO とインシデントのパフォーマンスを確認し、好調な領域と課題のある領域を把握できます。

   **注**: service / team のグルーピングは、SLO に付与した **service** または **team** タグと、インシデントに追加した **services** または **teams** プロパティをもとに作成されます。

- **日次、週次、月次の履歴情報を表示する**: SLO とインシデントの履歴トレンドを、目的の粒度に調整できます。
- **フィルターを追加してデータ範囲を絞り込む**: team や service に加え、インシデントの重大度と状態でも絞り込めます。

### レポートをスケジュールする

ステークホルダー向けに、メールまたは Slack で PDF として定期的に配信されるスケジュール レポートを設定できます。

レポートをスケジュールするには、右上の **Schedule Report** をクリックします (すでにレポートを設定済みの場合は **Manage Reports**)。詳しくは [Scheduled Reports のドキュメント][1] を参照してください。

### レポートをカスタマイズする

レポート右上のケバブ メニューをクリックし、**Clone as a Dashboard** を選択すると、Reliability Overview レポートの内容を使ってダッシュボードを作成できます。

ダッシュボードは、次のようにカスタマイズできます:
- SLO に追加した任意のタグでグループ化できるよう、SLO Summary テーブルのグルーピングを更新する (例: "user journey" でグループ化したビューを作成する)。
- デフォルト表示に含まれていないウィジェットを追加する。
- 既存のウィジェットにフィルターを追加する (例: "Detection Method" に基づいて Incidents を絞り込む)。

## SLO サマリー スコアを活用する

{{< img src="tracing/eng_reports/slo-summary-score2.png" alt="SLO サマリー スコアを含む SLO Summary ウィジェット" style="width:100%;" >}}

**SLO Summary** ウィジェットには "score" が含まれます。これは、複数の SLO の達成状況を経営陣が把握できるように設計された要約指標です。スコアは、配下の SLO の平均残エラー バジェットをもとに算出し、その値を 0 - 100 の範囲にマッピングします:

- 多くの SLO が違反しておらず、エラー バジェットが残っている場合は、スコアは "passing" (green/yellow) になります。
- 多くの SLO がエラー バジェットを使い切っている、または少数の SLO が大幅にエラー バジェットを超過している場合は、スコアは "failing" (red) になります。
- 状態が "No Data" の SLO は、スコア計算の対象外です。

### スコア計算の詳細

スコアは次のとおり計算されます:

{{< jqmath-vanilla >}}

$$
\text"Average Remaining Error Budget"
      = {∑_{i=0}^{n}\\text"[Remaining Error Budget]"_i} / n
$$

$$
\text"Score"
      = {max(\text"[Average Remaining Error Budget]"\,-200) + 200} / 300 * 100
$$


- SLO の残エラー バジェットを平均します (エラー バジェットの最小値は -200% に固定されるため、それより小さい値の SLO は平均計算では -200% として扱われます)。
- 平均エラー バジェット (-200～100) を、0～100 のスコアにマッピングします。
- 次のしきい値に基づいて、スコアの色と状態を設定します:
  - **Red:** 0 ≤ Score < 66.667
  - **Yellow:** 66.667 ≤ Score < 80
  - **Green:** 80 ≤ Score ≤ 100

**注**: 平均残エラー バジェットが 0% の場合、Score 値は 66.667 に相当します。


## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/sharing/scheduled_reports/