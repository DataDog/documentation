---
aliases:
- /ja/agent/autodiscovery/integrations
- /ja/guides/servicediscovery/
- /ja/guides/autodiscovery/
- /ja/agent/kubernetes/integrations
further_reading:
- link: /agent/kubernetes/log/
  tag: ドキュメント
  text: アプリケーションログの収集
- link: /agent/kubernetes/apm/
  tag: ドキュメント
  text: アプリケーショントレースの収集
- link: /agent/kubernetes/prometheus/
  tag: ドキュメント
  text: Prometheus メトリクスの収集
- link: /agent/guide/autodiscovery-management/
  tag: ドキュメント
  text: データ収集をコンテナのサブセットのみに制限
- link: /agent/kubernetes/tag/
  tag: ドキュメント
  text: コンテナから送信された全データにタグを割り当て
kind: documentation
title: Kubernetes インテグレーションオートディスカバリー
---

<div class="alert alert-info">
<a href="/getting_started/agent/autodiscovery">この機能の背後にある概念については、オートディスカバリーの概要ドキュメントを参照してください</a>。
</div>

このページでは、インテグレーションオートディスカバリーと Kubernetes を構成する方法について説明します。Docker または Amazon ECS を使用している場合は、[Docker インテグレーションオートディスカバリーのドキュメント][1]を参照してください。オートディスカバリーの目的は、特定のコンテナに対して Agent チェックを実行するときに、Datadog インテグレーションコンフィギュレーションを適用することです。このロジックのより詳細な内容については、ホストで Agent を実行している場合の [Agent インテグレーションの構成方法][2]のドキュメントを参照してください。

パスワードなど、平文で保存したくないコンフィギュレーション値がある場合は、[秘密管理][3]を参照してください。

オートディスカバリーを使用してインテグレーションを構成するには、以下のパラメーターを使用します。

| パラメーター            | 必須 | 説明                                                                                       |
|----------------------|----------|---------------------------------------------------------------------------------------------------|
| `<インテグレーション名>` | 〇      | Datadog インテグレーションの名前                                                                   |
| `<初期コンフィギュレーション>`      | 〇      | `conf.yaml` の `init_config:` の下にリストされ、有効にするインテグレーションに必要なコンフィギュレーションパラメーター。         |
| `<インスタンスコンフィギュレーション>`  | 〇      | `<初期コンフィギュレーション>` の一部であるこれらは、`conf.yaml` の `instances:` の下にリストされ、有効にするインテグレーションに必要なコンフィギュレーションパラメーターです。         |
| `<LOG_CONFIG>`  | 〇      | `<初期コンフィギュレーション>` の一部であるこれらは、`conf.yaml` の `logs:` の下にリストされているコンフィギュレーションパラメーターで、Datadog に送信するログを定義します。        |

以下の各セクションのタブで、特定のコンテナにインテグレーションテンプレートを適用するそれぞれの方法を示します。次の方法があります。

