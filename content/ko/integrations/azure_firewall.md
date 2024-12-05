---
categories:
- azure
- cloud
- 네트워크
dependencies: []
description: 주요 Azure Firewall 메트릭을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/azure_firewall/
draft: false
git_integration_title: azure_firewall
has_logo: true
integration_id: ''
integration_title: Microsoft Azure Firewall
integration_version: ''
is_public: true
custom_kind: 통합
manifest_version: '1.0'
name: azure_firewall
public_title: Datadog-Microsoft Azure Firewall 통합
short_description: 주요 Azure Firewall 메트릭을 추적하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Azure Firewall은 Azure Virtual Network 리소스를 보호하는 데 사용되는 클라우드 기반 네트워크 보안입니다.

Datadog Azure 통합을 사용해 Firewall 메트릭을 수집할 수 있습니다.

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure_firewall" >}}


### 이벤트

Azure Firewall 통합에는 이벤트가 포함되지 않습니다.

### 서비스 검사

Azure Firewall 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_firewall/azure_firewall_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/