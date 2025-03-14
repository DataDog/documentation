---
aliases:
- /ko/security_platform/application_security/troubleshooting
further_reading:
- link: /security/application_security/
  tag: 설명서
  text: Datadog 애플리케이션 보안 관리로 위협 모니터링
- link: /security/application_security/how-appsec-works/
  tag: 설명서
  text: Datadog에서 애플리케이션 보안 관리가 작동하는 방식
title: 애플리케이션 보안 관리 트러블슈팅
---


## 개요

Datadog 애플리케이션 보안 관리(ASM)에서 예기치 않은 동작이 발생하는 경우, 하단에 언급된 것처럼 조사할 수 있는 일반적인 문제가 있습니다. 문제가 계속되면 [Datadog 지원 팀][1]에 문의하여 추가 지원을 받으세요.

## ASM 속도 제한

ASM 트레이스는 전송 속도가 초당 100 트레이스로 제한됩니다. 한도 초과 후 전송된 트레이스는 보고되지 않습니다. 한도를 변경해야 하는 경우 [Datadog 지원 팀][1]에 문의하세요.

## ASM가 보안 트레이스를 감지하지 않음

위협 정보가 ASM [트레이스 및 신호 탐색기][2]에 표시되려면 일련의 단계를 성공적으로 실행해야 합니다. 본 문제를 조사할 때는 각 단계를 점검하는 것이 중요합니다. 특정 언어에 대한 추가 트러블슈팅 단계는 마지막의 언어 탭에서 확인할 수 있습니다.

### ASM이 활성화되어 있는지 확인

ASM이 실행 중인 경우 메트릭 `datadog.apm.appsec_host` 점검을 사용합니다.

1. Datadog에서 **메트릭 > 요약**으로 이동합니다.
2. 메트릭 `datadog.apm.appsec_host`을 검색합니다. 메트릭이 없으면 ASM을 실행 중인 서비스가 없는 것입니다. 메트릭이 있는 경우 서비스는 메트릭 태그 `host` 및 `service`와 함께 보고됩니다.
3. 메트릭을 선택하고, **태그** 섹션에서 `service`를 검색하여 어떤 서비스가 ASM을 실행 중인지 확인합니다.

`datadog.apm.appsec_host`가 표시되지 않는 경우 [앱 내 지침][3]을 확인하여 초기 설정의 모든 단계가 완료되었는지 확인합니다.

ASM 데이터는 애플리케이션 성능 모니터링(APM) 트레이스로 전송됩니다. [애플리케이션 성능 모니터링(APM) 트러블슈팅][4]를 참조하여 [애플리케이션 성능 모니터링 설치를 확인][5]하고 [연결 오류][6]를 점검하세요.

### 애플리케이션에 테스트 공격 전송하기

 ASM 설정을 테스트하려면 다음 Curl 스크립트가 포함된 파일을 실행하여 [감지된 보안 스캐너][7] 규칙을 트리거합니다.

{{< programming-lang-wrapper langs="java,.NET,go,ruby,PHP,Node.js,python" >}}
{{< programming-lang lang="java" >}}

```bash
for ((i=1;i<=250;i++));
do
# Target existing service's routes
curl https://your-application-url/existing-route -A dd-test-scanner-log;
# Target non existing service's routes
curl https://your-application-url/non-existing-route -A dd-test-scanner-log;
done
```

**참고:** `dd-test-scanner-log` 값은 최신 릴리스에서 지원됩니다.

