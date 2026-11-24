---
algolia:
  tags:
  - test visibility
  - ci test
  - ci tests
  - flaky test
  - flaky tests
  - test run
  - test runs
  - test span
  - test spans
aliases:
- /ja/getting_started/test_visibility
description: テストのパフォーマンスを把握し、CI 環境全体で不安定なテスト、パフォーマンスの低下、失敗を特定します。
further_reading:
- link: https://www.datadoghq.com/blog/ci-test-visibility-with-rum/
  tag: ブログ
  text: CI Test Visibility と RUM を使用したエンドツーエンドのテストのトラブルシューティング
- link: /tests/
  tag: ドキュメント
  text: Test Optimization について
- link: /tests/flaky_test_management/
  tag: ドキュメント
  text: 不安定なテストの管理について
- link: /tests/developer_workflows
  tag: ドキュメント
  text: Datadog で開発ワークフローを強化する方法について
- link: https://learn.datadoghq.com/courses/getting-started-test-optimization
  tag: ラーニングセンター
  text: Test Optimization の概要
title: Test Optimization の概要
---
## 概要 {#overview}

[Test Optimization][1] では、テストの状況をより深く理解し、不安定なテストを発生させたコミットを特定し、パフォーマンスの低下を特定し、複雑なテストの失敗をトラブルシューティングできます。

{{< img src="getting_started/test_visibility/list.png" alt="Test Optimization のテストサービスのリスト" style="width:100%;" >}}

テスト実行のパフォーマンスをトレースとして可視化できます。この場合、スパンはテストの各部分の実行を表します。

Test Optimization は、テストのパフォーマンス、不安定さ、失敗に関するインサイトを提供することで、開発チームが CI 環境全体でデバッグ、最適化、およびソフトウェアテストを加速できるようにします。Test Optimization は各テストを自動的にインスツルメントし、[Test Impact Analysis][2] を使用してインテリジェントなテスト選択を統合します。これによりテスト効率が向上し、冗長性が削減されます。

チームは過去のテストデータを使用して、パフォーマンスの低下を把握し、フィーチャーブランチとデフォルトブランチのテスト結果を比較し、パフォーマンスのベンチマークを確立できます。チームは Test Optimization を使用することで、[開発ワークフロー][14]を改善し、高品質なコード出力を維持できます。

## テストサービスのセットアップ {#set-up-a-test-service}

Test Optimization は、CI テストのパフォーマンスと結果を追跡し、テスト実行の結果を表示します。

テストのインスツルメンテーションと実行を開始するには、以下のいずれかの言語のドキュメントを参照してください。

{{< card-grid card_width="75px" >}}
  {{< image-card href="/tests/setup/dotnet/" src="integrations_logos/dotnet_avatar.svg" alt=".net" >}}
  {{< image-card href="/tests/setup/go/" src="integrations_logos/golang-avatar.png" alt="go" >}}
  {{< image-card href="/tests/setup/java/" src="integrations_logos/java_avatar.svg" alt="java" >}}
  {{< image-card href="/tests/setup/javascript/" src="integrations_logos/javascript.png" alt="javascript" >}}
  {{< image-card href="/tests/setup/python/" src="integrations_logos/python_avatar.svg" alt="python" >}}
  {{< image-card href="/tests/setup/ruby/" src="integrations_logos/ruby_avatar.svg" alt="ruby" >}}
  {{< image-card href="/tests/setup/swift/" src="integrations_logos/swift_avatar.svg" alt="swift" >}}
  {{< image-card href="/tests/setup/junit_xml/" src="integrations_logos/junit_xml.png" alt="JUnit テストを Datadog にアップロード" >}}
{{< /card-grid >}}

Test Optimization にはあらゆる CI プロバイダーとの互換性があり、CI Visibility でサポートされているプロバイダーに限定されません。サポートされている機能の詳細については、[Test Optimization][3] を参照してください。

## CI テストデータの使用{#use-ci-test-data}

テストのメトリクス (実行、期間、期間の分布、全体的な成功率、失敗率など) にアクセスし、CI パイプライン全体でテストから収集されたデータを使用して、重要な傾向やパターンを特定します。

{{< img src="getting_started/test_visibility/tests_dashboard.png" alt="Datadog のすぐに使える Test Optimization ダッシュボード" style="width:100%;" >}}

[ダッシュボード][4]を作成して、テスト内で発生する不安定なテスト、パフォーマンスの低下、テストの失敗を監視できます。あるいは、Test Optimization で収集されたデータが取り込まれたウィジェットを含む[すぐに使えるダッシュボード][5]を利用して、CI テストセッション、モジュール、スイート、テストの健全性とパフォーマンスを可視化することもできます。

