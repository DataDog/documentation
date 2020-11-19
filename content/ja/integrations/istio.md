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
  monitors: {}
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

Datadog Agent を使用して Istio のパフォーマンス状況を監視します。

- どのアプリがどのようなリクエストを行っているかに関するメトリクスを収集
- アプリケーションが帯域幅をどの程度使用しているかを確認
- Istio のリソース消費を把握

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照してこの手順を行ってください。

### インストール

Istio は Datadog Agent に含まれています。Istio サーバーまたはクラスターに [Datadog Agent をインストール][2]し、Istio で Agent を指定します。

### コンフィギュレーション

Istio に接続するには、`istio.d/conf.yaml` ファイル ([Agent の構成ディレクトリ][3]のルートにある `conf.d/` フォルダー内) を編集します。使用可能なすべての構成オプションの詳細については、[サンプル istio.d/conf.yaml][4] を参照してください。

#### メトリクスの収集

サポートされているバージョンの Istio メトリクスの収集を開始するには、`istio.d/conf.yaml` ファイルに次のコンフィギュレーションブロックの 1 つを追加します。

1. Istio `v1.5+` の `istiod` デプロイをモニタリングするには、次のコンフィギュレーションを使用します。

    ```yaml
    init_config:

    instances:
      - istiod_endpoint: http://istiod.istio-system:15014/metrics
    ```

   Istio メッシュメトリクスを監視するには、引き続き `istio_mesh_endpoint` を使用します。Istio メッシュメトリクスは、現在対応するオートディスカバリーを使用した `istio-proxy` コンテナからのみ利用可能です。[`istio.d/auto_conf.yaml`][5] を参照してください。

   **注**: メッシュメトリクスを収集するために、Istio `v1.6` 以降に対応する [V1 テレメトリー][6]を有効化してください。

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

それぞれのエンドポイントはオプションですが、少なくとも 1 つ構成する必要があります。Prometheus アダプターの詳細については、[Istio ドキュメント][7]を参照してください。

注: `connectionID` Prometheus ラベルは除外されます。

##### サイドカーインジェクションの無効化

[コンテナに Datadog Agent を][8]インストールする場合は、その前に Istio のサイドカーインジェクションを無効にすることをお勧めします。

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

Istio には 2 種類のログがあります。[Envoy インテグレーション][9]で収集される Envoy アクセスログと、[Istio ログ][10] です。 

_Agent バージョン 6.0 以降で利用可能_

[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。
Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集のドキュメント][11]を参照してください。

| パラメーター      | 値                                                |
| -------------- | ---------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "istio", "service": "<サービス名>"}` |

### 検証

[Agent の `info` サブコマンドを実行][12]し、Checks セクションで `istio` を探します。

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

ご不明な点は、[Datadog のサポートチーム][14]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog を使用した Istio サービスメッシュの監視][15]
- [Datadog でキーメトリクスを収集して Istio を監視する][16]

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/istio/datadog_checks/istio/data/conf.yaml.example
[5]: https://github.com/DataDog/integrations-core/blob/master/istio/datadog_checks/istio/data/auto_conf.yaml
[6]: https://istio.io/latest/docs/tasks/observability/mixer/metrics/collecting-metrics/#before-you-begin
[7]: https://istio.io/docs/tasks/telemetry/metrics/querying-metrics
[8]: https://docs.datadoghq.com/ja/agent/kubernetes/
[9]: https://docs.datadoghq.com/ja/integrations/envoy/#log-collection
[10]: https://istio.io/docs/tasks/telemetry/logs/collecting-logs/
[11]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
[12]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[13]: https://github.com/DataDog/integrations-core/blob/master/istio/metadata.csv
[14]: https://docs.datadoghq.com/ja/help/
[15]: https://www.datadoghq.com/blog/monitor-istio-with-datadog
[16]: https://www.datadoghq.com/blog/istio-metrics/