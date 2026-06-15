---
aliases:
- /ko/integrations/azure_containerservice
categories:
- 클라우드
- 컨테이너
- azure
custom_kind: 통합
dependencies: []
description: 핵심 Azure 쿠버네티스(Kubernetes) 서비스 메트릭 추적하기
doc_link: https://docs.datadoghq.com/integrations/azure_container_service/
draft: false
git_integration_title: azure_container_service
has_logo: true
integration_id: azure-containerservice
integration_title: Microsoft Azure 쿠버네티스(Kubernetes) 서비스
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_container_service
public_title: Datadog-Microsoft Azure 쿠버네티스(Kubernetes) 서비스 통합
short_description: 핵심 Azure 쿠버네티스(Kubernetes) 서비스 메트릭 추적하기
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Azure 쿠버네티스(Kubernetes) 서비스를 사용하면 제품 단계 수준 쿠버네티스(Kubernetes) 클러스터를 빠르게 배포할 수 있습니다.

Datadog Azure 통합을 사용하여 Azure 쿠버네티스(Kubernetes) 서비스에서 메트릭 수집합니다.

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{ get-metrics-from-git "azure-containerservice" }}


### 이벤트

Azure 쿠버네티스(Kubernetes) 서비스 통합에는 이벤트가 포함되지 않습니다.

### 서비스 점검

Azure 쿠버네티스(Kubernetes) 서비스 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_container_service/azure_container_service_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/