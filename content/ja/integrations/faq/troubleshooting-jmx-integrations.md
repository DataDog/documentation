---
further_reading:
- link: /integrations/java/
  tag: ドキュメント
  text: Java インテグレーション

title: JMX インテグレーションのトラブルシューティング
---

JMX にアクセスできることを確認するために、可能であれば JConsole または同等のものを使用してテストしてください。JConsole を使って接続できない場合、[この記事][1]が解決するのに役立つかもしれません。また、YAML に記載されているメトリクスと JConsole に記載されているメトリクスが 1:1 でない場合、これを修正する必要があります。

<div class="alert alert-warning">
<strong>Agent v5.32.8 以上</strong>のすべてのバージョンでは、<code>jmxterm</code> JAR は Agent に同梱されていません。<code>jmxterm</code> をダウンロードして使用するには、<a href="https://github.com/jiaqi/jmxterm">アップストリームプロジェクト</a>を参照してください。以下の例の <code>/opt/datadog-agent/agent/checks/libs/jmxterm-1.0-DATADOG-uber.jar</code> を、アップストリームプロジェクトからダウンロードした <code>jmxterm</code> JAR パスに変更します。
</div>

JConsole で接続できた場合は、以下を実行します。

```text
java -jar /opt/datadog-agent/agent/checks/libs/jmxterm-1.0-DATADOG-uber.jar -l localhost:<PORT> -u <USER> -p <PASSWORD>
```

上記のコマンドで接続できた場合は、`beans` を実行し、上記の結果のコピーと以下の情報を [Datadog サポートチーム][2]に送信してください。

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

* [Agent Flare][1]、これには以下が含まれます。
  * [status コマンド][2]の出力。
  * `/var/log/datadog/agent.log` の内容
  * `/var/log/datadog/jmxfetch.log` の内容
  * YAML インテグレーションのコピー。
* `ps aux | grep jmxfetch` の出力
* `sudo -u dd-agent datadog-agent jmx list everything -l debug` の出力 (`--flare` を付けると、バージョン 6.26.x/7.26.x の flare に出力が含まれます)

[1]: /ja/agent/troubleshooting/send_a_flare/?tab=agentv6v7
[2]: /ja/agent/guide/agent-commands/?tab=agentv6v7#agent-status-and-information
{{% /tab %}}
{{% tab "Agent v5" %}}

* [Agent Flare][1]、これには以下が含まれます。
  * [info コマンド][2]の出力。
  * `/var/log/datadog/jmxfetch.log` の内容
  * YAML インテグレーションのコピー。
* `ps aux | grep jmxfetch` の出力
* `sudo /etc/init.d/datadog-agent jmx list_everything` の出力

[1]: /ja/agent/troubleshooting/send_a_flare/?tab=agentv5
[2]: /ja/agent/guide/agent-commands/?tab=agentv5#agent-status-and-information
{{% /tab %}}
{{< /tabs >}}

**注**: いくつかのメトリクス (`jvm.heap_memory`、`jvm.non_heap_memory` など) を見ることができれば、それは JMXFetch が適切に動作している証拠です。他のアプリケーションをターゲットにしていて、関連するメトリクスが表示されない場合は、YAML の構成に誤りがある可能性があります。

## Agent のトラブルシューティング

{{< tabs >}}
{{% tab "Agent >= v6.2" %}}

これらのコマンドは、v6.2.0 から利用可能です。

