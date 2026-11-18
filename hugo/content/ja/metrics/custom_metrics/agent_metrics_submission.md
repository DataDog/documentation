---
aliases:
- /ja/developers/metrics/agent_metrics_submission/
- /ja/metrics/agent_metrics_submission
description: coun、gauge、histogram、および rate 関数を使用して、カスタム Agent チェックからカスタムメトリクスを送信します。
further_reading:
- link: /extend/custom_checks/write_agent_check/
  tag: ドキュメント
  text: Agent カスタムチェックを作成する
title: 'メトリクス送信: カスタム Agent チェック'
---
[カスタム Agent チェック][1]でメトリクスを送信するために関数が使用されます。[メトリクスタイプ][2]に応じて、さまざまな関数が利用可能です。使用する関数によって、送信メトリクスタイプと Datadog 内に保存される実際のメトリクスタイプが異なる場合があります。

## 関数 {#functions}

{{< tabs >}}
{{% tab "Count" %}}

### `monotonic_count()` {#monotonic-count}

この関数は、常に増加する生の COUNT メトリクスを追跡するために使用されます。Datadog Agent は、各送信間の差分を計算します。前のサンプルよりも値が低いサンプルは無視されます。値が低い場合は通常、基盤となる生の COUNT メトリクスがリセットされたことを示します。この関数はチェックの実行中に複数回呼び出すことができます。

たとえば、サンプル 2、3、6、7 を送信すると、最初のチェック実行中に値 5 (7-2) が送信されます。同じ `monotonic_count` でサンプル 10、11 を送信すると、2 回目のチェック実行中に値 4 (11-7) が送信されます。

**注**: この関数で送信されたメトリクスは、Datadog では `COUNT` メトリクスタイプで保存されます。保存された時系列の各値は、サンプル間のメトリクス値の差分です (時間正規化なし)。

関数テンプレート:

```python
self.monotonic_count(name, value, tags=None, hostname=None, device_name=None)
```

| パラメーター     | タイプ            | 必須 | デフォルト値 | 説明                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | 文字列          | Yes      | -             | メトリクスの名前。                                                            |
| `value`       | 浮動小数点数           | Yes      | -             | メトリクスの値。                                                          |
| `tags`        | 文字列のリスト | No       | -             | このメトリクスに関連付けるタグのリスト。                                      |
| `hostname`    | 文字列          | No       | 現在のホスト  | このメトリクスに関連付けるホスト名。                                          |
| `device_name` | 文字列          | No       | -             | 非推奨。代わりに `device:<DEVICE_NAME>` の形式のタグをタグリストに追加します。|

### `count()` {#count}

この関数は、チェック間隔中に発生したイベント数を送信します。チェックの実行中に複数回呼び出すことができ、各サンプルは送信される値に追加されます。

**注**: この関数で送信されたメトリクスは、Datadog では `COUNT` メトリクスタイプで保存されます。

関数テンプレート:

```python
self.count(name, value, tags=None, hostname=None, device_name=None)
```

| パラメーター     | タイプ            | 必須 | デフォルト値 | 説明                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | 文字列          | Yes      | -             | メトリクスの名前。                                                            |
| `value`       | 浮動小数点数           | Yes      | -             | メトリクスの値。                                                          |
| `tags`        | 文字列のリスト | No       | -             | このメトリクスに関連付けるタグのリスト。                                      |
| `hostname`    | 文字列          | No       | 現在のホスト  | このメトリクスに関連付けるホスト名。                                          |
| `device_name` | 文字列          | No       | -             | 非推奨。代わりに `device:<DEVICE_NAME>` の形式のタグをタグリストに追加します。|

{{% /tab %}}
{{% tab "Gauge" %}}

### `gauge()` {#gauge}

この関数は、特定のタイムスタンプにおけるメトリクス値を送信します。チェックの実行中に同じメトリクスに対して複数回呼び出された場合、最後のサンプルのみが使用されます。

**注**: この関数で送信されたメトリクスは、Datadog では `GAUGE` メトリクスタイプで保存されます。

関数テンプレート:

```python
self.gauge(name, value, tags=None, hostname=None, device_name=None)
```

| パラメーター     | タイプ            | 必須 | デフォルト値 | 説明                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | 文字列          | Yes      | -             | メトリクスの名前。                                                            |
| `value`       | 浮動小数点数           | Yes      | -             | メトリクスの値。                                                          |
| `tags`        | 文字列のリスト | No       | -             | このメトリクスに関連付けるタグのリスト。                                      |
| `hostname`    | 文字列          | No       | 現在のホスト  | このメトリクスに関連付けるホスト名。                                          |
| `device_name` | 文字列          | No       | -             | 非推奨。代わりに `device:<DEVICE_NAME>` の形式のタグをタグリストに追加します。|

