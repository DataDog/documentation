---
aliases:
- /ja/continuous_integration/guides/code_coverage/
- /ja/continuous_integration/integrate_tests/code_coverage/
- /ja/continuous_integration/tests/code_coverage/
description: Datadog でコードカバレッジを報告し、使用する方法をご紹介します。
further_reading:
- link: /tests
  tag: ドキュメント
  text: Test Visibility について
- link: /monitors/types/ci
  tag: ドキュメント
  text: CI モニターについて
title: Datadog のコードカバレッジ
---

## 概要

コードカバレッジは、モジュールやセッションが実行するコードの総量のうちのパーセンテージを測定するものです。

[Test Visibility][1] がすでにお使いの言語に設定されていることを確認してください。

## コードカバレッジを報告する

{{< tabs >}}
{{% tab "JavaScript/TypeScript" %}}

### 互換性

* `dd-trace>=3.20.0`。
* `jest>=24.8.0`、`jest-circus` で実行した場合のみ。
* `mocha>=5.2.0`, only if `all` option in `nyc` is not explicitly set to `true`.
* `cucumber-js>=7.0.0`, only if `all` option in `nyc` is not explicitly set to `true`.
* Only [`Istanbul`][1] code coverage is supported.


When tests are instrumented with [Istanbul][1], the Datadog Tracer reports code coverage under the `test.code_coverage.lines_pct` tag for your test sessions automatically. To instrument tests with Istanbul, you can use [`nyc`][2].

To report total code coverage from your test sessions, follow these steps:

1. Install `nyc`:
```
npm install --save-dev nyc
```

2. Wrap your test command with `nyc`:
```json
{
  "scripts": {
    "test": "mocha",
    "coverage": "nyc npm run test"
  }
}
```

<div class="alert alert-danger">
  <strong>Note</strong>: Jest includes Istanbul by default, so you don't need to install <code>nyc</code>. Simply pass <code>--coverage</code>.
</div>

```json
{
  "scripts": {
    "coverage": "jest --coverage"
  }
}
```

3. 新しい `coverage` コマンドでテストを実行します。
```
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-service npm run coverage
```

### 既知の制限

If the `all` option is set to `true` when running `nyc` (see [nyc docs][3]), the total code coverage reported in the test session does not coincide with the value reported by `nyc`. This is because it does not include uncovered files (the ones that are not touched by your tests).

[1]: https://istanbul.js.org/
[2]: https://github.com/istanbuljs/nyc
[3]: https://github.com/istanbuljs/nyc?tab=readme-ov-file#common-configuration-options
{{% /tab %}}

{{% tab ".NET" %}}

### 互換性
* `dd-trace>=2.31.0`。

コードカバレッジが利用できる場合、Datadog トレーサー (v2.31.0 以降) は、テストセッションの `test.code_coverage.lines_pct` タグでそれを報告します。

If you are using [Coverlet][1] to compute your code coverage, indicate the path to the report file in the `DD_CIVISIBILITY_EXTERNAL_CODE_COVERAGE_PATH` environment variable when running `dd-trace`. The report file must be in the OpenCover or Cobertura formats. Alternatively, you can enable the Datadog Tracer's built-in code coverage calculation with the `DD_CIVISIBILITY_CODE_COVERAGE_ENABLED=true` environment variable.

### 高度なオプション

Datadog トレーサーのビルトインコードカバレッジは、`.runsettings` ファイルを通して `Coverlet` と `VS Code Coverage` オプションの両方をサポートしています。

#### ファイル構造
```xml
<?xml version="1.0" encoding="utf-8"?>
<RunSettings>
    <DataCollectionRunSettings>
        <DataCollectors>
            <DataCollector friendlyName="DatadogCoverage">
                <Configuration>
                    <!-- Datadog コードカバレッジの設定 -->
                    ...
                </Configuration>
            </DataCollector>
        </DataCollectors>
    </DataCollectionRunSettings>
</RunSettings>
```

#### Coverlet オプション

