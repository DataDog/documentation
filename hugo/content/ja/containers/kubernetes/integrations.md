---
aliases:
- /ja/agent/autodiscovery/integrations
- /ja/guides/servicediscovery/
- /ja/guides/autodiscovery/
- /ja/agent/kubernetes/integrations
description: Autodiscovery テンプレートを使用して、Kubernetes で実行されているアプリケーションのモニターインテグレーションを構成します
further_reading:
- link: https://www.datadoghq.com/blog/monitor-karpenter-datadog
  tag: ブログ
  text: Datadog で Karpenter をモニターします
- link: /agent/kubernetes/log/
  tag: よくあるご質問
  text: アプリケーションログの収集
- link: /agent/kubernetes/apm/
  tag: よくあるご質問
  text: アプリケーショントレースの収集
- link: /agent/kubernetes/prometheus/
  tag: よくあるご質問
  text: Prometheus メトリクスの収集
- link: /agent/guide/autodiscovery-management/
  tag: よくあるご質問
  text: データ収集をコンテナのサブセットのみに制限
- link: /agent/kubernetes/tag/
  tag: よくあるご質問
  text: コンテナから送信された全データにタグを割り当て
- link: https://www.youtube.com/watch?v=nuxmVf9ByE0
  tag: ビデオ
  text: 'Datadog のヒントとコツ: Datadog Autodiscovery 用に JSON で Kubernetes のアノテーションを記述する方法'
title: Kubernetes とインテグレーション
---
このページでは、_Autodiscovery_ という Datadog 機能を使用して、Kubernetes インフラストラクチャーのインテグレーションをインストールおよび構成する方法について説明します。これにより、`%%host%%` のような [変数][16] を使用して、構成設定を動的に入力することができます。Autodiscovery の動作についての詳細な説明は、[コンテナの概要: Autodiscovery][12] を参照してください。特定のコンテナを Autodiscovery から除外したり、準備されていない Pod を許容したりするなどの高度な Autodiscovery オプションについては、[コンテナディスカバリー管理][23] を参照してください。

Docker または Amazon ECS を使用している場合は、[Docker および Integrations][1] を参照してください。

<div class="alert alert-info">
次の Datadog インテグレーションは、プロセスツリーデータまたはファイルシステムアクセスを必要とするため、Autodiscovery では機能しません: <a href="/integrations/ceph">Ceph</a>、<a href="/integrations/varnish">Varnish</a>、<a href="/integrations/postfix">Postfix</a>、<a href="/integrations/cassandra/#agent-check-cassandra-nodetool">Cassandra Nodetool</a>、および <a href="/integrations/gunicorn">Gunicorn</a>。<br/><br/>
Autodiscovery と互換性のないインテグレーションをモニターするには、Pod 内で Prometheus エクスポーターを使用して HTTP エンドポイントを公開し、<a href="/integrations/openmetrics/">OpenMetrics インテグレーション</a> (Autodiscovery をサポート) を使用して Pod を見つけ、エンドポイントをクエリします。
</div>

## インテグレーションを設定する {#set-up-your-integration}

一部のインテグレーションでは、アクセストークンの作成や Datadog Agent への読み取り権限の付与などのセットアップを行う必要があります。インテグレーションのドキュメントの**セットアップ**セクションの手順に従ってください。

### コミュニティのインテグレーション {#community-integrations}
Datadog Agent に同梱されていないインテグレーションを使用する場合は、目的のインテグレーションを含むカスタム イメージをビルドする必要があります。手順については [コミュニティインテグレーションを使用する][13] を参照してください。

## 構成 {#configuration}

一般的に使用される一部のインテグレーションには、Autodiscovery 用のデフォルト構成が付属しています。詳細については、[Autodiscovery 自動構成][20] を参照してください。ここには、自動構成されるインテグレーションと対応するデフォルト構成ファイルのリストが記載されています。このリストにご使用のインテグレーションが含まれており、デフォルトの構成がユースケースに十分であれば、追加のアクションは必要ありません。

そうでない場合は、次のようにします。

