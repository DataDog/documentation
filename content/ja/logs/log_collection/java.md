---
aliases:
- /ja/logs/languages/java
further_reading:
- link: /logs/log_configuration/processors
  tag: Documentation
  text: ログの処理方法
- link: /logs/log_configuration/parsing
  tag: Documentation
  text: パースの詳細
- link: /logs/explorer/
  tag: Documentation
  text: ログの調査方法
- link: /logs/explorer/#visualize
  tag: Documentation
  text: ログ分析の実行
- link: /tracing/other_telemetry/connect_logs_and_traces/java/
  tag: Documentation
  text: ログとトレースの接続
- link: /logs/faq/log-collection-troubleshooting-guide/
  tag: よくあるご質問
  text: ログ収集のトラブルシューティングガイド
- link: https://www.datadoghq.com/blog/java-logging-guide/
  tag: ブログ
  text: Java ログの収集、カスタマイズ、標準化方法
- link: /glossary/#tail
  tag: 用語集
  text: 用語集 "テール" の項目
title: Java ログ収集
---

ログを Datadog に送信するには、ファイルにログを記録し、そのファイルを Datadog Agent で[テール][14]します。

一般的な Java ログのスタックトレースは複数の行に分割されているため、元のログイベントに関連付けることが困難です。例:

```java
//1 つのはずのイベントに、4 つのイベントが生成される
Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
```

この問題を解決するには、ログを JSON 形式で生成するようにログライブラリを構成します。JSON にログすると、次のことができます。

* スタックトレースがログイベントに適切にラップされることを確実にします。
* すべてのログイベント属性 (重大度、ロガー名、スレッド名など) が適切に抽出されることを確実にします。
* [マップされた診断コンテキスト (MDC)][1] 属性にアクセスできます。この属性は、任意のログイベントにアタッチできます。
* [カスタムパースルール][2]が不要になります。

次の手順は、Log4j、Log4j 2、および Logback ログライブラリのセットアップ例を示しています。

## ロガーの構成

### JSON 形式

{{< tabs >}}
{{% tab "Log4j" %}}

Log4j の場合、SLF4J モジュール [log4j-over-slf4j][1] を Logback と組み合わせて使用して JSON 形式でログします。`log4j-over-slf4j` は、アプリケーションの Log4j を完全に置き換えるため、コードを変更する必要はありません。これを使用するには

1. `pom.xml` ファイルで、`log4j.jar` 依存関係を `log4j-over-slf4j.jar` 依存関係に置き換え、Logback 依存関係を追加します。
    ```xml
    <dependency>
      <groupId>org.slf4j</groupId>
      <artifactId>log4j-over-slf4j</artifactId>
      <version>1.7.32</version>
    </dependency>
    <dependency>
      <groupId>ch.qos.logback</groupId>
      <artifactId>logback-classic</artifactId>
      <version>1.2.9</version>
    </dependency>
    <dependency>
      <groupId>net.logstash.logback</groupId>
      <artifactId>logstash-logback-encoder</artifactId>
      <version>6.6</version>
    </dependency>
    ```
2. `logback.xml` の JSON レイアウトを使用してアペンダーを構成します。

   ファイル:

    ```xml
    <configuration>
      <appender name="FILE" class="ch.qos.logback.core.FileAppender">
        <file>logs/app.log</file>
        <encoder class="net.logstash.logback.encoder.LogstashEncoder" />
      </appender>

      <root level="INFO">
        <appender-ref ref="FILE"/>
      </root>
    </configuration>
    ```

   コンソール:

    ```xml
    <configuration>
      <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
          <encoder class="ch.qos.logback.classic.encoder.JsonEncoder"/>
      </appender>

      <root>
        <level value="DEBUG"/>
          <appender-ref ref="CONSOLE"/>
        </root>
    </configuration>
    ```

[1]: http://www.slf4j.org/legacy.html#log4j-over-slf4j
{{% /tab %}}
{{% tab "Log4j 2" %}}

Log4j 2 には JSON レイアウトが含まれています。

