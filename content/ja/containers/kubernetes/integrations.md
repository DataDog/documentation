---
aliases:
- /ja/agent/autodiscovery/integrations
- /ja/guides/servicediscovery/
- /ja/guides/autodiscovery/
- /ja/agent/kubernetes/integrations
description: Kubernetes で実行されているアプリケーションの監視 Integrations を Autodiscovery テンプレートを使用して構成します
further_reading:
- link: https://www.datadoghq.com/blog/monitor-karpenter-datadog
  tag: ブログ
  text: Datadog で Karpenter を監視します
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
  text: Datadog の Autodiscovery 用に JSON で Kubernetes にアノテーションを書く方法に関する Datadog のヒントとコツ
title: Kubernetes と Integrations
---
このページでは、Datadog の機能である _Autodiscovery_ を使用して、Kubernetes インフラストラクチャーの Integrations をインストールおよび構成する方法について説明します。これにより、`%%host%%` のような [変数][16] を使用して、構成設定を動的に入力することができます。Autodiscovery の動作についての詳細な説明は、[コンテナの始め方: Autodiscovery][12] を参照してください。特定のコンテナを Autodiscovery から除外したり、未準備のPodを許容したりするなどの高度な Autodiscovery オプションについては、[コンテナ発見管理][23] を参照してください。

Docker または Amazon ECS を使用している場合は、[Docker とインテグレーション][1] を参照してください。

<div class="alert alert-info">
一部の Datadog Integrations は、プロセスツリーデータまたはファイルシステムアクセスを必要とするため、Autodiscovery では機能しません: <a href="/integrations/ceph">Ceph</a>、<a href="/integrations/varnish">Varnish</a>、<a href="/integrations/postfix">Postfix</a>、<a href="/integrations/cassandra/#agent-check-cassandra-nodetool">Cassandra Nodetool</a>、および <a href="/integrations/gunicorn">Gunicorn</a>.<br/><br/>
Autodiscovery と互換性のない Integrations を監視するには、ポッド内で Prometheus エクスポーターを使用して HTTP エンドポイントを公開し、その後 <a href="/integrations/openmetrics/">OpenMetrics Integration</a>（Autodiscovery をサポート）を使用してポッドを見つけ、エンドポイントをクエリします。
</div>

## Integrations を設定してください{#set-up-your-integration}

一部の Integrations には、アクセストークンの作成や Datadog Agent への読み取り権限の付与などのセットアップ手順が必要です。Integrations のドキュメントの **セットアップ** セクションの指示に従ってください。

### コミュニティ Integrations {#community-integrations}
Datadog Agent に同梱されていない Integrations を使用する場合は、目的の Integrations を含むカスタム イメージをビルドする必要があります。手順については [コミュニティ Integrations の使用][13] を参照してください。

## 構成 {#configuration}

一般的に使用される一部の Integrations には、Autodiscovery 用のデフォルト構成が付属しています。詳細については、[Autodiscovery 自動構成][20] を参照してください。自動構成されたインテグレーションのリストと、それに対応するデフォルト構成ファイルが含まれています。このリストに統合が含まれており、デフォルトの構成がユースケースに十分であれば、追加のアクションは必要ありません。

Otherwise:

