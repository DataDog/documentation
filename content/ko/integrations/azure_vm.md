---
categories:
- azure
- cloud
- configuration & deployment
- os & system
dependencies: []
description: Azure VM 리소스 사용량, 네트워크 상태 등 추적하기
doc_link: https://docs.datadoghq.com/integrations/azure_vm/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/video-streaming-performance-monitoring-conviva/
  tag: 블로그
  text: Datadog로 Conviva 모니터링하기
git_integration_title: azure_vm
has_logo: true
integration_id: azure-vm
integration_title: Microsoft Azure VM
integration_version: ''
is_public: true
custom_kind: 통합
manifest_version: '1.0'
name: azure_vm
public_title: Datadog-Microsoft Azure VM 통합
short_description: Azure VM 리소스 사용량, 네트워크 상태 등 추적하기
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Azure Virtual Machine에는 온디맨드 규모 조정을 할 수 있는 기능이 있어 가상화된 환경을 유연하게 운영할 수 있습니다.

Azure VM 메트릭을 얻으면 다음을 할 수 있습니다.

- VM의 성능을 가시화
- VM의 성능과 애플리케이션의 상관 관계 파악

## 설정

### 설치

아직 설정하지 않은 경우, [Microsoft Azure 통합][1]을 먼저 설정하세요.

**ARM** 배포 가상 머신의 경우에는 Diagnostics를 켜고 수집할 VM 메트릭을 선택해야 합니다. 지침을 보려면 [Diagnostics 활성화][2]를 참고하세요.

### 자동 모니터링 해제

Datadog에는 [Azure 리소스 상태 API][3]에 있는 상태에 기반하여 셧다운되거나 종료된 Azure VM과 관련한 모니터링을 선제적으로 해제하는 기능이 있습니다. 이때 수동으로 종료되었는지, 혹은 Azure의 자동 규모 조정으로 인해 종료되었는지는 관계가 없습니다. Azure VM 종료를 미리 예측하여 모니터링을 해제함으로써 불필요한 알림을 예방할 수 있습니다.

자동으로 해제된 가상 머신 목록은 [Manage Downtime][4] 페이지에서 **Show automatically muted hosts**를 활성화하여 사용할 수 있습니다. 자동 해제를 사용하려면 Azure 통합을 설치해야 합니다.

셧다운되거나 종료된  Azure VM의 모니터링을 해제하려면 Azure 통합 타이틀에서 **Azure automuting** 상자에 체크하세요.

자동으로 해제할 수 있는 메트릭 모니터를 생성하려면 `host` 태그에 기반해 태그해야 합니다. 모니터 중인 그룹에 `host` 태그가 없는 메트릭 모니터는 자동으로 해제되지 않습니다.

{{< img src="integrations/azure_vm/azure_vm_automute2.png" alt="호스트 태그를 포함하는 쿼리의 모니터 알림" >}}

**참고**: Datadog 에이전트를 실행하지 않는 경우에는 Azure VM의 `host` 태그는 GUID입니다. 알림 응답에서 메시지 템플릿 변수 `{{host.name_tag}}`를 사용해 파악하기 쉬운 이름을 포함하세요. 

## 수집한 데이터

<div class="alert alert-warning"><code>azure.vm.status</code> 메트릭은 사용 종료되었으며 새 Datadog 조직에는 이 메트릭이 채워지지 않습니다. 기존 사용자의 경우 2023년 6월 1일에 이 메트릭 사용이 종료되었습니다.

문의 사항이 있을 경우 <a href="https://docs.datadoghq.com/help/" target="_blank">Datadog 지원팀</a>에 연락하세요.</div>

### 메트릭
{{< get-metrics-from-git "azure_vm" >}}


### 이벤트

Azure Virtual Machine 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 검사

Azure Virtual Machine 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][6]에 문의하세요.

## 참고 자료

- [Microsoft Azure VM 모니터링하는 방법][7]
- [Azure 메트릭 수집하는 방법][8]
- [Datadog로 Azure VM 모니터링하는 방법][9]
- [Datadog를 사용해 전략적으로 SQL 워크로드를 Azure로 마이그레이션하기][10]

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://docs.datadoghq.com/ko/integrations/guide/azure-troubleshooting/#enable-diagnostics
[3]: https://docs.microsoft.com/en-us/rest/api/resourcehealth/
[4]: https://app.datadoghq.com/monitors/downtimes
[5]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_vm/azure_vm_metadata.csv
[6]: https://docs.datadoghq.com/ko/help/
[7]: https://www.datadoghq.com/blog/how-to-monitor-microsoft-azure-vms
[8]: https://www.datadoghq.com/blog/how-to-collect-azure-metrics
[9]: https://www.datadoghq.com/blog/monitor-azure-vms-using-datadog
[10]: https://www.datadoghq.com/blog/migrate-sql-workloads-to-azure-with-datadog/