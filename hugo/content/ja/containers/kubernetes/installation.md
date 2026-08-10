---
aliases:
- /ja/agent/kubernetes/daemonset_setup
- /ja/agent/kubernetes/helm
- /ja/agent/kubernetes/installation
description: Datadog Operator、Helm、または kubectl を使用して、Kubernetes に Datadog Agent をインストールして構成します。
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
## 概要 {#overview}

このページでは、Kubernetes 環境に Datadog Agent をインストールする手順を説明します。

AWS EKS (Elastic Kubernetes Service)、AKS (Azure Kubernetes Service)、GKE (Google Kubernetes Engine)、Red Hat OpenShift、Rancher、OKE (Oracle Container Engine for Kubernetes) など主要な Kubernetes ディストリビューションの専用ドキュメントやサンプルは [Kubernetes ディストリビューション][1] に掲載されています。

Kubernetes のコントロールプレーンをモニターするための専用のドキュメントと例については、[Kubernetes のコントロールプレーンのモニター][2] を参照してください。

### Kubernetes と Datadog Agent の最小バージョン {#minimum-kubernetes-and-datadog-agent-versions}

Kubernetes の後期バージョンに関連する一部の機能では、Datadog Agent の最低バージョンが必要です。

| Kubernetes バージョン | Agent バージョン | Cluster Agent バージョン | 理由 |
| ------------------ | ------------- | --------------------- | ------------------------------------------------------------------------------ |
| 1.16.0+            | 7.19.0+       | 1.9.0+                | Kubelet メトリクスの非推奨化                                                    |
| 1.21.0+            | 7.36.0+       | 1.20.0+               | Kubernetes リソースの非推奨化                                                |
| 1.22.0+            | 7.37.0+       | 7.37.0+               | 動的サービスアカウントトークンをサポート                                         |
| 1.25.0+            | 7.40.0+       | 7.40.0+               | `v1` API グループをサポート                                                        |
| 1.33.0+            | 7.67.0+       | 7.67.0+               | `/pods` 出力の Kubernetes `AllocatedResources` との非互換性の修正|

最適な互換性を得るために、Datadog では Cluster Agent と Agent のバージョンを同じにすることを推奨しています。

## インストール {#installation}

Datadog の [Kubernetes でのインストール][16] ページを利用すると、インストールプロセスの説明が表示されます。

1. **インストール方法を選択する**

   以下のインストール方法のいずれかを使用します。

   - [Datadog Operator][9] (推奨): Kubernetes や OpenShift に Datadog Agent をデプロイするために利用できる Kubernetes [オペレーター][10] です。カスタムリソースステータスでデプロイ状況、健全性、エラーを報告し、高度な構成オプションで構成ミスのリスクを抑えます。
   - [Helm][11]
   - 手動インストール。[Datadog Agent を DaemonSet で手動でインストール、構成する][12] を参照してください。
  
<div class="alert alert-info"><a href="/containers/kubernetes/apm">SSI (Single Step Instrumentation)</a> を使用して Kubernetes 環境に APM を実装する予定の場合は、独自のネームスペースに Datadog Agent をインストールしてください。SSI は、Datadog Agent と同じネームスペースに Pod をインスツルメントしません。</div>

{{< tabs >}}
{{% tab "Datadog Operator" %}}
<div class="alert alert-info"><a href="https://helm.sh">Helm</a> と <a href="https://kubernetes.io/docs/tasks/tools/#kubectl">kubectl CLI</a> が必要です。</div>

2. **Datadog Operator をインストールする**

   現在のネームスペースに Datadog Operator をインストールするには、以下を実行します。
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm install datadog-operator datadog/datadog-operator
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY>
   ```
   - `<DATADOG_API_KEY>` をご使用の [Datadog API キー][1] に置き換えます。

3. **`datadog-agent.yaml`** を構成する

   以下の内容を含む、`datadog-agent.yaml` というファイルを作成します。
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
   - `<CLUSTER_NAME>` をご使用のクラスターの名前に置き換えます。
   - `<DATADOG_SITE>`をご使用の [Datadog サイト][2] に置き換えます。ご使用のサイトは、 {{< region-param key="dd_site" code="true" >}}です (右側で正しいサイトが選択されていることを確認してください)。

4. **上記の構成ファイルを使用して Agent をデプロイする**

   次を実行します。
   ```shell
   kubectl apply -f datadog-agent.yaml
   ```

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ja/getting_started/site
{{% /tab %}}
{{% tab "Helm" %}}
<div class="alert alert-info"><a href="https://helm.sh">Helm</a> が必要です。</div>

2. **Datadog Helm リポジトリを追加する**

   次を実行します。
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm repo update
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY>
   ```

   - `<DATADOG_API_KEY>` をご使用の [Datadog API キー][1] に置き換えます。

