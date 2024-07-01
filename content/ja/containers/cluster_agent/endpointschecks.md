---
aliases:
- /ja/agent/autodiscovery/endpointchecks
- /ja/agent/autodiscovery/endpointschecks
- /ja/agent/cluster_agent/endpointschecks
further_reading:
- link: agent/kubernetes/host_setup
  tag: ドキュメント
  text: Cluster Agent
- link: /containers/cluster_agent/clusterchecks/
  tag: ドキュメント
  text: クラスターチェック
- link: /containers/cluster_agent/troubleshooting#endpoint-checks
  tag: ドキュメント
  text: エンドチェックのトラブルシューティング
title: オートディスカバリーによるエンドポイントチェック
---

## 概要

クラスターチェック機能は、Kubernetes サービスなど、負荷分散型のクラスターサービスを[自動検出][1]してチェックを実行する機能を提供します。_エンドポイントチェック_はこのメカニズムを拡張し、Kubernetes サービスによって管理される各エンドポイントを監視します。

[Cluster Agent][2] は、Kubernetes サービス上の[オートディスカバリー][1]アノテーションに基づいてエンドポイントチェック構成を検出します。その後、Cluster Agent はこれらの構成をノードベースの Agent にディスパッチし、個別に実行させます。エンドポイントチェックは、監視対象の Kubernetes サービスのエンドポイントの背後にあるポッドと同じノード上で実行される Agent にディスパッチされます。このディスパッチロジックにより、Agent は、それぞれのポッドに対して既に収集したポッドおよびコンテナタグを追加することができます。

ノートベースの Agent は 10 秒ごとに Cluster Agent に接続し、実行するチェックの構成を取得します。エンドポイントチェックで取得したメトリクスは、サービスタグ、[Kubernetes タグ][3]、ホストタグ、そして評価対象の IP アドレスに応じた `kube_endpoint_ip` タグを付けて送信されます。

**バージョニング**:
この機能は、Kubernetes for Datadog Agent v6.12.0 以上および Datadog Cluster Agent v1.3.0 以上でサポートされています。v1.4.0 以上の Cluster Agent では、配下にポッドを持たないエンドポイントに対するエンドポイントチェックが、すべて通常のクラスターチェックに変換されます。この機能を利用するには、(エンドポイントチェック機能に加えて) [クラスターチェック][4]機能を有効にしてください。

**注:** サービスの背後にあるポッドが静的なものである場合、アノテーション `ad.datadoghq.com/endpoints.resolve` を追加する必要があります。Datadog Cluster Agent は、エンドポイントチェックとしてチェックをスケジュールし、[クラスターチェックランナー][5]にディスパッチします。Kubernetes API サーバーでこのアノテーションを使用した[例を参照][6]してください。

### 例: エンドポイントを持つサービス
以下の例では、NGINX 用の Kubernetes デプロイメントが 3 つのポッドで作成されています。

```shell
kubectl get pods --selector app=nginx -o wide
NAME                     READY   STATUS    RESTARTS   AGE   IP           NODE
nginx-66d557f4cf-m4c7t   1/1     Running   0          3d    10.0.0.117   gke-cluster-default-pool-4658d5d4-k2sn
nginx-66d557f4cf-smsxv   1/1     Running   0          3d    10.0.1.209   gke-cluster-default-pool-4658d5d4-p39c
nginx-66d557f4cf-x2wzq   1/1     Running   0          3d    10.0.1.210   gke-cluster-default-pool-4658d5d4-p39c
```

サービスも作成されました。この 3 つのエンドポイントを通じてポッドにリンクしています。

```shell
kubectl get service nginx -o wide
NAME    TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)   AGE   SELECTOR
nginx   ClusterIP   10.3.253.165   <none>        80/TCP    1h    app=nginx
```

