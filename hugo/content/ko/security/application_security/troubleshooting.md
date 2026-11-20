---
aliases:
- /ko/security_platform/application_security/troubleshooting
further_reading:
- link: /security/application_security/
  tag: 설명서
  text: Datadog App and API Protection으로 위협 모니터링
- link: /security/application_security/how-it-works/
  tag: 설명서
  text: Datadog에서 App and API Protection이 작동하는 방식
title: App and API Protection 문제 해결
---
## 개요 {#overview}

Datadog App and API Protection(AAP)에서 예상치 못한 동작이 발생하면 다음과 같은 일반적인 문제를 조사할 수 있습니다. 문제가 계속되면 [Datadog 지원팀][1]에 문의하여 추가 지원을 받으세요.

## AAP 속도 제한 {#aap-rate-limits}

AAP 트레이스는 초당 100개의 트레이스로 제한됩니다. 제한을 초과하여 전송된 트레이스는 보고되지 않습니다. 제한을 변경해야 하는 경우 [Datadog 지원팀][1]에 문의하세요.

## AAP에서 보안 트레이스가 탐지되지 않음 {#no-security-traces-detected-by-aap}

위협 정보가 AAP [트레이스 및 신호 탐색기][2]에 나타나려면 일련의 단계가 성공적으로 수행되어야 합니다. 이 문제를 조사할 때 각 단계를 확인하는 것이 중요합니다. 언어별 추가 문제 해결 단계는 문서 마지막의 언어 탭에서 확인할 수 있습니다.

### AAP 활성화 여부 확인 {#confirm-aap-is-enabled}

메트릭 `datadog.apm.appsec_host`를 사용하여 AAP가 실행 중인지 확인할 수 있습니다.

1. Datadog에서 **Metrics > Summary**로 이동합니다.
2. 메트릭 `datadog.apm.appsec_host`를 검색합니다. 메트릭이 존재하지 않으면 AAP를 실행 중인 서비스가 없는 것입니다. 메트릭이 존재하면 서비스가 메트릭 태그 `host` 및 `service`로 보고됩니다.
3. 메트릭을 선택하고, **Tags** 섹션에서 `service`를 검색하여 어떤 서비스가 AAP를 실행 중인지 확인합니다.

`datadog.apm.appsec_host`가 표시되지 않는 경우 [앱 내 지침][3]을 확인하여 초기 설정의 모든 단계가 완료되었는지 확인합니다.

AAP 데이터는 APM 트레이스로 전송됩니다. [APM 문제 해결][4]을 참조하여 [APM 설정을 확인][5]하고 [연결 오류][6]를 검사합니다.

### 애플리케이션에 테스트 공격 전송 {#send-a-test-attack-to-your-application}

 AAP 설정을 테스트하려면 다음 curl 스크립트가 포함된 파일을 실행하여 [보안 스캐너 탐지][7] 규칙을 트리거합니다.

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

**참고:** `dd-test-scanner-log` 값은 가장 최근 릴리스에서 지원됩니다.

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

**참고:** `dd-test-scanner-log` 값은 가장 최근 릴리스에서 지원됩니다.

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

**참고:** `dd-test-scanner-log` 값은 가장 최근 릴리스에서 지원됩니다.

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
**참고:** `dd-test-scanner-log` 값은 가장 최근 릴리스에서 지원됩니다.

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

{{< img src="/security/security_monitoring/explorer/signal_panel_v2.png" alt="위협 관련 태그, 메트릭, 권장 후속 단계 및 공격자 IP 주소가 표시된 Security Signal 세부 정보 페이지" style="width:100%;" >}}

### 필수 트레이서 통합의 비활성화 여부 확인 {#check-if-required-tracer-integrations-are-deactivated}

AAP는 특정 트레이서 통합에 의존합니다. 이러한 통합이 비활성화되면 AAP가 작동하지 않습니다. 비활성화된 통합이 있는지 확인하려면 [시작 로그][8]에서 `disabled_integrations`를 찾습니다.

필요한 통합은 언어에 따라 다릅니다.

{{< programming-lang-wrapper langs="java,.NET,go,ruby,PHP,Node.js,python" >}}
{{< programming-lang lang="java" >}}

Java의 경우, 다음 기술 중 하나를 사용한다면 다음과 같은 각 통합이 필요합니다.

