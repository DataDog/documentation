---
aliases:
- /ko/synthetics/private_locations/configuration
description: 프라이빗 위치를 구성합니다.
further_reading:
- link: getting_started/synthetics/private_location
  tag: 문서
  text: 프라이빗 위치로 시작하기
- link: synthetics/private_locations/dimensioning
  tag: 문서
  text: 프라이빗 위치 규모 측정
- link: synthetics/platform/private_locations/network_security
  tag: 문서
  text: 프라이빗 위치 네트워크 보안 강화
title: 프라이빗 위치 구성
---
## 개요 {#overview}

<div class="alert alert-warning">새 프라이빗 위치는 기본적으로 예약된 IP 범위를 차단합니다. 이전 구성 파일을 사용하는 프라이빗 위치는 사용자가 구성하지 않는 한 아웃바운드 네트워크 액세스를 제한하지 않습니다. 액세스를 검토하고 제한하려면 <a href="/synthetics/platform/private_locations/network_security">프라이빗 위치 네트워크 보안 강화</a>를 참조하세요.</div>

Synthetic 프라이빗 위치에는 환경 요구 사항에 맞게 구성할 수 있는 일련의 옵션이 제공됩니다. [프라이빗 위치 Worker][1]에 대한 모든 옵션은 `help` 명령을 실행하여 확인할 수 있습니다.

{{< tabs >}}
{{% tab "Docker" %}}

```shell
docker run --rm datadog/synthetics-private-location-worker --help
```
{{% /tab %}}
{{% tab "Windows" %}}

```
synthetics-pl-worker.exe --help
```
{{% /tab %}}
{{% tab "Kubernetes" %}}

[Datadog Helm 리포지토리][1]의 예시를 참조하세요.

[1]: https://github.com/DataDog/helm-charts/tree/main/charts/synthetics-private-location

{{% /tab %}}
{{< /tabs >}}

## 프라이빗 위치 사용자 지정 {#customize-your-private-location}
사용 가능한 파라미터는 아래에 나열되어 있습니다.
프라이빗 위치에 대한 이러한 구성 옵션은 **JSON 구성 파일의 파라미터** 또는 **시작 명령의 인수**로 전달할 수 있습니다. 예를 들면 다음과 같습니다.

{{< tabs >}}
{{% tab "Docker" %}}

```shell
docker run -d --restart always -v $PWD/<MY_WORKER_CONFIG_FILE_NAME>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker:latest --logFormat=json
```
{{% /tab %}}
{{% tab "Windows" %}}

```cmd
synthetics-pl-worker.exe --config=<PathToYourConfiguration> --logFormat=json
```
{{% /tab %}}
{{< /tabs >}}

시작 명령에 설정된 인수가 구성 파일보다 우선합니다. 단, 이러한 옵션은 저장되지 않으므로 지정된 실행에만 관련이 있습니다.

## 주요 구성 옵션 {#top-configuration-options}

### Datadog 사이트 구성 {#datadog-site-configuration}

`site`
: **유형**: 문자열 <br>
**기본값**: `datadoghq.com`<br>
프라이빗 위치가 테스트 구성을 가져오고 테스트 결과를 푸시하는 Datadog 사이트입니다. 사용자의 `site`는 {{< region-param key="dd_site" code="true" >}}입니다.

### DNS 구성 {#dns-configuration}

다음 파라미터를 사용하여 API 테스트에서 DNS 조회를 사용자 지정할 수 있습니다.

`dnsUseHost`
: **유형**: 불리언 <br>
**기본값**: `true`<br>
호스트 로컬 DNS 구성을 먼저 사용하고(예: `etc/resolv.conf` 파일의 구성) 그 다음 `dnsServer` 파라미터에 지정된 DNS 서버를 사용합니다.

`dnsServer`
: **유형**: 문자열 배열 <br>
**기본값**: `["8.8.8.8","1.1.1.1"]`<br>
주어진 순서대로 사용할 DNS 서버 IP입니다(예: `--dnsServer="8.8.4.4" --dnsServer="8.8.8.8"`).

브라우저 테스트에서는 브라우저가 직접 DNS 조회를 수행하며 일반적으로 호스트에서 DNS 서버 정보를 읽습니다. 또는 컨테이너 수준에서 구성할 수도 있습니다(예: [Docker][1]의 `--dns` 플래그 또는 [Kubernetes][2]의 `dnsConfig.nameservers` 사용).

