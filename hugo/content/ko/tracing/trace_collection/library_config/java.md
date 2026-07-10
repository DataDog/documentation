---
code_lang: java
code_lang_weight: 0
further_reading:
- link: https://github.com/DataDog/dd-trace-java
  tag: 소스 코드
  text: Datadog Java APM 소스 코드
- link: tracing/glossary/
  tag: 설명서
  text: 서비스, 리소스, 트레이스 둘러보기
- link: /tracing/trace_collection/trace_context_propagation/
  tag: 설명서
  text: 헤더를 사용하여 트레이스 컨텍스트 프로퍼게이션하기
- link: /opentelemetry/interoperability/environment_variable_support
  tag: 설명서
  text: OpenTelemetry 환경 변수 설정
- link: https://learn.datadoghq.com/courses/apm-java-host
  tag: 학습 센터
  text: Java 애플리케이션용 APM 설정
title: Java SDK 구성하기
type: multi-code-lang
---
코드로 SDK를 설정한 다음 에이전트를 설정하여 애플리케이션 성능 모니터링(APM) 데이터를 수집한 후에는 필요시 [Unified Service Tagging][1] 설정 등, 원하는 대로 SDK를 구성합니다.

{{% apm-config-visibility %}}

아래의 모든 구성 옵션은 시스템 속성과 환경 변수에 해당합니다.
두 가지 모두 동일한 키 유형이 설정된 경우, 시스템 속성 구성이 우선합니다.
시스템 속성은 JVM 플래그로 설정할 수 있습니다.

### 시스템 속성과 환경 변수 간 전환 {#converting-between-system-properties-and-environment-variables}
별도로 명시되지 않는 한, 다음 변환 규칙을 사용하여 시스템 속성과 환경 변수 간에 전환할 수 있습니다.

- 시스템 속성을 환경 변수로 설정하려면, 속성 이름을 대문자로 변환하고 `.` 또는 `-`를 `_`으로 교체합니다.
  예를 들어 `dd.service`를 `DD_SERVICE`로 수정합니다.
- 환경 변수를 시스템 속성으로 설정하려면, 변수 이름을 소문자로 바꾸고 `_`을 `.`로 교체합니다.
  예를 들어 `DD_TAGS`를 `dd.tags`로 수정합니다.

**참고**: Java 트레이서의 시스템 속성을 사용할 때는 `-jar` 앞에 속성을 나열합니다. 이렇게 하면 속성이 JVM 옵션으로 읽힙니다.

## 구성 옵션 {#configuration-options}

### Unified Service Tagging {#unified-service-tagging}

`dd.service`
: **환경 변수**: `DD_SERVICE`<br>
**기본값**: `unnamed-java-app`<br>
동일한 작업을 수행하는 프로세스 세트의 이름입니다. 애플리케이션 통계를 그룹화하는 데 사용됩니다. 버전 0.50.0 이상에서 사용 가능합니다.

`dd.env`
: **환경 변수**: `DD_ENV`<br>
**기본값**: `none`<br>
애플리케이션 환경(예: production, staging). 버전 0.48 이상에서 사용 가능합니다.

`dd.version`
: **환경 변수**: `DD_VERSION`<br>
**기본값**: `null`<br>
내 애플리케이션 버전(예: 2.5, 202003181415, 1.3-alpha). 버전 0.48 이상에서 사용 가능합니다.

### 트레이스 {#traces}

`dd.trace.enabled`
: **환경 변수**: `DD_TRACE_ENABLED`<br>
**기본값**: `true`<br>
`false` 트레이싱 Agent가 비활성화될 때.<br/>
[DD_APM_TRACING_ENABLED][21]도 참조하세요.

`dd.trace.config`
: **환경 변수**: `DD_TRACE_CONFIG`<br>
**기본값**: `null`<br>
구성 속성이 각 줄마다 하나씩 제공되는 파일의 선택적 경로입니다. 예를 들어, 파일 경로는 `-Ddd.trace.config=<FILE_PATH>.properties`를 통해 제공될 수 있으며, 파일 내에서 서비스 이름을 `dd.service=<SERVICE_NAME>`<br>로 설정합니다.
**참고**: SDK 의존 제품(예: Profiler 및 Dynamic Instrumentation)을 활성화하거나 비활성화하는 유일한 메커니즘으로 `dd.trace.config`에 의존하지 마세요. 대신, 해당 시스템 속성이나 환경 변수를 사용하세요(또는 단일 단계 계측을 위해 `application_monitoring.yaml`을 사용하세요). 

`dd.service.mapping`
: **환경 변수**: `DD_SERVICE_MAPPING`<br>
**기본값**: `null`<br>
**예**: `mysql:my-mysql-service-name-db, postgresql:my-postgres-service-name-db`<br>
구성을 통해 서비스의 이름을 동적으로 변경합니다. 다양한 서비스에서 데이터베이스에 고유한 이름을 부여하는 데 유용합니다.

`dd.writer.type`
: **환경 변수**: `DD_WRITER_TYPE`<br>
**기본값**: `DDAgentWriter`<br>
기본 값은 트레이스를 에이전트로 전송합니다. `LoggingWriter`로 구성하면 트레이스가 콘솔에 기록됩니다.

`dd.trace.agent.port`
: **환경 변수**: `DD_TRACE_AGENT_PORT`<br>
**기본값**: `8126`<br>
구성된 호스트에 대해 에이전트가 수신 대기하는 포트 번호입니다. [에이전트 구성][6]이 `receiver_port` 또는 `DD_APM_RECEIVER_PORT`를 기본값인 `8126` 이외의 값으로 설정하면, `dd.trace.agent.port` 또는 `dd.trace.agent.url`도 일치해야 합니다.

`dd.trace.agent.unix.domain.socket`
: **환경 변수**: `DD_TRACE_AGENT_UNIX_DOMAIN_SOCKET`<br>
**기본값**: `null`<br>
이것은 트레이스 트래픽을 프록시로 전달하는 데 사용되며, 이후 원격 Datadog Agent로 전송됩니다.

