---
aliases:
- /ja/continuous_integration/guides/code_coverage/
- /ja/continuous_integration/integrate_tests/code_coverage/
- /ja/continuous_integration/tests/code_coverage/
description: Datadog でコードカバレッジをレポートする方法および使用方法について説明します。
further_reading:
- link: https://www.datadoghq.com/blog/gitlab-source-code-integration
  tag: ブログ
  text: Datadog で GitLab ソースコードインテグレーションを使用して迅速にトラブルシューティングを実行する
- link: /tests
  tag: ドキュメント
  text: Test Optimization について
- link: /monitors/types/ci
  tag: ドキュメント
  text: CI モニターについて
title: Datadog における Code Coverage
---
<div class="alert alert-warning">
この Test Optimization 機能はレガシーです。代わりに、専用の新しい <a href="https://docs.datadoghq.com/code_coverage/">Code Coverage</a> 製品を使用してください。
</div>

## 概要 {#overview}

コードカバレッジとは、モジュールまたはセッションによって実行されたコードカバレッジの割合の合計を示す指標です。

お使いの言語で [Test Optimization][1] がすでに設定されていることを確認してください。

## コードカバレッジのレポート {#report-code-coverage}

{{< tabs >}}
{{% tab "JavaScript/TypeScript" %}}

### 互換性 {#compatibility}

* `dd-trace>=4.45.0` と `dd-trace>=5.21.0`。
* `jest>=24.8.0`、`jest-circus` で実行した場合のみ。
* `mocha>=5.2.0`。
* `cucumber-js>=7.0.0`。
* `vitest>=2.0.0`。

<div class="alert alert-danger">
  <strong>注</strong>: Datadog トレーサーはコードカバレッジを生成しません。コードカバレッジを有効にしてテストを実行すると、<code>dd-trace</code> その結果が <code>test.code_coverage.lines_pct</code> テストセッションのタグで自動的にレポートされます。
</div>

#### Mocha/Cucumber-js {#mochacucumber-js}

[`Istanbul`][1] のコードカバレッジは、`mocha` と `cucumber-js` でのみサポートされています。

`mocha` と `cucumber-js` のテストセッションからコードカバレッジの合計をレポートするには、[`nyc`][2] をインストールし、テストコマンドをラップします。

1. `nyc` をインストールします。

```
npm install --save-dev nyc
```

2. テストコマンドを `nyc` を使用してラップします。

```json
{
  "scripts": {
    "test": "mocha",
    "coverage": "nyc npm run test"
  }
}
```

#### Jest {#jest}
Jest にはデフォルトで Istanbul が含まれているため、`nyc` をインストールする必要はありません。`--coverage` を渡すだけです。

```json
{
  "scripts": {
    "coverage": "jest --coverage"
  }
}
```

サポートされている [`coverageProvider`][3] は `babel` のみであり、これがデフォルトです。

#### Vitest {#vitest}
コードカバレッジを有効にして Vitest を実行するには、追加の依存関係が必要です。詳細については、[Vitest のドキュメント][4] を参照してください。依存関係をインストール後、テストコマンドに `--coverage` を渡します。

```json
{
  "scripts": {
    "coverage": "vitest run --coverage"
  }
}
```

テストコマンドを変更後、新しい `coverage` コマンドでテストを実行します。

```
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-service npm run coverage
```


[1]: https://istanbul.js.org/
[2]: https://github.com/istanbuljs/nyc
[3]: https://jestjs.io/docs/configuration#coverageprovider-string
[4]: https://vitest.dev/guide/coverage.html
{{% /tab %}}

{{% tab ".NET" %}}

### 互換性{#compatibility-1}
* `dd-trace>=2.31.0`。

コードカバレッジが利用できる場合、Datadog トレーサー (v2.31.0 以降) は、テストセッションの `test.code_coverage.lines_pct` タグでそれを報告します。

[Coverlet][1] を使用してコードカバレッジを計算している場合は、`DD_CIVISIBILITY_EXTERNAL_CODE_COVERAGE_PATH` 環境変数でレポートファイルへのパスを指定して `dd-trace` を実行します。レポートファイルは、OpenCover 形式または Cobertura 形式であることが必要です。あるいは、`DD_CIVISIBILITY_CODE_COVERAGE_ENABLED=true` 環境変数を使用して、Datadog トレーサーの組み込みコードカバレッジ計算を有効にすることもできます。

**注**: `DD_CIVISIBILITY_EXTERNAL_CODE_COVERAGE_PATH` は、`dd-trace ci run` によってインスツルメントされたコマンドが `dotnet test`、`dotnet vstest`、または `vstest.console` である場合にのみ使用されます。たとえば、`dd-trace ci run -- coverlet TestAssembly.dll --target dotnet --targetargs "test TestAssembly.dll"` を実行する場合、変数内の結果は無視されます。