### 프록시 구성 {#proxy-configuration}

다음 파라미터를 사용하여 Datadog에 연결하기 위한 프록시를 구성할 수 있습니다.

`proxyDatadog`
: **유형**: 문자열 <br>
**기본값**: `none`<br>
프라이빗 위치가 Datadog으로 요청을 보내는 데 사용하는 프록시 URL입니다(예: `--proxyDatadog=http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`).

`proxyIgnoreSSLErrors`
: **유형**: 불리언 <br>
**기본값**: `false`<br>
프라이빗 위치가 Datadog으로 요청을 보내기 위해 프록시를 사용할 때 SSL 오류를 무시합니다.

`proxyEnableConnectTunnel`
: **유형**: 불리언 <br>
**기본값**: `none`<br>
HTTP 프록시에 대해 `HTTP CONNECT` 터널링을 활성화합니다. 이 옵션이 설정되지 않은 경우 `HTTP CONNECT` 터널링은 HTTPS 프록시에만 사용됩니다.

**참고:** Squid와 같은 HTTP 포워드 프록시는 프라이빗 위치와 Datadog 간의 초기 TCP 연결을 설정하기 위해 `HTTP CONNECT` 요청이 필요할 수 있습니다. 따라서 `proxyEnableConnectTunnel` 파라미터의 값을 `true`로 설정해야 합니다. 그러나 Datadog으로 `HTTP CONNECT` 요청을 보내는 HAProxy와 같은 리버스 프록시는 이 옵션을 활성화하면 작동하지 않을 수 있습니다.

**참고:** `proxy` 파라미터는 더 이상 사용되지 않으므로 대신 `proxyDatadog`을 사용해야 합니다.

다음 파라미터를 사용하여 Synthetic Monitoring 테스트에 사용할 기본 프록시를 구성할 수 있습니다.

`proxyTestRequests`
: **유형**: 문자열 <br>
**기본값**: `none`<br>
프라이빗 위치가 엔드포인트로 테스트 요청을 보내는 데 사용하는 프록시 URL입니다. 이 URL은 다음 구문을 사용하여 HTTP(S), SOCKS 및 PAC 파일을 지원합니다. `pac+http://...`, `pac+https://...`, `pac+file://...` 또는 `pac+data:...`

`proxyTestRequestsBypassList`
: **유형**: 문자열 배열 <br>
**기본값**: `none`<br>
`proxyTestRequests`로 정의한 프록시를 사용하지 않는 호스트입니다(예: `--proxyTestRequestsBypassList="example.org" --proxyTestRequestsBypassList="*.com"`).

### 고급 구성 {#advanced-configuration}

`concurrency`
: **유형**: 숫자 <br>
**기본값**: `10`<br>
병렬로 실행되는 최대 테스트 수입니다.

`maxNumberMessagesToFetch`
: **유형**: 숫자 <br>
**기본값**: `10`<br>
Datadog에서 가져오는 최대 테스트 수입니다.

`maxAPIDownloadBodySize`
: **유형**: 숫자 <br>
**기본값**: `52428800`<br>
다운로드를 위한 최대 HTTP 본문 크기(바이트 단위)입니다. 기본값은 50MB(50 * 1024 * 1024)입니다.

`maxAPIBodySizeIfProcessed`
: **유형**: 숫자 <br>
**기본값**: `5242880`<br>
어설션을 위한 최대 HTTP 본문 크기(바이트 단위)입니다. 기본값은 5MB(5 * 1024 * 1024)입니다.

`apiRequestMaxTimeout`
: **유형**: 숫자 <br>
**기본값**: `60000`<br>
API 테스트 실행의 최대 지속 시간(밀리초)입니다. 기본값은 1분(60 * 1000)입니다.

**참고**: 프라이빗 위치 컨테이너는 로그를 컨테이너 내부에 저장하지 않고 `stdout` 및 `stderr`에 출력합니다.

### 네트워크 보안 구성 {#network-security-configuration}

프라이빗 위치는 구성에서 송신을 제한하지 않는 한 호스트가 도달할 수 있는 모든 네트워크 주소에 도달할 수 있습니다. 새 프라이빗 위치에 대해 생성된 구성 파일은 `enableDefaultBlockedIpRanges`를 `true`로 설정합니다. Worker의 기본값은 `false`입니다. 다음 옵션을 사용하여 송신을 제한하세요.