| コマンド                                                | 説明                                                                                                                                                             |
|:-------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `sudo -u dd-agent datadog-agent jmx list matching`     | 1 つ以上のインスタンス構成に一致する属性をリストする。                                                                                                |
| `sudo -u dd-agent datadog-agent jmx list limited`      | インスタンス構成の 1 つに一致するが、収集可能なメトリクス数を超えるために収集されない属性をリストする。 |
| `sudo -u dd-agent datadog-agent jmx list collected`    | 現在のインスタンス構成によって実際に収集される属性をリストする。                                                                                    |
| `sudo -u dd-agent datadog-agent jmx list not-matching` | どのインスタンス構成にも一致しない属性をリストする。                                                                                                   |
| `sudo -u dd-agent datadog-agent jmx list everything`   | JMXFetch でサポートされているタイプのすべての使用可能な属性をリストする。                                                                                                  |
| `sudo -u dd-agent datadog-agent jmx collect`           | 現在のコンフィギュレーションに基づいてメトリクスの収集を開始し、コンソールに表示します。                                                                    |

**注**:

- デフォルトでは、これらのコマンドは、構成されたすべての JMX チェックで実行されます。コマンドを特定のチェックに限定するには、`--checks` フラグを使用します。例:

  ```shell
  sudo -u dd-agent datadog-agent jmx list collected --checks tomcat
  ```

- Agent v6.26.+ / v7.26+ の場合、`--flare` を付加すると、上記のコマンドの出力を `/var/log/datadog/jmxinfo/` 以下に書き込み、flare に含めます。

  ```shell
  sudo -u dd-agent datadog-agent jmx list everything -l debug --flare
  ```

{{% /tab %}}
{{% tab "Agent v6.0 と v6.1" %}}

Agent 6 は JMXFetch を同梱しており、以下に示すものを除き、そのすべての機能をサポートしています。

Agent は、JMXFetch へのフル機能のインターフェイスを持っていないので、収集された Bean のリスト、JVM などをデバッグするために、いくつかのコマンドを手動で実行する必要があるかもしれません。典型的な手動呼び出しは、次のような形式になります。

```shell
/usr/bin/java -Xmx200m -Xms50m -classpath /usr/lib/jvm/java-8-oracle/lib/tools.jar:/opt/datadog-agent/bin/agent/dist/jmx/jmxfetch-0.18.2-jar-with-dependencies.jar org.datadog.jmxfetch.App --check <CHECK_LIST> --conf_directory /etc/datadog-agent/conf.d --log_level INFO --log_location /var/log/datadog/jmxfetch.log --reporter console <COMMAND>
```

このとき、`<COMMAND>` は以下のいずれかです。

* `list_everything`
* `list_collected_attributes`
* `list_matching_attributes`
* `list_not_matching_attributes`
* `list_limited_attributes`
* `list_jvms`

また、`<CHECK_LIST>` は `/etc/datadog-agent/conf.d/` にある有効な `yaml` 構成のリストに相当します。例:

* `cassandra.d/conf.yaml`
* `kafka.d/conf.yaml`
* `jmx.d/conf.yaml`

例:

```text
/usr/bin/java -Xmx200m -Xms50m -classpath /usr/lib/jvm/java-8-oracle/lib/tools.jar:/opt/datadog-agent/bin/agent/dist/jmx/jmxfetch-0.18.2-jar-with-dependencies.jar org.datadog.jmxfetch.App --check cassandra.d/conf.yaml jmx.d/conf.yaml --conf_directory /etc/datadog-agent/conf.d --log_level INFO --log_location /var/log/datadog/jmxfetch.log --reporter console list_everything
```

**注**:

- JRE tools.jar の場所 (例では `/usr/lib/jvm/java-8-oracle/lib/tools.jar`) は、お使いのシステムでは別の場所にあるかもしれません。`sudo find / -type f -name 'tools.jar'` で見つけることができるはずです。
- JVM ヒープパラメーター `-Xmx`、`-Xms` の代わりに、JMXFetch のデフォルト値を指定することができます。

{{% /tab %}}
{{% tab "Agent v5" %}}

