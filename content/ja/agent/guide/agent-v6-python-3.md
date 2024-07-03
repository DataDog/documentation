---
further_reading:
- link: /agent/versions/upgrade_to_agent_v7/
  tag: Documentation
  text: Upgrade to Agent v7
title: Python Version Management
---

Agent v6 を使用している場合、Datadog は [Agent v7 へのアップグレード][1]を推奨しています。Agent v7 は、Python 3 のみのサポートとなります。

ただし、Python 3 にアップデートしても Agent v6 を使い続けたい場合があります。Datadog Agent v6.14.0 以降、Agent v6 は Python 2 および Python 3 ランタイムと互換性を持ちます。つまり、Agent のコンフィギュレーションにより、Python 2 または Python 3 のいずれでも Agent チェックを実行できます。

## Datadog Agent v6 で Python 3 を使用する

デフォルトでは、Agent v6 は Python 2 ランタイムを使用します。以下は、Python 3 ランタイムを使用するように Agent v6 を構成する方法です。

- [ホスト Agent](#host-agent)
- [コンテナ Agent](#container-agent)
  - [Helm](?tab=helm#container-agent)
  - [Datadog Operator](?tab=datadogoperator#container-agent)
  - [DaemonSet](?tab=daemonset#container-agent)
- [デプロイメントツール](#deployment-tools)
  - [Chef](?tab=chef#deployment-tools)
  - [Puppet](?tab=puppet#deployment-tools)
  - [Ansible](?tab=ansible#deployment-tools)

この構成は、Azure VM Extensionではサポートされていません。

### ホスト Agent

1. [`datadog.yaml`][2] コンフィギュレーションファイルで `python_version` コンフィギュレーションオプションを設定します。

    ```yaml
    python_version: 3
    ```

2. [Agent を再起動します][3]。

または、環境変数 `DD_PYTHON_VERSION` に `2` または `3` を設定して、どの Python ランタイムを使用するかを指定します。環境変数は `datadog.yaml` 内の構成オプションよりも優先されます。例えば、環境変数 `DD_PYTHON_VERSION` を設定すると、 `datadog.yaml` にある `python_version` オプションは無視されます。

これは、Agent 全体のコンフィギュレーションオプションです。**Agent により起動されたすべての Python チェックは、同じ Python ランタイムを使用します**。


### コンテナ Agent

Datadog は、Python 2 および Python 3 用の Agent コンテナイメージを提供しています。

* `6.34.0` や `6.34.0-jmx` のような `6.` で始まるイメージタグは、Python 2 ランタイムを含むイメージです。
* `7.34.0` や `7.34.0-jmx` のような `7.` で始まるイメージタグは、Python 3 ランタイムを含むイメージです。

Python 2 から Python 3 に変更するには、Agent のデプロイに使用するイメージタグを更新します。

{{< tabs >}}
{{% tab "Helm" %}}
デフォルトでは、[Datadog Helm チャート][1]は、Python 3 ランタイムを埋め込んだ Agent 7 イメージを使用します。

To keep the Datadog Agent updated, edit your `datadog-values.yaml` to remove any information under the `agent.image` and the `clusterChecksRunner.image` sections.

特定のコンテナレジストリを使用する場合は、`agent.image.repository` と `clusterChecksRunner.image.repository` で設定します。`agents.image.tag` と `clusterChecksRunner.image.tag` が未定義であることを確認してください。

デフォルトのレジストリは、`gcr.io/datadoghq/agent` です。

```yaml
agent:
  image:
    repository: public.ecr.aws/datadog/agent

clusterChecksRunner:
  image:
    repository: public.ecr.aws/datadog/agent
```

Agent を特定のバージョンに設定するには、`agents.image.tag` と `clusterChecksRunner.image.tag` を設定します。`7.*` で始まるすべてのイメージタグは Python 3 ランタイムを埋め込みます。

```yaml
agent:
  image:
    tag: 7.34.0

clusterChecksRunner:
  image:
    tag: 7.34.0
````

両方のオプションを同時に使用することができます。

```yaml
agent:
  image:
    repository: public.ecr.aws/datadog/agent
    tag: 7.34.0

clusterChecksRunner:
  image:
    repository: public.ecr.aws/datadog/agent
    tag: 7.34.0
```

[1]:https://artifacthub.io/packages/helm/datadog/datadog/

{{% /tab %}}
{{% tab "Datadog Operator" %}}
デフォルトでは、[Datadog Operator][1] は、Python 3 ランタイムを埋め込んだ `agent:7.*.*` イメージを使用します。

イメージ情報が `DatadogAgent` リソースに指定されていない場合、Operator は Python 3 Datadog Agent イメージをデプロイします。

以前にイメージバージョンを固定したことがある場合

```yaml
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  override:
    clusterChecksRunner:
      image:
        tag: 6.33.0
    nodeAgent:
      image:
        tag: 6.33.0
```

または `image.name` を使用している場合

```yaml
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
  override:
    # ...
    nodeAgent:
      image:
        name: gcr.io/datadoghq/agent:6.33.0
    # ...
    clusterChecksRunner:
      image:
        name: gcr.io/datadoghq/agent:6.33.0
```

デフォルトのレジストリを変更する必要がある場合は、`spec.global.registry` を使用します。デフォルトは `gcr.io/datadoghq/agent` です。

次に、Agent 7 のイメージタグを `spec.override.nodeAgent.image.tag` で固定します。

クラスターチェックランナーのデプロイメントを有効にした場合、Agent 7 のイメージタグも `spec.override.clusterChecksRunner.image.tag` で固定します。

```yaml
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  # ...
  global:
    registry: public.ecr.aws/datadog
  override:
    # ...
    nodeAgent:
      image:
        tag: 7.33.0
    # ...
    clusterChecksRunner:
      image:
        tag: 7.33.0
```

**注**: Datadog では、`*.image.tag` を設定しないことを推奨しています。代わりに、Datadog Operator に Agent 7 のイメージタグを最新に保つようにさせます。

Agent JMX イメージを使用する必要がある場合、Agent `*.image.tag` を指定せずに設定することができます。

```yaml
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  # ...
  global:
    registry: public.ecr.aws/datadog
  override:
    # ...
    nodeAgent:
      image:
        jmxEnabled: true
    clusterChecksRunner:
      image:
        jmxEnabled: true
```

[1]: https://github.com/DataDog/datadog-operator
{{% /tab %}}
{{% tab "手動 (DaemonSet)" %}}

DaemonSet マニフェストで、各コンテナ定義のイメージタグを更新します。

* 各 `spec.template.spec.containers[*].image` の値
* 各 `spec.template.spec.initContainers[*].image` の値

例えば、以前のイメージ値が `gcr.io/datadoghq/agent:6.33.0` だった場合、`gcr.io/datadoghq/agent:7.33.0` に更新します。

**前**:

```yaml
apiVersion: apps/v1
spec:
  template:
    spec:
      containers:
      - name: agent
        image: gcr.io/datadoghq/agent:6.33.0
        # ...

```

**後**:

```yaml
apiVersion: apps/v1
spec:
  template:
    spec:
      containers:
      - name: agent
        image: gcr.io/datadoghq/agent:7.33.0
        # ...
```

{{% /tab %}}
{{< /tabs >}}

### デプロイメントツール

{{< tabs >}}
{{% tab "Chef" %}}

`extra_config` フィールドを使用して、` python_version` フィールドを `3` に設定します。

```
default_attributes(
   'datadog' => {
     'extra_config' => {
       'python_version' => '3'
     }
   }
 )
```

{{% /tab %}}
{{% tab "Puppet" %}}

`agent_extra_config` フィールドを使用して、`python_version` フィールドを `3` に設定します。

```
class { "datadog_agent":
    agent_extra_options => {
        python_version => 3,
    },
}
```

{{% /tab %}}
{{% tab "Ansible" %}}

`datadog_config` 内で、`python_version` を `3` に設定します。
```
datadog_config:
  python_version: 3
```

{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/versions/upgrade_to_agent_v7/?tab=linux
[2]: /ja/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[3]: /ja/agent/configuration/agent-commands/#restart-the-agent