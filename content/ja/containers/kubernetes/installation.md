---
aliases:
- /ja/agent/kubernetes/daemonset_setup
- /ja/agent/kubernetes/helm
- /ja/agent/kubernetes/installation
further_reading:
- link: infrastructure/livecontainers/
  tag: ドキュメント
  text: ライブコンテナ
- link: /agent/kubernetes/configuration
  tag: ドキュメント
  text: Kubernetes 上の Datadog Agent の構成
- link: /agent/kubernetes/integrations
  tag: ドキュメント
  text: インテグレーションを構成する
- link: agent/kubernetes/host_setup
  tag: ドキュメント
  text: アプリケーショントレースの収集
- link: agent/kubernetes/log
  tag: ドキュメント
  text: アプリケーションログの収集
- link: /agent/kubernetes/tag
  tag: ドキュメント
  text: コンテナ、ポッド、またはノードが発するすべてのデータにタグを割り当てる
kind: documentation
title: Kubernetes に Datadog Agent をインストールする
---

## インストール

このページでは、3 種類の方法で Kubernetes 環境に Datadog Agent をインストールする手順を説明します。ユースケースに最適な方法を選択してください。

- [Datadog Operator](?tab=operator)
- [Helm チャート](?tab=helm)
- [DaemonSet](?tab=daemonset)

AWS Elastic Kubernetes Service (EKS)、Azure Kubernetes Service (AKS)、Google Kubernetes Engine (GKE)、Red Hat OpenShift、Rancher、Oracle Container Engine for Kubernetes (OKE) など主要な Kubernetes ディストリビューションの専用ドキュメントやサンプルは [Kubernetes ディストリビューション][1]に掲載されています。

Kubernetes のコントロールプレーンを監視するための専用のドキュメントと例については、[Kubernetes のコントロールプレーン監視][2]を参照してください。

### Agent と Cluster Agent の最小バージョン

Kubernetes の後期バージョンに関連する一部の機能では、Datadog Agent の最低バージョンが必要です。

| Kubernetes バージョン | Agent バージョン  | Cluster Agent バージョン | 理由                              |
|--------------------|----------------|-----------------------|---------------------------------------|
| 1.16.0+            | 7.19.0+        | 1.9.0+                | Kubelet メトリクスの非推奨化       |
| 1.21.0+            | 7.36.0+        | 1.20.0+               | Kubernetes リソースの非推奨化    |

{{< tabs >}}
{{% tab "Operator" %}}

<div class="alert alert-warning">Datadog Operator は公開ベータ版です。フィードバックや質問がございましたら、<a href="/help">Datadog サポートチーム</a>までお寄せください。</div>

[Datadog Operator][1] は Kubernetes や OpenShift にDatadog Agent をデプロイする方法です。カスタムリソースステータスでデプロイ状況、健全性、エラーを報告し、高度なコンフィギュレーションオプションでコンフィギュレーションミスのリスクを抑えます。

## 前提条件

Datadog Operator を使用するには、次の前提条件が必要です。

- **Kubernetes Cluster バージョン >= v1.14.X**: テストはバージョン >= `1.14.0` で行われましたが、バージョン `>= v1.11.0` で動作するはずです。以前のバージョンでは、CRD サポートが制限されているため、Operator が期待どおりに機能しない場合があります。
- `datadog-operator` をデプロイするための [`Helm`][2]。
- `datadog-agent` をインストールするための [`Kubectl` CLI][3]。

## Operator を使用して Agent をデプロイする

最小限のステップ数で Operator を使用して Datadog Agent をデプロイするには、[`datadog-operato`][4] Helm チャートを使用します。手順は次のとおりです。

1. [Datadog Operator][5] をインストールします:

   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm install my-datadog-operator datadog/datadog-operator
   ```

2. お使いの API とアプリキーで Kubernetes シークレットを作成します

   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY> --from-literal app-key=<DATADOG_APP_KEY>
   ```
   `<DATADOG_API_KEY>` と `<DATADOG_APP_KEY>` を [Datadog API とアプリケーションキー][6]に置き換えます

2. Datadog Agent のデプロイコンフィギュレーションを使用してファイルを作成します。最も単純なコンフィギュレーションは次のとおりです。

   ```yaml
   apiVersion: datadoghq.com/v1alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     credentials:
       apiSecret:
         secretName: datadog-secret
         keyName: api-key
       appSecret:
         secretName: datadog-secret
         keyName: app-key
     agent:
       image:
         name: "gcr.io/datadoghq/agent:latest"
     clusterAgent:
       image:
         name: "gcr.io/datadoghq/cluster-agent:latest"
   ```