## 不安定なテストの管理 {#manage-flaky-tests}

[不安定なテスト][6]とは、同じコミットに対する複数のテスト実行で、成功と失敗の両方の結果を示すテストのことです。コードをコミットして CI で実行したときにテストが失敗し、再度 CI で実行すると同じテストが成功する場合、そのテストは信頼性が低く、不安定であるとマークされます。

不安定なテストの情報には、テスト実行の概要ページの [{{< ui >}}Flaky Tests{{< /ui >}}] (不安定なテスト) セクションでアクセスするか、または [[{{< ui >}}Test List{{< /ui >}}] (テストのリスト) ページ][7]のテストサービスのリストの列としてアクセスできます。

{{< img src="getting_started/test_visibility/commit_flaky_tests.png" alt="テスト実行の [Commits] (コミット) セクションで無視できる不安定なテスト" style="width:100%;" >}}

ブランチごとに、新たな不安定なテストの数、そのテストが不安定な動作を示したコミットの数、合計テスト時間、およびブランチの最新のコミット詳細が一覧表示されます。

Average duration (平均期間)
: テストの実行にかかる平均時間です。

First flaked and Last flaked (最初の不安定な動作と最後の不安定な動作)
: テストが最初に不安定な動作を示した日時とコミット SHA、および直近で不安定な動作を示した日時とコミット SHA です。

Commits flaked (不安定なコミット)
: テストが不安定な動作を示したコミットの数です。

Failure rate (失敗率)
: このテストが最初に不安定な動作を示した時点以降に失敗したテスト実行の割合です。

Trend (傾向)
: 不安定なテストが修正されたか、現在も不安定な状態が続いているかを示す可視化グラフです。

Test Optimization では、コミットの [{{< ui >}}Flaky Tests{{< /ui >}}] (不安定なテスト) セクションに以下のグラフが表示され、不安定なテストの傾向とその影響を把握するうえで役立ちます。

New Flaky Test Runs (新たな不安定なテスト実行)
: 新たな不安定なテストが検出される頻度です。

Known Flaky Test Runs (既知の不安定なテスト実行)
: 追跡中の不安定なテストに関連するすべてのテスト失敗です。これは、不安定なテストが「不安定な動作」を示したすべての回数を示します。

不安定なテストが誤って検出されたと判断したコミットで新しい不安定なテストを無視するには、ドロップダウンオプションのある [{{< ui >}}New Flaky{{< /ui >}}] (新しい不安定なテスト) 値を含むテストをクリックし、[{{< ui >}}Ignore flaky tests{{< /ui >}}] (不安定なテストを無視) をクリックしてください。詳細については、[不安定なテストの管理][8]を参照してください。

## Test Optimization エクスプローラーで結果を確認する {#examine-results-in-the-test-optimization-explorer}

Test Optimization エクスプローラーでは、テストから収集されたデータを使用して、可視化を作成し、テストスパンをフィルタリングできます。各テスト実行はトレースとして報告されます。これにはテストリクエストによって生成された追加のスパンが含まれます。

{{< tabs >}}
{{% tab "Session" %}}

テストセッションスパン結果のフィルタリングを開始するには、[[{{< ui >}}Software Delivery{{< /ui >}}] > [{{< ui >}}Test Optimization{{< /ui >}}] > [{{< ui >}}Test Runs{{< /ui >}}] (テスト実行)][101] に移動し、[{{< ui >}}Session{{< /ui >}}] (セッション) を選択します。

