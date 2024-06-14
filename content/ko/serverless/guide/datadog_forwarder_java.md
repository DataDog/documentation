---
kind: 가이드
title: Datadog 포워더를 사용해 Java 서버리스 애플리케이션 계측
---
## 개요

<div class="alert alert-warning">
Datadog 서버리스를 처음 사용하신다면 <a href="/serverless/installation/go">Datadog Lambda 확장을 사용해 Lambda 함수를 계측하는 방법</a>을 따르세요. Lambda가 즉시 사용 가능한 기능을 제공하기 전에 Datadog 포워더를 사용하여 Datadog 서버리스를 설정한 경우, 이 가이드를 사용하여 인스턴스를 유지 관리하세요.
</div>

<div class="alert alert-danger">
일부 예전 버전의 <code>datadog-lambda-java</code>에서는  <code>log4j <=2.14.0</code>을 전이 종속성으로 가져옵니다. <a href="#upgrading">업그레이드 지침</a>은 아래를 참고하세요.
</div>

## 사전 필수 요건

AWS Lambda 트레이스, 향상된 메트릭, 커스텀 메트릭, 로그를 수집하려면 [Datadog 포워더 Lambda 함수][2]가 필요합니다.

분산 트레이싱으로 서버리스 애플리케이션을 완전히 계측하려면 Java Lamda 함수가 Java 8 Corretto(`java8.al2`), Java 11(`java11`), Java 17(`java17`) 런타임을 사용해야 합니다.

## 구성

### 설치

다음 코드 블록 중 하나를  `pom.xml`(Maven) 또는 `build.gradle`(Gradle)에 추가해하여 Datadog Lambda 라이브러리를 로컬에 설치하세요. 아래 `VERSION`을 최신 릴리즈로 교체하세요 (앞의 `v` 생략): ![Maven Cental][4]
{{< tabs >}}
{{% tab "Maven" %}}

`pom.xml`에 다음 종속성을 포함하세요:

```xml
<dependency>
  <groupId>com.datadoghq</groupId>
  <artifactId>datadog-lambda-java</artifactId>
  <version>VERSION</version>
</dependency>
```

{{% /tab %}}
{{% tab "Gradle" %}}

`build.gradle`에 다음을 포함하세요:

```groovy
dependencies {
  implementation 'com.datadoghq:datadog-lambda-java:VERSION'
}
```
{{% /tab %}}
{{< /tabs >}}

### 계측


1. 함수에 Datadog Lambda Layer를 설치하세요. 최신 `VERSION`은 `{{< latest-lambda-layer-version layer="dd-trace-java" >}}`입니다.

    ```yaml
    arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-java:<VERSION>
    ```

2. 함수에서 다음 환경 변수를 설정합니다:

    ```yaml
    JAVA_TOOL_OPTIONS: -javaagent:"/opt/java/lib/dd-java-agent.jar" -XX:+TieredCompilation -XX:TieredStopAtLevel=1
    DD_LOGS_INJECTION: true
    DD_JMXFETCH_ENABLED: false
    DD_TRACE_ENABLED: true
    ```

3. Datadog Lambda 라이브러리에서 제공하는 래퍼를 사용해 Lambda 처리기 함수를 래핑합니다.

    ```java
    public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {
        public Integer handleRequest(APIGatewayV2ProxyRequestEvent request, Context context){
            DDLambda ddl = new DDLambda(request, context); //Required to initialize the trace

            do_some_stuff();
            make_some_http_requests();

            ddl.finish(); //Required to finish the active span.
            return new ApiGatewayResponse();
        }
    }
    ```

### 구독

각 함수 로그 그룹에서 Datadog 포워더 Lambda 함수를 연결하세요. 그러면 메트릭, 트레이스, 로그를 Datadog으로 보낼 수 있습니다.

1. [아직 설치하지 않았다면 Datadog 포워더를 설치하세요][2].
2. [ Datadog 포워더를 함수 로그 그룹에 연결하세요][5].

### Java Lambda 함수 콜드 스타트 모니터링

콜드 스타트는 서버리스 애플리케이션에서 트래픽이 갑자기 급증할 때 발생합니다. 이전에 함수가 비활성화 상태였거나 요청 수신 수가 비교적 일정했던 경우에 발생할 수 있습니다. 사용자는 콜드 스타트를 느린 응답 시간이나 지연으로 인식할 수 있습니다. Datadog은 Java Lambda 함수 콜드 스타트에 대한 모니터를 설정하고, Datadog 서버리스 인사이트를 사용하여 [콜드 스타트를 최소화][6]할 것을 권장합니다.

{{< img src="serverless/java-monitor-cold-starts.png" alt="Java Lambda 함수 콜드 스타트 모니터링" style="width:100%;">}}

Java Lambda 함수 콜드 스타트에서 Datadog 모니터를 생성하려면, 다음 기준에 따라 [모니터 생성 단계][7]를 따르세요:
- 메트릭 이름: `aws.lambda.enhanced.invocations`
- 시작: `runtime:java*` 및 `cold_start:true`
- 알림 그룹화: 다중 알림, 각각의 `function_arn`에 대해 별도의 알림을 트리거

