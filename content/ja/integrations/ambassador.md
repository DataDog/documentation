---
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - Cloud
  - orchestration
  - containers
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/ambassador/README.md'
display_name: Ambassador
git_integration_title: ambassador
guid: 71936a65-1a8c-4f6e-a18e-f71d4236182b
integration_id: ambassador
integration_title: Ambassador API Gateway
is_public: true
kind: integration
maintainer: hello@datawire.io
manifest_version: 1.0.0
metric_prefix: envoy.
metric_to_check: envoy.server.live
name: ambassador
public_title: Datadog-Ambassador API Gateway インテグレーション
short_description: Ambassador - Envoy 上に構築された Kubernetes ネイティブのオープンソース API ゲートウェイ on Envoy
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

[Ambassador][1] からリアルタイムにメトリクスを取得すると、以下のことができます。

* マイクロサービスのパフォーマンスを視覚化できます。

* Ambassador を使用してカナリアロールアウトを行うことができるため、サービスの新しいバージョンの影響を把握できます。

![スナップショット][2]

## セットアップ

デフォルトで、Ambassador は自身のポッド上に `statsd` サイドカーをインストールします。このサイドカーは、`statsd` メトリクスを `statsd-sink` という名前の Kubernetes サービスに転送します。

1. 以下の構成で `datadog-statsd-sink.yaml` ファイルを作成します。API キーは、ご使用の API キーに置き換えてください。

    ```
    ---
    apiVersion: apps/v1
    kind: Deployment
    metadata:
     name: statsd-sink
    spec:
      selector:
        matchLabels:
          service: statsd-sink
     replicas: 1
     template:
       metadata:
         labels:
           service: statsd-sink
       spec:
         containers:
         - name: statsd-sink
           image: datadog/docker-dd-agent:latest
           ports:
             - containerPort: 8125
               name: dogstatsdport
               protocol: UDP
           env:
             - name: API_KEY
               value: "<YOUR_DATADOG_API_KEY>"
             - name: KUBERNETES
               value: "yes"
             - name: SD_BACKEND
               value: docker
         restartPolicy: Always
    status: {}
    ---
    apiVersion: v1
    kind: Service
    metadata:
     labels:
       service: statsd-sink
     name: statsd-sink
    spec:
     ports:
        - protocol: UDP
          port: 8125
          name: dogstatsdport
     selector:
       service: statsd-sink
    ```

2. Agent を Kubernetes にデプロイします。

    ```
    kubectl apply -f datadog-statsd-sink.yaml
    ```

3. Ambassador 内を何らかのトラフィックが流れるとすぐに、メトリクスが表示されます。

## 収集データ

### メトリクス
{{< get-metrics-from-git "ambassador" >}}


### イベント

Ambassador チェックには、イベントは含まれません。

### サービスのチェック

Ambassador チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://www.getambassador.io
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ambassador/images/upstream-req-time.png
[3]: https://github.com/DataDog/integrations-extras/blob/master/ambassador/metadata.csv
[4]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}