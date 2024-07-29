---
algolia:
  tags:
  - Cluster Agent
aliases:
- /ja/agent/cluster_agent/setup
- /ja/agent/cluster_agent/event_collection
- /ja/containers/cluster_agent/event_collection
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: ブログ
  text: Datadog Cluster Agent のご紹介
- link: https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/
  tag: ブログ
  text: Datadog メトリクスを使用して Kubernetes のワークロードをオートスケーリングする
- link: /agent/cluster_agent/clusterchecks/
  tag: ドキュメント
  text: Autodiscovery によるクラスターチェックの実行
- link: /agent/cluster_agent/troubleshooting/
  tag: ドキュメント
  text: Datadog Cluster Agent のトラブルシューティング
title: Datadog Cluster Agent のセットアップ
---

Helm chart v2.7.0+ または Datadog Operator v0.7.0+ を使用して Datadog Agent をデプロイした場合、Cluster Agent はデフォルトで有効化されます。

{{< tabs >}}
{{% tab "Helm" %}}

Helm チャート v2.7.0 以降、Cluster Agent はデフォルトで有効になっています。

古いバージョンで有効にする場合、または `clusterAgent` キーを上書きするカスタム [datadog-values.yaml][1] を使用する場合、以下の Cluster Agent コンフィギュレーションで [datadog-values.yaml][1] ファイルを更新します。

  ```yaml
  clusterAgent:
    # clusterAgent.enabled -- これを false に設定すると、Datadog Cluster Agent が無効になります
    enabled: true
  ```

次に、Datadog Helm チャートをアップグレードします。

これにより、Cluster Agent と Datadog Agent に必要な RBAC ファイルが自動的に更新されます。両方の Agent が同じ API キーを使用します。

また、Cluster Agent と Datadog Agent の両方で共有される `Secret` にランダムなトークンを自動生成し、通信を安全にします。このトークンは `clusterAgent.token` 構成を使用して手動で指定することができます。また、`clusterAgent.tokenExistingSecret` 構成により、`token` 値を含む既存の `Secret` の名前を参照することでも設定できます。

手動で設定する場合、このトークンは 32 文字の英数字である必要があります。

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "Operator" %}}

Datadog Operator v1.0.0 から Cluster Agent はデフォルトで有効になっています。 Operator は必要な RBAC の作成、Cluster Agent のデプロイ、Agent DaemonSet の構成を変更します。

また、Cluster Agent と Datadog Agent の両方で共有される `Secret` にランダムなトークンを自動生成し、通信の安全性を確保します。このトークンは `global.clusterAgentToken` フィールドを設定することで、手動で指定することができます。また、既存の `Secret` の名前と、このトークンを含むデータキーを参照することでも設定できます。

  ```yaml
  apiVersion: datadoghq.com/v2alpha1
  kind: DatadogAgent
  metadata:
    name: datadog
  spec:
    global:
      credentials:
        apiKey: <DATADOG_API_KEY>
      clusterAgentTokenSecret:
        secretName: <SECRET_NAME>
        keyName: <KEY_NAME>
  ```

手動で設定する場合、このトークンは 32 文字の英数字である必要があります。

[1]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md#override
{{% /tab %}}
{{% tab "手動 (DaemonSet)" %}}