### 태그

선택 사항: Datadog에서는 서버리스 애플리케이션을 `env`, `service`, `version`와 같은 예약된 태그로 태깅하는 것을 추천합니다. 예약된 태그에 대한 자세한 내용은 [통합된 서비스 태깅 설명서][8]를 참고하세요.

## 탐색

위 단계를 따라 함수를 설정한 후, [서버리스 홈페이지][9]에서 메트릭, 로그, 트레이스를 확인하세요.

### 커스텀 비즈니스 로직 모니터링

커스텀 메트릭을 제출하려면 아래 코드 예시를 참고하세요:

```java
public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {
    public Integer handleRequest(APIGatewayV2ProxyRequestEvent request, Context context){
        DDLambda ddl = new DDLambda(request, context);

        Map<String,Object> myTags = new HashMap<String, Object>();
            myTags.put("product", "latte");
            myTags.put("order","online");

        // Submit a custom metric
        ddl.metric(
            "coffee_house.order_value", // Metric name
            12.45,                      // Metric value
            myTags);                    // Associated tags

        URL url = new URL("https://example.com");
        HttpURLConnection hc = (HttpURLConnection)url.openConnection();
        hc.connect();

        ddl.finish();
    }
}
```

커스텀 메트릭 제출에 대한 자세한 내용은 [커스텀 메트릭 설명서][10]를 참고하세요.

### 로그 및 트레이스 연결

Java Lambda 함수 로그와 트레이스를 자동으로 연결하려면 [Java 로그 및 트레이스 연결][11]에서 자세한 지침을 확인하세요.

<div class="alert alert-info"> 잘못된 Java 런타임을 사용하면 <code>zip 파일 열기 오류나 JAR 매니페스트 누락: /opt/java/lib/dd-java-agent.jar</code>와 같은 오류가 발생할 수 있습니다. 위에서 언급한 것처럼 <code>java8.al2</code> 또는 <code>java11</code>을 런타임으로 사용하세요.</div>

## 업그레이드하기

Apache Foundation은 일반적으로 많이 사용되는 Java 로깅 라이브러리인 log4j가 [원격 코드 실행에 취약][12]하다고 발표했습니다.
`datadog-lambda-java`의 일부 버전에는 취약한 log4j의 전이 종속성이 포함되어 있습니다. 취약한 버전은 다음과 같습니다:

-  `<=0.3.3`
-  `1.4.0`

`datadog-lambda-java`의 최신 버전은 ![Maven Cental][4]입니다. 아래 업그레이드 지침을 따를 때 이 버전을 사용하세요(앞의 `v` 생략).

`1.4.x`로 업그레이드하고 싶지 않다면 `0.3.x`가 최신 log4j 보안 패치와 함께 업데이트되어 있음을 참고하세요.
`0.3.x`의 최신 버전은 [`datadog-lambda-java` 리포지토리][13]에서 찾을 수 있습니다.

Lambda 함수의 `datadog-lambda-java` 종속성 버전은 `pom.xml`(Maven) 또는 `build.gradle`(Gradle)입니다.

{{< tabs >}}
{{% tab "Maven" %}}

`pom.xml` 파일에는 다음과 유사한 섹션이 포함되어 있습니다:

```xml
<dependency>
  <groupId>com.datadoghq</groupId>
  <artifactId>datadog-lambda-java</artifactId>
  <version>VERSION</version>
</dependency>
```

`VERSION`을 위에서 언급한 최신 버전의 `datadog-lambda-java`로 교체하세요.
 그런 다음  Lambda 함수를 다시 배포합니다.

{{% /tab %}}

{{% tab "Gradle" %}}

`build.gradle` 파일에는 다음과 유사한 섹션이 포함되어 있습니다:

```groovy
dependencies {
  implementation 'com.datadoghq:datadog-lambda-java:VERSION'
}
```

`VERSION`을 위에서 언급한 최신 버전의 `datadog-lambda-java`로 교체하세요.
 그런 다음  Lambda 함수를 다시 배포합니다.

{{% /tab %}}
{{< /tabs>}}

0.3.x에서 1.4.x로 업그레이드하고 `dd-trace-java` 트레이서를 사용하려면, `dd-trace-java` Lambda 레이어 레퍼런스를 찾아 다음으로 변경하세요:

```
arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-java:4
```


[2]: /ko/serverless/forwarder/
[3]: /ko/serverless/enhanced_lambda_metrics
[4]: https://img.shields.io/maven-central/v/com.datadoghq/datadog-lambda-java
[5]: /ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[6]: /ko/serverless/insights#cold-starts
[7]: /ko/monitors/types/metric/?tab=threshold#overview
[8]: /ko/getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[9]: https://app.datadoghq.com/functions
[10]: /ko/serverless/custom_metrics?tab=java
[11]: /ko/tracing/other_telemetry/connect_logs_and_traces/java/
[12]: https://www.datadoghq.com/log4j-vulnerability/
[13]: https://github.com/DataDog/datadog-lambda-java/releases