1. ユースケースに適した構成方法（Kubernetes Podのアノテーション、ローカルファイル、ConfigMap、キー-バリューストア、Datadog Operatorマニフェスト、またはHelmチャート）を選択してください。
2. 選択した方法のテンプレート形式を参照してください。各形式には、`<CONTAINER_NAME>`のようなプレースホルダーが含まれています。
3. [これらのプレースホルダーに値](#placeholder-values)を提供してください。

{{< tabs >}}
{{% tab "アノテーション" %}}

Kubernetes Podを`kind: Pod`で直接定義する場合は、各Podのアノテーションをその`metadata`セクションの下に直接追加してください。以下のように：

**Autodiscoveryアノテーションv2**（Datadog Agent v7.36+向け）

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

**Autodiscoveryアノテーションv1**

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

Podを間接的に定義する場合（デプロイメント、ReplicaSets、またはReplicationControllersを使用）、Podのアノテーションを`spec.template.metadata`の下に追加してください。

{{% /tab %}}
{{% tab "ローカルファイル" %}}

Autodiscoveryテンプレートをマウントされた`conf.d`ディレクトリ内のローカルファイルとして保存できます（`/etc/datadog-agent/conf.d`）。テンプレートを変更、追加、または削除するたびに、Agentコンテナを再起動する必要があります。

1. ホスト上に`conf.d/<INTEGRATION_NAME>.d/conf.yaml`ファイルを作成してください：
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

2. ホストの`conf.d/`フォルダーをコンテナ化されたAgentの`conf.d`フォルダーにマウントします。

   Datadog Operatorの場合：
   ```yaml
   spec:
     override:
       nodeAgent:
         volumes:
           - hostPath:
               path: <PATH_TO_LOCAL_FOLDER>/conf.d
             name: confd
   ```

   Helmの場合：
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

[ConfigMaps][1]を使用して外部で構成を定義し、その後マウントすることができます。

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

[Consul][1]、[etcd][2]、または[ZooKeeper][3]からAutodiscoveryテンプレートを取得できます。キー-バリューストアを`datadog.yaml`構成ファイルで設定することができます（その後、このファイルをAgentコンテナ内にマウントするか、Agentコンテナ内の環境変数として設定します）。

**datadog.yamlで構成する**：

`datadog.yaml`で、キー-バリューストアの`<KEY_VALUE_STORE_IP>`アドレスと`<KEY_VALUE_STORE_PORT>`を設定します。

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

[Restart the Datadog Agent][4] to apply your changes.

**環境変数での構成**：

キーと値のストアがテンプレートソースとして有効になっている場合、エージェントはキー `/datadog/check_configs` の下にあるテンプレートを探します。自動発見は、このようなキーと値の階層を期待します：

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
{{% tab "Datadog OperatorDatadog オペレーター" %}}

`datadog-agent.yaml`で統合を構成するには、`DatadogAgent`構成の`nodeAgent`コンポーネントにオーバーライド`extraConfd.configDataMap`を追加してください。各キーは、エージェントの`conf.d`ディレクトリ内のファイルになります。

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
<div class="alert alert-info">複数のデプロイされた場合、 <code>DatadogAgent</code> CRDは使用します。 <code>configDataMap</code>, 各CRDは、共有のConfigMapに書き込みます。 <code>nodeagent-extra-confd</code>. これにより、構成が互いに上書きされる可能性があります。</div>

[クラスター チェック][1]を監視するには、`extraConfd.configDataMap`オーバーライドを`clusterAgent`コンポーネントに追加してください。`features.clusterChecks.enabled: true`を設定して、クラスター チェックも有効にする必要があります。

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

詳細については、[クラスター チェック][1]を参照してください。

[1]: /ja/agent/cluster_agent/clusterchecks

{{% /tab %}}
{{% tab "Helm" %}}

あなたの`datadog-values.yaml`ファイルには、Autodiscoveryテンプレートを定義できる`datadog.confd`セクションが含まれています。サンプルの[values.yaml][1]にインライン例があります。各キーは、エージェントの`conf.d`ディレクトリ内のファイルになります。

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

[クラスター チェック][3]を監視するには、`clusterAgent.confd`の下にテンプレートを定義してください。サンプルの[values.yaml][2]にインライン例があります。`clusterAgent.enabled: true`を設定してクラスターエージェントを有効にし、`datadog.clusterChecks.enabled: true`を設定してクラスター チェックを有効にする必要があります。

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

詳細については、[クラスター チェック][3]を参照してください。

[1]: https://github.com/DataDog/helm-charts/blob/92fd908e3dd7b7149ce02de1fe859ae5ac717d03/charts/datadog/values.yaml#L315-L330
[2]: https://github.com/DataDog/helm-charts/blob/92fd908e3dd7b7149ce02de1fe859ae5ac717d03/charts/datadog/values.yaml#L680-L689
[3]: /ja/agent/cluster_agent/clusterchecks
{{% /tab %}}

{{< /tabs >}}

### プレースホルダー値 {#placeholder-values}

Supply placeholder values as follows:

`<INTEGRATION_NAME>`
: あなたの Datadog Integrations の名前、例えば `etcd` または `redisdb` のようなものです。

`<CONTAINER_NAME>`
: あなたの Integrations に対応するコンテナの名前（`spec.containers[i].name`、**ではない** `spec.containers[i].image`）に対して一致させるための識別子です。

`<CONTAINER_IMAGE>`
: コンテナイメージ（`.spec.containers[i].image`）に対して一致させるための識別子です。<br/><br/>
例えば: コンテナ識別子として`redis`を指定した場合、あなたのAutodiscoveryテンプレートは`redis`と一致するイメージ名を持つすべてのコンテナに適用されます。あなたが`foo/redis:latest`と`bar/redis:v2`を実行しているコンテナを1つ持っている場合、あなたのAutodiscoveryテンプレートは両方のコンテナに適用されます。<br/><br/>
`ad_identifiers`パラメータはリストを受け取るため、複数のコンテナ識別子を指定できます。カスタム識別子も使用できます。[カスタムAutodiscovery識別子][21]を参照してください。

`<INIT_CONFIG>`
: あなたの Integrations の`init_config`ファイルの`<INTEGRATION_NAME>.d/conf.yaml.example`に記載されている設定パラメータ。`init_config`セクションは通常空です。

`<INSTANCES_CONFIG>`
: あなたの Integrations の`instances`ファイルの`<INTEGRATION_NAME>.d/conf.yaml.example`に記載されている設定パラメータ。

`<LOGS_CONFIG>`
: あなたの Integrations の`logs`ファイルの`<INTEGRATION_NAME>.d/conf.yaml.example`に記載されている設定パラメータ。

### 高度な注釈パラメータ {#advanced-annotation-parameters}

チェック、ログ、インスタンスのためのコアAutodiscovery注釈に加えて、チェックの動作をカスタマイズするために追加の注釈を使用できます：

#### タグのカーディナリティ {#tag-cardinality}

特定のチェックのために`check_tag_cardinality`注釈を使用してタグのカーディナリティレベルを設定します。これは、そのチェックによって収集されたメトリクスのためのグローバルエージェントタグカーディナリティ設定を上書きします。

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

<div class="alert alert-info">その <code>check_tag_cardinality</code> 注釈は統合チェックによって収集されたメトリクスにのみ影響します。DogStatsDを通じて送信されたメトリクスには影響しません。DogStatsD タグのカーディナリティを設定するには、グローバル <code>dogstatsd_tag_cardinality</code> 構成パラメータまたは <code>DD_DOGSTATSD_TAG_CARDINALITY</code> 環境変数を使用します。</div>

タグのカーディナリティに関する詳細は、[チェックごとのタグ構成][27]を参照してください。

### 自動構成 {#auto-configuration}

Datadog Agentは、いくつかの一般的な技術に対して基本的な構成を自動的に認識し、提供します。完全なリストについては、[Autodiscovery自動構成][20]を参照してください。

Kubernetes アノテーションで設定された構成は自動構成よりも優先されますが、自動構成は Datadog Operator または Helm で設定された構成よりも優先されます。Datadog Operator または Helm を使用して [Autodiscovery 自動構成][20] リスト内の統合を構成するには、[自動構成を無効にする][22] を実施する必要があります。

## 統合のセキュリティ {#integrations-security}

統合は、しばしばファイルシステムから構成ファイル、証明書、またはその他のリソースを読み取る必要があります。ファイルパスが信頼できない構成プロバイダー（例えば、Podアノテーションや外部サービスのAutodiscovery）から来る場合、パスのトラバーサルや不正なファイルアクセスのリスクがあります。

Datadog Agent バージョン 7.78.0 以降、構成プロバイダーの信頼レベルに基づいてファイルシステムアクセスを制御するために、Datadog Agent の `datadog.yaml` に次のパラメータを設定できます。

| パラメータ | タイプ | デフォルト | 説明 |
|-----------|------|---------|-------------|
| `integration_ignore_untrusted_file_params` | bool | `false` | 有効にすると、統合は信頼できない構成プロバイダーから提供されたファイルパスを参照する構成パラメータを無視します。|
| `integration_file_paths_allowlist` | リスト | `[]` | 信頼できない構成プロバイダーから提供された場合でも、統合がアクセスを許可されているファイルパスのリスト。空のリストは、すべてのファイルパスが許可されていることを意味します。|
| `integration_trusted_providers` | リスト | `["file", "remote-config"]` | 信頼されていると見なされる構成プロバイダーのリスト。このリストにないプロバイダーはすべて信頼できないと見なされます。デフォルトでは、ローカル構成ファイル (`file`) と Datadog Remote Configuration (`remote-config`) は信頼されています。サポートされているプロバイダーの完全なリストについては、[Datadog Agent プロバイダー名][28] を参照してください。|
| `integration_security_excluded_checks` | リスト | `[]` | 上記のセキュリティ制限から除外されるインテグレーション名のリスト。|

これらのオプションは後方互換性があります：デフォルト値は既存の動作を保持します。オプトインするには、`integration_ignore_untrusted_file_params`を有効にし、残りのパラメーターを環境に合わせて調整してください。

例 `datadog.yaml`:

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

この構成では、Podアノテーションを通じて構成されたインテグレーション（信頼されていないプロバイダー）は、`/etc/datadog-agent/certs`または`/var/run/secrets`の外部のファイルパスを参照できません。ただし、インテグレーション名が`integration_security_excluded_checks`にリストされている場合を除きます。

## 例：Postgres インテグレーション {#example-postgres-integration}

この例のシナリオでは、Kubernetes 上に Postgres をデプロイしました。[Datadog-Postgres インテグレーション][26]を設定および構成したいと考えています。すべての Postgres コンテナのコンテナ名には、文字列 `postgres` が含まれています。

まず、追加のセットアップ手順については、[Postgres インテグレーション ドキュメント][26]を参照してください。Postgres インテグレーションでは、`datadog` という名前の読み取り専用ユーザーを作成し、対応するパスワードを `PG_PASSWORD` という名前の環境変数として保存する必要があります。

このインテグレーションを **ホスト**上で構成する場合、パラメーターについては [`postgresql.d/conf.yaml.example`][15] を参照し、次の内容を含む `postgresql.d/conf.yaml` ファイルを作成できます。

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

ここで、`<PASSWORD>` は作成した `datadog` ユーザーのパスワードに対応します。

この構成を Postgres コンテナに適用するには：

{{< tabs >}}
{{% tab "アノテーション" %}}

ポッドマニフェストで:

**Autodiscovery アノテーション v2** (Datadog Agent v7.36+ 向け)

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

**Autodiscovery アノテーション v1**

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
1. ホスト上に `conf.d/postgresql.d/conf.yaml` ファイルを作成します：

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

2. ホストの`conf.d/`フォルダーをコンテナ化されたエージェントの`conf.d`フォルダーにマウントします。

   Datadog Operator の場合：
   ```yaml
   spec:
     override:
       nodeAgent:
         volumes:
           - hostPath:
               path: <PATH_TO_LOCAL_FOLDER>/conf.d
             name: confd
   ```

   Helm の場合：
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

ConfigMap で:

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

次に、マニフェストで`volumeMounts`と`volumes`を定義します：

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

以下のetcdコマンドは、カスタム`password`パラメーターを使用してPostgresインテグレーションテンプレートを作成します：

```conf
etcdctl mkdir /datadog/check_configs/postgres
etcdctl set /datadog/check_configs/postgres/check_names '["postgres"]'
etcdctl set /datadog/check_configs/postgres/init_configs '[{}]'
etcdctl set /datadog/check_configs/postgres/instances '[{"host": "%%host%%","port":"5432","username":"datadog","password":"%%env_PG_PASSWORD%%"}]'
```

3つの値それぞれがリストであることに注意してください。Autodiscoveryは、共有リストインデックスに基づいて統合構成にリスト項目を組み立てます。この場合、`check_names[0]`、`init_configs[0]`、および`instances[0]`から最初（かつ唯一）のチェック構成を構成します。

{{% /tab %}}
{{% tab "Datadog OperatorDatadog オペレーター" %}}

`datadog-agent.yaml`では：

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
その結果、Datadog Agentには上記の構成を持つ`postgres.yaml`ファイルが`conf.d`ディレクトリに格納されます。

{{% /tab %}}
{{% tab "Helm" %}}

`datadog-values.yaml`では：

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
その結果、Datadog Agentには上記の構成を持つ`postgres.yaml`ファイルが`conf.d`ディレクトリに格納されます。

{{% /tab %}}
{{< /tabs >}}

これらのテンプレートは、[Autodiscovery テンプレート変数][16]を利用しています：
- `%%host%%`には、コンテナのIPが動的に設定されます。
- `%%env_PG_PASSWORD%%`Agentプロセスによって見られる`PG_PASSWORD`という名前の環境変数を参照します。

複数のコンテナセットに対して複数のチェックを設定する方法など、さらに多くの例については[Autodiscovery: シナリオ & 例][24]を参照してください。

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