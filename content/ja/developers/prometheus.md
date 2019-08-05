---
title: カスタム Prometheus チェックの書き方
kind: documentation
further_reading:
  - link: agent/prometheus
    tag: Documentation
    text: Prometheus チェックの構成
  - link: developers/agent_checks
    tag: Documentation
    text: カスタムチェックの書き方
  - link: developers/integrations/
    tag: Documentation
    text: 新しいインテグレーションの設定
aliases:
  - /ja/developers/openmetrics/
---
## 概要

ここでは、[Kube DNS][1] からタイミングメトリクスとステータスイベントを収集する簡単なチェックを例に挙げて、`PrometheusCheck` インターフェイスの高度な使用方法について説明します。基本的な Prometheus チェックの構成については、[Agent に関するドキュメント][2]を参照してください。

## 高度な使用方法: Prometheus チェックインターフェイス

汎用のチェックより高度なチェック (たとえば、メトリクスの前処理) が必要な場合は、カスタム `PrometheusCheck` を作成できます。これは汎用チェックの[基本クラス][3]です。Prometheus から公開されるメトリクス、イベント、サービスチェックを収集するための構造とヘルパーを提供します。このクラスに基づいてチェックを構成するには、少なくとも以下が必要です。

- `self.NAMESPACE` のオーバーライド
- `self.metrics_mapper` のオーバーライド
- `check()` メソッドの実装
および/または
- チェックで処理する Prometheus メトリクスの名前を付けたメソッドの作成 (例: `self.prometheus_metric_name`)

## カスタム Prometheus チェックの書き方

ここでは、簡単な kube DNS チェックの記述例を示して、`PrometheusCheck` クラスの使用方法について説明します。次の例は、以下の汎用 Prometheus チェックの機能を再現します。

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

### コンフィグレーション

<div class="alert alert-warning">
構成とチェックファイルは、名前が一致していなければなりません。チェックが <code>mycheck.py</code> という名前なら、構成ファイルは <code>mycheck.yaml</code> という名前にしなければなりません。
</div>

Prometheus チェックの構成は、標準の [Agent チェック][4]とほぼ同じです。主な違いは、`check.yaml` ファイルに変数 `prometheus_endpoint` を入れることです。`conf.d/kube_dns.yaml` は以下のようになります。

```yaml
init_config:

instances:
    # Prometheus のメトリクスエンドポイントの URL
  - prometheus_endpoint: http://localhost:10055/metrics
```

### チェックの書き方
すべての Prometheus チェックは、`checks/prometheus_check.py` にある `PrometheusCheck` クラスを継承します。

```python
from datadog_checks.checks.prometheus import PrometheusCheck

class KubeDNSCheck(PrometheusCheck):
```

#### `self.NAMESPACE` のオーバーライド

`NAMESPACE` は、メトリクスが持つプレフィックスです。これをチェッククラスでハードコードする必要があります。

```python
from datadog_checks.checks.prometheus import PrometheusCheck

class KubeDNSCheck(PrometheusCheck):
    def __init__(self, name, init_config, agentConfig, instances=None):
        super(KubeDNSCheck, self).__init__(name, init_config, agentConfig, instances)
        self.NAMESPACE = 'kubedns'
```

#### `self.metrics_mapper` のオーバーライド

`metrics_mapper` は、取得するメトリクスをキーとし、対応する Datadog メトリクス名を値とする辞書です。
これをオーバーライドするのは、Prometheus チェックによって報告されるメトリクスが[カスタムメトリクス][5]としてカウントされないようにするためです。

```python
from datadog_checks.checks.prometheus import PrometheusCheck

class KubeDNSCheck(PrometheusCheck):
    def __init__(self, name, init_config, agentConfig, instances=None):
        super(KubeDNSCheck, self).__init__(name, init_config, agentConfig, instances)
        self.NAMESPACE = 'kubedns'
        self.metrics_mapper = {
            # kubernetes 1.6.0 でメトリクスの名前が kubedns に変更されました
            'kubedns_kubedns_dns_response_size_bytes': 'response_size.bytes',
            'kubedns_kubedns_dns_request_duration_seconds': 'request_duration.seconds',
            'kubedns_kubedns_dns_request_count_total': 'request_count',
            'kubedns_kubedns_dns_error_count_total': 'error_count',
            'kubedns_kubedns_dns_cachemiss_count_total': 'cachemiss_count'
        }
```

#### check メソッドの実装

`instance` から、メトリクスをポーリングするための Prometheus メトリクスエンドポイント `endpoint` のみが必要です。