| オプション                   | サマリー                                                                                                                                                         |
|:-------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ExcludeByAttribute       | 属性で装飾されたメソッド、クラス、またはアセンブリをコードカバレッジから除外します。                                                                                                                |
| ExcludeByFile            | 特定のソースファイルをコードカバレッジから除外します。                                                                                                                |
| 除外する                  | フィルター式を使用してコードカバレッジ分析から除外します。                                                                                                  |

##### 属性

`System.Diagnostics.CodeAnalysis` ネームスペースにある `ExcludeFromCodeCoverage` 属性を作成して適用することで、メソッド、クラス全体、またはアセンブリをコードカバレッジから除外することができます。

`ExcludeByAttribute` プロパティと属性の短い名前 (ネームスペースを除いた型名) で追加の属性を除外します。

##### ソースファイル

`ExcludeByFile` プロパティで特定のソースファイルをコードカバレッジから除外します。

* カンマで区切って、単一または複数のパスを使用します。
* 例えば `dir1/*.cs` のように、ワイルドカード (`*`) を使用したファイルパスまたはディレクトリパスを使用します。

##### フィルター

フィルターでは、以下の構文の**フィルター式**を使って、除外するものを細かく制御することができます。

`[<ASSEMBLY_FILTER>]<TYPE_FILTER>`

**ワイルドカード**はサポートされています。

* `*` => 0 文字以上にマッチします
* `?` => プレフィックス文字はオプションです

**例**:

* `[*]*` => すべてのアセンブリのすべての型を除外します (インスツルメンテーションされるものはありません)
* `[coverlet.*]Coverlet.Core.Coverage` => `coverlet.*` にマッチするアセンブリ (例えば `coverlet.core`) に属する `Coverlet.Core` ネームスペース内の `Coverage` クラスを除外します
* `[*]Coverlet.Core.Instrumentation.*` => あらゆるアセンブリ内の `Coverlet.Core.Instrumentation` ネームスペースに属するすべての型を除外します
* `[coverlet.*.tests?]*` => `coverlet.` で始まり、`.test` または `.tests` で終わるアセンブリ内のすべての型を除外します (`?` により `s` はオプションになります)
* `[coverlet.*]*,[*]Coverlet.Core*\` => `coverlet.*` にマッチするアセンブリを除外し、あらゆるアセンブリ内の `Coverlet.Core` ネームスペースに属するすべての型を除外します

#### VS コードカバレッジオプション


See [Customize code coverage analysis][2] in the Microsoft documentation for additional information.

| オプション                   | サマリー                                                                                                                                                         |
|:-------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Attributes\Exclude       | 属性で装飾されたメソッド、クラス、またはアセンブリをコードカバレッジから除外します。                                                                                                                |
| Sources\Exclude          | 特定のソースファイルをコードカバレッジから除外します。                                                                                                                |

#### Runsettings の例
```xml
<?xml version="1.0" encoding="utf-8"?>
<RunSettings>
    <DataCollectionRunSettings>
        <DataCollectors>
            <DataCollector friendlyName="DatadogCoverage">
                <Configuration>
                    <!-- Coverlet 構成 -->
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

### 互換性
* `dd-trace-java >= 1.24.2`.

When code coverage is available, the Datadog Tracer reports it under the `test.code_coverage.lines_pct` tag for your test sessions.

[Jacoco][1] is supported as a code coverage library.

プロジェクトにすでに Jacoco が構成されている場合、Datadog トレーサーはそれをインスツルメントし、カバレッジデータを自動的に Datadog に報告します。

Otherwise, you can configure the tracer to add Jacoco to your test runs at runtime.
Use `DD_CIVISIBILITY_JACOCO_PLUGIN_VERSION` environment variable to specify which [version of Jacoco][2] you want to have injected (for example: `DD_CIVISIBILITY_JACOCO_PLUGIN_VERSION=0.8.11`).


[1]: https://www.eclemma.org/jacoco/
[2]: https://mvnrepository.com/artifact/org.jacoco/org.jacoco.agent
{{% /tab %}}
{{% tab "Python" %}}

### 互換性

* `dd-trace>=2.5.0`.
* `Python>=3.7`.
* `coverage>=4.4.2`.
* `pytest>=3.0.0`.
* `pytest-cov>=2.7.0`.
* `unittest>=3.8`.
* コードカバレッジは [`coverage.py`][1] と [`pytest-cov`][2] のみがサポートされています。


