---
title: Java アプリケーションのトレース
aliases:
    - /tracing/java
    - /tracing/languages/java
    - /agent/apm/java/
    - /tracing/setup/java
    - /tracing/setup_overview/java
    - /tracing/setup_overview/setup/java
    - /tracing/trace_collection/automatic_instrumentation/dd_libraries/java
code_lang: java
type: multi-code-lang
code_lang_weight: 0
further_reading:
    - link: 'https://github.com/DataDog/dd-trace-java'
      tag: "Source Code"
      text: 'Datadog Java APM ソースコード'
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'サービス、リソース、トレースの調査'
---
## 互換性要件

最新の Java トレーサーは、バージョン 8 以降のすべての JVM をサポートしています。バージョン 8 より前の JVM の詳細については、[対応する JVM ランタイム][10]を参照してください。

Datadog の Java バージョンとフレームワークのサポート一覧 (レガシーバージョンとメンテナンスバージョンを含む) については、[互換性要件][1]を参照してください。

## はじめに

はじめる前に、[Agent のインストールと構成][18]が完了していることを確認してください。

### アプリケーションのインスツルメンテーション

Datadog Agentをインストールして構成した後、次の手順として、アプリケーションにトレースライブラリを直接追加し、そのアプリケーションをインスツルメントします。[互換性情報][1]の詳細を確認してください。

アプリケーションのトレースを開始するには

1. 最新のトレーサークラスファイルが含まれる `dd-java-agent.jar` を、Datadog ユーザーがアクセスできるフォルダにダウンロードします。

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

   **注:**特定の**メジャー**バージョンの最新ビルドをダウンロードするには、`https://dtdg.co/java-tracer-vX` リンクを使用してください。`X` は、目的のメジャーバージョンです。
   たとえば、バージョン 1 の最新ビルドの場合は、`https://dtdg.co/java-tracer-v1` を使用します。マイナーバージョン番号は含めないでください。または、Datadogの [Maven リポジトリ][3]で特定のバージョンを参照してください。

   **注**:リリース候補バージョンは、GitHub の [DataDog/dd-trace-java releases][21] で入手可能です。これらのバージョンにはバージョン番号に 「RC」が含まれ、実稼働環境以外でのテストに推奨されます。[GitHub のリリース通知を購読][20]すると、新しいリリース候補がテスト可能になったときに通知を受け取れます。リリース候補版で問題が発生した場合は、[Datadog サポート][22]までご連絡ください。

2. IDE、Maven または Gradle のアプリケーションスクリプト、または `java -jar` コマンドから、Continuous Profiler、デプロイ追跡、ログインジェクション (Datadog にログを送信している場合) を有効にしてアプリを実行するには、`-javaagent` JVM 引数と、該当する設定オプションを追加します。

    ```text
    java -javaagent:/path/to/dd-java-agent.jar -Ddd.profiling.enabled=true -Ddd.logs.injection=true -Ddd.service=my-app -Ddd.env=staging -Ddd.version=1.0 -jar path/to/your/app.jar
    ```
    **注**:イメージのサイズを縮小し、モジュールを省略する必要がある場合は、[`jdeps`][19] コマンドを使用して依存関係を特定できます。ただし、必要なモジュールは時間とともに変更されることがあるため、自己責任で行ってください。

    **注**:Java 24+ でトレーサーを有効にすると、JNI のネイティブアクセスまたは `sun.misc.Unsafe` メモリアクセスに関連する警告が表示されることがあります。これらの警告は、`-javaagent:/path/to/dd-java-agent.jar` 引数の直前に `--illegal-native-access=allow` および `--sun-misc-unsafe-memory-access=allow` 環境変数を追加することで抑制できます。詳細については、[JEP 472][23] および [JEP 498][24] を参照してください。

    <div class="alert alert-warning">プロファイリングを有効にすると、APM バンドルに応じて請求額に影響が出る場合があります。詳細については、<a href="https://docs.datadoghq.com/account_management/billing/apm_tracing_profiler/">料金ページ</a>を参照してください。</div>

