---
aliases:
- /ko/integrations/azure_networkinterface
categories:
- azure
- cloud
- 네트워크
dependencies: []
description: Azure Network Interface의 핵심 메트릭 추적하기.
doc_link: https://docs.datadoghq.com/integrations/azure_network_interface/
draft: false
git_integration_title: azure_network_interface
has_logo: true
integration_id: azure-networkinterface
integration_title: Microsoft Azure Network Interface
integration_version: ''
is_public: true
kind: 통합
manifest_version: '1.0'
name: azure_network_interface
public_title: Datadog-Microsoft Azure Network Interface 통합
short_description: Azure Network Interface의 핵심 메트릭 추적하기.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Azure Network Interface는 Azure Virtual Machine과 인터넷, Azure, 온프레미스 리소스가 통신하도록 도와주는 서비스입니다.

Datadog Azure 통합을 사용해 Azure Network Interface 메트릭을 수집할 수 있습니다.

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure_network_interface" >}}


### 이벤트

Azure Network Interface 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 검사

Azure Network Interface 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_network_interface/azure_network_interface_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/