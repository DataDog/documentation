---
aliases:
- /ja/agent/kubernetes/host_setup
- /ja/agent/kubernetes/apm
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

アプリケーションのトレースを収集するには、[Kubernetes クラスターで Datadog Agent を実行する][1]必要があります。

## セットアップ

TCP (`IP:Port`)、Unix Domain Socket (UDS) のいずれか、または両方を使用して、Agent がトレースを取り込むように構成することができます。Agent は、必要に応じて両方のセットアップから同時にトレースを受信することができます。

{{< img src="tracing/visualization/troubleshooting_pipeline_kubernetes.png" alt="APM のトラブルシューティングパイプライン: トレーサーは、アプリケーションポッドから Agent ポッドにトレースとメトリクスデータを送信し、Agent ポッドはそれを Datadog バックエンドに送信して Datadog UI に表示させることができます。">}}

### トレースを受け取るように Datadog Agent を構成する
{{< tabs >}}
{{% tab "Helm" %}}

- Helm チャートをまだ[インストール][1]していない場合は、インストールしてください。

デフォルトのコンフィギュレーションにより、ホスト上にディレクトリが作成され、Agent 内にマウントされます。次に Agent はソケットファイル `/var/run/datadog/apm.socket` を作成し、リッスンします。アプリケーションポッドも同様に、このボリュームをマウントして、この同じソケットに書き込むことができます。`datadog.apm.hostSocketPath` と `datadog.apm.socketPath` のコンフィギュレーション値で、パスとソケットを変更することが可能です。

この機能は `datadog.apm.socketEnabled` で無効にすることができます。

#### オプション - TCP 経由でトレースを受け取るように Datadog Agent を構成する

Datadog Agent は、TCP 経由でトレースを受信するように構成することも可能です。この機能を有効にするには:

- 以下の APM コンフィギュレーションを使用して、`values.yaml` ファイルを更新します。
    ```yaml
    datadog:
      ## Enable apm agent and provide custom configs
      apm:
        # datadog.apm.portEnabled -- Enable APM over TCP communication (port 8126 by default)
        ## ref: https://docs.datadoghq.com/agent/kubernetes/apm/
        portEnabled: true
    ```

続いて、次のコマンド `helm upgrade -f values.yaml <RELEASE NAME> datadog/datadog` を使用して Datadog Helm チャートをアップグレードします。`values.yaml` にオペレーディングシステムを設定していない場合は、このコマンドに `--set targetSystem=linux` または `--set targetSystem=windows` を追加します。

**警告**: `datadog.apm.portEnabled` パラメーターを指定すると、ホストのポートが開かれます。アプリケーションまたは信頼できるソースからのみアクセスを許可するように、ファイアウォールを設定してください。ネットワークプラグインが `hostPorts` をサポートしていない場合は、`hostNetwork: true` を Agent ポッド仕様に追加してください。ホストのネットワークネームスペースが Datadog Agent と共有されます。つまり、コンテナで開かれたすべてのポートはホストで開きます。ポートがホストとコンテナの両方で使用されると、競合し (同じネットワークネームスペースを共有するので)、ポッドが開始しません。これを許可しない Kubernetes インストールもあります。

[1]: /ja/agent/kubernetes/?tab=helm
{{% /tab %}}
{{% tab "DaemonSet" %}}

APM トレースの収集を有効にするには、DaemonSet コンフィギュレーションファイルを開いて以下を編集します。

- ポート `8126` からの受信データ (ホストからエージェントへのトラフィックを転送) を `trace-agent` コンテナ内で許可するようにします。
    ```yaml
      # (...)
      containers:
        - name: trace-agent
          # (...)
          ports:
            - containerPort: 8126
              hostPort: 8126
              name: traceport
              protocol: TCP
      # (...)
    ```

