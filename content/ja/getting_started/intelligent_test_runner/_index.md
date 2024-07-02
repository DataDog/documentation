---
algolia:
  tags:
  - intelligent test runner
  - CI テスト
  - CI テスト
  - 不安定なテスト
  - 不安定なテスト
further_reading:
- link: https://www.datadoghq.com/blog/streamline-ci-testing-with-datadog-intelligent-test-runner/
  tag: ブログ
  text: Datadog Intelligent Test Runner による CI テストの効率化
- link: /intelligent_test_runner/
  tag: ドキュメント
  text: Intelligent Test Runner について
- link: /tests/code_coverage/
  tag: ドキュメント
  text: コードカバレッジについて
title: Intelligent Test Runner の概要
---

## 概要

[Intelligent Test Runner][1] は、最近のコード変更によって影響を受けない無関連なテストをインテリジェントに除外することにより、組織のテスト影響分析を合理化します。

[Test Visibility][2] により、開発チームはテストサービス用に Intelligent Test Runner を構成し、除外すべきブランチ (たとえばデフォルトブランチ) を設定し、追跡すべきファイルを定義できます (追跡されたファイルの変更時にはすべてのテストの完全な実行がトリガーされます)。

{{< img src="/continuous_integration/itr_test_selection_diagram.png" alt="Intelligent Test Runner のコンポーネントのベン図: 追跡ファイル、除外ブランチ、およびスキップされたテスト" caption="Intelligent Test Runner が追跡ファイル、除外ブランチ、および通過したテストを使用して除外テストを定義する方法を示すベン図" style="width:65%" >}}

テストサービスに Intelligent Test Runner を構成し有効化することで、CI 環境全体の信頼性とパフォーマンスを維持しつつ、不要なテスト時間を削減し、CI のテスト効率を向上させ、コストを削減します。

Intelligent Test Runner は [コードカバレッジデータ][5]を使用してテストをスキップすべきかどうかを判断します。詳細は [Datadog の Intelligent Test Runner の仕組み][10]を参照してください。

## Intelligent Test Runner のセットアップ

Intelligent Test Runner をセットアップするためには、お使いのプログラミング言語に関する以下のドキュメントを参照してください。

{{< partial name="continuous_integration/ci-itr-setup.html" >}}

</br>

## Intelligent Test Runner の有効化

Intelligent Test Runner を有効にするには

1. [**Software Delivery** > **Test Visibility** > **Settings**][3] に移動します。
1. **Test Services** タブで、サービスの `Intelligent Test Runner` 列で **Configure** をクリックします。

{{< img src="/getting_started/intelligent_test_runner/enable_settings.png" alt="Test Service Settings ページでテストサービスに Intelligent Test Runner を有効にする" style="width:100%" >}}

`Intelligent Test Runner Activation Write` 権限が必要です。詳細は [Datadog のロール権限についてのドキュメント][4]を参照してください。

クリティカルブランチ (たとえばデフォルトブランチなど) で Intelligent Test Runner を無効にすることで、包括的なテストカバレッジが確保されますが、機能や開発ブランチでそれを有効にすることで、テストの効率を最大限に高めることができます。

## Intelligent Test Runner の構成

Intelligent Test Runner を構成して、特定のテストがスキップされないようにすることができます。これらのテストは*スキップできないテスト*と呼ばれ、[コードカバレッジデータ][5]にかかわらず実行されます。

Intelligent Test Runner を構成するには

1. **Status** トグルをクリックして Intelligent Test Runner を有効にします。
1. 除外するブランチ (通常はリポジトリのデフォルトブランチ) を指定します。Intelligent Test Runner は、これらのブランチのテストをスキップしません。
1. 追跡するファイルディレクトリとファイルを指定します (たとえば `documentation/content/**` や `domains/shopist/apps/api/BUILD.bazel` など) 。Intelligent Test Runner は、これらの追跡ファイルが変更された場合、すべての CI テストを実行します。
1. **Save Settings** をクリックします。

{{< img src="/getting_started/intelligent_test_runner/configure_itr.png" alt="Intelligent Test Runner を有効にし、Intelligent Test Runner が除外するブランチを提供し、変更があった場合にテストを実行するために Intelligent Test Runner が追跡するファイルを追加する" style="width:100%" >}}

テストサービスで Intelligent Test Runner を構成した後、デフォルトブランチでテストスイートの実行を行います。これにより、将来のコミットで無関係なテストを正確にスキップできる基準が確立されます。

## Intelligent Test Runner のデータを活用する

Intelligent Test Runner を有効にすることで収集されたデータを探索し、テストのスキップによる時間節約や、組織における Intelligent Test Runner の利用状況などを分析して、CI の効率を向上させましょう。