3. **`datadog-values.yaml`** を構成する

   以下の内容を含む、`datadog-values.yaml` というファイルを作成します。
   ```yaml
   datadog:
    apiKeyExistingSecret: datadog-secret
    clusterName: <CLUSTER_NAME>
    site: <DATADOG_SITE>
   ```
   
   - `<CLUSTER_NAME>` をご使用のクラスターの名前に置き換えます。
   - `<DATADOG_SITE>`をご使用の [Datadog サイト][2] に置き換えます。ご使用のサイトは、 {{< region-param key="dd_site" code="true" >}}です (右側で正しいサイトが選択されていることを確認してください)。

4. **上記の構成ファイルを使用して Agent をデプロイする**

   次を実行します。

   ```shell
   helm install datadog-agent -f datadog-values.yaml datadog/datadog
   ```

   <div class="alert alert-info">
   Windows の場合は、 <code>--set targetSystem=windows</code> を <code>helm install</code> コマンドに追加します。
   </div>

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ja/getting_started/site

{{% /tab %}}
{{< /tabs >}}

5. **Agent のインストールを確認する**

   Agent Pod (`app.kubernetes.io/component:agent` というタグが付いています) が、Datadog の [Containers][13] ページに表示されていることを確認します。Agent Pod はデプロイ後、数分以内に検出されます。

<div class="alert alert-info">

<code>&lt;CLUSTER_NAME&gt;</code> では、ホストとクラスターチェックのスコープを設定できます。この一意の名前はドットで区切られたトークンであり、以下の制限に従う必要があります。
<ul>
  <li/>アルファベットの小文字、数字、ハイフンのみで構成されている必要があります。
  <li/>文字で始まる必要があります。
  <li/>末尾は数字または文字である必要があります。
  <li/>80 文字以内である必要があります。
</ul>
</div>

### 非特権インストール {#unprivileged-installation}

非特権インストールを実行するには、必要な `<USER_ID>` および `<GROUP ID>` に関連する設定に、以下の `securityContext` を追加します。

- `<USER_ID>` を Datadog Agent を実行する UID に置き換えます。Datadog では、[Datadog Agent v7.48 以上の][26] 既存の `dd-agent` ユーザーに対し、この値を `100` に設定することを推奨しています。
- `<GROUP_ID>` を Docker または containerd ソケットを所有するグループ ID に置き換えます。

これにより、Agent の Pod レベルで `securityContext` が設定されます。

{{< tabs >}}
{{% tab "Datadog Operator" %}}
非特権インストールを実行するには、`datadog-agent.yaml` に以下を追加します。

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

続けて Agent をデプロイします。

