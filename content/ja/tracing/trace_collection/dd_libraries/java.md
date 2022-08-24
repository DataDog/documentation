---
aliases:
- /ja/tracing/java
- /ja/tracing/languages/java
- /ja/agent/apm/java/
- /ja/tracing/setup/java
- /ja/tracing/setup_overview/java
- /ja/tracing/setup_overview/setup/java
code_lang: java
code_lang_weight: 0
further_reading:
- link: https://github.com/DataDog/dd-trace-java
  tag: GitHub
  text: Datadog Java APM ソースコード
- link: tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースの詳細
kind: documentation
title: Java アプリケーションのトレース
type: multi-code-lang
---
## 互換性要件

最新の Java トレーサーは、すべてのプラットフォームの JVM バージョン 7 以降に対応しています。

Datadog の Java バージョンとフレームワークのサポート一覧 (レガシーバージョンとメンテナンスバージョンを含む) については、[互換性要件][2]ページをご覧ください。

## インストールと利用開始

### アプリ内のドキュメントに従ってください (推奨)

Datadog アプリ内の[クイックスタート手順][3]に従って、最高のエクスペリエンスを実現します。例:

- デプロイコンフィギュレーション (ホスト、Docker、Kubernetes、または Amazon ECS) を範囲とする段階的な手順。
- `service`、`env`、`version` タグを動的に設定します。
- セットアップ中に Continuous Profiler、トレースの 100% の取り込み、およびトレース ID 挿入を有効にします。

### APM に Datadog Agent を構成する

インスツルメントされたアプリケーションからトレースを受信するように Datadog Agent をインストールして構成します。デフォルトでは、Datadog Agent は `apm_config` 下にある  `datadog.yaml` ファイルの `enabled: true` で有効になっており、`http://localhost:8126` でトレースデータをリッスンします。コンテナ化環境の場合、以下のリンクに従って、Datadog Agent 内でトレース収集を有効にします。

{{< tabs >}}
{{% tab "コンテナ" %}}

1. メイン [`datadog.yaml` コンフィギュレーションファイル][1]の `apm_config` セクションで `apm_non_local_traffic: true` を設定します。

2. コンテナ化された環境でトレースを受信するように Agent を構成する方法については、それぞれの説明を参照してください。

{{< partial name="apm/apm-containers.html" >}}
</br>

3. アプリケーションがインスツルメントされた後、トレースクライアントはデフォルトで Unix ドメインソケット `/var/run/datadog/apm.socket` にトレースを送信しようとします。ソケットが存在しない場合、トレースは `http://localhost:8126` に送信されます。

   別のソケット、ホスト、またはポートが必要な場合は、環境変数 `DD_TRACE_AGENT_URL` を使用します。以下にいくつかの例を示します。

   ```
   DD_TRACE_AGENT_URL=http://custom-hostname:1234
   DD_TRACE_AGENT_URL=unix:///var/run/datadog/apm.socket
   ```

   ```bash
   java -javaagent:<DD-JAVA-AGENT-PATH>.jar -jar <YOUR_APPLICATION_PATH>.jar
   ```

   システムプロパティを使うこともできます:

   ```bash
   java -javaagent:<DD-JAVA-AGENT-PATH>.jar \
       -Ddd.trace.agent.url=$DD_TRACE_AGENT_URL \
       -jar <YOUR_APPLICATION_PATH>.jar
   ```

   同様に、トレースクライアントは Unix ドメインソケット `/var/run/datadog/dsd.socket` に統計情報を送信しようと試みます。ソケットが存在しない場合、統計情報は `http://localhost:8125` に送信されます。

{{< site-region region="us3,us5,eu,gov" >}}

4. Datadog Agent の `DD_SITE` を {{< region-param key="dd_site" code="true" >}} に設定して、Agent が正しい Datadog の場所にデータを送信するようにします。

{{< /site-region >}}

[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "AWS Lambda" %}}

AWS Lambda で Datadog APM を設定するには、[サーバーレス関数のトレース][1]ドキュメントを参照してください。


[1]: /ja/tracing/serverless_functions/
{{% /tab %}}
{{% tab "その他の環境" %}}

トレースは、[Heroku][1]、[Cloud Foundry][2]、[AWS Elastic Beanstalk][3]、[Azure App Service][4] など、他の多くの環境で利用できます。

その他の環境については、その環境の[インテグレーション][5]のドキュメントを参照し、セットアップの問題が発生した場合は[サポートにお問い合わせ][6]ください。

