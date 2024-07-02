---
algolia:
  tags:
  - test visibility
  - CI テスト
  - CI テスト
  - 不安定なテスト
  - 不安定なテスト
  - テスト実行
  - テスト実行
  - テストスパン
  - テストスパン
further_reading:
- link: https://www.datadoghq.com/blog/ci-test-visibility-with-rum/
  tag: ブログ
  text: CI Test Visibility と RUM を使ったエンドツーエンドのテストのトラブルシューティング
- link: /tests/
  tag: ドキュメント
  text: Test Visibility について
- link: /tests/guides/flaky_test_management
  tag: ドキュメント
  text: 不安定なテストの管理について
- link: /tests/developer_workflows
  tag: ドキュメント
  text: Datadog における開発者のワークフロー強化について
title: Test Visibility の概要
---

## 概要

[Test Visibility][1] は、テストの姿勢をより深く理解し、不安定なテストをもたらすコミットを特定し、パフォーマンスの低下を識別し、複雑なテスト失敗をトラブルシューティングするのに役立ちます。

{{< img src="getting_started/test_visibility/list.png" alt="Test Visibility におけるテストサービスの一覧" style="width:100%;" >}}

テスト実行のパフォーマンスをトレースとして視覚化できます。トレース内のスパンは、テストの異なる部分の実行を表します。

Test Visibility は、テストのパフォーマンス、不安定さ、および失敗に関する洞察を提供することで、開発チームによる CI 環境全体におけるソフトウェアテストのデバッグ、最適化、および加速を支援します。Test Visibility は自動で各テストをインスツルメントし、[Intelligent Test Runner][2] を使用したインテリジェントなテスト選択を統合します。これにより、テストの効率が向上し、冗長性が削減されます。

過去のテストデータを用いて、チームはパフォーマンスの低下を把握し、機能ブランチとデフォルトブランチのテスト結果を比較し、パフォーマンスベンチマークを設定できます。Test Visibility の使用により、チームは[開発者のワークフロー][14]を改善し、品質の高いコード出力を維持できます。

## テストサービスのセットアップ

Test Visibility は、CI テストのパフォーマンスと結果を追跡し、テスト実行の結果を表示します。

テストのインスツルメンテーションと実行を開始するために、以下の言語のドキュメントを参照してください。

{{< partial name="continuous_integration/ci-tests-setup.html" >}}

</br>

Test Visibility は、どの CI プロバイダーとも互換性があり、CI Visibility でサポートされているプロバイダーに限定されません。サポートされている機能についての詳細は、[Test Visibility][3] をご覧ください。

## CI テストデータの活用

テストのメトリクス (実行回数、期間、期間分布、総合成功率、失敗率など) にアクセスし、CI パイプライン全体から収集したテストデータを使用して、重要なトレンドやパターンの特定を始めます。

{{< img src="getting_started/test_visibility/tests_dashboard.png" alt="Datadog のすぐに使える Test Visibility ダッシュボード" style="width:100%;" >}}

[ダッシュボード][4]を作成して、テスト内で発生する不安定なテスト、パフォーマンスの低下、テストの失敗を監視することができます。または、Test Visibility で収集されたデータが入力されたウィジェットを含む[すぐに使えるダッシュボード][5]を利用して、CI テストセッション、モジュール、スイート、テストの健全性とパフォーマンスを視覚化することも可能です。

## 不安定なテストの管理

[不安定なテスト][6]とは、同じコミットに対して複数回のテスト実行で合格と不合格の両方のステータスを示すテストのことです。あるコードをコミットし CI で実行した際にテストが失敗し、再度 CI で実行した際に同じテストが合格する場合、そのテストは信頼性が低いとみなされ不安定とマークされます。

**Flaky Tests** セクションや [**Test List** ページ][7]のテストサービス一覧にある列から不安定なテストの情報にアクセスできます。

{{< img src="getting_started/test_visibility/commit_flaky_tests.png" alt="テスト実行のコミットセクションで無視できる不安定なテスト" style="width:100%;" >}}

各ブランチについて、新たに発見された不安定なテストの数、そのテストによって不安定になったコミットの数、テストの総実行時間、ブランチの最新のコミットの詳細が一覧表示されます。

Average duration
: テストの平均実行時間です。

First flaked and Last flaked
: テストが最初におよび最も最近に不安定になった日とコミット SHA。

Commits flaked
: テストが不安定な挙動を示したコミットの数です。

Failure rate
: このテストが最初に不安定になって以来、失敗したテスト実行の割合です。

Trend
: 不安定なテストが修正されたのか、または現在も不安定状態が続いているかを示す視覚化されたデータです。

Test Visibility では、コミットの **Flaky Tests** セクションにおける不安定なテストのトレンドと影響を理解するのに役立つ以下のグラフが表示されます。

New Flaky Test Runs
: 新しい不安定なテストが検出される頻度です。

Known Flaky Test Runs
: 追跡されている不安定なテストに関連するすべてのテスト失敗。不安定なテストが「不安定になる」たびに表示されます。

不安定テストが誤って検出されたと判断したコミットの新しい不安定なテストを無視するには、**New Flaky** 値がドロップダウンオプションで提供されるテストをクリックし、**Ignore flaky tests** をクリックします。詳細については、[不安定なテストの管理][8]を参照してください。

