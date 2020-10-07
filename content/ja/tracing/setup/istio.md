---
title: Istio
kind: documentation
further_reading:
  - link: /tracing/visualization/
    tag: APM の UI を利用する
    text: サービス、リソース、トレースを調査する
  - link: 'https://istio.io/'
    tag: Documentation
    text: Istio ウェブサイト
  - link: 'https://istio.io/docs/'
    tag: Documentation
    text: Istio ドキュメント
  - link: 'https://github.com/DataDog/dd-opentracing-cpp'
    tag: ソースコード
    text: Datadog OpenTracing C++ クライアント
aliases:
  - /ja/tracing/istio/
---
Datadog APM は Istio v1.1.3 以降のバージョンに対応しており、Kubernetes クラスター上でご利用いただけます。

## 構成

### Datadog Agent のインストール

1. [Agent をインストールします][1]。
2. [APM が Agent に対して有効化されていることを確認します][2]。
3. `hostPort` 設定のコメントを解除し、Istio のサイドカーが Agent に接続してトレースを送信できるようにします。


### Istio のコンフィギュレーションとインストール

Datadog APM を有効化するには、[Istio のカスタムインストール][3]で Istio のインストール時に 2 つのオプションを設定する必要があります。

- `--set values.global.proxy.tracer=datadog`
- `--set values.pilot.traceSampling=100.0`

```shell
istioctl manifest apply --set values.global.proxy.tracer=datadog --set values.pilot.traceSampling=100.0
```

ポッドのネームスペースでサイドカーインジェクションが有効化されると、トレースが生成されます。これを行うには `istio-injection=enabled` ラベルを追加する必要があります。

```shell
kubectl label namespace example-ns istio-injection=enabled
```

トラフィックに HTTP ベースのプロトコルが使用されていることを Istio が確認するとトレースが生成されます。
デフォルトでは、Istio はこの検知を自動で行います。お使いのアプリケーションのデプロイとサービスでポートに名前を設定し、手動で構成することも可能です。詳しくは[プロトコルの選択][4]に関する Istio のドキュメントを参照してください。

デフォルトの場合、トレース作成時に用いられるサービス名はデプロイ名とネームスペースをもとに生成されます。これは
デプロイのポッドテンプレートに `app` ラベルを追加することで手動で設定できます。

```yaml
template:
  metadata:
    labels:
      app: <SERVICE_NAME>
```

[CronJobs][5] では、`app` ラベルはジョブテンプレートに追加されます。これは生成される名称が、より高い階層に位置する `CronJob` ではなく
`Job` に由来するためです。

### 環境変数

Istio サイドカーの環境変数は `apm.datadoghq.com/env` アノテーションを使用してデプロイごとに設定することができます。
```yaml
    metadata:
      annotations:
        apm.datadoghq.com/env: '{ "DD_ENV": "prod", "DD_TRACE_ANALYTICS_ENABLED": "true" }'
```

利用可能な[環境変数][6]は、Istio サイドカーのプロキシに埋め込まれた C++ トレーサーのバージョンによって異なります。

| Istio バージョン | C++ トレーサーバージョン |
|---------------|--------------------|
| v1.6.x | v1.1.3 |
| v1.5.x | v1.1.1 |
| v1.4.x | v1.1.1 |
| v1.3.x | v1.1.1 |
| v1.2.x | v0.4.2 |
| v1.1.3 | v0.4.2 |


### Agent をデプロイおよびサービスとして実行

クラスター上の Agent がデフォルトの DaemonSet ではなくデプロイおよびサービスとして実行されている場合は、DNS アドレスと Agent のポートを指定するための追加オプションが必要です。
`default` ネームスペース内のサービス `datadog-agent` の場合、アドレスは `datadog-agent.default.svc.cluster.local:8126` のようになります。

- `--set values.global.tracer.datadog.address=datadog-agent.default:8126`

クラスターで Mutual TLS が有効化されている場合は、Agent のデプロイでサイドカーインジェクションを無効化し、TLS を無効にするトラフィックポリシーを追加する必要があります。

このアノテーションを Agent のデプロイテンプレートに追加します。
```
  template:
    metadata:
      annotations:
        sidecar.istio.io/inject: "false"
```

Istio v1.4.x の場合、トラフィックポリシーは DestinationRule を使用して構成することができます。Istio v1.5.x 以上ではトラフィックポリシーの追加は不要です。
```
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: datadog-agent
  namespace: istio-system
spec:
  host: datadog-agent.default.svc.cluster.local
  trafficPolicy:
    tls:
      mode: DISABLE
```

プロトコルの自動選択でサイドカーと Agent 間のトラフィックが HTTP であることを確認し、トレーシングを有効にすることができます。この機能を利用すると、この特定のサービスについての[プロトコルの手動選択][7]が無効化されます。`datadog-agent` サービス内のポート名は `tcp-traceport` に変更可能です。
Kubernetes 1.18+ を使用している場合は、ポートの指定に `appProtocol: tcp` を追加できます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/kubernetes/
[2]: /ja/agent/kubernetes/apm/
[3]: https://istio.io/docs/setup/install/istioctl/
[4]: https://istio.io/docs/ops/configuration/traffic-management/protocol-selection/
[5]: https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/
[6]: /ja/tracing/setup/cpp/#environment-variables
[7]: https://istio.io/docs/ops/configuration/traffic-management/protocol-selection/#manual-protocol-selection