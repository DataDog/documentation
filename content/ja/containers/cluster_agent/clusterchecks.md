---
aliases:
- /ja/agent/autodiscovery/clusterchecks
- /ja/agent/faq/kubernetes-state-cluster-check
- /ja/agent/cluster_agent/clusterchecks
further_reading:
- link: agent/kubernetes/host_setup
  tag: ドキュメント
  text: Cluster Agent のドキュメント
kind: documentation
title: Autodiscovery によるクラスターチェックの実行
---

## 概要

Datadog Agent は、コンテナを自動的に検出し、そのワークロードに応じた[オートディスカバリーメカニズム][1]によるチェック構成を作成することができます。

クラスターチェックは機能を拡張し、次のようなコンテナ化されていないワークロードを監視します。

- データストアとエンドポイントがクラスターの外部で実行された (例えば、RDS や CloudSQL)。
- 負荷分散型クラスターサービス (例: Kubernetes サービス)

これにより、ノードベースの Agent ポッド**ごとに**対応するチェックを実行するのではなく、各チェックの **1 つ**のインスタンスのみが実行されるようになります。[Cluster Agent][2] は構成を保持し、それをノードベースの Agent に動的にディスパッチします。Agent は 10 秒ごとに Cluster Agent に接続し、実行する構成を取得します。1 つの Agent が報告を停止した場合、Cluster Agent はその Agent をアクティブなプールから削除し、他の Agent に構成をディスパッチします。これにより、クラスターにノードが追加または削除されても、常にインスタンスが 1 つだけ実行されることになります。

クラスターチェックによって収集されたメトリクス、イベント、およびサービスチェックは、ホスト名は関連がないため、それ無しで送信されます。データの絞り込みやスライスを実行できるように、`cluster_name` タグが追加されます。

この戦略は、インフラストラクチャーが高可用性（HA）に構成されている場合に使用されます。

## クラスターチェックのディスパッチを設定する
セットアッププロセスでは、Cluster Agent でディスパッチ機能を有効にすることと、Agent が `clusterchecks` プロバイダーから構成を受け取る準備が整っていることを確認します。これが完了すると、マウントされたコンフィギュレーションファイルまたは Kubernetes Service Annotations を通じて、Cluster Agent に構成を渡すことができます。

{{< tabs >}}
{{< tab "Helm" >}}
Cluster Agent の Helm デプロイメントでは、`datadog.clusterChecks.enabled` 構成キーによりクラスターチェックのディスパッチがデフォルトで有効になっています。
```yaml
datadog:
  clusterChecks:
    enabled: true
  # (...)
clusterAgent:
  enabled: true
  # (...)
```

これにより、Cluster Agent でのクラスターチェックの設定が有効になり、Kubernetes Service Annotations (`kube_services`) からの構成を処理できるようになります。
{{< /tab >}}
{{< tab "Operator" >}}
クラスターチェックのディスパッチは、Cluster Agent の Operator デプロイメントで `clusterAgent.config.clusterChecksEnabled` 構成キーを使用して有効にします。
```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  # (...)
  clusterAgent:
    config:
      clusterChecksEnabled: true
```

これにより、Cluster Agent でのクラスターチェックの設定が有効になり、Kubernetes Service Annotations (`kube_services`) からの構成を処理できるようになります。

{{< /tab >}}
{{< tab "Daemonset" >}}
### Cluster Agent

この機能を使用するには、[Cluster Agent][1] が動作している必要があります。Cluster Agent が動作したら、Cluster Agent のデプロイを以下のように変更します。

1. 環境変数 `DD_CLUSTER_CHECKS_ENABLED` を `true` に設定します。
2. クラスター名を `DD_CLUSTER_NAME` とします。メトリクスにスコープを当てるため、Datadog は全ての構成に `cluster_name` インスタンスタグとしてクラスター名を挿入します。
3. サービス名が初期設定の `datadog-cluster-agent` と異なる場合は、サービス名が `DD_CLUSTER_AGENT_KUBERNETES_SERVICE_NAME` の環境変数に反映されるようにします。
4. Kubernetes Service Annotations からの構成を Cluster Agent で処理できるようにするには、環境変数 `DD_EXTRA_CONFIG_PROVIDERS` と `DD_EXTRA_LISTENERS` を **両方** `kube_services` に設定します。

### エージェント

Datadog **Node** Agent で `clusterchecks` 構成プロバイダーを有効にします。それには 2 つの方法があります。

- **推奨**: Agent DaemonSet の `DD_EXTRA_CONFIG_PROVIDERS` の環境変数を設定します。複数の値がある場合には、スペースで区切られたストリングになります。

    ```text
    DD_EXTRA_CONFIG_PROVIDERS="clusterchecks"
    ```

- または、`datadog.yaml` 構成ファイルに追加します。

    ```yaml
    config_providers:
        - name: clusterchecks
          polling: true
    ```

