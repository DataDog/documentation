---
aliases:
- /ko/integrations/azure_applicationgateway
categories:
- cloud
- azure
custom_kind: 통합
dependencies: []
description: Azure Application Gateway의 핵심 메트릭 추적하기
doc_link: https://docs.datadoghq.com/integrations/azure_application_gateway/
draft: false
git_integration_title: azure_application_gateway
has_logo: true
integration_id: azure-applicationgateway
integration_title: Microsoft Azure Application Gateway
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_application_gateway
public_title: Datadog-Microsoft Azure Application Gateway 통합
short_description: Azure Application Gateway의 핵심 메트릭 추적하기
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Azure Application Gateway는 내 애플리케이션의 트래픽을 관리하도록 해주는 웹 트래픽 로드 밸런서입니다.

Datadog Azure 통합을 사용해 Azure Application Gateway 메트릭을 수집할 수 있습니다.

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure_application_gateway" >}}


### 이벤트

Azure Application Gateway 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Azure Application Gateway 통합에는 이벤트가 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_application_gateway/azure_application_gateway_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/