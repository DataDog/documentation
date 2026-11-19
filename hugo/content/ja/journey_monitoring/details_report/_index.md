---
aliases:
- /ja/journey_monitoring/uptime/
description: Product Analytics、Real User Monitoring、Synthetic Monitoring & Testing、および
  Session Replay のデータを組み合わせた詳細レポートで、各ジャーニーのパフォーマンスを調査します。
further_reading:
- link: /journey_monitoring/
  tag: ドキュメント
  text: Journey Monitoring について
- link: /journey_monitoring/map/
  tag: ドキュメント
  text: マップについて
- link: /journey_monitoring/suggested_journeys/
  tag: ドキュメント
  text: 推奨ジャーニーについて
- link: /journey_monitoring/variants/
  tag: ドキュメント
  text: ジャーニーのバリアントについて
- link: https://www.datadoghq.com/blog/rum-operations-monitoring/
  tag: ブログ
  text: RUM オペレーションを使用して、ユーザー ジャーニーにおける重要なステップのパフォーマンスを監視する
title: ジャーニーの詳細レポート
---
## 概要{#overview}

ジャーニーの詳細レポートは、[Product Analytics][3]、[Session Replay][4]、[Real User Monitoring (RUM)][1]、および [Synthetic Monitoring & Testing][2] からのユーザー行動データと技術パフォーマンスデータを組み合わせたものです。

{{< img src="journey_monitoring/journey-monitoring-details-report-2.png" alt="特定のジャーニーの重要業績評価指標、ユーザー行動のインサイト、および技術パフォーマンス測定値を示す Journey Monitoring 詳細レポート。" style="width:100%;" >}}

### ジャーニーおよびバリアントのフィルター{#journey-and-variant-filters}

ジャーニーとその[バリアント][5]は、レポートフィルターとして機能します。ジャーニーはデフォルトで選択されており、すべてのバリアントからのデータが含まれます。バリアントを選択して、レポートをそのパスに絞り込みます。

### 属性フィルター {#attribute-filters}

[属性フィルター][22]は、選択したジャーニーまたはバリアントと組み合わせて適用されます。これらは、ジャーニーをトリガーし、選択した属性に一致するセッションにレポートを絞り込みます。

### ファネル {#funnel}

[ファネル][6]には、各ステップのトラフィック、コンバージョン率、および平均コンバージョン時間が表示されます。ファネルには、コンバージョンおよび離脱に関連する要因も一覧表示されます。[**View Details**] をクリックして、離脱パターンを分析します。

### トラフィックとコンバージョンの傾向 {#traffic-and-conversion-trends}

トラフィックとコンバージョンの傾向セクションには、以下の重要業績評価指標 (KPI) が表示されます。

- **開始回数**: ユーザーセッション全体でのジャーニー試行の合計
- **コンバージョン回数**: ユーザーセッション全体で完了したジャーニー試行数
- **コンバージョンまでの平均時間**: ジャーニーを完了するまでに必要な平均時間
- **コンバージョン率**: 完了したジャーニー試行の割合

各 KPI は、選択された期間と、その直前の同じ長さの期間を比較します。たとえば、1 週間を選択した場合、比較には前週が使用されます。1 日を選択した場合、前日が使用されます。ボリュームおよびコンバージョンまでの時間のメトリクスは変化率 (%) を示し、コンバージョン率は変化幅 (パーセントポイント) を示します。

#### KPI のソースと保持 {#kpi-source-and-retention}

KPI のデータソースと保持期間は、Product Analytics へのアクセス権によって異なります。

- **プレビュー**: 直近 30 日間のローリングウィンドウのすべての Product Analytics データを使用します
- **トライアル**: トライアル期間全体のすべての Product Analytics データを使用します
- **有料**: 直近 15 か月間のローリングウィンドウのすべての Product Analytics データを使用します
- **Product Analytics が無効**: [RUM without Limits&trade;][18] メトリクスを使用します

RUM without Limits では、開始回数、コンバージョン数、およびコンバージョン率に `rum.measure.journey` メトリクスを使用します。コンバージョンまでの平均時間は `rum.measure.journey.duration` を使用します。

## Product Analytics {#product-analytics}