DaemonSet を使用して Datadog Cluster Agent をセットアップするには
1. [Cluster Agent RBAC 権限を構成します](#configure-cluster-agent-rbac-permissions)。
2. [Cluster Agent と Agent 間の通信を確立します](#secure-cluster-agent-to-agent-communication)。
3. [Cluster Agent とそのサービスを作成します](#create-the-cluster-agent-and-its-service)。
4. [Cluster Agent と通信するためにノード Agent を構成します](#configure-datadog-agent-communication)。

### Cluster Agent RBAC 権限の構成

Datadog Cluster Agent を実行するには、適切な RBAC が必要です。

1. [Datadog Cluster Agent RBAC フォルダー][1]にあるマニフェストを確認します。**注**: Cluster Agentを使用する場合、Kubernetes API サーバーと通信できるのは Cluster Agent だけで、Node Agent ではないことにご注意ください。

2. Cluster Agent に対する RBAC アクセス許可を構成するには、以下のマニフェストを適用します。（[Node Agent デーモンセット][2]を設定する際に、すでに行っている可能性があります。）

  ```shell
  kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/rbac.yaml"
  kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/cluster-agent-rbac.yaml"
  ```

  これにより、Cluster Agent に適切な `ServiceAccount`、`ClusterRole`、`ClusterRoleBinding` が作成され、ノード Agent の `ClusterRole` が更新されます。

Azure Kubernetes Service (AKS) の場合、追加のアクセス許可が必要になる可能性もあります。[DCA のため AKS で RBAC][3] に関する「よくあるご質問」を参照してください。

### Cluster Agent - Agent 間通信のセキュリティ保護

Datadog Agent と Cluster Agent は、通信を保護するためにトークンを必要とします。このトークンは、Datadog Agent と Cluster Agent の両方が環境変数 `DD_CLUSTER_AGENT_AUTH_TOKEN` で参照できる `Secret` に保存することをお勧めします。これは、一貫性を維持し、トークンが `PodSpec` で読み取り可能になることを防ぐのに役立ちます。

このトークンを作成するには、この 1 行のコマンドを実行して、`token` が設定された `datadog-cluster-agent` という名前の `Secret` を生成します。`<TOKEN>` を 32 文字の英数字に置き換えます。
  ```shell
  kubectl create secret generic datadog-cluster-agent --from-literal=token='<TOKEN>' --namespace="default"
  ```
**注**: これにより、デフォルトネームスペースで `Secret` が作成されます。カスタムネームスペースを使用している場合、実行前にコマンドのネームスペースパラメーターを更新します。

Cluster Agent に提供されているデフォルトの `cluster-agent-deployment.yaml` は、環境変数のコンフィギュレーションでこの `Secret` を参照するように既に構成されています。
  ```yaml
  - name: DD_CLUSTER_AGENT_AUTH_TOKEN
    valueFrom:
      secretKeyRef:
        name: datadog-cluster-agent
        key: token
  ```

この環境変数は、[Datadog Agent の構成][4]で (同じセットアップを使用して) 構成する必要があります。

### Cluster Agent とそのサービスの作成

1. 以下のマニフェストをダウンロードします。

    * [`agent-services.yaml`: Cluster Agent サービスマニフェスト][5]
    * [`secret-api-key.yaml`: Datadog API キーを含むシークレット][6]
    * [`secret-application-key.yaml`: Datadog アプリケーションキーを含むシークレット][7]
    * [`cluster-agent-deployment.yaml`: Cluster Agent マニフェスト][8]
    * [`install_info-configmap.yaml`: Configmap のインストール][9]

2. `secret-api-key.yaml` マニフェストで、`PUT_YOUR_BASE64_ENCODED_API_KEY_HERE` を base64 でエンコードされた [Datadog API キー][10]に置き換えます。API キーの base64 バージョンを取得するには、次のコマンドを実行します。

    ```shell
    echo -n '<Your API key>' | base64
    ```
3. `secrets-application-key.yaml` マニフェストで、`PUT_YOUR_BASE64_ENCODED_APP_KEY_HERE` を base64 でエンコードされた [Datadog アプリケーションキー][11]に置き換えます。
4. デフォルトでは、`cluster-agent-deployment.yaml` マニフェストは、以前に `Secret` `datadog-cluster-agent` で作成されたトークンを参照します。このトークンを代替の方法で保存する場合は、それに応じて `DD_CLUSTER_AGENT_AUTH_TOKEN` 環境変数を構成します。
5. Cluster Agent Deployment が使用するために、これらのリソースをデプロイします。
    ```shell
    kubectl apply -f agent-services.yaml
    kubectl apply -f secret-api-key.yaml
    kubectl apply -f secret-application-key.yaml
    kubectl apply -f install_info-configmap.yaml
    ```
6. 最後に、Datadog Cluster Agent をデプロイします。
    ```shell
    kubectl apply -f cluster-agent-deployment.yaml
    ```

**注**: Datadog Cluster Agent で、環境変数 `DD_SITE` を Datadog サイトに設定します: {{< region-param key="dd_site" code="true" >}}。デフォルトは `US` サイト `datadoghq.com` です。

### 検証

この時点で、次のような状態になっているはずです。

```shell
kubectl get deploy

NAME                    DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
datadog-cluster-agent   1         1         1            1           1d

kubectl get secret

NAME                    TYPE                                  DATA      AGE
datadog-cluster-agent   Opaque                                1         1d

kubectl get pods -l app=datadog-cluster-agent

datadog-cluster-agent-8568545574-x9tc9   1/1       Running   0          2h

kubectl get service -l app=datadog-cluster-agent

NAME                    TYPE           CLUSTER-IP       EXTERNAL-IP        PORT(S)          AGE
datadog-cluster-agent   ClusterIP      10.100.202.234   none               5005/TCP         1d
```

**注**: すでに Datadog Agent を実行している場合は、Cluster Agent の実行を開始する前に、[Agent の `rbac.yaml` マニフェスト][12]を適用する必要がある場合があります。

## Datadog Agent の通信の構成

Datadog Cluster Agent と通信するために、Datadog Agent の構成を変更します。

既存の DaemonSet [マニフェストファイル][2]で、環境変数 `DD_CLUSTER_AGENT_ENABLED` を `true` に設定します。次に、[Secure Cluster-Agent-to-Agent Communication][13] で使用されているのと同じ構文を使用して `DD_CLUSTER_AGENT_AUTH_TOKEN` を設定します。

  ```yaml
  - name: DD_CLUSTER_AGENT_ENABLED
    value: "true"
  - name: DD_CLUSTER_AGENT_AUTH_TOKEN
    valueFrom:
      secretKeyRef:
        name: datadog-cluster-agent
        key: token
  ```

これらの構成で DaemonSet を再デプロイすると、Datadog Agent は Cluster Agent と通信できるようになります。完全な例については、提供されている Cluster Agent [`daemonset.yaml` マニフェスト][14]を参照することができます。

[1]: https://github.com/DataDog/datadog-agent/tree/main/Dockerfiles/manifests/cluster-agent
[2]: /ja/agent/kubernetes/?tab=daemonset
[3]: /ja/agent/faq/rbac-for-dca-running-on-aks-with-helm/
[4]: /ja/agent/cluster_agent/setup/?tab=daemonset#configure-the-datadog-agent
[5]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/agent-services.yaml
[6]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/secret-api-key.yaml
[7]: https://raw.githubusercontent.com/DataDog/datadog-agent/main/Dockerfiles/manifests/cluster-agent/secret-application-key.yaml
[8]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/cluster-agent-deployment.yaml
[9]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/install_info-configmap.yaml
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: https://app.datadoghq.com/access/application-keys
[12]: /ja/agent/cluster_agent/setup/?tab=daemonset#configure-rbac-permissions
[13]: /ja/agent/cluster_agent/setup/?tab=daemonset#secure-cluster-agent-to-agent-communication
[14]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/daemonset.yaml
{{% /tab %}}
{{< /tabs >}}

### 検証

次のコマンドを実行して、Datadog Agent ポッドと Cluster Agent ポッドが実行されていることを確認できます。

```shell
kubectl get pods | grep agent
```

次のようになるはずです。

```shell
datadog-agent-4k9cd                      1/1       Running   0          2h
datadog-agent-4v884                      1/1       Running   0          2h
datadog-agent-9d5bl                      1/1       Running   0          2h
datadog-agent-dtlkg                      1/1       Running   0          2h
datadog-agent-jllww                      1/1       Running   0          2h
datadog-agent-rdgwz                      1/1       Running   0          2h
datadog-agent-x5wk5                      1/1       Running   0          2h
[...]
datadog-cluster-agent-8568545574-x9tc9   1/1       Running   0          2h
```

さらに、[Agent ステータス出力][1]を使用して、Datadog Agent が Cluster Agent に正常に接続したことを確認できます。

```shell
kubectl exec -it <AGENT_POD_NAME> agent status
[...]
=====================
Datadog Cluster Agent
=====================

  - Datadog Cluster Agent endpoint detected: https://10.104.246.194:5005
  Successfully connected to the Datadog Cluster Agent.
  - Running: 1.11.0+commit.4eadd95
```

Datadog アカウントに Kubernetes イベントが流れ込み始め、Agent によって収集された関連メトリクスに、それぞれに対応するクラスターレベルのメタデータがタグ付けされます。

## Windows コンテナ

Datadog Cluster Agent は、Linux ノードにのみデプロイ可能です。

Windows コンテナを監視するには、混在クラスターに 2 つの Helm チャートをインストールします。最初の Helm チャートは、Linux ノード用に Datadog Cluster Agent と Agent DaemonSet をデプロイします (`targetSystem: linux` を使用)。2 つ目の Helm チャート (`targetSystem: windows` を使用) は、Windows ノードにのみ Agent をデプロイし、最初の Helm チャートの一部としてデプロイされた既存の Cluster Agent に接続します。

Windows ノードにデプロイされた Agent と Cluster Agent 間の通信を構成するには、次の `values.yaml` ファイルを使用します。

```yaml
targetSystem: windows
existingClusterAgent:
  join: true
  serviceName: "<EXISTING_DCA_SECRET_NAME>" # Datadog Helm の最初のチャートから
  tokenSecretName: "<EXISTING_DCA_SERVICE_NAME>" # Datadog Helm の最初のチャートから

# datadogMetrics は最初のチャートで既にデプロイされているはずなので、デプロイを無効にします。
datadog-crds:
  crds:
    datadogMetrics: false
# kube-state-metrics のデプロイメントを無効にします
datadog:
  kubeStateMetricsEnabled: false
```

詳しくは、[Windows コンテナの問題のトラブルシューティング][2]をご覧ください。

## AWS の管理型サービスを監視

MSK、ElastiCache、RDS などの AWS マネージドサービスを監視するには、`clusterChecksRunner` を設定して、Helm チャートの serviceAccountAnnotation を介して割り当てられた IAM ロールを持つポッドを作成します。次に、`clusterAgent.confd` の下にインテグレーションコンフィギュレーションを設定します。

{{< code-block lang="yaml" >}}
clusterChecksRunner:
  enabled: true
  rbac:
    # clusterChecksRunner.rbac.create -- true の場合は RBAC リソースを作成・使用
    create: true
    dedicated: true
    serviceAccountAnnotations:
      eks.amazonaws.com/role-arn: arn:aws:iam::***************:role/ROLE-NAME-WITH-MSK-READONLY-POLICY
clusterAgent:
  confd:
    amazon_msk.yaml: |-
      cluster_check: true
      instances:
        - cluster_arn: arn:aws:kafka:us-west-2:*************:cluster/gen-kafka/*******-8e12-4fde-a5ce-******-3
          region_name: us-west-2
{{< /code-block >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#agent-information
[2]: https://docs.datadoghq.com/ja/agent/troubleshooting/windows_containers/#mixed-clusters-linux--windows