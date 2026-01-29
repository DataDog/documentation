---
aliases:
- /ja/continuous_integration/intelligent_test_runner/python/
- /ja/continuous_integration/intelligent_test_runner/setup/python/
- /ja/intelligent_test_runner/setup/python
code_lang: python
code_lang_weight: 30
further_reading:
- link: /continuous_integration/tests
  tag: ドキュメント
  text: テスト結果とパフォーマンスを確認する
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: CI Visibility のトラブルシューティング
title: Python 向け Test Impact Analysis
type: multi-code-lang
---

## 互換性

Test Impact Analysis は、以下のバージョンとテストフレームワークでのみサポートされています。

* `pytest>=7.2.0`
  * `ddtrace>=2.1.0` 以降。
  * `Python>=3.7` 以降。
  * `coverage>=5.5` が必要です。
  * `pytest-cov` とは非互換 ([既知の制限事項](#known-limitations)を参照)
* `unittest`
  * `ddtrace>=2.1.0` 以降。
  * `Python>=3.7` 以降。
* `coverage`
  * カバレッジ収集には非対応 ([既知の制限事項](#known-limitations)を参照)

## セットアップ

### テストの最適化

Test Impact Analysis を設定する前に、[Python 向け Test Optimization][1] をセットアップしてください。Agent 経由でデータを報告する場合は、v6.40 以降または v7.40 以降を使用してください。

{{% ci-itr-activation-instructions %}}

### 必要な依存関係

Test Impact Analysis には [`coverage` パッケージ][2]が必要です。

このパッケージを CI テスト環境にインストールするには、関連する要件ファイルで指定するか、`pip` を使用します。

{{< code-block lang="shell" >}}
pip install coverage
{{< /code-block >}}

すでに `coverage` パッケージや `pytest-cov` のようなプラグインを使用している場合は、[既知の制限事項](#known-limitations)を参照してください。

## Test Impact Analysis を有効にしてテストを実行する

Test Impact Analysis は、Datadog インテグレーションがアクティブな状態でテストを実行すると有効になります。次のコマンドでテストを実行してください。

{{< tabs >}}

{{% tab "Pytest" %}}

{{< code-block lang="shell" >}}
DD_ENV=ci DD_SERVICE=my-python-app pytest --ddtrace
{{< /code-block >}}

{{% /tab %}}

{{% tab "Unittest" %}}

{{< code-block lang="shell" >}}
DD_ENV=ci DD_SERVICE=my-python-app ddtrace-run python -m unittest
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

### Test Impact Analysis を一時的に無効にする

環境変数 `DD_CIVISIBILITY_ITR_ENABLED` を `false` または `0` に設定することで、Test Impact Analysis をローカルで無効化できます。

`DD_CIVISIBILITY_ITR_ENABLED` (オプション)
: Test Impact Analysis のカバレッジおよびテストスキップ機能を有効化<br />
**デフォルト**: `(true)`

次のコマンドを実行して Test Impact Analysis を無効化します。

{{< tabs >}}

{{% tab "Pytest" %}}

{{< code-block lang="shell" >}}
DD_ENV=ci DD_SERVICE=my-python-app DD_CIVISIBILITY_ITR_ENABLED=false pytest --ddtrace
{{< /code-block >}}

{{% /tab %}}

{{% tab "Unittest" %}}

{{< code-block lang="shell" >}}
DD_ENV=ci DD_SERVICE=my-python-app DD_CIVISIBILITY_ITR_ENABLED=false ddtrace-run python -m unittest
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

## 特定のテストに対するスキップの無効化

Test Impact Analysis の動作を上書きし、特定のテストがスキップされないようにできます。これらのテストは unskippable テストと呼ばれます。

### テストをスキップできないようにする理由は？

Test Impact Analysis uses code coverage data to determine whether or not tests should be skipped. In some cases, this data may not be sufficient to make this determination.

例:

* テキストファイルからデータを読み込むテスト
* テスト対象のコード以外の API とやりとりするテスト (リモートの REST API など)

Designating tests as unskippable ensures that Test Impact Analysis runs them regardless of coverage data.


{{< tabs >}}

{{% tab "Pytest" %}}

### 互換性

スキップ不可のテストは以下のバージョンでサポートされています。

* `pytest`
  * `ddtrace>=1.19.0` 以降。

### Marking tests as unskippable

[`pytest`][1] の [`skipif` マーク][2]を使用して、Test Impact Analysis が個々のテストやモジュールをスキップしないようにできます。`condition` を `False`、`reason` を `"datadog_itr_unskippable"` として指定します。

#### 個々のテスト

個々のテストは、`@pytest.mark.skipif` デコレータを使用して、以下のようにスキップ不可としてマークすることができます。
```python
import pytest

@pytest.mark.skipif(False, reason="datadog_itr_unskippable")
def test_function():
    assert True
```
#### モジュール

モジュールをスキップするには、以下のように [`pytestmark` グローバル変数][3]を使用します。
```python
import pytest

pytestmark = pytest.mark.skipif(False, reason="datadog_itr_unskippable")

def test_function():
    assert True
```

**注**: これは他の `skip` マークや `condition` が `True` に評価される `skipif` マークをオーバーライドしません。

[1]: https://pytest.org/
[2]: https://docs.pytest.org/en/latest/reference/reference.html#pytest-mark-skipif-ref
[3]: https://docs.pytest.org/en/latest/reference/reference.html#globalvar-pytestmark

{{% /tab %}}

{{% tab "Unittest" %}}

### 互換性

スキップ不可のテストは以下のバージョンでサポートされています。

* `unittest`
  * `ddtrace>=2.2.0` 以降。

### `unittest` での unskippable テストの指定方法

[`unittest`][1] の [`skipif` マーク][2]を使用して、Test Impact Analysis が個々のテストをスキップしないようにできます。`condition` を `False`、`reason` を `"datadog_itr_unskippable"` として指定します。

#### 個々のテスト

個々のテストは、`@unittest.skipif` デコレータを使用して、以下のようにスキップ不可としてマークすることができます。
```python
import unittest

class MyTestCase(unittest.TestCase):
  @unittest.skipIf(False, reason="datadog_itr_unskippable")
  def test_function(self):
      assert True
```


`@unittest.skipif` を使用すると、他の `skip` マークや `condition` が `True` に評価される `skipif` マークをオーバーライドしません。

[1]: https://docs.python.org/3/library/unittest.html
[2]: https://docs.python.org/3/library/unittest.html#unittest.skipIf

{{% /tab %}}

{{< /tabs >}}

## 既知の制限

### コードカバレッジの収集

#### カバレッジツールとの相互作用

Test Impact Analysis が有効な場合、カバレッジデータが不完全に見えることがあります。通常テストでカバーされるコード行が、これらのテストがスキップされるとカバーされなくなります。

#### `coverage` パッケージとの相互作用

Test Impact Analysis は [`coverage`][2] パッケージの API を使用してコードカバレッジを収集します。そのため、`coverage run` や `pytest-cov` のようなプラグインからのデータは、`ddtrace` が `Coverage` クラスを使用するため不完全です。

`pytest-xdist` のようなテスト実行順序を変更したり並列化を導入する `pytest` プラグインを使用すると、競合状態により例外が発生する可能性があります。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/continuous_integration/tests/python
[2]: https://pypi.org/project/coverage/