```shell
kubectl get endpoints nginx -o yaml
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

サービスベースのクラスターチェックでは、サービスの単一の IP アドレスをテストしますが、エンドポイントチェックは、このサービスと関連付けられた 3 つのエンドポイントの**各々**に対してスケジュールされます。

設計上、エンドポイントチェックは、この `nginx` サービスのエンドポイントの背後にあるポッドと同じノードで動作する Agent にディスパッチされます。この例では、 `gke-cluster-default-pool-4658d5d4-k2sn` と `gke-cluster-default-pool-4658d5d4-p39c` というノード上で動作する Agent が、これらの `nginx` ポッドに対してチェックを実行します。

## エンドポイントチェックのディスパッチを設定する

{{< tabs >}}
{{% tab "Operator" %}}

エンドポイントチェックのディスパッチは、Cluster Agent の Operator デプロイメントで `features.clusterChecks.enabled` 構成キーを使用して有効にします。
```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  features:
    clusterChecks:
      enabled: true
```

この構成では、Cluster Agent と ノードベースの Agent との間で、クラスターチェックとエンドポイントチェックの両方のディスパッチが可能です。

{{% /tab %}}
{{% tab "Helm" %}}

Cluster Agent の Helm デプロイメントでは、`datadog.clusterChecks.enabled` 構成キーにより、エンドポイントチェックのディスパッチがデフォルトで有効になっています。
```yaml
datadog:
  clusterChecks:
    enabled: true
  # (...)
clusterAgent:
  enabled: true
  # (...)
```

この構成では、Cluster Agent と Agent との間で、クラスターチェックとエンドポイントチェックの両方のディスパッチが可能です。

{{< /tabs >}}

{{% tab "DaemonSet" %}}
### Cluster Agent の設定

Datadog Cluster Agent で、`kube_endpoints` コンフィギュレーションプロバイダーとリスナーを有効にします。環境変数 `DD_EXTRA_CONFIG_PROVIDERS` と `DD_EXTRA_LISTENERS` を設定します。

```shell
DD_EXTRA_CONFIG_PROVIDERS="kube_endpoints"
DD_EXTRA_LISTENERS="kube_endpoints"
```

**注**: 監視するエンドポイントの配下にポッドが存在しない場合は、[クラスターチェックを有効にする][1]必要があります。`kube_services` コンフィギュレーションプロバイダーとリスナーを追加します。

```shell
DD_EXTRA_CONFIG_PROVIDERS="kube_endpoints kube_services"
DD_EXTRA_LISTENERS="kube_endpoints kube_services"
```

[Agent を再起動][2]して、構成の変更を適用します。

### Agent の設定

ノードベースの Agent で `endpointschecks` コンフィギュレーションプロバイダーを有効にします。これには 2 つの方法があります。

- 環境変数 `DD_EXTRA_CONFIG_PROVIDERS` を設定します。複数の値がある場合は、スペース区切りの文字列で指定します。

    ```shell
    DD_EXTRA_CONFIG_PROVIDERS="endpointschecks"
    ```

- または、`datadog.yaml` 構成ファイルに追加します。

    ```yaml
    config_providers:
        - name: endpointschecks
          polling: true
    ```

**注**: 監視するエンドポイントの配下にポッドが存在しない場合は、[クラスターチェックを有効にする][1]必要があります。それには `clusterchecks` コンフィギュレーションプロバイダーを追加します。

```shell
DD_EXTRA_CONFIG_PROVIDERS="endpointschecks clusterchecks"
```

[Agent を再起動][2]して、構成の変更を適用します。

[1]: /ja/agent/cluster_agent/clusterchecks/
[2]: /ja/agent/guide/agent-commands/
{{% /tab %}}
{{< /tabs >}}


## チェック構成の設定

### 静的なコンフィギュレーションファイルからの構成

Cluster Agent v1.18.0 からは、Kubernetes エンドポイントを対象としたチェック構成で、`advanced_ad_identifiers` と[オートディスカバリーテンプレート変数][7]を使用できます ([例をご参照ください][8])。

#### 例: Kubernetes エンドポイントでの HTTP チェック

Kubernetes サービスのエンドポイントに対して [HTTP チェック][9]を実行する場合

{{< tabs >}}
{{% tab "Helm" %}}
`clusterAgent.confd` フィールドを使用して、チェックの構成を定義します。

```yaml
#(...)
clusterAgent:
  confd:
    <INTEGRATION_NAME>.yaml: |-
      advanced_ad_identifiers:
        - kube_endpoints:
            name: "<ENDPOINTS_NAME>"
            namespace: "<ENDPOINTS_NAMESPACE>"
      cluster_check: true
      init_config:
      instances:
        - url: "http://%%host%%"
          name: "<EXAMPLE_NAME>"
