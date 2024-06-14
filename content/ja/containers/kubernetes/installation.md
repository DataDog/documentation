---
aliases:
- /ja/agent/kubernetes/daemonset_setup
- /ja/agent/kubernetes/helm
- /ja/agent/kubernetes/installation
further_reading:
- link: /agent/kubernetes/configuration
  tag: ドキュメント
  text: Kubernetes 上の Datadog Agent のさらなる構成
- link: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md#all-configuration-options
  tag: GitHub
  text: Datadog Helm チャート - すべての構成オプション
- link: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md#upgrading
  tag: GitHub
  text: Datadog Helm のアップグレード
kind: documentation
title: Kubernetes に Datadog Agent をインストールする
---

## 概要

このページでは、Kubernetes 環境に Datadog Agent をインストールする手順を説明します。デフォルトでは、Datadog Agent は DaemonSet で実行されます。

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

Kubernetes に Datadog Agent をインストールするには、以下のオプションがあります。

- [Datadog Operator][9]、[Kubernetes Operator][10] (推奨)
- [Helm][11]
- 手動インストール。[Kubernetes 上の Datadog Agent を DaemonSet で手動でインストール、構成する][12]を参照してください。

{{< tabs >}}
{{% tab "Operator" %}}

<div class="alert alert-warning">Datadog Operator は 1.0.0 バージョンで一般公開されており、DatadogAgent Custom Resource のバージョン <code>v2alpha1</code> と照合しています。 </div>

[Datadog Operator][1] は Kubernetes や OpenShift にDatadog Agent をデプロイする方法です。カスタムリソースステータスでデプロイ状況、健全性、エラーを報告し、高度なコンフィギュレーションオプションでコンフィギュレーションミスのリスクを抑えます。

### 前提条件

Datadog Operator を使用するには、次の前提条件が必要です。

- **Kubernetes Cluster バージョン v1.20.X+**: テストは v1.20.0+ で行われました。v1.11.0+ でサポートされるはずです。それ以前のバージョンでは、CRD のサポートが制限されているため、Operator は期待どおりに動作しない可能性があります。
- `datadog-operator` をデプロイするための [`Helm`][2]。
- `datadog-agent` をインストールするための [`Kubectl` CLI][3]。

### Operator を使用して Agent をデプロイする

1. [Datadog Operator][5] をインストールします:

   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm install my-datadog-operator datadog/datadog-operator
   ```

2. お使いの API とアプリキーで Kubernetes シークレットを作成します

   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY> --from-literal app-key=<DATADOG_APP_KEY>
   ```
   `<DATADOG_API_KEY>` と `<DATADOG_APP_KEY>` を [Datadog API][6] と[アプリケーションキー][7]に置き換えます。

