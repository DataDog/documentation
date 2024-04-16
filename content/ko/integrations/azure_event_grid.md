---
aliases:
- /ko/integrations/azure_eventgrid
categories:
- cloud
- azure
dependencies: []
description: 주요 Azure Event Grid 메트릭을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/azure_event_grid/
draft: false
git_integration_title: azure_event_grid
has_logo: true
integration_id: azure-eventgrid
integration_title: Microsoft Azure Event Grid
integration_version: ''
is_public: true
kind: 통합
manifest_version: '1.0'
name: azure_event_grid
public_title: Datadog-Microsoft Azure Event Grid 통합
short_description: 주요 Azure Event Grid 메트릭을 추적하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Azure Event Grid는 게시-구독 모델을 사용하여 균일한 이벤트 소비를 허용하는 완전 관리 지능형 이벤트 라우팅 서비스입니다.

Datadog Azure 통합을 사용해 Azure Event Grid 메트릭을 수집할 수 있습니다.

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure_event_grid" >}}


### 이벤트

Azure Event Grid 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 검사

Azure Event Grid 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_event_grid/azure_event_grid_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/