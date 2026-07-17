---
aliases:
- /ko/synthetics/private_locations/configuration
description: 비공개 위치를 설정합니다.
further_reading:
- link: getting_started/synthetics/private_location
  tag: 설명서
  text: 프라이빗 위치로 시작하기
- link: synthetics/private_locations/dimensioning
  tag: 설명서
  text: 비공개 위치 특정
title: 비공개 위치 설정
---

## 개요

신서틱(Synthetic) 비공개 위치에는 환경 요구 사항에 맞게 설정할 수 있는 옵션 세트가 제공됩니다. [비공개 위치 작업자][1]에 대한 모든 옵션은 다음 `help` 명령을 실행하여 찾을 수 있습니다.

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
{{% tab "쿠버네티스" %}}

[Datadog Helm 리포지토리][1]의 예를 참조하세요.

[1]: https://github.com/DataDog/helm-charts/tree/main/charts/synthetics-private-location

{{% /tab %}}
{{< /tabs >}}

## 비공개 위치 사용자 지정하기
사용 가능한 파라미터 옵션은 다음과 같습니다.
비공개 위치 설정 옵션은 **JSON 설정 파일 파라미터** 또는 **실행 명령의 인수**로써 다음의 예시와 같이 전달됩니다.

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

실행 명령에 설정된 인수는 설정 파일보다 우선합니다. 그러나 해당 옵션은 저장되지 않으므로 결과적으로 특정 실행 시에만 적용됩니다.

## 상위 설정 옵션

### Datadog 사이트 설정

`site`
: **Type**: String <br>
**Default**: `datadoghq.com`<br>
비공개 위치의 테스트 설정을 불러와 테스트 결과를 푸시하는 Datadog 사이트입니다. `site`는 {{< region-param key="dd_site" code="true" >}}입니다.

### DNS 설정

다음 파라미터를 사용하여 API 테스트에서 DNS 확인을 사용자 지정할 수 있습니다.

`dnsUseHost`
: **Type**: Boolean <br>
**Default**: `true`<br>
로컬 호스트 DNS 설정(예: `etc/resolv.conf` 파일의 설정)을 먼저 적용한 이후 `dnsServer` 파라미터에 지정된 DNS 서버를 사용합니다.

`dnsServer`
: **Type**: Array of Strings <br>
**Default**: `["8.8.8.8","1.1.1.1"]`<br>
지정된 순서로 사용할 DNS 서버 IP(예: `--dnsServer="8.8.4.4" --dnsServer="8.8.8.8"`).

브라우저 테스트에서 DNS 확인은 브라우저에서 직접 수행하며, 대개 호스트의 DNS 서버를 읽습니다. 또는 컨테이너 수준에서 설정을 사용할 수 있습니다(예: [쿠버네티스(Kubernetes)][2]의 `--dns` flag on [Docker][1], or `dnsConfig.nameservers`를 사용).

### 프록시 설정

다음 파라미터를 사용해 프록시를 구성하여 Datadog에 연결할 수 있습니다.

`proxyDatadog`
: **Type**: String <br>
**Default**: `none`<br>
비공개 위치에서 Datadog으로 요청을 보낼 때 사용하는 프록시 URL(예: `--proxyDatadog=http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`).

`proxyIgnoreSSLErrors`
: **Type**: Boolean <br>
**Default**: `false`<br>
비공개 위치에서 프록시를 사용하여 Datadog로 요청 전송 시 SSL 오류를 삭제합니다.

`proxyEnableConnectTunnel`
: **Type**: Boolean <br>
**Default**: `none`<br>
HTTP 프록시를 위해 `HTTP CONNECT` 터널링을 활성화합니다. 이 옵션이 설정되어 있지 않으면 `HTTP CONNECT` 터널링은 HTTPS 프록시에만 사용됩니다.

**참고**: Squid와 같은 HTTP 포워드 프록시의 경우, 프라이빗 위치와 Datadog 간에 첫 TCP 연결을 하는데 `HTTP CONNECT` 요청이 필요할 수 있습니다. 따라서 `proxyEnableConnectTunnel` 파라미터를 `true`로 설정해야 합니다. 그러나 이 옵션이 활성화되어 있으면 `HTTP CONNECT` 요청을 Datadog로 보내는 리버스 프록시(예:  HAProxy)가 작동하지 않을 수 있습니다.