<div class="alert alert-info">このセクションのデータは、有効な Product Analytics のトライアルまたは有料サブスクリプションがある場合にのみ利用可能です。</div>

{{< img src="journey_monitoring/journey-monitoring-details-report-product-analytics.png" alt="コンバージョンしたセッションと離脱したセッションについて、特定のジャーニーのトップパスとユーザーを表示する Journey Monitoring の詳細レポートセクション。" style="width:100%;" >}}

### トップパス {#top-paths}

[トップパスの可視化][12]は、選択したステップ間でユーザーがジャーニーをどのように移動するかを示します。コンバージョンしたユーザーのパスと、離脱したユーザーのパスを比較します。

この可視化では最も一般的なパスが表示されますが、完了したジャーニーの 100% を表しているとは限りません。フッターには、残りのパスが表すセッションの割合と数が表示されます。

### ユーザー {#users}

ユーザーテーブルには、ジャーニー中にコンバージョンした、または離脱したトップユーザーが一覧表示されます。ユーザーをクリックすると、そのユーザーがジャーニーを体験したセッションの Session Replay を表示できます。

## Real User Monitoring {#real-user-monitoring}

<div class="alert alert-info">このセクションのデータは、RUM without Limits&trade; の有効なトライアルまたは有料サブスクリプションがある場合にのみ利用可能です。</div>

{{< img src="journey_monitoring/journey-monitoring-details-report-real-user-monitoring.png" alt="特定のジャーニーの RUM オペレーションとフロントエンドの問題の時系列を表示する、Journey Monitoring の詳細レポートセクション。" style="width:100%;" >}}

### オペレーション {#operations}

[オペレーション][7]テーブルには、リンク済みおよび未リンクの RUM オペレーションが一覧表示されます。これらは[サービスレベル目標 (SLO)][19]の状態ごとにグループ化されています。

- **Critical**: 高いバーンレートの SLO を少なくとも 1 つ含む、ジャーニーにリンクされたオペレーション。
- **OK**: SLO を少なくとも 1 つ含み、すべての SLO が OK 状態である、ジャーニーにリンクされたオペレーション。
- **Matching**: Datadog が時間的な相関から特定した、リンクされていないオペレーション。Matching オペレーションに SLO がない場合があります。

**Critical** および **OK** カテゴリのリンクされたオペレーションは、その SLO が[ジャーニーのステータス][15]に寄与するオペレーションと同じです。

ユーザーがジャーニー中に遭遇する Matching オペレーションを確認し、リンクします。設定のガイダンスについては、「[一致するオペレーションを確認する][14]」を参照してください。

重要なアクションを表す Matching オペレーションがない場合は、「[オペレーションを作成する][23]」に従ってください。テーブルからオペレーションを作成すると、Datadog はそれをジャーニーにリンクし、99% の目標を持つ可用性 SLO を作成します。

各オペレーションの行には、`rum.measure.operation` メトリクスを使用して計算された実行回数と成功率、および `rum.measure.operation.duration` メトリクスを使用して計算された p75 レイテンシーも表示されます。

<div class="alert alert-tip">組織で Bits AI が有効になっている場合は、オペレーションから <a href="/real_user_monitoring/ai_investigations/operation_ai_investigation/">Bits Investigation</a> を起動して、失敗やレイテンシーリグレッションのトラブルシューティングを行えます。</div>

オペレーションをクリックすると、そのパフォーマンスのサイドパネルが開きます。パネルには以下が表示されます。
- そのオペレーションに設定された SLO とモニターのリスト
- そのオペレーションの回数、成功率、レイテンシー
- そのオペレーションがジャーニーのライフサイクル内のどこで実行されたか

RUM が [Application Performance Monitoring (APM) トレース][11]に接続されている場合、サイドパネルにはバックエンドサービスの依存関係とそのパフォーマンスメトリクスも一覧表示されます。バックエンドサービスをクリックすると、APM [Catalog][8] でそのエントリが開きます。

### エラー数 {#error-count}

エラー数チャートには、ジャーニー中に発生した [Error Tracking][9] のフロントエンドの問題がプロットされます。[**Investigate**] をクリックして上位の問題を確認し、問題を選択して Error Tracking で開きます。

