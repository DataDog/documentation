---
title: Cluster Agentのドキュメント
kind: documentation
further_reading:
  - link: 'https://www.datadoghq.com/blog/datadog-cluster-agent/'
    tag: ブログ
    text: Datadog Cluster Agent のご紹介
  - link: 'https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/'
    tag: ブログ
    text: Datadog メトリクスを使用して Kubernetes のワークロードをオートスケーリングする
  - link: /agent/cluster_agent/clusterchecks/
    tag: ドキュメント
    text: Autodiscovery によるクラスターチェックの実行
  - link: /agent/kubernetes/daemonset_setup/
    tag: ドキュメント
    text: Kubernetes DaemonSet のセットアップ
  - link: /agent/cluster_agent/troubleshooting/
    tag: ドキュメント
    text: Datadog Cluster Agent のトラブルシューティング
---
お使いの Kubernetes クラスタで Datadog Cluster Agent を設定するには、以下の手順に従います。

1. [Datadog Cluster Agent の設定](#configure-the-datadog-cluster-agent)
2. [Agent を構成し、Datadog Cluster Agent と通信します。](#configure-the-datadog-agent)

## Datadog Cluster Agent を構成する

### 手順 1 - RBAC アクセス許可の構成

Datadog Cluster Agent を実行するには、適切な RBAC が必要です。

1. [Datadog Cluster Agent RBAC フォルダー][1]にあるマニフェストを確認します。Cluster Agentを使用する場合、Kubernetes API サーバーと通信できるのは Cluster Agent だけで、Node Agent ではないことにご注意ください。

2. Cluster Agent に対する RBAC アクセス許可を構成するには、以下のマニフェストを適用します。（[Node Agent デーモンセット][2]を設定する際に、すでに行っている可能性があります。）

  ```shell
  kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/rbac.yaml"
  kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/cluster-agent-rbac.yaml"
  ```

  これにより、Cluster Agent に適切な `ServiceAccount`、`ClusterRole`、`ClusterRoleBinding` が作成されます。

Azure Kubernetes Service (AKS) の場合、追加のアクセス許可が必要になる可能性もあります。[DCA のため AKS で RBAC][3] に関する「よくあるご質問」を参照してください。

### 手順 2 - Cluster Agent - Agent 間通信のセキュリティ保護

次のオプションを 1 つ使用して、Datadog Agent と Datadog Cluster Agent 間の通信を保護します。

* シークレットを作成して、環境変数でアクセスします。
* 環境変数にトークンを設定します。
* ConfigMap でシークレットを管理します。

シークレットを作成せずに値を設定すると、トークンは `PodSpec` で読み込み可能となります。

{{< tabs >}}
{{% tab "Secret" %}}

1. 以下のコマンドを実行して、シークレットトークンを作成します。

    ```shell
    echo -n '<ThirtyX2XcharactersXlongXtoken>' | base64
    ```

2. この 1 行コマンドを実行します。

    ```shell
    kubectl create secret generic datadog-agent-cluster-agent --from-literal=token='<ThirtyX2XcharactersXlongXtoken>'
    ```

    または、[manifest/cluster-agent ディレクトリ][1]にある `agent-secret.yaml` ファイルのシークレットの値を変更するか、以下を使い作成します。

    `kubectl create -f Dockerfiles/manifests/cluster-agent/agent-secret.yaml`

3. Cluster Agent のマニフェスト内で、環境変数 `DD_CLUSTER_AGENT_AUTH_TOKEN` を使用して、このシークレットを参照します。詳細は、[手順 3 - Cluster Agent とそのサービスの作成](#step-3-create-the-cluster-agent-and-its-service)) および [手順 2 - Datadog Cluster Agent の有効化](#step-2-enable-the-datadog-agent)をご覧ください。

[1]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/cluster-agent/agent-secret.yaml
{{% /tab %}}
{{% tab "Environment Variable" %}}

1. 以下のコマンドを実行して、シークレットトークンを作成します。

    ```shell
    echo -n '<ThirtyX2XcharactersXlongXtoken>' | base64
    ```

2. Cluster Agent とノードベースの Agent のマニフェスト内で、環境変数 `DD_CLUSTER_AGENT_AUTH_TOKEN` を使用して、このシークレットを参照します。

    ```yaml
              - name: DD_CLUSTER_AGENT_AUTH_TOKEN
                value: "<ThirtyX2XcharactersXlongXtoken>"
    ```

{{% /tab %}}
{{% tab "ConfigMap" %}}

1. 以下のコマンドを実行して、シークレットトークンを作成します。

    ```shell
    echo -n '<ThirtyX2XcharactersXlongXtoken>' | base64
    ```

2. 選択した変数を使用して、`datadog.yaml` ファイルに `datadog-cluster.yaml` を作成し、対応する ConfigMap を作成します。

    ```shell
    kubectl create configmap dca-yaml --from-file datadog-cluster.yaml
    ```

{{% /tab %}}
{{< /tabs >}}

**注**: この設定は、Cluster Agent のマニフェストとノードエージェントのマニフェストの**両方**で必要です。

### 手順 3 - Cluster Agent とそのサービスの作成

1. 以下のマニフェストをダウンロードします。

  * [`agent-service.yaml`: Cluster Agent サービスマニフェスト][4]
  * [`secrets.yaml`: Datadog API キーを含むシークレット][5]
  * [`cluster-agent-deployment.yaml`: Cluster Agent マニフェスト][6]

2. `secrets.yaml` マニフェストで、`PUT_YOUR_BASE64_ENCODED_API_KEY_HERE` を base64 でエンコードされた [Datadog API キー][7]に置き換えます。

    ```shell
    echo -n '<Your API key>' | base64
    ```

3. `cluster-agent-deployment.yaml` マニフェストで、[手順 2 - Cluster Agent - Agent 間通信のセキュリティ保護](#手順-2-Agent-間通信のセキュリティ保護)のトークンを設定します。その形式は、シークレットの設定方法により異なります。手順はマニフェストを参照してください。
4. 実行: `kubectl apply -f agent-service.yaml`
5. 実行: `kubectl apply -f secrets.yaml`
6. 最後に Datadog Cluster Agent `kubectl apply -f cluster-agent-deployment.yaml` をデプロイします。

### 手順 4 - 検証

この時点で、次のような状態になっているはずです。

```shell
-> kubectl get deploy

NAME                    DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
datadog-cluster-agent   1         1         1            1           1d

-> kubectl get secret

NAME                         TYPE                                  DATA      AGE
datadog-agent-cluster-agent  Opaque                                1         1d

-> kubectl get pods -l app=datadog-cluster-agent

datadog-cluster-agent-8568545574-x9tc9   1/1       Running   0          2h

-> kubectl get service -l app=datadog-cluster-agent

NAME                    TYPE           CLUSTER-IP       EXTERNAL-IP        PORT(S)          AGE
datadog-cluster-agent   ClusterIP      10.100.202.234   none               5005/TCP         1d
```

**注**: すでに Datadog Agent を実行中の場合、[agent-rbac.yaml マニフェスト](#step-1-set-configure-rbac-permissions-for-node-based-agents) を適用しないとCluster Agent が実行されない可能性があります。

## Datadog Agent の構成

Datadog Cluster Agent の設定が終了したら、Datadog Agent と Datadog Cluster Agent が通信するように構成します。

### セットアップ

#### 手順 1 - ノードベースの Agent に対する RBAC アクセス許可の構成

1. [agent-rbac.yaml マニフェスト][8]をダウンロードします。**注**: Cluster Agent を使用する場合、Kubernetes API サーバーと通信できるのは Cluster Agent だけで、Node Agent ではないことにご注意ください。

2. 実行: `kubectl apply -f agent-rbac.yaml`

#### 手順 2 - Datadog Agent の有効化

1. [daemonset.yaml マニフェスト][9]をダウンロードします。

3. `daemonset.yaml` マニフェストで、`<DD_SITE>` を使用中の Datadog サイト（`datadoghq.com` や `datadoghq.eu` など）と置き換えます。この値の初期設定は `datadoghq.com` です。

4. `daemonset.yaml` マニフェストで、[手順 2 - Cluster Agent - Agent 間通信のセキュリティ保護](#手順-2-Agent-間通信のセキュリティ保護)のトークンを設定します。その形式は、シークレットの設定方法により異なります。手順はマニフェストを参照してください。

5. `daemonset.yaml` マニフェストで、環境変数 `DD_CLUSTER_AGENT_ENABLED` が `true` に設定されていることを確認します。

6. (任意) クラスターが単一環境を含む場合、`agent.yaml` で `<DD_ENV>` を設定することも可能です。

7. 次のコマンドで DaemonSet を作成します : `kubectl apply -f daemonset.yaml`

### 検証

次を実行します。

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

Datadog アカウントに Kubernetes イベントが流れ込み始め、Agent によって収集された関連メトリクスに、それぞれに対応するクラスターレベルのメタデータがタグ付けされます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/manifests/cluster-agent
[2]: /ja/agent/kubernetes/
[3]: /ja/agent/faq/rbac-for-dca-running-on-aks-with-helm/
[4]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/agent-services.yaml
[5]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/secrets.yaml
[6]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/cluster-agent-deployment.yaml
[7]: https://app.datadoghq.com/account/settings#api
[8]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/agent-rbac.yaml
[9]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/daemonset.yaml