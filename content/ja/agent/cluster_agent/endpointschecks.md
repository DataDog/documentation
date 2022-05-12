---
aliases:
- /ja/agent/autodiscovery/endpointchecks
- /ja/agent/autodiscovery/endpointschecks
further_reading:
- link: /agent/cluster_agent/clusterchecks/
  tag: ドキュメント
  text: クラスターチェックのドキュメント
- link: agent/kubernetes/host_setup
  tag: ドキュメント
  text: Cluster Agent のドキュメント
kind: ドキュメント
title: Autodiscovery によるエンドポイントチェックの実行
---

## 概要

クラスターチェック機能は、Kubernetes サービスなど、負荷分散されたクラスターサービスを自動検出してチェックを実行する機能を提供します。[サービスベースのクラスターチェック][1]は、サービスとその IP アドレスに関して、希望するチェックの 1 つのインスタンスをスケジュールするために使用されます。 エンドポイントチェックは、このメカニズムを拡張して、Kubernetes サービスによって管理される*各*エンドポイントを監視します。

[Cluster Agent][2] は、Kubernetes サービス上のオートディスカバリーアノテーションに基づいてエンドポイントチェック構成を検出します。その後、Cluster Agent はこれらの構成をノードベースの Agent にディスパッチし、個別に実行させます。エンドポイントチェックは、監視対象の Kubernetes サービスのエンドポイントをバックアップするポッドと同じノード上で実行される Agent にディスパッチされます。このディスパッチロジックにより、Agent は、それぞれのポッドに対して既に自動的に収集したポッドおよびコンテナタグを追加することができます。

Agents は 10 秒ごとに Cluster Agent に接続し、実行するチェックの構成を取得します。エンドポイントチェックから来るメトリクスは、サービスタグ、[Kubernetes タグ][3]、ホストタグ、そして評価された IP アドレスに基づく `kube_endpoint_ip` タグで送信されます。

この機能は、Kubernetes for Agent v6.12.0+ および Cluster Agent v1.3.0+ でサポートされています。v1.4.0 以降、Cluster Agent は、非ポッドバックアップエンドポイントのすべてのエンドポイントチェックを通常のクラスターチェックに変換します。この機能を利用するには、エンドポイントチェックと一緒に[クラスターチェック][4]機能を有効にしてください。

### 例: エンドポイントを持つサービス
以下の例では、NGINX 用の Kubernetes デプロイメントが 3 つのポッドで作成されています。

```shell
# kubectl get pods --selector app=nginx -o wide
NAME                     READY   STATUS    RESTARTS   AGE   IP           NODE
nginx-66d557f4cf-m4c7t   1/1     Running   0          3d    10.0.0.117   gke-cluster-default-pool-4658d5d4-k2sn
nginx-66d557f4cf-smsxv   1/1     Running   0          3d    10.0.1.209   gke-cluster-default-pool-4658d5d4-p39c
nginx-66d557f4cf-x2wzq   1/1     Running   0          3d    10.0.1.210   gke-cluster-default-pool-4658d5d4-p39c
```

サービスも作成されました。この 3 つのエンドポイントを通じてポッドにリンクしています。

```shell
# kubectl get service nginx -o wide
NAME    TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)   AGE   SELECTOR
nginx   ClusterIP   10.3.253.165   <none>        80/TCP    1h    app=nginx
```

```shell
# kubectl get endpoints nginx -o yaml
...
- addresses:
  - ip: 10.0.0.117
    nodeName: gke-cluster-default-pool-4658d5d4-k2sn
    targetRef:
      kind: Pod
      name: nginx-66d557f4cf-m4c7t
      ...
  - ip: 10.0.1.209
    nodeName: gke-cluster-default-pool-4658d5d4-p39c
    targetRef:
      kind: Pod
      name: nginx-66d557f4cf-smsxv
      ...
  - ip: 10.0.1.210
    nodeName: gke-cluster-default-pool-4658d5d4-p39c
    targetRef:
      kind: Pod
      name: nginx-66d557f4cf-x2wzq
      ...
```

サービスベースのクラスターチェックでは、サービスの単一の IP アドレスをテストしますが、エンドポイントチェックは、このサービスに関連する 3 つのエンドポイントの*各々*に対してスケジュールされます。

設計上、エンドポイントチェックは `nginx` サービスのエンドポイントをバックアップするポッドと同じノードで動作する Agent にディスパッチされます。この例では、 `gke-cluster-default-pool-4658d5d4-k2sn` と `gke-cluster-default-pool-4658d5d4-p39c` というノード上で動作する Agent は、これらの `nginx` ポッドに対してチェックを実行します。

## エンドポイントチェックのディスパッチを設定する

{{< tabs >}}
{{% tab "Operator" %}}

クラスターチェックのディスパッチは、Cluster Agent の Operator デプロイメントで `clusterAgent.config.clusterChecksEnabled` 構成キーを使用して有効にします。
```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  # (...)
  clusterAgent:
    config:
      clusterChecksEnabled: true
```

この構成では、Cluster Agent と Agent の間で、クラスターチェックとエンドポイントチェックの両方のディスパッチが可能です。

