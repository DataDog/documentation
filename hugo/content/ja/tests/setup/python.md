---
aliases:
- /ja/continuous_integration/setup_tests/python
- /ja/continuous_integration/tests/python
- /ja/continuous_integration/tests/setup/python
code_lang: python
code_lang_weight: 30
further_reading:
- link: /continuous_integration/tests/containers/
  tag: ドキュメント
  text: Containers 内でテスト用に環境変数を転送する
- link: /continuous_integration/tests
  tag: ドキュメント
  text: テスト結果とパフォーマンスを調べる
- link: /tests/troubleshooting/
  tag: ドキュメント
  text: Test Optimization のトラブルシューティング
title: Python テスト
type: multi-code-lang
---
## 互換性{#compatibility}

サポート対象言語:

| 言語 | バージョン |
|---|---|
| Python 2 | >= 2.7 |
| Python 3 | >= 3.6 |

サポート対象テストフレームワーク:

| テストフレームワーク | バージョン |
|---|---|
| `pytest` | >= 3.0.0 |
| `pytest-benchmark` | >= 3.1.0 |
| `unittest` | >= 3.7 |

<div class="alert alert-info">Bazel を使用して Python テストを実行する場合は、Datadog の <a href="/tests/setup/bazel/python/">Python テスト用 Bazel ルール</a>を使用します。</div>

## 報告方法の構成 {#configuring-reporting-method}

Datadog にテスト結果を報告するには、Datadog Python ライブラリを構成する必要があります。

{{< tabs >}}
{{% tab "自動インスツルメンテーションサポートがある CI プロバイダー" %}}
{{% ci-autoinstrumentation %}}
{{% /tab %}}

{{% tab "その他のクラウドの CI プロバイダー" %}}
{{% ci-agentless %}}
{{% /tab %}}

{{% tab "オンプレミスの CI プロバイダー" %}}
{{% ci-agent %}}
{{% /tab %}}
{{< /tabs >}}

## Python トレーサーのインストール {#installing-the-python-tracer}

次のコマンドを実行して、Python トレーサーをインストールします。

{{< code-block lang="shell" >}}
pip install -U ddtrace
{{< /code-block >}}

詳細については、[Python トレーサーのインストールドキュメント][1]を参照してください。

## テストのインスツルメンテーション{#instrumenting-your-tests}

{{< tabs >}}
{{% tab "pytest" %}}

`pytest` テストのインスツルメンテーションを有効にするには、`pytest` の実行時に `--ddtrace` オプションを追加します。

{{< code-block lang="shell" >}}
pytest --ddtrace
{{< /code-block >}}

もし、残りの APM インテグレーションも有効にして flamegraph でより多くの情報を取得したい場合は、`--ddtrace-patch-all` オプションを追加します。

{{< code-block lang="shell" >}}
pytest --ddtrace --ddtrace-patch-all
{{< /code-block >}}

追加の構成については、[構成設定][3]を参照してください。

### テストにカスタムタグを追加する {#adding-custom-tags-to-tests}

テストにカスタムタグを追加するには、テストの引数として `ddspan` を宣言します。

```python
from ddtrace import tracer

# Declare `ddspan` as argument to your test
def test_simple_case(ddspan):
    # Set your tags
    ddspan.set_tag("test_owner", "my_team")
    # test continues normally
    # ...
```

これらのタグに対してフィルターや `group by` フィールドを作成するには、まずファセットを作成する必要があります。タグの追加について詳しくは、Python カスタムインスツルメンテーションのドキュメントの[タグの追加][1]セクションを参照してください。

### テストへのカスタム測定値の追加 {#adding-custom-measures-to-tests}

タグと同様に、テストにカスタム測定値を追加するには、現在アクティブなスパンを使用します。

```python
from ddtrace import tracer

# Declare `ddspan` as an argument to your test
def test_simple_case(ddspan):
    # Set your tags
    ddspan.set_tag("memory_allocations", 16)
    # test continues normally
    # ...
```
カスタム測定値の詳細については、[カスタム測定値の追加ガイド][2]を参照してください。

[1]: /ja/tracing/trace_collection/custom_instrumentation/python?tab=locally#adding-tags
[2]: /ja/tests/guides/add_custom_measures/?tab=python
[3]: #configuration-settings
{{% /tab %}}

{{% tab "pytest-benchmark" %}}

`pytest-benchmark`でベンチマークテストをインスツルメンテーションするには、`pytest`の実行時に`--ddtrace`オプションを指定してベンチマークテストを実行します。Datadog は `pytest-benchmark` からメトリクスを自動的に検出します。

