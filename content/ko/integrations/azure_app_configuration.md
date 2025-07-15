---
categories:
- cloud
- azure
custom_kind: integration
dependencies: []
description: 주요 Azure App Configuration 메트릭을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/azure_app_configuration/
draft: false
git_integration_title: azure_app_configuration
has_logo: true
integration_id: azure-app-configuration
integration_title: Microsoft Azure App Configuration
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_app_configuration
public_title: Datadog-Microsoft Azure App Configuration 통합
short_description: 주요 Azure App Configuration 메트릭을 추적하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Azure App Configuration은 애플리케이션 설정 및 기능 플래그를 관리하는 중앙 서비스를 제공합니다. App Configuration을 사용하면 애플리케이션에 대한 모든 설정을 저장하고 한 곳에서 액세스를 보호할 수 있습니다.

[Datadog Azure 통합][1]을 사용하면 Azure App Configuration에서 메트릭을 수집하여 들어오는 요청, 대기 시간 및 제한 오류를 모니터링할 수 있습니다.

## 설정
### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][2]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터
### 메트릭
{{< get-metrics-from-git "azure_app_configuration" >}}


### 이벤트
Azure App Configuration 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검
Azure App Configuration 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅
도움이 필요하신가요? [Datadog 지원 팀][4]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://app.datadoghq.com/integrations/azure
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_app_configuration/azure_app_configuration_metadata.csv
[4]: https://docs.datadoghq.com/ko/help/
