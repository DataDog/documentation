---
further_reading:
- link: /infrastructure/hostmap/
  tag: ドキュメント
  text: ホストマップを使用してすべてのホストを 1 画面に表示
- link: /infrastructure/process/
  tag: ドキュメント
  text: システムのあらゆるレベルの事象の把握
kind: documentation
title: ライブコンテナの構成
---



### Kubernetes リソース

Datadog Agent と Cluster Agent は、[ライブコンテナ][1]の Kubernetes リソースを取得するように構成できます。この機能により、特定のネームスペースまたはアベイラビリティーゾーンのポッド、デプロイメント、その他の Kubernetes の概念の状態を監視したり、デプロイメント内で失敗したポッドのリソース仕様を確認したり、ノードアクティビティを関係するログに関連付けたりすることが可能になります。

ライブコンテナの Kubernetes リソースには、**Agent バージョン >= 7.27.0** および **Cluster Agent バージョン >= 1.11.0** が必要です。Datadog Agent と Cluster Agent の旧バージョンについては、[ライブコンテナのレガシー構成][4]を参照してください。

注: Kubernetes バージョン 1.25 以上の場合、必要な最小限の Cluster Agent のバージョンは 7.40.0 です。

{{< tabs >}}
{{% tab "Helm" %}}

公式の [Datadog Helm チャート][1]を使用している場合、

- チャートバージョン >= 2.10.0 を使用します。Agent および Cluster Agent のバージョンが、Helm チャート [values.yaml][2] ファイルで必要最低限以上のバージョンでハードコードされるようにしてください。
- Process Agent を有効にします。これを行うには、`datadog-values.yaml` ファイルを変更して次の値を含めるようにします。

    ```yaml
    datadog:
        # (...)
        processAgent:
            enabled: true
    ```

- 新しいリリースをデプロイします。

一部のセットアップでは、Process Agent と Cluster Agent で Kubernetes クラスター名が自動検出されません。この場合、機能は起動せず、Cluster Agent ログで以下のような警告が表示されます。`Orchestrator explorer enabled but no cluster name set: disabling`。この場合、`datadog.clusterName` を [values.yaml][2] でクラスター名に設定する必要があります。

[1]: https://github.com/DataDog/helm-charts
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "DaemonSet" %}}

[Cluster Agent][1] バージョン >= 1.11.0 は、DaemonSet を構成する前に必要となります。Cluster Agent が実行中で Agent と通信できることを確認してください。コンフィギュレーションの詳細は、[Cluster Agent のセットアップ][2]を参照してください。

1. 以下の環境変数を使用して、Cluster Agent コンテナを設定します。

    ```yaml
      - name: DD_ORCHESTRATOR_EXPLORER_ENABLED
        value: "true"
    ```

