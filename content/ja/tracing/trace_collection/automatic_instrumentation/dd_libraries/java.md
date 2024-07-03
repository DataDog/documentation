---
aliases:
- /ja/tracing/java
- /ja/tracing/languages/java
- /ja/agent/apm/java/
- /ja/tracing/setup/java
- /ja/tracing/setup_overview/java
- /ja/tracing/setup_overview/setup/java
- /ja/tracing/trace_collection/dd_libraries/java/
code_lang: java
code_lang_weight: 0
further_reading:
- link: https://github.com/DataDog/dd-trace-java
  tag: ソースコード
  text: Datadog Java APM source code
- link: tracing/glossary/
  tag: Documentation
  text: Explore your services, resources, and traces
kind: documentation
title: Tracing Java Applications
type: multi-code-lang
---
## Compatibility requirements

The latest Java Tracer supports all JVMs version 8 and higher. For additional information about JVM versions below 8, read [Supported JVM runtimes][10].

For a full list of Datadog's Java version and framework support (including legacy and maintenance versions), read [Compatibility Requirements][1].

## Getting started

Before you begin, make sure you've already [installed and configured the Agent][18].

### Instrument your application

After you install and configure your Datadog Agent, the next step is to add the tracing library directly in the application to instrument it. Read more about [compatibility information][1].

To begin tracing your applications:

1. Download `dd-java-agent.jar` that contains the latest tracer class files, to a folder that is accessible by your Datadog user:

{{< tabs >}}
{{% tab "Wget" %}}
   ```shell
   wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```
{{% /tab %}}
{{% tab "cURL" %}}
   ```shell
   curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```
{{% /tab %}}
{{% tab "Dockerfile" %}}
   ```dockerfile
   ADD 'https://dtdg.co/latest-java-tracer' dd-java-agent.jar
   ```
{{% /tab %}}
{{< /tabs >}}

   **Note:** To download the latest build of a specific **major** version, use the `https://dtdg.co/java-tracer-vX` link instead, where `X` is the desired major version.
   For example, use `https://dtdg.co/java-tracer-v1` for the latest version 1 build. Minor version numbers must not be included. Alternatively, see Datadog's [Maven repository][3] for any specific version.

   **Note**: Release Candidate versions are made available in GitHub [DataDog/dd-trace-java releases][21]. These have "RC" in the version and are recommended for testing outside of your production environment. You can [subscribe to GitHub release notifications][20] to be informed when new Release Candidates are available for testing. If you experience any issues with Release Candidates, reach out to [Datadog support][22].

2. To run your app from an IDE, Maven or Gradle application script, or `java -jar` command, with the Continuous Profiler, deployment tracking, and logs injection (if you are sending logs to Datadog), add the `-javaagent` JVM argument and the following configuration options, as applicable:

    ```text
    java -javaagent:/path/to/dd-java-agent.jar -Ddd.profiling.enabled=true -XX:FlightRecorderOptions=stackdepth=256 -Ddd.logs.injection=true -Ddd.service=my-app -Ddd.env=staging -Ddd.version=1.0 -jar path/to/your/app.jar
    ```
    If you have a strong need to reduce the size of your image and omit modules, you can use the [jdeps][19] command to identify dependencies. However, required modules can change over time, so do this at your own risk.

    <div class="alert alert-danger">Enabling profiling may impact your bill depending on your APM bundle. See the <a href="https://docs.datadoghq.com/account_management/billing/apm_tracing_profiler/">pricing page</a> for more information.</div>