```python
def square_value(value):
    return value * value


def test_square_value(benchmark):
    result = benchmark(square_value, 5)
    assert result == 25
```

追加の構成については、[構成設定][1]を参照してください。

[1]: #configuration-settings
{{% /tab %}}

{{% tab "unittest" %}}

`unittest` テストのインスツルメンテーションを有効にするには、`unittest` コマンドの先頭に `ddtrace-run` を追加してテストを実行します。

{{< code-block lang="shell" >}}
ddtrace-run python -m unittest
{{< /code-block >}}

`unittest` インスツルメンテーションを手動で有効にする場合は、`patch()` を使用してインテグレーションを有効にします。

{{< code-block lang="python" >}}
from ddtrace import patch
import unittest
patch(unittest=True)

class MyTest(unittest.TestCase):
def test_will_pass(self):
assert True
{{< /code-block >}}

追加の構成については、[構成設定][1]を参照してください。

[1]: #configuration-settings
{{% /tab %}}

{{% tab "手動インスツルメンテーション (ベータ版)" %}}

### 手動テスト API {#manual-testing-api}

<div class="alert alert-warning">Test Optimization 手動テスト API は<strong>ベータ版</strong>であり、変更される可能性があります。</div>

バージョン `2.13.0` 以降、[Datadog Python SDK][1] は、必要に応じて Test Optimization の結果を送信するための Test Optimization API (`ddtrace.ext.test_visibility`) を提供しています。

#### API の実行 {#api-execution}

この API はクラスを使用して、Test Optimization イベントを送信するための名前空間付きメソッドを提供します。

テスト実行には 2 つのフェーズがあります。
- 検出: 期待される項目を API に通知します
- 実行: 結果を送信します (開始および終了の呼び出しを使用)

検出フェーズと実行フェーズが分かれているため、テストランナープロセスがテストを収集してからテストが開始されるまでの間にギャップを設けることができます。

API ユーザーは、API の状態ストレージ内で Test Optimization 項目の参照として使用される一貫した識別子 (後述) を提供する必要があります。

##### 有効化 `test_visibility` {#enable-test-visibility}

Test Optimization API を使用する前に、`ddtrace.ext.test_visibility.api.enable_test_visibility()` 関数を呼び出す必要があります。

データの適切なフラッシュを確実に行うため、プロセス終了前に `ddtrace.ext.test_visibility.api.disable_test_visibility()` 関数を呼び出してください。

#### ドメインモデル{#domain-model}

この API は、テストセッション、テストモジュール、テストスイート、テストの 4 つの概念に基づいています。

モジュール、スイート、およびテストは Python Test Optimization API 内で階層を形成しており、項目識別子の親子関係によって表されます。

##### テストセッション{#test-session}

テストセッションはプロジェクトのテスト実行を表し、通常はテストコマンドの実行に対応します。Test Optimization プログラムの実行において、検出、開始、終了できるセッションは 1 つだけです。

`ddtrace.ext.test_visibility.api.TestSession.discover()` を呼び出してセッションを検出し、テストコマンド、指定されたフレームワーク名、およびバージョンを渡します。

`ddtrace.ext.test_visibility.api.TestSession.start()` を呼び出してセッションを開始します。

テストが完了したら、`ddtrace.ext.test_visibility.api.TestSession.finish()` を呼び出してください。


##### テストモジュール{#test-module}

テストモジュールは、プロジェクトのテスト実行におけるより小さな作業単位 (ディレクトリなど) を表します。

モジュール名をパラメーターとして指定して `ddtrace.ext.test_visibility.api.TestModuleId()` を呼び出し、`TestModuleId` を作成します。

`TestModuleId` オブジェクトを引数として渡して `ddtrace.ext.test_visibility.api.TestModule.discover()` を呼び出し、モジュールを検出します。

`TestModuleId` オブジェクトを引数として渡して `ddtrace.ext.test_visibility.api.TestModule.start()` を呼び出し、モジュールを開始します。

モジュール内のすべての子項目が完了したら、`TestModuleId` オブジェクトを引数として渡して `ddtrace.ext.test_visibility.api.TestModule.finish()` を呼び出してください。


##### テストスイート{#test-suite}

テストスイートは、プロジェクトのモジュール内のテストのサブセット (例: `.py` ファイル) を表します。

親モジュールの `TestModuleId` とスイート名を引数として指定して `ddtrace.ext.test_visibility.api.TestSuiteId()` を呼び出し、`TestSuiteId` を作成します。

`TestSuiteId` オブジェクトを引数として渡して `ddtrace.ext.test_visibility.api.TestSuite.discover()` を呼び出し、スイートを検出します。

