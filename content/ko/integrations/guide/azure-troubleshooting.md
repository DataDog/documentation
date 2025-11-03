---
aliases:
- /ko/integrations/faq/azure-troubleshooting
further_reading:
- link: /integrations/azure/
  tag: 설명서
  text: Azure 통합
title: Azure 트러블슈팅
---

## 테넌트 이름 찾기

1.  [portal.azure.com][1]에 접속합니다.
2. 왼쪽 사이드바에서 **Azure Active Directory**를 선택합니다.
3. **Basic information**에서 **Name** 값을 찾습니다.

## 로그인 할 수 없음

Azure 통합을 설치하는 동안 로그인 오류가 발생하는 경우 [Datadog 지원팀][3]에 문의하세요. 신속한 지원을 위해 스크린샷을 첨부해 주세요.

## 누락 메트릭

해당 구독을 모니터링하기 위해 Azure 애플리케이션에 읽기 권한을 부여하는 등 설치 프로세스를 완료했는지 확인합니다.

ARM 배포 가상 머신의 경우 진단을 활성화하고 수집하려는 VM 메트릭도 선택해야 합니다. 지침은 아래 **진단 활성화**를 참조하세요.

누락된 메트릭의 경우 메트릭에 대한 다음 정보와 함께 [Datadog 지원팀][3]에 문의하시기 바랍니다.
- 디멘션
- 리소스 그룹
- 리소스 이름
- 구독 ID 또는 구독 이름

메트릭 그래프를 보여 주는 Azure Monitor 그래프의 스크린샷을 첨부합니다. **중요**: 스크린샷에 1분 데이터 포인트를 그래프로 표시하세요.


### 진단 활성화

진단을 활성화하면 ​​ARM 배포 VM이 CPU, 네트워크 등에 대한 메트릭이 포함된 로깅 정보를 수집할 수 있습니다. 다음 지침을 따르세요.

1. [Azure Portal][1]로 이동하여 VM을 찾습니다.
2. **Monitoring** 섹션에서 **Diagnostics settings**를 클릭합니다.
3. 스토리지 계정을 선택하고 **Enable guest-level monitoring**을 클릭합니다.
4. 기본적으로 기본 메트릭과 로그가 활성화되어 있습니다. 필요에 따라 조정하세요.
5. 변경사항을 저장하려면 **Save**를 클릭하세요.

    {{< img src="integrations/guide/azure_troubleshooting/azure_enable_diagnostics.png" alt="Pick a storage account 및 활성화된 enable guest level monitoring에서 No storage account가 강조 표시되어 있는 Azure 진단 설정 개요" style="width:70%">}}

## 자동화된 로그 수집

### 이름 충돌

기본 파라미터와 리소스 이름이 동일한 Azure 리소스가 있는 경우 이름 충돌이 발생할 수 있습니다. Azure는 리소스가 개별 구독 내에서 리소스 이름을 공유하는 것을 허용하지 않습니다. Datadog에서는 환경 내에 아직 존재하지 않는 고유한 이름으로 기본 파라미터의 이름을 바꿀 것을 권장합니다.

예를 들어 `datadog-eventhub`라는 Eventhub가 이미 있는 경우 -EventhubName 플래그를 사용하여 Eventhub 리소스의 기본 이름을 변경합니다.

{{< code-block lang="powershell" filename="Example" >}}

./resource_deploy.ps1 -ApiKey <your_api_key> -SubscriptionId <your_subscription_id> -EventhubName <new-name>

{{< /code-block >}}

**참고:** 설정 가능한 파라미터 목록을 찾으려면 [Optional Parameters][4] 섹션으로 이동하세요.

**참고:** 이 실패로 인해 스크립트를 다시 실행하는 경우 전체 리소스 그룹을 제거하여 새로운 실행을 생성하는 것이 좋습니다.

### 등록되지 않은 리소스 공급자

**The subscription is not registered to use namespace 'Microsoft.EventHub'** 오류로 인해 스크립트 실행이 실패한 경우:

Azure에는 각 서비스에 대한 리소스 공급자가 있습니다(예: Azure EventHub용 `Microsoft.EventHub`). Azure 구독이 필수 리소스 공급자에 등록되지 않은 경우 스크립트가 실패합니다. 리소스 공급자에 등록하면 이 문제를 해결할 수 있습니다. CloudShell에서 이 명령을 실행하세요.

{{< code-block lang="powershell" filename="Example" >}}

az provider register --namespace Microsoft.EventHub

{{< /code-block >}}

### 로그 할당량 초과

스크립트를 성공적으로 설치했지만 여전히 Logs Explorer에 활동/플랫폼 로그가 표시되지 않나요?

로그 보존에 대한 [일일 할당량][5]을 초과하지 않았는지 확인하세요.

**참고:** Logs Explorer에서 로그 찾기를 시작하려면 스크립트를 실행한 후 최소 5분 정도 기다리는 것이 좋습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://portal.azure.com
[2]: https://manage.windowsazure.com
[3]: /ko/help/
[4]: /ko/integrations/azure/?tab=azurecliv20#optional-parameters
[5]: /ko/logs/indexes/#set-daily-quota