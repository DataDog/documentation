---
aliases:
- /ko/logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers
- /ko/logs/languages
- /ko/integrations/windows_event_log/
description: 호스트, 컨테이너 및 서비스에서 로그를 수집하도록 환경 설정.
further_reading:
- link: https://www.datadoghq.com/blog/log-file-control-with-logrotate/
  tag: 블로그
  text: Logrotate를 사용하여 로그 파일을 관리하는 방법
- link: /agent/logs/advanced_log_collection
  tag: 설명서
  text: 고급 로그 수집 설정
- link: /logs/log_configuration/processors
  tag: 설명서
  text: 로그 처리 방법 알아보기
- link: /logs/log_configuration/parsing
  tag: 설명서
  text: 파싱에 대해 알아보기
- link: /logs/live_tail/
  tag: 설명서
  text: Datadog 라이브 테일 기능
- link: /logs/explorer/
  tag: 설명서
  text: 로그 탐색 방법 보기
- link: /logs/logging_without_limits/
  tag: 설명서
  text: Logging Without Limits*
title: 로그 수집 및 통합
---

## 개요

로그 수집을 시작하려면 아래 구성 옵션을 선택하세요. 이미 log-shipper 데몬을 사용하고 있다면 [Rsyslog][1], [Syslog-ng][2], [NXlog][3], [FluentD][4] 또는 [Logstash][5] 전용 문서를 참조하세요

