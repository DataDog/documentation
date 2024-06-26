---
aliases:
- /ko/logs/languages/java
further_reading:
- link: /logs/log_configuration/processors
  tag: 설명서
  text: 로그 처리하는 방법 배우기
- link: /logs/log_configuration/parsing
  tag: 설명서
  text: 파싱에 대해 배우기
- link: /logs/explorer/
  tag: 설명서
  text: 로그 탐색 방법 알아보기
- link: /logs/explorer/#visualize
  tag: 설명서
  text: 로그 분석 실행하기
- link: /tracing/other_telemetry/connect_logs_and_traces/java/
  tag: 설명서
  text: 로그 및 트레이스 연결
- link: /logs/faq/log-collection-troubleshooting-guide/
  tag: FAQ
  text: 로그 수집 트러블슈팅 가이드
- link: https://www.datadoghq.com/blog/java-logging-guide/
  tag: 블로그
  text: 자바 로그를 수집, 커스터마이즈하고 표준화하는 방법
- link: /glossary/#tail
  tag: 용어
  text: '"tail"에 대한 용어 항목'
kind: 설명서
title: 자바(Java) 로그 수집
---

로그를 Datadog에 전송하고 파일에 기록한 다음 Datadog 에이전트를 사용해 해당 파일을 [테일링][14]하세요.

일반적인 자바 로그의 스택 트레이스를 여러 줄로 나눠 원래 로그 이벤트와 연결하기 어렵게 만드세요. 예:

```java
//4 events generated when only one is expected!
Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
```

이 문제를 해결하려면 로깅 라이브러리를 설정하여 JSON 형식으로 로그를 생성합니다. JSON으로 기록하면 다음의 이점이 있습니다.

* 스택 트레이스가 로그 이벤트로 적절하게 래핑되도록 보장합니다.
* 모든 로그 이벤트 속성(심각도, 로거 이름, 스레드 이름 등)이 적절하게 추출되도록 보장합니다.
* [매핑된 진단 컨텍스트(MDC)][1] 속성에 액세스하여 어느 로그 이벤트에나 추가할 수 있습니다.
* [커스텀 파싱 규칙][2]의 필요성을 없애줍니다.

다음 지침은 Log4j, Log4j 2 및 Logback 로깅 라이브러리의 설정 예를 보여줍니다.

## 로거 설정

### JSON 형식

{{< tabs >}}
{{% tab "Log4j" %}}

Log4j의 경우, Logback과 결합된 SLF4J 모듈 [log4j-over-slf4j][1]을 사용하여 JSON 형식으로 기록합니다. `log4j-over-slf4j`는 응용 프로그램의 Log4j를 완전히 대체하므로 다른 코드 변경을 사용할 필요가 없습니다. 사용 방법:

1. `pom.xml` 파일에서 `log4j.jar` 종속성을 `log4j-over-slf4j.jar` 종속성으로 대체하고 Logback 종속성을 추가합니다.
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
2. `logback.xml`에서 JSON 레이아웃을 사용하는 추가자 설정:

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

    콘솔:

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

1. `log4j2.xml`에서 JSON 레이아웃을 사용하는 추가자 설정:

   파일 추가자:

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

   콘솔 추가자:

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

2. `pom.xml`에 JSON 레이아웃 종속성을 추가하세요.
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

Logback에서 JSON 형식의 로그에 대한 [로그스태시(Logstash)-로그백-인코더][1]를 사용하세요.

1. `logback.xml`에서 JSON 레이아웃을 사용해 파일 추가자를 설정하세요.

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

2. `pom.xml` 파일에 로그스태시(Logstash) 인코더 종속성을 추가하세요.

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

공식 [Tinylog 설명서][1]를 기반으로 JSON 작성자 설정을 생성하세요.


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

#### 로그에 트레이스 ID 삽입

이 애플리케이션에 애플리케이션 성능 모니터링(APM)이 활성화된 경우 트레이스 ID를 삽입하여 로그와 트레이스의 관계를 연결할 수 있습니다. 자세한 정보는 [자바 로그 및 트레이스 연결하기][3]를 참조하세요.

### Raw 형식

{{< tabs >}}
{{% tab "Log4j" %}}

`log4j.xml`에서 파일 추가자 설정:

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

`log4j2.xml`에서 파일 추가자 설정:

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

`logback.xml`에서 파일 추가자 설정:

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