- **古いバージョンの Agent (7.17 以前) を使用している場合は**、上記の手順に加えて、`datadog.yaml` トレース Agent マニフェストの `env` セクションで `DD_APM_NON_LOCAL_TRAFFIC` 変数と `DD_APM_ENABLED` 変数を `true` に設定してください。

  ```yaml
    # (...)
    containers:
      - name: trace-agent
        # (...)
        env:
          - name: DD_APM_ENABLED
            value: 'true'
          - name: DD_APM_NON_LOCAL_TRAFFIC
            value: "true"
          # (...)
  ```

**警告**: `hostPort` パラメーターを指定すると、ホストのポートが開かれます。アプリケーションまたは信頼できるソースからのみアクセスを許可するように、ファイアウォールを設定してください。ネットワークプラグインが `hostPorts` をサポートしていない場合は、`hostNetwork: true` を Agent ポッド仕様に追加してください。ホストのネットワークネームスペースが Datadog Agent と共有されます。つまり、コンテナで開かれたすべてのポートはホストで開きます。ポートがホストとコンテナの両方で使用されると、競合し (同じネットワークネームスペースを共有するので)、ポッドが開始しません。これを許可しない Kubernetes インストールもあります。


{{% /tab %}}
{{% tab "DaemonSet (UDS)" %}}

APM トレースの収集を有効にするには、DaemonSet コンフィギュレーションファイルを開いて以下を編集します。

  ```yaml
    # (...)
    containers:
    - name: trace-agent
      # (...)
      env:
      - name: DD_APM_ENABLED
        value: "true"
      - name: DD_APM_RECEIVER_SOCKET
        value: "/var/run/datadog/apm.socket"
    # (...)
      volumeMounts:
      - name: apmsocket
        mountPath: /var/run/datadog/
    volumes:
    - hostPath:
        path: /var/run/datadog/
        type: DirectoryOrCreate
    # (...)
  ```

このコンフィギュレーションにより、ホスト上にディレクトリが作成され、Agent 内にマウントされます。Agent はそのディレクトリに `DD_APM_RECEIVER_SOCKET` の値を `/var/run/datadog/apm.socket` としたソケットファイルを作成し、リッスンするようにします。アプリケーションポッドも同様に、このボリュームをマウントして、この同じソケットに書き込むことができます。

{{% /tab %}}
{{% tab "Operator" %}}

APM が有効になると、デフォルトのコンフィギュレーションにより、ホスト上にディレクトリが作成され、Agent 内にマウントされます。次に Agent はソケットファイル `/var/run/datadog/apm/apm.socket` を作成し、リッスンします。アプリケーションポッドも同様に、このボリュームをマウントして、この同じソケットに書き込むことができます。`features.apm.unixDomainSocketConfig.path` のコンフィギュレーション値で、パスとソケットを変更することが可能です。

#### オプション - TCP 経由でトレースを受け取るように Datadog Agent を構成する

Datadog Agent は、TCP 経由でトレースを受信するように構成することも可能です。この機能を有効にするには:

`DatadogAgent` のマニフェストを以下のように更新します。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
    site: <DATADOG_SITE>

  features:
    apm:
      enabled: true
      hostPortConfig:
        enabled: true
