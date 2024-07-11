---
aliases:
- /ja/continuous_integration/explore_tests/
- /ja/continuous_integration/guides/test_configurations/
- /ja/continuous_integration/integrate_tests/
- /ja/continuous_integration/tests/
cascade:
  algolia:
    rank: 70
    tags:
    - CI テスト
    - CI テスト
further_reading:
- link: /monitors/types/ci/
  tag: ドキュメント
  text: CI Test モニターの作成
- link: /continuous_integration/guides/find_flaky_tests/
  tag: ドキュメント
  text: 不安定なテストを見つける
- link: /continuous_integration/guides/rum_integration/
  tag: ドキュメント
  text: CI Visibility と RUM の連動
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: CI Visibility のトラブルシューティング
- link: https://www.datadoghq.com/blog/ci-test-visibility-with-rum/
  tag: ブログ
  text: CI Visibility と RUM を使ったエンドツーエンドのテストのトラブルシューティング
title: Datadog における Test Visibility
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 CI Visibility は利用できません。</div>
{{< /site-region >}}

## 概要

[Test Visibility][1] は、テストからの重要なメトリクスと結果を表示することで、CI 状態のテストファーストビューを提供します。パイプラインを保守しているのではなく、関連するコードを保守しているため、最も気になるパフォーマンス問題やテストの失敗を調査するのに役立ちます。

## 送信 - Agent チェック

{{< whatsnext desc="Datadog で Test Visibility をセットアップするための言語を選択します。" >}}
    {{< nextlink href="tests/setup/dotnet" >}}.NET{{< /nextlink >}}
    {{< nextlink href="tests/setup/java" >}}Java{{< /nextlink >}}
    {{< nextlink href="tests/setup/javascript" >}}JavaScript{{< /nextlink >}}
    {{< nextlink href="tests/setup/python" >}}Python{{< /nextlink >}}
    {{< nextlink href="tests/setup/ruby" >}}Ruby{{< /nextlink >}}
    {{< nextlink href="tests/setup/swift" >}}Swift{{< /nextlink >}}
    {{< nextlink href="tests/setup/junit_xml" >}}JUnit のテストレポートファイルを Datadog にアップロードする{{< /nextlink >}}
    {{< nextlink href="tests/containers" >}}コンテナで実行されるテスト{{< /nextlink >}}
{{< /whatsnext >}}

テストに加えて、Test Visibility はプロジェクトのテストフェーズ全体を視覚化します (Ruby を除く)。

### サポートされる機能

|                                                                                                                                                                                                                  |   ダッシュボード      |   モニタリング    |       Javascript       |  設定   |   エクスプローラー    |   Exadata   |       JUnit Xml        |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:---------:|:---------:|:----------------------:|:---------:|:---------:|:---------:|:----------------------:|
| {{< ci-details title="正確な時刻/継続時間結果" >}}テスト開始時刻と継続時間におけるマイクロ秒単位の分解能{{< /ci-details >}}                                                                            | {{< X >}} | {{< X >}} |       {{< X >}}        | {{< X >}} | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="インテグレーションテストの分散型トレース" >}}Datadog でインスツルメンテーションされた外部サービスを呼び出すテストは、テストの詳細で完全な分散型トレースを表示します。{{< /ci-details >}} | {{< X >}} | {{< X >}} |       {{< X >}}        |           | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Agent ベースのレポート" >}}Datadog Agent を通じてテスト情報を報告する能力。{{< /ci-details >}}                                                                                 | {{< X >}} | {{< X >}} |       {{< X >}}        | {{< X >}} | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="エージェントレスレポート" >}}Datadog Agent を使用せずにテスト情報を報告する能力。{{< /ci-details >}}                                                                                   | {{< X >}} | {{< X >}} |       {{< X >}}        | {{< X >}} | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="テストスイートレベルの可視性" >}}セッション、モジュール、スイート、テストを含むテストプロセス全体の可視性。{{< /ci-details >}}                                                | {{< X >}} | {{< X >}} |       {{< X >}}        | {{< X >}} | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="手動 API" >}}Datadog の自動インスツルメンテーションでサポートされていないテストフレームワーク用の CI Visibility イベントをプログラム的に作成する能力。{{< /ci-details >}}               | {{< X >}} | {{< X >}} |       {{< X >}}        |           | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="テストごとのコード所有者" >}}CODEOWNERS ファイルに基づくテストファイルの所有者の自動検出。{{< /ci-details >}}                                                                     | {{< X >}} | {{< X >}} |       {{< X >}}        | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} (部分的)  |
| {{< ci-details title="ソースコードの開始/終了" >}}テストの開始行と終了行の自動レポート。{{< /ci-details >}}                                                                                        | {{< X >}} | {{< X >}} | {{< X >}} (開始のみ) | {{< X >}} | {{< X >}} (開始のみ) | {{< X >}} | {{< X >}} (開始のみ) |
| {{< ci-details title="CI と git 情報" >}}CI プロバイダー、git コミット SHA、パイプライン URL などの git や CI 環境のメタデータの自動収集。{{< /ci-details >}}                                       | {{< X >}} | {{< X >}} |       {{< X >}}        | {{< X >}} | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="Git メタデータのアップロード" >}}Intelligent Test Runner で使用される git ツリー情報の自動アップロード。{{< /ci-details >}}                                                                      | {{< X >}} | {{< X >}} |       {{< X >}}        | {{< X >}} |           | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="Intelligent Test Runner" >}}コードカバレッジと git メタデータに基づいてインテリジェントにテストをスキップする Intelligent Test Runner を有効にする能力。{{< /ci-details >}}                      | {{< X >}} | {{< X >}} |       {{< X >}}        | {{< X >}} |           | {{< X >}} |                        |
| {{< ci-details title="コードカバレッジサポート" >}}全体のコードカバレッジのメトリクスを報告する能力。{{< /ci-details >}}                                                                                                | {{< X >}} | {{< X >}} |       {{< X >}}        |           |           | {{< X >}} |   {{< X >}} (手動)   |
| {{< ci-details title="ベンチマークテストサポート" >}}ベンチマークテストのパフォーマンス統計の自動検出。{{< /ci-details >}}                                                                          | {{< X >}} |           |                        | {{< X >}} |           | {{< X >}} |                        |
| {{< ci-details title="パラメタライズドテスト" >}}パラメタライズドテストの自動検出。{{< /ci-details >}}                                                                                                     | {{< X >}} | {{< X >}} |       {{< X >}}        | {{< X >}} | {{< X >}} | {{< X >}} |                        |

