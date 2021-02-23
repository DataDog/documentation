---
title: Java ログ収集
kind: documentation
aliases:
  - /ja/logs/languages/java
further_reading:
  - link: /logs/processing/
    tag: Documentation
    text: ログの処理方法
  - link: /logs/processing/parsing/
    tag: Documentation
    text: パースの詳細
  - link: /logs/explorer/
    tag: Documentation
    text: ログの調査方法
  - link: '/logs/explorer/#visualize'
    tag: Documentation
    text: ログ分析の実行
  - link: /logs/faq/log-collection-troubleshooting-guide/
    tag: FAQ
    text: ログ収集のトラブルシューティングガイド
  - link: 'https://www.datadoghq.com/blog/java-logging-guide/'
    tag: ブログ
    text: Java ログの収集、カスタマイズ、標準化方法
---
Java ログの処理はかなり複雑ですが、その主な原因はスタックトレースです。スタックトレースが複数行に分割されるため、元のログイベントとの関連付けが難しくなります。

```java
//1 つのはずのイベントに、4 つのイベントが生成される
Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
```

ロギングライブラリによってログを JSON 化することで、以下のことが可能です。

* スタックトレースを適切な LogEvent に正しくラップします。
* ログイベントのすべての属性 (重大度、ロガー名、スレッド名など) を正しく抽出します。
* 任意のログイベントにアタッチできる [MDC][1] 属性にアクセスする。

**ログを Datadog に送信する場合は、ファイルにログを記録し、Datadog Agent を使用してそのファイルを追跡することをお勧めします。**

[カスタムパース規則][2]の使用を避け、ログを JSON 形式で生成するようにロギングライブラリをセットアップすることを強くお勧めします。

ここでは、`log4j`、`slf4j`、および `log4j2` ロギングライブラリをセットアップする例を紹介します。

## ロガーの構成

### 未加工の形式

{{< tabs >}}
{{% tab "Log4j" %}}

`log4j.xml` に新しいファイルアペンダーを追加します。

```xml
<appender name="fileAppender" class="org.apache.log4j.FileAppender">
    <param name="File" value="/logs/log4j.log" />
    <param name="Append" value="true" />
    <layout class="org.apache.log4j.PatternLayout">
        <param name="ConversionPattern" value="%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %m%n" />
    </layout>
</appender>
```

**ログへのトレース ID の挿入**

APM が有効になっているアプリケーションで、アプリケーションログとトレースの関連付けを改善したい場合は、[こちらの説明に従い][1]、[MDC (マップされた診断コンテキスト)][2] を使用してログに自動的にトレースおよびスパン ID が追加されるように設定します。

この設定を行うと、使用する `ConversionPattern` は次のようになります。

```xml
<param name="ConversionPattern" value="%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %X{dd.trace_id} %X{dd.span_id} - %m%n" />
```

[1]: /ja/tracing/connect_logs_and_traces/java/
[2]: http://logback.qos.ch/manual/mdc.html
{{% /tab %}}
{{% tab "Log4j2" %}}

`log4j2.xml` ファイルを編集します。

```xml
<File name="MyFile" fileName="logs/app.log" immediateFlush="true">
    <PatternLayout pattern="%d{yyy-MM-dd HH:mm:ss.SSS} [%t] %-5level %logger{36} - %msg%n"/>
</File>
<Loggers>
    <Root level="debug">
        <AppenderRef ref="MyFile" />
    </Root>
</Loggers>
```

**ログへのトレース ID の挿入**

APM が有効になっているアプリケーションで、アプリケーションログとトレースの関連付けを改善したい場合は、[こちらの説明に従い][1]、[MDC (マップされた診断コンテキスト)][2] を使用してログに自動的にトレースおよびスパン ID が追加されるように設定します。

この設定を行うと、使用する `PatternLayout` は次のようになります。

```xml
<PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %X{dd.trace_id} %X{dd.span_id} - %m%n" />
```

[1]: /ja/tracing/connect_logs_and_traces/java/
[2]: http://logback.qos.ch/manual/mdc.html
{{% /tab %}}
{{% tab "Slf4j" %}}