로그를 Datadog에 직접 전송하려면 [사용 가능한 Datadog 로그 수집 엔드포인트 목록](#logging-endpoints)을 참조하세요.

**참고**: JSON 형식의 로그를 Datadog에 보낼 때 Datadog 내에서 특정 의미를 갖는 예약된 속성 세트가 있습니다. 자세한 내용은 [예약된 속성 섹션](#attributes-and-tags)을 참조하세요.

## 설정

{{< tabs >}}
{{% tab "Host" %}}

1. [Datadog Agent][1]를 설치합니다.
2. 로그 수집을 활성화하려면 Agent의 기본 구성 파일(`datadog.yaml`)에서 `logs_enabled: false`를 `logs_enabled: true`로 변경합니다. 자세한 내용과 예시는 [Host Agent Log 로그 수집 문서][5]를 참조하세요.
3. 활성화되면 Datadog Agent는 [로그 파일 추적 또는 UDP/TCP를 통해 전송된 로그 수신][2], [로그 필터링 또는 민감한 데이터 삭제][3], [여러 행 로그 집계][4]를 위한 목적으로 설정될 수 있습니다.

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /ko/agent/logs/#custom-log-collection
[3]: /ko/agent/logs/advanced_log_collection/#filter-logs
[4]: /ko/agent/logs/advanced_log_collection/#multi-line-aggregation
[5]: /ko/agent/logs/
{{% /tab %}}

{{% tab "Application" %}}

1. [Datadog Agent][1]를 설치합니다.
2. 로그 수집을 활성화하려면  Agent의 기본 구성 파일(`datadog.yaml`)에서 `logs_enabled: false`를 `logs_enabled: true`로 변경합니다. 자세한 내용과 예시는 [Host Agent Log 수집 문서][2]를 참조하세요.
3. 애플리케이션 언어 설치 지침에 따라 로거를 구성하고 로그 생성을 시작하세요.

{{< partial name="logs/logs-languages.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /ko/agent/logs/
{{% /tab %}}

{{% tab "Container" %}}

컨테이너 또는 오케스트레이터 공급자를 선택하고 로그 수집 지침을 따르세요.

{{< partial name="logs/logs-containers.html" >}}

**참고**:

- Datadog 에이전트는 로깅 드라이버를 사용하지 않고도 [컨테이너 stdout/stderr에서 직접 로그를 수집][1]할 수 있습니다. Agent의 Docker 검사가 활성화되면 컨테이너 및 오케스트레이터 메타데이터가 자동으로 로그에 태그로 추가됩니다.

- 모든 컨테이너 또는 [컨테이너 이미지, 라벨 또는 이름으로 필터링된 하위 집합만][2] 로그를 수집할 수 있습니다.

- 자동탐지를 사용하여 [컨테이너 레이블에서 직접 로그 수집을 구성][3]할 수도 있습니다.

- Kubernetes 환경에서는 [데몬셋 설치][4]를 활용할 수도 있습니다.

[1]: /ko/agent/docker/log/
[2]: /ko/agent/guide/autodiscovery-management/
[3]: /ko/agent/kubernetes/integrations/
[4]: /ko/agent/basic_agent_usage/kubernetes/#log-collection-setup
{{% /tab %}}

{{% tab "Serverless" %}}

환경에서 Datadog으로 로그를 전송하는 AWS Lambda 함수인 Datadog Forwarder를 사용합니다. AWS 서버리스 환경에서 로그 수집을 활성화하려면 [Datadog Forwarder 설명서][1]를 참조하세요.

[1]: /ko/serverless/forwarder
{{% /tab %}}

{{% tab "Cloud/Integration" %}}

로그를 자동으로 수집하여 Datadog에 전달하는 방법을 보려면 아래에서 클라우드 제공업체를 선택하세요.

{{< partial name="logs/logs-cloud.html" >}}

Datadog 통합과 로그 수집은 서로 연결되어 있습니다. 통합의 기본 구성 파일을 사용하여 Datadog에서 전용 [프로세서][1], [파싱][2] 및 [패싯][3]을 활성화할 수 있습니다. 통합으로 로그 수집을 시작하려면 다음 지침을 따르세요.

1. [Integrations 페이지][6]에서 통합을 선택하고 설정 지침을 따릅니다.
2. 통합의 로그 수집 지침을 따릅니다. 이 섹션에서는 해당 통합 `conf.yaml` 파일에서 로그 섹션의 주석 처리를 제거하고 환경에 맞게 구성하는 방법을 다룹니다.

[1]: /ko/logs/log_configuration/processors
[2]: /ko/logs/log_configuration/parsing
[3]: /ko/logs/explorer/facets/
[4]: /ko/agent/kubernetes/log/#autodiscovery
[5]: /ko/agent/docker/log/#log-integrations
[6]: /ko/integrations/#cat-log-collection
{{% /tab %}}
{{< /tabs >}}

## 추가 구성 옵션

### 로깅 엔드포인트

Datadog은 SSL 암호화 연결과 암호화되지 않은 연결 모두에 대한 로깅 엔드포인트를 제공합니다. 가능하면 암호화된 엔드포인트를 사용하시길 권장합니다. Datadog Agent는 암호화된 엔드포인트를 사용하여 Datadog에 로그를 보냅니다. 자세한 내용은 [Datadog 보안 문서][6]에서 확인할 수 있습니다.

#### 지원되는 엔드포인트

Datadog 사이트에서 지원되는 엔드포인트를 보려면 페이지 오른쪽에 있는 [사이트][13] 선택기 드롭다운을 사용하세요.

{{< site-region region="us" >}}

| 사이트 | 유형        | 엔드포인트                                                                  | 포트         | 설명                                                                                                                                                                 |
|------|-------------|---------------------------------------------------------------------------|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| US   | HTTPS       | `http-intake.logs.datadoghq.com`                                          | 443   | 커스텀 포워더가 HTTPS를 통해 JSON 또는 일반 텍스트 형식으로 로그를 보내는 데 사용됩니다. [Logs HTTP API 문서][1]를 참조하세요.                                                    |
| US   | HTTPS       | `agent-http-intake-pci.logs.datadoghq.com`                                | 443   | Agent가 PCI DSS 컴플라이언스가 활성화된 조직에 HTTPS를 통해 로그를 보내는 데 사용됩니다. 자세한 내용은 [로그 관리를 위한 PCI DSS 컴플라이언스][3]를 참조하세요.                 |
| US   | HTTPS       | `agent-http-intake.logs.datadoghq.com`                                    | 443   | Agent가 HTTPS를 통해 JSON 형식으로 로그를 보내는 데 사용됩니다. [Host Agent Log 수집 문서][2]를 참조하세요.                                                             |
| US   | HTTPS       | `lambda-http-intake.logs.datadoghq.com`                                   | 443   | Lambda 함수가 HTTPS를 통해 원시값, Syslog 또는 JSON 형식으로 로그를 전송하는 데 사용됩니다.                                                                                            |
| US   | HTTPS       | `logs.`{{< region-param key="browser_sdk_endpoint_domain" code="true" >}} | 443   | Browser SDK에서 HTTPS를 통해 JSON 형식으로 로그를 보내는 데 사용됩니다.                                                                                                             |
| US   | TCP         | `agent-intake.logs.datadoghq.com`                                         | 10514 | Agent가 TLS 없이 로그를 보내는 데 사용됩니다.
| US   | TCP 및 TLS | `agent-intake.logs.datadoghq.com`                                         | 10516 | Agent가 TLS를 통해 로그를 보내는 데 사용됩니다.
| US   | TCP 및 TLS | `intake.logs.datadoghq.com`                                               | 443   | SSL로 암호화된 TCP 연결을 통해 원시값, Syslog 또는 JSON 형식으로 로그를 전송하기 위해 커스텀 포워더에서 사용됩니다.                                                                 |
| US   | TCP 및 TLS | `functions-intake.logs.datadoghq.com`                                     | 443   | Azure 함수에서 SSL로 암호화된 TCP 연결을 통해 원시값, Syslog 또는 JSON 형식으로 로그를 보내는 데 사용됩니다. **참고**: 이 엔드포인트는 다른 클라우드 제공업체에 유용할 수 있습니다. |
| US   | TCP 및 TLS | `lambda-intake.logs.datadoghq.com`                                        | 443   | SSL로 암호화된 TCP 연결을 통해 원시값, Syslog 또는 JSON 형식으로 로그를 전송하기 위해 Lambda 함수에서 사용됩니다.                                                                  |

[1]: /ko/api/latest/logs/#send-logs
[2]: /ko/agent/logs/#send-logs-over-https
[3]: /ko/data_security/logs/#pci-dss-compliance-for-log-management
{{< /site-region >}}

{{< site-region region="eu" >}}

| 사이트 | 유형        | 엔드포인트                                                                  | 포트 | 설명                                                                                                                                                                 |
|------|-------------|---------------------------------------------------------------------------|------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| EU   | HTTPS       | `http-intake.logs.datadoghq.eu`                                           | 443  | 커스텀 포워더가 HTTPS를 통해 JSON 또는 일반 텍스트 형식으로 로그를 보내는 데 사용됩니다. [Logs HTTP API 문서][1]를 참조하세요.                                                    |
| EU   | HTTPS       | `agent-http-intake.logs.datadoghq.eu`                                     | 443  | Agent가 HTTPS를 통해 JSON 형식으로 로그를 보내는 데 사용됩니다. [Host Agent Log 수집 문서][2]를 참조하세요.                                                             |
| EU   | HTTPS       | `lambda-http-intake.logs.datadoghq.eu`                                    | 443  | Lambda 함수가 HTTPS를 통해 원시값, Syslog 또는 JSON 형식으로 로그를 전송하는 데 사용됩니다.                                                                                            |
| EU   | HTTPS       | `logs.`{{< region-param key="browser_sdk_endpoint_domain" code="true" >}} | 443  | Browser SDK에서 HTTPS를 통해 JSON 형식으로 로그를 보내는 데 사용됩니다.                                                                                                             |
| EU   | TCP 및 TLS | `agent-intake.logs.datadoghq.eu`                                          | 443  | SSL로 암호화된 TCP 연결을 통해 protobuf 형식으로 로그를 전송하기 위해 Agent에서 사용됩니다.                                                                                     |
| EU   | TCP 및 TLS | `functions-intake.logs.datadoghq.eu`                                      | 443  | Azure 함수에서 SSL로 암호화된 TCP 연결을 통해 원시값, Syslog 또는 JSON 형식으로 로그를 보내는 데 사용됩니다. **참고**: 이 엔드포인트는 다른 클라우드 제공업체에 유용할 수 있습니다. |
| EU   | TCP 및 TLS | `lambda-intake.logs.datadoghq.eu`                                         | 443  | SSL로 암호화된 TCP 연결을 통해 원시값, Syslog 또는 JSON 형식으로 로그를 전송하기 위해 Lambda 함수에서 사용됩니다.                                                                  |

[1]: /ko/api/latest/logs/#send-logs
[2]: /ko/agent/logs/#send-logs-over-https
{{< /site-region >}}

{{< site-region region="us3" >}}

| 사이트 | 유형  | 엔드포인트                                                                  | 포트 | 설명                                                                                                              |
|------|-------|---------------------------------------------                              |------|--------------------------------------------------------------------------------------------------------------------------|
| US3  | HTTPS | `http-intake.logs.us3.datadoghq.com`                                      | 443  | 커스텀 포워더가 HTTPS를 통해 JSON 또는 일반 텍스트 형식으로 로그를 보내는 데 사용됩니다. [Logs HTTP API 문서][1]를 참조하세요. |
| US3  | HTTPS | `lambda-http-intake.logs.us3.datadoghq.com`                               | 443  | Lambda 함수가 HTTPS를 통해 원시값, Syslog 또는 JSON 형식으로 로그를 전송하는 데 사용됩니다.                                         |
| US3  | HTTPS | `agent-http-intake.logs.us3.datadoghq.com`                                | 443  | Agent가 HTTPS를 통해 JSON 형식으로 로그를 보내는 데 사용됩니다. [Host Agent Log 수집 문서][2]를 참조하세요.          |
| US3  | HTTPS | `logs.`{{< region-param key="browser_sdk_endpoint_domain" code="true" >}} | 443  | Browser SDK에서 HTTPS를 통해 JSON 형식으로 로그를 보내는 데 사용됩니다.                                                          |

[1]: /ko/api/latest/logs/#send-logs
[2]: /ko/agent/logs/#send-logs-over-https

{{< /site-region >}}

{{< site-region region="us5" >}}

| 사이트 | 유형  | 엔드포인트                                                                  | 포트 | 설명                                                                                                              |
|------|-------|---------------------------------------------------------------------------|------|--------------------------------------------------------------------------------------------------------------------------|
| US5  | HTTPS | `http-intake.logs.us5.datadoghq.com`                                      | 443  | 커스텀 포워더가 HTTPS를 통해 JSON 또는 일반 텍스트 형식으로 로그를 보내는 데 사용됩니다. [Logs HTTP API 문서][1]를 참조하세요. |
| US5  | HTTPS | `lambda-http-intake.logs.us5.datadoghq.com`                               | 443  | Lambda 함수가 HTTPS를 통해 원시값, Syslog 또는 JSON 형식으로 로그를 전송하는 데 사용됩니다.                                         |
| US5  | HTTPS | `agent-http-intake.logs.us5.datadoghq.com`                                | 443  | Agent가 HTTPS를 통해 JSON 형식으로 로그를 보내는 데 사용됩니다. [Host Agent Log 수집 문서][2]를 참조하세요.          |
| US5  | HTTPS | `logs.`{{< region-param key="browser_sdk_endpoint_domain" code="true" >}} | 443  | Browser SDK에서 HTTPS를 통해 JSON 형식으로 로그를 보내는 데 사용됩니다.                                                          |

[1]: /ko/api/latest/logs/#send-logs
[2]: /ko/agent/logs/#send-logs-over-https

{{< /site-region >}}

{{< site-region region="ap1" >}}

| 사이트 | 유형  | 엔드포인트                                                                  | 포트 | 설명                                                                                                              |
|------|-------|---------------------------------------------------------------------------|------|--------------------------------------------------------------------------------------------------------------------------|
| AP1  | HTTPS | `http-intake.logs.ap1.datadoghq.com`                                      | 443  | 커스텀 포워더가 HTTPS를 통해 JSON 또는 일반 텍스트 형식으로 로그를 보내는 데 사용됩니다. [Logs HTTP API 문서][1]를 참조하세요. |
| AP1  | HTTPS | `lambda-http-intake.logs.ap1.datadoghq.com`                               | 443  | Lambda 함수가 HTTPS를 통해 원시값, Syslog 또는 JSON 형식으로 로그를 전송하는 데 사용됩니다.                                         |
| AP1  | HTTPS | `agent-http-intake.logs.ap1.datadoghq.com`                                | 443  | Agent가 HTTPS를 통해 JSON 형식으로 로그를 보내는 데 사용됩니다. [Host Agent Log 수집 문서][2]를 참조하세요.          |
| AP1  | HTTPS | `logs.`{{< region-param key="browser_sdk_endpoint_domain" code="true" >}} | 443  | Browser SDK에서 HTTPS를 통해 JSON 형식으로 로그를 보내는 데 사용됩니다.                                                          |

[1]: /ko/api/latest/logs/#send-logs
[2]: /ko/agent/logs/#send-logs-over-https

{{< /site-region >}}

{{< site-region region="gov" >}}

| 사이트    | 유형  | 엔드포인트                                                                  | 포트 | 설명                                                                                                              |
|---------|-------|---------------------------------------------------------------------------|------|--------------------------------------------------------------------------------------------------------------------------|
| US1-FED | HTTPS | `http-intake.logs.ddog-gov.com`                                          | 443  | 커스텀 포워더가 HTTPS를 통해 JSON 또는 일반 텍스트 형식으로 로그를 보내는 데 사용됩니다. [Logs HTTP API 문서][1]를 참조하세요. |
| US1-FED | HTTPS | `lambda-http-intake.logs.ddog-gov.datadoghq.com`                          | 443  | Lambda 함수가 HTTPS를 통해 원시값, Syslog 또는 JSON 형식으로 로그를 전송하는 데 사용됩니다.                                         |
| US1-FED | HTTPS | `agent-http-intake.logs.ddog-gov.datadoghq.com`                           | 443  | Agent가 HTTPS를 통해 JSON 형식으로 로그를 보내는 데 사용됩니다. [Host Agent Log 수집 문서][2]를 참조하세요.          |
| US1-FED | HTTPS | `logs.`{{< region-param key="browser_sdk_endpoint_domain" code="true" >}} | 443  | Browser SDK에서 HTTPS를 통해 JSON 형식으로 로그를 보내는 데 사용됩니다.                                                          |

[1]: /ko/api/latest/logs/#send-logs
[2]: /ko/agent/logs/#send-logs-over-https

{{< /site-region >}}

### 커스텀 로그 전달

**TCP** 또는 **HTTP**를 통해 로그를 전달할 수 있는 모든 사용자 정의 프로세스 또는 로깅 라이브러리를 Datadog Logs와 함께 사용할 수 있습니다.

{{< tabs >}}
{{% tab "HTTP" %}}

HTTP를 통해 Datadog 플랫폼에 로그를 보낼 수 있습니다. 시작하려면 [Datadog Log HTTP API 문서][1]를 참조하세요.

[1]: /ko/api/latest/logs/#send-logs
{{% /tab %}}
{{% tab "TCP" %}}

{{< site-region region="us" >}}

OpenSSL, GnuTLS 또는 다른 SSL/TLS 클라이언트를 사용하여 연결을 수동으로 테스트할 수 있습니다. GnuTLS의 경우 다음 명령을 실행합니다.

```shell
gnutls-cli intake.logs.datadoghq.com:10516
```

 OpenSSL의 경우 다음 명령을 실행합니다.

```shell
openssl s_client -connect intake.logs.datadoghq.com:10516
```

로그 항목 앞에 [Datadog API 키][1]를 붙이고 페이로드를 추가해야 합니다.

```
<DATADOG_API_KEY> Log sent directly using TLS
```

페이로드는 또는 예제에 작성된 대로 `Log sent directly using TLS`는 원시값, Syslog 또는 JSON 형식일 수 있습니다. 페이로드가 JSON 형식인 경우 Datadog은 해당 속성을 자동으로 파싱합니다.

```text
<DATADOG_API_KEY> {"message":"json formatted log", "ddtags":"env:my-env,user:my-user", "ddsource":"my-integration", "hostname":"my-hostname", "service":"my-service"}

[1]: /ko/account_management/api-app-keys/#api-keys

{{< /site-region >}}

{{< site-region region="eu" >}}

OpenSSL, GnuTLS 또는 다른 SSL/TLS 클라이언트를 사용하여 연결을 수동으로 테스트할 수 있습니다. GnuTLS의 경우 다음 명령을 실행합니다.

```shell
gnutls-cli tcp-intake.logs.datadoghq.eu:443
```

 OpenSSL의 경우 다음 명령을 실행합니다.

```shell
openssl s_client -connect tcp-intake.logs.datadoghq.eu:443
```

로그 항목 앞에 [Datadog API 키][1]를 붙이고 페이로드를 추가해야 합니다.

```
<DATADOG_API_KEY> Log sent directly using TLS
```

페이로드는 또는 예제에 작성된 대로 `Log sent directly using TLS`는 원시값, Syslog 또는 JSON 형식일 수 있습니다. 페이로드가 JSON 형식인 경우 Datadog은 해당 속성을 자동으로 파싱합니다.

```text
<DATADOG_API_KEY> {"message":"json formatted log", "ddtags":"env:my-env,user:my-user", "ddsource":"my-integration", "hostname":"my-hostname", "service":"my-service"}
```

[1]: /ko/account_management/api-app-keys/#api-keys

{{< /site-region >}}

{{< site-region region="us3" >}}
이 사이트에는 TCP 엔드포인트가 권장되지 않습니다. 자세한 내용은 [지원 팀][1]에 문의하세요.

[1]: /ko/help
{{< /site-region >}}

{{< site-region region="gov,us5,ap1" >}}

이 사이트에서는 TCP 엔드포인트가 지원되지 않습니다.

[1]: /ko/help
{{< /site-region >}}


[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/logs/livetail
{{% /tab %}}
{{< /tabs >}}

**참고**:

* HTTPS API는 최대 1MB 크기의 로그를 지원합니다. 그러나 최적의 성능을 위해서는 개별 로그가 25K바이트를 초과하지 않는 것이 좋습니다. 로깅을 위해 Datadog Agent를 사용하는 경우 로그를 256kB(256000바이트)로 분할하도록 구성됩니다.
* 로그 이벤트에는 태그가 100개 미만이어야 하며, 각 태그는 256자를 초과할 수 없고 하루에 최대 1,000만 개의 고유 태그를 사용할 수 있습니다.
* JSON 형식으로 변환된 로그 이벤트에는 256개 미만의 속성이 포함되어야 합니다. 각 속성의 키는 50자 미만이어야 하고 20개 미만의 연속 수준에 중첩되어야 하며 패싯으로 승격된 경우 해당 값은 1024자 미만이어야 합니다.
* 로그 이벤트는 과거 최대 18시간의 [타임스탬프][14]와 함께 제출될 수 있습니다.

이러한 제한을 준수하지 않는 로그 이벤트는 시스템에 의해 변환되거나 잘릴 수 있으며, 제공된 시간 범위를 벗어나는 경우 색인이 생성되지 않을 수 있습니다. 그러나 Datadog은 가능한 한 많은 사용자 데이터를 보존하려고 노력합니다.

### 속성 및 태그

속성은 Log Explorer에서 필터링 및 검색에 사용되는 [로그 패싯][9]을 규정합니다. 예약된 속성과 표준 속성 목록을 알아보고 로그 속성과 별칭을 사용하여 명명 규칙을 지원하는 방법을 알아보려면 전용 [속성 및 별칭][10] 문서를 참조하세요.

#### 스택 추적에 대한 속성

스택 추적을 로깅할 때 Datadog 애플리케이션 내에 로거 이름, 현재 스레드, 오류 유형, 스택 추적 자체와 같은 전용 UI 표시가 있는 특정 속성이 있습니다.

{{< img src="logs/log_collection/stack_trace.png" style="width:80%;" alt="Attributes for a parsed stack trace" >}}

이러한 기능을 활성화하려면 다음 속성 이름을 사용합니다.

| 속성            | 설명                                                             |
|----------------------|-------------------------------------------------------------------------|
| `logger.name`        | 로거의 이름                                                      |
| `logger.thread_name` | 현재 스레드의 이름                                              |
| `error.stack`        | 실제 스택 추적                                                      |
| `error.message`      | 스택 추적에 포함된 오류 메시지                              |
| `error.kind`         | 오류의 유형 또는 "종류"(예: "Exception" 또는 "OSError") |

**참고**: 기본적으로 통합 파이프라인은 기본 로깅 라이브러리 파라미터를 해당 특정 속성으로 리매핑하고 스택 추적 또는 트레이스백을 파싱하여 자동으로 `error.message`와 `error.kind`를 추출하려고 시도합니다.

자세한 내용은 전체 [소스 코드 속성 문서][11]를 참조하세요.

## 다음 단계

로그가 수집되고 수집되면 **Log Explorer**에서 사용할 수 있습니다. Log Explorer는 로그에 대한 알림을 검색하고 강화하며, 확인할 수 있는 곳입니다. 로그 데이터 분석을 시작하려면 [Log Explorer][12] 문서를 참조하거나 아래의 추가 로그 관리 문서를 참조하세요.

{{< img src="logs/explore.png" alt="Logs appearing in the Log Explorer" style="width:100%" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}
<br>
*Logging without Limits는 Datadog, Inc.의 상표입니다.

[1]: /ko/integrations/rsyslog/
[2]: /ko/integrations/syslog_ng/
[3]: /ko/integrations/nxlog/
[4]: /ko/integrations/fluentd/#log-collection
[5]: /ko/integrations/logstash/#log-collection
[6]: /ko/data_security/logs/#information-security
[7]: /ko/agent/logs/#send-logs-over-https
[8]: /ko/api/v1/logs/#send-logs
[9]: /ko/logs/explorer/facets/
[10]: /ko/logs/log_configuration/attributes_naming_convention
[11]: /ko/logs/log_configuration/attributes_naming_convention/#source-code
[12]: /ko/logs/explore/
[13]: /ko/getting_started/site/
[14]: /ko/logs/log_configuration/pipelines/?tab=date#date-attribute