`dd.trace.agent.url`
: **환경 변수**: `DD_TRACE_AGENT_URL`<br>
**기본값**: `null`<br>
트레이스를 전송할 대상 URL입니다. [에이전트 구성][6]이 `receiver_port` 또는 `DD_APM_RECEIVER_PORT`를 기본값인 `8126` 이외의 값으로 설정하면, `dd.trace.agent.port` 또는 `dd.trace.agent.url`도 일치해야 합니다. URL 값은 HTTP를 사용하여 연결하기 위해 `http://`로 시작하거나 Unix 도메인 소켓을 사용하기 위해 `unix://`로 시작할 수 있습니다. 설정되면 `DD_AGENT_HOST` 및 `DD_TRACE_AGENT_PORT`보다 우선합니다. 버전 0.65 이상에서 사용 가능합니다.

`dd.trace.agent.timeout`
: **환경 변수**: `DD_TRACE_AGENT_TIMEOUT`<br>
**기본값**: `10`<br>
Datadog Agent와의 네트워크 상호작용을 위한 초 단위 타임아웃입니다.

`dd.trace.client-ip.enabled`
: **기본값**: `false` <br>
HTTP 요청 스팬에서 관련 IP 헤더의 클라이언트 IP 수집을 활성화합니다. `dd.appsec.enabled=true`일 때 자동으로 활성화됩니다.

`dd.trace.header.tags`
: **환경 변수**: `DD_TRACE_HEADER_TAGS`<br>
**기본값**: `null`<br>
**예**: `CASE-insensitive-Header:my-tag-name,User-ID:userId,My-Header-And-Tag-Name`<br>
대소문자를 구분하지 않는 헤더 키와 태그 이름의 맵을 수용하며, 일치하는 헤더 값을 트레이스의 태그로 자동 적용합니다. 지정된 태그 이름이 없는 항목도 수용하며, 각각 `http.request.headers.<header-name>` 및 `http.response.headers.<header-name>` 형태의 태그로 자동 매핑됩니다.<br><br>
버전 0.96.0 이전에는 이 설정이 요청 헤더 태그에만 적용되었습니다. 이전 동작으로 되돌리려면 설정 `-Ddd.trace.header.tags.legacy.parsing.enabled=true` 또는 환경 변수 `DD_TRACE_HEADER_TAGS_LEGACY_PARSING_ENABLED=true`를 추가하세요.<br><br>
버전 1.18.3부터, 이 서비스가 실행되는 곳에서 [Agent Remote Configuration][3]이 활성화되어 있으면 [카탈로그][4] UI에서 `DD_TRACE_HEADER_TAGS`를 설정할 수 있습니다.

`dd.trace.request_header.tags`
: **환경 변수**: `DD_TRACE_REQUEST_HEADER_TAGS`<br>
**기본값**: `null`<br>
**예**: `CASE-insensitive-Header:my-tag-name,User-ID:userId,My-Header-And-Tag-Name`<br>
대소문자를 구분하지 않는 헤더 키와 태그 이름의 맵을 수용하며, 일치하는 요청 헤더 값을 트레이스의 태그로 자동 적용합니다. 지정된 태그 이름이 없는 항목도 수용하며, `http.request.headers.<header-name>` 형태의 태그로 자동 매핑됩니다.<br>
버전 0.96.0부터 사용 가능합니다.

`dd.trace.response_header.tags`
: **환경 변수**: `DD_TRACE_RESPONSE_HEADER_TAGS`<br>
**기본값**: `null`<br>
**예**: `CASE-insensitive-Header:my-tag-name,User-ID:userId,My-Header-And-Tag-Name`<br>
대소문자를 구분하지 않는 헤더 키와 태그 이름의 맵을 수용하며, 일치하는 응답 헤더 값을 트레이스의 태그로 자동 적용합니다. 지정된 태그 이름이 없는 항목도 수용하며, `http.response.headers.<header-name>` 형태의 태그로 자동 매핑됩니다.<br>
버전 0.96.0부터 사용 가능합니다.

`dd.trace.header.baggage`
: **환경 변수**: `DD_TRACE_HEADER_BAGGAGE`<br>
**기본값**: `null`<br>
**예**: `CASE-insensitive-Header:my-baggage-name,User-ID:userId,My-Header-And-Baggage-Name`<br>
대소문자를 구분하지 않는 헤더 키와 baggage 키 이름의 맵을 수용하며, 일치하는 요청 헤더 값을 트레이스의 baggage로 자동 적용합니다. 전파 시 역 매핑이 역방향 매핑이 적용되어: Baggage가 헤더에 매핑됩니다.<br>
버전 1.3.0부터 사용 가능합니다.

`dd.trace.annotations`
: **환경 변수**: `DD_TRACE_ANNOTATIONS`<br>
**기본값**: ([목록 보기][7])<br>
**예**: `com.some.Trace;io.other.Trace`<br>
`@Trace`로 처리할 메서드 주석 목록입니다.

`dd.trace.methods`
: **환경 변수**: `DD_TRACE_METHODS`<br>
**기본값**: `null`<br>
**예**: `package.ClassName[method1,method2,...];AnonymousClass$1[call];package.ClassName[*]`<br>
트레이스할 클래스/인터페이스 및 메서드 목록입니다. `@Trace`를 추가하는 것과 유사하지만 코드는 변경하지 않습니다. **참고:** 와일드카드 메서드 지원(`[*]`)은 constructors, getter, setter, synthetic, toString, equals, hashcode 또는 finalizer 메서드 호출을 수용하지 않습니다.
`dd.trace.methods` 는 대량의 메서드와 클래스를 추적하기 위한 것이 아닙니다. CPU, 메모리 및 IO 병목 현상을 메서드 이름, 클래스 이름 및 줄 번호별로 찾으려면 대신 [Continuous Profiler][22] 제품을 고려하세요.

