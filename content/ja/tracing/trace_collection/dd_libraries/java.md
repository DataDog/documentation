---
aliases:
- /ja/tracing/java
- /ja/tracing/languages/java
- /ja/agent/apm/java/
- /ja/tracing/setup/java
- /ja/tracing/setup_overview/java
- /ja/tracing/setup_overview/setup/java
- /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/java
code_lang: java
code_lang_weight: 0
further_reading:
- link: https://github.com/DataDog/dd-trace-java
  tag: Source Code
  text: Datadog Java APMソースコード
- link: tracing/glossary/
  tag: Documentation
  text: サービス、リソース、トレースを調べる
title: Javaアプリケーションのトレース
type: multi-code-lang
---
## 互換性要件

最新のJava Tracerは、バージョン8以上のすべてのJVMをサポートしています。8 以下の JVM バージョンの詳細については、「 [Supported JVM runtimes][10] 」を参照してください。

DatadogのJavaバージョンとフレームワークのサポート（レガシーバージョンとメンテナンスバージョンを含む）の完全なリストについては、「[互換性要件][1]」を参照してください。

## はじめに

作業を開始する前に、[エージェントをインストール][18]して設定済みであることを確認してください。

### アプリケーションの計測

Datadog Agentをインストールして構成したら、次の手順では、トレースライブラリをアプリケーションに直接追加して計測します。[互換性情報][1]の詳細をお読みください。

アプリケーションのトレースを開始する

1. Datadogユーザーがアクセスできるフォルダに、最新のトレーサー・クラス・ファイルを含む`dd-java-agent.jar`をダウンロードします。

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

   **注:**特定の**メジャー**バージョンの最新ビルドをダウンロードするには、代わりに`https://dtdg.co/java-tracer-vX`リンクを使用してください。`X`は目的のメジャーバージョンです。
   たとえば、最新のバージョン1ビルドには`https://dtdg.co/java-tracer-v1`を使用します。マイナーバージョン番号は含めないでください。または、特定のバージョンについては Datadog の [Maven リポジトリ][3]を参照してください。

   **注意**:リリース候補版はGitHub [DataDog/dd-trace-javaリリース][21]で公開されている。これらはバージョンに「RC」があり、本番環境以外でのテストに推奨されます。[GitHubリリース通知][20]を購読することで、新しいリリース候補がテスト可能になったときに通知を受けることができます。リリース候補版で問題が発生した場合は、[Datadogサポート][22]にお問い合わせください。

2. IDE、Maven または Gradle のアプリケーションスクリプト、または `java -jar` コマンドから、連続プロファイラ、デプロイメントトラッキング、およびログインジェクション (Datadog にログを送信する場合) を使用してアプリを実行するには、必要に応じて `-javaagent` JVM 引数と以下の構成オプションを追加します。

    ```text
    java -javaagent:/path/to/dd-java-agent.jar -Ddd.profiling.enabled=true -Ddd.logs.injection=true -Ddd.service=my-app -Ddd.env=staging -Ddd.version=1.0 -jar path/to/your/app.jar
    ```
    **注意**:イメージのサイズを小さくしてモジュールを省略する必要が強い場合は、[`jdeps`][19]コマンドを使用して依存関係を特定できます。ただし、必要なモジュールは時間とともに変化する可能性がありますので、自己責任で行ってください。

    **注意**:Java 24+ のトレーサを有効にすると、JNI ネイティブアクセスまたは `sun.misc.Unsafe` メモリアクセスに関連する警告が表示されることがあります。`-javaagent:/path/to/dd-java-agent.jar` 引数の直前に環境変数 `--illegal-native-access=allow` と `--sun-misc-unsafe-memory-access=allow` を追加して、これらの警告を抑制します。詳細については、[JEP 472][23] および [JEP 498][24] を参照してください。

    <div class="alert alert-warning">プロファイリングを有効にすると、APMバンドルによっては課金に影響する場合があります。詳細については、<a href="https://docs.datadoghq.com/account_management/billing/apm_tracing_profiler/">価格ページ</a>を参照してください。</div>