`TestSuiteId` オブジェクトを引数として渡して `ddtrace.ext.test_visibility.api.TestSuite.start()` を呼び出し、スイートを開始します。

スイート内のすべての子項目が完了したら、`TestSuiteId` オブジェクトを引数として渡して `ddtrace.ext.test_visibility.api.TestSuite.finish()` を呼び出してください。

##### テスト{#test}

テストは、テストスイートの一部として実行される単一のテストケースを表します。

親スイートの `TestSuiteId` とテスト名を引数として指定して `ddtrace.ext.test_visibility.api.TestId()` を呼び出し、`TestId` を作成します。`TestId()` メソッドは、オプションの `parameters` 引数として JSON 解析可能な文字列を受け取ります。`parameters` 引数は、名前は同じでもパラメーター値が異なるパラメーター化されたテストを区別するために使用できます。

`TestId` オブジェクトを引数として渡して `ddtrace.ext.test_visibility.api.Test.discover()` を呼び出し、テストを検出します。`Test.discover()` クラスメソッドは、オプションの `resource` パラメーターとして文字列を受け取ります。このパラメーターのデフォルト値は `TestId` の `name` です。

`TestId` オブジェクトを引数として渡して `ddtrace.ext.test_visibility.api.Test.start()` を呼び出し、テストを開始します。

`TestId` オブジェクトを引数として渡して `ddtrace.ext.test_visibility.api.Test.mark_pass()` を呼び出し、テストが正常に完了したことをマークします。
`TestId` オブジェクトを引数として渡して `ddtrace.ext.test_visibility.api.Test.mark_fail()` を呼び出し、テストが失敗したことをマークします。`mark_fail()` は、オプションの `TestExcInfo` オブジェクトを `exc_info` パラメーターとして受け取ります。
`ddtrace.ext.test_visibility.api.Test.mark_skip()` を呼び出し、`TestId` オブジェクトを引数として渡すことで、テストがスキップされたことをマークします。`mark_skip()` は、オプションの文字列を `skip_reason` パラメーターとして受け取ります。

###### 例外情報{#exception-information}

`ddtrace.ext.test_visibility.api.Test.mark_fail()`クラスメソッドは、テストの失敗中に発生した例外に関する情報を保持します。

`ddtrace.ext.test_visibility.api.TestExcInfo()`メソッドは、3 つの位置パラメーターを受け取ります。
- `exc_type`: 発生した例外の型
- `exc_value`: 例外の`BaseException`オブジェクト
- `exc_traceback`: 例外の`Traceback`オブジェクト

###### コードオーナー情報{#codeowner-information}

`ddtrace.ext.test_visibility.api.Test.discover()`クラスメソッドは、オプションのリスト (文字列のリスト) を`codeowners`パラメーターとして受け取ります。

###### テストソースファイル情報{#test-source-file-information}

`ddtrace.ext.test_visibility.api.Test.discover()`クラスメソッドは、オプションの`TestSourceFileInfo`オブジェクトを`source_file_info`パラメーターとして受け取ります。`TestSourceFileInfo`オブジェクトは、特定のテストのパス、およびオプションで開始行と終了行を表します。

`ddtrace.ext.test_visibility.api.TestSourceFileInfo()`メソッドは、3 つの位置パラメーターを受け取ります。
- `path`: `pathlib.Path`オブジェクト (`Test Optimization` API によってリポジトリルートからの相対パスに変換されます)
- `start_line`: ファイル内のテストの開始行を表すオプションの整数
- `end_line`: ファイル内のテストの終了行を表すオプションの整数

###### テスト検出後のパラメーター設定{#setting-parameters-after-test-discovery}

`ddtrace.ext.test_visibility.api.Test.set_parameters()`クラスメソッドは、`TestId`オブジェクトを引数として、JSON 解析可能な文字列を受け取り、テストの`parameters`を設定します。

**注:** これはテストに関連付けられたパラメーターを上書きしますが、`TestId` オブジェクトの `parameters` フィールドは変更しません。

テストが検出された後にパラメーターを設定するには、`parameters` フィールドが設定されていない場合でも `TestId` オブジェクトが一意である必要があります。

#### コード例{#code-example}

