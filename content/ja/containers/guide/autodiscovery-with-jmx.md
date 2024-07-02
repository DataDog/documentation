---
title: Autodiscovery with JMX
aliases:
  - /agent/guide/autodiscovery-with-jmx
further_reading:
    - link: /agent/kubernetes/integrations/
      tag: Documentation
      text: Create and load an Autodiscovery integration template
    - link: /agent/guide/ad_identifiers/
      tag: Documentation
      text: Match a container with the corresponding integration template
    - link: /agent/guide/autodiscovery-management/
      tag: Documentation
      text: Manage which container to include in the Agent Autodiscovery
    - link: /agent/kubernetes/tag/
      tag: Documentation
      text: Dynamically assign and collect tags from your application
---

コンテナ環境では、Agent が JMX サーバーに接続する方法にいくつかの違いがあります。オートディスカバリー機能により、これらのインテグレーションを動的にセットアップできます。Datadog の JMX ベースのインテグレーションを使用して、Kubernetes のポッドから JMX アプリケーションのメトリクスを収集しす。

アプリケーションに Java トレーサーを使用している場合、代わりに [Java ランタイムメトリクス][2]機能を利用して、これらのメトリクスを Agent に送信することができます。

## インストール

### JMX 対応 Agent の使用
JMX ユーティリティはデフォルトでは Agent にインストールされません。JMX インテグレーションを設定するには、Agent のイメージタグに `-jmx` を追加します。例えば、`gcr.io/datadoghq/agent:latest-jmx` です。

Datadog Operator または Helm を使用している場合、以下の構成で Agent のイメージタグに `-jmx` を追加します。

{{< tabs >}}
{{% tab "Operator" %}}
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  override:
    nodeAgent:
      image:
        jmxEnabled: true
```
{{% /tab %}}
{{% tab "Helm" %}}
```yaml
agents:
  image:
    tagSuffix: jmx
```
{{% /tab %}}
{{< /tabs >}}



## 構成

以下のいずれかの方法を使用します。

- [オートディスカバリーアノテーション](#autodiscovery-annotations) (recommended)
- [オートディスカバリーコンフィギュレーションファイル](#autodiscovery-configuration-files): 構成パラメーターを大幅にカスタマイズする場合

### オートディスカバリーアノテーション

この方法では、Java ベースのポッド上のアノテーションを使用して JMX チェック構成が適用されます。これにより、新しいコンテナの起動時に Agent が自動的に JMX チェックを構成できるようになります。これらのアノテーションが、ポッドを作成するオブジェクト (デプロイ、DaemonSet など) 上ではなく、作成されたポッド上にあることを確認してください。

オートディスカバリーのアノテーションには、以下のテンプレートを使用します。

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: <POD_NAME>
  annotations:
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.checks: |
      {
        "<INTEGRATION_NAME>": {
          "init_config": {
            "is_jmx": true,
            "collect_default_metrics": true
          },
          "instances": [{
            "host": "%%host%%",
            "port": "<JMX_PORT>"
          }]
        }
      }
    # (...)
spec:
  containers:
    - name: '<CONTAINER_IDENTIFIER>'
      # (...)
      env:
        - name: POD_IP
          valueFrom:
            fieldRef:
              fieldPath: status.podIP
        - name: JAVA_OPTS
          value: >-
            -Dcom.sun.management.jmxremote
            -Dcom.sun.management.jmxremote.authenticate=false
            -Dcom.sun.management.jmxremote.ssl=false
            -Dcom.sun.management.jmxremote.local.only=false
            -Dcom.sun.management.jmxremote.port=<JMX_PORT>
            -Dcom.sun.management.jmxremote.rmi.port=<JMX_PORT>
            -Djava.rmi.server.hostname=$(POD_IP)
```