`logback.xml` ファイルを編集します。

```xml
<configuration>
    <!-- (....) -->
    <timestamp key="byDay" datePattern="yyyyMMdd'T'HHmmss"/>
    <appender name="FILE" class="ch.qos.logback.core.FileAppender">
        <file> ~/logs/log-${byDay}.log </file>
        <append>true</append>
        <encoder>
            <Pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</Pattern>
        </encoder>
    </appender>
    <!-- (....) -->
    <root level="debug">
        <appender-ref ref="FILE" />
    </root>
</configuration>
```

**ログへのトレース ID の挿入**

APM が有効になっているアプリケーションで、アプリケーションログとトレースの関連付けを改善したい場合は、[こちらの説明に従い][1]、[MDC (マップされた診断コンテキスト)][2] を使用してログに自動的にトレースおよびスパン ID が追加されるように設定します。

この設定を行うと、使用する `Pattern` は次のようになります。

```xml
<Pattern>"%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %X{dd.trace_id} %X{dd.span_id} - %m%n"</Pattern>
```

[1]: /ja/tracing/connect_logs_and_traces/java/
[2]: http://logback.qos.ch/manual/mdc.html
{{% /tab %}}
{{< /tabs >}}

### JSON 形式

{{< tabs >}}
{{% tab "Log4j" %}}

log4j を使用して JSON 形式でログを記録するのは、難しい場合があります。そのため、log4j-over-slf4j というモジュールに付属の slf4j を使用し、さらに logback を使用してログを JSON 形式にすることをお勧めします。

アプリケーションで log4j-over-slf4j を使用するには、まず `log4j.jar` を探し、それを `log4j-over-slf4j.jar` に置き換えます。
log4j-over-slf4j が正しく機能するには、slf4j 連結とその依存関係が必要なことに注意してください。

多くの場合、log4j から SLF4J への移行には、jar ファイルを置き換えるだけ済みます。
`pom.xml` ファイルを編集します。

```xml
<dependency>
  <groupId>org.slf4j</groupId>
  <artifactId>log4j-over-slf4j</artifactId>
  <version>1.7.13</version>
</dependency>

<dependency>
  <groupId>net.logstash.logback</groupId>
  <artifactId>logstash-logback-encoder</artifactId>
  <version>4.5.1</version>
</dependency>

<dependency>
  <groupId>ch.qos.logback</groupId>
  <artifactId>logback-classic</artifactId>
  <version>1.1.3</version>
</dependency>
```

完了したら、後述の `Slf4j` セクションの説明に従って `logback.xml` ファイルを編集します。

**ログへのトレース ID の挿入**

APM が有効になっているアプリケーションで、アプリケーションログとトレースの関連付けを改善したい場合は、[こちらの説明に従い][1]、[MDC (マップされた診断コンテキスト)][2] を使用して JSON ログに自動的にトレースおよびスパン ID が追加されるように設定します。

[1]: /ja/tracing/connect_logs_and_traces/java/
[2]: http://logback.qos.ch/manual/mdc.html
{{% /tab %}}
{{% tab "Log4j2" %}}

提供されているデフォルトの log4j2 JSON レイアウトを使用できます。`log4j2.xml` ファイルに次のアペンダーを追加します。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration>
    <Appenders>
        <Console name="Console" target="SYSTEM_OUT">
            <JSONLayout compact="true" eventEol="true" properties="true" stacktraceAsString="true"/>
        </Console>
    </Appenders>
    <Loggers>
        <Root level="TRACE">
            <AppenderRef ref="Console" />
        </Root>
    </Loggers>
</Configuration>
```

* 次に、`pom.xml` に以下の依存関係を追加します。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project
    xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>datadog</groupId>
    <artifactId>support</artifactId>
    <version>1.0-SNAPSHOT</version>
    <dependencies>
        <!-- https://mvnrepository.com/artifact/org.apache.logging.log4j/log4j-core -->
        <dependency>
            <groupId>org.apache.logging.log4j</groupId>
            <artifactId>log4j-core</artifactId>
            <version>2.7</version>
        </dependency>
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-core</artifactId>
            <version>2.8.3</version>
        </dependency>
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
            <version>2.8.3</version>
        </dependency>
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-annotations</artifactId>
            <version>2.8.3</version>
        </dependency>
    </dependencies>
</project>
```

