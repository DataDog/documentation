---
aliases:
- /ja/agent/kubernetes/daemonset_setup
- /ja/agent/kubernetes/helm
- /ja/agent/kubernetes/installation
description: Datadog Operator、Helm、または kubectl を使用して Kubernetes 上に Datadog Agent をインストールおよび構成します。
further_reading:
- link: /agent/kubernetes/configuration
  tag: よくあるご質問
  text: Kubernetes 上の Datadog Agent のさらなる構成
- link: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md#all-configuration-options
  tag: ソースコード
  text: Datadog Helm チャート - すべての構成オプション
- link: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md#upgrading
  tag: ソースコード
  text: Datadog Helm のアップグレード
title: Kubernetes に Datadog Agent をインストールする
---
##  概要 {#overview}

このページでは、Kubernetes 環境に Datadog Agent をインストールする手順を説明します。

AWS Elastic Kubernetes Service (EKS)、Azure Kubernetes Service (AKS)、Google Kubernetes Engine (GKE)、Red Hat OpenShift、Rancher、Oracle Container Engine for Kubernetes (OKE) など主要な Kubernetes ディストリビューションの専用ドキュメントやサンプルは [Kubernetes ディストリビューション][1]に掲載されています。

Kubernetes のコントロールプレーンを監視するための専用のドキュメントと例については、[Kubernetes のコントロールプレーン監視][2]を参照してください。

###  Kubernetes と Datadog Agent の最小バージョン {#minimum-kubernetes-and-datadog-agent-versions}

Kubernetes の後期バージョンに関連する一部の機能では、Datadog Agent の最低バージョンが必要です。

|  Kubernetes バージョン |  Agent バージョン |  クラスターエージェントバージョン |  理由 |
| ------------------ | ------------- | --------------------- | ------------------------------------------------------------------------------ |
|  1.16.0+ |  7.19.0+ |  1.9.0+ |  Kubelet メトリクスの非推奨化 |
|  1.21.0+ |  7.36.0+ |  1.20.0+ |  Kubernetes リソースの非推奨化 |
|  1.22.0+ |  7.37.0+ |  7.37.0+ |  動的サービスアカウントトークンをサポート |
|  1.25.0+ |  7.40.0+ |  7.40.0+ |  API グループをサポート `v1` |
|  1.33.0+ |  7.67.0+ |  7.67.0+ |  Kubernetes `AllocatedResources` との互換性の問題を修正 `/pods` 出力 |

最適な互換性のために、Datadog は Cluster Agent と Agent を一致するバージョンに保つことを推奨します。

##  インストール {#installation}

Datadog の [Installing on Kubernetes][16] ページを利用すると、インストールプロセスの説明が表示されます。

1. **インストール方法を選択する**

   以下のインストール方法のいずれかを使用します。

   -  [Datadog Operator][9]（推奨）：Kubernetes および OpenShift 上に Datadog Agent をデプロイするために使用できる Kubernetes [オペレーター][10] です。デプロイメントのステータス、健康状態、およびエラーをカスタムリソースのステータスで報告し、高度な構成オプションにより誤設定のリスクを制限します。
   - [Helm][11]
   -  手動インストール。[Datadog Agent を DaemonSet で手動でインストールおよび構成する][12]を参照してください。
  
<div class="alert alert-info"> Kubernetes 環境で <a href="/containers/kubernetes/apm"> シングルステップインスツルメンテーション (SSI) </a> を実装する予定がある場合、Datadog Agent を独自の名前空間にインストールしてください。SSI は Datadog Agent と同じ名前空間のポッドに対してインスツルメンテーションを行いません。</div>

{{< tabs >}}
{{% tab "Datadog OperatorDatadog オペレーター" %}}
<div class="alert alert-info"><a href="https://helm.sh">Helm</a>と<a href="https://kubernetes.io/docs/tasks/tools/#kubectl">kubectl CLI</a>が必要です。</div>

2. **Datadog Operator をインストールします**

   現在のネームスペースに Datadog Operator をインストールするには、以下を実行します：
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm install datadog-operator datadog/datadog-operator
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY>
   ```
   - `<DATADOG_API_KEY>`をあなたの[Datadog API キー][1]に置き換えます。

3. **構成 `datadog-agent.yaml`**

   ファイル `datadog-agent.yaml` を作成し、次の内容を含めます:
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
   -  `<CLUSTER_NAME>` をあなたのクラスターの名前に置き換えます。
   - `<DATADOG_SITE>`をあなたの[Datadog サイト][2]に置き換えます。使用するサイトは {{< region-param key="dd_site" code="true" >}}. (右側で正しい SITE が選択されていることを確認してください)。

4. **上記の構成ファイルを使って Agent をデプロイします**

   次を実行します。
   ```shell
   kubectl apply -f datadog-agent.yaml
   ```

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ja/getting_started/site
{{% /tab %}}
{{% tab "Helm" %}}
<div class="alert alert-info"><a href="https://helm.sh">Helm</a>が必要です。</div>

2. **Datadog Helm リポジトリを追加します**

   次を実行します。
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm repo update
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY>
   ```

   - `<DATADOG_API_KEY>`をあなたの[Datadog API キー][1]に置き換えます。

