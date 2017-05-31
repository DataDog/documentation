---
last_modified: 2015/07/16
translation_status: complete
language: ja
title: "JMX Checks"
integration_title: JMX Checks
kind: integration
doclevel:
---
<!-- ### Java, Cassandra, Tomcat, ActiveMQ, Solr -->

#### Java, Cassandra, Tomcat, ActiveMQ, Solrのインテグレーションで使用しています。

<!-- ## Introduction

JMX Checks are agents checks that collect metrics from applications that expose them using [JMX](http://www.oracle.com/technetwork/java/javase/tech/javamanagement-140525.html).

In order to collect these metrics, a lightweight Java plugin named JMXFetch is called by the Datadog Agent to connect to the MBean Server and to collect these metrics. This plugin sends metrics to the Datadog Agent using the Dogstatsd server running with the Agent.

JMX Checks have a limit of 350 metrics per instance which should be enough to satisfy your needs as it's really easy to customize which metrics you want to collect.  We are going to see how to do so. -->

### 概要
{:#int-overview}

JMX Checks are agents checks that collect metrics from applications that expose them using [JMX](http://www.oracle.com/technetwork/java/javase/tech/javamanagement-140525.html).

In order to collect these metrics, a lightweight Java plugin named JMXFetch is called by the Datadog Agent to connect to the MBean Server and to collect these metrics. This plugin sends metrics to the Datadog Agent using the Dogstatsd server running with the Agent.

JMX Checks have a limit of 350 metrics per instance which should be enough to satisfy your needs as it's really easy to customize which metrics you want to collect.  We are going to see how to do so.

JMXチェックは、JMXを使用してそれらの公開アプリケーションからメトリックを取得するエージェントチェックです。

これらのメトリックを取得するために、JMXFetchという名前の軽量のJavaプラグインを、MBeanサーバーに接続しDatadogエージェントによって呼び出されます。このプラグインは、エージェントで実行されるDogstatsdサーバーを使用してDatadogエージェントにメトリックを送信します。

JMXのチェックでは、あなたが取得するメトリックをカスタマイズすることはとても簡単です、取得するメトリックスはインスタンスごとに350メトリックスまでとなっています。



<!-- ### Enabling JMX checks
The instructions to set up these integrations from within the Datadog Agent can be found here:

- [Active MQ](https://app.datadoghq.com/account/settings#integrations/activemq)
- [Cassandra](https://app.datadoghq.com/account/settings#integrations/cassandra)
- [Java](https://app.datadoghq.com/account/settings#integrations/java)
- [Solr](https://app.datadoghq.com/account/settings#integrations/solr)
- [Tomcat](https://app.datadoghq.com/account/settings#integrations/tomcat) -->

#### JMX Checkを有効にする方法
Datadog Agent内でJMXを使ったインテグレーションを設定する手順に関しては、以下のリンクを参照してください:

- [Active MQ](https://app.datadoghq.com/account/settings#integrations/activemq)
- [Cassandra](https://app.datadoghq.com/account/settings#integrations/cassandra)
- [Java](https://app.datadoghq.com/account/settings#integrations/java)
- [Solr](https://app.datadoghq.com/account/settings#integrations/solr)
- [Tomcat](https://app.datadoghq.com/account/settings#integrations/tomcat)


<!-- ## Customization

JMX Checks have a default configuration that will collect some metrics from your JMX application. They also allow you to specify a configuration in the yaml file that will be read by JMXFetch to filter which metrics it should send back to the Agent. -->

### カスタマイズ
{:#customization}

JMX Checkには、JMXアプリケーションから基本的なメトリックを取得するように初期設定してあります。尚、JMXFetchによって読み込まれるYAMLファイルを設定することにより、Datadog Agentに渡されるJMXアプリケーションから取得したメトリクスを指定することができます。


<!-- #### Commands to view the metrics that are available:

<div class="alert alert-info">
    The <code>datadog-agent jmx</code> command ws added in version 4.1.0.
</div>

- List attributes that match at least one of your instances configuration:

        `sudo /etc/init.d/datadog-agent jmx list_matching_attributes`

- List attributes that do match one of your instances configuration but that are not being collected because it would exceed the number of metrics that can be
collected:

        `sudo /etc/init.d/datadog-agent jmx list_limited_attributes`

- List attributes that will actually be collected by your current instances configuration:

        `sudo /etc/init.d/datadog-agent jmx list_collected_attributes`

- List attributes that don't match any of your instances configuration:

        `sudo /etc/init.d/datadog-agent jmx list_not_matching_attributes`

- List every attributes available that has a type supported by JMXFetch:

        `sudo /etc/init.d/datadog-agent jmx list_everything`

- Start the collection of metrics based on your current configuration and display them in the console:

        `sudo /etc/init.d/datadog-agent jmx collect` -->

##### JMX Checkによって取得可能なメトリクスを調べるためのコマンド:

<div class="alert alert-info">
    コマンド<code>datadog-agent jmx</code>は、Datadog Agent version 4.1.0で追加されました。
</div>

- どれかのインスタンスの設定内容に一致したアトリビュート(属性)のリスト:

      `sudo /etc/init.d/datadog-agent jmx list_matching_attributes`

- どれかのインスタンスの設定内容に一致したアトリビュート(属性)で、メトリクスの収集制限を超えているために現状取得されていないアトリビュート(属性)のリスト:

      `sudo /etc/init.d/datadog-agent jmx list_limited_attributes`

- インスタンスの設定内容に基づいて、実際に取得されるアトリビュート(属性)のリスト:

      `sudo /etc/init.d/datadog-agent jmx list_collected_attributes`

- そのインスタンスの設定内容に一致しないアトリビュート(属性)のリスト:

      `sudo /etc/init.d/datadog-agent jmx list_not_matching_attributes`

- JMXFetchでサポートされている全てのアトリビュート(属性)のリスト:

      `sudo /etc/init.d/datadog-agent jmx list_everything`

- 設定に基づいてJMXからのメトリクスを取得し、コンソールに表示する:

      `sudo /etc/init.d/datadog-agent jmx collect`


<!-- #### How to customize what metrics to collect:

Like every other Agent Check, JMX Checks have 2 main sections:

- `init_config`: Settings that will be applied to every instances
- `instances`: Settings used to configure instances

See [this page for more information](http://docs.datadoghq.com/guides/agent_checks/#config).

JMX checks require a `conf` section that has to be placed within either the `init_config` section or the `instances` section.

The `conf` section will be used to determine what JMX attributes should be collected and sent as metrics to Datadog.

The configuration section looks like this:

<%=snippet_code_block "jmx-basic-conf.yaml" %>

The `conf` parameter is a list of dictionaries. Only 2 keys are
allowed in this dictionary:

- `include` (**mandatory**): Dictionary of filters, any attribute that matches these filters will be collected unless it also matches the "exclude" filters (see
below)
- `exclude` (**optional**): Another dictionary of filters. Attributes that match these filters won't be collected

For a given bean, metrics get tagged in the following manner:

        mydomain:attr0=val0,attr1=val1

Your metric will be mydomain (or some variation depending on the attribute
inside the bean) and have the tags `attr0:val0, attr1:val1, domain:mydomain`. -->

##### 取得するメトリクスをカスタマイズする:

他のAgent Checkと同じようにJMX Checkも2つのメインセクションで構成されています:

- `init_config`: 全てのインスタンスに適応される設定
- `instances`: 当該インスタンスに適応される設定

詳しくは、[「Agent Checkの書き方」](http://docs.datadoghq.com/ja/guides/agent_checks/#config)のページを参照してください。

JMX checks require a `conf` section that has to be placed within either the `init_config` section or the `instances` section.

The `conf` section will be used to determine what JMX attributes should be collected and sent as metrics to Datadog.

The configuration section looks like this:

<%=snippet_code_block "jmx-basic-conf.yaml" %>

The `conf` parameter is a list of dictionaries. Only 2 keys are
allowed in this dictionary:

- `include` (**mandatory**): Dictionary of filters, any attribute that matches these filters will be collected unless it also matches the "exclude" filters (see
below)
- `exclude` (**optional**): Another dictionary of filters. Attributes that match these filters won't be collected

For a given bean, metrics get tagged in the following manner:

    mydomain:attr0=val0,attr1=val1

Your metric will be mydomain (or some variation depending on the attribute
inside the bean) and have the tags `attr0:val0, attr1:val1, domain:mydomain`.


<!-- ### Description of the filters

These dictionaries have some specials keys:

- `domain`: The domain of the attribute (e.g.
java.lang)
- `bean` or `bean_name`: A [list](#update-note) of full bean
names (e.g. java.lang:type=Compilation)
- `attribute`: A [list](#update-note) or a dictionary of attribute names (see below for more details)

On top of these parameters, the filters support "custom" keys which means that you can filter by bean parameters.

Example: Let's say you want to collect metrics regarding the Cassandra
cache. You could use the `type:` `- Caches` filter:

<%=snippet_code_block "jmx-cassandra-cache.yaml" %> -->

#### Description of the filters

These dictionaries have some specials keys:

- `domain`: The domain of the attribute (e.g.
java.lang)
- `bean` or `bean_name`: A [list](#update-note) of full bean
names (e.g. java.lang:type=Compilation)
- `attribute`: A [list](#update-note) or a dictionary of attribute names (see below for more details)

On top of these parameters, the filters support "custom" keys which means that you can filter by bean parameters.

Example: Let's say you want to collect metrics regarding the Cassandra
cache. You could use the `type:` `- Caches` filter:

<%=snippet_code_block "jmx-cassandra-cache.yaml" %>


<!-- #### The `attribute` filter

The `attribute` filter can accept two types of values:

- A dictionary whose keys are attributes names:

 <%=snippet_code_block "jmx-attribute-dict.yaml" %>

In that case you can specify an alias for the metric that will become the metric name in Datadog.  You can also specify the metric type either a gauge or a counter. If you choose counter, a rate per second will be computed for this metric.

- A list of attributes names:

<%= snippet_code_block "jmx-attribute-list.yaml" %>

In that case:

- The metric type will be a gauge
- The metric name will be `jmx.[DOMAIN_NAME].[ATTRIBUTE_NAME]`

Here is another filtering example:

        instances:
          - host: 127.0.0.1
            name: jmx_instance
            port: 9999

        init_config:
          conf:
            - include:
                bean: org.apache.cassandra.metrics:type=ClientRequest,scope=Write,name=Latency
                attribute:
                  - OneMinuteRate
                  - 75thPercentile
                  - 95thPercentile
                  - 99thPercentile -->

##### The `attribute` filter

The `attribute` filter can accept two types of values:

- A dictionary whose keys are attributes names:

 <%=snippet_code_block "jmx-attribute-dict.yaml" %>

In that case you can specify an alias for the metric that will become the metric name in Datadog.  You can also specify the metric type either a gauge or a counter. If you choose counter, a rate per second will be computed for this metric.

- A list of attributes names:

<%= snippet_code_block "jmx-attribute-list.yaml" %>

In that case:

- The metric type will be a gauge
- The metric name will be `jmx.[DOMAIN_NAME].[ATTRIBUTE_NAME]`

Here is another filtering example:

        instances:
          - host: 127.0.0.1
            name: jmx_instance
            port: 9999

        init_config:
          conf:
            - include:
                bean: org.apache.cassandra.metrics:type=ClientRequest,scope=Write,name=Latency
                attribute:
                  - OneMinuteRate
                  - 75thPercentile
                  - 95thPercentile
                  - 99thPercentile


<!-- #### Note
{:#update-note}

List of filters is only supported in Datadog Agent > 5.3.0. If you are using an older version, please use singletons and multiple `include` statements instead.

- Datadog Agent > 5.3.0

        conf:
            - include:
               domain: domain_name
               bean:
                 - first_bean_name
                 - second_bean_name
        ...

- Older Datadog Agent versions

        conf:
            - include:
                domain: domain_name
                bean: first_bean_name
            - include:
                domain: domain_name
                bean: second_bean_name
        ... -->

##### Note
{:#update-note}

フィルターのリストは、Datadog Agent 5.3.0からサポートされました。もし、旧バージョンのDatadog Agentを使っている場合は、bean毎に別の`include`文を記述するようにしてください。

- Datadog Agent > 5.3.0 を使用している場合

        conf:
            - include:
               domain: domain_name
               bean:
                 - first_bean_name
                 - second_bean_name
        ...

- Datadog Agent 5.3.0 以前を使用している場合

        conf:
            - include:
                domain: domain_name
                bean: first_bean_name
            - include:
                domain: domain_name
                bean: second_bean_name
        ...


<!-- ## Troubleshooting

#### The 350 metric limit

Due to the nature of these integrations, it is possible to submit an extremely high number of metrics directly to Datadog. What we've found in speaking with many customers is that some of these metrics are not needed; thus, we've set the limit at 350 and below you'll find the tools to both see what you're collecting and to get below the limit.

Begin by using the commands seen [above](#customization) to investigate what metrics are available.  Once you have seen all metrics that are available, we recommend creating filters to refine what metrics are collected.  If you believe you need more than 350 metrics, please reach out to [support@datadoghq.com](mailto:support@datadoghq.com). -->

### トラブルシューティング

#### 送信可能なメトリクス数の上限について (350個)

これらのインテグレーションは、その特性上大量のメトリクスをDatadogへ送信することが可能です。このような状況下、お客様とのコミュケーションの中で分かったことは、「インテグレーションが送信しているメトリクスの全てが必要な訳ではない」ということでした。従って、これらのインテグレーションから送信できるメトリクスを350個に制限しています。

メトリクスを350個以内に収めるために、Datadogではコマンドラインツールを提供しています。上記で紹介したコマンドラインツールを使いどのようなメトリクスが取得可能かを調査し、`exclude`によるフィルターを設定することによりキーとなるメトリクスを絞り込むことをお勧めします。もし、JMX関連で、350個以上のメトリクスが必要な場合は、[support@datadoghq.com](mailto:support@datadoghq.com)までご連絡ください。