[1]: /ja/agent/cluster_agent/setup/
{{< /tab >}}
{{< /tabs >}}


**注**: クラスターチェックでは、Agent が報告するメトリクスは、クラスター中心のメトリクスであり、必ずしもホストベースのメトリクスではないため、特定のホスト名にはリンクされません。その結果、これらのメトリクスは、クラウドプロバイダーから継承されたものや Agent の環境変数 `DD_TAGS` によって追加されたものなど、そのホストに関連付けられたホストレベルのタグを継承しません。クラスターチェックメトリクスにタグを追加するには、`DD_CLUSTER_CHECKS_EXTRA_TAGS` 環境変数を使用します。

[Datadog Helm Chart][3] と [Datadog Operator][4] では、さらにクラスターチェックランナーをデプロイすることができます。これは、通常のノードベースの Agent へのディスパッチとは対照的に、ディスパッチしたクラスターチェックのみを実行するように構成された Datadog Agent の小さなセットのためのデプロイです。

### 高度なディスパッチ

Cluster Agent はクラスターチェックに対する高度なディスパッチロジックを使用するように構成できます。これには、チェックインスタンスからの実行時間およびメトリクスサンプルが考慮されます。このロジックにより Cluster Agent はクラスターチェックランナー間のディスパッチと分散を最適化できます。

#### Cluster Agent のドキュメント

Cluster Agent のセットアップセクションで述べた手順に加えて、`DD_CLUSTER_CHECKS_ADVANCED_DISPATCHING_ENABLED` 環境変数を `true` に設定する必要があります。

#### Cluster Agent のドキュメント

ノード Agent (またはクラスターチェックランナー) がチェックの統計情報を公開するように構成するためには、以下の環境変数が必要です。統計情報は Cluster Agent によって消費され、クラスターチェックのディスパッチロジックを最適化するために使用されます。

```yaml
  env:
    - name: DD_CLC_RUNNER_ENABLED
      value: "true"
    - name: DD_CLC_RUNNER_HOST
      valueFrom:
        fieldRef:
          fieldPath: status.podIP
```
### カスタムチェック
全てのノードベースの Agent によるチェックの実行が可能であれば、クラスターチェックとしての [Agent のカスタムチェック][5]の実行がサポートされています。これにより、カスタムチェックのコードは以下のようになります。

- `clusterchecks` の構成プロバイダが有効になっている全てのノードベースの Agent にインストールされていること。
- 全ての Agent にアクセス可能ではない、ローカルのリソースに依存**しない**こと。

## チェック構成の設定

### コンフィギュレーションファイルからの構成

リソースの URL または IP が変わらない場合 (例: 外部サービスエンドポイントまたはパブリック URL)、静的構成を YAML ファイルとして Cluster Agent に渡すことができます。ファイル命名規則と構文はノードベースの Agent に対する静的構成と同じですが、**必須**の `cluster_check: true` 行が追加されています。

また、Datadog Agent 1.18.0 からは、Kubernetes サービスを対象としたチェック構成で、`advanced_ad_identifiers` と[オートディスカバリーテンプレート変数][6]を使用できます ([例をご参照ください][7])。

{{< tabs >}}
{{< tab "Helm" >}}
Helm では、これらのコンフィギュレーションファイルは `clusterAgent.confd` セクション内に作成することができます。**注**: これは、ノードベースの Agent でファイルを作成する `datadog.confd` セクションとは別のものです。`<INTEGRATION_NAME>` は、実行したいインテグレーションチェックと正確に一致させる必要があります。

```yaml
#(...)
clusterAgent:
  confd:
    <INTEGRATION_NAME>.yaml: |-
      cluster_check: true
      init_config:
        - <INIT_CONFIG>
      instances:
        - <INSTANCES_CONFIG>
```
{{< /tab >}}
{{< tab "Daemonset" >}}
手動で行う場合は、必要な静的コンフィギュレーションファイルを格納する `ConfigMap` を作成し、Cluster Agent コンテナの対応する `/conf.d` ファイルにマウントする必要があります。これは、[ConfigMap を Agent コンテナにマウントする][1]のと同じアプローチに従います。例:

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: "<NAME>-config-map"
data:
  <INTEGRATION_NAME>-config: |-
    cluster_check: true
    init_config:
      <INIT_CONFIG>
    instances:
      <INSTANCES_CONFIG>
```

次に、Cluster Agent デプロイメントのマニフェストで、`ConfigMap` とデータの対応するキーに関連して、`volumeMounts` と `volumes` を定義します。

```yaml
        volumeMounts:
          - name: <NAME>-config-map
            mountPath: /conf.d/
            # (...)
      volumes:
        - name: <NAME>-config-map
          configMap:
            name: <NAME>-config-map
            items:
              - key: <INTEGRATION_NAME>-config
                path: <INTEGRATION_NAME>.yaml
          #(...)
