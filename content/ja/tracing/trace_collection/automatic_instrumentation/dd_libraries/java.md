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
  tag: GitHub
  text: Datadog Java APM ソースコード
- link: tracing/trace_collection/otel_instrumentation/java/
  tag: ドキュメント
  text: サービス、リソース、トレースの詳細
kind: ドキュメント
title: Java アプリケーションのトレース
type: multi-code-lang
---
## 互換性要件

最新の Java トレーサーは、バージョン 8 以上のすべての JVM をサポートしています。8 以下の JVM バージョンに関する追加情報は、[サポートする JVM ランタイム][10]をお読みください。

Datadog の Java バージョンとフレームワークのサポート一覧 (レガシーバージョンとメンテナンスバージョンを含む) については、[互換性要件][1]ページをご覧ください。

## はじめに

作業を始める前に、[Agent のインストールと構成][18]が済んでいることを確認してください。

### アプリケーションをインスツルメントする

Datadog Agent をインストールして構成したら、次はアプリケーションに直接トレーシングライブラリを追加してインスツルメントします。[互換性情報][1]の詳細をお読みください。

アプリケーションのトレースを開始するには

1. 最新のトレーサークラスファイルを含む `dd-java-agent.jar` を、Datadog ユーザーがアクセス可能なフォルダにダウンロードします。

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

   **注:** 特定の**メジャー**バージョンの最新ビルドをダウンロードするには、代わりに `https://dtdg.co/java-tracer-vX` リンクを使用してください。ここで `X` は希望するメジャーバージョンです。
例えば、バージョン 1 の最新ビルドには `https://dtdg.co/java-tracer-v1` を使用します。マイナーバージョン番号は含めてはいけません。または、特定のバージョンについては Datadog の [Maven リポジトリ][3]を参照してください。

2. IDE、Maven または Gradle アプリケーションスクリプト、`java -jar` コマンドから、Continuous Profiler、デプロイ追跡、ログ挿入（Datadog へログを送信する場合）を使用してアプリケーションを実行するには、`-javaagent` JVM 引数と、該当する以下のコンフィギュレーションオプションを追加します。

    ```text
    java -javaagent:/path/to/dd-java-agent.jar -Ddd.profiling.enabled=true -XX:FlightRecorderOptions=stackdepth=256 -Ddd.logs.injection=true -Ddd.service=my-app -Ddd.env=staging -Ddd.version=1.0 -jar path/to/your/app.jar
    ```
    イメージのサイズを削減し、モジュールを省略する必要性が強い場合は、[jdeps][19] コマンドを使って依存関係を特定することができます。しかし、必要なモジュールは時間の経過とともに変更される可能性がありますので、自己責任で行ってください。

   <div class="alert alert-danger">プロファイリングを有効にすると、APM バンドルによっては料金に影響が出る場合があります。詳しくは<a href="https://docs.datadoghq.com/account_management/billing/apm_tracing_profiler/">料金ページ</a>をご覧ください。</div>

| 環境変数      | システムプロパティ                     | 説明|
| --------- | --------------------------------- | ------------ |
| `DD_ENV`      | `dd.env`                  | アプリケーション環境（`production`、`staging` など） |
| `DD_LOGS_INJECTION`   | `dd.logs.injection`     | Datadog のトレース ID とスパン ID に対する MDC キーの自動挿入を有効にします。詳細については、[高度な使用方法][6]を参照してください。 <br><br>**ベータ版**: バージョン 1.18.3 から、このサービスが実行される場所で [Agent リモート構成][16]が有効になっている場合、[サービスカタログ][17] UI で `DD_LOGS_INJECTION` を設定できます。 |
| `DD_PROFILING_ENABLED`      | `dd.profiling.enabled`          | [継続的プロファイラー][5]を有効化 |
| `DD_SERVICE`   | `dd.service`     | 同一のジョブを実行するプロセスセットの名前。アプリケーションの統計のグループ化に使われます。 |
| `DD_TRACE_SAMPLE_RATE` | `dd.trace.sample.rate` |   すべてのサービスのトレースのルートでサンプリングレートを設定します。<br><br>**ベータ版**: バージョン 1.18.3 から、このサービスが実行される場所で [Agent リモート構成][16]が有効になっている場合、[サービスカタログ][17] UI で `DD_TRACE_SAMPLE_RATE` を設定できます。     |
| `DD_TRACE_SAMPLING_RULES` | `dd.trace.sampling.rules` |   指定したルールに合致するサービスのトレースのルートでのサンプリングレートを設定します。    |
| `DD_VERSION` | `dd.version` |  アプリケーションのバージョン (例: `2.5`、`202003181415`、`1.3-alpha`) |

追加の[コンフィギュレーションオプション](#configuration) は以下で説明されています。


### Java トレーサーを JVM に追加する

アプリケーションサーバーのドキュメントを使用して、`-javaagent` およびその他の JVM 引数を渡す正しい方法を確認してください。一般的に使用されるフレームワークの手順は次のとおりです。

{{< tabs >}}
{{% tab "Spring Boot" %}}

アプリの名前が `my_app.jar` の場合は、以下を含む `my_app.conf` を作成します。

```text
JAVA_OPTS=-javaagent:/path/to/dd-java-agent.jar
```

詳細については、[Spring Boot のドキュメント][1]を参照してください。


[1]: https://docs.spring.io/spring-boot/docs/current/reference/html/deployment.html#deployment-script-customization-when-it-runs
{{% /tab %}}
{{% tab "Tomcat" %}}

Tomcat 起動スクリプトファイル (たとえば、Linux では `setenv.sh`) を開き、次を追加します。

```text
CATALINA_OPTS="$CATALINA_OPTS -javaagent:/path/to/dd-java-agent.jar"
```

Windows では、`setenv.bat`:

```text
set CATALINA_OPTS=%CATALINA_OPTS% -javaagent:"c:\path\to\dd-java-agent.jar"
```
`setenv` ファイルが存在しない場合は、Tomcat プロジェクトフォルダーの `./bin` ディレクトリで作成します。

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

## セッションリプレイ

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