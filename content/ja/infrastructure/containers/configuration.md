---
aliases:
- /ja/infrastructure/livecontainers/configuration
further_reading:
- link: /infrastructure/hostmap/
  tag: Documentation
  text: インフラストラクチャーマップですべてのホスト/コンテナを確認する
- link: /infrastructure/process/
  tag: Documentation
  text: システムのあらゆるレベルの事象の把握
title: コンテナビューの構成
---

このページでは、Datadog の [Containers][1] ページの構成オプションについて説明します。Containers ページとその機能の詳細については、[コンテナビュー][2]ドキュメントを参照してください。

## コンフィギュレーションオプション

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

## オーケストレーターエクスプローラーの構成

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
| VerticalPodAutoscalers | 7.27.0 | 7.46.0 | 3.6.8 | 1.16.0 |

**注**: バージョン 1.22 以降、Cluster Agent のバージョン番号は、バージョン 7.39.0 以降、Agent のリリース番号に従います。

### カスタムタグをリソースに追加

カスタムタグを Kubernetes リソースに追加すると、Kubernetes リソースビュー内のフィルタリングが容易になります。

追加タグは、`DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS` 環境変数を通して追加されます。

**注**: これらのタグは、Kubernetes リソースビューでのみ表示されます。

{{< tabs >}}
{{% tab "Datadog Operator" %}}
`datadog-agent.yaml` に `agents.containers.processAgent.env` と `clusterAgent.env` を設定し、Process Agent と Cluster Agent の両方で環境変数を追加します。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
  features:
    liveContainerCollection:
      enabled: true
    orchestratorExplorer:
      enabled: true
  override:
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

次に、新しい構成を適用します。

```bash
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}

[公式の Helm チャート][1]を使用している場合、[values.yaml][2] に `agents.containers.processAgent.env` および `clusterAgent.env` を設定して Process Agent と Cluster Agent の両方に環境変数を追加します。

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

次に、Helm チャートをアップグレードします。

[1]: https://github.com/DataDog/helm-charts
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml

{{% /tab %}}
{{% tab "DaemonSet" %}}

Process Agent と Cluster Agent の両コンテナに環境変数を設定します。

```yaml
- name: DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS
  value: "tag1:value1 tag2:value2"
```

{{% /tab %}}
{{< /tabs >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/containers
[2]: /ja/infrastructure/containers