```
これは、Cluster Agent の `/conf.d/` ディレクトリに、インテグレーションに対応するファイルを作成します。例: `/conf.d/mysql.yaml` または `/conf.d/http_check.yaml`。


[1]: /ja/agent/kubernetes/integrations/?tab=configmap#configuration
{{< /tab >}}
{{< /tabs >}}

#### 例: 外部でホストされているデータベースの MySQL チェック

CloudSQL や RDS など外部でホストされているデータベースと、それに対応する [Datadog ユーザー][8]を設定してデータベースにアクセスしたら、Cluster Agent コンテナに以下の内容の `/conf.d/mysql.yaml` ファイルをマウントしてください。

```yaml
cluster_check: true
init_config:
instances:
    - server: "<PRIVATE_IP_ADDRESS>"
      port: 3306
      user: datadog
      pass: "<YOUR_CHOSEN_PASSWORD>"
```

#### 例: 外部 URL の HTTP_Check

クラスターごとに 1 回だけ [HTTP チェック][9]を行いたい URL がある場合は、Cluster Agent コンテナに以下の内容で `/conf.d/http_check.yaml` ファイルをマウントしてください。

```yaml
cluster_check: true
init_config:
instances:
    - name: "<EXAMPLE_NAME>"
      url: "<EXAMPLE_URL>"
```

#### 例: Kubernetes サービスでの HTTP_Check

{{< tabs >}}
{{< tab "Helm" >}}
Kubernetes サービスに対して、クラスターごとに一度だけ [HTTP チェック][1]を行いたい場合は、`clusterAgent.confd` フィールドを使ってチェック構成を定義してください。

```yaml
#(...)
clusterAgent:
  confd:
    <INTEGRATION_NAME>.yaml: |-
      advanced_ad_identifiers:
        - kube_service:
            name: "<SERVICE_NAME>"
            namespace: "<SERVICE_NAMESPACE>"
      cluster_check: true
      init_config:
      instances:
        - url: "http://%%host%%"
          name: "<EXAMPLE_NAME>"
```

[1]: /ja/integrations/http_check/
{{< /tab >}}
{{< tab "Daemonset" >}}
クラスターごとに 1 回だけ [HTTP チェック][1]を行いたい Kubernetes サービスがある場合は、Cluster Agent コンテナに以下の内容で `/conf.d/http_check.yaml` ファイルをマウントしてください。

```yaml
advanced_ad_identifiers:
  - kube_service:
      name: "<SERVICE_NAME>"
      namespace: "<SERVICE_NAMESPACE>"
cluster_check: true
init_config:
instances:
  - url: "http://%%host%%"
    name: "<EXAMPLE_NAME>"
```

[1]: /ja/integrations/http_check/
{{< /tab >}}
{{< /tabs >}}

**注:** フィールド `advanced_ad_identifiers` は、Datadog Cluster Agent 1.18+ からサポートされるようになりました。

### Kubernetes のサービスアノテーションからの構成

[Kubernetes ポッドのアノテーション][1]の構文と同様に、以下の構文でサービスをアノテーションできます。

```yaml
ad.datadoghq.com/service.check_names: '[<INTEGRATION_NAME>]'
ad.datadoghq.com/service.init_configs: '[<INIT_CONFIG>]'
ad.datadoghq.com/service.instances: '[<INSTANCE_CONFIG>]'
```

サービス IP により、`%%host%%` [テンプレート変数][10]がサポートされ、変換されます。`kube_namespace` と `kube_service` のタグは自動的にインスタンスに付与されます。

#### 例: NGINX によってホストされるサービスの HTTP チェック

以下のサービス定義では、`my-nginx` デプロイからポッドを外部に出し、[HTTP チェック][9]を実行させて負荷分散サービスの待ち時間を測定します。

```yaml
apiVersion: v1
kind: Service
metadata:
    name: my-nginx
    labels:
        run: my-nginx
        tags.datadoghq.com/env: "prod"
        tags.datadoghq.com/service: "my-nginx"
        tags.datadoghq.com/version: "1.19.0"
    annotations:
        ad.datadoghq.com/service.check_names: '["http_check"]'
        ad.datadoghq.com/service.init_configs: '[{}]'
        ad.datadoghq.com/service.instances: |
            [
              {
                "name": "My Nginx",
                "url": "http://%%host%%",
                "timeout": 1
              }
            ]
spec:
    ports:
        - port: 80
          protocol: TCP
    selector:
        run: my-nginx
