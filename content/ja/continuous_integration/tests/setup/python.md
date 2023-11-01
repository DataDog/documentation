---
aliases:
- /ja/continuous_integration/setup_tests/python
- /ja/continuous_integration/tests/python
code_lang: python
code_lang_weight: 30
further_reading:
- link: /continuous_integration/tests/containers/
  tag: ドキュメント
  text: コンテナ内でテスト用に環境変数を転送する
- link: /continuous_integration/tests
  tag: ドキュメント
  text: テスト結果とパフォーマンスを確認する
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: CI の表示に関するトラブルシューティング
kind: ドキュメント
title: Python テスト
type: multi-code-lang
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 CI Visibility は利用できません。</div>
{{< /site-region >}}

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

{{% tab "オンプレミス CI プロバイダー (Datadog Agent)" %}}

{{% ci-agent %}}

{{% /tab %}}

{{% tab "クラウド CI プロバイダー (エージェントレス)" %}}

{{% ci-agentless %}}

{{% /tab %}}
{{< /tabs >}}

## Python トレーサーのインストール

次のコマンドを実行して、Python トレーサーをインストールします。

{{< code-block lang="shell" >}}
pip install -U ddtrace
{{< /code-block >}}

詳細については、[Python トレーサーのインストールドキュメント][4]を参照してください。

## テストのインスツルメンテーション

### pytest の使用

`pytest` テストのインスツルメンテーションを有効にするには、`pytest` の実行時に `--ddtrace` オプションを追加し、`DD_SERVICE` 環境変数でテスト対象のサービスまたはライブラリの名前を、`DD_ENV` 環境変数でテストが実行されている環境を指定します (たとえば、開発者ワークステーションでテストを実行する場合は `local`、CI プロバイダーでテストを実行する場合は `ci`)。

{{< code-block lang="shell" >}}
DD_SERVICE=my-python-app DD_ENV=ci pytest --ddtrace
{{< /code-block >}}

もし、残りの APM インテグレーションも有効にして flamegraph でより多くの情報を取得したい場合は、`--ddtrace-patch-all` オプションを追加します。

{{< code-block lang="shell" >}}
DD_SERVICE=my-python-app DD_ENV=ci pytest --ddtrace --ddtrace-patch-all
{{< /code-block >}}

### pytest-benchmark の使用

`pytest-benchmark` でベンチマークテストをインスツルメンテーションするには、`pytest` 実行時に `—ddtrace` オプションを付けてベンチマークテストを実行すると、Datadog は自動的に `pytest-benchmark` からメトリクスを検出します。

```python
def square_value(value):
    return value * value


def test_square_value(benchmark):
    result = benchmark(square_value, 5)
    assert result == 25
```

### unittest の使用

`unittest` テストのインスツルメンテーションを有効にするには、`unittest` コマンドの冒頭に `ddtrace-run` を追加してテストを実行します。

 `DD_SERVICE` 環境変数において、テスト対象のサービスまたはライブラリの名前を必ず指定してください。
また、`DD_ENV` 環境変数で、テストが実行されている環境を宣言することもできます。

{{< code-block lang="shell" >}}
DD_SERVICE=my-python-app DD_ENV=ci ddtrace-run python -m unittest
{{< /code-block >}}

あるいは、`unittest` インスツルメンテーションを手動で有効にしたい場合は、`patch()` を使ってインテグレーションを有効にしてください。

{{< code-block lang="python" >}}
from ddtrace import patch
import unittest
patch(unittest=True)

class MyTest(unittest.TestCase):
    def test_will_pass(self):
        assert True
{{< /code-block >}}

#### 既知の制限

`unittest` テスト実行が並列で実行される場合、場合によっては、インスツルメンテーションが損なわれ、テストの可視性に影響を及ぼす可能性があります。

Datadog では、テストの可視性に影響が出ないよう、一度に使用するプロセスを 1 つに制限することを推奨しています。

### テストにカスタムタグを追加する

テストの引数に `ddspan` と宣言することで、テストにカスタムタグを追加することができます。

```python
from ddtrace import tracer

# テストの引数として `ddspan` を宣言します
def test_simple_case(ddspan):
    # タグを設定します
    ddspan.set_tag("test_owner", "my_team")
    # テストは正常に続きます
    # ...
```

これらのタグに対して、フィルターや `group by` フィールドを作成するには、まずファセットを作成する必要があります。タグの追加についての詳細は、Python カスタムインスツルメンテーションドキュメントの[タグの追加][5]セクションを参照してください。

### テストにカスタムメトリクスを追加する

タグと同様に、現在アクティブなスパンを使用して、テストにカスタムメトリクスを追加できます。

```python
from ddtrace import tracer

# テストの引数として `ddspan` を宣言します
def test_simple_case(ddspan):
    # タグを設定します
    ddspan.set_tag("memory_allocations", 16)
    # テストは正常に続きます
    # ...
```
カスタムメトリクスについては、[カスタムメトリクスの追加ガイド][7]を参照してください。

## 構成設定

以下は、コードか、または環境変数を使用した、トレーサーで使用できる最も重要なコンフィギュレーション設定のリストです。

`ddtrace.config.service`
: テスト中のサービスまたはライブラリの名前。<br/>
**環境変数**: `DD_SERVICE`<br/>
**デフォルト**: `pytest`<br/>
**例**: `my-python-app`

`ddtrace.config.env`
: テストが実行されている環境の名前。<br/>
**環境変数**: `DD_ENV`<br/>
**デフォルト**: `none`<br/>
**例**: `local`、`ci`

次の環境変数を使用して、Datadog Agent の場所を構成できます。

`DD_TRACE_AGENT_URL`
: `http://hostname:port` の形式のトレース収集用の Datadog Agent URL。<br/>
**デフォルト**: `http://localhost:8126`

他のすべての [Datadog トレーサー構成][6]オプションも使用できます。

## Git のメタデータを収集する

{{% ci-git-metadata %}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/
[2]: https://docs.datadoghq.com/ja/agent/cluster_agent/admission_controller/
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /ja/tracing/trace_collection/dd_libraries/python/
[5]: /ja/tracing/trace_collection/custom_instrumentation/python?tab=locally#adding-tags
[6]: /ja/tracing/trace_collection/library_config/python/?tab=containers#configuration
[7]: /ja/continuous_integration/guides/add_custom_metrics/?tab=python