## Test Visibility Explorer で結果を検証する

Test Visibility Explorer では、テストから収集したデータを使用して視覚化を作成したり、テストスパンをフィルタリングしたりできます。各テスト実行は、テストリクエストによって生成された追加のスパンを含むトレースとして報告されます。

{{< tabs >}}
{{% tab "セッション" %}}

[**Software Delivery** > **Test Visibility** > **Test Runs**][101] に移動し、`Session` を選択してテストセッションスパンの結果のフィルタリングを開始します。

{{< img src="/getting_started/test_visibility/session.png" alt="Shopist リポジトリでフィルタリングされた Test Visibility Explorer のテストセッション結果" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/test-runs?query=test_level%3Asession

{{% /tab %}}{{% tab "モジュール" %}}

[**Software Delivery** &gt; **Test Visibility** &gt; **Test Runs**][101] に移動し、`Module` を選択して、テストモジュールスパンの結果のフィルタリングを開始します。

{{< img src="/getting_started/test_visibility/module.png" alt="Shopist リポジトリでフィルタリングされた Test Visibility Explorer のテストモジュールの結果" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/test-runs?query=test_level%3Amodule

{{% /tab %}}{{% tab "スイート" %}}

[**Software Delivery** &gt; **Test Visibility** &gt; **Test Runs**][101] に移動し、`Suite` を選択して、テストスイートスパン結果のフィルタリングを開始します。

{{< img src="/getting_started/test_visibility/suite.png" alt="Shopist リポジトリでフィルタリングされた Test Visibility Explorer のテストスイートの結果" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/test-runs?query=test_level%3Asuite

{{% /tab %}}{{% tab "テスト" %}}

[**Software Delivery** &gt; **Test Visibility** &gt; **Test Runs**][101] に移動し、`Test` を選択して、テストスパンの結果のフィルタリングを開始します。

{{< img src="/getting_started/test_visibility/test.png" alt="Shopist リポジトリでフィルタリングされた Test Visibility Explorer のテストの結果" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/test-runs?query=test_level%3Atest

{{% /tab %}}
{{< /tabs >}}

[ファセット][9]を使用して検索クエリをカスタマイズし、テスト実行の各レベルで費やされた時間の変化を特定します。

**Test List** ページでテストをクリックすると、**Trace** タブでフレームグラフやスパンのリストを見ることができます。

{{< img src="/getting_started/test_visibility/failed_test_trace.png" alt="Test List ページで失敗したテスト実行のスタックトレース" style="width:100%" >}}

テスト実行のボトルネックを特定し、実行時間の割合が最大から最小にランク付けされた個々のレベルを調べることができます。

## テストへのカスタム測定値の追加

CI Visibility Tests API エンドポイントを使用して、テストイベントをプログラムによって検索および管理できます。詳細については、[API ドキュメント][10]を参照してください。

CI テストから収集したデータを強化するために、テスト実行中に作成されるスパンに、プログラムによってタグや測定値 (メモリ使用量など) を直接追加できます。詳細については、[テストにカスタム測定値を追加する][11]を参照してください。

## CI モニターの作成

失敗が発生した場合や新しい不安定なテストが検出された場合に、テストパフォーマンスの回帰について組織内の関連チームに警告します。

{{< img src="/getting_started/test_visibility/test_monitor.png" alt="テストの失敗が 1 回を超えるとアラートを発生させる CI テストモニター" style="width:100%" >}}

テストの失敗がしきい値である 1 回を超えたときに警告を発するモニターをセットアップするには

1. [**Monitors** > **New Monitor**][12] に移動し、**CI** を選択します。
1. CI テストに共通のモニタータイプを選択して開始します。たとえば、新しい不安定なテストがコードベースに追加されたときに警告を発する `New Flaky Test`、テスト失敗時に警告を発する `Test Failures`、テストのパフォーマンスが低下したときに警告を発する `Test Performance` を選択するか、独自の検索クエリをカスタマイズします。この例では、`main` ブランチでのテスト実行をフィルタリングするために `Branch (@git.branch)` ファセットを選択します。
1. `Evaluate the query over the` セクションで、最後の 15 分を選択します。
1. 評価値がしきい値を超えたときにトリガーされるようにアラート条件を設定し、`Alert threshold > 1` などのアラートしきい値や警告しきい値の値を指定します。
1. モニター通知を定義します。
1. モニターの権限を設定します。
1. **Create** をクリックします。

詳細については、[CI モニターのドキュメント][13]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tests/
[2]: /ja/intelligent_test_runner/
[3]: /ja/tests/#supported-features
[4]: /ja/dashboards/
[5]: https://app.datadoghq.com/dash/integration/30897/ci-visibility---tests-dashboard
[6]: /ja/glossary/?product=ci-cd#flaky-test
[7]: https://app.datadoghq.com/ci/test-services
[8]: /ja/tests/guides/flaky_test_management
[8]: https://app.datadoghq.com/ci/test-runs
[9]: /ja/continuous_integration/explorer/facets/?tab=testruns
[10]: /ja/api/latest/ci-visibility-tests/
[11]: /ja/tests/guides/add_custom_measures/
[12]: https://app.datadoghq.com/monitors/create
[13]: /ja/monitors/types/ci/?tab=tests#track-new-flaky-tests
[14]: /ja/tests/developer_workflows