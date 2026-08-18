---
aliases:
- /ko/logs/languages/java
further_reading:
- link: /logs/log_configuration/processors
  tag: 설명서
  text: 로그 처리 방법 알아보기
- link: /logs/log_configuration/parsing
  tag: 설명서
  text: 구문 분석에 대해 알아보기
- link: /logs/explorer/
  tag: 설명서
  text: 로그 탐색 방법 알아보기
- link: /logs/explorer/#visualize
  tag: 설명서
  text: 로그 분석 수행
- link: /tracing/other_telemetry/connect_logs_and_traces/java/
  tag: 설명서
  text: 로그 및 트레이스 연결
- link: /logs/faq/log-collection-troubleshooting-guide/
  tag: FAQ
  text: 로그 수집 문제 해결 가이드
- link: https://www.datadoghq.com/blog/java-logging-guide/
  tag: 블로그
  text: Java 로그를 수집, 커스터마이즈하고 표준화하는 방법
- link: /glossary/#tail
  tag: 용어집
  text: '"테일링" 관련 용어집 항목'
title: Java 로그 수집
---
로그를 Datadog에 전송하려면 파일에 기록한 후 Datadog Agent로 해당 파일을 [테일링][1]하세요.

일반적인 Java 로그의 스택 트레이스는 여러 줄로 나뉘어 원래 로그 이벤트와 연결하기 어렵습니다. 예시는 다음과 같습니다.

```java
//4 events generated when only one is expected!
Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
```

이 문제를 해결하려면 로깅 라이브러리를 구성하여 JSON 형식으로 로그를 생성하세요. JSON으로 기록하면 다음과 같은 이점이 있습니다.

* 스택 트레이스가 로그 이벤트로 적절하게 래핑되도록 보장합니다.
* 모든 로그 이벤트 특성(심각도, 로거 이름, 스레드 이름 등)이 적절하게 추출되도록 보장합니다.
* [매핑된 진단 컨텍스트(MDC)][2] 특성에 대한 액세스 권한을 얻어 어느 로그 이벤트에나 추가할 수 있습니다.
* [커스텀 구문 분석 규칙][3]의 필요성을 없애줍니다.

다음 지침은 Log4j, Log4j 2 및 Logback 로깅 라이브러리의 설정 예를 보여줍니다.

## 로거 구성 {#configure-your-logger}

### JSON 형식 {#json-format}

{{< tabs >}}
{{% tab "Log4j" %}}

Log4j의 경우, SLF4J 모듈 [log4j-over-slf4j][1]와 Logback을 사용하여 JSON 형식으로 기록합니다. `log4j-over-slf4j`는 애플리케이션의 Log4j를 완전히 대체하므로 코드 변경이 필요하지 않습니다.

1. `pom.xml` 파일에서 `log4j.jar` 종속성을 `log4j-over-slf4j.jar` 종속성으로 교체하고 Logback 종속성을 추가합니다. 예시는 다음과 같습니다.
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
2. `logback.xml`에서 JSON 레이아웃을 사용하는 어펜더를 구성합니다. 파일 및 콘솔에 대한 다음 예시 구성을 참조하세요.

    파일:

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

    For console:

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

Log4j 2는 JSON 레이아웃을 포함합니다.

1. `log4j2.xml`에서 JSON 레이아웃을 사용하는 어펜더를 구성합니다. 파일 및 콘솔 어펜더에 대한 다음 예시 구성을 참조하세요. Log4j 플러그인에 관한 종합적인 설명은 [Log4j 플러그인 참조][1]를 참조하시기 바랍니다.
{{% collapse-content title="파일 어펜더" level="h4" %}}
{{< code-block lang="xml" filename="log4j2.xml"  >}}
<?xml version="1.0" encoding="UTF-8"?>
  <Configuration>
    <Appenders>
      <File name="FILE" fileName="logs/app.log" >
        <JsonTemplateLayout eventTemplateUri="classpath:MyLayout.json"/>
      </File>
    </Appenders>
    <Loggers>
      <Root level="INFO">
        <AppenderRef ref="FILE"/>
      </Root>
    </Loggers>
  </Configuration>
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="콘솔 어펜더" level="h4" %}}
{{< code-block lang="xml" filename="log4j2.xml" >}}
  <?xml version="1.0" encoding="UTF-8"?>
  <Configuration>
    <Appenders>
      <Console name="console" target="SYSTEM_OUT">
        <JsonTemplateLayout eventTemplateUri="classpath:MyLayout.json"/>
      </Console>
    </Appenders>
    <Loggers>
      <Root level="INFO">
        <AppenderRef ref="console"/>
      </Root>
    </Loggers>
  </Configuration>
{{< /code-block >}}
{{% /collapse-content %}}

