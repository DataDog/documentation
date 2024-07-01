---
categories:
- cloud
- azure
- ai/ml
dependencies: []
description: Azure Machine Learning의 핵심 메트릭 추적하기.
doc_link: https://docs.datadoghq.com/integrations/azure_machine_learning_services/
draft: false
git_integration_title: azure_machine_learning_services
has_logo: true
integration_id: ''
integration_title: Microsoft Azure Machine Learning
integration_version: ''
is_public: true
custom_kind: 통합
manifest_version: '1.0'
name: azure_machine_learning_services
public_title: Datadog-Microsoft Azure Machine Learning 통합
short_description: Azure Machine Learning의 핵심 메트릭 추적하기.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Azure Machine Learning 서비스는 개발자와 데이터 과학자에게 기계 학습을 구축하고, 훈련하며, 더 빨리 배포하는 데 도움이 되도록 다양한 생산적인 경험을 제공하는 서비스입니다. Datadog를 사용해 Azure Machine Learning 성능과 내 애플리케이션 및 인프라스트럭처 컨텍스트 내 활용도를 모니터링할 수 있습니다.

Azure Machine Learning 메트릭을 얻으면 다음을 할 수 있습니다.

* 모델 배포 및 실행 상태 횟수 추적
* 기계 학습 노드 활용도 모니터링
* 성능 대비 비용 최적화

## 설정
### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터
### 메트릭
{{< get-metrics-from-git "azure_machine_learning_services" >}}


### 이벤트
Azure Machine Learning 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 검사
Azure Machine Learning 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅
도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_machine_learning_services/azure_machine_learning_services_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/