1. ユースケースに適した構成方法 (Kubernetes Pod のアノテーション、ローカルファイル、ConfigMap、key-value ストア、Datadog Operator マニフェスト、または Helm チャート) を選択してください。
2. 選択した方法のテンプレート形式を参照します。各形式には、`<CONTAINER_NAME>` などのプレースホルダーが含まれています。
3. [これらのプレースホルダーの値を提供](#placeholder-values)します。

{{< tabs >}}
{{% tab "アノテーション" %}}

Kubernetes Pod を `kind: Pod` で直接定義する場合は、次のようにして各 Pod のアノテーションを `metadata` セクションで直接追加してください。

**Autodiscovery Annotations v2** (Datadog Agent v7.36 以降用)

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.checks: |
      {
        "<INTEGRATION_NAME>": {
          "init_config": <INIT_CONFIG>,
          "instances": [<INSTANCES_CONFIG>]
        }
      }
    ad.datadoghq.com/<CONTAINER_NAME>.logs: '[<LOGS_CONFIG>]'
    # (...)
spec:
  containers:
    - name: '<CONTAINER_NAME>'
# (...)
```

**Autodiscovery Annotations v1**

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.check_names: '[<INTEGRATION_NAME>]'
    ad.datadoghq.com/<CONTAINER_NAME>.init_configs: '[<INIT_CONFIG>]'
    ad.datadoghq.com/<CONTAINER_NAME>.instances: '[<INSTANCES_CONFIG>]'
    ad.datadoghq.com/<CONTAINER_NAME>.logs: '[<LOGS_CONFIG>]'
    # (...)
spec:
  containers:
    - name: '<CONTAINER_NAME>'
# (...)
```

(デプロイメント、ReplicaSets、ReplicationControllers を使用して) Pod を間接的に定義する場合は、Pod のアノテーションを `spec.template.metadata` の下に追加します。

{{% /tab %}}
{{% tab "ローカルファイル" %}}

Autodiscovery テンプレートを、マウントされている `conf.d` ディレクトリ (`/etc/datadog-agent/conf.d`) 内にローカルファイルとして保存できます。テンプレートを変更、追加、または削除するたびに、Agent コンテナを再起動する必要があります。

1. ホストで `conf.d/<INTEGRATION_NAME>.d/conf.yaml` ファイルを作成します。
   ```yaml
   ad_identifiers:
     - <CONTAINER_IMAGE>

   init_config:
     <INIT_CONFIG>

   instances:
     <INSTANCES_CONFIG>

   logs:
     <LOGS_CONFIG>
   ```

2. ホストの `conf.d/` フォルダをコンテナ化された Agent の `conf.d` フォルダにマウントします。

   Datadog Operator の場合:
   ```yaml
   spec:
     override:
       nodeAgent:
         volumes:
           - hostPath:
               path: <PATH_TO_LOCAL_FOLDER>/conf.d
             name: confd
   ```

   Helm の場合:
   ```yaml
   agents:
     volumes:
     - hostPath:
         path: <PATH_TO_LOCAL_FOLDER>/conf.d
       name: confd
     volumeMounts:
     - name: confd
       mountPath: /conf.d
   ```

{{% /tab %}}
{{% tab "ConfigMap" %}}

[ConfigMaps][1] を使用して、構成を外部で定義してからマウントできます。

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: "<NAME>-config-map"
  namespace: default
data:
  <INTEGRATION_NAME>-config: |-
    ad_identifiers:
      <CONTAINER_IMAGE>
    init_config:
      <INIT_CONFIG>
    instances:
      <INSTANCES_CONFIG>
    logs:
      <LOGS_CONFIG>
```

[1]: https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap

{{% /tab %}}
{{% tab "key-value ストア" %}}

Autodiscovery テンプレートは [Consul][1]、[etcd][2]、または [ZooKeeper][3] から取得できます。key-value ストアは `datadog.yaml` 構成ファイルで設定するか (その後、このファイルを Agent コンテナ内にマウントします)、または Agent コンテナ内の環境変数として設定できます。

**datadog.yaml での構成**:

`datadog.yaml` で、key-value ストアの `<KEY_VALUE_STORE_IP>` アドレスと `<KEY_VALUE_STORE_PORT>` を設定します。

  ```yaml
  config_providers:
    - name: etcd
      polling: true
      template_dir: /datadog/check_configs
      template_url: '<KV_STORE_IP>:<KV_STORE_PORT>'
      username:
      password:

    - name: consul
      polling: true
      template_dir: datadog/check_configs
      template_url: '<KV_STORE_IP>:<KV_STORE_PORT>'
      ca_file:
      ca_path:
      cert_file:
      key_file:
      username:
      password:
      token:

    - name: zookeeper
      polling: true
      template_dir: /datadog/check_configs
      template_url: '<KV_STORE_IP>:<KV_STORE_PORT>'
      username:
      password:
  ```

[Datadog Agent を再起動][4] して、変更を適用します。

**環境変数での構成**:

key-value ストアがテンプレートソースとして有効になっている場合、Agent はキー `/datadog/check_configs` の下にテンプレートを探します。Autodiscovery では、このような key-value 階層を使用する必要があります。

```yaml
/datadog/
  check_configs/
    <CONTAINER_IMAGE>/
      - check_names: ["<INTEGRATION_NAME>"]
      - init_configs: ["<INIT_CONFIG>"]
      - instances: ["<INSTANCES_CONFIG>"]
      - logs: ["<LOGS_CONFIG>"]
    ...
```

[1]: /ja/integrations/consul/
[2]: /ja/integrations/etcd/
[3]: /ja/integrations/zk/
[4]: /ja/agent/configuration/agent-commands/

{{% /tab %}}
{{% tab "Datadog Operator" %}}

`datadog-agent.yaml` でインテグレーションを構成するには、`DatadogAgent` 構成の `nodeAgent` コンポーネントにオーバーライド `extraConfd.configDataMap` を追加します。各キーは、Agent の `conf.d` ディレクトリ内のファイルになります。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    [...]
  features:
    [...]
  override:
    nodeAgent:
      extraConfd:
        configDataMap:
          <INTEGRATION_NAME>.yaml: |-
            ad_identifiers:
              - <CONTAINER_IMAGE>
            init_config:
              <INIT_CONFIG>
            instances:
              <INSTANCES_CONFIG>
            logs:
              <LOGS_CONFIG>
```
<div class="alert alert-info">デプロイされた複数の <code>DatadogAgent</code> CRD で、 <code>configDataMap</code>を使用している場合、各 CRD は <code>nodeagent-extra-confd</code>という名前の共有の ConfigMap に書き込みます。これにより、構成が互いにオーバーライドされる可能性があります。</div>

[Cluster チェック][1] をモニターするには、オーバーライド `extraConfd.configDataMap` を `clusterAgent` コンポーネントに追加します。`features.clusterChecks.enabled: true` を設定して、クラスターチェックも有効にする必要があります。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    [...]
  features:
    clusterChecks:
      enabled: true
    [...]
  override:
    nodeAgent:
      [...]
    clusterAgent:
      extraConfd:
        configDataMap:
          <INTEGRATION_NAME>.yaml: |-
            ad_identifiers:
              - <CONTAINER_IMAGE>
            cluster_check: true
            init_config:
              <INIT_CONFIG>
            instances:
              <INSTANCES_CONFIG>
            logs:
              <LOGS_CONFIG>
```

詳細については、[Cluster チェック][1] を参照してください。

[1]: /ja/agent/cluster_agent/clusterchecks

{{% /tab %}}
{{% tab "Helm" %}}

ご使用の `datadog-values.yaml` ファイルには、Autodiscovery テンプレートを定義できる `datadog.confd` セクションが含まれています。サンプルの [values.yaml][1] にインラインの例が用意されています。各キーは、Agent の `conf.d` ディレクトリ内のファイルになります。

```yaml
datadog:
  confd:
    <INTEGRATION_NAME>.yaml: |-
      ad_identifiers:
        - <CONTAINER_IMAGE>
      init_config:
        <INIT_CONFIG>
      instances:
        <INSTANCES_CONFIG>
      logs:
        <LOGS_CONFIG>
```

[Cluster チェック][3] をモニターするには、`clusterAgent.confd` の下にテンプレートを定義します。サンプルの [values.yaml][2] にインラインの例が用意されています。`clusterAgent.enabled: true` を設定して Cluster Agent を有効にし、`datadog.clusterChecks.enabled: true` を設定してクラスターチェックを有効にする必要もあります。

```yaml
datadog:
  clusterChecks:
    enabled: true
clusterAgent:
  enabled: true
  confd:
    <INTEGRATION_NAME>.yaml: |-
      ad_identifiers:
        - <CONTAINER_IMAGE>
      cluster_check: true
      init_config:
        <INIT_CONFIG>
      instances:
        <INSTANCES_CONFIG>
      logs:
        <LOGS_CONFIG>
```

詳細については、[Cluster チェック][3] を参照してください。

[1]: https://github.com/DataDog/helm-charts/blob/92fd908e3dd7b7149ce02de1fe859ae5ac717d03/charts/datadog/values.yaml#L315-L330
[2]: https://github.com/DataDog/helm-charts/blob/92fd908e3dd7b7149ce02de1fe859ae5ac717d03/charts/datadog/values.yaml#L680-L689
[3]: /ja/agent/cluster_agent/clusterchecks
{{% /tab %}}

{{< /tabs >}}

### プレースホルダー値 {#placeholder-values}

次のようにプレースホルダー値を指定します。

`<INTEGRATION_NAME>`
: ご使用の Datadog インテグレーションの名前。たとえば、`etcd` や `redisdb` です。

`<CONTAINER_NAME>`
: ご使用のインテグレーションに対応するコンテナの名前 (`spec.containers[i].image`**ではなく**`spec.containers[i].name`) に対して照合する識別子。

`<CONTAINER_IMAGE>`
: コンテナイメージ (`.spec.containers[i].image`) に対して照合する識別子。<br/><br/>
例: `redis` をコンテナ識別子として指定した場合、Autodiscovery テンプレートは `redis` と一致するイメージ名を持つすべてのコンテナに適用されます。`foo/redis:latest` と `bar/redis:v2` を実行している 1 つのコンテナを使用している場合は、Autodiscovery テンプレートは両方のコンテナに適用されます。<br/><br/>
`ad_identifiers` パラメーターはリストを受け入れるため、複数のコンテナ識別子を指定できます。カスタム識別子も使用できます。[カスタム Autodiscovery 識別子][21] を参照してください。

`<INIT_CONFIG>`
: インテグレーションの `<INTEGRATION_NAME>.d/conf.yaml.example` ファイルの `init_config` の下にリストされている構成パラメーター。`init_config` セクションは通常は空です。

`<INSTANCES_CONFIG>`
: インテグレーションの `<INTEGRATION_NAME>.d/conf.yaml.example` ファイルの `instances` の下にリストされている構成パラメーター。

`<LOGS_CONFIG>`
: インテグレーションの `<INTEGRATION_NAME>.d/conf.yaml.example` ファイルの `logs` の下にリストされている構成パラメーター。

### 高度なアノテーションパラメーター {#advanced-annotation-parameters}

チェック、ログ、インスタンスのためのコア Autodiscovery アノテーションに加えて、チェックの動作をカスタマイズするための追加のアノテーションを使用できます。

#### タグのカーディナリティ {#tag-cardinality}

`check_tag_cardinality` アノテーションを使用して、特定のチェックに対するタグのカーディナリティレベルを設定します。これは、そのチェックによって収集されたメトリクスのグローバル Agent タグのカーディナリティ設定をオーバーライドします。

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.checks: |
      {
        "<INTEGRATION_NAME>": {
          "init_config": <INIT_CONFIG>,
          "instances": [<INSTANCES_CONFIG>]
        }
      }
    ad.datadoghq.com/<CONTAINER_NAME>.check_tag_cardinality: "<low|orchestrator|high>"
spec:
  containers:
    - name: '<CONTAINER_NAME>'
```

<div class="alert alert-info"> <code>check_tag_cardinality</code> アノテーションは、インテグレーションチェックによって収集されたメトリクスにのみ影響します。DogStatsD を介して送信されたメトリクスには影響しません。DogStatsD タグのカーディナリティを設定するには、グローバル <code>dogstatsd_tag_cardinality</code> 構成パラメーターまたは <code>DD_DOGSTATSD_TAG_CARDINALITY</code> 環境変数を使用します。</div>

タグのカーディナリティに関する詳細は、[チェック別のタグコンフィギュレーション][27] を参照してください。

### 自動構成 {#auto-configuration}

Datadog Agent は、一般的な技術に対する基本的な構成を自動的に認識し、提供します。完全なリストについては、[Autodiscovery 自動構成][20] を参照してください。

Kubernetes アノテーションで設定された構成は自動構成よりも優先されますが、自動構成は Datadog Operator または Helm で設定された構成よりも優先されます。Datadog Operator または Helm を使用して [Autodiscovery 自動構成][20] リストのインテグレーションを構成するには、[自動構成を無効化][22] する必要があります。

## インテグレーションのセキュリティ {#integrations-security}

インテグレーションでは通常、ファイルシステムから構成ファイル、証明書、またはその他のリソースを読み取る必要があります。ファイルパスが信頼できない構成プロバイダー (たとえば、Pod アノテーションや外部サービスの自動検出) から取得されたものである場合は、パスのトラバーサルや不正なファイルアクセスが発生するリスクがあります。

Datadog Agent バージョン 7.78.0 以降、構成プロバイダーの信頼レベルに基づいてファイルシステムアクセスを制御するために、Agent の `datadog.yaml` に次のパラメーターを設定できます。

| パラメーター | 型 | デフォルト | 説明 |
|-----------|------|---------|-------------|
| `integration_ignore_untrusted_file_params` | ブール | `false` | 有効にすると、インテグレーションは、信頼できない構成プロバイダーから提供されたファイルパスを参照する構成パラメーターを無視します。|
| `integration_file_paths_allowlist` | リスト | `[]` | 信頼できない構成プロバイダーから提供された場合でも、インテグレーションがアクセスを許可されるファイルパスのリスト。空のリストは、すべてのファイルパスが許可されていることを意味します。|
| `integration_trusted_providers` | リスト | `["file", "remote-config"]` | 信頼されていると見なされる構成プロバイダーのリスト。このリストにないプロバイダーは信頼できないと見なされます。デフォルトで、ローカル構成ファイル (`file`) と Datadog Remote Configuration (`remote-config`) は信頼されています。サポートされているプロバイダーの完全なリストについては、[Datadog Agent のプロバイダー名][28] を参照してください。|
| `integration_security_excluded_checks` | リスト | `[]` | 上記のセキュリティ制限から除外されるインテグレーション名のリスト。|

これらのオプションは後方互換性があり、デフォルト値は既存の動作を維持します。オプトインするには、`integration_ignore_untrusted_file_params` を有効にし、残りのパラメーターを環境に合わせて調整してください。

`datadog.yaml` の例:

```yaml
integration_ignore_untrusted_file_params: true
integration_file_paths_allowlist:
  - /etc/datadog-agent/certs
  - /var/run/secrets
integration_trusted_providers:
  - file
  - remote-config
integration_security_excluded_checks:
  - <INTEGRATION_NAME>
```

この構成では、Pod アノテーション (信頼できないプロバイダー) を通じて構成されたインテグレーションは、`/etc/datadog-agent/certs` または `/var/run/secrets` の外部のファイルパスを参照できません。ただし、インテグレーション名が `integration_security_excluded_checks` にリストされている場合は除きます。

## 例: Postgres インテグレーション {#example-postgres-integration}

この例のシナリオでは、Kubernetes 上に Postgres をデプロイしています。[Datadog-Postgres インテグレーション][26] を設定および構成しようと考えています。すべての Postgres コンテナは、`postgres` という文字列が含まれるコンテナ名を持ちます。

まず、追加のセットアップ手順について、[Postgres インテグレーションのドキュメント][26] を参照してください。Postgres インテグレーションでは、`datadog` という名前の読み取り専用ユーザーを作成し、対応するパスワードを `PG_PASSWORD` という名前の環境変数として保存する必要があります。

このインテグレーションを**ホスト上で**構成する場合は、[`postgresql.d/conf.yaml.example`][15] のパラメーターを参照し、次の内容を含む `postgresql.d/conf.yaml` ファイルを作成できます。

```yaml
init_config:
instances:
  - host: localhost
    port: 5432
    username: datadog
    password: <PASSWORD>
logs:
  - type: file
    path: /var/log/postgres.log
    source: postgresql
    service: pg_service
```

ここで、`<PASSWORD>` は作成した `datadog` ユーザーのパスワードに対応しています。

この構成を Postgres コンテナに適用するには、次のようにします。

{{< tabs >}}
{{% tab "アノテーション" %}}

Pod マニフェストで、次のようにしあす。

**Autodiscovery Annotations v2** (Datadog Agent v7.36 以降用)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: postgres
  annotations:
    ad.datadoghq.com/postgres.checks: |
      {
        "postgres": {
          "instances": [
            {
              "host": "%%host%%",
              "port": "5432",
              "username": "datadog",
              "password":"%%env_PG_PASSWORD%%"
            }
          ]
        }
      }
    ad.datadoghq.com/postgres.logs: |
      [
        {
          "type": "file",
          "path": "/var/log/postgres.log",
          "source": "postgresql",
          "service": "pg_service"
        }
      ]
spec:
  containers:
    - name: postgres
```

**Autodiscovery Annotations v1**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: postgres
  annotations:
    ad.datadoghq.com/postgres.check_names: '["postgres"]'
    ad.datadoghq.com/postgres.init_configs: '[{}]'
    ad.datadoghq.com/postgres.instances: |
      [
        {
          "host": "%%host%%",
          "port": "5432",
          "username": "datadog",
          "password":"%%env_PG_PASSWORD%%"
        }
      ]
    ad.datadoghq.com/postgres.logs: |
      [
        {
          "type": "file",
          "path": "/var/log/postgres.log",
          "source": "postgresql",
          "service": "pg_service"
        }
      ]
spec:
  containers:
    - name: postgres
```

{{% /tab %}}
{{% tab "ローカルファイル" %}}
1. ホストで `conf.d/postgresql.d/conf.yaml` ファイルを作成します。

   ```yaml
   ad_identifiers:
     - postgres
   init config:
   instances:
     - host: "%%host%%"
       port: "5432"
       username: "datadog"
       password: "%%env_PG_PASSWORD%%"
   logs:
     - type: "file"
       path: "/var/log/postgres.log"
       source: "postgresql"
       service: "pg_service"
   ```

2. ホストの `conf.d/` フォルダをコンテナ化された Agent の `conf.d` フォルダにマウントします。

   Datadog Operator の場合:
   ```yaml
   spec:
     override:
       nodeAgent:
         volumes:
           - hostPath:
               path: <PATH_TO_LOCAL_FOLDER>/conf.d
             name: confd
   ```

   Helm の場合:
   ```yaml
   agents:
     volumes:
     - hostPath:
         path: <PATH_TO_LOCAL_FOLDER>/conf.d
       name: confd
     volumeMounts:
     - name: confd
       mountPath: /conf.d
   ```

{{% /tab %}}
{{% tab "ConfigMap" %}}

ConfigMap で、次のようにします。

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: postgresql-config-map
  namespace: default
data:
  postgresql-config: |-
    ad_identifiers:
      - postgres
    init_config:
    instances:
      - host: "%%host%%"
        port: "5432"
        username: "datadog"
        password: "%%env_PG_PASSWORD%%"
    logs:
      - type: "file"
        path: "/var/log/postgres.log"
        source: "postgresql"
        service: "pg_service"
```

次に、マニフェストで `volumeMounts` と `volumes` を定義します。

```yaml
# [...]
        volumeMounts:
        # [...]
          - name: postgresql-config-map
            mountPath: /etc/datadog-agent/conf.d/postgresql.d
        # [...]
      volumes:
      # [...]
        - name: postgresql-config-map
          configMap:
            name: postgresql-config-map
            items:
              - key: postgresql-config
                path: conf.yaml
# [...]
```

{{% /tab %}}
{{% tab "key-value ストア" %}}

以下の etcd コマンドは、カスタム `password` パラメーターを使用して Postgres インテグレーションテンプレートを作成します。

```conf
etcdctl mkdir /datadog/check_configs/postgres
etcdctl set /datadog/check_configs/postgres/check_names '["postgres"]'
etcdctl set /datadog/check_configs/postgres/init_configs '[{}]'
etcdctl set /datadog/check_configs/postgres/instances '[{"host": "%%host%%","port":"5432","username":"datadog","password":"%%env_PG_PASSWORD%%"}]'
```

3 つの値はいずれもリストであることに注意してください。Autodiscovery は、共有リストインデックスに基づいてインテグレーション構成にリスト項目を組み立てます。この場合、`check_names[0]`、`init_configs[0]`、および `instances[0]` から最初 (かつ唯一) のチェック構成を構成します。

{{% /tab %}}
{{% tab "Datadog Operator" %}}

`datadog-agent.yaml` で、次のようにします。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    [...]
  features:
    [...]
  override:
    nodeAgent:
      extraConfd:
        configDataMap:
          postgres.yaml: |-
            ad_identifiers:
              - postgres
            init_config:
            instances:
              - host: "%%host%%"
                port: 5432
                username: "datadog"
                password: "%%env_PG_PASSWORD%%"
```
その結果、Agent には上記の構成を持つ `postgres.yaml` ファイルが `conf.d` ディレクトリに格納されます。

{{% /tab %}}
{{% tab "Helm" %}}

`datadog-values.yaml` で、次のようにします。

```yaml
datadog:
  confd:
    postgres.yaml: |-
      ad_identifiers:
        - postgres
      init_config:
      instances:
        - host: "%%host%%"
          port: 5432
          username: "datadog"
          password: "%%env_PG_PASSWORD%%"
```
その結果、Agent には上記の構成を持つ `postgres.yaml` ファイルが `conf.d` ディレクトリに格納されます。

{{% /tab %}}
{{< /tabs >}}

これらのテンプレートは、次の [Autodiscovery テンプレート変数][16] を使用します。
- `%%host%%` には、コンテナの IP が動的に設定されます。
- `%%env_PG_PASSWORD%%`は、Agent プロセスから見た `PG_PASSWORD` という名前の環境変数を参照します。

複数のコンテナセットに対して複数のチェックを設定する方法など、さらに多くの例については [Autodiscovery: シナリオと例][24] を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/docker/integrations/
[2]: /ja/getting_started/integrations/#configuring-agent-integrations
[3]: /ja/agent/configuration/secrets-management/
[4]: /ja/integrations/ceph/
[5]: /ja/integrations/varnish/#autodiscovery
[6]: /ja/integrations/postfix/
[7]: /ja/integrations/cassandra/#agent-check-cassandra-nodetool
[8]: /ja/integrations/gunicorn/
[9]: /ja/integrations/apache/#setup
[10]: /ja/integrations/http_check/#setup
[11]: /ja/getting_started/integrations/
[12]: /ja/getting_started/containers/autodiscovery
[13]: /ja/agent/guide/use-community-integrations/
[14]: /ja/integrations/redis
[15]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[16]: /ja/containers/guide/template_variables/
[17]: /ja/integrations/coredns
[18]: /ja/integrations/etcd/
[19]: /ja/integrations/kube_apiserver_metrics
[20]: /ja/containers/guide/auto_conf
[21]: /ja/containers/guide/ad_identifiers
[22]: /ja/containers/guide/auto_conf/#disable-auto-configuration
[23]: /ja/containers/guide/autodiscovery-management
[24]: /ja/containers/guide/autodiscovery-examples
[25]: /ja/integrations/istio/
[26]: /ja/integrations/postgres
[27]: /ja/getting_started/integrations/#per-check-tag-configuration
[28]: https://github.com/DataDog/datadog-agent/blob/main/comp/core/autodiscovery/providers/names/provider_names.go#L10-L38