2. 以下の RBAC アクセス許可を使用して、Cluster Agent ClusterRole を設定します。

   特に `apps` および `batch` apiGroups の場合は、ライブコンテナに　
   一般的な Kubernetes リソース (``pods`、`services`、 
   `nodes` など) を収集する権限が必要です。これは、[Cluster
   Agent のセットアップ][2]に従っていれば、すでに RBAC にあります。ない場合は、
   追加されていることを確認してください (`deployments`、`replicasets` の後):

    ```yaml
      ClusterRole:
      - apiGroups:  # To create the datadog-cluster-id ConfigMap
        - ""
        resources:
        - configmaps
        verbs:
        - create
        - get
        - update
      ...
      - apiGroups:  # Required to get the kube-system namespace UID and generate a cluster ID
        - ""
        resources:
        - namespaces
        verbs:
        - get
      ...
      - apiGroups:  # To collect new resource types
        - "apps"
        resources:
        - deployments
        - replicasets
        - daemonsets
        - statefulsets
        verbs:
        - list
        - get
        - watch
      - apiGroups:
        - "batch"
        resources:
        - cronjobs
        - jobs
        verbs:
        - list
        - get
        - watch
      - apiGroups:
        - ""
        resources:
        - serviceaccounts
        verbs:
        - list
        - get
        - watch
      - apiGroups:
        - rbac.authorization.k8s.io
        resources:
        - roles
        - rolebindings
        - clusterroles
        - clusterrolebindings
        verbs:
        - list
        - get
        - watch
      - apiGroups:
       - networking.k8s.io
       resources:
       - ingresses
       verbs:
       - list
       - watch
      ...
    ```

    これらのアクセス許可は、Agent DaemonSet や Cluster Agent Deployment と同じネームスペースに `datadog-cluster-id` ConfigMap を作成したり、サポート対象の Kubernetes リソースを収集するために必要です。

   Cluster Agent により `cluster-id` ConfigMap が作成されない場合、Agent ポッドはリソースを収集することができません。この場合は Cluster Agent のアクセス許可を更新し、ポッドを再起動して ConfigMap を作成した後、Agent ポッドを再起動します。

3. Agent DaemonSet で実行される Process Agent は、有効かつ実行中（プロセス収集を実行する必要はありません）であり、かつ以下のオプションで構成されている必要があります。

    ```yaml
    - name: DD_ORCHESTRATOR_EXPLORER_ENABLED
      value: "true"
    ```

一部のセットアップでは、Process Agent と Cluster Agent で Kubernetes クラスター名が自動検出されません。この場合、機能は起動せず、Cluster Agent ログで以下のような警告が表示されます。`Orchestrator explorer enabled but no cluster name set: disabling`。この場合、Cluster Agent と Process Agent の両方の `env` セクションに以下のオプションを追加します。

  ```yaml
  - name: DD_CLUSTER_NAME
    value: "<YOUR_CLUSTER_NAME>"
  ```

  [1]: /containers/cluster_agent/
  [2]: /containers/cluster_agent/setup/?tab=daemonset#pagetitle

{{% /tab %}}
{{< /tabs >}}

### リソース収集の互換性マトリックス

次の表は、収集されたリソースと、それぞれに対する最低限の Agent、Cluster Agent、Helm チャートのバージョンをリストで示したものです。

| Resource | 最低限必要な Agent のバージョン | 最低限必要な Cluster Agent のバージョン* | 最低限必要な Helm チャートのバージョン | Kubernetes の最小バージョン |
|---|---|---|---|---|
| ClusterRoleBindings | 7.27.0 | 1.19.0 | 2.30.9 | 1.14.0 |
| ClusterRoles | 7.27.0 | 1.19.0 | 2.30.9 | 1.14.0 |
| クラスター | 7.27.0 | 1.12.0 | 2.10.0 | 1.17.0 |
| CronJobs | 7.27.0 | 7.40.0 | 2.15.5 | 1.16.0 |
| DaemonSets | 7.27.0 | 1.14.0 | 2.16.3 | 1.16.0 |
| デプロイ | 7.27.0 | 1.11.0 | 2.10.0 | 1.16.0 |
| Ingresses | 7.27.0 | 1.22.0 | 2.30.7 | 1.21.0 |
| ジョブ | 7.27.0 | 1.13.1 | 2.15.5 | 1.16.0 |
| ネームスペース | 7.27.0 | 7.41.0 | 2.30.9 | 1.17.0 |
| ノード | 7.27.0 | 1.11.0 | 2.10.0 | 1.17.0 |
| PersistentVolumes | 7.27.0 | 1.18.0 | 2.30.4 | 1.17.0 |
| PersistentVolumeClaims | 7.27.0 | 1.18.0 | 2.30.4 | 1.17.0 |
| ポッド | 7.27.0 | 1.11.0 | 2.10.0 | 1.17.0 |
| ReplicaSet | 7.27.0 | 1.11.0 | 2.10.0 | 1.16.0 |
| RoleBindings | 7.27.0 | 1.19.0 | 2.30.9 | 1.14.0 |
| ロール | 7.27.0 | 1.19.0 | 2.30.9 | 1.14.0 |
| ServiceAccounts | 7.27.0 | 1.19.0 | 2.30.9 | 1.17.0 |
| サービス | 7.27.0 | 1.11.0 | 2.10.0 | 1.17.0 |
| Statefulsets | 7.27.0 | 1.15.0 | 2.20.1 | 1.16.0 |

**注**: バージョン 1.22 以降、Cluster Agent のバージョン番号は、バージョン 7.39.0 以降、Agent のリリース番号に従います。

### カスタムタグをリソースに追加

カスタムタグを Kubernetes リソースに追加すると、Kubernetes リソースビュ内のフィルタリングが容易になります。

追加タグは、`DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS` 環境変数を通して追加されます。

**注**: これらのタグは、Kubernetes リソースビューでのみ表示されます。

{{< tabs >}}
{{% tab "Helm" %}}

公式の Helm チャートを使用している場合、[values.yaml][1] に `agents.containers.processAgent.env` および `clusterAgent.env` を設定して Process Agent と Cluster Agent の両方に環境変数を追加します。

```yaml
  agents:
    containers:
      processAgent:
        env:
          - name: "DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS"
            value: "tag1:value1 tag2:value2"
  clusterAgent:
    env:
      - name: "DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS"
        value: "tag1:value1 tag2:value2"
```

次に、新しいリリースをデプロイします。

{{% /tab %}}
{{% tab "DaemonSet" %}}

Process Agent と Cluster Agent の両コンテナに環境変数を設定します。

```yaml
- name: DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS
  value: "tag1:value1 tag2:value2"
```

{{% /tab %}}
{{< /tabs >}}

### コンテナを対象に入れる/除外する

コンテナは、リアルタイム収集の対象に入れたり、除外したりすることができます。

- メインコンフィギュレーションファイル  `datadog.yaml` に環境変数 `DD_CONTAINER_EXCLUDE` を渡すか、`container_exclude:` を追加することで、コンテナを対象から除外することができます。
- メインコンフィギュレーションファイル `datadog.yaml` に環境変数 `DD_CONTAINER_INCLUDE` を渡すか、`container_include:` を追加することで、コンテナを対象に入れることができます。

どちらの引数も値は**イメージ名**になります。正規表現もサポートされています。

たとえば、名前が frontend で始まるコンテナ以外のすべての Debian イメージを除外するには、`datadog.yaml` ファイルに次の 2 つの構成行を追加します。

```yaml
container_exclude: ["image:debian"]
container_include: ["name:frontend.*"]
```

**注**: Agent 5 の場合は、これをメインの `datadog.conf` 構成ファイルに追加する代わりに、`datadog.yaml` ファイルを明示的に `/etc/datadog-agent/` に追加してください。プロセス Agent は、ここにすべての構成オプションがあることを前提とするためです。この構成は、コンテナをリアルタイム収集から除外するだけで、オートディスカバリーからは**除外しません**。

### 機密情報のスクラビング

機密データの漏洩を防ぐために、コンテナ YAML ファイル内のセンシティブワードをスクラブすることができます。Helm チャートではコンテナスクラビングがデフォルトで有効になっており、いくつかのデフォルトのセンシティブワードが提供されています。

- `password`
- `passwd`
- `mysql_pwd`
- `access_token`
- `auth_token`
- `api_key`
- `apikey`
- `pwd`
- `secret`
- `credentials`
- `stripetoken`

環境変数 `DD_ORCHESTRATOR_EXPLORER_CUSTOM_SENSITIVE_WORDS` に単語のリストを与えることで、追加のセンシティブワードを設定することができます。これはデフォルトの単語に追加され、上書きされることはありません。

**注**: Agent はテキストを小文字のパターンと比較するため、追加のセンシティブワードは小文字でなければなりません。つまり、`password`は `MY_PASSWORD` を `MY_*******` にスクラブしますが、`PASSWORD` はスクラブしません。

以下の Agent では、この環境変数を設定する必要があります。

- process-agent
- cluster-agent

```yaml
env:
    - name: DD_ORCHESTRATOR_EXPLORER_CUSTOM_SENSITIVE_WORDS
      value: "customword1 customword2 customword3"
```

例えば、`password` はセンシティブワードなので、スクラバーは以下のいずれかの `<MY_PASSWORD>` をアスタリスクの文字列、`***********` に変更します。

```text
password <MY_PASSWORD>
password=<MY_PASSWORD>
password: <MY_PASSWORD>
password::::== <MY_PASSWORD>
```

ただし、スクラバーはセンシティブワードを含むパスのスクラビングは行いません。例えば、`secret` がセンシティブワードであっても、 `/etc/vaultd/secret/haproxy-crt.pem` を `/etc/vaultd/******/haproxy-crt.pem` に上書きすることはありません。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/infrastructure/livecontainers/#overview
[4]: /ja/infrastructure/livecontainers/legacy