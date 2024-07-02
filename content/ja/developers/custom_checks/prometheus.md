---
title: Custom OpenMetrics Check
further_reading:
- link: /agent/kubernetes/prometheus
  tag: Documentation
  text: Configuring an OpenMetrics Check
- link: /developers/custom_checks/write_agent_check/
  tag: Documentation
  text: Write a Custom Check
- link: /developers/integrations/
  tag: Documentation
  text: Introduction to Agent-based Integrations
aliases:
  - /developers/openmetrics/
  - /developers/prometheus/
---

## 概要

ここでは、[Kong][1] からタイミングメトリクスとステータスイベントを収集する簡単なチェックを例に挙げて、`OpenMetricsBaseCheckV2` インターフェイスの高度な使用方法について説明します。基本的な OpenMetrics チェックの構成について、詳しくは [Kubernetes Prometheus および OpenMetrics メトリクスの収集][2]を参照してください。

**注**: `OpenMetricsBaseCheckV2` は Agent v`7.26.x`+ で利用可能で、Python 3 が必要です。

<div class="alert alert-info">
レガシー実装または <code>OpenMetricsBaseCheck</code> インターフェイスのカスタムチェックガイドをお探しの場合は、<a href="https://docs.datadoghq.com/developers/faq/legacy-openmetrics/">Custom Legacy OpenMetrics Check</a> をご覧ください。
</div>

## 高度な使用方法: OpenMetrics チェックインターフェイス

汎用のチェックより高度なチェック (メトリクスの前処理など) が必要な場合は、カスタム `OpenMetricsBaseCheckV2` を作成してください。これは汎用チェックの[基本クラス][3]です。Prometheus で公開されるメトリクス、イベント、サービスチェックを収集するための構造とヘルパーを提供します。このクラスに基づいてチェックを構成するには、少なくとも以下が必要です。

- `namespace` と `metrics` マッピングを使用したデフォルトインスタンスの作成。
- `check()` メソッドの実装および/または
- 処理される OpenMetric メトリクスの名前を付けたメソッドの作成 (例: `self.prometheus_metric_name`)

Prometheus メトリクスである `kong_upstream_target_health` の値をサービスチェックとして使用しているこの [Kong インテグレーションの例][4]をご覧ください。

## カスタム OpenMetrics チェックの書き方

ここでは、簡単な Kong チェックの記述例を示して、`OpenMetricsBaseCheckV2` クラスの使用方法について説明します。次の例は、以下の汎用 Openmetrics チェックの機能を再現します。

```yaml
instances:
  - openmetrics_endpoint: http://localhost:8001/status/
    namespace: "kong"
    metrics:
      - kong_bandwidth: bandwidth
      - kong_http_consumer_status: http.consumer.status
      - kong_http_status: http.status
      - kong_latency:
          name: latency
          type: counter
      - kong_memory_lua_shared_dict_bytes: memory.lua.shared_dict.bytes
      - kong_memory_lua_shared_dict_total_bytes: memory.lua.shared_dict.total_bytes
      - kong_nginx_http_current_connections: nginx.http.current_connections
      - kong_nginx_stream_current_connections: nginx.stream.current_connections
      - kong_stream_status: stream.status
```

### 構成

<div class="alert alert-warning">
構成とチェックファイルは、名前が一致していなければなりません。チェックが <code>mycheck.py</code> という名前なら、構成ファイルは <code>mycheck.yaml</code> という名前にしなければなりません。
</div>

Openmetrics チェックの構成は、標準の [Agent チェック][5]とほぼ同じです。主な違いは、`check.yaml` ファイルに変数 `openmetrics_endpoint` を入れることです。`conf.d/kong.yaml` は以下のようになります。

```yaml
init_config:

instances:
    # Prometheus のメトリクスエンドポイントの URL
  - openmetrics_endpoint: http://localhost:8001/status/
```

### チェックの書き方

すべての OpenMetrics チェックは、[`OpenMetricsBaseCheckV2` クラス][6]を継承します。

```python
from datadog_checks.base import OpenMetricsBaseCheckV2

class KongCheck(OpenMetricsBaseCheckV2):
```

