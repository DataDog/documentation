---
app_id: cisco-aci
app_uuid: fab40264-45aa-434b-9f9f-dc0ab609dd49
assets:
  dashboards:
    cisco_aci: assets/dashboards/cisco_aci_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: cisco_aci.fabric.node.health.cur
      metadata_path: metadata.csv
      prefix: cisco_aci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 210
    source_type_name: Cisco ACI
  logs:
    source: cisco-aci
  monitors:
    CPU usage is high for Cisco ACI device: assets/monitors/cpu_high.json
    Cisco ACI critical severity fault: assets/monitors/critical_fault.json
    Health score of device is critical: assets/monitors/critical_health_score.json
    Interface for a Cisco ACI device is down: assets/monitors/interface_down.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- network
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cisco_aci/README.md
display_on_public_website: true
draft: false
git_integration_title: cisco_aci
integration_id: cisco-aci
integration_title: CiscoACI
integration_version: 4.5.0
is_public: true
manifest_version: 2.0.0
name: cisco_aci
public_title: CiscoACI
short_description: Cisco ACI 성능과 사용량을 추적하세요.
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS:Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Log Collection
  - Category::네트워크
  - Offering::Integration
  configuration: README.md#Setup
  description: Cisco ACI 성능과 사용량을 추적하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: CiscoACI
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

Cisco ACI 통합을 통해 다음 작업을 실행할 수 있습니다.

- 네트워크 상태 및 건강 추적
- ACI 용량 추적
- 스위치 및 컨트롤러 모니터링
- [네트워크 디바이스 모니터링][1]을 통한 장치 모니터링 기능

## 설정

### 설치

Cisco ACI 점검은 에이전트를 포함하므로 네트워크에서 서버에 [에이전트를 설치][2]하기만 하면 됩니다.

### 설정

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

1. [에이전트의 설정 디렉터리][1] 루트에 있는 `conf.d/` 폴더에서 `cisco_aci.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 설정 옵션을 보려면 [샘플 cisco_aci.d/conf.yaml][2]을 참조하세요.

   ```yaml
   init_config:

   instances:
        ## @param aci_url - string - required
        ## URL to query to gather metrics.
        #
      - aci_url: http://localhost

        ## @param username - string - required
        ## Authentication can use either a user auth or a certificate.
        ## If using the user auth, enter the `username` and `pwd` configuration.
        #
        username: datadog

        ## @param pwd - string - required
        ## Authentication can use either a user auth or a certificate.
        ## If using the user auth, enter the `username` and `pwd` configuration.
        #
        pwd: <PWD>

        ## @param tenant - list of strings - optional
        ## List of tenants to collect metrics data from.
        #
        # tenant:
        #   - <TENANT_1>
        #   - <TENANT_2>

        ## @param send_ndm_metadata - boolean - optional - default: false
        ## Set to `true` to enable Network Device Monitoring metadata (for devices and interfaces) to be sent.
        #
        # send_ndm_metadata: false

        ## @param send_faultinst_faults - boolean - optional - default: false
        ## Set to `true` to enable collection of Cisco ACI faultInst faults as logs.
        #
        # send_faultinst_faults: false

        ## @param send_faultdelegate_faults - boolean - optional - default: false
        ## Set to `true` to enable collection of Cisco ACI faultDelegate faults as logs.
        #
        # send_faultdelegate_faults: false
   ```

   *참고*: 통합에 대한 모든 테넌트를 지정하여 애플리케이션, EPG 등에서 메트릭을 수집합니다.

2. [에이전트를 재시작][3]하여 Cisco ACI 메트릭을 Datadog에 메트릭 전송을 시작합니다.

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/cisco_aci/datadog_checks/cisco_aci/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### 컨테이너화된 환경

컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][1]에 아래 파라미터를 적용하는 방법이 안내되어 있습니다.

| 파라미터            | 값                                                                  |
| -------------------- | ---------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `cisco_aci`                                                            |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                                                          |
| `<INSTANCE_CONFIG>`  | `{"aci_url":"%%host%%", "username":"<USERNAME>", "pwd": "<PASSWORD>"}` |

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### 검증

[에이전트 `status` 상태 하위 명령을 실행하고][3] 점검 섹션에서 `cisco_aci`를 찾으세요.

## 벤더 프로필

본 통합에 대한 지원 공급업체의 구체적인 프로필은 [네트워크 공급업체][4] 페이지에서 확인할 수 있습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "cisco-aci" >}}


### 이벤트

Cisco ACI 점검은 이벤트로 테넌트 오류를 전송합니다.

### 서비스 점검
{{< get-service-checks-from-git "cisco-aci" >}}


## 트러블슈팅

### `cisco_aci.tenant.*` 메트릭 누락
`cisco_aci.tenant.*` 메트릭이 누락된 경우 `test/cisco_aci_query.py` 스크립트를 실행해 쿼리 테넌트 엔드포인트를 수동으로 쿼리할 수 있습니다.

설정 정보에서 `apic_url`, `apic_username` 및 `apic_password`를 수정하여 `apic_url`에 대한 테넌트 URL을 입력합니다.

cURLing에서 받은 출력이 `datadog_checks/cisco_aci/aci_metrics.py`에서 수집한 메트릭과 일치하는지 확인합니다. 일치하는 통계가 없는 경우 엔드포인트가 통합이 수집할 수 있는 통계를 내보내지 않았음을 의미합니다.

### 긴 실행 시간

이 점검은 메트릭 반환 전 나와 있는 엔드포인트, 앱, 및 테넌트 모두를 쿼리하므로 이 통합에 따라 실행 시간이 길 수 있습니다.

  ```yaml
    cisco_aci (2.2.0)
  -----------------
    Instance ID: cisco_aci:d3a2958f66f46212 [OK]
    Configuration Source: file:/etc/datadog-agent/conf.d/cisco_aci.d/conf.yaml
    Total Runs: 1
    Metric Samples: Last Run: 678, Total: 678
    Events: Last Run: 0, Total: 0
    Service Checks: Last Run: 1, Total: 1
    Average Execution Time : 28m20.95s
    Last Execution Date : 2023-01-04 15:58:04 CST / 2023-01-04 21:58:04 UTC (1672869484000)
    Last Successful Execution Date : 2023-01-04 15:58:04 CST / 2023-01-04 21:58:04 UTC (1672869484000)
  ```

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.


[1]: https://www.datadoghq.com/product/network-monitoring/network-device-monitoring/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ko/network_monitoring/devices/supported_devices/
[5]: https://docs.datadoghq.com/ko/help/