`dd.trace.classes.exclude`
: **환경 변수**: `DD_TRACE_CLASSES_EXCLUDE`<br>
**기본값**: `null`<br>
**예**: `package.ClassName,package.ClassName$Nested,package.Foo*,package.other.*`<br>
SDK가 무시(수정하지 않음)할 정규화된 클래스 목록입니다. 접두사를 나타내기 위해 이름 끝에 와일드카드가 사용될 수 있습니다. 이름에는 JVM 내부 표현을 사용해야 합니다(예: package.ClassName$Nested가 아닌 package.ClassName.Nested)

`dd.trace.partial.flush.min.spans`
: **환경 변수**: `DD_TRACE_PARTIAL_FLUSH_MIN_SPANS`<br>
**기본값**: `1000`<br>
플러시할 부분 스팬의 수를 설정합니다. 트래픽이 많거나 긴 실행 트레이스를 처리할 때 메모리 오버헤드를 줄이는 데 유용합니다.

`dd.trace.split-by-tags`
: **환경 변수**: `DD_TRACE_SPLIT_BY_TAGS`<br>
**기본값**: `null`<br>
**예**: `aws.service`<br>
해당 스팬 태그로 식별될 수 있도록 스팬과 관련된 서비스 이름을 바꾸는 데 사용됩니다.

`dd.trace.health.metrics.enabled`
: **환경 변수**: `DD_TRACE_HEALTH_METRICS_ENABLED`<br>
**기본값**: `true`<br>
`true`로 설정된 경우, 트레이서 상태 메트릭을 전송합니다.

`dd.trace.health.metrics.statsd.host`
: **환경 변수**: `DD_TRACE_HEALTH_METRICS_STATSD_HOST`<br>
**기본값**: `dd.jmxfetch.statsd.host`와 동일 <br>
상태 메트릭을 전송할 대상 Statsd 호스트

`dd.trace.health.metrics.statsd.port`
: **환경 변수**: `DD_TRACE_HEALTH_METRICS_STATSD_PORT`<br>
**기본값**: `dd.jmxfetch.statsd.port`와 동일 <br>
상태 메트릭을 전송할 대상 Statsd 포트

`dd.trace.obfuscation.query.string.regexp`
: **환경 변수**: `DD_TRACE_OBFUSCATION_QUERY_STRING_REGEXP`<br>
**기본값**: `null`<br>
수신 요청의 쿼리 문자열에서 `http.url` 태그로 보고되는 민감한 데이터를 가리기 위한 정규식입니다. 일치하는 항목은 <redacted>로 대체됩니다.

`dd.trace.servlet.async-timeout.error`
: **환경 변수**: `DD_TRACE_SERVLET_ASYNC_TIMEOUT_ERROR` <br>
**기본값**: `true`<br>
기본적으로, 장기 실행 비동기 요청은 오류로 표시됩니다. 이 값을 false로 설정하면 모든 타임아웃을 성공적인 요청으로 표시할 수 있습니다.

`dd.trace.span.tags`
: **환경 변수**: `DD_TRACE_SPAN_TAGS`<br>
**기본값**: `none`<br>
**예**: `tag1:value1,tag2:value2`<br>
모든 스팬에 추가될 기본 태그 목록입니다.

`dd.trace.jmx.tags`
: **환경 변수**: `DD_TRACE_JMX_TAGS`<br>
**기본값**: `none`<br>
**예**: `tag1:value1,tag2:value2`<br>
모든 jmx 메트릭에 추가될 스팬 태그 목록입니다.

`dd.trace.startup.logs`
: **환경 변수**: `DD_TRACE_STARTUP_LOGS`<br>
**기본값**: `true`<br>
`false`일 때, 정보 시작 로깅이 비활성화됩니다. 버전 0.64 이상에서 사용 가능합니다.

`dd.trace.debug`
: **환경 변수**: `DD_TRACE_DEBUG`<br>
**기본값**: `false`<br>
`true`일 때, Datadog Java Tracer의 디버그 모드가 활성화됩니다.

`datadog.slf4j.simpleLogger.jsonEnabled`
: **환경 변수**: 사용 불가<br>
**기본값**: `false`<br>
`true`일 때, Datadog Java SDK 로그가 JSON 형식으로 기록됩니다. 버전 1.48.0 이상에서 사용 가능합니다.<br>
**참고**: 이 설정은 내장된 SLF4J 단순 로거에만 적용되며, 환경 변수는 지원하지 않습니다. `dd.log.format.json`은 선호되는 구성 옵션입니다.

`dd.trace.servlet.principal.enabled`
: **환경 변수**: `DD_TRACE_SERVLET_PRINCIPAL_ENABLED`<br>
**기본값**: `false`<br>
`true`일 때, 사용자 주체가 수집됩니다. 버전 0.61 이상에서 사용 가능합니다.

`dd.trace.rate.limit`
: **환경 변수**: `DD_TRACE_RATE_LIMIT`<br>
**기본값**: `100`<br>
`DD_TRACE_SAMPLING_RULES` 또는 `DD_TRACE_SAMPLE_RATE`가 설정된 경우, 프로세스별로 초당 샘플링할 수 있는 스팬의 최대 개수입니다. 그렇지 않으면 Datadog Agent가 속도 제한을 제어합니다.

`dd.http.server.tag.query-string`
: **환경 변수**: `DD_HTTP_SERVER_TAG_QUERY_STRING`<br>
**기본값**: `true`<br>
`true`로 설정된 경우, 쿼리 문자열 파라미터와 프래그먼트가 웹 서버 스팬에 추가됩니다.

`dd.http.server.route-based-naming`
: **환경 변수**: `DD_HTTP_SERVER_ROUTE_BASED_NAMING`<br>
**기본값**: `true`<br>
`false`로 설정된 경우, HTTP 프레임워크 경로가 리소스 이름에 사용되지 않습니다. _설정이 바뀌면 리소스 이름 및 이를 기반으로 생성된 메트릭이 변경될 수 있습니다._