2. Java 프로젝트의 `src/main/resources` 디렉토리에 JSON 레이아웃 템플릿 파일(예: `MyLayout.json`)을 추가합니다. 예시는 다음과 같습니다.
    ```json
    {
       "timestamp":{
          "$resolver":"timestamp",
          "pattern":{
             "format":"yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
             "timeZone":"UTC"
          }
       },
       "status":{
          "$resolver":"level",
          "field":"name"
       },
       "thread_name":{
          "$resolver":"thread",
          "field":"name"
       },
       "logger_name":{
          "$resolver":"logger",
          "field":"name"
       },
       "message":{
          "$resolver":"message",
          "stringified":true
       },
       "exception_class":{
          "$resolver":"exception",
          "field":"className"
       },
       "exception_message":{
          "$resolver":"exception",
          "field":"message"
       },
       "stack_trace":{
          "$resolver":"exception",
          "field":"stackTrace",
          "stackTrace":{
             "stringified":true
          }
       },
       "host":"${hostName}",
       "service":"${env:DD_SERVICE}",
       "version":"${env:DD_VERSION}",
       "dd.trace_id":{
          "$resolver":"mdc",
          "key":"dd.trace_id"
       },
       "dd.span_id":{
          "$resolver":"mdc",
          "key":"dd.span_id"
       }
    }
    ```

3. `pom.xml`에 JSON 레이아웃 종속성을 추가합니다. 예시는 다음과 같습니다.
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

[1]: https://logging.apache.org/log4j/2.x/plugin-reference.html
{{% /tab %}}
{{% tab "Logback" %}}

Logback에서 JSON 형식의 로그에 [logstash-logback-encoder][1]를 사용합니다.

1. `logback.xml`에서 JSON 레이아웃을 사용하여 파일 어펜더를 구성합니다. 예시는 다음과 같습니다.

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

2. `pom.xml` 파일에 Logstash 인코더 종속성을 추가합니다. 예시는 다음과 같습니다.

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

[공식 Tinylog 설명서][1]를 기반으로 JSON 작성자 설정을 생성하세요.


`tinylog.properties` 파일에서 다음 형식을 사용하세요.

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

### Raw 형식 {#raw-format}

{{< tabs >}}
{{% tab "Log4j" %}}

`log4j.xml`에서 파일 어펜더를 구성하세요. 예시는 다음과 같습니다.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE log4j:configuration SYSTEM "log4j.dtd">
<log4j:configuration>

  <appender name="FILE" class="org.apache.log4j.FileAppender">
    <param name="File" value="logs/app.log"/>
    <param name="Append" value="true"/>

    <layout class="org.apache.log4j.PatternLayout">
      <param name="ConversionPattern" value="%d{yyyy-MM-dd HH:mm:ss} %-5p %C:%L - %X{dd.trace_id} %X{dd.span_id} - %m%n"/>
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

`log4j2.xml`에서 파일 어펜더를 구성하세요. 예시는 다음과 같습니다.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration>
  <Appenders>
    <File name="FILE" fileName="logs/app.log">
      <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss} %-5p %C:%L - %X{dd.trace_id} %X{dd.span_id} - %m%n"/>
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

`logback.xml`에서 파일 어펜더를 구성하세요. 예시는 다음과 같습니다.