```

{{% /tab %}}
{{% tab "DaemonSet" %}}
Cluster Agent コンテナに以下の内容で `/conf.d/http_check.yaml` ファイルをマウントします。

```yaml
advanced_ad_identifiers:
  - kube_endpoints:
      name: "<ENDPOINTS_NAME>"
      namespace: "<ENDPOINTS_NAMESPACE>"
cluster_check: true
init_config:
instances:
  - url: "http://%%host%%"
    name: "<EXAMPLE_NAME>"
```

{{% /tab %}}
{{< /tabs >}}

### Kubernetes のサービスアノテーションからの構成

{{< tabs >}}
{{% tab "Kubernetes (AD v2)" %}}

**注:** AD Annotations v2 は、インテグレーション構成を簡素化するために、Datadog Agent 7.36 で導入されました。Datadog Agent の以前のバージョンでは、AD Annotations v1 を使用してください。

サービスにアノテーションするための構文は、[Kubernetes ポッドにアノテーションする][1]のと同様です。

```yaml
ad.datadoghq.com/endpoints.checks: |
  {
    "<INTEGRATION_NAME>": {
      "init_config": <INIT_CONFIG>,
      "instances": [<INSTANCE_CONFIG>]
    }
  }
ad.datadoghq.com/endpoints.logs: '[<LOGS_CONFIG>]'
```

この構文は `%%host%%` [テンプレート変数][11]をサポートしており、この変数が各エンドポイントの IP に置き換えられます。インスタンスには `kube_namespace`、 `kube_service`、`kube_endpoint_ip` のタグが自動的に追加されます。

**注**: カスタムエンドポイントのログ構成は、Docker ソケットのログ収集時のみサポートされ、Kubernetes のログファイル収集はサポートされません。

#### 例: NGINX を使ったサービスに対する HTTP チェックと、サービスのエンドポイントに対する NGINX チェック

このサービスは `nginx` デプロイメントのポッドに関連付けられています。この構成に基づき:

- このサービスの背後にある各 NGINX ポッドに対して、[`nginx`][12] ベースのエンドポイントチェックがディスパッチされます。このチェックは、NGINX ポッドと同じそれぞれのノード上の Agent によって実行されます (ポッドの IP を `%%host%%` として使用します)。
- [`http_check`][9] ベースのクラスターチェックは、クラスター内の 1 つの Agent にディスパッチされます。このチェックはサービスの IP を `%%host%%` として使用し、自動的にそれぞれのエンドポイントに負荷が分散されます。
- チェックは、[統合サービスタグ付け][13]ラベルに対応する `env:prod`、`service:my-nginx`、`version:1.19.0` のタグでディスパッチされます。

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
      ad.datadoghq.com/service.checks: |
        {
          "http_check": {
            "init_config": {},
            "instances": [
              {
                "url": "http://%%host%%",
                "name": "My Nginx",
                "timeout": 1
              }
            ]
          }
        }
      ad.datadoghq.com/endpoints.checks: |
        {
          "nginx": {
            "init_config": {},
            "instances": [
              {
                "name": "My Nginx Service Endpoints",
                "nginx_status_url": "http://%%host%%:%%port%%/status/"
              }
            ]
          }
        }
      ad.datadoghq.com/endpoints.logs: '[{"source":"nginx","service":"webapp"}]'
spec:
    ports:
        - port: 80
          protocol: TCP
    selector:
        app: nginx
```