| 環境変数 | システムプロパティ | 説明|
| --------- | --------------------------------- | ------------ |
| `DD_ENV` | `dd.env` | アプリケーション環境 (`production`, `staging`など) |
| `DD_LOGS_INJECTION` | `dd.logs.injection` | Datadogトレースとスパン ID の自動 MDC キー挿入を有効にします。詳細については、[高度な使用方法][6]を参照してください。<br><br>バージョン 1.18.3 以降、このサービスが実行される環境で [エージェントのリモート構成][16]が有効になっている場合は、[Software Catalog][17] UI で `DD_LOGS_INJECTION` を設定できます。
| `DD_PROFILING_ENABLED` | `dd.profiling.enabled` | [Continuous Profiler][5] の有効化 |
| `DD_SERVICE` | `dd.service` | 同じジョブを実行する一連のプロセスの名前。アプリケーションの統計情報をグループ化するために使用されます。|
| `DD_TRACE_SAMPLE_RATE` | `dd.trace.sample.rate` | すべてのサービスのトレースのルートでサンプリングレートを設定します。<br><br> バージョン 1.18.3 以降、このサービスが実行される環境で [エージェントのリモート構成][16]が有効になっている場合は、[Software Catalog][17] UI で `DD_TRACE_SAMPLE_RATE` を設定できます。|
| `DD_TRACE_SAMPLING_RULES` | `dd.trace.sampling.rules` | 指定したルールに合致するサービスのトレースのルートでサンプリングレートを設定します。|
| `DD_VERSION` | `dd.version` | アプリケーションバージョン (例: `2.5`、`202003181415`、`1.3-alpha` など) |

