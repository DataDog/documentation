---
aliases:
- /ja/agent/kubernetes/daemonset_setup
- /ja/agent/kubernetes/helm
- /ja/agent/kubernetes/installation
further_reading:
- link: /agent/kubernetes/configuration
  tag: Documentation
  text: Further Configure the Datadog Agent on Kubernetes
- link: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md#all-configuration-options
  tag: Source Code
  text: Datadog Helm chart - All configuration options
- link: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md#upgrading
  tag: Source Code
  text: Upgrading Datadog Helm
title: Install the Datadog Agent on Kubernetes
---

## 概要

このページでは、Kubernetes 環境に Datadog Agent をインストールする手順を説明します。

AWS Elastic Kubernetes Service (EKS)、Azure Kubernetes Service (AKS)、Google Kubernetes Engine (GKE)、Red Hat OpenShift、Rancher、Oracle Container Engine for Kubernetes (OKE) など主要な Kubernetes ディストリビューションの専用ドキュメントやサンプルは [Kubernetes ディストリビューション][1]に掲載されています。

Kubernetes のコントロールプレーンを監視するための専用のドキュメントと例については、[Kubernetes のコントロールプレーン監視][2]を参照してください。

### Kubernetes と Datadog Agent の最小バージョン

Kubernetes の後期バージョンに関連する一部の機能では、Datadog Agent の最低バージョンが必要です。

| Kubernetes バージョン | Agent バージョン  | 理由                                |
|--------------------|----------------|---------------------------------------|
| 1.16.0+            | 7.19.0+        | Kubelet メトリクスの非推奨化           |
| 1.21.0+            | 7.36.0+        |  Kubernetes リソースの非推奨化       |
| 1.22.0+            | 7.37.0+        |  ダイナミックサービスアカウントトークンをサポート |

こちらもご覧ください: [Kubernetes と Cluster Agent の最小バージョン][8]

## インストール

Datadog の [Installing on Kubernetes][16] ページを利用すると、インストールプロセスの説明が表示されます。

1. **インストール方法を選択する**

   以下のインストール方法のいずれかを使用します。

   - [Datadog Operator][9] (推奨): Kubernetes や OpenShift に Datadog Agent をデプロイするために利用できる Kubernetes [オペレーター][10]。カスタムリソースステータスでデプロイ状況、健全性、エラーを報告し、高度な構成オプションで構成ミスのリスクを抑えます。
   - [Helm][11]
   - 手動インストール。[Datadog Agent を DaemonSet で手動でインストール、構成する][12]を参照してください。

{{< tabs >}}
{{% tab "Datadog Operator" %}}
<div class="alert alert-info"><a href="https://helm.sh">Helm</a> と <a href="https://kubernetes.io/docs/tasks/tools/#kubectl">kubectl CLI</a> が必要です。</div>

2. **Datadog Operator をインストールする**

   現在のネームスペースに Datadog Operator をインストールするには、以下を実行します：
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm install datadog-operator datadog/datadog-operator
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY>
   ```
   - `<API_キー>` を、ご使用の [Datadog API キー][1]に置き換えます。

3. **`datadog-agent.yaml` を構成する**

   以下の設定を含む `datadog-agent.yaml` というファイルを作成します。
   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     global:
       clusterName: <CLUSTER_NAME>
       site: <DATADOG_SITE>
       credentials:
         apiSecret:
           secretName: datadog-secret
           keyName: api-key
   ```
   - `<CLUSTER_NAME>` を、ご使用のクラスターの名前に置き換えます。
   - `<DATADOG_SITE>` を、ご使用の [Datadog サイト][2]に置き換えます。ご使用のサイトは {{< region-param key="dd_site" code="true" >}} です (右側で正しいサイトが選択されていることを確認してください)。

4. **上記の構成ファイルを使って Agent をデプロイする**

   次を実行します。
   ```shell
   kubectl apply -f datadog-agent.yaml
   ```

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ja/getting_started/site
{{% /tab %}}
{{% tab "Helm" %}}
<div class="alert alert-info">Requires <a href="https://helm.sh">Helm</a>.</div>