`allowedIPRanges`, `blockedIPRanges`, `enableDefaultBlockedIpRanges`, `allowedDomainNames`, `blockedDomainNames`

`enableDefaultBlockedIpRanges`를 `true`로 설정하고 테스트에 필요한 주소만 허용하는 것이 좋습니다. 권장 설정 및 예제는 [프라이빗 위치 네트워크 보안 강화][6]를 참조하세요.

## 모든 구성 옵션 {#all-configuration-options}

`--accessKey`
: **유형**: 문자열 <br>
**기본값**: `none`<br>
Datadog API 인증을 위한 액세스 키입니다.

`--secretAccessKey`
: **유형**: 문자열 <br>
**기본값**: `none`<br>
Datadog API 인증을 위한 시크릿 액세스 키입니다.

`--datadogApiKey`
: **유형**: 문자열 <br>
**기본값**: `none`<br>
브라우저 테스트 아티팩트(예: 스크린샷)를 전송하기 위한 Datadog API 키입니다.

`--privateKey`
: **유형**: 배열 <br>
**기본값**: `none`<br>
테스트 구성을 복호화하는 데 사용되는 프라이빗 키입니다.

`--publicKey`
: **유형**: 배열 <br>
**기본값**: `none`<br>
Datadog이 테스트 결과를 암호화하는 데 사용하는 공개 키입니다. `--publicKey.pem` 요소로 구성됩니다.

`--site`
: **유형**: 문자열 <br>
**기본값**: `datadoghq.com`<br>
프라이빗 위치가 테스트 구성을 가져오고 테스트 결과를 푸시하는 Datadog 사이트입니다. 현재 사이트는 {{< region-param key="dd_site" code="true" >}}입니다.

`--concurrency`
: **유형**: 숫자 <br>
**기본값**: `10`<br>
병렬로 실행되는 최대 테스트 수입니다.

`--maxNumberMessagesToFetch`
: **유형**: 숫자 <br>
**기본값**: `10`<br>
Datadog에서 가져오는 최대 테스트 수입니다.

`--proxyDatadog`
: **유형**: 문자열 <br>
**기본값**: `none`<br>
프라이빗 위치가 Datadog으로 요청을 보내는 데 사용하는 프록시 URL입니다(예: `--proxyDatadog=http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`).

`--dumpConfig`
: **유형**: 불리언 <br>
**기본값**: `none`<br>
시크릿을 제외한 Worker 구성 파라미터를 표시합니다.

`--enableStatusProbes`
: **유형**: 불리언 <br>
프라이빗 위치의 준비 상태 및 활성 상태 프로브를 활성화합니다. 이렇게 하면 두 엔드포인트: `http://127.0.0.1:8080/liveness` 및 `http://127.0.0.1:8080/readiness`가 활성화됩니다.

`--statusProbesPort`
: **유형**: 숫자 <br>
**기본값**: `8080`<br>
프라이빗 위치 상태 프로브의 포트를 재정의합니다.

`--config`
: **유형**: 문자열 <br>
**기본값**: `/etc/datadog/synthetics-check-runner.json`</br>
**Windows**: `C:\ProgramData\Datadog-Synthetics\worker-config.json`</br>
JSON 구성 파일의 경로입니다.

`--proxyTestRequests`
: **유형**: 문자열 <br>
**기본값**: `none`<br>
프라이빗 위치가 엔드포인트로 테스트 요청을 보내는 데 사용하는 프록시 URL입니다. PAC 파일은 다음 구문을 지원합니다. `pac+https://...` 또는 `pac+http://...`.

`proxyTestRequestsBypassList`
: **유형**: 문자열 배열 <br>
**기본값**: `none`<br>
`proxyTestRequests`로 정의한 프록시를 사용하지 않는 호스트입니다(예: `--proxyTestRequestsBypassList="example.org" --proxyTestRequestsBypassList="*.com"`).

`--proxyIgnoreSSLErrors`
: **유형**: 불리언 <br>
**기본값**: `false`<br>
프라이빗 위치가 Datadog으로 요청을 보내기 위해 프록시를 사용할 때 SSL 오류를 무시합니다.