[1]: /ja/agent/basic_agent_usage/heroku/#installation
[2]: /ja/integrations/cloud_foundry/#trace-collection
[3]: /ja/integrations/amazon_elasticbeanstalk/
[4]: /ja/infrastructure/serverless/azure_app_services/#overview
[5]: /ja/integrations/
[6]: /ja/help/
{{% /tab %}}
{{< /tabs >}}

### アプリケーションのインスツルメンテーション

Agent のインストール後、アプリケーションをトレースする場合は以下の操作を行ってください。

1. 最新の Agent クラスファイルが含まれる `dd-java-agent.jar` をダウンロードします:

   ```shell
   wget -O dd-java-agent.jar https://dtdg.co/latest-java-tracer
   ```
   特定のトレーサーバージョンにアクセスするには、Datadog の [Maven リポジトリ][4]を参照してください。

2. IDE、Maven または Gradle アプリケーションスクリプト、`java -jar` コマンドから、Continuous Profiler、デプロイ追跡、ログ挿入（Datadog へログを送信する場合）を使用してアプリケーションを実行するには、`-javaagent` JVM 引数と、該当する以下のコンフィギュレーションオプションを追加します。

    ```text
    java -javaagent:/path/to/dd-java-agent.jar -Ddd.profiling.enabled=true -XX:FlightRecorderOptions=stackdepth=256 -Ddd.logs.injection=true -Ddd.service=my-app -Ddd.env=staging -jar path/to/your/app.jar -Ddd.version=1.0
    ```

    **注:** プロファイリングを有効にすると、APM のバンドルによっては請求に影響を与える場合があります。詳しくは、[料金ページ][5]を参照してください。

| 環境変数      | システムプロパティ                     | 説明|
| --------- | --------------------------------- | ------------ |
| `DD_ENV`      | `dd.env`                  | アプリケーション環境（`production`、`staging` など） |
| `DD_SERVICE`   | `dd.service`     | 同一のジョブを実行するプロセスセットの名前。アプリケーションの統計のグループ化に使われます。 |
| `DD_VERSION` | `dd.version` |  アプリケーションのバージョン（例: `2.5`、`202003181415`、`1.3-alpha` など） |
| `DD_PROFILING_ENABLED`      | `dd.profiling.enabled`          | [継続的プロファイラー][6]を有効化 |
| `DD_LOGS_INJECTION`   | `dd.logs.injection`     | Datadog トレース ID とスパン ID に対する自動 MDC キー挿入を有効にします。詳しくは、[高度な使用方法][7]を参照してください。 |
| `DD_TRACE_SAMPLE_RATE` | `dd.trace.sample.rate` |   全サービスのトレースのルートでサンプリングレートを設定します。     |
| `DD_TRACE_SAMPLING_SERVICE_RULES` | `dd.trace.sampling.service.rules` |   指定したルールに合致するサービスのトレースのルートでのサンプリングレートを設定します。    |

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

     詳細については、[Oracle のドキュメント][8]を参照してください。

- classpath に `dd-java-agent` を追加しないでください。予期せぬ挙動が生じる場合があります。

## 自動インスツルメンテーション

Java の自動インスツルメンテーションは、[JVM によって提供される][9] `java-agent` インスツルメンテーション機能を使用します。`java-agent` が登録されている場合は、ロード時にクラスファイルを変更することができます。

**注:** リモート ClassLoader でロードされたクラスは、自動的にインスツルメンテーションされません。

インスツルメンテーションの由来は自動インスツルメンテーション、OpenTracing API、または両者の混合になる場合があります。一般的に、インスツルメンテーションは次の情報を取得します:

- OpenTracing API からタイムスタンプが提供されない限り、JVM の NanoTime クロックを使ってタイミング時間が取得されます
- キー/値タグペア
- アプリケーションによって処理されていないエラーとスタックトレース
- システムを通過するトレース (リクエスト) の合計数

## コンフィギュレーション

必要に応じて、統合サービスタグ付けの設定など、アプリケーションパフォーマンスのテレメトリーデータを送信するためのトレースライブラリーを構成します。詳しくは、[ライブラリの構成][10]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/profiler/enabling/?code-lang=java
[2]: /ja/tracing/compatibility_requirements/java
[3]: https://app.datadoghq.com/apm/docs
[4]: https://repo1.maven.org/maven2/com/datadoghq/dd-java-agent
[5]: /ja/account_management/billing/apm_tracing_profiler/
[6]: /ja/profiler/
[7]: /ja/tracing/other_telemetry/connect_logs_and_traces/java/
[8]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[9]: https://docs.oracle.com/javase/8/docs/api/java/lang/instrument/package-summary.html
[10]: /ja/tracing/trace_collection/library_config/java/