| Environment Variable      | System Property                     | Description|
| --------- | --------------------------------- | ------------ |
| `DD_ENV`      | `dd.env`                  | Your application environment (`production`, `staging`, etc.) |
| `DD_LOGS_INJECTION`   | `dd.logs.injection`     | Enable automatic MDC key injection for Datadog trace and span IDs. See [Advanced Usage][6] for details. <br><br>**Beta**: Starting in version 1.18.3, if [Agent Remote Configuration][16] is enabled where this service runs, you can set `DD_LOGS_INJECTION` in the [Service Catalog][17] UI. |
| `DD_PROFILING_ENABLED`      | `dd.profiling.enabled`          | Enable the [Continuous Profiler][5] |
| `DD_SERVICE`   | `dd.service`     | The name of a set of processes that do the same job. Used for grouping stats for your application. |
| `DD_TRACE_SAMPLE_RATE` | `dd.trace.sample.rate` |   Set a sampling rate at the root of the trace for all services. <br><br>**Beta**: Starting in version 1.18.3, if [Agent Remote Configuration][16] is enabled where this service runs, you can set `DD_TRACE_SAMPLE_RATE` in the [Service Catalog][17] UI.     |
| `DD_TRACE_SAMPLING_RULES` | `dd.trace.sampling.rules` |   Set a sampling rate at the root of the trace for services that match the specified rule.    |
| `DD_VERSION` | `dd.version` |  Your application version (for example, `2.5`, `202003181415`, or `1.3-alpha`) |