テストに [`coverage.py`][1] または [`pytest-cov`][2] がインスツルメンテーションされると、Datadog トレーサーはテストセッションの `test.code_coverage.lines_pct` タグでコードカバレッジを自動的に報告します。

[`coverage.py`][1] を使ってテストセッションから総コードカバレッジを報告するには、次の手順に従います。

1. `coverage` をインストールします。
```
python3 -m pip install coverage
```

2. 新しい `coverage` コマンドでテストを実行します。
```
DD_ENV=ci DD_SERVICE=my-python-service coverage run -m pytest
```

または、[`pytest-cov`][2] を使ってテストセッションから総コードカバレッジを報告するには、次の手順に従います。

1. `pytest` をインストールします。
```
python3 -m pip install pytest
```

2. `pytest-cov` をインストールします。
```
python3 -m pip install pytest-cov
```

3. `pytest` コマンドに `--cov` フラグを追加してテストを実行します。
```
DD_ENV=ci DD_SERVICE=my-python-service pytest --cov
```

[1]: https://github.com/nedbat/coveragepy
[2]: https://github.com/pytest-dev/pytest-cov
{{% /tab %}}
{{% tab "JUnit Report Uploads" %}}

### 互換性
* `datadog-ci>=2.17.2`。

JUnit レポートのアップロードでは、コードカバレッジパーセンテージの値をアップロードできます。

```shell
datadog-ci junit upload --service <service_name> --report-measures=test.code_coverage.lines_pct:85 <path>
```

この例では、`85` はテストがカバーする行の割合であり、別のツールで生成する必要があります。

コードカバレッジレポートは別のプロセスで生成する必要があります。そうしないと、JUnit レポートのアップロードでコードカバレッジレポートが生成されません。報告されるメトリクス名は `test.code_coverage.lines_pct` でなければなりません。

{{% /tab %}}
{{< /tabs >}}

## コードカバレッジをグラフ化する

Reported code coverage is reported as `@test.code_coverage.lines_pct`, which represents the total percentage in the facet, and can be plotted as any other measure facet in the CI Visibility Explorer.

{{< img src="/continuous_integration/graph_code_coverage.png" text="Graph code coverage" style="width:100%" >}}

## Test Session coverage tab

Reported code coverage also appears on the **Coverage** tab in a test session's details page:

{{< img src="/continuous_integration/code_coverage_tab.png" text="テストセッションコードカバレッジタブ" style="width:100%" >}}


## グラフのエクスポート

グラフを[ダッシュボード][2]や[ノートブック][3]にエクスポートし、**Export** ボタンをクリックすると、それに基づいて[モニター][4]を作成することができます。

{{< img src="/continuous_integration/code_coverage_export_to.png" text="コードカバレッジのエクスポート" style="width:60%" >}}


## モニターの追加

[CI テストモニター][5]を作成して、サービスのコードカバレッジが特定のしきい値を下回るとアラートを受けます。

{{< img src="/continuous_integration/code_coverage_monitor.png" text="Code coverage monitor" style="width:100%" >}}

## See your branch's code coverage evolution

You can also see the code coverage's evolution on the [Branch Overview page][6] and check whether it's improving or worsening:

{{< img src="/continuous_integration/code_coverage_branch_view.png" text="Branch view's code coverage" style="width:100%" >}}


## プルリクエストのコードカバレッジの変化を表示する

The pull request's [test summary comment][7] shows the code coverage change of a GitHub pull request compared to the default branch.

## Intelligent Test Runner and total code coverage

[Intelligent Test Runner][8] will **not** automatically provide total code coverage measurements, even though it requires _per test_ code coverage to function.

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/tests/
[2]: /ja/dashboards
[3]: /ja/notebooks
[4]: /ja/monitors
[5]: /ja/monitors/types/ci/#maintain-code-coverage-percentage
[6]: /ja/continuous_integration/tests/developer_workflows#branch-overview
[7]: /ja/tests/developer_workflows/#test-summaries-in-github-pull-requests
[8]: /ja/continuous_integration/intelligent_test_runner/