| コマンド                                                           | 説明                                                                                                                                                             |
|:------------------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `sudo /etc/init.d/datadog-agent jmx list_matching_attributes`     | 1 つ以上のインスタンスコンフィギュレーションに一致する属性をリストします。                                                                                                |
| `sudo /etc/init.d/datadog-agent jmx list_limited_attributes`      | インスタンス構成の 1 つに一致するが、収集可能なメトリクス数を超えるために収集されない属性をリストする。 |
| `sudo /etc/init.d/datadog-agent jmx list_collected_attributes`    | 現在のインスタンス構成によって実際に収集される属性をリストする。                                                                                    |
| `sudo /etc/init.d/datadog-agent jmx list_not_matching_attributes` | どのインスタンス構成にも一致しない属性をリストする。                                                                                                   |
| `sudo /etc/init.d/datadog-agent jmx list_everything`              | JMXFetch でサポートされているタイプのすべての使用可能な属性をリストする。                                                                                                  |
| `sudo /etc/init.d/datadog-agent jmx collect`                      | 現在のコンフィギュレーションに基づいてメトリクスの収集を開始し、コンソールに表示します。                                                                    |

{{% /tab %}}
{{% tab "Docker Agent" %}}

オートディスカバリーが JMX ベースのチェックをロードしているかどうかを確認するには、次のようにします。

```shell
$ docker exec -it <AGENT_CONTAINER_NAME> agent configcheck
```

Agent から JMX ベースのチェックのステータスを見るには

```shell
$ docker exec -it <AGENT_CONTAINER_NAME> agent status
```

{{% /tab %}}
{{< /tabs >}}

## よくあるご質問

### 350 のメトリクス上限

Datadog は最大 350 のメトリクスを受け取ることができます。
ベストプラクティスは、収集したメトリクスを絞り込むフィルターを作成することによって、メトリクスを 350 未満に制限することです。

[この上限を増やしたい場合は、Datadog サポートにご連絡ください。][2]

### Java パス

デフォルトの Agent インストールには、バンドルされている JVM はなく、システムにインストールされているものを使用します。したがって、Agent を実行しているユーザーのパスに Java ホームディレクトリが存在することを確認する必要があります。

**注**:

- `gcr.io/datadoghq/agent:latest-jmx` Docker イメージは、Agent が jmxfetch を実行するために必要とする JVM を含んでいます。あるいは、インテグレーションの構成ファイルで、`java_bin_path` パラメーターを使って、JVM のパスを指定することもできます。
- JMXFetch には、有効な Java パスを 1 つだけ指定する必要があります。

### JVM メトリクス

Datadog の Java APM ライブラリは、JMX インテグレーションなしで JVM メトリクスを収集することが可能です。詳細については、[ランタイムメトリクス][3]を参照してください。

### JBoss または WildFly アプリケーションの監視

Agent v5.6.0 以上では、次の手順を使用します。

JBoss/WildFly アプリケーションは、JMXFetch にデフォルトでバンドルされていない特定のプロトコル (Remoting JMX) を介して JMX を公開します。JMXFetch がこれらのアプリケーションに接続できるようにするには、以下のように構成します。

* JBoss/WildFly サーバー上の `jboss-cli-client.jar` ファイルを探します (デフォルトでは、そのパスは `$JBOSS_HOME/bin/client/jboss-cli-client.jar` になっています)。
* JMXFetch が JBoss/WildFly アプリケーション以外のホストで実行されている場合は、`jboss-cli-client.jar` をホスト JMXFetch が実行されている場所にコピーします。
* jar のパスを構成の `init_config` セクションに追加します。

```yaml
  # Datadog Agent >= 5.6.0

  init_config:
    custom_jar_paths:
      - /path/to/jboss-cli-client.jar
```

* 構成の `instances` セクションで、JMXFetch が接続するカスタム URL を指定します。

```yaml
  # Datadog Agent >= 5.6.0

  # jmx_url は、使用している JBoss/WildFly のバージョンと、
  # サーバーでの JMX の設定方法によって異なる場合があります
  # 詳細は、JBoss/WildFly の関連ドキュメントを参照してください
  instances:
    - jmx_url: "service:jmx:remote://localhost:4447"
      name: jboss-application  # 必須ですが、任意の値を設定できます
                               # そのインスタンスから取得したメトリクスにタグ付けするために使用されます
 ```

