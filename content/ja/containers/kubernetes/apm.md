---
aliases:
- /ja/agent/kubernetes/apm
description: Kubernetes 環境で実行され、コンテナ化されたアプリケーションの APM トレース収集を有効にする
further_reading:
- link: /agent/kubernetes/log/
  tag: よくあるご質問
  text: アプリケーションログの収集
- link: /agent/kubernetes/prometheus/
  tag: よくあるご質問
  text: Prometheus メトリクスの収集
- link: /agent/kubernetes/integrations/
  tag: よくあるご質問
  text: アプリケーションのメトリクスとログを自動で収集
- link: /agent/guide/autodiscovery-management/
  tag: よくあるご質問
  text: データ収集をコンテナのサブセットのみに制限
- link: /agent/kubernetes/tag/
  tag: よくあるご質問
  text: コンテナから送信された全データへのタグの割り当て
title: Kubernetes APM - トレース収集
---
{{< learning-center-callout header="ラーニングセンターで Kubernetes のモニタリングの紹介をご覧ください" btn_title="今すぐ登録" btn_url="https://learn.datadoghq.com/courses/intro-to-monitoring-kubernetes">}}
  実際のクラウドの計算リソースと Datadog のトライアルアカウントを使って、無料で学習できます。これらのハンズオンラボを開始して、Kubernetes に特有のメトリクス、ログ、および APM トレースについて短期間で理解を深めましょう。
{{< /learning-center-callout >}}

このページでは、Kubernetes アプリケーションを対象とした [Application Performance Monitoring (APM)][10] のセットアップと構成について説明します。

{{< img src="tracing/visualization/troubleshooting_pipeline_kubernetes.png" alt="APM のトラブルシューティングパイプライン: トレーサーは、アプリケーションポッドから Agent ポッドにトレースとメトリクスデータを送信し、Agent Pod はそれを Datadog バックエンドに送信して Datadog UI に表示させることができます。">}}

トレースは、Unix Domain Socket (UDS)、TCP (`IP:Port`)、または Kubernetes サービスを介して送信できます。Datadog では UDS の使用を推奨しますが、必要に応じて 3 つすべてを同時に使用することも可能です。

**注意**: 手動構成なしで自動インスツルメンテーションを行うには、[Kubernetes 用のシングルステップインスツルメンテーション][13] を参照してください。

