---
aliases:
- /ko/integrations/azure_loadbalancer
categories:
- cloud
- azure
dependencies: []
description: Azure Load Balancer의 핵심 메트릭 추적하기.
doc_link: https://docs.datadoghq.com/integrations/azure_load_balancer/
draft: false
git_integration_title: azure_load_balancer
has_logo: true
integration_id: azure-load-balancer
integration_title: Microsoft Azure Load Balancer
integration_version: ''
is_public: true
kind: 통합
manifest_version: '1.0'
name: azure_load_balancer
public_title: Datadog-Microsoft Azure Load Balancer 통합
short_description: Azure Load Balancer의 핵심 메트릭 추적하기.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Azure Load Balancer는 인바운드 및 아웃바운드 시나리오를 지원하고, 대기 시간은 낮추면서 처리량을 높이며, TCP와 UDP 애플리케이션에서 흐름을 수백만 개까지 규모 조정할 수 있습니다.

Datadog Azure 통합을 사용해 Azure Load Balancer 메트릭을 수집할 수 있습니다.

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure_load_balancer" >}}


### 이벤트

Azure Load Balancer 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 검사

Azure Load Balancer 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_load_balancer/azure_load_balancer_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/