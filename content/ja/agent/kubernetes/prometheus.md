---
title: Kubernetes Prometheus および OpenMetrics メトリクスの収集
kind: ドキュメント
aliases:
  - /ja/getting_started/prometheus
  - /ja/getting_started/integrations/prometheus
  - /ja/agent/openmetrics
  - /ja/agent/prometheus
further_reading:
  - link: /agent/kubernetes/log/
    tag: ドキュメント
    text: アプリケーションログの収集
  - link: /agent/kubernetes/apm/
    tag: ドキュメント
    text: アプリケーショントレースの収集
  - link: /agent/kubernetes/integrations/
    tag: ドキュメント
    text: アプリケーションのメトリクスとログを自動で収集
  - link: /agent/guide/autodiscovery-management/
    tag: ドキュメント
    text: データ収集をコンテナのサブセットのみに制限
  - link: /agent/kubernetes/tag/
    tag: ドキュメント
    text: コンテナから送信された全データにタグを割り当て
  - link: /integrations/guide/prometheus-metrics/
    tag: Documentation
    text: Datadog メトリクスにおける Prometheus メトリクスのマッピング
---
Datadog Agent と [Datadog-OpenMetrics][1] または [Datadog-Prometheus][2] インテグレーションを併用して、Kubernetes 内で実行されているアプリケーションから、公開されている Prometheus および OpenMetrics メトリクスを収集します。

## 概要

バージョン 6.5.0 より、Agent には [OpenMetrics][3] および [Prometheus][4] チェックが用意され、Prometheus エンドポイントをスクレイピングできます。Prometheus テキスト形式を効率よくフルにサポートできるため、Datadog では OpenMetrics チェックの 使用をお勧めします。カスタムチェックの記述を含む `OpenMetricsCheck` インターフェイスの高度な使用方法については、[開発ツール][5]のセクションを参照してください。Prometheus チェックは、メトリクスのエンドポイントがテキスト形式をサポートしていない場合にのみ使用してください。

このページでは、このチェックの基本的な使用方法について説明します。これにより、カスタムメトリクスを Prometheus エンドポイントからスクレイピングできるようになります。

Datadog メトリクスにおける Prometheus および OpenMetrics メトリクスのマッピング方法に関する詳細は、[Datadog メトリクスにおける Prometheus メトリクスのマッピング][6]ガイドを参照してください。

## セットアップ

### インストール

[Kubernetes クラスターに Datadog Agent をデプロイします][7]。OpenMetrics および Prometheus チェックは [Datadog Agent][8] パッケージに含まれています。コンテナまたはホストに追加でインストールする必要はありません。

### 構成

OpenMetrics/Prometheus **ポッド** に以下の `annotations` を適用し、オートディスカバリーを使用して OpenMetrics または Prometheus チェックを構成します。

```yaml
# (...)
metadata:
    #(...)
    annotations:
        ad.datadoghq.com/<CONTAINER_IDENTIFIER>.check_names: |
            ["openmetrics"]
        ad.datadoghq.com/<CONTAINER_IDENTIFIER>.init_configs: |
            [{}]
        ad.datadoghq.com/<CONTAINER_IDENTIFIER>.instances: |
            [
              {
                "prometheus_url": "http://%%host%%:%%port%%/<PROMETHEUS_ENDPOINT> ",
                "namespace": "<METRICS_NAMESPACE_PREFIX_FOR_DATADOG>",
                "metrics": [{"<METRIC_TO_FETCH>":"<NEW_METRIC_NAME>"}]
              }
            ]
spec:
    containers:
        - name: '<CONTAINER_IDENTIFIER>'
```

コンフィギュレーションには次のプレースホルダー値を使用します。

