---
further_reading:
- link: /security/default_rules/#cat-cloud-siem-log-detection
  tag: 설명서
  text: Cloud SIEM 기본 탐지 규칙 살펴보기
- link: /security/cloud_siem/triage_and_investigate/investigate_security_signals
  tag: 설명서
  text: 보안 신호 탐색기 알아보기
- link: /security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule
  tag: 설명서
  text: 사용자 지정 탐지 규칙 생성
title: Cloud SIEM용 Azure 구성 가이드
---
## 개요 {#overview}

Cloud SIEM은 Datadog에서 처리된 모든 로그에 탐지 규칙을 적용하여 표적 공격, 시스템과 통신하는 위협 인텔리전스 목록의 IP, 안전하지 않은 리소스 변경과 같은 위협을 탐지합니다. 탐지된 위협은 분류할 수 있도록 Security Signals Explorer에 보안 신호로 표시됩니다.

이 지침에서는 Azure 플랫폼 로그로 위협 탐지를 시작할 수 있도록 Microsoft Azure에서 Datadog으로 로그를 전송하도록 구성하는 방법을 안내합니다.

<div class="alert alert-info">Azure Native 통합(Datadog의 US3 사이트 고객이 사용 가능)은 로그 수집 설정 지침이 다릅니다. Azure Native 통합을 사용하는 경우 Datadog Site 드롭다운 메뉴에서 <strong>US3</strong>을 선택하고 <a href="https://docs.datadoghq.com/integrations/guide/azure-native-integration/#log-collection">Microsoft Azure 로그 수집</a>의 지침을 따릅니다. </div>

{{< tabs >}}
{{% tab "자동 설치" %}}

아래 버튼을 클릭하고 Azure Portal에서 양식을 작성합니다. 양식을 작성하면 활동 로그를 Datadog 계정으로 전송하는 데 필요한 Azure 리소스가 자동으로 배포됩니다.

[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fdatadog-serverless-functions%2Frefs%2Fheads%2Fmaster%2Fazure%2Feventhub_log_forwarder%2Fparent_template.json)

1. 기존 리소스 그룹을 선택하거나 새 리소스 그룹을 생성합니다.
1. 지역을 선택합니다.
1. **Send Activity Logs**에서 **true**를 선택합니다.
1. Datadog API 키를 입력합니다.
1. 리소스 이름을 입력합니다.
1. {{< ui >}}Create + review{{< /ui >}}를 클릭합니다.
1. 유효성 검사를 통과하면 {{< ui >}}Create{{< /ui >}}를 클릭합니다.

배포가 성공적으로 완료되면 [Log Explorer][1]로 이동한 다음 검색 쿼리에 `service:azure`를 입력하여 Azure 로그를 확인합니다.


[1]: https://app.datadoghq.com/logs

{{% /tab %}}

{{% tab "수동 설치" %}}

본 섹션에서는 Azure Platform 로그를 Datadog으로 전송하는 수동 설치 단계를 알아봅니다.