```python
def check(self, instance):
    endpoint = instance.get('prometheus_endpoint')
```

##### 例外

不正な構成、プログラミングエラー、メトリクスを収集できないなどの理由でチェックを実行できない場合は、わかりやすい例外を生成する必要があります。デバッグが容易になるように、この例外はログに記録され、Agent の[ステータスコマンド][6]に表示されます。以下に例を示します。

    $ sudo /etc/init.d/datadog-agent info

      Checks
      ======

        my_custom_check
        ---------------
          - instance #0 [ERROR]: Unable to find prometheus_endpoint in config file.
          - Collected 0 metrics & 0 events

`CheckException` を使用して `check()` メソッドを補強します。

```python
from datadog_checks.errors import CheckException

def check(self, instance):
    endpoint = instance.get('prometheus_endpoint')
    if endpoint is None:
        raise CheckException("Unable to find prometheus_endpoint in config file.")
```

次に、データを取得したらフラッシュします。

```python
from datadog_checks.errors import CheckException

def check(self, instance):
    endpoint = instance.get('prometheus_endpoint')
    if endpoint is None:
        raise CheckException("Unable to find prometheus_endpoint in config file.")
    # デフォルトでは、バケットを送信します。
    if send_buckets is not None and str(send_buckets).lower() == 'false':
        send_buckets = False
    else:
        send_buckets = True

    self.process(endpoint, send_histograms_buckets=send_buckets, instance=instance)
```

### ここまでのまとめ

```python
from datadog_checks.errors import CheckException
from datadog_checks.checks.prometheus import PrometheusCheck

class KubeDNSCheck(PrometheusCheck):
    """
    Prometheus からの kube-dns メトリクスの収集
    """
    def __init__(self, name, init_config, agentConfig, instances=None):
        super(KubeDNSCheck, self).__init__(name, init_config, agentConfig, instances)
        self.NAMESPACE = 'kubedns'

        self.metrics_mapper = {
            # kubernetes 1.6.0 でメトリクスの名前が kubedns に変更されました
            'kubedns_kubedns_dns_response_size_bytes': 'response_size.bytes',
            'kubedns_kubedns_dns_request_duration_seconds': 'request_duration.seconds',
            'kubedns_kubedns_dns_request_count_total': 'request_count',
            'kubedns_kubedns_dns_error_count_total': 'error_count',
            'kubedns_kubedns_dns_cachemiss_count_total': 'cachemiss_count',
        }

    def check(self, instance):
        endpoint = instance.get('prometheus_endpoint')
        if endpoint is None:
            raise CheckException("Unable to find prometheus_endpoint in config file.")

        send_buckets = instance.get('send_histograms_buckets', True)
        # デフォルトでは、バケットを送信します。
        if send_buckets is not None and str(send_buckets).lower() == 'false':
            send_buckets = False
        else:
            send_buckets = True

        self.process(endpoint, send_histograms_buckets=send_buckets, instance=instance)
```

## さらに改良するには

以下のメソッドを使用して、Prometheus チェックをさらに改良できます。

### `self.ignore_metrics`

メトリクスの一部は重複していたり、カーディナリティが非常に高くなるという理由で無視されます。このリストに含まれるメトリクスは、ログに `Unable to handle metric` というデバッグ行を残すことなく、暗黙にスキップされます。

### `self.labels_mapper`

`labels_mapper` 辞書が提供されている場合は、ゲージの送信時に、`labels_mapper` 内のメトリクスラベルに対応する値がタグ名として使用されます。

### `self.exclude_labels`

`exclude_labels` は、除外するラベルの配列です。除外されるラベルは、メトリクスの送信時にタグとして追加されません。

### `self.type_overrides`

`type_overrides` は、Prometheus メトリクス名をキーとし、メトリクスタイプ (文字列の名前) を値とする辞書です。これが、ペイロードにリストされているタイプの代わりに使用されます。タイプが指定されていないメトリクスにタイプを適用するために使用できます。
使用可能なタイプは `counter`、`gauge`、`summary`、`untyped`、`histogram` です。

**注**: これは基本クラスでは空ですが、最終的なチェックではカスタムメトリクスとしてカウントされないように、オーバーロード/ハードコードする必要があります。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/integrations-core/blob/master/kube_dns/datadog_checks/kube_dns/kube_dns.py
[2]: /ja/agent/prometheus
[3]: https://github.com/DataDog/dd-agent/blob/master/checks/prometheus_check.py
[4]: /ja/agent/agent_checks/#configuration
[5]: /ja/developers/metrics/custom_metrics
[6]: /ja/agent/guide/agent-commands/#agent-status-and-information