---
categories:
- azure
- cloud
- iot
- provisioning
dependencies: []
description: Azure IOT의 핵심 메트릭 추적하기.
doc_link: https://docs.datadoghq.com/integrations/azure_iot_hub/
draft: false
git_integration_title: azure_iot_hub
has_logo: true
integration_id: azure-iot-hub
integration_title: Microsoft Azure IOT Hub
integration_version: ''
is_public: true
kind: 통합
manifest_version: '1.0'
name: azure_iot_hub
public_title: Datadog-Microsoft Azure IOT Hub 통합
short_description: Azure IOT의 핵심 메트릭 추적하기.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Azure IOT Hub는 수백 개의 IoT 디바이스 간에 신뢰할 수 있는 양방향 통신을 제공하는 완전 관리형 서비스입니다.

Azure IOT Hub 메트릭을 얻으면 다음을 할 수 있습니다.

- IOT Hubs의 성능을 가시화
- IOT Hubs의 성능과 애플리케이션의 상관 관계 파악

Azure Provisioning Service는 사람의 개입 없이 실시간 및 자동으로 적합한 IoT 허브에 프로비저닝하도록 도와주는 IoT Hub용 도우미 서비스입니다. 이에 따라 고객이 규모 조정이 가능하면서도 안전하게 수백 개의 디바이스를 프로비저닝할 수 있습니다.

## 설정

### 설치

아직 설정하지 않았다면, [먼저 Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure_iot_hub" >}}


### 이벤트

Azure IoT Hub 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 검사

Azure IoT Hub 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_iot_hub/azure_iot_hub_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/