この例では
- `<POD_NAME>` はポッドの名前です。
- `<CONTAINER_IDENTIFIER>` はポッド内の希望するコンテナにマッチします。
- `<INTEGRATION_NAME>` は希望する JMX インテグレーションの名前です。利用可能な JMX インテグレーション](#available-jmx-integrations)のリストを参照してください。
- `<JMX_PORT>` は、アノテーションと `JAVA_OPTS` 間で一致する限り、任意に設定します。

この構成では、Datadog Agent はこのポッドを検出し、`%%host%%` [オートディスカバリーテンプレート変数][3]に相対する JMX サーバーにリクエストを行います。このリクエストは、検出されたポッドの IP アドレスに解決されます。このため、`java.rmi.server.hostname` には、[Kubernetes downward API][5] で事前に入力された `POD_IP` アドレスが設定されます。

**注**: `JAVA_OPTS` 環境変数は、Java ベースのコンテナイメージで起動パラメーターとして一般的に使用されます (例えば、`java $JAVA_OPTS -jar app.jar`)。カスタムアプリケーションを使用している場合や、アプリケーションがこのパターンに従っていない場合は、これらのシステムプロパティを手動で設定してください。


#### アノテーション例: Tomcat
以下の構成では、ポート `9012` に対して [Tomcat][81] JMX インテグレーションを実行します。

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: tomcat-test
  annotations:
    ad.datadoghq.com/tomcat.checks: |
      {
        "tomcat": {
          "init_config": {
            "is_jmx": true,
            "collect_default_metrics": true
          },
          "instances": [{
            "host": "%%host%%",
            "port": "9012"
          }]
        }
      }
spec:
  containers:
    - name: tomcat
      image: tomcat:8.0
      imagePullPolicy: Always
      ports:
        - name: jmx-metrics
          containerPort: 9012
      env:
        - name: POD_IP
          valueFrom:
            fieldRef:
              fieldPath: status.podIP
        - name: JAVA_OPTS
          value: >-
            -Dcom.sun.management.jmxremote
            -Dcom.sun.management.jmxremote.authenticate=false
            -Dcom.sun.management.jmxremote.ssl=false
            -Dcom.sun.management.jmxremote.local.only=false
            -Dcom.sun.management.jmxremote.port=9012
            -Dcom.sun.management.jmxremote.rmi.port=9012
            -Djava.rmi.server.hostname=$(POD_IP)
```

#### カスタムメトリクスアノテーションテンプレート
これらのインテグレーションから追加のメトリクスを収集する必要がある場合は、`init_config` セクションに追加します。

```yaml
ad.datadoghq.com/<CONTAINER_IDENTIFIER>.checks: |
  {
    "<INTEGRATION_NAME>": {
      "init_config": {
        "is_jmx": true,
        "collect_default_metrics": true,
        "conf": [{
          "include": {
            "domain": "java.lang",
            "type": "OperatingSystem",
            "attribute": {
               "FreePhysicalMemorySize": {
                 "metric_type": "gauge",
                 "alias": "jvm.free_physical_memory"
               } 
            }
          }
        }]
      },
      "instances": [{
        "host": "%%host%%",
        "port": "<JMX_PORT>"
      }]
    }
  }
```          

これらのメトリクスのフォーマットについての詳細は、[JMX インテグレーション][6]ドキュメントを参照してください。

### オートディスカバリーコンフィギュレーションファイル

Datadog-JMX インテグレーションのより複雑なカスタム構成を渡す必要がある場合は、[オートディスカバリーコンテナ識別子][1]を使用して、カスタムインテグレーションコンフィギュレーションファイルとカスタム `metrics.yaml` ファイルを渡すことができます。

#### 1. コンフィギュレーションファイルを構成する

この方法を使用する場合、Agent はコンフィギュレーションファイルと、収集するメトリクス用の `metrics.yaml` ファイル (オプション) を必要とします。これらのファイルは、Agent ポッドにマウントするか、コンテナイメージに組み込みます。

コンフィギュレーションファイルの命名規則は、まず [利用可能なインテグレーションの前提ステップ](#available-jmx-integrations)から希望のインテグレーション名を特定します。これが決まったら、Agent はそのインテグレーションに相対する名前のコンフィギュレーションファイル_または_そのインテグレーションの構成ディレクトリ内のコンフィギュレーションファイルを必要とします。

例えば、[Tomcat][81] インテグレーションでは、以下の_いずれか_を作成します。
- `/etc/datadog-agent/conf.d/tomcat.yaml`、または
- `/etc/datadog-agent/conf.d/tomcat.d/conf.yaml`

カスタム `metrics.yaml` ファイルを使用している場合は、インテグレーションの構成ディレクトリにこれを含めます (例: `/etc/datadog-agent/conf.d/tomcat.d/metrics.yaml`)。

このコンフィギュレーションファイルには `ad_identifiers` を含める必要があります。

```yaml
ad_identifiers:
  - "<SHORT_IMAGE>"

init_config:
  is_jmx: true
  conf:
    <METRICS_TO_COLLECT>

instances:
  - host: "%%host%%"
    port: "<JMX_PORT>"
```

`<SHORT_IMAGE>` は、希望するコンテナのショートイメージ名に置き換えてください。例えば、コンテナイメージ `gcr.io/CompanyName/my-app:latest` のショートイメージ名は `my-app` です。Datadog Agent がこのコンテナを検出すると、このファイルに記述されているように JMX 構成を設定します。

ショートイメージ名を基にしたくない場合は、[コンテナへのカスタム識別子][4]を参照して指定することもできます。

Kubernetes アノテーションと同様に、コンフィギュレーションファイルも[オートディスカバリーテンプレート変数][3]を使用できます。この場合、`host` 構成は `%%host%%` を使用して、検出されたコンテナの IP アドレスに解決します。

`<METRICS_TO_COLLECT>` の `init_config` と `instances` の構成の構築の詳細については、[JMX インテグレーション][6]のドキュメント (および、[事前提供のインテグレーションの構成例](#available-jmx-integrations))を参照してください。

#### 2. コンフィギュレーションファイルをマウントする
{{< tabs >}}
{{% tab "Operator" %}}

Datadog Operator を使用している場合は、オーバーライドを追加します。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  override:
    nodeAgent:
      image:
        jmxEnabled: true
      extraConfd:
        configDataMap:
          <INTEGRATION_NAME>.yaml: |-
            ad_identifiers:
              - "<SHORT_IMAGE>"

            init_config:
              is_jmx: true

            instances:
              - host: "%%host%%"
                port: "<JMX_PORT>"
```

{{% /tab %}}
{{% tab "Helm" %}}

Helm で、`datadog.confd` オプションを使用します。

```yaml
datadog:
  confd:
    <INTEGRATION_NAME>.yaml: |
      ad_identifiers:
        - "<SHORT_IMAGE>"

      init_config:
        is_jmx: true

      instances:
        - host: "%%host%%"
          port: "<JMX_PORT>"
```

{{% /tab %}}
{{% tab "Custom image" %}}
If you cannot mount these files in the Agent container (for example, on Amazon ECS) you can build an Agent Docker image containing the desired configuration files.

例:

```Dockerfile
FROM gcr.io/datadoghq/agent:latest-jmx
COPY <PATH_JMX_CONF_FILE> conf.d/tomcat.d/
COPY <PATH_JMX_METRICS_FILE> conf.d/tomcat.d/
```

 その後、この新しいカスタムイメージを正規のコンテナ化された Agent として使用します。
{{% /tab %}}

{{< /tabs >}}

#### 3. JMX サーバーを公開する
Agent がアクセスできるように JMX サーバーを設定します。

```yaml
spec:
  containers:
    - # (...)
      env:
      - name: POD_IP
        valueFrom:
          fieldRef:
            fieldPath: status.podIP
      - name: JAVA_OPTS
        value: >-
          -Dcom.sun.management.jmxremote
          -Dcom.sun.management.jmxremote.authenticate=false
          -Dcom.sun.management.jmxremote.ssl=false
          -Dcom.sun.management.jmxremote.local.only=false
          -Dcom.sun.management.jmxremote.port=<JMX_PORT>
          -Dcom.sun.management.jmxremote.rmi.port=<JMX_PORT>
          -Djava.rmi.server.hostname=$(POD_IP)   
```          

## 利用可能な JMX インテグレーション
Datadog Agent には、いくつかの JMX インテグレーションが事前に構成されています。

| インテグレーション名         | メトリクスファイル       | 構成ファイル      |
|--------------------------|--------------------|-------------------------|
| [activemq][41]           | [metrics.yaml][42] | [conf.yaml.example][43] |
| [cassandra][44]          | [metrics.yaml][45] | [conf.yaml.example][46] |
| [confluent_platform][47] | [metrics.yaml][48] | [conf.yaml.example][49] |
| [hazelcast][50]          | [metrics.yaml][51] | [conf.yaml.example][52] |
| [hive][53]               | [metrics.yaml][54] | [conf.yaml.example][55] |
| [hivemq][56]             | [metrics.yaml][57] | [conf.yaml.example][58] |
| [hudi][59]               | [metrics.yaml][60] | [conf.yaml.example][61] |
| [ignite][62]             | [metrics.yaml][63] | [conf.yaml.example][64] |
| [jboss_wildfly][66]      | [metrics.yaml][67] | [conf.yaml.example][68] |
| [kafka][69]              | [metrics.yaml][70] | [conf.yaml.example][71] |
| [presto][72]             | [metrics.yaml][73] | [conf.yaml.example][74] |
| [solr][75]               | [metrics.yaml][76] | [conf.yaml.example][77] |
| [sonarqube][78]          | [metrics.yaml][79] | [conf.yaml.example][80] |
| [tomcat][81]             | [metrics.yaml][82] | [conf.yaml.example][83] |
| [weblogic][84]           | [metrics.yaml][85] | [conf.yaml.example][86] |

上記の表にある各インテグレーションには、アプリケーションごとに返される JMX メトリクスの予想されるパターンに一致するように事前に定義された `metrics.yaml` ファイルがあります。オートディスカバリーのアノテーションまたはコンフィギュレーションファイルで、`<INTEGRATION_NAME>` としてリストされたインテグレーション名を使用してください。

あるいは、`<INTEGRATION_NAME>` に `jmx` を指定して、基本的な JMX インテグレーションをセットアップし、デフォルトの `jvm.*` メトリクスのみを収集することもできます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /containers/guide/ad_identifiers/?tab=kubernetes
[2]: /tracing/metrics/runtime_metrics/java/
[3]: /containers/guide/template_variables/
[4]: /containers/guide/ad_identifiers/?tab=kubernetes#custom-autodiscovery-container-identifiers
[5]: https://kubernetes.io/docs/concepts/workloads/pods/downward-api/
[6]: /integrations/java/
[41]: /integrations/activemq/
[42]: https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/metrics.yaml
[43]: https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/conf.yaml.example
[44]: /integrations/cassandra/
[45]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/metrics.yaml
[46]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/conf.yaml.example
[47]: /integrations/confluent_platform/
[48]: https://github.com/DataDog/integrations-core/blob/master/confluent_platform/datadog_checks/confluent_platform/data/metrics.yaml
[49]: https://github.com/DataDog/integrations-core/blob/master/confluent_platform/datadog_checks/confluent_platform/data/conf.yaml.example
[50]: /integrations/hazelcast/
[51]: https://github.com/DataDog/integrations-core/blob/master/hazelcast/datadog_checks/hazelcast/data/metrics.yaml
[52]: https://github.com/DataDog/integrations-core/blob/master/hazelcast/datadog_checks/hazelcast/data/conf.yaml.example
[53]: /integrations/hive/
[54]: https://github.com/DataDog/integrations-core/blob/master/hive/datadog_checks/hive/data/metrics.yaml
[55]: https://github.com/DataDog/integrations-core/blob/master/hive/datadog_checks/hive/data/conf.yaml.example
[56]: /integrations/hivemq/
[57]: https://github.com/DataDog/integrations-core/blob/master/hivemq/datadog_checks/hivemq/data/metrics.yaml
[58]: https://github.com/DataDog/integrations-core/blob/master/hivemq/datadog_checks/hivemq/data/conf.yaml.example
[59]: /integrations/hudi/
[60]: https://github.com/DataDog/integrations-core/blob/master/hudi/datadog_checks/hudi/data/metrics.yaml
[61]: https://github.com/DataDog/integrations-core/blob/master/hudi/datadog_checks/hudi/data/conf.yaml.example
[62]: /integrations/ignite/
[63]: https://github.com/DataDog/integrations-core/blob/master/ignite/datadog_checks/ignite/data/metrics.yaml
[64]: https://github.com/DataDog/integrations-core/blob/master/ignite/datadog_checks/ignite/data/conf.yaml.example
[66]: /integrations/jboss_wildfly/
[67]: https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/datadog_checks/jboss_wildfly/data/metrics.yaml
[68]: https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/datadog_checks/jboss_wildfly/data/conf.yaml.example
[69]: /integrations/kafka/
[70]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/metrics.yaml
[71]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/conf.yaml.example
[72]: /integrations/presto/
[73]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/metrics.yaml
[74]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/conf.yaml.example
[75]: /integrations/solr/
[76]: https://github.com/DataDog/integrations-core/blob/master/solr/datadog_checks/solr/data/metrics.yaml
[77]: https://github.com/DataDog/integrations-core/blob/master/solr/datadog_checks/solr/data/conf.yaml.example
[78]: /integrations/sonarqube/
[79]: https://github.com/DataDog/integrations-core/blob/master/sonarqube/datadog_checks/sonarqube/data/metrics.yaml
[80]: https://github.com/DataDog/integrations-core/blob/master/sonarqube/datadog_checks/sonarqube/data/conf.yaml.example
[81]: /integrations/tomcat/
[82]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/metrics.yaml
[83]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/conf.yaml.example
[84]: /integrations/weblogic/
[85]: https://github.com/DataDog/integrations-core/blob/master/weblogic/datadog_checks/weblogic/data/metrics.yaml
[86]: https://github.com/DataDog/integrations-core/blob/master/weblogic/datadog_checks/weblogic/data/conf.yaml.example