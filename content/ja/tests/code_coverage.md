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
kind: ドキュメント
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
* `mocha>=5.2.0`。
* `cucumber-js>=7.0.0`。
* [`Istanbul`][1] コードカバレッジのみがサポートされています。


テストが [Istanbul][1] でインスツルメントされた場合、Datadog トレーサーは `test.code_coverage.lines_pct` タグを通じてテストセッションのコードカバレッジを自動的に報告します。Istanbul でテストをインスツルメントするには、[`nyc`][2] を使用します。

テストセッションから総コードカバレッジを報告するには、次の手順に従います。

1. `nyc` をインストールします。
```
npm install --save-dev nyc
```

2. テストコマンドを `nyc` でラップします。
```json
{
  "scripts": {
    "test": "mocha",
    "coverage": "nyc npm run test"
  }
}
```

<div class="alert alert-warning">
  <strong>注</strong>: Jest にはデフォルトで Istanbul が含まれているので、<code>nyc</code> をインストールする必要はありません。単に <code>--coverage</code> を渡すだけです。
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


[1]: https://istanbul.js.org/
[2]: https://github.com/istanbuljs/nyc
{{% /tab %}}

{{% tab ".NET" %}}

### 互換性
* `dd-trace>=2.31.0`。

コードカバレッジが利用できる場合、Datadog トレーサー (v2.31.0 以降) は、テストセッションの `test.code_coverage.lines_pct` タグでそれを報告します。

コードカバレッジの計算に [Coverlet][101] を使用している場合、`dd-trace` を実行する際に `DD_CIVISIBILITY_EXTERNAL_CODE_COVERAGE_PATH` 環境変数にレポートファイルへのパスを指定します。レポートファイルは、OpenCover または Cobertura 形式である必要があります。または、`DD_CIVISIBILITY_CODE_COVERAGE_ENABLED=true` 環境変数で、Datadog トレーサーに内蔵されているコードカバレッジ計算を有効にできます。

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

| オプション                   | メトリクス                                                                                                                                                         |
|:-------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ExcludeByAttribute       | 属性で装飾されたメソッド、クラス、またはアセンブリをコードカバレッジから除外します。                                                                                                                |
| ExcludeByFile            | 特定のソースファイルをコードカバレッジから除外します。                                                                                                                |
| 除外する                  | フィルター式を使用してコードカバレッジ分析から除外します。                                                                                                  |

##### NodeJS

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


詳細については、Microsoft ドキュメントの[コードカバレッジ分析のカスタマイズ][102]を参照してください。

| オプション                   | メトリクス                                                                                                                                                         |
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

[101]: https://github.com/coverlet-coverage/coverlet
[102]: https://learn.microsoft.com/en-us/visualstudio/test/customizing-code-coverage-analysis?view=vs-2022
{{% /tab %}}
{{% tab "Java" %}}

### 互換性
* `dd-trace-java >= 1.24.2`

コードカバレッジが利用できる場合、Datadog トレーサーは、テストセッションの `test.code_coverage.lines_pct` タグでそれを報告します。

[Jacoco][101] はコードカバレッジライブラリとしてサポートされています。

プロジェクトにすでに Jacoco が構成されている場合、Datadog トレーサーはそれをインスツルメントし、カバレッジデータを自動的に Datadog に報告します。

そうでない場合、ランタイムでテスト実行に Jacoco を追加するようトレーサーを構成できます。
環境変数 `DD_CIVISIBILITY_JACOCO_PLUGIN_VERSION` を使用して、注入したい [Jacoco のバージョン][102]を指定します (例: `DD_CIVISIBILITY_JACOCO_PLUGIN_VERSION=0.8.11`)。

[101]: https://www.eclemma.org/jacoco/
[102]: https://mvnrepository.com/artifact/org.jacoco/org.jacoco.agent

{{% /tab %}}
{{% tab "JUnit レポートのアップロード" %}}

### 互換性
* `datadog-ci>=2.17.2`。

JUnit レポートのアップロードでは、コードカバレッジパーセンテージの値をアップロードできます。

```shell
datadog-ci junit upload --service <service_name> --report-metrics=test.code_coverage.lines_pct:85 <path>
```

この例では、`85` はテストがカバーする行の割合であり、別のツールで生成する必要があります。

コードカバレッジレポートは別のプロセスで生成する必要があります。そうしないと、JUnit レポートのアップロードでコードカバレッジレポートが生成されません。報告されるメトリクス名は `test.code_coverage.lines_pct` でなければなりません。

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

{{< /tabs >}}

## コードカバレッジをグラフ化する

報告されたコードカバレッジは `@test.code_coverage.lines_pct` として報告され、これはファセット内の合計パーセンテージを表し、CI Visibility Explorer で他のメジャーファセットと同様にプロットできます。

{{< img src="/continuous_integration/graph_code_coverage.png" text="コードカバレッジのグラフ化" style="width:100%" >}}

## テストセッションのカバレッジタブ

報告されたコードカバレッジは、テストセッションの詳細ページの **Coverage** タブにも表示されます。

{{< img src="/continuous_integration/code_coverage_tab.png" text="テストセッションコードカバレッジタブ" style="width:100%" >}}


## グラフのエクスポート

グラフを[ダッシュボード][2]や[ノートブック][3]にエクスポートし、**Export** ボタンをクリックすると、それに基づいて[モニター][4]を作成することができます。

{{< img src="/continuous_integration/code_coverage_export_to.png" text="コードカバレッジのエクスポート" style="width:60%" >}}


## モニターの追加

[CI テストモニター][5]を作成して、サービスのコードカバレッジが特定のしきい値を下回るとアラートを受けます。

{{< img src="/continuous_integration/code_coverage_monitor.png" text="コードカバレッジモニター" style="width:100%" >}}

## ブランチのコードカバレッジの推移を見る

また、[Branch Overview ページ][6]でコードカバレッジの推移を見ることができ、改善されているか悪化しているかを確認できます。

{{< img src="/continuous_integration/code_coverage_branch_view.png" text="ブランチビューのコードカバレッジ" style="width:100%" >}}


## プルリクエストのコードカバレッジの変化を表示する

プルリクエストの[テストサマリーコメント][8]には、GitHub プルリクエストのコードカバレッジの変化が、デフォルトブランチと比較する形で表示されます。

## Intelligent Test Runner と総コードカバレッジ

[Intelligent Test Runner][7] は、機能するために_テストごと_のコードカバレッジが必要であるにもかかわらず、自動的に総コードカバレッジの測定を**行いません**。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/tests/
[2]: /ja/dashboards
[3]: /ja/notebooks
[4]: /ja/monitors
[5]: /ja/monitors/types/ci/#maintain-code-coverage-percentage
[6]: /ja/continuous_integration/tests/developer_workflows#branch-overview
[7]: /ja/continuous_integration/intelligent_test_runner/
[8]: /ja/tests/developer_workflows/#test-summaries-in-github-pull-requests