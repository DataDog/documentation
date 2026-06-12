---
aliases:
- /ja/agent/kubernetes/host_setup
further_reading:
- link: /agent/kubernetes/log/
  tag: ドキュメント
  text: アプリケーションログの収集
- link: /agent/kubernetes/prometheus/
  tag: ドキュメント
  text: Prometheus メトリクスの収集
- link: /agent/kubernetes/integrations/
  tag: ドキュメント
  text: アプリケーションのメトリクスとログを自動で収集
- link: /agent/guide/autodiscovery-management/
  tag: ドキュメント
  text: データ収集をコンテナのサブセットのみに制限
- link: /agent/kubernetes/tag/
  tag: ドキュメント
  text: コンテナから送信された全データにタグを割り当て
title: Kubernetes APM - トレース収集
---

{{< learning-center-callout header="ラーニングセンターで Kubernetes のモニタリング入門をお試しください" btn_title="今すぐ登録" btn_url="https://learn.datadoghq.com/courses/intro-to-monitoring-kubernetes">}}
  Datadog のトライアルアカウントと実際のクラウドコンピュートキャパシティを使用して、コストをかけずに学ぶことができます。ハンズオンラボを開始して、Kubernetes 固有のメトリクス、ログ、APM トレースを使いこなしましょう。
{{< /learning-center-callout >}}

このページでは、Kubernetes アプリケーションを対象とした [Application Performance Monitoring (APM)][10] のセットアップと構成について説明します。

{{< img src="tracing/visualization/troubleshooting_pipeline_kubernetes.png" alt="APM のトラブルシューティングパイプライン: トレーサーは、アプリケーションポッドから Agent ポッドにトレースとメトリクスデータを送信し、Agent ポッドはそれを Datadog バックエンドに送信して Datadog UI に表示させることができます。">}}

トレースは Unix Domain Socket (UDS)、TCP (`IP:Port`)、または Kubernetes サービスを介して送信できます。Datadog では UDS の使用を推奨していますが、必要であれば 3 つすべてを同時に使用することも可能です。

