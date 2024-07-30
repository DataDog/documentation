---
aliases:
- /ja/developers/metrics/agent_metrics_submission/
- /ja/metrics/agent_metrics_submission
further_reading:
- link: /developers/custom_checks/write_agent_check/
  tag: ドキュメント
  text: Agent カスタムチェックの書き方
title: "メトリクスの送信: \bカスタム Agent チェック"
---

関数は、[カスタム Agent チェック][1]を使用してメトリクスを送信する際に使います。[メトリクスタイプ][2]に応じ、さなざまな関数が利用できます。使用した関数により、Datadog 内に保存されるメトリクスタイプと送信時のものが異なる場合があります。

## 関数

{{< tabs >}}
{{% tab "Count" %}}

### `monotonic_count()`

この関数は、増加し続ける未加工の COUNT メトリクスを追跡するために使います。Datadog Agent は各送信の間の差を計算します。直前のサンプルより小さな値を持つサンプルは無視されます。これは通常、基になる未加工の COUNT メトリクスがリセットされたことを意味します。関数はチェックの実行中に複数回呼び出すことができます。

例えば、サンプル 2、3、6、7 を送信すると、最初のチェックの実行中に 5 (7-2) が送信されます。同じ `monotonic_count` でサンプル 10、11 を送信すると、次のチェックの実行中に 4 (11-7) が送信されます。

**注**: この関数で送信されたメトリクスは、Datadog に `COUNT` メトリクスタイプで保存されます。時系列に保存される値は、(時間正規化されない) サンプル間のメトリクス値の差分です。

関数テンプレート：

```python
self.monotonic_count(name, value, tags=None, hostname=None, device_name=None)
```

| パラメーター     | タイプ            | 必須 | デフォルト値 | 説明                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | 文字列          | 〇      | -             | メトリクスの名前                                                             |
| `value`       | Float           | 〇      | -             | メトリクスの値                                                           |
| `tags`        | 文字列のリスト | ✕       | -             | メトリクスに関連付けられているタグのリスト                                       |
| `hostname`    | 文字列          | ✕       | 現在のホスト  | メトリクスに関連付けられているホスト名                                           |
| `device_name` | 文字列          | ✕       | -             | 推奨されません。代わりにタグリストに `device:<DEVICE_NAME>` 形式のタグを追加します。 |

### `count()`

この関数は、チェック間隔の間に発生したイベントの数を送信します。チェックの実行中に複数回呼び出すことができます。各サンプルは、送信される値に追加されます。

**注**: この関数で送信されたメトリクスは、Datadog に `COUNT` メトリクスタイプで保存されます。時系列に保存される値は、(時間正規化されない) サンプル間のメトリクス値の差分です。

関数テンプレート：

```python
self.count(name, value, tags=None, hostname=None, device_name=None)
```

| パラメーター     | タイプ            | 必須 | デフォルト値 | 説明                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | 文字列          | 〇      | -             | メトリクスの名前                                                             |
| `value`       | Float           | 〇      | -             | メトリクスの値                                                           |
| `tags`        | 文字列のリスト | ✕       | -             | メトリクスに関連付けられているタグのリスト                                       |
| `hostname`    | 文字列          | ✕       | 現在のホスト  | メトリクスに関連付けられているホスト名                                           |
| `device_name` | 文字列          | ✕       | -             | 推奨されません。代わりにタグリストに `device:<DEVICE_NAME>` 形式のタグを追加します。 |

{{% /tab %}}
{{% tab "Gauge" %}}

### `gauge()`

この関数は、特定のタイムスタンプでメトリクスの値を送信します。チェックの実行中に複数回呼び出されると、メトリクスの最後のサンプルだけが使用されます。

**注**: この関数で送信されたメトリクスは、Datadog に `GAUGE` メトリクスタイプで保存されます。

関数テンプレート：

```python
self.gauge(name, value, tags=None, hostname=None, device_name=None)
```

| パラメーター     | タイプ            | 必須 | デフォルト値 | 説明                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | 文字列          | 〇      | -             | メトリクスの名前                                                             |
| `value`       | Float           | 〇      | -             | メトリクスの値                                                           |
| `tags`        | 文字列のリスト | ✕       | -             | メトリクスに関連付けられているタグのリスト                                       |
| `hostname`    | 文字列          | ✕       | 現在のホスト  | メトリクスに関連付けられているホスト名                                           |
| `device_name` | 文字列          | ✕       | -             | 推奨されません。代わりにタグリストに `device:<DEVICE_NAME>` 形式のタグを追加します。 |

{{% /tab %}}
{{% tab "Rate" %}}

### `rate()`

この関数は、サンプリングされた RATE メトリクスの未加工の値を送信します。Datadog Agent は、2 つの送信の間のメトリクス値の差分を送信の間隔で割ることで、レートを算出します。この関数は 1 回のチェックで 1 度だけ呼び出すことができます。複数回呼び出すと、以前送信された値より小さな値は無視されます。

**注**: この関数で送信されたメトリクスは、Datadog に `GAUGE` メトリクスタイプで保存されます。時系列に保存される値は、サンプル間のメトリクス値の時間正規化された差分です。