```
`<DATADOG_SITE>` が {{< region-param key="dd_site" code="true" >}} である場合 (デフォルトは `datadoghq.com`)。

完全な例については、[APM とメトリクス収集が有効になっているマニフェスト][1]の例を参照してください。

次に、新しいコンフィギュレーションを適用します。

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

**警告**: `hostPort` パラメーターを指定すると、ホストのポートが開かれます。アプリケーションまたは信頼できるソースからのみアクセスを許可するように、ファイアウォールを設定してください。ネットワークプラグインが `hostPorts` をサポートしていない場合は、`hostNetwork: true` を Agent ポッド仕様に追加してください。ホストのネットワークネームスペースが Datadog Agent と共有されます。つまり、コンテナで開かれたすべてのポートはホストで開きます。ポートがホストとコンテナの両方で使用されると、競合し (同じネットワークネームスペースを共有するので)、ポッドが開始しません。これを許可しない Kubernetes インストールもあります。

[1]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/v2alpha1/datadog-agent-apm.yaml
{{% /tab %}}
{{< /tabs >}}

**注**: minikube では、`Unable to detect the kubelet URL automatically`（キューブレット URL を自動的に検出できません）というエラーが表示される場合があります。この場合、`DD_KUBELET_TLS_VERIFY=false` を設定します。

### Datadog Agent にトレースを送信するためのアプリケーションポッドの構成

{{< tabs >}}

{{% tab "Datadog Admission Controller" %}}
Datadog Admission Controller は、Datadog Cluster Agent のコンポーネントで、アプリケーションポッドの構成を簡素化します。詳しくは、[Datadog Admission Controller ドキュメント][1]をお読みください。

Datadog Admission Controller を使用して環境変数を挿入し、新しいアプリケーションポッドに必要なボリュームをマウントすることで、ポッドと Agent のトレース通信を自動で構成します。Datadog Agent にトレースを送信するためにアプリケーションを自動的に構成する方法については、[Admission Controller を使ったライブラリの挿入][2]のドキュメントを参照してください。

[1]: /ja/agent/cluster_agent/admission_controller/
[2]: /ja/tracing/trace_collection/library_injection_local/
{{% /tab %}}

{{% tab "UDS" %}}
Unix Domain Socket (UDS) を使用して Agent にトレースを送信する場合は、ソケットのあるホストディレクトリ (Agent が作成したもの) をアプリケーションコンテナにマウントし、ソケットへのパスを `DD_TRACE_AGENT_URL` で指定します。

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
Datadog Agent がトレースを収集するように構成し、アプリケーションポッドにトレースの送信先に関する構成を行った後、Datadog トレーサーをアプリケーションにインストールして、トレースを送信します。これが完了すると、トレーサーは適切な `DD_AGENT_HOST` (`IP:Port` の場合) または `DD_TRACE_AGENT_URL` (UDS の場合) のエンドポイントにトレースを送出します。

{{< /tabs >}}


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
Datadog Agent がトレースを収集するように構成し、アプリケーションポッドにトレースの送信先に関する構成を行った後、Datadog トレーサーをアプリケーションにインストールして、トレースを送信します。これが完了すると、トレーサーは自動的に適切な `DD_AGENT_HOST` (`IP:Port` の場合) または `DD_TRACE_AGENT_URL` (UDS の場合) のエンドポイントにトレースを送出します。

[1]: /ja/agent/cluster_agent/admission_controller/
{{< /tabs >}}

{{< /tabs >}}

その他の例については、[言語ごとの APM インスツルメンテーションドキュメント][2]を参照してください。


## Agent 環境変数

**注**: Datadog では、タグを付ける際のベストプラクティスとして、統合サービスタグ付けを使用することをおすすめしています。統合サービスタグ付けは、`env`、`service`、`version` の 3 つの標準タグを使用して Datadog テレメトリーと結合します。ご使用環境で統合タグ付けを構成する方法に関する詳細は、[統合サービスタグ付け][3]ドキュメントをご参照ください。

Kubernetes で稼働する Agent 内のトレースに利用可能なすべての環境変数をリストします。

| 環境変数       | 説明                                                                                                                                                                                                                                                                                                                 |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DD_API_KEY`               | Datadog API キー                                                                                                                                                                                                                                                                                                        |
| `DD_PROXY_HTTPS`           | 使用するプロキシの URL をセットアップします。                                                                                                                                                                                                                                                                                        |
| `DD_APM_REPLACE_TAGS`      | [スパンのタグから機密データをスクラブします][4]。                                                                                                                                                                                                                                                                            |
| `DD_HOSTNAME`              | 自動検出が失敗した場合、または Datadog Cluster Agent を実行する場合に、メトリクスに使用するホスト名を手動で設定します。                                                                                                                                                                                                               |
| `DD_DOGSTATSD_PORT`        | DogStatsD ポートを設定します。                                                                                                                                                                                                                                                                                                     |
| `DD_APM_RECEIVER_SOCKET`  | 設定した場合、Unix Domain Sockets からトレースを収集し、ホスト名とポートコンフィギュレーションよりも優先します。デフォルトでは設定されていません。設定する場合は、有効な sock ファイルを指定する必要があります。                                                                                                                                            |
| `DD_BIND_HOST`             | StatsD とレシーバーのホスト名を設定します。                                                                                                                                                                                                                                                                                         |
| `DD_LOG_LEVEL`             | ログレベルを設定します。(`trace`/`debug`/`info`/`warn`/`error`/`critical`/`off`)                                                                                                                                                                                                                                             |
| `DD_APM_ENABLED`           | `true` に設定すると、Datadog Agent はトレースメトリクスを受け取ります。デフォルト値は `true` です（Agent 7.18 以上）。                                                                                                                                                                                                                                                                |
| `DD_APM_CONNECTION_LIMIT`  | 30 秒のタイムウィンドウに対する最大接続制限を設定します。                                                                                                                                                                                                                                                              |
| `DD_APM_DD_URL`            | トレースが送信される Datadog API エンドポイントを設定します: `https://trace.agent.{{< region-param key="dd_site" >}}`。デフォルトは `https://trace.agent.datadoghq.com` 。                                                                                                                                                                                                   |
| `DD_APM_RECEIVER_PORT`     | Datadog Agent のトレースレシーバーがリスニングするポート。デフォルト値は `8126` です。                                                                                                                                                                                                                                           |
| `DD_APM_NON_LOCAL_TRAFFIC` | 他のコンテナからのトレース時に、非ローカルトラフィックを許可します。デフォルト値は `true` です（Agent 7.18 以上）。                                                                                                                                                                                                                               |
| `DD_APM_IGNORE_RESOURCES`  | Agent が無視するリソースを構成します。書式はカンマ区切りの正規表現です。例: <code>GET /ignore-me,(GET\|POST) /and-also-me</code> となります。                                                                                                                                                       |
| `DD_ENV`                   | Agent によって発行されたすべてのデータにグローバル `env` を設定します。トレースデータに `env` が存在しない場合、この変数が使用されます。詳細については、[APM 環境設定][5]を参照してください。