**참고**: `proxy` 파라미터는 더 이상 지원되지 않으며 `proxyDatadog`으로 대체합니다.

Synthetic Monitoring 테스트에 사용할 기본 프록시를 구성할 때 다음 파라미터를 사용할 수 있습니다.

`proxyTestRequests`
: **Type**: String <br>
**Default**: `none`<br>
프라이빗 위치에서 엔드포인트로 테스트 요청을 보낼 때 사용되는 프록시 URL. `pac+http://...`, `pac+https://...`, `pac+file://...`, 또는 `pac+data:...` 구문이 있는 HTTP(S), SOCKS, PAC 파일을 지원합니다.

`proxyTestRequestsBypassList`
: **Type**: Array of Strings <br>
**Default**: `none`<br>
`proxyTestRequests`로 정의되지 않은 호스트가 사용되지 않은 호스트. 예:  `--proxyTestRequestsBypassList="example.org" --proxyTestRequestsBypassList="*.com"`.

### 고급 설정

`concurrency`
: **Type**: Number <br>
**Default**: `10`<br>
병렬로 실행되는 최대 테스트 수입니다.

`maxNumberMessagesToFetch`
: **Type**: Number <br>
**Default**: `10`<br>
Datadog에서 불러온 최대 테스트 수입니다.

`maxAPIDownloadBodySize`
: **Type**: Number <br>
**Default**: `52428800`<br>
다운로드할 수 있는 최대 HTTP 본문 크기(바이트 단위). 기본값은 50 MB(50 * 1024 * 1024).

`maxAPIBodySizeIfProcessed`
: **Type**: Number <br>
**Default**: `5242880`<br>
어설션의 최대 HTTP 본문 크기(바이트 단위). 기본값은 5 MB(5 * 1024 * 1024).

`apiRequestMaxTimeout`
: **Type**: Number <br>
**Default**: `60000`<br>
API 테스트 실행의 최대 기간(밀리초 단위). 기본값은 1분(60 * 1000).

**참고**: 비공개 위치 컨테이너는 로그를 컨테이너에 저장하지 않고 `stdout`과 `stderr`으로 출력합니다.

## 모든 설정 옵션

`--accessKey`
: **Type**: String <br>
**Default**: `none`<br>
Datadog API 인증 액세스 키입니다.

`--secretAccessKey`
: **Type**: String <br>
**Default**: `none`<br>
Datadog API 인증 비밀 액세스 키입니다.

`--datadogApiKey`
: **Type**: String <br>
**Default**: `none`<br>
브라우저 테스트 아티팩트(스크린샷 등)를 전송할 Datadog API 키입니다.

`--privateKey`
: **Type**: Array <br>
**Default**: `none`<br>
테스트 구성을 해독하는 데 사용되는 프라이빗 키입니다.

`--publicKey`
: **유형**: 배열 <br>
**기본값**: `none`<br>
Datadog이 테스트 결과를 암호화하는 데 사용하는 공개 키입니다. `--publicKey.pem`으로 구성됩니다.

`--site`
: **Type**: String <br>
**Default**: `datadoghq.com`<br>
비공개 위치의 테스트 설정을 불러와 테스트 결과를 푸시하는 Datadog 사이트입니다. 고객님의 사이트는 {{< region-param key="dd_site" code="true" >}}입니다.

`--concurrency`
: **Type**: Number <br>
**Default**: `10`<br>
병렬로 실행되는 최대 테스트 수입니다.

`--maxNumberMessagesToFetch`
: **Type**: Number <br>
**Default**: `10`<br>
Datadog에서 불러온 최대 테스트 수입니다.

`--proxyDatadog`
: **Type**: String <br>
**Default**: `none`<br>
비공개 위치에서 Datadog으로 요청을 보낼 때 사용하는 프록시 URL(예: `--proxyDatadog=http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`).

`--dumpConfig`
: **Type**: Boolean <br>
**Default**: `none`<br>
기밀 정보가 없는 작업자 설정 파라미터를 표시합니다.

`--enableStatusProbes`
: **Type**: Boolean <br>
비공개 위치 프로브의 준비 및 실시간 상태를 활성화합니다.  `http://127.0.0.1:8080/liveness`, `http://127.0.0.1:8080/readiness`의 엔드포인트 두 개가 활성화됩니다.