`dd.trace.http.server.path-resource-name-mapping`<br>
: **환경 변수**: `DD_TRACE_HTTP_SERVER_PATH_RESOURCE_NAME_MAPPING`<br>
**기본값**: `{}`(비어 있음) <br>
HTTP 요청 경로를 사용자 정의 리소스 이름에 매핑합니다. 쉼표로 구분된 `pattern:resource_name` 쌍의 목록을 제공합니다.<br>
&nbsp;&nbsp;&nbsp;&ndash; `pattern`: `http.path_group` 스팬 태그의 값과 일치해야 하는 [Ant 스타일 경로 패턴][20]입니다.<br>
&nbsp;&nbsp;&nbsp;&ndash; `resource_name`: 패턴이 일치할 경우 할당할 사용자 정의 리소스 이름입니다.<br>
일치하는 패턴의 `resource_name`으로 `*`가 사용되는 경우, 원래의 비정규화된 요청 경로와 HTTP 메서드를 조합한 값이 리소스 이름으로 사용됩니다. 예를 들어 규칙 `/test/**:*`이 주어진 상태에서 `/test/some/path`에 대한 `GET` 요청이 있으면 리소스 이름은 `GET /test/some/path`가 됩니다.<br>
매핑은 우선순위에 따라 평가되며, 첫 번째로 일치하는 규칙이 적용됩니다. 일치하지 않는 요청 경로는 기본 정규화 동작을 사용합니다.<br>
**예**: `-Ddd.trace.http.server.path-resource-name-mapping=/admin/*.jsp:/admin-page,/admin/user/**:/admin/user`를 사용하면 다음과 같은 결과를 얻습니다.<br>
요청 경로 | 리소스 경로
------------ | -------------
`/admin/index.jsp` | `/admin-page`
`/admin/user/12345/delete` | `/admin/user`
`/user/12345` | `/user/?`

`dd.trace.http.client.path-resource-name-mapping`<br>
: **환경 변수**: `DD_TRACE_HTTP_CLIENT_PATH_RESOURCE_NAME_MAPPING`<br>
**기본값**: `{}`(비어 있음) <br>
HTTP 클라이언트 요청 경로를 사용자 정의 리소스 이름에 매핑합니다. `dd.trace.http.server.path-resource-name-mapping`과 동일한 형식을 사용하지만 서버 스팬 대신 HTTP 클라이언트 스팬에 적용됩니다.

`dd.trace.status404rule.enabled`
: **환경 변수**: `DD_TRACE_STATUS404RULE_ENABLED`<br>
**기본값**: `true`<br>
기본적으로 HTTP 404 응답은 '404'를 스팬 리소스 이름으로 사용합니다. `false`일 때, HTTP 404 응답은 원래 URL 경로를 리소스 이름으로 유지합니다.

`dd.trace.128.bit.traceid.generation.enabled`
: **환경 변수**: `DD_TRACE_128_BIT_TRACEID_GENERATION_ENABLED`<br>
**기본값**: `true`<br>
`true`일 때, SDK는 128비트 트레이스 ID를 생성하고, 빈 자리를 0으로 채운 32자리 소문자 16진수 형식으로 인코딩합니다.

`dd.trace.128.bit.traceid.logging.enabled`
: **환경 변수**: `DD_TRACE_128_BIT_TRACEID_LOGGING_ENABLED`<br>
**기본값**: `false`<br>
`true`일 때, SDK는 128비트 트레이스 ID는 빈 자리를 0으로 채운 32자리 소문자 16진수로 주입하고, 64비트 트레이스 ID는 십진수로 주입합니다. 그렇지 않으면 SDK는 항상 트레이스 ID를 십진수로 주입합니다.

`dd.trace.otel.enabled`
: **환경 변수**: `DD_TRACE_OTEL_ENABLED`<br>
**기본값**: `false`<br>
`true`일 때, OpenTelemetry 기반의 [사용자 정의][16] 계측을 위한 추적이 활성화됩니다.

`dd.trace.cloud.payload.tagging.services`
: **환경 변수**: `DD_TRACE_CLOUD_PAYLOAD_TAGGING_SERVICES`<br>
**기본값**: `ApiGateway,ApiGatewayV2,EventBridge,Sqs,Sns,S3,Kinesis`<br>
**예**: `S3,Sso`<br>
추가 서비스에 대한 [AWS 페이로드 태깅][18]을 활성화하려면 이 설정을 사용하세요.

`dd.trace.cloud.request.payload.tagging`
: **환경 변수**: `DD_TRACE_CLOUD_REQUEST_PAYLOAD_TAGGING`<br>
**기본값**: 해당 없음(비활성화)<br>
**예**: `$.Metadata.UserId,$.phoneNumber`<br>
AWS SDK 요청에서 삭제할 JSONPath 항목의 쉼표로 구분된 문자열입니다. 이 설정을 사용하면 요청에 대해 [AWS 페이로드 태깅][18]이 활성화됩니다.

`dd.trace.cloud.response.payload.tagging`
: **환경 변수**: `DD_TRACE_CLOUD_RESPONSE_PAYLOAD_TAGGING`<br>
**기본값**: 해당 없음(비활성화)<br>
**예**: `$.Metadata.Credentials.*`<br>
AWS SDK 응답에서 삭제할 JSONPath 항목의 쉼표로 구분된 문자열입니다. 이 설정을 사용하면 응답에 대해 [AWS 페이로드 태깅][18]이 활성화됩니다.

`dd.trace.cloud.payload.tagging.max-depth`
: **환경 변수**: `DD_TRACE_CLOUD_PAYLOAD_TAGGING_MAX_DEPTH`<br>
**기본값**: `10`<br>
[AWS 페이로드 태깅][18]에 사용할 AWS SDK 요청/응답 페이로드의 최대 깊이를 나타내는 정수입니다.

