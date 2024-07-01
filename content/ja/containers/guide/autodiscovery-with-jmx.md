---
aliases:
- /ja/agent/guide/autodiscovery-with-jmx
further_reading:
- link: /agent/kubernetes/integrations/
  tag: Documentation
  text: オートディスカバリーのインテグレーションテンプレートの作成とロード
- link: /agent/guide/ad_identifiers/
  tag: Documentation
  text: コンテナと該当するインテグレーションテンプレートとの対応
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: Agent オートディスカバリーに含めるコンテナの管理
- link: /agent/kubernetes/tag/
  tag: Documentation
  text: アプリケーションのタグの動的割り当てと収集
title: JMX を使用したオートディスカバリー
---

インテグレーションオートディスカバリーアノテーションを活用するか、オートディスカバリーコンテナ識別子を使用して、Kubernetes のポッドから JMX アプリケーションのメトリクスを収集します。オートディスカバリーアノテーションは、Datadog-JMX インテグレーションを構成するための推奨される方法です。コンフィギュレーションパラメーターのセットが長すぎてアノテーションに収まらない場合は、[オートディスカバリーコンテナ識別子](#autodiscovery-container-identifiers)メソッドを使用します。

## オートディスカバリーアノテーション

オートディスカバリーアノテーションロジックは、Agent が JMX チェックコンフィギュレーション要素を「自動的に検出」し、それに応じて JMX チェックを構成できるように、アノテーションを介して JMX チェックコンフィギュレーション要素をポッドに適用します。

1. 通常の `gcr.io/datadoghq/agent:latest` ではなく、**`gcr.io/datadoghq/agent:latest-jmx` イメージ名**を使用して、[Kubernetes クラスターで Agent を起動][1]します。

2. JMX アプリケーションを含むコンテナにオートディスカバリーアノテーションを適用します。

    ```yaml
    apiVersion: v1
    kind: Pod
    metadata:
        name: <POD_NAME>
        annotations:
            ad.datadoghq.com/<CONTAINER_IDENTIFIER>.check_names: '["<INTEGRATION_NAME>"]'
            ad.datadoghq.com/<CONTAINER_IDENTIFIER>.init_configs: '[{"is_jmx": true, "collect_default_metrics": true}]'
            ad.datadoghq.com/<CONTAINER_IDENTIFIER>.instances: '[{"host": "%%host%%","port":"<JMX_PORT>"}]'
            ad.datadoghq.com/<CONTAINER_IDENTIFIER>.logs: '[{"source":"<INTEGRATION_NAME>","service":"<INTEGRATION_NAME>"}]'
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
                  -Xms256m -Xmx6144m
                  -Dcom.sun.management.jmxremote
                  -Dcom.sun.management.jmxremote.authenticate=false
                  -Dcom.sun.management.jmxremote.ssl=false
                  -Dcom.sun.management.jmxremote.local.only=false
                  -Dcom.sun.management.jmxremote.port=<JMX_PORT>
                  -Dcom.sun.management.jmxremote.rmi.port=<JMX_PORT>
                  -Djava.rmi.server.hostname=$(POD_IP)
    ```

   Agent が RMI レジストリに接続することを JMX サーバーが許可するように、`JAVA_OPTS` 環境変数を作成する必要があります。

      **注**:
      - `<JMX_PORT>` は、JMX メトリクスを公開するポートを参照します。
      - 上記の例で、RMI レジストリへの接続は SSL ではありません。SSL を使用したい場合は、`ad.datadoghq.com/<CONTAINER_IDENTIFIER>.instances` アノテーションで `"rmi_registry_ssl": true` を使用し、対応する `Dcom.sun.management.jmxremote` を `JAVA_OPTS` から削除します。

JMX 対応のインテグレーション名 `<INTEGRATION_NAME>` のリストは次のとおりです。

- [activemq][2]
- [cassandra][3]
- [confluent_platform][4]
- [hive][5]
- [jboss_wildfly][6]
- [kafka][7]
- [solr][8]
- [presto][9]
- [tomcat][10]

たとえば、ポート `9012` で JMX メトリクスを公開している Tomcat を実行している場合は、次のようにします。

```yaml
apiVersion: v1
kind: Pod
metadata:
    name: tomcat-test
    annotations:
        ad.datadoghq.com/tomcat.check_names: '["tomcat"]'
        ad.datadoghq.com/tomcat.init_configs: '[{"is_jmx": true, "collect_default_metrics": true}]'
        ad.datadoghq.com/tomcat.instances: '[{"host": "%%host%%","port":"9012"}]'
        ad.datadoghq.com/tomcat.logs: '[{"source":"Tomcat","service":"Tomcat"}]'

spec:
    containers:
        - name: tomcat
          image: tomcat:8.0
          imagePullPolicy: Always
          ports:
              - containerPort: 9012
          env:
            - name: POD_IP
              valueFrom:
                fieldRef:
                  fieldPath: status.podIP

            - name: JAVA_OPTS
              value: >-
                -Xms256m -Xmx6144m
                -Dcom.sun.management.jmxremote
                -Dcom.sun.management.jmxremote.authenticate=false
                -Dcom.sun.management.jmxremote.ssl=false
                -Dcom.sun.management.jmxremote.local.only=false
                -Dcom.sun.management.jmxremote.port=9012
                -Dcom.sun.management.jmxremote.rmi.port=9012
                -Djava.rmi.server.hostname=$(POD_IP)
```

## オートディスカバリーコンテナ識別子

Datadog-JMX インテグレーションのより複雑なコンフィギュレーションを渡す必要がある場合は、[オートディスカバリーコンテナ識別子][11]を利用して、カスタムインテグレーションコンフィギュレーションファイルまたはカスタム `metrics.yaml` ファイルを渡します。

### Agent の準備

Agent がクラスターのコンテナとして実行されているか、ホストで直接実行されているかを選択します。

{{< tabs >}}
{{% tab "コンテナ Agent" %}}

Agent がクラスターで実行されており、JMX メトリクスを収集するためにコンテナを自動検出する場合:

1. 通常の `gcr.io/datadoghq/agent:latest` イメージではなく、必ず Agent イメージ **`gcr.io/datadoghq/agent:latest-jmx`** を実行してください。

2. インテグレーションに関連付けられているコンフィギュレーションファイル `conf.yaml` と `metrics.yaml` を取得します。Datadog-JMX ベースのインテグレーションと関連するファイルのリストを以下に示します。

    | インテグレーション名             | メトリクスファイル       | コンフィギュレーションファイル      |
    | ----------------------- | ------------------ | ----------------------- |
    | [activemq][1]           | [metrics.yaml][2]  | [conf.yaml.example][3]  |
    | [cassandra][4]          | [metrics.yaml][5]  | [conf.yaml.example][6]  |
    | [confluent_platform][7] | [metrics.yaml][8]  | [conf.yaml.example][9] |
    | [hive][10]              | [metrics.yaml][11] | [conf.yaml.example][12] |
    | [jboss_wildfly][13]     | [metrics.yaml][14] | [conf.yaml.example][15] |
    | [kafka][16]             | [metrics.yaml][17] | [conf.yaml.example][18] |
    | [solr][19]              | [metrics.yaml][20] | [conf.yaml.example][21] |
    | [presto][22]            | [metrics.yaml][23] | [conf.yaml.example][24] |
    | [tomcat][25]            | [metrics.yaml][26] | [conf.yaml.example][27] |

3. `conf.yaml.example` ファイルの名前を `conf.yaml` に変更します。

4. Agent オートディスカバリーロジックに適合するように、`conf.yaml` のパラメーター値を置き換えます。コンフィギュレーションファイルにはデフォルトでホストパラメーター値があり、代わりに[オートディスカバリーテンプレート変数][28]ロジックを使用します。次の Tomcat チェックの例では、`host` パラメーター値が `localhost` から `%%host%%` に変更されています。

    ```yaml
    init_config:
        ## @param is_jmx - boolean - required
        ## Whether or not this file is a configuration for a JMX integration.
        #
        is_jmx: true

        ## @param collect_default_metrics - boolean - required
        ## Whether or not the check should collect all default metrics.
        #
        collect_default_metrics: true

    instances:
        ## @param host - string - required
        ## Tomcat JMX hostname to connect to.
        #
        - host: '%%host%%'

          ## @param port - integer - required
          ## Tomcat JMX port to connect to.
          #
          port: 9012
    ```

5. このコンフィギュレーションファイルをアプリケーションコンテナに適用する Agent に指定するには、`conf.yaml` ファイルの先頭に `ad_identifiers` パラメーターを構成します。

    ```yaml
    ad_identifiers:
        - '<CUSTOM_AD_IDENTIFIER>'

    init_config:
        # (...)
    instances:
        # (...)
    ```

    **注**: 上記の例ではカスタム `ad_identifers` 値を使用していますが、必要に応じて、[コンテナショートイメージ][29]を `ad_identifiers` として指定できます。

6. `conf.d/<INTEGRATION_NAME>.d/` フォルダーの Agent にコンフィギュレーションファイル (`conf.yaml` と `metrics.yaml`) をマウントします。

7. (任意) - Agent コンテナ (AWS ECS など) で上記のファイルをマウントできない場合は、これら 2 つのコンフィギュレーションファイルを使用して Agent Docker イメージを再構築する必要があります。

    ```conf
    FROM gcr.io/datadoghq/agent:latest-jmx
    COPY <PATH_JMX_CONF_FILE> conf.d/tomcat.d/
    COPY <PATH_JMX_METRICS_FILE> conf.d/tomcat.d/
    ```

    その後、この新しいカスタムイメージを正規のコンテナ化された Agent として使用します。

[1]: /ja/integrations/activemq/
[2]: https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/metrics.yaml
[3]: https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/conf.yaml.example
[4]: /ja/integrations/cassandra/
[5]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/metrics.yaml
[6]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/conf.yaml.example
[7]: /ja/integrations/confluent_platform/
[8]: https://github.com/DataDog/integrations-core/blob/master/confluent_platform/datadog_checks/confluent_platform/data/metrics.yaml
[9]: https://github.com/DataDog/integrations-core/blob/master/confluent_platform/datadog_checks/confluent_platform/data/conf.yaml.example
[10]: /ja/integrations/hive/
[11]: https://github.com/DataDog/integrations-core/blob/master/hive/datadog_checks/hive/data/metrics.yaml
[12]: https://github.com/DataDog/integrations-core/blob/master/hive/datadog_checks/hive/data/conf.yaml.example
[13]: /ja/integrations/jboss_wildfly/
[14]: https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/datadog_checks/jboss_wildfly/data/metrics.yaml
[15]: https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/datadog_checks/jboss_wildfly/data/conf.yaml.example
[16]: /ja/integrations/kafka/
[17]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/metrics.yaml
[18]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/conf.yaml.example
[19]: /ja/integrations/solr/
[20]: https://github.com/DataDog/integrations-core/blob/master/solr/datadog_checks/solr/data/metrics.yaml
[21]: https://github.com/DataDog/integrations-core/blob/master/solr/datadog_checks/solr/data/conf.yaml.example
[22]: /ja/integrations/presto/
[23]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/metrics.yaml
[24]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/conf.yaml.example
[25]: /ja/integrations/tomcat/
[26]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/metrics.yaml
[27]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/conf.yaml.example
[28]: /ja/agent/faq/template_variables/
[29]: /ja/agent/guide/ad_identifiers/#short-image-container-identifiers
{{% /tab %}}
{{% tab "ホスト Agent" %}}

Agent がホストで実行されており、JMX メトリクスを収集するためにコンテナを自動検出する場合:

1. [Agent のオートディスカバリーを有効化します][1]。

2. [Agent インテグレーションディレクトリ][2]の対応する `conf.yaml.example` ファイルの名前を `conf.yaml` に変更して、使用する JMX インテグレーションを有効にします。たとえば Tomcat の場合、`/etc/datadog-agent/conf.d/tomcat.d/conf.yaml.example` の名前を `/etc/datadog-agent/conf.d/tomcat.d/conf.yaml` に変更します。

3. Agent オートディスカバリーロジックに適合するように、`conf.yaml` ファイルのパラメーター値を置き換えます。コンフィギュレーションファイルにはデフォルトでホストパラメーター値があり、代わりに[オートディスカバリーテンプレート変数][3]を使用します。次の Tomcat コンフィギュレーションの例では、`host` パラメーター値が `localhost` から `%%host%%` に変更されています。

    ```yaml
    init_config:
        ## @param is_jmx - boolean - required
        ## Whether or not this file is a configuration for a JMX integration.
        #
        is_jmx: true

        ## @param collect_default_metrics - boolean - required
        ## Whether or not the check should collect all default metrics.
        #
        collect_default_metrics: true

    instances:
        ## @param host - string - required
        ## Tomcat JMX hostname to connect to.
        #
        - host: '%%host%%'

          ## @param port - integer - required
          ## Tomcat JMX port to connect to.
          #
          port: 9012
    ```

4. このコンフィギュレーションファイルをアプリケーションコンテナに適用する Agent に指定するには、`conf.yaml` ファイルの先頭に `ad_identifiers` パラメーターを構成します。

    ```yaml
    ad_identifiers:
        - '<CUSTOM_AD_IDENTIFIER>'

    init_config:
        # (...)
    instances:
        # (...)
    ```

    **注**: 上記の例ではカスタム `ad_identifers` 値を使用していますが、必要に応じて、[コンテナショートイメージ][4]を `ad_identifiers` として指定できます。
5. [Agent を再起動します][5]

[1]: /ja/getting_started/agent/autodiscovery/#with-the-agent-on-a-host
[2]: /ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: /ja/agent/faq/template_variables/
[4]: /ja/agent/guide/ad_identifiers/#short-image-container-identifiers
[5]: /ja/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{< /tabs >}}

