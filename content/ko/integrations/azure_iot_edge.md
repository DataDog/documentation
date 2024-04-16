---
app_id: azure-iot-edge
app_uuid: 9c4d7121-eed1-429c-bd86-18952b11d3f5
assets:
  dashboards:
    azure_iot_edge: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: azure.iot_edge.edge_agent.iotedged_uptime_seconds
      metadata_path: metadata.csv
      prefix: azure.iot_edge.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10125
    source_type_name: Azure IoT Edge
  logs:
    source: azure.iot_edge
  monitors:
    Disk usage: assets/monitors/disk_usage.json
    Edge Hub retries: assets/monitors/edgehub_retries.json
    IoT Hub syncs: assets/monitors/iothub_syncs.json
    Memory usage: assets/monitors/memory_usage.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- azure
- iot
- 로그 수집
- 네트워크
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/azure_iot_edge/README.md
display_on_public_website: true
draft: false
git_integration_title: azure_iot_edge
integration_id: azure-iot-edge
integration_title: Azure IoT Edge
integration_version: 4.2.0
is_public: true
kind: 통합
manifest_version: 2.0.0
name: azure_iot_edge
public_title: Azure IoT Edge
short_description: Azure IoT Edge 디바이스 및 모듈의 상태와 성능을 모니터링합니다.
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::IoT
  - Category::Log Collection
  - Category::Network
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Azure IoT Edge 디바이스 및 모듈의 상태와 성능을 모니터링합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure IoT Edge
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

[Azure IoT Edge][1]는 표준 컨테이너를 사용하여 Internet of Things (IoT) Edge 디바이스에서 실행하기 위해 클라우드 워크로드를 배포하는 완전관리형 서비스입니다.

Datadog-Azure IoT Edge 통합을 사용하여 IoT Edge 디바이스에서 메트릭 및 상태를 수집합니다.

**참고**: 통합을 위해 IoT Edge 런타임 버전 1.0.10 이상이 필요합니다.

## 설정

아래 지침에 따라 디바이스 호스트에서 실행되는 IoT Edge 디바이스에 대해 이 검사를 설치하고 설정합니다.

### 설치

Azure IoT Edge 검사는 [Datadog Agent][2] 패키지에 포함되어 있습니다.

디바이스에 추가 설치가 필요하지 않습니다.

### 설정

Agent가 커스텀 모듈로 실행되도록 IoT Edge 디바이스를 설정합니다. Azure IoT Edge용 커스텀 모듈 설치 및 작업에 대한 자세한 내용은 [Azure IoT Edge 모듈 배포][3]에 대한 Microsoft 설명서를 참조하세요.

IoT Edge 메트릭 수집을 위해 IoT Edge 디바이스, 런타임 모듈 및  Datadog Agen를 설정하려면 아래 단계를 따르세요.

1. **Edge Agent** 런타임 모듈을 다음과 같이 설정합니다.
    - 이미지 버전은 `1.0.10` 이상이어야 합니다.
    - "Create Options"에서 다음 `Labels`를 추가하고 `com.datadoghq.ad.instances` 레이블을 적절하게 편집합니다. 가능한 모든 설정 옵션은 [샘플 azure_iot_edge.d/conf.yaml][4]를 참조하세요. 레이블 기반 통합 설정에 대한 자세한 내용은 [Docker 통합 오토디스커버리][5] 문서를 참조하세요.

        ```json
        "Labels": {
            "com.datadoghq.ad.check_names": "[\"azure_iot_edge\"]",
            "com.datadoghq.ad.init_configs": "[{}]",
            "com.datadoghq.ad.instances": "[{\"edge_hub_prometheus_url\": \"http://edgeHub:9600/metrics\", \"edge_agent_prometheus_url\": \"http://edgeAgent:9600/metrics\"}]"
        }
        ```

2. **Edge Hub** 런타임 모듈을 다음과 같이 설정합니다.
    - 이미지 버전은 `1.0.10` 이상이어야 합니다.

3. Datadog Agent를 **커스텀 모듈**로 설치 및 설정합니다.
    - 모듈 이름을 지정합니다 (예: `datadog-agent`).
    - Agent 이미지 URI를 지정합니다 (예: `datadog/agent:7`).
    - "Environment Variables"에서 `DD_API_KEY`를 설정합니다. 여기에서 추가 Agent를 설정할 수도 있습니다([Agent 환경 변수][6] 참조).
    - "Container Create Options"에서 디바이스 OS에 따라 다음 설정을 입력합니다. **참고**: `NetworkId`는 디바이스 `config.yaml` 파일에 설정된 네트워크 이름과 일치해야 합니다.

        - Linux:
            ```json
            {
                "HostConfig": {
                    "NetworkMode": "default",
                    "Env": ["NetworkId=azure-iot-edge"],
                    "Binds": ["/var/run/docker.sock:/var/run/docker.sock"]
                }
            }
            ```
        - Windows:
            ```json
            {
                "HostConfig": {
                    "NetworkMode": "default",
                    "Env": ["NetworkId=nat"],
                    "Binds": ["//./pipe/iotedge_moby_engine:/./pipe/docker_engine"]
                }
            }
            ```

    - Datadog Agent 커스텀 모듈을 저장합니다.

4. 디바이스 설정에 대한 변경 사항을 저장하고 배포합니다.

#### 로그 수집

1. 로그 수집은 Datadog Agent에서 기본적으로 비활성화되어 있습니다. Datadog Agent 커스텀 모듈을 설정하여 활성화합니다.
    - "Environment Variables"에서 `DD_LOGS_ENABLED` 환경 변수를 설정합니다.

        ```yaml
        DD_LOGS_ENABLED: true
        ```

2. **Edge Agent** 및 **Edge Hub** 모듈을 설정합니다. "Create Options"에서 다음 레이블을 추가합니다.

    ```json
    "Labels": {
        "com.datadoghq.ad.logs": "[{\"source\": \"azure.iot_edge\", \"service\": \"<SERVICE>\"}]",
        "...": "..."
    }
    ```

   환경에 따라 `service`를 변경합니다.

   로그를 수집하려는 커스텀 모듈에 대해 이 작업을 반복합니다.

3. 디바이스 설정에 대한 변경 사항을 저장하고 배포합니다.

### 검증

Agent가 디바이스에 배포되면 [Agent의 상태 하위 명령을 실행][7]하고 Checks 섹션에서 `azure_iot_edge`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure_iot_edge" >}}


### 이벤트

Azure IoT Edge는 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "azure_iot_edge" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][10]에 문의해주세요.

## 참고 자료

- [Datadog으로 Azure IoT Edge 모니터링][11]

[1]: https://azure.microsoft.com/en-us/services/iot-edge/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.microsoft.com/en-us/azure/iot-edge/how-to-deploy-modules-portal
[4]: https://github.com/DataDog/integrations-core/blob/master/azure_iot_edge/datadog_checks/azure_iot_edge/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ko/agent/docker/integrations/
[6]: https://docs.datadoghq.com/ko/agent/guide/environment-variables/
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/azure_iot_edge/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/azure_iot_edge/assets/service_checks.json
[10]: https://docs.datadoghq.com/ko/help/
[11]: https://www.datadoghq.com/blog/monitor-azure-iot-edge-with-datadog/