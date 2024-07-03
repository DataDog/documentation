---
aliases:
- /ja/agent/autodiscovery/clusterchecks
- /ja/agent/faq/kubernetes-state-cluster-check
- /ja/agent/cluster_agent/clusterchecks
further_reading:
- link: /containers/cluster_agent/
  tag: Documentation
  text: Datadog Cluster Agent
- link: /containers/troubleshooting/cluster-and-endpoint-checks
  tag: Documentation
  text: Troubleshooting Cluster Checks
- link: /containers/guide/clustercheckrunners
  tag: Documentation
  text: Cluster Check Runners
title: Cluster Checks
---

## 概要

Datadog Agent は、[オートディスカバリーメカニズム][1]を用いてコンテナを自動的に発見し、チェック構成を作成します。

_クラスターチェック_は機能を拡張し、次のようなコンテナ化されていないワークロードを監視します。

- データストアとエンドポイントがクラスターの外部で実行された (例えば、RDS や CloudSQL)。
- 負荷分散型クラスターサービス (例: Kubernetes サービス)

これにより、ノードベースの Agent ポッド**ごとに**対応するチェックを実行するのではなく、各チェックの **1 つ**のインスタンスのみが実行されるようになります。[Cluster Agent][2] は構成を保持し、それをノードベースの Agent に動的にディスパッチします。Agent は 10 秒ごとに Cluster Agent に接続し、実行する構成を取得します。1 つの Agent が報告を停止した場合、Cluster Agent はその Agent をアクティブなプールから削除し、他の Agent に構成をディスパッチします。これにより、クラスターにノードが追加または削除されても、常にインスタンスが 1 つだけ実行されることになります。

クラスターチェックによって収集されたメトリクス、イベント、およびサービスチェックは、ホスト名は関連がないため、それ無しで送信されます。データのスコープやフィルタリングを実行できるように、`cluster_name` タグが追加されます。

インフラストラクチャーが高可用性 (HA) 向けに構成されている場合は、クラスターチェックを使用することをお勧めします。

## クラスターチェックのディスパッチを設定する
セットアッププロセスでは、Cluster Agent でディスパッチ機能を有効にすることと、Agent が `clusterchecks` プロバイダーから構成を受け取る準備が整っていることを確認します。これが完了すると、マウントされたコンフィギュレーションファイルまたは Kubernetes サービスアノテーションを通じて、Cluster Agent に構成が渡されます。

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Cluster check dispatching is enabled in the Operator deployment of the Cluster Agent by using the `spec.features.clusterChecks.enabled` configuration key:
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    clusterChecks:
      enabled: true
```

これにより、Cluster Agent でのクラスターチェックの設定が有効になり、Kubernetes サービスアノテーション (`kube_services`) からの構成を処理できるようになります。

{{% /tab %}}
{{% tab "Helm" %}}
Cluster check dispatching is enabled by default in the Helm deployment of the Cluster Agent through the `datadog.clusterChecks.enabled` configuration key:
```yaml
datadog:
  clusterChecks:
    enabled: true
  # (...)
clusterAgent:
  enabled: true
  # (...)
