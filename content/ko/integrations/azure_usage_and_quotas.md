---
categories:
- azure
- cloud
- 비용 관리
- 네트워크
dependencies: []
description: 구독에 따른 Azure 계산, 네트워크, 스토리지 리소스의 사전 구성된 제한량 추적하기
doc_link: https://docs.datadoghq.com/integrations/azure_usage_and_quotas/
draft: false
git_integration_title: azure_usage_and_quotas
has_logo: true
integration_id: azure-usage-and-quotas
integration_title: Microsoft Azure 사용량 및 할당량
integration_version: ''
is_public: true
kind: 통합
manifest_version: '1.0'
name: azure_usage_and_quotas
public_title: Datadog-Microsoft Azure 사용량 및 할당량 통합
short_description: Azure에 사전 구성된 제한량에 따라 사용량 추적하기.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Azure 구독에는 사전 구성된 리소스 제한량이 있습니다. 예상치 못한 프로비저닝 실패를 예방하려면 Azure 환경을 설계 및 규모 조정을 할 때 이 제한량을 염두에 두어야 합니다. Azure 사용량 및 할당량 메트릭을 얻으면 다음을 할 수 있습니다.

- 할당량 대비 컴퓨터, 네트워크, 스토리지 리소스 사용량 가시화
- 할당 제한량을 초과하지 않도록 하여 프로비저닝 실패 방지

## 설정

### 설치

아직 설정하지 않았다면, [먼저 Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure_usage_and_quotas" >}}


### 이벤트

Azure Quota 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 검사

Azure Quota 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_usage_and_quotas/azure_usage_and_quotas_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/