2. **Add the Datadog Helm repository**

   Run:
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm repo update
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY>
   ```

   - Replace `<DATADOG_API_KEY>` with your [Datadog API key][1].

3. **Configure `datadog-values.yaml`**

   Create a file, `datadog-values.yaml`, that contains:
   ```yaml
   datadog:
    apiKeyExistingSecret: datadog-secret
    site: <DATADOG_SITE>
   ```

   - Replace `<DATADOG_SITE>` with your [Datadog site][2]. Your site is {{< region-param key="dd_site" code="true" >}}. (Ensure the correct SITE is selected on the right).

4. **Deploy Agent with the above configuration file**

   Run:

   ```shell
   helm install datadog-agent -f datadog-values.yaml datadog/datadog
   ```

   <div class="alert alert-info">
   For Windows, append <code>--set targetSystem=windows</code> to the <code>helm install</code> command.
   </div>

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ja/getting_started/site

{{% /tab %}}
{{< /tabs >}}

5. **Confirm Agent installation**

   Verify that Agent pods (tagged with `app.kubernetes.io/component:agent`) appear on the [Containers][13] page in Datadog. Agent pods are detected within a few minutes of deployment.

### Unprivileged installation

{{< tabs >}}
{{% tab "Datadog Operator" %}}
To run an unprivileged installation, add the following to `datadog-agent.yaml`:

{{< highlight yaml "hl_lines=13-18" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    site: <DATADOG_SITE>
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
agent:
  config:
    securityContext:
      runAsUser: <USER_ID>
      supplementalGroups:
        - <GROUP_ID>
{{< /highlight >}}

- Replace `<USER_ID>` with the UID to run the Datadog Agent.
- Replace `<GROUP_ID>` with the group ID that owns the Docker or containerd socket.

Then, deploy the Agent:

```shell
kubectl apply -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}
To run an unprivileged installation, add the following to your `datadog-values.yaml` file:

{{< highlight yaml "hl_lines=4-7" >}}
datadog:
  apiKeyExistingSecret: datadog-secret
  site: <DATADOG_SITE>
  securityContext:
      runAsUser: <USER_ID>
      supplementalGroups:
        - <GROUP_ID>
{{< /highlight >}}

- Replace `<USER_ID>` with the UID to run the Datadog Agent.
- Replace `<GROUP_ID>` with the group ID that owns the Docker or containerd socket.

Then, deploy the Agent:

```shell
helm install datadog-agent -f datadog-values.yaml datadog/datadog
```

{{% /tab %}}
{{< /tabs >}}

### Container registries

Datadog publishes container images to Google Artifact Registry, Amazon ECR, and Docker Hub:

| gcr.io | public.ecr.aws | docker hub |
| ------ | -------------- | ------------ |
| gcr.io/datadoghq | public.ecr.aws/datadog | docker.io/datadog |

By default, the Agent image is pulled from Google Artifact Registry (`gcr.io/datadoghq`). If Artifact Registry is not accessible in your deployment region, use another registry.

If you are deploying the Agent in an AWS environment, Datadog recommend that you use Amazon ECR.

<div class="alert alert-warning">Docker Hub is subject to image pull rate limits. If you are not a Docker Hub customer, Datadog recommends that you update your Datadog Agent and Cluster Agent configuration to pull from Google Artifact Registry or Amazon ECR. For instructions, see <a href="/agent/guide/changing_container_registry">Changing your container registry</a>.</div>

{{< tabs >}}
{{% tab "Datadog Operator" %}}

To use a different container registry, modify `global.registry` in `datadog-agent.yaml`.

For example, to use Amazon ECR:

{{< highlight yaml "hl_lines=8">}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    registry: public.ecr.aws/datadog
    site: <DATADOG_SITE>
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
{{< /highlight >}}

{{% /tab %}}
{{% tab "Helm" %}}

To use a different container registry, modify `registry` in `datadog-values.yaml`.

For example, to use Amazon ECR:

{{< highlight yaml "hl_lines=1">}}
registry: public.ecr.aws/datadog
datadog:
  apiKeyExistingSecret: datadog-secret
  site: <DATADOG_SITE>
{{< /highlight >}}

{{% /tab %}}
{{< /tabs >}}

For more information, see [Changing your container registry][17].

### Uninstall

{{< tabs >}}
{{% tab "Datadog Operator" %}}
```shell
kubectl delete datadogagent datadog
helm delete datadog-operator
```

This command deletes all Kubernetes resources created by installing Datadog Operator and deploying the Datadog Agent.
{{% /tab %}}
{{% tab "Helm" %}}
```shell
helm uninstall datadog-agent
```
{{% /tab %}}
{{< /tabs >}}

## 次のステップ

### Datadog でインフラストラクチャーを監視する
コンテナインフラストラクチャーを可視化し、リソースメトリクスとファセット検索を利用するには、[Containers][13] ページを使用します。Containers ページの使い方については、[コンテナビュー][14]を参照してください。

環境内で使用されているすべてのイメージに関する洞察を得るには、[Container Images][18] ページを使用します。このページには、[Cloud Security Management][19] (CSM) から提供される、コンテナイメージで見つかった脆弱性の情報も表示されます。Container Images ページの使用方法については、[コンテナイメージビュー][20] を参照してください。

[Kubernetes][21] セクションには、すべての Kubernetes リソースの概要が表示されます。[オーケストレータエクスプローラー][22]を利用すると、特定のネームスペースや可用性ゾーン内のポッド、デプロイメント、およびその他の Kubernetes コンセプトの状態を監視したり、デプロイメント内で失敗したポッドのリソースの仕様を確認したり、ノードのアクティビティを関連ログと相関付けたりすることができます。[Resource Utilization][23] ページでは、インフラストラクチャー全体で Kubernetes ワークロードがどのようにコンピューティングリソースを使用しているかについて洞察が得られます。これらのページの使い方については、[オーケストレータエクスプローラー][24] と [Kubernetes Resource Utilization][25] を参照してください。

### 機能を有効にする

{{< whatsnext >}}
  {{< nextlink href="/containers/kubernetes/apm">}}<u>Kubernetes 用の APM</u>: Kubernetes アプリケーション用にトレースの収集をセットアップし、構成します。{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/log">}}<u>Kubernetes でのログ収集</u>: Kubernetes 環境でのログの収集をセットアップします。{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/prometheus">}}<u>Prometheus & OpenMetrics</u>: Kubernetes 内で実行されているアプリケーションから、公開されている Prometheus および OpenMetrics メトリクスを収集します。{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/control_plane">}}<u>制御プレーンの監視</u>: Kubernetes の API サーバー、コントローラーマネージャー、スケジューラー、etcd を監視します。{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/configuration">}}<u>その他の構成</u>: イベントの収集、プロキシ設定の上書き、DogStatsD を使ったカスタムメトリクスの送信、コンテナの許可リストおよびブロックリストの構成、利用可能な環境変数一覧の参照が可能です。{{< /nextlink >}}
{{< /whatsnext >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/kubernetes/distributions
[2]: /ja/agent/kubernetes/control_plane
[3]: /ja/infrastructure/livecontainers/configuration/
[4]: /ja/agent/kubernetes/configuration/
[5]: /ja/agent/kubernetes/integrations/
[6]: /ja/agent/kubernetes/apm/
[7]: /ja/agent/kubernetes/log/
[8]: /ja/containers/cluster_agent/#minimum-agent-and-cluster-agent-versions
[9]: /ja/containers/datadog_operator
[10]: https://kubernetes.io/docs/concepts/extend-kubernetes/operator/
[11]: https://helm.sh
[12]: /ja/containers/guide/kubernetes_daemonset/
[13]: https://app.datadoghq.com/containers
[14]: /ja/infrastructure/containers
[15]: /ja/containers/kubernetes/apm
[16]: https://app.datadoghq.com/account/settings/agent/latest?platform=kubernetes
[17]: /ja/containers/guide/changing_container_registry/
[18]: https://app.datadoghq.com/containers/images
[19]: /ja/security/cloud_security_management
[20]: /ja/infrastructure/containers/container_images
[21]: https://app.datadoghq.com/kubernetes
[22]: https://app.datadoghq.com/orchestration/overview
[23]: https://app.datadoghq.com/orchestration/resource/pod
[24]: /ja/infrastructure/containers/orchestrator_explorer
[25]: /ja/infrastructure/containers/kubernetes_resource_utilization