```

This enables the cluster check setup in the Cluster Agent and allows it to process configurations from the Kubernetes service annotations (`kube_services`).
{{% /tab %}}

{{% tab "Manual (DaemonSet)" %}}
### Cluster Agent

[Cluster Agent][1] を実行したら、Cluster Agent のデプロイメントを以下のように変更します。

1. 環境変数 `DD_CLUSTER_CHECKS_ENABLED` を `true` に設定します。
2. クラスター名を `DD_CLUSTER_NAME` とします。メトリクスにスコープを当てるため、Datadog は全ての構成に `cluster_name` インスタンスタグとしてクラスター名を挿入します。
3. サービス名が初期設定の `datadog-cluster-agent` と異なる場合は、サービス名が `DD_CLUSTER_AGENT_KUBERNETES_SERVICE_NAME` の環境変数に反映されるようにします。
4. Kubernetes サービスアノテーションからの構成を Cluster Agent で処理できるようにするには、環境変数 `DD_EXTRA_CONFIG_PROVIDERS` と `DD_EXTRA_LISTENERS` を **両方** `kube_services` に設定します。

### Agent

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
{{% /tab %}}
{{< /tabs >}}


**注**: クラスターチェックでは、Agent が報告するメトリクスは、クラスター中心のメトリクスであり、必ずしもホストベースのメトリクスではないため、特定のホスト名にはリンクされません。その結果、これらのメトリクスは、クラウドプロバイダーから継承されたものや Agent の環境変数 `DD_TAGS` によって追加されたものなど、そのホストに関連付けられたホストレベルのタグを継承しません。クラスターチェックメトリクスにタグを追加するには、`DD_CLUSTER_CHECKS_EXTRA_TAGS` 環境変数を使用します。

### クラスターチェックランナー

[Datadog Helm Chart][3] と [Datadog Operator][4] では、さらにクラスターチェックランナーをデプロイすることができます。これは、通常のノードベースの Agent にディスパッチする代わりに、ディスパッチしたクラスターチェックのみを実行するように構成された Datadog Agent の小さなセットのためのデプロイです。詳しくは、[クラスターチェックランナー][5]のガイドをご覧ください。

### 高度なディスパッチ

Cluster Agent はクラスターチェックに対する高度なディスパッチロジックを使用することができます。これには、チェックインスタンスからの実行時間およびメトリクスサンプルが考慮されます。このロジックにより Cluster Agent はクラスターチェックランナー間のディスパッチと分散を最適化できます。

To configure advanced dispatching logic, set the `DD_CLUSTER_CHECKS_ADVANCED_DISPATCHING_ENABLED` environment variable to `true` for the Cluster Agent. See [Cluster Agent environment variables][15] for how to set environment variables in your Datadog Operator manifest or Helm chart.

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
全てのノードベースの Agent によるチェックの実行が可能であれば、クラスターチェックとしての [Agent のカスタムチェック][6]の実行がサポートされています。これにより、カスタムチェックのコードは以下のようになります。

- `clusterchecks` の構成プロバイダが有効になっている全てのノードベースの Agent にインストールされていること。
- 全ての Agent にアクセス可能ではない、ローカルのリソースに依存**しない**こと。

## チェック構成の設定

### コンフィギュレーションファイルからの構成

リソースの URL または IP が変わらない場合 (例: 外部サービスエンドポイントまたはパブリック URL)、静的構成を YAML ファイルとして Cluster Agent に渡すことができます。ファイル命名規則と構文はノードベースの Agent に対する静的構成と同じですが、必須の `cluster_check: true` 行が追加されています。

Cluster Agent v1.18.0 からは、Kubernetes サービスを対象としたチェック構成で、`advanced_ad_identifiers` と[オートディスカバリーテンプレート変数][7]を使用できます ([例をご参照ください][8])。

{{< tabs >}}
{{% tab "Datadog Operator" %}}
With the Datadog Operator, these configuration files can be created within the `spec.override.clusterAgent.extraConfd.configDataMap` section:

```yaml
spec:
#(...)
  override:
    clusterAgent:
      extraConfd:
        configDataMap:
          <INTEGRATION_NAME>.yaml: |-
            cluster_check: true
            init_config:
              - <INIT_CONFIG>
            instances:
              - <INSTANCES_CONFIG>
```

あるいは、静的コンフィギュレーションファイルを格納する ConfigMap を作成し、`spec.override.clusterAgent.extraConfd.configMap` フィールドを使用してこの ConfigMap を Cluster Agent にマウントすることができます。

```yaml
spec:
#(...)
  override:
    clusterAgent:
      extraConfd:
        configMap:
          name: "<NAME>-config-map"
          items:
            - key: <INTEGRATION_NAME>-config
              path: <INTEGRATION_NAME>.yaml
```

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

{{% /tab %}}
{{% tab "Helm" %}}
With Helm, these configuration files can be created within the `clusterAgent.confd` section.

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

**注**: これは、ノードベースの Agent でファイルを作成する `datadog.confd` セクションとは別のものです。`<INTEGRATION_NAME>` は、実行したいインテグレーションチェックと正確に一致させる必要があります。

{{% /tab %}}
{{% tab "Manual (DaemonSet)" %}}
With the manual approach you must create a ConfigMap to store the desired static configuration files, and then mount this ConfigMap into the corresponding `/conf.d` file of the Cluster Agent container. This follows the same approach for [mounting ConfigMaps into the Agent container][1]. For example:

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
{{% /tab %}}
{{< /tabs >}}

#### 例: 外部でホストされているデータベースの MySQL チェック

CloudSQL や RDS など外部でホストされているデータベースと、それに対応する [Datadog ユーザー][9]を設定してデータベースにアクセスしたら、Cluster Agent コンテナに以下の内容の `/conf.d/mysql.yaml` ファイルをマウントしてください。

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

クラスターごとに 1 回だけ [HTTP チェック][10]を行いたい URL がある場合は、Cluster Agent コンテナに以下の内容で `/conf.d/http_check.yaml` ファイルをマウントしてください。

```yaml
cluster_check: true
init_config:
instances:
    - name: "<EXAMPLE_NAME>"
      url: "<EXAMPLE_URL>"
```

#### 例: Kubernetes サービスでの HTTP_Check
Kubernetes サービスで、クラスターごとに 1 回だけ [HTTP チェック][10]をさせたいものがある場合

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Use the `spec.override.clusterAgent.extraConfd.configDataMap` field to define your check configuration:

```yaml
spec:
#(...)
  override:
    clusterAgent:
      extraConfd:
        configDataMap:
          http_check.yaml: |-
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
{{% /tab %}}
{{% tab "Helm" %}}
Use the `clusterAgent.confd` field to define your check configuration:

```yaml
#(...)
clusterAgent:
  confd:
    http_check.yaml: |-
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

{{% /tab %}}
{{% tab "Manual (DaemonSet)" %}}
Mount a `/conf.d/http_check.yaml` file in the Cluster Agent container with the following content:

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

{{% /tab %}}
{{< /tabs >}}

**注:** フィールド `advanced_ad_identifiers` は、Datadog Cluster Agent v1.18 からサポートされるようになりました。

### Kubernetes のサービスアノテーションからの構成

{{< tabs >}}
{{% tab "Kubernetes (AD v2)" %}}

**注:** AD Annotations v2 は、インテグレーション構成を簡素化するために、Datadog Agent 7.36 で導入されました。Datadog Agent の以前のバージョンでは、AD Annotations v1 を使用してください。

サービスにアノテーションするための構文は、[Kubernetes ポッドにアノテーションする][1]のと同様です。

```yaml
ad.datadoghq.com/service.checks: |
  {
    "<INTEGRATION_NAME>": {
      "init_config": <INIT_CONFIG>,
      "instances": [<INSTANCE_CONFIG>]
    }
  }
```

この構文は `%%host%%` [テンプレート変数][11]をサポートしており、サービスの IP に置き換わります。インスタンスには `kube_namespace` と `kube_service` タグが自動的に追加されます。

#### 例: NGINX によってホストされるサービスの HTTP チェック

以下のサービス定義では、`my-nginx` デプロイからポッドを外部に出し、[HTTP チェック][10]を実行させて負荷分散サービスの待ち時間を測定します。

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
      ad.datadoghq.com/service.checks: |
        {
          "http_check": {
            "init_config": {},
            "instances": [
              {
                "url":"http://%%host%%",
                "name":"My Nginx",
                "timeout":1
              }
            ]
          }
        }
spec:
    ports:
        - port: 80
          protocol: TCP
    selector:
        run: my-nginx
```

さらに、集約されたサービスだけではなく各ワーカーのモニターも可能なため、各ポッドは [NGINX チェック][12]によりモニターされます。

[1]: /ja/agent/kubernetes/integrations/
[10]: /ja/integrations/http_check/
[11]: /ja/agent/faq/template_variables/
[12]: /ja/integrations/nginx/
{{% /tab %}}

{{% tab "Kubernetes (AD v1)" %}}

サービスにアノテーションするための構文は、[Kubernetes ポッドにアノテーションする][1]のと同様です。

```yaml
ad.datadoghq.com/service.check_names: '[<INTEGRATION_NAME>]'
ad.datadoghq.com/service.init_configs: '[<INIT_CONFIG>]'
ad.datadoghq.com/service.instances: '[<INSTANCE_CONFIG>]'
```

この構文は `%%host%%` [テンプレート変数][11]をサポートしており、サービスの IP に置き換わります。インスタンスには `kube_namespace` と `kube_service` タグが自動的に追加されます。

#### 例: NGINX によってホストされるサービスの HTTP チェック

以下のサービス定義では、`my-nginx` デプロイからポッドを外部に出し、[HTTP チェック][10]を実行させて負荷分散サービスの待ち時間を測定します。

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

さらに、集約されたサービスだけではなく各ワーカーのモニターも可能なため、各ポッドは [NGINX チェック][12]によりモニターされます。

[1]: /ja/agent/kubernetes/integrations/
[10]: /ja/integrations/http_check/
[11]: /ja/agent/faq/template_variables/
[12]: /ja/integrations/nginx/

{{% /tab %}}
{{< /tabs >}}

## 検証

Datadog Cluster Agent は、各クラスターチェックを実行するためにノード Agent にディスパッチします。[Datadog Cluster Agent の `clusterchecks` サブコマンド][13]を実行し、ノード Agent のホスト名の下にチェック名を探します。

```
# kubectl exec <CLUSTER_AGENT_POD_NAME> agent clusterchecks
(...)
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

ここで、[ノード Agent の `status` サブコマンド][14]を実行し、Checks セクションの下にあるチェック名を探します。

```
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
[5]: /ja/containers/guide/clustercheckrunners
[6]: /ja/developers/custom_checks/write_agent_check/
[7]: /ja/agent/guide/template_variables/
[8]: /ja/agent/cluster_agent/clusterchecks/#example-http_check-on-a-kubernetes-service
[9]: /ja/integrations/mysql/
[10]: /ja/integrations/http_check/
[11]: /ja/agent/faq/template_variables/
[12]: /ja/integrations/nginx/
[13]: /ja/containers/troubleshooting/cluster-and-endpoint-checks#dispatching-logic-in-the-cluster-agent
[14]: /ja/containers/cluster_agent/commands/#cluster-agent-commands
[15]: /ja/containers/cluster_agent/commands/?tab=datadogoperator#cluster-agent-environment-variables