## Synthetic Monitoring & Testing {#synthetic-monitoring-testing}

<div class="alert alert-info">このセクションのデータは、<a href="/synthetics/browser_tests/">Synthetic Browser Tests</a> または <a href="/synthetics/mobile_app_testing/">Synthetic Mobile Tests</a> の有効なトライアルまたは有料サブスクリプションをお持ちの場合にのみ利用可能です。</div>

{{< img src="journey_monitoring/journey-monitoring-details-report-synthetics.png" alt="特定のジャーニーの Synthetic テストを表示する Journey Monitoring の詳細レポートセクション。" style="width:100%;" >}}

### テストスイートとジャーニーのカバレッジ {#test-suite-and-journey-coverage}

イベントベースのジャーニーの場合、ジャーニー作成者が Synthetic Monitoring の書き込み権限を持っていると、Datadog は[テストスイート][10]を作成します。スイートの名前はジャーニーと同じになります。Synthetics 専用の構成では、既存のテストスイートによりジャーニーが定義されます。

テストスイートウィジェットには、スイートのパフォーマンスと[アップタイム][13]が表示されます。スイートのアップタイム SLO はジャーニーのアップタイムを表し、ジャーニーのステータスに寄与します。この SLO で高いバーンレートが発生すると、ジャーニーは **Degraded** 状態になります。SLO には、編集可能な 99.9% のデフォルト目標が設定されています。

スイートにジャーニーをカバーするテストが少なくとも 1 つ含まれている場合、そのジャーニーには [Synthetic カバレッジ][20] があります。イベントベースのジャーニーの場合、Datadog はアプリケーションの変更に合わせて新たに[一致するテスト][21]を特定します。スイートのカバレッジをジャーニーに合わせて維持するために、テストを追加または削除します。

### テストテーブル {#tests-table}

Synthetic テストテーブルには、ジャーニーのテストスイートに属するテストと、一致するもののテストスイートには属していないテストが含まれています。これらは以下の状態ごとにグループ化されます。

- **Alert**: ジャーニーのテストスイート内でアラート状態にあるテスト。
- **OK**: ジャーニーのテストスイート内で OK 状態にあるテスト。
- **Matching**: Datadog がジャーニーをカバーしていると識別したものの、そのテストスイートには含まれていないテスト。

各テストの行には、名前、ドメイン、アップタイムも表示されます。

<div class="alert alert-tip">組織で Bits AI が有効になっている場合は、<a href="/bits_ai/bits_investigation/investigate_issues/#from-the-synthetic-test-details-page">Bits Investigation</a> を <strong>Alert</strong> 状態のテストから起動して、根本原因を特定します。</div>

[**Manage Tests**] をクリックしてスイートにテストを追加するか、スイートから削除します。または、[**New Test**] をクリックしてテストを作成します。

## 参考資料 {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/
[2]: /ja/synthetics/
[3]: /ja/product_analytics/
[4]: /ja/session_replay/
[5]: /ja/journey_monitoring/variants/
[6]: /ja/product_analytics/charts/funnel_analysis/
[7]: /ja/real_user_monitoring/operations_monitoring/
[8]: /ja/internal_developer_portal/catalog/
[9]: /ja/error_tracking/
[10]: /ja/synthetics/test_suites/
[11]: /ja/real_user_monitoring/correlate_with_other_telemetry/apm?tab=browserrum
[12]: /ja/product_analytics/charts/journey_paths/
[13]: /ja/synthetics/test_suites/#service-level-objectives
[14]: /ja/journey_monitoring/configuring_journeys/#review-matching-operations
[15]: /ja/journey_monitoring/status/#rum-operation-slos
[18]: /ja/real_user_monitoring/rum_without_limits/
[19]: /ja/service_level_objectives/
[20]: /ja/journey_monitoring/configuring_journeys/#step-3-add-synthetic-test-coverage
[21]: /ja/journey_monitoring/configuring_journeys/#review-matching-tests
[22]: /ja/journey_monitoring/configuring_journeys/#attribute-filters
[23]: /ja/journey_monitoring/configuring_journeys/#create-operations