## インテグレーションネームスペースの定義

`__NAMESPACE__` の値は、このインテグレーションによって収集されたすべてのメトリクスとサービスチェックの前に置かれます。

```python
from datadog_checks.base import OpenMetricsBaseCheckV2

class KongCheck(OpenMetricsBaseCheckV2):
    __NAMESPACE__ = "kong"

```

#### メトリクスマッピングの定義

[メトリクス][7]のマッピングでは、メトリクス名の変更とネイティブメトリクスタイプのオーバーライドが可能です。

```python
from datadog_checks.base import OpenMetricsBaseCheckV2

class KongCheck(OpenMetricsBaseCheckV2):
    __NAMESPACE__ = "kong"

    def __init__(self, name, init_config, instances):
        super(KongCheck, self).__init__(name, init_config, instances)

        self.metrics_map =  {
            'kong_bandwidth': 'bandwidth',
            'kong_http_consumer_status': 'http.consumer.status',
            'kong_http_status': 'http.status',
            'kong_latency': {
                'name': 'latency',
                'type': 'counter',
            },
            'kong_memory_lua_shared_dict_bytes': 'memory.lua.shared_dict.bytes',
            'kong_memory_lua_shared_dict_total_bytes': 'memory.lua.shared_dict.total_bytes',
            'kong_nginx_http_current_connections': 'nginx.http.current_connections',
            'kong_nginx_stream_current_connections': 'nginx.stream.current_connections',
            'kong_stream_status': 'stream.status',
        }
```

#### デフォルトインスタンスの定義

デフォルトのインスタンスは、チェックに使用される基本的なコンフィギュレーションです。デフォルトのインスタンスは、`metrics` と `openmetrics_endpoint` をオーバーライドする必要があります。
OpenMetricsBaseCheckV2 の `get_default_config` を、デフォルトのインスタンスで[オーバーライド][8]します。

```python
from datadog_checks.base import OpenMetricsBaseCheckV2

class KongCheck(OpenMetricsBaseCheckV2):
    __NAMESPACE__ = "kong"

    def __init__(self, name, init_config, instances):
        super(KongCheck, self).__init__(name, init_config, instances)

        self.metrics_map = {
            'kong_bandwidth': 'bandwidth',
            'kong_http_consumer_status': 'http.consumer.status',
            'kong_http_status': 'http.status',
            'kong_latency': {
                'name': 'latency',
                'type': 'counter',
            },
            'kong_memory_lua_shared_dict_bytes': 'memory.lua.shared_dict.bytes',
            'kong_memory_lua_shared_dict_total_bytes': 'memory.lua.shared_dict.total_bytes',
            'kong_nginx_http_current_connections': 'nginx.http.current_connections',
            'kong_nginx_stream_current_connections': 'nginx.stream.current_connections',
            'kong_stream_status': 'stream.status',
        }

      def get_default_config(self):
            return {'metrics': self.metrics_map}
```


#### check メソッドの実装

さらに機能を実装したい場合は、`check()` 関数をオーバーライドします。

`instance` から、メトリクスをポーリングするための Prometheus または OpenMetrics のメトリクスエンドポイント `endpoint` を使用します。

```python
def check(self, instance):
    endpoint = instance.get('openmetrics_endpoint')
```


##### 例外

不正なコンフィギュレーション、プログラミングエラー、メトリクスを収集できないなどの理由でチェックを実行できない場合は、わかりやすい例外を生成する必要があります。デバッグのために、この例外はログに記録され、Agent の[ステータスコマンド][9]に表示されます。以下に例を示します。

    $ sudo /etc/init.d/datadog-agent info

      Checks
      ======

        my_custom_check
        ---------------
          - instance #0 [ERROR]: Unable to find openmetrics_endpoint in config file.
          - Collected 0 metrics & 0 events

`ConfigurationError` を使用して `check()` メソッドを補強します。

```python
from datadog_checks.base import ConfigurationError

def check(self, instance):
    endpoint = instance.get('openmetrics_endpoint')
    if endpoint is None:
        raise ConfigurationError("Unable to find openmetrics_endpoint in config file.")
```

