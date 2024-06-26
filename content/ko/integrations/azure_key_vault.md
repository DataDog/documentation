---
aliases:
- /ko/integrations/azure_keyvault
categories:
- cloud
- azure
dependencies: []
description: Azure Key Vault의 핵심 메트릭 추적하기.
doc_link: https://docs.datadoghq.com/integrations/azure_key_vault/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/azure-key-vault-monitoring-events/
  tag: 블로그
  text: Azure Key Vault에서 만료 이벤트 모니터링하기
git_integration_title: azure_key_vault
has_logo: true
integration_id: azure-keyvault
integration_title: Microsoft Azure Key Vault
integration_version: ''
is_public: true
kind: 통합
manifest_version: '1.0'
name: azure_key_vault
public_title: Datadog-Microsoft Azure Key Vault 통합
short_description: Azure Key Vault의 핵심 메트릭 추적하기.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Azure Key Vault는 클라우드 애플리케이션과 서비스에 사용되는 암호화 키와 비밀을 보호하고 관리하는 서비스입니다.

Datadog Azure 통합을 사용해 Azure Key Vault 메트릭을 수집할 수 있습니다.

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure_key_vault" >}}


### 이벤트

Datadog에서는 *자격 증명 만료 이벤트*를 전송하며, 이를 통해 Azure 앱 등록, Key Vault 키, Key Vault 비밀, Key Vault 증명서 등과 관련해 만료된 자격 증명을 확인할 수 있습니다. Key Vault 키, Key Vault 비밀, Key Vault 자격 증명용 이벤트를 수신하려면 *Azure Key Vault* 통합을 설치해야 합니다. 

- **만료 이벤트**는 자격 증명 만료일 60일, 30일, 15일, 1일 전에 전송되며, 만료 후에는 한 번만 전송됩니다.
- **권한 이벤트 누락**은 15일마다 전송됩니다. 누락된 권한 이벤트에는 Datadog가 권한을 갖고 있지 않은 Key Vault 목록이 포함되어 있습니다. 최근 15일 주기 동안 Key Vault 권한에 변경 사항이 없을 경우 이벤트 알림이 다시 전송됩니다.

[Event Explorer][3]에서 이 이벤트를 볼 수 있습니다.

**참고**: 

- Azure앱 등록 만료 이벤트를 수집하려면 [Microsoft Graph API 액세스를 활성화][4]하세요.
- 인증서와 관련 키 및 비밀이 같은 날에 모두 만료되는 경우에는 전체 리소스와 관련한 만료 이벤트 하나가 전송됩니다.

### 서비스 검사

Azure Key Vault 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_key_vault/azure_key_vault_metadata.csv
[3]: https://app.datadoghq.com/event/explorer?query=status%3Awarn%20source%3Aazure
[4]: https://docs.datadoghq.com/ko/integrations/guide/azure-graph-api-permissions/
[5]: https://docs.datadoghq.com/ko/help/