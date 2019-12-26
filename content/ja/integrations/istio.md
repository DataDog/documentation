---
assets:
  dashboards:
    Istio base dashboard: assets/dashboards/istio_overview.json
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/istio/README.md'
description: istio インテグレーションは、istio サービスメッシュおよびミキサーからデータを収集します。
display_name: Istio
git_integration_title: istio
guid: d8bd53c0-0884-4357-9517-11858bf6aa9d
integration_id: istio
integration_title: Istio
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: istio.
metric_to_check: istio.mixer.process.cpu_seconds_total
name: istio
public_title: Datadog-Istio インテグレーション
short_description: パフォーマンススキーマメトリクス、クエリスループット、カスタムメトリクスなどを収集 and more.
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Datadog Agent を使用して Istio のパフォーマンス状況を監視します。

* どのアプリがどのようなリクエストを行っているかに関するメトリクスを収集
* アプリケーションが帯域幅をどの程度使用しているかを確認
* Istio のリソース消費を把握

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照してこの手順を行ってください。

### インストール

Istio は Datadog Agent に含まれています。Istio サーバーまたはクラスターに [Datadog Agent をインストール][2]し、Istio で Agent を指定します。

### コンフィグレーション

Istio に接続するには、`istio.d/conf.yaml` ファイル ([Agent の構成ディレクトリ][3]のルートにある `conf.d/` フォルダー内) を編集します。使用可能なすべての構成オプションの詳細については、[サンプル istio.d/conf.yaml][4] を参照してください。

#### メトリクスの収集

Istio のメトリクスの収集を開始するには、`istio.d/conf.yaml` ファイルに次の構成ブロックを追加します。

```
init_config:

instances:
  - istio_mesh_endpoint: http://istio-telemetry.istio-system:42422/metrics
    mixer_endpoint: http://istio-telemetry.istio-system:15014/metrics
    galley_endpoint: http://istio-galley.istio-system:15014/metrics
    pilot_endpoint: http://istio-pilot.istio-system:15014/metrics
    citadel_endpoint: http://istio-citadel.istio-system:15014/metrics
    send_histograms_buckets: true
```

それぞれのエンドポイントはオプションですが、少なくとも 1 つ構成する必要があります。Prometheus アダプターの詳細については、[Istio ドキュメント][5]を参照してください。

##### サイドカーインジェクションの無効化

[コンテナに Datadog Agent を][10]インストールする場合は、その前に Istio のサイドカーインジェクションを無効にすることをお勧めします。

`sidecar.istio.io/inject: "false"` 注釈を `datadog-agent` DaemonSet に追加します。

```
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

```
kubectl patch daemonset datadog-agent -p '{"spec":{"template":{"metadata":{"annotations":{"sidecar.istio.io/inject":"false"}}}}}'
```

#### ログの収集

Istio には 2 種類のログがあります。[Envoy インテグレーション][12] 、あるいは [Istio logs][11]で収集される Envoy アクセスログです。 

**Agent 6.0 以上で使用可能**

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、[daemonset 構成][4]でこれを有効にします。

    ```
      (...)
        env:
          (...)
          - name: DD_LOGS_ENABLED
              value: "true"
          - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
              value: "true"
      (...)
    ```

2. [こちらのマニフェスト][5]のように、Docker ソケットを Datadog Agent にマウントします。docker を使用していない場合は `/var/log/pods` ディレクトリをマウントします。

3. [Agent を再起動します][2]。


### 検証

[Agent の `info` サブコマンドを実行][6]し、Checks セクションの `istio` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "istio" >}}


### イベント
Istio チェックには、イベントは含まれません。

### サービスのチェック
Istio チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

## その他の参考資料
お役に立つドキュメント、リンクや記事:

- [Datadog を使用した Istio サービスメッシュの監視][9]

[1]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/istio/datadog_checks/istio/data/conf.yaml.example
[5]: https://istio.io/docs/tasks/telemetry/metrics/querying-metrics
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/istio/metadata.csv
[8]: https://docs.datadoghq.com/ja/help
[9]: https://www.datadoghq.com/blog/monitor-istio-with-datadog
[10]: https://docs.datadoghq.com/ja/agent/kubernetes
[11]: https://istio.io/docs/tasks/telemetry/logs/collecting-logs/
[12]: https://docs.datadoghq.com/ja/integrations/envoy/#log-collection


{{< get-dependencies >}}