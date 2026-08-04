---
app_id: squid
app_uuid: de18c581-69ee-48cf-ba23-7794bfb7a4bd
assets:
  dashboards:
    Squid: assets/dashboards/squid.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: squid.cachemgr.cpu_time
      metadata_path: metadata.csv
      prefix: squid.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10022
    source_type_name: Squid
  logs:
    source: squid
  monitors:
    CPU usage exceeded: assets/monitors/cpu_usage_exceeded.json
    High latency requests: assets/monitors/high_latency_requests.json
    High rate of client HTTP errors: assets/monitors/high_rate_of_client_http_errors.json
    High rate of server errors: assets/monitors/high_rate_of_server_errors.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- caching
- log collection
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/squid/README.md
display_on_public_website: true
draft: false
git_integration_title: squid
integration_id: squid
integration_title: Squid
integration_version: 4.1.0
is_public: true
manifest_version: 2.0.0
name: squid
public_title: Squid
short_description: Datadog으로 Squid 캐시 서버의 메트릭을 추적하세요.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Category::Log Collection
  - Supported OS:Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Datadog으로 Squid 캐시 서버의 메트릭을 추적하세요.
  media:
  - caption: Squid
    image_url: images/squid.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Squid
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요
[Squid][1]는 네트워크에서 클라이언트와 서버 사이의 중개 역할을 하는 오픈 소스 캐싱 및 포워딩 웹 프록시 서버입니다. 클라이언트가 서버의 웹사이트, 파일, 기타 콘텐츠 등 다양한 인터넷 리소스에 액세스할 수 있도록 하는 게이트웨이 역할을 합니다.

본 통합으로 Squid 로그에 대한 보강 및 시각화 기능을 제공합니다. 즉시 사용 가능한 대시보드와 탐지 규칙을 통해 Squid 로그 분석에 관한 자세한 인사이트를 시각화하여 탐지 및 대응 기능을 향상합니다.

또한 다음 사항에 관한 사전 알림을 위해 미리 설정된 모니터가 포함되어 있습니다.

1. 높은 서버 오류 발생률
2. CPU 사용량 초과
3. 레이턴시가 긴 요청
4. 높은 클라이언트 HTTP 오류 발생률


이 점검은 Datadog Agent를 통해 Cache Manager의 [Squid][1] 메트릭을 모니터링합니다.

## 설정

### 설치

Agent Squid 점검은 [Datadog Agent][2] 패키지에 포함되어 있습니다. Squid 서버에 추가 설치가 필요하지 않습니다.

### 설정

{{< tabs >}}
{{% tab "호스트" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

1. [Agent 구성 디렉터리][1] 루트의 `conf.d/` 폴더에 있는 `squid.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 구성 옵션은 [샘플 squid.d/conf.yaml][2]을 참조하세요.

2. [에이전트를 다시 시작합니다][3].

##### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

1. 로그 수집은 Datadog 에이전트에서 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

2. `squid.d/conf.yaml` 파일의 하단에서 이 구성 블록의 주석 처리를 제거하고 편집합니다.

   ```yaml
   logs:
     - type: file
       path: /var/log/squid/cache.log
       service: "<SERVICE-NAME>"
       source: squid
     - type: file
       path: /var/log/squid/access.log
       service: "<SERVICE-NAME>"
       source: squid
   ```

   `path` 및 `service` 파라미터 값을 변경하고 환경에 맞게 설정합니다.

3. [에이전트를 다시 시작합니다][3].

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/squid/datadog_checks/squid/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "컨테이너화된 환경" %}}

#### 컨테이너화된 환경

컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][1]에 아래 파라미터를 적용하는 방법이 안내되어 있습니다.

##### 메트릭 수집

| 파라미터            | 값                                                                  |
| -------------------- | ---------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `squid`                                                                |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                                                          |
| `<INSTANCE_CONFIG>`  | `{"name": "<SQUID_INSTANCE_NAME>", "host": "%%host%%", "port":"3128"}` |

##### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

Datadog 에이전트에서 로그 수집은 기본값으로 비활성화되어 있습니다. 이를 활성화하려면 [쿠버네티스(Kubernetes) 로그 수집][2]을 참조하세요.

| 파라미터      | 값                                               |
| -------------- | --------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "squid", "service": "<YOUR_APP_NAME>"}` |

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/log/?tab=containerinstallation#setup
{{% /tab %}}
{{< /tabs >}}

### 검증

[Agent의 상태 하위 명령을 실행][3]하고 Checks 섹션에서 `squid`를 찾으세요.

## 수집한 데이터

### 로그
Squid 통합은 액세스 및 캐시 로그를 수집합니다.

#### 지원되는 액세스 로그 형식
|이름                 | 형식 사양|
|---------------------|------------------------------|
| squid      |`%ts.%03tu %6tr %>a %Ss/%03>Hs %<st %rm %ru %[un %Sh/%<a %mt`|
| 공통     |`%>a - %[un [%tl] "%rm %ru HTTP/%rv" %>Hs %<st %Ss:%Sh`|
| 결합   |`%>a - %[un [%tl] "%rm %ru HTTP/%rv" %>Hs %<st "%{Referer}>h" "%{User-Agent}>h" %Ss:%Sh`|

자세한 내용은 [Squid 로그 형식][4]을 참조하세요.

**참고**: 기본 `logformat` 유형은 `squid`입니다. `/etc/squid/squid.conf`에서 지원되는 로그 형식을 업데이트한 다음 Squid를 다시 시작할 수 있습니다.

`logformat`에 `combined` 유형을 사용하려면 `/etc/squid/squid.conf` 파일에 다음 줄을 추가합니다.

```
logformat combined   %>a %[ui %[un [%tl] "%rm %ru HTTP/%rv" %>Hs %<st "%{Referer}>h" "%{User-Agent}>h" %Ss:%Sh
access_log /var/log/squid/access.log combined
```
그런 다음 아래 명령으로 `squid` 서비스를 다시 시작합니다.

```shell
sudo systemctl restart squid
```  

**참고**:

- `Top Avg Request Duration by URL Host` 패널은 `logformat`의 `squid` 유형이 구성된 경우에만 로드됩니다.
- `Top Browsers` 및 `Top HTTP Referrer` 패널은 `logformat`의 `combined` 유형이 구성된 경우에만 로드됩니다.


### 메트릭
{{< get-metrics-from-git "squid" >}}


### 이벤트

Squid 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "squid" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.



[1]: http://www.squid-cache.org/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[4]: https://www.squid-cache.org/Doc/config/logformat/
[5]: https://docs.datadoghq.com/ko/help/