3. **構成 `datadog-values.yaml`**

   ファイル `datadog-values.yaml` を作成し、次の内容を含めます:
   ```yaml
   datadog:
    apiKeyExistingSecret: datadog-secret
    clusterName: <CLUSTER_NAME>
    site: <DATADOG_SITE>
   ```
   
   -  `<CLUSTER_NAME>` をあなたのクラスターの名前に置き換えます。
   - `<DATADOG_SITE>`をあなたの[Datadog サイト][2]に置き換えます。使用するサイトは {{< region-param key="dd_site" code="true" >}}. (右側で正しい SITE が選択されていることを確認してください)。

4. **上記の構成ファイルを使って Agent をデプロイします**

   次を実行します。

   ```shell
   helm install datadog-agent -f datadog-values.yaml datadog/datadog
   ```

   <div class="alert alert-info">
   Windows の場合、追加します <code>--set targetSystem=windows</code> に <code>helm install</code> コマンド。
   </div>

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ja/getting_started/site

{{% /tab %}}
{{< /tabs >}}

5. **Agent のインストールを確認します**

   Agent ポッド（`app.kubernetes.io/component:agent`でタグ付けされた）が Datadog の [Containers][13] ページに表示されることを確認します。Agent ポッドはデプロイから数分以内に検出されます。

<div class="alert alert-info">

<code>&lt;CLUSTER_NAME&gt;</code> ホストとクラスター チェックのスコープを設定できます。このユニークな名前はドットで区切られたトークンでなければならず、次の制限に従う必要があります:
<ul>
  <li/>小文字のアルファベット、数字、ハイフンのみを含む必要があります。
  <li/>文字で始まる必要があります。
  <li/>数字または文字が末尾である必要があります
  <li/>80文字以下である必要があります
</ul>
</div>

### 非特権インストール {#unprivileged-installation}

非特権インストールを実行するには、希望する `<USER_ID>` と `<GROUP ID>` に関連する設定に以下の `securityContext` を追加してください:

- Datadog Agent を実行するための UID に `<USER_ID>` を置き換えてください。Datadog は、既存の `dd-agent` ユーザーのためにこの値を `100` に設定することを推奨しています [Datadog Agent v7.48+][26]。
- Docker または containerd ソケットを所有するグループ ID に `<GROUP_ID>` を置き換えてください。

これにより、Agent のポッドレベルで `securityContext` が設定されます。

{{< tabs >}}
{{% tab "Datadog OperatorDatadog オペレーター" %}}
非特権インストールを実行するには、`datadog-agent.yaml` に以下を追加してください:

{{< highlight yaml "hl_lines=14-19" >}}
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

  override:
    nodeAgent:
      securityContext:
        runAsUser:  <USER_ID>
        supplementalGroups:
          - <GROUP_ID>
{{< /highlight >}}

次に、Agent をデプロイします:

