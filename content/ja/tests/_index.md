---
aliases:
- /ja/continuous_integration/explore_tests/
- /ja/continuous_integration/guides/test_configurations/
- /ja/continuous_integration/integrate_tests/
- /ja/continuous_integration/tests/
cascade:
  site_support_id: test_optimization
  algolia:
    rank: 70
    tags:
    - CI テスト
    - CI テスト
    - test optimization
    - test visibility
    - 失敗したテスト
    - 不安定なテスト
    - サポートされる機能
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: リリースノート
  text: Software Delivery の最新リリースをチェック！ (アプリログインが必要です)。
- link: https://www.datadoghq.com/blog/datadog-ci-visibility/
  tag: ブログ
  text: Datadog CI Visibility で CI パイプラインとテストを監視する
- link: https://www.datadoghq.com/blog/ci-test-visibility-with-rum/
  tag: ブログ
  text: CI Visibility と RUM を使ったエンドツーエンドのテストのトラブルシューティング
- link: /monitors/types/ci/
  tag: ドキュメント
  text: CI Test Monitors について
- link: /tests/flaky_test_management/
  tag: ドキュメント
  text: 不安定なテストの管理について
- link: /tests/browser_tests/
  tag: ドキュメント
  text: RUM を使ったブラウザテストのインスツルメント方法
- link: /tests/troubleshooting/
  tag: ドキュメント
  text: Test Optimization のトラブルシューティング方法
title: Datadog の Test Optimization
---

## 概要

[Test Optimization][1] は、テストから見た視点で CI のヘルス状態を把握できる機能です。重要なメトリクスやテスト結果を表示することで、パイプライン全体ではなく、担当しているコードに関連するパフォーマンス問題やテスト失敗を調査できます。

## セットアップ

Datadog で Test Optimization を構成するためにオプションを選択してください。

{{< partial name="continuous_integration/ci-tests-setup.html" >}}

</br>

Test Optimization はテストだけでなく、プロジェクトのテスト工程全体を可視化します。

### サポートされる機能

|                                                                                                                                                                                                                                   |   .NET    | Java/JVM ベース |       Javascript       |  Python   |         Ruby          |   Swift   |     Go    |       JUnit Xml        |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:---------:|:--------------------:|:----------------------:|:---------:|:---------------------:|:---------:|:---------:|:----------------------:|
| {{< ci-details title="正確な時刻/継続時間結果" >}}テスト開始時刻と継続時間におけるマイクロ秒単位の分解能{{< /ci-details >}}                                                                                             | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="インテグレーションテストの分散型トレース" >}}Datadog でインスツルメンテーションされた外部サービスを呼び出すテストは、テストの詳細で完全な分散型トレースを表示します。{{< /ci-details >}}                  | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Agent ベースのレポート" >}}Datadog Agent を通じてテスト情報を報告する能力。{{< /ci-details >}}                                                                                                  | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="エージェントレスレポート" >}}Datadog Agent を使用せずにテスト情報を報告する能力。{{< /ci-details >}}                                                                                                    | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="Test suite level visibility" >}}セッション、モジュール、スイート、テストなど、テスト工程全体を可視化します。{{< /ci-details >}}                                                                 | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="手動 API" >}}Datadog の自動インスツルメンテーションでサポートされていないテストフレームワーク用の CI Visibility イベントをプログラム的に作成する能力。{{< /ci-details >}}                                | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             |            |           |                        |
| {{< ci-details title="Codeowner by test" >}}CODEOWNERS ファイルに基づき、テストファイルのオーナーを自動的に検出します。{{< /ci-details >}}                                                                                      | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} | {{< X >}} (部分的)  |
| {{< ci-details title="ソースコードの開始/終了" >}}テストの開始行と終了行の自動レポート。{{< /ci-details >}}                                                                                                         | {{< X >}} |       {{< X >}}      | {{< X >}} (開始のみ) | {{< X >}} | {{< X >}} (開始のみ)| {{< X >}} | {{< X >}} | {{< X >}} (開始のみ) |
| {{< ci-details title="CI と git 情報" >}}CI プロバイダー、git コミット SHA、パイプライン URL などの git や CI 環境のメタデータの自動収集。{{< /ci-details >}}                                                        | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="Git metadata upload" >}}<a href="/tests/test_impact_analysis">Test Impact Analysis</a> に使用する Git ツリー情報を自動でアップロードします。{{< /ci-details >}}                                                | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="Test Impact Analysis *" >}}<a href="/tests/test_impact_analysis">Test Impact Analysis</a> を有効にし、コードカバレッジと Git メタデータに基づいてテストをインテリジェントにスキップできます。{{< /ci-details >}} | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Code coverage support" >}}<a href="/tests/code_coverage">総合的なコードカバレッジ</a>のメトリクスをレポートできます。{{< /ci-details >}}                                                                              | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |   {{< X >}} (手動)   |
| {{< ci-details title="ベンチマークテストサポート" >}}ベンチマークテストのパフォーマンス統計の自動検出。{{< /ci-details >}}                                                                                           | {{< X >}} |                      |                        | {{< X >}} |                       | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="パラメタライズドテスト" >}}パラメタライズドテストの自動検出。{{< /ci-details >}}                                                                                                                      | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} |           |                        |
| {{< ci-details title="Early flake detection *" >}}<a href="/tests/flaky_test_management/early_flake_detection">新規テストを再試行</a>して不安定性を検出します (自動)。{{< /ci-details >}}                                          | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Auto test retries *" >}}<a href="/tests/flaky_test_management/auto_test_retries">失敗したテストを自動的に最大 N 回再試行</a>し、不安定性によるビルド失敗を回避します。{{< /ci-details >}}    | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Selenium RUM integration" >}}RUM が組み込まれたアプリケーションをテストする際、<a href="/tests/browser_tests">ブラウザセッションをテストケースに自動的にリンク</a>します。{{< /ci-details >}}                            | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             |           |           |                        |