その他の [構成オプション](#configuration)は、以下で説明します。


### JVM への Java トレーサーの追加

アプリケーションサーバーのドキュメントを参照して、`-javaagent` と他の JVM 引数を正しく渡す方法を確認してください。一般的に使用されるフレームワークの手順は次のとおりです。

{{< tabs >}}
{{% tab "Spring Boot" %}}

アプリの名前が `my_app.jar` の場合、以下を含む `my_app.conf` を作成します。

```text
JAVA_OPTS=-javaagent:/path/to/dd-java-agent.jar
```

詳細については、[Spring Boot のドキュメント][1]を参照してください。


[1]: https://docs.spring.io/spring-boot/docs/current/reference/html/deployment.html#deployment-script-customization-when-it-runs
{{% /tab %}}
{{% tab "Tomcat" %}}

#### Linux

Linux で Tomcat を実行する際にトレースを有効にするには

1. Tomcat の起動スクリプトファイル (例: `setenv.sh`) を開きます。
2. `setenv.sh` に次の内容を追加します。
   ```text
   CATALINA_OPTS="$CATALINA_OPTS -javaagent:/path/to/dd-java-agent.jar"
   ```

#### Windows (Windows サービスとしての Tomcat)

Windows サービスとして Tomcat を実行する際にトレースを有効にするには

1. Tomcat プロジェクトフォルダの `./bin` ディレクトリにあるメンテナンスユーティリティ "tomcat@VERSION_MAJOR@w.exe
" を開きます。
2. **\[Java]** タブに移動し、`Java Options`に次の内容を追加します。
```text
-javaagent:C:\path\to\dd-java-agent.jar
```
3. Tomcat サービスを再起動して、変更を有効にします。

{{% /tab %}}
{{% tab "JBoss" %}}

- スタンドアロンモードの場合:

  `standalone.conf` の末尾に次の行を追加します。

```text
JAVA_OPTS="$JAVA_OPTS -javaagent:/path/to/dd-java-agent.jar"
```

- Windows でスタンドアロンモードを使用している場合は、`standalone.conf.bat` の末尾に次の行を追加します。

```text
set "JAVA_OPTS=%JAVA_OPTS% -javaagent:X:/path/to/dd-java-agent.jar"
```

- ドメインモードの場合:

  `domain.xml` ファイルの server-groups.server-group.jvm.jvm-options タグの下に、次の行を追加します。

\`\`\`text
<option value="-javaagent:/path/to/dd-java-agent.jar"/>
```

詳細については、[JBoss のドキュメント][1]を参照してください。


[1]: https://access.redhat.com/documentation/en-us/red_hat_jboss_enterprise_application_platform/7.0/html/configuration_guide/configuring_jvm_settings
{{% /tab %}}
{{% tab "Jetty" %}}

`jetty.sh` を使用して Jetty をサービスとして起動する場合は、次の内容を追加します。

```text
JAVA_OPTIONS="${JAVA_OPTIONS} -javaagent:/path/to/dd-java-agent.jar"
```

`start.ini` を使用して Jetty を起動する場合は、次の行を追加します (`--exec` の下に追加します。`--exec` 行がない場合は、追加してください)。

```text
-javaagent:/path/to/dd-java-agent.jar
```

{{% /tab %}}
{{% tab "WebSphere" %}}

管理コンソールで:

1. **Servers** を選択します。**Server Type** で、**WebSphere application servers** を選択し、対象のサーバーを選択します。
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

- `java -jar` コマンドに `-javaagent` 引数を追加する場合は、`-jar` 引数の _前_に JVM オプションとして追加してください。アプリケーションの引数として追加しないでください。たとえば、以下のとおりです。

   ```text
   java -javaagent:/path/to/dd-java-agent.jar -jar my_app.jar
   ```

     詳細については、[Oracle のドキュメント][7]を参照してください。

- クラスパスに `dd-java-agent` を追加しないでください。予期しない動作が発生する可能性があります。

## 自動インスツルメンテーション

Java の自動インスツルメンテーションでは、[JVM が提供する][8] `java-agent` のインスツルメンテーション機能を使用します。`java-agent`が登録されている場合、ロード時にクラスファイルを修正できます。

**注:**リモート ClassLoader でロードされたクラスは、自動的にインスツルメンテーションされません。

インスツルメンテーションは、自動インスツルメンテーション、OpenTracing API、またはその両方の組み合わせによって提供される場合があります。インスツルメンテーションでは、通常、以下の情報が収集されます。

- 経過時間。OpenTracing API からタイムスタンプが提供されない場合、JVM の NanoTime クロックが使用されます
- キー/値タグペア
- アプリケーションによって処理されていないエラーとスタックトレース
- システムを通過するトレース (リクエスト) の合計数

## 構成

必要に応じて、統合サービスタグ付けの設定など、アプリケーションパフォーマンスのテレメトリーデータを送信するためのトレースライブラリを構成します。詳細については、[ライブラリの構成][9]を参照してください。

### リモート構成

リモート構成を使用すると、Datadog Agent はアプリケーションを再起動せずにトレース設定を動的に構成できます。デフォルトでは、リモート構成は有効になっています。無効にするには、以下のように環境変数を設定します。

```
DD_REMOTE_CONFIG_ENABLED=false
```

または、以下の JVM システムプロパティを追加します。

```
-Ddd.remote_config.enabled=false
```

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /tracing/compatibility_requirements/java
[2]: https://app.datadoghq.com/apm/service-setup
[3]: https://repo1.maven.org/maven2/com/datadoghq/dd-java-agent
[4]: /account_management/billing/apm_tracing_profiler/
[5]: /profiler/
[6]: /tracing/other_telemetry/connect_logs_and_traces/java/
[7]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[8]: https://docs.oracle.com/javase/8/docs/api/java/lang/instrument/package-summary.html
[9]: /tracing/trace_collection/library_config/java/
[10]: /tracing/trace_collection/compatibility/java/#supported-jvm-runtimes
[11]: /tracing/trace_collection/library_injection_local/
[16]: /tracing/guide/remote_config
[17]: https://app.datadoghq.com/services
[18]: /tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent
[19]: https://docs.oracle.com/en/java/javase/11/tools/jdeps.html
[20]: https://docs.github.com/en/account-and-profile/managing-subscriptions-and-notifications-on-github/managing-subscriptions-for-activity-on-github/viewing-your-subscriptions
[21]: https://github.com/DataDog/dd-trace-java/releases
[22]: https://docs.datadoghq.com/getting_started/support/
[23]: https://openjdk.org/jeps/472
[24]: https://openjdk.org/jeps/498
