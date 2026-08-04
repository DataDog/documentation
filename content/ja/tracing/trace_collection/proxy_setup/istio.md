---
aliases:
- /ja/tracing/proxies
- /ja/tracing/setup_overview/istio/
- /ja/tracing/setup_overview/proxy_setup/
code_lang: istio
code_lang_weight: 30
further_reading:
- link: https://istio.io/
  tag: 外部サイト
  text: Istio ウェブサイト
- link: https://istio.io/docs/
  tag: 外部サイト
  text: Istio ドキュメント
- link: https://github.com/DataDog/dd-trace-cpp
  tag: ソースコード
  text: Datadog C++ クライアント
title: Istio のインスツルメント
type: multi-code-lang
---

Datadog は、Istio 環境のあらゆる側面を監視するため、以下を実現できます。
- APM でメッシュを実行してアプリケーションの個々の分散型トレースを表示 (以下を参照)。
- [ログ][1]を使用して、Envoy および Istio の Control Plane の健全性を評価。
- リクエスト、帯域幅、リソース消費の[メトリクス][1]でサービスメッシュのパフォーマンスを詳しく確認。
- メッシュ上のコンテナ、Pod、サービス間のネットワーク通信を [Cloud Network Monitoring][2] で可視化します。

Istio 環境での Datadog の使用について、詳細は [Istio のブログをご参照ください][3]。

Datadog APM は、[対応する Istio のリリース][13]で利用できます。

## Datadog Agent のインストール

1. [Agent のインストール][4]
2. [Agent に APM が有効になっていることを確認します][5]。
3. `hostPort` 設定のコメントを解除し、Istio のサイドカーが Agent に接続してトレースを送信できるようにします。


## Istio のコンフィギュレーションとインストール

Datadog APM を有効にするには、[Istio をカスタムインストール][6]して、Istio のインストール時に 2 つの追加オプションを設定する必要があります。

- `--set values.global.proxy.tracer=datadog`
- `--set values.pilot.traceSampling=100.0`

```shell
istioctl manifest apply --set values.global.proxy.tracer=datadog --set values.pilot.traceSampling=100.0
```

ポッドのネームスペースでサイドカーインジェクションが有効化されると、トレースが生成されます。これを行うには `istio-injection=enabled` ラベルを追加する必要があります。

```shell
kubectl label namespace example-ns istio-injection=enabled
```

Istio で、トラフィックが HTTP ベースのプロトコルを使用していることが判断できると、トレースが生成されます。
デフォルトで、Istio は自動的にこれを検出します。アプリケーションのデプロイメントおよびサービスでポートに名前を付けることで、手動で構成することも可能です。詳細は、Istio のドキュメントの[プロトコルの選択][7]をご確認ください。

デフォルトの場合、トレース作成時に用いられるサービス名はデプロイ名とネームスペースをもとに生成されます。これは
デプロイのポッドテンプレートに `app` ラベルを追加することで手動で設定できます。

```yaml
template:
  metadata:
    labels:
      app: <SERVICE_NAME>
```

[CronJobs][8] の場合、生成された名前がより高レベルの `CronJob` ではなく `Job` から来る場合があるため、`app` ラベルをジョブテンプレートに追加する必要があります

<!-- 不具合のためコメント アウトしています (ref: DOCS-11035)

## Istio サンプリング

Datadog に送信される Istio トレースの量を制御するには、
`"sample_rate"` を `0.0` (0%) から `1.0` (100%) の範囲に設定したサンプリング ルールを構成します。
サンプリング ルールは、環境変数 `DD_TRACE_SAMPLING_RULES` で設定します。
`DD_TRACE_SAMPLING_RULES` を指定しない場合、
Istio トレースは 100% の割合で Datadog に送信されます。

**注**: これらの環境変数は、`values.pilot.traceSampling` の設定で対象になっているトレースのサブセットにのみ適用されます。そのため、Istio の構成時には `--set values.pilot.traceSampling=100.0` を必ず指定する必要があります。

ルールを空配列として明示的に指定することは、ルールを指定しないこととは意味が異なります。

`DD_TRACE_SAMPLING_RULES` を設定するには、namespace に `istio-injection=enabled` のラベルが付いた各 Deployment で、Deployment の spec.template の `apm.datadoghq.com/env` アノテーションに環境変数を含めて設定します:
```
apiVersion: apps/v1
...
kind: Deployment
...
spec:
  template:
    metadata:
      annotations:
        apm.datadoghq.com/env: '{"DD_ENV": "prod", "DD_SERVICE": "my-service", "DD_VERSION": "v1.1", "DD_TRACE_SAMPLING_RULES": "[]"}'
```
`apm.datadoghq.com/env``apm.datadoghq.com/env` は文字列で、その内容は環境変数名を値にマッピングした JSON オブジェクトです。環境変数の値も文字列として扱われます。`DD_TRACE_SAMPLING_RULES` の場合、その文字列の中身はオブジェクトの JSON 配列です。

-->

## デプロイおよびサービス

クラスター上の Agent がデフォルトの DaemonSet ではなくデプロイおよびサービスとして実行されている場合は、DNS アドレスと Agent のポートを指定するための追加オプションが必要です。
`default` ネームスペース内のサービス `datadog-agent` の場合、アドレスは `datadog-agent.default.svc.cluster.local:8126` のようになります。

- `--set values.global.tracer.datadog.address=datadog-agent.default.svc.cluster.local:8126`

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

プロトコルの自動選択でサイドカーと Agent 間のトラフィックが HTTP であることを確認し、トレーシングを有効にすることができます。
この機能は、この特定のサービスについての[プロトコルの手動選択][12]を使用することで無効にすることが可能です。`datadog-agent` サービス内のポート名は `tcp-traceport` に変更できます。
Kubernetes 1.18+ を使用している場合は、ポートの指定に `appProtocol: tcp` を追加できます。

## 環境変数

Istio サイドカー向けの環境変数は、`proxy.istio.io/config` アノテーションを使ってデプロイメント単位で設定できます。これは Istio サイドカーを利用するデプロイメントに固有の方法です。
```yaml
apiVersion: apps/v1
...
kind: Deployment
...
spec:
  template:
    metadata:
      annotations:
        proxy.istio.io/config: |
          proxyMetadata:
            "DD_ENV": "prod"
            "DD_SERVICE": "my-service"
            "DD_VERSION": "v1.1"
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/istio/
[2]: /ja/network_monitoring/performance/setup/#istio
[3]: https://www.datadoghq.com/blog/istio-datadog/
[4]: /ja/agent/kubernetes/
[5]: /ja/agent/kubernetes/apm/
[6]: https://istio.io/docs/setup/install/istioctl/
[7]: https://istio.io/docs/ops/configuration/traffic-management/protocol-selection/
[8]: https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/
[9]: /ja/tracing/trace_pipeline/ingestion_mechanisms/#in-the-agent
[10]: /ja/getting_started/tagging/unified_service_tagging/?tab=kubernetes#configuration-1
[12]: https://istio.io/docs/ops/configuration/traffic-management/protocol-selection/#manual-protocol-selection
[13]: https://istio.io/latest/docs/releases/supported-releases/#support-status-of-istio-releases