\* この機能はオプトイン (任意有効化) であり、[**Test Optimization Settings** ページ][2]で有効化が必要です。

## デフォルト構成

テストは、与えられた条件のセットに対するコードの振る舞いを評価します。これらの条件の中には、OS やランタイムなど、テストが実行される環境に関連するものもあります。そのため、開発者は通常、異なる条件下でテストを実行するように構成し、 すべての条件下で期待通りの挙動が得られるかどうかを検証します。この特定の条件のセットを*構成*と呼びます。

Test Optimization では、複数の構成を持つテストは、それぞれの構成ごとに別個のテストとして扱われます。構成の 1 つが失敗し、他が成功した場合は、その特定のテストおよび構成の組み合わせだけが失敗としてマークされます。

たとえば、1 つのコミットに対してテストを実行し、Python のテストを 3 つの異なる Python バージョンで動かすとします。もしそのうち 1 つのバージョンでテストが失敗した場合、その特定のテストは失敗としてマークされ、他のバージョンは成功としてマークされます。次に、同じコミットに対してテストを再実行し、3 つの Python バージョンすべてでテストが成功した場合、以前失敗したバージョンのテストは「成功」であると同時に「flaky (不安定)」としてマークされ、他の 2 つのバージョンは引き続き成功としてマークされ、不安定性は検出されません。

### テスト構成属性

Test Optimization を使ってテストを実行すると、ライブラリはテストの実行環境に関する情報を検出し、テストのタグとしてレポートします。たとえば、Windows や Linux といったオペレーティングシステムの名前、arm64 や x86_64 といったプラットフォームのアーキテクチャなどが各テストにタグとして追加されます。これらの値は、特定の構成だけ失敗または不安定になった場合に、コミットおよびブランチ概要ページで表示されます。

以下のタグは、テスト構成を特定するために自動的に収集され、特定のプラットフォームにのみ適用されるものもあります。

| タグ名               | 説明                                                     |
|------------------------|-----------------------------------------------------------------|
| `os.platform`          | テストが実行されるオペレーティングシステムの名前。           |
| `os.family`            | テストが実行されるオペレーティングシステムの系列。         |
| `os.version`           | テストが実行されるオペレーティングシステムのバージョン。        |
| `os.architecture`      | テストが実行されるオペレーティングシステムのアーキテクチャ。   |
| `runtime.name`         | テスト用ランタイムシステムの名前。                       |
| `runtime.version`      | ランタイムシステムのバージョン。                                  |
| `runtime.vendor`       | テストを実行するランタイムプラットフォームを構築したベンダー。 |
| `runtime.architecture` | テスト用ランタイムシステムのアーキテクチャ。               |
| `device.model`         | テストを実行しているデバイスのモデル。                             |
| `device.name`          | デバイスの名前。                                             |
| `ui.appearance`        | ユーザーインターフェイスのスタイル。                                           |
| `ui.orientation`       | UI が実行されるオリエンテーション。                                   |
| `ui.localization`      | アプリケーションの言語。                                    |