関数テンプレート：

```python
self.rate(name, value, tags=None, hostname=None, device_name=None)
```

| パラメーター     | タイプ            | 必須 | デフォルト値 | 説明                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | 文字列          | 〇      | -             | メトリクスの名前                                                             |
| `value`       | Float           | 〇      | -             | メトリクスの値                                                           |
| `tags`        | 文字列のリスト | ✕       | -             | メトリクスに関連付けられているタグのリスト                                       |
| `hostname`    | 文字列          | ✕       | 現在のホスト  | メトリクスに関連付けられているホスト名                                           |
| `device_name` | 文字列          | ✕       | -             | 推奨されません。代わりにタグリストに `device:<DEVICE_NAME>` 形式のタグを追加します。 |

{{% /tab %}}

{{% tab "Histogram" %}}

### `histogram()`

この関数は、チェック間隔の間に発生したヒストグラムメトリクスのサンプルを送信します。チェックの実行中に複数回呼び出すことができます。各サンプルは、このメトリクスの値セットの統計的分布に追加されます。

**注**: 生成されるすべてのメトリクス集計は、`RATE` メトリクスタイプとして保存される `<METRIC_NAME>.count` を除き、`GAUGE` メトリクスタイプとして Datadog に保存されます。 

関数テンプレート：

```python
self.histogram(name, value, tags=None, hostname=None, device_name=None)
```

| パラメーター     | タイプ            | 必須 | デフォルト値 | 説明                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | 文字列          | 〇      | -             | メトリクスの名前                                                             |
| `value`       | Float           | 〇      | -             | メトリクスの値                                                           |
| `tags`        | 文字列のリスト | ✕       | -             | メトリクスに関連付けられているタグのリスト                                       |
| `hostname`    | 文字列          | ✕       | 現在のホスト  | メトリクスに関連付けられているホスト名                                           |
| `device_name` | 文字列          | ✕       | -             | 推奨されません。代わりにタグリストに `device:<DEVICE_NAME>` 形式のタグを追加します。 |

{{% /tab %}}
{{< /tabs >}}

## チュートリアル

以下の手順に従い、すべてのメトリクスタイプを定期的に送信する[カスタム Agent チェック][2]を作成します。

1. [Agent のコンフィギュレーションディレクトリ][3]のルートにある `conf.d/` フォルダーにディレクトリ `metrics_example.d/` を作成します。

2. `metrics_example.d/` フォルダーに次の内容で空のコンフィギュレーションファイルを作成し、`metrics_example.yaml` と名付けます。

    ```yaml
    instances: [{}]
    ```

3. `conf.d/` フォルダーの 1 つ上のレベルで、`checks.d/` フォルダーに移動します。次の内容でカスタムチェックファイルを作成し、`metrics_example.py` と名付けます。

    ```python
    import random

    from datadog_checks.base import AgentCheck

    __version__ = "1.0.0"

    class MyClass(AgentCheck):
        def check(self, instance):
            self.count(
                "example_metric.count",
                2,
                tags=["env:dev","metric_submission_type:count"],
            )
            self.count(
                "example_metric.decrement",
                -1,
                tags=["env:dev","metric_submission_type:count"],
            )
            self.count(
                "example_metric.increment",
                1,
                tags=["env:dev","metric_submission_type:count"],
            )
            self.rate(
                "example_metric.rate",
                1,
                tags=["env:dev","metric_submission_type:rate"],
            )
            self.gauge(
                "example_metric.gauge",
                random.randint(0, 10),
                tags=["env:dev","metric_submission_type:gauge"],
            )
            self.monotonic_count(
                "example_metric.monotonic_count",
                2,
                tags=["env:dev","metric_submission_type:monotonic_count"],
            )

            # Calling the functions below twice simulates
            # several metrics submissions during one Agent run.
            self.histogram(
                "example_metric.histogram",
                random.randint(0, 10),
                tags=["env:dev","metric_submission_type:histogram"],
            )
            self.histogram(
                "example_metric.histogram",
                random.randint(0, 10),
                tags=["env:dev","metric_submission_type:histogram"],
            )
    ```

4. [Agent を再起動します][4]。
5. [Agent の status サブコマンド][5]を使用して、カスタムチェックが正しく実行されていることを確認します。Checks セクションで `metrics_example` を探します。

    ```text
    =========
    Collector
    =========

      Running Checks
      ==============

        (...)

        metrics_example (1.0.0)
        -----------------------
          Instance ID: metrics_example:d884b5186b651429 [OK]
          Total Runs: 2
          Metric Samples: Last Run: 8, Total: 16
          Events: Last Run: 0, Total: 0
          Service Checks: Last Run: 0, Total: 0
          Average Execution Time : 2ms

        (...)
    ```

6. [メトリクスの概要ページ][6]でメトリクスが Datadog に報告を行っているかを確認します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/developers/custom_checks/write_agent_check/
[2]: /ja/metrics/types/
[3]: /ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: /ja/agent/guide/agent-commands/#restart-the-agent
[5]: /ja/agent/guide/agent-commands/#agent-information
[6]: https://app.datadoghq.com/metric/summary