```

さらに、集約されたサービスだけではなく各ワーカーのモニターも可能なため、各ポッドは [NGINX チェック][11]によりモニターされます。

## トラブルシューティング

分散型という性質上、クラスターチェックのトラブルシューティングは多少複雑です。以下のセクションでは、ディスパッチプロセスと関連するトラブルシューティングコマンドについて説明します。

### Kubernetes: リーダー Cluster Agent の検索

リーダー選択が可能な場合、リーダーだけがクラスターチェック構成をノードベースの Agent に送ります。Cluster Agent ポッドのレプリカが 1 つだけ稼働している場合、そのレプリカがリーダーとなります。それ以外の場合は、`datadog-leader-election` `ConfigMap` でリーダーの名前を確認することができます。

```yaml
# kubectl get cm datadog-leader-election -o yaml
apiVersion: v1
kind: ConfigMap
metadata:
  annotations:
    control-plane.alpha.kubernetes.io/leader: '{"holderIdentity":"cluster-agent-rhttz", ...''
```

この例では、リーダーポッドは `cluster-agent-rhttz` です。ポッドが削除されている、あるいは応答がない場合は、別のポッドが自動的に引き継ぎます。

### Cluster Agent 内のオートディスカバリー

Cluster Agent に構成 (静的またはオートディスカバリー) が分かるよう、Cluster Agent のリーダーの `configcheck` コマンドを使用します。

```text
# kubectl exec <CLUSTER_AGENT_POD_NAME> agent configcheck
...
=== http_check cluster check ===
Source: kubernetes-services
Instance ID: http_check:My service:6e5f4b16b4b433cc
name: My service
tags:
- kube_namespace:default
- kube_service:my-nginx
timeout: 1
url: http://10.15.246.109
~
Init Config:
{}
Auto-discovery IDs:
* kube_service://751adfe4-1280-11e9-a26b-42010a9c00c8
===
```

### Cluster Agent のディスパッチロジック

`clusterchecks` コマンドにより、以下を含むディスパッチロジックの状態をチェックできます。

- どのノードベースの Agent が Cluster Agent にアクティブに報告しているか
- 各ノードにどのチェックがディスパッチされているか

```text
# kubectl exec <CLUSTER_AGENT_POD_NAME> agent clusterchecks

=== 3 node-agents reporting ===
Name                                            Running checks
default-pool-bce5cd34-7g24.c.sandbox.internal   0
default-pool-bce5cd34-slx3.c.sandbox.internal   2
default-pool-bce5cd34-ttw6.c.sandbox.internal   1
...

===== Checks on default-pool-bce5cd34-ttw6.c.sandbox.internal =====

=== http_check check ===
Source: kubernetes-services
Instance ID: http_check:My service:5b948dee172af830
empty_default_hostname: true
name: My service
tags:
- kube_namespace:default
- kube_service:my-nginx
- cluster_name:example
timeout: 1
url: http://10.15.246.109
~
Init Config:
{}
===
```

**注**: `configcheck` コマンドとはインスタンス ID が異なりますが、インスタンスが変更されてタグとオプションが追加されるためです。

この場合、この構成は `default-pool-bce5cd34-ttw6` ノードへディスパッチされます。トラブルシューティングは、その対応するノード上の Agent ポッドに関して続行されます。

### ノードベースの Agent 内のオートディスカバリー

Agent の `configcheck` コマンドは、`cluster-checks` ソース付きのインスタンスを表示します。

```text
# kubectl exec <NODE_AGENT_POD_NAME> agent configcheck
...
=== http_check check ===
Source: cluster-checks
Instance ID: http_check:My service:5b948dee172af830
empty_default_hostname: true
name: My service
tags:
- kube_namespace:default
- kube_service:my-nginx
- cluster_name:example
timeout: 1
url: http://10.15.246.109
~
Init Config:
{}
===
```

インスタンス ID は初期のものと一致します。

### Agent のステータス

Agent の `status` コマンドは、正しく実行されて報告を行っているチェックインスタンスを表示します。

```text
# kubectl exec <NODE_AGENT_POD_NAME> agent status
...
    http_check (3.1.1)
    ------------------
      Instance ID: http_check:My service:5b948dee172af830 [OK]
      Total Runs: 234
      Metric Samples: Last Run: 3, Total: 702
      Events: Last Run: 0, Total: 0
      Service Checks: Last Run: 1, Total: 234
      Average Execution Time : 90ms
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/kubernetes/integrations/
[2]: /ja/agent/cluster_agent/
[3]: /ja/agent/cluster_agent/clusterchecksrunner?tab=helm
[4]: /ja/agent/cluster_agent/clusterchecksrunner?tab=operator
[5]: /ja/developers/custom_checks/write_agent_check/
[6]: /ja/agent/guide/template_variables/
[7]: /ja/agent/cluster_agent/clusterchecks/#example-http_check-on-a-kubernetes-service
[8]: /ja/integrations/mysql/
[9]: /ja/integrations/http_check/
[10]: /ja/agent/faq/template_variables/
[11]: /ja/integrations/nginx/