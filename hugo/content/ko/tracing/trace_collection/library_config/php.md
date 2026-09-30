---
code_lang: php
code_lang_weight: 40
further_reading:
- link: https://www.datadoghq.com/blog/monitor-php-performance/
  tag: 블로그
  text: Datadog 애플리케이션 성능 모니터링(APM) 및 분산 추적을 사용한 PHP 모니터링
- link: https://github.com/DataDog/dd-trace-php
  tag: 소스 코드
  text: 소스 코드
- link: /tracing/trace_collection/trace_context_propagation/
  tag: 설명서
  text: 트레이스 컨텍스트 전파
- link: /tracing/glossary/
  tag: 설명서
  text: 서비스, 리소스, 트레이스 탐색
- link: /tracing/
  tag: 설명서
  text: 고급 사용
- link: /opentelemetry/interoperability/environment_variable_support
  tag: 문서
  text: OpenTelemetry 환경 변수 설정
title: PHP 추적 라이브러리 설정하기
type: multi-code-lang
---

코드로 추적 라이브러리를 설정한 다음 에이전트를 설정하여 애플리케이션 성능 모니터링(APM) 데이터를 수집합니다. 옵션으로 [통합 서비스 태깅][1] 설정 등, 원하는 대로 추적 라이브러리를 설정합니다.

PHP 추적기는 환경 변수와 INI 설정을 사용하여 설정할 수 있습니다.

INI 설정은 `php.ini` 파일 또는 특정 웹 서버 또는 가상 호스트에서 전역적으로 설정할 수 있습니다.

**참고**: 코드 자동-계측(권장 방식)을 사용하는 경우 계측 코드가 사용자 코드보다 먼저 실행된다는 점에 유의하세요. 따라서 아래의 환경 변수와 INI 설정은 서버 수준에서 설정되어야 하며, 사용자 코드가 실행되기 전에 PHP 런타임에서 사용할 수 있어야 합니다. 예를 들어 `putenv()` 및 `.env` 파일은 작동하지 않습니다.

## Apache

PHP-fpm을 사용하는 Apache의 경우, `www.conf` 설정 파일에서 `env` 지시어를 사용하여 PHP 추적기를 설정합니다. 예시는 다음과 같습니다.

```
; Example of passing the host environment variable SOME_ENV
; to the PHP process as DD_AGENT_HOST
env[DD_AGENT_HOST] = $SOME_ENV
; Example of passing the value 'my-app' to the PHP
; process as DD_SERVICE
env[DD_SERVICE] = my-app
; Or using the equivalent INI setting
php_value datadog.service my-app
```

또는 서버 설정, 가상 호스트, 디렉토리 또는 `.htaccess` 파일에서 [`SetEnv`][2]를 사용할 수 있습니다.

```text
# 환경 변수로 가상 호스트 설정
SetEnv DD_TRACE_DEBUG 1
# INI 설정을 가상 호스트 설정
php_value datadog.service my-app
```

## NGINX 및 PHP-FPM

<div class="alert alert-danger">
<strong>참고:</strong> PHP-FPM은 <code>env[...]</code> 지시어에서 <code>false</code> 값을 지원하지 않습니다. <code>true</code> 대신 <code>1을</code> 사용하고 <code>false</code> 대신 <code>0을</code> 사용하세요.
</div>

NGINX의 경우 PHP-fpm의 `www.conf` 파일에 `env` 지시어을 사용합니다. 예시는 다음과 같습니다.

```
; Example of passing the host environment variable SOME_ENV
; to the PHP process as DD_AGENT_HOST
env[DD_AGENT_HOST] = $SOME_ENV
; Example of passing the value 'my-app' to the PHP
; process as DD_SERVICE
env[DD_SERVICE] = my-app
; Or using the equivalent INI setting
php_value[datadog.service] = my-app
```

**참고**: NGINX 서버에 애플리케이션 성능 모니터링(APM)을 활성화한 경우, 분산 추적이 제대로 작동하도록 `opentracing_fastcgi_propagate_context` 설정을 올바르게 구성했는지 확인하세요. 자세한 내용은 [NGINX 애플리케이션 성능 모니터링(APM) 설정][3]을 참조하세요.

## PHP CLI 서버

명령줄에서 서버를 시작하도록 설정합니다.

```text
DD_TRACE_DEBUG=1 php -d datadog.service=my-app -S localhost:8888
```

## 환경 변수 설정

다음 표에는 추적을 설정하기 위한 환경 변수와 해당 INI 설정(사용 가능한 경우) 및 기본값이 나열되어 있습니다.

### 통합 서비스 태깅

`DD_ENV`
: **INI**: `datadog.env`<br>
**기본값**: `null`<br>
애플리케이션의 환경을 설정합니다. 예를 들어, `prod`, `pre-prod`, `stage`를 사용할 수 있습니다. 시작 버전 `0.90.0`을 런타임에서 `ini_set`을 통해 `datadog.version`으로 변경하면, 현재 루트 스팬(span)에도 적용됩니다.

`DD_VERSION`
: **INI**: `datadog.version`<br>
**기본값**: `null`<br>
트레이스 및 로그에서 애플리케이션의 버전을 설정합니다. 예를 들어 `1.2.3`, `6c44da20`, `2020.02.13`을 설정할 수 있습니다. 시작 버전 `0.90.0`을 런타임에서 `ini_set`을 통해 `datadog.version`으로 변경하면, 현재 루트 스팬(span)에도 적용됩니다.

`DD_SERVICE`
: **INI**: `datadog.service`<br>
**기본값**: `null`<br>
기본 앱 이름입니다.

### 트레이스

`DD_TRACE_ENABLED`
: **INI**: `datadog.trace.enabled`<br>
**기본값**: `1`<br>
추적기를 전역적으로 활성화합니다.

`DD_PRIORITY_SAMPLING`
: **INI**: `datadog.priority_sampling`<br>
**기본값**: `1`<br>
우선순위 샘플링 활성화 여부를 결정합니다.

