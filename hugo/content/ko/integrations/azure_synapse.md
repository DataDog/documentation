---
categories:
- cloud
- azure
custom_kind: integration
dependencies: []
description: 주요 Synapse 메트릭을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/azure_synapse/
draft: false
git_integration_title: azure_synapse
has_logo: true
integration_id: azure-synapse
integration_title: Microsoft Azure Synapse
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_synapse
public_title: Datadog-Microsoft Azure Synapse 통합
short_description: 주요 Azure Synapse 메트릭을 추적하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Azure Synapse Analytics는 데이터 통합, 엔터프라이즈 데이터 웨어하우징 및 빅 데이터 분석을 통합하는 분석 서비스입니다.

Datadog Azure 통합을 사용하여 Azure Synapse에서 메트릭을 수집하세요.

## 설정
### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터
### 메트릭
{{< get-metrics-from-git "azure_synapse" >}}


### 이벤트
 Azure Synapse 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검
Azure Synapse 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅
도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_synapse/azure_synapse_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/