### 高度なオプション {#advanced-options}

Datadog トレーサーの組み込みコードカバレッジは、`Coverlet` オプションと `VS Code Coverage` オプションの両方を `.runsettings` ファイルを通じてサポートしています。

#### ファイル構造 {#file-structure}

```xml
<?xml version="1.0" encoding="utf-8"?>
<RunSettings>
    <DataCollectionRunSettings>
        <DataCollectors>
            <DataCollector friendlyName="DatadogCoverage">
                <Configuration>
                    <!-- Datadog Code Coverage settings -->
                    ...
                </Configuration>
            </DataCollector>
        </DataCollectors>
    </DataCollectionRunSettings>
</RunSettings>
```

#### Coverlet オプション {#coverlet-options}

| オプション                   | 概要                                                                                                                                                         |
|:-------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ExcludeByAttribute       | 属性が付与されたメソッド、クラス、またはアセンブリをコードカバレッジから除外します。                                                                                                               |
| ExcludeByFile            | 特定のソースファイルをコードカバレッジから除外します。                                                                                                               |
| Exclude                  | フィルター式を使用してコードカバレッジ分析から除外します。                                                                                                 |

##### 属性 {#attributes}

`System.Diagnostics.CodeAnalysis` 名前空間に存在する `ExcludeFromCodeCoverage` 属性を作成して適用することで、メソッド、クラス全体、またはアセンブリをコードカバレッジから除外できます。

`ExcludeByAttribute` プロパティと属性の短い名前 (名前空間を含まないタイプ名) を使用して、追加の属性を除外します。

##### ソースファイル {#source-files}

`ExcludeByFile` プロパティを使用して、特定のソースファイルをコードカバレッジから除外します。

* パスは 1 つ指定することも、複数のパスをカンマで区切って指定することもできます。
* ファイルパスまたはディレクトリパスにワイルドカード (`*`) を使用します。例: `dir1/*.cs`。

##### フィルター {#filters}

フィルターを使用すると、次の構文の**フィルター式**を使用して、除外対象を細かく制御できます。

`[<ASSEMBLY_FILTER>]<TYPE_FILTER>`

**ワイルドカード**がサポートされています。

* `*` => 0 文字以上の文字列に一致します
* `?` => 直前の文字が省略可能であることを示します

**例**:

* `[*]*` => すべてのアセンブリ内のすべてのタイプを除外します (何もインスツルメントされません)
* `[coverlet.*]Coverlet.Core.Coverage` => `coverlet.*` に一致する任意のアセンブリに属する `Coverlet.Core` 名前空間の `Coverage` クラスを除外します (例: `coverlet.core`)
* `[*]Coverlet.Core.Instrumentation.*` => 任意のアセンブリ内の `Coverlet.Core.Instrumentation` 名前空間に属するすべてのタイプを除外します
* `[coverlet.*.tests?]*` => `coverlet.` で始まり `.test` または`.tests` で終わる任意のアセンブリ内のすべてのタイプを除外します (`?` を使用すると `s` が付いているかどうかが任意になります)
* `[coverlet.*]*,[*]Coverlet.Core*\` => `coverlet.*` に一致するアセンブリを除外します。また、任意のアセンブリ内の `Coverlet.Core` 名前空間に属するすべてのタイプを除外します

#### VS コードカバレッジのオプション {#vs-code-coverage-options}


詳細については、Microsoft ドキュメントの [コードカバレッジ分析をカスタマイズする][2] を参照してください。

| オプション                   | 概要                                                                                                                                                         |
|:-------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Attributes\Exclude       | 属性が付与されたメソッド、クラス、またはアセンブリをコードカバレッジから除外します。                                                                                                               |
| Sources\Exclude          | 特定のソースファイルをコードカバレッジから除外します。                                                                                                               |

#### Runsettings の例 {#runsettings-example}

```xml
<?xml version="1.0" encoding="utf-8"?>
<RunSettings>
    <DataCollectionRunSettings>
        <DataCollectors>
            <DataCollector friendlyName="DatadogCoverage">
                <Configuration>
                    <!-- Coverlet configuration -->
                    <ExcludeByAttribute>CompilerGeneratedAttribute</ExcludeByAttribute>
                    <ExcludeByFile>**/Fibonorial.cs</ExcludeByFile>
                    <Exclude>[myproject.*.tests?]*</Exclude>

                    <!-- VS Code Coverage configuration -->
                    <CodeCoverage>
                        <Attributes>
                            <Exclude>
                                <Attribute>^System\.ObsoleteAttribute$</Attribute>
                            </Exclude>
                        </Attributes>
                        <Sources>
                            <Exclude>
                                <Source>^MyFile\.cs$</Source>
                            </Exclude>
                        </Sources>
                    </CodeCoverage>
                </Configuration>
            </DataCollector>
        </DataCollectors>
    </DataCollectionRunSettings>
