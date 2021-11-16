---
title: Autodiscovery によるエンドポイントチェックの実行
kind: ドキュメント
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
---
## 概要

クラスターチェックは、負荷分散型のクラスターサービス（Kubernetes サービスなど）でオートディスカバリーを行い、チェックを実行する働きを持ちます。

エンドポイントチェックは機能を拡張し、クラスターサービスのあらゆるエンドポイントを監視します。

[クラスター Agent][1] はコンフィギュレーションを保持し、公開することで、ノードベースの Agent がそれを読み込んでエンドポイントチェックに変換できるようにします。

エンドポイントチェックは、監視されるサービスのエンドポイントをホストするポッドと同じノードで動作している Agent によってスケジューリングされます。

Agent は 10 秒おきにクラスター Agent に接続し、チェックを実行するためのコンフィギュレーションを取得します。また、エンドポイントチェックからメトリクスを受け取ると、サービス、ポッド、ホストのタグを付けて転送します。

この機能は、Kubernetes 上で Agent のバージョン 6.12.0+ および Cluster Agent のバージョン 1.3.0+ でサポートされています。

バージョン 1.4.0 より、クラスター Agent は、ポッドにホストされないエンドポイントのチェックをすべて、通常のクラスターチェックに変換するようになりました。この機能を利用するには、[クラスターチェック][2]機能を、エンドポイントチェックと合わせて有効にする必要があります。

#### 例: `nginx` サービスによって公開された 3 つの NGINX ポッド

```shell
# kubectl get svc nginx -o wide
NAME    TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)   AGE   SELECTOR
nginx   ClusterIP   10.3.253.165   <none>        80/TCP    1h    app=nginx
```

```shell
# kubectl get pods --selector app=nginx
NAME                     READY   STATUS    RESTARTS   AGE
nginx-758655469f-59q9z   1/1     Running   0          20h
nginx-758655469f-k8zrc   1/1     Running   0          20h
nginx-758655469f-lk9p6   1/1     Running   0          20h
```

```shell
# kubectl get ep nginx -o yaml
...
- addresses:
  - ip: 10.0.0.117
    nodeName: gke-cluster-default-pool-4658d5d4-k2sn
    targetRef:
      kind: Pod
      name: nginx-758655469f-lk9p6
      ...
  - ip: 10.0.1.209
    nodeName: gke-cluster-default-pool-4658d5d4-p39c
    targetRef:
      kind: Pod
      name: nginx-758655469f-59q9z
      ...
  - ip: 10.0.1.210
    nodeName: gke-cluster-default-pool-4658d5d4-p39c
    targetRef:
      kind: Pod
      name: nginx-758655469f-k8zrc
      ...
```

エンドポイントチェックは、`nginx` サービスのエンドポイントをホストするポッドと同じノードで動作している Agent によってスケジューリングされます。したがって、この例であれば、`gke-cluster-default-pool-4658d5d4-k2sn` と `gke-cluster-default-pool-4658d5d4-p39c` のノードで動作する Agent だけが、`nginx` ポッドでのチェックをスケジューリングすることになります。

このような仕組みになっているのは、[オートディスカバリー][3]を利用するためと、これらのポッドから受け取るメトリクスにポッドとコンテナーのタグを付けるためです。

## 設定方法

### Cluster Agent のドキュメント

Datadog **クラスター** Agent で、`kube_endpoints` コンフィギュレーションのプロバイダーとリスナーを有効にします。それには `DD_EXTRA_CONFIG_PROVIDERS` と `DD_EXTRA_LISTENERS` の環境変数を設定します。

```shell
DD_EXTRA_CONFIG_PROVIDERS="kube_endpoints"
DD_EXTRA_LISTENERS="kube_endpoints"
```

**注**: ポッドにホストされないエンドポイントを監視する場合は、[クラスターチェックを有効にする][4]必要があります。それには `kube_services` コンフィギュレーションのプロバイダーとリスナーを追加します。

```shell
DD_EXTRA_CONFIG_PROVIDERS="kube_endpoints kube_services"
DD_EXTRA_LISTENERS="kube_endpoints kube_services"
```

[Agent を再起動][5]して、コンフィギュレーションへの変更を適用します。

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

**注**: ポッドにホストされないエンドポイントを監視する場合は、[クラスターチェックを有効にする][2]必要があります。それには `clusterchecks` コンフィギュレーションプロバイダーを追加します。

```shell
DD_EXTRA_CONFIG_PROVIDERS="endpointschecks clusterchecks"
```

[Agent を再起動][5]して、コンフィギュレーションへの変更を適用します。

## Kubernetes サービスのアノテーションでチェックコンフィギュレーションを設定

[Kubernetes ポッドへのアノテーション][6]と同様に、次の構文でサービスにアノテーションを追加できます。

```yaml
ad.datadoghq.com/endpoints.check_names: '[<インテグレーション名>]'
ad.datadoghq.com/endpoints.init_configs: '[<初期コンフィギュレーション>]'
ad.datadoghq.com/endpoints.instances: '[<インスタンスコンフィギュレーション>]'
ad.datadoghq.com/endpoints.logs: '[<ログコンフィギュレーション>]'
```