```shell
kubectl apply -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}
非特権インストールを実行するには、`datadog-values.yaml` ファイルに以下を追加します。

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

続けて Agent をデプロイします。

```shell
helm install datadog-agent -f datadog-values.yaml datadog/datadog
```

{{% /tab %}}
{{< /tabs >}}

### コンテナレジストリ {#container-registries}

Datadog では、Datadog コンテナレジストリ、GAR (Google Artifact Registry)、Amazon ECR、Azure ACR、および Docker Hub にコンテナイメージを公開しています。

{{% container-images-table %}}

デフォルトでは、Datadog Agent Helm チャートは、Datadog サイト、クラスタータイプ、および `registryMigrationMode` を基に Agent のイメージレジストリを決定します。これらの値と環境除外によっては、Agent イメージが Datadog コンテナレジストリ (`registry.datadoghq.com`) またはサイト固有のレジストリから取得される場合があります。Datadog Operator チャートは、デフォルトで Datadog Agent Helm チャートの依存関係として含まれています。Datadog Operator チャートバージョン 2.19.0 以降では、その依存関係を通じて Operator をインストールすると、Datadog Agent Helm チャートの `registryMigrationMode` が Operator によって管理される Agent イメージに適用されます。Operator Helm チャート自体は `registryMigrationMode` を定義しません。Operator Pod イメージは、Operator チャートの `image.repository` 値によって個別に制御されます。

<div class="alert alert-warning">Docker Hub はイメージプルレート制限の対象です。Docker Hub をご利用でない場合は、別のレジストリから取得するように Datadog Agent および Cluster Agent の構成を更新することをお勧めします。その手順については、<a href="/agent/guide/changing_container_registry">コンテナのレジストリを変更する</a>を参照してください。</div>

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Datadog Operator チャートバージョン 2.19.0 以降では、Datadog Agent Helm チャートの依存関係を通じて Operator がインストールされた場合、Datadog Agent Helm チャートの `registryMigrationMode` は Operator によって管理される Agent イメージに `registry.datadoghq.com` を使用できます。以前のバージョンでは、サイト固有のレジストリ (`gcr.io/datadoghq`、`eu.gcr.io/datadoghq`、`asia.gcr.io/datadoghq`、または `datadoghq.azurecr.io`) から Agent イメージを取得していました。このデプロイメントパスで Agent イメージを取得するために引き続き以前のサイト固有のレジストリを使用するには、Datadog Agent Helm チャートの `values.yaml` で`registryMigrationMode: ""` を設定してください。この設定は、レジストリを明示的に設定している場合は効果がありません。また、スタンドアロンの Operator Helm チャートの設定ではありません。Operator Pod イメージに別のレジストリを使用するには、Operator Helm の `values.yaml` で `image.repository` を設定してください。

別のコンテナレジストリを使用するには、`datadog-agent.yaml` で `global.registry` を変更してください。

たとえば、Amazon ECR を使用する場合は次のようにします。

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

別のコンテナレジストリを使用するには、`datadog-values.yaml` で `registry` を変更してください。

たとえば、Amazon ECR を使用する場合は次のようにします。

{{< highlight yaml "hl_lines=1">}}
registry: public.ecr.aws/datadog
datadog:
  apiKeyExistingSecret: datadog-secret
  site: <DATADOG_SITE>
{{< /highlight >}}

{{% /tab %}}
{{< /tabs >}}

詳細については、[コンテナのレジストリを変更する][17] を参照してください。

### アンインストール {#uninstall}

{{< tabs >}}
{{% tab "Datadog Operator" %}}

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

### Datadog でインフラストラクチャーをモニターする {#monitor-your-infrastructure-in-datadog}
コンテナインフラストラクチャーを可視化し、リソースメトリクスとファセット検索を利用するには、[Containers][13] ページを使用します。[Containers] ページの使用方法については、[コンテナビュー][14] を参照してください。

環境内で使用されているすべてのイメージに関する情報を得るには、[コンテナイメージ][18] ページを使用します。このページには、[Cloud Security][19] から提供される、コンテナイメージで見つかった脆弱性も表示されます。[コンテナイメージ] ページの使用方法については、[コンテナイメージビュー][20] を参照してください。

[Kubernetes][21] セクションには、すべての Kubernetes リソースの概要が表示されます。[オーケストラエクスプローラー][22] を利用すると、特定のネームスペースやアベイラビリティゾーン内の Pod、デプロイメント、およびその他の Kubernetes コンセプトの状態をモニターしたり、デプロイメント内で失敗した Pod のリソースの仕様を確認したり、ノードのアクティビティを関連するログに関連付けたりすることができます。[リソース使用状況][23] ページでは、インフラストラクチャー全体で Kubernetes ワークロードがどのようにコンピューティングリソースを使用しているかに関する洞察が得られます。これらのページの使用方法については、[[オーケストレーターエクスプローラー][24] および [Kubernetes リソース利用][25] を参照してください。

### 機能を有効にする {#enable-features}

{{< whatsnext >}}
  {{< nextlink href="/containers/kubernetes/apm">}}<u>Kubernetes 用の APM</u>: Kubernetes アプリケーション用にトレースの収集をセットアップして構成します。{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/log">}}<u>Kubernetes でのログ収集</u>: Kubernetes 環境でのログの収集をセットアップします。{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/prometheus">}}<u>Prometheus および OpenMetrics</u>: Kubernetes 内で実行されているアプリケーションから、公開されている Prometheus および OpenMetrics メトリクスを収集します。{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/control_plane">}}<u>コントロールプレーンのモニター</u>: Kubernetes の API サーバー、コントローラーマネージャー、スケジューラー、etcd をモニターします。{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/configuration">}}<u>その他の構成</u>: イベントの収集、プロキシ設定の上書き、DogStatsD を使った Custom Metrics の送信、コンテナの許可リストおよびブロックリストの構成、利用可能なすべての環境変数一覧の参照が可能です。{{< /nextlink >}}
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