`dd.trace.cloud.payload.tagging.max-tags`
: **환경 변수**: `DD_TRACE_CLOUD_PAYLOAD_TAGGING_MAX_TAGS`<br>
**기본값**: `758`<br>
[AWS 페이로드 태깅][18]에 사용할 스팬당 추출할 최대 태그 수를 나타내는 정수입니다.

### 에이전트 {#agent}

`dd.tags`
: **환경 변수**: `DD_TAGS`<br>
**기본값**: `null`<br>
**예**: `layer:api,team:intake,key:value`<br>
모든 스팬, 프로파일 및 JMX 메트릭에 추가할 기본 태그 목록입니다. DD_ENV 또는 DD_VERSION이 사용될 경우, DD_TAGS에 정의된 env 또는 version 태그를 덮어씁니다. 버전 0.50.0 이상에서 사용 가능합니다.

`dd.agent.host`
: **환경 변수**: `DD_AGENT_HOST`<br>
**기본값**: `localhost`<br>
트레이스를 전송할 대상 호스트의 이름입니다. 컨테이너화된 환경을 사용하는 경우, 이를 호스트 IP로 구성하세요. 자세한 내용은 [Tracing Docker 애플리케이션][5]을 참조하세요.

`dd.instrumentation.telemetry.enabled`
: **환경 변수**: `DD_INSTRUMENTATION_TELEMETRY_ENABLED`<br>
**기본값**: `true`<br>
`true`인 경우, 트레이서가 [텔레메트리 데이터][8]를 수집합니다. 버전 0.104 이상에서 사용 가능합니다. 버전 0.115 이상에서는 기본값이 `true`입니다.

### 데이터베이스 {#databases}

`dd.trace.db.client.split-by-instance`
: **환경 변수**: `DD_TRACE_DB_CLIENT_SPLIT_BY_INSTANCE` <br>
**기본값**: `false`<br>
`true`로 설정된 경우, db 스팬에 인스턴스 이름이 서비스 이름으로 할당됩니다.

`dd.trace.db.client.split-by-host`
: **환경 변수**: `DD_TRACE_DB_CLIENT_SPLIT_BY_HOST` <br>
**기본값**: `false`<br>
`true`로 설정된 경우, db 스팬에 원격 데이터베이스 호스트 이름이 서비스 이름으로 할당됩니다.

`dd.dbm.propagation.mode`
: **환경 변수**: `DD_DBM_PROPAGATION_MODE` <br>
**기본값**: `null`<br>
`service` 또는 `full`로 설정된 경우, Database Monitoring 및 APM 상관관계가 활성화됩니다. 자세한 내용은 [Database Monitoring과 트레이스 상호 연결][23]을 참조하세요.

### AAP {#aap}

`dd.appsec.enabled`
: **환경 변수**: `DD_APPSEC_ENABLED`<br>
**기본값**: `false`<br>
`true`일 때, Datadog 앱 및 API Protection Monitoring이 활성화됩니다. 또한, 이로 인해 클라이언트 IP 수집이 자동으로 활성화됩니다(`dd.trace.client-ip.enabled`).<br>
자세한 내용은 [Java용 AAP 활성화][19]를 참조하세요.

### 오류 {#errors}

`dd.trace.http.client.tag.query-string`
: **시스템 속성(지원 중단됨)**: `dd.http.client.tag.query-string`<br>
**환경 변수**: `DD_TRACE_HTTP_CLIENT_TAG_QUERY_STRING`<br>
**환경 변수(지원 중단됨)**: `DD_HTTP_CLIENT_TAG_QUERY_STRING`<br>
**기본값**: `true`<br>
기본적으로 쿼리 문자열 파라미터와 프래그먼트가 웹 클라이언트 스팬의 `http.url` 태그에 추가됩니다. 이 데이터를 수집하지 않으려면 `false`로 설정하세요.

`dd.trace.http.client.error.statuses`
: **환경 변수**: `DD_TRACE_HTTP_CLIENT_ERROR_STATUSES`<br>
**기본값**: `400-499`<br>
오류 상태 코드 범위를 지정할 수 있습니다. 기본적으로 4xx 오류는 HTTP 클라이언트의 오류로 보고되지만 이 구성을 사용하면 해당 동작을 재정의할 수 있습니다. 예: `dd.trace.http.client.error.statuses=400-403,405,410-499`

`dd.trace.http.server.error.statuses`
: **환경 변수**: `DD_TRACE_HTTP_SERVER_ERROR_STATUSES`<br>
**기본값**: `500-599`<br>
오류 상태 코드 범위를 지정할 수 있습니다. 기본적으로 5xx 상태 코드는 HTTP 서버의 오류로 보고되지만 이 구성을 사용하면 해당 동작을 재정의할 수 있습니다. 예: `dd.trace.http.server.error.statuses=500,502-599`

`dd.grpc.client.error.statuses`
: **환경 변수**: `DD_GRPC_CLIENT_ERROR_STATUSES`<br>
**기본값**: `1-16`<br>
오류 상태 코드 범위를 지정할 수 있습니다. 기본적으로 gRPC 상태 코드 1~16은 gRPC 클라이언트의 오류로 보고되지만 이 구성을 사용하면 해당 동작을 재정의할 수 있습니다. 예: `dd.grpc.client.error.statuses=1-4,7-10`

`dd.grpc.server.error.statuses`
: **환경 변수**: `DD_GRPC_SERVER_ERROR_STATUSES`<br>
**기본값**: `2-16`<br>
오류 상태 코드 범위를 지정할 수 있습니다. 기본적으로 gRPC 상태 코드 2~16은 gRPC 서버의 오류로 보고되지만 이 구성을 사용하면 해당 동작을 재정의할 수 있습니다. 예: `dd.grpc.server.error.statuses=2-4,7-10`

### 로그 {#logs}

`dd.log.level`
: **환경 변수**: `DD_LOG_LEVEL`<br>
**기본값**: `INFO`<br>
Datadog Java Tracer의 내부 로그 수준을 설정합니다. 유효한 값: `DEBUG`, `INFO`, `WARN`, `ERROR`.<br>
버전 1.36.0부터 사용 가능

