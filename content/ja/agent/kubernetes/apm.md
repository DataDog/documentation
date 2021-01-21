---
title: Kubernetes トレース収集
kind: documentation
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
---
アプリケーションのトレースを収集するには、[Kubernetes クラスターで Datadog Agent を実行する][1]必要があります。

## セットアップ

Agent でのトレース収集を有効にするには、以下の手順に従います。

1. **トレースを受け取るように Datadog Agent を構成する**:
    {{< tabs >}}
{{% tab "Helm" %}}

- Helm チャートをまだ[インストール][1]していない場合は、インストールしてください。
- 以下の APM コンフィギュレーションを使用して、`values.yaml` ファイルを更新します。
    ```yaml
    datadog:
      ## @param apm - object - required
      ## Enable apm agent and provide custom configs
      #
      apm:
        ## @param enabled - boolean - optional - default: false
        ## Enable this to enable APM and tracing, on port 8126
        #
        enabled: true
    ```

 - オペレーティングシステムを設定します。`values.yaml` の 最上部に `targetSystem: linux` または `targetSystem: windows` を追加します。

 - 続いて、次のコマンド `helm upgrade -f values.yaml <RELEASE NAME> datadog/datadog` を使用して Datadog Helm チャートをアップグレードします。忘れずに YAML ファイルに API キーを設定します。`values.yaml` にオペレーディングシステムを設定していない場合は、このコマンドに `--set targetSystem=linux` または `--set targetSystem=windows` を追加します。

[1]: /ja/agent/kubernetes/?tab=helm
{{% /tab %}}
{{% tab "DaemonSet" %}}

APM トレースの収集を有効にするには、DaemonSet コンフィギュレーションファイルを開いて以下を編集します。

- ポート `8126` からの受信データを許可します（ホストから Agent へトラフィックを転送する）:

    ```yaml
     # (...)
          ports:
            # (...)
            - containerPort: 8126
              hostPort: 8126
              name: traceport
              protocol: TCP
     # (...)
    ```

- **古いバージョンの Agent（7.17 以前）を使用している場合は**、上記の手順に加えて、`datadog.yaml` トレース Agent マニフェストの *env* セクションで `DD_APM_NON_LOCAL_TRAFFIC` 変数と `DD_APM_ENABLED` 変数を `true` に設定してください。

    ```yaml
     # (...)
          env:
            # (...)
            - name: DD_APM_ENABLED
              value: 'true'
            - name: DD_APM_NON_LOCAL_TRAFFIC
              value: "true"
     # (...)
    ```

{{% /tab %}}
{{% tab "Operator" %}}

`datadog-agent.yaml` マニフェストを次のように更新します。

```
agent:
  image:
    name: "gcr.io/datadoghq/agent:latest"
  apm:
    enabled: true
    hostPort: 8126
```

完全な例については、[APM とメトリクス収集が有効になっているマニフェスト][1]の例を参照してください。

次に、新しいコンフィギュレーションを適用します。

