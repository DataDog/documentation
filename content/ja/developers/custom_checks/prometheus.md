---
title: カスタム OpenMetrics チェック
further_reading:
  - link: /agent/prometheus/
    tag: ドキュメント
    text: OpenMetrics チェックの構成
  - link: /developers/agent_checks/
    tag: ドキュメント
    text: カスタムチェックの書き方
  - link: /developers/integrations/
    tag: ドキュメント
    text: 新しいインテグレーションの作成
aliases:
  - /ja/developers/openmetrics/
  - /ja/developers/prometheus/
---
## 概要

ここでは、[Kube DNS][1] からタイミングメトリクスとステータスイベントを収集する簡単なチェックを例に挙げて、`OpenMetricsBaseCheck` インターフェイスの高度な使用方法について説明します。基本的な OpenMetrics チェックの構成について、詳しくは [Kubernetes Prometheus および OpenMetrics メトリクスの収集][2]を参照してください。

## 高度な使用方法: OpenMetrics チェックインターフェイス

汎用のチェックより高度なチェック (メトリクスの前処理など) が必要な場合は、カスタム `OpenMetricsBaseCheck` を作成してください。これは汎用チェックの[基本クラス][3]です。Prometheus で公開されるメトリクス、イベント、サービスチェックを収集するための構造とヘルパーを提供します。このクラスに基づいてチェックを構成するには、少なくとも以下が必要です。

- `namespace` と `metrics` マッピングを使用したデフォルトインスタンスの作成。
- `check()` メソッドの実装および/または
- 処理される OpenMetric メトリクスの名前を付けたメソッドの作成 (例: `self.prometheus_metric_name`)

## カスタム Prometheus チェックの書き方

ここでは、簡単な Kube DNS チェックの記述例を示して、`OpenMetricsBaseCheck` クラスの使用方法について説明します。次の例は、以下の汎用 Prometheus チェックの機能を再現します。

```yaml
instances:
  - prometheus_url: http://localhost:10055/metrics
    namespace: "kubedns"
    metrics:
      - kubedns_kubedns_dns_response_size_bytes: response_size.bytes
      - kubedns_kubedns_dns_request_duration_seconds: request_duration.seconds
      - kubedns_kubedns_dns_request_count_total: request_count
      - kubedns_kubedns_dns_error_count_total: error_count
      - kubedns_kubedns_dns_cachemiss_count_total: cachemiss_count
```

### コンフィギュレーション

<div class="alert alert-warning">
構成とチェックファイルは、名前が一致していなければなりません。チェックが <code>mycheck.py</code> という名前なら、構成ファイルは <code>mycheck.yaml</code> という名前にしなければなりません。
</div>

Prometheus チェックのコンフィギュレーションは、標準の [Agent チェック][4]とほぼ同じです。主な違いは、`check.yaml` ファイルに変数 `prometheus_url` を入れることです。`conf.d/kube_dns.yaml` は以下のようになります。

```yaml
init_config:

instances:
    # Prometheus のメトリクスエンドポイントの URL
  - prometheus_url: http://localhost:10055/metrics
```

### チェックの書き方

すべての OpenMetrics チェックは、[`OpenMetricsBaseCheck` クラス][5]を継承します。

```python
from datadog_checks.base import OpenMetricsBaseCheck

class KubeDNSCheck(OpenMetricsBaseCheck):
```

#### メトリクスマッピングの定義

```python
from datadog_checks.base import OpenMetricsBaseCheck

class KubeDNSCheck(OpenMetricsBaseCheck):
    def __init__(self, name, init_config, instances=None):
        METRICS_MAP = {
            #kubernetes 1.6.0 でメトリクスの名前が kubedns に変更されました
            'kubedns_kubedns_dns_response_size_bytes': 'response_size.bytes',
            'kubedns_kubedns_dns_request_duration_seconds': 'request_duration.seconds',
            'kubedns_kubedns_dns_request_count_total': 'request_count',
            'kubedns_kubedns_dns_error_count_total': 'error_count',
            'kubedns_kubedns_dns_cachemiss_count_total': 'cachemiss_count'
        }
```

#### デフォルトインスタンスの定義

デフォルトのインスタンスは、チェックに使用される基本コンフィギュレーションです。`namespace`、`metrics`、`prometheus_url` をオーバーライドする必要があります。

**注**: `OpenMetricsBaseCheck` のコンフィギュレーションオプションの一部でデフォルト値がオーバーライドされるため、[Prometheus と Datadog のメトリクスタイプ][6]の間ではメトリクス動作の関連性が増加します。

```python
from datadog_checks.base import OpenMetricsBaseCheck

class KubeDNSCheck(OpenMetricsBaseCheck):
    def __init__(self, name, init_config, instances=None):
        METRICS_MAP = {
            #kubernetes 1.6.0 でメトリクスの名前が kubedns に変更されました
            'kubedns_kubedns_dns_response_size_bytes': 'response_size.bytes',
            'kubedns_kubedns_dns_request_duration_seconds': 'request_duration.seconds',
            'kubedns_kubedns_dns_request_count_total': 'request_count',
            'kubedns_kubedns_dns_error_count_total': 'error_count',
            'kubedns_kubedns_dns_cachemiss_count_total': 'cachemiss_count'
        }
        super(KubeDNSCheck, self).__init__(
            name,
            init_config,
            instances,
            default_instances={
                'kubedns': {
                    'prometheus_url': 'http://localhost:8404/metrics',
                    'namespace': 'kubedns',
                    'metrics': [METRIC_MAP],
                    'send_histograms_buckets': True,
                    'send_distribution_counts_as_monotonic': True,
                    'send_distribution_sums_as_monotonic': True,
                }
            },
            default_namespace='kubedns',
        )
```