`%%host%%` の[テンプレート変数][7]がサポートされ、これがエンドポイントの IP に置き換えられます。`kube_namespace`、`kube_service`、`kube_endpoint_ip` のタグは、自動的にインスタンスに追加されます。

### テンプレートソース: 標準ラベル

```yaml
tags.datadoghq.com/env: "<ENV>"
tags.datadoghq.com/service: "<SERVICE>"
tags.datadoghq.com/version: "<VERSION>"
```

`tags.datadoghq.com` ラベルは、チェックによって生成されたデータのタグとして、`env`、`service`、さらには `version` を設定します。
これらの標準ラベルは、[統合サービスタグ付け][8]の一部です。

#### 例: NGINX によってホストされるサービスの、NGINX チェックによるエンドポイントの HTTP チェック

次のサービス定義は、`my-nginx` デプロイからポッドを公開します。続いて、[HTTP チェック][9]を実行して負荷分散型サービスのレイテンシーを測定し、サービスのエンドポイントをホストするポッド上で [NGINX チェック][10]を実行して `NGINX` のメトリクスを収集し、ポッドレベルでサービスチェックを実行します。

```yaml
apiVersion: v1
kind: Service
metadata:
    name: my-nginx
    labels:
        run: my-nginx
        tags.datadoghq.com/env: "prod"
        tags.datadoghq.com/service: "my-nginx"
        tags.datadoghq.com/version: "1.19.0"
    annotations:
        ad.datadoghq.com/service.check_names: '["http_check"]'
        ad.datadoghq.com/service.init_configs: '[{}]'
        ad.datadoghq.com/service.instances: |
            [
              {
                "name": "My Nginx Service",
                "url": "http://%%host%%",
                "timeout": 1
              }
            ]
        ad.datadoghq.com/endpoints.check_names: '["nginx"]'
        ad.datadoghq.com/endpoints.init_configs: '[{}]'
        ad.datadoghq.com/endpoints.instances: |
            [
              {
                "name": "My Nginx Service Endpoints",
                "nginx_status_url": "http://%%host%%:%%port%%/nginx_status"
              }
            ]
        ad.datadoghq.com/endpoints.logs: '[{"source":"nginx","service":"webapp"}]'
spec:
    ports:
        - port: 80
          protocol: TCP
    selector:
        run: my-nginx
```

## トラブルシューティング

エンドポイントチェックのトラブルシューティングは、[クラスターチェックのトラブルシューティング][11]と似ています。唯一の違いは、クラスターチェックと同時にエンドポイントチェックをスケジューリングするノードベースの Agent に対して行われる点です。

**注**: エンドポイントチェックは、監視されるサービスのエンドポイントをホストするポッドと同じノードで動作している Agent によってスケジューリングされます。エンドポイントがポッドをホストしない場合は、クラスター Agent がエンドポイントチェックをクラスター チェックに変換します。このクラスターチェックは、どのノードの Agent でも実行できます。

### ノードベースの Agent 内のオートディスカバリー

Agent の `configcheck` コマンドは、`endpoints-checks` ソースを付けてインスタンスを表示します。

```shell
# kubectl exec <ノードの Agent のポッド名> agent configcheck
...
=== nginx check ===
Configuration provider: endpoints-checks
Configuration source: kube_endpoints:kube_endpoint_uid://default/nginx/
Instance ID: nginx:My Nginx Service Endpoints:2f7fd6b090782d6b
name: My Nginx Endpoints
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
# kubectl exec <ノードの Agent のポッド名> agent status
...
    nginx (3.4.0)
    -------------
      Instance ID: nginx:My Nginx Service Endpoints:2f7fd6b090782d6b [OK]
      Configuration Source: kube_endpoints:kube_endpoint_uid://default/nginx/
      Total Runs: 443
      Metric Samples: Last Run: 7, Total: 3,101
      Events: Last Run: 0, Total: 0
      Service Checks: Last Run: 1, Total: 443
      Average Execution Time : 5ms
```

### Cluster Agent 内のオートディスカバリー

Agent の `configcheck` コマンドは、`kubernetes-endpoints` ソースを付けてインスタンスを表示します。

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

[1]: /ja/agent/kubernetes/cluster/
[2]: /ja/agent/cluster_agent/clusterchecks/
[3]: /ja/agent/kubernetes/integrations/
[4]: /ja/agent/kubernetes/cluster/#cluster-checks-autodiscovery
[5]: /ja/agent/guide/agent-commands/
[6]: /ja/agent/kubernetes/integrations/?tab=kubernetes#template-source-kubernetes-pod-annotations
[7]: /ja/agent/kubernetes/integrations/?tab=kubernetes#supported-template-variables
[8]: /ja/getting_started/tagging/unified_service_tagging
[9]: /ja/integrations/http_check/
[10]: /ja/integrations/nginx/
[11]: /ja/agent/cluster_agent/troubleshooting/