---
categories:
- azure
- cloud
- 네트워크
dependencies: []
description: Azure Relay의 핵심 메트릭 추적하기.
doc_link: https://docs.datadoghq.com/integrations/azure_relay/
draft: false
git_integration_title: azure_relay
has_logo: true
integration_id: azure-relay
integration_title: Microsoft Azure Relay
integration_version: ''
is_public: true
custom_kind: 통합
manifest_version: '1.0'
name: azure_relay
public_title: Datadog-Microsoft Azure Relay 통합
short_description: Azure Relay의 핵심 메트릭 추적하기.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Azure Relay 서비스를 이용하면 기업 네트워크에서 실행 중인 서비스를 공용 클라우드에 안전하게 노출시킬 수 있습니다. 방화벽에 포트를 열거나 기업 네트워크 인프라스트럭처에 지장을 주는 변경을 할 필요가 없습니다.

Datadog Azure 통합을 사용해 Azure Relay 메트릭을 수집할 수 있습니다.

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure_relay" >}}


### 이벤트

Azure Relay 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 검사

Azure Relay 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_relay/azure_relay_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/