`dd.log.format.json`
: **환경 변수**: `DD_LOG_FORMAT_JSON`<br>
**기본값**: `false`<br>
`true`일 때, Datadog Java Tracer 로그를 Datadog Logs UI와 호환되는 JSON 형식으로 출력합니다.<br>
버전 1.58.0부터 사용 가능

`dd.logs.injection`
: **환경 변수**: `DD_LOGS_INJECTION`<br>
**기본값**: `true`<br>
Datadog 트레이스 및 스팬 ID에 대한 자동 MDC 키 인젝션이 활성화되어 있습니다. 자세한 내용은 [고급 사용][2]을 참조하세요.<br><br>
버전 1.18.3부터, 이 서비스가 실행되는 곳에서 [Agent Remote Configuration][3]이 활성화되어 있으면 [카탈로그][4] UI에서 `DD_LOGS_INJECTION`를 설정할 수 있습니다.

### 트레이스 컨텍스트 전파 {#trace-context-propagation}

유효한 값 및 다음 구성 옵션 사용에 대한 정보는 [Java Trace Context 프로퍼게이션][15]을 참조하세요.

`dd.trace.propagation.style.inject`
: **환경 변수**: `DD_TRACE_PROPAGATION_STYLE_INJECT`<br>
**기본값**: `datadog,tracecontext`<br>
서비스 간 분산 트레이스를 프로퍼게이션하기 위해 포함할 헤더 형식을 쉼표로 구분하여 지정한 목록입니다.<br>
버전 1.9.0부터 사용 가능

`dd.trace.propagation.style.extract`
: **환경 변수**: `DD_TRACE_PROPAGATION_STYLE_EXTRACT`<br>
**기본값**: `datadog,tracecontext`<br>
분산 트레이스 전파 데이터를 추출하기 위해 시도할 헤더 형식을 쉼표로 구분하여 지정한 목록입니다. 완전하고 유효한 헤더를 가진 첫 번째 형식이 계속할 트레이스를 결정하는 데 사용됩니다.<br>
버전 1.9.0부터 사용 가능

`dd.trace.propagation.style`
: **환경 변수**: `DD_TRACE_PROPAGATION_STYLE`<br>
**기본값**: `datadog,tracecontext`<br>
분산 트레이스 전파 데이터를 주입하고 추출하기 위해 시도할 헤더 형식을 쉼표로 구분하여 지정한 목록입니다. 완전하고 유효한 헤더를 가진 첫 번째 형식이 계속할 트레이스를 결정하는 데 사용됩니다. 더 구체적인 `dd.trace.propagation.style.inject` 및 `dd.trace.propagation.style.extract` 구성 설정이 우선 적용됩니다.<br>
버전 1.9.0부터 사용 가능

`trace.propagation.extract.first`
: **환경 변수**: `DD_TRACE_PROPAGATION_EXTRACT_FIRST`<br>
**기본값**: `false`<br>
`true`로 설정된 경우, 유효한 트레이스 컨텍스트가 발견될 때 추출을 중지합니다.

### JMX 메트릭 {#jmx-metrics}

`dd.jmxfetch.enabled`
: **환경 변수**: `DD_JMXFETCH_ENABLED`<br>
**기본값**: `true`<br>
Java Tracing Agent에 의해 JMX 메트릭 수집을 활성화합니다.

`dd.jmxfetch.config.dir`
: **환경 변수**: `DD_JMXFETCH_CONFIG_DIR`<br>
**기본값**: `null`<br>
**예**: `/path/to/directory/etc/conf.d`<br>
JMX 메트릭 수집을 위한 추가 구성 디렉토리입니다. Java Agent는 구성 변경을 위해 `jvm_direct:true` 파일의 `instance` 섹션에서 `yaml`을 찾습니다.

`dd.jmxfetch.config`
: **환경 변수**: `DD_JMXFETCH_CONFIG`<br>
**기본값**: `null`<br>
**예**: `path/to/file/conf.yaml,other/path/to/file/conf.yaml`<br>
JMX 메트릭 수집을 위한 추가 메트릭 구성 파일입니다. Java Agent는 구성 변경을 위해 `jvm_direct:true` 파일의 `instance` 섹션에서 `yaml`을 찾습니다.

`dd.jmxfetch.check-period`
: **환경 변수**: `DD_JMXFETCH_CHECK_PERIOD`<br>
**기본값**: `15000`<br>
JMX 메트릭을 전송하는 주기(밀리초 단위).

`dd.jmxfetch.refresh-beans-period`
: **환경 변수**: `DD_JMXFETCH_REFRESH_BEANS_PERIOD`<br>
**기본값**: `600`<br>
사용 가능한 JMX Beans 목록을 새로 고침하는 주기(초 단위).

`dd.jmxfetch.statsd.host`
: **환경 변수**: `DD_JMXFETCH_STATSD_HOST`<br>
**기본값**: `agent.host`<br>와 동일
JMX 메트릭을 전송할 대상 StatsD 호스트입니다. Unix Domain Socket을 사용하는 경우 'unix://PATH_TO_UDS_SOCKET'와 같은 인수를 사용하세요. 예: `unix:///var/datadog-agent/dsd.socket`

`dd.jmxfetch.statsd.port`
: **환경 변수**: `DD_JMXFETCH_STATSD_PORT`<br>
**기본값**: `8125`<br>
JMX 메트릭을 전송할 대상 StatsD 포트입니다. Unix Domain Socket을 사용하는 경우 0을 입력하세요.

`dd.jmxfetch.<integration-name>.enabled`
: **환경 변수**: `DD_JMXFETCH_<INTEGRATION_NAME>_ENABLED`<br>
**기본값**: `false`<br>
활성화할 JMX 통합(예: Kafka 또는 ActiveMQ).

### 통합 {#integrations}

자세한 내용은 [통합][13] 호환성 섹션에서 통합을 비활성화하는 방법을 참조하세요.