{{% /tab %}}
{{% tab "Rate" %}}

### `rate()` {#rate}

この関数は、RATE メトリクスのサンプリングされた生の値を送信します。Datadog Agent は、2 回の送信間におけるそのメトリクス値の差分を計算し、それを送信間隔で割ることでレートを算出します。この関数はチェック中に 1 回だけ呼び出されるようにする必要があります。そうしないと、以前に送信された値よりも小さい値がすべて破棄されます。

**注**: この関数で送信されたメトリクスは、Datadog では `GAUGE` メトリクスタイプで保存されます。保存された時系列の各値は、サンプル間のメトリクス値の時間正規化された差分です。

関数テンプレート:

```python
self.rate(name, value, tags=None, hostname=None, device_name=None)
```

| パラメーター     | タイプ            | 必須 | デフォルト値 | 説明                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | 文字列          | Yes      | -             | メトリクスの名前。                                                            |
| `value`       | 浮動小数点数           | Yes      | -             | メトリクスの値。                                                          |
| `tags`        | 文字列のリスト | No       | -             | このメトリクスに関連付けるタグのリスト。                                      |
| `hostname`    | 文字列          | No       | 現在のホスト  | このメトリクスに関連付けるホスト名。                                          |
| `device_name` | 文字列          | No       | -             | 非推奨。代わりに `device:<DEVICE_NAME>` の形式のタグをタグリストに追加します。|

{{% /tab %}}

{{% tab "Histogram" %}}

### `histogram()` {#histogram}

この関数は、チェック間隔中に発生したヒストグラムメトリクスのサンプルを送信します。チェックの実行中に複数回呼び出すことができます。各サンプルは、このメトリクスの値セットの統計的分布に追加されます。

**注**: 生成されるすべてのメトリクス集計は Datadog で `GAUGE` メトリクスタイプとして保存されますが、`<METRIC_NAME>.count` のみ Datadog で `RATE` メトリクスタイプとして保存されます。

関数テンプレート:

```python
self.histogram(name, value, tags=None, hostname=None, device_name=None)
```

| パラメーター     | タイプ            | 必須 | デフォルト値 | 説明                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | 文字列          | Yes      | -             | メトリクスの名前。                                                            |
| `value`       | 浮動小数点数           | Yes      | -             | メトリクスの値。                                                          |
| `tags`        | 文字列のリスト | No       | -             | このメトリクスに関連付けるタグのリスト。                                      |
| `hostname`    | 文字列          | No       | 現在のホスト  | このメトリクスに関連付けるホスト名。                                          |
| `device_name` | 文字列          | No       | -             | 非推奨。代わりに `device:<DEVICE_NAME>` の形式のタグをタグリストに追加します。|

{{% /tab %}}
{{< /tabs >}}

## チュートリアル {#tutorial}

以下の手順に従って、すべてのメトリクスタイプを定期的に送信する[カスタム Agent チェック][2]を作成します。

1. [Agent の構成ディレクトリ][3]のルートにある `conf.d/` フォルダー内にディレクトリ `metrics_example.d/` を作成します。

2. `metrics_example.d/` フォルダー内に、以下の内容を記述した `metrics_example.yaml` という名前の空の構成ファイルを作成します。

    ```yaml
    instances: [{}]
    ```

3. `conf.d/` フォルダーから 1 つ上の階層にある `checks.d/` フォルダーに移動します。以下の内容で `metrics_example.py` という名前のカスタムチェックファイルを作成します。

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

4. [Agent を再起動][4]します。
5. [Agent のステータスサブコマンド][5]を使用して、カスタムチェックが正しく実行されていることを検証します。{{< ui >}}Checks{{< /ui >}} セクションで `metrics_example` を探します。

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

6. [Metrics Catalog ページ][6]で、メトリクスが Datadog にレポートされていることを確認します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/extend/custom_checks/write_agent_check/
[2]: /ja/metrics/types/
[3]: /ja/agent/configuration/agent-configuration-files/#agent-configuration-directory
[4]: /ja/agent/configuration/agent-commands/#restart-the-agent
[5]: /ja/agent/configuration/agent-commands/#agent-information
[6]: https://app.datadoghq.com/metric/catalog