Additional [configuration options](#configuration) are described below.


### Add the Java Tracer to the JVM

Use the documentation for your application server to figure out the right way to pass in `-javaagent` and other JVM arguments. Here are instructions for some commonly used frameworks:

{{< tabs >}}
{{% tab "Spring Boot" %}}

If your app is called `my_app.jar`, create a `my_app.conf`, containing:

```text
JAVA_OPTS=-javaagent:/path/to/dd-java-agent.jar
```

For more information, see the [Spring Boot documentation][1].


[1]: https://docs.spring.io/spring-boot/docs/current/reference/html/deployment.html#deployment-script-customization-when-it-runs
{{% /tab %}}
{{% tab "Tomcat" %}}

#### Linux

To enable tracing when running Tomcat on Linux:

1. Open your Tomcat startup script file, for example `setenv.sh`.
2. Add the following to `setenv.sh`:
   ```text
   CATALINA_OPTS="$CATALINA_OPTS -javaagent:/path/to/dd-java-agent.jar"
   ```

#### Windows (Tomcat as a Windows service)

To enable tracing when running Tomcat as a Windows service:

1. Open a Command Prompt.
1. Run the following command to update your Tomcat service configuration:
    ```shell
    tomcat8 //US//<SERVICE_NAME> --Environment="CATALINA_OPTS=%CATALINA_OPTS% -javaagent:\"c:\path\to\dd-java-agent.jar\""
    ```
   Replace `<SERVICE_NAME>` with the name of your Tomcat service and replace the path to `dd-java-agent.jar`.
1. Restart your Tomcat service for changes to take effect.

#### Windows (Tomcat with environment setup script)

To enable tracing when running Tomcat with an environment setup script:

1. Create `setenv.bat` in the `./bin` directory of the Tomcat project folder, if it doesn't already exist.
1. Add the following to `setenv.bat`:
   ```text
   set CATALINA_OPTS=%CATALINA_OPTS% -javaagent:"c:\path\to\dd-java-agent.jar"
   ```
If the previous step doesn't work, try adding the following instead:
```text
set JAVA_OPTS=%JAVA_OPTS% -javaagent:"c:\path\to\dd-java-agent.jar"
```

{{% /tab %}}
{{% tab "JBoss" %}}

- スタンドアロンモードの場合:

  `standalone.conf` の末尾に次の行を追加します。

```text
JAVA_OPTS="$JAVA_OPTS -javaagent:/path/to/dd-java-agent.jar"
```

- スタンドアロンモードと Windows の場合、`standalone.conf.bat` の最後に以下の行を追加します。

```text
set "JAVA_OPTS=%JAVA_OPTS% -javaagent:X:/path/to/dd-java-agent.jar"
```

- ドメインモードの場合:

  ファイル `domain.xml` の server-groups.server-group.jvm.jvm-options というタグの下に、以下の行を追加します。

```text
<option value="-javaagent:/path/to/dd-java-agent.jar"/>
```

詳細については、[JBoss のドキュメント][1]を参照してください。


[1]: https://access.redhat.com/documentation/en-us/red_hat_jboss_enterprise_application_platform/7.0/html/configuration_guide/configuring_jvm_settings
{{% /tab %}}
{{% tab "Jetty" %}}

`jetty.sh` を使用して Jetty をサービスとして開始する場合は、編集して次を追加します。

```text
JAVA_OPTIONS="${JAVA_OPTIONS} -javaagent:/path/to/dd-java-agent.jar"
```

`start.ini` を使用して Jetty を起動する場合は、次の行を追加します(`--exec` の下に。まだ存在しない場合は `--exec` 行を追加します)。

```text
-javaagent:/path/to/dd-java-agent.jar
```

{{% /tab %}}
{{% tab "WebSphere" %}}

管理コンソールで:

1. **Servers** を選択します。**Server Type** で、**WebSphere application servers** を選択し、サーバーを選択します。
2. **Java and Process Management > Process Definition** を選択します。
3. **Additional Properties** セクションで、**Java Virtual Machine** をクリックします。
4. **Generic JVM arguments** テキストフィールドに次のように入力します。

```text
-javaagent:/path/to/dd-java-agent.jar
```

詳細とオプションについては、[WebSphere のドキュメント][1]を参照してください。

[1]: https://www.ibm.com/support/pages/setting-generic-jvm-arguments-websphere-application-server
{{% /tab %}}
{{< /tabs >}}

**注**

- `-javaagent` 引数を `java -jar` コマンドに追加する場合は、アプリケーション引数としてではなく、JVM オプションとして `-jar` 引数の_前_に追加する必要があります。例:

   ```text
   java -javaagent:/path/to/dd-java-agent.jar -jar my_app.jar
   ```

     詳細については、[Oracle のドキュメント][7]を参照してください。

- classpath に `dd-java-agent` を追加しないでください。予期せぬ挙動が生じる場合があります。

## 自動インスツルメンテーション

Java の自動インスツルメンテーションは、[JVM によって提供される][8] `java-agent` インスツルメンテーション機能を使用します。`java-agent` が登録されている場合は、ロード時にクラスファイルを変更することができます。

**注:** リモート ClassLoader でロードされたクラスは、自動的にインスツルメンテーションされません。

インスツルメンテーションの由来は自動インスツルメンテーション、OpenTracing API、または両者の混合になる場合があります。一般的に、インスツルメンテーションは次の情報を取得します:

- OpenTracing API からタイムスタンプが提供されない限り、JVM の NanoTime クロックを使ってタイミング時間が取得されます
- キー/値タグペア
- アプリケーションによって処理されていないエラーとスタックトレース
- システムを通過するトレース (リクエスト) の合計数

## 構成

必要に応じて、統合サービスタグ付けの設定など、アプリケーションパフォーマンスのテレメトリーデータを送信するためのトレースライブラリーを構成します。詳しくは、[ライブラリの構成][9]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/tracing/compatibility_requirements/java
[2]: https://app.datadoghq.com/apm/service-setup
[3]: https://repo1.maven.org/maven2/com/datadoghq/dd-java-agent
[4]: /ja/account_management/billing/apm_tracing_profiler/
[5]: /ja/profiler/
[6]: /ja/tracing/other_telemetry/connect_logs_and_traces/java/
[7]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[8]: https://docs.oracle.com/javase/8/docs/api/java/lang/instrument/package-summary.html
[9]: /ja/tracing/trace_collection/library_config/java/
[10]: /ja/tracing/trace_collection/compatibility/java/#supported-jvm-runtimes
[11]: /ja/tracing/trace_collection/library_injection_local/
[16]: /ja/agent/remote_config/
[17]: https://app.datadoghq.com/services
[18]: /ja/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent
[19]: https://docs.oracle.com/en/java/javase/11/tools/jdeps.html
[20]: https://docs.github.com/en/account-and-profile/managing-subscriptions-and-notifications-on-github/managing-subscriptions-for-activity-on-github/viewing-your-subscriptions
[21]: https://github.com/DataDog/dd-trace-java/releases
[22]: https://docs.datadoghq.com/ja/getting_started/support/