1. [리소스 그룹 생성](#create-a-resource-group)
1. [Event Hubs 네임스페이스 생성](#create-an-event-hubs-namespace)
1. [Azure Event Hub 생성](#create-an-event-hub)
1. [Azure Function App 생성](#create-an-azure-function-app)
1. [Function App에 새 함수 추가](#add-a-new-function-to-your-function-app)
1. [Azure 서비스 로그를 Event Hub로 전달](#forward-azure-services-logs-to-event-hub)

### 리소스 그룹 생성 {#create-a-resource-group}

기존 리소스 그룹을 사용하려면 이벤트 허브 네임스페이스 생성하기로 건너뜁니다.

1. [Azure Resource groups][1] 페이지로 이동합니다.
1. {{< ui >}}Create{{< /ui >}}를 클릭합니다.
1. 리소스 그룹의 이름을 입력합니다.
1. 태그를 추가하려면 필요시 {{< ui >}}Next: Tags{{< /ui >}}를 클릭합니다.
1. {{< ui >}}Review + create{{< /ui >}}를 클릭합니다.
1. 유효성 검사를 통과하면 {{< ui >}}Create{{< /ui >}}를 클릭합니다.

### Event Hubs 네임스페이스 생성 {#create-an-event-hubs-namespace}

1. [Azure Event Hubs][2]로 이동합니다.
1. {{< ui >}}Create{{< /ui >}}를 클릭합니다.
1. **Resource group** 드롭다운 메뉴에서 Event Hub를 추가할 리소스 그룹을 선택합니다.
1. 네임스페이스의 이름을 입력합니다.
1. 네임스페이스의 위치를 선택합니다.
     **참고**: Event Hub는 로그를 전송하려는 리소스와 동일한 위치에 있어야 합니다. 활동 로그 또는 기타 계정 전체 로그 소스의 경우 원하는 지역을 선택할 수 있습니다.
1. 요금 등급을 선택합니다.
1. 처리량 단위(표준 등급) 또는 처리 단위(프리미엄 등급)는 그대로 둡니다.
1. {{< ui >}}Review + create{{< /ui >}}를 클릭합니다.
1. 유효성 검사를 통과하면 {{< ui >}}Create{{< /ui >}}를 클릭합니다.
1. 배포가 성공적으로 완료되면 {{< ui >}}Go to resource{{< /ui >}}를 클릭합니다.

### Event Hub 생성 {#create-an-event-hub}

1. 방금 만든 Event Hubs 네임스페이스에서 {{< ui >}}\+ Event Hub{{< /ui >}}를 클릭합니다.
1. Event Hub의 이름을 입력합니다.
1. 필요시 파티션 수와 보존 옵션을 구성합니다.
1. {{< ui >}}Review + create{{< /ui >}}를 클릭합니다.
1. 유효성 검사를 통과하면 {{< ui >}}Create{{< /ui >}}를 클릭합니다.

### Azure Function App 생성 {#create-an-azure-function-app}
새 Function App을 생성합니다. 기존 Function App을 사용하는 경우 'Function App에 새 함수 추가'로 이동합니다.

1. [Function App][3]으로 이동합니다.
1. {{< ui >}}Create{{< /ui >}}를 클릭합니다.
1. Function App의 리소스 그룹을 선택합니다.
1. Function App의 이름을 입력합니다.
1. 배포 방식은 Code를 선택한 상태로 둡니다.
1. **Runtime stack** 드롭다운 메뉴에서 {{< ui >}}Node.js{{< /ui >}}를 선택합니다.
1. Function App의 지역을 선택합니다.
1. 운영 체제와 요금제 유형을 선택합니다.
1. {{< ui >}}Next: Storage{{< /ui >}}를 클릭합니다.
1. 드롭다운 메뉴에서 스토리지 계정을 선택합니다.
1. {{< ui >}}Review + create{{< /ui >}}를 클릭합니다.
1. 유효성 검사를 통과하면 {{< ui >}}Create{{< /ui >}}를 클릭합니다.
1. 배포가 성공적으로 완료되면 {{< ui >}}Create a function{{< /ui >}}을 클릭합니다.

### Function App에 새 함수 추가 {#add-a-new-function-to-your-function-app}

1. 기존 Function App을 사용하는 경우 해당 Function App으로 이동합니다. 왼쪽 사이드 메뉴에서 {{< ui >}}Functions{{< /ui >}}를 클릭합니다.
1. {{< ui >}}Create{{< /ui >}}를 클릭합니다.
1. {{< ui >}}Azure Event Hub trigger{{< /ui >}}를 선택합니다.
1. 새 함수의 이름을 입력합니다.
1. **Event Hub connection**에서 {{< ui >}}New{{< /ui >}}를 클릭합니다.
1. **Event Hub connection** 드롭다운 메뉴에서 앞서 생성한 Event Hub를 선택합니다.
1. {{< ui >}}OK{{< /ui >}}를 클릭합니다.
1. **Event Hub name**에 앞서 생성한 Event Hub의 이름을 입력합니다.
1. {{< ui >}}Create{{< /ui >}}를 클릭합니다.

### Datadog Azure 함수 추가 {#add-the-datadog-azure-function}

<br />**참고**: 아래 단계는 Azure Functions Programming Model v3을 기준으로 합니다. Datadog의 최신 [Azure 함수 코드][8]는 Azure Functions Programming Model v4를 지원하도록 업데이트되었습니다. v4 호환 버전의 배포 방법에 대한 안내가 필요하거나 v3과 v4의 차이점에 대해 궁금한 점이 있으면 Datadog 기술 지원팀에 문의하세요.

1. 새 함수의 왼쪽 사이드 메뉴에서 {{< ui >}}Code + Test{{< /ui >}}를 선택합니다.
1. [Datadog-Azure 함수 코드][4]를 복사하여 `index.js` 파일에 붙여넣습니다.
1. 함수 코드의 22번째 줄에 있는 `<DATADOG_API_KEY>`를 Datadog API로 바꿉니다.
1. Datadog US1 사이트를 사용하지 않는 경우 함수 코드 23번째 줄의 `DD_SITE`를 [Datadog 사이트][5] 파라미터로 바꿉니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.
1. 왼쪽 사이드 메뉴에서 {{< ui >}}Integrations{{< /ui >}}를 클릭합니다.
1. {{< ui >}}Azure Event Hubs{{< /ui >}}를 클릭합니다.
1. `Event parameter name`의 값을 `eventHubMessages`로 설정합니다.
1. `Event Hub Cardinality` `Many`로 설정해야 합니다.
1. `Event Hub Data Type`의 값을 빈 값으로 설정합니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.
1. 함수를 실행한 다음 Datadog Log Explorer에서 테스트 메시지를 확인하여 설정이 올바른지 검증합니다. 테스트 로그 이벤트는 유효한 JSON 형식이어야 합니다. 예를 들면 다음과 같습니다.
    ```
    {
        is_test:true,
        name: "Datadog Test"
    }
    ```

### Azure 서비스 로그를 Event Hub로 전달 {#forward-azure-services-logs-to-event-hub}

#### 활동 로그를 Event Hub로 전달 {#forward-activity-logs-to-event-hub}

1. [Azure 활동 로그][6]로 이동합니다.
1. {{< ui >}}Export Activity Logs{{< /ui >}}를 클릭합니다.
1. {{< ui >}}Add diagnostic settings{{< /ui >}}를 클릭합니다.
1. 진단 설정의 이름을 입력합니다.
1. Datadog으로 보내려는 로그의 카테고리를 선택합니다.
1. {{< ui >}}Stream to an event hub{{< /ui >}}를 선택합니다.
1. 앞서 생성한 Event Hubs 네임스페이스를 선택합니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

#### 리소스 로그를 Event Hub로 전달 {#forward-resource-logs-to-event-hub}

1. 리소스 로그를 보내려는 리소스로 이동합니다.
1. 왼쪽 메뉴의 **Monitor**에서 {{< ui >}}Diagnostic settings{{< /ui >}}를 클릭합니다.
1. {{< ui >}}Add diagnostic setting{{< /ui >}}을 클릭합니다.
1. 진단 설정의 이름을 입력합니다.
1. {{< ui >}}allLogs{{< /ui >}}를 선택합니다.
1. **Destination details** 섹션에서 {{< ui >}}Stream to an event hub{{< /ui >}}를 선택합니다.
1. 앞서 생성한 Event Hubs 네임스페이스를 선택합니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

[Log Explorer][7]로 이동한 후 검색 쿼리에 `service:azure`를 입력하여 Azure 로그를 확인합니다.

[1]: https://portal.azure.com/#view/HubsExtension/BrowseResourceGroups
[2]: https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.EventHub%2Fnamespaces
[3]: https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.Web%2Fsites/kind/functionapp
[4]: https://github.com/DataDog/datadog-serverless-functions/blob/aws-dd-forwarder-4.5.0/azure/activity_logs_monitoring/index.js
[5]: https://docs.datadoghq.com/ko/getting_started/site/
[6]: https://portal.azure.com/#view/Microsoft_Azure_Monitoring/AzureMonitoringBrowseBlade/~/activityLog
[7]: https://app.datadoghq.com/logs
[8]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/activity_logs_monitoring/index.js

{{% /tab %}}
{{< /tabs >}}

## Cloud SIEM을 사용하여 보안 신호 분류 {#use-cloud-siem-to-triage-security-signals}

Cloud SIEM은 방금 설정한 Azure Platform 로그를 포함하여 처리된 모든 로그에 기본 제공 탐지 규칙을 적용합니다. 탐지 규칙으로 위협이 탐지되면 보안 신호가 생성되며 Security Signals Explorer에서 확인할 수 있습니다.

- Cloud SIEM Signals Explorer로 이동하여 위협을 확인하고 분류합니다. 자세한 내용은 Security Signals Explorer를 참조하세요.
- 로그에 적용되는 기본 제공 탐지 규칙을 확인합니다.
- 특정 사용 사례에 맞는 위협을 탐지하는 새 규칙을 생성합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}