```xml
<configuration>
  <appender name="FILE" class="ch.qos.logback.core.FileAppender">
    <file>${dd.test.logfile}</file>
    <append>false</append>
    <immediateFlush>true</immediateFlush>

    <encoder>
      <pattern>%d{yyyy-MM-dd HH:mm:ss} %-5p %C:%L - %X{dd.trace_id} %X{dd.span_id} - %m%n</pattern>
    </encoder>
  </appender>

  <root level="INFO">
    <appender-ref ref="FILE"/>
  </root>
</configuration>
```

{{% /tab %}}
{{% tab "Tinylog" %}}

[공식 Tinylog 설명서][1]를 바탕으로 파일에 작성자 구성 아웃풋을 생성하세요.


`tinylog.properties` 파일에서 다음 형식을 사용하세요.

```properties
writer          = file
writer.level    = debug
writer.format   = {level} - {message} - "dd.trace_id":{context: dd.trace_id} - "dd.span_id":{context: dd.span_id}
writer.file     = log.txt
```

[1]: https://tinylog.org/v2/configuration/#writer
{{% /tab %}}
{{< /tabs >}}

#### 로그에 트레이스 ID 삽입 {#inject-trace-ids-into-your-logs}

이 애플리케이션에 APM이 활성화된 경우 트레이스 ID를 삽입하여 로그와 트레이스를 상호 연결할 수 있습니다. [Java 로그 및 트레이스 연결][4]를 참조하세요.

로그와 트레이스를 상호 연결하지 _않는_ 경우, 이전 구성 예시에 포함된 로그 패턴에서 MDC 자리 표시자(`%X{dd.trace_id} %X{dd.span_id}`)를 제거하세요.

예를 들어, Log4j 2를 사용하지만 로그와 트레이스를 상호 연결하지 않는 경우, 예시 로그 레이아웃 템플릿 `MyLayout.json`에서 다음 블록을 제거합니다.

```json
"dd.trace_id":{
   "$resolver":"mdc",
   "key":"dd.trace_id"
},
"dd.span_id":{
   "$resolver":"mdc",
   "key":"dd.span_id"
}
```


## Datadog Agent 구성 {#configure-the-datadog-agent}

[로그 수집이 활성화][5]되면 [사용자 지정 로그 수집][6]을 설정하여 로그 파일을 테일링하고 Datadog에 전송하세요.

1. `conf.d/` [Agent 구성 디렉토리][7]에 `java.d/` 폴더를 생성합니다.
2. 다음 내용을 사용하여 `java.d/`에 `conf.yaml` 파일을 생성합니다.

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

3. [Agent를 재시작][8]합니다.
4. [Agent의 상태 하위 명령][9]을 실행하고 `java` 섹션에서 {{< ui >}}Checks{{< /ui >}}를 찾아 로그가 Datadog에 성공적으로 제출되었는지 확인합니다.

로그가 JSON 형식인 경우, Datadog이 자동으로 [로그 메시지를 구문 분석][10]하여 로그 특성을 추출합니다. [Log Explorer][11]를 사용하여 로그를 확인하고 문제를 해결하세요.

## Agent에 직접 로그 스트리밍 {#stream-logs-directly-to-the-agent}

예외적으로 애플리케이션이 액세스할 수 없거나 파일에 기록할 수 없는 머신에서 실행 중인 경우, Datadog이나 Datadog Agent에 직접 로그를 스트리밍하는 것이 가능합니다. 하지만 애플리케이션에서 연결 문제를 해결해야 하기 때문에 권장되는 설정은 아닙니다.

Datadog에 직접 로그를 스트리밍하는 방법은 다음과 같습니다.

1. 코드에 Logback 로깅 라이브러리를 추가하거나 **현재 로거를 Logback에 연결**합니다.
2. **Logback을 구성**하여 로그를 Datadog에 전송합니다.

### Java 로깅 라이브러리에서 Logback으로 연결 {#bridge-from-java-logging-libraries-to-logback}

이미 Logback을 사용 중인 경우 가장 일반적인 로깅 라이브러리가 Logback에 연결될 수 있습니다.