2. Datadog Agent のデプロイコンフィギュレーションを使用してファイル `datadog-agent.yaml` を作成します。最も単純なコンフィギュレーションは次のとおりです。

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
[1]: https://github.com/DataDog/datadog-operator
[2]: https://helm.sh
[3]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[4]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog-operator
[5]: https://artifacthub.io/packages/helm/datadog/datadog-operator
[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: https://app.datadoghq.com/organization-settings/application-keys
[10]: /ja/getting_started/site
{{% /tab %}}
{{% tab "Helm" %}}

### 前提条件

- [Helm][1]
- これが新規インストールの場合は、Helm の Datadog リポジトリを追加します。
    ```bash
    helm repo add datadog https://helm.datadoghq.com
    helm repo update
    ```

### チャートのインストール

1. 空の `datadog-values.yaml` ファイルを作成します。このファイルで指定されていないパラメーターは、[`values.yaml`][14] で設定されたものがデフォルトとなります。

2. Datadog の [API キー][3]と[アプリキー][15]を保存する Kubernetes Secret を作成します。

   ```bash
   kubectl create secret generic datadog-secret --from-literal api-key=$DD_API_KEY --from-literal app-key=$DD_APP_KEY
   ```
3. `datadog-values.yaml` に以下のパラメーターを設定し、シークレットを参照します。
   ```
   datadog:
    apiKeyExistingSecret: datadog-secret
    appKeyExistingSecret: datadog-secret
    site: <DATADOG_SITE>
   clusterAgent:
    metricsProvider:
     enabled: true
   ```
   `<DATADOG_SITE>` を [Datadog サイト][13]に置き換えます。サイトは {{< region-param key="dd_site" code="true" >}} です。(右側で正しい SITE が選択されていることを確認してください)。
3. 次のコマンドを実行します。
   ```bash
   helm install <RELEASE_NAME> \
    -f datadog-values.yaml \
    --set targetSystem=<TARGET_SYSTEM> \
    datadog/datadog
   ```

- `<RELEASE_NAME>`: リリース名。例えば `datadog-agent`。

- `<TARGET_SYSTEM>`: OS の名前。例えば `linux` や `windows` など。


**注**: Helm < v3 を使用している場合は、以下を実行してください。
   ```bash
   helm install --name <RELEASE_NAME> \
    -f datadog-values.yaml \
    --set targetSystem=<TARGET_SYSTEM> \
    datadog/datadog
   ```

[1]: https://v3.helm.sh/docs/intro/install/
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-state-metrics
[5]: /ja/agent/kubernetes/apm?tab=helm
[6]: /ja/agent/kubernetes/log?tab=helm

[8]: https://gcr.io/datadoghq
[9]: https://gallery.ecr.aws/datadog/
[10]: https://hub.docker.com/u/datadog/
[11]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/docs/Migration_1.x_to_2.x.md
[12]: /ja/integrations/kubernetes_state_core
[13]: /ja/getting_started/site
[14]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
[15]: https://app.datadoghq.com/organization-settings/application-keys

{{% /tab %}}
{{< /tabs >}}

### クリーンアップ

{{< tabs >}}
{{% tab "Operator" %}}
次のコマンドは、上記の手順で作成されたすべての Kubernetes リソースを削除します。

```shell
kubectl delete datadogagent datadog
helm delete my-datadog-operator
```

許容範囲の使用に関する情報を含む、Datadog Operator の設定の詳細については、[Datadog Operator の高度な設定ガイド][1]を参照してください。

[1]: https://github.com/DataDog/datadog-operator/blob/main/docs/installation.md

{{% /tab %}}
{{% tab "Helm" %}}
`<RELEASE_NAME>` のデプロイをアンインストール/削除します。

```bash
helm uninstall <RELEASE_NAME>
```
{{% /tab %}}
{{< /tabs >}}


### 非特権

(オプション) 非特権のインストールを実行するには、以下の手順に従います。

{{< tabs >}}
{{% tab "Operator" %}}
`datadog-agent`.yaml の Datadog カスタムリソース (CR) に以下を追加します。

```yaml
agent:
  config:
    securityContext:
      runAsUser: <USER_ID>
      supplementalGroups:
        - <DOCKER_GROUP_ID>
```

{{% /tab %}}
{{% tab "Helm" %}}
`datadog-values.yaml` ファイルに以下を追加します。

```yaml
datadog:
  securityContext:
      runAsUser: <USER_ID>
      supplementalGroups:
        - <DOCKER_GROUP_ID>
```

{{% /tab %}}
{{< /tabs >}}

- `<USER_ID>` は Agent を実行する UID です。
- `<DOCKER_GROUP_ID>` は Docker または containerd ソケットを所有するグループ ID です。

### コンテナレジストリ

{{< tabs >}}
{{% tab "Operator" %}}

コンテナイメージのレジストリを変更する場合は、[コンテナレジストリの変更][9]のガイドを参照してください。


[9]: /ja/agent/guide/changing_container_registry/#kubernetes-with-the-datadog-operator

{{% /tab %}}
{{% tab "Helm" %}}

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

[8]: https://gcr.io/datadoghq
[9]: https://gallery.ecr.aws/datadog/
[10]: https://hub.docker.com/u/datadog/

{{% /tab %}}
{{< /tabs >}}

## 次のステップ

- **Datadog で Kubernetes インフラストラクチャーを監視します**。Datadog Operator または Helm のインストールを使用した場合は、Datadog の [Containers ビュー][13]でコンテナの監視を開始できます。詳細については、[Containers ビューのドキュメント][14]を参照してください。

- **APM を構成します**。[Kubernetes APM - トレース収集][15]を参照してください。
- **ログ収集を構成します**。[Kubernetes ログ収集][7]を参照してください。
- **インテグレーションを構成します**。[インテグレーションとオートディスカバリー][5]を参照してください。
- **その他の構成**: イベントの収集、プロキシ設定のオーバーライド、DogStatsD によるカスタムメトリクスの送信、コンテナの許可リストとブロックリストの構成、利用可能な環境変数の全リストの参照については、[Kubernetes のさらなる構成][4]を参照してください。

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
