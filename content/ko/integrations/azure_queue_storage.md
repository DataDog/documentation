---
categories:
- cloud
- azure
dependencies: []
description: Azure Queue Storage의 핵심 메트릭 추적하기.
doc_link: https://docs.datadoghq.com/integrations/azure_queue_storage/
draft: false
git_integration_title: azure_queue_storage
has_logo: true
integration_id: azure-queue-storage
integration_title: Microsoft Azure Queue Storage
integration_version: ''
is_public: true
custom_kind: 통합
manifest_version: '1.0'
name: azure_queue_storage
public_title: Datadog-Microsoft Azure Queue Storage 통합
short_description: Azure Queue Storage의 핵심 메트릭 추적하기.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Azure Queue Storage는 메세지를 대량으로 저장하는 서비스로, 저장된 메시지는 HTTP나 HTTPS를 사용해 인증된 호출로 어디에서든 접근할 수 있습니다.

Azure Queue Storage 메트릭을 얻으면 다음을 할 수 있습니다.

- Azure Queue Storage의 성능 가시화
- Azure Queue Storage의 성능과 애플리케이션의 상관 관계 파악

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure_queue_storage" >}}


### 이벤트

Azure Queue Storage 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 검사

Azure Queue Storage 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_queue_storage/azure_queue_storage_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/