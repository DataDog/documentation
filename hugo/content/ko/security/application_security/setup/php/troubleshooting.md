---
further_reading:
- link: /security/application_security/how-it-works/
  tag: 문서
  text: App and API Protection의 작동 방식
- link: /security/default_rules/?category=cat-application-security
  tag: 문서
  text: OOTB App and API Protection 규칙
- link: /security/application_security/troubleshooting
  tag: 문서
  text: App and API Protection 문제 해결하기
title: PHP App and API Protection 문제 해결
---
## 개요 {#overview}

이 문서는 Datadog App and API Protection의 일반적인 문제 및 예기치 않은 동작에 대한 진단 정보를 제공합니다. 문제가 계속되면 [Datadog 지원팀][1]에 문의하여 추가 지원을 받으세요.

## AAP 속도 제한 {#aap-rate-limits}

AAP 트레이스는 초당 100개의 트레이스로 제한됩니다. 제한을 초과하여 전송된 트레이스는 보고되지 않습니다. 제한을 변경해야 하는 경우 [Datadog 지원팀][1]에 문의하세요.

## AAP에서 보안 트레이스가 탐지되지 않음 {#no-security-traces-detected-by-aap}

위협 정보가 AAP [트레이스 및 신호 탐색기][2]에 나타나려면 일련의 단계가 성공적으로 수행되어야 합니다. 이 문제를 조사할 때 각 단계를 확인하는 것이 중요합니다.

### AAP 활성화 여부 확인 {#confirm-aap-is-enabled}

메트릭 `datadog.apm.appsec_host`를 사용하여 AAP가 실행 중인지 확인할 수 있습니다.

1. Datadog에서 **Metrics > Summary**로 이동합니다.
2. 메트릭 `datadog.apm.appsec_host`를 검색합니다. 메트릭이 존재하지 않으면 AAP를 실행 중인 서비스가 없는 것입니다. 메트릭이 존재하면 서비스가 메트릭 태그 `host` 및 `service`로 보고됩니다.
3. 메트릭을 선택하고, **Tags** 섹션에서 `service`를 검색하여 어떤 서비스가 AAP를 실행 중인지 확인합니다.

`datadog.apm.appsec_host`가 표시되지 않는 경우 [앱 내 지침][3]을 확인하여 초기 설정의 모든 단계가 완료되었는지 확인합니다.

AAP 데이터는 APM 트레이스로 전송됩니다. [APM 문제 해결][4]을 참조하여 [APM 설정을 확인][5]하고 [연결 오류][6]를 검사합니다.

### 애플리케이션에 테스트 공격 전송 {#send-a-test-attack-to-your-application}

 AAP 설정을 테스트하려면 다음 curl 스크립트가 포함된 파일을 실행하여 [보안 스캐너 탐지][7] 규칙을 트리거합니다.

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

애플리케이션을 활성화하고 성공적으로 실행한 몇 분 후, 위협 정보가 [트레이스 및 신호 탐색기][2]에 표시됩니다.

{{< img src="/security/security_monitoring/explorer/signal_panel_v2.png" alt="위협 관련 태그, 메트릭, 권장 후속 단계 및 공격자 IP 주소가 표시된 Security Signal 세부 정보 페이지" style="width:100%;" >}}

### 필수 트레이서 통합의 비활성화 여부 확인 {#check-if-required-tracer-integrations-are-deactivated}

AAP는 특정 트레이서 통합에 의존합니다. 이러한 통합이 비활성화되면 AAP가 작동하지 않습니다. 비활성화된 통합이 있는지 확인하려면 [시작 로그][8]에서 `disabled_integrations`를 찾습니다.

필요한 통합은 언어에 따라 다릅니다.

PHP의 경우 본 통합이 필요하지 않습니다.

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

다음은 PHP에 대한 추가 문제 해결 단계입니다.

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

### 트레이서 버전 업데이트 여부 확인 {#confirm-tracer-versions-are-updated}

App and API Protection 설정 문서를 참조하여 올바른 트레이서 버전을 사용하고 있는지 확인합니다. 라이브러리 정보가 포함된 텔레메트리 데이터 전송을 시작하려면 다음 최소 버전이 필요합니다.

### 텔레메트리 데이터 전송 여부 확인 {#ensure-the-communication-of-telemetry-data}

`DD_INSTRUMENTATION_TELEMETRY_ENABLED` 환경 변수(Node.js의 경우 `DD_TRACE_TELEMETRY_ENABLED`)가 `true`로 설정되어 있거나 해당 언어의 시스템 속성이 활성화되어 있는지 확인합니다. 예를 들어, Java에서는 다음과 같습니다. `-Ddd.instrumentation.telemetry.enabled=true`

## AAP 비활성화 {#disabling-aap}

AAP를 비활성화하려면 다음 방법 중 하나를 사용합니다.

### DD_APPSEC_ENABLED {#dd-appsec-enabled}

서비스에 `DD_APPSEC_ENABLED=true` 환경 변수가 설정되어 있는 경우, 애플리케이션 구성에서 `DD_APPSEC_ENABLED=true` 환경 변수를 제거하고 서비스를 다시 시작합니다.

서비스가 PHP 기반인 경우 환경 변수를 `DD_APPSEC_ENABLED=false`로 명시적으로 설정하고, 해당하는 경우 `php.ini` 구성 파일에서 `datadog.appsec.enabled = On` 플래그를 주석 처리합니다. 그런 다음 서비스를 다시 시작합니다. 

### Remote Configuration {#remote-configuration}

[Remote Configuration][16]을 사용하여 AAP를 활성화한 경우 다음 단계를 따르세요. 
  1. [{{< ui >}}Services{{< /ui >}}][15]로 이동합니다.
  2. {{< ui >}}App & API Protection in Monitoring Mode{{< /ui >}}를 선택합니다.
  3. {{< ui >}}App & API Protection{{< /ui >}} 패싯에서 {{< ui >}}Monitoring Only{{< /ui >}}, {{< ui >}}No data{{< /ui >}}, {{< ui >}}Ready to block{{< /ui >}}을 활성화합니다.
  4. 서비스를 클릭합니다.
  5. {{< ui >}}Capabilities{{< /ui >}} > {{< ui >}}App & API Protection{{< /ui >}} > {{< ui >}}Threat Detection{{< /ui >}}에서 {{< ui >}}Deactivate{{< /ui >}}를 클릭합니다.

<div class="alert alert-info">AAP가 <a href="https://app.datadoghq.com/organization-settings/remote-config">Remote Configuration</a>을 사용하여 활성화된 경우 <strong>Deactivate</strong> 버튼을 사용할 수 있습니다. AAP가 로컬 구성으로 활성화된 경우 <strong>Deactivate</strong> 버튼을 사용할 수 없습니다.</div>

### 일괄 비활성화 {#bulk-disable}

여러 서비스에서 AAP를 일괄 비활성화하려면 다음 단계를 따르세요. 
  1. [{{< ui >}}Services{{< /ui >}}][15]로 이동합니다.
  2. {{< ui >}}App & API Protection{{< /ui >}} 패싯에서 {{< ui >}}Monitoring Only{{< /ui >}}, {{< ui >}}No data{{< /ui >}}, {{< ui >}}Ready to block{{< /ui >}}을 활성화합니다.
  3. 위협 탐지를 비활성화할 서비스의 확인란을 선택합니다.
  4. {{< ui >}}Bulk Actions{{< /ui >}}에서 {{< ui >}}Deactivate threat detection on (number of) services{{< /ui >}}를 선택합니다.



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