`--statusProbesPort`
: **Type**: Number <br>
**Default**: `8080`<br>
비공개 위치 상태 프로브의 포트를 덮어씁니다.

`--config`
: **Type**: String <br>
**Default**: `/etc/datadog/synthetics-check-runner.json`</br>
**Windows**: `C:\ProgramData\Datadog-Synthetics\worker-config.json`</br>
JSON 구성 파일의 경로입니다.

`--proxyTestRequests`
: **Type**: String <br>
**Default**: `none`<br>
비공개 위치에서 테스트 요청을 엔드포인트로 전송하는 데 사용하는 프록시 URL입니다. PAC 파일은 `pac+https://...` 또는 `pac+http://...` 구문으로 지원됩니다.

`proxyTestRequestsBypassList`
: **Type**: Array of Strings <br>
**Default**: `none`<br>
`proxyTestRequests`로 정의되지 않은 호스트가 사용되지 않은 호스트. 예:  `--proxyTestRequestsBypassList="example.org" --proxyTestRequestsBypassList="*.com"`.

`--proxyIgnoreSSLErrors`
: **Type**: Boolean <br>
**Default**: `false`<br>
비공개 위치에서 프록시를 사용하여 Datadog로 요청 전송 시 SSL 오류를 삭제합니다.

`--dnsUseHost`
: **Type**: Boolean <br>
**Default**: `true`<br>
로컬 호스트 DNS 설정(예: `etc/resolv.conf` 파일의 설정)을 먼저 적용한 이후 `dnsServer` 파라미터에 지정된 DNS 서버를 사용합니다.

`--dnsServer`
: **Type**: Array of Strings <br>
**Default**: `["8.8.8.8","1.1.1.1"]`<br>
지정된 순서로 사용할 DNS 서버 IP(예: `--dnsServer="8.8.4.4" --dnsServer="8.8.8.8"`).

`--variableOverride`
: **Type**: String <br>
비공개 위치에서 실행되는 테스트에 사용되는 변수를 덮어씁니다. 형식: `VARIABLE=value`.
해당 방법으로 가져온 모든 변수는 난독화됩니다.

`--environmentVariableOverride`
: **Type**: String <br>
프라이빗 위치에서 실행되는 테스트에 사용하는 변수를 환경 변수로 덮어씁니다. 컨테이너화된 환경에서 환경 변수를 불러와야 합니다.
예를 들어 도커(Docker) 를 사용하면 `docker run --env VARIABLE gcr.io/datadoghq/synthetics-private-location-worker --environmentVariableOverride VARIABLE`입니다.
본 방법으로 가져온 모든 변수는 난독화됩니다. 

`--retryAPIErrors`
: **Type**: Boolean <br>
**Default**: `false`<br>
API 테스트 오류를 재시도

`--allowedIPRanges`
: **Type**: Array of Strings <br>
**Default**: `none`<br>
`--enableDefaultBlockedIpRanges` or `blockedIPRanges` (for example, `"allowedIPRanges.4": "10.0.0.0/8"`). **Note:** `allowedIPRanges` has precedence over `blockedIPRanges`를 통해서 차단된 IP 범위 중 특정 IP 및/또는 CIDR에 접근 권한을 부여합니다.

`--blockedIPRanges`
: **Type**: Array of Strings <br>
**Default**: `none`<br>
`--enableDefaultBlockedIpRanges` parameter to `true` (for example, `--blockedIPRanges.4="127.0.0.0/8" --blockedIPRanges.6="::1/128"`.) 설정 시 차단된 IP 범위에서 추가로 특정 IP 및/또는 CIDR에 대한 접근을 차단하거나 차단하지 않습니다.

`--enableDefaultBlockedIpRanges`
: **Type**: Boolean <br>
**Default**: `false`<br>
`--allowedIPRanges` 파라미터로 명시적으로 설정된 경우를 제외하고, 점유한 IP 범위(IANA [IPv4][4] 및 [IPv6][5] 특수 목적 어드레스 레지스트리)를 사용하는 엔드포인트에서 사용자가 신서틱(Synthetic) 테스트를 생성하지 못하게 합니다.

