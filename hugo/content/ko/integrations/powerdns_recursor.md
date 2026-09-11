---
app_id: powerdns
app_uuid: 44e491e1-f7c3-447a-b597-e740196479e0
assets:
  dashboards:
    powerdns: assets/dashboards/powerdns_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: powerdns.recursor.questions
      metadata_path: metadata.csv
      prefix: powerdns.
    process_signatures:
    - pdns_server
    - systemctl start pdns@
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 144
    source_type_name: PowerDNS Recursor
  saved_views:
    powerdns_processes: assets/saved_views/powerdns_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- caching
- log collection
- network
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/powerdns_recursor/README.md
display_on_public_website: true
draft: false
git_integration_title: powerdns_recursor
integration_id: powerdns
integration_title: Power DNS Recursor
integration_version: 4.1.0
is_public: true
manifest_version: 2.0.0
name: powerdns_recursor
public_title: Power DNS Recursor
short_description: PowerDNS Recursor를 오가는 비정상적인 트래픽을 모니터링하세요.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Category::Log Collection
  - Category::Network
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: PowerDNS Recursor를 오가는 비정상적인 트래픽을 모니터링하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Power DNS Recursor
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

PowerDNS Recursor의 성능을 추적하고 비정상적인 트래픽을 모니터링하세요. 이 Agent 점검은 다음을 포함하여 Recursor에서 다양한 메트릭을 수집합니다.

- 쿼리 답변 시간-1밀리초 미만, 10밀리초, 100밀리초, 1초 또는 1초보다 긴 응답이 몇 개인지 확인합니다.
- 쿼리 시간 초과.
- 캐시 히트 및 미스.
- 유형별 답변률: SRVFAIL, NXDOMAIN, NOERROR.
- 무시되거나 드롭된 패킷.

이외에 다수가 있습니다.

## 설정

### 설치

PowerDNS Recursor 점검은 [Datadog Agent][1] 패키지에 포함되어 있으므로 다른 것을 설치할 필요가 없습니다.

### 구성

#### PowerDNS 준비

이 점검은 PowerDNS Recursor의 통계 API를 사용하여 성능 통계를 수집합니다. 4.1 이전의 pdns_recursor 버전은 기본적으로 통계 API를 활성화하지 않습니다. 이전 버전을 실행 중인 경우 다음을 recursor 구성 파일에 추가하여 활성화합니다(예: `/etc/powerdns/recursor.conf`).

```conf
webserver=yes
api-key=changeme             # v4.0 이상만 사용 가능
webserver-readonly=yes       # 기본값 no
#webserver-port=8081         # 기본값 8082
#webserver-address=0.0.0.0   # 기본값 127.0.0.1
```

pdns_recursor 3.x를 실행하는 경우 다음 옵션 이름 앞에 `experimental-`을 추가합니다 (예: `experimental-webserver=yes`).

pdns_recursor 4.1 이상이라면 `api-key`를 설정하기만 하면 됩니다.

통계 API를 활성화하려면 recursor를 다시 시작합니다.

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 대해 이 점검을 구성하려면:

1. [Agent 구성 디렉토리][1] 루트의 `conf.d/` 폴더에 있는 `powerdns_recursor.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 구성 옵션은 [샘플 powerdns_recursor.d/conf.yaml][2]을 참조하세요:

   ```yaml
   init_config:

   instances:
     ## @param host - string - required
     ## Host running the recursor.
     #
     - host: 127.0.0.1

       ## @param port - integer - required
       ## Recursor web server port.
       #
       port: 8082

       ## @param api_key - string - required
       ## Recursor web server api key.
       #
       api_key: "<POWERDNS_API_KEY>"

       ## @param version - integer - required - default: 3
       ## Version 3 or 4 of PowerDNS Recursor to connect to.
       ## The PowerDNS Recursor in v4 has a production ready web server that allows for
       ## statistics gathering. In version 3.x the server was marked as experimental.
       ##
       ## As the server was marked as experimental in version 3 many of the metrics have
       ## changed names and the API structure (paths) have also changed. With these changes
       ## there has been a need to separate the two concerns. The check now has a key value
       ## version: which if set to version 4 queries with the correct API path on the
       ## non-experimental web server.
       ##
       ## https://doc.powerdns.com/md/httpapi/api_spec/#url-apiv1serversserver95idstatistics
       #
       version: 3
   ```

2. [에이전트를 재시작][3]하세요.

##### 로그 수집

1. Datadog Agent에서는 로그 수집이 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화해야 합니다.

   ```yaml
   logs_enabled: true
   ```

2. 다음을 실행해 `systemd-journal` 그룹에 `dd-agent` 사용자를 추가하세요.
   ```text
   usermod -a -G systemd-journal dd-agent
   ```

3. PowerDNS Recursor 로그 수집을 시작하려면 이 구성 블록을 `powerdns_recursor.d/conf.yaml` 파일에 추가하세요.

   ```yaml
   logs:
     - type: journald
       source: powerdns
   ```

    사용 가능한 모든 구성 옵션은 [샘플 powerdns_recursor.d/conf.yaml][2]을 참조하세요.

4. [에이전트를 재시작][3]하세요.

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/powerdns_recursor/datadog_checks/powerdns_recursor/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "컨테이너화" %}}

#### 컨테이너화

컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][1]에 다음 파라미터를 적용하는 방법이 안내되어 있습니다.

| 파라미터            | 값                                                                            |
| -------------------- | -------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `powerdns_recursor`                                                              |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                                                                    |
| `<INSTANCE_CONFIG>`  | `{"host":"%%host%%", "port":8082, "api_key":"<POWERDNS_API_KEY>", "version": 3}` |

##### 로그 수집

Datadog Agent에서 로그 수집은 기본값으로 비활성화되어 있습니다. 이를 활성화하려면 [쿠버네티스(Kubernetes) 로그 수집][2]을 참조하세요.

| 파라미터      | 값                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "powerdns"}`                  |

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 검증

[Agent의 `status` 하위 명령을 실행][2]하고 Checks 섹션에서 `powerdns_recursor`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "powerdns" >}}


### 이벤트

PowerDNS Recursor 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "powerdns" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.



[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/ko/help/