`--dnsUseHost`
: **유형**: 불리언 <br>
**기본값**: `true`<br>
호스트 로컬 DNS 구성을 먼저 사용하고(예: `etc/resolv.conf` 파일의 구성) 그 다음 `dnsServer` 파라미터에 지정된 DNS 서버를 사용합니다.

`--dnsServer`
: **유형**: 문자열 배열 <br>
**기본값**: `["8.8.8.8","1.1.1.1"]`<br>
주어진 순서대로 사용할 DNS 서버 IP입니다(예: `--dnsServer="8.8.4.4" --dnsServer="8.8.8.8"`).

`--variableOverride`
: **유형**: 문자열 <br>
프라이빗 위치에서 실행되는 테스트에 사용되는 변수를 재정의합니다. 형식: `VARIABLE=value`.
이 방식으로 가져온 모든 변수는 난독화됩니다.

`--environmentVariableOverride`
: **유형**: 문자열 <br>
환경 변수를 사용하여 프라이빗 위치에서 실행되는 테스트에 사용되는 변수를 재정의합니다. 컨테이너화된 환경으로 환경 변수를 가져와야 합니다.
예를 들어 Docker의 경우 `docker run --env VARIABLE gcr.io/datadoghq/synthetics-private-location-worker --environmentVariableOverride VARIABLE`입니다.
이 방식으로 가져온 모든 변수는 난독화됩니다.

`--retryAPIErrors`
: **유형**: 불리언 <br>
**기본값**: `false`<br>
API 테스트의 모든 오류 재시도

`--allowedIPRanges`
: **유형**: 문자열 배열 <br>
**기본값**: `none`<br>
`--enableDefaultBlockedIpRanges` 또는 `blockedIPRanges`를 통해 차단된 IP 범위 내 특정 IP 및/또는 CIDR에 대한 액세스를 허용하세요(예: `"allowedIPRanges.4": "10.0.0.0/8"`). **참고:** `allowedIPRanges`가 `blockedIPRanges`보다 우선합니다. [프라이빗 위치 네트워크 보안 강화][6]를 참조하세요.

`--blockedIPRanges`
: **유형**: 문자열 배열 <br>
**기본값**: `none`<br>
`--enableDefaultBlockedIpRanges` 파라미터를 `true`로 설정하는 경우 차단되는 IP 범위에 추가하거나 그 설정과 관계없이 특정 IP 및/또는 CIDR에 대한 액세스를 차단합니다(예: `--blockedIPRanges.4="127.0.0.0/8" --blockedIPRanges.6="::1/128"`). `--allowedDomainNames` 파라미터로 설정된 허용된 도메인 이름은 `--blockedIPRanges`로 차단된 IP 범위를 우회합니다. [프라이빗 위치 네트워크 보안 강화][6]를 참조하세요.

`--enableDefaultBlockedIpRanges`
: **유형**: 불리언 <br>
**기본값**: `false`<br>
`--allowedIPRanges` 또는 `--allowedDomainNames` 파라미터로 명시적으로 설정된 경우를 제외하고, 예약된 IP 범위(IANA [IPv4][4] 및 [IPv6][5] 특수 목적 주소 레지스트리)를 사용하는 엔드포인트에 사용자가 Synthetic 테스트를 생성하지 못하도록 하세요. 새 프라이빗 위치에 대해 생성된 구성 파일은 이 파라미터를 `true`로 설정합니다. Worker의 기본값은 `false`입니다. [프라이빗 위치 네트워크 보안 강화][6]를 참조하세요.

`--allowedDomainNames`
: **유형**: 배열 <br>
**기본값**: `none`<br>
테스트에서 도메인 이름에 대한 액세스를 허용하세요. `--blockedDomainNames`보다 우선순위가 높습니다(예: `--allowedDomainNames="*.example.com"`). 도메인 이름은 전체 호스트 이름과 일치하며 `*` 와일드카드를 지원합니다. 허용된 도메인 이름은 `--enableDefaultBlockedIpRanges`에 의해 차단된 예약된 IP 범위를 포함하여 IP 차단 목록을 우회합니다. [프라이빗 위치 네트워크 보안 강화][6]를 참조하세요.

