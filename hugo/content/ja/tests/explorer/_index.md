---
description: Test Optimization Explorer でテスト実行を検索およびフィルタリングする方法について学びます。
further_reading:
- link: /continuous_integration/tests/
  tag: ドキュメント
  text: 問題のあるテストを見つけて修正するために、テストデータを調査する
- link: https://www.datadoghq.com/blog/configure-pipeline-alerts-with-ci-monitors/
  tag: ブログ
  text: Datadog CI モニターによるパイプラインアラートの構成
title: Test Optimization Explorer
---

## 概要

Test Optimization Explorer では、任意のタグを使用して、テスト実行を複数のレベルで[検索とフィルター](#search-and-filter)、[視覚化](#visualize)、[エクスポート](#export)することができます。

[**Software Delivery** > **Test Optimization** > **Test Runs**][6] に移動すると、**Session**、**Module**、**Suite**、**Test** のレベルで CI のテスト実行結果が表示されます。各テストレベルは、テストの集計の異なるレベルを表します。

{{< img src="/tests/explorer/test_runs.png" text="Test Optimization Explorer のテスト実行結果の一覧" style="width:100%" >}}

## 一般的なファセット

左側の **Test** パネルには、テスト実行の検索に使用できるデフォルトのファセットが表示されます。

| ファセット | 説明 |
|---|---|
| Test Status | テストの結果: `Passed`、`Failed`、または `Skipped` |
| Duration | テストが完了するまでの時間。 |
| Test Service | CI Visibility でインスツルメンテーションされた[テストサービス][12]。 |
| Test Full Name | テストの識別子です。テスト名、テストスイート名、構成やパラメーターがある場合はそれを含みます。 |
| Test Name | テストケースの簡潔な名前です。テスト自体で定義されます。 |
| テストスイート | 言語やテストフレームワークによって、同じコード単位を実行する[テストのグループ][13]です。 |
| Flaky | 同じコミットに対して複数回テストを実行した際に、通過と失敗の両方のステータスを示します。 |
| Has Parameters | テストにパラメーターがあるかどうか: `true` または `false`。 |
| Known Flaky | テストが不安定であるかどうか (`true` または `false`) です。<br><br>このテスト実行が失敗し、現在のブランチまたはデフォルトブランチで、そのテストが不安定と認識された場合です。 |
| 言語 | テストを生成したライブラリのプログラミング言語。 |
| New Flaky | この不安定なテストが以前に発生したかどうか (`true` または `false`) です。<br><br>このテストが実行されたコミットで、そのテストが不安定であることが特定されます。このテストが、以前に現在のブランチやデフォルトブランチでは不安定なテストとして認識されなかった場合です。 |
| Performance Regression | テスト実行が回帰としてマークされるのは、その期間が平均の 5 倍であり、デフォルトブランチの同じテストの最大期間よりも長い場合です。 |
| Baseline Mean | テスト回帰の場合、デフォルトブランチにおける同じテストの、直近 1 週間の平均実行時間を示します。 |
| Baseline Standard Deviation | テスト回帰の場合、デフォルトブランチにおける同じテストの標準偏差を、直近 1 週間の実行期間で計算した値で示します。 |
| Absolute Change | テスト回帰の場合、ベースライン平均と比較したテスト実行期間の絶対変化を示します。 |
| Relative Change | テスト回帰の場合、ベースライン平均と比較したテスト実行期間の相対変化を示します。 |
| Standard Deviation Change | テストが新しく追加されたかどうかを示します。 |
| Test Code Owners | リポジトリの構成から推測されるテストのコード所有者の名前です。 |
| Test Fingerprint | 個々のテスト実行に対する一意の識別子です。 |
| Test Framework | テストの作成と実行に使われた基本的なフレームワークやツールのセットです。 |
| Test Command | テストの実行に使われたコマンドです。 |
| Test Bundle | テストモジュールに相当します。以前のバージョンの Datadog テストライブラリで使用されます。 |
| Test Full Name | テストの正式名称。 |
| Test Module | テストモジュールは言語によって異なります。<br><br>.NET では、テストモジュールは同じユニットテストプロジェクトの下で実行されるすべてのテストをグループ化します。<br>Swift では、テストモジュールは指定されたバンドルのために実行されるすべてのテストをグループ化します。<br>JavaScript では、テストモジュールはテストセッションに 1 対 1 でマッピングされます。<br>Java では、テストモジュールは同じ Maven Surefire、Failsafe、または Gradle Test タスク実行によって実行されるすべてのテストをグループ化します。<br>Python では、テストモジュールは通常 `unittest` や `pytest` のようなフレームワークによって管理されるテストスイートの一部として、同じ `.py` ファイルの下で実行されるすべてのテストをグループ化します。<br>Ruby では、テストモジュールは通常 `RSpec` や `Minitest` のようなフレームワークによって管理される同じテストファイル内で実行されるすべてのテストをグループ化します。 |
| Test Traits | `category:flaky` のようなテストの特性。 |
| Test Type | `unit benchmark` や `browser` などのテストの種類。 |
| RUM Active | テストがアクティブな [Real User Monitoring][14] Web セッションの中で実行されたかどうかを示します。 |
| Is New | テストが新しく追加されたかどうかを示します。 |
| Is Retry | テストが再試行の結果として実行されたかどうかを示します。 |
| Code Coverage Enabled | [Test Impact Analysis][16] がセッションのテストごとに[コードカバレッジ][17]を有効にしたかどうかを示します。 |
| Skipped by ITR | Test Impact Analysis によってセッション中にスキップされたテストの数です。 |
| Test Skipping Enabled | Test Impact Analysis によってテストセッションまたはモジュールのスキップが許可されているかどうか。 |
| Test Skipping Type | Test Impact Analysis がスキップするテストを決定するために使用される方法または基準です。 |
| Test Skipped | テストセッション中に実行されなかったテストの総数。これには、スキップするように構成されたテストや、手動で除外されたテストが含まれる場合があります。 |
| Time Saved | Test Impact Analysis の使用によってセッションで節約された時間の長さです。 |
| Early Flake Detection Enabled | [Early Flake Detection][15] を使用してテストが実行されたかどうかを示します。 |
| Early Flake Detection Abort Reason | テストの Early Flake Detection による中止理由を示します。 |

Test Optimization Explorer で検索クエリの一部として使用できる一般的なファセットについては、[テスト実行ファセット][3]を参照してください。

### セッション

テストセッションは最も高いレベルの集計です。これらは `yarn test` や `mvn test`、`dotnet test` などのテストコマンドに一対一で対応しています。

JUnit レポートのアップロードでは、アップロードされたレポートファイル 1 つにつき 1 セッションです。

### モジュール

モジュールの定義は言語によって若干の違いがあります。

* .NET では、テストモジュールは、同じ[ユニットテストプロジェクト][9]の下で実行されるすべてのテストをグループ化します。
* Swift では、テストモジュールは、与えられたバンドルに対して実行されるすべてのテストをグループ化します。
* JavaScript では、テストモジュールはテストセッションに一対一でマッピングされます。
* Java では、テストモジュールは、同じ Maven Surefire/Failsafe または Gradle Test タスク実行で実行されるすべてのテストをグループ化します。
* JUnit レポートのアップロードでは、テストモジュールはテストセッションに一対一でマッピングされます。

モジュールの例としては、`SwiftLintFrameworkTests` があり、これは [`SwiftLint`][10] のテストターゲットに対応します。

### スイート

テストスイートは、同じコードのユニットを実行するテストのグループです。

テストスイートの例としては、`src/commands/junit/__tests__/upload.test.ts` があり、これは [`datadog-ci`][11] のテストファイルに対応します。

テスト実行データは、[ダッシュボード][7]や[ノートブック][8]で利用できるため、ビルドエンジニアリングチームは、優先度の高い作業や CI の経時的傾向に関するコミュニケーションをカスタマイズすることができます。

## 検索とフィルター

左側のファセットをクリックするか、検索バーに独自のカスタムクエリを記述することで、テスト実行のサブセットに焦点を絞ったり、広げたり、シフトしたりできます。ファセットを選択または選択解除すると、検索バーに変更が自動的に反映されます。同様に、検索バーのクエリを変更するか、検索バーにクエリをゼロから記述して、左側のファセットを選択または選択解除できます。

- テストの検索方法については、[Explorer][1] を参照してください。
- クエリの作成方法については、[検索構文][2]を参照してください。

## 分析

情報を導出または統合するために、クエリされたテスト実行を、フィールド、パターン、トランザクションなどの上位エンティティにグループ化します。属性を検索するために作成する必要のない [ファセット][3]を使用すると、以下のアクションを実行できます。

- CI/CD パイプラインで実行されているテストの進捗を検索し、追跡します。
- すべての CI/CD ジョブの実行を調査して、失敗したテスト実行を特定してトラブルシューティングします。
- 修正する[不安定なテスト][5]を特定します。

## 視覚化

視覚化の種類を選択して、フィルターや集計の結果を視覚化し、テストの実行をよりよく理解できます。たとえば、テスト結果をリストで表示してテストデータを列ごとに整理したり、[時系列グラフ][18]で表示して CI テストデータの経時変化を測定したりできます。

## エクスポート

Test Optimization Explorer の[ビューをエクスポート][4]すると、後で別のコンテキストで再利用できます。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tests/explorer/
[2]: /ja/tests/explorer/search_syntax
[3]: /ja/tests/explorer/facets
[4]: /ja/tests/explorer/saved_views
[5]: /ja/tests/flaky_test_management
[6]: https://app.datadoghq.com/ci/test-runs
[7]: https://app.datadoghq.com/dashboard/lists
[8]: https://app.datadoghq.com/notebook/list
[9]: https://learn.microsoft.com/en-us/visualstudio/test/create-a-unit-test-project?view=vs-2022#to-create-a-unit-test-project
[10]: https://github.com/realm/SwiftLint/blob/7738f0c0a5990201ca6556bdb2f13f8e67b5191d/Package.swift#L71
[11]: https://github.com/DataDog/datadog-ci/blob/6de6ea3bbffa57d8576422535061ca35c759feb6/src/commands/junit/__tests__/upload.test.ts
[12]: /ja/glossary/?product=ci-cd#test-service
[13]: /ja/glossary/?product=ci-cd#test-suite 
[14]: /ja/real_user_monitoring/
[15]: /ja/tests/flaky_test_management/early_flake_detection/
[16]: /ja/intelligent_test_runner/
[17]: /ja/tests/code_coverage/
[18]: https://app.datadoghq.com/ci/test-runs?viz=timeseries