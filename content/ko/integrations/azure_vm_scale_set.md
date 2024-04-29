---
categories:
- azure
- cloud
- configuration & deployment
- log collection
dependencies: []
description: 수신 및 발신 바이트, 디스크 운영, CPU 사용량 등 메트릭 세트별로 추적하기.
doc_link: https://docs.datadoghq.com/integrations/azure_vm_scale_set/
draft: false
git_integration_title: azure_vm_scale_set
has_logo: true
integration_id: azure-vm-scale-set
integration_title: Microsoft Azure VM 스케일 세트
integration_version: ''
is_public: true
kind: 통합
manifest_version: '1.0'
name: azure_vm_scale_set
public_title: Datadog-Microsoft Azure VM 스케일 세트 통합
short_description: 수신 및 발신 바이트, 디스크 운영, CPU 사용량 등 세트별로 추적하기.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/azure_vm_scale_set/azure_vm_scale_set_dashboard.png" alt="azure vm scale set dashboard" popup="true">}}

## 개요

가상 머신 스케일 세트는 동일한 VM 세트를 배포, 관리, 자동 규모 조정하는 Azure Compute 리소스입니다.

Azure Virtual Machine 스케일 세트의 메트릭을 얻으면 다음을 할 수 있습니다.

- Virtual Machine 스케일 세트의 성능을 가시화
- Virtual Machine Scale Set의 성능과 애플리케이션의 상관 관계 파악

## 설정

### 설치

통합 메트릭은 [Microsoft Azure 통합][1]에 포함되어 있습니다. Datadog 에이전트로 메트릭을 수집하려면 에이전트 배포 지침을 따르세요.

- Datadog의 US3 사이트를 사용 중이고 Azure에서 Datadog 리소스를 구성한 경우에는 [Azure 네이티브 통합 매뉴얼 설정 가이드][2]에 안내된 지침을 따르세요.
-  [Azure 통합 매뉴얼 설정 가이드][3]나 [Azure 프로그래밍 관리 가이드][4]에 있는 지침은 **모든 사이트**에 적용할 수 있습니다.

### 로그 수집

특정 Windows 이벤트에서 로그를 수집하려면 채널을 `conf.d/win32_event_log.d/conf.yaml` 파일에 수동으로 추가하거나 Datadog 에이전트 매니저를 추가해 추가하세요. 다음 예시를 참고하세요.

```yaml
logs:
  - type: windows_event
    channel_path: '<CHANNEL_1>'
    source: '<CHANNEL_1>'
    service: myservice
    sourcecategory: windowsevent
   - type: windows_event
    channel_path: '<CHANNEL_2>'
    source: '<CHANNEL_2>'
    service: myservice
    sourcecategory: windowsevent
```

자세한 사항은 [Win32 이벤트 로그][5] 통합을 참고하세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure_vm_scale_set" >}}


### 이벤트 

Azure Virtual 스케일 세트 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Azure Virtual 머신 스케일 세트 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 문제 해결

도움이 필요하신가요? [Datadog 지원팀][7]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://docs.datadoghq.com/ko/integrations/guide/azure-native-manual-setup/#deploy-the-datadog-agent
[3]: https://docs.datadoghq.com/ko/integrations/guide/azure-manual-setup/#agent-installation
[4]: https://docs.datadoghq.com/ko/integrations/guide/azure-programmatic-management/#datadog-azure-vm-extension
[5]: https://docs.datadoghq.com/ko/integrations/win32_event_log/#log-collection
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_vm_scale_set/azure_vm_scale_set_metadata.csv
[7]: https://docs.datadoghq.com/ko/help/