### コンテナの準備

#### Docker

Agent を構成して実行したら、アプリケーションコンテナの `com.datadoghq.ad.check.id:"<CUSTOM_AD_IDENTIFIER>"` ラベルを使用して、オートディスカバリーからチェックコンフィギュレーションを適用します。

**Dockerfile**:

```yaml
LABEL "com.datadoghq.ad.check.id"= '<CUSTOM_AD_IDENTIFIER>'
```

**docker-compose.yaml**:

```yaml
labels:
    com.datadoghq.ad.check.id: '<CUSTOM_AD_IDENTIFIER>'
```

**docker run command**:

```shell
-l com.datadoghq.ad.check.id= '<CUSTOM_AD_IDENTIFIER>'
```

**Docker Swarm**:

Docker Cloud の Swarm モードを使用する場合は、以下のようにラベルをイメージに適用する必要があります。

```yaml
version: '1.0'
services:
# ...
project:
    image: '<IMAGE_NAME>'
    labels:
        com.datadoghq.ad.check.id: '<CUSTOM_AD_IDENTIFIER>'
```

**注**: Agent と JMX コンテナが同じネットワークブリッジ上にある場合は、JMX サーバーを `-Djava.rmi.server.hostname=<CONTAINER_NAME>"` でインスタンス化する必要があります。`<CONTAINER_NAME>` は JMX アプリケーションコンテナ名です。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/kubernetes/
[2]: /ja/integrations/activemq/
[3]: /ja/integrations/cassandra/
[4]: /ja/integrations/confluent_platform/
[5]: /ja/integrations/hive/
[6]: /ja/integrations/jboss_wildfly/
[7]: /ja/integrations/kafka/
[8]: /ja/integrations/solr/
[9]: /ja/integrations/presto/
[10]: /ja/integrations/tomcat/
[11]: /ja/agent/guide/ad_identifiers/