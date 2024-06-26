---
categories:
- cloud
- configuration & deployment
- network
- azure
dependencies: []
description: 트리거 워크플로우, 작업 대기 시간, 실패한 작업 등을 추적하기.
doc_link: https://docs.datadoghq.com/integrations/azure_logic_app/
draft: false
git_integration_title: azure_logic_app
has_logo: true
integration_id: azure-logic-app
integration_title: Microsoft Azure Logic App
integration_version: ''
is_public: true
kind: 통합
manifest_version: '1.0'
name: azure_logic_app
public_title: Datadog-Microsoft Azure Logic App 통합
short_description: 트리거 워크플로우, 작업 대기 시간, 실패한 작업 등을 추적하기.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Logic App은 개발자가 여러 단계와 트리거를 통해 목적에 맞는 워크플로우를 설계하도록 도와줍니다.

Azure Logic App 메트릭을 얻으면 다음을 할 수 있습니다.

- Logic App 워크플로우의 성능 가시화
- Logic App 워크플로우와 애플리케이션의 상관 관계 파악

## 설정

### 설치

아직 설정하지 않았다면, [먼저 Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure_logic_app" >}}


### 이벤트

Azure Logic App 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 검사

Azure Logic App 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_logic_app/azure_logic_app_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/