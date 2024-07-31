---
categories:
- azure
- 클라우드
- 네트워크
custom_kind: 통합
dependencies: []
description: Azure Data Explorer의 핵심 메트릭 추적하기
doc_link: https://docs.datadoghq.com/integrations/azure_data_explorer/
draft: false
git_integration_title: azure_data_explorer
has_logo: true
integration_id: ''
integration_title: Microsoft Azure Data Explorer
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_data_explorer
public_title: Datadog-Microsoft Azure Data Explorer 통합
short_description: Azure Data Explorer의 핵심 메트릭 추적하기
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Azure Data Explorer는 구조화된 데이터나 구조화되지 않은 데이터를 다양한 방법으로 탐색할 수 있도록 도와주어 즉각적으로 인사이트를 얻을 수 있고 규모 조정 정도와 안전성이 높은 분석 서비스입니다. 애드혹 쿼리에 최적화되어 있고 원시 데이터, 구조화된 데이터, 반구조화된 데이터를 탐색할 수 있어 빠른 시간 안에 인사이트를 얻을 수 있습니다. Datadog를 사용해 내 애플리케이션과 인프라스트럭처 컨텍스트 내에서 Azure Data Explorer의 성능과 사용을 모니터링할 수 있습니다.

Azure Data Explore 메트릭을 얻으면 다음을 할 수 있습니다.

* Data Explorer 인스턴스의 수집, 프로세싱, 대기 시간 성능 추적
* Data Explorer의 계산, 메모리, 네트워크 리소스 사용 모니터링

## 설정
### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터
### 메트릭
{{< get-metrics-from-git "azure_data_explorer" >}}


### 이벤트
Azure Data Explorer 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검
Azure Data Explorer 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅
도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_data_explorer/azure_data_explorer_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/