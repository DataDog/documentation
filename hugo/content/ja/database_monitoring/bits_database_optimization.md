---
description: Bits AI によって特定されたデータベースクエリの最適化をレビューし、実装します。
further_reading:
- link: /database_monitoring/
  tag: ドキュメント
  text: Database Monitoring
- link: /database_monitoring/query_metrics/
  tag: ドキュメント
  text: クエリメトリクスの確認
- link: /database_monitoring/connect_dbm_and_apm/
  tag: ドキュメント
  text: Database Monitoring とトレースの相関付け
title: Bits データベースの最適化
---
<div class="alert alert-info">Bits データベースの最適化は PostgreSQL 専用です。他のデータベース管理システムのサポートをリクエストするには、Datadog の担当者または <a href="/help/">Datadog サポート</a>にお問い合わせください。</div>

## 概要 {#overview}

Bits データベースの最適化は、データベース全体でパフォーマンスが良くないクエリを検出し、環境のシミュレーションコピーに対して検証された最適化を特定し、クエリを引き起こした正確なコードを修正するプルリクエストとして結果を提供します。

最適化候補は Database Monitoring のテレメトリから自動的に選択され、追加のセットアップは不要です。候補は、クエリの実行時間、ブロッキングを引き起こしているクエリ、および回帰クエリに焦点を当てて、最も影響の大きいものが特定されます。

<div class="alert alert-info">Bits データベースの最適化は、データベースへの書き込みアクセスを必要とせず、環境からの実際のデータをエクスポートまたは使用することはありません。最適化は、スキーマの統計的特性を使用した合成データを設定されたデータベースシミュレーションに対して実証的にテストされます。</div>

{{< img src="database_monitoring/database_optimization_panel_overview.png" alt="最適化パネルの最適化されたクエリ。問題の詳細な概要、最適化されたクエリの差分、および PR を作成するためのボタンが表示されています。" style="width:100%;">}}

## 前提条件 {#prerequisites}

- **Database Monitoring** は、ターゲットデータベースインスタンスに対して構成されます。[Database Monitoring のセットアップ][1]を参照してください。
- **スキーマ収集**が、ターゲットインスタンスで有効になっています。
- 自動 PR 作成のためには:
    - **APM** が、対処したいクエリを発行するサービスに対して構成されている必要があります。詳細については、[Database Monitoring とトレースの相関付け][2]を参照してください。
    - あなたの Datadog 組織で **GitHub リポジトリ**がリンクされている必要があります。

## 最適化の表示{#viewing-optimizations}

### クエリリスト{#query-list}

[Database Monitoring > クエリ][3]画面で、最適化が利用可能なクエリには [Status] (ステータス) 列に AI アイコンが表示されます。アイコンにカーソルを合わせると最適化の概要が表示され、アイコンをクリックすると最適化パネルが開きます。

クエリリストを最適化タイプでフィルタリングするには、リストの上にある [**Optimizations**] (最適化) からオプションを選択します。

{{< img src="database_monitoring/database_optimization_queries.png" alt="クエリ画面の [ステータス] 列。最適化が利用可能なクエリ行に AI アイコンが表示されています。" style="width:100%;">}}

### 最適化パネル{#optimization-panel}

最適化パネルには、クエリの問題の概要、シミュレーションで使用された最適化後のクエリ、およびシミュレーションのパフォーマンス影響のビジュアルが含まれます。

シミュレーションのパフォーマンス影響のビジュアルで、改善に関する詳細を調べてください。
  - 改善の概要 (例えば「96.9%速い」) にカーソルを合わせると、最適化前後の実行時間、論理読み取り数、およびダーティ状態の共有ブロック数を確認できます。テーブルには、各メトリックの平均値、中央値、P95、および最大値が表示されます。
  - ビジュアル内の各項目にカーソルを合わせると、詳細が表示されます。

{{< img src="database_monitoring/database_optimization_simulated_performance_impact.png" alt="シミュレーションされたパフォーマンス影響のビジュアルの例。96.9%速く最適化されたクエリを示しています。" style="width:100%;">}}

[**Compare Plans**] (プランの比較) をクリックすると、現在の実行プランと最適化された実行プランを並べて比較できます。
  [- **List View**] (リストビュー) は、実行プランの操作の階層リストを表示し、各ステップのノードコストと行の推定値を示します。
  [- **Map View**] (マップビュー) は、実行プランを視覚的表現で表示します。異なるメトリクスでプランを比較するオプションがあります。
  [- **Raw**] (生) は、実行プランの生出力を表示します。

{{< img src="database_monitoring/database_optimization_plan_comparison_map_view.png" alt="[プランの比較] のマップビュー。最適化されたクエリの追加および削除された操作を示しています。" style="width:100%;">}}

### プルリクエストをレビューする{#review-the-pull-request}

データベースの最適化修正の PR をレビューするには、[**Review PR by Bits AI**] (Bits AI による PR のレビュー) を選択します。GitHub の PR が、シミュレーション結果を含む事前に入力された説明付きで開きます。

<div class="alert alert-info">自動化プルリクエストには、クエリを発行するサービスのために APM が構成されていて、GitHubリポジトリが Datadog 組織にリンクされている必要があります。</div>

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/database_monitoring/architecture/
[2]: /ja/database_monitoring/connect_dbm_and_apm/
[3]: https://app.datadoghq.com/databases/queries
[4]: /ja/monitors/configuration/?tab=evaluateddata