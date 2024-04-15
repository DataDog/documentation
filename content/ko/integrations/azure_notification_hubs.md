---
aliases:
- /ko/integrations/azure_notificationhubs
categories:
- azure
- cloud
- 알림
dependencies: []
description: Azure Notification Hubs의 핵심 메트릭 추적하기.
doc_link: https://docs.datadoghq.com/integrations/azure_notification_hubs/
draft: false
git_integration_title: azure_notification_hubs
has_logo: true
integration_id: azure-notificationhubs
integration_title: Microsoft Azure Notification Hubs
integration_version: ''
is_public: true
kind: 통합
manifest_version: '1.0'
name: azure_notification_hubs
public_title: Datadog-Microsoft Azure Notification Hubs 통합
short_description: Azure Notification Hubs의 핵심 메트릭 추적하기.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Azure Notification Hubs는 사용하기 쉽고 확장된 푸시 엔진을 제공하여 어떤 백엔드(클라우드나 온프레미스)에서든 다양한 플랫폼(iOS, Android, Windows, Kindle, Baidu 등)으로 알림을 보낼 수 있도록 해줍니다.

Datadog Azure 통합을 사용해 Azure Notification Hubs 메트릭을 수집할 수 있습니다.

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure_notification_hubs" >}}


### 이벤트

Azure Notification Hubs 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 검사

Azure Notification Hubs 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_notification_hubs/azure_notification_hubs_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/