---
aliases: []
categories:
- azure
- cloud
- ㅊ
custom_kind: integration
dependencies: []
description: Azure Container Apps에서 메트릭을 가져오세요.
doc_link: https://docs.datadoghq.com/integrations/azure_container_apps/
draft: false
git_integration_title: azure_container_apps
has_logo: true
integration_id: azure-container-apps
integration_title: Microsoft Azure Container Apps
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_container_apps
public_title: Datadog-Microsoft Azure Container Apps 통합
short_description: Azure Container Apps에서 메트릭을 가져오세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Azure Container Apps를 사용하면 서버리스 컨테이너를 사용하여 최신 앱과 마이크로서비스를 구축하고 배포할 수 있습니다. 자세한 내용은 Azure Container Apps에 대한 [Microsoft 설명서][1]를 참조하세요.

## 설정

### 설치

아직 설정하지 않았다면 [Microsoft Azure 통합을 먼저][2] 설정하세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure_container_apps" >}}


### 이벤트

Azure Container Apps 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Azure Container Apps 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][4]에 문의하세요.

[1]: https://docs.microsoft.com/en-us/azure/container-apps/overview
[2]: https://docs.datadoghq.com/ko/integrations/azure/
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_container_apps/azure_container_apps_metadata.csv
[4]: https://docs.datadoghq.com/ko/help/