`dd.integration.opentracing.enabled`
: **환경 변수**: `DD_INTEGRATION_OPENTRACING_ENABLED`<br>
**기본값**: `true`<br>
기본적으로 트레이싱 클라이언트는 GlobalTracer가 로드되고 있는지 감지하고 동적으로 트레이서를 등록합니다. 이 값을 false로 설정하면 OpenTracing에 대한 트레이서 의존성이 제거됩니다.

`dd.hystrix.tags.enabled`
: **환경 변수**: `DD_HYSTRIX_TAGS_ENABLED`<br>
**기본값**: `false`<br>
기본적으로 Hystrix 그룹, 명령 및 회로 상태 태그는 활성화되어 있지 않습니다. 이 속성을 사용하면 활성화됩니다.

`dd.trace.elasticsearch.body.enabled`
: **환경 변수**: `DD_TRACE_ELASTICSEARCH_BODY_ENABLED` <br>
**기본값**: `false`<br>
`true`로 설정된 경우, 본문이 Elasticsearch 및 OpenSearch 스팬에 추가됩니다.

`dd.trace.elasticsearch.params.enabled`
: **환경 변수**: `DD_TRACE_ELASTICSEARCH_PARAMS_ENABLED` <br>
**기본값**: `true`<br>
`true`로 설정된 경우, 쿼리 문자열 파라미터가 Elasticsearch 및 OpenSearch 스팬에 추가됩니다.

`dd.trace.cassandra.keyspace.statement.extraction.enabled`
: **환경 변수**: `DD_TRACE_CASSANDRA_KEYSPACE_STATEMENT_EXTRACTION_ENABLED` <br>
**기본값**: `false`<br>
기본적으로 키스페이스는 세션 생성 중에 구성된 경우에만 추출됩니다. `true`로 설정된 경우, 쿼리 결과의 메타데이터를 검사하여 키스페이스를 추출할 수 있습니다.

`dd.trace.websocket.messages.enabled`
: **환경 변수**: `DD_TRACE_WEBSOCKET_MESSAGES_ENABLED` <br>
**기본값**: `false`<br>
전송 및 수신된 웹소켓 메시지(텍스트 및 이진)와 연결 종료 이벤트의 트레이싱을 활성화합니다.

`dd.trace.websocket.messages.inherit.sampling`
: **환경 변수**: `DD_TRACE_WEBSOCKET_MESSAGES_INHERIT_SAMPLING` <br>
**기본값**: `true`<br>
기본적으로 웹소켓 메시지는 핸드셰이크 과정에서 캡처된 스팬과 동일한 샘플링 결정을 따릅니다. 따라서 핸드셰이크 스팬이 샘플링된 경우, 해당 세션의 모든 메시지도 샘플링됩니다. 이 동작을 비활성화하고 각 웹소켓 메시지를 독립적으로 샘플링하려면 이 구성을 `false`로 설정하세요.

`dd.trace.websocket.messages.separate.traces`
: **환경 변수**: `DD_TRACE_WEBSOCKET_MESSAGES_SEPARATE_TRACES` <br>
**기본값**: `true`<br>
기본적으로, 수신된 각 메시지는 새로운 트레이스를 생성합니다. 핸드셰이크는 스팬 링크로 연결됩니다. 이 파라미터를 `false`로 설정하면 세션 동안 캡처된 모든 스팬이 동일한 트레이스에 포함됩니다.

`dd.trace.websocket.tag.session.id`
: **환경 변수**: `DD_TRACE_WEBSOCKET_TAG_SESSION_ID` <br>
**기본값**: `false`<br>
`true`으로 설정된 경우, 웹소켓 스팬은 사용 가능한 경우 세션 ID를 포함하는 태그 `websocket.session.id`를 가집니다.


**참고**:

- 두 가지 모두 동일한 키 유형이 설정된 경우, 시스템 속성 구성이 우선합니다.
- 시스템 속성은 JVM 파라미터로 사용할 수 있습니다.
- 기본적으로 애플리케이션의 JMX 메트릭은 포트 `8125`를 통해 DogStatsD를 사용하여 Datadog Agent로 전송됩니다. [DogStatsD가 Agent에 대해 활성화되어 있는지 확인하세요][9].

  - Agent를 컨테이너로 실행하는 경우, `DD_DOGSTATSD_NON_LOCAL_TRAFFIC`[이 `true`로 설정되어 있는지][10] 확인하고, 포트 `8125`가 Agent 컨테이너에서 열려 있는지 확인하세요.
  - Kubernetes에서는 [DogStatsD 포트를 호스트 포트에 바인딩하세요][11]. ECS에서는 [작업 정의에서 적절한 플래그를 설정하세요][12].

### UDS {#uds}

`dd.jdk.socket.enabled`
: **환경 변수**: `DD_JDK_SOCKET_ENABLED` <br>
**기본값**: `true`<br>
Unix Domain Socket에 대한 네이티브 JDK 지원을 활성화하세요.

### 예 {#examples}

#### `dd.service.mapping` {#ddservicemapping}

시스템 속성을 사용한 예:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.service.mapping=postgresql:web-app-pg -jar path/to/application.jar
```

{{< img src="tracing/setup/java/service_mapping.png" alt="서비스 매핑" >}}

#### `dd.tags` {#ddtags}
스팬과 JMX 메트릭을 위한 전역 환경 설정:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_global_tags.png" alt="트레이스 전역 태그" >}}

#### `dd.trace.span.tags` {#ddtracespantags}

모든 스팬에 project:test를 추가하는 예시:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.trace.span.tags=project:test -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_span_tags.png" alt="트레이스 스팬 태그" >}}

#### `dd.trace.jmx.tags` {#ddtracejmxtags}

JMX 메트릭에 custom.type:2 설정:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.trace.span.tags=project:test -Ddd.trace.jmx.tags=custom.type:2 -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_jmx_tags.png" alt="트레이스 JMX 태그" >}}

#### `dd.trace.methods` {#ddtracemethods}

시스템 속성을 사용한 예:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.trace.methods="hello.GreetingController[doSomeStuff,doSomeOtherStuff];hello.Randomizer[randomize]" -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_methods.png" alt="트레이스 메서드" >}}

#### `dd.trace.db.client.split-by-instance` {#ddtracedbclientsplit-by-instance}

시스템 속성을 사용한 예:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.env=dev -Ddd.service=web-app -Ddd.trace.db.client.split-by-instance=TRUE -jar path/to/application.jar
```