**ログへのトレース ID の挿入**

APM が有効になっているアプリケーションで、アプリケーションログとトレースの関連付けを改善したい場合は、[こちらの説明に従い][1]、[MDC (マップされた診断コンテキスト)][2] を使用して JSON ログに自動的にトレースおよびスパン ID が追加されるように設定します。

[1]: https://gist.github.com/NBParis/8bda7aea745987dd3261d475c613cf66
[2]: http://logback.qos.ch/manual/mdc.html
{{% /tab %}}
{{% tab "Slf4j" %}}

Logback 用の JSON ライブラリとしては [logstash-logback-encoder][1] をお勧めします。これを使用するメリットの 1 つは、メインの Maven リポジトリに含まれていることです。

このライブラリをクラスパスに追加するには、`pom.xml` ファイルに次の依存関係 (この例では、バージョン 4.5.1) を追加するだけです。

```xml
<dependency>
  <groupId>net.logstash.logback</groupId>
  <artifactId>logstash-logback-encoder</artifactId>
  <version>4.5.1</version>
</dependency>

<dependency>
  <groupId>ch.qos.logback</groupId>
  <artifactId>logback-classic</artifactId>
  <version>1.1.3</version>
</dependency>
```

次に、`logback.xml` ファイルを編集してエンコーダーを更新します。

```xml
    <appender name="FILE" class="ch.qos.logback.core.FileAppender">
        <file>logs/app.log</file>
        <encoder class="net.logstash.logback.encoder.LogstashEncoder">
            <customFields>{"env":"prod"}</customFields>
        </encoder>
    </appender>
```

**ログへのトレース ID の挿入**

APM が有効になっているアプリケーションで、アプリケーションログとトレースの関連付けを改善したい場合は、[こちらの説明に従い][2]、[MDC (マップされた診断コンテキスト)][3] を使用して JSON ログに自動的にトレースおよびスパン ID が追加されるように設定します。

[1]: https://github.com/logstash/logstash-logback-encoder
[2]: /ja/tracing/connect_logs_and_traces/java/
[3]: http://logback.qos.ch/manual/mdc.html
{{< tabs >}}
{{% tab "Files" %}}

## Datadog Agent の構成

Agent の `conf.d/` ディレクトリに、以下の内容の `java.yaml` ファイルを作成します。

```yaml

#ログセクション
logs:

  - type: file
    path: "/path/to/your/java/log.log"
    service: java
    source: java
    sourcecategory: sourcecode
    # 複数行ログで、ログが yyyy-mm-dd 形式の日付で始まる場合は、以下の処理ルールのコメントを解除します。
    #log_processing_rules:
    #  - type: multi_line
    #    name: new_log_start_with_date
    #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
```

## エージェントレスのログ収集

アプリケーションから Datadog または Datadog Agent にログを直接ストリーミングすることができます。接続に関する処理はアプリケーションで直接行うべきではないため、これは推奨のセットアップではありません。しかし、アクセスできないマシンでアプリケーションが実行されている場合は、ファイルにログを記録できないことがあります。

Datadog にログが直接ストリーミングされるようにするには、Java アプリケーションを次の 2 つの手順で構成します。

1. Logback ロギングライブラリをコードに追加します (または、現在のロガーからライブラリへのブリッジを構築します)。
2. Datadog にログが送信されるように構成します。

### Java ロギングライブラリから Logback へのブリッジ

* ログを直接ストリーミングするためのロギングライブラリとしては、Logback [logstash-logback-encoder][3] をお勧めします。

このロギングライブラリは、最もよく使用されている Java ライブラリからリンクできます。

{{< tabs >}}
{{% tab "Log4j" %}}

