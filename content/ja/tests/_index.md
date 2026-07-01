---
aliases:
- /ja/continuous_integration/explore_tests/
- /ja/continuous_integration/guides/test_configurations/
- /ja/continuous_integration/integrate_tests/
- /ja/continuous_integration/tests/
- /ja/tests/repositories/
- /ja/tests/search/
cascade:
  algolia:
    rank: 70
    tags:
    - ci test
    - ci tests
    - test optimization
    - test visibility
    - failed test
    - flaky test
    - supported features
  site_support_id: test_optimization
further_reading:
- link: https://learn.datadoghq.com/courses/getting-started-test-optimization
  tag: ラーニングセンター
  text: Test Optimization の概要
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: リリースノート
  text: Software Delivery の最新リリースをチェック！ (アプリログインが必要です)
- link: https://www.datadoghq.com/blog/datadog-ci-visibility/
  tag: ブログ
  text: Datadog CI Visibility で CI パイプラインとテストを監視する
- link: https://www.datadoghq.com/blog/ci-test-visibility-with-rum/
  tag: ブログ
  text: CI Visibility と RUM を使ったエンドツーエンドのテストのトラブルシューティング
- link: /monitors/types/ci/
  tag: ドキュメント
  text: CI テストモニターについて
- link: /tests/flaky_test_management/
  tag: ドキュメント
  text: 不安定なテストの管理について
- link: /tests/browser_tests/
  tag: ドキュメント
  text: RUM を使ったブラウザテストのインスツルメント方法
- link: /tests/troubleshooting/
  tag: ドキュメント
  text: Test Optimization のトラブルシューティング方法
- link: https://www.datadoghq.com/blog/gitlab-source-code-integration
  tag: ブログ
  text: Datadog で GitLab ソースコード統合を使用して迅速にトラブルシューティングを実行する
- link: https://www.datadoghq.com/blog/dbt-data-quality-testing
  tag: ブログ
  text: dbt-expectations を使用して dbt のデータ品質チェックを実装する
title: Datadog の Test Optimization
---
{{< learning-center-callout header="ラーニングセンターで Test Optimization を使い始めてみてください" btn_title="今すぐ登録する" btn_url="https://learn.datadoghq.com/courses/getting-started-test-optimization">}}
  テストモニタリングを設定し、不安定なテストを特定して、重要なテストのみを実行するために Test Impact Analysis を使用することで、CI パイプラインを加速する方法を学びましょう。
{{< /learning-center-callout >}}


## 概要 {#overview}

[Test Optimization][1] は、テストからの重要なメトリクスと結果を表示することで、CI 状態のテストファーストビューを提供します。これにより、テストを実行するパイプラインではなく、担当しているコードに焦点を当てて、作業に最も関連するパフォーマンスの問題やテストの失敗を調査できます。

## セットアップ {#setup}

Datadog で Test Optimization を構成するためにオプションを選択してください。

{{< card-grid card_width="75px" >}}
  {{< image-card href="/tests/setup/dotnet/" src="integrations_logos/dotnet_avatar.svg" alt=".net" >}}
  {{< image-card href="/tests/setup/java/" src="integrations_logos/java_avatar.svg" alt="java" >}}
  {{< image-card href="/tests/setup/javascript/" src="integrations_logos/javascript.png" alt="javascript" >}}
  {{< image-card href="/tests/setup/python/" src="integrations_logos/python_avatar.svg" alt="python" >}}
  {{< image-card href="/tests/setup/ruby/" src="integrations_logos/ruby_avatar.svg" alt="ruby" >}}
  {{< image-card href="/tests/setup/swift/" src="integrations_logos/swift_avatar.svg" alt="swift" >}}
  {{< image-card href="/tests/setup/go/" src="integrations_logos/golang-avatar.png" alt="go" >}}
  {{< image-card href="/tests/setup/junit_xml/" src="integrations_logos/junit_xml.png" alt="JUnit テストを Datadog にアップロード" >}}
{{< /card-grid >}}