次に、データを取得するとすぐにフラッシュします。

```python

def check(self, instance):
    endpoint = instance.get('openmetrics_endpoint')
    if endpoint is None:
        raise ConfigurationError("Unable to find openmetrics_endpoint in config file.")

    super().check(instance)
```

### ここまでのまとめ

```python
from datadog_checks.base import OpenMetricsBaseCheckV2
from datadog_checks.base import ConfigurationError

class KongCheck(OpenMetricsBaseCheckV2):
    __NAMESPACE__ = "kong"

    def __init__(self, name, init_config, instances):
        super(KongCheck, self).__init__(name, init_config, instances)

        self.metrics_map = {
            'kong_bandwidth': 'bandwidth',
            'kong_http_consumer_status': 'http.consumer.status',
            'kong_http_status': 'http.status',
            'kong_latency': {
                'name': 'latency',
                'type': 'counter',
            },
            'kong_memory_lua_shared_dict_bytes': 'memory.lua.shared_dict.bytes',
            'kong_memory_lua_shared_dict_total_bytes': 'memory.lua.shared_dict.total_bytes',
            'kong_nginx_http_current_connections': 'nginx.http.current_connections',
            'kong_nginx_stream_current_connections': 'nginx.stream.current_connections',
            'kong_stream_status': 'stream.status',
        }

      def get_default_config(self):
            return {'metrics': self.metrics_map}

      def check(self, instance):
          endpoint = instance.get('openmetrics_endpoint')
          if endpoint is None:
              raise ConfigurationError("Unable to find openmetrics_endpoint in config file.")

          super().check(instance)

```

## さらに改良するには

Prometheus および OpenMetrics の基本インテグレーションに関する詳細は、インテグレーションの[デベロッパ用ドキュメント][10]をご参照ください。

Openmetrics で利用できるすべてのコンフィギュレーションオプションを見るには、[conf.yaml.example][11] を参照してください。
追加のコンフィギュレーションオプションにデフォルト値を含めることで、OpenMetrics のチェック機能を向上させることができます。

`exclude_metrics`
: 一部のメトリクスは、重複していたり、高いカーディナリティをもたらすため、無視されます。このリストに含まれるメトリクスは、ログに `Unable to handle metric` というデバッグ行が表示されることなく、静かにスキップされます。
特定のフィルターにマッチするもの以外のすべてのメトリクスを除外するには、` - ^(?!foo).*$` のような負のルックアヘッド正規表現を使用します。

`share_labels`
: `share_labels` マッピングが提供された場合、複数のメトリクスでラベルを共有することができます。キーはラベルを共有する公開メトリクスを表し、値は共有の動作を構成するマッピングです。各マッピングは、`labels`、`match`、`values` のキーのうち少なくとも 1 つを持つ必要があります。

`exclude_labels`
: `exclude_labels` は、除外するラベルの配列です。除外されるラベルは、メトリクスの送信時にタグとして追加されません。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/integrations-core/blob/master/kube_dns/datadog_checks/kube_dns/kube_dns.py
[2]: /agent/kubernetes/prometheus/
[3]: https://github.com/DataDog/integrations-core/tree/master/datadog_checks_base/datadog_checks/base/checks/openmetrics/v2
[4]: https://github.com/DataDog/integrations-core/blob/459e8c12a9c828a0b3faff59df69c2e1f083309c/kong/datadog_checks/kong/check.py#L22-L45
[5]: /developers/integrations/
[6]: https://github.com/DataDog/integrations-core/tree/master/datadog_checks_base/datadog_checks/base/checks/openmetrics/v2/base.py
[7]: https://github.com/DataDog/integrations-core/blob/459e8c12a9c828a0b3faff59df69c2e1f083309c/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example#L65-L104
[8]: https://github.com/DataDog/integrations-core/blob/459e8c12a9c828a0b3faff59df69c2e1f083309c/datadog_checks_base/datadog_checks/base/checks/openmetrics/v2/base.py#L86-L87
[9]: /agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[10]: https://datadoghq.dev/integrations-core/base/openmetrics/
[11]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