{{< img src="/getting_started/intelligent_test_runner/dashboard.png" alt="テストがスキップされたことによる時間節約と、組織の Intelligent Test Runner の使用状況についての情報を表示する、すぐに使えるダッシュボード" style="width:100%" >}}

[ダッシュボード][6]を作成してテストのメトリクスを視覚化することも、Intelligent Test Runner が収集したデータを利用したウィジェットを含む[すぐに使えるダッシュボード][7]を使用して、利用パターンや傾向から改善点を特定することもできます。

## Test Visibility Explorer で結果を検証する

[Test Visibility Explorer][8] では、Test Visibility と Intelligent Test Runner から収集したデータを用いて視覚化の作成やテストスパンのフィルタリングが可能です。Intelligent Test Runner がアクティブな場合は、各テストセッションやコミットで節約された時間が表示され、期間バーが紫色に変わります。これはアクティブなテストスキップを示します。

{{< tabs >}}
{{% tab "セッション" %}}

[**Software Delivery** > **Test Visibility** > **Test Runs**][101] に移動し、`Session` を選択してテストセッションスパンの結果のフィルタリングを開始します。

{{< img src="/getting_started/intelligent_test_runner/itr_sessions.png" alt="Intelligent Test Runner によってスキップされたテストでフィルタリングされた Test Visibility Explorer のテストセッション結果" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/test-runs?query=test_level%3Asession

{{% /tab %}}
{{% tab "モジュール" %}}

[**Software Delivery** > **Test Visibility** > **Test Runs**][101] に移動し、`Module` を選択して、テストモジュールスパンの結果のフィルタリングを開始します。

{{< img src="/getting_started/intelligent_test_runner/itr_modules.png" alt="Test Visibility Explorer で、Intelligent Test Runner によってスキップされたテストでフィルタリングされたテストモジュールの結果" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/test-runs?query=test_level%3Amodule

{{% /tab %}}
{{% tab "スイート" %}}

[**Software Delivery** > **Test Visibility** > **Test Runs**][101] に移動し、`Suite` を選択して、テストスイートスパン結果のフィルタリングを開始します。

{{< img src="/getting_started/intelligent_test_runner/itr_suites.png" alt="Test Visibility Explorer で、Intelligent Test Runner がスキップしたテストにフィルタリングされたテストスイートの結果" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/test-runs?query=test_level%3Asuite

{{% /tab %}}
{{% tab "テスト" %}}

[**Software Delivery** > **Test Visibility** > **Test Runs**][101] に移動し、`Test` を選択して、テストスパンの結果のフィルタリングを開始します。

{{< img src="/getting_started/intelligent_test_runner/itr_tests.png" alt="Test Visibility Explorer で、Intelligent Test Runner によってスキップされたテストでフィルタリングされたテスト結果" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/test-runs?query=test_level%3Atest

{{% /tab %}}
{{< /tabs >}}

次のすぐに使える Intelligent Test Runner [ファセット][9]を使用して、検索クエリをカスタマイズします。

Code Coverage Enabled
: テストセッション中にコードカバレッジの追跡が活動していたかどうかを示します。

Skipped by ITR
: Intelligent Test Runner によってセッション中にスキップされたテストの数です。

Test Skipping Enabled
: テストセッションで Intelligent Test Runner が有効であったかどうかを示します。

Test Skipping Type
: Intelligent Test Runner がスキップするテストを決定するために使用される方法または基準です。

Tests Skipped
: テストセッション中に実行されなかったテストの総数。これには、スキップするように構成されたテストや、手動で除外されたテストが含まれる場合があります。

Time Saved
: Intelligent Test Runner の使用によってセッションで節約された時間の長さです。

たとえば、`Test Skipping Enabled` を持つテストセッションの実行をフィルタリングするには、検索クエリで `@test.itr.tests_skipping.enabled:true` を使用します。

{{< img src="/getting_started/intelligent_test_runner/session_run.png" alt="Intelligent Test Runner でテストスキップ機能が有効になっている最初のテストセッション実行を表示するサイドパネル" style="width:100%" >}}

次に、テストセッションの実行をクリックし、テストセッションのサイドパネルの **Test Session Details** セクションで、Intelligent Test Runner によって節約された時間の量を確認します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/intelligent_test_runner/
[2]: /ja/tests/
[3]: https://app.datadoghq.com/ci/settings/test-service
[4]: /ja/account_management/rbac/permissions/
[5]: /ja/tests/code_coverage
[6]: /ja/dashboards/
[7]: https://app.datadoghq.com/dash/integration/30941/ci-visibility---intelligent-test-runner
[8]: /ja/continuous_integration/explorer?tab=testruns
[9]: /ja/continuous_integration/explorer/facets/?tab=testruns
[10]: /ja/intelligent_test_runner/how_it_works/