{{< img src="/getting_started/test_visibility/session.png" alt="Shopist リポジトリでフィルタリングされた Test Optimization エクスプローラーでのテストセッション結果" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/test-runs?query=test_level%3Asession

{{% /tab %}}
{{% tab "Module" %}}

テストモジュールスパン結果のフィルタリングを開始するには、[[{{< ui >}}Software Delivery{{< /ui >}}] > [{{< ui >}}Test Optimization{{< /ui >}}] > [{{< ui >}}Test Runs{{< /ui >}}] (テスト実行)][101] に移動し、[{{< ui >}}Module{{< /ui >}}] (モジュール) を選択します。

{{< img src="/getting_started/test_visibility/module.png" alt="Shopistリポジトリでフィルタリングされた Test Optimization エクスプローラーでのテストモジュール結果" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/test-runs?query=test_level%3Amodule

{{% /tab %}}
{{% tab "スイート" %}}

テストスイートスパン結果のフィルタリングを開始するには、[[{{< ui >}}Software Delivery{{< /ui >}}] > [{{< ui >}}Test Optimization{{< /ui >}}] > [{{< ui >}}Test Runs{{< /ui >}}] (テスト実行)][101] に移動し、[{{< ui >}}Suite{{< /ui >}}] (スイート) を選択します。

{{< img src="/getting_started/test_visibility/suite.png" alt="Shopist リポジトリでフィルタリングされた Test Optimization エクスプローラーでのテストスイート結果" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/test-runs?query=test_level%3Asuite

{{% /tab %}}
{{% tab "テスト" %}}

テストスパン結果のフィルタリングを開始するには、[{{< ui >}}Software Delivery{{< /ui >}}] > [{{< ui >}}Test Optimization{{< /ui >}}] > [{{< ui >}}Test Runs{{< /ui >}}] (テスト実行) [101] に移動し、[{{< ui >}}Test{{< /ui >}}] (テスト) を選択します。

{{< img src="/getting_started/test_visibility/test.png" alt="Shopist リポジトリでフィルタリングされた Test Optimization エクスプローラーでのテスト結果" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/test-runs?query=test_level%3Atest

{{% /tab %}}
{{< /tabs >}}

[ファセット][9]を使用して検索クエリをカスタマイズし、テスト実行の各レベルで費やされた時間の変化を特定します。

[{{< ui >}}Test List{{< /ui >}}] (テストのリスト) ページでテストをクリックすると、[{{< ui >}}Trace{{< /ui >}}] (トレース) タブにフレームグラフまたはスパンのリストが表示されます。

{{< img src="/getting_started/test_visibility/failed_test_trace.png" alt="[Test List] (テストのリスト) ページの失敗したテスト実行のスタックトレース" style="width:100%" >}}

テスト実行のボトルネックを特定し、実行時間の割合が大きい順にランク付けされた個々のレベルを調査できます。

## テストへのカスタムメジャーの追加 {#add-custom-measures-to-tests}

CI Visibility Tests API エンドポイントを使用して、テストイベントをプログラムで検索および管理できます。詳細については、[API のドキュメント][10]を参照してください。

CI テストから収集されるデータを強化するために、テスト実行中に作成されたスパンに、タグやメジャー (メモリ使用量など) をプログラムで直接追加できます。詳細については、[テストにカスタムメジャーを追加する][11]を参照してください。

## CI モニターの作成{#create-a-ci-monitor}

テストが失敗したときや新たな不安定なテストが発生したときには、テストパフォーマンスの低下に関するアラートを組織内の関連チームに送信します。

{{< img src="/getting_started/test_visibility/test_monitor.png" alt="テストの失敗数が 1 件を超えたときにアラートをトリガーするCI テストモニター" style="width:100%" >}}

テストの失敗数が 1 件のしきい値を超えたときにアラートを送信するモニターを設定するには、次の手順を実行します。

1. [[{{< ui >}}Monitors{{< /ui >}}] (モニター) > [{{< ui >}}New Monitor{{< /ui >}}] (モニターの新規作成)][12] に移動し、[{{< ui >}}CI{{< /ui >}}] を選択します。
1. 開始するため、CI テストの一般的なモニタータイプを選択します。たとえば、コードベースに新しい不安定なテストが追加されたときにアラートをトリガーする `New Flaky Test`、テストの失敗に対してアラートをトリガーする `Test Failures`、テストパフォーマンスの低下に対してアラートをトリガーする `Test Performance` などがあります。または、独自の検索クエリをカスタマイズすることもできます。この例では、`Branch (@git.branch)` ファセットを選択して、`main` ブランチでテスト実行をフィルタリングします。
1. `Evaluate the query over the` セクションで、[last 15 minutes] (直近 15 分) を選択します。
1. 評価値がしきい値を超えた時点でトリガーされるようにアラート条件を設定し、`Alert threshold > 1` などのアラートまたは警告のしきい値を指定します。
1. モニター通知を定義します。
1. モニターの権限を設定します。
1. [{{< ui >}}Create{{< /ui >}}] (作成) をクリックします。

詳細については、[CI モニターのドキュメント][13]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tests/
[2]: /ja/tests/test_impact_analysis
[3]: /ja/tests/#supported-features
[4]: /ja/dashboards/
[5]: https://app.datadoghq.com/dash/integration/30897/ci-visibility---tests-dashboard
[6]: /ja/glossary/?product=ci-cd#flaky-test
[7]: https://app.datadoghq.com/ci/test-services
[8]: /ja/tests/flaky_test_management/
[8]: https://app.datadoghq.com/ci/test-runs
[9]: /ja/continuous_integration/explorer/facets/?tab=testruns
[10]: /ja/api/latest/ci-visibility-tests/
[11]: /ja/tests/guides/add_custom_measures/
[12]: https://app.datadoghq.com/monitors/create
[13]: /ja/monitors/types/ci/?tab=tests#track-new-flaky-tests
[14]: /ja/tests/developer_workflows