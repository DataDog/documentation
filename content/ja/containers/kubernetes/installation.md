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

このページでは、Kubernetes 環境に Datadog Agent をインストールする手順を説明します。AWS Elastic Kubernetes Service (EKS)、Azure Kubernetes Service (AKS)、Google Kubernetes Engine (GKE)、Red Hat OpenShift、Rancher、Oracle Container Engine for Kubernetes (OKE) など主要な Kubernetes ディストリビューションの専用ドキュメントやサンプルは [Kubernetes ディストリビューション][1]に掲載されています。

Kubernetes のコントロールプレーンを監視するための専用のドキュメントと例については、[Kubernetes のコントロールプレーン監視][2]を参照してください。

### Agent と Cluster Agent の最小バージョン

Kubernetes の後期バージョンに関連する一部の機能では、Datadog Agent の最低バージョンが必要です。

| Kubernetes バージョン | Agent バージョン  | Cluster Agent バージョン | 理由                                |
|--------------------|----------------|-----------------------|---------------------------------------|
| 1.16.0+            | 7.19.0+        | 1.9.0+                | Kubelet メトリクスの非推奨化           |
| 1.21.0+            | 7.36.0+        | 1.20.0+               | Kubernetes リソースの非推奨化       |
| 1.22.0+            | 7.37.0+        | 7.37.0+               | ダイナミックサービスアカウントトークンをサポート |

{{< tabs >}}
{{% tab "Operator" %}}

<div class="alert alert-warning">Datadog Operator は 1.0.0 バージョンで一般公開されており、DatadogAgent Custom Resource のバージョン <code>v2alpha1</code> と照合しています。 </div>

[Datadog Operator][1] は Kubernetes や OpenShift にDatadog Agent をデプロイする方法です。カスタムリソースステータスでデプロイ状況、健全性、エラーを報告し、高度なコンフィギュレーションオプションでコンフィギュレーションミスのリスクを抑えます。

## 前提条件

Datadog Operator を使用するには、次の前提条件が必要です。

- **Kubernetes Cluster バージョン >= v1.20.X**: テストはバージョン >= `1.20.0` で行われましたが、バージョン `>= v1.11.0` で動作するはずです。以前のバージョンでは、CRD サポートが制限されているため、Operator が期待どおりに機能しない場合があります。
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
   kind: DatadogAgent
   apiVersion: datadoghq.com/v2alpha1
   metadata:
     name: datadog
   spec:
     global:
       site: <DATADOG_SITE>
       credentials:
         apiSecret:
           secretName: datadog-secret
           keyName: api-key
         appSecret:
           secretName: datadog-secret
           keyName: app-key
     override:
       clusterAgent:
         image:
           name: gcr.io/datadoghq/cluster-agent:latest
       nodeAgent:
         image:
           name: gcr.io/datadoghq/agent:latest
   ```

   `<DATADOG_SITE>` を [Datadog サイト][10]に置き換えます。サイトは {{< region-param key="dd_site" code="true" >}} です。(右側で正しい SITE が選択されていることを確認してください)。

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

## コンテナレジストリ

コンテナイメージのレジストリを変更する場合は、[コンテナレジストリの変更][9]のガイドを参照してください。

[1]: https://github.com/DataDog/datadog-operator
[2]: https://helm.sh
[3]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[4]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog-operator
[5]: https://artifacthub.io/packages/helm/datadog/datadog-operator
[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: /ja/agent/guide/operator-advanced
[8]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.md
[9]: /ja/agent/guide/changing_container_registry/#kubernetes-with-the-datadog-operator
[10]: /ja/getting_started/site
{{% /tab %}}
{{% tab "Helm" %}}

カスタムリリース名でチャートをインストールするには、`<RELEASE_NAME>` (例 `datadog-agent`):

1. [Helm のインストール][1]
2. [Datadog `values.yaml` コンフィギュレーションファイル][2]を参照として使用して、`values.yaml` を作成します。Datadog では、チャートのバージョンをアップグレードするときにスムーズなエクスペリエンスを実現できるため、`values.yaml` にオーバーライドする必要のある値のみを含めることをお勧めします。
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

<div class="alert alert-warning">2023 年 7 月 10 日、Docker Hub は Datadog の Docker Hub レジストリへのダウンロードレート制限を実施するようになります。これらのレジストリからのイメージのプルは、レート制限割り当てにカウントされます。<br/><br/>

Datadog は、Datadog Agent と Cluster Agent の構成を更新して、レート制限が適用されない他のレジストリからプルすることを推奨しています。手順については、<a href="/agent/guide/changing_container_registry">コンテナレジストリを変更する</a>を参照してください。</div>

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