#### check メソッドの実装

さらに機能を実装したい場合は、`check()` 関数をオーバーライドします。

`instance` から、メトリクスをポーリングするための Prometheus または OpenMetrics のメトリクスエンドポイント `endpoint` を使用します。

```python
def check(self, instance):
    endpoint = instance.get('prometheus_url')
```

##### 例外

不正なコンフィギュレーション、プログラミングエラー、メトリクスを収集できないなどの理由でチェックを実行できない場合は、わかりやすい例外を生成する必要があります。デバッグが容易になるように、この例外はログに記録され、Agent の[ステータスコマンド][7]に表示されます。以下に例を示します。

    $ sudo /etc/init.d/datadog-agent info

      Checks
      ======

        my_custom_check
        ---------------
          - instance #0 [ERROR]: Unable to find prometheus_url in config file.
          - Collected 0 metrics & 0 events

`ConfigurationError` を使用して `check()` メソッドを補強します。

```python
from datadog_checks.base import ConfigurationError

def check(self, instance):
    endpoint = instance.get('prometheus_url')
    if endpoint is None:
        raise ConfigurationError("Unable to find prometheus_url in config file.")
```

次に、データを取得するとすぐにフラッシュします。

```python
from datadog_checks.base import ConfigurationError

def check(self, instance):
    endpoint = instance.get('prometheus_url')
    if endpoint is None:
        raise ConfigurationError("Unable to find prometheus_url in config file.")

    self.process(instance)
```

### ここまでのまとめ

```python
from datadog_checks.base import ConfigurationError, OpenMetricsBaseCheck

class KubeDNSCheck(OpenMetricsBaseCheck):
    """
    Collect kube-dns metrics from Prometheus endpoint
    """
    def __init__(self, name, init_config, instances=None):
        METRICS_MAP = {
            #kubernetes 1.6.0 でメトリクスの名前が kubedns に変更されました
            'kubedns_kubedns_dns_response_size_bytes': 'response_size.bytes',
            'kubedns_kubedns_dns_request_duration_seconds': 'request_duration.seconds',
            'kubedns_kubedns_dns_request_count_total': 'request_count',
            'kubedns_kubedns_dns_error_count_total': 'error_count',
            'kubedns_kubedns_dns_cachemiss_count_total': 'cachemiss_count'
        }
        super(KubeDNSCheck, self).__init__(
            name,
            init_config,
            instances,
            default_instances={
                'kubedns': {
                    'prometheus_url': 'http://localhost:8404/metrics',
                    'namespace': 'kubedns',
                    'metrics': [METRIC_MAP],
                    'send_histograms_buckets': True,
                    'send_distribution_counts_as_monotonic': True,
                    'send_distribution_sums_as_monotonic': True,
                }
            },
            default_namespace='kubedns',
        )

    def check(self, instance):
        endpoint = instance.get('prometheus_url')
        if endpoint is None:
            raise ConfigurationError("Unable to find prometheus_url in config file.")

        self.process(instance)
```

## さらに改良するには

Prometheus および OpenMetrics の基本インテグレーションに関する詳細は、インテグレーションの[デベロッパ用ドキュメント][8]をご参照ください。

追加のコンフィギュレーションオプションのデフォルト値を含めることで、OpenMetrics チェックをさらに改良できます。

`ignore_metrics`
: メトリクスの一部は重複していたり、カーディナリティが非常に高くなるという理由で無視されます。このリストに含まれるメトリクスは、ログに `Unable to handle metric` というデバッグ行を残すことなく、暗黙にスキップされます。

`labels_mapper`
: `labels_mapper` 辞書が提供されている場合は、ゲージの送信時に、`labels_mapper` 内のメトリクスラベルに対応する値がタグ名として使用されます。

`exclude_labels`
: `exclude_labels` は、除外するラベルの配列です。除外されるラベルは、メトリクスの送信時にタグとして追加されません。

`type_overrides`
: `type_overrides` は、Prometheus または OpenMetrics のメトリクス名をキーとし、メトリクスタイプ (文字列の名前) を値とする辞書です。これが、ペイロードにリストされているタイプの代わりに使用されます。タイプが指定されていないメトリクスにタイプを適用するために使用できます。
使用可能なタイプは `counter`、`gauge`、`summary`、`untyped`、`histogram` です。
**注**: この値は基本クラスでは空ですが、最終的なチェックではカスタムメトリクスとしてカウントされないように、オーバーロード/ハードコードする必要があります。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/integrations-core/blob/master/kube_dns/datadog_checks/kube_dns/kube_dns.py
[2]: /ja/agent/prometheus/
[3]: https://github.com/DataDog/dd-agent/blob/master/checks/prometheus_check.py
[4]: /ja/agent/agent_checks/#configuration
[5]: https://github.com/DataDog/integrations-core/blob/master/datadog_checks_base/datadog_checks/base/checks/openmetrics/base_check.py
[6]: https://docs.datadoghq.com/ja/integrations/guide/prometheus-metrics/
[7]: /ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://datadoghq.dev/integrations-core/base/prometheus/