1. `log4j2.xml` の JSON レイアウトを使用してアペンダーを構成します。

   ファイルアペンダー:

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <Configuration>
      <Appenders>
        <File name="FILE" fileName="logs/app.log" >
          <JSONLayout compact="true" eventEol="true" properties="true" stacktraceAsString="true" />
        </File>
      </Appenders>

      <Loggers>
        <Root level="INFO">
          <AppenderRef ref="FILE"/>
        </Root>
      </Loggers>
    </Configuration>
    ```

   コンソールアペンダー:

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <Configuration>

        <Appenders>
            <Console name="console" target="SYSTEM_OUT">
                <JSONLayout compact="true" eventEol="true" properties="true" stacktraceAsString="true" />
            </Console>
        </Appenders>

        <Loggers>
            <Root level="INFO">
                <AppenderRef ref="console"/>
            </Root>

        </Loggers>
    </Configuration>
    ```

2. JSON レイアウトの依存関係を `pom.xml` に追加します。
    ```xml
    <dependency>
        <groupId>org.apache.logging.log4j</groupId>
        <artifactId>log4j-core</artifactId>
        <version>2.17.1</version>
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-core</artifactId>
        <version>2.13.0</version>
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
        <version>2.13.0</version>
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-annotations</artifactId>
        <version>2.13.0</version>
    </dependency>
    ```

{{% /tab %}}
{{% tab "Logback" %}}

Logback の JSON 形式のログには、[logstash-logback-encoder][1] を使用します。

1. `logback.xml` の JSON レイアウトを使用してファイルアペンダーを構成します。

    ```xml
    <configuration>
      <appender name="FILE" class="ch.qos.logback.core.FileAppender">
        <file>logs/app.log</file>
        <encoder class="net.logstash.logback.encoder.LogstashEncoder" />
      </appender>

      <root level="INFO">
        <appender-ref ref="FILE"/>
      </root>
    </configuration>
    ```

2. Logstash エンコーダの依存関係を `pom.xml` ファイルに追加します。

    ```xml
    <dependency>
      <groupId>ch.qos.logback</groupId>
      <artifactId>logback-classic</artifactId>
      <version>1.2.9</version>
    </dependency>
    <dependency>
      <groupId>net.logstash.logback</groupId>
      <artifactId>logstash-logback-encoder</artifactId>
      <version>6.6</version>
    </dependency>
    ```

[1]: https://github.com/logstash/logstash-logback-encoder
{{% /tab %}}
{{% tab "Tinylog" %}}

[Tinylog 公式ドキュメント][1]に基づいて、JSON ライターの構成を作成します。


`tinylog.properties` ファイルには以下のフォーマットを使用します。

```properties
writer                     = json
writer.file                = log.json
writer.format              = LDJSON
writer.level               = info
writer.field.level         = level
writer.field.source        = {class}.{method}()
writer.field.message       = {message}
writer.field.dd.trace_id   = {context: dd.trace_id}
writer.field.dd.span_id    = {context: dd.span_id}
writer.field.dd.service    = {context: dd.service}
writer.field.dd.version    = {context: dd.version}
writer.field.dd.env        = {context: dd.env}
```

[1]: https://tinylog.org/v2/configuration/#json-writer
{{% /tab %}}
{{< /tabs >}}

#### ログへのトレース ID の挿入

このアプリケーションで APM が有効になっている場合は、トレース ID インジェクションを有効にすることで、ログとトレースを相互に関連付けることができます。詳細については、[Java ログとトレースの接続][3]を参照してください。

### 未加工の形式

{{< tabs >}}
{{% tab "Log4j" %}}

`log4j.xml` でファイルアペンダーを構成します。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE log4j:configuration SYSTEM "log4j.dtd">
<log4j:configuration>

  <appender name="FILE" class="org.apache.log4j.FileAppender">
    <param name="File" value="logs/app.log"/>
    <param name="Append" value="true"/>

    <layout class="org.apache.log4j.PatternLayout">
      <param name="ConversionPattern" value="%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %X{dd.trace_id} %X{dd.span_id} - %m%n"/>
    </layout>
  </appender>

  <root>
    <priority value="INFO"/>
    <appender-ref ref="FILE"/>
  </root>

