---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Istio Overview 1.5: assets/dashboards/istio_1_5_overview.json
    Istio base dashboard: assets/dashboards/istio_overview.json
  logs:
    source: istio
  metrics_metadata: metadata.csv
  monitors:
    Failed sidecar injections: assets/monitors/failed_sidecar_injection.json
  service_checks: assets/service_checks.json
categories:
  - data store
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/istio/README.md'
description: istio インテグレーションで、istio サービスメッシュおよびミキサーからデータを収集。
display_name: Istio
draft: false
git_integration_title: istio
guid: d8bd53c0-0884-4357-9517-11858bf6aa9d
integration_id: istio
integration_title: Istio
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: istio.
metric_to_check:
  - istio.mixer.process.cpu_seconds_total
  - istio.mesh.request.count
  - istio.galley.endpoint_no_pod
name: istio
public_title: Datadog-Istio インテグレーション
short_description: パフォーマンススキーマメトリクス、クエリスループット、カスタムメトリクスなどを収集。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Datadog は、Istio 環境のあらゆる側面を監視するため、以下を実現できます。
- ログを使用して、Envoy および Istio の Control Plane の健全性を評価 ([以下を参照](#log-collection))。
- リクエスト、帯域幅、リソース消費のメトリクスでサービスメッシュのパフォーマンスを詳しく確認 ([以下を参照](#metrics))。
- [ネットワークパフォーマンスモニタリング][1]で、コンテナ、ポッド、サービス間のネットワークコミュニケーションをメッシュ状にマッピング。
- [APM[[2] でメッシュを実行してアプリケーションの分散型トレースの詳細を確認。

Istio 環境での Datadog の使用について、詳細は [Istio のブログをご参照ください][3]。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][4]のガイドを参照してこの手順を行ってください。

### インストール

Istio は Datadog Agent に含まれています。Istio サーバーまたはクラスターに [Datadog Agent をインストール][5]し、Istio で Agent を指定します。

### コンフィギュレーション

Istio に接続するには、`istio.d/conf.yaml` ファイル ([Agent のコンフィギュレーションディレクトリ][6]のルートにある `conf.d/` フォルダー内) を編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル istio.d/conf.yaml][7] を参照してください。

#### メトリクスの収集

サポートされているバージョンの Istio メトリクスの収集を開始するには、`istio.d/conf.yaml` ファイルに次のコンフィギュレーションブロックの 1 つを追加します。

1. Istio `v1.5+` の `istiod` デプロイをモニタリングするには、次のコンフィギュレーションを使用します。

    ```yaml
    init_config:

    instances:
      - istiod_endpoint: http://istiod.istio-system:15014/metrics
    ```

   Istio メッシュメトリクスを監視するには、引き続き `istio_mesh_endpoint` を使用します。Istio メッシュメトリクスは、現在対応するオートディスカバリーを使用した `istio-proxy` コンテナからのみ利用可能です。[`istio.d/auto_conf.yaml`][8] を参照してください。

   **注**: メッシュメトリクスを収集するため、Istio `v1.6` 以降に対応する [V1 テレメトリー][9]を有効化してください。

2. Istio バージョン `v1.4` 以前をモニタリングするには、次のコンフィギュレーションを使用します。
    ```yaml
    init_config:

    instances:
      - istio_mesh_endpoint: http://istio-telemetry.istio-system:42422/metrics
        mixer_endpoint: http://istio-telemetry.istio-system:15014/metrics
        galley_endpoint: http://istio-galley.istio-system:15014/metrics
        pilot_endpoint: http://istio-pilot.istio-system:15014/metrics
        citadel_endpoint: http://istio-citadel.istio-system:15014/metrics
        send_histograms_buckets: true
    ```

それぞれのエンドポイントはオプションですが、少なくとも 1 つ構成する必要があります。Prometheus アダプターの詳細については、[Istio ドキュメント][10]を参照してください。

注: `connectionID` Prometheus ラベルは除外されます。

##### Datadog Agent ポッドのサイドカーインジェクションを無効化

[コンテナに Datadog Agent を][11]インストールする場合は、その前に Istio のサイドカーインジェクションを無効にすることをお勧めします。

`sidecar.istio.io/inject: "false"` 注釈を `datadog-agent` DaemonSet に追加します。

```yaml
...
spec:
   ...
  template:
    metadata:
      annotations:
        sidecar.istio.io/inject: "false"
     ...
```

これは、`kubectl patch` コマンドでも実行できます。

```text
kubectl patch daemonset datadog-agent -p '{"spec":{"template":{"metadata":{"annotations":{"sidecar.istio.io/inject":"false"}}}}}'
```

#### ログの収集

Istio には 2 種類のログがあります。[Envoy インテグレーション][12]、あるいは [Istio logs][13]で収集される Envoy アクセスログです。 

_Agent バージョン 6.0 以降で利用可能_

[オートディスカバリーのインテグレーションテンプレート][4]のガイドを参照して、次のパラメーターを適用してください。
Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集のドキュメント][14]を参照してください。

| パラメーター      | 値                                                |
| -------------- | ---------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "istio", "service": "<サービス名>"}` |

### 検証

[Agent の `info` サブコマンドを実行][15]し、Checks セクションで `istio` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "istio" >}}


### イベント

Istio チェックには、イベントは含まれません。

### サービスのチェック

Istio バージョン `1.5` 以降の場合

**istio.prometheus.health**: <br>
Agent がメトリクスのエンドポイントに到達できない場合は `CRITICAL` を返します。それ以外の場合は、`OK` を返します。

Istio の他のすべてのバージョンの場合

**istio.pilot.prometheus.health**:<br>
Agent がメトリクスのエンドポイントに到達できない場合は `CRITICAL` を返します。それ以外の場合は、`OK` を返します。

**istio.galley.prometheus.health**:<br>
Agent がメトリクスのエンドポイントに到達できない場合は `CRITICAL` を返します。それ以外の場合は、`OK` を返します。

**istio.citadel.prometheus.health**:<br>
Agent がメトリクスのエンドポイントに到達できない場合は `CRITICAL` を返します。それ以外の場合は、`OK` を返します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][17]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog を使用した Istio サービスメッシュの監視][18]
- [Datadog でキーメトリクスを収集して Istio を監視する][19]
- [Datadog を使用した Istio の監視方法][3]

[1]: https://www.datadoghq.com/blog/monitor-istio-with-npm/
[2]: https://docs.datadoghq.com/ja/tracing/setup_overview/proxy_setup/?tab=istio
[3]: https://www.datadoghq.com/blog/istio-datadog/
[4]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[5]: https://app.datadoghq.com/account/settings#agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-core/blob/master/istio/datadog_checks/istio/data/conf.yaml.example
[8]: https://github.com/DataDog/integrations-core/blob/master/istio/datadog_checks/istio/data/auto_conf.yaml
[9]: https://istio.io/v1.1/docs/tasks/telemetry/
[10]: https://istio.io/docs/tasks/telemetry/metrics/querying-metrics
[11]: https://docs.datadoghq.com/ja/agent/kubernetes/
[12]: https://docs.datadoghq.com/ja/integrations/envoy/#log-collection
[13]: https://istio.io/docs/tasks/telemetry/logs/collecting-logs/
[14]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
[15]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[16]: https://github.com/DataDog/integrations-core/blob/master/istio/metadata.csv
[17]: https://docs.datadoghq.com/ja/help/
[18]: https://www.datadoghq.com/blog/monitor-istio-with-datadog
[19]: https://www.datadoghq.com/blog/istio-metrics/