DB 인스턴스 1(`webappdb`)은 이제 `db.instance` 스팬 메타데이터와 동일한 서비스 이름을 갖습니다.

{{< img src="tracing/setup/java/split_by_instance_1.png" alt="인스턴스 1" >}}

DB 인스턴스 2(`secondwebappdb`)는 이제 `db.instance` 스팬 메타데이터와 동일한 서비스 이름을 갖습니다.

{{< img src="tracing/setup/java/split_by_instance_2.png" alt="인스턴스 2" >}}

서비스 맵에서도 이제 하나의 웹 앱이 2개의 서로 다른 Postgres 데이터베이스에 호출하는 것을 볼 수 있습니다.

#### `dd.http.server.tag.query-string` {#ddhttpservertagquery-string}

시스템 속성을 사용한 예:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.http.server.tag.query-string=TRUE -jar path/to/application.jar
```

{{< img src="tracing/setup/java/query_string.png" alt="쿼리 문자열" >}}

#### `dd.trace.enabled` {#ddtraceenabled}

시스템 속성과 디버그 앱 모드를 사용한 예:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.trace.enabled=false -Ddd.trace.debug=true -jar path/to/application.jar
```

디버그 앱 로그는 `Tracing is disabled, not installing instrumentations.`을 보여줍니다.

#### `dd.jmxfetch.config.dir` 및 `dd.jmxfetch.config` {#ddjmxfetchconfigdir-and-ddjmxfetchconfig}

구성 예시:

- `DD_JMXFETCH_CONFIG_DIR=<DIRECTORY_PATH>` + `DD_JMXFETCH_CONFIG=conf.yaml`을 결합해 지정
- 또는 `DD_JMXFETCH_CONFIG=<DIRECTORY_PATH>/conf.yaml`을 직접 지정

`conf.yaml`에는 다음 내용을 포함합니다.

```yaml
init_config:
instances:
    - jvm_direct: true
      port: '<PORT>'
      conf:
          - include:
                bean:
                    - java.lang:type=MemoryPool,name=Metaspace
                attribute:
                    Usage.used:
                        metric_type: gauge
                        alias: sb.usage.used
```

다음과 같은 결과가 생성됩니다.

{{< img src="tracing/setup/java/jmxfetch_example.png" alt="JMX 가져오기 예" >}}

JMX 가져오기를 사용한 Java 메트릭 수집에 대해 더 알아보려면 [Java 통합 문서][14]를 참조하세요.

#### 지원이 중단된 추출 및 주입 설정 {#deprecated-extraction-and-injection-settings}

이 추출 및 주입 설정은 1.9.0 버전 이후 `dd.trace.propagation.style.inject`, `dd.trace.propagation.style.extract`, `dd.trace.propagation.style` 설정으로 대체되어 지원이 중단되었습니다. [Java 트레이스 컨텍스트 전파][15]를 참조하세요. B3 다중 헤더와 B3 단일 헤더 모두에 대한 기존의 `b3` 설정은 새로운 설정 `b3multi` 및 `b3single`로 대체되었습니다.

`dd.propagation.style.inject`
: **환경 변수**: `DD_PROPAGATION_STYLE_INJECT`<br>
**기본값**: `datadog`<br>
서비스 간 분산 트레이스를 프로퍼게이션하기 위해 포함할 헤더 형식을 쉼표로 구분하여 지정한 목록입니다.<br>
1.9.0 버전 이후 지원 중단됨

`dd.propagation.style.extract`
: **환경 변수**: `DD_PROPAGATION_STYLE_EXTRACT`<br>
**기본값**: `datadog`<br>
분산 트레이스 전파 데이터를 추출하기 위해 시도할 헤더 형식을 쉼표로 구분하여 지정한 목록입니다. 완전하고 유효한 헤더를 가진 첫 번째 형식이 계속할 트레이스를 결정하는 데 사용됩니다.<br>
1.9.0 버전 이후 지원 중단됨

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/tagging/unified_service_tagging/
[2]: /ko/agent/logs/advanced_log_collection
[3]: /ko/tracing/guide/remote_config
[4]: https://app.datadoghq.com/services
[5]: /ko/tracing/setup/docker/
[6]: /ko/agent/configuration/network/#configure-ports
[7]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/instrumentation/trace-annotation/src/main/java/datadog/trace/instrumentation/trace_annotation/TraceAnnotationsInstrumentation.java#L37
[8]: /ko/tracing/configure_data_security/#telemetry-collection
[9]: /ko/extend/dogstatsd/#setup
[10]: /ko/agent/docker/#dogstatsd-custom-metrics
[11]: /ko/extend/dogstatsd/
[12]: /ko/agent/amazon_ecs/#create-an-ecs-task
[13]: /ko/tracing/compatibility_requirements/java#disabling-integrations
[14]: /ko/integrations/java/?tab=host#metric-collection
[15]: /ko/tracing/trace_collection/trace_context_propagation/
[16]: /ko/tracing/trace_collection/custom_instrumentation/java/otel/
[17]: /ko/opentelemetry/interoperability/environment_variable_support
[18]: /ko/tracing/guide/aws_payload_tagging/?code-lang=java
[19]: /ko/security/application_security/setup/threat_detection/java/
[20]: https://ant.apache.org/manual/dirtasks.html#patterns
[21]: /ko/tracing/trace_collection/library_config/#traces
[22]: /ko/profiler/
[23]: /ko/database_monitoring/connect_dbm_and_apm/?tab=java