Log4j を使用してリモートサーバーに JSON 形式でログを記録するのは、難しい場合があります。`log4j-over-slf4j` というモジュールに付属の SLF4J を使用し、さらに Logback を使用してログを JSON 形式にすることをお勧めします。

アプリケーションで `log4j-over-slf4j` を使用するには、まず `log4j.jar` を探し、それを `log4j-over-slf4j.jar` に置き換えます。
多くの場合、Log4j から SLF4J への移行には、JAR ファイルを置き換えるだけ済みます。

次に、`pom.xml` ファイルの内容を次のように編集します。

```xml
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>log4j-over-slf4j</artifactId>
    <version>1.7.13</version>
</dependency>
<dependency>
    <groupId>net.logstash.logback</groupId>
    <artifactId>logstash-logback-encoder</artifactId>
    <version>4.5.1</version>
</dependency>
<dependency>
    <groupId>ch.qos.logback</groupId>
    <artifactId>logback-classic</artifactId>
    <version>1.1.3</version>
</dependency>
```

**注:** この移行の結果、Log4j 構成ファイルは使用されなくなります。[Log4j トランスレーター][1] を使用して `log4j.properties` ファイルを `logback.xml` に移行してください。

[1]: http://logback.qos.ch/translator
{{% /tab %}}

{{% tab "Log4j2" %}}

Log4j2 を使用すると、ログをリモートホストに記録できますが、ログに API キーのプレフィックスを付ける機能は提供されません。そのため、`log4j-over-slf4j` というモジュールに付属の SLF4J を使用し、さらに Logback を使用してログを JSON 形式にすることをお勧めします。

アプリケーションで `log4j-over-slf4j` を使用するには、まず `log4j.jar` を探し、それを `log4j-to-slf4j-2.11.jar` に置き換えます。

次に、`pom.xml` ファイルの内容を次のように編集します。

```xml
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-to-slf4j</artifactId>
    <version>2.11.0</version>
</dependency>
<dependency>
    <groupId>net.logstash.logback</groupId>
    <artifactId>logstash-logback-encoder</artifactId>
    <version>4.5.1</version>
</dependency>
<dependency>
    <groupId>ch.qos.logback</groupId>
    <artifactId>logback-classic</artifactId>
    <version>1.1.3</version>
</dependency>
```

**注:**

- https://logging.apache.org/log4j/log4j-2.2/log4j-to-slf4j/index.html に記載されているように、`log4j-slf4j-impl-2.0.jar` を**使用しない**でください。
- この移行の結果、Log4j 構成ファイルは使用されなくなります。[Log4j トランスレーター][1] を使用して `log4j.properties` ファイルを `logback.xml` に移行してください。

[1]: https://logback.qos.ch/translator
{{% /tab %}}

{{% tab "Slf4j" %}}

Logback [logstash-logback-encoder][1] をクラスパスに追加するには、`pom.xml` ファイルに次の依存関係 (この例では、バージョン 4.5.1) を追加します。

```xml
<dependency>
    <groupId>net.logstash.logback</groupId>
    <artifactId>logstash-logback-encoder</artifactId>
    <version>4.5.1</version>
</dependency>
<dependency>
    <groupId>ch.qos.logback</groupId>
    <artifactId>logback-classic</artifactId>
    <version>1.1.3</version>
</dependency>
```

[1]: https://github.com/logstash/logstash-logback-encoder
{{< tabs >}}
{{% tab "Files" %}}

### Logback の構成

ログを Datadog に直接ストリーミングするように Logback ロガーを構成するには、`logback.xml` ファイルに以下のコードを追加します。

{{< site-region region="us" >}}

