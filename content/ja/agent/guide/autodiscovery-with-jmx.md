---
title: JMX を使用したオートディスカバリー
kind: ガイド
further_reading:
  - link: /agent/autodiscovery/integrations
    tag: ドキュメント
    text: オートディスカバリーのインテグレーションテンプレートの作成とロード
  - link: /agent/autodiscovery/ad_identifiers
    tag: ドキュメント
    text: コンテナと該当するインテグレーションテンプレートとの対応
  - link: /agent/autodiscovery/management
    tag: ドキュメント
    text: Agent オートディスカバリーに含めるコンテナの管理
  - link: /agent/autodiscovery/tag
    tag: ドキュメント
    text: アプリケーションのタグの動的割り当てと収集
---
Datadog Agent で使用する JMX ベースのインテグレーションコンフィギュレーションは、大きすぎてオートディスカバリーのラベルやアノテーションに適合しないことがあります。その場合、[オートディスカバリーコンテナ識別子][1]を使用します。

下記の Datadog-Kafka インテグレーションの例では、JMX を利用してメトリクスを収集し、収集したメトリクスを Datadog Agent を使用して Datadog に送信しています。

### Agent の準備

{{< tabs >}}
{{% tab "Host Agent" %}}

1. [Kafka インテグレーションディレクトリ][1]: `/etc/datadog-agent/conf.d/kafka.d` で 名前を `conf.yaml.example` から `conf.yaml` へと変更して Kafka インテグレーションを有効にします。

2. パラメーター値を `conf.yaml` から Agent オートディスカバリーロジックに一致するように置換します。
   デフォルトでは、コンフィギュレーションファイルにホストパラメーター値が含まれています。 Agent をオートディスカバリーと併用している場合は、代わりに[オートディスカバリーテンプレート変数][2]を使用します。
   下記の例では、`host` パラメーター値を `localhost` から `%%host%%` に変更しています。

    ```yaml
      instances:

          ## @param host - string - required
          ## Kafka host to connect to.
          #
         - host: %%host%%

      # (...)
    ```

3. このコンフィギュレーションファイルをKafka コンテナに適用する Agent に指定するには、`conf.yaml` ファイルの先頭に `ad_identifiers` パラメーターを構成します。

    ```yaml
      ad_identifiers:
        - CUSTOM_AD_IDENTIFIER

      instances:

          ## @param host - string - required
          ## Kafka host to connect to.
          #
         - host: %%host%%

      # (...)
    ```

   **注意**: 上記の例ではカスタム `ad_identifers` 値を使用していますが、必要に応じて、[コンテナショートイメージ][3]を `ad_identifiers` として指定できます。

4. [Agent のオートディスカバリーを有効化します][4]。

[1]: /ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: /ja/agent/autodiscovery/template_variables
[3]: https://docs.datadoghq.com/ja/agent/autodiscovery/ad_identifiers/#short-image-container-identifiers
[4]: /ja/agent/autodiscovery/?tab=agent#docker-autodiscovery
{{% /tab %}}
{{% tab "Containerized Agent" %}}

1. Datadog-Kafka インテグレーションに紐付けられたコンフィギュレーションファイル、`conf.yaml` と `metrics.yaml` を取得します。ファイルは[インテグレーションコンフィギュレーションディレクトリ][1]から入手できます。下記の一覧で、JMX ベースのインテグレーションとそれぞれに紐付くファイルの一覧をご確認ください。

    | インテグレーション         | メトリクスファイル       | コンフィギュレーションファイル      |
    |---------------------|--------------------|-------------------------|
    | [ActiveMq][2]       | [metrics.yaml][3]  | [conf.yaml.example][4]  |
    | [Cassandra][5]      | [metrics.yaml][6]  | [conf.yaml.example][7]  |
    | [Hive][8]           | [metrics.yaml][9]  | [conf.yaml.example][10] |
    | [Jboss Wildfly][11] | [metrics.yaml][12] | [conf.yaml.example][13] |
    | [Kafka][14]         | [metrics.yaml][15] | [conf.yaml.example][16] |
    | [Solr][17]          | [metrics.yaml][18] | [conf.yaml.example][19] |
    | [Presto][20]        | [metrics.yaml][21] | [conf.yaml.example][22] |
    | [Tomcat][23]        | [metrics.yaml][24] | [conf.yaml.example][25] |

2. ファイル名を `conf.yaml.example` から `conf.yaml` に変更します。
3. パラメーター値を `conf.yaml` から Agent オートディスカバリーロジックに一致するように置換します。
   デフォルトでは、コンフィギュレーションファイルにホストパラメーター値が含まれています。 Agent とオートディスカバリーを併用している場合は、代わりに[オートディスカバリーテンプレート変数][26]を使用します。
   下記の例では、`host` パラメーター値を `localhost` から `%%host%%` に変更しています。

    ```yaml
      instances:

          ## @param host - string - required
          ## Kafka host to connect to.
          #
         - host: %%host%%

      # (...)
    ```