{{% /tab %}}
{{% tab "Helm" %}}

Cluster Agent の Helm デプロイメントでは、`datadog.clusterChecks.enabled` 構成キーによりこれがデフォルトで有効になっています。
```yaml
datadog:
  clusterChecks:
    enabled: true
  # (...)
clusterAgent:
  enabled: true
  # (...)
```

この構成では、Cluster Agent と Agent の間で、クラスターチェックとエンドポイントチェックの両方のディスパッチが可能です。

{{% /tab %}}

{{% tab "Daemonset" %}}
### Cluster Agent のドキュメント

Datadog **クラスター** Agent で、`kube_endpoints` コンフィギュレーションのプロバイダーとリスナーを有効にします。それには `DD_EXTRA_CONFIG_PROVIDERS` と `DD_EXTRA_LISTENERS` の環境変数を設定します。

```shell
DD_EXTRA_CONFIG_PROVIDERS="kube_endpoints"
DD_EXTRA_LISTENERS="kube_endpoints"
```

**注**: ポッドにホストされないエンドポイントを監視する場合は、[クラスターチェックを有効にする][1]必要があります。それには `kube_services` コンフィギュレーションのプロバイダーとリスナーを追加します。

```shell
DD_EXTRA_CONFIG_PROVIDERS="kube_endpoints kube_services"
DD_EXTRA_LISTENERS="kube_endpoints kube_services"
```

[Agent を再起動][2]して、構成の変更を適用します。

### Cluster Agent のドキュメント

Datadog **ノード** Agent の `endpointschecks` コンフィギュレーションプロバイダーを有効にします。それには 2 つの方法があります。

- `DD_EXTRA_CONFIG_PROVIDERS` の環境変数を設定します。複数の値がある場合には、スペースで区切られたストリングになります。

    ```shell
    DD_EXTRA_CONFIG_PROVIDERS="endpointschecks"
    ```

- または、`datadog.yaml` 構成ファイルに追加します。

    ```yaml
    config_providers:
        - name: endpointschecks
          polling: true
    ```

**注**: ポッドにホストされないエンドポイントを監視する場合は、[クラスターチェックを有効にする][1]必要があります。それには `clusterchecks` コンフィギュレーションプロバイダーを追加します。

```shell
DD_EXTRA_CONFIG_PROVIDERS="endpointschecks clusterchecks"
```

[Agent を再起動][2]して、構成の変更を適用します。

[1]: /ja/agent/cluster_agent/clusterchecks/
[2]: /ja/agent/guide/agent-commands/
{{% /tab %}}
{{< /tabs >}}


## Kubernetes サービスのアノテーションでチェックコンフィギュレーションを設定

[Kubernetes ポッド][5]のアノテーション方法と同様に、サービスにも以下のような構文でアノテーションを付けることができます。

```yaml
ad.datadoghq.com/endpoints.check_names: '[<インテグレーション名>]'
ad.datadoghq.com/endpoints.init_configs: '[<初期コンフィギュレーション>]'
ad.datadoghq.com/endpoints.instances: '[<インスタンスコンフィギュレーション>]'
ad.datadoghq.com/endpoints.logs: '[<ログコンフィギュレーション>]'
```

`%%host%%` の[テンプレート変数][6]がサポートされ、これがエンドポイントの IP に置き換えられます。`kube_namespace`、`kube_service`、`kube_endpoint_ip` のタグは、自動的にインスタンスに追加されます。

**注**: カスタムエンドポイントのログ構成は、Docker ソケットのログ収集時のみサポートされ、Kubernetes のログファイル収集はサポートされません。

### 統合サービスタグ付け
オプションとして、[統合サービスタグ付け][7]を活用するために、これらのチェックで生成されたデータに `env`、`service`、`version` タグを設定することができます。
```yaml
tags.datadoghq.com/env: "<ENV>"
tags.datadoghq.com/service: "<SERVICE>"
tags.datadoghq.com/version: "<VERSION>"
```

#### 例: NGINX によってホストされるサービスの、NGINX チェックによるエンドポイントの HTTP チェック

以下の例では、これらのオプションをすべて利用しています。このサービスは `nginx` デプロイのポッドに関連付けられます。この構成に基づき:

- このサービスをバックアップする各 NGINX ポッドに対して、[`nginx`][8] ベースのエンドポイントチェックがディスパッチされます。このチェックは、NGINX ポッドと同じそれぞれのノード上の Agent によって実行されます (ポッドの IP を `%%host%%` として使用します)。
- [`http_check`][9] ベースのクラスターチェックは、クラスターの 1 つの Agent にディスパッチされます。このチェックはサービスの IP を `%%host%%` として使用し、自動的にそれぞれのエンドポイントに負荷が分散されます。
- チェックは、統合サービスタグ付けラベルに対応する `env:prod`、`service:my-nginx`、`version:1.19.0` のタグでディスパッチされます。