```xml
<appender name="JSON" class="ch.qos.logback.core.ConsoleAppender">
    <encoder class="net.logstash.logback.encoder.LogstashEncoder"/>
</appender>
<appender name="JSON_TCP" class="net.logstash.logback.appender.LogstashTcpSocketAppender">
    <remoteHost>intake.logs.datadoghq.com</remoteHost>
    <port>10514</port>
    <keepAliveDuration>20 seconds</keepAliveDuration>
    <encoder class="net.logstash.logback.encoder.LogstashEncoder">
        <prefix class="ch.qos.logback.core.encoder.LayoutWrappingEncoder">
            <layout class="ch.qos.logback.classic.PatternLayout">
                <pattern><APIKEY> %mdc{keyThatDoesNotExist}</pattern>
            </layout>
          </prefix>
    </encoder>
</appender>
<root level="debug">
    <appender-ref ref="JSON_TCP" />
    <appender-ref ref="JSON" />
</root>
```

{{< /site-region >}}
{{< site-region region="eu" >}}

```xml
<appender name="JSON" class="ch.qos.logback.core.ConsoleAppender">
    <encoder class="net.logstash.logback.encoder.LogstashEncoder"/>
</appender>
<appender name="JSON_TCP" class="net.logstash.logback.appender.LogstashTcpSocketAppender">
    <remoteHost>tcp-intake.logs.datadoghq.eu</remoteHost>
    <port>1883</port>
    <keepAliveDuration>20 seconds</keepAliveDuration>
    <encoder class="net.logstash.logback.encoder.LogstashEncoder">
        <prefix class="ch.qos.logback.core.encoder.LayoutWrappingEncoder">
            <layout class="ch.qos.logback.classic.PatternLayout">
                <pattern><API_KEY> %mdc{keyThatDoesNotExist}</pattern>
            </layout>
          </prefix>
    </encoder>
</appender>
<root level="debug">
    <appender-ref ref="JSON_TCP" />
    <appender-ref ref="JSON" />
</root>
```

{{< /site-region >}}

**注:**

* `<API_キー>` を Datadog API キー値に置き換えてください。
* `%mdc{keyThatDoesNotExist}` が追加されているのは、[こちら][4]で説明されているように、この XML 構成ではスペースが削除されてしまうためです。

prefix パラメーターの詳細については、[Logback に関するドキュメント][4]を参照してください。

## 補足説明

ログイベントをコンテキスト属性で補完することができます。

### キー/値パーサーの使用

[キー/値パーサー][5]は、ログイベント内で認識された `<キー>=<値>` パターンを抽出します。

Java のログイベントを補完するには、コードでメッセージを書き直し、`<キー>=<値>` のシーケンスを挿入します。

たとえば、次のメッセージがあるとします。

```java
logger.info("Emitted 1001 messages during the last 93 seconds for customer scope prod30");
```

これを次のように変更します。

```java
logger.info("Emitted quantity=1001 messages during the last durationInMs=93180 ms for customer scope=prod30");
```

[キー/値パーサー][5]を有効にすると、**Datadog** は、最終的な JSON ドキュメントからこれらのキー/値ペアを自動的に抽出します。

```json
{
  "message": "Emitted quantity=1001 messages during the last durationInMs=93180 ms for customer scope=prod30",
  "scope": "prod30",
  "durationInMs": 93180,
  "quantity": 1001
}
```

これで、scope をフィールド、durationInMs と quantity をログメジャーとして利用できます。

### MDC (マップされた診断コンテキスト)

ログを補完するもう 1 つの方法として、Java の [MDC (マップされた診断コンテキスト)][1] の利用があります。

Logback を使用している場合は、次の Java コードを使用します。

```java
...
MDC.put("scope", "prod30");
logger.info("Emitted 1001 messages during the last 93 seconds");
...
```

最終的に次の JSON ドキュメントが生成されます。

```json
{
  "message": "過去 93 秒間に 1001 メッセージを送信",
  "scope": "prod30"
}
```

**MDC は素晴らしい機能ですが、文字列型しか使用できません。したがって、MDC を使用してメトリクス用の数値を提供するという方法はとれません。**

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://logback.qos.ch/manual/mdc.html
[2]: /ja/logs/processing/parsing/
[3]: https://github.com/logstash/logstash-logback-encoder
[4]: https://github.com/logstash/logstash-logback-encoder#prefixsuffix
[5]: /ja/logs/processing/parsing/#key-value