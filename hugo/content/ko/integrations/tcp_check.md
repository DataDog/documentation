---
app_id: 시스템
app_uuid: a675760c-00f7-4bf3-bd0e-c7edfb0e7e82
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: network.tcp.can_connect
      metadata_path: metadata.csv
      prefix: network.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: TCP
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- network
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/tcp_check/README.md
display_on_public_website: true
draft: false
git_integration_title: tcp_check
integration_id: 시스템
integration_title: TCP Check
integration_version: 6.0.0
is_public: true
manifest_version: 2.0.0
name: tcp_check
public_title: TCP Check
short_description: 원격 호스트 TCP 연결을 모니터합니다.
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Network
  - Offering::Integration
  configuration: README.md#Setup
  description: 원격 호스트에 대한 TCP 연결을 모니터합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: TCP Check
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Network Graph][1]

## 개요

모든 호스트 및 포트에 대한 TCP 연결 및 응답 시간을 모니터합니다.

## 설정

### 설치

TCP 점검은 [Datadog Agent][2] 패키지에 포함되어 있습니다. 서버에 추가 설치가 필요하지 않습니다.

메트릭 검사 대부분은 모니터되는 서비스와 동일한 호스트에서 실행하는 것이 가장 좋습니다. 그러나 모니터되는 TCP 서비스를 실행하지 않는 호스트에서 이 검사를 실행하여 원격 연결을 테스트할 것을 권장합니다.

### 구성

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 대해 이 점검을 구성하려면:

[Agent 설정 디렉터리][1] 루트에 있는 `conf.d/` 폴더에서 `tcp_check.d/conf.yaml`을 편집합니다. 사용 가능한 모든 설정 옵션은 [샘플 tcp_check.d/conf.yaml][2]을 참조하세요.

```yaml
init_config:

instances:
  - name: SSH check
    host: jumphost.example.com # or an IPv4/IPv6 address
    port: 22
    collect_response_time: true # to collect network.tcp.response_time. Default is false.
```

구성 옵션

- `name` (필수) - 서비스 이름입니다. `instance:<name>` 태그가 포함됩니다. **참고**: 공백이나 대시는 밑줄로 변환됩니다.
- `host` (필수) - 검사할 호스트입니다. `url:<host>:<port>` 태그가 포함됩니다.
- `port` (필수) - 검사할 포트입니다. `url:<host>:<port>` 태그가 포함됩니다.
- `timeout` (옵션) - 검사 타임아웃입니다. 기본값은 10초입니다.
- `collect_response_time` (옵션) - 기본값은 false로, 이는 응답 시간 메트릭이 수집되지 않음을 의미합니다. true로 설정하면 반환되는 메트릭은 `network.tcp.response_time`입니다.
- `tags` (옵션) - 메트릭에 할당할 태그입니다.

[Agent를 재시작][3]하여 Datadog에 TCP 서비스 점검과 응답 시간을 전송합니다.

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/tcp_check/datadog_checks/tcp_check/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### 컨테이너화

컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][1]에 다음 파라미터를 적용하는 방법이 안내되어 있습니다.

| 파라미터            | 값                                                                         |
| -------------------- | ----------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `tcp_check`                                                                   |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                                                                 |
| `<INSTANCE_CONFIG>`  | `{"name": "<TCP_CHECK_INSTANCE_NAME>", "host":"%%host%%", "port":"%%port%%"}` |

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### 검증

[Agent `status` 하위 명령을 실행][3]하고 Checks 섹션에서 `tcp_check`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "tcp_check" >}}


### 이벤트

TCP 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "tcp_check" >}}


**참고:** 해당 서비스 점검에 대한 경고를 설정하려면 [Network Monitor][4]를 생성하세요.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/tcp_check/images/netgraphs.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ko/monitors/monitor_types/network/?tab=checkalert
[5]: https://docs.datadoghq.com/ko/help/