</log4j:configuration>
```

{{% /tab %}}
{{% tab "Log4j 2" %}}

`log4j2.xml` でファイルアペンダーを構成します。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration>
  <Appenders>
    <File name="FILE" fileName="logs/app.log">
      <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %X{dd.trace_id} %X{dd.span_id} - %m%n"/>
    </File>
  </Appenders>

  <Loggers>
    <Root level="INFO">
      <AppenderRef ref="FILE"/>
    </Root>
  </Loggers>
</Configuration>
```

{{% /tab %}}
{{% tab "Logback" %}}

`logback.xml` でファイルアペンダーを構成します。

```xml
<configuration>
  <appender name="FILE" class="ch.qos.logback.core.FileAppender">
    <file>${dd.test.logfile}</file>
    <append>false</append>
    <immediateFlush>true</immediateFlush>

    <encoder>
      <pattern>%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %X{dd.trace_id} %X{dd.span_id} - %m%n</pattern>
    </encoder>
  </appender>

  <root level="INFO">
    <appender-ref ref="FILE"/>
  </root>
</configuration>
```

{{% /tab %}}
{{% tab "Tinylog" %}}

[Tinylog 公式ドキュメント][1]に基づいて、ファイルに出力するライターの構成を作成します。


`tinylog.properties` ファイルには以下のフォーマットを使用します。

```properties
writer          = file
writer.level    = debug
writer.format   = {level} - {message} - "dd.trace_id":{context: dd.trace_id} - "dd.span_id":{context: dd.span_id}
writer.file     = log.txt
```

[1]: https://tinylog.org/v2/configuration/#json-writer
{{% /tab %}}
{{< /tabs >}}

#### ログへのトレース ID の挿入

このアプリケーションで APM が有効になっている場合は、トレース ID インジェクションを有効にすることで、ログとトレースを相互に関連付けることができます。[Java ログとトレースの接続][3]を参照してください。

ログとトレースを相関させていない場合は、上記の構成例に含まれているログパターンから MDC プレースホルダー (`%X{dd.trace_id} %X{dd.span_id}`) を削除できます。


## Datadog Agent の構成

[ログ収集が有効][4]になったら、ログファイルを追跡して Datadog に送信する[カスタムログ収集][5]を設定します。

1. `java.d/` フォルダーを `conf.d/` [Agent 構成ディレクトリ][6]に作成します。
2. `java.d/` に以下の内容で `conf.yaml` ファイルを作成します。

    ```yaml
    #Log section
    logs:

      - type: file
        path: "<path_to_your_java_log>.log"
        service: <service_name>
        source: java
        sourcecategory: sourcecode
        # For multiline logs, if they start by the date with the format yyyy-mm-dd uncomment the following processing rule
        #log_processing_rules:
        #  - type: multi_line
        #    name: new_log_start_with_date
        #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
    ```

3. [Agent を再起動します][7]。
4. [Agent の status サブコマンド][8]を実行し、`Checks` セクションで `java` を探し、ログが Datadog に正常に送信されることを確認します。

ログが JSON 形式の場合、Datadog は自動的にログメッセージを[パース][9]し、ログ属性を抽出します。[ログエクスプローラー][10]を使用して、ログを表示し、トラブルシューティングを行うことができます。

## エージェントレスのログ収集

アクセスできない、またはファイルにログを記録できないマシンでアプリケーションが実行されている例外的なケースでは、ログを Datadog または Datadog Agent に直接ストリーミングすることができます。アプリケーションが接続の問題を処理する必要があるため、これは推奨される設定ではありません。

ログを Datadog に直接ストリーミングするには

1. Logback ログライブラリをコードに追加するか、**現在のロガーを Logback にブリッジ**します。
2. **Logback を構成**して Datadog にログを送信します。

### Java ロギングライブラリから Logback へのブリッジ

まだ Logback を使用していない場合、ほとんどの一般的なログライブラリは Logback にブリッジすることができます。

{{< tabs >}}
{{% tab "Log4j" %}}

SLF4J モジュール [log4j-over-slf4j][1] を Logback とともに使用して、ログを別のサーバーに送信します。`log4j-over-slf4j` は、アプリケーションの Log4j を完全に置き換えるため、コードを変更する必要はありません。これを使用するには

