---
categories:
- azure
- cloud
- log collection
- notifications
dependencies: []
description: 주요 Azure Event Hub 메트릭을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/azure_event_hub/
draft: false
git_integration_title: azure_event_hub
has_logo: true
integration_id: azure-event-hub
integration_title: Microsoft Azure Event Hub
integration_version: ''
is_public: true
custom_kind: 통합
manifest_version: '1.0'
name: azure_event_hub
public_title: Datadog-Microsoft Azure Event Hub 통합
short_description: 주요 Azure Event Hub 메트릭을 추적하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Azure Event Hub는 대규모 데이터 스트림 관리 서비스입니다.

Azure Event Hub에서 메트릭을 가져오면 다음을 수행할 수 있습니다.

- Event Hubs 성능 시각화.
- Event Hubs 성능과 애플리케이션의 상관 관계 파악.

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

### 메트릭 수집

[AWS 통합 타일][1]에서 메트릭 수집에 `Event Hub`가 체크되어 있는지 확인하세요.

### 로그 수집

Event Hubs에서 로그를 수집하려면 다음 프로세스를 따르세요.

- Azure Portal, Azure CLI 또는 Powershell에서 Azure Event Hub를 만듭니다.
- 이벤트 허브에서 Datadog으로 로그를 전달하는 Datadog-Azure Function을 설정합니다.
- Event Hubs 로그를 새로 생성된 Event Hub로 전달합니다.

자세한 지침은 기본 [Azure 로그 설명서][2]를 참조하세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure_event_hub" >}}


### 이벤트

Azure Event Hub 통합에는 이벤트가 포함되지 않습니다.

### 서비스 검사

Azure Event Hub 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][4]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://docs.datadoghq.com/ko/integrations/azure/#log-collection
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_event_hub/azure_event_hub_metadata.csv
[4]: https://docs.datadoghq.com/ko/help/