`--blockedDomainNames`
: **유형**: 배열 <br>
**기본값**: `none`<br>
테스트에서 도메인 이름에 대한 액세스를 거부하세요(예: `--blockedDomainNames="example.org" --blockedDomainNames="*.com"`). [프라이빗 위치 네트워크 보안 강화][6]를 참조하세요.

`--enableIPv6`
: **유형**: 불리언 <br>
**기본값**: `false`<br>
IPv6을 사용하여 테스트를 수행하세요. **참고**: Docker의 IPv6은 Linux 호스트에서만 지원됩니다.

`--version`
: **유형**: 불리언 <br>
**기본값**: `none`<br>
Worker의 버전 번호를 표시합니다.

`--logFormat`
: **유형**: 문자열 <br>
**기본값**: `pretty`<br>
로그 출력 형식을 `"compact"`, `"pretty"`, `"pretty-compact"`, `"json"` 중 하나로 설정합니다. 로그 형식을 `json`으로 설정하면 Datadog에서 수집할 때 이러한 로그가 자동으로 구문 분석됩니다.

`--verbosity`
: **유형**: 숫자 <br>
**기본값**: `3`<br>
`1`(오류만)에서 `4` (디버그 로그 이상)까지의 로그 상세 수준입니다. 명령줄에서 로그 상세 수준을 설정하려면 `-v`, `-vv`, `-vvv` 및 `-vvvv` 인수를 사용합니다.<br><br>
로그 상세 수준 | CLI 인수 | JSON 구성 옵션
-- | -- | --
DEBUG | `-vvvv` | `"verbosity": 4`
INFO(기본값) | `-vvv` | `"verbosity": 3`
WARNING | `-vv` | `"verbosity": 2`
ERROR | `-v` | `"verbosity": 1`

`--help`
: **유형**: 불리언 <br>
**기본값**: `none`<br>
help 명령의 출력을 표시하세요.

## 환경 변수 {#environment-variables}
명령 옵션은 `DATADOG_API_KEY="...", DATADOG_WORKER_CONCURRENCY="15", DATADOG_TESTS_DNS_USE_HOST="true"`와 같은 환경 변수를 사용하여 설정할 수도 있습니다. 여러 인수를 허용하는 옵션의 경우 JSON 문자열 배열 표기법(`DATADOG_TESTS_DNS_SERVER='["8.8.8.8", "1.1.1.1"]'`)을 사용하세요.
### 지원되는 환경 변수: {#supported-environment-variables}
`DATADOG_ACCESS_KEY`, `DATADOG_API_KEY`, `DATADOG_PRIVATE_KEY`, `DATADOG_PUBLIC_KEY_PEM`, `DATADOG_SECRET_ACCESS_KEY`, `DATADOG_SITE`, `DATADOG_WORKER_CONCURRENCY`, `DATADOG_WORKER_LOG_FORMAT`, `DATADOG_WORKER_LOG_VERBOSITY`, `DATADOG_WORKER_MAX_NUMBER_MESSAGES_TO_FETCH`, `DATADOG_WORKER_PROXY`, `DATADOG_TESTS_DNS_SERVER`, `DATADOG_TESTS_DNS_USE_HOST`, `DATADOG_TESTS_PROXY`, `DATADOG_TESTS_PROXY_ENABLE_CONNECT_TUNNEL`, `DATADOG_TESTS_PROXY_IGNORE_SSL_ERRORS`, `DATADOG_ALLOWED_IP_RANGES_4`, `DATADOG_ALLOWED_IP_RANGES_6`, `DATADOG_BLOCKED_IP_RANGES_4`, `DATADOG_BLOCKED_IP_RANGES_6`, `DATADOG_ENABLE_DEFAULT_WINDOWS_FIREWALL_RULES`, `DATADOG_ALLOWED_DOMAIN_NAMES`, `DATADOG_BLOCKED_DOMAIN_NAMES`, `DATADOG_WORKER_ENABLE_STATUS_PROBES`, `DATADOG_WORKER_STATUS_PROBES_PORT`

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://hub.docker.com/r/datadog/synthetics-private-location-worker
[2]: https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-dns-config
[3]: https://csrc.nist.gov/projects/cryptographic-module-validation-program/certificate/4282
[4]: https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml
[5]: https://www.iana.org/assignments/iana-ipv6-special-registry/iana-ipv6-special-registry.xhtml
[6]: /ko/synthetics/platform/private_locations/network_security