`DD_SERVICE_MAPPING`
: **INI**: `datadog.service_mapping`<br>
**기본값**: `null`<br>
 애플리케이션 성능 모니터링(APM) 통합의 기본 이름을 변경합니다. 한 번에 하나 이상의 통합 이름을 변경합니다(예: `DD_SERVICE_MAPPING=pdo:payments-db,mysqli:orders-db`([통합 이름] 참조))(#integration-names).

`DD_TRACE_128_BIT_TRACEID_GENERATION_ENABLED`
: **INI**: `datadog.trace.128_bit_traceid_generation_enabled`<br>
**기본값**: `true`<br>
true이면 추적기는 128비트 트레이스 ID를 생성하고 트레이스 ID를 제로 패딩 32개 소문자 16진수로 인코딩합니다.

`DD_TRACE_128_BIT_TRACEID_LOGGING_ENABLED`
: **INI**: `datadog.trace.128_bit_traceid_logging_enabled`<br>
**기본값**: `0`<br>
로그 연계를 위해 트레이스 ID를 포맷할 때 전체 128비트 트레이스 ID를 인쇄하도록 설정합니다.
false(기본값)인 경우 트레이스 ID의 하위 64비트만 정수로 포맷하여 인쇄합니다. 즉, 트레이스 ID가 64비트인 경우에만 전체 ID가 인쇄됩니다.
true인 경우 트레이스 ID는 16진수 형식의 전체 128비트 트레이스 ID로 인쇄됩니다. ID 자체가 64비트인 경우에도 마찬가지입니다.

`DD_TRACE_HEALTH_METRICS_ENABLED`
: **INI**: `datadog.trace_health_metrics_enabled`<br>
**기본값**: `false`<br>
활성화하면 추적기는 DogStatsD 로 통계를 전송합니다. 또한 빌드 시점에 `sigaction`을 사용할 수 있는 경우, 세그폴트 발생 시 추적기는 포착되지 않은 예외 메트릭을 전송합니다.

`DD_TRACE_AGENT_CONNECT_TIMEOUT`
: **INI**: `datadog.trace.agent_connect_timeout`<br>
**기본값**: `100`<br>
 에이전트 연결 시간 초과(밀리초)입니다.

`DD_TRACE_AGENT_PORT`
: **INI**: `datadog.trace.agent_port`<br>
**기본값**: `8126`<br>
 에이전트 포트 번호입니다. [에이전트 설정][13]에서 `receiver_port` 또는 `DD_APM_RECEIVER_PORT`를 기본값 `8126`이 아닌 다른 값으로 설정한 경우 `DD_TRACE_AGENT_PORT` 또는 `DD_TRACE_AGENT_URL`이 일치해야 합니다.

`DD_TRACE_AGENT_TIMEOUT`
: **INI**: `datadog.trace.agent_timeout`<br>
**기본값**: `500`<br>
 에이전트 요청 전송 시간 초과(밀리초)입니다.

`DD_TRACE_AGENT_URL`
: **INI**: `datadog.trace.agent_url`<br>
**기본값**: `null`<br>
 에이전트 URL이 `DD_AGENT_HOST` 및 `DD_TRACE_AGENT_PORT`보다 우선합니다. 예: `https://localhost:8126`. [에이전트 설정][13]에서 `receiver_port` 또는 `DD_APM_RECEIVER_PORT`를 기본값 `8126`이 아닌 다른 값으로 설정한 경우 `DD_TRACE_AGENT_PORT` 또는 `DD_TRACE_AGENT_URL`이 일치해야 합니다.

`DD_TRACE_AUTO_FLUSH_ENABLED`
: **INI**: `datadog.trace.auto_flush_enabled`<br>
**기본값**: `0` (CLI 환경에서 `1`)<br>
모든 스팬이 종료되면 자동으로 트레이서를 플러시합니다. `DD_TRACE_GENERATE_ROOT_SPAN=0`과 함께 [장기 실행 프로세스][14]를 `1` 로 설정합니다.

`DD_TRACE_CLI_ENABLED`
: **INI**: `datadog.trace.cli_enabled`<br>
**기본값**: `1`<br>
CLI에서 PHP 스크립트 추적을 활성화합니다. [CLI 스크립트 추적하기][15]를 참조하세요.

`DD_TRACE_DEBUG`
: **INI**: `datadog.trace.debug`<br>
**기본값**: `0`<br>
디버그 모드를 활성화합니다. `1`인 경우, 로그 메시지는 `error_log` INI 설정에 설정된 장치 또는 파일로 전송됩니다. `error_log`의 실제 값은 PHP-FPM/Apache 설정 파일에서 재정의될수 있으므로 `php -i`의 출력과 다를 수 있습니다. 활성화된 경우 `DD_TRACE_LOG_LEVEL`보다 우선합니다.

`DD_TRACE_LOG_LEVEL`
: **INI**: `datadog.trace.log_level`<br>
**기본값**: `Error`<br>
정확한 로그 수준을 설정합니다. 로그  수준은 RUST_LOG 규칙을 따르며, 허용되는 로그 수준은 `error`, `warn`, `info`, `debug`, `trace` 및 `off`입니다.

`DD_TRACE_LOG_FILE`
: **INI**: `datadog.trace.log_file`<br>
**기본값**: ``<br>
 로그를 남깁니다. 아무것도 지정하지 않으면 로그 기본값 PHP 오류 위치로 이동합니다. Datadog-ipc-helper 문제(예: 원격 분석 제출)를 디버깅하려면 로그 파일을 지정해야 합니다.

`DD_TRACE_FORKED_PROCESS`
: **INI**: `datadog.trace.forked_process`<br>
**기본값**: `1`<br>
포크된 프로세스 을 추적할지 여부를 나타냅니다. `1`로 설정하면 포크된 프로세스를 추적합니다. `0`로 설정하면 포크된 프로세스 추적을 비활성화할 수 있습니다. `0`으로 설정하면 프로세스의 트레이스를 `ini_set("datadog.trace.enabled", "1");`로 코드에서 수동으로 다시 활성화할 수 있지만 새로운 트레이스로 표시됩니다. 포크된 프로세스 트레이스는 `DD_TRACE_FORKED_PROCESS` 및 `DD_DISTRIBUTED_TRACING`가 모두 `1`(켜짐)로 설정된 경우에만 전체 배포 트레이스로 표시됩니다.

`DD_TRACE_GENERATE_ROOT_SPAN`
: **INI**: `datadog.trace.generate_root_span`<br>
**기본값**: `1`<br>
자동으로 최상위 수준 스팬을 생성합니다. `DD_TRACE_AUTO_FLUSH_ENABLED=1`과 함께 `0`으로 설정하여 [장기 실행 프로세스][14]를 추적합니다.

`DD_TRACE_HEADER_TAGS`
: **INI**: `datadog.trace.header_tags`<br>
**기본값**: `null`<br>
루트 스팬에서 태그로 보고되는 헤더 이름의 CSV입니다.

`DD_TRACE_HTTP_CLIENT_SPLIT_BY_DOMAIN`
: **INI**: `datadog.trace.http_client_split_by_domain`<br>
**기본값**: `0`<br>
HTTP 요청의 서비스 이름을 `host-<hostname>`로 설정합니다. 예를 들어 `curl_exec()`에서 `https://datadoghq.com`으로의 호출은 기본 서비스 이름인 `curl` 대신 `host-datadoghq.com`으로 서비스 이름을 지정할 수 있습니다.  

`DD_TRACE_MEASURE_COMPILE_TIME`
: **INI**: `datadog.trace.measure_compile_time`<br>
**기본값**: `1`<br>
요청의 컴파일 시간(밀리초 단위)을 최상위 수준 스팬에 기록합니다.

`DD_TRACE_REMOVE_AUTOINSTRUMENTATION_ORPHANS`
: **INI**: `datadog.trace.remove_autoinstrumentation_orphans`<br>
**기본값**: `false`<br>
자동-계측에서 생성된 고아 스팬을 자동으로 제거합니다. 현재 이 기능은 Laravel Horizon의 컨텍스트에서 사용되는 일부 Redis 및 Laravel 호출에만 적용됩니다. 버전 `0.88.0`에 추가되었습니다.<br><br>
**참고: **이러한 고아 스팬은 플러시되지만 트레이스에는 기록되지 않습니다. 또한 이 설정 옵션으로 제거되는 구체적인 단일-스팬 트레이스는 다음과 같습니다.
  - `laravel.event.handle`
  - `laravel.provider.load`
  - `Predis.Client.__construct`
  - `Predis.Client.executeCommand`
  - `Predis.Pipeline.executePipeline`

`DD_TRACE_REMOVE_ROOT_SPAN_LARAVEL_QUEUE`
: **INI**: `datadog.trace.remove_root_span_laravel_queue`<br>
**기본값**: `true`<br>
루트 스팬 생성을 자동으로 비활성화하고(`DD_TRACE_GENERATE_ROOT_SPAN` 참조), Laravel 대기열/Horizon 명령에 대해 자동 플러싱을 활성화합니다( `DD_TRACE_AUTO_FLUSH_ENABLED` 참조). 버전 `0.88.0`에 추가되었습니다.

`DD_TRACE_REMOVE_ROOT_SPAN_SYMFONY_MESSENGER`
: **INI**: `datadog.trace.remove_root_span_symfony_messenger`<br>
**기본값**: `true`<br>
루트 스팬 생성을 자동으로 비활성화( `DD_TRACE_GENERATE_ROOT_SPAN` 참조)하고 Symfony Messenger 명령에 대해 자동 플러싱을 활성화( `DD_TRACE_AUTO_FLUSH_ENABLED` 참조)합니다. 버전 `1.3.0`에 추가되었습니다.

`DD_TRACE_LARAVEL_QUEUE_DISTRIBUTED_TRACING`
: **INI**: `datadog.trace.laravel_queue_distributed_tracing`<br>
**기본값**: `true`<br>
추가 `laravel.queue.process` 스팬 생성을 비활성화하고 스팬 링크에만 의존합니다. 버전 `0.93.0`에 추가되었습니다.

`DD_TRACE_SYMFONY_MESSENGER_DISTRIBUTED_TRACING`
: **INI**: `datadog.trace.symfony_messenger_distributed_tracing`<br>
**기본값**: `true`<br>
비활성화하면 인과적 생산/소비 관계는 스팬 링크를 사용하여 연결됩니다. 버전 `1.3.0`에 추가되었습니다.

`DD_TRACE_SYMFONY_MESSENGER_MIDDLEWARES`
: **INI**: `datadog.trace.symfony_messenger_middlewares`<br>
**기본값**: `false`<br>
Symfony Messenger 미들웨어 추적을 활성화합니다. 버전 `1.3.0`에 추가되었습니다.

`DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX`
: **INI**: `datadog.trace.resource_uri_fragment_regex`<br>
**기본값**: `null`<br>
ID에 해당하는 경로 조각을 식별하는 정규식의 CSV입니다([리소스 이름을 정규화된 URI로 매핑](#map-resource-names-to-normalized-uri) 참조).

`DD_TRACE_RESOURCE_URI_MAPPING_INCOMING`
: **INI**: `datadog.trace.resource_uri_mapping_incoming`<br>
**기본값**: `null`<br>
들어오는 요청에 대한 리소스 이름을 정규화하기 위한 URI 매핑의 CSV입니다([리소스 이름을 정규화된 URI에 매핑](#map-resource-names-to-normalized-uri) 참조).

`DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING`
: **INI**: `datadog.trace.resource_uri_mapping_outgoing`<br>
**기본값**: `null`<br>
나가는 요청의 리소스 이름을 정규화하기 위한 URI 매핑의 CSV입니다([리소스 이름을 정규화된 URI로 매핑](#map-resource-names-to-normalized-uri) 참조).

`DD_TRACE_RETAIN_THREAD_CAPABILITIES`
: **INI**: `datadog.trace.retain_thread_capabilities`<br>
**기본값**: `0`<br>
리눅스(Linux)에서 작동합니다. 유효 사용자 ID를 변경할 때 Datadog 백그라운드 스레드에서 기능을 유지하려면 `true`로 설정합니다. 이 옵션은 대부분의 설정에 영향을 미치지 않지만, 일부 모듈(현재 Datadog는 [Apache의 mod-ruid2][5]만 인식)은 `setuid()` 또는 유사한 syscall을 호출하여 기능을 상실하면서 기능의 충돌이나 손실을 야기할 수 있습니다.<br><br>
**참고:** 이 옵션을 활성화하면 보안이 약화될 수 있습니다. 이 옵션을 단독으로 사용하면 보안 위험이 없습니다. 그러나 PHP 또는 웹 서버의 취약점을 악용할 수 있는 공격자는 웹 서버 또는 PHP가 완전한 기능으로 시작된 경우 비교적 쉽게 상위 권한을 확보할 수 있습니다. Datadog에서는 `setcap` 유틸리티를 사용하여 웹 서버의 기능을 제한할 것을 권장합니다.

`DD_HTTP_SERVER_ROUTE_BASED_NAMING`
: **INI**: `datadog.http_server_route_based_naming`<br>
**기본값**: `true`<br>
HTTP 서버 요청에 경로 기반 이름 지정을 사용하도록 설정합니다. 통합별로 루트 스팬의 리소스 이름 형식을 사용하려면 `true`로 설정합니다. `false`인 경우 HTTP 메서드와 경로가 대신 사용됩니다. 버전 `0.89.0`에 추가되었습니다.

`DD_TRACE_SAMPLE_RATE`
: **INI**: `datadog.trace.sample_rate`<br>
**기본값**: `-1`<br>
 트레이스의 샘플링 속도로, `0.0`과 `1.0` 사이의 숫자입니다. 기본값 `-1`은 샘플링 제어를 Datadog 에이전트로 이관합니다.<br>
**참고**: `DD_TRACE_SAMPLE_RATE`은 `DD_TRACE_SAMPLING_RULES`를 위해 더 이상 사용되지 않습니다.<br>

`DD_TRACE_RATE_LIMIT`
: **INI**: `datadog.trace.rate_limit`<br>
**기본값**: `0`<br>
초당 샘플링할 최대 스팬의 수입니다. Apache 또는 FPM 풀의 모든 프로세스는 동일한 처리율 제한 장치를 공유합니다. 설정되지 않은 (0) 속도 제한은 Datadog 에이전트에 위임됩니다.

`DD_TRACE_URL_AS_RESOURCE_NAMES_ENABLED`
: **INI**: `datadog.trace.url_as_resource_names_enabled`<br>
**기본값**: `1`<br>
URL을 리소스 이름으로 사용 설정합니다([리소스 이름을 정규화된 URI로 매핑하기](#map-resource-names-to-normalized-uri) 참조).

`DD_TRACE_HTTP_URL_QUERY_PARAM_ALLOWED`
: **INI**: `datadog.trace.http_url_query_param_allowed`<br>
**기본값**: `*`<br>
 쿼리 파라미터의 쉼표로 구분된 목록을 URL의 일부로 수집합니다. 파라미터를 수집하지 않으려면 비워두거나 `*`을 모두 수집하려면 파라미터로 설정합니다. 버전 `0.74.0`에 추가되었습니다.

`DD_TRACE_HTTP_POST_DATA_PARAM_ALLOWED`
: **INI**: `datadog.trace.http_post_data_param_allowed`<br>
**기본값**: ""<br>
수집할 HTTP POST 데이터 필드를 쉼표로 구분한 목록입니다. 게시된 값을 수집하지 않으려면 비워둡니다. 이 값을 와일드카드 `*`으로 설정하면 게시된 모든 데이터가 수집되지만 `DD_TRACE_OBFUSCATION_QUERY_STRING_REGEXP` 난독화 규칙과 일치하는 필드의 값은 삭제됩니다. 특정 필드를 지정하면 해당 필드의 값만 표시되고 다른 모든 필드의 값은 삭제됩니다. 버전 `0.86.0`에 추가되었습니다.<br>
**예시**:
  - 게시된 데이터는 다음과 같습니다. `qux=quux&foo[bar][password]=Password12!&foo[bar][username]=admin&foo[baz][bar]=qux&foo[baz][key]=value`
  - `DD_TRACE_HTTP_POST_DATA_PARAM_ALLOWED`로 설정되어 있습니다. `foo.baz,foo.bar.password`
  - 이 시나리오에서 수집된 메타데이터는 다음과 같습니다:
    - `http.request.foo.bar.password=Password12!`
    - `http.request.foo.bar.username=<redacted>`
    - `http.request.foo.baz.bar=qux`
    - `http.request.foo.baz.key=value`
    - `http.request.qux=<redacted>`

`DD_TRACE_RESOURCE_URI_QUERY_PARAM_ALLOWED`
: **INI**: `datadog.trace.resource_uri_query_param_allowed`<br>
**기본값**: `*`<br>
쉼표로 구분된 목록 쿼리 파라미터를 리소스 URI의 일부로 수집합니다. 파라미터를 수집하지 않으려면 비워두거나 `*`을 모두 수집하려면 파라미터로 설정합니다. 버전 `0.74.0`에 추가되었습니다.

`DD_TRACE_CLIENT_IP_ENABLED`
: **INI**: `datadog.trace.client_ip_enabled`<br>
**기본값**: `false`<br>
클라이언트 측 IP 수집을 활성화합니다. 버전 `0.84.0`에 추가되었습니다.

`DD_TRACE_CLIENT_IP_HEADER`
: **INI**: `datadog.trace.client_ip_header`<br>
**기본값**: `null`<br>
클라이언트 IP 수집에 사용할 IP 헤더(예: `x-forwarded-for`). `0.84.0` 버전에 추가되었습니다(ASM 사용 시`0.76.0`).

`DD_TRACE_OBFUSCATION_QUERY_STRING_REGEXP`
: **INI**: `datadog.trace.obfuscation_query_string_regexp`<br>
**기본값**:
  ```
  (?i)(?:p(?:ass)?w(?:or)?d|pass(?:_?phrase)?|secret|(?:api_?|private_?|public_?|access_?|secret_?)key(?:_?id)?|token|consumer_?(?:id|key|secret)|sign(??:ed|ature)?|auth(?:entication|orization)?)(?:(?:\s|%20)*(?:=|%3D)[^&]+|(?:"|%22)(?:\s|%20)*(?::|%3A)(?:\s|%20)*(?:"|%22)(?:%2[^2]|%[^2]|[^"%])+(?:"|%22))|bearer(?:\s|%20)+[a-z0-9\._\-]|token(?::|%3A)[a-z0-9]{13}|gh[opsu]_[0-9a-zA-Z]{36}|ey[I-L](?:[\w=-]|%3D)+\.ey[I-L](?:[\w=-]|%3D)+(?:\.(?:[\w.+\/=-]|%3D|%2F|%2B)+)?|[\-]{5}BEGIN(?:[a-z\s]|%20)+PRIVATE(?:\s|%20)KEY[\-]{5}[^\-]+[\-]{5}END(?:[a-z\s]|%20)+PRIVATE(?:\s|%20)KEY|ssh-rsa(?:\s|%20)*(?:[a-z0-9\/\.+]|%2F|%5C|%2B){100,}
  ```
URL의 일부로 포함된 쿼리 문자열을 난독화하는 데 사용되는 정규식입니다. 이 표현식은 HTTP POST 데이터에 대한 프로세스 삭제에도 사용됩니다. 버전 `0.76.0`에 추가되었습니다.

`DD_TRACE_SAMPLING_RULES`
: **INI**: `datadog.trace.sampling_rules`<br>
**기본값**: `null`<br>
샘플링 속도를 설정하는 JSON 인코딩 문자열입니다. 예시: 샘플 속도를 20%로 설정하려면 `'[{"sample_rate": 0.2}]'`를 사용합니다. 'a'로 시작하는 서비스 및 스팬 이름 'b'의 경우 샘플 비율을 10%로 설정하고 다른 모든 서비스의 경우  샘플 비율을 20%`'[{"service": "a.*", "name": "b", "sample_rate": 0.1}, {"sample_rate": 0.2}]'`([통합 이름](#integration-names) 참조)로 설정합니다. 큰따옴표(`"`) 문자의 이스케이프 문제를 방지하기 위해 JSON 객체는 반드시 작은 따옴표(`'`)로 둘러싸야 합니다. 서비스 매칭은 `DD_SERVICE_MAPPING`을 고려합니다(시작 버전 `0.90.0`). 이름과 서비스는 유효한 정규식이어야 합니다. 유효한 정규식이 아닌 규칙은 무시됩니다.

`DD_TRACE_SAMPLING_RULES_FORMAT`
: **INI**: `datadog.trace.sampling_rules_format`<br>
**기본값**: `glob`<br>
 `DD_TRACE_SAMPLING_RULES`에 정의된 샘플링 규칙에 사용되는 형식(`regex` 또는 `glob`)을 규칙화합니다. 버전 `0.98.0`에 추가되었으며 `1.0.0`부터 사용되지 않습니다.

`DD_TRACE_SPANS_LIMIT`
: **INI**: `datadog.trace.spans_limit`<br>
**기본값**: `1000`<br>
하나의 트레이스 내에서 생성되는 최대 스팬의 수입니다. 스팬의 최대 개수에 도달하면 스팬은 더 이상 생성되지 않습니다. 제한이 증가하면 보류 중인 트레이스에서 사용하는 메모리 양이 증가하여 PHP 최대 허용 메모리 양에 도달할 수 있습니다. 허용되는 최대 메모리 양은 PHP INI 시스템 설정 `memory_limit`를 사용하여 늘릴 수 있습니다.

`DD_SPAN_SAMPLING_RULES`
: **INI**: `datadog.span_sampling_rules`<br>
**기본값**: `null`<br>
샘플링 속도를 설정하는 JSON 인코딩 문자열입니다. 스팬의 샘플링 속도를 결정하기 위해 설정된 순서대로 규칙이 적용됩니다. `sample_rate` 값은 0.0에서 1.0 사이(포함)여야 합니다. <br>
**예**: 서비스 'my-service' 및 작업 이름 'http.request'에 대해 스팬 샘플 속도를 50%로 설정합니다(초당 최대 50 트레이스). `'[{"service": "my-service", "name": "http.request", "sample_rate":0.5, "max_per_second": 50}]'`큰따옴표(`"`) 문자의 이스케이프 문제를 방지하기 위해 JSON 객체는 작은 따옴표(`'`)로 묶어야 합니다.<br>
자세한 내용은 [수집 메커니즘][6]을 참조하세요.<br>

### Agent

`DD_AGENT_HOST`
: **INI**: `datadog.agent_host`<br>
**기본값**: `localhost` <br>
 에이전트 호스트 이름입니다.

`DD_AUTOFINISH_SPANS`
: **INI**: `datadog.autofinish_spans`<br>
**기본값**: `0`<br>
추적기가 플러시될 때 스팬이 자동으로 종료되는지 여부입니다.

`DD_DISTRIBUTED_TRACING`
: **INI**: `datadog.distributed_tracing`<br>
**기본값**: `1`<br>
분산 추적을 활성화할지 여부입니다.

`DD_DOGSTATSD_URL`
: **INI**: `datadog.dogstatsd_url`<br>
**기본값**: `null`<br>
 DogStatsD에 대한 연결을 협상하는 데 사용되는 URL입니다. 이 설정은 `DD_AGENT_HOST` 및 `DD_DOGSTATSD_PORT`보다 우선합니다. `udp://` 또는 `unix://` 스키마만 지원합니다.

`DD_DOGSTATSD_PORT`
: **INI**: `datadog.dogstatsd_port`<br>
**기본값**: `8125`<br>
 DogStatsD에 연결하는 데 사용되는 포트이며, `DD_TRACE_HEALTH_METRICS_ENABLED`가 활성화된 경우 `DD_AGENT_HOST`어ㅏ 함께 DogStatsD 에 대한 연결을 협상하는 데 사용됩니다.

`DD_TAGS`
: **INI**: `datadog.tags`<br>
**기본값**: `null`<br>
태그를 모든 스팬에 설정할 수 있습니다. 예: `key1:value1,key2:value2`.

`DD_INSTRUMENTATION_TELEMETRY_ENABLED`
: **INI**: `datadog.instrumentation_telemetry_enabled`<br>
**기본값**: `true`<br>
Datadog는 제품 개선을 위해 [사용자 시스템에 대한 환경 및 진단 정보][16]를 수집할 수 있습니다. false이면 이 원격 측정 데이터는 수집되지 않습니다.

### 데이터베이스

`DD_TRACE_DB_CLIENT_SPLIT_BY_INSTANCE`
: **INI**: `datadog.trace.db_client_split_by_instance`<br>
**기본값**: `0`<br>
HTTP 요청의 서비스 이름을 `pdo-<hostname>`으로 설정합니다. 예를 들어, 호스팅하다 `datadoghq.com` 데이터베이스에 대한 `PDO->query()` 호출은 기본 서비스 이름인 `pdo` 대신 서비스 이름 `pdo-datadoghq.com`을 갖습니다.

`DD_TRACE_REDIS_CLIENT_SPLIT_BY_HOST`
: **INI**: `datadog.trace.redis_client_split_by_host`<br>
**기본값**: `0`<br>
Redis 클라이언트 작업의 서비스 이름을 `redis-<hostname>`으로 설정합니다.

### 데이터베이스 모니터링

`DD_DBM_PROPAGATION_MODE`
: **INI**: `datadog.dbm_propagation_mode`<br>
**기본값**: `'disabled'`<br>
 `'service'` 또는 `'full'`로 설정하면 애플리케이션 성능 모니터링(APM)과 데이터베이스 모니터링 제품 간 데이터 전송을 활성화합니다.<br>
 `'service'` 옵션은 DBM과 애플리케이션 성능 모니터링(APM) 서비스 간의 연결을 활성화합니다. Postgres, MySQL 및 SQLServer에서 사용할 수 있습니다.<br>
 `'full'` 옵션은 데이터베이스 스팬과 데이터베이스 쿼리 이벤트 간의 연결을 활성화합니다. Postgres 및 MySQL에서 사용할 수 있습니다.<br>

### 로그

`DD_LOGS_INJECTION`
: **INI**: `datadog.logs_injection`<br>
**기본값**: `0`<br>
애플리케이션 로그에 상관관계 식별자 자동 삽입을 활성화 또는 비활성화합니다. `0.89.0` 버전에 추가되었습니다.<br>
자세한 내용은 [로그 상관관계 문서][17]를 참조하세요.

### OpenTelemetry

`DD_TRACE_OTEL_ENABLED`
: [커스텀][18] 또는 [자동][19] 계측에 대해 OpenTelemetry 기반 추적을 활성화 또는 비활성화합니다. <br>
유효한 값은 `true` 또는 `false`입니다.<br>
**기본값**: `false`

### 프로파일링

`DD_PROFILING_ENABLED`
: **INI**: `datadog.profiling.enabled`. INI 사용 가능 `0.82.0`.<br>
**기본값**: `1`<br>
 Datadog 프로파일러를 활성화합니다. 버전 `0.69.0`에서 추가되었습니다. [PHP 프로파일러 활성화하기][4]를 참조하세요. 버전 `0.81.0` 이하의 경우 기본값은 `0`입니다.

`DD_PROFILING_ENDPOINT_COLLECTION_ENABLED`
: **INI**: `datadog.profiling.endpoint_collection_enabled`. `0.82.0` 이후 INI를 이용할 수 있습니다.<br>
**기본값**: `1`<br>
프로필에서 엔드포인트 데이터 수집을 활성화할지 여부입니다. 버전 `0.79.0`에 추가되었습니다.

`DD_PROFILING_ALLOCATION_ENABLED`
: **INI**: `datadog.profiling.allocation_enabled`. `0.88.0`부터 INI를 사용할 수 있습니다.<br>
**기본값**: `1`<br>
할당 크기 및 할당 바이트 프로파일 유형을 활성화합니다. 버전 `0.88.0`에 추가되었습니다. 활성 JIT가 감지되면 ZendEngine의 제한으로 인해 PHP 버전 `8.0.0`-`8.1.20` 및 `8.2.0`-`8.2.7`에 대해 할당 프로파일링이 해제됩니다.<br>
**참고**: 이는 `0.84`부터 사용 가능했던 `DD_PROFILING_EXPERIMENTAL_ALLOCATION_ENABLED` 환경 변수(`datadog.profiling.experimental_allocation_enabled` INI 설정)를 대체합니다. 둘 다 설정되어 있는 경우 이 설정이 우선합니다.

`DD_PROFILING_EXPERIMENTAL_FEATURES_ENABLED`
: **INI**: `datadog.profiling.experimental_features_enabled`. `0.96.0`부터 INI를 사용할 수 있습니다.<br>
**기본값**: `0`<br>
모든 실험적 기능을 활성화합니다.<br>
**참고**: 이 설정은 보다 구체적인 구성을 재정의하며, 이 설정을 활성화하면 다른 실험적 설정 설정을 토글해도 효과가 없습니다.

`DD_PROFILING_EXPERIMENTAL_CPU_TIME_ENABLED`
: **INI**: `datadog.profiling.experimental_cpu_time_enabled`. `0.82.0`부터 INI를 사용할 수 있습니다.<br>
**기본값**: `1`<br>
실험적 CPU 프로파일 유형을 활성화합니다. 버전 `0.69.0`에 추가되었습니다. 버전 `0.76` 이하에서는 기본값이 `0`로 설정되었습니다.

`DD_PROFILING_EXCEPTION_ENABLED`
: **INI**: `datadog.profiling.exception_enabled`. `0.96.0`부터 INI를 사용할 수 있습니다.<br>
**기본값**: `1`<br>
예외 프로필 유형을 활성화합니다. 버전 `0.92.0` 및 GA
버전 `0.96.0` 에 추가되었습니다.<br><br>
**주**: 이는 `0.92`부터 사용 가능했던 `DD_PROFILING_EXPERIMENTAL_EXCEPTION_ENABLED` 환경 변수(`datadog.profiling.experimental_exception_enabled` INI 설정)를 대체합니다. 둘 다 설정되어 있으면 이 설정이 우선합니다.

`DD_PROFILING_EXCEPTION_MESSAGE_ENABLED`
: **INI**: `datadog.profiling.exception_message_enabled`. `0.98.0`부터 INI를 사용할 수 있습니다.<br>
**기본값**: `0`<br>
예외 샘플을 사용하여 예외 메시지 수집을 활성화합니다.<br><br>
**참고**: 이 설정이 기본적으로 비활성화되어 있으므로 예외 메시지에 PII(개인 식별 정보)가 포함될 수 있다는 점에 유의하세요.

`DD_PROFILING_EXCEPTION_SAMPLING_DISTANCE`
: **INI**: `datadog.profiling.exception_sampling_distance`. `0.96.0`부터 INI를 사용할 수 있습니다.<br>
**기본값**: `100`
예외에 대한 샘플링 거리를 설정합니다. 샘플링 거리가 클수록 생성되는 샘플 수가 줄어들고 오버헤드가 감소합니다.<br><br>
**참고**: 이는 `0.92`부터 사용 가능했던 `DD_PROFILING_EXPERIMENTAL_EXCEPTION_SAMPLING_DISTANCE` 환경 변수(`datadog.profiling.experimental_exception_sampling_distance` INI 설정)를 대체합니다. 둘 다 설정되어 있으면 이 설정이 우선합니다.

`DD_PROFILING_TIMELINE_ENABLED`
: **INI**: `datadog.profiling.timeline_enabled`. `0.98.0`부터 사용 가능합니다.<br>
**기본값**: `1`<br>
타임라인 프로필 유형을 활성화합니다. `0.89.0` 버전에 추가되었습니다.<br><br>
**참고**: 이는 `0.89` (기본값 `0`)부터 사용 가능했던 `DD_PROFILING_EXPERIMENTAL_TIMELINE_ENABLED` 환경 변수(`datadog.profiling.experimental_timeline_enabled` INI 설정)를 대체합니다. 둘 다 설정되어 있으면 이 설정이 우선합니다.

`DD_PROFILING_LOG_LEVEL`
: **INI**: `datadog.profiling.log_level`. `0.82.0`부터 INI를 사용할 수 있습니다.<br>
**기본값**: `off`<br>
프로파일러의 로그를 남길 수준을 설정합니다. 허용되는 값은 `off`, `error`, `warn`, `info`, `debug`, `trace`입니다. 프로파일러의 로그는 프로세스의 표준 오류 스트림에 기록됩니다. `0.69.0` 버전에 추가되었습니다.

### 트레이스 컨텍스트 전파

분산된 트레이스 컨텍스트를 전파하기 위해 PHP 추적 라이브러리를 설정하여 헤더를 추출하고 삽입하는 방법에 대한 자세한 내용은 [트레이스 컨텍스트 전파][11]를 참조하세요.

`DD_TRACE_PROPAGATION_STYLE_INJECT`
: **INI**: `datadog.trace.propagation_style_inject`<br>
**기본값**: `Datadog,tracecontext`<br>
추적 헤더를 삽입할 때 사용할 전파 스타일입니다. 여러 스타일을 사용하는 경우 쉼표로 구분합니다. 지원되는 스타일은 다음과 같습니다.

  - [tracecontext][10]
  - [b3multi][7]
  - [B3 single header][8]
  - Datadog

`DD_TRACE_PROPAGATION_STYLE_EXTRACT`
: **INI**: `datadog.trace.propagation_style_extract`<br>
**기본값**: `Datadog,tracecontext,b3multi,B3 single header`<br>
추적 헤더를 추출할 때 사용할 전파 스타일입니다. 여러 스타일을 사용하는 경우 쉼표로 구분합니다. 지원되는 스타일은 다음과 같습니다.

  - [tracecontext][10]
  - [b3multi][7]
  - [B3 single header][8]
  - Datadog

### 통합

`DD_TRACE_<INTEGRATION>_ENABLED`
: **INI**: `datadog.trace.<INTEGRATION>_enabled`<br>
**기본값**: `1`<br>
 통합을 활성화하거나 비활성화합니다. 모든 통합은 기본적으로 활성화되어 있습니다([통합 이름](#integration-names) 참조).

`DD_TRACE_WORDPRESS_ADDITIONAL_ACTIONS`
: **INI**: `datadog.trace.wordpress_additional_actions`<br>
**기본값**: `null`<br>
계측할 WordPress 작업 후크를 쉼표로 구분한 목록입니다. 이 기능은 `DD_TRACE_WORDPRESS_ENHANCED_INTEGRATION`이 활성화된 경우에만 사용할 수 있습니다. `0.91.0` 버전에 추가되었습니다.

`DD_TRACE_WORDPRESS_CALLBACKS`
: **INI**: `datadog.trace.wordpress_callbacks`<br>
**기본값**: PHP 추적기 >= v1.0의 경우 `true`입니다.<br>
WordPress 작업 후크 콜백 계측을 활성화합니다. 이 기능은 `DD_TRACE_WORDPRESS_ENHANCED_INTEGRATION`이 활성화된 경우에만 사용할 수 있습니다. 버전 `0.91.0`에 추가되었습니다.


`DD_OPENAI_SERVICE`
: **INI**: `datadog.openai.service`<br>
**기본값**: `DD_SERVICE`<br>
OpenAI 요청에 대해 기본적으로 보고되는 서비스 이름입니다.

`DD_OPENAI_LOGS_ENABLED`
: **INI**: `datadog.openai.logs_enabled`<br>
**기본값**: `false`<br>
프롬프트 및 완료 수집을 로그로 활성화합니다. 아래에 설명된 샘플 비율 설정을 사용하여 프롬프트 및 완료 수집 비율을 조정할 수 있습니다.

`DD_OPENAI_METRICS_ENABLED`
: **INI**: `datadog.openai.metrics_enabled`<br>
**기본값**: `true`<br>
OpenAI 메트릭 수집을 활성화합니다.<br>
 Datadog 에이전트가 기본값이 아닌 StatsD 호스트 이름 또는 포트를 사용하도록 설정된 경우, `DD_DOGSTATSD_URL` 을 사용하여 OpenAI 메트릭 컬렉션을 설정하세요.

`DD_OPENAI_SPAN_CHAR_LIMIT`
: **INI**: `datadog.openai.span_char_limit`<br>
**기본값**: `128`<br>
스팬 태그 내에서 다음 데이터의 최대 글자 수를 설정합니다.

  - 프롬프트 입력 및 완료
  - 메시지 입력 및 완성
  - 입력 포함

최대 글자 수를 초과하는 텍스트는 글자 수 제한에 따라 잘리고 끝에 `...`가 추가됩니다.

`DD_OPENAI_SPAN_PROMPT_COMPLETION_SAMPLE_RATE`
: **INI**: `datadog.openai.span_prompt_completion_sample_rate`<br>
**기본값**: `1.0`<br>
프롬프트 및 완료 수집을 위한 샘플 속도를 스팬 태그로 설정합니다.

`DD_OPENAI_LOG_PROMPT_COMPLETION_SAMPLE_RATE`
: **INI**: `datadog.openai.log_prompt_completion_sample_rate`<br>
**기본값**: `0.1`<br>
프롬프트 및 완료 수집을 위한 샘플 속도를 로그로 설정합니다.

#### 통합 이름

아래 표는 각 통합에 대한 기본 서비스 이름입니다. 서비스 이름을 `DD_SERVICE_MAPPING`으로 변경합니다.

`DD_TRACE_<INTEGRATION>_ENABLED`와 같이 통합별 설정을 구성할 때 이름을 사용합니다. 예를 들어 Larabel은 `DD_TRACE_LARAVEL_ENABLED`입니다.

| 통합       | 서비스 이름       |
|-------------------|--------------------|
| AMQP              | `amqp`             |
| CakePHP           | `cakephp`          |
| CodeIgniter       | `codeigniter`      |
| cURL              | `curl`             |
| ElasticSearch     | `elasticsearch`    |
| Eloquent          | `eloquent`         |
| Guzzle            | `guzzle`           |
| Laminas           | `laminas`          |
| Laravel           | `laravel`          |
| Laravel 대기열     | `laravelqueue`     |
| Lumen             | `lumen`            |
| Memcache          | `memcache`         |
| Memcached         | `memcached`        |
| Mongo             | `mongo`            |
| MongoDB           | `mongodb`          |
| Mysqli            | `mysqli`           |
| Nette             | `nette`            |
| OpenAI            | `openai`           |
| PCNTL             | `pcntl`            |
| PDO               | `pdo`              |
| PhpRedis          | `phpredis`         |
| Predis            | `predis`           |
| Psr18             | `psr18`            |
| Roadrunner        | `roadrunner`       |
| Sql 서버        | `sqlsrv`           |
| Symfony           | `symfony`          |
| Symfony Messenger | `symfonymessenger` |
| WordPress         | `wordpress`        |
| Yii               | `yii`              |
| ZendFramework     | `zendframework`    |

## 리소스 이름을 정규화된 URI에 매핑

<div class="alert alert-danger">
다음 중 하나를 설정하세요. <code>DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX</code>, <code>DD_TRACE_RESOURCE_URI_MAPPING_INCOMING</code> 및 <code>DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING</code>을 설정하면 새로운 리소스 정규화 방식을 선택하게 되며 <code>DD_TRACE_RESOURCE_URI_MAPPING의</code> 모든 값은 무시됩니다.
</div>

HTTP 서버 및 클라이언트 통합의 경우 URL은 쿼리 문자열이 제거된 `<HTTP_REQUEST_METHOD> <NORMALIZED_URL>` 형식의 트레이스 리소스 이름을 형성하는 데 사용됩니다. 이렇게 하면 URL을 정규화하고 일반 엔드포인트를 하나의 리소스 아래에 그룹화하여 자동으로 계측되지 않는 커스텀 프레임워크에서 가시성을 높일 수 있습니다.

| HTTP 요청                       | 리소스 이름 |
| :--------------------------------- | :------------ |
| `/foo?a=1&b=2`에 대한 **GET** 요청   | `GET /foo`    |
| `/bar?foo=bar`에 대한 **POST** 요청 | `POST /bar`   |

숫자 ID, UUID(대시 포함 또는 제외) 및 32~512비트 16진수 해시는 `?` 문자로 자동 대체됩니다.

| URL(GET 요청)                              | 리소스 이름      |
| :--------------------------------------------- | :----------------- |
| `/user/123/show`                               | `GET /user/?/show` |
| `/widget/b7a992e0-3300-4030-8617-84553b11c993` | `GET /widget/?`    |
| `/api/v2/b7a992e033004030861784553b11c993/123` | `GET /api/v2/?/?`  |
| `/book/0dbf3596`                               | `GET /book/?`      |

`DD_TRACE_URL_AS_RESOURCE_NAMES_ENABLED=0`을 사용하여 이 기능을 끌 수 있습니다.

### 커스텀 URL-리소스 매핑

자동 정규화가 적용되지 않는 몇 가지 경우가 있습니다.

| URL(GET 요청)                | 예상 리소스 이름        |
| :------------------------------- | :---------------------------- |
| `/using/prefix/id123/for/id`     | `GET /using/prefix/?/for/id`  |
| `/articles/slug-of-title`        | `GET /articles/?`             |
| `/cities/new-york/rivers`        | `GET /cities/?/rivers`        |
| `/nested/cities/new-york/rivers` | `GET /nested/cities/?/rivers` |

자동 정규화가 적용되지 않는 시나리오에는 두 가지 클래스가 있습니다:

  - 정규화할 경로 조각은 재현 가능한 패턴을 가지며 위 예시의 `id<number>`와 같이 URL의 어느 부분에나 존재할 수 있습니다. 이 시나리오에는 아래의 `DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX` 설정이 적용됩니다.
  - 경로 조각은 무엇이든 될 수 있으며, 이전 경로 조각은 값을 정규화해야 함을 나타냅니다. 예를 들어 `/cities/new-york`은 도시 이름 `new-york`이므로 정규화해야 한다는 것을 알려줍니다. 이 시나리오는 수신 및 발신 요청에 대해 각각 `DD_TRACE_RESOURCE_URI_MAPPING_INCOMING` 및 `DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING` 설정에서 다룹니다.

##### `DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX`

이 설정은 모든 경로 조각에 독립적으로 적용되는 하나 이상의 정규 표현식으로 구성된 CSV입니다. 예를 들어 `/using/prefix/id123/for/id` 경로에 대해 `DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX`를 `^id\d+$`로 설정하면 각 조각(`using`, `prefix`, `id123`, `for` 및 `id`)에 정규식이 적용됩니다.

| URL                          | 정규식     | 예상 리소스 이름       |
| :--------------------------- | :-------- | :--------------------------- |
| `/using/prefix/id123/for/id` | `^id\d+$` | `GET /using/prefix/?/for/id` |

이 변수의 형식은 CSV이므로 쉼표 문자 `,`는 이스케이프 처리되지 않으며 정규식에 사용할 수 없습니다.

##### `DD_TRACE_RESOURCE_URI_MAPPING_INCOMING` 및 `DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING`

이 설정은 와일드카드 `*`를 포함할 수 있는 패턴의 CSV입니다. 예를 들어 `cities/*` 패턴을 추가하면 URL을 분석하는 동안 `cities` 조각이 발견될 때마다 다음 조각(있는 경우)이 `?`로 바뀝니다. 패턴은 모든 깊이에 적용되므로 다음 규칙을 적용하면 위 표의 `/cities/new-york` 및 `/nested/cities/new-york`이 모두 정규화됩니다.

특정 조각의 일부에 패턴을 적용할 수 있습니다. 예를 들어 `path/*-fix`는 `/some/path/changing-fix/nested` URL을 다음과 같이 정규화합니다. `/some/path/?-fix/nested`

`DD_TRACE_RESOURCE_URI_MAPPING_INCOMING`은 들어오는 요청(예: 웹 프레임워크)에만 적용되고 `DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING`은 나가는 요청(예: `curl` 및 `guzzle` 요청)에만 적용된다는 점에 유의하세요.

##### `open_basedir` 제한 사항

`open_basedir`][9] 설정을 사용하는 경우 허용된 디렉터리 목록 에 `/opt/datadog-php` 을 추가해야 합니다.
애플리케이션이 도커(Docker) 컨테이너 에서 실행되는 경우 `/proc/self` 경로도 허용된 디렉터리의 목록 에 추가해야 합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/tagging/unified_service_tagging/
[2]: https://httpd.apache.org/docs/2.4/mod/mod_env.html#setenv
[3]: /ko/tracing/trace_collection/proxy_setup/?tab=nginx
[4]: /ko/profiler/enabling/php/
[5]: https://github.com/mind04/mod-ruid2
[6]: /ko/tracing/trace_pipeline/ingestion_mechanisms/
[7]: https://github.com/openzipkin/b3-propagation
[8]: https://github.com/openzipkin/b3-propagation#single-header
[9]: https://www.php.net/manual/en/ini.core.php#ini.open-basedir
[10]: https://www.w3.org/TR/trace-context/#trace-context-http-headers-format
[11]: /ko/tracing/trace_collection/trace_context_propagation/
[13]: /ko/agent/configuration/network/#configure-ports
[14]: /ko/tracing/guide/trace-php-cli-scripts/#long-running-cli-scripts
[15]: /ko/tracing/guide/trace-php-cli-scripts/
[16]: /ko/tracing/configure_data_security#telemetry-collection
[17]: /ko/tracing/other_telemetry/connect_logs_and_traces/php
[18]: /ko/tracing/trace_collection/otel_instrumentation/php/
[19]: /ko/tracing/trace_collection/compatibility/php/
[20]: /ko/opentelemetry/interoperability/environment_variable_support