</br>

Test Optimization はテストだけでなく、プロジェクトのテスト工程全体を可視化します。

### サポートされる機能 {#supported-features}

|                                                                                                                                                                                                                                   |   .NET    | Java/JVM ベース |       Javascript       |  Python   |         Ruby          |   Swift   |     Go    |       JUnit Xml        |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:---------:|:--------------------:|:----------------------:|:---------:|:---------------------:|:---------:|:---------:|:----------------------:|
| {{< ci-details title="正確な時刻/継続時間結果" >}}テスト開始時刻と継続時間におけるマイクロ秒単位の分解能{{< /ci-details >}}                                                                                             | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="インテグレーションテストの分散型トレース" >}}Datadog でインスツルメンテーションされた外部サービスを呼び出すテストは、テストの詳細で完全な分散型トレースを表示します。{{< /ci-details >}}                  | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Agent ベースのレポート" >}}Datadog Agent を通じてテスト情報を報告する能力。{{< /ci-details >}}                                                                                                  | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="エージェントレスレポート" >}}Datadog Agent を使用せずにテスト情報を報告する能力。{{< /ci-details >}}                                                                                                    | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="テストスイートレベルの視覚化" >}}セッション、モジュール、スイート、テストなど、テスト工程全体を可視化します。{{< /ci-details >}}                                                                 | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="手動 API" >}}Datadog の自動インスツルメンテーションでサポートされていないテストフレームワーク用の CI Visibility イベントをプログラム的に作成する能力。{{< /ci-details >}}                                | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             |            |           |                        |
| {{< ci-details title="テストごとのコード所有者" >}}CODEOWNERS ファイルに基づくテストの所有者の自動検出。{{< /ci-details >}}                                                                                      | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} | {{< X >}} (部分的)  |
| {{< ci-details title="ソースコードの開始/終了" >}}テストの開始行と終了行の自動レポート。{{< /ci-details >}}                                                                                                         | {{< X >}} |       {{< X >}}      | {{< X >}} (開始のみ) | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} (開始のみ) |
| {{< ci-details title="CI と git 情報" >}}CI プロバイダー、git コミット SHA、パイプライン URL などの git 環境や CI 環境のメタデータの自動収集。{{< /ci-details >}}                                                        | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="Git メタデータのアップロード" >}}<a href="/tests/test_impact_analysis">Test Impact Analysis</a> に使用される git ツリー情報の自動アップロード。{{< /ci-details >}}                                                | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="Test Impact Analysis *" >}}コードカバレッジと git メタデータに基づいてインテリジェントにテストをスキップする <a href="/tests/test_impact_analysis">Test Impact Analysis</a> を有効にする機能。{{< /ci-details >}} | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="コードカバレッジサポート" >}}<a href="/tests/code_coverage">総コードカバレッジ</a>のメトリクスを報告する能力。{{< /ci-details >}}                                                                              | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |   {{< X >}} (手動)   |
| {{< ci-details title="ベンチマークテストのサポート" >}}ベンチマークテストのパフォーマンス統計の自動検出。{{< /ci-details >}}                                                                                           | {{< X >}} |                      |                        | {{< X >}} |                       | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="パラメーター化されたテスト" >}}パラメーター化されたテストの自動検出。{{< /ci-details >}}                                                                                                                      | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} |           |                        |
| {{< ci-details title="Early Flake Detection *" >}}<a href="/tests/flaky_test_management/early_flake_detection">新規テストを再試行</a>して不安定性を検出します (自動)。{{< /ci-details >}}                                          | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="テストの自動再試行 *" >}}<a href="/tests/flaky_test_management/auto_test_retries">失敗したテストを自動的に最大 N 回再試行</a>し、テストの不安定性によるビルド失敗を回避します。{{< /ci-details >}}    | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="失敗したテストのリプレイ *" >}}再試行される失敗したテストの<a href="/tests/flaky_test_management/auto_test_retries#failed-test-replay">ローカル変数の情報にアクセス</a>できます。{{< /ci-details >}}                      | {{< X >}} |       {{< X >}}      |       {{< X >}}        |           |                       |           |           |                        |
| {{< ci-details title="Selenium RUM インテグレーション" >}}RUM が組み込まれたアプリケーションをテストする際、<a href="/tests/browser_tests">ブラウザセッションをテストケースに自動的にリンク</a>します。{{< /ci-details >}}                            | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             |           |           |                        |