## セットアップ {#setup}
1. まだインストールしていない場合は、使用している Kubernetes 環境に応じた [Datadog Agent][1] をインストールしてください。
2. [Configure the Datadog Agent](#configure-the-datadog-agent-to-collect-traces) してトレースを収集します。
3. [Configure application pods](#configure-your-application-pods-to-submit-traces-to-datadog-agent) して Datadog Agent にトレースを送信します。

### トレースを収集するように Datadog Agent を構成する {#configure-the-datadog-agent-to-collect-traces}

このセクションの指示では、UDS 経由でトレースを受信するように Datadog Agent を構成します。TCP を使用する場合は、[additional configuration](#additional-configuration) セクションを参照してください。Kubernetes サービスを使用する場合は、[Kubernetes サービスでの APM の設定][9] を参照してください。

{{< tabs >}}
{{% tab "Datadog Operator" %}}
`datadog-agent.yaml` を編集して、`features.apm.enabled` を `true` に設定します。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    apm:
      enabled: true
      unixDomainSocketConfig:
        path: /var/run/datadog/apm.socket # default
```

APM が有効になると、デフォルトの構成ではホスト上にディレクトリが作成され、Agent 内にマウントされます。次に Agent はソケットファイル `/var/run/datadog/apm/apm.socket` を作成し、リッスンします。アプリケーションポッドは、このボリュームを同様にマウントし、同じソケットに書き込むことができます。`features.apm.unixDomainSocketConfig.path` 構成値を使用してパスとソケットを変更できます。

{{% k8s-operator-redeploy %}}

**注**: minikube では、`Unable to detect the kubelet URL automatically` エラーが発生する場合があります。この場合、`global.kubelet.tlsVerify` を `false` に設定します。

{{% /tab %}}
{{% tab "Helm" %}}

[Datadog Agent のインストールに Helm を使用した][1] 場合、APM は UDS または Windows の名前付きパイプで**デフォルトで有効**になっています。

確認するには、`datadog-values.yaml` で、`datadog.apm.socketEnabled` が`true` に設定されていることを確認してください。

```yaml
datadog:
  apm:
    socketEnabled: true    
```

デフォルトの構成では、ホスト上にディレクトリが作成され、Agent 内にマウントされます。次に Agent はソケットファイル `/var/run/datadog/apm.socket` を作成し、リッスンします。アプリケーションポッドは、このボリュームを同様にマウントし、同じソケットに書き込むことができます。`datadog.apm.hostSocketPath` および `datadog.apm.socketPath` 構成値を使用してパスとソケットを変更できます。

```yaml
datadog:
  apm:
    # the following values are default:
    socketEnabled: true
    hostSocketPath: /var/run/datadog/
    socketPath: /var/run/datadog/apm.socket
```

APM を無効にするには、`datadog.apm.socketEnabled` を `false` に設定します。

{{% k8s-helm-redeploy %}}

**注**: minikube では、`Unable to detect the kubelet URL automatically` エラーが発生する場合があります。この場合、`datadog.kubelet.tlsVerify` を `false` に設定します。

[1]: /ja/containers/kubernetes/installation?tab=helm#installation
{{% /tab %}}
{{< /tabs >}}

### アプリケーションポッドを構成して Datadog Agent にトレースを送信する {#configure-your-application-pods-to-submit-traces-to-datadog-agent}

{{< tabs >}}

{{% tab "Datadog Admission Controller" %}}
Datadog Admission Controller は、アプリケーションポッドの構成を簡素化する Datadog Cluster Agent のコンポーネントです。[Datadog Admission Controller ドキュメント][1] を参照して、詳細を学べます。

Datadog Admission Controller を使用して、新しいアプリケーションポッドに環境変数を注入し、必要なボリュームをマウントし、自動的にポッドと Agent のトレース通信を構成します。Datadog Agent にトレースを送信するためにアプリケーションを自動的に構成する方法について詳しくは、[Admission Controller を使用したライブラリの注入][2] ドキュメントをご覧ください。

[1]: /ja/agent/cluster_agent/admission_controller/
[2]: /ja/tracing/trace_collection/library_injection_local/
{{% /tab %}}

{{% tab "Unix Domain Socket (UDS)" %}}
UDS を使用して Agent にトレースを送信する場合は、ソケットのあるホストディレクトリ (Agent が作成したもの) をアプリケーションコンテナにマウントし、ソケットへのパスを `DD_TRACE_AGENT_URL` で指定します。

```yaml
apiVersion: apps/v1
kind: Deployment
#(...)
    spec:
      containers:
      - name: "<CONTAINER_NAME>"
        image: "<CONTAINER_IMAGE>/<TAG>"
        env:
        - name: DD_TRACE_AGENT_URL
          value: 'unix:///var/run/datadog/apm.socket'
        volumeMounts:
        - name: apmsocketpath
          mountPath: /var/run/datadog
        #(...)
      volumes:
        - hostPath:
            path: /var/run/datadog/
          name: apmsocketpath
```

### 以下の手順で、アプリケーション SDK がトレースを送信するように構成します。{#configure-your-application-sdks-to-emit-traces}
Datadog Agent がトレースを収集するように構成し、アプリケーションポッドにトレースの送信*先*に関する設定を行った後、Datadog SDK をアプリケーションにインストールしてトレースを送信します。これが完了すると、SDK は適切な `DD_TRACE_AGENT_URL` エンドポイントにトレースを送信します。

{{% /tab %}}


{{% tab TCP %}}
TCP (`<IP_ADDRESS>:8126`) を使用して Agent にトレースを送信している場合、この IP アドレスをアプリケーションポッドに供給します。[Datadog Admission Controller][1] で自動的に、または手動で下位 API を使用してホスト IP をプルします。アプリケーションコンテナには、`status.hostIP` を指す環境変数 `DD_AGENT_HOST` が必要です。

```yaml
apiVersion: apps/v1
kind: Deployment
#(...)
    spec:
      containers:
      - name: "<CONTAINER_NAME>"
        image: "<CONTAINER_IMAGE>/<TAG>"
        env:
          - name: DD_AGENT_HOST
            valueFrom:
              fieldRef:
                fieldPath: status.hostIP
```
**注:** この構成では、Agent が TCP 上のトレースを受け入れるように構成されている必要があります。

### 以下の手順で、アプリケーション SDK がトレースを送信するように構成します。{#configure-your-application-sdks-to-emit-traces-1}
Datadog Agent がトレースを収集するように構成し、アプリケーションポッドにトレースの送信*先*に関する設定を行った後、Datadog SDK をアプリケーションにインストールしてトレースを送信します。これが完了すると、SDK は適切な `DD_AGENT_HOST` エンドポイントにトレースを自動的に送信します。

[1]: /ja/agent/cluster_agent/admission_controller/
{{% /tab %}}

{{< /tabs >}}

その他の例については、[言語ごとの APM インスツルメンテーションドキュメント][2] を参照してください。

## 追加の構成 {#additional-configuration}

### TCP 経由でトレースを受け取るように Datadog Agent を構成する {#configure-the-datadog-agent-to-accept-traces-over-tcp}
{{< tabs >}}
{{% tab "Datadog Operator" %}}

以下の内容で `datadog-agent.yaml` を更新します。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    apm:
      enabled: true
      hostPortConfig:
        enabled: true
        hostPort: 8126 # default
```

{{% k8s-operator-redeploy %}}

**警告**: `hostPort` パラメーターによりホスト上のポートが開かれます。ファイアウォールが、アプリケーションまたは信頼できるソースからのアクセスのみを許可することを確認してください。ネットワークプラグインで `hostPorts` がサポートされていない場合は、Agent Pod の仕様に `hostNetwork: true` を追加してください。これにより、ホストのネットワークネームスペースが Datadog Agent と共有されます。これは、コンテナ上で開かれるすべてのポートがホスト上でも開かれることを意味します。ホストとコンテナの両方でポートが使用されている場合、それらは競合し (同じネットワークネームスペースを共有しているため)、Pod は起動しません。一部の Kubernetes インストールでは、これは許可されていません。
{{% /tab %}}
{{% tab "Helm" %}}

以下の APM の構成を使用して `datadog-values.yaml` ファイルを更新します。

```yaml
datadog:
  apm:
    portEnabled: true
    port: 8126 # default
```

{{% k8s-helm-redeploy %}}

**警告**: `datadog.apm.portEnabled` パラメーターによりホスト上のポートが開かれます。ファイアウォールが、アプリケーションまたは信頼できるソースからのアクセスのみを許可することを確認してください。ネットワークプラグインで `hostPorts` がサポートされていない場合は、Agent Pod の仕様に `hostNetwork: true` を追加してください。これにより、ホストのネットワークネームスペースが Datadog Agent と共有されます。これは、コンテナ上で開かれるすべてのポートがホスト上でも開かれることを意味します。ホストとコンテナの両方でポートが使用されている場合、それらは競合し (同じネットワークネームスペースを共有しているため)、Pod は起動しません。一部の Kubernetes インストールでは、これは許可されていません。
{{% /tab %}}
{{< /tabs >}}

## APM 環境変数 {#apm-environment-variables}

{{< tabs >}}
{{% tab "Datadog Operator" %}}
`override.nodeAgent.containers.trace-agent.env` の下に、以下のように追加の APM 環境変数を設定します。

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      containers:
        trace-agent:
          env:
            - name: <ENV_VAR_NAME>
              value: <ENV_VAR_VALUE>
{{< /code-block >}}

{{% /tab %}}
{{% tab "Helm" %}}
`agents.containers.traceAgent.env` の下に、以下のように追加の APM 環境変数を設定します。
{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
agents:
  containers:
    traceAgent:
      env:
        - name: <ENV_VAR_NAME>
          value: <ENV_VAR_VALUE>
{{< /code-block >}}

{{% /tab %}}
{{% tab "DaemonSet" %}}
DaemonSet または Deployment (Datadog Cluster Agent 用) に環境変数を追加します。

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: datadog
spec:
  template:
    spec:
      containers:
        - name: agent
          ...
          env:
            - name: <ENV_VAR_NAME>
              value: <ENV_VAR_VALUE>
```

{{% /tab %}}
{{< /tabs >}}

APM の構成で利用可能な環境変数のリスト:

| 環境変数 | 説明 |
| -------------------- | ----------- |
| `DD_APM_ENABLED`           | `true` に設定すると、Datadog Agent はトレースメトリクスを受け付けます。<br/>**デフォルト**: `true` (Agent 7.18 以降) |
| `DD_APM_ENV`           | 収集したトレースに `env:` タグを設定します。 |
| `DD_APM_RECEIVER_SOCKET` | UDS 経由のトレース用。設定されている場合、有効なソケットファイルを指す必要があります。|
| `DD_APM_RECEIVER_PORT`     | TCP 経由のトレースの場合、Datadog Agent のトレースレシーバーがリッスンするポート。<br/>**デフォルト**: `8126` |
| `DD_APM_NON_LOCAL_TRAFFIC` | 他のコンテナからのトレース時に非ローカルトラフィックを許可します。<br/>**デフォルト**: `true` (Agent 7.18 以降) |
| `DD_APM_DD_URL`            | トレースが送信される Datadog API エンドポイント: `https://trace.agent。{{< region-param key="dd_site" >}}`. <br/>**Default**:  `https://trace.agent.datadoghq.com` |
| `DD_APM_TARGET_TPS`     | The target traces per second to sample. <br/>**Default**: `10` |
| `DD_APM_ERROR_TPS`     | The target error trace chunks to receive per second. <br/>**Default**: `10` |
| `DD_APM_MAX_EPS`     | Maximum number of APM events per second to sample. <br/>**Default**: `200` |
| `DD_APM_MAX_MEMORY`     | What the Datadog Agent aims to use in terms of memory. If surpassed, the API rate limits incoming requests. <br/>**Default**: `500000000` |
| `DD_APM_MAX_CPU_PERCENT`     | The CPU percentage that the Datadog Agent aims to use. If surpassed, the API rate limits incoming requests. <br/>**Default**: `50` |
| `DD_APM_FILTER_TAGS_REQUIRE`     | Collects only traces that have root spans with an exact match for the specified span tags and values. <br/>See [Ignoring unwanted resources in APM][11]. |
| `DD_APM_FILTER_TAGS_REJECT`     | Rejects traces that have root spans with an exact match for the specified span tags and values. <br/>See [Ignoring unwanted resources in APM][11]. |
| `DD_APM_REPLACE_TAGS` | [Scrub sensitive data from your span's tags][4]. |
| `DD_APM_IGNORE_RESOURCES`  | Configure resources for the Agent to ignore. Format should be comma separated, regular expressions. <br/>For example: `GET /ignore-me,(GET\|POST) /and-also-me` |
| `DD_APM_LOG_FILE`  | Path to file where APM logs are written. |
| `DD_APM_CONNECTION_LIMIT`  | Maximum connection limit for a 30 second time window. <br/>**Default**: 2000 |
| `DD_APM_ADDITONAL_ENDPOINTS`     | Send data to multiple endpoints and/or with multiple API keys. <br/>See [Dual Shipping][12]. |
| `DD_APM_DEBUG_PORT`     | Port for the debug endpoints for the Trace Agent. Set to `0` to disable the server. <br/>**Default**: `5012`. |
| `DD_BIND_HOST`             | Set the StatsD and receiver hostname. |
| `DD_DOGSTATSD_PORT`        | For tracing over TCP, set the DogStatsD port. |
| `DD_ENV`                   | Sets the global `env` for all data emitted by the Agent. If `env` is not present in your trace data, this variable is used. |
| `DD_HOSTNAME`         | Manually set the hostname to use for metrics if autodetection fails, or when running the Datadog Cluster Agent. |
| `DD_LOG_LEVEL`             | Set the logging level. <br/>**Values**: `trace`, `debug`, `info`, `warn`, `error`, `critical`, `off` |
| `DD_PROXY_HTTPS`     | 使用するプロキシの URL をセットアップします。|


##  参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/containers/kubernetes/installation
[2]: /ja/tracing/setup/
[3]: /ja/getting_started/tagging/unified_service_tagging
[4]: /ja/tracing/configure_data_security/?tab=kubernetes#replace-tags
[5]: /ja/tracing/guide/setting_primary_tags_to_scope/#environment
[6]: https://github.com/DataDog/docker-dd-agent#tracing-from-the-host
[7]: https://docs.datadoghq.com/ja/agent/docker/?tab=standard#environment-variables
[8]: https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/
[9]: /ja/tracing/guide/setting_up_apm_with_kubernetes_service/
[10]: /ja/tracing
[11]: /ja/tracing/guide/ignoring_apm_resources/?tab=kubernetes
[12]: /ja/agent/configuration/dual-shipping/
[13]: /ja/tracing/trace_collection/single-step-apm/kubernetes/