1. `pom.xml` ファイルで、`log4j.jar` 依存関係を `log4j-over-slf4j.jar` 依存関係に置き換え、Logback 依存関係を追加します。
    ```xml
    <dependency>
      <groupId>org.slf4j</groupId>
      <artifactId>log4j-over-slf4j</artifactId>
      <version>1.7.32</version>
    </dependency>
    <dependency>
      <groupId>ch.qos.logback</groupId>
      <artifactId>logback-classic</artifactId>
      <version>1.2.9</version>
    </dependency>
    <dependency>
      <groupId>net.logstash.logback</groupId>
      <artifactId>logstash-logback-encoder</artifactId>
      <version>6.6</version>
    </dependency>
    ```
2. Logback を構成します。

**注:** この変更の結果、Log4j コンフィギュレーションファイルは使用されなくなります。[Log4j トランスレーター][2] を使用して `log4j.properties` ファイルを `logback.xml` に移行してください。


[1]: http://www.slf4j.org/legacy.html#log4j-over-slf4j
[2]: http://logback.qos.ch/translator/
{{% /tab %}}

{{% tab "Log4j 2" %}}

Log4j 2 では、リモートホストへのログ記録が可能ですが、ログの前に API キーを付ける機能はありません。このため、SLF4J モジュール [log4j-over-slf4j][1] と Logback を使用してください。`log4j-to-slf4j.jar` は、アプリケーションの Log4j 2 を完全に置き換えるため、コードを変更する必要はありません。これを使用するには

1. `pom.xml` ファイルで、`log4j.jar` 依存関係を `log4j-over-slf4j.jar` 依存関係に置き換え、Logback 依存関係を追加します。
    ```xml
    <dependency>
        <groupId>org.apache.logging.log4j</groupId>
        <artifactId>log4j-to-slf4j</artifactId>
        <version>2.17.1</version>
    </dependency>
    <dependency>
        <groupId>ch.qos.logback</groupId>
        <artifactId>logback-classic</artifactId>
        <version>1.2.9</version>
    </dependency>
    <dependency>
        <groupId>net.logstash.logback</groupId>
        <artifactId>logstash-logback-encoder</artifactId>
        <version>6.6</version>
    </dependency>

    ```
2. Logback を構成します。

**注:**

- https://logging.apache.org/log4j/log4j-2.2/log4j-to-slf4j/index.html で説明されているように、`log4j-slf4j-impl.jar` が**使用されていない**ことを確認します。
- この移行の結果、Log4j 2 コンフィギュレーションファイルは使用されなくなります。[Log4j トランスレーター][2] を使用して `log4j.properties` ファイルを `logback.xml` に移行してください。

[1]: http://www.slf4j.org/legacy.html#log4j-over-slf4j
[2]: http://logback.qos.ch/translator
{{% /tab %}}

{{< /tabs >}}

### Logback を構成する

[logstash-logback-encoder][11] ログライブラリを Logback と一緒に使用して、ログを Datadog に直接ストリーミングします。

1. `logback.xml` ファイルに TCP アペンダーを構成します。この構成では、API キーは環境変数 `DD_API_KEY` から取得されます。あるいは、コンフィギュレーションファイルに直接 API キーを挿入することもできます。

    {{< site-region region="us,us3,us5,ap1" >}}

  ```xml
  <configuration>
    <appender name="FILE" class="ch.qos.logback.core.FileAppender">
      <file>logs/app.log</file>
      <encoder class="net.logstash.logback.encoder.LogstashEncoder" />
    </appender>
    <appender name="JSON_TCP" class="net.logstash.logback.appender.LogstashTcpSocketAppender">
      <destination>intake.logs.datadoghq.com:10516</destination>
      <keepAliveDuration>20 seconds</keepAliveDuration>
      <encoder class="net.logstash.logback.encoder.LogstashEncoder">
          <prefix class="ch.qos.logback.core.encoder.LayoutWrappingEncoder">
              <layout class="ch.qos.logback.classic.PatternLayout">
                  <pattern>${DD_API_KEY} %mdc{keyThatDoesNotExist}</pattern>
              </layout>
            </prefix>
      </encoder>
      <ssl />
    </appender>

    <root level="DEBUG">
      <appender-ref ref="FILE"/>
      <appender-ref ref="JSON_TCP" />
    </root>
  </configuration>
  ```

    {{< /site-region >}}

    {{< site-region region="eu" >}}

  ```xml
  <configuration>
    <appender name="FILE" class="ch.qos.logback.core.FileAppender">
      <file>logs/app.log</file>
      <encoder class="net.logstash.logback.encoder.LogstashEncoder" />
    </appender>
    <appender name="JSON_TCP" class="net.logstash.logback.appender.LogstashTcpSocketAppender">
      <destination>tcp-intake.logs.datadoghq.eu:443</destination>
      <keepAliveDuration>20 seconds</keepAliveDuration>
      <encoder class="net.logstash.logback.encoder.LogstashEncoder">
          <prefix class="ch.qos.logback.core.encoder.LayoutWrappingEncoder">
              <layout class="ch.qos.logback.classic.PatternLayout">
                  <pattern>${DD_API_KEY} %mdc{keyThatDoesNotExist}</pattern>
              </layout>
            </prefix>
      </encoder>
      <ssl />
    </appender>

    <root level="DEBUG">
      <appender-ref ref="FILE"/>
      <appender-ref ref="JSON_TCP" />
    </root>
  </configuration>
  ```

    {{< /site-region >}}

    {{< site-region region="gov" >}}
  サポートされていません。
    {{< /site-region >}}

   **注:** XML コンフィギュレーションで空白が削除されるため、`%mdc{keyThatDoesNotExist}` が追加されます。プレフィックスパラメータの詳細については、[Logback ドキュメント][12]を参照してください。