```shell
$ kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

[1]: https://github.com/DataDog/datadog-operator/blob/master/examples/datadog-agent-apm.yaml
{{% /tab %}}
{{< /tabs >}}
   **注**: minikube では、`Unable to detect the kubelet URL automatically` エラーを受け取る可能性があります。その場合は、`DD_KUBELET_TLS_VERIFY=false` を設定してください。

2. **Datadog Agent と通信するためにホスト IP をプルするようにアプリケーションポッドを構成します**:

  - [Datadog Admission Controller][2] を使用して自動的に、または
  - 手動で Downward API を使用して、ホスト IP を取得します。アプリケーションコンテナには、`status.hostIP` をポイントする `DD_AGENT_HOST` 環境変数を定義してください。

    ```yaml
        apiVersion: apps/v1
        kind: Deployment
         # ...
            spec:
              containers:
              - name: "<CONTAINER_NAME>"
                image: "<CONTAINER_IMAGE>"/"<TAG>"
                env:
                  - name: DD_AGENT_HOST
                    valueFrom:
                      fieldRef:
                        fieldPath: status.hostIP
    ```

3. **トレースを送信するようにアプリケーショントレーサーを構成する**: 環境変数 `DD_AGENT_HOST` を使用して、アプリケーションレベルのトレーサーが Datadog Agent ホストの場所をポイントするようにします。その他の例については、[言語ごとの APM インスツルメンテーションドキュメント][3]を参照してください。

## Agent 環境変数

**注**: Datadog では、タグを付ける際のベストプラクティスとして、統合サービスタグ付けを使用することをおすすめしています。統合サービスタグ付けは、`env`、`service`、`version` の 3 つの標準タグを使用して Datadog テレメトリーと結合します。ご使用環境で統合タグ付けを構成する方法に関する詳細は、[統合サービスタグ付け][4]ドキュメントをご参照ください。

Kubernetes で稼働する Agent 内のトレースに利用可能なすべての環境変数をリストします。

| 環境変数       | 説明                                                                                                                                                                                                                                                                                                                 |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DD_API_KEY`               | [Datadog API キー][3]                                                                                                                                                                                                                                                                                                        |
| `DD_PROXY_HTTPS`           | 使用するプロキシの URL をセットアップします。                                                                                                                                                                                                                                                                                        |
| `DD_APM_REPLACE_TAGS`      | [スパンのタグから機密データをスクラブします][5]。                                                                                                                                                                                                                                                                            |
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
| `DD_APM_IGNORE_RESOURCES`  | Agent が無視するリソースを構成します。書式はカンマ区切りの正規表現です。たとえば、<code>GET /ignore-me,(GET\|POST) /and-also-me</code> となります。                                                                                                                                                                          |
| `DD_APM_ANALYZED_SPANS`    | トランザクションを分析するスパンを構成します。書式はカンマ区切りのインスタンス <code>\<サービス名>\|;\<オペレーション名>=1</code>、たとえば、<code>my-express-app\|;express.request=1,my-dotnet-app\|;aspnet_core_mvc.request=1</code> となります。トレーシングクライアントでコンフィギュレーションパラメーターを使用して[自動的に有効化][6]することもできます。 |
| `DD_ENV`                   | Agent によって発行されたすべてのデータにグローバル `env` を設定します。トレースデータに `env` が存在しない場合、この変数が使用されます。詳細については、[APM 環境設定][7]を参照してください。                                                                                                                                                                                                                                                                         |
| `DD_APM_MAX_EPS`           | 1 秒あたりの最大 Indexed Span 数を設定します。デフォルトは 1 秒あたり 200 イベントです。                                                                                                                                                                                                                                               |

### オペレーター環境変数
| 環境変数       | 説明                                                                                                                                                                                                                                                                                                                 |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `agent.apm.enabled`                                                                                          | これを有効にすると、ポート 8126 で APM とトレースが有効になります。[Datadog Docker のドキュメント][8]を参照してください。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `agent.apm.env`                                                                                              | Datadog Agent は、多くの[環境変数][9]をサポートしています。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `agent.apm.hostPort`                                                                                         | ホストで公開するポートの数。指定する場合、これは有効なポート番号 0 < x < 65536 である必要があります。`HostNetwork` を指定する場合、これは `ContainerPort` と一致する必要があります。ほとんどのコンテナはこれを必要としません。                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `agent.apm.resources.limits`                                                                                 | 制限は、許可されるコンピューティングリソースの最大量を表します。詳細については、[Kubernetes のドキュメント][10]を参照してください。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `agent.apm.resources.requests`                                                                               | リクエストには、必要なコンピューティングリソースの最小量を表します。コンテナの `requests` が省略されている場合、明示的に指定されている場合はデフォルトで `limits` になり、それ以外の場合は実装定義の値になります。詳細については、[Kubernetes のドキュメント][10]を参照してください。     |                                                                                                                                                                                                                                                                                                                               |


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/agent/kubernetes/
[2]: /ja/agent/cluster_agent/admission_controller/
[3]: /ja/tracing/setup/
[4]: /ja/getting_started/tagging/unified_service_tagging
[5]: /ja/tracing/guide/security/#replace-rules
[6]: /ja/tracing/app_analytics/#automatic-configuration
[7]: /ja/tracing/guide/setting_primary_tags_to_scope/#environment
[8]: https://github.com/DataDog/docker-dd-agent#tracing-from-the-host
[9]: https://docs.datadoghq.com/ja/agent/docker/?tab=standard#environment-variables
[10]: https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/