- grizzly
- grizzly-filterchain
- jersey
- jetty
- ratpack
- ratpack-request-body(ratpack도 필요함)
- resteasy
- servlet
- servlet-2
- servlet-3
- servlet-request-body(servlet도 필요함)
- spring-web
- tomcat


{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

.NET의 경우 ASP.NET 통합이 필요합니다.

**참고:** ASP.NET Core를 비활성화한 경우에도 AAP는 이 프레임워크에서 계속 작동해야 합니다.


{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

PHP의 경우 본 통합이 필요하지 않습니다.
<p></p>


{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

다음 Go 프레임워크는 기본 제공 APM 통합을 사용하여 계측해야 합니다.

{{% tracing-go-v2 %}}

- [gRPC][8] ([v1][2])
- [net/http][9] ([v1][3])
- [Gorilla Mux][10] ([v1][4])
- [Echo][11] ([v1][5])
- [Chi][12] ([v1][6])

Go 트레이서의 버전(v1.x 또는 v2.x)에 해당하는 문서를 참조하세요. 프레임워크가 지원되지 않는 경우, Go 리포지토리에서 [새 이슈를 생성합니다][7].

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
[13]: /ko/tracing/trace_collection/custom_instrumentation/go/migration

{{< /programming-lang >}}
{{< programming-lang lang="Node.js" >}}

Node.js의 경우 HTTP 통합이 필요합니다.
<p></p>


{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Ruby의 경우 [Rack][2] 통합이 필요합니다. Ruby 트레이서 버전 `1.0.0` 이상도 필요합니다. [0.x에서 1.x로 마이그레이션하는 방법][3]을 참조하세요.

**참고:** Rack은 수동으로 추가하거나 [Rails][4] 또는 [Sinatra][5] 통합을 통해 자동으로 추가할 수 있습니다. 수동으로 추가하는 경우, 트레이서 미들웨어는 Rack 스택의 보안 미들웨어보다 앞에 위치해야 합니다.

[2]: /ko/tracing/trace_collection/dd_libraries/ruby/#rack
[3]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/UpgradeGuide.md#from-0x-to-10
[4]: /ko/tracing/trace_collection/dd_libraries/ruby/#rails
[5]: /ko/tracing/trace_collection/dd_libraries/ruby/#sinatra
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

Python의 경우 WSGI 통합과 함께 사용 중인
프레임워크에 해당하는 통합(예: Django 또는 Flask 통합)이 필요합니다.
<p></p>

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Datadog Agent 구성 확인 {#check-datadog-agent-configuration}

 프로세스의 해당 단계 문제를 해결하려면 다음 작업을 수행합니다.

- `http://<agent-machine-name>:<agent-port>/info` 주소(일반적으로 `http://localhost:8126/info`)에서 실행 중인 Agent의 세부 정보를 확인합니다.
- [트레이서 로그][10]에 스팬과 관련된 Agent 전송 오류가 없는지 확인합니다.
- Agent가 별도의 머신에 설치된 경우, `DD_AGENT_HOST` 및 필요시 `DD_TRACE_AGENT_PORT`가 설정되어 있거나, 애플리케이션 SDK에 대해 `DD_TRACE_AGENT_URL`이 설정되어 있는지 확인합니다.

### 스팬의 Datadog 전송 성공 여부 확인 {#check-if-spans-are-successfully-transmitted-to-datadog}

AAP 데이터는 [스팬][9]을 통해 전송됩니다. 스팬이 Datadog으로 성공적으로 전송되는지 확인하려면 트레이서 로그에 다음과 유사한 항목이 있는지 확인합니다.

```
2021-11-29 21:19:58 CET | TRACE | INFO | (pkg/trace/info/stats.go:111 in LogStats) | [lang:.NET lang_version:5.0.10 interpreter:.NET tracer_version:1.30.1.0 endpoint_version:v0.4] -> traces received: 2, traces filtered: 0, traces amount: 1230 bytes, events extracted: 0, events sampled: 0
```

스팬(span)이 전송되지 않는 경우 트레이서 로그에는 다음과 유사한 로그가 포함됩니다.

```
2021-11-29 21:18:48 CET | TRACE | INFO | (pkg/trace/info/stats.go:104 in LogStats) | No data received
```

## 언어별 문제 해결 {#troubleshooting-by-language}

다음은 특정 언어별 추가 트러블슈팅 단계입니다.

{{< programming-lang-wrapper langs="java,.NET,go,ruby,PHP,Node.js,python" >}}
{{< programming-lang lang="java" >}}
Java 라이브러리는 로깅을 위해 [SLF4J][1]를 사용합니다. SDK가 파일에 로그를 기록하도록 다음 런타임 플래그를 추가합니다.

```java
 -Ddatadog.slf4j.simpleLogger.defaultLogLevel=info
 -Ddatadog.slf4j.simpleLogger.logFile=dd.log
```

서비스가 시작된 후 SDK는 지정된 파일에 로그를 기록합니다. `DEBUG` 로그는 출력 내용이 많으므로 Datadog은 로그 레벨을 `INFO`로 설정할 것을 권장합니다.

[1]: https://www.slf4j.org/
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

.NET 라이브러리는 파일에 로그를 기록하며 `stdout`/`stderr`에 로그를 기록할 수 없습니다. 기본 로그 레벨은 `INFO`입니다. `DEBUG` 로그를 사용하도록 설정하려면 `DD_TRACE_DEBUG=true`를 설정합니다.

로그 파일은 다음 디렉터리에서 사용할 수 있습니다.

| 플랫폼 	 | 로그 디렉터리 	|
|------------|----------------|
| Docker 	   | 컨테이너의 디렉터리 `/var/log/datadog/dotnet/` 권장 옵션은 [볼륨][1]을 사용하여 호스트 머신에 로그 폴더를 마운트하는 것입니다. |
| Linux	     | /var/log/datadog/dotnet/	                                  |
| Windows 	 | C:\ProgramData\Datadog .NET Tracer\logs                    |

[1]: https://docs.docker.com/storage/volumes/
{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

PHP의 경우 Datadog AAP 확장 프로그램의 문제를 해결하려면 확장 프로그램의 `.ini` 파일에서 디버그 로그를 활성화합니다.

확장 프로그램의 `ini` 파일은 일반적으로 `/etc/php/<version>/xxx/conf.d/98-ddtrace.ini`에 있지만, 설치 환경에 따라 위치가 다를 수 있습니다. `phpinfo()` 출력의 시작 부분을 확인하여 `.ini` 파일을 스캔하는 디렉터리가 있는지 확인합니다. `.ini` 파일에서 다음 구성 옵션을 설정합니다.

```php
datadog.appsec.log_level='debug'
datadog.appsec.helper_extra_args='--log_level=debug'
datadog.appsec.helper_log_file='/tmp/helper.log'
```

확장 프로그램은 기본 `php_error` 로그 파일로 로그를 출력합니다. 파일에 로그가 없으면 `.ini` 파일에 다음을 추가합니다.

```php
datadog.appsec.log_file='tmp/extension.log'
```

### 설치 시 PHP를 찾지 못함 {#installation-fails-to-find-php}
설치 스크립트에서 올바른 PHP 버전을 찾을 수 없는 경우 `--php-bin`을 PHP 바이너리 위치로 설정할 수 있습니다. 예시:

```
$ php datadog-setup.php --php-bin /usr/bin/php7.4 --enable-appsec
```
### 도우미 연결 실패 {#connection-to-helper-failed}
AAP 확장 프로그램이 도우미 프로세스와 통신할 수 없는 경우 다음 경고 메시지가 표시됩니다.

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

이는 확장 프로그램이 사용하는 잠금 파일 또는 소켓 파일의 권한이 올바르지 않거나, PHP 프로세스를 실행하는 사용자에게 `tmp` 디렉터리에 대한 쓰기 권한이 없음을 나타냅니다.

잠금 파일이나 소켓 파일의 권한이 올바르지 않은 경우, 해당 파일을 삭제하고 Apache/FPM을 다시 시작하거나 `user:group`을 Apache/FPM에서 사용하는 권한과 일치하도록 조정할 수 있습니다(예: `www-data`).

사용자가 tmp 디렉터리 쓰기 권한이 없는 경우 확장 프로그램의 `.ini` 파일에서 다음 설정을 수정하여 잠금 파일 및 소켓 파일의 위치를 변경할 수 있습니다.

```
datadog.appsec.helper_runtime_path = /<directory with compatible permissions>/
```

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

#### 실행 중인 애플리케이션의 AAP 활성화 여부 확인 {#confirm-aap-is-enabled-in-the-running-application}

[트레이서 시작 로그][1]는 SDK 구성과 AAP 활성화 여부를 보여줍니다. `appsec`이 `true`이면 AAP가 활성화되어 실행 중인 것입니다.

예를 들어, 다음 시작 로그는 AAP가 비활성화되었음을 나타냅니다.

```
2022/02/17 14:49:00 Datadog Tracer v1.36.0 INFO: DATADOG TRACER CONFIGURATION {"date":"2022-02-17T14:49:00+01:00","os_name":"Linux (Unknown Distribution)","os_version":"5.13.0","version":"v1.36.0","lang":"Go","lang_version":"go1.17.1","env":"prod","service":"grpcserver","agent_url":"http://localhost:8126/v0.4/traces","debug":false,"analytics_enabled":false,"sample_rate":"NaN","sampling_rules":null,"sampling_rules_error":"","service_mappings":null,"tags":{"runtime-id":"69d99219-b68f-4718-9419-fa173a79351e"},"runtime_metrics_enabled":false,"health_metrics_enabled":false,"profiler_code_hotspots_enabled":false,"profiler_endpoints_enabled":false,"dd_version":"","architecture":"amd64","global_service":"","lambda_mode":"false","appsec":false,"agent_features":{"DropP0s":false,"Stats":false,"StatsdPort":0}}
```

#### 디버그 로그 활성화 {#enable-debug-logs}

환경 변수 `DD_TRACE_DEBUG=1`을 사용하여 디버그 로그를 활성화합니다. AAP 라이브러리는 표준 오류 출력으로 로그를 기록합니다.

**참고:** AAP는 활성화된 경우에만 로그를 출력합니다. 환경 변수 `DD_APPSEC_ENABLED=1`을 사용하여 AAP를 활성화합니다.

[1]: /ko/tracing/troubleshooting/tracer_startup_logs/
{{< /programming-lang >}}
{{< programming-lang lang="Node.js" >}}

Node.js 라이브러리를 1.x에서 2.x로 업그레이드한 경우 본 [마이그레이션 지침][1]을 참조하여 변경 사항을 평가합니다.

Node.js 애플리케이션의 [트레이스 및 신호 탐색기][2]에 AAP 위협 정보가 표시되지 않는 경우 다음 단계에 따라 문제를 해결합니다.

1. [시작 로그][3]에서 `appsec_enabled`가 `true`인지 확인하여 최신 버전의 AAP가 실행 중인지 확인합니다.
   1. 요청이 전송된 후에도 시작 로그가 표시되지 않으면 환경 변수 `DD_TRACE_STARTUP_LOGS=true`를 추가하여 시작 로그를 활성화합니다. 시작 로그에서 `appsec_enabled`가 `true`인지 확인합니다.
   1. `appsec_enabled`가 `false`인 경우 AAP가 올바르게 활성화되지 않은 것입니다. [설치 설명서][4]를 참조하세요.
   1. `appsec_enabled`가 시작 로그에 없으면 최신 AAP 버전을 설치해야 합니다. [설치 설명서][4]를 참조하세요.
2. APM 대시보드에서 관련 트레이스를 찾아 SDK가 작동 중인지 확인합니다.<br />
    AAP는 SDK에 의존하므로 트레이스가 보이지 않는다면 SDK가 작동하지 않는 것일 수 있습니다. [APM 문제 해결][5]을 참조하세요.
3. 애플리케이션 디렉터리에서 `npm explore @datadog/native-appsec -- npm run install` 명령을 실행하고 앱을 다시 시작합니다.
   1. `@datadog/native-appsec`이 발견되지 않으면 설치가 올바르게 이루어지지 않았습니다.
   1. 애플리케이션 시작 시 `@datadog/native-appsec`이 확인되면 런타임 시작 스크립트에 명령을 추가합니다.
   1. 그래도 SDK가 작동하지 않으면 지원되지 않는 런타임을 실행하는 것일 수도 있습니다.
4. 로그를 활성화하려면 다음 환경 변수를 추가합니다.
    ```
    DD_TRACE_DEBUG=1
    DD_TRACE_LOG_LEVEL=info
    ```

[1]: https://github.com/DataDog/dd-trace-js/blob/master/MIGRATING.md
[2]: https://app.datadoghq.com/security/appsec/
[3]: /ko/tracing/troubleshooting/tracer_startup_logs/
[4]: /ko/security/application_security/setup/nodejs/
[5]: /ko/tracing/troubleshooting/
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

파이썬(Python) 애플리케이션의 [트레이스 및 신호 탐색기][1]에 AAP 위협 정보가 표시되지 않는 경우, AAP가 실행 중이고 트레이서가 작동 중인지 확인하세요.

1. AAP 실행 여부를 확인하려면 애플리케이션의 로그 레벨을 `DEBUG`로 설정합니다.

   ```python
   import logging
   logging.basicConfig(level=logging.DEBUG)
   ```
  
   그런 다음, 애플리케이션에 임의의 HTTP 요청을 보냅니다. 다음과 같은 로그가 표시되어야 합니다.
  
   ```
   DEBUG:ddtrace.appsec.processor:[DDAS-001-00] Executing AppSec In-App WAF with parameters:
   ```
  
   이 로그가 없다면 AAP가 실행되지 않는 것입니다.

2. SDK가 작동 중인가요? APM 대시보드에서 관련 트레이스를 볼 수 있나요?

   AAP는 SDK에 의존합니다. 트레이스가 보이지 않는다면 SDK가 작동하지 않는 것일 수 있습니다. [APM 문제 해결][2]을 참조하세요.


[1]: https://app.datadoghq.com/security/appsec/
[2]: /ko/tracing/troubleshooting/
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

루비(Ruby)의 경우 몇 분이 지난 후에도 [트레이스 및 신호 탐색기][1]에 AAP 위협 정보가 표시되지 않으면 [디버그 로그][2] 트레이서 진단을 사용 설정합니다. 예시는 다음과 같습니다.

```ruby
Datadog.configure do |c|
  c.diagnostics.debug = true  # increase general log level to debug
  c.appsec.waf_debug = true   # also enable WAF-specific log verbosity to highest level
end
```

디버그 로그는 상세하지만 유용합니다. [Datadog 지원][1]으로 티켓을 여는 경우 요청과 함께 해당 로그를 전달해 주세요.

#### AAP가 올바르게 활성화되어 있나요? {#is-aap-correctly-enabled}

다음과 같은 로그가 표시되면 AAP가 올바르게 활성화된 것입니다.

```
D, [2021-12-14T11:03:32.167125 #73127] DEBUG -- ddtrace: [ddtrace] (libddwaf/lib/datadog/appsec/waf.rb:296:in `block in logger=') {:level=>:ddwaf_log_info, :func=> "ddwaf_set_log_cb", :file=>"PowerWAFInterface.cpp", :message=>"Sending log messages to binding, min level trace"}
D, [2021-12-14T11:03:32.200491 #73127] DEBUG -- ddtrace: [ddtrace] (libddwaf/lib/datadog/appsec/waf.rb:296:in `block in logger=') {:level=>:ddwaf_log_debug, :func= >"parse", :file=>"parser_v2.cpp", :message=>"Loaded 124 rules out of 124 available in the ruleset"}
```

로그가 표시되지 않는 경우 다음을 점검하세요.

- 애플리케이션 프로세스에 올바른 AAP 환경 변수가 설정되어 있습니다.
- 최신 Gem 버전을 설치했습니다.
- SDK가 올바르게 설정되어 APM 대시보드로 APM 트레이스를 전송합니다.

#### 각 HTTP 요청에 대해 AAP가 호출되나요? {#is-aap-called-for-each-http-request}

각 HTTP 요청에 대해 AAP가 호출되는지 확인하려면 [테스트 공격](#send-a-test-attack-to-your-application)을 트리거하고 다음 로그를 찾아봅니다.

```
D, [2022-01-19T21:25:50.579745 #341792] DEBUG -- ddtrace: [ddtrace] (/home/lloeki/src/github.com/DataDog/dd-trace-rb/lib/datadog/appsec/reactive/operation.rb:14:in `initialize') operation: rack.request initialize
D, [2022-01-19T21:25:50.580300 #341792] DEBUG -- ddtrace: [ddtrace] (/home/lloeki/src/github.com/DataDog/dd-trace-rb/lib/datadog/appsec/contrib/rack/gateway/watcher.rb:25:in `block (2 levels) in watch') root span: 964736568335365930
D, [2022-01-19T21:25:50.580371 #341792] DEBUG -- ddtrace: [ddtrace] (/home/lloeki/src/github.com/DataDog/dd-trace-rb/lib/datadog/appsec/contrib/rack/gateway/watcher.rb:26:in `block (2 levels) in watch') active span: 964736568335365930
D, [2022-01-19T21:25:50.581061 #341792] DEBUG -- ddtrace: [ddtrace] (/home/lloeki/src/github.com/DataDog/dd-trace-rb/lib/datadog/appsec/contrib/rack/reactive/request.rb:34:in `block in subscribe') reacted to ["request.headers", "request.uri.raw", "request.query", "request.cookies", "request.body.raw"]: [{"version"=>"HTTP/1.1", "host"=>"127.0.0.1:9292", "accept"=>"*/*", "user-agent"=>"Nessus SOAP"}, "http://127.0.0.1:9292/", [], {}, ""]
```

로그가 표시되지 않는 경우 다음 작업을 시도해 보세요.

- 다른 업스트림 보안 시스템이 테스트 헤더 값에 기반하여 요청을 필터링하지 않아서 해당 요청이 애플리케이션에 도달하지 않는지 점검합니다.
- curl 명령에서 다른 사용자 에이전트 값을 사용하여 [테스트 공격](#send-a-test-attack-to-your-application)을 다시 전송하고 위협 정보가 성공적으로 전송되는지 확인합니다.
- 실행한 정확한 요청에 대한 애플리케이션 로그를 살펴보고, 해당 요청이 애플리케이션에 도달했고 다른 업스트림 시스템에서 응답하지 않았는지 확인합니다.

Rack 통합을 수동으로 설정한 경우, 알려진 문제로 인해 AAP가 작동하지 않는 경우가 종종 있습니다. 예시는 다음과 같습니다.

```ruby
Datadog.configure do |c|
  c.tracing.instrument :rails
  ...
  c.tracing.instrument :rack, web_service_name: "something", request_queuing: true
```

`c.tracing.instrument :rack`이 있으면 이를 제거한 후 검사를 통과하는지 확인합니다.

#### AAP가 HTTP 요청 보안 위협을 탐지하고 있나요? {#is-aap-detecting-http-request-security-threats}

AAP가 보안 위협을 탐지하는지 확인하려면 [테스트 공격](#send-a-test-attack-to-your-application)을 트리거하고 다음 로그를 찾아봅니다.

```
D, [2021-12-14T22:39:53.268820 #106051] DEBUG -- ddtrace: [ddtrace] (ddtrace/lib/datadog/appsec/contrib/rack/reactive/request.rb:63:in `block in subscribe') WAF: #<struct Datadog::AppSec::WAF::Result action=:monitor, data=[{"rule"=>{"id"=>"ua0-600-10x", "name"=>"Nessus", "tags"=>{"type"=>"security_scanner", "category"=>"attack_attempt"}}, "rule_matches"=>[{"operator"=>"match_regex", "operator_value"=>"(?i)^Nessus(/|([ :]+SOAP))", "parameters"=>[{"address"=>"server.request.headers.no_cookies", "key_path"=>["user-agent"], "value"=>"Nessus SOAP", "highlight"=>["Nessus SOAP"]}]}]}], perf_data=nil, perf_total_runtime=20519>
```
로그가 표시되지 않는다면 다른 업스트림 보안 시스템이 요청을 필터링하지 않거나, 테스트 헤더 값을 기반으로 요청을 변경하고 있는지 확인합니다.

#### SDK가 보안 데이터와 함께 트레이스를 전송하고 있나요? {#is-the-sdk-sending-traces-with-security-data}
AAP 데이터는 APM 트레이스로 전송됩니다. AAP가 보안 데이터를 올바르게 탐지하고 트레이스에 삽입하는지 확인하려면 [테스트 공격](#send-a-test-attack-to-your-application)을 트리거하고 다음 트레이서 로그를 찾아봅니다.

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

Agent가 트레이스를 전달하도록 1분 정도 기다린 후 APM 대시보드에 트레이스가 표시되는지 확인합니다. 트레이스의 보안 정보가 Datadog에서 처리되어 AAP [트레이스 및 신호 탐색기][1]에 보안 트레이스로 표시되기까지 추가 시간이 소요될 수 있습니다.

[1]: https://app.datadoghq.com/security/appsec/
[2]: /ko/tracing/troubleshooting/#tracer-debug-logs
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### 트레이서 버전 업데이트 여부 확인 {#confirm-tracer-versions-are-updated}

App and API Protection 제품 설정 설명서를 참조하여 적절한 SDK 버전을 사용하고 있는지 검증합니다. 라이브러리 정보가 포함된 텔레메트리 데이터 전송을 시작하려면 다음 최소 버전이 필요합니다.

### 텔레메트리 데이터 전송 여부 확인 {#ensure-the-communication-of-telemetry-data}

`DD_INSTRUMENTATION_TELEMETRY_ENABLED` 환경 변수(Node.js의 경우 `DD_TRACE_TELEMETRY_ENABLED`)가 `true`로 설정되어 있거나 해당 언어의 시스템 속성이 활성화되어 있는지 확인합니다. 예를 들어, Java에서는 다음과 같습니다. `-Ddd.instrumentation.telemetry.enabled=true`

## AAP 비활성화 {#disabling-aap}

AAP를 비활성화하려면 다음 방법 중 하나를 사용합니다.

`DD_APPSEC_ENABLED=true` 환경 변수를 사용하여 AAP를 활성화한 경우 아래의 DD_APPSEC_ENABLED 섹션을 참조하세요.
[Remote Configuration][16]을 사용하여 AAP를 활성화한 경우 아래의 Remote Configuration 방법을 사용합니다.

### DD_APPSEC_ENABLED {#dd-appsec-enabled}

서비스에 `DD_APPSEC_ENABLED=true` 환경 변수가 설정되어 있는 경우, 애플리케이션 구성에서 `DD_APPSEC_ENABLED=true` 환경 변수를 제거하고 서비스를 다시 시작합니다.

서비스가 PHP 기반인 경우 환경 변수를 `DD_APPSEC_ENABLED=false`로 명시적으로 설정하고, 해당하는 경우 `php.ini` 구성 파일에서 `datadog.appsec.enabled = On` 플래그를 주석 처리합니다. 그런 다음 서비스를 다시 시작합니다. 

### Remote Configuration {#remote-configuration}

[Remote Configuration][16]을 사용하여 AAP를 활성화한 경우 다음 단계를 따르세요. 
  1. [{{< ui >}}Services{{< /ui >}}][15]로 이동합니다.
  2. {{< ui >}}App & API Protection in Monitoring Mode{{< /ui >}}를 선택합니다.
  3. {{< ui >}}App & API Protection{{< /ui >}} 패싯에서 {{< ui >}}Monitoring Only{{< /ui >}}, {{< ui >}}No data{{< /ui >}}, {{< ui >}}Ready to block{{< /ui >}}을 활성화합니다.
  4. 서비스를 클릭합니다.
  5. 서비스 세부 정보의 {{< ui >}}App & API Protection{{< /ui >}}에서 {{< ui >}}Deactivate{{< /ui >}}를 클릭합니다.

<div class="alert alert-info">AAP가 <a href="https://app.datadoghq.com/organization-settings/remote-config">Remote Configuration</a>을 사용하여 활성화된 경우 <strong>Deactivate</strong> 버튼을 사용할 수 있습니다. AAP가 로컬 구성으로 활성화된 경우 <strong>Deactivate</strong> 버튼을 사용할 수 없습니다.</div>

### 일괄 비활성화 {#bulk-disable}

여러 서비스에서 AAP를 일괄 비활성화하려면 다음 단계를 따르세요. 
  1. [{{< ui >}}Services{{< /ui >}}][15]로 이동합니다.
  3. {{< ui >}}App & API Protection{{< /ui >}} 패싯에서 {{< ui >}}Monitoring Only{{< /ui >}}, {{< ui >}}No data{{< /ui >}}, {{< ui >}}Ready to block{{< /ui >}}을 활성화합니다.
  3. 위협 탐지를 비활성화할 서비스의 확인란을 선택합니다.
  4. {{< ui >}}Bulk Actions{{< /ui >}}에서 {{< ui >}}Deactivate Threat detection on (number of) services{{< /ui >}}를 선택합니다.

  
## 도움이 더 필요하세요? {#need-more-help}

AAP에 계속 문제가 있는 경우 다음 정보와 함께 [Datadog 지원팀][1]으로 문의하세요.

- [테스트 공격](#send-a-test-attack-to-your-application)이 성공적으로 전송되었음을 확인할 수 있는 정보
- 트레이서 [시작][8] 또는 [디버그][10] 로그

## 추가 자료 {#further-reading}

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