4. このコンフィギュレーションファイルをKafka コンテナに適用する Agent に指定するには、`conf.yaml` ファイルの先頭に `ad_identifiers` パラメーターを構成します。

    ```yaml
      ad_identifiers:
        - CUSTOM_AD_IDENTIFIER

      instances:

          ## @param host - string - required
          ## Kafka host to connect to.
          #
         - host: %%host%%

      # (...)
    ```

   **注意**: 上記の例ではカスタム `ad_identifers` 値を使用していますが、必要に応じて、[コンテナショートイメージ][27]を `ad_identifiers` として指定できます。

5. [Agent のオートディスカバリーを有効化したら][28]、`conf.d/kafka.d/` フォルダーの Agent にコンフィギュレーションファイル (`conf.yaml` と `metrics.yaml`) をマウントします。
6. (任意) - Agent コンテナ (AWS ECS など) で上記のファイルをマウントできない場合は、これら 2 つのコンフィギュレーションファイルを使用して Agent Docker イメージを再構築する必要があります。

    ```conf
    FROM datadog/agent:latest
    COPY <PATH_JMX_CONF_FILE> conf.d/kafka.d/
    COPY <PATH_JMX_METRICS_FILE> conf.d/kafka.d/
    ```

   その後、この新しいカスタムイメージを正規のコンテナ化された Agent として使用します。

[1]: /ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: /ja/integrations/activemq
[3]: https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/metrics.yaml
[4]: https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/conf.yaml.example
[5]: /ja/integrations/cassandra
[6]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/metrics.yaml
[7]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/conf.yaml.example
[8]: /ja/integrations/hive
[9]: https://github.com/DataDog/integrations-core/blob/master/hive/datadog_checks/hive/data/metrics.yaml
[10]: https://github.com/DataDog/integrations-core/blob/master/hive/datadog_checks/hive/data/conf.yaml.example
[11]: /ja/integrations/jboss_wildfly
[12]: https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/datadog_checks/jboss_wildfly/data/metrics.yaml
[13]: https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/datadog_checks/jboss_wildfly/data/conf.yaml.example
[14]: /ja/integrations/kafka
[15]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/metrics.yaml
[16]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/conf.yaml.example
[17]: /ja/integrations/solr
[18]: https://github.com/DataDog/integrations-core/blob/master/solr/datadog_checks/solr/data/metrics.yaml
[19]: https://github.com/DataDog/integrations-core/blob/master/solr/datadog_checks/solr/data/conf.yaml.example
[20]: /ja/integrations/presto
[21]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/metrics.yaml
[22]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/conf.yaml.example
[23]: /ja/integrations/tomcat
[24]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/metrics.yaml
[25]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/conf.yaml.example
[26]: /ja/agent/autodiscovery/template_variables
[27]: https://docs.datadoghq.com/ja/agent/autodiscovery/ad_identifiers/#short-image-container-identifiers
[28]: /ja/agent/autodiscovery/?tab=containerizedagent#docker-autodiscovery
{{% /tab %}}
{{< /tabs >}}

### コンテナの準備

Agent を構成して実行したら、Kafka コンテナの `com.datadoghq.ad.check.id: CUSTOM_AD_IDENTIFIER` ラベル/アノテーションを使用して、オートディスカバリーからチェックコンフィギュレーションを適用します。

{{< tabs >}}
{{% tab "Kubernetes" %}}

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.check.id: 'CUSTOM_AD_IDENTIFIER'
    # (...)
spec:
  containers:
    - name: '<CONTAINER_IDENTIFIER>'
# (...)
```

**注**:

* 特定のコンフィギュレーションをコンテナに適用するには、オートディスカバリーはイメージではなく、**名前**でコンテナを認識します。`<CONTAINER_IDENTIFIER>` を `.spec.containers[0].image` ではなく `.spec.containers[0].name` にマッチさせるよう試みます。
* `kind: Pod` を使用して Kubernetes ポッドを直接定義する場合は、各ポッドのアノテーションを `metadata` セクションの真下に追加します。レプリケーションコントローラー、ReplicaSets、またはデプロイメントを使用してポッドを間接的に定義する場合は、ポッドアノテーションを `.spec.template.metadata` の下に追加します。

{{% /tab %}}
{{% tab "Docker" %}}

**Dockerfile**:

```yaml
LABEL "com.datadoghq.ad.check.id"= 'CUSTOM_AD_IDENTIFIER'
```

**docker-compose.yaml**:

```yaml
labels:
  com.datadoghq.ad.check.id: CUSTOM_AD_IDENTIFIER
```

**docker 実行コマンド**:

```shell
-l com.datadoghq.ad.check.id= 'CUSTOM_AD_IDENTIFIER'
```

**Docker Swarm**:

Docker Cloud の Swarm モードを使用する場合は、以下のようにラベルをイメージに適用する必要があります。

```yaml
version: "1.0"
services:
...
  project:
    image: '<IMAGE_NAME>'
    labels:
      com.datadoghq.ad.check.id: CUSTOM_AD_IDENTIFIER
```

{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/autodiscovery/ad_identifiers