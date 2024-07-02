---
aliases:
- /ko/integrations/faq/azure-vms-are-showing-up-in-the-app-but-not-reporting-metrics
title: 앱에 Azure VM이 나타나지만 메트릭이 보이지 않음
---

Datadog에 Azure 통합을 제대로 설치하면 15분 내에 Azure VM과 다른 서비스의 메트릭이 표시되기 시작합니다.

15분 후 인프라스트럭처 목록에 Azure VM이 나타나는데 메트릭이 보고되지 않는 경우, 이 문제에는 여러 원인이 있을 수 있습니다.

1. 올바른 메트릭을 보고 있는지 확인하세요.
   **클래식** 가상 머신 메트릭은 azure.vm 네임스페이스로 시작하고 ARM 배포 가상 머신 메트릭은 `azure.compute_virtualmachines` 네임스페이스로 시작합니다.

2. 이 두 네임스페이스가 메트릭으로 반환되지 않는 경우 Azure Machines 내 Azure Portal에 **Diagnostics**가 활성화되어 있는지 확인하세요. 참고로 Boot 진단과 Basic 메트릭만 있으면 됩니다.
    * **클래식** VM의 경우:
    {{< img src="integrations/guide/azure_vms_appearing_in_the_app_without_metrics/classic_vm.png" alt="Azure Portal에서 상태 설정이 활성화된 클래식 가상 머신 진단 보기" >}}

    * ARM 배포된 VM의 경우:
    {{< img src="integrations/guide/azure_vms_appearing_in_the_app_without_metrics/arm_deployed_vm.png" alt="Azure Portal에서 상태 설정이 활성화된 가상 머신의 진단 설정 보기" >}}

3. 가상 머신이 실행 중인지 확인해야 합니다.
   통합은 중단되거나 할당되지 않은 가상 머신에서 성능 메트릭을 수집하지 않습니다. 그러나 가상 머신이 실행 중이거나 중단된 경우에 `azure.vm.status metric`은 `1`을 반환합니다(이에 따라 인프라스트럭처 목록에 중단된 VM이 나타남). 연결된 상태 태그를 통해 실행 중인 호스트와 실행 중이지 않은 호스트를 구분할 수 있습니다. 확인하고 싶은 호스트에 `status:running`이 있는지 보고 Azure Portal에서 실행 중인지 확인하세요.
    {{< img src="integrations/guide/azure_vms_appearing_in_the_app_without_metrics/azure_vm_running.png" alt="Datadog의 시계열 그래프 한 쌍, 하나는 status:running인 azure.vm.status 합계이고, 다른 하나는 status:not_running인 azure.vm.status 합계" >}}