|環境変数|システムプロパティ|説明|
| --------- | --------------------------------- | ------------ |
| `DD_ENV` | `dd.env` | お使いのアプリケーション環境（`production`、`staging`など） |
| `DD_LOGS_INJECTION` | `dd.logs.injection` | DatadogトレースIDとスパンIDの自動MDCキーインジェクションを有効にします。詳細は「[高度な使用][6]法」を参照してください。<br><br>バージョン1.18.3から、このサービスが実行される場所で[エージェントリモート構成][16]が有効になっている場合、[ソフトウェアカタログ][17]UIで`DD_LOGS_INJECTION`を設定できます。|
| `DD_PROFILING_ENABLED` | `dd.profiling.enabled` | [連続プロファイラ][5]を有効にする |
| `DD_SERVICE` | `dd.service` | 同じジョブを行う一連のプロセスの名前。アプリケーションの統計をグループ化するために使用します。|
| `DD_TRACE_SAMPLE_RATE` | `dd.trace.sample.rate` | すべてのサービスのトレースのルートにサンプリングレートを設定します。<br><br> バージョン1.18.3から、このサービスが実行される場所で[エージェントリモート構成][16]が有効になっている場合、[ソフトウェアカタログ][17]UIで`DD_TRACE_SAMPLE_RATE`を設定できます。|
| `DD_TRACE_SAMPLING_RULES` | `dd.trace.sampling.rules` | 指定したルールに一致するサービスのサンプリングレートをトレースのルートに設定します。 |
| `DD_VERSION` | `dd.version` | アプリケーションのバージョン（`2.5`、`202003181415`、`1.3-alpha`など） |