### パラメータ化されたテストの構成

パラメータ化されたテストを実行すると、ライブラリは使用されたパラメータ情報を検出してレポートします。パラメータはテスト構成の一部であるため、同じテストケースでも異なるパラメータで実行された場合、Test Optimization では 2 つの異なるテストとして扱われます。

もしテストパラメータが非決定的 (ノンデターミニスティック) であり、テストを実行するたびに異なる値になる場合、Test Optimization では各テスト実行が新規テストとして扱われます。その結果、実行履歴、不安定検出、Test Impact Analysis などの一部の機能が正しく動作しない場合があります。

非決定的なテストパラメータの例としては、以下のようなものがあります。

- 現在の日付
- ランダム値
- テスト実行環境に依存する値 (絶対パスや現在のユーザー名など) 
- 決定的な文字列表現を持たない値 (`toString()` メソッドがオーバーライドされていない Java クラスのインスタンスなど) 

非決定的なテストパラメータの使用は避けてください。どうしても避けられない場合は、一部のテストフレームワークが、非決定的パラメータに対して決定的な文字列表現 (パラメータ表示名をオーバーライドするなど) を指定する方法を提供しています。

## カスタム構成

環境変数やテスト実行時の引数、開発者が独自に使用する手法などに依存しているため、自動的に特定・レポートできない構成もあります。そうした場合には、テストを正しく識別できるよう、ライブラリに対して構成の詳細を明示する必要があります。

これを行うには、`DD_TAGS` 環境変数で `test.configuration` のプレフィックスを使ってタグを定義します。

たとえば、以下のテスト構成タグは、ディスクの応答時間が遅くメモリが少ないというテスト構成を示します。

{{< code-block lang="bash" >}}
DD_TAGS=test.configuration.disk:slow,test.configuration.memory:low
{{< /code-block >}}

自動的に収集されたタグに加えて、`test.configuration` というプレフィックスを持つすべてのタグが構成タグとして使用されます。

注: `test.configuration.cpu.memory` のようにネストされた `test.configuration` タグはサポートされていません。

こうした構成タグを使ってフィルタリングするには、[これらのタグのファセットを作成する必要があります][3]。

## 開発者ワークフローを強化する

{{< whatsnext desc="コードカバレッジデータをレポートするツールと Test Optimization を統合し、RUM を使ってブラウザテストを強化し、開発サイクルにおける問題の特定と解決の効率化を通じてプラットフォームを横断したインサイトを得ましょう。" >}}
{{< nextlink href="/tests/developer_workflows/" >}}Datadog を活用した開発者ワークフローの強化{{< /nextlink >}}
{{< nextlink href="/tests/code_coverage" >}}コードカバレッジについて{{< /nextlink >}}
{{< nextlink href="/tests/browser_tests" >}}Browser RUM を使用して Cypress ブラウザテストをインスツルメントする{{< /nextlink >}}
{{< nextlink href="/tests/swift_tests" >}}RUM で Swift テストをインスツルメントする{{< /nextlink >}}
{{< /whatsnext >}}

## CI テストデータの使用

{{% ci-information-collected %}}

[ダッシュボード][4]や[ノートブック][5]を作成するとき、検索クエリに CI テストデータを使用することで、ビジュアライゼーションウィジェットのオプションが更新されます。詳細については、[ダッシュボード][6]および[ノートブックのドキュメント][7]を参照してください。

## テストデータに対するアラート

失敗または不安定になったテスト、あるいは CI テストのパフォーマンスを評価するとき、[Test Optimization Explorer][8] での検索クエリを [CI Test モニター][9]にエクスポートできます。**Export** ボタンをクリックするとエクスポートが実行されます。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/test-repositories
[2]: https://app.datadoghq.com/ci/settings/test-optimization
[3]: /ja/continuous_integration/explorer/facets/
[4]: https://app.datadoghq.com/dashboard/lists
[5]: https://app.datadoghq.com/notebook/list
[6]: /ja/dashboards
[7]: /ja/notebooks
[8]: https://app.datadoghq.com/ci/test-runs
[9]: /ja/monitors/types/ci/