{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

```bash
for ((i=1;i<=250;i++));
do
# Target existing service's routes
curl https://your-application-url/existing-route -A dd-test-scanner-log;
# Target non existing service's routes
curl https://your-application-url/non-existing-route -A dd-test-scanner-log;
done
```

**참고:** `dd-test-scanner-log` 값은 최신 릴리스에서 지원됩니다.

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

 ```bash
 for ((i=1;i<=250;i++));
do
# Target existing service's routes
curl https://your-application-url/existing-route -A Arachni/v1.0;
# Target non existing service's routes
curl https://your-application-url/non-existing-route -A Arachni/v1.0;
done
```

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

 ```bash
 for ((i=1;i<=250;i++));
do
# Target existing service's routes
curl https://your-application-url/existing-route -A Arachni/v1.0;
# Target non existing service's routes
curl https://your-application-url/non-existing-route -A Arachni/v1.0;
done
```

{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

```bash
for ((i=1;i<=250;i++));
do
# Target existing service's routes
curl https://your-application-url/existing-route -A dd-test-scanner-log;
# Target non existing service's routes
curl https://your-application-url/non-existing-route -A dd-test-scanner-log;
done
```

**참고:** `dd-test-scanner-log` 값은 최신 릴리스에서 지원됩니다.

{{< /programming-lang >}}
{{< programming-lang lang="Node.js" >}}

```bash
for ((i=1;i<=250;i++));
do
# Target existing service's routes
curl https://your-application-url/existing-route -A dd-test-scanner-log;
# Target non existing service's routes
curl https://your-application-url/non-existing-route -A dd-test-scanner-log;
done
```
**참고:** `dd-test-scanner-log` 값은 최신 릴리스에서 지원됩니다.

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

```bash
for ((i=1;i<=250;i++));
do
# Target existing service's routes
curl https://your-application-url/existing-route -A dd-test-scanner-log;
# Target non existing service's routes
curl https://your-application-url/non-existing-route -A dd-test-scanner-log;
done
```

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

애플리케이션을 활성화 및 실행하고 몇 분 후 위협 정보가 [트레이스 및 신호 탐색기][2]에 표시됩니다.

{{< img src="/security/security_monitoring/explorer/signal_panel_v2.png" alt="태그, 메트릭, 제안 단계, 위협과 관련된 공격자 IP 주소를 나타내는 Security Signal 상세 페이지." style="width:100%;" >}}

### 필요한 트레이서 통합이 비활성화되어있는지 점검

ASM은 특정 트레이서 통합에 의존합니다. 해당 통합이 비활성화되어 있으면 ASM이 작동하지 않습니다. 해당 통합이 비활성화되어 있는지 확인하려면 [시작 로그][8]에서 `disabled_integrations`을 검색합니다.

필요한 통합은 언어에 따라 다릅니다.

{{< programming-lang-wrapper langs="java,.NET,go,ruby,PHP,Node.js,python" >}}
{{< programming-lang lang="java" >}}

자바(Java)의 경우, 다음 기술 중 하나를 사용한다면 다음과 같은 각 통합이 필요합니다.

- grizzly
- grizzly-filterchain
- jersey
- jetty
- ratpack
- ratpack-request-body (ratpack가 필요함)
- resteasy
- servlet
- servlet-2
- servlet-3
- servlet-request-body (servlet가 필요함)
- spring-web
- tomcat


{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

.NET의 경우 ASP.NET 통합이 필요합니다.

**참고:** ASP.NET Core를 비활성화한 경우에도 ASM은 이 프레임워크에서 계속 작동해야 합니다.


{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

PHP의 경우 본 통합이 필요하지 않습니다.
<p></p>


{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

다음 Go 프레임워크는 즉시 사용 가능한 애플리케이션 성능 모니터링(APM) 통합을 사용하여 계측해야 합니다.

- [gRPC][2] ([v2][8])
- [net/http][3] ([v2][9])
- [Gorilla Mux][4] ([v2][10])
- [Echo][5] ([v2][11])
- [Chi][6] ([v2][12])

Go 트레이서 버전(v1.x 또는 v2.x)에 맞는 문서를 참조하세요. 프레임워크가 지원되지 않는 경우 Go 리포지토리에서 [새 이슈를 생성][7]합니다.

[2]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc#example-package-Server
[3]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http#example-package
[4]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux#example-package
[5]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo.v4#example-package
[6]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi.v5#example-package
[7]: https://github.com/DataDog/dd-trace-go/issues/new?title=Missing%20appsec%20framework%20support
[8]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/google.golang.org/grpc/v2
[9]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/net/http/v2
[10]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/gorilla/mux/v2
[11]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/labstack/echo.v4/v2
[12]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/go-chi/chi.v5/v2

{{< /programming-lang >}}
{{< programming-lang lang="Node.js" >}}

Node.js의 경우 HTTP 통합이 필요합니다.
<p></p>


{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

루비(Ruby)의 경우 [Rack][2] 통합이 필요합니다. 루비(Ruby) 트레이서 버전 `1.0.0` 이상도 필요합니다. [0.x에서 1.x로 마이그레이션][3] 지침을 참조하세요.

**참고:** Rack은 수동으로 추가하거나 [Rails][4] 또는 [Sinatra][5] 통합으로 자동으로 추가할 수 있습니다. 수동으로 추가하는 경우, 트레이서 미들웨어는 Rack 스택에서 보안 미들웨어보다 먼저 표시되어야 합니다.

[2]: /ko/tracing/trace_collection/dd_libraries/ruby/#rack
[3]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/UpgradeGuide.md#from-0x-to-10
[4]: /ko/tracing/trace_collection/dd_libraries/ruby/#rails
[5]: /ko/tracing/trace_collection/dd_libraries/ruby/#sinatra
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

파이썬(Python)의 경우, WSGI 통합은 사용하는 프레임워크용 통합과 함께 필요합니다.
Django 또는 Flask 통합이 이에 해당됩니다.
<p></p>

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Datadog 에이전트 설정 점검

 프로세스의 해당 단계 문제를 해결하려면 다음 작업을 수행합니다.

- 이 주소 `http://<agent-machine-name>:<agent-port>/info`에서 실행 중인 에이전트의 세부 정보를 확인합니다(보통 `http://localhost:8126/info`).
- [트레이서 로그][7]에 스팬(span)과 관련된 에이전트 전송 오류가 없는지 확인합니다.
- 에이전트가 별도의 머신에 설치된 경우 `DD_AGENT_HOST`를 확인하고, 옵션으로 `DD_TRACE_AGENT_PORT`가 설정되거나 `DD_TRACE_AGENT_URL`가 애플리케이션 추적 라이브러리용으로 설정되었는지 확인합니다. 

### 스팬(span)이 Datadog으로 성공적으로 전송되었는지 확인

ASM 데이터는 [스팬(span)][9]을 통해 전송됩니다. 스팬(span)이 Datadog으로 성공적으로 전송되었는지 확인하려면 트레이서 로그에 다음과 유사한 로그가 포함되어 있는지 확인합니다.

```
2021-11-29 21:19:58 CET | TRACE | INFO | (pkg/trace/info/stats.go:111 in LogStats) | [lang:.NET lang_version:5.0.10 interpreter:.NET tracer_version:1.30.1.0 endpoint_version:v0.4] -> traces received: 2, traces filtered: 0, traces amount: 1230 bytes, events extracted: 0, events sampled: 0
```

스팬(span)이 전송되지 않는 경우 트레이서 로그에는 다음과 유사한 로그가 포함됩니다.

```
2021-11-29 21:18:48 CET | TRACE | INFO | (pkg/trace/info/stats.go:104 in LogStats) | No data received
```

## 언어별 트러블슈팅

다음은 특정 언어별 추가 트러블슈팅 단계입니다.

{{< programming-lang-wrapper langs="java,.NET,go,ruby,PHP,Node.js,python" >}}
{{< programming-lang lang="java" >}}
자바(Java) 라이브러리는 로깅에 [SLF4J][1]를 사용합니다. 다음 런타임 플래그를 추가하여 트레이서가 파일에 로그를 저장하도록 합니다.

```java
 -Ddatadog.slf4j.simpleLogger.defaultLogLevel=info
 -Ddatadog.slf4j.simpleLogger.logFile=dd.log
```

서비스가 시작되면 트레이서가 지정된 파일에 로깅합니다. Datadog은 `DEBUG` 로그가 상세하기 때문에 로그 레벨에 `INFO`를 사용할 것을 권장합니다.

[1]: https://www.slf4j.org/
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

.NET 라이브러리는 파일에 로그를 저장하며 `stdout`/`stderr`에 로그를 저장할 수 없습니다. 기본 로그 레벨은 `INFO`입니다. `DEBUG` 로그를 활성화하려면 `DD_TRACE_DEBUG=true`를 설정합니다.

로그 파일은 다음 디렉토리에서 사용할 수 있습니다.

| 플랫폼   | 로그 디렉토리    |
|------------|----------------|
| Docker       | 컨테이너의 디렉토리는 `/var/log/datadog/dotnet/`입니다. 권장 옵션은 [volumes][1]를 사용하여 호스팅 머신에 로그 폴더를 마운트하는 것입니다. |
| Linux      | /var/log/datadog/dotnet/                                   |
| 윈도우즈(Windows)    | C:\ProgramData\Datadog .NET Tracer\logs                    |

[1]: https://docs.docker.com/storage/volumes/
{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

PHP의 경우 Datadog ASM 확장으로 문제 트러블슈팅을 시작하려면 ASM 확장 `.ini` 파일에서 디버그 로그를 사용하도록 설정합니다.

확장자의 `ini` 파일은 보통 `/etc/php/<version>/xxx/conf.d/98-ddtrace.ini`에서 찾을 수 있지만, 위치는 설치 환경에 따라 다를 수 있습니다. `phpinfo()` 출력값의 시작 부분을 확인하여 `.ini` 파일을 스캔하는 디렉토리가 있는지 확인합니다(해당되는 경우). `.ini` 파일에서 다음 설정 옵션을 아래와 같이 설정합니다.

```php
datadog.appsec.log_level='debug'
datadog.appsec.helper_extra_args='--log_level=debug'
datadog.appsec.helper_log_file='/tmp/helper.log'
```

확장 출력값은 로그를 기본 `php_error` 로그 파일에 저장합니다. 파일에 로그가 없는 경우 `.ini` 파일에 다음을 추가합니다.

```php
datadog.appsec.log_file='tmp/extension.log'
```

### 설치 중 PHP 찾기 실패
설치 스크립트에서 올바른 PHP 버전을 찾을 수 없는 경우 `--php-bin`을 PHP 바이너리 위치로 설정할 수 있습니다. 예시:

```
$ php datadog-setup.php --php-bin /usr/bin/php7.4 --enable-appsec
```
### 도우미 연결 실패
ASM 확장이 도우미 프로세스와 연결할 수 없는 경우 다음 경고 메시지가 표시됩니다.

```
PHP Warning:  Unknown: [ddappsec] Connection to helper failed and we are not going to attempt to launch it: dd_error
```

경고 뒤에 다음 오류 메시지 중 하나가 표시될 수 있습니다.

```
PHP Warning:  Unknown: [ddappsec] Could not open lock file /tmp/ddappsec.lock: Permission denied in Unknown on line 0
```
```
PHP Warning:  Unknown: [ddappsec] Call to bind() failed: Permission denied
```
```
PHP Warning:  Unknown: [ddappsec] Failed to unlink /tmp/ddappsec.sock: Operation not permitted
```

이는 확장이 사용하는 잠금 파일 또는 소켓 파일의 권한이 올바르지 않거나, PHP 프로세스를 실행하는 사용자에게 `tmp` 디렉토리 쓰기 권한이 없음을 나타냅니다.

잠금 파일이나 소켓 파일의 권한이 올바르지 않은 경우, 해당 파일을 삭제하고 Apache/FPM을 다시 시작하거나 `user:group`을 Apache/FPM에서 사용된 권한과 일치하도록 조정할 수 있습니다(예: `www-data`).

사용자가 tmp 디렉터리 쓰기 권한이 없는 경우 확장의 `.ini` 파일에서 다음 설정을 수정하여 잠금 파일 및 소켓 파일의 위치를 변경합니다.

```
datadog.appsec.helper_runtime_path = /<directory with compatible permissions>/
```

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

#### 실행 중인 애플리케이션에서 ASM이 활성화되어 있는지 확인

[트레이서 시작 로그][1]는 트레이서 설정 및 ASM 사용 설정 여부를 표시합니다. `appsec`이 `true`면 ASM이 사용하도록 설정되어 실행 중입니다.

예를 들어 다음 시작 로그는 ASM이 비활성화되었음을 나타냅니다.

```
2022/02/17 14:49:00 Datadog Tracer v1.36.0 INFO: DATADOG TRACER CONFIGURATION {"date":"2022-02-17T14:49:00+01:00","os_name":"Linux (Unknown Distribution)","os_version":"5.13.0","version":"v1.36.0","lang":"Go","lang_version":"go1.17.1","env":"prod","service":"grpcserver","agent_url":"http://localhost:8126/v0.4/traces","debug":false,"analytics_enabled":false,"sample_rate":"NaN","sampling_rules":null,"sampling_rules_error":"","service_mappings":null,"tags":{"runtime-id":"69d99219-b68f-4718-9419-fa173a79351e"},"runtime_metrics_enabled":false,"health_metrics_enabled":false,"profiler_code_hotspots_enabled":false,"profiler_endpoints_enabled":false,"dd_version":"","architecture":"amd64","global_service":"","lambda_mode":"false","appsec":false,"agent_features":{"DropP0s":false,"Stats":false,"StatsdPort":0}}
```

#### 디버그 로그 활성화

`DD_TRACE_DEBUG=1` 환경 변수로 디버그 로그를 활성화합니다. ASM 라이브러리는 표준 오류 출력으로 로깅합니다.

**참고:** ASM은 활성화된 경우에만 로그를 출력합니다. 환경 변수 `DD_APPSEC_ENABLED=1`로 ASM을 활성화합니다.

[1]: /ko/tracing/troubleshooting/tracer_startup_logs/
{{< /programming-lang >}}
{{< programming-lang lang="Node.js" >}}

Node.js 라이브러리를 1.x에서 2.x로 업그레이드한 경우 본 [마이그레이션 지침][1]을 참조하여 변경 사항을 평가합니다.

Node.js 애플리케이션의 [트레이스 및 신호 탐색기][2]에 ASM 위협 정보가 표시되지 않는 경우 다음 단계에 따라 문제를 해결합니다.

1. [시작 로그][3]에서 `appsec_enabled`이 `true`인지 점검하여 최신 버전의 ASM이 실행 중인지 확인합니다.

    a. 요청이 전송된 후 시작 로그가 표시되지 않으면 환경 변수 `DD_TRACE_STARTUP_LOGS=true`를 추가하여 시작 로그를 활성화합니다. `appsec_enabled` 시작 로그가 `true`인지 확인합니다.

    b. `appsec_enabled`이 `false`인 경우 ASM이 올바르게 활성화되지 않은 것입니다. 이러한 경우 [설치 지침][4]을 참조하세요.

    c. `appsec_enabled`이 시작 로그에 없는 경우 최신 ASM 버전을 설치해야 합니다. 이러한 경우 [설치 지침][4]을 참조하세요.

2. 트레이서가 작동하나요? 애플리케이션 성능 모니터링(APM) 대시보드에서 관련 트레이스를 확인할 수 있나요?

    ASM은 트레이서에 의존하므로 트레이스가 표시되지 않으면 트레이서가 작동하지 않는 것일 수도 있습니다. [애플리케이션 성능 모니터링(APM) 트러블슈팅][5]을 참조하세요.

3. 애플리케이션 디렉토리에서 `npm explore @datadog/native-appsec -- npm run install` 명령을 실행하고 앱을 다시 시작합니다.

    a. `@datadog/native-appsec`을 찾을 수 없다면 잘못 설치된 것입니다.

    b. 애플리케이션 시작 시 `@datadog/native-appsec`을 확인한 경우 런타임 시작 스크립트에 명령을 추가합니다.

    c. 그래도 트레이서가 작동하지 않으면 지원되지 않는 런타임을 실행하는 것일 수도 있습니다.

4. 로그를 활성화하려면 다음 환경 변수를 추가합니다.

    ```
    DD_TRACE_DEBUG=1
    DD_TRACE_LOG_LEVEL=info
    ```

[1]: https://github.com/DataDog/dd-trace-js/blob/master/MIGRATING.md
[2]: https://app.datadoghq.com/security/appsec/
[3]: /ko/tracing/troubleshooting/tracer_startup_logs/
[5]: /ko/tracing/troubleshooting/
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

파이썬(Python) 애플리케이션의 [트레이스 및 신호 탐색기][1]에 ASM 위협 정보가 표시되지 않는 경우, ASM이 실행 중이고 트레이서가 작동 중인지 확인하세요.

1. 애플리케이션의 로그 레벨을 `DEBUG`로 설정하여 ASM이 실행 중인지 확인합니다.

   ```python
   import logging
   logging.basicConfig(level=logging.DEBUG)
   ```

   그런 다음 애플리케이션에 대한 HTTP 호출을 실행합니다. 다음 로그가 표시되어야 합니다.

   ```
   DEBUG:ddtrace.appsec.processor:[DDAS-001-00] Executing AppSec In-App WAF with parameters:
   ```

   로그가 없다면 ASM이 실행되지 않는 것입니다.

2. 트레이서가 작동하나요? 애플리케이션 성능 모니터링(APM) 대시보드에서 관련 트레이스를 확인할 수 있나요?

   ASM은 트레이서에 의존하므로 트레이스가 표시되지 않으면 트레이서가 작동하지 않는 것일 수도 있습니다. [애플리케이션 성능 모니터링(APM) 트러블슈팅][2]을 참조하세요.


[1]: https://app.datadoghq.com/security/appsec/
[2]: /ko/tracing/troubleshooting/
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

루비(Ruby)의 경우 몇 분이 지난 후에도 [트레이스 및 신호 탐색기][1]에 ASM 위협 정보가 표시되지 않으면 [디버그 로그][2] 트레이서 진단을 사용 설정합니다. 예:

```ruby
Datadog.configure do |c|
  c.diagnostics.debug = true  # increase general log level to debug
  c.appsec.waf_debug = true   # also enable WAF-specific log verbosity to highest level
end
```

디버그 로그는 상세하지만 유용합니다. [Datadog 지원][1]으로 티켓을 여는 경우 요청과 함께 해당 로그를 전달해 주세요.

#### ASM이 올바르게 활성화되어 있나요?

다음과 같이 로그가 표시되면 ASM이 올바르게 활성화된 것입니다.

```
D, [2021-12-14T11:03:32.167125 #73127] DEBUG -- ddtrace: [ddtrace] (libddwaf/lib/datadog/appsec/waf.rb:296:in `block in logger=') {:level=>:ddwaf_log_info, :func=> "ddwaf_set_log_cb", :file=>"PowerWAFInterface.cpp", :message=>"Sending log messages to binding, min level trace"}
D, [2021-12-14T11:03:32.200491 #73127] DEBUG -- ddtrace: [ddtrace] (libddwaf/lib/datadog/appsec/waf.rb:296:in `block in logger=') {:level=>:ddwaf_log_debug, :func= >"parse", :file=>"parser_v2.cpp", :message=>"Loaded 124 rules out of 124 available in the ruleset"}
```

로그가 표시되지 않는 경우 다음을 점검하세요.

- 애플리케이션 프로세스에 올바른 ASM 환경 변수가 설정되어 있습니다.
- 최신 Gem 버전을 설치했습니다.
- 트레이서가 올바르게 설정되어 있으며, 애플리케이션 성능 모니터링(APM) 트레이스를 애플리케이션 성능 모니터링(APM) 대시보드로 전송합니다.

#### 각 HTTP 요청에 대해 ASM이 호출되나요?

각 HTTP 요청에 대해 ASM이 호출되는지 확인하려면 [테스트 공격](#send-a-test-attack-to-your-application)을 트리거하고 다음 로그를 찾아봅니다.

```
D, [2022-01-19T21:25:50.579745 #341792] DEBUG -- ddtrace: [ddtrace] (/home/lloeki/src/github.com/DataDog/dd-trace-rb/lib/datadog/appsec/reactive/operation.rb:14:in `initialize') operation: rack.request initialize
D, [2022-01-19T21:25:50.580300 #341792] DEBUG -- ddtrace: [ddtrace] (/home/lloeki/src/github.com/DataDog/dd-trace-rb/lib/datadog/appsec/contrib/rack/gateway/watcher.rb:25:in `block (2 levels) in watch') root span: 964736568335365930
D, [2022-01-19T21:25:50.580371 #341792] DEBUG -- ddtrace: [ddtrace] (/home/lloeki/src/github.com/DataDog/dd-trace-rb/lib/datadog/appsec/contrib/rack/gateway/watcher.rb:26:in `block (2 levels) in watch') active span: 964736568335365930
D, [2022-01-19T21:25:50.581061 #341792] DEBUG -- ddtrace: [ddtrace] (/home/lloeki/src/github.com/DataDog/dd-trace-rb/lib/datadog/appsec/contrib/rack/reactive/request.rb:34:in `block in subscribe') reacted to ["request.headers", "request.uri.raw", "request.query", "request.cookies", "request.body.raw"]: [{"version"=>"HTTP/1.1", "host"=>"127.0.0.1:9292", "accept"=>"*/*", "user-agent"=>"Nessus SOAP"}, "http://127.0.0.1:9292/", [], {}, ""]
```

로그가 표시되지 않는 경우 다음 작업을 시도해 보세요.

- 다른 업스트림 보안 시스템이 테스트 헤더 값에 기반하여 요청을 필터링하지 않아서 해당 요청이 애플리케이션에 도달하지 않는지 점검합니다.
- Curl 명령의 다른 사용자 에이전트 값을 사용하여 다른 [테스트 공격](#send-a-test-attack-to-your-application)을 보내 위협 정보가 성공적으로 전송되는지 확인합니다.
- 실행한 정확한 요청에 대한 애플리케이션 로그를 살펴보고, 해당 요청이 애플리케이션에 도달했고 다른 업스트림 시스템에서 응답하지 않았는지 확인합니다.

Rack 통합을 수동으로 설정한 경우, 알려진 문제로 인해 ASM이 작동하지 않는 경우가 종종 있습니다. 예시:

```ruby
Datadog.configure do |c|
  c.tracing.instrument :rails
  ...
  c.tracing.instrument :rack, web_service_name: "something", request_queuing: true
```

`c.tracing.instrument :rack`이 있다면 이를 삭제하여 점검을 통과하는지 확인합니다.

#### ASM이 HTTP 요청 보안 위협을 탐지하나요?

ASM이 보안 위협을 탐지하는지 확인하려면 [테스트 공격](#send-a-test-attack-to-your-application)을 트리거하고 다음 로그를 찾아봅니다.

```
D, [2021-12-14T22:39:53.268820 #106051] DEBUG -- ddtrace: [ddtrace] (ddtrace/lib/datadog/appsec/contrib/rack/reactive/request.rb:63:in `block in subscribe') WAF: #<struct Datadog::AppSec::WAF::Result action=:monitor, data=[{"rule"=>{"id"=>"ua0-600-10x", "name"=>"Nessus", "tags"=>{"type"=>"security_scanner", "category"=>"attack_attempt"}}, "rule_matches"=>[{"operator"=>"match_regex", "operator_value"=>"(?i)^Nessus(/|([ :]+SOAP))", "parameters"=>[{"address"=>"server.request.headers.no_cookies", "key_path"=>["user-agent"], "value"=>"Nessus SOAP", "highlight"=>["Nessus SOAP"]}]}]}], perf_data=nil, perf_total_runtime=20519>
```
로그가 표시되지 않는다면 다른 업스트림 보안 시스템이 요청을 필터링하지 않거나, 테스트 헤더 값을 기반으로 요청을 변경하고 있는지 확인합니다.

#### 트레이서가 보안 데이터와 같이 트레이스를 전송하고 있나요?
ASM 데이터는 애플리케이션 성능 모니터링(APM) 트레이스와 같이 전송됩니다. ASM이 보안 위협을 탐지하고 보안 데이터를 트레이스에 삽입하는지 확인하려면 [테스트 공격](#send-a-test-attack-to-your-application)을 트리거하고 다음 로그를 찾아봅니다.

```
Tags: [
   runtime-id => 0c3dfc67-9cf3-457c-a980-0229b203d048,
   _dd.runtime_family => ruby,
   appsec.event => true,
   _dd.appsec.json => {"triggers":[{"rule":{"id":"ua0-600-10x","name":"Nessus","tags":{"type":"security_scanner","category":"attack_attempt"}},"rule_matches":[{"operator":"match_regex","operator_value":"(?i)^Nessus(/|([ :]+SOAP))","parameters":[{"address":"server.request.headers.no_cookies","key_path":["user-agent"],"value":"Nessus SOAP","highlight":["Nessus SOAP"]}]}]}]},
   http.request.headers.host => 127.0.0.1:9292,
   http.request.headers.accept => */*,
   http.request.headers.user-agent => Nessus SOAP,
   http.response.headers.content-type => text/plain,
   http.host => 127.0.0.1,
   http.useragent => Nessus SOAP,
   network.client.ip => 127.0.0.1,
   _dd.origin => appsec,
   http.method => GET,
   http.url => /,
   http.base_url => http://127.0.0.1:9292,
   http.status_code => 200,
   http.response.headers.content_type => text/plain]
Metrics: [
   _dd.agent_psr => 1.0,
   system.pid => 155644.0,
   _dd.appsec.enabled => 1.0,
   _dd.measured => 1.0,
   _sampling_priority_v1 => 2.0]]
```

에이전트가 트레이스를 전달할 때까지 잠시 기다린 다음, 트레이스가 애플리케이션 성능 모니터링(APM) 대시보드에 표시되는지 확인합니다. 트레이스의 보안 정보는 ASM [트레이스 및 신호 탐색기][1]에서 보안 트레이스로 표시되기 전에 Datadog에서 처리하는 데 시간이 추가로 걸릴 수도 있습니다.

[1]: https://app.datadoghq.com/security/appsec/
[2]: /ko/tracing/troubleshooting/#tracer-debug-logs
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}


## 소프트웨어 구성 분석으로 탐지된 취약점이 없음

취약점 정보가 [소프트웨어 카탈로그 보안 보기][16] 또는 [취약점 탐색기][12]에 표시되려면 일련의 단계가 성공적으로 실행되어야 합니다. 이 문제를 조사할 때는 각 단계를 점검하는 것이 중요합니다.

### ASM이 활성화되어 있는지 확인

ASM이 실행 중인 경우 메트릭 `datadog.apm.appsec_host` 점검을 사용합니다.

1. Datadog에서 **메트릭 > 요약**으로 이동합니다.
2. 메트릭 `datadog.apm.appsec_host`을 검색합니다. 메트릭이 없으면 ASM을 실행 중인 서비스가 없는 것입니다. 메트릭이 있는 경우 서비스는 메트릭 태그 `host` 및 `service`와 함께 보고됩니다.
3. 메트릭을 선택하고, **태그** 섹션에서 `service`를 검색하여 어떤 서비스가 ASM을 실행 중인지 확인합니다.

`datadog.apm.appsec_host`가 표시되지 않는 경우 [앱 내 지침][3]을 확인하여 초기 설정의 모든 단계가 완료되었는지 확인합니다.

ASM 데이터는 애플리케이션 성능 모니터링(APM) 트레이스로 전송됩니다. [애플리케이션 성능 모니터링(APM) 트러블슈팅][4]를 참조하여 [애플리케이션 성능 모니터링 설치를 확인][5]하고 [연결 오류][6]를 점검하세요.

### 트레이서 버전이 업데이트되었는지 확인

올바른 버전의 트레이서를 사용하고 있는지 확인하려면 애플리케이션 보안 프로덕트 설정 설명서를 참조하세요. 라이브러리 정보가 포함된 텔레메트리 데이터 전송을 시작하려면 해당 최소 버전이 필요합니다.

### 텔레메트리 데이터 통신 확인

`DD_INSTRUMENTATION_TELEMETRY_ENABLED` 환경 변수(Node.js의 경우`DD_TRACE_TELEMETRY_ENABLED`)가 `true`로 설정되어 있거나 고객님이 사용하는 언어에 해당하는 시스템 속성이 활성화되어 있는지 확인합니다. 예를 들어 자바(Java)의 경우 `-Ddd.instrumentation.telemetry.enabled=true`입니다.

## 위협 관리 및 보호 비활성화하기

위협 관리를 비활성화하려면 애플리케이션 설정에서 `DD_APPSEC_ENABLED=true` 환경 변수를 삭제하고 서비스를 다시 시작합니다.

서비스에 `DD_APPSEC_ENABLED=true` 환경 변수가 설정되어 있지 않은 경우 다음 작업 중 하나를 수행합니다.
* PHP 서비스의 경우 환경 변수를 `DD_APPSEC_ENABLED=false`로 명시적으로 설정하고 서비스를 다시 시작합니다.
* [원격 설정][16]으로 위협 관리를 활성화한 경우 다음 작업을 수행합니다.
  1. [서비스][15](**ASM** > **카탈로그** > **서비스**)로 이동합니다.
  2. **모니터링 모드에서 위협 관리**를 선택합니다.
  3. **위협 관리** 패싯에서 **모니터링 전용**, **데이터 없음**, **차단 준비**를 활성화합니다.
  4. 서비스를 클릭합니다.
  5. 서비스 세부 정보의 **위협 탐지**에서 **비활성화**를 클릭합니다.

<div class="alert alert-info"><a href="https://app.datadoghq.com/organization-settings/remote-config">원격 설정</a>으로 위협 관리를 활성화한 경우 <strong>비활성화</strong> 버튼을 사용할 수 있습니다. 로컬 설정으로 위협 관리를 활성화한 경우 <strong>비활성화</strong> 버튼은 옵션이 아닙니다.</div>

* 서비스에서 위협 관리를 사용하지 않도록 일괄 설정하려면 다음에 따릅니다.
  1. [서비스][15]로 이동합니다.
  2. **위협 관리** 패싯에서 **모니터링 전용**, **데이터 없음**, **차단 준비**를 활성화합니다.
  3. 위협 탐지를 사용하지 않도록 설정하려는 서비스의 점검 확인란을 선택합니다.
  4. **일괄 작업**에서 **서비스(개수)에 대한 위협 탐지 비활성화**를 선택합니다.

## 코드 보안 비활성화

[코드 보안][13]을 비활성화하려면 애플리케이션 설정에서 `DD_IAST_ENABLED=true` 환경 변수를 삭제하거나 `false`를 `DD_IAST_ENABLED=false`로 설정하고 서비스를 다시 시작합니다.

## 더 많은 지원이 필요하세요?

ASM에 계속 문제가 있는 경우 다음 정보와 함께 [Datadog 지원 팀][1]으로 문의하세요.

- [테스트 공격](#send-a-test-attack-to-your-application)이 성공적으로 전송되었음을 확인
- 트레이서 [시작][8] 또는 [디버그][10] 로그

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/help/
[2]: https://app.datadoghq.com/security/appsec/
[3]: https://app.datadoghq.com/security/appsec?instructions=all
[4]: /ko/tracing/troubleshooting/
[5]: /ko/tracing/troubleshooting/#confirm-apm-setup-and-agent-status
[6]: /ko/tracing/troubleshooting/connection_errors/
[7]: /ko/security/default_rules/security-scan-detected/
[8]: /ko/tracing/troubleshooting/tracer_startup_logs/
[9]: /ko/tracing/glossary/#spans
[10]: /ko/tracing/troubleshooting/#tracer-debug-logs
[12]: https://app.datadoghq.com/security/appsec/vm
[13]: /ko/security/code_security/iast/
[14]: /ko/security/code_security/software_composition_analysis
[15]: https://app.datadoghq.com/security/configuration/asm/services-config
[16]: https://app.datadoghq.com/organization-settings/remote-config
[17]: https://ddtrace.readthedocs.io/en/stable/integrations.html#flask