| プレースホルダー                              | 説明                                                                                                                                                                                                    |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<PROMETHEUS_PORT>`                      | Prometheus エンドポイントにアクセスするための接続先ポート。                                                                                                                                                 |
| `<PROMETHEUS_ENDPOINT>`                  | コンテナによって処理されたメトリクスの URL (Prometheus 形式)。                                                                                                                                             |
| `<METRICS_NAMESPACE_PREFIX_FOR_DATADOG>` | Datadog で表示するときに、すべてのメトリクスの前にネームスペースを付加します。                                                                                                                                           |
| `<METRIC_TO_FETCH>`                      | Prometheus エンドポイントから取得される Prometheus メトリクスキー。                                                                                                                                             |
| `<NEW_METRIC_NAME>`                      | オプションパラメーター。設定すると、`<METRIC_TO_FETCH>` メトリクスキーは Datadog の `<NEW_METRIC_NAME>` に変換されます。このオプションを使用しない場合は、`key:value` ペアではなく、文字列のリストを渡します。 |

`namespace` や `metrics` を含むインスタンスで使用可能なパラメーターのリストについては、see the table in the [Prometheus ホスト収集ガイド][9]の表を参照してください。


## はじめに

### シンプルなメトリクスの収集

1. [Datadog Agent を起動します][10]。

2. [この Prometheus DaemonSet `prometheus.yaml`][11] を使用して、設定済みのオートディスカバリーコンフィギュレーションで Prometheus ポッドを起動します。

    オートディスカバリーのコンフィギュレーション:

    ```yaml
     # (...)
    spec:
      replicas: 2
      selector:
        matchLabels:
          app: prometheus
          purpose: example
      template:
        metadata:
          labels:
            app: prometheus
            purpose: example
          annotations:
              ad.datadoghq.com/prometheus-example.check_names: |
                ["openmetrics"]
              ad.datadoghq.com/prometheus-example.init_configs: |
                [{}]
              ad.datadoghq.com/prometheus-example.instances: |
                [
                  {
                    "prometheus_url": "http://%%host%%:%%port%%/metrics",
                    "namespace": "documentation_example_kubernetes",
                    "metrics": [ {"promhttp_metric_handler_requests_total": "prometheus.handler.requests.total"}]
                  }
                ]
      # (...)
    ```

     Prometheus ポッドの作成コマンド:

    ```shell
    kubectl create -f prometheus.yaml
    ```

3. [メトリクスの概要][12]ページに移動して、収集されたメトリクス `prometheus_target_interval_length_seconds*` を確認します。

    {{< img src="integrations/guide/prometheus_kubernetes/prometheus_collected_metric_kubernetes.png" alt="Kubernetes で収集された Prometheus メトリクス">}}

## カスタムインテグレーションを公式インテグレーションに

デフォルトでは、汎用の Prometheus チェックによって取得されるすべてのメトリクスが、カスタムメトリクスだと見なされます。既製ソフトウェアを監視されて、公式のインテグレーションにするべきだと思われた場合は、[ぜひご提供をお願いします][5]。

公式インテグレーションは、それぞれ専用のディレクトリを持ちます。汎用のチェックには、デフォルトの構成とメトリクスメタデータをハードコードするためのデフォルトのインスタンスメカニズムがあります。たとえば、[kube-proxy][13] インテグレーションを参照します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/openmetrics/
[2]: /ja/integrations/prometheus/
[3]: https://github.com/DataDog/integrations-core/tree/master/openmetrics
[4]: https://github.com/DataDog/integrations-core/tree/master/prometheus
[5]: /ja/developers/prometheus/
[6]: /ja/integrations/guide/prometheus-metrics
[7]: /ja/agent/kubernetes/#installation
[8]: /ja/getting_started/tagging/
[9]: /ja/integrations/guide/prometheus-host-collection/#parameters-available
[10]: https://app.datadoghq.com/account/settings#agent/kubernetes
[11]: /resources/yaml/prometheus.yaml
[12]: https://app.datadoghq.com/metric/summary
[13]: https://github.com/DataDog/integrations-core/tree/master/kube_proxy