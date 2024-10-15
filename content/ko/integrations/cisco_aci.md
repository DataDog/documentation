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
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- network
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cisco_aci/README.md
display_on_public_website: true
draft: false
git_integration_title: cisco_aci
integration_id: cisco-aci
integration_title: CiscoACI
integration_version: 2.7.0
is_public: true
custom_kind: integration
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
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Network
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

## 설정

### 설치

Cisco ACI 점검은 에이전트를 포함하므로 네트워크에서 서버에 [에이전트를 설치][1]하기만 하면 됩니다.

### 설정

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 대해 이 점검을 구성하려면:

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
   ```

   *참고*: 통합에 대한 모든 테넌트를 지정하여 애플리케이션, EPG 등에서 메트릭을 수집합니다.

2. [에이전트를 재시작][3]하여 Cisco ACI 메트릭을 Datadog에 메트릭 전송을 시작합니다.

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/cisco_aci/datadog_checks/cisco_aci/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "컨테이너화" %}}

#### 컨테이너화된 환경

컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][1]에 다음 파라미터를 적용하는 방법이 안내되어 있습니다.

| 파라미터            | 값                                                                  |
| -------------------- | ---------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `cisco_aci`                                                            |
| `<INIT_CONFIG>`      | 비워두거나 `{}`                                                          |
| `<INSTANCE_CONFIG>`  | `{"aci_url":"%%host%%", "username":"<USERNAME>", "pwd": "<PASSWORD>"}` |

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### 검증

[에이전트 `status` 상태 하위 명령을 실행하고][5] 점검 섹션에서 `cisco_aci`를 찾으세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "cisco_aci" >}}


### 이벤트

Cisco ACI 점검은 이벤트로 테넌트 오류를 전송합니다.

### 서비스 검사
{{< get-service-checks-from-git "cisco_aci" >}}


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

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/ko/help/