[공식 Tinylog 설명서][1]를 바탕으로 파일에 작성자 설정 아웃풋을 생성하세요.


`tinylog.properties` 파일에서 다음 형식을 사용하세요.

```properties
writer          = file
writer.level    = debug
writer.format   = {level} - {message} - "dd.trace_id":{context: dd.trace_id} - "dd.span_id":{context: dd.span_id}
writer.file     = log.txt
```

[1]: https://tinylog.org/v2/configuration/#json-writer
{{% /tab %}}
{{< /tabs >}}

#### 로그에 트레이스 ID 삽입

이 애플리케이션에 애플리케이션 성능 모니터링(APM)이 활성화된 경우 트레이스 ID를 삽입하여 로그와 트레이스의 관계를 연결할 수 있습니다. 자세한 정보는 [자바 로그 및 트레이스 연결하기][3]를 참조하세요.

로그와 트레이스의 관계를 연결하지 _않으면_ 위 설정 예시에 포함된 로그 패턴에서 MDC 자리표시자(`%X{dd.trace_id} %X{dd.span_id}`)를 제거할 수 있습니다.


## Datadog 에이전트 설정

[로그 수집이 활성화되면][4] [사용자 지정 로그 수집][5]을 설정해 로그 파일을 테일링하고 Datadog에 전송하세요.

1. `conf.d/` [에이전트 설정 디렉터리][6]에서 `java.d/` 폴더를 생성하세요.
2. 다음 콘텐츠가 포함된 `java.d/`에서 `conf.yaml` 파일 생성:

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

3. [에이전트를 다시 시작][7]합니다.
4. [에이전트의 상태 하위 명령][8]을 실행하고 `Checks` 섹션에서 `java`를 찾아 로그가 Datadog에 제출되었는지 확인하세요.

로그가 JSON 형식에 있는 경우 Datadog는 자동으로 [로그 메시지를 파싱][9]하여 로그 속성을 추출하세요. [로그 탐색기][10]를 사용하여 로그를 확인하고 트러블슈팅합니다.

## 에이전트리스 로깅

애플리케이션이 액세스할 수 없거나 파일에 기록할 수 없는 머신에서 실행 중인 예외 중인 경우, Datadog나 Datadog 에이전트에 직접 로그를 스트리밍하는 것이 가능합니다. 애플리케이션에서 연결 문제를 해결해야 하기 때문에 권장되는 설정은 아닙니다.

Datadog에 바로 로그 스트리밍하는 방법:

1. 코드에 Logback 로깅 라이브러리를 추가하거나 **현재 로거를 Logback에 연결하세요**.
2. **Logback 설정**을 통해 로그를 Datadog에 전송합니다.

### 자바 로깅 라이브러리에서 Logback으로 연결

이미 Logback을 사용 중인 경우 가장 일반적인 로깅 라이브러리가 Logback에 연결될 수 있습니다.

{{< tabs >}}
{{% tab "Log4j" %}}

Logback과 함께 SLF4J 모듈 [log4j-over-slf4j][1]을 사용하여 로그를 또 다른 서버로 전송합니다. `log4j-over-slf4j`는 애플리케이션의 Log4j를 완전히 대체하므로 코드 변경을 할 필요가 없습니다. 사용 방법:

1. `pom.xml` 파일에서 `log4j.jar` 종속성을 `log4j-over-slf4j.jar` 종속성으로 대체하고 Logback 종속성을 추가합니다.
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
2. Logback을 설정합니다.

**참고:** 이 변경 사항의 결과 Log4j 설정 파일이 더 이상 픽업되지 않습니다. [Log4j 번역기][2]를 사용해 `log4j.properties` 파일을 `logback.xml`에 마이그레이션합니다.


[1]: http://www.slf4j.org/legacy.html#log4j-over-slf4j
[2]: http://logback.qos.ch/translator/
{{% /tab %}}

{{% tab "Log4j 2" %}}

Log4j 2를 사용하면 원격 호스트에 로깅할 수 있지만 API 키를 사용해 로그의 접두어를 포함하는 기능을 제공하지 않습니다. 이 때문에 SLF4J 모듈 [log4j-over-slf4j][1] 및 Logback을 사용합니다. `log4j-to-slf4j.jar`은 애플리케이션에서 Log4j 2를 완전히 대체하므로 코드 변경을 할 필요가 없습니다. 사용 방법:

1. `pom.xml` 파일에서 `log4j.jar` 종속성을 `log4j-over-slf4j.jar` 종속성으로 대체하고 Logback 종속성을 추가합니다.
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
2. Logback을 설정합니다.

**참고**:

- `log4j-slf4j-impl.jar`이 여기에 설명된 대로 사용되지 **않았는지** 확인합니다.
https://logging.apache.org/log4j/log4j-2.2/log4j-to-slf4j/index.html
- 이 마이그레이션의 결과 Log4j 2 설정 파일이 더 이상 픽업되지 않습니다. [Log4j 번역기][2]를 사용해 `log4j.properties` 파일을 `logback.xml`에 마이그레이션하세요.

[1]: http://www.slf4j.org/legacy.html#log4j-over-slf4j
[2]: http://logback.qos.ch/translator
{{% /tab %}}

{{< /tabs >}}

### Logback 설정

Logback과 함께 [로그스태시-로그백-인코더][11] 로깅 라이브러리를 사용해 로그를 직접 Datadog로 스트리밍합니다.

1. `logback.xml` 파일에서 TCP 추가자를 설정합니다. 이 설정을 통해 `DD_API_KEY` 환경 변수에서 API 키를 검색할 수 있습니다. .대신, 설정 파일에 API 키를 직접 삽입할 수도 있습니다.

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
  지원되지 않습니다.
    {{< /site-region >}}

   **참고** XML 설정이 공백을 제거하므로  `%mdc{keyThatDoesNotExist}`이 추가됩니다. 접두어 파라미터에 대한 자세한 정보는 [Logback 설명서][12]를 참조하세요.

2. `pom.xml` 파일에 로그스태시(Logstash) 인코더 종속성을 추가하세요.

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

## 활용

컨텍스트 속성을 사용해 로그 이벤트를 보강하세요.

### 키 값 파서 사용하기

[키 값 파서][13]는 로그 이벤트에서 인식되는 `<KEY>=<VALUE>` 패턴을 추출합니다.

자바에서 로그 이벤트를 보강하기 위해 코드의 메시지를 다시 작성하고 `<KEY>=<VALUE>` 시퀀스를 사용할 수 있습니다.

예: 다음을 포함하는 경우:

```java
logger.info("Emitted 1001 messages during the last 93 seconds for customer scope prod30");
```

다음으로 변경:

```java
logger.info("Emitted quantity=1001 messages during the last durationInMs=93180 ms for customer scope=prod30");
```

키 값 파서가 활성화된 경우 각 페어가 JSON에서 추출됩니다.

```json
{
  "message": "Emitted quantity=1001 messages during the last durationInMs=93180 ms for customer scope=prod30",
  "scope": "prod30",
  "durationInMs": 93180,
  "quantity": 1001
}
```

필드로 *scope*을, 로그 측정 지표로 *durationInMs* 및 *quantity*를 사용할 수 있습니다.

### MDC

로그를 보강하는 또 다른 옵션은 자바의 [매핑된 진단 컨텍스트(MDC)][1]를 사용하는 것입니다.

SLF4J를 사용하는 경우 다음 자바 코드를 사용합니다.

```java
...
MDC.put("scope", "prod30");
logger.info("Emitted 1001 messages during the last 93 seconds");
...
```

이 JSON을 생성하는 방법:

```json
{
  "message": "Emitted 1001 messages during the last 93 seconds",
  "scope": "prod30"
}
```

**참고:** MDC는 문자열 유형만 허용하므로 숫자 값 메트릭을 사용하지 마세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://logback.qos.ch/manual/mdc.html
[2]: /ko/logs/log_configuration/parsing
[3]: /ko/tracing/other_telemetry/connect_logs_and_traces/java/
[4]: /ko/agent/logs/?tab=tailfiles#activate-log-collection
[5]: /ko/agent/logs/?tab=tailfiles#custom-log-collection
[6]: /ko/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[7]: /ko/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[8]: /ko/agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information]
[9]: /ko/logs/log_configuration/parsing/?tab=matchers
[10]: /ko/logs/explorer/#overview
[11]: https://github.com/logstash/logstash-logback-encoder
[12]: https://github.com/logstash/logstash-logback-encoder#prefixsuffixseparator
[13]: /ko/logs/log_configuration/parsing/#key-value-or-logfmt
[14]: /ko/glossary/#tail