[1]: /ja/containers/kubernetes/integrations/?tab=kubernetesadv2
[9]: /ja/integrations/http_check/
[11]: /ja/agent/kubernetes/integrations/?tab=kubernetes#supported-template-variables
[12]: /ja/integrations/nginx/
[13]: /ja/getting_started/tagging/unified_service_tagging

{{% /tab %}}

{{% tab "Kubernetes (AD v1)" %}}

サービスにアノテーションするための構文は、[Kubernetes ポッドにアノテーションする][10]のと同様です。

```yaml
ad.datadoghq.com/endpoints.check_names: '[<INTEGRATION_NAME>]'
ad.datadoghq.com/endpoints.init_configs: '[<INIT_CONFIG>]'
ad.datadoghq.com/endpoints.instances: '[<INSTANCE_CONFIG>]'
ad.datadoghq.com/endpoints.logs: '[<LOGS_CONFIG>]'
```

この構文は `%%host%%` [テンプレート変数][11]をサポートしており、この変数が各エンドポイントの IP に置き換えられます。インスタンスには `kube_namespace`、 `kube_service`、`kube_endpoint_ip` のタグが自動的に追加されます。

**注**: カスタムエンドポイントのログ構成は、Docker ソケットのログ収集時のみサポートされ、Kubernetes のログファイル収集はサポートされません。

#### 例: NGINX を使ったサービスに対する HTTP チェックと、サービスのエンドポイントに対する NGINX チェック

このサービスは `nginx` デプロイメントのポッドに関連付けられています。この構成に基づき:

- このサービスの背後にある各 NGINX ポッドに対して、[`nginx`][12] ベースのエンドポイントチェックがディスパッチされます。このチェックは、NGINX ポッドと同じそれぞれのノード上の Agent によって実行されます (ポッドの IP を `%%host%%` として使用します)。
- [`http_check`][9] ベースのクラスターチェックは、クラスター内の 1 つの Agent にディスパッチされます。このチェックはサービスの IP を `%%host%%` として使用し、自動的にそれぞれのエンドポイントに負荷が分散されます。
- チェックは、[統合サービスタグ付け][13]ラベルに対応する `env:prod`、`service:my-nginx`、`version:1.19.0` のタグでディスパッチされます。

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

[9]: /ja/integrations/http_check/
[10]: /ja/agent/kubernetes/integrations/?tab=kubernetes#template-source-kubernetes-pod-annotations
[11]: /ja/agent/kubernetes/integrations/?tab=kubernetes#supported-template-variables
[12]: /ja/integrations/nginx/
[13]: /ja/getting_started/tagging/unified_service_tagging
{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/containers/kubernetes/integrations/?tab=kubernetesadv2
[2]: /ja/agent/cluster_agent
[3]: /ja/agent/kubernetes/tag/?tab=containerizedagent#out-of-the-box-tags
[4]: /ja/agent/cluster_agent/clusterchecks/
[5]: /ja/containers/guide/clustercheckrunners
[6]: /ja/containers/kubernetes/control_plane/?tab=helm#api-server-2
[7]: /ja/agent/guide/template_variables/
[8]: /ja/agent/cluster_agent/endpointschecks/#example-http_check-on-kubernetes-endpoints
[9]: /ja/integrations/http_check/
[10]: /ja/agent/kubernetes/integrations/?tab=kubernetes#template-source-kubernetes-pod-annotations
[11]: /ja/agent/kubernetes/integrations/?tab=kubernetes#supported-template-variables
[12]: /ja/integrations/nginx/
[13]: /ja/getting_started/tagging/unified_service_tagging