</RunSettings>
```

[1]: https://github.com/coverlet-coverage/coverlet
[2]: https://learn.microsoft.com/en-us/visualstudio/test/customizing-code-coverage-analysis?view=vs-2022
{{% /tab %}}
{{% tab "Java" %}}

### 互換性 {#compatibility-2}
* `dd-trace-java >= 1.24.2`。

コードカバレッジが利用できる場合、Datadog トレーサーはテストセッションの `test.code_coverage.lines_pct` タグでそれを報告します。

[Jacoco][1] がコードカバレッジライブラリとしてサポートされています。

プロジェクトですでに Jacoco が構成されている場合、Datadog トレーサーはそれをインスツルメントし、カバレッジデータを Datadog に自動的に報告します。

Jacoco が構成されていない場合は、実行時にテスト実行へ Jacoco を追加するように SDK を構成できます。
`DD_CIVISIBILITY_JACOCO_PLUGIN_VERSION` 環境変数を使用して、挿入する [Jacoco のバージョン][2] を指定します (例: `DD_CIVISIBILITY_JACOCO_PLUGIN_VERSION=0.8.11`)。


[1]: https://www.eclemma.org/jacoco/
[2]: https://mvnrepository.com/artifact/org.jacoco/org.jacoco.agent
{{% /tab %}}
{{% tab "Python" %}}

### 互換性 {#compatibility-3}

* `dd-trace>=2.5.0`。
* `Python>=3.7`。
* `coverage>=4.4.2`。
* `pytest>=3.0.0`。
* `pytest-cov>=2.7.0`。
* `unittest>=3.8`。
* [`coverage.py`][1] と [`pytest-cov`][2] のコードカバレッジのみがサポートされています。


テストに [`coverage.py`][1] または [`pytest-cov`][2] がインスツルメントされると、Datadog トレーサーはテストセッションの `test.code_coverage.lines_pct` タグで自動的にコードカバレッジを報告します。

[`coverage.py`][1] を使用してテストセッションからコードカバレッジの合計を報告するには、次の手順に従います。

1. `coverage` をインストールします。

```
python3 -m pip install coverage
```

2. 新しい `coverage` コマンドを使用してテストを実行します。

```
DD_ENV=ci DD_SERVICE=my-python-service coverage run -m pytest
```

あるいは、[`pytest-cov`][2] を使用してテストセッションからコードカバレッジの合計を報告するには、次の手順に従います。

1. `pytest` をインストールします。

```
python3 -m pip install pytest
```

2. `pytest-cov` をインストールします。

```
python3 -m pip install pytest-cov
```

3. `pytest` コマンドに `--cov` フラグを追加して、テストを実行します。

```
DD_ENV=ci DD_SERVICE=my-python-service pytest --cov
```

[1]: https://github.com/nedbat/coveragepy
[2]: https://github.com/pytest-dev/pytest-cov
{{% /tab %}}
{{% tab "Ruby" %}}

### 互換性 {#compatibility-4}

* `datadog-ci-rb>=1.7.0`
* `simplecov>=0.18.0`。

<div class="alert alert-danger">
  <strong>注</strong>: Datadog ライブラリは、コードカバレッジの合計を生成しません。コードカバレッジを有効にしてテストを実行すると、<code>datadog-ci-rb</code> その結果が <code>test.code_coverage.lines_pct</code> テストセッションのタグで自動的にレポートされます。
</div>

プロジェクトで [simplecov][1] が構成されている場合、datadog-ci-rb ライブラリがそれをインスツルメントし、テストセッションの `test.code_coverage.lines_pct` タグで自動的にカバレッジデータを Datadog に報告します。

この機能はデフォルトで有効です。この機能を無効にするには、`DD_CIVISIBILITY_SIMPLECOV_INSTRUMENTATION_ENABLED` 環境変数を使用します (例: `DD_CIVISIBILITY_SIMPLECOV_INSTRUMENTATION_ENABLED=0`)。

[1]: https://github.com/simplecov-ruby/simplecov
{{% /tab %}}

{{% tab "Go" %}}

### 互換性 {#compatibility-5}

* `go test -cover`

<div class="alert alert-danger">
  <strong>注</strong>: Datadog ライブラリは、コードカバレッジの合計を生成しません。コードカバレッジを有効にしてテストを実行すると、<code>ddtest instrument</code> その結果が <code>test.code_coverage.lines_pct</code> テストセッションのタグで自動的にレポートされます。
</div>

`-cover` フラグを使用してテストを実行すると、`ddtest instrument` がテストセッションの `test.code_coverage.lines_pct` タグで自動的にカバレッジデータを Datadog に報告します。`go test` が複数のパッケージを実行する場合は、セッションの合計がそのプロファイルから取得されるため、`-coverprofile` も設定します。

{{% /tab %}}

{{% tab "Swift" %}}

### 互換性 {#compatibility-6}
* `dd-sdk-swift-testing>=2.5.3`。
* `Xcode>=14.3`。

コードカバレッジが有効な場合、Datadog トレーサーはテストセッションの `test.code_coverage.lines_pct` タグでコードカバレッジを報告します。

Xcode プロジェクトでコードカバレッジを有効にするには、Apple のこちらのガイドに従います。[テストプランでコードカバレッジを有効にする][1]。

SPM テストの場合は、`swift test` の呼び出しに `--enable-code-coverage` パラメーターを追加します。

[1]: https://developer.apple.com/documentation/xcode/determining-how-much-code-your-tests-cover#Enable-code-coverage-in-your-test-plan
{{% /tab %}}

{{% tab "JUnit レポートのアップロード" %}}

### 互換性 {#compatibility-7}
* `datadog-ci>=2.17.2`。

JUnit レポートのアップロードを使用する場合、コードカバレッジのパーセンテージ値をアップロードできます。

```shell
datadog-ci junit upload --service <service_name> --report-measures=test.code_coverage.lines_pct:85 <path>
```

この例では、`85` はテストによってカバーされた行の割合であり、別のツールで生成する必要があります。

コードカバレッジレポートは別のプロセスで生成する必要があります。そうしないと、JUnit レポートのアップロードでコードカバレッジレポートが生成されません。報告されるメトリクス名は `test.code_coverage.lines_pct` である必要があります。

{{% /tab %}}
{{< /tabs >}}

## コードカバレッジをグラフ化する {#graph-code-coverage}

報告されたコードカバレッジは `@test.code_coverage.lines_pct` として報告されます。これはファセットの合計の割合を表しており、CI Visibility Explorer の他のメジャーファセットと同様にプロットできます。

{{< img src="/continuous_integration/graph_code_coverage.png" text="Graph code coverage" style="width:100%" >}}

## テストセッションのカバレッジタブ {#test-session-coverage-tab}

報告されたコードカバレッジは、テストセッションの詳細ページの {{< ui >}}Coverage{{< /ui >}} タブにも表示されます。

{{< img src="/continuous_integration/code_coverage_tab.png" text="Test sessions code coverage tab" style="width:100%" >}}


## グラフをエクスポートする {#export-your-graph}

グラフを [ダッシュボード][2] や [ノートブック][3] にエクスポートできます。また、{{< ui >}}Export{{< /ui >}} ボタンをクリックすると、グラフに基づいて [モニター][4] を作成できます。

{{< img src="/continuous_integration/code_coverage_export_to.png" text="Export code coverage" style="width:60%" >}}


## モニターを追加する {#add-a-monitor}

[CI Test Monitor][5] を作成すると、サービスのコードカバレッジが特定のしきい値を下回ったときにアラートを受け取ることができます。

{{< img src="/continuous_integration/code_coverage_monitor.png" text="Code coverage monitor" style="width:100%" >}}

## ブランチのコードカバレッジの推移を確認する {#see-your-branchs-code-coverage-evolution}

また、[ブランチ概要ページ][6] でコードカバレッジの推移を確認し、改善しているか悪化しているかをチェックできます。

{{< img src="/continuous_integration/code_coverage_branch_view.png" text="Branch view's code coverage" style="width:100%" >}}


## プルリクエストのコードカバレッジの変化を表示する {#show-code-coverage-change-of-a-pull-request}

プルリクエストの [テスト概要コメント][7] には、デフォルトのブランチと比較した GitHub のプルリクエストのコードカバレッジの変化が表示されます。

## Test Impact Analysis と合計コードカバレッジ {#test-impact-analysis-and-total-code-coverage}

[Test Impact Analysis][8] は、機能するために_テストごとの_コードカバレッジを必要としますが、合計コードカバレッジの測定値を自動的に提供するわけでは**ありません**。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/tests/
[2]: /ja/dashboards
[3]: /ja/notebooks
[4]: /ja/monitors
[5]: /ja/monitors/types/ci/#maintain-code-coverage-percentage
[6]: /ja/continuous_integration/tests/developer_workflows#branch-overview
[7]: /ja/tests/developer_workflows/#test-summaries-in-github-pull-requests
[8]: /ja/tests/test_impact_analysis