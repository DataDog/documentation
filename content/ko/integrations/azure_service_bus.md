---
categories:
- cloud
- azure
dependencies: []
description: Azure Service Bus의 핵심 메트릭 추적하기.
doc_link: https://docs.datadoghq.com/integrations/azure_service_bus/
draft: false
git_integration_title: azure_service_bus
has_logo: true
integration_id: azure-service-bus
integration_title: Microsoft Azure Service Bus
integration_version: ''
is_public: true
custom_kind: 통합
manifest_version: '1.0'
name: azure_service_bus
public_title: Datadog-Microsoft Azure Service Bus 통합
short_description: Azure Service Bus의 핵심 메트릭 추적하기.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Microsoft Azure Service Bus는 완전관리형 엔터프라이즈 통합 메시지 브로커입니다.

Azure Service Bus 메트릭을 얻으면 다음을 할 수 있습니다.

- Azure Service Bus의 성능을 가시화
- Azure Service Bus의 성능과 애플리케이션의 상관 관계 파악

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure_service_bus" >}}


### 이벤트

Azure Service Bus 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 검사

Azure Service Bus 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_service_bus/azure_service_bus_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/