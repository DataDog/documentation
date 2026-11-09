---
aliases:
- /ja/journey_monitoring/details_report/variants/
description: ジャーニーの開始イベントと終了イベントの間でユーザーがたどるパスを定義および比較します。
further_reading:
- link: /journey_monitoring/
  tag: ドキュメント
  text: Journey Monitoring について
- link: /journey_monitoring/configuring_journeys/
  tag: ドキュメント
  text: ジャーニーを構成する
- link: /journey_monitoring/details_report/
  tag: ドキュメント
  text: ジャーニーの詳細レポートについて
title: ジャーニーのバリアント
---
<div class="alert alert-info">ジャーニーのバリアントを使用するには、<a href="/product_analytics/">Product Analytics</a> の有効なトライアルまたは有料サブスクリプションが必要です。</div>

## 概要 {#overview}

**バリアント**は、ジャーニーの[開始イベントと終了イベント][8]の間の特定のパスを表します。バリアントを使用して、同じジャーニーを通る一般的なパスの[主要業績評価指標 (KPI)][3] とテレメトリデータを比較します。

## バリアントを作成する {#create-a-variant}

ジャーニーの作成時または既存のジャーニーの編集時にバリアントを追加します。

1. 一意の名前を入力します。
2. ジャーニーの開始イベントと終了イベントの間に少なくとも 1 つの中間[アクションまたはビューイベント][9]を追加します。
3. 必要に応じて、[属性フィルター][10]を追加し、バリアントを特定のコホートに限定します。
4. ジャーニーを保存します。

中間イベントを追加すると、[ファネル][4]が更新されます。各ステップのボリューム、コンバージョン率、および平均コンバージョン時間が表示されます。

### 推奨バリアント {#suggested-variants}

Datadog は、中間アクションイベントとビューイベントの一般的なシーケンスを分析し、それらのパスに基づいてバリアントを提案します。推奨バリアントは、ジャーニーを手動で作成する場合、[推奨ジャーニー][1]から作成する場合、または既存のジャーニーを編集する場合に表示されます。

{{< img src="journey_monitoring/journey-monitoring-details-report-variants.png" alt="左側にバリアントパネルが表示され、各バリアントステップのコンバージョンメトリクスを含むファネルの可視化が表示されている、Journey Monitoring の詳細レポート。" style="width:100%;" >}}

## バリアントを分析する {#analyze-variants}

[ジャーニー詳細レポート][2]でバリアントを選択し、メトリクスとテレメトリデータをそのパスに絞り込みます。フィルタリングされたデータを使用して、パス間でボリューム、コンバージョン率、平均コンバージョン時間、[フロントエンドエラー][5]、[RUM オペレーション][6]、および [Synthetic テストカバレッジ][7]を比較します。

## バリアントを削除する {#delete-a-variant}

ジャーニー詳細レポートで、バリアントにカーソルを合わせ、削除アイコンをクリックします。

## 参考資料 {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/journey_monitoring/suggested_journeys/
[2]: /ja/journey_monitoring/details_report/
[3]: /ja/journey_monitoring/details_report/#traffic-and-conversion-trends
[4]: /ja/product_analytics/charts/funnel_analysis/
[5]: /ja/error_tracking/
[6]: /ja/real_user_monitoring/operations_monitoring/
[7]: /ja/journey_monitoring/configuring_journeys/#step-3-add-synthetic-test-coverage
[8]: /ja/journey_monitoring/configuring_journeys/#define-start-and-end-conditions
[9]: /ja/product_analytics/data_collected/
[10]: /ja/journey_monitoring/configuring_journeys/#attribute-filters