```shell
kubectl apply -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}
非特権インストールを実行するには、`datadog-values.yaml` ファイルに以下を追加してください:

{{< highlight yaml "hl_lines=5-8" >}}
datadog:
  apiKeyExistingSecret: datadog-secret
  clusterName: <CLUSTER_NAME>
  site: <DATADOG_SITE>
  securityContext:
    runAsUser: <USER_ID>
    supplementalGroups:
      - <GROUP_ID>
{{< /highlight >}}

次に、Agent をデプロイします:

```shell
helm install datadog-agent -f datadog-values.yaml datadog/datadog
```

{{% /tab %}}
{{< /tabs >}}

### コンテナレジストリ {#container-registries}

Datadog は、Datadog コンテナレジストリ、Google Artifact Registry (GAR)、Amazon ECR、Azure ACR、および Docker Hub にコンテナイメージを公開しています:

{{% container-images-table %}}

デフォルトでは、Helm チャートは Google Artifact Registry (`gcr.io/datadoghq`) からイメージを取得します。Datadog Operator チャートは、Datadog コンテナレジストリ (`registry.datadoghq.com`) への移行を進めています。

<div class="alert alert-warning">Docker Hub は、イメージプルレート制限の対象です。Docker Hub の顧客でない場合、Datadog は、他のレジストリからプルするように Datadog Agent と Cluster Agent の設定を更新することを推奨します。手順については、<a href="/agent/guide/changing_container_registry">コンテナレジストリの変更</a>.</div>を参照してください。

{{< tabs >}}
{{% tab "Datadog OperatorDatadog オペレーター" %}}

Datadog Operator チャートは、管理するオペレーターイメージと Agent イメージの両方に対して `registry.datadoghq.com` への移行を行っています。以前は、Agent イメージはサイト固有のレジストリ (`gcr.io/datadoghq`, `eu.gcr.io/datadoghq`, `asia.gcr.io/datadoghq`, または `datadoghq.azurecr.io`) からプルされていました。以前のサイト固有のレジストリを使用し続けるには、Operator Helm `values.yaml` に `registryMigrationMode: ""` を設定してください。

異なるコンテナレジストリを使用するには、`datadog-agent.yaml` の `global.registry` を修正してください。

例えば、Amazon ECR を使用するには:

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

異なるコンテナレジストリを使用するには、`datadog-values.yaml` の `registry` を修正してください。

例えば、Amazon ECR を使用するには:

{{< highlight yaml "hl_lines=1">}}
registry: public.ecr.aws/datadog
datadog:
  apiKeyExistingSecret: datadog-secret
  site: <DATADOG_SITE>
{{< /highlight >}}

{{% /tab %}}
{{< /tabs >}}

詳細については、[コンテナレジストリの変更][17]を参照してください。

### アンインストール {#uninstall}

{{< tabs >}}
{{% tab "Datadog OperatorDatadog オペレーター" %}}

```shell
kubectl delete datadogagent datadog
helm delete datadog-operator
```

このコマンドは、Datadog Operator をインストールし、Datadog Agent をデプロイすることによって作成されたすべての Kubernetes リソースを削除します。
{{% /tab %}}
{{% tab "Helm" %}}

```shell
helm uninstall datadog-agent
```
{{% /tab %}}
{{< /tabs >}}

## 次のステップ {#next-steps}

### Datadog でインフラストラクチャーを監視する {#monitor-your-infrastructure-in-datadog}
[コンテナ][13] ページを使用して、リソースメトリクスとファセット検索を用いてコンテナインフラストラクチャーの可視性を得てください。コンテナページの使用方法については、[コンテナビュー][14]を参照してください。

[コンテナイメージ][18] ページを使用して、環境で使用されているすべてのイメージに関する洞察を得てください。このページでは、[Cloud Security][19]からのコンテナイメージに見つかった脆弱性も表示されます。コンテナイメージページの使用方法については、[コンテナイメージビュー][20]を参照してください。

[Kubernetes][21] セクションでは、すべての Kubernetes リソースの概要が表示されます。[オーケストレータエクスプローラー][22]を使用すると、特定のネームスペースまたはAvailability Zoneのポッド、デプロイメント、その他の Kubernetes の概念の状態を監視したり、デプロイメント内で失敗したポッドのリソース仕様を確認したり、ノードアクティビティを関連するログに関連付けたりすることができます。[リソース利用状況][23] ページでは、Kubernetes ワークロードがインフラストラクチャー全体でコンピューティングリソースをどのように使用しているかについての洞察を提供します。これらのページの使用方法については、[オーケストレータエクスプローラー][24]および[Kubernetes リソース利用状況][25]を参照してください。

### 機能を有効にする {#enable-features}

{{< whatsnext >}}
  {{< nextlink href="/containers/kubernetes/apm">}}<u>Kubernetes 用 APM</u>: Kubernetes アプリケーションのトレース収集を設定および構成します。{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/log">}}<u>Kubernetes におけるログ収集</u>: Kubernetes 環境でのログ収集を設定します。{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/prometheus">}}<u>Prometheus と OpenMetrics</u>: Kubernetes 内で実行されているアプリケーションから、公開された Prometheus および OpenMetrics メトリクスを収集します。{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/control_plane">}}<u>コントロールプレーンの監視</u>: Kubernetes API サーバー、コントローラーマネージャー、スケジューラー、および etcd を監視します。{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/configuration">}}<u>さらなる構成</u>: イベントの収集、プロキシ設定のオーバーライド、DogStatsD によるカスタムメトリクスの送信、コンテナの許可リストとブロックリストの構成、利用可能な環境変数の全リストの参照を行います。{{< /nextlink >}}
{{< /whatsnext >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/kubernetes/distributions
[2]: /ja/agent/kubernetes/control_plane
[3]: /ja/infrastructure/livecontainers/configuration/
[4]: /ja/agent/kubernetes/configuration/
[5]: /ja/agent/kubernetes/integrations/
[6]: /ja/agent/kubernetes/apm/
[7]: /ja/agent/kubernetes/log/
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
[26]: /ja/data_security/kubernetes/#running-container-as-root-user