### オペレーター環境変数
| 環境変数       | 説明                                                                                                                                                                                                                                                                                                                 |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `agent.apm.enabled`                                                                                          | これを有効にすると、ポート 8126 で APM とトレースが有効になります。[Datadog Docker のドキュメント][6]を参照してください。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `agent.apm.env`                                                                                              | Datadog Agent は、多くの[環境変数][7]をサポートしています。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `agent.apm.hostPort`                                                                                         | ホストで公開するポートの数。指定する場合、これは有効なポート番号 0 < x < 65536 である必要があります。`HostNetwork` を指定する場合、これは `ContainerPort` と一致する必要があります。ほとんどのコンテナはこれを必要としません。                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `agent.apm.resources.limits`                                                                                 | 制限は、許可されるコンピューティングリソースの最大量を表します。詳細については、[Kubernetes のドキュメント][8]を参照してください。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `agent.apm.resources.requests`                                                                               | リクエストには、必要なコンピューティングリソースの最小量を表します。コンテナの `requests` が省略されている場合、明示的に指定されている場合はデフォルトで `limits` になり、それ以外の場合は実装定義の値になります。詳細については、[Kubernetes のドキュメント][8]を参照してください。     |                                                                                                                                                                                                                                                                                                                               |


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/agent/kubernetes/
[2]: /ja/tracing/setup/
[3]: /ja/getting_started/tagging/unified_service_tagging
[4]: /ja/tracing/configure_data_security#scrub-sensitive-data-from-your-spans
[5]: /ja/tracing/guide/setting_primary_tags_to_scope/#environment
[6]: https://github.com/DataDog/docker-dd-agent#tracing-from-the-host
[7]: https://docs.datadoghq.com/ja/agent/docker/?tab=standard#environment-variables
[8]: https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/