```python
from ddtrace.ext.test_visibility import api
import pathlib
import sys

if __name__ == "__main__":
    # Enable the Test Optimization service
    api.enable_test_visibility()

    # Discover items
    api.TestSession.discover("manual_test_api_example", "my_manual_framework", "1.0.0")
    test_module_1_id = api.TestModuleId("module_1")
    api.TestModule.discover(test_module_1_id)

    test_suite_1_id = api.TestSuiteId(test_module_1_id, "suite_1")
    api.TestSuite.discover(test_suite_1_id)

    test_1_id = api.TestId(test_suite_1_id, "test_1")
    api.Test.discover(test_1_id)

    # A parameterized test with codeowners and a source file
    test_2_codeowners = ["team_1", "team_2"]
    test_2_source_info = api.TestSourceFileInfo(pathlib.Path("/path/to_my/tests.py"), 16, 35)

    parametrized_test_2_a_id = api.TestId(
        test_suite_1_id,
        "test_2",
        parameters='{"parameter_1": "value_is_a"}'
    )
    api.Test.discover(
        parametrized_test_2_a_id,
        codeowners=test_2_codeowners,
        source_file_info=test_2_source_info,
        resource="overriden resource name A",
    )

    parametrized_test_2_b_id = api.TestId(
        test_suite_1_id,
        "test_2",
        parameters='{"parameter_1": "value_is_b"}'
    )
    api.Test.discover(
      parametrized_test_2_b_id,
      codeowners=test_2_codeowners,
      source_file_info=test_2_source_info,
      resource="overriden resource name B"
    )

    test_3_id = api.TestId(test_suite_1_id, "test_3")
    api.Test.discover(test_3_id)

    test_4_id = api.TestId(test_suite_1_id, "test_4")
    api.Test.discover(test_4_id)


    # Start and execute items
    api.TestSession.start()

    api.TestModule.start(test_module_1_id)
    api.TestSuite.start(test_suite_1_id)

    # test_1 passes successfully
    api.Test.start(test_1_id)
    api.Test.mark_pass(test_1_id)

    # test_2's first parametrized test succeeds, but the second fails without attaching exception info
    api.Test.start(parametrized_test_2_a_id)
    api.Test.mark_pass(parametrized_test_2_a_id)

    api.Test.start(parametrized_test_2_b_id)
    api.Test.mark_fail(parametrized_test_2_b_id)

    # test_3 is skipped
    api.Test.start(test_3_id)
    api.Test.mark_skip(test_3_id, skip_reason="example skipped test")

    # test_4 fails, and attaches exception info
    api.Test.start(test_4_id)
    try:
      raise(ValueError("this test failed"))
    except:
      api.Test.mark_fail(test_4_id, exc_info=api.TestExcInfo(*sys.exc_info()))

    # Finish suites and modules
    api.TestSuite.finish(test_suite_1_id)
    api.TestModule.finish(test_module_1_id)
    api.TestSession.finish()
```

追加の構成については、[構成設定][2]を参照してください。

[1]: https://github.com/DataDog/dd-trace-py
[2]: #configuration-settings
{{% /tab %}}

{{< /tabs >}}

## 構成設定{#configuration-settings}

SDK を構成するには、テストプロセスを開始する前に以下の環境変数を設定します。並列テストランナーの場合、すべてのワーカーが継承するように親プロセスで設定してください。

`DD_SERVICE`(オプション)
: テスト対象のサービスまたはライブラリの名前。<br/>
**デフォルト**: リポジトリ名。利用できない場合は、pytest 用の `test` または unittest 用の `unittest` を使用してください。<br/>
**例**: `my-python-app`

`DD_ENV` (オプション)
: テストが実行されている環境の名前。<br/>
**デフォルト**: `none`<br/>
**例**: `local`、`ci`

`DD_CIVISIBILITY_AGENTLESS_ENABLED=true` (Agentless モードの場合、必須)
: Agentless モードを有効にして、テスト結果を Datadog に直接送信します。<br/>
**デフォルト**: `false`

`DD_API_KEY` (Agentless モードの場合、必須)
: テスト結果のアップロードを認証するために使用される Datadog API キー。この変数で Agentless モードが有効になることはありません。<br/>
**デフォルト**: `(empty)`

`DD_SITE` (Agentless モードの場合、オプション)
: テスト結果のアップロード先の [Datadog サイト][4]。US1 以外のサイトを使用する場合は、この構成を設定します。<br/>
**デフォルト**: `datadoghq.com`

`DD_TRACE_AGENT_URL` (Datadog Agent を使用する場合のみ)
: トレース収集用の Datadog Agent URL。`http://hostname:port` の形式にします。<br/>
**デフォルト**: `http://localhost:8126`

`DD_TEST_SESSION_NAME` (オプション)
: `unit-tests`、`integration-tests`、`smoke-tests` などのテストグループを識別します。<br/>
**デフォルト**: CI ジョブ名とテストコマンド、または CI ジョブ名が利用できない場合はテストコマンド。<br/>
**例**: `unit-tests`、`integration-tests`、`smoke-tests`

