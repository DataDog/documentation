---
categories:
- 자동화
- azure
- cloud
custom_kind: 통합
dependencies: []
description: Azure Automation의 핵심 메트릭 추적하기
doc_link: https://docs.datadoghq.com/integrations/azure_automation/
draft: false
git_integration_title: azure_automation
has_logo: true
integration_id: azure-automation
integration_title: Microsoft Azure Automation
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_automation
public_title: Datadog-Microsoft Azure Automation 통합
short_description: Azure Automation의 핵심 메트릭 추적하기
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Azure Automation은 Azure와 Azure 외 환경 전반에 일관적인 관리가 가능하도록 도와주는 클라우드 기반 자동화 및 구성 서비스입니다.

Datadog Azure 통합을 사용해 Azure Automation 메트릭을 수집할 수 있습니다.

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure_automation" >}}


### 이벤트

Azure Automation 통합에는 이벤트가 포함되지 않습니다.

### 서비스 점검

Azure Automation 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_automation/azure_automation_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/