追加[の設定オプション](#configuration)については、後述します。


### JVMにJavaトレーサを追加する

`-javaagent`およびその他のJVM引数を渡す正しい方法を見つけるには、アプリケーションサーバーのドキュメントを参照してください。よく使用されるフレームワークの手順を次に示します。

{{< tabs >}}
{{% tab "Spring Boot" %}}

アプリが`my_app.jar`と呼ばれる場合は、`my_app.conf`を作成します。これには、

```text
JAVA_OPTS=-javaagent:/path/to/dd-java-agent.jar
```

詳細については、[スプリングブートのマニュアル][1]を参照してください。


[1]: https://docs.spring.io/spring-boot/docs/current/reference/html/deployment.html#deployment-script-customization-when-it-runs
{{% /tab %}}
{{% tab "Tomcat" %}}

#### Linux

LinuxでTomcatを実行するときにトレースを有効にするには、次の手順に従います。

1. Tomcatスタートアップスクリプトファイル(`setenv.sh`など)を開きます。
2. `setenv.sh`に以下を追加します。
   ```text
   CATALINA_OPTS="$CATALINA_OPTS -javaagent:/path/to/dd-java-agent.jar"
   ```

#### Windows（WindowsサービスとしてのTomcat）

Tomcat を Windows サービスとして実行する際にトレースを有効にするには、次の手順に従います。

1. Tomcat プロジェクトフォルダーの `./bin` ディレクトリにある "tomcat@VERSION_MAJOR@w.exe" メンテナンスユーティリティを開きます。
2. **Java**タブに移動し、`Java Options`に以下を追加します。
```text
-javaagent:C:\path\to\dd-java-agent.jar
```
3. Tomcat サービスを再起動して変更を有効にします。

{{% /tab %}}
{{% tab "JBoss" %}}

- スタンドアロンモードの場合：

  `standalone.conf`の最後に次の行を追加します。

```text
JAVA_OPTS="$JAVA_OPTS -javaagent:/path/to/dd-java-agent.jar"
```

- スタンドアロンモードおよびWindowsでは、`standalone.conf.bat`の最後に次の行を追加します。

```text
set "JAVA_OPTS=%JAVA_OPTS% -javaagent:X:/path/to/dd-java-agent.jar"
```

- ドメインモードでは、次の操作を行います。

  ファイル`domain.xml`の server-groups.server-group.jvm.jvm-options タグの下に次の行を追加します。

```text
<option value="-javaagent:/path/to/dd-java-agent.jar"/>
```

詳細については、[JBoss のマニュアルを参照してください][1]。


[1]: https://access.redhat.com/documentation/en-us/red_hat_jboss_enterprise_application_platform/7.0/html/configuration_guide/configuring_jvm_settings
{{% /tab %}}
{{% tab "Jetty" %}}

`jetty.sh`を使用してJettyをサービスとして起動する場合は、次のように編集します。

```text
JAVA_OPTIONS="${JAVA_OPTIONS} -javaagent:/path/to/dd-java-agent.jar"
```

Jettyを起動するのに`start.ini`を使用する場合は、次の行を追加します（`--exec`の下に、まだない場合は`--exec`行を追加します）。

```text
-javaagent:/path/to/dd-java-agent.jar
```

{{% /tab %}}
{{% tab "WebSphere" %}}

管理コンソールで、次の手順を実行します。

1. 「**サーバー」を**選択します。「**サーバーの種類**」で「**WebSphereアプリケーションサーバー**」を選択し、使用するサーバーを選択します。
2. [**Java and Process Management]>[Process Definition**]を選択します。
3. [**追加プロパティ**]セクションで、[**Java仮想マシン**]をクリックします。
4. 「**汎用JVM引数**」テキストフィールドに次のように入力します。

```text
-javaagent:/path/to/dd-java-agent.jar
```

その他の詳細とオプションについては、[WebSphereドキュメント][1]を参照してください。

[1]: https://www.ibm.com/support/pages/setting-generic-jvm-arguments-websphere-application-server
{{% /tab %}}
{{< /tabs >}}

**注**

- `java -jar`コマンドに`-javaagent`引数を追加する場合は、アプリケーション引数ではなくJVMオプションとして、`-jar`引数の_前に_追加する必要があります。例えば、

   ```text
   java -javaagent:/path/to/dd-java-agent.jar -jar my_app.jar
   ```

     詳細については、[Oracleのマニュアルを参照してください][7]。

- クラスパスに`dd-java-agent`を追加しないでください。予期しない動作を引き起こす可能性があります。

## 自動計装

Javaの自動計測では、[JVMが提供][8]する`java-agent`計測機能を使用します。`java-agent`を登録すると、ロード時にクラスファイルを変更できます。

**注:**リモートClassLoaderでロードされたクラスは自動的に計測されません。

計測は、自動計測、OpenTracing API、またはその両方を混合したものから行われる場合がある。計測では、一般的に次の情報が取得されます。

- OpenTracing APIからタイムスタンプが提供されない限り、タイミングの持続時間はJVMのNanoTimeクロックを使用してキャプチャされる
- キー/値タグのペア
- アプリケーションによって処理されないエラーとスタックトレース
- システム内を流れるトレース(リクエスト)の総数

## 構成

必要に応じて、ユニファイドサービスタギングの設定など、アプリケーションパフォーマンスのテレメトリデータを必要に応じて送信するようにトレースライブラリを構成します。詳細については、「[ライブラリ構成][9]」を参照してください。

### リモート設定

リモート構成では、Datadog Agentは、アプリケーションの再起動を必要とせずにトレース設定を動的に構成できます。デフォルトでは、リモート構成は有効になっています。無効にするには、環境変数を

```
DD_REMOTE_CONFIG_ENABLED=false
```

または、JVMシステムプロパティを追加します。

```
-Ddd.remote_config.enabled=false
```

## さらに読む

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
[16]: /ja/tracing/guide/remote_config
[17]: https://app.datadoghq.com/services
[18]: /ja/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent
[19]: https://docs.oracle.com/en/java/javase/11/tools/jdeps.html
[20]: https://docs.github.com/en/account-and-profile/managing-subscriptions-and-notifications-on-github/managing-subscriptions-for-activity-on-github/viewing-your-subscriptions
[21]: https://github.com/DataDog/dd-trace-java/releases
[22]: https://docs.datadoghq.com/ja/getting_started/support/
[23]: https://openjdk.org/jeps/472
[24]: https://openjdk.org/jeps/498