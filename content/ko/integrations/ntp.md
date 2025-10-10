---
app_id: ntp
app_uuid: 399b74d9-ece5-4517-ae16-c05cac6911b2
assets:
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: ntp.offset
      metadata_path: metadata.csv
      prefix: ntp.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: NTP
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- network
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ntp/README.md
display_on_public_website: true
draft: false
git_integration_title: ntp
integration_id: ntp
integration_title: NTP
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: ntp
public_title: NTP
short_description: 선택한 NTP 서버와 내 호스트의 동기화가 어긋날 경우 알림 받기
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
  description: 선택한 NTP 서버와 내 호스트의 동기화가 어긋날 경우 알림 받기
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: NTP
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

NTP(Network Time Protocol) 통합은 기본적으로 활성화되어 있고, 15분마다 NTP 서버에서 오프셋 시간을 보고합니다. 로컬 에이전트 시간이 모니터링하는 Datadog 서비스 및 다른 호스트와 15초 이상 차이가 날 경우 다음과 같은 현상이 발생할 수 있습니다.

- 부정확한 경고 트리거
- 메트릭 지연
- 메트릭 그래프의 격차

기본적으로 점검에서 에이전트가 실행되는 클라우드 제공업체를 감지하고, 사용 가능할 경우 해당 제공업체의 프라이빗 NTP 서버를 사용합니다. 클라우드 제공업체 감지에 실패할 경우 에이전트는 아래의 기본 NTP 서버를 사용합니다.

- `0.datadog.pool.ntp.org`
- `1.datadog.pool.ntp.org`
- `2.datadog.pool.ntp.org`
- `3.datadog.pool.ntp.org`

**참고:** NTP 요청은 프록시 설정을 지원하지 않습니다.

## 설정

### 설치

NTP 검사는 [Datadog 에이전트][1] 패키지에 포함되어 있으므로 서버에 다른 것을 설치할 필요가 없습니다.

### 구성

{{< tabs >}}
{{% tab "호스트" %}}

#### 호스트

기본적으로 에이전트에서 NTP 점검이 활성화되어 있습니다. 직접 구성하고 싶을 경우에는 [에이전트 구성 디렉터리][1] 루트에 있는 `conf.d/` 폴더에서 `ntp.d/conf.yaml` 파일을 편집할 수 있습니다. 사용할 수 있는 구성 옵션 전체를 보려면 [ntp.d/conf.yaml 샘플][2]을 참고하세요.

로컬 서버의 시각이 Datadog NTP 서버와 비교했을 때 허용 범위임을 Agent가 확인할 수 있도록, 포트 `123`을 경유하는 아웃바운드 UDP 트래픽을 허용해야 합니다.

**참고**: Datadog-NTP 점검 구성 파일을 편집한 후 구성 변경 사항을 적용하려면 [에이전트를 재시작][3]해야 합니다.

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/ntp.d/conf.yaml.default
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}

{{% tab "컨테이너화" %}}

#### 컨테이너화된 환경

컨테이너화된 환경의 경우, 아래 파라미터를 적용하려면 [Autodiscovery 구성][1]과 관련한 설명서를 참고하세요. 사용 가능한 모든 설정 옵션은 [ntp.d/conf.yaml][2] 샘플을 참고하세요.

##### 메트릭 수집

| 파라미터            | 값                        |
|----------------------|------------------------------|
| `<INTEGRATION_NAME>` | `["ntp"]`                    |
| `<INIT_CONFIG>`      | `[{}]`                       |
| `<INSTANCE_CONFIG>`  | `[{"host": "<NTP_SERVER>"}]` |

[1]: https://docs.datadoghq.com/ko/containers/kubernetes/integrations/?tab=annotations#configuration
[2]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/ntp.d/conf.yaml.default
{{% /tab %}}

{{< /tabs >}}

### 검증

[에이전트의  상태 하위 명령을 실행][2]하고 점검 섹션에서 `status`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "ntp" >}}


### 이벤트

NTP 점검에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "ntp" >}}


## 트러블슈팅
도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/ko/help/