* [Agent を再起動します][4]。

**注**: `Unable to instantiate or initialize instance <instance_name> for an unknown reason.Parameter 'name' may not be null` のような警告メッセージが表示された場合、`$WILDFLY_HOME/bin/add-user.sh -a -u <user> -p <password>` で wildfly ユーザーを設定し、構成の `instances` セクションで `user` と `password` を指定する必要があるかもしれません。
```yaml
instances:
  - jmx_url: <jmx_url>
    name: <instance_name>
    user: <username>
    password: <password>
```

### JMX リモートライフサイクルリスナーを有効にした Tomcat の監視

Agent v5.6.0 以上では、次の手順を使用します。

JMX リモートライフサイクルリスナーを有効にして Tomcat を使用している場合は (詳細については [Tomcat マニュアル][5]を参照)、JMXFetch が Tomcat アプリケーションに接続するために追加のセットアップが必要です。

* Tomcat サーバーで `catalina-jmx-remote.jar` ファイルを探します (デフォルトでは、パスは `$CATALINA_HOME/lib` です)。
* JMXFetch が Tomcat アプリケーション以外のホストで実行されている場合は、`catalina-jmx-remote.jar` をホスト JMXFetch が実行されている場所にコピーします。
* jar のパスを構成の `init_config` セクションに追加します。

```yaml
# Datadog Agent >= 5.6.0

init_config:
  custom_jar_paths:
    - /path/to/catalina-jmx-remote.jar
```

* 構成の `instances` セクションで、JMXFetch が接続するカスタム URL を指定します。

```yaml
# Datadog Agent >= 5.6.0

# jmx_url は、Tomcat サーバーの JMX のセットアップ方法によって異なります
instances:
  - jmx_url: "service:jmx:rmi://:10002/jndi/rmi://:10001/jmxrmi"
    name: tomcat-application  # 必須ですが任意の値に設定できます。
                              # これは、インスタンスから取得されたメトリクスのタグ付けに使用されます
```

* [Agent を再起動します][4]。

### SSL のトラブルシューティング

JMX が有効化され、Agent チェックが Datadog にメトリクスを正常に送信できるようになると、SSL ソケットを介したリモート接続を保護することができます。

**注**: JMX リモートユーザー/パスワード認証ファイルを使用せずに、JMX over SSL を保護することはできません。アプリケーションの実行にシステムレベルの権限を使用している場合、これらのファイルを追加し、起動時に実行してください。

この例では、[Tomcat インテグレーション][6]の Datadog の構成を示します。

* [Java アプリのキーストア][7]に適用する証明書とキーを設定します。
* `conf.d/tomcat.d` にある Datadog Tomcat の `conf.yaml` ファイルを更新します。

```yaml
instances:
  - host: localhost
    port: 9000
    user: tomcat
    password: tomcat
    name: tomcat_webapp
    trust_store_path: <KEYSTORE_PATH>
    trust_store_password: <KEY_PASSWORD>
```

* [Agent を再起動します][4]。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.oracle.com/javase/8/docs/technotes/guides/management/faq.html
[2]: /ja/help/
[3]: /ja/tracing/metrics/runtime_metrics/java/
[4]: /ja/agent/guide/agent-commands/#restart-the-agent
[5]: https://tomcat.apache.org/tomcat-7.0-doc/config/listeners.html#JMX_Remote_Lifecycle_Listener_-_org.apache.catalina.mbeans.JmxRemoteLifecycleListener
[6]: https://tomcat.apache.org/tomcat-7.0-doc/ssl-howto.html#SSL_and_Tomcat
[7]: http://docs.oracle.com/javase/1.5.0/docs/guide/management/agent.html
