---
categories:
- azure
- cloud
- 프로비저닝
dependencies: []
description: 주요  Azure Functions 메트릭을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/azure_functions/
draft: false
git_integration_title: azure_functions
has_logo: true
integration_id: ''
integration_title: Microsoft Azure Functions
integration_version: ''
is_public: true
kind: 통합
manifest_version: '1.0'
name: azure_functions
public_title: Datadog-Microsoft Azure Functions 통합
short_description: 주요  Azure Functions 메트릭을 추적하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Azure Functions는 복잡한 오케스트레이션 문제도 해결할 수 있는 이벤트 기반 서버리스 컴퓨팅 플랫폼입니다. 추가 설정 없이 로컬에서 빌드 및 디버깅하고, 클라우드에서 대규모로 배포 및 운영하며, 트리거 및 바인딩을 사용하여 서비스를 통합할 수 있습니다.

 Azure Functions에서 메트릭을 가져오면 다음을 수행할 수 있습니다.

- 함수 성능과 사용률 시각화
-  Azure Functions 성능과 나머지 앱 간의 상관 관계 파악.

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure_functions" >}}


### 이벤트

Azure Functions 통합에는 이벤트가 포함되지 않습니다.

### 서비스 검사

Azure Functions 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_functions/azure_functions_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/