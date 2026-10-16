---
further_reading:
- link: /continuous_integration/
  tag: ドキュメント
  text: CI Visibility
- link: /tests/
  tag: ドキュメント
  text: Test Optimization
title: CI/CD 最適化
---
CI/CD 最適化は、Datadog の [CI Visibility][1] と [Test Optimization][2] のエクスペリエンスを 1 つの統合インターフェースにまとめます。パイプラインの実行から個々のテストの実行まで、CI/CD エコシステム全体を把握、監視、改善するための単一の場所を提供します。

新しいエクスペリエンスを有効にするには、CI Visibility または Test Optimization の任意のページの上部にある {{< ui >}}Try It Now{{< /ui >}} をクリックします。{{< ui >}}Switch Back{{< /ui >}} をクリックすると、いつでも以前の UI に戻ることができます。

このページでは、CI/CD 最適化の主要機能の概要を説明します。その一部は、CI Visibility および Test Optimization の元の機能を保持しています。統合 UI 内で各製品を使用する方法の詳細については、従来のドキュメントへのリンクに従ってください。

## CI/CD 概要 {#cicd-overview}

CI/CD {{< ui >}}Overview{{< /ui >}} ページで、主要な CI の信頼性とパフォーマンスのメトリクスを調査します。このダッシュボードには、時間の経過に伴う変化を追跡するウィジェット、改善のための提案、およびモニターのステータスの概要が含まれています。

{{< img src="cicd_optimization/cicd_overview.png" alt="CI/CD 概要ダッシュボード" style="width:100%;" >}}

## 統合エクスプローラー {#unified-explorer}

CI/CD {{< ui >}}Explorer{{< /ui >}} で、パイプライン実行とテスト実行を単一のエクスプローラーから参照します。パイプラインとテストを切り替え、特定の集計レベルで結果を絞り込みます。

- **パイプライン**: パイプライン、ステージ、ジョブ、ステップ、またはコマンド
- **テスト**: セッション、モジュール、スイート、またはテスト

{{< img src="cicd_optimization/explorer-2.png" alt="パイプラインデータとテストデータの切り替えを備えた統合エクスプローラー" style="width:100%;" >}}

各タイプのデータの検索、フィルタリング、分析の詳細については、[CI Visibility エクスプローラー][3]および [Test Optimization エクスプローラー][4]を参照してください。

## Flaky Management {#flaky-management}

{{< ui >}}Flaky Management Overview{{< /ui >}} で、リポジトリ全体の不安定な状況を高いレベルで把握します。このページでは、トレンドチャート、優先順位付けの提案、およびセットアップを検証するためのツールを提供しています。

{{< img src="cicd_optimization/flaky_overview-2.png" alt="トレンドチャートと優先順位付けの提案を含む Flaky Management の概要" style="width:100%;" >}}

{{< ui >}}Flaky Management Explorer{{< /ui >}} から直接、不安定なテストを追跡および修正します。不安定なテストの傾向を表示し、問題のあるテストを特定し、テストの信頼性を向上させるためのアクションを実行できます。詳細については、[不安定なテストの管理][5]を参照してください。

{{< img src="cicd_optimization/flaky_management-2.png" alt="不安定なテストの傾向とアクションを示す Flaky Management インターフェース" style="width:100%;" >}}

## 継続的なセットアップフロー {#continuous-setup-flow}

リポジトリの CI/CD 最適化を、1 つの継続的なガイド付きプロセスでセットアップします。[CI プロバイダーを Datadog に接続][6]した後、次のステップに直接進み、監視する[テストスイートをセットアップ][7]してください。

{{< img src="cicd_optimization/setup_flow.png" alt="CI プロバイダーとテストスイートの継続的なセットアップフロー" style="width:90%;" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

 [1]: /continuous_integration/
 [2]: /tests/
 [3]: /continuous_integration/explorer/
 [4]: /tests/explorer/
 [5]: /tests/flaky_management/
 [6]: /continuous_integration/pipelines/
 [7]: /tests/setup/