`--allowedDomainNames`
: **Type**: Array <br>
**Default**: `none`<br>
테스트 중인 도메인 이름에 대한 접근 권한을 부여합니다. blockedDomainNames보다 우선합니다. 예: `--allowedDomainNames="*.example.com"`.

`--blockedDomainNames`
: **Type**: Array <br>
**Default**: `none`<br>
테스트 중인 도메인 이름에 대한 액세스를 거부합니다. 예: `--blockedDomainNames="example.org" --blockedDomainNames="*.com"`.

`--enableIPv6`
: **Type**: Boolean <br>
**Default**: `false`<br>
IPv6를 사용하여 테스트를 수행합니다. **알림**: 도커 IPv6는 Linux 호스트에서만 지원됩니다.

`--version`
: **Type**: Boolean <br>
**Default**: `none`<br>
작업자 버전 넘버를 표시합니다.

`--logFormat`
: **Type**: String <br>
**Default**: `pretty`<br>
`"compact"`, `"pretty"`, `"pretty-compact"`, `"json"` 간의 로그 형식 출력값입니다.
로그 형식을 `json`로 지정하면 Datadog이 로그 수집 시 해당 로그가 자동 파싱됩니다.

`--verbosity`
: **Type**: Number <br>
**Default**: `3`<br>
`1` (오류만 해당)부터 `4` (디버그 로그 이상)까지의 상세도 수준입니다. 명령줄에서 상세도 수준은 `-v`, `-vv`, `-vvv`, and `-vvvv` 인수를 사용하여 설정합니다.<br><br>
상세도 수준 | CLI 인수 | JSON 설정 옵션
-- | -- | --
DEBUG | `-vvvv` | `"verbosity": 4`
INFO (default) | `-vvv` | `"verbosity": 3`
WARNING | `-vv` | `"verbosity": 2`
ERROR | `-v` | `"verbosity": 1`

`--help`
: **Type**: Boolean <br>
**Default**: `none`<br>
도움 명령어의 출력값을 표시합니다.

## 환경 변수
명령 옵션은 `DATADOG_API_KEY="...", DATADOG_WORKER_CONCURRENCY="15", DATADOG_TESTS_DNS_USE_HOST="true"`와 같은 환경 변수를 사용하여 설정할 수도 있습니다. 여러 인수를 허용하는 옵션의 경우 JSON 문자열 배열(`DATADOG_TESTS_DNS_SERVER='["8.8.8.8", "1.1.1.1"]'`)을 사용합니다.
### 지원하는 환경 변수:
`DATADOG_ACCESS_KEY`, `DATADOG_API_KEY`, `DATADOG_PRIVATE_KEY`, `DATADOG_PUBLIC_KEY_PEM`, `DATADOG_SECRET_ACCESS_KEY`, `DATADOG_SITE`, `DATADOG_WORKER_CONCURRENCY`, `DATADOG_WORKER_LOG_FORMAT`, `DATADOG_WORKER_LOG_VERBOSITY`, `DATADOG_WORKER_MAX_NUMBER_MESSAGES_TO_FETCH`, `DATADOG_WORKER_PROXY`, `DATADOG_TESTS_DNS_SERVER`, `DATADOG_TESTS_DNS_USE_HOST`, `DATADOG_TESTS_PROXY`, `DATADOG_TESTS_PROXY_ENABLE_CONNECT_TUNNEL`, `DATADOG_TESTS_PROXY_IGNORE_SSL_ERRORS`, `DATADOG_ALLOWED_IP_RANGES_4`, `DATADOG_ALLOWED_IP_RANGES_6`, `DATADOG_BLOCKED_IP_RANGES_4`, `DATADOG_BLOCKED_IP_RANGES_6`, `DATADOG_ENABLE_DEFAULT_WINDOWS_FIREWALL_RULES`, `DATADOG_ALLOWED_DOMAIN_NAMES`, `DATADOG_BLOCKED_DOMAIN_NAMES`, `DATADOG_WORKER_ENABLE_STATUS_PROBES`, `DATADOG_WORKER_STATUS_PROBES_PORT`

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://hub.docker.com/r/datadog/synthetics-private-location-worker
[2]: https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-dns-config
[3]: https://csrc.nist.gov/projects/cryptographic-module-validation-program/certificate/4282
[4]: https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml
[5]: https://www.iana.org/assignments/iana-ipv6-special-registry/iana-ipv6-special-registry.xhtml