3. 上記のコンフィギュレーションファイルを使用して Datadog Agent をデプロイします。
   ```shell
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```

## クリーンアップ

次のコマンドは、上記の手順で作成されたすべての Kubernetes リソースを削除します。

```shell
kubectl delete datadogagent datadog
helm delete my-datadog-operator
```

許容範囲の使用に関する情報を含む、Operator の設定の詳細については、[Datadog Operator の高度な設定ガイド][7]を参照してください。

## 非特権

(オプション) 非特権インストールを実行するには、[Datadog カスタムリソース (CR)][8] に以下を追加します。

```yaml
agent:
  config:
    securityContext:
      runAsUser: <USER_ID>
      supplementalGroups:
        - <DOCKER_GROUP_ID>
```

`<USER_ID>` が、Agent を実行する UID で、`<DOCKER_GROUP_ID>` が、Docker または Containerd ソケットを所有するグループ ID の場合。

[1]: https://github.com/DataDog/datadog-operator
[2]: https://helm.sh
[3]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[4]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog-operator
[5]: https://artifacthub.io/packages/helm/datadog/datadog-operator
[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: /ja/agent/guide/operator-advanced
[8]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.md
{{% /tab %}}
{{% tab "Helm" %}}

カスタムリリース名でチャートをインストールするには、`<RELEASE_NAME>` (例 `datadog-agent`):

1. [Helm のインストール][1]
2.  [Datadog `values.yaml` コンフィギュレーションファイル][2]を参照として使用して、`values.yaml` を作成します。Datadog では、チャートのバージョンをアップグレードするときにスムーズなエクスペリエンスを実現できるため、`values.yaml` にオーバーライドする必要のある値のみを含めることをお勧めします。
3. これが新規インストールの場合は、Helm の Datadog リポジトリを追加します。
    ```bash
    helm repo add datadog https://helm.datadoghq.com
    helm repo update
    ```
4. [Agent のインストール手順][3]から Datadog API キーを取得し、次を実行します:

- **Helm v3+**

    ```bash
    helm install <RELEASE_NAME> -f values.yaml  --set datadog.apiKey=<DATADOG_API_KEY> datadog/datadog --set targetSystem=<TARGET_SYSTEM>
    ```

    `<対象システム>` を OS 名（`linux` または `windows`）で置き換えます。

- **Helm v1/v2**

    ```bash
    helm install -f values.yaml --name <RELEASE_NAME> --set datadog.apiKey=<DATADOG_API_KEY> datadog/datadog
    ```

このチャートは、DaemonSet を使ってクラスター内のすべてのノードに Datadog Agent を追加します。また、オプションで、[kube-state-metrics チャート][4]をデプロイし、それをクラスターに関するメトリクスの追加ソースとして使用します。インストール後数分すると、Datadog はホストとメトリクスの報告を開始します。

次に、使用する Datadog の機能を有効にします: [APM][5], [Logs][6]

**注**:

- Datadog チャートの構成可能なパラメーターとそのデフォルト値の完全なリストについては、[Datadog Helm リポジトリの README][7] を参照してください。

### コンテナレジストリ

現在のデプロイリージョンで Google Container Registry ([gcr.io/datadoghq][8]) にアクセスが不可能な場合は、`values.yaml` ファイルで下記のコンフィギュレーションで別のレジストリを使用します。

- 公開 AWS ECR レジストリ ([public.ecr.aws/datadog][9]) の場合、以下を使います。

  ```yaml
  registry: public.ecr.aws/datadog
  ```

- Docker Hub レジストリ ([docker.io/datadog][10]) の場合、以下を使います。

  ```yaml
  registry: docker.io/datadog
  ```

**注**:

- AWS 環境に Datadog チャートを導入する場合、公開 AWS ECR レジストリ ([public.ecr.aws/datadog][9]) を使用することが推奨されます。

### チャート v1 からのアップグレード

v2.0 では、Datadog のチャートはリファクタリングされており、`values.yaml` パラメーターがより論理的に再グループ化されています。

現在、デプロイされているチャートバージョンが `v2.0.0` 以前の場合は、[移行ガイド][11]に従って設定を新しいフィールドにマッピングしてください。

### チャート v2.x の Kube ステートメトリクスコア

新しいデプロイメントでは、Datadog は新しい `kube-state-metrics` コアを以下の値で使用することを推奨します。

```yaml
...
datadog:
...
  kubeStateMetricsCore:
    enabled: true
...
```

`kube-state-metrics` コアの詳細については、[Kubernetes ステートメトリクスコアのドキュメント][12]をお読みください。

### 非特権

(オプション) 非特権インストールを実行するには、`values.yaml` ファイルに以下を追加します。

```yaml
datadog:
  securityContext:
      runAsUser: <USER_ID>
      supplementalGroups:
        - <DOCKER_GROUP_ID>
```

`<USER_ID>` が、Agent を実行する UID で、`<DOCKER_GROUP_ID>` が、Docker または Containerd ソケットを所有するグループ ID の場合。

[1]: https://v3.helm.sh/docs/intro/install/
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-state-metrics
[5]: /ja/agent/kubernetes/apm?tab=helm
[6]: /ja/agent/kubernetes/log?tab=helm
[7]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog
[8]: https://gcr.io/datadoghq
[9]: https://gallery.ecr.aws/datadog/
[10]: https://hub.docker.com/u/datadog/
[11]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/docs/Migration_1.x_to_2.x.md
[12]: /ja/integrations/kubernetes_state_core
{{% /tab %}}
{{% tab "DaemonSet" %}}

DaemonSet を利用して、すべてのノード (または [nodeSelectors を使用して][1]特定のノード) に Datadog Agent をデプロイします。

Datadog Agent を Kubernetes クラスターにインストールするには:

1. **Agent のアクセス許可を構成**: Kubernetes で RBAC (ロールベースのアクセス制御) が有効になっている場合は、Datadog Agent サービスアカウントに対する RBAC アクセス許可を構成します。Kubernetes 1.6 以降では、RBAC はデフォルトで有効になっています。適切な ClusterRole、ServiceAccount、および ClusterRoleBinding を、以下のコマンドで作成します。

    ```shell
    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/clusterrole.yaml"

    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/serviceaccount.yaml"

    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/clusterrolebinding.yaml"
    ```

    **注**: RBAC 構成は、`default` ネームスペースに設定されています。カスタムネームスペースを使用している場合、適用する前に `namespace` パラメーターを更新します。


2. **Datadog Agent マニフェストを作成**。以下のテンプレートを使用して、`datadog-agent.yaml` マニフェストを作成します。

    | メトリクス                   | ログ                      | APM                       | Process                   | NPM                       | セキュリティ                       | Linux                   | Windows                 |
    |---------------------------|---------------------------|---------------------------|---------------------------|---------------------------|-------------------------|-------------------------|-------------------------|
    | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |  <i class="icon-check-bold"></i>                         | <i class="icon-check-bold"></i> | [マニフェストテンプレート][2]  | [マニフェストテンプレート][3] (セキュリティなし)  |
    | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |                           |                           |                           | [マニフェストテンプレート][4]  | [マニフェストテンプレート][5]  |
    | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |                           |                           |                           |                           | [マニフェストテンプレート][6]  | [マニフェストテンプレート][7]  |
    | <i class="icon-check-bold"></i> |                           | <i class="icon-check-bold"></i> |                           |                           |                           | [マニフェストテンプレート][8]  | [マニフェストテンプレート][9] |
    |                           |                           |                           |                           | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | [マニフェストテンプレート][10] | テンプレートなし             |
    | <i class="icon-check-bold"></i> |                           |                           |                           |                           |                           | [マニフェストテンプレート][11] | [マニフェストテンプレート][12] |

   トレース収集を完全に有効にするには、[アプリケーションのポッドコンフィギュレーションで追加の手順が必要となります][13]。それぞれの機能を個別に有効にする方法については、[ログ][14]、[APM][15]、[プロセス][16]、[ネットワークパフォーマンスモニタリング][17]、[セキュリティ][18]に関するドキュメントページを参照してください。

    **注**: これらのマニフェストは、`default` ネームスペースに設定されています。カスタムネームスペースを使用している場合、適用する前に `metadata.namespace` パラメーターを更新します。

3. `secret-api-key.yaml` マニフェストで、`PUT_YOUR_BASE64_ENCODED_API_KEY_HERE` を base64 でエンコードされた [Datadog API キー][19]に置き換えます。API キーの base64 バージョンを取得するには、次のコマンドを実行します。

    ```shell
    echo -n '<Your API key>' | base64
    ```
4. `secret-cluster-agent-token.yaml` マニフェストの `PUT_A_BASE64_ENCODED_RANDOM_STRING_HERE` を base64 でエンコードしたランダムな文字列に置き換えてください。base64 版を取得するには、次のように実行します。

    ```shell
    echo -n 'Random string' | base64
    ```

   **注**: Cluster Agent 間の通信を保護するため、ランダムな文字列には少なくとも 32 文字の英数字が含まれている必要があります。

5. `datadog-agent.yaml` マニフェストで、`DD_SITE` 環境変数を使用して **Datadog サイト**を {{< region-param key="dd_site" code="true" >}} に設定します。

    **注**: `DD_SITE` 環境変数が明示的に設定されていない場合、値はデフォルトで `US` サイトの `datadoghq.com` に設定されます。その他のサイト (`EU`、`US3`、または `US1-FED`) のいずれかを使用している場合は、API キーのメッセージが無効になります。[ドキュメントのサイト選択ドロップダウン][20]を使用して、使用中のサイトに適したドキュメントを確認してください。

6. 次のコマンドで **DaemonSet をデプロイ**します。

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

7. **検証**: 現在の環境で Datadog Agent が DaemonSet として動作していることを検証するには、次を実行します。

    ```shell
    kubectl get daemonset
    ```

   Agent がデプロイされた場合は、以下のようなテキスト出力が表示されます。`DESIRED` と `CURRENT` はクラスター内で実行中のノードの数と等しくなります。

    ```shell
    NAME            DESIRED   CURRENT   READY     UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
    datadog-agent   2         2         2         2            2           <none>          10s
    ```

8. 任意 - **Kubernetes State メトリクスの設定**: [Kube-State マニフェストフォルダー][21]をダウンロードし、それを Kubernetes クラスターに適用して [kube-state メトリクス][22]を自動収集します:

    ```shell
    kubectl apply -f <NAME_OF_THE_KUBE_STATE_MANIFESTS_FOLDER>
    ```

### 非特権

(オプション) 非特権インストールを実行するには、[ポッドテンプレート][19]に以下を追加します。

```yaml
  spec:
    securityContext:
      runAsUser: <USER_ID>
      supplementalGroups:
        - <DOCKER_GROUP_ID>
```

`<USER_ID>` が、Agent を実行する UID で、`<DOCKER_GROUP_ID>` が、Docker または Containerd ソケットを所有するグループ ID の場合。

[1]: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
[2]: /resources/yaml/datadog-agent-all-features.yaml
[3]: /resources/yaml/datadog-agent-windows-all-features.yaml
[4]: /resources/yaml/datadog-agent-logs-apm.yaml
[5]: /resources/yaml/datadog-agent-windows-logs-apm.yaml
[6]: /resources/yaml/datadog-agent-logs.yaml
[7]: /resources/yaml/datadog-agent-windows-logs.yaml
[8]: /resources/yaml/datadog-agent-apm.yaml
[9]: /resources/yaml/datadog-agent-windows-apm.yaml
[10]: /resources/yaml/datadog-agent-npm.yaml
[11]: /resources/yaml/datadog-agent-vanilla.yaml
[12]: /resources/yaml/datadog-agent-windows-vanilla.yaml
[13]: /ja/agent/kubernetes/apm/#setup
[14]: /ja/agent/kubernetes/log/
[15]: /ja/agent/kubernetes/apm/
[16]: /ja/infrastructure/process/?tab=kubernetes#installation
[17]: /ja/network_monitoring/performance/setup/
[18]: /ja/security/agent/
[19]: https://app.datadoghq.com/organization-settings/api-keys
[20]: /ja/getting_started/site/
[21]: https://github.com/kubernetes/kube-state-metrics/tree/master/examples/standard
[22]: /ja/agent/kubernetes/data_collected/#kube-state-metrics
{{% /tab %}}
{{< /tabs >}}

## 次のステップ

ライブコンテナの構成方法は、[ライブコンテナ][3]を参照してください。

イベントの収集、プロキシ設定のオーバーライド、DogStatsD によるカスタムメトリクスの送信、コンテナの許可リストとブロックリストの構成、利用可能な環境変数の全リストの参照については、[Kubernetes 上の Datadog Agent の構成][4]を参照してください。

インテグレーションを構成するには、[インテグレーションとオートディスカバリー][5]を参照してください。

APM の設定は、[Kubernetes トレース収集][6]を参照してください。

ログ収集の設定は、[Kubernetes ログ収集][7]を参照してください。

[1]: /ja/agent/kubernetes/distributions
[2]: /ja/agent/kubernetes/control_plane
[3]: /ja/infrastructure/livecontainers/configuration/
[4]: /ja/agent/kubernetes/configuration/
[5]: /ja/agent/kubernetes/integrations/
[6]: /ja/agent/kubernetes/apm/
[7]: /ja/agent/kubernetes/log/