## セットアップ
1. まだインストールしていない場合は、お使いの Kubernetes 環境に応じた [Datadog Agent][1] をインストールしてください。
2. トレースを収集するように [Datadog Agent を構成します](#configure-the-datadog-agent-to-collect-traces)。
3. トレースを Datadog Agent に送信するように[アプリケーションポッドを構成します](#configure-your-application-pods-to-submit-traces-to-datadog-agent)。

### トレースを収集するように Datadog Agent を構成する

このセクションの説明では、UDS でトレースを受信するように Datadog Agent を構成します。TCP を使用するには、[その他の構成](#additional-configuration)セクションを参照してください。Kubernetes サービスを使用するには、[Kubernetes サービスを使用して APM を設定する][9]を参照してください。

{{< tabs >}}
{{% tab "Datadog Operator" %}}
`datadog-agent.yaml` を編集して `features.apm.enabled` を `true` に設定します。

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

APM が有効になると、デフォルトのコンフィギュレーションにより、ホスト上にディレクトリが作成され、Agent 内にマウントされます。次に Agent はソケットファイル `/var/run/datadog/apm/apm.socket` を作成し、リッスンします。アプリケーションポッドも同様に、このボリュームをマウントして、この同じソケットに書き込むことができます。`features.apm.unixDomainSocketConfig.path` のコンフィギュレーション値で、パスとソケットを変更することが可能です。

{{% k8s-operator-redeploy %}}

**注**: minikube では、`Unable to detect the kubelet URL automatically`（キューブレット URL を自動的に検出できません）というエラーが表示される場合があります。この場合、`global.kubelet.tlsVerify` を `false` に設定します。

{{% /tab %}}
{{% tab "Helm" %}}

[Datadog Agent のインストールに Helm を使用した][1]場合、APM は UDS または Windows の名前付きパイプで**デフォルトで有効**になっています。

確認するには、`datadog-values.yaml` で `datadog.apm.socketEnabled` が `true` に設定されていることを確認してください。

```yaml
datadog:
  apm:
    socketEnabled: true    
```

デフォルトのコンフィギュレーションにより、ホスト上にディレクトリが作成され、Agent 内にマウントされます。次に Agent はソケットファイル `/var/run/datadog/apm.socket` を作成し、リッスンします。アプリケーションポッドも同様に、このボリュームをマウントして、この同じソケットに書き込むことができます。`datadog.apm.hostSocketPath` と `datadog.apm.socketPath` のコンフィギュレーション値で、パスとソケットを変更することが可能です。

```yaml
datadog:
  apm:
    # the following values are default:
    socketEnabled: true
    hostSocketPath: /var/run/datadog/
    socketPath: /var/run/datadog/apm.socket
```

APM を無効にするには、`datadog.apm.socketEnabled` を`false` に設定します。

{{% k8s-helm-redeploy %}}

**注**: minikube では、`Unable to detect the kubelet URL automatically`（キューブレット URL を自動的に検出できません）というエラーが表示される場合があります。この場合、`datadog.kubelet.tlsVerify` を `false` に設定します。

[1]: /ja/containers/kubernetes/installation?tab=helm#installation
{{% /tab %}}
{{< /tabs >}}

### Datadog Agent にトレースを送信するためのアプリケーションポッドの構成

{{< tabs >}}

{{% tab "Datadog Admission Controller" %}}
Datadog Admission Controller は、Datadog Cluster Agent のコンポーネントで、アプリケーションポッドの構成を簡素化します。詳しくは、[Datadog Admission Controller ドキュメント][1]をお読みください。

Datadog Admission Controller を使用して環境変数を挿入し、新しいアプリケーションポッドに必要なボリュームをマウントすることで、ポッドと Agent のトレース通信を自動で構成します。Datadog Agent にトレースを送信するためにアプリケーションを自動的に構成する方法については、[Admission Controller を使ったライブラリの挿入][2]のドキュメントを参照してください。

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

### アプリケーショントレーサーがトレースを発するように構成します。
Datadog Agent がトレースを収集するように構成し、アプリケーションポッドにトレースの送信先に関する構成を行った後、Datadog トレーサーをアプリケーションにインストールして、トレースを送信します。これが完了すると、トレーサーは適切な `DD_TRACE_AGENT_URL` エンドポイントにトレースを自動的に送出します。

{{% /tab %}}


{{% tab TCP %}}
TCP (`<IP_ADDRESS>:8126`) を使用して Agent にトレースを送信している場合、この IP アドレスをアプリケーションポッドに供給します ([Datadog Admission Controller][1] で自動的に、または手動で下位 API を使用してホスト IP をプルします)。アプリケーションコンテナには、`status.hostIP` を指す環境変数 `DD_AGENT_HOST` が必要です。

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

### アプリケーショントレーサーがトレースを発するように構成します。
Datadog Agent がトレースを収集するように構成し、アプリケーションポッドにトレースの送信先に関する構成を行った後、Datadog トレーサーをアプリケーションにインストールして、トレースを送信します。これが完了すると、トレーサーは適切な `DD_AGENT_HOST` エンドポイントにトレースを自動的に送出します。

[1]: /ja/agent/cluster_agent/admission_controller/
{{% /tab %}}

{{< /tabs >}}

その他の例については、[言語ごとの APM インスツルメンテーションドキュメント][2]を参照してください。

## 追加構成

### TCP 経由でトレースを受け取るように Datadog Agent を構成する
{{< tabs >}}
{{% tab "Datadog Operator" %}}

`datadog-agent.yaml` を以下のように更新します。

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

**警告**: `hostPort` パラメーターを指定すると、ホストのポートが開かれます。アプリケーションまたは信頼できるソースからのみアクセスを許可するように、ファイアウォールを設定してください。ネットワークプラグインが `hostPorts` をサポートしていない場合は、`hostNetwork: true` を Agent ポッド仕様に追加してください。ホストのネットワークネームスペースが Datadog Agent と共有されます。つまり、コンテナで開かれたすべてのポートはホストで開きます。ポートがホストとコンテナの両方で使用されると、競合し (同じネットワークネームスペースを共有するので)、ポッドが開始しません。これを許可しない Kubernetes インストールもあります。
{{% /tab %}}
{{% tab "Helm" %}}

以下の APM コンフィギュレーションを使用して、`datadog-values.yaml` ファイルを更新します。

```yaml
datadog:
  apm:
    portEnabled: true
    port: 8126 # default
```

{{% k8s-helm-redeploy %}}

**警告**:  `datadog.apm.portEnabled` パラメーターを指定すると、ホストのポートが開かれます。アプリケーションまたは信頼できるソースからのみアクセスを許可するように、ファイアウォールを設定してください。ネットワークプラグインが `hostPorts` をサポートしていない場合は、`hostNetwork: true` を Agent ポッド仕様に追加してください。ホストのネットワークネームスペースが Datadog Agent と共有されます。つまり、コンテナで開かれたすべてのポートはホストで開きます。ポートがホストとコンテナの両方で使用されると、競合し (同じネットワークネームスペースを共有するので)、ポッドが開始しません。これを許可しない Kubernetes インストールもあります。
{{% /tab %}}
{{< /tabs >}}

## APM 環境変数

{{< tabs >}}
{{% tab "Datadog Operator" %}}
`override.nodeAgent.containers.trace-agent.env` にその他の APM 環境変数を設定します。

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
`agents.containers.traceAgent.env` にその他の APM 環境変数を設定します。
{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
agents:
  containers:
    traceAgent:
      env:
        - name: <ENV_VAR_NAME>
          value: <ENV_VAR_VALUE>
{{< /code-block >}}

{{% /tab %}}{{% tab "DaemonSet" %}}DaemonSet または Deployment (Datadog Cluster Agent 用) に環境変数を追加します。
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
| `DD_APM_ENABLED`           | `true` に設定すると、Datadog Agent はトレースメトリクスを受け取ります。<br/>**デフォルト**: `true` (Agent 7.18 以上)。 |
| `DD_APM_ENV`           | 収集したトレースに `env:` タグを設定します。  |
| `DD_APM_RECEIVER_SOCKET` | UDS 経由のトレース用。設定されている場合、有効なソケットファイルを指す必要があります。 |
| `DD_APM_RECEIVER_PORT`     | TCP 経由のトレースの場合、Datadog Agent のトレースレシーバーがリッスンするポート。<br/>**デフォルト**: `8126` |
| `DD_APM_NON_LOCAL_TRAFFIC` | 他のコンテナからのトレース時に、非ローカルトラフィックを許可します。<br/>**デフォルト**: `true` (Agent 7.18 以上)。 |
| `DD_APM_DD_URL`            | トレースが送信される Datadog API エンドポイント: `https://trace.agent.{{< region-param key="dd_site" >}}`。<br/>**デフォルト**: `https://trace.agent.datadoghq.com` |
| `DD_APM_TARGET_TPS`     | サンプリングする 1 秒あたりのトレースの目標数。<br/>**デフォルト**: `10` |
| `DD_APM_ERROR_TPS`     | 1 秒あたりに受け取るエラートレースチャンクの目標数。<br/>**デフォルト**: `10` |
| `DD_APM_MAX_EPS`     | サンプリングする 1 秒あたりの APM イベントの最大数。<br/>**デフォルト**: `200` |
| `DD_APM_MAX_MEMORY`     | Datadog Agent のメモリ使用量の目標値。この値を超えると、API は受信リクエストを制限します。<br/>**デフォルト**: `500000000` |
| `DD_APM_MAX_CPU_PERCENT`     | Datadog Agent の CPU 使用率の目標値。この値を超えると、API は受信リクエストを制限します。<br/>**デフォルト**: `50` |
| `DD_APM_FILTER_TAGS_REQUIRE`     | 指定されたスパンのタグと値が完全に一致するルートスパンを持つトレースのみを収集します。<br/>[APM で不要なリソースを無視する][11]を参照してください。 |
| `DD_APM_FILTER_TAGS_REJECT`     | 指定されたスパンのタグと値が完全に一致するルートスパンを持つトレースを拒否します。<br/>[APM で不要なリソースを無視する][11]を参照してください。 |
| `DD_APM_REPLACE_TAGS` | [スパンのタグから機密データをスクラブします][4]。 |
| `DD_APM_IGNORE_RESOURCES`  | Agent が無視するリソースを構成します。フォーマットはカンマ区切りの正規表現です。<br/>例: `GET /ignore-me,(GET\|POST) /and-also-me` |
| `DD_APM_LOG_FILE`  | APM ログが書き込まれるファイルへのパス。 |
| `DD_APM_CONNECTION_LIMIT`  | 30 秒のタイムウィンドウに対する最大接続数の上限。<br/>**デフォルト**: 2000 |
| `DD_APM_ADDITONAL_ENDPOINTS`     | 複数のエンドポイントや複数の API キーにデータを送信します。<br/>[デュアルシッピング][12]を参照してください。 |
| `DD_APM_DEBUG_PORT`     | トレース Agent のデバッグエンドポイント用ポート。サーバーを無効にするには、`0` に設定します。<br/>**デフォルト**: `5012`。 |
| `DD_BIND_HOST`             | StatsD とレシーバーのホスト名を設定します。 |
| `DD_DOGSTATSD_PORT`        | TCP 経由のトレースの場合、DogStatsD ポートを設定します。 |
| `DD_ENV`                   | Agent が発するすべてのデータにグローバル `env` を設定します。トレースデータに `env` が存在しない場合、この変数が使用されます。 |
| `DD_HOSTNAME`         | 自動検出が失敗した場合、または Datadog Cluster Agent を実行する場合に、メトリクスに使用するホスト名を手動で設定します。 |
| `DD_LOG_LEVEL`             | ログレベルを設定します。<br/>**値**: `trace`、`debug`、`info`、`warn`、`error`、`critical`、`off` |
| `DD_PROXY_HTTPS`     | 使用するプロキシの URL をセットアップします。 |


## その他の参考資料

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