```yaml
apiVersion: v1
kind: Service
metadata:
    name: nginx
    labels:
        app: nginx
        tags.datadoghq.com/env: "prod"
        tags.datadoghq.com/service: "my-nginx"
        tags.datadoghq.com/version: "1.19.0"
    annotations:
        ad.datadoghq.com/endpoints.check_names: '["nginx"]'
        ad.datadoghq.com/endpoints.init_configs: '[{}]'
        ad.datadoghq.com/endpoints.instances: |
            [
              {
                "name": "My Nginx Service Endpoints",
                "nginx_status_url": "http://%%host%%:%%port%%/nginx_status"
              }
            ]
        ad.datadoghq.com/service.check_names: '["http_check"]'
        ad.datadoghq.com/service.init_configs: '[{}]'
        ad.datadoghq.com/service.instances: |
            [
              {
                "name": "My Nginx Service",
                "url": "http://%%host%%"
              }
            ]
        ad.datadoghq.com/endpoints.logs: '[{"source":"nginx","service":"webapp"}]'
spec:
    ports:
        - port: 80
          protocol: TCP
    selector:
        app: nginx
```

## トラブルシューティング

エンドポイントチェックのトラブルシューティングは、[クラスターチェックのトラブルシューティング][10]と似ています。唯一の違いは、クラスターチェックと同時にエンドポイントチェックをスケジューリングするノードベースの Agent に対して行われる点です。

**注**: エンドポイントチェックは、監視されるサービスのエンドポイントをホストするポッドと同じノードで動作している Agent によってスケジューリングされます。エンドポイントがポッドをホストしない場合は、クラスター Agent がエンドポイントチェックをクラスター チェックに変換します。このクラスターチェックは、どのノードの Agent でも実行できます。

### ノードベースの Agent 内のオートディスカバリー

Agent の `configcheck` コマンドは、`endpoints-checks` ソースを付けてインスタンスを表示します。

```shell
# kubectl exec <NODE_AGENT_POD_NAME> agent configcheck
...
=== nginx check ===
Configuration provider: endpoints-checks
Configuration source: kube_endpoints:kube_endpoint_uid://default/nginx/
Instance ID: nginx:956741d8796d940c
nginx_status_url: http://10.0.0.75/nginx_status/
tags:
- pod_phase:running
- kube_deployment:nginx
- kube_service:nginx
- kube_namespace:default
- kube_endpoint_ip:10.0.0.75
- cluster_name:cluster
~
Init Config:
{}
Auto-discovery IDs:
* kube_endpoint_uid://default/nginx/10.0.0.75
* kubernetes_pod://4e733448-f57e-11e9-8123-42010af001ed
State: dispatched to gke-cluster-default-pool-4658d5d4-qfnt
===
```

### Agent のステータス

Agent の `status` コマンドは、正しく実行されて報告を行っているチェックインスタンスを表示します。

```shell
# kubectl exec <NODE_AGENT_POD_NAME> agent status
...
    nginx (4.0.0)
    -------------
      Instance ID: nginx:956741d8796d940c [OK]
      Configuration Source: kube_endpoints:kube_endpoint_uid://default/nginx/
      Total Runs: 443
      Metric Samples: Last Run: 7, Total: 3,101
      Events: Last Run: 0, Total: 0
      Service Checks: Last Run: 1, Total: 443
      Average Execution Time : 5ms
```

### Cluster Agent 内のオートディスカバリー

Cluster Agent の `clusterchecks` コマンドは、`kubernetes-endpoints` ソースを付けてインスタンスを表示します。

```shell
# kubectl exec <クラスター AGENT のポッド名> agent clusterchecks
...
===== 3 Pod-backed Endpoints-Checks scheduled =====

=== nginx check ===
Configuration provider: kubernetes-endpoints
Configuration source: kube_endpoints:kube_endpoint_uid://default/nginx/
Instance ID: nginx:My Nginx Service Endpoints:f139adc46c81828e
name: My Nginx Endpoints
nginx_status_url: http://10.0.0.75/nginx_status/
tags:
- kube_service:nginx
- kube_namespace:default
- kube_endpoint_ip:10.0.0.75
- cluster_name:cluster
~
Init Config:
{}
Auto-discovery IDs:
* kube_endpoint_uid://default/nginx/10.0.0.75
* kubernetes_pod://4e733448-f57e-11e9-8123-42010af001ed
State: dispatched to gke-cluster-default-pool-4658d5d4-qfnt
===
...
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/cluster_agent/clusterchecks/?tab=helm#configuration-from-kubernetes-service-annotations
[2]: /ja/agent/cluster_agent
[3]: /ja/agent/kubernetes/tag/?tab=containerizedagent#out-of-the-box-tags
[4]: /ja/agent/cluster_agent/clusterchecks/
[5]: /ja/agent/kubernetes/integrations/?tab=kubernetes#template-source-kubernetes-pod-annotations
[6]: /ja/agent/kubernetes/integrations/?tab=kubernetes#supported-template-variables
[7]: /ja/getting_started/tagging/unified_service_tagging
[8]: /ja/integrations/nginx/
[9]: /ja/integrations/http_check/
[10]: /ja/agent/cluster_agent/troubleshooting/