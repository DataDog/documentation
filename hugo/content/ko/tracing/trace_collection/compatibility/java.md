---
aliases:
- /ko/tracing/compatibility_requirements/
- /ko/tracing/compatibility_requirements/java
- /ko/tracing/setup_overview/compatibility_requirements/java
code_lang: java
code_lang_weight: 0
description: Java Tracer의 호환성 요구 사항
further_reading:
- link: tracing/trace_collection/dd_libraries/java
  tag: 설명서
  text: 애플리케이션 계측
title: Java 호환성 요구 사항
type: multi-code-lang
---
## 호환성 {#compatibility}

Java Datadog 트레이스 라이브러리는 오픈 소스입니다. 자세한 내용은 [GitHub 리포지토리][1]를 참조하세요.

### 지원되는 Java 런타임 {#supported-java-runtimes}

Java Tracer는 다음 Oracle JDK, OpenJDK JVM 및 [GraalVM](#graalvm-native-image-support) 런타임에 대한 자동 계측을 지원합니다.

#### Java Tracer v1(최신) {#java-tracer-v1-latest}

<table>
  <thead>
    <th>Java 버전</th>
    <th>운영 체제</th>
    <th>지원 수준</th>
  </thead>
  <tr>
    <td>27 이상</td>
    <td>Windows(x86, x86-64)<br>Linux(x86, x86-64, arm64)<br>Mac(x86, x86-64, arm64)</td>
    <td><a href="#levels-of-support">미리보기</a></td>
  </tr>
  <tr>
    <td>18~26</td>
    <td>Windows(x86, x86-64)<br>Linux(x86, x86-64, arm64)<br>Mac(x86, x86-64, arm64)</td>
    <td><a href="#levels-of-support">정식 출시</a></td>
  </tr>
  <tr>
    <td rowspan="2">8~17</td>
    <td>Windows(x86, x86-64)<br>Linux(x86, x86-64)<br>Mac(x86, x86-64)</td>
    <td><a href="#levels-of-support">정식 출시</a></td>
  </tr>
  <tr>
    <td>Linux(arm64)<br>Mac(arm64)</td>
    <td><a href="#levels-of-support">미리보기</a></td>
  </tr>
</table>

Datadog은 얼리 액세스 버전 Java를 공식 지원하지 않습니다.

#### Java Tracer v0 {#java-tracer-v0}

| Java 버전      | 운영 체제                                                               | 지원 수준                     |
|--------------------|---------------------------------------------------------------------------------|-----------------------------------|
| 7 전용             | Windows(x86, x86-64)<br>Linux(x86, x86-64)<br>Mac(x86, x86-64)               | [지원 종료](#levels-of-support) |
| 7 전용             | Linux(arm64)<br>Mac(arm64)                                                    | [지원 종료](#levels-of-support) |

### 지원 수준 {#levels-of-support}

| **수준**                                              | **지원 내용**                                                                                                                                |
|--------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| <span id="support-unsupported">지원되지 않음</span>      |  구현 없음. 특별 요청은 [Datadog 지원팀][2]에 문의하세요.                                                                              |
| <span id="support-beta">미리 보기</span>                 |  초기 구현. 아직 모든 기능이 포함되어 있지 않을 수 있습니다. 새로운 기능 지원과 버그·보안 수정은 보장되지 않으며, 가능한 범위 내에서 제공됩니다. |
| <span id="support-ga">정식 출시(GA)</span> |  모든 기능의 완전한 구현. 신규 기능 및 버그 및 보안 수정에 대한 완전한 지원이 제공됩니다.                                                     |
| <span id="support-maintenance">유지 관리</span>      |  기존 기능의 완전한 구현. 신규 기능은 제공되지 않습니다. 버그 및 보안 수정에 대한 지원만 제공됩니다.                                  |
| <span id="support-eol">서비스 종료(EOL)</span>        |  지원 없음.                                                                                                                                        |

## 통합 {#integrations}

미리 보기 상태에서의 통합은 기본적으로 비활성화되어 있지만 개별적으로 활성화할 수 있습니다.

- 시스템 속성: `-Ddd.integration.<INTEGRATION_NAME>.enabled=true`
- 환경 변수: `DD_INTEGRATION_<INTEGRATION_NAME>_ENABLED=true`

### 웹 프레임워크 호환성 {#web-framework-compatibility}

`dd-java-agent`에는 다음 웹 프레임워크를 자동으로 추적하는 지원이 포함됩니다.

**웹 프레임워크 추적이 제공하는 항목:**

- HTTP 요청에서 응답까지 걸린 시간
- HTTP 요청 태그(상태 코드, 메서드 등)
- 오류 및 스택 트레이스 캡처
- 웹 요청 내에서 생성된 작업과 분산 추적을 연결합니다.

| 서버                  | 버전     | 지원 유형                                           | 구성에 사용되는 계측 이름             |
|-------------------------|--------------|--------------------------------------------------------|------------------------------------------------------------|
| Akka-HTTP 서버        | 10.0+        | 완전 지원                                        | `akka-http`, `akka-http-server`                            |
| Apache Pekko            | 1.0+         | 완전 지원                                        | `pekko-http`, `pekko-http-server`                          |
| Finatra 웹             | 2.9+         | 완전 지원                                        | `finatra`                                                  |
| Grizzly                 | 2.0+         | 완전 지원                                        | `grizzly`                                                  |
| Grizzly-HTTP            | 2.3.20+      | 완전 지원                                        | `grizzly-filterchain`                                      |
| Java Servlet 호환 | 2.3+, 3.0+   | 완전 지원                                        | `servlet`, `servlet-2`, `servlet-3`                        |
| Jax-RS 어노테이션      | JSR311-API   | 완전 지원                                        | `jax-rs`, `jaxrs`, `jax-rs-annotations`, `jax-rs-filter`   |
| Jetty                   | 7.0~12.x     | 완전 지원                                        | `jetty`                                                    |
| Micronaut HTTP 서버   | 2.x+         | 완전 지원                                        | `micronaut`                                                |
| Mulesoft                | 4.5.0+       | 완전 지원                                        | `mule`                                                     |
| Netty HTTP 서버       | 3.8+         | 완전 지원                                        | `netty`, `netty-3.8`, `netty-4.0`, `netty-4.1`             |
| Play                    | 2.3~2.8      | 완전 지원                                        | `play`, `play-action`                                      |
| Ratpack                 | 1.5+         | 완전 지원                                        | `ratpack`                                                  |
| Restlet HTTP 서버     | 2.2~2.4    | 완전 지원                                        | `restlet-http`.                                            |
| Spark Java              | 2.3+         | [미리 보기](#framework-integrations-disabled-by-default) | `sparkjava`(`jetty` 필수)                             |
| Spring Boot             | 1.5+         | 완전 지원                                        | `spring-web` 또는 `spring-webflux`                           |
| Spring Web(MVC)        | 4.0+         | 완전 지원                                        | `spring-web`                                               |
| Spring WebFlux          | 5.0+         | 완전 지원                                        | `spring-webflux`                                           |
| Tomcat                  | 5.5+         | 완전 지원                                        | `tomcat`                                                   |
| Undertow                | 2.0+         | 완전 지원                                        | `undertow`                                                 |
| Vert.x                  | 3.4~5.x    | 완전 지원                                        | `vertx`, `vertx-3.4`, `vertx-3.9`, `vertx-4.0`, `vertx-5.0`|
| 웹소켓(JSR356)      | 1.0+         | [미리 보기](#framework-integrations-disabled-by-default) | `websocket`                                                |

**참고**: 많은 애플리케이션 서버는 서블릿과 호환 가능하며, Websphere, Weblogic, JBoss와 같은 서버는 해당 계측에 의해 자동으로 계측됩니다.
또한, Spring Boot(버전 3)와 같은 프레임워크는 일반적으로 Tomcat, Jetty, 또는 Netty와 같은 지원되는 내장형 애플리케이션 서버를 사용하기 때문에 별도 조치 없이 작동합니다.

### 기본적으로 비활성화 상태인 프레임워크 통합{#framework-integrations-disabled-by-default}

다음의 계측은 기본적으로 비활성화되어 있으며, 아래 설정을 통해 활성화할 수 있습니다.

| 계측              | 활성화 방법 									                                                                              |
|------------------------------|----------------------------------------------------------------------------------------------------------|
| Grizzly                      | `-Ddd.integration.grizzly-client.enabled=true`                                                           |
| Grizzly-HTTP                 | `-Ddd.integration.grizzly-filterchain.enabled=true`                                                      |
| Hazelcast(클라이언트측만 해당) | `-Ddd.integration.hazelcast.enabled=true` </br> `-Ddd.integration.hazelcast_legacy.enabled=true`         |
| Ignite                       | `-Ddd.integration.ignite.enabled=true`                                                                   |
| JAX-WS                       | `-Ddd.integration.jax-ws.enabled=true`                                                                   |
| JDBC Datasource              | `-Ddd.integration.jdbc-datasource.enabled=true`                                                          |
| Mulesoft                     | `-Ddd.integration.mule.enabled=true`                                                                     |
| Netty Promise                | `-Ddd.integration.netty-promise.enabled=true`                                                            |
| Ning                         | `-Ddd.integration.ning.enabled=true`                                                                     |
| Spark Java                   | `-Ddd.integration.sparkjava.enabled=true`                                                                |
| TIBCO BusinessWorks          | `-Ddd.integration.tibco.enabled=true`                                                                    |
| URL 연결               | `-Ddd.integration.urlconnection.enabled=true` </br> `-Ddd.integration.httpurlconnection.enabled=true`    |
| Websocket                    | `-Ddd.trace.websocket.messages.enabled=true`                                                             |
| ZIO                          | `-Ddd.integration.zio.experimental.enabled=true`                                                         |


**참고**: JAX-WS 통합은 @WebService(JAX-WS 1.x) 및 @WebServiceProvider(JAX-WS 2.x) 어노테이션이 적용된 엔드포인트를 계측합니다.

원하는 웹 프레임워크를 찾을 수 없나요? Datadog은 지속적으로 지원 범위를 확대하고 있습니다. 도움이 필요하면 [Datadog 지원][2]에 문의하세요.

### 네트워킹 프레임워크 호환성 {#networking-framework-compatibility}

`dd-java-agent`는 다음 네트워킹 프레임워크에 대한 자동 추적 기능을 지원합니다.

**네트워킹 추적은 다음을 제공합니다.**

- 요청에서 응답까지의 시간 측정
- 요청에 대한 태그(예: 응답 코드)
- 오류 및 스택 트레이스 캡처
- 분산 추적

| 프레임워크                          | 버전    | 지원 유형                                           | 구성에 사용되는 계측 이름          |
|------------------------------------|-------------|--------------------------------------------------------|---------------------------------------------------------|
| Apache HTTP Client                 | 4.0+        | 완전 지원                                        | `httpclient`, `apache-httpclient`, `apache-http-client` |
| Apache HTTP Async Client           | 4.0+        | 완전 지원                                        | `httpasyncclient`, `apache-httpasyncclient`             |
| AWS Java SDK                       | 1.11+, 2.2+ | 완전 지원                                        | `aws-sdk`                                               |
| Camel-OpenTelemetry                | 3.12.0+     | 미리 보기                                                | [opentelemetry-1][5]                                    |
| Commons HTTP Client                | 2.0+        | 완전 지원                                        | `commons-http-client`                                   |
| Google HTTP Client                 | 1.19.0+     | 완전 지원                                        | `google-http-client`                                    |
| Google Pub/Sub                     | 1.116.0+    | 완전 지원                                        | `google-pubsub`                                         |
| Grizzly HTTP Client                | 1.9+        | [미리 보기](#framework-integrations-disabled-by-default) | `grizzly-client`                                        |
| gRPC                               | 1.5+        | 완전 지원                                        | `grpc`, `grpc-client`, `grpc-server`                    |
| HttpURLConnection                  | 모두         | 완전 지원                                        | `httpurlconnection`, `urlconnection`                    |
| Kafka-Clients                      | 0.11+       | 완전 지원                                        | `kafka`                                                 |
| Kafka-Streams                      | 0.11+       | 완전 지원                                        | `kafka`, `kafka-streams`                                |
| Java RMI                           | 모두         | 분산 추적 미지원                      | `rmi`, `rmi-client`, `rmi-server`                       |
| Jax RS Clients                     | 2.0+        | 완전 지원                                        | `jax-rs`, `jaxrs`, `jax-rs-client`                      |
| Jersey Client                      | 1.9~2.29    | 완전 지원                                        | `jax-rs`, `jaxrs`, `jax-rs-client`                      |
| JMS / Jakarta JMS                  | 1~3.0+      | 완전 지원                                        | `jms`, `jms-1`, `jms-2`, `jakarta-jms`                  |
| Netty HTTP Client                  | 4.0+        | 완전 지원                                        | `netty`, `netty-4.0`, `netty-4.1`                       |
| Ning HTTP Client                   | 1.9.0+      | [미리 보기](#framework-integrations-disabled-by-default) | `ning`                                                  |
| OkHTTP                             | 2.2+        | 완전 지원                                        | `okhttp`, `okhttp-2`,`okhttp-3`                         |
| Play WSClient                      | 1.0+        | 완전 지원                                        | `play-ws`                                               |
| Rabbit AMQP                        | 2.7+        | 완전 지원                                        | `amqp`, `rabbitmq`                                      |
| SOFA RPC                           | 5.0+        | 완전 지원                                        | `sofarpc`                                               |
| Spring SessionAwareMessageListener | 3.1+        | 완전 지원                                        | `spring-jms-3.1`                                        |
| Spring WebClient                   | 5.0+        | 완전 지원                                        | `spring-webflux`, `spring-webflux-client`               |

**Kafka 참고 사항**: Datadog의 Kafka 통합은 헤더 API를 지원하는 Kafka 버전 `0.11+`과 함께 작동합니다. 이 API는 트레이스 컨텍스트를 주입하고 추출하는 데 사용됩니다. 혼합 버전 환경에서 실행 중인 경우, Kafka 브로커가 최신 Kafka 버전을 잘못 보고할 수 있습니다. 이로 인해 SDK가 로컬 프로듀서에서 지원되지 않는 헤더를 주입하려고 할 때 문제가 발생합니다. 또한, 이전 소비자는 헤더의 존재로 인해 메시지를 소비할 수 없습니다. 이러한 문제를 방지하기 위해, 0.11보다 이전 버전의 혼합 버전 Kafka 환경에서 실행 중인 경우, 환경 변수 `DD_KAFKA_CLIENT_PROPAGATION_ENABLED=false`로 컨텍스트 전파를 비활성화하세요.

**JMS 참고 사항**: Datadog의 JMS 통합은 소비자와 프로듀서 서비스 간의 컨텍스트 전파를 유지하기 위해 메시지 객체 속성 `x__dash__datadog__dash__trace__dash__id` 및 `x__dash__datadog__dash__parent__dash__id`를 자동으로 추가하고 읽습니다.

**Camel 참고 사항**: Camel 경로를 통한 분산 트레이스 전파는 지원되지 않습니다.

**SOFA RPC 참고 사항**: Datadog의 SOFA RPC 통합은 Bolt, Triple 및 REST 전송 프로토콜을 지원합니다. Triple은 gRPC 전송을 사용합니다; Triple 호출에 대한 분산 추적은 `grpc` 통합이 활성화된 상태를 유지해야 합니다.

원하는 네트워킹 프레임워크를 찾을 수 없나요? Datadog은 지속적으로 지원 범위를 확대하고 있습니다. 도움이 필요하면 [Datadog 지원][2]에 문의하세요.

### Datastore 호환성{#data-store-compatibility}

`dd-java-agent`에는 다음 데이터베이스 프레임워크/드라이버 자동 추적 지원이 포함됩니다.

**Datastore 추적은 다음을 제공합니다.**

- 요청에서 응답까지의 시간 측정
- 쿼리 정보(예: 민감한 정보가 제거된 쿼리 문자열)
- 오류 및 스택 트레이스 캡처

| 데이터베이스                | 버전 | 지원 유형    | 구성에 사용되는 계측 이름                                             |
|-------------------------|----------|-----------------|--------------------------------------------------------------------------------------------|
| Aerospike               | 4.0+     | 완전 지원 | `aerospike`                                                                                |
| Couchbase               | 2.0+     | 완전 지원 | `couchbase`                                                                                |
| Cassandra               | 3.0+     | 완전 지원 | `cassandra`                                                                                |
| Elasticsearch Transport | 2.0+     | 완전 지원 | `elasticsearch`, `elasticsearch-transport`, `elasticsearch-transport-{2,5,6,7}`(하나 선택) |
| Elasticsearch Rest      | 5.0+     | 완전 지원 | `elasticsearch`, `elasticsearch-rest`, `elasticsearch-rest-{5,6,7}`(하나 선택)             |
| Ignite                  | 2.0~3.0  | [미리 보기](#framework-integrations-disabled-by-default) | `ignite`                                            |
| JDBC                    | 해당 없음      | 완전 지원 | `jdbc`, `jdbc-datasource`                                                                  |
| Jedis                   | 1.4+     | 완전 지원 | `jedis`, `redis`                                                                           |
| Lettuce                 | 4.0+     | 완전 지원 | `lettuce`, `lettuce-4-async`, `lettuce-5-rx`                                               |
| MongoDB                 | 3.0~4.0+ | 완전 지원 | `mongo`                                                                                    |
| OpenSearch Rest         | 1.x~2.x  | 완전 지원 | `opensearch`, `opensearch-rest`                                                            |
| OpenSearch Transport    | 1.x-2.x  | 완전 지원 | `opensearch`, `opensearch-transport`                                                       |
| RediScala               | 1.5+     | 완전 지원 | `rediscala`, `redis`                                                                       |
| Redisson                | 2.x~3.x  | 완전 지원 | `redisson`, `redis`                                                                        |
| SpyMemcached            | 2.12+    | 완전 지원 | `spymemcached`                                                                             |
| Vert.x Cassandra Client | 3.9~4.x  | 완전 지원 | `cassandra`																			                                                             |
| Vert.x Redis Client     | 3.9~4.x  | 완전 지원 | `vertx-redis-client`                                                                       |
| Vert.x MySQL Client     | 3.9~4.x  | 완전 지원 | `vertx-sql-client`																		                                                       |

**참고**: Redis 6.0+는 `HELLO`, `MIGRATE`, 및 `ACL SETUSER`와 같은 명령에서 인라인 인증을 지원합니다.

  - **Datadog Trace Agent**: 트레이스 메타데이터에서 인증 파라미터가 자동으로 숨겨지도록 하려면 최소 `7.76.1` 버전 이상 사용을 권장합니다.
  - **Datadog Lambda Extension**(Serverless 환경): 최소 요구 버전은 `v28.0.0`입니다.

`dd-java-agent` 다음과 같은 일반 JDBC 드라이버와도 호환됩니다.

- Apache Derby
- Firebird SQL
- H2 Database Engine
- HSQLDB
- IBM DB2
- MariaDB
- MSSQL(Microsoft SQL Server)
- MySQL
- Oracle
- Postgres SQL
- ScalikeJDBC

### 기본적으로 비활성화 상태인 데이터베이스 통합{#database-integrations-disabled-by-default}

다음의 계측은 기본적으로 비활성화되어 있으며, 아래 설정을 통해 활성화할 수 있습니다.

| 계측   | 활성화 방법 									                             |
|-------------------|-------------------------------------------------|
| JDBC-Datasource		 | - 시스템 속성: `-Ddd.integration.jdbc-datasource.enabled=true`<br /> - 환경 변수: `DD_INTEGRATION_JDBC_DATASOURCE_ENABLED=true` |

원하는 데이터스토어를 찾을 수 없나요? Datadog은 지속적으로 지원 범위를 확대하고 있습니다. 도움이 필요하면 [Datadog 지원][2]에 문의하세요.

### 추가 프레임워크 호환성 {#additional-framework-compatibility}

`dd-java-agent`는 다음 프레임워크에 대한 자동 추적 기능을 지원합니다.

| 프레임워크           | 버전         | 지원 유형                                           | 구성에 사용되는 계측 이름 |
|---------------------|------------------|--------------------------------------------------------|------------------------------------------------|
| Apache CXF(Jax-WS) | 3.0+             | [OpenTelemetry Extension][10]                          | `cxf`                                          |
| Datanucleus JDO     | 4.0+             | 완전 지원                                        | `datanucleus`                                  |
| Dropwizard Views    | 0.7+             | 완전 지원                                        | `dropwizard`, `dropwizard-view`                |
| GraphQL             | 14.0+            | 완전 지원                                        | `graphql-java`                                 |
| Hazelcast(클라이언트)  | 3.6+             | [미리 보기](#framework-integrations-disabled-by-default) | `hazelcast`, `hazelcast_legacy`                |
| Hibernate           | 3.5+             | 완전 지원                                        | `hibernate`, `hibernate-core`                  |
| Hystrix             | 1.4+             | 완전 지원                                        | `hystrix`                                      |
| JSP Rendering       | 2.3+             | 완전 지원                                        | `jsp`, `jsp-render`, `jsp-compile`             |
| JUnit               | 4.1+, 5.3+       | 완전 지원                                        | `junit`, `junit-4`, `junit-5`                  |
| Kotlin Coroutines   | 1.3+             | 완전 지원                                        | `kotlin_coroutine`                             |
| Project Reactor     | 3.1+             | 완전 지원                                        | `reactor-core`                                 |
| Quartz              | 2.x              | 완전 지원                                        | `quartz`                                       |
| RxJava              | 2.x              | 완전 지원                                        | `rxjava`                                       |
| Spring Data         | 1.8+             | 완전 지원                                        | `spring-data`                                  |
| Spring Scheduling   | 3.1+             | 완전 지원                                        | `spring-scheduling`                            |
| TIBCO BusinessWorks | 5.14.0~6.11.0  | [미리 보기](#framework-integrations-disabled-by-default) | `tibco`, `tibco_bw`                            |
| Twilio SDK          | < 8.0            | 완전 지원                                        | `twilio-sdk`                                   |

원하는 프레임워크를 찾을 수 없나요? Datadog은 지속적으로 지원 범위를 확대하고 있습니다. 프레임워크를 요청하려면 [지원팀][2]에 문의하세요.

지원되지 않는 프레임워크를 사용하는 애플리케이션에 대한 가시성을 개선하려면 다음을 고려하세요.

- [커스텀 계측 추가하기][3].
- 향후 릴리스에 포함될 수 있도록 계측 기능을 구현한 [풀 요청 제출하기][4].
- [Datadog 지원팀][2]에 문의하고 기능 요청 제출하기.

### 통합 비활성화 {#disabling-integrations}

대부분의 통합은 기본적으로 활성화되어 있습니다. 다음 설정으로 기본값을 비활성화로 변경할 수 있습니다.

- 시스템 속성: `-Ddd.integrations.enabled=false`
- 환경 변수: `DD_INTEGRATIONS_ENABLED=false`

통합은 개별적으로 활성화 또는 비활성화할 수 있습니다(위의 기본값을 재정의).

- 시스템 속성: `-Ddd.integration.<INTEGRATION_NAME>.enabled=true`
- 환경 변수: `DD_INTEGRATION_<INTEGRATION_NAME>_ENABLED=true`

(각 통합의 이름은 위를 참조하세요.)

### 알려진 문제 {#known-issues}

- Bitbucket에서 Java 트레이서를 실행하는 것은 지원되지 않습니다.
- APM/트레이스 기능을 수행하는 여러 Java 에이전트를 로드하는 것은 권장되지 않거나 지원되지 않는 구성입니다.
- Java 24+에서 SDK를 실행할 때 JNI 네이티브 액세스와 관련된 경고가 표시될 수 있습니다. `--enable-native-access=ALL-UNNAMED` 플래그를 추가하여 이러한 경고를 억제하세요. 자세한 정보는 [JEP 472][13]을 참조하세요.

## 사전 컴파일(AOT) 클래스 로딩 및 링크 지원 {#ahead-of-time-aot-class-loading-linking-support}

시작 시간을 단축하기 위해, 사전 컴파일(AOT) 클래스 로딩 및 링크는 JVM이 시작할 때 애플리케이션 클래스를 즉시 로드되고 링크된 상태로 사용할 수 있게 합니다. 자세한 정보는 [JEP 483][14] 및 [JEP 514][15]를 참조하세요.

### 요구 사항 {#requirements}

사용:

- Java 25 이상
- [Datadog Java SDK][1] 1.57.0 이상

### 설정 {#setup}

APM을 위한 AOT 클래스 로딩 및 링크를 설정하려면 훈련 실행 중에 Datadog Java SDK를 추가하세요.

```shell
java -javaagent:/path/to/dd-java-agent.jar -XX:AOTCacheOutput=app.aot -jar App.jar
```

#### 사용 {#usage}

운영 중에는 이전에 캐시된 훈련 데이터와 함께 동일한 Datadog Java SDK를 추가하세요.

```shell
java -javaagent:/path/to/dd-java-agent.jar -XX:AOTCache=app.aot -jar App.jar
```

[Trace Explorer][9]를 사용하여 트레이스를 조회할 수 있습니다.

{{% collapse-content title="문제 해결" level="h4" %}}
##### 훈련 실행 중에 Datadog Java SDK가 연결되지 않음 {#not-attaching-the-datadog-java-sdk-during-the-training-run}

운영 중에 이 경고가 표시되면 훈련 중에 Datadog Java SDK가 연결되지 않았음을 의미합니다.

```
Mismatched values for property jdk.module.addmods: java.instrument specified during runtime but not during dump time
```
이 경우 JVM은 AOT 캐시를 사용하여 시작 시간을 개선할 수 없습니다. 해결 방법은 훈련 중에 SDK를 연결하는 것입니다.

{{% /collapse-content %}}

## GraalVM Native Image 지원 {#graalvm-native-image-support}

GraalVM Native Image는 Java 애플리케이션을 네이티브 실행 파일로 컴파일할 수 있게 해주는 기술입니다. Datadog Java SDK는 GraalVM Native Image를 지원합니다. 이를 통해 애플리케이션을 네이티브 실행 파일로 컴파일하면서도 라이브러리에서 제공하는 추적 기능의 이점을 누릴 수 있습니다.

### 요구 사항 {#requirements-1}

사용:

- [GraalVM JDK 21 또는 JDK 25][7]
- [Datadog Java SDK][1]

### 설정 {#setup-1}

{{< tabs >}}
{{% tab "GraalVM" %}}
GraalVM Native Image를 사용해 Datadog Java SDK를 설정하려면 다음 단계를 따르세요.

1. 애플리케이션을 계측하려면 [Java 애플리케이션 추적][6]에 나와 있는 단계를 따르세요.
2.  `native-image` 명령으로 네이티브 실행 파일을 빌드할 때 `-J-javaagent:/path/to/dd-java-agent.jar` 인수를 추가하세요. 예:
   ```shell
   native-image -J-javaagent:/path/to/dd-java-agent.jar -jar App.jar
   ```
3. (선택 사항) 다음 인수를 추가하여 프로파일러 통합을 활성화하세요.
`-J-Ddd.profiling.enabled=true --enable-monitoring=jfr`.
   -  `1.39.1` 이전의 트레이서 버전의 경우, 생성된 네이티브 실행 파일을 실행할 때 `DD_PROFILING_START_FORCE_FIRST=true`가 환경 변수로 설정되어 있는지 확인하세요.

[6]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
{{% /tab %}}

{{% tab "Quarkus Native" %}}
Quarkus Native를 사용하여 Datadog Java SDK를 설정하려면 다음 단계를 따르세요.

1. 애플리케이션을 계측하려면 [Java 애플리케이션 추적][6]에 나와 있는 단계를 따르세요.
2. 네이티브 실행 파일을 빌드할 때 `quarkus.native.additional-build-args` 속성을 사용하세요. 예:
   ```shell
   ./mvnw package -Dnative -Dquarkus.native.additional-build-args='-J-javaagent:/path/to/dd-java-agent.jar'
   ```
3. (선택 사항) 다음 인수를 추가하여 프로파일러 통합을 활성화하세요.
`-J-Ddd.profiling.enabled=true --enable-monitoring=jfr`.
   -  `1.39.1` 이전의 트레이서 버전의 경우, 생성된 네이티브 실행 파일을 실행할 때 `DD_PROFILING_START_FORCE_FIRST=true`가 환경 변수로 설정되어 있는지 확인하세요.

[6]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
{{% /tab %}}

{{% tab "Spring Native" %}}
Spring Native를 사용하여 Datadog Java SDK를 설정하려면 다음 단계를 따르세요.

1. 애플리케이션을 계측하려면 [Java 애플리케이션 추적][6]에 나와 있는 단계를 따르세요.
2. Buildpacks를 기반으로 한 Spring Native 빌드의 경우, `BP_DATADOG_ENABLED=true`를 사용하여 [Datadog용 Paketo Buildpack][8]을 활성화하세요.
    - 다음과 같이 Maven 등의 빌드 도구 수준에서 설정할 수 있습니다.
     ```yaml
     <build>
     <plugins>
       <plugin>
         <groupId>org.springframework.boot</groupId>
         <artifactId>spring-boot-maven-plugin</artifactId>
         <configuration>
           <image>
             ...
             <env>
               ...
               <BP_DATADOG_ENABLED>true</BP_DATADOG_ENABLED>
               ...
             </env>
           </image>
         </configuration>
       </plugin>
     </plugins>
     </build>
     ```
   - 또는 `pack build` 명령을 `--env BP_DATADOG_ENABLED=true` 옵션과 함께 사용하여 Datadog 빌드팩을 활성화할 수 있습니다.
3. (선택 사항) 환경 변수 `BP_NATIVE_IMAGE_BUILD_ARGUMENTS=’-J-Ddd.profiling.enabled=true --enable-monitoring=jfr’`를 설정하여 프로파일러 통합을 활성화하세요.
   -  `1.39.1` 이전의 트레이서 버전의 경우, 생성된 네이티브 실행 파일을 실행할 때 `DD_PROFILING_START_FORCE_FIRST=true`가 환경 변수로 설정되어 있는지 확인하세요.

[6]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
[8]: https://github.com/paketo-buildpacks/datadog
{{% /tab %}}

{{< /tabs >}}

<div class="alert alert-info">GraalVM 25에서는 <code>Use of Unsafe</code>관련 오류가 발생할 수 있습니다. 이 문제를 해결하려면 네이티브 실행 파일을 빌드할 때 <code>-Dnet.bytebuddy.safe=false</code> 를 추가하세요.</div>

#### 사용 {#usage-1}

설정이 완료되면 서비스는 Datadog에 트레이스를 전송해야 합니다.

[Trace Explorer][9]를 사용하여 트레이스를 조회할 수 있습니다.

{{% collapse-content title="문제 해결" level="h4" %}}
##### 네이티브 이미지에 대해 기능이 활성화되지 않았거나 올바르게 구성되지 않음 {#features-are-not-enabled-or-configured-correctly-for-native-images}

Graal Native Image로 빌드된 바이너리에서 런타임에 시스템 속성에 접근하는 데 알려진 문제가 있습니다.

- 런타임 구성의 경우, 시스템 속성(`-Ddd.property.name=value`) 대신 환경 변수(`DD_PROPERTY_NAME=value`)를 사용하세요.
- 이 규칙의 예외는 프로파일러를 활성화하는 경우입니다. 이 경우에는 _빌드 시_ `-J-Ddd.profiling.enabled=true`을 `native-image` 도구에 전달하세요.

##### 5.12.2 보다 이전 버전의 네이티브 이미지 빌드팩 {#native-image-buildpack-versions-older-than-5122}

오래된 네이티브 이미지 빌드팩 버전은 `USE_NATIVE_IMAGE_JAVA_PLATFORM_MODULE_SYSTEM` 옵션을 노출합니다.

이 옵션이 `false`일 때, 다음과 같은 예외가 발생할 수 있습니다.

```text
Caused by: org.graalvm.compiler.java.BytecodeParser$BytecodeParserError:
com.oracle.graal.pointsto.constraints.UnsupportedFeatureException:
No instances of datadog.trace.bootstrap.DatadogClassLoader are allowed in the image heap
as this class should be initialized at image runtime. To see how this object got
instantiated use --trace-object-instantiation=datadog.trace.bootstrap.DatadogClassLoader.
```

이 문제에 대한 해결책은 다음과 같습니다.

- 이미지 env 구성에서 `USE_NATIVE_IMAGE_JAVA_PLATFORM_MODULE_SYSTEM`을 명시적으로 true로 설정하세요.
- 또는 `native-image` 빌드팩을 5.12.2 버전 이상으로 업그레이드하세요. 이 작업을 수행하는 가장 좋은 방법은 `java-native-image` 빌드팩을 8.13.0 이상으로 업그레이드하는 것입니다.

##### 4.6.0 보다 이전 버전의 Datadog용 Paketo 빌드팩 {#paketo-buildpack-for-datadog-versions-older-than-460}

이전 버전의 Datadog용 Paketo 빌드팩에는 다음과 같은 오류 메시지를 발생시키는 버그가 있습니다.

```text
disabling Datadog at launch time is unsupported for Node
ERROR: failed to launch: exec.d: failed to execute exec.d file at path '/layers
paketo-buildpacks_datadog/helper/exec.d/toggle': exit status 1
```

이 문제에 대한 해결책은 4.6.0 이상으로 업그레이드하는 것입니다.

##### Spring Native 빌드가 exec.d/toggle 오류로 인해 충돌함 {#spring-native-build-crashes-with-execdtoggle-error}

Spring Boot 네이티브 이미지를 빌드할 때, 4.6.0보다 최신 빌드팩 버전에서도 위와 유사한 오류가 발생할 수 있습니다.

```text
disabling Datadog at launch time is unsupported for Node
ERROR: failed to launch: exec.d: failed to execute exec.d file at path '/layers
paketo-buildpacks_datadog/helper/exec.d/toggle': exit status 1
```

이는 일반적으로 Datadog 빌드팩이 네이티브 이미지 빌드팩보다 먼저 실행되기 때문에, 네이티브 이미지 빌드가 의도되었다는 것을 알지 못하기 때문입니다. 이로 인해 최종 네이티브 실행 파일과 호환되지 않는 JVM 빌드를 위한 토글 스크립트가 잘못 추가됩니다.

해결책은 `spring-boot-maven-plugin` 구성에서 `BP_NATIVE_IMAGE` 환경 변수를 `true`로 명시적으로 설정하는 것입니다. 이렇게 하면 모든 빌드팩이 처음부터 네이티브 이미지 빌드임을 인식하게 됩니다.

```yaml
<build>
  <plugins>
    <plugin>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-maven-plugin</artifactId>
      <configuration>
        <image>
          ...
          <env>
            ...
            <BP_NATIVE_IMAGE>true</BP_NATIVE_IMAGE>
            ...
          </env>
        </image>
      </configuration>
    </plugin>
  </plugins>
</build>
```

##### Datadog SDK 활성화 문제 {#problem-activating-datadog-sdk}

트레이서 구성이 UDS(Unix Domain Socket)에 의존하는 경우 초기화 오류가 발생할 수 있으며, 이는 네이티브 이미지에서 지원되지 않습니다.

```text
dd.trace 2024-12-30 08:34:43:306 +0000] [main] WARN datadog.trace.agent.tooling.nativeimage.TracerActivation - Problem activating datadog tracer
java.lang.NoClassDefFoundError: Could not initialize class jnr.unixsocket.UnixSocketChannel
```

해결책은 소켓 기반 통신(`socket` 모드) 대신 호스트(`hostip` 또는 `service` 모드)를 사용하도록 Java 트레이서를 구성하는 것입니다.

자세한 내용은 [APM 및 DogstatsD 통신 모드 구성][11]을 참조하세요. Admission Controller에 의존하지 않는 설정은 [DD_TRACE_AGENT_URL][12]에 대한 문서를 참조하세요.

{{% /collapse-content %}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-java
[2]: https://www.datadoghq.com/support/
[3]: /ko/tracing/manual_instrumentation/java
[4]: https://github.com/DataDog/documentation#outside-contributors
[5]: /ko/tracing/trace_collection/otel_instrumentation/java/
[7]: https://www.graalvm.org/downloads/
[9]: /ko/tracing/trace_explorer/
[10]: /ko/opentelemetry/interoperability/instrumentation_libraries/?tab=java
[11]: /ko/containers/cluster_agent/admission_controller/?tab=datadogoperator#configure-apm-and-dogstatsd-communication-mode
[12]: /ko/tracing/trace_collection/library_config/#agent
[13]: https://openjdk.org/jeps/472
[14]: https://openjdk.org/jeps/483
[15]: https://openjdk.org/jeps/514