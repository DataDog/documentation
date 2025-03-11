---
categories:
- cloud
- azure
dependencies: []
description: Azure Recovery Service Vault의 핵심 메트릭 추적하기.
doc_link: https://docs.datadoghq.com/integrations/azure_recovery_service_vault/
draft: false
git_integration_title: azure_recovery_service_vault
has_logo: true
integration_id: ''
integration_title: Azure Recovery Service Vault
integration_version: ''
is_public: true
custom_kind: 통합
manifest_version: '1.0'
name: azure_recovery_service_vault
public_title: Datadog-Azure Recovery Service Vault 통합
short_description: Azure Recovery Service Vault의 핵심 메트릭 추적하기.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Azure Recovery Service Vault 통합을 사용하면 Microsoft Azure에서 실행 중인 Recovery Service Vault 서비스의 상태를 모니터링할 수 있습니다.

Datadog Azure Recovery Service Vault를 사용해 Azure Recovery Service Vault에서 메트릭을 수집할 수 있으나 VM에 Datadog 에이전트를 설치하는 것을 [권고][1]합니다. Datadog의 US3 사이트를 이용 중이면서 Azure에 Datadog 리소스를 구성한 경우, [Azure 네이티브 통합 매뉴얼 설정 가이드][2]에 안내된 지침을 따르세요. [Azure 통합 매뉴얼 설정 가이드][3]나 [Azure 프로그래밍 관리 가이드][4]에 있는 지침은 **모든 사이트**에 적용할 수 있습니다.

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][5]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure_recovery_service_vault" >}}


### 이벤트

Azure Recovery Service Vault 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 검사

Azure Recovery Service Vault 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][7]에 문의하세요.


[1]: https://www.datadoghq.com/blog/dont-fear-the-agent/
[2]: https://docs.datadoghq.com/ko/integrations/guide/azure-native-manual-setup/#deploy-the-datadog-agent
[3]: https://docs.datadoghq.com/ko/integrations/guide/azure-manual-setup/#agent-installation
[4]: https://docs.datadoghq.com/ko/integrations/guide/azure-programmatic-management/#datadog-azure-vm-extension
[5]: https://docs.datadoghq.com/ko/integrations/azure/
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_recovery_service_vault/azure_recovery_service_vault_metadata.csv
[7]: https://docs.datadoghq.com/ko/help/