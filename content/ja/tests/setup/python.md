---
title: Python Tests
code_lang: python
type: multi-code-lang
code_lang_weight: 30
aliases:
  - /continuous_integration/setup_tests/python
  - /continuous_integration/tests/python
  - /continuous_integration/tests/setup/python
further_reading:
    - link: /continuous_integration/tests/containers/
      tag: Documentation
      text: Forwarding Environment Variables for Tests in Containers
    - link: /continuous_integration/tests
      tag: Documentation
      text: Explore Test Results and Performance
    - link: /continuous_integration/troubleshooting/
      tag: Documentation
      text: Troubleshooting CI Visibility
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

<div class="alert alert-info">
  If your CI provider is Jenkins, you can use <a href="/continuous_integration/pipelines/jenkins/#enable-with-the-jenkins-configuration-ui-1">UI-based configuration</a> to enable Test Visibility for your jobs and pipelines.
</div>

## 互換性

サポート対象言語:

| 言語 | バージョン |
|---|---|
| Python 2 | >= 2.7 |
| Python 3 | >= 3.6 |

サポートされているテストフレームワーク:

| Test Framework | バージョン |
|---|---|
| `pytest` | >= 3.0.0 |
| `pytest-benchmark` | >= 3.1.0 |
| `unittest` | >= 3.7 |

## 報告方法の構成

Datadog にテスト結果を報告するには、Datadog Python ライブラリを構成する必要があります。

{{< tabs >}}
{{% tab "クラウド CI プロバイダー (エージェントレス)" %}}

{{% ci-agentless %}}

{{% /tab %}}
{{% tab "On-Premises CI Provider (Datadog Agent)" %}}

{{% ci-agent %}}

{{% /tab %}}
{{< /tabs >}}

## Python トレーサーのインストール

次のコマンドを実行して、Python トレーサーをインストールします。

{{< code-block lang="shell" >}}
pip install -U ddtrace
{{< /code-block >}}

For more information, see the [Python tracer installation documentation][1].

## テストのインスツルメンテーション

{{< tabs >}}
{{% tab "pytest" %}}

`pytest` テストのインスツルメンテーションを有効にするには、`pytest` の実行時に `--ddtrace` オプションを追加し、`DD_SERVICE` 環境変数でテスト対象のサービスまたはライブラリの名前を、`DD_ENV` 環境変数でテストが実行されている環境を指定します (たとえば、開発者ワークステーションでテストを実行する場合は `local`、CI プロバイダーでテストを実行する場合は `ci`)。

{{< code-block lang="shell" >}}
DD_SERVICE=my-python-app DD_ENV=ci pytest --ddtrace
{{< /code-block >}}

もし、残りの APM インテグレーションも有効にして flamegraph でより多くの情報を取得したい場合は、`--ddtrace-patch-all` オプションを追加します。

{{< code-block lang="shell" >}}
DD_SERVICE=my-python-app DD_ENV=ci pytest --ddtrace --ddtrace-patch-all
{{< /code-block >}}

### テストにカスタムタグを追加する

To add custom tags to your tests, declare `ddspan` as an argument in your test:

```python
from ddtrace import tracer

# テストの引数として `ddspan` を宣言します
def test_simple_case(ddspan):
    # タグを設定します
    ddspan.set_tag("test_owner", "my_team")
    # テストは正常に続きます
    # ...
```

To create filters or `group by` fields for these tags, you must first create facets. For more information about adding tags, see the [Adding Tags][1] section of the Python custom instrumentation documentation.

### Adding custom measures to tests

Just like tags, to add custom measures to your tests, use the current active span:

```python
from ddtrace import tracer

# テストの引数として `ddspan` を宣言します
def test_simple_case(ddspan):
    # タグを設定します
    ddspan.set_tag("memory_allocations", 16)
    # テストは正常に続きます
    # ...
```
Read more about custom measures in the [Add Custom Measures Guide][2].