{{< tabs >}}
{{% tab "Log4j" %}}

SLF4J 모듈 [log4j-over-slf4j][1]를 Logback과 함께 사용하여 로그를 다른 서버로 전송하세요. `log4j-over-slf4j`는 코드 변경이 필요하지 않도록 애플리케이션의 Log4j를 완전히 대체합니다.

1. `pom.xml` 파일에서 `log4j.jar` 종속성을 `log4j-over-slf4j.jar` 종속성으로 교체하고 Logback 종속성을 추가합니다. 예시는 다음과 같습니다.
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
2. Logback을 구성합니다.

**참고:** 이 변경에 따라 Log4j 구성 파일이 더 이상 픽업되지 않습니다. [Log4j 번역기][2]를 사용하여 `log4j.properties` 파일을 `logback.xml`로 마이그레이션하세요.


[1]: http://www.slf4j.org/legacy.html#log4j-over-slf4j
[2]: http://logback.qos.ch/translator/
{{% /tab %}}

{{% tab "Log4j 2" %}}

Log4j 2는 원격 호스트에 기록하도록 허용하지만, 로그에 API 키를 접두사로 추가하는 기능은 제공하지 않습니다. 따라서 SLF4J 모듈 [log4j-over-slf4j][1]와 Logback을 사용하세요. `log4j-to-slf4j.jar`는 코드 변경이 필요하지 않도록 애플리케이션의 Log4j 2를 완전히 대체합니다. 사용하려면 다음 단계를 따르세요.

1. `pom.xml` 파일에서 `log4j.jar` 종속성을 `log4j-over-slf4j.jar` 종속성으로 교체하고 Logback 종속성을 추가합니다. 예시는 다음과 같습니다.
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
2. Logback을 구성합니다.

**참고:**