2. Logstash エンコーダの依存関係を `pom.xml` ファイルに追加します。

    ```xml
    <dependency>
      <groupId>ch.qos.logback</groupId>
      <artifactId>logback-classic</artifactId>
      <version>1.2.9</version>
    </dependency>
    <dependency>
      <groupId>net.logstash.logback</groupId>
      <artifactId>logstash-logback-encoder</artifactId>
      <version>6.6</version>
    </dependency>
    ```

## 補足説明

ログイベントをコンテキスト属性で補完することができます。

### キー値パーサーの使用

[キー値パーサー][13]は、ログイベント内で認識された `<KEY>=<VALUE>` パターンを抽出します。

Java のログイベントを補完するには、コードでメッセージを書き直し、`<キー>=<値>` のシーケンスを挿入します。

たとえば、次のメッセージがあるとします。

```java
logger.info("Emitted 1001 messages during the last 93 seconds for customer scope prod30");
```

これを次のように変更します。

```java
logger.info("Emitted quantity=1001 messages during the last durationInMs=93180 ms for customer scope=prod30");
```

キー値パーサーを有効にすると、各ペアが JSON から抽出されます。

```json
{
  "message": "Emitted quantity=1001 messages during the last durationInMs=93180 ms for customer scope=prod30",
  "scope": "prod30",
  "durationInMs": 93180,
  "quantity": 1001
}
```

これで、scope をフィールド、durationInMs と quantity をログメジャーとして利用できます。

### MDC

ログを補完するもう 1 つの方法として、Java の [マップされた診断コンテキスト (MDC)][1] の利用があります。

SLF4J を使用する場合は、次の Java コードを使用してください。

```java
...
MDC.put("scope", "prod30");
logger.info("Emitted 1001 messages during the last 93 seconds");
...
```

この JSON を生成するには

```json
{
  "message": "過去 93 秒間に 1001 メッセージを送信",
  "scope": "prod30"
}
```

**注:** MDC は文字列タイプのみを許可するため、数値メトリクスには使用しないでください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://logback.qos.ch/manual/mdc.html
[2]: /ja/logs/log_configuration/parsing
[3]: /ja/tracing/other_telemetry/connect_logs_and_traces/java/
[4]: /ja/agent/logs/?tab=tailfiles#activate-log-collection
[5]: /ja/agent/logs/?tab=tailfiles#custom-log-collection
[6]: /ja/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[7]: /ja/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[8]: /ja/agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information]
[9]: /ja/logs/log_configuration/parsing/?tab=matchers
[10]: /ja/logs/explorer/#overview
[11]: https://github.com/logstash/logstash-logback-encoder
[12]: https://github.com/logstash/logstash-logback-encoder#prefixsuffixseparator
[13]: /ja/logs/log_configuration/parsing/#key-value-or-logfmt
[14]: /ja/glossary/#tail