`service` および `env` の予約タグの詳細については、[Unified Service Tagging][2] を参照してください。

他のすべての [Datadog トレーサーコンフィギュレーション][3]オプションも使用できます。

## Git のメタデータを収集する{#collecting-git-metadata}

{{% ci-git-metadata %}}

## ベストプラクティス {#best-practices}

### テストセッション名 `DD_TEST_SESSION_NAME` {#test-session-name-dd-test-session-name}

`DD_TEST_SESSION_NAME` を使用してテストセッションの名前と関連するテストグループを定義します。このタグの値の例は次のとおりです。

- `unit-tests`
- `integration-tests`
- `smoke-tests`
- `flaky-tests`
- `ui-tests`
- `backend-tests`

`DD_TEST_SESSION_NAME` が指定されていない場合、デフォルトで CI ジョブ名とテストコマンドになります。CI ジョブ名が利用できない場合は、テストコマンドが使用されます。

異なるテストグループを区別しやすくするため、テストセッション名はリポジトリ内で一意でなければなりません。

#### `DD_TEST_SESSION_NAME` を使用するタイミング{#when-to-use-dd-test-session-name}

Datadog がテストセッション間の対応関係を確立するためにチェックするパラメーターのセットがあります。テストの実行に使用されるテストコマンドもその 1 つです。一時フォルダーなど、実行ごとに変化する文字列がテストコマンドに含まれる場合、Datadog はそれらのセッションを互いに無関係なものとみなします。たとえば、以下のような場合です。

- `pytest --temp-dir=/var/folders/t1/rs2htfh55mz9px2j4prmpg_c0000gq/T`

テストコマンドが実行ごとに異なる場合、Datadog は `DD_TEST_SESSION_NAME` を使用することを推奨します。

## 既知の制限 {#known-limitations}

{{< tabs >}}

{{% tab "pytest" %}}

テスト実行を変更する `pytest` 用のプラグインは、予期しない動作を引き起こす可能性があります。

### 並列化 {#parallelization}

`pytest` に並列化を導入するプラグイン ([`pytest-xdist`][1] や [`pytest-forked`][2] など) は、並列化されたインスタンスごとに 1 つのセッションイベントを作成します。

これらのプラグインを `ddtrace` と併用するといくつかの問題が発生しますが、最近の `dd-trace-py` のバージョン (3.12.6 以降) では `pytest-xdist` について解決されています。たとえば、個々のテストが失敗しても、セッション、モジュール、またはスイートが合格する場合があります。同様に、すべてのテストが合格しても、スイート/セッション/モジュールが失敗する可能性があります。これは、これらのプラグインがワーカーサブプロセスを作成し、親プロセスで作成されたスパンが子プロセスからの結果を反映しない可能性があるために発生します。このため、現時点では **`ddtrace` と `pytest-forked` の併用はサポートされておらず、`pytest-xdist` は `ddtrace>=3.12.6` のみをサポートしています。**

各ワーカーはテスト結果を Datadog に個別に報告するため、異なるプロセスで実行されている同じモジュールのテストは、別々のモジュールイベントまたはスイートイベントを生成します。

テストイベントの全体数 (およびその正確性) は影響を受けません。個別のセッション、モジュール、またはスイートのイベントは、同じ `pytest` 実行 (`pytest-forked` を含む) 内の他のイベントと結果が一致しない場合があります。

### テストの順序付け {#test-ordering}

テスト実行の順序を変更するプラグイン ([`pytest-randomly`][3] など) は、複数のモジュールイベントやスイートイベントを作成する可能性があります。モジュールイベントやスイートイベントの期間と結果も、`pytest` によって報告される結果と一致しない場合があります。

テストイベントの総数 (およびその正確性) は影響を受けません。


[1]: https://pypi.org/project/pytest-xdist/
[2]: https://pypi.org/project/pytest-forked/
[3]: https://pypi.org/project/pytest-randomly/

{{% /tab %}}

{{% tab "unittest" %}}

場合によっては、`unittest` テスト実行を並列で実行すると、インスツルメンテーションが破損し、テストの最適化に影響を与える可能性があります。

Datadog では、テストの最適化への影響を防ぐため、一度に最大 1 つのプロセスを使用することを推奨しています。

{{% /tab %}}

{{< /tabs >}}


## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/dd_libraries/python/
[2]: /ja/getting_started/tagging/unified_service_tagging
[3]: /ja/tracing/trace_collection/library_config/python/?tab=containers#configuration
[4]: /ja/getting_started/site/