-  여기(https://logging.apache.org/log4j/log4j-2.2/log4j-to-slf4j/index.html)에 설명된 대로 `log4j-slf4j-impl.jar`가 사용되지 **않도록** 하세요.
- 이 마이그레이션에 따라 Log4j 2 구성 파일은 더 이상 픽업되지 않습니다. [Log4j 번역기][2]를 사용하여 `log4j.properties` 파일을 `logback.xml`로 마이그레이션하세요.

[1]: http://www.slf4j.org/legacy.html#log4j-over-slf4j
[2]: http://logback.qos.ch/translator
{{% /tab %}}

{{< /tabs >}}

### Logback 구성 {#configure-logback}
Datadog은 TCP를 통해 로그를 Datadog 인테이크로 직접 전송하는 것을 지원하지 않습니다. 대신, Logback을 로컬 Datadog Agent에 구성하여 로그를 HTTPS를 통해 Datadog으로 자동 보강하여 포워딩합니다.

1. [로컬 Datadog Agent를 설치][12]합니다(v6+/v7+).
1. `datadog.yaml`에서 로그 수집을 활성화하고, Agent가 HTTPS를 통해 로그를 전달하도록 합니다(HTTPS는 Agent v6.19+/v7.19+ 이후 버전의 기본 전송 방식입니다).
   ```
   logs_enabled: true
   logs_config:
     # HTTPS is the default. Keep or set this to force HTTPS forwarding.
     force_use_http: true
     # (Optional) auto-detect multi-line patterns
     auto_multi_line_detection: true
   ```

1. Agent에서 로그 수집을 활성화합니다.
   ```yaml
   # /etc/datadog-agent/conf.d/logback.d/conf.yaml
   logs:
     - type: tcp
       port: 10518           # Port the Agent will listen on
       service: my-java-app  # Your service name (unified service tagging)
       source: java          # Or a more specific source, e.g., "logback"
   ```
1. Agent를 재시작하여 변경 사항을 적용합니다.
1. Agent에 로그를 전송하도록 Logback을 구성합니다. [logstash-logback-encoder][13] TCP 어펜더를 `logback.xml`에서 사용하여 로그를 Agent로 전달합니다.
   ```xml
   <configuration>
     <appender name="DD_TCP_JSON" class="net.logstash.logback.appender.LogstashTcpSocketAppender">
       <destination>localhost:10518</destination>
       <encoder class="net.logstash.logback.encoder.LoggingEventCompositeJsonEncoder">
         <providers>
           <timestamp/>
           <pattern>
             <pattern>
               {
                 "message": "%message",
                 "level": "%level",
                 "logger": "%logger",
                 "service": "${DD_SERVICE:-my-java-app}",
                 "env": "${DD_ENV:-prod}",
                 "version": "${DD_VERSION:-1.0.0}",
                 "dd.trace_id": "%X{dd.trace_id}",
                 "dd.span_id": "%X{dd.span_id}"
               }
             </pattern>
           </pattern>
           <arguments/>
           <stackTrace/>
         </providers>
       </encoder>
     </appender>
   </configuration>
   ```
   그런 다음 루트 로거에서 참조하세요.
   ```xml
   <root level="INFO">
     <appender-ref ref="DD_TCP_JSON"/>
   </root>
   ```

1. 로그 포워딩을 검증합니다. `datadog-agent status`를 실행하여 TCP 리스너를 확인하고, 서비스로 태그된 항목이 있는지 Logs Explorer를 확인하세요.

## 활용 {#getting-further}

컨텍스트 특성을 사용해 로그 이벤트를 보강하세요.

### 키 값 구문 분석 도구 사용 {#using-the-key-value-parser}

[키 값 구문 분석 도구][14]는 로그 이벤트에서 인식되는 `<KEY>=<VALUE>` 패턴을 추출합니다.

Java에서 로그 이벤트를 보강하기 위해 코드의 메시지를 다시 작성하고 `<KEY>=<VALUE>` 시퀀스를 도입할 수 있습니다.

다음과 같은 경우에

```java
logger.info("Emitted 1001 messages during the last 93 seconds for customer scope prod30");
```

다음으로 변경할 수 있습니다.

```java
logger.info("Emitted quantity=1001 messages during the last durationInMs=93180 ms for customer scope=prod30");
```

키 값 구문 분석 도구가 활성화된 경우 각 페어가 JSON에서 추출됩니다.

```json
{
  "message": "Emitted quantity=1001 messages during the last durationInMs=93180 ms for customer scope=prod30",
  "scope": "prod30",
  "durationInMs": 93180,
  "quantity": 1001
}
```

따라서 필드로 *scope*를, 로그 측정 지표로 *durationInMs* 및 *quantity*를 활용할 수 있습니다.

### MDC {#mdc}

로그를 보강하는 또 다른 옵션은 Java의 [Mapped Diagnostic Contexts(MDC)][2]를 사용하는 것입니다.

SLF4J를 사용하는 경우 다음의 Java 코드를 사용하세요.

```java
...
MDC.put("scope", "prod30");
logger.info("Emitted 1001 messages during the last 93 seconds");
...
```

이 JSON을 생성하는 방법은 다음과 같습니다.

```json
{
  "message": "Emitted 1001 messages during the last 93 seconds",
  "scope": "prod30"
}
```

**참고**: MDC는 문자열 유형만 허용하므로 숫자 값 메트릭에는 사용하지 마세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/glossary/#tail
[2]: http://logback.qos.ch/manual/mdc.html
[3]: /ko/logs/log_configuration/parsing
[4]: /ko/tracing/other_telemetry/connect_logs_and_traces/java/
[5]: /ko/agent/logs/?tab=tailfiles#activate-log-collection
[6]: /ko/agent/logs/?tab=tailfiles#custom-log-collection
[7]: /ko/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[8]: /ko/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[9]: /ko/agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[10]: /ko/logs/log_configuration/parsing/?tab=matchers
[11]: /ko/logs/explorer/#overview
[12]: /ko/agent/?tab=Host-based
[13]: https://github.com/logstash/logstash-logback-encoder
[14]: /ko/logs/log_configuration/parsing/#key-value-or-logfmt