## デフォルト構成

テストは、与えられた条件のセットに対するコードの振る舞いを評価します。これらの条件の中には、OS やランタイムなど、テストが実行される環境に関連するものもあります。そのため、開発者は通常、異なる条件下でテストを実行するように構成し、 すべての条件下で期待通りの挙動が得られるかどうかを検証します。この特定の条件のセットを*構成*と呼びます。

Test Visibility では、複数の構成を持つテストは、各構成ごとに別々のテストとして扱われます。いくつかの構成のうち一つが失敗し、他が成功した場合、その特定のテストと構成の組み合わせのみが失敗とマークされます。

例えば、1 つのコミットをテストする際に、3 つの異なる Python バージョンに対して実行する Python テストがあると仮定します。そのうちのひとつのバージョンのテストが失敗すると、その特定のテストは失敗とマークされ、他のバージョンは合格とマークされます。同じコミットに対してテストを再試行し、3 つすべてのバージョンの Python のテストがパスした場合、以前失敗したバージョンのテストは合格と不安定の両方としてマークされ、他の 2 つのバージョンは合格のままで不安定が検出されません。

### テスト構成属性

Test Visibility でテストを実行する際、ライブラリはテスト実行環境に関する情報を検出し、それをテストタグとして報告します。例えば、`Windows` や `Linux` などの OS 名や、`arm64` や `x86_64` などのプラットフォームのアーキテクチャが、各テストのタグとして追加されます。これらの値は、特定の構成でテストが失敗または不安定であるが他の構成ではない場合、コミットやブランチの概要ページで表示されます。

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

## カスタム構成

環境変数やテスト実行時の引数など、開発者が使用するアプローチに依存する場合があるため、直接識別して自動的に報告することができない構成もあります。そのような場合は、Test Visibility が適切に識別できるように、ライブラリに構成の詳細を提供する必要があります。

これらのタグを `test.configuration` プレフィックスを使用して、`DD_TAGS` 環境変数の一部として定義します。

例えば、以下のテスト構成タグはディスクの応答時間が遅く、利用可能なメモリが少ないテスト構成を識別します。

{{< code-block lang="bash" >}}
DD_TAGS=test.configuration.disk:slow,test.configuration.memory:low
{{< /code-block >}}

自動的に収集されたタグに加えて、`test.configuration` というプレフィックスを持つすべてのタグが構成タグとして使用されます。

注: `test.configuration.cpu.memory` のようにネストされた `test.configuration` タグはサポートされていません。

これらの構成タグを使ってフィルターをかけるには、[これらのタグ用のファセットを作成する必要があります][2]。

## CI テストデータの使用

{{% ci-information-collected %}}

### ヘルプ

{{< whatsnext desc="Test Visibility との以下のインテグレーションについてご覧ください。" >}}
{{< nextlink href="/tests/developer_workflows/" >}}Datadog による開発者ワークフローの強化{{< /nextlink >}}
{{< nextlink href="/tests/code_coverage" >}}コードカバレッジ{{< /nextlink >}}
{{< nextlink href="/tests/browser_tests" >}}ブラウザ RUM で Cypress ブラウザテストをインスツルメンテーションする{{< /nextlink >}}
{{< nextlink href="/tests/swift_tests" >}}ブラウザ RUM で Swift テストをインスツルメンテーションする{{< /nextlink >}}
{{< /whatsnext >}}

[Intelligent Test Runner][12] が .NET、Java、JavaScript、Swift で有効になっている場合、各テストの対象となるファイル名と行番号を含むテストごとのコードカバレッジ情報がプロジェクトから収集されます。

[ダッシュボード][8]または[ノートブック][9]を作成する際、検索クエリでテスト実行データを使用すると、視覚化ウィジェットのオプションが更新されます。

## テストデータに対するアラート

[**Test Runs** ページ][10]で、失敗したテストや不安定なテスト、CI テストのパフォーマンスを評価する場合、**Create Monitor** をクリックして、[CI Test モニター][11]を作成します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/test-services
[2]: /ja/continuous_integration/explorer/facets/
[8]: https://app.datadoghq.com/dashboard/lists
[9]: https://app.datadoghq.com/notebook/list
[10]: https://app.datadoghq.com/ci/test-runs
[11]: /ja/monitors/types/ci/
[12]: /ja/tests/code_coverage/