\* この機能はオプトイン (任意有効化) であり、[[**Test Optimization Settings**] (Test Optimization の設定) ページ][2]で有効化が必要です。

## デフォルト構成 {#default-configurations}

テストは、与えられた条件のセットに対するコードの振る舞いを評価します。これらの条件の中には、OS や使用されるランタイムなど、テストが実行される環境に関連するものもあります。同じコードでも、異なる条件下で実行されると動作が異なる可能性があるため、開発者は通常、異なる条件下でテストを実行するように構成し、すべての条件下で期待どおりの動作が得られるかどうかを検証します。この特定の条件のセットを*構成*と呼びます。

Test Optimization では、複数の構成を持つテストは、それぞれの構成ごとに別個のテストとして扱われます。構成の 1 つが失敗し、その他の構成は成功した場合、その特定のテストと構成の組み合わせのみが失敗としてマークされます。

たとえば、単一のコミットをテストしていて、1 つの Python テストを 3 つの異なる Python バージョンに対して実行するとします。そのうち 1 つのバージョンでテストが失敗した場合、その特定のテストは失敗としてマークされますが、その他のバージョンは成功としてマークされます。同じコミットに対してテストを再試行し、今度は 3 つの Python バージョンのすべてでテストが成功した場合、以前に失敗したバージョンのテストは成功と不安定の両方としてマークされますが、他の 2 つのバージョンは成功のままで、不安定性は検出されません。

### テスト構成属性 {#test-configuration-attributes}

Test Optimization を使用してテストを実行すると、テストが実行される環境に関する情報をライブラリが検出し、テストタグとして報告します。たとえば、`Windows` や `Linux` などのオペレーティングシステム名や、`arm64` や `x86_64` などのプラットフォームのアーキテクチャが、各テストのタグとして追加されます。これらの値は、特定の構成でテストが失敗したり不安定であったりした場合に、コミットやブランチの概要ページで表示されます。

以下のタグは、テスト構成を特定するために自動的に収集されます。特定のプラットフォームにのみ適用されるものもあります。

| タグ名               | 説明                                                     |
|------------------------|-----------------------------------------------------------------|
| `os.platform`          | テストが実行されるオペレーティングシステムの名前。          |
| `os.family`            | テストが実行されるオペレーティングシステムの系列。        |
| `os.version`           | テストが実行されるオペレーティングシステムのバージョン。       |
| `os.architecture`      | テストが実行されるオペレーティングシステムのアーキテクチャ。  |
| `runtime.name`         | テスト用ランタイムシステムの名前。                      |
| `runtime.version`      | ランタイムシステムのバージョン。                                 |
| `runtime.vendor`       | テストを実行するランタイムプラットフォームを構築したベンダー。|
| `runtime.architecture` | テスト用ランタイムシステムのアーキテクチャ。              |
| `device.model`         | テストを実行しているデバイスのモデル。                            |
| `device.name`          | デバイスの名前。                                            |
| `ui.appearance`        | ユーザーインターフェイスのスタイル。                                          |
| `ui.orientation`       | UI が実行されるオリエンテーション。                                   |
| `ui.localization`      | アプリケーションの言語。                                   |

### パラメーター化されたテストの構成 {#parameterized-test-configurations}

パラメーター化されたテストを実行すると、使用されたパラメーターに関する情報をライブラリが検出して報告します。パラメーターはテスト構成の一部であるため、同じテストケースでも異なるパラメーターで実行された場合、Test Optimization では 2 つの異なるテストとして扱われます。