* [Kubernetes ポッドアノテーション](?tab=kubernetes#configuration)
* [ConfigMap](?tab=configmap#configuration)
* [Key-Value ストア](?tab=keyvaluestore#configuration)
* [Helm チャート](?tab=helm#configuration)

**注**: サポートされているインテグレーションの一部 ([Ceph][4]、[Varnish][5]、[Postfix][6]、[Cassandra Nodetools][7]、[Gunicorn][8]) は、プロセスツリーデータまたはファイルシステムへのアクセスを必要とするため、標準のオートディスカバリーに対応していません。
標準のオートディスカバリーに対応していないインテグレーションを設定するためには、ポッド内で公式の Prometheus エクスポーターを利用し、その後、Agent で OpenMetrics チェックとオートディスカバリーを用いてポッドを検出し、エンドポイントに対してクエリを行います。例えば、Kubernetes の標準パターンは、ノードレベルまたはクラスターレベルのコレクターを持つサイドカーアダプターです。この設定を通じて、エクスポーターはデータにアクセスし、HTTP エンドポイントを介してデータを公開できます。その結果、OpenMetrics チェックと Datadog オートディスカバリーもこのデータにアクセス可能になります。

## コンフィギュレーション

{{< tabs >}}
{{% tab "Kubernetes (AD v2)" %}}

**注:** AD Annotations v2 は、インテグレーション構成を簡素化するために、Datadog Agent 7.36 で導入されました。Datadog Agent の以前のバージョンでは、AD Annotations v1 を使用してください。

インテグレーションテンプレートは、Kubernetes のポッドアノテーションに格納できます。オートディスカバリーを使用して、Agent は、自身が Kubernetes 上で実行されているかどうかを検出し、すべてのポッドアノテーションでインテグレーションテンプレートを自動的に探します。

特定のコンフィギュレーションを特定のコンテナに適用するために、オートディスカバリーはコンテナをイメージではなく、**名前**で識別します。つまり、`<コンテナ識別子>` は、`.spec.containers[0].image` とではなく `.spec.containers[0].name` との一致が試みられます。ポッド内の特定の `<コンテナ識別子>` で Datadog インテグレーションのオートディスカバリーを構成するには、以下のアノテーションをポッドに追加します。

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.checks: |
      {
        "<INTEGRATION_NAME>": {
          "init_config": <INIT_CONFIG>,
          "instances": [<INSTANCE_CONFIG>]
        }
      }
    # (...)
spec:
  containers:
    - name: '<CONTAINER_IDENTIFIER>'
# (...)
```

`init_config` は通常、空の `{}` です。AD Annotations v2 では、この設定はオプションです。

ポッド内の 2 つの異なるコンテナ `<CONTAINER_IDENTIFIER_1>` と `<CONTAINER_IDENTIFIER_2>` に 2 つの異なるインテグレーションテンプレートを適用するには、次のアノテーションをポッドに追加します。

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_IDENTIFIER_1>.checks: |
      {
        "<INTEGRATION_NAME_1>": {
          "init_config": <INIT_CONFIG_1>,
          "instances": [<INSTANCE_CONFIG_1>]
        }
      }
    ad.datadoghq.com/<CONTAINER_IDENTIFIER_2>.checks: |
      {
        "<INTEGRATION_NAME_2>": {
          "init_config": <INIT_CONFIG_2>,
          "instances": [<INSTANCE_CONFIG_2>]
        }
      }
spec:
  containers:
    - name: '<CONTAINER_IDENTIFIER_1>'
    # (...)
    - name: '<CONTAINER_IDENTIFIER_2>'
# (...)
```

`kind: Pod` を使用して Kubernetes ポッドを直接定義する場合は、各ポッドのアノテーションを `metadata` セクションの真下に追加します。レプリケーションコントローラー、レプリカセット、またはデプロイメントを使用してポッドを間接的に定義する場合は、ポッドアノテーションを `.spec.template.metadata` の下に追加します。

**注:** Datadog では、コンテナ化環境のベストプラクティスとして、タグを付ける際に統合サービスタグ付けを使用することをおすすめしています。統合サービスタグ付けは、`env`、`service`、`version` の 3 つの標準タグを使用して Datadog テレメトリーと結合します。ご使用環境で統合タグ付けを構成する方法に関する詳細は、[統合サービスタグ付け][1]ドキュメントをご参照ください。



[1]: /ja/getting_started/tagging/unified_service_tagging
{{% /tab %}}

{{% tab "Kubernetes (AD v1)" %}}

インテグレーションテンプレートは、Kubernetes のポッドアノテーションに格納できます。オートディスカバリーを使用して、Agent は、自身が Kubernetes 上で実行されているかどうかを検出し、すべてのポッドアノテーションでインテグレーションテンプレートを自動的に探します。

特定のコンフィギュレーションを特定のコンテナに適用するために、オートディスカバリーはコンテナをイメージではなく、**名前**で識別します。つまり、`<コンテナ識別子>` は、`.spec.containers[0].image` とではなく `.spec.containers[0].name` との一致が試みられます。ポッド内の特定の `<コンテナ識別子>` で Datadog インテグレーションのオートディスカバリーを構成するには、以下のアノテーションをポッドに追加します。

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<ポッド名>'
  annotations:
    ad.datadoghq.com/<コンテナ識別子>.check_names: '[<インテグレーション名>]'
    ad.datadoghq.com/<コンテナ識別子>.init_configs: '[<初期コンフィギュレーション>]'
    ad.datadoghq.com/<コンテナ識別子>.instances: '[<インスタンスコンフィギュレーション>]'
    # (...)
spec:
  containers:
    - name: '<コンテナ識別子>'
# (...)
```

ポッド内の 2 つの異なるコンテナ `<CONTAINER_IDENTIFIER_1>` と `<CONTAINER_IDENTIFIER_2>` に 2 つの異なるインテグレーションテンプレートを適用するには、次のアノテーションをポッドに追加します。

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<ポッド名>'
  annotations:
    ad.datadoghq.com/<コンテナ識別子_1>.check_names: '[<インテグレーション名_1>]'
    ad.datadoghq.com/<コンテナ識別子_1>.init_configs: '[<初期コンフィギュレーション_1>]'
    ad.datadoghq.com/<コンテナ識別子_1>.instances: '[<インスタンスコンフィギュレーション_1>]'
    # (...)
    ad.datadoghq.com/<コンテナ識別子_2>.check_names: '[<インテグレーション名_2>]'
    ad.datadoghq.com/<コンテナ識別子_2>.init_configs: '[<初期コンフィギュレーション_2>]'
    ad.datadoghq.com/<コンテナ識別子_2>.instances: '[<インスタンスコンフィギュレーション_2>]'
spec:
  containers:
    - name: '<コンテナ識別子_1>'
    # (...)
    - name: '<コンテナ識別子_2>'
# (...)
```

`kind: Pod` を使用して Kubernetes ポッドを直接定義する場合は、各ポッドのアノテーションを `metadata` セクションの真下に追加します。レプリケーションコントローラー、レプリカセット、またはデプロイメントを使用してポッドを間接的に定義する場合は、ポッドアノテーションを `.spec.template.metadata` の下に追加します。

**注:** Datadog では、コンテナ化環境のベストプラクティスとして、タグを付ける際に統合サービスタグ付けを使用することをおすすめしています。統合サービスタグ付けは、`env`、`service`、`version` の 3 つの標準タグを使用して Datadog テレメトリーと結合します。ご使用環境で統合タグ付けを構成する方法に関する詳細は、[統合サービスタグ付け][1]ドキュメントをご参照ください。


[1]: /ja/getting_started/tagging/unified_service_tagging
{{% /tab %}}
{{% tab "File" %}}

テンプレートをローカルファイルとして保存し、それをコンテナ化 Agent 内にマウントする場合は、外部サービスや特定のオーケストレーションプラットフォームを必要としません。この方法の欠点は、テンプレートを変更、追加、または削除するたびに、Agent コンテナを再起動する必要がある点です。Agent は、マウントされた `/conf.d` ディレクトリでオートディスカバリーテンプレートを探します。

Agent v6.2.0 (および v5.24.0) 以降、デフォルトテンプレートはポートを自動検出するのではなく、監視対象ソフトウェアのデフォルトポートを使用します。別のポートを使用する必要がある場合は、[Kubernetes ポッドアノテーション](?tab=kubernetes-annotations)で、カスタムオートディスカバリーテンプレートを指定します。

デフォルトのインテグレーションテンプレートは、基本的なケース向けです。追加オプションを有効にするためにカスタム Datadog インテグレーション構成が必要な場合は、別のコンテナ識別子を使用します。あるいは、テンプレート変数インデックスを使用して、独自のオートディスカバリー構成ファイルを作成します。

1. ホストに `conf.d/<INTEGRATION_NAME>.d/conf.yaml` ファイルを作成し、カスタムオートディスカバリー構成を追加します。
2. ホスト の `conf.d/` フォルダーをコンテナ化 Agent の `conf.d` フォルダーにマウントします。

**オートディスカバリー構成ファイル例**:

```text
ad_identifiers:
  <INTEGRATION_AUTODISCOVERY_IDENTIFIER>

init_config:
  <INIT_CONFIG>

instances:
  <INSTANCES_CONFIG>
```

`<INTEGRATION_AUTODISCOVERY_IDENTIFIER>` の詳細については、[オートディスカバリーコンテナ識別子][1]のドキュメントを参照してください。

**注**: Agent はファイル名から直接 `<INTEGRATIONS_NAME>` を推測するため、この名前を設定する必要はありません。

[1]: /ja/agent/guide/ad_identifiers/
{{% /tab %}}
{{% tab "ConfigMap" %}}

Kubernetes では、[ConfigMaps][1] を使用して外部でコンフィギュレーションを定義し、その後マニフェストを使用してマウントすることができます。以下のテンプレートと [Kubernetes カスタムインテグレーション][2]のドキュメントを参照してください。

```text
kind: ConfigMap
apiVersion: v1
metadata:
  name: "<名前>-config-map"
  namespace: default
data:
  <インテグレーション名>-config: |-
    ad_identifiers:
      <インテグレーションオートディスカバリー識別子>
    init_config:
      <初期コンフィギュレーション>
    instances:
      <インスタンスコンフィギュレーション>
```

`<INTEGRATION_AUTODISCOVERY_IDENTIFIER>` の詳細については、[オートディスカバリーコンテナ識別子][3]のドキュメントを参照してください。

[1]: /ja/agent/kubernetes/integrations/#configmap
[2]: /ja/agent/kubernetes/integrations/
[3]: /ja/agent/guide/ad_identifiers/
{{% /tab %}}
{{% tab "Key-value store" %}}

オートディスカバリーでは、[Consul][1]、Etcd、および Zookeeper をインテグレーションテンプレートソースとして使用できます。key-value ストアを使用するには、Agent の `datadog.yaml` 構成ファイルでストアを構成し、このファイルをコンテナ化 Agent 内にマウントします。あるいは、key-value ストアを環境変数としてコンテナ化 Agent に渡します。

**datadog.yaml での構成**

`datadog.yaml` ファイルで、key-value ストアの `<KEY_VALUE_STORE_IP>` アドレスと `<KEY_VALUE_STORE_PORT>` を以下のように設定します。

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

次に、[Agent を再起動][2]して、構成の変更を適用します。

**環境変数での構成**

**注:** Datadog では、コンテナ化環境のベストプラクティスとして、タグおよび環境変数を構成する際に統合サービスタグ付けを使用することをお勧めしています。統合サービスタグ付けは、`env`、`service`、`version` の 3 つの標準タグを使用して Datadog テレメトリーと結合します。ご使用環境で統合タグ付けを構成する方法に関する詳細は、[統合サービスタグ付け][9]ドキュメントをご参照ください。

key-value ストアがテンプレートソースとして有効になっている場合、Agent はキー `/datadog/check_configs` の下でテンプレートを探します。オートディスカバリーは、以下のような key-value 階層を前提とします。

```yaml
/datadog/
  check_configs/
    <コンテナ識別子>/
      - check_names: ["<インテグレーション名>"]
      - init_configs: ["<初期コンフィギュレーション>"]
      - instances: ["<インスタンスコンフィギュレーション>"]
    ...
```

**注**: key-value ストアを使用している場合、オートディスカバリーは特定の構成を特定のコンテナに適用するために、`<CONTAINER_IDENTIFIER>` と `.spec.containers[0].image` の一致を試みることで、コンテナを**イメージ**で識別します。

[1]: /ja/integrations/consul/
[2]: /ja/agent/configuration/agent-commands/
{{% /tab %}}
{{% tab "Helm" %}}

`values.yaml` ファイルには、静的およびオートディスカバリーのインテグレーションチェックの両方を定義する `confd` セクションが含まれています。サンプル [values.yaml][1] に、インラインの例があります。各キーは、Agent の `conf.d` ディレクトリのファイルになります。

```yaml
  confd:
    <INTEGRATION_NAME>.yaml: |-
      ad_identifiers:
        - <INTEGRATION_AUTODISCOVERY_IDENTIFIER>
      init_config:
        - <INIT_CONFIG>
      instances:
        - <INSTANCES_CONFIG>
```
`<INTEGRATION_AUTODISCOVERY_IDENTIFIER>` の詳細については、[オートディスカバリーコンテナ識別子][2]を参照してください。

**注**: Helm チャートには 2 つの `confd` セクション（Agent チェック用とクラスターチェック用）があります。Cluster Agent を使用しクラスターチェックにオートディスカバリーを構成する場合は、[クラスターチェックのコンフィギュレーション例][3]に従い、必ず `cluster_check: true` を含めます。詳しいコンテキストについては、[クラスターチェック][4]を参照してください。

[1]: https://github.com/DataDog/helm-charts/blob/92fd908e3dd7b7149ce02de1fe859ae5ac717d03/charts/datadog/values.yaml#L315-L330
[2]: /ja/agent/guide/ad_identifiers/
[3]: https://github.com/DataDog/helm-charts/blob/92fd908e3dd7b7149ce02de1fe859ae5ac717d03/charts/datadog/values.yaml#L680-L689
[4]: /ja/agent/cluster_agent/clusterchecks
{{% /tab %}}
{{% tab "Operator" %}}

`DatadogAgent` 構成の `nodeAgent` コンポーネントにオーバーライドの `extraConfd.configDataMap`を追加することで、静的およびオートディスカバリーのインテグレーションチェックの両方を定義することができます。各キーが Agent の `conf.d` ディレクトリのファイルになります。

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
              - <INTEGRATION_AUTODISCOVERY_IDENTIFIER>
            init_config:
              - <INIT_CONFIG>
            instances:
              - <INSTANCES_CONFIG>
```
`<INTEGRATION_AUTODISCOVERY_IDENTIFIER>` の詳細については、[オートディスカバリーコンテナ識別子][1]を参照してください。

**注**: Cluster Agent を使用していて、クラスターチェック用のオートディスカバリーを構成したい場合は、`clusterAgent` コンポーネントにオーバーライドの `extraConfd.configDataMap` を追加し、必ず `cluster_check: true` を入れてください。詳細については、[クラスターチェック][2]を参照してください。

[1]: /ja/agent/guide/ad_identifiers/
[2]: /ja/agent/cluster_agent/clusterchecks
{{% /tab %}}
{{< /tabs >}}

### 準備のできていないポッドを許容する

デフォルトでは、`unready` ポッドは Datadog Agent がチェックをスケジュールしたときに無視されます。そのため、これらのポッドからメトリクス、サービスチェック、およびログは収集されません。この挙動をオーバーライドするためには、アノテーション `ad.datadoghq.com/tolerate-unready` を `"true"` に設定してください。例:

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/tolerate-unready: "true"
  ...
```

## 例

### Datadog Redis インテグレーション

{{< tabs >}}
{{% tab "Kubernetes (AD v2)" %}}

**注:** AD Annotations v2 は、インテグレーション構成を簡素化するために、Datadog Agent 7.36 で導入されました。Datadog Agent の以前のバージョンでは、AD Annotations v1 を使用してください。

以下のポッドアノテーションは、カスタム `password` パラメーターを使用して `redis` コンテナのインテグレーションテンプレートを定義します。

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: redis
  annotations:
    ad.datadoghq.com/redis.checks: |
      {
        "redisdb": {
          "instances": [
            {
              "host": "%%host%%",
              "port":"6379",
              "password":"%%env_REDIS_PASSWORD%%"
            }
          ]
        }
      }
  labels:
    name: redis
spec:
  containers:
    - name: redis
      image: redis:latest
      ports:
        - containerPort: 6379
```

**注**: パスワードがプレーンテキストで保存されることを避けるために、`"%%env_<ENV_VAR>%%"` テンプレート変数ロジックが使用されています。そのため、`REDIS_PASSWORD` 環境変数を Agent に渡す必要があります。[オートディスカバリーテンプレート変数のドキュメント][1]を参照してください。

[1]: /ja/agent/faq/template_variables/
{{% /tab %}}

{{% tab "Kubernetes (AD v1)" %}}

以下のポッドアノテーションは、カスタム `password` パラメーターを使用して `redis` コンテナのインテグレーションテンプレートを定義します。

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: redis
  annotations:
    ad.datadoghq.com/redis.check_names: '["redisdb"]'
    ad.datadoghq.com/redis.init_configs: '[{}]'
    ad.datadoghq.com/redis.instances: |
      [
        {
          "host": "%%host%%",
          "port":"6379",
          "password":"%%env_REDIS_PASSWORD%%"
        }
      ]
  labels:
    name: redis
spec:
  containers:
    - name: redis
      image: redis:latest
      ports:
        - containerPort: 6379
```

**注**: パスワードがプレーンテキストで保存されることを避けるために、`"%%env_<ENV_VAR>%%"` テンプレート変数ロジックが使用されています。そのため、`REDIS_PASSWORD` 環境変数を Agent に渡す必要があります。[オートディスカバリーテンプレート変数のドキュメント][1]を参照してください。

[1]: /ja/agent/faq/template_variables/
{{% /tab %}}
{{% tab "ConfigMap" %}}

次の ConfigMap は、`redis` コンテナのインテグレーションテンプレートを定義します。

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: redisdb-config-map
  namespace: default
data:
  redisdb-config: |-
    ad_identifiers:
      - redis
      - redis-test
    init_config:
    instances:
      - host: "%%host%%"
        port: "6379"
```

マニフェストで `volumeMounts` と `volumes` を定義します。

```yaml
# [...]
        volumeMounts:
        # [...]
          - name: redisdb-config-map
            mountPath: /conf.d/redisdb.d
        # [...]
      volumes:
      # [...]
        - name: redisdb-config-map
          configMap:
            name: redisdb-config-map
            items:
              - key: redisdb-config
                path: conf.yaml
# [...]
```

{{% /tab %}}
{{% tab "Key-value store" %}}

以下の etcd コマンドは、カスタム `password` パラメーターを使用して Redis インテグレーションテンプレートを作成します。

```conf
etcdctl mkdir /datadog/check_configs/redis
etcdctl set /datadog/check_configs/redis/check_names '["redisdb"]'
etcdctl set /datadog/check_configs/redis/init_configs '[{}]'
etcdctl set /datadog/check_configs/redis/instances '[{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]'
```

3 つの値がそれぞれリストであることに注目してください。オートディスカバリーは、共有リストインデックスに基づいて、リスト項目をインテグレーション構成に集約します。この例の場合は、`check_names[0]`、`init_configs[0]`、および `instances[0]` から最初 (かつ唯一) のチェック構成が作成されます。

**注**: パスワードがプレーンテキストで保存されることを避けるために、`"%%env_<ENV_VAR>%%"` テンプレート変数ロジックが使用されています。そのため、`REDIS_PASSWORD` 環境変数を Agent に渡す必要があります。[オートディスカバリーテンプレート変数のドキュメント][1]を参照してください。

auto-conf ファイルと異なり、**key-value ストアでは、短いイメージ名 (`redis` など) または長いイメージ名 (`redis:latest` など) をコンテナ識別子として使用できます**。

[1]: /ja/agent/faq/template_variables/
{{% /tab %}}
{{% tab "Helm" %}}

以下のコンフィギュレーションは、カスタムパスワードパラメーターを使用して Redis コンテナのインテグレーションテンプレートを定義します。
```yaml
  confd:
    redisdb.yaml: |-
      ad_identifiers:
        - redis
      init_config:
      instances:
        - host: "%%host%%"
          port: 6379
          password: "%%env_REDIS_PASSWORD%%"
```
結果として、Agent には `conf.d` ディレクトリに上記のコンフィギュレーションで `redisdb.yaml` ファイルが含まれます。
**注**: パスワードがプレーンテキストで保存されることを避けるために、`"%%env_<ENV_VAR>%%"` テンプレート変数ロジックが使用されています。そのため、`REDIS_PASSWORD` 環境変数を Agent に渡す必要があります。[オートディスカバリーテンプレート変数のドキュメント][1]を参照してください。

[1]: /ja/agent/faq/template_variables/
{{% /tab %}}
{{% tab "Operator" %}}

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
          redisdb.yaml: |-
            ad_identifiers:
              - redis
            init_config:
            instances:
              - host: "%%host%%"
                port: 6379
                password: "%%env_REDIS_PASSWORD%%"
```
結果として、Agent には `conf.d` ディレクトリに上記のコンフィギュレーションで `redisdb.yaml` ファイルが含まれます。
**注**: パスワードがプレーンテキストで保存されることを避けるために、`"%%env_<ENV_VAR>%%"` テンプレート変数ロジックが使用されています。そのため、`REDIS_PASSWORD` 環境変数を Agent に渡す必要があります。[オートディスカバリーテンプレート変数のドキュメント][1]を参照してください。

[1]: /ja/agent/faq/template_variables/
{{% /tab %}}
{{< /tabs >}}

### Datadog Apache および HTTP チェックインテグレーション

以下の構成は、`<CONTAINER_IDENTIFIER>` : `apache` を持つ Apache コンテナイメージに適用されます。オートディスカバリーテンプレートは、Apache コンテナからメトリクスを収集し、2 つのエンドポイントをテストするためのインスタンスで Datadog-HTTP チェックをセットアップするように構成されます。

チェック名は、`apache`、`http_check`、これらの `<初期コンフィギュレーション>`、および `<インスタンスコンフィギュレーション>` です。完全な構成は、それぞれのドキュメント、 [Datadog-Apache インテグレーション][9]と [Datadog-HTTP チェックインテグレーション][10]で確認することができます。

{{< tabs >}}
{{% tab "Kubernetes (AD v2)" %}}

**注:** AD Annotations v2 は、インテグレーション構成を簡素化するために、Datadog Agent 7.36 で導入されました。Datadog Agent の以前のバージョンでは、AD Annotations v1 を使用してください。

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: apache
  annotations:
    ad.datadoghq.com/apache.checks: |
      {
        "apache": {
          "instances": [
            {
              "apache_status_url": "http://%%host%%/server-status?auto"
            }
          ]
        },
        "http_check": {
          "instances": [
            {
              "name": "<WEBSITE_1>",
              "url": "http://%%host%%/website_1",
              "timeout": 1
            },
            {
              "name": "<WEBSITE_2>",
              "url": "http://%%host%%/website_2",
              "timeout": 1
            }
          ]
        }
      }
  labels:
    name: apache
spec:
  containers:
    - name: apache
      image: httpd
      ports:
        - containerPort: 80
```

{{% /tab %}}

{{% tab "Kubernetes (AD v1)" %}}

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: apache
  annotations:
    ad.datadoghq.com/apache.check_names: '["apache","http_check"]'
    ad.datadoghq.com/apache.init_configs: '[{},{}]'
    ad.datadoghq.com/apache.instances: |
      [
        [
          {
            "apache_status_url": "http://%%host%%/server-status?auto"
          }
        ],
        [
          {
            "name": "<ウェブサイト_1>",
            "url": "http://%%host%%/website_1",
            "timeout": 1
          },
          {
            "name": "<ウェブサイト_2>",
            "url": "http://%%host%%/website_2",
            "timeout": 1
          }
        ]
      ]
  labels:
    name: apache
spec:
  containers:
    - name: apache
      image: httpd
      ports:
        - containerPort: 80
```

{{% /tab %}}
{{% tab "File" %}}

* ホストに `conf.d/` フォルダーと `conf.d/apache.d` フォルダーを作成します。
* ホストの `conf.d/apache.d/conf.yaml` の下にカスタムオートディスカバリー構成を追加します。

```yaml
ad_identifiers:
  - httpd

init_config:

instances:
  - apache_status_url: http://%%host%%/server-status?auto
```

**注**: これは、最小の [Apache チェック構成][1]とほぼ同じですが、`ad_identifiers` オプションがあることがわかります。この必須オプションを使用して、コンテナ識別子を指定できます。オートディスカバリーは、同じホスト上で `httpd` イメージを実行するすべてのコンテナにこのテンプレートを適用します。詳細は、[オートディスカバリーの識別子に関するドキュメント][2]を参照してください。

* 次に、ホストに `conf.d/http_check.d` フォルダーを作成します。
* ホストの `conf.d/http_check.d/conf.yaml` の下にカスタムオートディスカバリー構成を追加します。

```yaml
ad_identifiers:
  - httpd

init_config:

instances:
  - name: "<ウェブサイト_1>"
    url: "http://%%host%%/website_1"
    timeout: 1

  - name: "<ウェブサイト_2>"
    url: "http://%%host%%/website_2"
    timeout: 1
```

* 最後に、ホストの `conf.d/` フォルダーをコンテナ化 Agent の `conf.d/` フォルダーにマウントします。

[1]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[2]: /ja/agent/guide/ad_identifiers/
{{% /tab %}}
{{% tab "ConfigMap" %}}

次の ConfigMap は、`apache` と `http_check` コンテナのインテグレーションテンプレートを定義します。

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: httpd-config-map
  namespace: default
data:
  apache-config: |-
    ad_identifiers:
      - httpd
    init_config:
    instances:
      - apache_status_url: http://%%host%%/server-status?auto
  http-check-config: |-
    ad_identifiers:
      - httpd
    init_config:
    instances:
      - name: "<ウェブサイト_1>"
        url: "http://%%host%%/website_1"
        timeout: 1
      - name: "<ウェブサイト_2>"
        url: "http://%%host%%/website_2"
        timeout: 1
```

マニフェストで `volumeMounts` と `volumes` を定義します。

```yaml
# [...]
        volumeMounts:
        # [...]
          - name: apache-auto-config
            mountPath: /conf.d/apache.d/
          - name: http-auto-config
            mountPath: /conf.d/http_check.d/
        # [...]
      volumes:
      # [...]
        - name: apache-auto-config
          configMap:
            name: httpd-config-map
            items:
              - key: apache-config
                path: auto_conf.yaml
        - name: http-auto-config
          configMap:
            name: httpd-config-map
            items:
              - key: http-check-config
                path: auto_conf.yaml
# [...]
```

{{% /tab %}}
{{% tab "Key-value store" %}}

```conf
etcdctl set /datadog/check_configs/httpd/check_names '["apache", "http_check"]'
etcdctl set /datadog/check_configs/httpd/init_configs '[{}, {}]'
etcdctl set /datadog/check_configs/httpd/instances '[[{"apache_status_url": "http://%%host%%/server-status?auto"}],[{"name": "<ウェブサイト_1>", "url": "http://%%host%%/website_1", timeout: 1},{"name": "<ウェブサイト_2>", "url": "http://%%host%%/website_2", timeout: 1}]]'
```

**注**: 各リストの順番が重要です。Agent は、構成の各部分が 3 つのリストの同じインデックスにある場合にのみ、HTTP チェック構成を正しく生成します。

{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

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