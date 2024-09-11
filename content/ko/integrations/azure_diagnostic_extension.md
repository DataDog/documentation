---
categories:
- cloud
- azure
dependencies: []
description: Azure Diagnostic Extension의 주요 메트릭을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/azure_diagnostic_extension/
draft: false
git_integration_title: azure_diagnostic_extension
has_logo: true
integration_id: ''
integration_title: Azure Diagnostic Extension
integration_version: ''
is_public: true
custom_kind: 통합
manifest_version: '1.0'
name: azure_diagnostic_extension
public_title: Datadog-Azure Diagnostic Extension 통합
short_description: Azure Diagnostic Extension의 주요 메트릭을 추적하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
<div class="alert alert-warning">이 통합은 더 이상 사용되지 않습니다. 개선된 상세도와 지연 시간을 사용하여 Azure VM에 대한 유사한 게스트 수준 및 프로세스 수준 인사이트를 얻으려면 Datadog  Agent를 설치하세요.

이 페이지에 나열된 메트릭은 새로 생성된 Datadog 조직에 대해 더 이상 채워지지 않습니다. 기존 사용자의 경우 2023년 6월 1일에 사용 중지되었습니다.

질문이 있으시면  <a href="https://docs.datadoghq.com/help/" target="_blank">Datadog 지원팀</a>에 문의해 주세요.</div>

## 개요

Azure Diagnostic Extension은 사용자가 Microsoft Azure에서 실행되는 VM의 상태를 모니터링하는 데 도움이 됩니다.

Datadog Azure 통합이 Azure Diagnostic Extension에서 메트릭을 수집할 수는 있으나 VM에 Datadog Agent를 설치하는 것이 [좋습니다][1].

- Datadog의 US3 사이트를 사용 중이고 Azure에서 Datadog 리소스를 구성한 경우에는 [Azure 네이티브 통합 매뉴얼 설정 가이드][2]에 안내된 지침을 따르세요.
-  [Azure 통합 매뉴얼 설정 가이드][3]나 [Azure 프로그래밍 관리 가이드][4]에 있는 지침은 **모든 사이트**에 적용할 수 있습니다.

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][5]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure_diagnostic_extension" >}}


### 이벤트

Azure Diagnostic Extension 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 검사

Azure Diagnostic Extension 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][7]에 문의하세요.

[1]: https://www.datadoghq.com/blog/dont-fear-the-agent/
[2]: https://docs.datadoghq.com/ko/integrations/guide/azure-native-manual-setup/#deploy-the-datadog-agent
[3]: https://docs.datadoghq.com/ko/integrations/guide/azure-manual-setup/#agent-installation
[4]: https://docs.datadoghq.com/ko/integrations/guide/azure-programmatic-management/#datadog-azure-vm-extension
[5]: https://docs.datadoghq.com/ko/integrations/azure/
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_diagnostic_extension/azure_analysis_services_metadata.csv
[7]: https://docs.datadoghq.com/ko/help/