[1]: /tracing/trace_collection/custom_instrumentation/python?tab=locally#adding-tags
[2]: /tests/guides/add_custom_measures/?tab=python
{{% /tab %}}

{{% tab "pytest-benchmark" %}}

`pytest-benchmark` でベンチマークテストをインスツルメンテーションするには、`pytest` 実行時に `—ddtrace` オプションを付けてベンチマークテストを実行すると、Datadog は自動的に `pytest-benchmark` からメトリクスを検出します。

```python
def square_value(value):
    return value * value


def test_square_value(benchmark):
    result = benchmark(square_value, 5)
    assert result == 25
```

{{% /tab %}}

{{% tab "unittest" %}}

To enable instrumentation of `unittest` tests, run your tests by appending `ddtrace-run` to the beginning of your `unittest` command.

Make sure to specify the name of the service or library under test in the `DD_SERVICE` environment variable.
Additionally, you may declare the environment where tests are being run in the `DD_ENV` environment variable:

{{< code-block lang="shell" >}}
DD_SERVICE=my-python-app DD_ENV=ci ddtrace-run python -m unittest
{{< /code-block >}}

Alternatively, if you wish to enable `unittest` instrumentation manually, use `patch()` to enable the integration:

{{< code-block lang="python" >}}
from ddtrace import patch
import unittest
patch(unittest=True)

class MyTest(unittest.TestCase):
def test_will_pass(self):
assert True
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

## 構成設定

以下は、コードか、または環境変数を使用した、トレーサーで使用できる最も重要なコンフィギュレーション設定のリストです。

`DD_SERVICE`
: Name of the service or library under test.<br/>
**Environment variable**: `DD_SERVICE`<br/>
**Default**: `pytest`<br/>
**Example**: `my-python-app`

`DD_ENV`
: Name of the environment where tests are being run.<br/>
**Environment variable**: `DD_ENV`<br/>
**Default**: `none`<br/>
**Examples**: `local`, `ci`

For more information about `service` and `env` reserved tags, see [Unified Service Tagging][2].

次の環境変数を使用して、Datadog Agent の場所を構成できます。

`DD_TRACE_AGENT_URL`
: `http://hostname:port` の形式のトレース収集用の Datadog Agent URL。<br/>
**デフォルト**: `http://localhost:8126`

他のすべての [Datadog トレーサーコンフィギュレーション][3]オプションも使用できます。

## Git のメタデータを収集する

{{% ci-git-metadata %}}

## 既知の制限

{{< tabs >}}

{{% tab "pytest" %}}

Plugins for `pytest` that alter test execution may cause unexpected behavior.

### 並列化

Plugins that introduce parallelization to `pytest` (such as [`pytest-xdist`][1] or [`pytest-forked`][2]) create one session event for each parallelized instance. Multiple module or suite events may be created if tests from the same package or module execute in different processes.

The overall count of test events (and their correctness) remain unaffected. Individual session, module, or suite events may have inconsistent results with other events in the same `pytest` run.

### Test ordering

Plugins that change the ordering of test execution (such as [`pytest-randomly`][3]) can create multiple module or suite events. The duration and results of module or suite events may also be inconsistent with the results reported by `pytest`.

The overall count of test events (and their correctness) remain unaffected.


[1]: https://pypi.org/project/pytest-xdist/
[2]: https://pypi.org/project/pytest-forked/
[3]: https://pypi.org/project/pytest-randomly/

{{% /tab %}}

{{% tab "unittest" %}}

In some cases, if your `unittest` test execution is run in a parallel manner, this may break the instrumentation and affect test visibility.

Datadog recommends you use up to one process at a time to prevent affecting test visibility.

{{% /tab %}}

{{< /tabs >}}


## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/dd_libraries/python/
[2]: /getting_started/tagging/unified_service_tagging
[3]: /tracing/trace_collection/library_config/python/?tab=containers#configuration
