---
categories:
- cloud
- azure
custom_kind: integration
dependencies: []
description: 주요 Azure App Services 메트릭을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/azure_app_services/
draft: false
git_integration_title: azure_app_services
has_logo: true
integration_id: azure-app-services
integration_title: Microsoft Azure App Service
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_app_services
public_title: Datadog-Microsoft Azure App Service 통합
short_description: 주요 Azure App Services 메트릭을 추적하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Azure App Service는 웹, 모바일, API 및 비즈니스 로직 애플리케이션을 실행하고 해당 앱에 필요한 리소스를 자동으로 관리하는 PaaS(Platform as a Service)입니다.

Azure App Service에서 메트릭을 얻으면 다음을 수행할 수 있습니다.

- 앱 성능 시각화
- Azure Apps 성능과 나머지 앱 간의 상관 관계 파악

### Azure App Service 보기

Azure App Service 프리셋 대시보드 외에 전용 Azure App Service 보기를 사용할 수도 있습니다.

Azure App Service 보기를 사용하면 다음을 수행할 수 있습니다. 

- 지연 시간이 길거나 오류가 있는 앱을 빠르게 식별할 수 있습니다.

- 웹 앱, 함수 앱, 앱 서비스 플랜 사용을 추적할 수 있습니다.

- 활성 인스턴스 수를 시각화하고 어떤 앱이 실행 중이며, 어떤 앱이 Datadog에 트레이스 또는 로그를 제출하는지 확인하여 앱 서비스 요금제 비용에 대한 인사이트를 얻을 수 있습니다.

- App Service Plans에서 실행 중인 앱을 매핑하여 비용이나 성능에 영향을 미칠 수 있는 앱을 식별할 수 있습니다.

Azure App Service에서 실행되는 애플리케이션에 대해 Datadog APM 및 커스텀 메트릭을 활성화하려면 [Datadog Azure App Service 확장][1]에 대한 설명서를 참조하세요.

## 설정

### 설치

아직 설정하지 않았다면 [Microsoft Azure 통합을 먼저][2] 설정하세요. 다른 설치 단계는 없습니다.

로그 및 트레이스 ID 삽입을 포함한 추가 모니터링 옵션은 [Azure App Service 확장][1]을 참조하세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure_app_services" >}}


### 이벤트

Azure App Service 통합에는 이벤트가 포함되지 않습니다.

### 서비스 점검

Azure App Service 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][4]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/serverless/azure_app_services/
[2]: https://docs.datadoghq.com/ko/integrations/azure/
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_app_services/azure_app_services_metadata.csv
[4]: https://docs.datadoghq.com/ko/help/