テストパラメーターが非決定的で、テストを実行するたびに異なる値になる場合、Test Optimization では各テスト実行が新規テストとして扱われます。その結果、実行履歴、不安定検出、Test Impact Analysis などの一部の機能が正しく動作しない場合があります。

非決定的なテストパラメーターの例としては、以下のようなものがあります。

- 現在の日付
- ランダム値
- テスト実行環境に依存する値 (絶対パスや現在のユーザー名など)
- 決定的な文字列表現を持たない値 (`toString()` メソッドがオーバーライドされていない Java クラスのインスタンスなど)

非決定的なテストパラメーターの使用は避けてください。どうしても避けられない場合は、一部のテストフレームワークが、非決定的パラメーターに対して決定的な文字列表現を指定する方法 (パラメーター表示名をオーバーライドするなど) を提供しています。

## カスタム構成 {#custom-configurations}

環境変数やテスト実行時の引数など、開発者が使用するアプローチに依存する場合があるために、直接識別して自動的に報告することができない構成もあります。そのような場合は、Test Optimization がそれらを適切に識別できるように、ライブラリに構成の詳細を提供する必要があります。

これを行うには、`DD_TAGS` 環境変数で `test.configuration` のプレフィックスを使用してタグを定義します。

たとえば、以下のテスト構成タグは、ディスクの応答時間が遅くメモリが少ないテスト構成を識別します。

{{< code-block lang="bash" >}}
DD_TAGS=test.configuration.disk:slow,test.configuration.memory:low
{{< /code-block >}}

自動的に収集されたタグに加えて、`test.configuration` というプレフィックスを持つすべてのタグが構成タグとして使用されます。

注: `test.configuration.cpu.memory` のようにネストされた `test.configuration` タグはサポートされていません。

こうした構成タグを使用してフィルタリングするには、[これらのタグのファセットを作成する必要があります][3]。

## 開発者ワークフローを強化する {#enhance-your-developer-workflow}

{{< whatsnext desc="コードカバレッジデータを報告するツールと Test Optimization を統合し、RUM を使用してブラウザテストを強化し、開発サイクルにおける問題の特定と解決の効率化を通じてプラットフォーム全体のインサイトを得ましょう。" >}}
{{< nextlink href="/tests/developer_workflows/" >}}Datadog で開発者のワークフローを強化する{{< /nextlink >}}
{{< nextlink href="/tests/code_coverage" >}}Code Coverage について{{< /nextlink >}}
{{< nextlink href="/tests/browser_tests" >}}ブラウザ RUM を使用した Cypress ブラウザテストのインスツルメント{{< /nextlink >}}
{{< nextlink href="/tests/swift_tests" >}}RUM を使用した Swift テストのインスツルメント{{< /nextlink >}}
{{< /whatsnext >}}

## CI テストデータの使用 {#use-ci-tests-data}

{{% ci-information-collected %}}

[ダッシュボード][4]または[ノートブック][5]を作成する際、検索クエリで CI テストデータを使用すると、視覚化ウィジェットのオプションが更新されます。詳細については、[ダッシュボード][6]および[ノートブックのドキュメント][7]を参照してください。

## テストデータに対するアラート {#alert-on-test-data}

失敗したテストや不安定なテスト、あるいは CI テストのパフォーマンスを評価するとき、[Test Optimization Explorer][8] での検索クエリを [CI Test モニター][9]にエクスポートできます。[**Export**] (エクスポート) ボタンをクリックするとエクスポートが実行されます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/test/health
[2]: https://app.datadoghq.com/ci/settings/test-optimization
[3]: /ja/continuous_integration/explorer/facets/
[4]: https://app.datadoghq.com/dashboard/lists
[5]: https://app.datadoghq.com/notebook/list
[6]: /ja/dashboards
[7]: /ja/notebooks
[8]: https://app.datadoghq.com/ci/test-runs
[9]: /ja/monitors/types/ci/